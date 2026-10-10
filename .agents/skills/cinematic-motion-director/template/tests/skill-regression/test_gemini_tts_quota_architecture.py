#!/usr/bin/env python3
"""
HERMETIC UNIT TEST SUITE: GEMINI TTS QUOTA-AWARE ARCHITECTURE
=============================================================
CRITICAL INVARIANT: ZERO REAL NETWORK CALLS. ZERO QUOTA CONSUMPTION.
All requests are intercepted via mock transport.
"""

import os
import sys
import json
import base64
import unittest
from pathlib import Path
from unittest.mock import patch

# Add repository root to path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

from scripts.synthesize_gemini_tts import (
    MODEL_PRIORITY,
    ALLOWED_VOICES,
    is_authentic_quota_failure,
    compute_cache_key,
    chunk_long_text_if_needed,
    synthesize_narration,
    GeminiTTSQuotaError,
    GeminiTTSConfigurationError,
    GeminiTTSNonQuotaError,
)

# Helper to create valid mock audio response bytes
def make_mock_gemini_audio_response(sample_rate: int = 24000, duration_samples: int = 24000):
    # 1 second of 16-bit silence
    pcm_bytes = b"\x00\x00" * duration_samples
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


class TestGeminiTTSQuotaArchitecture(unittest.TestCase):

    def setUp(self):
        self.tmp_dir = Path("audio/cache/test_tmp")
        self.tmp_dir.mkdir(parents=True, exist_ok=True)

    def test_01_voice_selection_gate(self):
        """Voice selection must strictly enforce Puck (Male) and Callirrhoe (Female)."""
        self.assertIn("Puck", ALLOWED_VOICES)
        self.assertIn("Callirrhoe", ALLOWED_VOICES)
        self.assertEqual(ALLOWED_VOICES["Puck"]["gender"], "Male")
        self.assertEqual(ALLOWED_VOICES["Callirrhoe"]["gender"], "Female")

        # Invalid voice must fail closed
        with self.assertRaises(GeminiTTSConfigurationError):
            synthesize_narration(
                text="تست",
                voice="UnauthorizedVoice",
                transport=lambda *args: (200, b"{}", "OK")
            )

    def test_02_missing_api_key_fail_closed(self):
        """Missing API key must fail closed without attempting any network requests."""
        with patch.dict(os.environ, {"GEMINI_API_KEY": "", "GOOGLE_API_KEY": ""}):
            transport_called = False
            def mock_transport(*args):
                nonlocal transport_called
                transport_called = True
                return (200, b"{}", "OK")

            with self.assertRaises(GeminiTTSConfigurationError):
                synthesize_narration(text="تست", voice="Puck", transport=mock_transport)
            self.assertFalse(transport_called, "Transport must not be invoked when API key is missing.")

    def test_03_priority_1_success_single_request(self):
        """When Priority 1 succeeds, exactly 1 request is sent and no fallback occurs."""
        calls = []
        def mock_transport(model, url, headers, payload):
            calls.append(model)
            return (200, make_mock_gemini_audio_response(), "OK")

        res = synthesize_narration(
            text="متن تستی برای نریشن کامل ویدیو",
            voice="Puck",
            video_id="test_p1",
            output_dir=self.tmp_dir,
            transport=mock_transport,
            force_fresh=True
        )

        self.assertEqual(len(calls), 1)
        self.assertEqual(calls[0], "gemini-3.8-flash-tts")
        self.assertEqual(res["actual_model"], "gemini-3.8-flash-tts")
        self.assertFalse(res["fallback_used"])
        self.assertEqual(res["request_count"], 1)

    def test_04_priority_1_quota_fallback_to_priority_2(self):
        """When Priority 1 hits quota, system falls back to Priority 2 (gemini-3.8-flash-lite-tts)."""
        calls = []
        def mock_transport(model, url, headers, payload):
            calls.append(model)
            if model == "gemini-3.8-flash-tts":
                # Mock 429 Quota Exhausted
                err_json = json.dumps({
                    "error": {
                        "code": 429,
                        "message": "Resource has been exhausted (e.g. check quota).",
                        "status": "RESOURCE_EXHAUSTED"
                    }
                }).encode("utf-8")
                return (429, err_json, "RESOURCE_EXHAUSTED")
            elif model == "gemini-3.8-flash-lite-tts":
                return (200, make_mock_gemini_audio_response(), "OK")
            return (500, b"Unexpected", "Error")

        res = synthesize_narration(
            text="متن تستی با فال‌بک به ۳.۸ لایت",
            voice="Callirrhoe",
            video_id="test_fallback_p2",
            output_dir=self.tmp_dir,
            transport=mock_transport,
            force_fresh=True
        )

        self.assertEqual(calls, ["gemini-3.8-flash-tts", "gemini-3.8-flash-lite-tts"])
        self.assertEqual(res["actual_model"], "gemini-3.8-flash-lite-tts")
        self.assertTrue(res["fallback_used"])
        self.assertEqual(res["request_count"], 2)

    def test_05_priority_1_and_2_quota_fallback_to_priority_3(self):
        """When Priority 1 and 2 hit quota, system falls back to Priority 3 (gemini-3.1-flash-tts-preview)."""
        calls = []
        def mock_transport(model, url, headers, payload):
            calls.append(model)
            if model in ["gemini-3.8-flash-tts", "gemini-3.8-flash-lite-tts"]:
                err_json = json.dumps({
                    "error": {
                        "code": 429,
                        "message": "Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests",
                        "status": "RESOURCE_EXHAUSTED"
                    }
                }).encode("utf-8")
                return (429, err_json, "RESOURCE_EXHAUSTED")
            elif model == "gemini-3.1-flash-tts-preview":
                return (200, make_mock_gemini_audio_response(), "OK")
            return (500, b"Unexpected", "Error")

        res = synthesize_narration(
            text="متن تستی با فال‌بک نهایی به ۳.۱",
            voice="Puck",
            video_id="test_fallback_p3",
            output_dir=self.tmp_dir,
            transport=mock_transport,
            force_fresh=True
        )

        self.assertEqual(calls, [
            "gemini-3.8-flash-tts",
            "gemini-3.8-flash-lite-tts",
            "gemini-3.1-flash-tts-preview"
        ])
        self.assertEqual(res["actual_model"], "gemini-3.1-flash-tts-preview")
        self.assertTrue(res["fallback_used"])
        self.assertEqual(res["request_count"], 3)

    def test_06_all_models_quota_exhausted_stop(self):
        """When all models hit quota, system immediately stops and raises GeminiTTSQuotaError."""
        calls = []
        def mock_transport(model, url, headers, payload):
            calls.append(model)
            err_json = json.dumps({
                "error": {
                    "code": 429,
                    "message": "Quota limit reached",
                    "status": "RESOURCE_EXHAUSTED"
                }
            }).encode("utf-8")
            return (429, err_json, "RESOURCE_EXHAUSTED")

        with self.assertRaises(GeminiTTSQuotaError):
            synthesize_narration(
                text="متن تستی برای تست توقف کل سهمیه",
                voice="Puck",
                video_id="test_all_exhausted",
                output_dir=self.tmp_dir,
                transport=mock_transport,
                force_fresh=True
            )

        self.assertEqual(len(calls), 3)

    def test_07_non_quota_failure_does_not_trigger_fallback(self):
        """Non-quota errors (e.g. HTTP 400 Bad Request, 401 Unauthorized) MUST NOT trigger fallback."""
        calls = []
        def mock_transport(model, url, headers, payload):
            calls.append(model)
            # HTTP 400 Invalid Schema / bad argument
            return (400, b'{"error": {"code": 400, "message": "Invalid argument"}}', "Bad Request")

        with self.assertRaises(GeminiTTSNonQuotaError):
            synthesize_narration(
                text="متن تستی خطا بدون سهمیه",
                voice="Puck",
                output_dir=self.tmp_dir,
                transport=mock_transport,
                force_fresh=True
            )

        # Only 1 request attempted; no fallback attempted
        self.assertEqual(len(calls), 1)
        self.assertEqual(calls[0], "gemini-3.8-flash-tts")

    def test_08_quota_signature_detector(self):
        """Test the authentic quota failure detector across various Google Cloud signatures."""
        self.assertTrue(is_authentic_quota_failure(429, "Too Many Requests"))
        self.assertTrue(is_authentic_quota_failure(200, "RESOURCE_EXHAUSTED in body"))
        self.assertTrue(is_authentic_quota_failure(503, "GenerateRequestsPerDayPerProjectPerModel-FreeTier"))
        self.assertTrue(is_authentic_quota_failure(200, "quota exceeded for metric"))
        self.assertFalse(is_authentic_quota_failure(401, "Invalid API Key"))
        self.assertFalse(is_authentic_quota_failure(400, "Invalid JSON body format"))
        self.assertFalse(is_authentic_quota_failure(404, "Model not found"))

    def test_09_single_request_doctrine(self):
        """Normal video scripts are NOT chunked and must remain a single request."""
        sample_text = (
            "روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله تقدیم می‌کند. "
            "دستورالعمل بند کاف، آیین‌نامه استعداد درخشان برای دانشجویان برتر کشور است. "
            "شرط اول معدل ۱۶ است و شرط دوم سنوات مجاز تحصیلی."
        )
        chunks = chunk_long_text_if_needed(sample_text)
        self.assertEqual(len(chunks), 1, "Normal scripts must produce exactly 1 chunk.")

    def test_10_long_text_chunking_exception(self):
        """Extremely long text exceeding 4000 characters is cleanly chunked at sentence boundaries."""
        sentence = "این یک جمله استاندارد علمی و طولانی برای تست تقسیم‌بندی است. "
        huge_text = sentence * 120  # ~6800 characters
        chunks = chunk_long_text_if_needed(huge_text, max_chars=4000)
        self.assertGreater(len(chunks), 1)
        for c in chunks:
            self.assertLessEqual(len(c), 4000)


if __name__ == "__main__":
    unittest.main()
