# V40 AUDIO ARCHITECTURE & DIRECTION PLAN

> **Milestone:** V40 — Motion-First Production Rebuild  
> **Acoustic Hierarchy:** Voice (Dominant) > SFX (Physical Motion Sync) > Music (Narrative Arc Bed)  
> **Master Loudness Target:** -16.0 LUFS Integrated, True Peak < -1.0 dBFS  
> **Voice Provider:** Google Gemini Audio API (`gemini-2.5-flash-preview-tts` / `Puck`)  
> **Zero Fallback Mandate:** No unannounced fallback to Edge-TTS or FaridNeural.

---

## 1. VOICE ARCHITECTURE & DUAL-SCRIPT ISOLATION

To prevent pronunciation diacritics from polluting on-screen typography while maintaining flawless Persian prosody in the neural engine, the speech pipeline strictly enforces a dual-script representation:

```text
                             SOURCE MASTER SCRIPT
                                       │
            ┌──────────────────────────┴──────────────────────────┐
            ▼                                                     ▼
┌───────────────────────────────────────┐   ┌───────────────────────────────────────┐
│         PRONUNCIATION_SCRIPT          │   │            DISPLAY_SCRIPT             │
│   (Preserved Arabic/Persian اعراب     │   │      (Sanitized via Regex Parser)     │
│   for Google Gemini Audio Engine)     │   │     for Remotion Visual Typography    │
└───────────────────┬───────────────────┘   └───────────────────┬───────────────────┘
                    │                                           │
                    ▼                                           ▼
      Google Gemini Multimodal Audio               Clean Persian Editorial Text
        (WAV, 24kHz Mono, 16-bit)                 (Zero diacritics, proper ZWNJ)
```

### Complete Word-for-Word Script Alignment:

#### 1. Pronunciation Script (Input to Google Gemini TTS):
```text
روابطِ عمومیِ کُمیتهیِ تَحقیقاتِ دانشگاهِ عُلومِ پِزِشکیِ بَقیَّتُالله (عَج) تَقدیم میکُنَد!
آیا میدانید چِگونه میتَوانید به عُنوانِ دانشجویِ پَژوهِشگَر یا فَنّاوَرِ بَرجَستهیِ کِشوَر اِنتِخاب شَوید؟!
دَستورُالعَمَلِ بَندِ «کاف»، مادّهیِ ۲ از آییننامهیِ اِستِعدادهایِ دِرَخشانِ وِزارَتِ بِهداشت، مَسیرِ جامِعِ امتیازدهی به فَعّالیتهایِ شُماست!
اَمّا قَبل از مُحاسِبِهیِ اِمتیازها، ۳ شَرطِ اَصلی وجود دارَد:
شَرطِ اَوَّل؛ مُعَدَّلِ کُلِّ شُما دَر مَقطَعِ فِعلی بایَد حَداقَل ۱۶ باشَد.
شَرطِ دُوُّم؛ بایَد دَر سَنَواتِ مُجازِ تَحصیلی باشِید و تأییدیهیِ کُمیتهیِ اِنضِباطی را دَریافت کُنید.
شَرطِ سِوُّم؛ اِمتیازهایِ شُما بایَد حَداقَل از ۶ مادّهیِ مُختَلِفِ آییننامِه کَسب شَوَد؛ که حُضورِ مَقالِه یا فَعّالیتِ فَنّاوَرانِه دَر آن اِجباری اَست!
دِقَّت کُنید! تَمامِ مَدارِک بایَد مَربوط به دورانِ تَحصیل، یا نِهایَتاً تا ۱ سال پَس از فارِغُالتَّحصیلی باشَد.
حَدِّنِصابِ قَبولی، بَستِه به تیپِ دانشگاه و مَقطَعِ شُما فَرق میکُنَد:
بَرایِ کارشِناسی دَر دانشگاههایِ تیپِ یک ۶۵ اِمتیاز،
پِزِشکیِ عُمومی ۱۱۰ اِمتیاز،
و دُکتِرایِ تَخَصُّصی به ۱۳۰ اِمتیاز نِیاز دارَد!
دَر ویدیوهایِ بَعدی، رَوِشِ کَسبِ این اِمتیازها را گامبِهگام بَررِسی میکُنیم. با ما هَمراه باشِید!
```

#### 2. Display Script (Rendered in Visual Components):
```text
روابط عمومی کمیته‌ی تحقیقات دانشگاه علوم پزشکی بقیه‌الله (عج) تقدیم می‌کند!
آیا می‌دانید چگونه می‌توانید به عنوان دانشجوی پژوهشگر یا فناور برجسته‌ی کشور انتخاب شوید؟!
دستورالعمل بند «کاف»، ماده‌ی ۲ از آیین‌نامه‌ی استعدادهای درخشان وزارت بهداشت، مسیر جامع امتیازدهی به فعالیت‌های شماست!
اما قبل از محاسبه‌ی امتیازها، ۳ شرط اصلی وجود دارد:
شرط اول؛ معدل کل شما در مقطع فعلی باید حداقل ۱۶ باشد.
شرط دوم؛ باید در سنوات مجاز تحصیلی باشید و تأییدیه‌ی کمیته‌ی انضباطی را دریافت کنید.
شرط سوم؛ امتیازهای شما باید حداقل از ۶ ماده‌ی مختلف آیین‌نامه کسب شود؛ که حضور مقاله یا فعالیت فناورانه در آن اجباری است!
دقت کنید! تمام مدارک باید مربوط به دوران تحصیل، یا نهایتاً تا ۱ سال پس از فارغ‌التحصیلی باشد.
حدنصاب قبولی، بسته به تیپ دانشگاه و مقطع شما فرق می‌کند:
برای کارشناسی در دانشگاه‌های تیپ یک ۶۵ امتیاز،
پزشکی عمومی ۱۱۰ امتیاز،
و دکترای تخصصی به ۱۳۰ امتیاز نیاز دارد!
در ویدیوهای بعدی، روش کسب این امتیازها را گام‌به‌گام بررسی می‌کنیم. با ما همراه باشید!
```

---

## 2. NARRATIVE MUSIC ARC (PARAMETRIC SYNTHESIS SCORE)

We reject repetitive stock loops (`-stream_loop -1`). The musical score is authored using the parametric acoustic synthesizer established in `generate_editorial_music_v5_3.py`, customized for the exact emotional trajectory of the Band-K narrative:

```text
[00:00 - 00:10] ACT 1: CURIOSITY & DIGNITY
  Tone: Atmospheric deep drone (D1/D2, 36.7Hz & 73.4Hz), breathing 5th pad, crystal harmonics.
  Emotional State: Dignified institutional authority; subtle anticipation.

[00:10 - 00:20] ACT 2: INQUIRY & RESTRAINED PULSE
  Tone: Subtle clockwork pulse enters at 92 BPM (1.53 Hz), high-frequency mechanical tick.
  Emotional State: Scholarly quest; opening of dual paths.

[00:20 - 00:32] ACT 3: GROWING STRUCTURE (BAND K)
  Tone: Sub-bass surges; warm analog choir enters; rhythmic filter sweeps open.
  Emotional State: Concrete statutory clarity and grounding.

[00:32 - 00:60] ACT 4–7: CONTROLLED RHYTHMIC DEVELOPMENT (3 CONDITIONS)
  Tone: Harmonic progression unfolds (D minor -> Bb major -> C major -> D minor).
        Arpeggiated 16th-note plucks mirror analytical verification steps.
  Emotional State: Rigorous scientific checklist; mechanical progression.

[00:60 - 00:72] ACT 8: MINIMALIST TENSION GATE (1-YEAR HORIZON)
  Tone: Rhythm thins out; focus drops onto an isolated sub-bass pulse and high bell drone.
  Emotional State: Strict legal caution and chronological precision.

[00:72 - 00:85] ACT 9–12: MONUMENTAL CLIMAX (65 // 110 // 130)
  Tone: Full orchestral brass-pad synthesis, driving sub-kick, expanding stereo width, triumphant progression.
  Emotional State: Academic pinnacle; awe-inspiring summit.

[00:85 - 00:92] ACT 13: CELESTIAL RESOLUTION (CALL TO ACTION)
  Tone: Harmonic transition to D major (F#3, 185Hz); celestial chord decay and fading warm sub-bass.
  Emotional State: Inspiring open door for future research achievement.
```

---

## 3. AUDIO-VISUAL SYNCHRONIZATION: SFX EVENTS

Every sound effect in V40 is tied to a physical transformation or impact event:

| Event ID | Time (Sec) / Frame | Visual Trigger | SFX Category | Acoustic Profile | Volume |
|---|---|---|---|---|---|
| **SFX-01** | `0.50s / F15` | Six titanium ingots collide to form Monolith | Heavy Sub Impact | Deep thud (45Hz) + metallic ring | -8 dB |
| **SFX-02** | `8.20s / F246` | Monolith splits into dual research wings | Mechanical Release | Pneumatic pressure hiss + ceramic slide | -12 dB |
| **SFX-03** | `15.80s / F474` | Wings slam together to form Band-K Citadel | Kinetic Slam | High-inertia steel clash + bass shockwave | -7 dB |
| **SFX-04** | `26.20s / F786` | Three cylindrical gates telescope forward | Mechanical Servo | Triple precision ratchet clicks (`tat-tat-tat`) | -14 dB |
| **SFX-05** | `35.40s / F1062` | Caliper locks at **16.0 GPA limit stop** | Hard Limit Stop | Precision anvil tap + electrical confirmation ping | -9 dB |
| **SFX-06** | `42.50s / F1275` | Disciplinary seal is laser-etched onto cylinder | Laser Etch | High-frequency thermal sizzle + resonance swell | -15 dB |
| **SFX-07** | `48.80s / F1464` | Gate 3 blooms into **6-faceted prism** | Radial Deployment | Multi-layered interlocking iris slide | -11 dB |
| **SFX-08** | `57.20s / F1716` | 1-Year temporal boundary wall drops | Pylon Strike | Solid ground impact with low-frequency reverb | -10 dB |
| **SFX-09** | `72.40s / F2172` | Plinth 1 rockets upward to **65** | Hydraulic Rise | Pressurized pneumatic thrust + mechanical catch | -9 dB |
| **SFX-10** | `77.80s / F2334` | Plinth 2 surges upward to **110** | Heavy Hydraulic Lift | Deeper pitch hydraulic surge + dual tooth click | -8 dB |
| **SFX-11** | `81.20s / F2436` | Plinth 3 erupts upward to **130** (Apex) | Seismic Ascent | Maximum bass rumble + thunderous locking clang | -6 dB |
| **SFX-12** | `84.50s / F2535` | Reconvergence into BMSU institutional crest | Harmonic Swell | Warm metallic ring + reverse shimmer wash | -12 dB |

---

## 4. DYNAMIC SIDECHAIN DUCKING SPECIFICATION

```text
Voice Active   ──> Music Attenuation: -14.0 dB
                  Attack Time: 35 ms
                  Release Time: 350 ms
Voice Pauses   ──> Music Level: Rises smoothly to -4 dB (filling dramatic breath)
Impact Events  ──> Music Ducking: Instantaneous -6 dB notch for 120 ms
                  allowing SFX transients total acoustic headroom
```
This guarantees 100% speech intelligibility while preserving the kinetic punch of every motion event.
