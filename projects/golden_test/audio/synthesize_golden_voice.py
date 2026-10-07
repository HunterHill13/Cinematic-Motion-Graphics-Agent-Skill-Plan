import os
import json
import base64
import wave
import subprocess
import requests
from pathlib import Path

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set.")

# Prompt aligned with Single Authoritative Voice Doctrine:
STYLE_INSTRUCTION = (
    "با لحن یک مجری علمی و دانشگاهی حرفه‌ای، پرانرژی، روان، مسلط و صمیمی صحبت کن. "
    "ریتم کلام باید کاملاً طبیعی، پویا و زنده باشد. از مکث‌های طولانی، کشیدن بیش از حد کلمات "
    "و لحن کند یا تشریفاتی خودداری کن. کسره‌های اضافه و اعراب‌های واژگان تخصصی را دقیق و روان ادا کن."
)

TEXT = (
    "هَسته‌یِ رزوناتورِ کوانتومی، در سه مَرحله به تَعادل می‌رسد: "
    "نُخُست، آزادسازیِ قُفل‌هایِ مکانیکی، "
    "سپس، بَرقراریِ پیوَندِ سه‌گانه، "
    "و در نهایت، تَثبیتِ تَمام‌عیارِ پایداریِ سیستم."
)

full_prompt = f"{STYLE_INSTRUCTION}\n\nمتن نریشن:\n{TEXT}"

payload = {
    "contents": [{"parts": [{"text": full_prompt}]}],
    "generationConfig": {
        "responseModalities": ["AUDIO"],
        "speechConfig": {
            "voiceConfig": {
                "prebuiltVoiceConfig": {
                    "voiceName": "Puck"
                }
            }
        }
    }
}

models_to_try = [
    "gemini-3.1-flash-tts-preview",
    "gemini-3.8-flash-lite-tts",
    "gemini-2.5-flash-preview-tts",
]

resp = None
for model_name in models_to_try:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={API_KEY}"
    print(f"Calling Google Gemini Audio API via {model_name} (Voice: Puck)...")
    r = requests.post(url, json=payload, headers={"Content-Type": "application/json"}, timeout=60)
    if r.status_code == 200:
        resp = r
        print(f"Successfully generated audio with {model_name}")
        break
    else:
        print(f"Model {model_name} returned {r.status_code}: {r.text[:120]}... Trying next...")

if not resp or resp.status_code != 200:
    raise RuntimeError("All Gemini TTS models failed.")

data = resp.json()
audio_b64 = data["candidates"][0]["content"]["parts"][0]["inlineData"]["data"]
pcm_bytes = base64.b64decode(audio_b64)

out_dir = Path("projects/golden_test/audio")
out_dir.mkdir(parents=True, exist_ok=True)
raw_wav = out_dir / "golden_voice_raw.wav"

# Write Linear PCM 24kHz mono
with wave.open(str(raw_wav), "wb") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(24000)
    wf.writeframes(pcm_bytes)

print(f"Generated raw voice at: {raw_wav}")

# EBU R128 loudness normalization
norm_wav = out_dir / "golden_voice_norm.wav"
ffmpeg_cmd = [
    "ffmpeg", "-y", "-i", str(raw_wav),
    "-af", "loudnorm=I=-16:TP=-1.0:LRA=7",
    "-ar", "44100",
    str(norm_wav)
]
subprocess.run(ffmpeg_cmd, check=True)
print(f"Normalized audio to EBU R128 (-16 LUFS): {norm_wav}")

# Copy to public/audio for Remotion
public_audio = Path("public/audio")
public_audio.mkdir(parents=True, exist_ok=True)
public_dest = public_audio / "golden_test_voice.mp3"
subprocess.run(["ffmpeg", "-y", "-i", str(norm_wav), str(public_dest)], check=True)
print(f"Exported MP3 for Remotion: {public_dest}")
