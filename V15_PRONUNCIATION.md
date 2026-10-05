# V15 PRONUNCIATION & PHONETIC NORMALIZATION SPECIFICATION

## Core Principle: Pristine Display Orthography vs TTS Synthesis Phonetization

A critical quality flaw in unrefined AI motion graphics is letting phonetic helper markings (Arabic diacritics like fatha, damma, kasra, or tashdid) leak into the visual design. In Persian typography, words such as «بقیه‌الله» or «ماده دو» must be rendered cleanly without artificial vowel signs, while TTS speech engines require specialized phonetic spellings to avoid robotic mispronunciations.

---

### 1. SEPARATION ARCHITECTURE

```
┌────────────────────────────────────────────────────────┐
│                   SOURCE MANIFEST                      │
│               (V15_CONTENT_MANIFEST.md)                │
└───────────────────────────┬────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            ▼                               ▼
┌───────────────────────────────┐ ┌───────────────────────────────┐
│        DISPLAY LAYER          │ │          TTS LAYER            │
│   • 100% Standard Persian     │ │   • Phonetic dictionary overrides│
│   • Zero Arabic diacritics    │ │   • Disambiguated vowels      │
│   • Zero tashdid / sukun      │ │   • Isolated in               │
│   • Rendered in visible JSX   │ │     pronunciationDictionary.ts│
└───────────────────────────────┘ └───────────────────────────────┘
```

---

### 2. PHONETIC OVERRIDE REGISTRY

| Canonical Term (`displayText`) | Phonetized TTS Form (`ttsText`) | Pronunciation IPA / Description | Reason |
| :--- | :--- | :--- | :--- |
| `بقیه‌الله` | `بَقیِّهُالله` | /bæɣijjatollɑːh/ | Prevents flat elision of tashdid and proper waṣlah link |
| `ماده دو` | `مادِّهٔ دو` | /mɑːddeje do/ | Disambiguates ezāfe from silent Heh |
| `آیین‌نامه` | `آیین‌نامهٔ` | /ɒːjiːnnɒːmeje/ | Proper phonetic ezāfe glide to next word |
| `بند کاف` | `بَندِ کاف` | /bænde kɒːf/ | Ensures clear audible ezāfe on statute clause |
| `شانزده` | `شانزدَه` | /ʃɒːnzdæh/ | Avoids robotic truncation of final vowel |
| `پژوهشگر` | `پَژوهِشگَر` | /pæʒuːheʃgær/ | Clarifies vowels for neural Persian TTS voice models |

---

### 3. AUTOMATED VERIFICATION RULE
- Any display string containing characters in the Unicode Arabic Harakat block (`[\u064B-\u065F]`) in visible production JSX constitutes an automatic build failure.
- Phonetization is strictly encapsulated within `src/audio/pronunciationDictionary.ts` and `src/audio/pronunciationNormalizer.ts`.
