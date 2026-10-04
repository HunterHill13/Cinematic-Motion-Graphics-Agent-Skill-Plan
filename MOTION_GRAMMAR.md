# MOTION_GRAMMAR.md — The 8-Phase Motion Choreography Grammar

In professional motion graphics, an element does not merely appear (`opacity: 0 -> 1`).
Every visual asset goes through a motivated lifecycle coordinated with narration beats.

---

## The 8-Phase Lifecycle

```
[1. PREPARE] ──> [2. ENTER] ──> [3. BUILD] ──> [4. ACCENT]
                                                   │
[8. SETTLE]  <── [7. HANDOFF] <── [6. TRANSFORM] <── [5. IMPACT]
```

### 1. PREPARE (Anticipation)
- **Duration:** 4–8 frames.
- **Action:** Micro-contraction, focus glow, or directional line drawing indicating where the eye should look before the main graphic arrives.
- **Example:** A small cyan cursor pulses at $(x, y)$ before expanding into a title beam.

### 2. ENTER (Kinetic Arrival)
- **Duration:** 15–25 frames.
- **Curve:** `MOTION_EASINGS.editorial` (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Action:** High initial velocity with an elegant, long deceleration tail. Never linear.
- **Techniques:** Mask reveals, path drawing (`strokeDashoffset`), tracking expansion.

### 3. BUILD (Graphic Construction)
- **Duration:** 20–40 frames.
- **Action:** Internal geometry pieces lock together (e.g. caliper ticks appear, progress rings stroke forward, sub-labels reveal).

### 4. ACCENT (Semantic Highlight)
- **Duration:** 10–18 frames.
- **Action:** Triggers at the exact word uttered by the narrator (e.g., when saying "۱۶", the number pulses with a gold aura).

### 5. IMPACT (Data Settlement)
- **Duration:** 8–15 frames.
- **Action:** Elastic lock, tick snap, or subtle scale punch when numerical counter hits target value (e.g. 65, 110, 130).

### 6. TRANSFORM (State Change)
- **Duration:** 20–35 frames.
- **Action:** The graphic adapts its shape to prepare for the next narrative clause without unmounting.

### 7. HANDOFF (Transition Initiation)
- **Duration:** 30–50 frames.
- **Action:** Element bridges across the scene boundary. Elements from Scene A morph, compress, or project energy into Scene B.

### 8. SETTLE (Resting Presence)
- **Duration:** Ambient / Continuous.
- **Action:** Subtlest breathing ($\le 1.5\text{px}$ drift, $0.01$ scale shimmer) to keep the scene organic while maintaining absolute reading clarity.

---

## Anti-UI Invariants
1. **NO Default Card Stacks:** Do not enclose every piece of information in a rounded glass rectangle with a 1px border. Use open negative space, floating vector rails, and typographic grouping.
2. **NO Disjointed Cuts:** No scene shall end abruptly while the next starts from black. The $\ge 30$-frame overlap rule is mandatory.
3. **NO Naked Text:** Crucial numbers and headers must be backed by kinetic vector geometry (calipers, arcs, alignment reticles).
