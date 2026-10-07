import os
import wave
import struct
import numpy as np
import subprocess
from pathlib import Path

SAMPLE_RATE = 44100
DURATION_SEC = 19.0
TOTAL_SAMPLES = int(DURATION_SEC * SAMPLE_RATE)
t = np.linspace(0, DURATION_SEC, TOTAL_SAMPLES, endpoint=False)

# 1. Synthesize Climax Score with continuous harmonic evolution
f_root = np.where(t < 5.0, 146.83,        # D3 (Intro / Calibration)
         np.where(t < 9.0, 174.61,        # F3 (65 Points)
         np.where(t < 13.5, 196.00,       # G3 (110 Points)
         220.00)))                        # A3 (130 Climax)

f_third = np.where(t < 5.0, 174.61,       # F3
          np.where(t < 9.0, 220.00,       # A3
          np.where(t < 13.5, 233.08,      # Bb3
          277.18)))                       # C#4 (Warm Major resolution)

f_fifth = np.where(t < 5.0, 220.00,       # A3
          np.where(t < 9.0, 261.63,       # C4
          np.where(t < 13.5, 293.66,      # D4
          329.63)))                       # E4

# Foundation Sub-Bass (D1 / D2 / A1)
sub_d = (np.sin(2 * np.pi * (f_root / 4.0) * t) * 0.35 +
         np.sin(2 * np.pi * (f_root / 2.0) * t) * 0.25)

# Cinematic Brass-Pad Chorus
pad = (
    np.sin(2 * np.pi * f_root * t) * 0.18 +
    np.sin(2 * np.pi * (f_root * 1.002) * t + 0.3) * 0.15 +
    np.sin(2 * np.pi * f_third * t + 0.8) * 0.16 +
    np.sin(2 * np.pi * (f_third * 0.998) * t + 1.2) * 0.14 +
    np.sin(2 * np.pi * f_fifth * t + 1.9) * 0.15
)

# Driving Rhythmic Pulse (100 BPM = 1.667 Hz)
bpm = 100.0 / 60.0
pulse_trig = (np.sin(2 * np.pi * bpm * t)) ** 20
pulse_sound = pulse_trig * np.sin(2 * np.pi * 98.0 * t) * 0.22

# Climax Shimmer
shimmer = (np.sin(2 * np.pi * 880.0 * t) * 0.03 + np.sin(2 * np.pi * 1320.0 * t) * 0.02) * (0.7 + 0.3 * np.sin(2 * np.pi * 0.2 * t))

# Master Music Bed
music_raw = (sub_d + pad + pulse_sound + shimmer)
# Fade in (1.0s) & Fade out (1.5s)
fade_in = np.minimum(1.0, t / 1.0)
fade_out = np.minimum(1.0, (DURATION_SEC - t) / 1.5)
music_raw = music_raw * fade_in * fade_out
music_max = np.max(np.abs(music_raw))
if music_max > 0:
    music_raw = music_raw * (0.58 / music_max)

music_wav = Path("projects/v40_audio/climax_music.wav")
with wave.open(str(music_wav), "wb") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(SAMPLE_RATE)
    pcm = np.clip(music_raw * 32767, -32768, 32767).astype(np.int16)
    wf.writeframes(pcm.tobytes())

print("Synthesized climax music bed.")

# 2. Resample and normalize Google voice
voice_in = Path("projects/v40_audio/thresholds_voice.wav")
voice_resampled = Path("projects/v40_audio/voice_resampled.wav")
subprocess.run([
    "ffmpeg", "-y", "-i", str(voice_in),
    "-ar", "44100", "-ac", "1",
    "-af", "loudnorm=I=-16:TP=-1.0:LRA=7",
    str(voice_resampled)
], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

# 3. Locate Physical SFX Assets
sfx_impact_deep = Path("_research/video-shotcraft/assets/audio/sfx/impact/impact-deep-whoosh.mp3")
sfx_slide = Path("_research/video-shotcraft/assets/audio/sfx/transition/transition-tech-slide.mp3")
sfx_mech = Path("_research/video-shotcraft/assets/audio/sfx/mech/mech-tech-movement.mp3")
sfx_lock = Path("_research/video-shotcraft/assets/audio/sfx/mech/gear-lock-metallic.mp3")
sfx_pulse = Path("_research/video-shotcraft/assets/audio/sfx/ui/hitech-touch-magnet.mp3")
sfx_snap = Path("_research/video-shotcraft/assets/audio/sfx/transition/transition-snap.mp3")
sfx_hum = Path("_research/video-shotcraft/assets/audio/sfx/scifi/tech-hum-futuristic.mp3")
sfx_tech_trans = Path("_research/video-shotcraft/assets/audio/sfx/transition/transition-tech.mp3")
sfx_epic = Path("_research/video-shotcraft/assets/audio/sfx/impact/impact-movie-epic.mp3")
sfx_shimmer = Path("_research/video-shotcraft/assets/audio/sfx/light/shimmer-sparkle-sweep.mp3")

# Physical SFX Cue List tied to exact causal milestones:
sfx_cues = [
    (sfx_impact_deep, 0, 0.40),       # F0: Foundation ambience
    (sfx_slide, 2333, 0.35),          # F70: Base bifurcation & rail deployment
    (sfx_mech, 5166, 0.40),           # F155: Plinth 1 launch
    (sfx_lock, 6500, 0.45),           # F195: Plinth 1 lock (65)
    (sfx_pulse, 7333, 0.50),          # F220: Momentum transfer pulse to Plinth 2
    (sfx_snap, 8500, 0.45),           # F255: Plinth 2 fast launch & truss unfolding
    (sfx_lock, 10166, 0.45),          # F305: Plinth 2 lock (110) & redirection
    (sfx_hum, 11833, 0.35),           # F355: Plinth 3 seismic charge
    (sfx_tech_trans, 13166, 0.40),    # F395: Plinth 3 volcanic ascent
    (sfx_epic, 15000, 0.60),          # F450: Plinth 3 monumental impact (130)
    (sfx_shimmer, 16666, 0.30)        # F500: Intentional stillness shimmer
]

sfx_inputs = []
sfx_filters = []
sfx_labels = []

for idx, (path, delay_ms, vol) in enumerate(sfx_cues):
    sfx_inputs.extend(["-i", str(path)])
    in_idx = 2 + idx # 0 is voice, 1 is music
    sfx_filters.append(f"[{in_idx}]volume={vol},adelay={delay_ms}|{delay_ms}[sfx{idx}]")
    sfx_labels.append(f"[sfx{idx}]")

all_sfx_mix = f"{''.join(sfx_labels)}amix=inputs={len(sfx_cues)}:normalize=0[all_sfx]"
full_filter = (
    ";".join(sfx_filters) + ";" +
    all_sfx_mix + ";" +
    "[1]volume=0.20[bgm];" +
    "[bgm][0]sidechaincompress=threshold=0.06:ratio=4.5:attack=40:release=300[ducked_bgm];" +
    "[0]volume=1.0[vo];" +
    "[vo][ducked_bgm][all_sfx]amix=inputs=3:normalize=0,volume=1.15,alimiter=limit=0.95[out]"
)

out_master_wav = Path("projects/v40_audio/v40_preview_master.wav")
out_master_mp3 = Path("projects/v40_audio/v40_preview_master.mp3")

cmd_mix = [
    "ffmpeg", "-y",
    "-i", str(voice_resampled),
    "-i", str(music_wav)
] + sfx_inputs + [
    "-filter_complex", full_filter,
    "-map", "[out]",
    "-t", str(DURATION_SEC),
    "-ar", "44100", "-ac", "2",
    str(out_master_wav)
]

print("Mixing master preview audio with causal SFX...")
subprocess.run(cmd_mix, check=True)

subprocess.run([
    "ffmpeg", "-y", "-i", str(out_master_wav),
    "-b:a", "320k", str(out_master_mp3)
], check=True)

public_audio_dir = Path("public/audio")
public_audio_dir.mkdir(parents=True, exist_ok=True)
dest_mp3 = public_audio_dir / "v40_preview_master.mp3"
subprocess.run(["ffmpeg", "-y", "-i", str(out_master_mp3), str(dest_mp3)], check=True)

print("SUCCESS: v40_preview_master audio regenerated and installed in public/audio/!")
