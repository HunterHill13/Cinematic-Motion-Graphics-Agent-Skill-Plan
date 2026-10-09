# V13 SHOT LIBRARY ARCHITECTURE & SPECIFICATION

## Reference-Driven Cinematic Shot Catalog
*Inspired by `video-shotcraft`, `video-talkcraft`, `remotion-skills`, and `motion-skills`*

---

### 1. CORE PHILOSOPHY & MANDATE

In high-end broadcast motion design and premier AI-assisted motion pipelines (such as `video-shotcraft` and `video-talkcraft`), scenes are never animated ad-hoc from an unconstrained blank slate. Every scene is modeled as an instance of a **Typed Shot Recipe** selected from a verified **Shot Library**.

```
Content Analysis
      ↓
Shot Type Classification (1 of 8 Categories)
      ↓
Shot Recipe Selection (Scoring Engine Fit)
      ↓
Visual Companion Pairing (Physical, Non-UI Anchor)
      ↓
Single-Curve Camera Grammar (Micro-push, Slow-dolly, Parallax-drift)
      ↓
Motion Behavior Assignment (Anticipation → Contact → Reaction → Settle)
      ↓
Transition Carry Contract (Object / Spatial / Semantic Handoff)
      ↓
Production Execution (Remotion TSX)
```

**Key Invariants:**
1. **Never Invent from Scratch:** Pick the validated recipe matching the narrative intent.
2. **Visual Companion Mandatory:** Naked text or floating sentences without architectural grounding are prohibited. Every textual claim must have a functional visual counterpart (gauge, medallion, pedestal, calendar ruler, crest).
3. **Single-Curve Camera Grammar:** Exactly one primary camera curve per shot. No oscillating shakes or conflicting zooms.
4. **100% Pure Persian Script:** Zero English HUD labels, telemetry, or debug overlays in rendered JSX.
5. **Strict Motion Density Budget:** Max 1 primary actor, $\le 2$ secondary actors, 0 decorative clutter.

---

### 2. THE 8 CANONICAL SHOT CATEGORIES

| Category ID | Name (Fa) | Primary Narrative Intent | Key Motion Behaviors | Visual Companion Archetypes |
| :--- | :--- | :--- | :--- | :--- |
| **OpeningHook** | ضربه تایپوگرافی افتتاحیه | Narrative ignition, key provocative question | Draw, Travel, Collision, KeywordStrike | Architectural bracket grid, kinetic underline |
| **EditorialTypography** | رونمایی متن و مصوبه رسمی | Authoritative decree, official legal proclamation | Relay, Collision, Ripple, MaskedPhraseReveal | Heraldic seal medallion, embossed decree plinth |
| **DiagramExplainer** | دیاگرام ساختاری و شروط سه‌گانه | Multi-clause requirements, structural logic | Split, Converge, SequentialMilestone, Ripple | Tripartite pillar cards, status seals, progress rings |
| **TimelineProcess** | گاه‌شمار و مهلت قانونی | Temporal sequence, deadlines, chronological boundary | Fold, Collapse, Travel, AxisTravel | 12-month calendar ruler, deadline barrier gate |
| **DataNumbers** | حدنصاب و مقایسه کمّی | Numeric thresholds, ascending academic tiers | Push, Draw, AscendingImpact, CounterBalance | Monumental score pedestals, metallic plinths |
| **HeroInstitutional** | نشان زرین و اختتامیه سازمانی | Dignified conclusion, institutional authority | Pull, Draw, Settle, GravitationalSingularity | Grand heraldic emblem, double laurel wreath |
| **Comparison** | مقایسه دوگانه یا چندگانه | Direct contrast between options or states | Split-screen slide, dual-scale balance | Balanced scale pan, contrast split divider |
| **MultiObject** | تعامل اجزای هم‌افزا | Interconnected ecosystem or protocol steps | Orbital travel, magnetic attraction | Network node constellation, interconnected gears |

---

### 3. CATALOG OF V13 SHOT RECIPES

#### Recipe 1: `hook-typography-slam`
* **Category:** `OpeningHook`
* **Persian Name:** ضربه تایپوگرافی افتتاحیه
* **Purpose:** Establishes strong thematic authority on the opening premise. Delivers punchy editorial weight with micro-push camera movement.
* **Suitable For:** Hook questions, video premise, core thematic headline.
* **Avoid When:** Dense legal articles, multi-step procedures.
* **Camera Mode:** `micro-push` ($1.00 \to 1.025$).
* **Visual Companion:** Structural corner brackets, golden kinetic underline ray, subtle background typographic watermark.
* **Motion Choreography:**
  - $0 - 60f$: Squeeze & anticipation.
  - $60 - 180f$: First line entry (`سربازی نخبگان چیست؟`) with dynamic weight shift.
  - $180 - 320f$: Key title impact (`پروژه جایگزین خدمت نخبگی`) with acoustic baseline strike.
  - $320 - 380f$: Outflow transition carry handoff of the golden baseline ray into Shot 02.

#### Recipe 2: `decree-monolith-reveal`
* **Category:** `EditorialTypography`
* **Persian Name:** رونمایی مونولیت مصوبه قانونی
* **Purpose:** Presents governmental or executive regulations with solemn judicial weight.
* **Suitable For:** Official articles, executive decrees, statutory foundations.
* **Avoid When:** Fast-paced action, numeric tables.
* **Camera Mode:** `slow-dolly` ($1.00 \to 1.015$).
* **Visual Companion:** Embossed circular official seal medallion, dual-ruled architectural parchment border.
* **Motion Choreography:**
  - $0 - 60f$: Transition carry inflow (golden ray from Shot 01 morphs into decree border).
  - $60 - 160f$: Seal stamp collision with gold dust ripple wave.
  - $160 - 260f$: Three-tier decree text reveals (`تصویب‌نامه رسمی`, `بنیاد ملی نخبگان`, `تسهیلات خدمت تحقیقاتی`).
  - $260 - 300f$: Settle and symmetric fission handoff into Shot 03.

#### Recipe 3: `tripartite-criteria-diagram`
* **Category:** `DiagramExplainer`
* **Persian Name:** دیاگرام ساختاری شرایط سه‌گانه
* **Purpose:** Unfolds three sequential prerequisite conditions in a structured, balanced 3-column layout.
* **Suitable For:** 3 criteria, tripartite qualifications, sequential prerequisites.
* **Avoid When:** Singular statements, continuous flowing text.
* **Camera Mode:** `parallax-drift` (subtle $X$-drift $\Delta x = \pm 12\text{px}$, zoom $1.00 \to 1.02$).
* **Visual Companion:** Three distinct architectural milestone pillars, each with its own metallic emblem (Academic Cap, Research Atom, Approved Stamp).
* **Motion Choreography:**
  - Milestone 1 (Criterion 1 - Far Right): Enters at $f = 60$, stamped with gold badge.
  - Milestone 2 (Criterion 2 - Center): Enters at $f = 330$, stamped with gold badge.
  - Milestone 3 (Criterion 3 - Far Left): Enters at $f = 590$, stamped with gold badge.
  - Stepped acoustic confirmations lock in each criterion.
  - $800 - 860f$: The three pillars consolidate and collapse onto the central datum axis for Transition 03.

#### Recipe 4: `temporal-cutoff-timeline`
* **Category:** `TimelineProcess`
* **Persian Name:** گاه‌شمار مهلت قانونی و سقف مجاز
* **Purpose:** Depicts the 12-month post-graduation calendar window and the strict cutoff boundary.
* **Suitable For:** Deadlines, time-restricted eligibility, sequential processes.
* **Avoid When:** Static structural lists, abstract principles.
* **Camera Mode:** `slow-dolly` ($1.00 \to 1.02$).
* **Visual Companion:** 12-month chronological tick ruler, graduation milestone marker, glowing red/amber cutoff barrier gate.
* **Motion Choreography:**
  - $0 - 60f$: Inflow unfolding along horizontal time axis.
  - $60 - 160f$: Graduation point established; time cursor travels across 12 months.
  - $160 - 240f$: Cutoff barrier descends with definite auditory impact (`سقف مجاز: حداکثر ۱ سال`).
  - $240 - 280f$: Temporal line folds into horizontal base plinth for Shot 05.

#### Recipe 5: `score-threshold-pedestals`
* **Category:** `DataNumbers`
* **Persian Name:** پایه‌های پلکانی حدنصاب امتیازات
* **Purpose:** Renders three hierarchical score thresholds (65, 110, 130) as monumental architectural plinths of proportional height.
* **Suitable For:** Quantitative metrics, comparative scores, level requirements.
* **Avoid When:** Descriptive narrative without figures.
* **Camera Mode:** `continuous` (slow rising pedestal tracking $cy: 550 \to 530$, zoom $1.00 \to 1.025$).
* **Visual Companion:** Three proportional metallic pedestals (Bachelor: 180px / 65 pts; Master: 300px / 110 pts; PhD: 420px / 130 pts) with reflective beveled tops.
* **Motion Choreography:**
  - $0 - 120f$: Base plinth extends; Pedestal 1 (كارشناسی - ۶۵) rises with spring impact.
  - $120 - 240f$: Pedestal 2 (كارشناسی ارشد - ۱۱۰) ascends above Tier 1.
  - $240 - 380f$: Pedestal 3 (دكتری تخصصی - ۱۳۰) summits the architectural composition.
  - $380 - 485f$: Three pedestals focus their energy inward, triggering the Gravitational Singularity handoff into Shot 06.

#### Recipe 6: `heraldic-institutional-seal`
* **Category:** `HeroInstitutional`
* **Persian Name:** نشان زرین دانشگاه و پایان‌بندی سازمانی
* **Purpose:** Prestigious final resolution delivering institutional finality and permanence.
* **Suitable For:** Outro, institutional certification, credit resolution.
* **Avoid When:** Mid-film explanation.
* **Camera Mode:** `micro-pull` ($1.02 \to 1.00$ slow dignified release).
* **Visual Companion:** Grand heraldic institutional medallion, dual laurel wreath branches, gilded resolution border.
* **Motion Choreography:**
  - $0 - 60f$: Gravitational singularity collapses inward, then radiates golden light rings.
  - $60 - 140f$: Grand heraldic seal seats into the center; laurel wreath branches wrap around.
  - $140 - 206f$: Outro title locks in (`پروژه جایگزین خدمت نخبگی - آینده‌سازان ایران`); holds in crystal-clear stillness before subtle fade.

---

### 4. CARRY TRANSITION PROTOCOL ACROSS BOUNDARIES

Transitions in V13 are not full-screen pixel wipes. They are **elemental carry contracts**:
1. **Transition 01 ($f = 350 - 380$):** `KineticUnderlineHandoff`
   - Carry Actor: Golden horizontal baseline ray from Shot 01.
   - Target Actor: Architectural top rule of the Decree Monolith in Shot 02.
   - Carry Score: $0.94$.
2. **Transition 02 ($f = 620 - 650$):** `SymmetricFission`
   - Carry Actor: Central circular seal from Shot 02.
   - Target Actor: Splits outward into the framing datum rules of the three criteria pillars in Shot 03.
   - Carry Score: $0.91$.
3. **Transition 03 ($f = 1450 - 1480$):** `DatumRuleAxisCollapse`
   - Carry Actor: Center horizontal datum of criteria pillars in Shot 03.
   - Target Actor: Morphs into the 12-month chronological timeline axis in Shot 04.
   - Carry Score: $0.95$.
4. **Transition 04 ($f = 1700 - 1730$):** `PlanarStageFold`
   - Carry Actor: Timeline cutoff ground rule in Shot 04.
   - Target Actor: Extrudes into the base plinth supporting the three score pedestals in Shot 05.
   - Carry Score: $0.93$.
5. **Transition 05 ($f = 2155 - 2185$):** `GravitationalSingularity`
   - Carry Actor: Kinetic energy of the three pedestals in Shot 05 collapses to center coordinate $(960, 540)$.
   - Target Actor: Expands as the golden core of the Heraldic Seal in Shot 06.
   - Carry Score: $0.92$.

---

### 5. AUTOMATED RECIPE SELECTION ENGINE

The TypeScript module `src/shot-library/shotLibrary.ts` exposes:
```typescript
export function scoreRecipeForShot(
  recipe: ShotRecipe,
  context: {
    semanticIntent: string;
    hasNumericData: boolean;
    hasTemporalAspect: boolean;
    hasTripartiteStructure: boolean;
    isInstitutional: boolean;
    previousRecipeId?: string;
  }
): number;
```
This engine assigns a mathematical compatibility score to each recipe candidate, penalizes immediate repetition, and selects the optimal recipe deterministically.
