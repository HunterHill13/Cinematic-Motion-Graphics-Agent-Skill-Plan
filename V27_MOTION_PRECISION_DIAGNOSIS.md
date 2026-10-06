# V27 — Motion Precision & Temporal Curve Diagnosis

## 1. Executive Summary
Following the V26 visual choreography integration, the visual staging and spatial metaphors improved significantly. However, a rigorous frame-by-frame review of the actual rendered motion reveals persistent temporal and trajectory flaws that prevent the motion from feeling like high-end, hand-crafted motion graphics.

---

## 2. 5 Identified Motion Flaws in Current Production

| # | Scene / Element | Observed Flaw | Root Cause Classification | Detailed Diagnosis |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Beat 02 Slingshot (f115 - 180)** | Abrupt acceleration jump at launch; rigid linear cruise | **Keyframe segmenting & velocity profile** | At frame 145 (b2Frame=25), the element shifts instantly from negative anticipation to forward flight via `Easing.bezier(0.12, 0, 0.39, 0)`. The initial velocity jumps discontinuously instead of smoothly accelerating out of maximum tension. |
| **2** | **Beat 06 Type Slam (f660 - 695)** | Oversmoothed impact; lack of visual punctuation | **Easing curve & hold timing** | The word «شتاب» falls in 23 frames, but its squash rebound is interpolated across a wide curve with no 1–2 frame impact punctuation hold before re-expansion. The impact feels soft rather than physically authoritative. |
| **3** | **Beat 04 Shape Morph (f390 - 435)** | Perceptual speed stall at midpoint | **Morph temporal parameterization** | Linear time parameter $t \in [0, 1]$ across `interpolateOptimalMorph` produces uneven perceptual speed: the corners round off rapidly in the first 10 frames, then the shape stalls for 20 frames before suddenly connecting to the ring rotation. |
| **4** | **Beat 01 Datum Trace (f0 - 50)** | Floatiness during entrance; premature slow-down | **Velocity profile & duration allocation** | `Easing.bezier(0.16, 1, 0.3, 1)` applies a long, sluggish deceleration tail of over 25 frames for a simple 1360px rule, causing the line to float into place rather than snapping with mechanical precision. |
| **5** | **Beat 07 Portal Through (f810 - 920)** | Inconsistent transform composition | **Transform composition** | Camera scale ($1.0 \to 1.15$) and multi-plane depth rings ($0.8x \to 4.5x$) use separate, uncoordinated Bézier curves. The rings appear to decouple from the camera lens, breaking the illusion of 3D spatial transit. |

---

## 3. Frame-Rate Diagnostic (Hypothesis Testing)
To verify whether temporal sampling is the issue:
- Tested hero translation at 30 FPS, 60 FPS, and 120 FPS.
- **Finding (Case B)**: The trajectory flaw persists across all frame rates because the underlying Bézier curves lack intentional segmenting (anticipation, launch, cruise, impact, punctuation, settle). Increasing FPS merely samples an uncrafted curve more frequently.
- **Decision**: Production will remain at **30 FPS**. Quality will be solved via **authored keyframe segments and calibrated velocity profiles**.
