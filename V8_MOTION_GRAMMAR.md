# V8_MOTION_GRAMMAR.md — Continuous Motion Choreography Grammar

## 1. Core Paradigm Shift: From Scene Stacking to Visual Performance

In V7, scenes were static editorial posters with entrance/exit transitions. 
In V8, **the film is a single unbroken spatial and kinetic transformation**.

A new scene is **NEVER** a blank slate or a fresh page.
A new scene is born out of the physical deceleration, collision, or spatial migration of the preceding actors.

```text
[Actor A: Energy / Rule / Numeral]
             │
             ▼ (Anticipation)
        Acceleration
             │
             ▼ (Impact)
    Deformation / Settle
             │
             ▼ (Spatial Recomposition)
  Actor A migrates to anchor coordinate
             │
             ▼ (Energy Transfer)
   Actor B is born from Actor A's vector
```

---

## 2. Motion Primitive Library (Code Level)

Every motion in V8 is built from these intentional primitives:

### Primitive A: Anticipation & Kinetic Entry (`anticipateKinetic`)
- **Physics:** $-10\text{px}$ reverse pull-back across 4 frames, followed by a rapid $0.16, 1, 0.3, 1$ editorial surge.
- **Rule:** Elements never just fade from $0 \to 1$. They store energy before moving.

### Primitive B: Scale Punch & Elastic Settle (`scalePunch`)
- **Physics:** At the exact semantic impact frame, the scale hits $1.08 \to 1.00$ over 6 frames.
- **Rule:** Reserved exclusively for authoritative quantitative anchors (16, 65, 110, 130) and key institutional nouns.

### Primitive C: Directional Mask Reveal (`directionalMask`)
- **Physics:** Reveal along an explicit axis (`clipPath: inset(...)`) driven by a leading edge line.
- **Rule:** Words and decree titles reveal along the motion direction of their bounding actor.

### Primitive D: Persistent Visual Actors (`persistentActor`)
- Visual actors that traverse multiple shots without unmounting:
  - **Actor A (The Sovereign Horizon / Editorial Rule):** Originates as the baseline of Baqiyatallah PR crest $\to$ stretches into the Legal Axis $\to$ splits into the GPA/Term/Criteria ground lines $\to$ becomes the Temporal Split Wall $\to$ forms the datum for the ascending threshold monoliths $\to$ resolves into the closing crest.
  - **Actor B (The Primary Numeral Form):** The giant typographic numeral that morphs in scale and semantic role.

### Primitive E: Impact $\to$ Reaction (`impactReaction`)
- When a primary graphic impacts the canvas, secondary elements and background geometry flex or displace by $4\text{px}–8\text{px}$ in sympathetic reaction before settling.

### Primitive F: Deliberate Stillness & Breath (`stillnessHold`)
- An element must hold completely motionless for a minimum of 30–60 frames during spoken comprehension before any exit anticipation begins.

---

## 3. Transition Taxonomy for V8

| Scene Boundary | Transition Type | Active Kinetic Bridge | Why It Works |
| :--- | :--- | :--- | :--- |
| **Shot 01 $\to$ Shot 02** | **Type E: Directional Wipe + Rule Carry** | Gold editorial rule extends to 100% width, wiping the screen right-to-left and immediately becoming the legal divider bar of Shot 02. | Preserves directional velocity; zero blank frame interval. |
| **Shot 02 $\to$ Shot 03** | **Type C: Energy Transfer** | Numeral «۲» compresses into a high-density point and strikes the left margin, detonating the arrival of Numeral «۱۶». | Semantic energy transfer from Article 2 to Criterion 1. |
| **Shot 03 $\to$ Shot 04** | **Type D: Spatial Recomposition** | Criterion 3's horizontal ground rail slides into the vertical axis, splitting the screen into the active study zone and the amber cutoff wall. | Physical geometry rotates $90^\circ$ to represent time division. |
| **Shot 04 $\to$ Shot 05** | **Type H: Scale Transition (Micro $\to$ Macro)** | The temporal cutoff line dissolves into the horizontal ground line from which numerals 65, 110, and 130 rise. | Seamless baseline carryover. |
| **Shot 05 $\to$ Shot 06** | **Type B: Graphic Convergence** | The 130 monolith collapses inward into the center coordinate $(960, 540)$, re-forming the central university seal. | Closes the film's geometric loop back to institutional authority. |

---

## 4. Anti-Patterns Rejected in V8
1. **NO Isolated Subtree Mounts:** Components must not mount on frame $t=0$ from pure opacity zero if their predecessor just disappeared.
2. **NO Decorative Floating:** If an element is on screen, it is either an anchor, a label, or a kinetic driver. Zero gratuitous dust particles or unmotivated spinning circles.
3. **NO Homogeneous Easings:** Fast impacts use snappy curves (`0.25, 1, 0.5, 1`); major transformations use long-tailed editorial curves (`0.16, 1, 0.3, 1`); holds are absolute zero-motion locks.
