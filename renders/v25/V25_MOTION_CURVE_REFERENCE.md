# V25 MOTION CURVE & PERSONALITY REFERENCE

**Authoritative Technical Specification for High-Fidelity Motion Design**  
**Version:** 25.0  
**Project:** Cinematic Motion Graphics Agent Skill  

---

## 1. CORE PHILOSOPHY: FROM PROCEDURAL EASING TO PHYSICAL COHERENCE

Procedural animations look "computery" even when smooth because they rely on:
1. Independent transform stacks (e.g., $X$ position and scale animated with different arbitrary easings).
2. Generic cubic Béziers (`easeIn`, `easeOut`, `easeInOut`) that ignore mass and friction.
3. Discontinuous velocity at transition boundaries ($0\text{ px/s}$ starts, instant stops).
4. Asymptotic spring float tails that cause subpixel shimmer.

**High-fidelity motion design demands kinematic authoring:**
- Every motion possesses **position ($p$)**, **velocity ($v = \dot{p}$)**, and **acceleration ($a = \ddot{p}$)**.
- Transformations enforce **$C^0$ continuity** (position match) and **$C^1$ continuity** (velocity match) across boundaries.
- Timing is dictated by **Material Personality**, not generic duration presets.

---

## 2. THE EIGHT AUTHORITATIVE MOTION PERSONALITIES

```
Personality       Anticipation    Action Velocity    Overshoot     Settle Quality
----------------------------------------------------------------------------------
RIGID             None            Aggressive linear  < 2%          Instant hard lock
HEAVY             Slow inertia    Massive surge      4 - 6%        Damped ground settle
ELASTIC           -8% dip         Snappy launch      12 - 15%      Oscillatory ringout
FLUID             None            C2 continuous S    0%            Smooth parabolic glide
EXPLOSIVE         -3% quick dip   Hyper-velocity     8% sharp      Rapid exponential decay
GLIDE             Gentle takeoff  Uniform cruise     0%            Soft frictional roll
MECHANICAL        None            Piecewise constant 0%            Robotic hard stop
LIGHT             Immediate       Featherweight      1 - 2%        Airy floating arrival
```

---

### 1. `RIGID` (Architectural Monoliths, Structural Frameworks)
- **Visual Feel:** Heavy stone, titanium beams, unyielding structural geometry.
- **Kinematics:** Negligible anticipation. Swift, decisive movement with high directional authority. Tiny ($1.02\times$) overshoot that snaps instantly to zero velocity.
- **Mathematical Profile:**
  $$\text{Action: } E(p) = \text{Bézier}(0.20, 0, 0, 1) \times 1.02, \quad \text{Settle: } \text{Linear decay over final } 25\%$$
- **Primary Use Case:** Pillar erections, foundation plinths, bounding grids.

---

### 2. `HEAVY` (Massive Impacts, Heavy Slams)
- **Visual Feel:** Sledgehammer impact, lead weights, tectonic plate displacement.
- **Kinematics:** Noticeable inertia delay ($t \in [0, 0.20]$ where velocity builds slowly as quadratic $p^2$). Massive acceleration peak at $t = 0.70$. Seismic impact with damped ground vibration ($6\%$ decay envelope).
- **Mathematical Profile:**
  $$v(t) = 1.0 + \sin(\pi p) \cdot 0.06 \cdot e^{-4.5 p}$$
- **Primary Use Case:** Downward word slams, ground-impact squashes, structural collisions.

---

### 3. `ELASTIC` (Kinetic Seeds, Spring Launchers, Rubber Metaphors)
- **Visual Feel:** Stretched rubber sling, archery bowstring release, energetic particles.
- **Kinematics:** Authoritative negative anticipation (pullback to $-8\%$). High launch velocity. Damped harmonic ringout (2–3 visible oscillations before settle).
- **Mathematical Profile:**
  $$\text{Anticipation: } -0.08 \cdot \sin(\pi p), \quad \text{Recovery: } \cos(3\pi p) \cdot 0.15 \cdot e^{-5.0 p}$$
- **Primary Use Case:** Nucleus slingshot launches, bouncing balls, dynamic verbs.

---

### 4. `FLUID` (Organic Metamorphosis, Continuous Topology)
- **Visual Feel:** Liquid mercury, continuous airflow, organic cellular morphing.
- **Kinematics:** $C^2$ continuous acceleration. Zero abrupt jerk ($\dddot{p} \approx 0$). Parabolic symmetric velocity curve. Zero overshoot.
- **Mathematical Profile:**
  $$p(t) = \text{Bézier}(0.37, 0, 0.63, 1)$$
- **Primary Use Case:** Shape morphing (Circle $\to$ Star), ribbon wave growth, camera aperture push.

---

### 5. `EXPLOSIVE` (Quantum Jumps, Shockwaves, Sudden Bursts)
- **Visual Feel:** Lightning strike, supersonic crack, instantaneous phase change.
- **Kinematics:** Ultra-short anticipation ($-3\%$ in $<0.08$ window). Vertical velocity spike reaching peak in first $30\%$ of travel. Sharp impact with immediate exponential dampening ($e^{-6.0 p}$).
- **Primary Use Case:** Radial particle bursts, shatter triggers, typographic explosions.

---

### 6. `GLIDE` (Cinematic Reframe, Elegant Sub-typography)
- **Visual Feel:** Sailplane soaring, ice skating, frictionless spatial tracking.
- **Kinematics:** Low initial acceleration, sustained cruising speed, very gentle aerodynamic braking into rest. Zero impact.
- **Mathematical Profile:**
  $$p(t) = \text{Bézier}(0.16, 1, 0.30, 1)$$
- **Primary Use Case:** Sub-headline reveals, camera tracking drifts, horizon baseline extensions.

---

### 7. `MECHANICAL` (Plotters, Laser Scanners, Precision Calipers)
- **Visual Feel:** CNC router, laser scanning reticle, robotic assembly line.
- **Kinematics:** Piecewise constant velocity ($\dot{p} = \text{const}$). Instantaneous velocity jump from zero to cruising speed and instant drop back to zero without ease-in or ease-out.
- **Primary Use Case:** Laser scanning lines, measurement calipers, technical coordinate ticks.

---

### 8. `LIGHT` (Featherweight Annotations, Particle Drifts)
- **Visual Feel:** Floating dandelion seed, silk ribbon in gentle draft.
- **Kinematics:** Instantaneous pickup (low inertia), buoyant travel, delicate settle without heavy mass.
- **Mathematical Profile:**
  $$p(t) = \text{Bézier}(0, 0.55, 0.45, 1)$$
- **Primary Use Case:** Micro-callout badges, floating ambient dots, subtle metric labels.

---

## 3. VELOCITY HANDOFF MODES AT TRANSFORMATION BOUNDARIES

When Object $A$ transforms into Object $B$, the system must explicitly choose how velocity $\vec{v}_A$ transfers:

| Handoff Mode | Target Initial Velocity $\vec{v}_B$ | Physical Meaning |
|---|---|---|
| `PRESERVE` | $\vec{v}_B = \vec{v}_A$ | Continuous $C^1$ momentum conservation (e.g. accelerating Dot unrolls into Line with matching speed). |
| `REDIRECT` | $|\vec{v}_B| = |\vec{v}_A|, \quad \theta_B = \theta_A + \Delta\theta$ | Kinetic energy conserved, redirected along new axis (e.g. horizontal beam deflects into vertical pillar). |
| `DAMP` | $\vec{v}_B = \lambda \vec{v}_A \quad (\lambda \in [0.4, 0.7])$ | Inelastic collision / friction damping (e.g. flying spline coils into stable orbit ring). |
| `AMPLIFY` | $\vec{v}_B = \gamma \vec{v}_A \quad (\gamma \in [1.2, 1.8])$ | Elastic leverage / energy boost (e.g. compressed spring release). |
| `INVERT` | $\vec{v}_B = -\vec{v}_A$ | Elastic rebound / boundary reflection. |
| `RESET` | $\vec{v}_B = 0$ | Editorial cut / intentional hard arrest before new motion. |

---

## 4. PERCEPTUAL SHAPE MORPH CORRESPONDENCE

To eliminate midpoint pinching, local folding, and unnatural rotational spinning during vector morphs, the V25 engine applies:
1. **Arc-Length Equidistant Resampling:** Source and destination paths are resampled into $N=32$ equidistant points along their geometric perimeter.
2. **Cyclic Shift Optimization:** Tests all $k \in [0, N-1]$ permutations to find:
   $$k^* = \arg\min_k \sum_{i=0}^{N-1} \|P_i - Q_{(i+k)\%N}\|^2$$
3. **Winding Normalization:** Compares clockwise vs counter-clockwise point trajectories and reverses point indexing if $\sum \|P_i - Q_{\text{reversed}}\|^2$ is smaller.
4. **Catmull-Rom to Cubic Bézier Spline Fitting:** Generates smooth $C^1$ continuous tangents at every interpolated point.

---

## 5. MICRO-MOTION DISCIPLINE VS. SETTLE-LOCK

- **Rule 1 (Active Movement):** Use the appropriate motion personality and velocity handoff mode.
- **Rule 2 (Final Settle):** In the final $15\%$ of movement or during an explicit `HOLD` / `SETTLE`, subpixel coordinates snap to integer constants ($0$ shimmer).
- **Rule 3 (Rest Breathing):** Ambient breathing is applied ONLY to non-text background fields and must have a period $\ge 60$ frames.
- **Rule 4 (Zero Leakage):** Never allow camera drift or secondary springs to perturb typography during a reading hold.
