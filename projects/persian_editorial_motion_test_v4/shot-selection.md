# Shot Selection & Recipe Evaluation Dossier

## 1. Editorial Subject Matter
- **Topic**: «دستورالعمل انتخاب دانشجوی پژوهشگر برجسته کشور (بند ک، ماده ۲ آیین‌نامه استعداد درخشان وزارت بهداشت)»
- **Total Duration**: ~83.3 seconds (2500 frames @ 30 FPS).
- **Proof-of-Quality Target**: 18 seconds (540 frames @ 30 FPS) covering Shots 1 through 3.

---

## 2. Shot-by-Shot Candidate Evaluation

### Shot 1: The Ministerial Decree & Institutional Emblem (0–6s / frames 0–180)
- **Narrative Intent**: Formal, commanding opening establishing the Ministry of Health and Medical Education directive with high visual authority.
- **Candidate Recipes Evaluated**:
  - **Candidate A: `type-entrance-moves/CelFlashStomp`**: Fast pop-in text with flash. *Verdict: REJECTED*. Too aggressive/commercial for a ministerial directive; lacks solemn weight.
  - **Candidate B: `title-demote-to-label`**: Title shrinks to header. *Verdict: REJECTED*. Good, but too simple for establishing institutional depth.
  - **Candidate C: `type-assembly-moves/TrackingExpandReveal` + `PageCam2D` 2.5D Depth**: Title begins tightly packed, expands with butter-smooth per-glyph translation, blur dissipation, and camera slowly pushing through ambient golden dust onto the seal.
- **Winning Recipe**: **Candidate C (`TrackingExpandReveal` + `depth-layer-moves`)**.
  - **Selection Rationale**: Solves the R1 & Q5 rules (one hero element with complete action arc, breathing hold of 1s) and tracking expansion conveys prestige.
  - **Adaptation Plan**:
    - Central emblem of Ministry of Health / Baqiyatallah Research Committee drawn in vector gold (`#D4AF37`).
    - Title «بند «کاف» آیین‌نامه استعدادهای درخشان» expands with kinetic tracking.
    - Camera: slow push in (`zoom: 0.95 -> 1.05`, `persp: 1200px`).

---

### Shot 2: The Core Mandate & Metric Thresholds (6–12s / frames 180–360)
- **Narrative Intent**: Introducing the 4 academic disciplines and their requisite score thresholds (16, 65, 110, 130).
- **Candidate Recipes Evaluated**:
  - **Candidate A: UI Grid of 4 Cards (Static HTML style)**: *Verdict: STRICTLY REJECTED*. Reverts to the "slideshow/UI card" failure mode.
  - **Candidate B: `demos/data/chart-live-moves/AxisRescaleShockV2`**: Graph with axes rescaling. *Verdict: REJECTED*. Too abstract for discrete point thresholds.
  - **Candidate C: `demos/data/gauge-readout-moves/NeedleSweepSelftest`**: 3–4 precision radial gauges sweeping with non-linear acceleration, slight overshoot, and spring settle, revealing numbers with synchronized optical tick sound.
- **Winning Recipe**: **Candidate C (`NeedleSweepSelftest`)**.
  - **Selection Rationale**: Pure motion graphics craft. The needle sweep (0 to 270 degrees in 12 frames, overshooting by 8 degrees and settling) gives physical inertia, high information clarity, and professional data visualization.
  - **Adaptation Plan**:
    - 4 precision gauges across the horizontal plane:
      1. دکتری تخصصی بالینی: 16 امتیاز
      2. کارشناسی ارشد: 65 امتیاز
      3. دکتری تخصصی (Ph.D): 110 امتیاز
      4. دکتری عمومی (پزشکی / دندانپزشکی / داروسازی): 130 امتیاز
    - Needles sweep staggered by 4 frames each with crisp mechanical click SFX.

---

### Shot 3: Line-Carried Transition & The Four Pillars (12–18s / frames 360–540)
- **Narrative Intent**: Transitioning from score thresholds to the evaluation pillars (مقالات، اختراعات، طرح‌های تحقیقاتی، همایش‌ها) without a slideshow cut.
- **Candidate Recipes Evaluated**:
  - **Candidate A: Slide left / Crossfade cut**: *Verdict: STRICTLY REJECTED*. Textbook slideshow defect.
  - **Candidate B: `demos/transition/cube-navigation`**: 3D cube turn. *Verdict: REJECTED*. Too playful; risks disorienting text readability (violates Q6).
  - **Candidate C: `demos/transition/line-carry-transition` ("Catch Me If You Can")**: The baseline of the gauge readout extends into a kinetic vector line that travels across the screen with the camera, then draws the geometric perimeter of the academic evaluation rubric.
- **Winning Recipe**: **Candidate C (`LineCarryTransition`)**.
  - **Selection Rationale**: Provides 100% spatial and kinematic continuity. The viewer's eye follows a continuous moving entity, completely eliminating any feel of "slides".

---

### Subsequent Shots for Full Video (18–83.3s / frames 540–2500)
- **Shot 4: Evaluation Metrics & Paper Scoring (18–32s / frames 540–960)**:
  - *Recipe*: `demos/typography/word-relay-filmstrip` + `demos/data/chart-live-moves/OscilloscopeStreamV2`.
- **Shot 5: Exclusion Criteria & Ethics Gate (32–48s / frames 960–1440)**:
  - *Recipe*: `demos/transition/circle-match-iris` + `demos/ui-entrance/svg-shape-morph` (Ethics seal & committee gate).
- **Shot 6: Comparative Distribution (48–66s / frames 1440–1980)**:
  - *Recipe*: `demos/data/chart-live-moves/UnitDotSwarmRegroupV2` (Swarm of researcher candidates reorganizing into elite threshold tier).
- **Shot 7: Grand Assembly & Institutional Call-to-Action (66–83.3s / frames 1980–2500)**:
  - *Recipe*: `aesthetic-rules.md` (Q8 - "Press Conference Group Photo") + `TrackingExpandReveal`. All key motifs (gauges, pillars, ministerial decree) converge into the Baqiyatallah Research Committee crest with full golden particle atmosphere.
