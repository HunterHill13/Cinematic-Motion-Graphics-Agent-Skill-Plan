# Motion Language & Kinematic Grammar (v4.1)

## 1. Kinematic Foundations
Motion in V4.1 is strictly non-linear and physical:
1. **Acceleration Over Constant Velocity (`aesthetic-rules.md` R2)**:
   Elements accelerate into motion using cubic/quintic in-curves and decelerate smoothly with overshoot springs or cubic out-curves. No constant-speed linear slides.
2. **Segmented Timelines (`Motion.ts` primitives)**:
   Every shot uses `seg(t, t0, t1, ease)` for exact timeline partitioning. Elements enter, hold, and transition with sub-frame precision.
3. **Breathing Hold (`aesthetic-rules.md` R1)**:
   Key information holds still for $\ge 1.0\text{ s}$ (30 frames) upon settling so the viewer can read and comprehend before any subsequent movement begins.

---

## 2. The Core Motion Choreography
- **Hero Reveal**:
  - `TrackingExpandReveal`: Blur starts at 10px, scales from 0.92 to 1.0, glyphs slide outward to an exact final coordinate.
- **Needle Sweep**:
  - 12 frames outward sweep (0 to 270 degrees) with `Easing.out(cubic)`.
  - 13 frames return sweep overshooting past target by 8 degrees.
  - 7 frames spring settle returning to true target value.
  - Value numeral pops with `scale: 0.3 -> 1.18 -> 1.0` in 8 frames.
- **Line Carry Transition**:
  - A metric line extends across the boundary (`frame 34–94`).
  - Camera tracks horizontally in synchronization (`Easing.inOut(cubic)`).
  - Line executes right-angle turn and draws the boundary box (`frame 94–112`).
  - Next shot elements bloom within the drawn boundary (`frame 112–124`).
- **Camera Discipline**:
  - Perspective camera with 1200–1400px focal length.
  - Maximum rotation: $\pm 4^\circ$ on pitch (rotX) and $\pm 6^\circ$ on yaw (rotY) during travel.
  - Camera is rock-steady during informational reading phases.
