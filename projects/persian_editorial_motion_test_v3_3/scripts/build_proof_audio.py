"""
Build Synchronized Audio for 24-second Proof of Motion (v3.3)
Duration: 24.0s = 720 frames @ 30 FPS
Tracks:
1. Calibrated Narration (Opening -> Question -> Regulation -> Condition 1 & Threshold)
2. Institutional Science Score (ducked -15 dB)
3. Event-Driven Kinetic SFX (Line draw, Node morph, Threshold chime)
"""

import sys
from pathlib import Path
from pydub import AudioSegment

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def build_proof_audio():
    audio_dir = Path("projects/persian_editorial_motion_test_v3_3/audio")
    bench_dir = audio_dir / "benchmark"
    public_audio = Path("public/audio")
    public_audio.mkdir(parents=True, exist_ok=True)
    
    total_duration_ms = 24000 # 24.0s
    
    # Load voice segments
    s1 = AudioSegment.from_file(str(bench_dir / "sample_01_institution.mp3")) # ~9.2s
    s2 = AudioSegment.from_file(str(bench_dir / "sample_02_question.mp3")) # ~7.1s
    s4 = AudioSegment.from_file(str(bench_dir / "sample_04_condition1.mp3")) # ~5.5s
    
    # We craft a concise 24s voiceover track tailored to the proof:
    # 0s - 7.5s: Opening institutional presentation
    # 8.0s - 15.0s: The Question (Researcher vs Technologist)
    # 15.5s - 23.5s: Condition 1 (GPA 16 threshold)
    voice_track = AudioSegment.silent(duration=total_duration_ms)
    voice_track = voice_track.overlay(s1[:7500].fade_out(250), position=300)
    voice_track = voice_track.overlay(s2[:7200].fade_out(250), position=8000)
    voice_track = voice_track.overlay(s4[:7500].fade_out(250), position=15600)
    
    # Load Music from v3.2 and trim to 24s
    music_src = Path("projects/persian_editorial_stress_test/audio/institutional_science_pulse.wav")
    music = AudioSegment.from_file(str(music_src))[:total_duration_ms]
    
    # Dynamic Ducking: -15 dB under voice, smooth 200ms fades
    ducked_music = music - 15
    
    # SFX
    sfx_dir = Path("public/sfx")
    whoosh = AudioSegment.from_file(str(sfx_dir / "whoosh-fast.mp3")) - 8
    soft_trans = AudioSegment.from_file(str(sfx_dir / "transition-soft.mp3")) - 6
    impact = AudioSegment.from_file(str(sfx_dir / "bass-hit-futuristic.mp3")) - 8
    
    sfx_track = AudioSegment.silent(duration=total_duration_ms)
    # Event 1: Initial vector line draw whoosh at 600ms
    sfx_track = sfx_track.overlay(whoosh, position=500)
    # Event 2: Line split & morph at 5000ms (150 frames)
    sfx_track = sfx_track.overlay(soft_trans, position=4900)
    # Event 3: Seal lock at 8000ms (240 frames)
    sfx_track = sfx_track.overlay(soft_trans, position=7900)
    # Event 4: Unfold into threshold line at 15000ms (450 frames)
    sfx_track = sfx_track.overlay(whoosh, position=14900)
    # Event 5: Number 16 lock & threshold impact at 18000ms (540 frames)
    sfx_track = sfx_track.overlay(impact, position=18000)
    
    master = ducked_music.overlay(sfx_track).overlay(voice_track)
    
    proof_wav = audio_dir / "proof_audio.wav"
    proof_mp3 = public_audio / "persian_proof_audio.mp3"
    
    master.export(str(proof_wav), format="wav")
    master.export(str(proof_mp3), format="mp3")
    print(f"Proof audio rendered: {proof_mp3} ({len(master)}ms)")

if __name__ == "__main__":
    build_proof_audio()
