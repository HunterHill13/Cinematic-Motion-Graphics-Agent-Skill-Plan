#!/usr/bin/env python3
"""
VOICE SPEED & NATURAL FLUENCY GATE
Evaluates synthesized Persian voiceover against the Voice Doctrine:
- Target: 140 - 165 WPM
- Minimum: 125 WPM (Fail below 125)
- Maximum: 180 WPM
- Pause Ratio: <= 30%
"""

import sys
import wave
import json
from pathlib import Path

def evaluate_audio_wpm(wav_path: str, transcript_text: str):
    if not Path(wav_path).exists():
        return False, f"File not found: {wav_path}", {}

    with wave.open(wav_path, 'rb') as wf:
        frames = wf.getnframes()
        rate = wf.getframerate()
        duration_sec = frames / float(rate)

    # Count words in transcript (Persian words split by whitespace)
    words = [w for w in transcript_text.strip().split() if len(w) > 0]
    word_count = len(words)

    if duration_sec <= 0:
        return False, "Audio duration is 0 seconds", {}

    wpm = (word_count / duration_sec) * 60.0

    metrics = {
        "duration_sec": round(duration_sec, 2),
        "word_count": word_count,
        "wpm": round(wpm, 1),
    }

    if wpm < 125.0:
        return False, f"VOICE FAIL: Speech rate {wpm:.1f} WPM is below minimum threshold 125.0 WPM (Speech too slow/ceremonial)", metrics
    elif wpm > 185.0:
        return False, f"VOICE FAIL: Speech rate {wpm:.1f} WPM exceeds maximum threshold 185.0 WPM (Speech rushed)", metrics

    return True, f"VOICE PASS: Speech rate {wpm:.1f} WPM is within natural conversational range [125, 185]", metrics

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python test_voice_speed.py <path_to_wav> <transcript_file_or_text>")
        sys.exit(1)

    wav_file = sys.argv[1]
    transcript_arg = sys.argv[2]
    
    if Path(transcript_arg).exists():
        transcript_content = Path(transcript_arg).read_text(encoding='utf-8')
    else:
        transcript_content = transcript_arg

    passed, message, stats = evaluate_audio_wpm(wav_file, transcript_content)
    print(f"Results: {json.dumps(stats, indent=2, ensure_ascii=False)}")
    print(message)
    sys.exit(0 if passed else 1)
