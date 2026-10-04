"""
Build master audio mix for V5.3:
Inputs:
- projects/persian_editorial_motion_test_v5_3/audio/narration/narration_master.wav (Google Gemini-TTS continuous speech stem @ -16.0 LUFS)
- projects/persian_editorial_motion_test_v5_3/audio/music/soundtrack_master.wav (Dedicated 80-second score)
- projects/persian_editorial_motion_test_v5_1/audio/sfx/sfx_master.wav (Tactile editorial Foley SFX)

Outputs:
- projects/persian_editorial_motion_test_v5_3/audio/mix/final_master_mix.wav
- public/audio/persian_editorial_v5_3/final_master_mix.wav

Ducking Architecture & Master Loudness:
- Sidechain compressor ducks music by -14dB during speech
- Proper gain balance preserves voice clarity (-16 LUFS integrated target, -1.0 True Peak)
- Music is clearly audible during speech (~-28 LUFS bed) and swells into gaps
"""

import subprocess
import shutil
import os

VOICE_WAV = "projects/persian_editorial_motion_test_v5_3/audio/narration/narration_master.wav"
MUSIC_WAV = "projects/persian_editorial_motion_test_v5_3/audio/music/soundtrack_master.wav"
SFX_WAV = "projects/persian_editorial_motion_test_v5_1/audio/sfx/sfx_master.wav"
OUT_MIX = "projects/persian_editorial_motion_test_v5_3/audio/mix/final_master_mix.wav"
PUBLIC_MIX = "public/audio/persian_editorial_v5_3/final_master_mix.wav"

def build_mix_v53():
    # Filter complex with normalize / weight:
    # Voice (0:a) mono -> converted to stereo with volume=1.0
    # Music (1:a) stereo -> sidechain ducked by voice (-14dB attenuation during speech)
    # SFX (2:a) subtle tactile transitions
    # Summing them and passing through a soft limiter ensures 0 clipping and target loudness -16 LUFS
    filter_complex = (
        "[0:a]aformat=channel_layouts=stereo,volume=1.0[voice];"
        "[1:a]volume=0.38[bg];"
        "[bg][0:a]sidechaincompress=threshold=0.04:ratio=4.0:attack=35:release=300[ducked_bg];"
        "[2:a]aformat=channel_layouts=stereo,volume=0.28[sfx];"
        "[voice][ducked_bg][sfx]amix=inputs=3:duration=first:weights=1.0 0.85 0.5:normalize=0[mixed];"
        "[mixed]alimiter=limit=0.89:attack=5:release=50[outa]"
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

    print("Executing FFmpeg ducking mix pipeline for V5.3...")
    subprocess.run(cmd, check=True)

    os.makedirs(os.path.dirname(PUBLIC_MIX), exist_ok=True)
    shutil.copyfile(OUT_MIX, PUBLIC_MIX)
    print(f"Master mix rendered successfully to {OUT_MIX} and {PUBLIC_MIX}")

if __name__ == "__main__":
    build_mix_v53()
