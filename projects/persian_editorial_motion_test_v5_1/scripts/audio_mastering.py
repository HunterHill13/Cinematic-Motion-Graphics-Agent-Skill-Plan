import os
import subprocess
import glob

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(BASE_DIR, "audio")
RAW_DIR = os.path.join(AUDIO_DIR, "raw")
MASTERED_DIR = os.path.join(AUDIO_DIR, "mastered")

os.makedirs(MASTERED_DIR, exist_ok=True)

def master_file(in_wav, out_wav):
    print(f"Mastering: {os.path.basename(in_wav)} -> {os.path.basename(out_wav)}")
    
    # Mastering chain filters (A6 Specification):
    # 1. Trim silence (start and end)
    # 2. EQ (highpass 80Hz + 250Hz warmth + 3.5kHz voice clarity)
    # 3. De-esser (reduce sibilance)
    # 4. Gentle Compression (threshold=-18dB, ratio=2.5, attack=15ms, release=120ms)
    # 5. Loudness normalization (-16 LUFS)
    # 6. Peak Limiter (-1.0 dBFS)
    filter_chain = (
        "silenceremove=start_periods=1:start_duration=0.03:start_threshold=-50dB:stop_periods=1:stop_duration=0.08:stop_threshold=-50dB,"
        "highpass=f=80,"
        "equalizer=f=250:width_type=h:width=120:g=1.2,"
        "equalizer=f=3500:width_type=h:width=800:g=1.8,"
        "deesser=i=0.35:f=0.5:m=0.5,"
        "acompressor=threshold=-18dB:ratio=2.5:attack=15:release=120:makeup=2dB,"
        "loudnorm=I=-16:TP=-1.0:LRA=7,"
        "alimiter=limit=-1.0dB"
    )
    
    cmd = [
        "ffmpeg", "-y",
        "-i", in_wav,
        "-af", filter_chain,
        "-ar", "44100",
        "-ac", "1",
        out_wav
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

def master_all_segments():
    print("=== Step A6: Audio Mastering Pipeline ===")
    raw_files = sorted(glob.glob(os.path.join(RAW_DIR, "segment_*.wav")))
    for r in raw_files:
        base_name = os.path.basename(r)
        out_m = os.path.join(MASTERED_DIR, base_name)
        master_file(r, out_m)
    print(f"Mastered {len(raw_files)} narration segments successfully.")

if __name__ == "__main__":
    master_all_segments()
