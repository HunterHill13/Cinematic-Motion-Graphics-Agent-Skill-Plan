# Mandatory Voice Selection & Quota-Aware Gemini TTS Protocol

## 1. Mandatory Voice Selection Gate (`VOICE_SELECTION_GATE`)

Before generating any narration, rendering any video, finalizing the `SHOTBOOK` timing, or beginning visual Remotion production, the director **MUST** prompt the user to explicitly select a narration voice.

### Inviolable Voice Gate Rules:
1. **Never automatically choose a voice.**
2. **Never silently default to `Puck` or `Callirrhoe`** without explicit user selection.
3. **If already selected in the active session, do not prompt again.**
4. **Never infer gender or tone.**
5. **DO NOT PROCEED with production until the user explicitly selects a voice.**

---

## 2. The 2 Mandated Production Voices (fa-IR)

The voice-selection question must be presented to the user in Persian with exactly these two approved options:

### 🎙️ صداهای رسمی و باکیفیت Gemini:

1. **Puck (پوک)**
   * **جنسیت:** مرد (Male)
   * **شخصیت:** با اعتماد به نفس، پرانرژی، مسلط، مدرن و پویا (Confident, Upbeat, Contemporary)
   * **کاربرد:** روایت رسمی و پرانرژی، مناسب کلیپ تبلیغاتی، تیزرهای علمی-آموزشی پیشرفته و موشن‌های سینمایی

2. **Callirrhoe (کالیرو)**
   * **جنسیت:** زن (Female)
   * **شخصیت:** طبیعی، آرام، رسا، صمیمی و روان (Natural, Easy-going, Fluid, Approachable)
   * **کاربرد:** روایت رسمی و پرانرژی، مناسب کلیپ تبلیغاتی، ارائه‌های فاخر دانشگاهی و آموزش‌های روان

---

## 3. Mandatory Interaction Template

When initializing a video production, the agent must present the following prompt verbatim to the user:

> «قبل از شروع ساخت ویدیو، لطفاً صدای راوی را انتخاب کنید:
> 
> **🎙️ گزینه‌های مصوب (Google Gemini Multimodal Audio):**  
> 1. **Puck (پوک)** — مرد: رسمی، پرانرژی، مدرن و پویا (مناسب کلیپ‌های تبلیغاتی و علمی)  
> 2. **Callirrhoe (کالیرو)** — زن: طبیعی، آرام، صمیمی و روان (مناسب محتوای آموزشی و ارائه‌های فاخر)  
> 
> کدام را انتخاب می‌کنید؟»

**Execution stops completely until the user selects one.**

---

## 4. Model Priority Hierarchy & Quota Fallback Architecture

To maximize speech quality while strictly safeguarding daily request limits on Google AI Studio / Gemini Developer API, synthesis adheres to this immutable priority chain:

```text
Priority 1: gemini-3.8-flash-tts
            │
            ├─► SUCCESS (200 OK) ──► Complete Video Generation
            │
            └─► HTTP 429 / Quota Failure
                │
                ▼
Priority 2: gemini-3.8-flash-lite-tts
            │
            ├─► SUCCESS (200 OK) ──► Complete Video Generation
            │
            └─► HTTP 429 / Quota Failure
                │
                ▼
Priority 3: gemini-3.1-flash-tts-preview (Legacy Quota Fallback)
            │
            ├─► SUCCESS (200 OK) ──► Complete Video Generation
            │
            └─► HTTP 429 / Quota Failure
                │
                ▼
            HALT & REPORT (GeminiTTSQuotaError)
```

### Zero Speculative Probing Doctrine:
* **NEVER** probe candidate models in advance.
* Pick the highest-priority available model, send the genuine generation payload once.
* ONLY fall back if an authentic quota failure occurs (`is_authentic_quota_failure()`).
* Non-quota failures (e.g. 401 Unauthorized, 400 Bad Request, network errors) fail immediately without switching models.

---

## 5. Single Video = One TTS Request Doctrine

* **Whole Video Narration in One Call:** The complete narration script is sent in a single monolithic request.
* **No Scene Splitting:** Never send scene-by-scene requests (`Scene 1 -> TTS`, `Scene 2 -> TTS` is strictly banned).
* **Long Text Exception:** Text exceeding technical token/character thresholds (>4000 characters) is divided into clean sentence chunks, synthesized with identical voice/model/style, and seamlessly concatenated.

---

## 6. Preflight Protocol

1. Synthesize exactly ONE 10–15s sample using `CANONICAL_PREFLIGHT_TEXT`.
2. Present sample to user for approval of Persian naturalness, cadence, and prosody.
3. Upon approval, synthesize the final full-video narration in ONE single request.
