# V5.2 Quality Control & Verification Report

## Executive Summary
- **Target Version**: V5.2 (Production-Grade Motion Graphics + Gemini Persian TTS)
- **Composition**: `PersianEditorialMasterV52` (1920x1080 @ 30 FPS, 2361 frames / 78.71s)
- **Master Video Render**: `projects/persian_editorial_motion_test_v5_2/renders/final.mp4` (32.5 MB)
- **Gate 6 Proof Video**: `projects/persian_editorial_motion_test_v5_2/qc/proof_18s.mp4` (6.1 MB, 18.0s)
- **Contact Sheet**: `projects/persian_editorial_motion_test_v5_2/qc/contact_sheet_master.jpg`
- **100% Crop Forensic**: `projects/persian_editorial_motion_test_v5_2/qc/crop_100pct_center.jpg`
- **Waveform Diagnostic**: `projects/persian_editorial_motion_test_v5_2/qc/waveform.png`

---

## 1. Content Immutability Verification (Part A / Gate 1)
- **Canonical Test Script**: `projects/persian_editorial_motion_test_v5_2/text/canonical_script.txt`
- **Canonical Script SHA256**: `84b7ca94d2b4144f2de785d890f5b4580b5c468e3ea71d11e92b1e3486784452`
- **Invariant Audit**:
  - `canonical semantic content == display semantic content == TTS semantic content`
  - Validated by `scripts/validate_content_gate.py`: **100% PASS**.
  - Zero invented information, zero grammar changes, zero omitted facts.

---

## 2. Google Gemini-TTS Voice Engine (Part B & K / Gate 2)
- **Primary Provider**: **Google Gemini-TTS**
- **Model Used**: `gemini-2.5-flash-preview-tts` (selected via official `generativelanguage.googleapis.com` endpoint with official API key authentication)
- **Style Direction Prompt**:
  > "با لحن یک گوینده حرفه‌ای مستند علمی ایرانی صحبت کن. فارسی معیار رایج در ایران با تلفظ طبیعی تهرانی. لحن با اعتمادبه‌نفس، واضح، گرم و کمی پرانرژی باشد. جمله‌ها را به صورت پیوسته و طبیعی بیان کن و بین جمله‌ها مکث کوتاه و طبیعی داشته باش. از لحن رباتیک، خبری، بیش‌ازحد رسمی یا نمایشی خودداری کن. کلمات فارسی را طبیعی و روان تلفظ کن."
- **Fallback Policy**: **Zero fallback allowed** (`gemini-2.5-flash-preview-tts` executed directly; Edge-TTS strictly disabled).
- **Generation Method**: Single continuous narration generation (**ONE SCRIPT -> ONE GENERATION -> ONE PCM/WAV**).
- **Number of Segments**: Exactly **1 continuous asset** (`raw_voice.wav`, 3,804,046 bytes @ 24,000 Hz, converted to 48,000 Hz master).

---

## 3. Audio QC & Single Voice Invariant (Part B & K / Gate 3)
- **Single Voice Invariant**: Validated across all 2,361 frames: `active_narration_count <= 1` (0 overlaps, 0 duplicate voices, 0 stale audio clips).
- **Overlap Report (`overlap_report.json`)**:
  - `active_narration_count_max`: 1
  - `single_voice_invariant_violation_count`: 0
  - `duplicate_narration_detected`: false
- **Loudness & Mastering Metrics (`loudness.txt`)**:
  - **Integrated Loudness**: `-16.0 LUFS` (broadcast target)
  - **Loudness Range (LRA)**: `3.0 LU`
  - **True Peak**: `-1.0 dBFS` (strict ceiling, 0 clipping)
  - **Sample Rate**: `48,000 Hz`
  - **Channels**: 2 (stereo mix with ducked institutional music and tactile SFX)

---

## 4. Visual Motion Quality & Editorial Design (Part C, D & J / Gate 6 & 7)
- **Visual Structure**: 6 dedicated narrative shots synchronized exactly to speech cadence:
  1. **Shot 01 (0 - 12.16s / 0 - 365f)**: Baqiyatallah PR opening & National candidate hook question.
  2. **Shot 02 (12.16s - 21.16s / 365 - 635f)**: Directive decree vector highway (Section Kaf, Article 2).
  3. **Shot 03 (21.16s - 49.16s / 635 - 1475f)**: Three architectural criteria monoliths (GPA ≥ 16, Discipline/Years, ≥ 6 Articles).
  4. **Shot 04 (49.16s - 57.16s / 1475 - 1715f)**: Academic time window + 1-year post-graduation extension gate.
  5. **Shot 05 (57.16s - 72.33s / 1715 - 2170f)**: Threshold gauges across university tiers (65, 110, 130 score steps).
  6. **Shot 06 (72.33s - 78.71s / 2170 - 2361f)**: Grand assembly sign-off & call to action.
- **Camera & Parallax**: Controlled 2.5D `EditorialCamera` with 0% erratic handheld wobble; smooth perspective dollys (`0.96x -> 1.03x`).
- **Forensic 100% Crop Inspection**:
  - Inspected `crop_100pct_center.jpg`: crisp vector borders, zero font aliasing, clean Vazirmatn Persian typography rendering.

---

## 5. Technical Video Encoding Report (Part F / Gate 5)
- **Resolution**: `1920x1080` (Native horizontal 16:9 YouTube format)
- **Frame Rate**: `30.0 fps`
- **Video Codec**: `H.264 (High Profile, progressive, yuvj420p)`
- **Video Bitrate**: `2,976 kb/s`
- **Audio Codec**: `AAC-LC (stereo, 48,000 Hz, 317 kb/s)`
- **Total Duration**: `00:01:18.72` (78.72 seconds / 2,361 frames)
- **Total File Size**: `32.5 MB`
