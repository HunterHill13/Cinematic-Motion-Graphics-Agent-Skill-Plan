"""
Generate dedicated 80-second cinematic documentary background score for V5.3:
Narrative Arc:
Phase 1: (0.0s - 12.0s) Intro & Baqiyatallah Institutional Hook
         Subtle deep drone (D minor / D1-D2), crystal harmonics, breathing analog pad. Atmospheric, dignified.
Phase 2: (12.0s - 21.5s) Directive Framework (Band Kaf)
         Clock pulse enters (90 BPM subtle tick/filter sweep), rhythmic propulsion.
Phase 3: (21.5s - 49.5s) Three Fundamental Conditions
         Evolving harmonic progression (D min -> Bb maj -> C maj -> D min), arpeggiated melodic tension, expanding stereo width.
Phase 4: (49.5s - 57.5s) Time Window Gate
         Ticking clockwork accent, focused minimalist tension.
Phase 5: (57.5s - 72.5s) University Thresholds (Numerical benchmarks)
         Climactic rhythmic & harmonic swell, driving bass, bright shimmer.
Phase 6: (72.5s - 80.0s) Outro Call to Action
         Warm harmonic resolution, dignified fading sub-bass and celestial chord decay.
"""

import numpy as np
import wave
from pathlib import Path

def create_stereo_wav(filename: str, left: np.ndarray, right: np.ndarray, sample_rate: int = 48000):
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
    print(f"Generated soundtrack: {filename} ({len(left)/sample_rate:.2f}s)")

def synthesize_v53_score(duration_sec: float = 80.0, sample_rate: int = 48000):
    total_samples = int(duration_sec * sample_rate)
    t = np.linspace(0, duration_sec, total_samples, endpoint=False)

    # Master envelope: 1.5s fade in, 3.0s fade out at end
    master_env = np.ones(total_samples, dtype=np.float32)
    in_samples = int(1.5 * sample_rate)
    out_samples = int(3.0 * sample_rate)
    master_env[:in_samples] = np.linspace(0, 1, in_samples)
    master_env[-out_samples:] = np.linspace(1, 0, out_samples)

    # 1. Warm Foundation Drone: D1 (36.71 Hz) + D2 (73.42 Hz) + A2 (110.0 Hz)
    sub_d1 = np.sin(2 * np.pi * 36.71 * t) * 0.28
    sub_d2 = np.sin(2 * np.pi * 73.42 * t) * 0.20
    # Breathing fifth
    fifth_lfo = 0.6 + 0.4 * np.sin(2 * np.pi * 0.08 * t)
    sub_a2 = np.sin(2 * np.pi * 110.0 * t) * 0.16 * fifth_lfo
    base_foundation = sub_d1 + sub_d2 + sub_a2

    # 2. Rhythmic Clock Pulse (92 BPM = 1.5333 Hz)
    bpm = 92.0 / 60.0
    pulse_trigger = (np.sin(2 * np.pi * bpm * t)) ** 24  # sharp rhythmic pulse
    # Pulse activates gradually from t=11.5s onwards, softens at outro t=73s
    pulse_envelope = np.where(t < 11.0, 0.0,
                     np.where(t < 14.0, (t - 11.0) / 3.0,
                     np.where(t < 72.0, 1.0, np.maximum(0.0, 1.0 - (t - 72.0) / 3.0))))
    pulse_sound = pulse_trigger * np.sin(2 * np.pi * 146.83 * t) * 0.18 * pulse_envelope

    # 3. Harmonic Pad Chord Evolution:
    # Phase 1 (0-12s): D minor (D3: 146.83, F3: 174.61, A3: 220.00)
    # Phase 2 (12-21.5s): D minor + 9th (E3: 164.81)
    # Phase 3 (21.5-49.5s): Chord shifts (D min -> Bb maj: 116.54, 146.83, 174.61 -> C maj: 130.81, 164.81, 196.00)
    # Phase 4 (49.5-57.5s): Minimalist tension on A3 / D4
    # Phase 5 (57.5-72.5s): Heroic swell D min -> F maj -> G min -> A sus4
    # Phase 6 (72.5-80s): Warm D maj resolution (D3: 146.83, F#3: 185.00, A3: 220.00, D4: 293.66)
    
    # Smooth progression frequencies across time:
    f_root = np.where(t < 22.0, 146.83,
             np.where(t < 35.0, 116.54,
             np.where(t < 50.0, 130.81,
             np.where(t < 72.5, 146.83, 146.83))))
    
    f_third = np.where(t < 22.0, 174.61,
              np.where(t < 35.0, 146.83,
              np.where(t < 50.0, 164.81,
              np.where(t < 72.5, 174.61, 185.00)))) # F# at end for warm major tier
    
    f_fifth = np.where(t < 22.0, 220.00,
              np.where(t < 35.0, 174.61,
              np.where(t < 50.0, 196.00,
              np.where(t < 72.5, 220.00, 220.00))))

    # Gentle chorusing pad synthesis with detuning
    pad_wave = (
        np.sin(2 * np.pi * f_root * t) * 0.16 +
        np.sin(2 * np.pi * (f_root * 1.003) * t + 0.3) * 0.14 +
        np.sin(2 * np.pi * f_third * t + 0.8) * 0.15 +
        np.sin(2 * np.pi * (f_third * 0.997) * t + 1.2) * 0.13 +
        np.sin(2 * np.pi * f_fifth * t + 1.9) * 0.14
    )

    # 4. Arpeggiated Scientific Pluck (16th notes synced to 92 BPM)
    arp_rate = bpm * 4.0 # 16th notes = 6.133 Hz
    arp_step = np.floor(t * arp_rate) % 8
    arp_freqs = np.array([293.66, 349.23, 440.0, 523.25, 587.33, 440.0, 349.23, 293.66])
    arp_note_freq = arp_freqs[arp_step.astype(int)]
    arp_env = (np.sin(2 * np.pi * arp_rate * t % (2 * np.pi)) ** 2) * np.exp(-((t * arp_rate) % 1.0) * 3.5)
    
    # Pluck presence swells during Phase 3 & Phase 5 (the core information delivery)
    pluck_gain = np.where(t < 21.0, 0.0,
                 np.where(t < 49.5, 0.15,
                 np.where(t < 57.5, 0.08,
                 np.where(t < 72.5, 0.22, 0.0))))
    pluck_sound = np.sin(2 * np.pi * arp_note_freq * t) * arp_env * pluck_gain

    # 5. Shimmer and High Texture (Institutional Elegance)
    shimmer = (
        np.sin(2 * np.pi * 880.0 * t) * 0.04 +
        np.sin(2 * np.pi * 1174.66 * t + 0.4) * 0.03 +
        np.sin(2 * np.pi * 1760.0 * t + 0.7) * 0.02
    ) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.12 * t))

    # Combine into stereo channels with phase-spread spatial width
    # Left channel
    left_mix = (
        base_foundation * 0.95 +
        pulse_sound * 0.85 +
        pad_wave * 0.90 +
        pluck_sound * 0.80 +
        shimmer * 1.10
    ) * master_env

    # Right channel
    right_mix = (
        base_foundation * 1.05 +
        pulse_sound * 1.15 +
        pad_wave * 1.10 +
        pluck_sound * 1.20 +
        shimmer * 0.90
    ) * master_env

    # Normalize audio bed to comfortable -6 dB peak before sidechain compression
    max_peak = max(np.max(np.abs(left_mix)), np.max(np.abs(right_mix)))
    if max_peak > 0:
        target_peak = 0.65 # ~ -3.7 dBFS headroom
        left_mix = left_mix * (target_peak / max_peak)
        right_mix = right_mix * (target_peak / max_peak)

    out_path = "projects/persian_editorial_motion_test_v5_3/audio/music/soundtrack_master.wav"
    create_stereo_wav(out_path, left_mix, right_mix, sample_rate)

if __name__ == "__main__":
    synthesize_v53_score()
