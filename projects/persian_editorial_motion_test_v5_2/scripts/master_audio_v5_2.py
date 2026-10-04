"""
Audio Mastering & Loudness Normalization with True-Peak Limiter (-1.0 dBFS).
"""
import subprocess

RAW_WAV = "projects/persian_editorial_motion_test_v5_2/audio/raw/raw_voice.wav"
MASTERED_WAV = "projects/persian_editorial_motion_test_v5_2/audio/mastered/mastered_voice.wav"

def master():
    af = (
        "silenceremove=start_periods=1:start_duration=0.08:start_threshold=-50dB,"
        "areverse,silenceremove=start_periods=1:start_duration=0.08:start_threshold=-50dB,areverse,"
        "highpass=f=80,lowpass=f=12000,"
        "equalizer=f=2800:width_type=q:width=1.5:g=1.2,"
        "deesser=i=0.4:f=0.5:m=0.5,"
        "acompressor=threshold=-18dB:ratio=2.5:attack=15:release=120:makeup=1dB,"
        "loudnorm=I=-16:TP=-1.0:LRA=7,"
        "volume=-1.0dB,"
        "alimiter=limit=-1.0dB:attack=5:release=50:asc=1"
    )

    cmd = [
        "ffmpeg", "-y",
        "-i", RAW_WAV,
        "-af", af,
        "-ar", "48000",
        "-ac", "1",
        MASTERED_WAV
    ]
    subprocess.run(cmd, check=True)
    print("Mastered audio updated.")

if __name__ == "__main__":
    master()
