# Voice Production Architecture & Persian Audio Benchmark (v4.1)

## 1. Modular Voice Architecture
To eliminate brittle, tightly-coupled TTS calls, V4.1 introduces the modular `VoiceProvider` pattern:

```typescript
export interface VoiceTrack {
  shotId: string;
  audioPath: string;
  durationInSeconds: number;
  sampleRate: number;
  channels: number;
  displayText: string;
  phoneticText: string;
}

export interface VoiceProvider {
  name: string;
  isHuman: boolean;
  getTrack(shotId: string): Promise<VoiceTrack>;
  listTracks(): Promise<VoiceTrack[]>;
}
```

### Implementations:
1. **`HumanVoiceProvider`**:
   - Searches `audio/voice/human/{shot_id}.wav`.
   - If human high-fidelity audio is present, it takes highest precedence with 0% TTS artifacts.
2. **`EdgeTtsProvider` (Neural Synthetic Fallback)**:
   - Voice: `fa-IR-FaridNeural`
   - Rate: `-4%` (solemn, measured institutional pacing)
   - Pitch: `+0Hz`
   - Phonetic diacritic injection (`tts_text`) with syntactic pause markers (`...`, `,`).

---

## 2. Text Separation Mandate
- **`display_text`**: Shown on screen in Remotion typographic components. Must be 100% clean, standard Persian without phonetic diacritics or awkward phonetic spellings.
- **`tts_text`**: Fed strictly to the TTS generator. Contains vowel marks (Fat-heh, Zammeh, Kasreh), tashdeed, and verbalized numerals (`شانزده`, `شصت و پنج`, `صد و ده`, `صد و سی`).

---

## 3. Phonetic Pronunciation Lexicon for Decree
| Canonical Term | Phonetic String (`tts_text`) | Notes |
| :--- | :--- | :--- |
| **بند «کاف»** | بَندِ کاف | Distinct Ezafeh on "band" |
| **ماده ۲** | مادّه‌یِ دو | Geminated dal + explicit numeral |
| **استعدادهای درخشان** | اِستِعدادهایِ دِرَخشان | Clean Ezafeh, clear kasreh |
| **وزارت بهداشت** | وِزارَتِ بِهداشت | Kasreh on vezarat |
| **۱۶ امتیاز** | شانزَدَه اِمتیاز | Verbalized Persian number |
| **۶۵ امتیاز** | شَصت و پَنج اِمتیاز | Verbalized Persian number |
| **۱۱۰ امتیاز** | صَد و دَه اِمتیاز | Verbalized Persian number |
| **۱۳۰ امتیاز** | صَد و سی اِمتیاز | Verbalized Persian number |
| **بقیه‌الله (عج)** | بَقیَّةُ الله، عَجَّلَ اللهُ تَعالیٰ فَرَجَهُ الشَّریف | Full honorary institutional reading |
