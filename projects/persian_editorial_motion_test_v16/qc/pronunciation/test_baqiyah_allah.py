import os
import sys
import json
import base64
import wave
import urllib.request
import urllib.error

# Ensure UTF-8 on Windows stdout
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def get_api_key():
    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if key:
        return key
    home = os.path.expanduser("~")
    env_path = os.path.join(home, ".env")
    if os.path.exists(env_path):
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                if line.startswith("GEMINI_API_KEY="):
                    return line.split("=", 1)[1].strip().strip('"').strip("'")
    return None

CANDIDATES = [
    {
        "id": "cand_01_baseline",
        "label": "Baseline unvoweled with ZWNJ",
        "text": "روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله تقدیم می‌کند.",
        "term_tts": "بقیه‌الله"
    },
    {
        "id": "cand_02_arabic_tashdid_damma",
        "label": "Arabic Ta-Marbuta with Tashdid & Damma",
        "text": "روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بَقیِّةُ‌الله تقدیم می‌کند.",
        "term_tts": "بَقیِّةُ‌الله"
    },
    {
        "id": "cand_03_persian_phonetic_ta",
        "label": "Persian phonetic spelling with explicit Ta and Damma",
        "text": "روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بَقیِّتُ‌الله تقدیم می‌کند.",
        "term_tts": "بَقیِّتُ‌الله"
    },
    {
        "id": "cand_04_persian_he_ta_damma",
        "label": "Persian phonetic spelling with He-Ta and explicit Damma",
        "text": "روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بَقیّه‌تُ‌الله تقدیم می‌کند.",
        "term_tts": "بَقیّه‌تُ‌الله"
    },
    {
        "id": "cand_05_phonetic_elision_space",
        "label": "Phonetic spelling with spaced elision",
        "text": "روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بَقیِّه‌تُ الله تقدیم می‌کند.",
        "term_tts": "بَقیِّه‌تُ الله"
    },
    {
        "id": "cand_06_tashdid_only",
        "label": "Tashdid on Ya only with ZWNJ",
        "text": "روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بَقیّه‌الله تقدیم می‌کند.",
        "term_tts": "بَقیّه‌الله"
    }
]

def synth_gemini(api_key, text, out_wav):
    style_prompt = (
        "با لحن یک گوینده حرفه‌ای مستند علمی ایرانی صحبت کن. "
        "فارسی معیار رایج در ایران با تلفظ طبیعی تهرانی. "
        "لحن با اعتمادبه‌نفس، واضح، گرم و باوقار باشد. "
        "واژه‌ها و نام‌های خاص را با تلفظ کامل و دقیق بیان کن."
    )
    full_prompt = f"{style_prompt}\n\nمتن نریشن:\n{text}"
    models = ["gemini-2.5-flash-preview-tts", "gemini-2.5-pro-preview-tts"]
    
    for m in models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent"
        payload = {
            "contents": [{"parts": [{"text": full_prompt}]}],
            "generationConfig": {
                "responseModalities": ["AUDIO"],
                "speechConfig": {
                    "voiceConfig": {
                        "prebuiltVoiceConfig": {"voiceName": "Puck"}
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
            with urllib.request.urlopen(req, timeout=60) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                candidates = res.get("candidates", [])
                if not candidates:
                    continue
                parts = candidates[0].get("content", {}).get("parts", [])
                for p in parts:
                    inline = p.get("inlineData", {})
                    if "audio" in inline.get("mimeType", ""):
                        raw_bytes = base64.b64decode(inline.get("data", ""))
                        mime = inline.get("mimeType", "")
                        rate = 24000
                        if "rate=" in mime:
                            rate = int(mime.split("rate=")[1].split(";")[0])
                        with wave.open(out_wav, "wb") as wf:
                            wf.setnchannels(1)
                            wf.setsampwidth(2)
                            wf.setframerate(rate)
                            wf.writeframes(raw_bytes)
                        return True, m, rate, len(raw_bytes)
        except Exception as e:
            print(f"Error with model {m}: {e}")
    return False, None, 0, 0

def get_wav_info(wav_path):
    with wave.open(wav_path, "rb") as wf:
        n_frames = wf.getnframes()
        rate = wf.getframerate()
        duration = n_frames / float(rate)
        return duration, rate

def main():
    api_key = get_api_key()
    if not api_key:
        print("ERROR: Missing GEMINI_API_KEY")
        sys.exit(1)

    out_dir = "projects/persian_editorial_motion_test_v16/qc/pronunciation"
    os.makedirs(out_dir, exist_ok=True)
    
    results = []
    print("=====================================================================")
    print("V16 EMPIRICAL EVALUATION: «بقیه‌الله» CANDIDATE PRONUNCIATIONS")
    print("=====================================================================")
    
    for c in CANDIDATES:
        out_wav = os.path.join(out_dir, f"{c['id']}.wav")
        print(f"\nEvaluating {c['id']}: {c['label']}")
        print(f"  TTS Input Term: {c['term_tts']}")
        print(f"  Full String: {c['text']}")
        
        ok, model, rate, raw_len = synth_gemini(api_key, c['text'], out_wav)
        if ok:
            dur, r = get_wav_info(out_wav)
            print(f"  -> SUCCESS ({model}): {dur:.2f}s, {r}Hz, file: {out_wav}")
            results.append({
                "id": c["id"],
                "label": c["label"],
                "term_tts": c["term_tts"],
                "full_text": c["text"],
                "duration": dur,
                "model": model,
                "file": out_wav
            })
        else:
            print(f"  -> FAILED synthesis")

    with open(os.path.join(out_dir, "test_results.json"), "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print("\nAll candidate syntheses saved and indexed.")

if __name__ == "__main__":
    main()
