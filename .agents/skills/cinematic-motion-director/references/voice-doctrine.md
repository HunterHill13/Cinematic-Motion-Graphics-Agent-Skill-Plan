# Single Authoritative Voice Doctrine

## 1. Persona & Delivery Philosophy
The spoken voiceover must embody:
> **A highly skilled Persian educator/presenter explaining a breakthrough concept naturally, fluently, and energetically to an intelligent audience.**

It must NEVER sound like:
- An elderly ceremonial cleric reading a parchment.
- An artificially slow, robotic voice crawling at 80 words per minute.
- A lifeless bureaucrat reciting legal clauses with dead, uniform cadence.

---

## 2. Style Instruction Mandate (Google Gemini TTS)
When calling the official Google Gemini Multimodal Audio API (`gemini-2.5-flash-preview-tts` with voice `Puck`), the prompt must enforce natural fluency and energy:

```python
# MANDATORY PROMPT TEMPLATE FOR PERSIAN TTS:
STYLE_INSTRUCTION = (
    "با لحن یک مجری علمی و دانشگاهی حرفه‌ای، پرانرژی، روان، مسلط و صمیمی صحبت کن. "
    "ریتم کلام باید کاملاً طبیعی، پویا و زنده باشد. از مکث‌های طولانی، کشیدن بیش از حد کلمات و لحن کند یا تشریفاتی خودداری کن. "
    "کسره‌های اضافه و اعراب‌های واژگان تخصصی را دقیق و روان ادا کن."
)
```

### PROHIBITED WORDS IN PROMPT:
- Do NOT use: `بدون شتاب` (unhurried)
- Do NOT use: `شمرده شمرده` (measured/slow)
- Do NOT use: `با طمأنینه` (at a leisurely pace)
- Do NOT use: `سنگین و موقر` (solemn/heavy)

These phrases trigger severe model slowdown and robotic phrasing.

---

## 3. Measurable Voice Speed Gate (`VOICE_SPEED_GATE`)
Every synthesized voiceover must be evaluated against mathematical metrics before any visuals are choreographed:

| Metric | Minimum Acceptable | Target Ideal | Maximum Acceptable | Action if Violated |
| :--- | :--- | :--- | :--- | :--- |
| **Speaking Rate (WPM)** | **125 WPM** | **140 – 165 WPM** | **180 WPM** | If $< 125$ WPM: **VOICE FAIL** (Regenerate). |
| **Pause Ratio** | $\le 10\%$ | **15% – 25%** | $\ge 35\%$ | If $> 35\%$: **VOICE FAIL** (Excessive dead pauses). |
| **Max Unvoiced Silence** | — | **0.3s – 0.6s** | **1.2s** | If any pause $> 1.2\text{s}$: Trim silence with FFmpeg. |

$$\text{WPM} = \frac{\text{Persian Word Count}}{\text{Audio Duration in Seconds}} \times 60$$

If the voiceover falls below 125 WPM, **HALT PRODUCTION AND REGENERATE AUDIO**.  
Do NOT stretch the visual Remotion timeline to accommodate dragged-out speech.

---

## 4. Dual-Clock Timing: Voice is NOT the Sole Timing Truth
The spoken speech waveform provides semantic anchors, but the visual choreography operates on its own physical clock:
- **Visual Anticipation:** A heavy mass begins pre-loading 15–25 frames *before* the keyword is uttered.
- **Visual Overlap:** A transformation may initiate during clause A and resolve smoothly through clause B.
- **Visual Settle:** Elements can settle into intentional stillness while speech continues.
- Never force an animation to freeze or wait for each individual syllable.
