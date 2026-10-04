import os
import sys
import json
import wave
import subprocess

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(BASE_DIR, "audio")
MASTERED_DIR = os.path.join(AUDIO_DIR, "mastered")
MANIFEST_PATH = os.path.join(AUDIO_DIR, "audio_manifest.json")

FPS = 30.0
TOTAL_FRAMES = 2500

from gemini_tts_provider import SEGMENTS

def get_wav_duration_frames(filepath):
    with wave.open(filepath, 'r') as wf:
        frames = wf.getnframes()
        rate = wf.getframerate()
        duration_sec = frames / float(rate)
        return int(duration_sec * FPS) + 1

def build_manifest_and_validate():
    print("=== Step A7 & A8: Building Audio Manifest & Validating Single Voice Invariant ===")
    
    manifest = {
        "version": "5.1",
        "fps": FPS,
        "total_frames": TOTAL_FRAMES,
        "segments": []
    }
    
    # Timeline occupancy tracker: frame -> count of active narrations
    frame_occupancy = [0] * (TOTAL_FRAMES + 100)
    
    for seg_id, info in SEGMENTS.items():
        mastered_wav = os.path.join(MASTERED_DIR, f"{seg_id}.wav")
        if not os.path.exists(mastered_wav):
            raise FileNotFoundError(f"Mastered audio file missing for {seg_id}: {mastered_wav}")
            
        dur_frames = get_wav_duration_frames(mastered_wav)
        start_f = info["start_frame"]
        end_f = start_f + dur_frames
        
        # Mark occupancy
        for f in range(start_f, end_f):
            if f < len(frame_occupancy):
                frame_occupancy[f] += 1
                
        manifest["segments"].append({
            "id": seg_id,
            "shot": info["shot"],
            "start_frame": start_f,
            "duration_frames": dur_frames,
            "end_frame": end_f,
            "audio_path": f"projects/persian_editorial_motion_test_v5_1/audio/mastered/{seg_id}.wav",
            "public_path": f"audio/persian_editorial_v5_1/{seg_id}.wav",
            "text_display": info["text_display"],
            "text_phonetic": info["text_phonetic"]
        })
        print(f"Segment {seg_id}: start={start_f}, duration={dur_frames}f, end={end_f}")

    # Check SINGLE VOICE INVARIANT (A7)
    violations = []
    for f, count in enumerate(frame_occupancy):
        if count > 1:
            violations.append((f, count))
            
    if violations:
        print("\n" + "!" * 60)
        print("CRITICAL BUILD FAIL: SINGLE VOICE INVARIANT VIOLATED!")
        print(f"Found {len(violations)} frames with active_narration_count > 1.")
        for f, cnt in violations[:5]:
            print(f"Frame {f}: active narrations = {cnt}")
        print("!" * 60 + "\n")
        sys.exit(1)
    else:
        print(">> SINGLE VOICE INVARIANT VERIFIED: active_narration_count <= 1 across all 2500 frames. PASS.")

    # Save manifest
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print(f"Audio manifest written to {MANIFEST_PATH}")
    return manifest

if __name__ == "__main__":
    build_manifest_and_validate()
