import os
import sys
import glob
import base64
import json
import urllib.request
import urllib.error

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

def analyze_audio_with_gemini(api_key, wav_path):
    with open(wav_path, "rb") as f:
        audio_b64 = base64.b64encode(f.read()).decode("utf-8")
    
    prompt = (
        "این فایل صوتی حاوی یک جمله فارسی است: «روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله تقدیم می‌کند». "
        "دقیقاً واژه «بقیه‌الله» چگونه تلفظ شده است؟ "
        "آیا به صورت «بقی الله» (ناقص/بدون ت یا تشدید) تلفظ شده، یا به صورت کامل و درست «بقیه‌ت‌الله» / «بقیة‌الله» (با تشدید و اتصال درست)؟ "
        "لطفاً آوانگاری دقیق و ارزیابی را در ۲ خط بنویس."
    )
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
    payload = {
        "contents": [{
            "parts": [
                {"text": prompt},
                {"inlineData": {"mimeType": "audio/wav", "data": audio_b64}}
            ]
        }]
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=40) as resp:
            res = json.loads(resp.read().decode("utf-8"))
            return res.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
    except Exception as e:
        return f"Error: {e}"

def main():
    api_key = get_api_key()
    if not api_key:
        print("Missing API key")
        return
    
    files = sorted(glob.glob("projects/persian_editorial_motion_test_v16/qc/pronunciation/cand_*.wav"))
    for f in files:
        print(f"\n=======================================================")
        print(f"ANALYZING: {os.path.basename(f)}")
        analysis = analyze_audio_with_gemini(api_key, f)
        print(analysis)

if __name__ == "__main__":
    main()
