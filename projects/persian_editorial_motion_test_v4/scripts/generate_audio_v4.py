import os
import sys
import math
import struct
import wave
import subprocess

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VOICE_DIR = os.path.join(BASE_DIR, "audio", "voice")
MUSIC_DIR = os.path.join(BASE_DIR, "audio", "music")
SFX_DIR = os.path.join(BASE_DIR, "audio", "sfx")
MIX_DIR = os.path.join(BASE_DIR, "audio", "mix")

os.makedirs(VOICE_DIR, exist_ok=True)
os.makedirs(MUSIC_DIR, exist_ok=True)
os.makedirs(SFX_DIR, exist_ok=True)
os.makedirs(MIX_DIR, exist_ok=True)

SHOTS = {
    "shot_01": {
        "text": "بَر اَساسِ دَستورُالعَمَلِ بَندِ کاف... مادّه‌یِ دو... آیین‌نامه‌یِ اِستِعدادهایِ دِرَخشانِ وِزارَتِ بِهداشت، دَرمان و آموزِشِ پِزِشکی... شَرایِطِ اِنتِخابِ دانش‌جویِ پَژوهِشگَرِ بَرجَستِه، تَعین شُده اَست.",
        "duration": 6.0
    },
    "shot_02": {
        "text": "دانش‌جویانِ مُتِقاضی بایَد حَدِّاَقَلِ اِمتیازِ لازِم را دَر مَقاطِعِ مُختَلِف کَسب کُنَند: شانزَدَه اِمتیاز دَر دُکتِرایِ تَخَصُّصیِ بالینی، شَصت و پَنج اِمتیاز دَر کارشناسیِ اَرشَد، صَد و دَه اِمتیاز دَر دُکتِرایِ تَخَصُّصی، و صَد و سی اِمتیاز دَر رِشته‌هایِ پِزِشکی و دَندان‌پِزِشکی.",
        "duration": 6.0
    },
    "shot_03": {
        "text": "اِمتیازاتِ نَهایی، اَز چَهار مِحوَرِ اَصلی... شامِلِ مَقالّاتِ عِلمی، اِختِراعات، طَرح‌هایِ تَحقیقاتی، و هَمایِش‌هایِ بَین‌ُالمِلَلی مُحاسِبِه می‌گَردَد.",
        "duration": 6.0
    },
    "shot_04": {
        "text": "دَر بَخشِ مَقالّات، شاخِص‌هایِ کِیفی... اَز جُمله مَقالّاتِ نَمایِه شُده دَر وِب آو سایِنس و مَجَلّات با رُتبه‌یِ کیو وان، بالاتَرین ضَریب را دارا می‌باشَند.",
        "duration": 14.0
    },
    "shot_05": {
        "text": "رِعایَتِ کامِلِ کُدهایِ اَخلاق دَر پَژوهِش... و عَدَمِ وُجودِ هَرگونه تَخَلُّفِ عِلمی یا سِرقَتِ اَدَبی، شَرطِ بِدونِ قِید و شَرطِ وُرود به فَرایَندِ داوَری است.",
        "duration": 16.0
    },
    "shot_06": {
        "text": "پَرَوَنده‌ها دَر کُمیته‌یِ تَحقیقاتِ دانش‌جوییِ دانِشگاه بَررِسی... و بَرتَرین رُتبه‌ها جِهَتِ داوَریِ نَهایی به مُعاوِنَتِ تَحقیقات و فَنّاوریِ وِزارَتِ بِهداشت اَرسال می‌شَوَند.",
        "duration": 18.0
    },
    "shot_07": {
        "text": "کُمیته‌یِ تَحقیقات و فَنّاوریِ دانش‌جوییِ دانِشگاهِ عُلومِ پِزِشکیِ بَقیَّةُ الله، عَجَّلَ اللهُ تَعالیٰ فَرَجَهُ الشَّریف... حامیِ پَژوهِشگَران و فَنّاوَرانِ بَرجَسته‌یِ سَلامَتِ کِشوَر.",
        "duration": 17.3
    }
}

SR = 44100

def write_wav(filepath, samples, sample_rate=SR):
    # clamp samples to [-1.0, 1.0]
    with wave.open(filepath, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2) # 16-bit
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
            # if stereo, take average
            if n_channels == 2:
                for i in range(0, count, 2):
                    avg = (unpacked[i] + unpacked[i+1]) / (2.0 * 32768.0)
                    samples.append(avg)
            else:
                for val in unpacked:
                    samples.append(val / 32768.0)
        return samples, framerate

def synthesize_voices():
    print("=== Step 1: Synthesizing Persian Voices (Edge-TTS fa-IR-FaridNeural) ===")
    for shot_id, info in SHOTS.items():
        out_wav = os.path.join(VOICE_DIR, f"{shot_id}.wav")
        tmp_mp3 = os.path.join(VOICE_DIR, f"{shot_id}.mp3")
        
        edge_tts_bin = os.path.join(os.path.dirname(sys.executable), "edge-tts.exe")
        if not os.path.exists(edge_tts_bin):
            cmd = [sys.executable, "-m", "edge_tts"]
        else:
            cmd = [edge_tts_bin]
            
        cmd += [
            "--voice", "fa-IR-FaridNeural",
            "--rate=-4%",
            "--text", info["text"],
            "--write-media", tmp_mp3
        ]
        print(f"Synthesizing {shot_id}...")
        subprocess.run(cmd, check=True)
        
        cmd_ffmpeg = [
            "ffmpeg", "-y", "-i", tmp_mp3,
            "-ar", "44100", "-ac", "1",
            out_wav
        ]
        subprocess.run(cmd_ffmpeg, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        if os.path.exists(tmp_mp3):
            os.remove(tmp_mp3)
        print(f"Generated {out_wav}")

def build_sfx(duration_sec=18.0):
    print("=== Step 2: Synthesizing Foley & Synced SFX Stem ===")
    total_samples = int(duration_sec * SR)
    sfx = [0.0] * total_samples
    
    def add_tone(time_s, freq, dur_s, amp):
        start_idx = int(time_s * SR)
        n = int(dur_s * SR)
        for i in range(n):
            idx = start_idx + i
            if idx >= total_samples:
                break
            t = i / SR
            env = math.exp(-t * (6.0 / dur_s))
            sfx[idx] += amp * math.sin(2.0 * math.pi * freq * t) * env

    def add_click(time_s, amp=0.4):
        start_idx = int(time_s * SR)
        n = int(0.04 * SR)
        for i in range(n):
            idx = start_idx + i
            if idx >= total_samples:
                break
            t = i / SR
            env = math.exp(-t * 200.0)
            sfx[idx] += amp * math.sin(2.0 * math.pi * 1800.0 * t) * env

    def add_whoosh(time_s, dur_s, amp):
        start_idx = int(time_s * SR)
        n = int(dur_s * SR)
        for i in range(n):
            idx = start_idx + i
            if idx >= total_samples:
                break
            t = i / n
            env = math.sin(math.pi * t) ** 2
            # Pseudo noise
            noise = (math.sin(i * 127.1) + math.sin(i * 311.7)) * 0.5
            sfx[idx] += amp * noise * env

    # 1. f15 (0.5s): Gold Crest Chime + Sub drone
    add_tone(0.5, 60, 1.2, 0.35)
    add_tone(0.5, 880, 0.8, 0.2)
    add_tone(0.5, 1320, 0.6, 0.15)

    # 2. f45 (1.5s): Tracking expand pneumatic reveal
    add_whoosh(1.4, 0.5, 0.22)

    # 3. f185 (6.16s): Gauge dial intro mechanical tick
    add_click(6.16, 0.3)

    # 4. f210 (7.0s): Gauge 1 needle snap (16 pts)
    add_click(7.0, 0.4)
    add_tone(7.0, 523.25, 0.4, 0.18)

    # 5. f225 (7.5s): Gauge 2 needle snap (65 pts)
    add_click(7.5, 0.4)
    add_tone(7.5, 659.25, 0.4, 0.18)

    # 6. f240 (8.0s): Gauge 3 needle snap (110 pts)
    add_click(8.0, 0.4)
    add_tone(8.0, 783.99, 0.4, 0.18)

    # 7. f255 (8.5s): Gauge 4 needle snap (130 pts)
    add_click(8.5, 0.5)
    add_tone(8.5, 1046.50, 0.6, 0.25)

    # 8. f365 (12.16s): Line carry shoot across
    add_whoosh(12.16, 0.8, 0.28)

    # 9. f405 (13.5s): Right angle boundary draw
    add_tone(13.5, 1200, 0.2, 0.12)

    # 10. f440 (14.66s): 4 Pillars icon bloom
    add_click(14.66, 0.4)
    add_tone(14.66, 440, 0.8, 0.25)
    add_tone(14.66, 880, 0.6, 0.15)

    out_sfx = os.path.join(SFX_DIR, "sfx_proof.wav")
    write_wav(out_sfx, sfx)
    print(f"Saved SFX stem: {out_sfx}")
    return sfx

def build_music_and_mix(duration_sec=18.0):
    print("=== Step 3: Mixing Audio Stems & Dynamic Ducking ===")
    total_samples = int(duration_sec * SR)
    
    # 1. Base music: Drone + institutional pulse
    base_music = [0.0] * total_samples
    for i in range(total_samples):
        t = i / SR
        drone = 0.15 * math.sin(2 * math.pi * 55 * t) + 0.10 * math.sin(2 * math.pi * 82.4 * t)
        pulse_env = (math.sin(2 * math.pi * 2.0 * t) ** 4)
        pulse = 0.08 * math.sin(2 * math.pi * 220 * t) * pulse_env
        shimmer = 0.04 * math.sin(2 * math.pi * 1760 * t) * (0.5 + 0.5 * math.sin(2 * math.pi * 0.25 * t))
        base_music[i] = drone + pulse + shimmer

    # 2. Voice timeline
    voice_track = [0.0] * total_samples
    voice_timeline = [
        ("shot_01", 0.3),
        ("shot_02", 6.2),
        ("shot_03", 12.3),
    ]
    
    duck_mask = [0.0] * total_samples
    for shot_id, start_time in voice_timeline:
        w_path = os.path.join(VOICE_DIR, f"{shot_id}.wav")
        if os.path.exists(w_path):
            samples, _ = read_wav(w_path)
            start_idx = int(start_time * SR)
            for j, s in enumerate(samples):
                idx = start_idx + j
                if idx < total_samples:
                    voice_track[idx] += s * 0.95
            
            # Ducking window
            pad_before = int(0.3 * SR)
            pad_after = int(0.5 * SR)
            d_start = max(0, start_idx - pad_before)
            d_end = min(total_samples, start_idx + len(samples) + pad_after)
            for k in range(d_start, d_end):
                duck_mask[k] = 1.0

    # 3. Ducked music track
    music_track = [0.0] * total_samples
    for i in range(total_samples):
        # When ducked, gain drops by ~14dB (factor ~0.2)
        duck_factor = 0.2 if duck_mask[i] > 0.5 else 1.0
        music_track[i] = base_music[i] * 0.35 * duck_factor

    # 4. SFX track
    sfx_path = os.path.join(SFX_DIR, "sfx_proof.wav")
    sfx_track, _ = read_wav(sfx_path)

    # 5. Final mix
    final_mix = [0.0] * total_samples
    for i in range(total_samples):
        s_val = sfx_track[i] if i < len(sfx_track) else 0.0
        final_mix[i] = voice_track[i] + music_track[i] + s_val

    # Normalize if peak exceeds 0.95
    max_peak = max(abs(x) for x in final_mix) if final_mix else 1.0
    if max_peak > 0.95:
        norm_factor = 0.95 / max_peak
        final_mix = [x * norm_factor for x in final_mix]

    write_wav(os.path.join(VOICE_DIR, "voice_proof.wav"), voice_track)
    write_wav(os.path.join(MUSIC_DIR, "music_proof.wav"), music_track)
    write_wav(os.path.join(MIX_DIR, "final_mix_proof.wav"), final_mix)
    print("Proof audio stems and final mix generated successfully!")

def build_master_mix(duration_sec=83.333):
    print("=== Step 4: Building Full 83.3s Master Audio Stems ===")
    total_samples = int(duration_sec * SR)
    
    # 1. Base music: Drone + institutional pulse
    base_music = [0.0] * total_samples
    for i in range(total_samples):
        t = i / SR
        drone = 0.15 * math.sin(2 * math.pi * 55 * t) + 0.10 * math.sin(2 * math.pi * 82.4 * t)
        pulse_env = (math.sin(2 * math.pi * 2.0 * t) ** 4)
        pulse = 0.08 * math.sin(2 * math.pi * 220 * t) * pulse_env
        shimmer = 0.04 * math.sin(2 * math.pi * 1760 * t) * (0.5 + 0.5 * math.sin(2 * math.pi * 0.25 * t))
        base_music[i] = drone + pulse + shimmer

    # 2. Master Voice timeline
    voice_track = [0.0] * total_samples
    voice_timeline = [
        ("shot_01", 0.3),
        ("shot_02", 6.2),
        ("shot_03", 12.3),
        ("shot_04", 18.3),
        ("shot_05", 32.3),
        ("shot_06", 48.3),
        ("shot_07", 66.3),
    ]
    
    duck_mask = [0.0] * total_samples
    for shot_id, start_time in voice_timeline:
        w_path = os.path.join(VOICE_DIR, f"{shot_id}.wav")
        if os.path.exists(w_path):
            samples, _ = read_wav(w_path)
            start_idx = int(start_time * SR)
            for j, s in enumerate(samples):
                idx = start_idx + j
                if idx < total_samples:
                    voice_track[idx] += s * 0.95
            
            pad_before = int(0.3 * SR)
            pad_after = int(0.5 * SR)
            d_start = max(0, start_idx - pad_before)
            d_end = min(total_samples, start_idx + len(samples) + pad_after)
            for k in range(d_start, d_end):
                duck_mask[k] = 1.0

    # 3. Ducked music track
    music_track = [0.0] * total_samples
    for i in range(total_samples):
        duck_factor = 0.2 if duck_mask[i] > 0.5 else 1.0
        music_track[i] = base_music[i] * 0.35 * duck_factor

    # 4. Master SFX track
    sfx = [0.0] * total_samples
    def add_hit(time_s, freq, dur_s, amp):
        start_idx = int(time_s * SR)
        n = int(dur_s * SR)
        for i in range(n):
            idx = start_idx + i
            if idx >= total_samples:
                break
            t = i / SR
            env = math.exp(-t * (6.0 / dur_s))
            sfx[idx] += amp * math.sin(2.0 * math.pi * freq * t) * env

    # SFX events across all 7 shots
    # Shot 1
    add_hit(0.5, 60, 1.2, 0.35)
    add_hit(0.5, 880, 0.8, 0.2)
    # Shot 2
    add_hit(7.0, 523.25, 0.4, 0.18)
    add_hit(7.5, 659.25, 0.4, 0.18)
    add_hit(8.0, 783.99, 0.4, 0.18)
    add_hit(8.5, 1046.50, 0.6, 0.25)
    # Shot 3
    add_hit(12.2, 440, 0.6, 0.2)
    add_hit(14.6, 880, 0.6, 0.15)
    # Shot 4 (18-32s)
    add_hit(18.5, 1200, 0.5, 0.15)
    add_hit(24.0, 1500, 0.4, 0.18)
    # Shot 5 (32-48s)
    add_hit(32.5, 400, 0.8, 0.22)
    add_hit(40.0, 600, 0.6, 0.2)
    # Shot 6 (48-66s)
    add_hit(48.5, 700, 0.5, 0.18)
    add_hit(58.0, 880, 0.5, 0.2)
    # Shot 7 (66-83.3s)
    add_hit(66.5, 55, 1.5, 0.4)
    add_hit(66.5, 880, 1.2, 0.3)
    add_hit(78.0, 1046.5, 1.0, 0.25)

    # 5. Final master mix
    final_mix = [0.0] * total_samples
    for i in range(total_samples):
        final_mix[i] = voice_track[i] + music_track[i] + sfx[i]

    max_peak = max(abs(x) for x in final_mix) if final_mix else 1.0
    if max_peak > 0.95:
        norm_factor = 0.95 / max_peak
        final_mix = [x * norm_factor for x in final_mix]

    write_wav(os.path.join(VOICE_DIR, "voice_master.wav"), voice_track)
    write_wav(os.path.join(MUSIC_DIR, "music_master.wav"), music_track)
    write_wav(os.path.join(SFX_DIR, "sfx_master.wav"), sfx)
    write_wav(os.path.join(MIX_DIR, "final_master_mix.wav"), final_mix)
    print("Master audio stems and final mix generated successfully!")

if __name__ == "__main__":
    synthesize_voices()
    build_sfx()
    build_music_and_mix()
    build_master_mix()
