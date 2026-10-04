import os
import math
import struct
import wave
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(BASE_DIR, "audio")
MASTERED_DIR = os.path.join(AUDIO_DIR, "mastered")
MUSIC_DIR = os.path.join(AUDIO_DIR, "music")
SFX_DIR = os.path.join(AUDIO_DIR, "sfx")
MIX_DIR = os.path.join(AUDIO_DIR, "mix")
MANIFEST_PATH = os.path.join(AUDIO_DIR, "audio_manifest.json")

SR = 44100
FPS = 30.0
TOTAL_FRAMES = 2500
TOTAL_SECONDS = TOTAL_FRAMES / FPS
TOTAL_SAMPLES = int(TOTAL_SECONDS * SR)

def write_wav(filepath, samples, sample_rate=SR):
    with wave.open(filepath, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        raw_data = bytearray()
        for s in samples:
            clamped = max(-1.0, min(1.0, s))
            int_val = int(clamped * 32767.0)
            raw_data.extend(struct.pack('<h', int_val))
        wf.writeframes(raw_data)

def read_wav(filepath):
    with wave.open(filepath, 'r') as wf:
        n_channels = wf.getnchannels()
        sampwidth = wf.getsampwidth()
        framerate = wf.getframerate()
        n_frames = wf.getnframes()
        raw = wf.readframes(n_frames)
        samples = []
        if sampwidth == 2:
            count = len(raw) // 2
            unpacked = struct.unpack(f'<{count}h', raw)
            if n_channels == 2:
                for i in range(0, count, 2):
                    avg = (unpacked[i] + unpacked[i+1]) / (2.0 * 32768.0)
                    samples.append(avg)
            else:
                for val in unpacked:
                    samples.append(val / 32768.0)
        return samples, framerate

def build_full_mix():
    print("=== Building V5.1 Full Audio Stem Mix with Strict Manifest Mapping ===")
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    # 1. Assemble Voice Track strictly from manifest
    voice_track = [0.0] * TOTAL_SAMPLES
    duck_mask = [0.0] * TOTAL_SAMPLES

    for seg in manifest["segments"]:
        start_frame = seg["start_frame"]
        start_time_s = start_frame / FPS
        start_idx = int(start_time_s * SR)
        
        wav_path = os.path.join(MASTERED_DIR, f"{seg['id']}.wav")
        samples, _ = read_wav(wav_path)
        
        for i, s in enumerate(samples):
            idx = start_idx + i
            if idx < TOTAL_SAMPLES:
                voice_track[idx] += s

        # Ducking window: 12f attack, 18f release
        pad_before = int((12.0 / FPS) * SR)
        pad_after = int((18.0 / FPS) * SR)
        d_start = max(0, start_idx - pad_before)
        d_end = min(TOTAL_SAMPLES, start_idx + len(samples) + pad_after)
        for k in range(d_start, d_end):
            duck_mask[k] = 1.0

    # 2. Institutional Science Score with -14dB ducking
    base_music = [0.0] * TOTAL_SAMPLES
    music_track = [0.0] * TOTAL_SAMPLES
    for i in range(TOTAL_SAMPLES):
        t = i / SR
        drone = 0.14 * math.sin(2 * math.pi * 55 * t) + 0.09 * math.sin(2 * math.pi * 82.4 * t)
        pulse_env = (math.sin(2 * math.pi * 2.0 * t) ** 4)
        pulse = 0.08 * math.sin(2 * math.pi * 220 * t) * pulse_env
        shimmer = 0.04 * math.sin(2 * math.pi * 1760 * t) * (0.5 + 0.5 * math.sin(2 * math.pi * 0.25 * t))
        base_music[i] = drone + pulse + shimmer
        
        # -14dB reduction during speech (0.2 factor)
        duck_factor = 0.20 if duck_mask[i] > 0.5 else 1.0
        music_track[i] = base_music[i] * 0.35 * duck_factor

    # 3. Foley & Synced SFX Track
    sfx = [0.0] * TOTAL_SAMPLES
    def add_hit(time_s, freq, dur_s, amp):
        start_idx = int(time_s * SR)
        n = int(dur_s * SR)
        for i in range(n):
            idx = start_idx + i
            if idx >= TOTAL_SAMPLES:
                break
            t = i / SR
            env = math.exp(-t * (6.0 / dur_s))
            sfx[idx] += amp * math.sin(2.0 * math.pi * freq * t) * env

    # Synchronized Foley Cues
    add_hit(0.5, 60, 1.2, 0.35)
    add_hit(0.5, 880, 0.8, 0.2)
    add_hit(7.0, 523.25, 0.4, 0.18)
    add_hit(7.5, 659.25, 0.4, 0.18)
    add_hit(8.0, 783.99, 0.4, 0.18)
    add_hit(8.5, 1046.50, 0.6, 0.25)
    add_hit(12.3, 440, 0.6, 0.2)
    add_hit(14.6, 880, 0.6, 0.15)
    add_hit(18.5, 1200, 0.5, 0.15)
    add_hit(32.5, 400, 0.8, 0.22)
    add_hit(48.5, 700, 0.5, 0.18)
    add_hit(66.5, 55, 1.5, 0.4)
    add_hit(66.5, 880, 1.2, 0.3)

    # 4. Master Mix
    final_mix = [0.0] * TOTAL_SAMPLES
    for i in range(TOTAL_SAMPLES):
        final_mix[i] = voice_track[i] + music_track[i] + sfx[i]

    max_peak = max(abs(x) for x in final_mix) if final_mix else 1.0
    if max_peak > 0.95:
        norm = 0.95 / max_peak
        final_mix = [x * norm for x in final_mix]

    write_wav(os.path.join(AUDIO_DIR, "voice_master.wav"), voice_track)
    write_wav(os.path.join(MUSIC_DIR, "music_master.wav"), music_track)
    write_wav(os.path.join(SFX_DIR, "sfx_master.wav"), sfx)
    master_mix_path = os.path.join(MIX_DIR, "final_master_mix.wav")
    write_wav(master_mix_path, final_mix)

    # Copy to public
    public_target = os.path.join(BASE_DIR, "..", "..", "public", "audio", "persian_editorial_v5_1", "final_master_mix.wav")
    write_wav(public_target, final_mix)
    print("V5.1 full master audio mix created and copied to public folder.")

if __name__ == "__main__":
    build_full_mix()
