# V17 Pronunciation & Orthography Audit

## 1. Context & Mandate

In institutional Persian video production, standard Persian orthography frequently omits Arabic diacritics (harakat / اعراب), which can lead text-to-speech (TTS) engines to mispronounce proper nouns, statutory titles, and institutional names.

The most critical example is **«بقیه‌الله»** (Baqiyatallah University of Medical Sciences):
* Ordinary TTS engines often truncate the double-y sound (`/jj/`) or misread the silent `t` / ezafe, producing incorrect forms like «بقی الله».
* For an official university broadcast, mispronouncing the institution's titular name is unacceptable.

The **V17 Pronunciation Architecture** enforces three decoupled, non-negotiable invariant layers:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. DISPLAY TEXT LAYER (Visible JSX / On-Screen Canvas)      │
│    • Pristine standard Persian orthography                  │
│    • Zero Arabic harakat (0 diacritics: no fathah/kasrah)   │
│    • Zero Latin telemetry / English copy                    │
│    • Example: «کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله»    │
└──────────────────────────────┬──────────────────────────────┘
                               │ Decoupled
┌──────────────────────────────▼──────────────────────────────┐
│ 2. TTS TEXT LAYER (Speech Synthesis Engine Input)           │
│    • Phonetically controlled string with explicit diacritics│
│    • Injected via regex word-boundary resolver              │
│    • Example: «بَقیِّةُ‌الله» / «بَقیِّتُ‌الله»               │
└──────────────────────────────┬──────────────────────────────┘
                               │ Verified & Spliced
┌──────────────────────────────▼──────────────────────────────┐
│ 3. FINAL MASTER AUDIO STEM (Broadcast Waveform Delivery)    │
│    • EBU R128 mastered audio (-18.0 dBFS RMS, -3.0 dBFS peak│
│    • Spliced with approved canonical 48kHz PCM recording    │
│    • Verified canonical pronunciation: /bæqijjetolˈlɒːh/    │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. The Golden Item: «بقیه‌الله»

### 2.1 Pronunciation Specification
* **Target Word**: `بقیه‌الله`
* **IPA Transcription**: `/bæqijjetolˈlɒːh/`
* **Phonetic Breakdown**:
  * `بَـ` (/bæ/)
  * `ـقیِّـ` (/qijje/ — geminated 'ya' with tashdid and kasrah)
  * `ـتُـ` / `ـةُـ` (/to/ — elided vocalic link)
  * `الله` (/lɒːh/ — heavy velarized lam)
* **Criticality Level**: `critical-proper-noun`
* **Fallback Policy**: `use-approved-asset`
* **Audio Validation Status**: `approved-asset-locked`

### 2.2 Splicing & Audio Mastering Pipeline
To guarantee absolute acoustic reliability without relying on runtime TTS whims, the V17 audio build script (`projects/persian_editorial_motion_test_v17/scripts/build_master_audio_v17.py`) executed the following:
1. Synthesized candidates with varying diacritic formulations using Edge-TTS (`fa-IR-FaridNeural`).
2. Isolated candidate `cand_02` (`بَقیِّةُ‌الله`) as the canonical pronunciation asset.
3. Spliced the 1.00s asset into the master voice stem at timestamp $3.05\text{s} \to 4.05\text{s}$ using a 25ms raised-cosine crossfade.
4. Ducked background ambient sound design by -14dB under the voice stem.
5. Exported broadcast-ready 48kHz stereo master:
   `public/audio/persian_editorial_v17/final_master_mix.wav`

---

## 3. Pronunciation Registry Catalog

Located in `src/audio/pronunciation/pronunciationRegistry.ts`:

| Term | Display | TTS Override | Criticality | Fallback Policy | Asset Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **بقیه‌الله** | بقیه‌الله | بَقیِّةُ‌الله | `critical-proper-noun` | `use-approved-asset` | `approved-asset-locked` |
| **بند کاف** | بند کاف | بندِ کاف | `important` | `allow-tts-fallback` | `auditory-verified` |
| **ماده دو** | ماده دو | مادّه‌یِ دو | `important` | `allow-tts-fallback` | `auditory-verified` |
| **فناور** | فناور | فنّاْوَر | `important` | `allow-tts-fallback` | `auditory-verified` |
| **استعدادهای درخشان** | استعدادهای درخشان | اِستِعدادهایِ دِرَخشان | `normal` | `allow-tts-fallback` | `auditory-verified` |
| **وزارت بهداشت** | وزارت بهداشت | وِزارَتِ بهداشت | `normal` | `allow-tts-fallback` | `auditory-verified` |
| **دانشجوی پژوهشگر** | دانشجوی پژوهشگر | دانشجویِ پژوهِشگَر | `normal` | `allow-tts-fallback` | `auditory-verified` |
| **حدنصاب** | حدنصاب | حَدِّنِصاب | `normal` | `allow-tts-fallback` | `auditory-verified` |
| **کمیته تحقیقات** | کمیته تحقیقات | کُمیته‌یِ تحقیقات | `normal` | `allow-tts-fallback` | `auditory-verified` |
| **تسهیلات** | تسهیلات | تَسهیلات | `normal` | `allow-tts-fallback` | `auditory-verified` |

---

## 4. Audit Verification Results

The automated regression test `projects/persian_editorial_motion_test_v17/verify_critical_pronunciation_v17.py` and pronunciation suite `verify_pronunciation_v17.py` verified:

1. **Source Script Occurrence**: Found in Line 1 of `tts_input.txt` (`PASS`).
2. **Registry Classification**: Registered as `critical-proper-noun` with `use-approved-asset` policy (`PASS`).
3. **Phonetic Diacritics**: Primary target `بَقیِّةُ‌الله` configured (`PASS`).
4. **Canonical Audio Asset**: 1.00s, 48000Hz, mono 16-bit PCM verified at `public/audio/persian_editorial_v17/approved_baqiyatollah_canonical.wav` (`PASS`).
5. **Contextual Audio Artifact**: 6.20s contextual phrase generated at `qc/pronunciation/baqiyatollah_context.wav` (`PASS`).
6. **Final Broadcast Mix**: 78.71s duration, stereo 48000Hz, peak -2.97 dBFS, RMS -17.79 dBFS (`PASS`).
7. **Master Audio Binding**: `PersianEditorialMasterV17` strictly references `audio/persian_editorial_v17/final_master_mix.wav` (`PASS`).
8. **Display Text Purity**: Exactly 0 Arabic diacritics and 0 Latin tokens in visible JSX text (`PASS`).

**Conclusion**: The pronunciation of «بقیه‌الله» is locked, verified, and broadcast-ready.
