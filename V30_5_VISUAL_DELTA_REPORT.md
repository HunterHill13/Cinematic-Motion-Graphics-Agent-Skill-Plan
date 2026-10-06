# V30.5 Visual Delta & Pixel-Wise Comparison Report

## Executive Summary

**Milestone:** V30.5 — Production Truth & Visual Delta Audit  
**Comparands:**
* Reference Baseline: [`renders/v29/V29_PRODUCTION_MASTER.mp4`](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/renders/v29/V29_PRODUCTION_MASTER.mp4) (4,597,432 bytes, 1080 frames / 36.0s @ 30 FPS)
* Evaluated Production: [`renders/v30/V30_PRODUCTION_MASTER.mp4`](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/renders/v30/V30_PRODUCTION_MASTER.mp4) (4,149,227 bytes, 1080 frames / 36.0s @ 30 FPS)

---

## 1. Pixel-Wise Difference Analysis Across All 1080 Frames

To eliminate subjective impression, frame-by-frame image difference blending and threshold masking were run via FFmpeg and Node.js (`scratch_beat_diff.js`):

```bash
ffmpeg -i v29.png -i v30.png -filter_complex "blend=all_mode=difference,blackframe=amount=1:threshold=15" -f null -
```

### Frame-by-Frame Results Across Narrative Beats:

| Beat | Frame Range | Time (s) | Narrative Content | Percentage of Pixels Differing (>15/255) | Nature of Pixel Change |
| :---: | :---: | :---: | :--- | :---: | :--- |
| **Beat 01** | 0 – 180 | 0.0s – 6.0s | Persian Editorial Hook («آیا هوش مصنوعی...») | **0.0% – 0.9%** | Compression noise only. Geometry & typography are 100% identical. |
| **Beat 02** | 180 – 270 | 6.0s – 9.0s | Singularity Seed & Trajectory | **0.0% – 1.0%** | Compression noise only. Trajectory is 100% identical to V29. |
| **Beat 03** | 270 – 450 | 9.0s – 15.0s | Empirical Foundations («پایه‌های تجربی») | **3.8% – 4.4%** | **MATERIAL DELTA.** Removed `+151.2` labels, removed cyan dots, modified pillar gradient & zenith. |
| **Beat 04** | 450 – 630 | 15.0s – 21.0s | Acceleration / Mutation («جهش») | **0.0% – 0.8%** | Compression noise only. Ring & satellites are 100% identical. |
| **Beat 05** | 630 – 810 | 21.0s – 27.0s | Topological Convergence («همگرایی») | **0.0% – 0.8%** | Compression noise only. Geometric convergence is 100% identical. |
| **Beat 06** | 810 – 1080| 27.0s – 36.0s | Typographic Climax («اصالت») | **0.0% – 0.1%** | Compression noise only. Letterforms & stars are 100% identical. |

---

## 2. Where Did V30 Actually Change Pixels?

### The Brutal Fact:
**V30 changed pixels ONLY in Beat 03 (Frames 270–450, approximately seconds 9.0s to 15.0s).**

Across the entire 36.0-second video (1080 frames):
* **Changed Segment:** Frames 270–450 (180 frames = 6.0 seconds, representing **16.6%** of total duration).
* **Unchanged Segments:** Frames 0–270 and Frames 450–1080 (900 frames = 30.0 seconds, representing **83.4%** of total duration).
* Within the 180 frames of Beat 03 that did change, the maximum pixel area modified was **4.4% of the screen area** (localized to the vertical pillars and text labels, while background grid, vignette, and Persian typography remained identical).

---

## 3. Visual Delta Stills & Difference Heatmap

Three diagnostic stills were extracted at 10.0s (Frame 300) and inspected directly:

1. **V29 Frame 300:** [`renders/v30/diff_v29_f300.png`](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/renders/v30/diff_v29_f300.png)
   * Shows 4 cyan/gold gradient bars with cyan glowing dots on top and numeric monospace annotations (`+92.4`, `+151.2`, `+121.8`).
2. **V30 Frame 300:** [`renders/v30/diff_v30_f300.png`](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/renders/v30/diff_v30_f300.png)
   * Shows 4 dark translucent slate rectangles with a 3px gold zenith highlight line on top. Numeric annotations and cyan dots are gone.
3. **Amplified Pixel Difference:** [`renders/v30/diff_amplified_f300.png`](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/renders/v30/diff_amplified_f300.png)
   * A 10x-amplified difference map shows cyan/white outlines exactly matching the four bars, top dots, and numbers, with 0 delta across the rest of the 1920x1080 frame.

At 5.0s (Frame 150, Beat 01 / Beat 02):
* Amplified difference map: [`renders/v30/diff_amplified_f150.png`](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/renders/v30/diff_amplified_f150.png)
* Confirms zero structural or motion changes; difference is solely random h.264 macroblock quantization noise.

---

## 4. Why Did the Human Reviewer Perceive Almost No Difference?

The human review ("I see no meaningful difference from the previous version") is **100% accurate and mathematically justified**:

1. **83.4% of the sequence was literally identical:** A viewer watching a 36-second video where 30 seconds are identical frame-for-frame will naturally perceive it as the same video.
2. **The single modified beat (Beat 03) had NO choreography change:**
   * In V29: 4 rectangular bars rose from the baseline over 45 frames with a 10-frame stagger delay.
   * In V30: 4 rectangular monoliths rose from the baseline over 45 frames with a 10-frame stagger delay.
   * **The motion verb and choreography were identical.** Only the CSS background fill, apex dot, and text overlay were altered.
   * This is a **Styling change (Category A)**, NOT a **Choreography change (Category C)**.
3. **The impressive V30 Creative Lab was completely disconnected from production:**
   * The razor slit, typographic uncoiling into compass star, and 28-frame frozen iris were never integrated into `V25_5_IntegratedProduction.tsx`.
