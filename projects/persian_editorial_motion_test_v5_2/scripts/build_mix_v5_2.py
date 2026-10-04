"""
Build final mix for V5.2:
- Mastered continuous narration
- Institutional scientific score with -14dB sidechain ducking
- Tactile Foley SFX at narrative transitions
Output:
1. projects/persian_editorial_motion_test_v5_2/audio/mix/final_master_mix.wav
2. public/audio/persian_editorial_v5_2/final_master_mix.wav
"""

import subprocess
import shutil
import os

VOICE_WAV = "projects/persian_editorial_motion_test_v5_2/audio/mastered/mastered_voice.wav"
MUSIC_WAV = "projects/persian_editorial_motion_test_v5_1/audio/music/music_master.wav"
SFX_WAV = "projects/persian_editorial_motion_test_v5_1/audio/sfx/sfx_master.wav"
OUT_MIX = "projects/persian_editorial_motion_test_v5_2/audio/mix/final_master_mix.wav"
PUBLIC_MIX = "public/audio/persian_editorial_v5_2/final_master_mix.wav"

def build_mix():
    # Mix filter graph with automated sidechain ducking (-14dB)
    filter_complex = (
        "[1:a]volume=0.22,aloop=loop=-1:size=2e+09[bg];"
        "[bg][0:a]sidechaincompress=threshold=0.03:ratio=4:attack=50:release=450[ducked_bg];"
        "[0:a][ducked_bg]amix=inputs=2:duration=first:dropout_transition=2[mix0];"
        "[2:a]volume=0.35[sfx];"
        "[mix0][sfx]amix=inputs=2:duration=first[outa]"
    )

    cmd = [
        "ffmpeg", "-y",
        "-i", VOICE_WAV,
        "-i", MUSIC_WAV,
        "-i", SFX_WAV,
        "-filter_complex", filter_complex,
        "-map", "[outa]",
        "-ar", "48000",
        "-ac", "2",
        OUT_MIX
    ]

    print("Building final ducked mix for V5.2...")
    subprocess.run(cmd, check=True)

    # Copy to Remotion public directory
    os.makedirs(os.path.dirname(PUBLIC_MIX), exist_ok=True)
    shutil.copyfile(OUT_MIX, PUBLIC_MIX)
    print(f"SUCCESS: Final mix saved to {OUT_MIX} and {PUBLIC_MIX}")

if __name__ == "__main__":
    build_mix()
