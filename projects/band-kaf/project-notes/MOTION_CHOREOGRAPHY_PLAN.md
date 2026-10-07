# V40 MOTION CHOREOGRAPHY PLAN: ENGINES, PROFILES & TOPOLOGY

> **Milestone:** V40 — Motion-First Production Rebuild  
> **Core Architecture:** Multi-Engine Integration via `AuthoredKeyframeEngine`, `TransformationContinuityEngine`, and `MotionFidelityEngine`  
> **Engine Execution:** 100% active in runtime code, driving canvas/SVG render pipelines directly.

---

## 1. CODEBASE ENGINE INTEGRATION STACK

In V40, the following engines are directly wired into the frame-render loop:

```text
               useCurrentFrame()
                      │
                      ▼
         ChoreographyEventGraph.ts
         (Determines active semantic beat & state machine)
                      │
                      ▼
         MotionOwnershipController.ts
         (Ensures single dominant driver per frame: Monolith vs Camera)
                      │
       ┌──────────────┴──────────────┐
       ▼                             ▼
AuthoredKeyframeEngine.ts     TransformationContinuityEngine.ts
(Calculates non-linear        (Computes vector path morphing &
 velocity curves, easing,      2D→3D topological extrusion)
 anticipation & settle)              │
       │                             │
       └──────────────┬──────────────┘
                      ▼
            MotionFidelityEngine.ts
            (Calculates kinematics, momentum handoff, and secondary inertia)
                      │
                      ▼
          V40 Monolith DOM / Canvas Pipeline
```

---

## 2. THE 5 MOTION PERSONALITIES

The motion across V40 is never homogeneous. Five distinct motion personalities are deployed:

### Personality 1: Heavy Architectural Movement (سنگین، معماری، دارای اینرسی)
* **Physics Model:** High mass ($m = 8.5$), high friction ($\mu = 0.42$), low restitution ($e = 0.08$).
* **Used In:** Monolith base shifts, the 3 plinth ascents (Acts 10–12), and the Band-K Citadel reassembly.
* **Curve Profile:** Slow, effortful acceleration out of rest; sustained maximum velocity during displacement; prolonged, authoritative braking into the final stop.
* **Engine Implementation:** `AuthoredKeyframeEngine.cubicBezier(0.75, 0.0, 0.15, 1.0)`.

### Personality 2: Sharp Kinetic Impact (ضربه کینتیک تیز و آنی)
* **Physics Model:** Extreme initial velocity with instantaneous negative acceleration; high impulse.
* **Used In:** The 16.0 gate limit stop (Act 5), the Band-K wing slam (Act 3), and locking pin engagements.
* **Curve Profile:** Rapid acceleration curve followed by a hard wall strike ($v \to 0$ in 1 frame), triggering secondary shockwaves.
* **Engine Implementation:** `PhysicalBounceRecipe.evaluateImpact()` with $k_{\text{rebound}} = 0.18$.

### Personality 3: Elastic Transformation (تبدیل الاستیک و جهش فنری)
* **Physics Model:** Damped harmonic oscillator ($m = 1.0, k = 140, c = 12$).
* **Used In:** Monolith bifurcation (Act 2), hexagonal gate blooming (Act 7), and caliper breathing.
* **Curve Profile:** Compression against direction of travel (anticipation, $-12\%$), explosive release, controlled overshoot ($+8\%$), and rapid three-cycle decay to equilibrium.
* **Engine Implementation:** `AuthoredKeyframeEngine.spring(mass=1.0, stiffness=140, damping=12)`.

### Personality 4: Controlled Precision (دقت میکرومتری و سنجش مهندسی)
* **Physics Model:** Constant-jerk servo curve ($S$-curve kinematics).
* **Used In:** Scale mark calibration, optical beam sweep (Act 8), and numerical typography reveals.
* **Curve Profile:** Symmetric sigmoid transition with zero overshoot, perfectly matching acoustic ticks.
* **Engine Implementation:** `AuthoredKeyframeEngine.smoothStep(5th_order)`.

### Personality 5: Intentional Stillness (سکون هدفمند و مکث دراماتیک)
* **Physics Model:** Absolute zero kinetic delta ($\Delta v = 0$) held with architectural permanence.
* **Used In:** Frame 460–485 (holding the question before the statutory slam), Frame 1140–1165 (holding the 16.0 notch), and Frame 2470–2510 (holding the 130 climax).
* **Rule:** Stillness is not lack of animation; it is the deliberate punctuation mark that allows the viewer's eye to absorb statutory weight.

---

## 3. THREE-TIER MOTION HIERARCHY

Every transformation beat executes across three synchronized visual tiers:

```text
┌────────────────────────────────────────────────────────┐
│ PRIMARY (The Dominant Architectural Actor)              │
│ - Monolith body translation, rotation, and morph       │
│ - Plinth vertical rise (65 / 110 / 130)                │
└───────────────────────────┬────────────────────────────┘
                            │ (Transfers Momentum)
                            ▼
┌────────────────────────────────────────────────────────┐
│ SECONDARY (Reactive Mechanical Detail)                 │
│ - Bevel lighting glints that track surface normal      │
│ - Hydraulic piston compression and linkage rotation    │
│ - Ground plane shadow distortion and reflection skew   │
│ - Camera reaction (subtle shake on heavy impact)       │
└───────────────────────────┬────────────────────────────┘
                            │ (Environmental Resonance)
                            ▼
┌────────────────────────────────────────────────────────┐
│ TERTIARY (Micro-Atmospheric Response)                  │
│ - Optical dust motes displaced by massive displacement │
│ - Coordinate grid datum line flashes and laser traces  │
│ - Emissive amber core bloom expansion/contraction      │
└────────────────────────────────────────────────────────┘
```

---

## 4. CAMERA CHOREOGRAPHY & THREE-DIMENSIONAL SPACE

The camera is an active storyteller and participant, traversing deep 3D coordinates $(X, Y, Z, \theta_x, \theta_y, \theta_z)$:

```text
Camera Choreography Timeline:
[Act 1: Centered Eye-Level] 
      │ (Orbit & Pull-back 15°)
      ▼
[Act 2: 3/4 Isometric Perspective — Framing Dual Wings]
      │ (High-Speed Snap Zoom)
      ▼
[Act 3: Macro Low-Angle View of Band-K Citadel Joint]
      │ (Camera Crane-Up & Pitch Down 30°)
      ▼
[Act 4–7: Orthographic Plan-View Inspection of 3 Gates]
      │ (Horizontal Tracking Shot)
      ▼
[Act 8: Linear Depth Traversal along 1-Year Temporal Rail]
      │ (Dramatic Pull-Back & Low-Angle Dutch Tilt)
      ▼
[Act 9–12: Monumental Wide Hero Shot of 65/110/130 Plinths]
      │ (Slow Smooth Orbit to Institutional Center)
      ▼
[Act 13: Elegant Sovereign Settle on BMSU Seal]
```

### Camera Transitions Deployed:
1. **Push-In:** Dramatic velocity acceleration toward the 16.0 gate during academic verification.
2. **Pull-Back:** Sweeping crane retreat as the three plinths (65, 110, 130) rise, expanding frame composition from intimate macro to staggering architectural grandeur.
3. **Orbit:** 45-degree rotational swing around the monolith as it splits into dual paths, revealing thickness and depth.
4. **Depth Traversal:** Tracking camera that rides alongside the 1-year temporal axis, passing graduation pylons in continuous parallax.

---

## 5. TOPOLOGY-PRESERVING 2D → 3D CONTINUITY (V36.5 FIX APPLIED)

Learning from the V36.5 craft fix, all 3D transitions in V40 follow continuous topological rotation and extrusion:
1. **No Sudden Geometric Spawns:** A side face or extrusion wall never pops in with an opacity fade.
2. **Continuous Angle-Driven Extrusion:**
   $$\text{FaceVisibility}(\theta) = \max(0, \mathbf{N} \cdot \mathbf{V})$$
   As the monolith rotates by angle $\theta$, the orthogonal side face is revealed progressively from zero width:
   $$\text{Width}_{\text{side}} = \text{Depth} \times \sin(\theta)$$
3. **Silhouette & Negative Space Continuity:** The silhouette of the Persian letter "ک" is preserved as the outer convex hull of the 3D form, ensuring instant cultural and visual recognition.
