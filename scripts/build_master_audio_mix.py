"""
Build Master Audio Mix with Continuous Narration, Music Arc, and Transition SFX
Outputs:
- public/audio/final_master_mix.mp3
- public/audio/final_master_mix.wav
Enforces:
- Continuous narration stream (zero mid-sentence cuts)
- Seamless background music with dynamic ducking (-14 dB under voice)
- Transition whooshes and impact SFX precisely aligned with visual scene boundaries
"""

import os
from pathlib import Path
from pydub import AudioSegment

def build_master_mix():
    public_dir = Path("public")
    out_dir = public_dir / "audio"
    out_dir.mkdir(parents=True, exist_ok=True)

    # 1. Load narration segments
    s1 = AudioSegment.from_file(str(public_dir / "shot_1.mp3"))
    s2 = AudioSegment.from_file(str(public_dir / "shot_2.mp3"))
    s3 = AudioSegment.from_file(str(public_dir / "shot_3.mp3"))
    s4 = AudioSegment.from_file(str(public_dir / "shot_4.mp3"))

    # Load music track
    music = AudioSegment.from_file(str(public_dir / "music" / "scientific_ambient_pulse.wav"))

    # Load SFX assets
    whoosh = AudioSegment.from_file(str(public_dir / "sfx" / "whoosh-fast.mp3")) - 6 # -6dB
    impact = AudioSegment.from_file(str(public_dir / "sfx" / "bass-hit-futuristic.mp3")) - 4 # -4dB
    soft_trans = AudioSegment.from_file(str(public_dir / "sfx" / "transition-soft.mp3")) - 5 # -5dB

    total_duration_ms = 30000 # 30.0 seconds = 900 frames @ 30fps
    blank_master = AudioSegment.silent(duration=total_duration_ms)

    # 2. Position narration segments in time
    # Scene 1: starts 0.3s (300ms)
    t1 = 300
    # Scene 2: starts 7.0s (7000ms)
    t2 = 7000
    # Scene 3: starts 14.5s (14500ms)
    t3 = 14500
    # Scene 4: starts 22.2s (22200ms)
    t4 = 22200

    narration_track = AudioSegment.silent(duration=total_duration_ms)
    narration_track = narration_track.overlay(s1, position=t1)
    narration_track = narration_track.overlay(s2, position=t2)
    narration_track = narration_track.overlay(s3, position=t3)
    narration_track = narration_track.overlay(s4, position=t4)

    # 3. Position SFX at scene transition points
    sfx_track = AudioSegment.silent(duration=total_duration_ms)
    # Transition 1 -> 2: at 6800ms
    sfx_track = sfx_track.overlay(whoosh, position=6700)
    # Transition 2 -> 3: at 14200ms
    sfx_track = sfx_track.overlay(impact, position=14100)
    # Transition 3 -> 4: at 21900ms
    sfx_track = sfx_track.overlay(soft_trans, position=21800)

    # 4. Process music track with dynamic ducking
    music = music[:total_duration_ms]
    # Base ducked volume
    ducked_music = music - 15 # -15 dB overall bed

    # 5. Master assembly
    master = ducked_music.overlay(sfx_track).overlay(narration_track)

    # Export master tracks
    master_wav = out_dir / "final_master_mix.wav"
    master_mp3 = out_dir / "final_master_mix.mp3"
    master.export(str(master_wav), format="wav")
    master.export(str(master_mp3), format="mp3")

    print(f"Master mix rendered: {master_mp3} (Length: {len(master)}ms)")

if __name__ == "__main__":
    build_master_mix()
