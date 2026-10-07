# Voice Director & Google Gemini TTS Authority Reference (v40.1)

> **Mandate:** Fail-Closed Audio Authority  
> **Primary Engine:** Google Gemini Audio API (`gemini-2.5-flash-preview-tts` / `Puck`)  
> **Status:** ABSOLUTE BAN ON EDGE-TTS & AZURE VOICES

---

## 1. The Voice Authority Contract

1. **`VOICEOVER = Physical Timing Truth`**: Spoken speech waveform and its exact acoustic transients govern frame boundaries, cut points, camera accelerations, and impact hits.
2. **`SCRIPT = Semantic Meaning Truth`**: Spoken text provides academic definitions, research metrics, and on-screen typography.

---

## 2. Mandatory TTS Architecture: Google Gemini API

### 2.1 Complete Ban on Edge-TTS / Microsoft Azure
- **BANNED:** `edge-tts`, `fa-IR-FaridNeural`, `fa-IR-DilaraNeural`.
- **Reason for Ban:** Mechanical cadence, robotic pitch, and frequent dropping of Persian grammatical *ezafe* (-e / -ye), causing severe regressions in educational and academic credibility.
- **Rule:** Under NO circumstances should any production script fallback to Edge-TTS. If API quota is reached, the process must halt and prompt the user rather than quietly degrading audio quality.

### 2.2 Locked Production Engine: Google Gemini 2.5 Flash TTS
- **Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key={GEMINI_API_KEY}`
- **Default Voice:** `Puck` (Authentic warmth, dynamic prosody, accurate Persian pronunciation, zero robotic artifacts).
- **Format:** Linear PCM 24kHz / 44.1kHz mono WAV.

---

## 3. Canonical Voice Synthesis Script (`scripts/synthesize_gemini_voice.py`)

Every production project must use this exact script template to generate Persian voiceover:

```python
import os
import json
import base64
import wave
import urllib.request
from pathlib import Path

def synthesize_persian_voice(
    text: str,
    out_wav_path: str,
    style_instruction: str = "با لحن یک دانشمند برجسته، دقیق، مقتدر، بدون شتاب و با ادای کامل کسره‌های اضافه فارسی صحبت کن.",
    voice_name: str = "Puck",
    gemini_api_key: str = None
):
    api_key = gemini_api_key or os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("FATAL: GEMINI_API_KEY is not set. Edge-TTS fallback is forbidden.")

    full_prompt = f"{style_instruction}\n\nمتن نریشن:\n{text}"
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key={api_key}"
    
    payload = {
        "contents": [{"parts": [{"text": full_prompt}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {
                "voiceConfig": {
                    "prebuiltVoiceConfig": {
                        "voiceName": voice_name
                    }
                }
            }
        }
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    
    with urllib.request.urlopen(req, timeout=60) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        
    parts = res["candidates"][0]["content"]["parts"]
    for p in parts:
        if "inlineData" in p and "audio" in p["inlineData"].get("mimeType", ""):
            raw_pcm = base64.b64decode(p["inlineData"]["data"])
            mime = p["inlineData"]["mimeType"]
            rate = 24000
            if "rate=" in mime:
                rate = int(mime.split("rate=")[1].split(";")[0])
                
            out_file = Path(out_wav_path)
            out_file.parent.mkdir(parents=True, exist_ok=True)
            with wave.open(str(out_file), "wb") as wf:
                wf.setnchannels(1)
                wf.setsampwidth(2)
                wf.setframerate(rate)
                wf.writeframes(raw_pcm)
            print(f"[VOICE GENERATION OK] Written to {out_file} ({rate}Hz, {len(raw_pcm)} bytes)")
            return out_file
            
    raise RuntimeError("Failed to extract audio from Gemini TTS response.")
```

---

## 4. Multi-Stem Audio Mastering & Ducking

Maintain three distinct audio stems:
- **Narration:** Processed voice normalized to $-16\,\text{LUFS} \pm 0.5$ (`loudnorm=I=-16:TP=-1.0:LRA=7`).
- **Music Bed:** Parametric or orchestral underscore sidechain-compressed by $-14\,\text{dB}$ when voice is active.
- **Physical SFX:** Impact hits, mechanical clicks, and hydraulic whooshes aligned to frame-accurate causal milestones.
- **Master Mix Target:** Complies strictly with EBU R128 ($-14\,\text{LUFS}$, True Peak $\le -1\,\text{dBTP}$).
