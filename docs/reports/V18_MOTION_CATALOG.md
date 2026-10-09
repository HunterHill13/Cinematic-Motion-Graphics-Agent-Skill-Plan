# V18 Motion Recipe Catalog & "Search Before Authoring" Guide

## Mandate: Search Before Authoring (Reuse-First Principle)

> **Rule 0**: Before writing any bespoke CSS keyframes, inline transforms, or animation logic for a scene or shot, the Agent **MUST** check this catalog.
> **Rule 1**: If a concept matches an existing recipe or can be achieved by composing 2–3 recipes, you **MUST** reuse the registered recipe.
> **Rule 2**: Add shape, not word. Physics over glow. Easing over decoration.

All recipes live in `src/motion/recipes/` and export typed deterministic functions evaluated at `(frame, startFrame, ...)`.

---

## 1. Catalog Summary Index

| Category | Recipe Name | File | Primary Use Case | Reference Origin |
|---|---|---|---|---|
| **Typography** | `TypographySlam` | `TypographySlamRecipe.ts` | High-impact headline arrival on the acoustic beat | `motion-graphics-skills` / `chief-motion-skill` |
| **Typography** | `TextMaskReveal` | `TextMaskRevealRecipe.ts` | Pristine headline unroll through geometric mask with zero font distortion (`clipPath: inset`) | `remotion-motion-graphics-skill` / `chief-motion-skill` |
| **Typography** | `TypeOutlineFill` | `TypeOutlineFillRecipe.ts` | Architectural wireframe stroke drawing, flooding with solid fill on beat | `motion-graphics-skills` / `hyperframes` |
| **Typography** | `SequentialSwap` | `SequentialSwapRecipe.ts` | Sequential caption/subtitle replacement where outgoing is 100% gone before incoming lands | `chief-motion-skill` (`RULES.md`) |
| **Typography** | `AutoFitText` | `AutoFitTextRecipe.tsx` | Jitter-free numeric stats (`tabular-nums`), anti-clipping safe margins, RTL support | `remotion-motion-graphics-skill` (`traps.md`) |
| **Geometry** | `DotToLine` | `DotToLineRecipe.ts` | Concentrated point squashes and unrolls into directional path vector | `motion-graphics-skills` / `hyperframes` |
| **Geometry** | `RibbonGrowth` | `RibbonGrowthRecipe.ts` | Continuous fluid ribbon growth with wave breathing head | `hyperframes` (`transitions-cover`) |
| **Geometry** | `ShapeMorph` | `ShapeMorphRecipe.ts` | Circle $\to$ Pill $\to$ Card container transformation with volume-preserving squash/stretch | `chief-motion-skill` / `motion-graphics-skills` |
| **Data Story** | `ChartBarToLine` | `ChartBarToLineRecipe.ts` | Discrete statistical bars morphing smoothly into continuous trendline | `motion-graphics-skills` (`animated-chart`) |
| **Data Story** | `DiagramReveal` | `DiagramReveal.ts` | Progressive node-link topological graph construction | Core Baseline |
| **Spatial / Depth**| `RingTunnel` | `RingTunnelRecipe.ts` | Concentric expanding rings creating infinite camera tunnel and depth parallax | `hyperframes` (`wireframe-portal`) |
| **Spatial / Depth**| `GridWave` | `GridWaveRecipe.ts` | Matrix grid responding to an epicenter impulse with phase delay | `hyperframes` (`weight-wave`) |
| **Spatial / Depth**| `ScatterReassemble` | `ScatterReassembleRecipe.ts` | Radial explosion under impulse followed by snapping into ordered alignment | `hyperframes` (`transitions-destruction`) |
| **Camera** | `CameraPushPull` | `CameraPushPullRecipe.ts` | Motivated camera framing ($1.00 \to 1.05$ slow-push, pull, or $1.18$ punch-in) | `chief-motion-skill` / `cinematic-motion-director` |
| **Transitions** | `ObjectHandoff` | `ObjectHandoff.ts` | Shape from Shot A becomes primary actor in Shot B | Core Baseline |
| **Transitions** | `SplitAndConverge` | `SplitAndConvergeRecipe.ts` | Unified actor splits into duality and snaps back | Core Baseline |
| **Transitions** | `DimensionalPortal`| `DimensionalPortalRecipe.ts` | Expanding threshold revealing deeper semantic layer | Core Baseline |
| **Transitions** | `AxisCollapse` | `AxisCollapseRecipe.ts` | Frame collapses along 1D axis into thin laser | Core Baseline |

---

## 2. Detailed Recipe Specifications

### 2.1 TypographySlam
- **Signature**: `executeTypographySlam(frame: number, startFrame: number, slamFrame: number): TypographySlamResult`
- **Output**: `{ scale, weightShift, letterSpacing, offsetY, baselineDisplacement, shockwave, opacity }`
- **Mechanics**: Combines `calculateKineticType` + `calculateCollision` + `calculateRipple`. Fast downward acceleration, squash & stretch on impact, shockwave ripple along baseline.
- **When to Use**: Main title cards, bold semantic conclusions, punchy stats.

### 2.2 TextMaskReveal
- **Signature**: `executeTextMaskReveal(frame, startFrame, fps, direction, isRTL): TextMaskRevealResult`
- **Output**: `{ clipPath, translateY, translateX, opacity, revealProgress }`
- **Key Invariant**: Uses CSS `clipPath: inset(...)` instead of `scaleX/scaleY`. Preserves pristine font geometry without squashing. Supports `'bottom-to-top'`, `'top-to-bottom'`, `'right-to-left'` (Persian RTL), and `'left-to-right'`.
- **When to Use**: Narrative paragraphs, quotes, Persian institutional names.

### 2.3 SequentialSwap
- **Signature**: `executeSequentialSwap(frame, exitStartFrame, exitDuration, incomingDelay, fps): SequentialSwapResult`
- **Output**: `{ outgoing: SwapElementState, incoming: SwapElementState, activeTarget }`
- **Key Invariant**: Outgoing element is 100% exited before incoming element arrives. Zero overlapping double-exposures.
- **When to Use**: Dynamic word swaps, sequential metric shifts, multi-line arguments.

### 2.4 AutoFitText
- **Signature**: `<AutoFitText text="..." maxFontSize={48} minFontSize={24} availableWidth={800} isNumeric={true} />`
- **Key Invariant**: Injects `fontVariantNumeric: 'tabular-nums'` for numbers to prevent horizontal jitter; clamps width to prevent overflow and edge clipping.
- **When to Use**: Any numerical stat display, phone-scale callouts, RTL Persian lines.

### 2.5 DotToLine
- **Signature**: `executeDotToLine(frame, startFrame, fps, targetLength, thickness): DotToLineResult`
- **Output**: `{ dotScale, dotOpacity, lineWidth, lineHeight, lineProgress, isLineActive }`
- **Mechanics**: Focal dot anticipates with subtle scale, launches horizontally, and unrolls into a path vector.
- **When to Use**: Section transitions, visual connectors, leading lines directing viewer focus.

### 2.6 RibbonGrowth
- **Signature**: `executeRibbonGrowth(frame, startFrame, duration, totalPathLength, ribbonWidth): RibbonGrowthResult`
- **Output**: `{ pathLength, strokeDashoffset, strokeDasharray, headX, headY, width, opacity }`
- **Mechanics**: Smooth bezier path expansion with dynamic sinusoidal wave breathing on the leading edge.
- **When to Use**: Chronological timelines, fluid connective tissue between disparate concepts.

### 2.7 ShapeMorph
- **Signature**: `executeShapeMorph(frame, startFrame, duration, from, to): ShapeMorphResult`
- **Output**: `{ width, height, borderRadius, scaleX, scaleY, rotationDeg, opacity, progress }`
- **Mechanics**: Continuous interpolation of width, height, and border radius with elastic volume preservation (squashes in Y as it expands in X).
- **When to Use**: Transforming an icon/dot into a content container or badge.

### 2.8 ChartBarToLine
- **Signature**: `executeChartBarToLine(frame, startFrame, duration, dataValues, chartWidth, chartHeight): ChartBarToLineResult`
- **Output**: `{ points, morphProgress, linePathD, lineOpacity }`
- **Mechanics**: Discrete statistical bars dissolve into a continuous trendline path.
- **When to Use**: Transitioning from static survey data to longitudinal clinical trends.

### 2.9 RingTunnel
- **Signature**: `executeRingTunnel(frame, startFrame, ringCount, cycleDuration, maxRadius): RingTunnelResult`
- **Output**: `{ rings: TunnelRing[], centerFocalOpacity, cameraZ }`
- **Mechanics**: Concentric rings expand exponentially toward the viewport with dynamic stroke width and opacity tapering, generating deep spatial parallax.
- **When to Use**: Topic intros, portal transitions, deep architectural dives.

### 2.10 GridWave
- **Signature**: `executeGridWave(frame, startFrame, cols, rows, spacing, waveSpeed): GridWaveResult`
- **Output**: `{ points: GridPoint[], waveProgress }`
- **Mechanics**: 2D coordinate grid where an epicenter impulse radiates outward with distance-proportional phase delay and exponentially damped sinusoidal displacement.
- **When to Use**: Visualizing machine learning models, cellular matrices, computational analysis.

### 2.11 ScatterReassemble
- **Signature**: `executeScatterReassemble(frame, startFrame, fps, targetPositions, scatterRadius): ScatterReassembleResult`
- **Output**: `{ particles: ScatterParticle[], isSettled, phase }`
- **Mechanics**: Two-phase physics: outward radial burst under explosive impulse, followed by magnetic snapping into clean structural positions.
- **When to Use**: Data synthesis, clustering, problem formulation resolving into clarity.

### 2.12 CameraPushPull
- **Signature**: `executeCameraPushPull(frame, startFrame, duration, type, focalOffset): CameraTransform`
- **Output**: `{ scale, translateX, translateY, rotateDeg }`
- **Mechanics**: Supports `'slow-push'` ($1.00 \to 1.05$), `'slow-pull'` ($1.05 \to 1.00$), `'punch-in'` ($1.00 \to 1.18$ in 14 frames), and `'orbit-pan'`.
- **When to Use**: Directing viewer attention, preventing static frames during holds.

---

## 3. Composition Recipes Guide

When creating a shot, combine recipes logically rather than inventing ad-hoc code:

```tsx
// Example: High-Impact Topic Reveal
// 1. Dot pops in (DotToLine)
// 2. Unrolls into dividing line
// 3. Headline reveals through mask (TextMaskReveal)
// 4. Camera pushes slowly (CameraPushPull)

const camera = executeCameraPushPull(frame, 0, 90, 'slow-push');
const line = executeDotToLine(frame, 10, fps, 500, 3);
const title = executeTextMaskReveal(frame, 20, fps, 'right-to-left', true);

return (
  <div style={{ transform: `scale(${camera.scale})` }}>
    <div style={{ width: line.lineWidth, height: line.lineHeight, background: '#D97706' }} />
    <div style={{ clipPath: title.clipPath, transform: `translateX(${title.translateX}px)` }}>
      <AutoFitText text="مرکز تحقیقات و نوآوری" maxFontSize={54} dir="rtl" />
    </div>
  </div>
);
```
