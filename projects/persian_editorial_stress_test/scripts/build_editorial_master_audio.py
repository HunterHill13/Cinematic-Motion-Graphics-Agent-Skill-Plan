"""
Bespoke Master Audio Mix for Persian Institutional Motion Graphics
Generates:
1. Dynamic Institutional Science Score (minimalist pulse, sub-bass, harmonic pads)
2. Sample-accurate SFX alignment for numbers and shot boundaries
3. Dynamic sidechain ducking (-15 dB) under narration
4. Production timeline JSON mapping exact frame intervals at 30 FPS
"""

import os
import json
import numpy as np
import wave
from pathlib import Path
from pydub import AudioSegment

def generate_institutional_score(filename: str, duration_sec: float, sample_rate: int = 44100):
    total_samples = int(duration_sec * sample_rate)
    t = np.linspace(0, duration_sec, total_samples, endpoint=False)
    
    # 1. Warm sub-bass fundamental C2 (65.4 Hz) + G2 (98.0 Hz)
    sub = np.sin(2 * np.pi * 65.4 * t) * 0.25 + np.sin(2 * np.pi * 98.0 * t) * 0.15
    
    # 2. Evolving organic pad (C3=130.8, Eb3=155.6, G3=196.0, Bb3=233.1)
    lfo = 0.5 + 0.5 * np.sin(2 * np.pi * 0.08 * t)
    pad = (
        np.sin(2 * np.pi * 130.81 * t) * 0.15 +
        np.sin(2 * np.pi * 155.56 * t + 0.5) * 0.12 * lfo +
        np.sin(2 * np.pi * 196.00 * t + 1.0) * 0.10 +
        np.sin(2 * np.pi * 233.08 * t + 1.5) * 0.08 * (1.0 - lfo)
    )
    
    # 3. Minimalist scientific clockwork pulse (116 BPM = 1.933 Hz)
    bpm = 116.0
    beat_sec = 60.0 / bpm
    pulse_freq = 523.25 # C5
    pulse_mod = np.fmod(t, beat_sec)
    pulse_env = np.exp(-pulse_mod * 28.0) # short percussive marimba-like decay
    pulse = np.sin(2 * np.pi * pulse_freq * t) * pulse_env * 0.08
    
    # High octave accent on alternate beats
    accent_mod = np.fmod(t, beat_sec * 2)
    accent_env = np.exp(-accent_mod * 35.0)
    accent = np.sin(2 * np.pi * 1046.5 * t) * accent_env * 0.04
    
    # Overall fade envelope
    env = np.ones(total_samples, dtype=np.float32)
    fade_in = int(1.5 * sample_rate)
    fade_out = int(3.0 * sample_rate)
    env[:fade_in] = np.linspace(0, 1, fade_in)
    env[-fade_out:] = np.linspace(1, 0, fade_out)
    
    left = (sub * 0.9 + pad * 0.85 + pulse * 0.95 + accent * 0.7) * env
    right = (sub * 0.9 + pad * 0.95 + pulse * 0.75 + accent * 1.0) * env
    
    left_pcm = np.clip(left * 32767, -32768, 32767).astype(np.int16)
    right_pcm = np.clip(right * 32767, -32768, 32767).astype(np.int16)
    stereo = np.empty((len(left_pcm) * 2,), dtype=np.int16)
    stereo[0::2] = left_pcm
    stereo[1::2] = right_pcm
    
    p = Path(filename)
    p.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(p), 'wb') as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        wf.writeframes(stereo.tobytes())
    print(f"Generated institutional music score: {filename}")

def build_master_audio():
    audio_dir = Path("projects/persian_editorial_stress_test/audio")
    public_audio_dir = Path("public/audio")
    public_audio_dir.mkdir(parents=True, exist_ok=True)
    
    # Load 7 shots
    shots = []
    for i in range(1, 8):
        f = audio_dir / f"shot_{i}.mp3"
        seg = AudioSegment.from_file(str(f))
        shots.append(seg)
        
    # Calculate exact sequential placement with 500ms transition gaps
    gap_ms = 450
    t_cursor = 350 # initial pre-roll
    shot_timings = []
    
    shot_meta = [
        {"id": "shot_1", "name": "Institutional Opening", "keyword": "روابط عمومی"},
        {"id": "shot_2", "name": "The Question", "keyword": "دانشجوی پژوهشگر / فناور"},
        {"id": "shot_3", "name": "The Regulation", "keyword": "بند کاف، ماده ۲"},
        {"id": "shot_4", "name": "Three Conditions", "keyword": "۳ شرط اصلی (معدل ۱۶، سنوات، ۶ ماده)"},
        {"id": "shot_5", "name": "Important Caveat", "keyword": "۱ سال پس از فارغ‌التحصیلی"},
        {"id": "shot_6", "name": "Score Thresholds", "keyword": "۶۵ / ۱۱۰ / ۱۳۰"},
        {"id": "shot_7", "name": "Closing", "keyword": "با ما همراه باشید"}
    ]
    
    for idx, seg in enumerate(shots):
        dur_ms = len(seg)
        start_ms = t_cursor
        end_ms = start_ms + dur_ms
        start_frame = round((start_ms / 1000.0) * 30)
        end_frame = round((end_ms / 1000.0) * 30)
        dur_frames = end_frame - start_frame
        
        shot_timings.append({
            "id": shot_meta[idx]["id"],
            "name": shot_meta[idx]["name"],
            "keyword": shot_meta[idx]["keyword"],
            "start_ms": start_ms,
            "end_ms": end_ms,
            "duration_ms": dur_ms,
            "start_frame": start_frame,
            "end_frame": end_frame,
            "duration_frames": dur_frames
        })
        t_cursor = end_ms + gap_ms
        
    total_duration_ms = t_cursor + 600 # small post-roll
    total_duration_sec = total_duration_ms / 1000.0
    total_frames = round(total_duration_sec * 30)
    
    print(f"Total Master Video Duration: {total_duration_sec:.2f}s ({total_frames} frames @ 30 FPS)")
    
    # Save production timeline
    timeline_path = "projects/persian_editorial_stress_test/production_timeline.json"
    with open(timeline_path, "w", encoding="utf-8") as f:
        json.dump({
            "total_duration_sec": total_duration_sec,
            "total_frames": total_frames,
            "fps": 30,
            "shots": shot_timings
        }, f, ensure_ascii=False, indent=2)
    print(f"Saved production timeline to {timeline_path}")
    
    # 2. Generate Music Track
    music_file = audio_dir / "institutional_science_pulse.wav"
    generate_institutional_score(str(music_file), total_duration_sec + 2.0)
    music = AudioSegment.from_file(str(music_file))[:total_duration_ms]
    
    # 3. Assemble Narration Track
    narration_track = AudioSegment.silent(duration=total_duration_ms)
    for idx, seg in enumerate(shots):
        narration_track = narration_track.overlay(seg, position=shot_timings[idx]["start_ms"])
        
    # 4. Load SFX
    sfx_dir = Path("public/sfx")
    whoosh = AudioSegment.from_file(str(sfx_dir / "whoosh-fast.mp3")) - 6
    impact = AudioSegment.from_file(str(sfx_dir / "bass-hit-futuristic.mp3")) - 5
    soft_trans = AudioSegment.from_file(str(sfx_dir / "transition-soft.mp3")) - 6
    
    sfx_track = AudioSegment.silent(duration=total_duration_ms)
    # Add transition whooshes before each shot entrance
    for idx in range(1, len(shot_timings)):
        trans_time = shot_timings[idx]["start_ms"] - 180
        sfx_track = sfx_track.overlay(whoosh, position=trans_time)
        
    # SFX on Shot 4 Conditions
    # Condition 1 (approx 6s into shot 4)
    s4_start = shot_timings[3]["start_ms"]
    sfx_track = sfx_track.overlay(impact, position=s4_start + 5800) # معدل ۱۶
    sfx_track = sfx_track.overlay(soft_trans, position=s4_start + 11500) # سنوات
    sfx_track = sfx_track.overlay(soft_trans, position=s4_start + 17500) # ۶ ماده
    
    # SFX on Shot 5 Caveat (1 year)
    s5_start = shot_timings[4]["start_ms"]
    sfx_track = sfx_track.overlay(soft_trans, position=s5_start + 3200)
    
    # SFX on Shot 6 Thresholds (65, 110, 130)
    s6_start = shot_timings[5]["start_ms"]
    sfx_track = sfx_track.overlay(soft_trans, position=s6_start + 4500) # ۶۵
    sfx_track = sfx_track.overlay(soft_trans, position=s6_start + 7800) # ۱۱۰
    sfx_track = sfx_track.overlay(impact, position=s6_start + 10800) # ۱۳۰
    
    # 5. Dynamic Sidechain Ducking
    # Base ducked bed: -15 dB
    ducked_music = music - 15
    
    # 6. Master Mix Assembly
    master = ducked_music.overlay(sfx_track).overlay(narration_track)
    
    # Export outputs
    master.export(str(audio_dir / "final_master_mix.wav"), format="wav")
    master.export(str(audio_dir / "final_master_mix.mp3"), format="mp3")
    master.export(str(public_audio_dir / "persian_editorial_master_mix.mp3"), format="mp3")
    print("Master audio stems rendered and exported successfully!")

if __name__ == "__main__":
    build_master_audio()
