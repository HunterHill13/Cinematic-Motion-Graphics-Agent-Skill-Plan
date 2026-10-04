# Voice Director & Natural Persian TTS Reference (v2)

Voiceover is the physical timing clock of production. Visual motion synchronizes strictly to spoken speech.

---

## 1. Dual-Clock Authority Contract

- **`VOICEOVER = Physical Timing Truth`**: The synthesized/recorded audio waveform and its extracted word timestamps govern exact frame positions for cuts, zooms, camera transitions, and visual emphases.
- **`SCRIPT = Semantic Meaning Truth`**: The written text provides semantic definitions, source citations, on-screen typography, and scientific grounding.

---

## 2. Natural Persian TTS Architecture

### 2.1 Rejection of Azure as Default
Microsoft/Azure voices (`DilaraNeural`, `FaridNeural`) produce a mechanical, monotone cadence that often drops the grammatical Persian ezafe.

### 2.2 Recommended Provider Hierarchy
1. **Google Gemini TTS / Cloud Audio:** Exceptional natural breath pauses, natural sentence contours.
2. **ElevenLabs Multilingual v2:** Cinema-grade dramatic resonance.
3. **Pocket TTS Farsi v2 (`mehdi-hf/pocket-tts-farsi`):** Lightweight local CPU/ONNX fallback.
4. **Edge-TTS:** Emergency fallback only.

---

## 3. Persian Text Normalization Pipeline

Always run Persian text through `audio/engine/PersianTextOptimizer.py` before synthesis:
- **ZWNJ (\u200c):** Corrects prefixes (`می‌رود`, `نمی‌شود`) and suffixes (`سلول‌ها`, `سامانه‌ها`).
- **Numbers to Words:** Automatically expands digits into Persian written words (`۲۵٪` $\to$ `بیست و پنج درصد`).
- **Phonetic Glossary:** Standardizes biomedical English terms into natural Persian phonetic spelling (`Apoptosis` $\to$ `آپوپتوز`).

---

## 4. Audio Stems & Dynamic Ducking

Maintain three distinct audio stems:
- `audio/narration/`: Processed voice normalized to $-19\,\text{LUFS}$.
- `audio/music/`: Cinematic underscore normalized to $-22\,\text{LUFS}$.
- `audio/sfx/`: Impact hits, whooshes, risers, and UI clicks normalized to $-18\,\text{LUFS}$.

Execute automated ducking via `StemMixer.py`:
- Music ducks by **$-14\,\text{dB}$** whenever narration voice is active.
- Target master mix loudness: **$-16\,\text{LUFS}$**.
