"""
Official Google Gemini-TTS Generation for V5.2.
Complies strictly with Part B:
- Engine: Google Gemini-TTS (gemini-2.5-pro-preview-tts / gemini-2.5-flash-preview-tts)
- Language: fa-IR
- Style Direction: Professional Iranian documentary narrator
- ONE SCRIPT -> ONE GENERATION -> ONE PCM/WAV
- Zero fallback to Edge-TTS.
- Output: projects/persian_editorial_motion_test_v5_2/audio/raw/raw_voice.wav
"""

import os
import sys
import json
import base64
import wave
import urllib.request
import urllib.error

STYLE_PROMPT = (
    "با لحن یک گوینده حرفه‌ای مستند علمی ایرانی صحبت کن. "
    "فارسی معیار رایج در ایران با تلفظ طبیعی تهرانی. "
    "لحن با اعتمادبه‌نفس، واضح، گرم و کمی پرانرژی باشد. "
    "جمله‌ها را به صورت پیوسته و طبیعی بیان کن و بین جمله‌ها مکث کوتاه و طبیعی داشته باش. "
    "از لحن رباتیک، خبری، بیش‌ازحد رسمی یا نمایشی خودداری کن. "
    "کلمات فارسی را طبیعی و روان تلفظ کن."
)

def get_api_key():
    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if key:
        return key
    home = os.path.expanduser("~")
    env_path = os.path.join(home, ".env")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line.startswith("GEMINI_API_KEY=") or line.startswith("GOOGLE_API_KEY="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    return None

def main():
    api_key = get_api_key()
    if not api_key:
        print("CRITICAL BUILD FAILURE: TTS_PROVIDER_FAILURE")
        print("Missing GEMINI_API_KEY.")
        sys.exit(1)

    with open("projects/persian_editorial_motion_test_v5_2/text/tts_input.txt", "r", encoding="utf-8") as f:
        tts_text = f.read().strip()

    full_prompt = f"{STYLE_PROMPT}\n\nمتن نریشن:\n{tts_text}"

    # Priority 1: gemini-2.5-pro-preview-tts, Priority 2: gemini-2.5-flash-preview-tts
    models = ["gemini-2.5-pro-preview-tts", "gemini-2.5-flash-preview-tts"]
    raw_audio_bytes = None
    rate = 24000
    chosen_model = None

    for m in models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent"
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
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json", "x-goog-api-key": api_key}
        )

        try:
            print(f"Requesting Gemini-TTS via {m}...")
            with urllib.request.urlopen(req, timeout=120) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                candidates = res.get("candidates", [])
                if not candidates:
                    continue
                parts = candidates[0].get("content", {}).get("parts", [])
                for p in parts:
                    inline = p.get("inlineData", {})
                    if "audio" in inline.get("mimeType", ""):
                        raw_audio_bytes = base64.b64decode(inline.get("data", ""))
                        mime = inline.get("mimeType", "")
                        if "rate=" in mime:
                            rate = int(mime.split("rate=")[1].split(";")[0])
                        chosen_model = m
                        break
            if raw_audio_bytes:
                break
        except urllib.error.HTTPError as e:
            print(f"Model {m} failed with HTTP {e.code}: {e.read().decode('utf-8', errors='replace')}")
        except Exception as e:
            print(f"Model {m} exception: {e}")

    if not raw_audio_bytes:
        print("CRITICAL BUILD FAILURE: TTS_PROVIDER_FAILURE")
        print("Could not obtain audio stream from Google Gemini-TTS models.")
        sys.exit(1)

    out_raw = "projects/persian_editorial_motion_test_v5_2/audio/raw/raw_voice.wav"
    # Convert raw PCM (16-bit little-endian mono) into standard WAV
    with wave.open(out_raw, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2) # 16-bit
        wf.setframerate(rate)
        wf.writeframes(raw_audio_bytes)

    print(f"SUCCESS: Generated raw Gemini-TTS narration using {chosen_model}")
    print(f"Saved: {out_raw} (Rate: {rate} Hz, Channels: 1, Bytes: {len(raw_audio_bytes)})")

if __name__ == "__main__":
    main()
