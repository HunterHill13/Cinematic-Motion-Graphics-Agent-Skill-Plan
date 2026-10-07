# V34 — Motion Choreography & Kinetic Continuity Audit

## 1. Audit of Production V33 Implementation (`V33_VisualPoetry.tsx`)

| Event # | Event Name | Frames | Primary Action | Current Implementation in V33 | Current Interpolation / Easing | Velocity Behavior | Anticipation | Accel / Decel | Overshoot / Settle | Secondary / Tertiary Motion | Momentum Handoff | Identified Weakness |
| :---: | :--- | :---: | :--- | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **A** | Opening Line / Horizon | 0–20 | Static horizontal division | Constant coordinate $y=540$ | None (static) | Zero | None | None | None | None | None | Static flat line with zero life or tension buildup before the sag. |
| **B** | Line Tension Sag | 20–65 | Downward cubic bezier focal sag | `interpolate(frame, [20, 65], [0, 1])` | Default linear clamp | Constant linear velocity | **NO** | **NO** (linear progress) | **NO** | Tertiary center node scales linearly ($0 \to 6$) | None | Sag moves at robotic constant speed; lacks gravitational acceleration and elastic resistance. |
| **C** | Line $\to$ Iris Transformation | 78–115 | Sag wraps into elliptical aperture | `interpolate(frame, [78, 115], [0, 1])` | Default linear clamp | Constant velocity ($10 \to 320\text{px}$) | **NO** | **NO** | **NO** | 12 radial rays appear statically scaled | None | The eye simply expands linearly as a geometric shape; does not feel like an organic aperture dilating. |
| **D** | Iris Dilate & Breach Zoom | 125–165 | Camera push-in through pupil | `interpolate(frame, [125, 165], [1, 14])` | Default linear clamp | Linear zoom rate ($1\times \to 14\times$) | **NO** | **NO** (sudden start & stop) | **NO** | None | None | Linear camera zoom feels like CSS transform scale, not physical spatial penetration. |
| **E** | Interior Emergence «نقطه دید» | 160–175 | Text and colonnade fade in | `interpolate(frame, [160, 175], [0, 1])` | Linear opacity fade | Constant rate | **NO** | **NO** | **NO** | None | Broken (abrupt fade) | Fading in via opacity disconnects the camera velocity from the arrival inside the space. |
| **F** | Typographic Flight & Perspective | 170–245 | Camera glides through colonnade | `colonnadeScale` ($0.6 \to 1.25$), `colonnadeZ` ($0 \to -180$) | Default linear clamp | Constant linear crawl | **NO** | **NO** | **NO** | Floor lines are static dashed lines | None | Mechanically crawls forward without parallax depth weighting or flight momentum. |
| **G** | Typographic Collapse into Rhombus | 245–268 | Text shrinks into central diamond | `interpolate(frame, [245, 268], [1, 0])` | Default linear clamp | Constant shrink speed | **NO** | **NO** | **NO** | None | None | Text simply scales down isotropically; does not fold, compress, or snap into the rhombus vertices. |
| **H** | The Sacred Rhombus Appearance | 265–285 | Diamond appears at center | `interpolate(frame, [260, 275], [0, 1])` | Linear opacity fade | Instant static | **NO** | **NO** | **NO** | Internal dashed crosshair | None | Diamond abruptly fades in while text fades out, rather than catching the incoming momentum. |
| **I** | Zero-Velocity Stillness Hold | 285–320 | Complete 35-frame stillness | Hardcoded condition `frame >= 285 && frame <= 320` | Zero velocity ($v=0$) | Pinned rest | N/A | Braking before hold was missing | N/A | None | Tension present | Conceptually strong, but the entrance into stillness lacked a sharp deceleration brake. |
| **J** | Pre-Recoil Micro-Glow | 321–335 | Glow expands before pull-back | `interpolate(frame, [321, 335], [1, 2.5])` | Linear scalar | Constant speed | Slight | **NO** | **NO** | None | Weak | Linear scalar glow lacks the breathing shudder of critical potential energy. |
| **K** | 10,000× Scale Pull-Back | 335–385 | Exponential camera pull-back | `spring({ damping: 18, stiffness: 60, mass: 1.4 })` | Remotion default spring | Smooth spring deceleration | **NO** | Spring launch | Minor spring settle | None | Moderate | Spring is acceptable, but lacks initial explosive launch snap and directional momentum handoff. |
| **L** | Revelation of «نور» & Settle | 380–450 | Giant word «نور» revealed | `interpolate(pullBackSpring, [0.35, 0.95], [0, 1])` | Tied to spring progress | Decelerating crawl | **NO** | Decelerating | None | Static caption fade | Restored core | Word fades in smoothly but lacks physical calligraphy weight landing or ink settle. |

---

## 2. Quantitative Motion Quality Scorecard (Before V34 Implementation)

| Criterion | V33 Score (1–10) | Root Cause Diagnosis |
| :--- | :---: | :--- |
| **Non-linearity** | **3.5 / 10** | 8 out of 10 primary motions use raw un-eased `interpolate(frame, [a, b], [v0, v1])`. |
| **Acceleration Quality** | **4.0 / 10** | Almost zero gradual force buildup; motions jump instantaneously to constant velocity. |
| **Deceleration Quality** | **4.5 / 10** | Hard abrupt stops at clamp boundaries. |
| **Anticipation** | **2.0 / 10** | No preparatory counter-movement before the horizon sag, aperture dilate, or pull-back. |
| **Momentum Continuity** | **4.0 / 10** | Velocity dies at the end of each segment instead of being handed over to the next. |
| **Overshoot / Follow-Through**| **3.0 / 10** | Absent across almost all vector transformations. |
| **Settling Behavior** | **3.5 / 10** | Elements freeze at their destination coordinate rather than undergoing damped micro-settle. |
| **Secondary Motion** | **3.0 / 10** | Rays and details are statically bound to parent transforms without phase lag. |
| **Motion Contrast** | **6.0 / 10** | Only contrast was between linear crawl and the 35-frame zero-velocity freeze. |
| **Camera Choreography** | **4.0 / 10** | Camera zoom was an isotropic mathematical multiplier rather than spatial camera movement. |
| **Morph Quality** | **4.5 / 10** | Morphing relied on opacity transitions layered over linear scales. |
| **Temporal Hierarchy** | **4.0 / 10** | All parts of an object moved simultaneously at identical speeds. |
| **Overall Authored Feel** | **4.5 / 10** | The concept is a 9/10, but the kinetic execution feels like code tweening. |

---

## 3. Motion Ownership Audit: The Linear Interpolation Offenders

In `V33_VisualPoetry.tsx`:
- Line 33: `interpolate(frame, [20, 65], [0, 1])` $\to$ **CRITICAL DEFECT:** Linear sag progress.
- Line 50: `interpolate(frame, [78, 115], [0, 1])` $\to$ **CRITICAL DEFECT:** Linear aperture opening.
- Line 56: `interpolate(frame, [125, 165], [1, 14])` $\to$ **CRITICAL DEFECT:** Linear camera breach zoom.
- Line 75: `interpolate(frame, [170, 245], [0, 1])` $\to$ **CRITICAL DEFECT:** Linear colonnade flight.
- Line 85: `interpolate(frame, [245, 268], [1, 0])` $\to$ **CRITICAL DEFECT:** Linear collapse of typography.
- Line 126: `interpolate(pullBackSpring, [0.35, 0.95], [0, 1])` $\to$ Linear opacity ramp.

**Mandate for V34:** Replace every unmotivated linear interpolator with calibrated velocity profiles, asymmetric anticipation, momentum handoffs, and physical settling curves from `AuthoredKeyframeEngine` and custom Bezier acceleration curves.
