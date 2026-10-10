#!/usr/bin/env python3
"""
HERMETIC UNIT TEST SUITE: EDGE-TTS PREVIEW + GEMINI QUOTA PIPELINE
===================================================================
Tests all 10 mandatory approval & timing scenarios:
- Test A: New video -> Edge Preview -> 0 Gemini requests
- Test B: Edge Preview -> user says REVISION -> 0 Gemini requests
- Test C: Edge Preview -> user APPROVES -> Gemini pipeline starts
- Test D: Motion-only revision -> reuses Edge audio (0 Edge, 0 Gemini)
- Test E: Script revision -> regenerates Edge audio, 0 Gemini
- Test F: Gemini 3.8 success -> no fallback
- Test G: Gemini 3.8 quota -> 3.8 Lite
- Test H: 3.8 quota -> Lite quota -> 3.1
- Test I: All Gemini models quota exhausted -> STOP
- Test J: Edge Preview -> Gemini final has different duration -> timing recalibrated

CRITICAL INVARIANT: ZERO REAL NETWORK CALLS. ZERO QUOTA CONSUMPTION.
"""

import os
import sys
import json
import base64
import wave
import unittest
from pathlib import Path
from unittest.mock import patch

# Add repository root to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

from scripts.cinematic_audio_pipeline import (
    CinematicAudioPipeline,
    PipelineState,
    PipelineApprovalError,
)
from scripts.synthesize_gemini_tts import GeminiTTSQuotaError


def make_mock_wav_file(path: Path, sample_rate: int = 24000, duration_sec: float = 1.0):
    path.parent.mkdir(parents=True, exist_ok=True)
    n_frames = int(sample_rate * duration_sec)
    pcm = b"\x00\x00" * n_frames
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(pcm)


def make_mock_gemini_audio_response(sample_rate: int = 24000, duration_sec: float = 1.0):
    n_frames = int(sample_rate * duration_sec)
    pcm_bytes = b"\x00\x00" * n_frames
    b64_audio = base64.b64encode(pcm_bytes).decode("ascii")
    payload = {
        "candidates": [
            {
                "content": {
                    "parts": [
                        {
                            "inlineData": {
                                "mimeType": f"audio/pcm;rate={sample_rate}",
                                "data": b64_audio
                            }
                        }
                    ]
                }
            }
        ]
    }
    return json.dumps(payload).encode("utf-8")


class TestEdgePreviewAndGeminiPipeline(unittest.TestCase):

    def setUp(self):
        import shutil
        os.environ["GEMINI_API_KEY"] = "DUMMY_MOCK_KEY"
        self.tmp_edge_dir = Path("audio/cache/test_edge_preview")
        self.tmp_gemini_dir = Path("audio/cache/test_gemini_final")
        self.tmp_edge_cache = Path("audio/cache/test_edge_isolated_cache")
        if self.tmp_edge_cache.exists():
            shutil.rmtree(self.tmp_edge_cache, ignore_errors=True)
        self.tmp_edge_dir.mkdir(parents=True, exist_ok=True)
        self.tmp_gemini_dir.mkdir(parents=True, exist_ok=True)
        self.tmp_edge_cache.mkdir(parents=True, exist_ok=True)

    def test_A_new_video_edge_preview_zero_gemini(self):
        """Test A: New video generates Edge Preview with exactly 0 Gemini requests."""
        pipeline = CinematicAudioPipeline(
            video_id="test_A",
            script_text="متن تستی سناریوی الف",
            gemini_voice="Puck"
        )

        def mock_edge(text, voice, out_path):
            make_mock_wav_file(out_path, duration_sec=12.0)

        preview_res = pipeline.generate_edge_preview(
            output_dir=self.tmp_edge_dir,
            mock_transport=mock_edge
        )

        self.assertEqual(pipeline.state, PipelineState.WAITING_USER_APPROVAL)
        self.assertEqual(preview_res["gemini_requests_sent"], 0)
        self.assertEqual(pipeline.gemini_requests_sent, 0)
        self.assertFalse(pipeline.user_approved_preview)
        self.assertEqual(preview_res["preview_duration"], 12.0)

    def test_B_edge_preview_user_says_revision_zero_gemini(self):
        """Test B: Edge Preview -> user says REVISION -> exactly 0 Gemini requests."""
        pipeline = CinematicAudioPipeline(
            video_id="test_B",
            script_text="متن تستی سناریوی ب",
            gemini_voice="Callirrhoe"
        )
        pipeline.generate_edge_preview(
            output_dir=self.tmp_edge_dir,
            mock_transport=lambda t, v, p: make_mock_wav_file(p, duration_sec=10.0)
        )

        review = pipeline.submit_user_review(decision="موشن کم است و ترنزیشن کند است")

        self.assertEqual(review["decision"], "REVISION")
        self.assertEqual(pipeline.state, PipelineState.REVISION)
        self.assertEqual(pipeline.gemini_requests_sent, 0)
        self.assertFalse(pipeline.user_approved_preview)

        # Confirm that calling Gemini throws PipelineApprovalError
        with self.assertRaises(PipelineApprovalError):
            pipeline.execute_gemini_final()

    def test_C_edge_preview_user_approves_gemini_starts(self):
        """Test C: Edge Preview -> user APPROVES -> Gemini pipeline unlocks and runs."""
        pipeline = CinematicAudioPipeline(
            video_id="test_C",
            script_text="متن تستی سناریوی ج برای تایید",
            gemini_voice="Puck"
        )
        pipeline.generate_edge_preview(
            output_dir=self.tmp_edge_dir,
            mock_transport=lambda t, v, p: make_mock_wav_file(p, duration_sec=15.0)
        )

        review = pipeline.submit_user_review(decision="تأیید، عالیه برو برای Gemini")
        self.assertEqual(review["decision"], "APPROVE")
        self.assertTrue(pipeline.user_approved_preview)

        def mock_gemini(model, url, headers, payload):
            return (200, make_mock_gemini_audio_response(duration_sec=14.0), "OK")

        final_res = pipeline.execute_gemini_final(
            output_dir=self.tmp_gemini_dir,
            mock_gemini_transport=mock_gemini,
            force_fresh=True
        )

        self.assertEqual(final_res["state"], PipelineState.DONE.value)
        self.assertEqual(final_res["actual_model"], "gemini-3.8-flash-tts")
        self.assertEqual(pipeline.gemini_requests_sent, 1)

    def test_D_motion_only_revision_reuses_edge_audio(self):
        """Test D: Motion-only revision reuses Edge audio (0 new TTS calls, 0 Gemini calls)."""
        pipeline = CinematicAudioPipeline(
            video_id="test_D",
            script_text="متن تستی سناریوی د بدون تغییر متن",
            gemini_voice="Puck"
        )
        edge_calls = 0
        def mock_edge(t, v, p):
            nonlocal edge_calls
            edge_calls += 1
            make_mock_wav_file(p, duration_sec=8.0)

        pipeline.generate_edge_preview(
            output_dir=self.tmp_edge_dir,
            cache_dir=self.tmp_edge_cache,
            mock_transport=mock_edge
        )
        self.assertEqual(edge_calls, 1)

        # User wants motion change only
        pipeline.submit_user_review(decision="دوربین سریع‌تر شود")

        # Second preview run with motion_only_revision=True
        res2 = pipeline.generate_edge_preview(
            motion_only_revision=True,
            output_dir=self.tmp_edge_dir,
            cache_dir=self.tmp_edge_cache,
            mock_transport=mock_edge
        )

        # Edge TTS must NOT be called again; reused cached audio
        self.assertEqual(edge_calls, 1)
        self.assertTrue(res2["motion_only_reuse"])
        self.assertEqual(pipeline.gemini_requests_sent, 0)

    def test_E_script_revision_regenerates_edge_audio(self):
        """Test E: Script revision regenerates Edge audio, 0 Gemini requests."""
        pipeline = CinematicAudioPipeline(
            video_id="test_E",
            script_text="متن اولیه سناریوی ه",
            gemini_voice="Callirrhoe"
        )
        edge_calls = 0
        def mock_edge(t, v, p):
            nonlocal edge_calls
            edge_calls += 1
            make_mock_wav_file(p, duration_sec=7.0)

        pipeline.generate_edge_preview(
            output_dir=self.tmp_edge_dir,
            cache_dir=self.tmp_edge_cache,
            mock_transport=mock_edge
        )
        self.assertEqual(edge_calls, 1)

        # User changes script
        review = pipeline.submit_user_review(decision="متن را عوض کن", new_script="متن جدید کاملاً بازنویسی‌شده سناریوی ه")
        self.assertTrue(review["script_changed"])

        pipeline.generate_edge_preview(
            output_dir=self.tmp_edge_dir,
            cache_dir=self.tmp_edge_cache,
            mock_transport=mock_edge
        )
        self.assertEqual(edge_calls, 2)
        self.assertEqual(pipeline.gemini_requests_sent, 0)

    def test_F_gemini_3_8_success_no_fallback(self):
        """Test F: Upon approval, Gemini 3.8 succeeds -> 0 fallbacks."""
        pipeline = CinematicAudioPipeline(video_id="test_F", script_text="متن تست واو", gemini_voice="Puck")
        pipeline.generate_edge_preview(
            output_dir=self.tmp_edge_dir,
            mock_transport=lambda t, v, p: make_mock_wav_file(p, duration_sec=5.0)
        )
        pipeline.submit_user_review(decision="APPROVED")

        models_called = []
        def mock_gemini(model, url, headers, payload):
            models_called.append(model)
            return (200, make_mock_gemini_audio_response(duration_sec=5.2), "OK")

        res = pipeline.execute_gemini_final(
            output_dir=self.tmp_gemini_dir,
            mock_gemini_transport=mock_gemini,
            force_fresh=True
        )

        self.assertEqual(models_called, ["gemini-3.8-flash-tts"])
        self.assertEqual(res["actual_model"], "gemini-3.8-flash-tts")
        self.assertFalse(res["fallback_used"])

    def test_G_gemini_3_8_quota_fallback_to_3_8_lite(self):
        """Test G: Gemini 3.8 hits 429 quota -> falls back to 3.8 Lite."""
        pipeline = CinematicAudioPipeline(video_id="test_G", script_text="متن تست ز", gemini_voice="Callirrhoe")
        pipeline.generate_edge_preview(
            output_dir=self.tmp_edge_dir,
            mock_transport=lambda t, v, p: make_mock_wav_file(p, duration_sec=6.0)
        )
        pipeline.submit_user_review(decision="تایید")

        models_called = []
        def mock_gemini(model, url, headers, payload):
            models_called.append(model)
            if model == "gemini-3.8-flash-tts":
                return (429, b'{"error": {"code": 429, "status": "RESOURCE_EXHAUSTED"}}', "RESOURCE_EXHAUSTED")
            elif model == "gemini-3.8-flash-lite-tts":
                return (200, make_mock_gemini_audio_response(duration_sec=6.1), "OK")
            return (500, b"Err", "Err")

        res = pipeline.execute_gemini_final(
            output_dir=self.tmp_gemini_dir,
            mock_gemini_transport=mock_gemini,
            force_fresh=True
        )

        self.assertEqual(models_called, ["gemini-3.8-flash-tts", "gemini-3.8-flash-lite-tts"])
        self.assertEqual(res["actual_model"], "gemini-3.8-flash-lite-tts")
        self.assertTrue(res["fallback_used"])

    def test_H_gemini_3_8_and_lite_quota_fallback_to_3_1(self):
        """Test H: 3.8 & Lite hit quota -> falls back to 3.1 Flash preview."""
        pipeline = CinematicAudioPipeline(video_id="test_H", script_text="متن تست ح", gemini_voice="Puck")
        pipeline.generate_edge_preview(
            output_dir=self.tmp_edge_dir,
            mock_transport=lambda t, v, p: make_mock_wav_file(p, duration_sec=6.0)
        )
        pipeline.submit_user_review(decision="approved")

        models_called = []
        def mock_gemini(model, url, headers, payload):
            models_called.append(model)
            if model in ["gemini-3.8-flash-tts", "gemini-3.8-flash-lite-tts"]:
                return (429, b'{"error": {"code": 429, "status": "RESOURCE_EXHAUSTED"}}', "RESOURCE_EXHAUSTED")
            elif model == "gemini-3.1-flash-tts-preview":
                return (200, make_mock_gemini_audio_response(duration_sec=5.9), "OK")
            return (500, b"Err", "Err")

        res = pipeline.execute_gemini_final(
            output_dir=self.tmp_gemini_dir,
            mock_gemini_transport=mock_gemini,
            force_fresh=True
        )

        self.assertEqual(models_called, [
            "gemini-3.8-flash-tts",
            "gemini-3.8-flash-lite-tts",
            "gemini-3.1-flash-tts-preview"
        ])
        self.assertEqual(res["actual_model"], "gemini-3.1-flash-tts-preview")
        self.assertTrue(res["fallback_used"])

    def test_I_all_gemini_models_quota_exhausted_stop(self):
        """Test I: All Gemini models hit quota -> system halts and raises GeminiTTSQuotaError."""
        pipeline = CinematicAudioPipeline(video_id="test_I", script_text="متن تست ط", gemini_voice="Puck")
        pipeline.generate_edge_preview(
            output_dir=self.tmp_edge_dir,
            mock_transport=lambda t, v, p: make_mock_wav_file(p, duration_sec=6.0)
        )
        pipeline.submit_user_review(decision="تأیید")

        def mock_gemini(model, url, headers, payload):
            return (429, b'{"error": {"code": 429, "status": "RESOURCE_EXHAUSTED"}}', "RESOURCE_EXHAUSTED")

        with self.assertRaises(GeminiTTSQuotaError):
            pipeline.execute_gemini_final(
                output_dir=self.tmp_gemini_dir,
                mock_gemini_transport=mock_gemini,
                force_fresh=True
            )

    def test_J_timing_recalibration_from_gemini_duration(self):
        """Test J: Edge Preview vs Gemini actual duration difference triggers recalibration."""
        pipeline = CinematicAudioPipeline(
            video_id="test_J",
            script_text="متن تست ی برای تنظیم مجدد زمان",
            gemini_voice="Puck",
            fps=30
        )
        # Edge preview duration = 20.0s (600 frames)
        pipeline.generate_edge_preview(
            output_dir=self.tmp_edge_dir,
            mock_transport=lambda t, v, p: make_mock_wav_file(p, duration_sec=20.0)
        )
        self.assertEqual(pipeline.timing_map["total_frames"], 600)
        self.assertFalse(pipeline.timing_map["is_final"])

        pipeline.submit_user_review(decision="تایید")

        # Gemini actual duration = 18.2s (546 frames)
        def mock_gemini(model, url, headers, payload):
            return (200, make_mock_gemini_audio_response(duration_sec=18.2), "OK")

        res = pipeline.execute_gemini_final(
            output_dir=self.tmp_gemini_dir,
            mock_gemini_transport=mock_gemini,
            force_fresh=True
        )

        # Gemini audio is the absolute source of truth
        self.assertEqual(res["gemini_final_duration"], 18.2)
        self.assertEqual(res["edge_preview_duration"], 20.0)
        self.assertEqual(res["duration_delta"], -1.8)
        self.assertEqual(res["timing_map"]["total_frames"], 546)
        self.assertTrue(res["timing_map"]["is_final"])


if __name__ == "__main__":
    unittest.main()
