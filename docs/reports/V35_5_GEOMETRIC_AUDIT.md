# V35.5 Geometric Integrity, Transform Discipline & Composition Audit

This audit evaluates the geometric primitives, aspect ratios, transform chains, and composition strategies in `V35_ArtDirectedMotion.tsx`.

---

## 1. Geometric Primitive Inventory & Distortion Analysis

| Geometric Element | Intended Shape | Theoretical Aspect Ratio | Current Implementation in V35 | Current Aspect Ratio | Distortion Classification | Root Cause Diagnosis |
| :--- | :--- | :---: | :--- | :---: | :--- | :--- |
| **Beat 01: Horizon Wireframe Node** | Perfect Sphere / Circle | 1.000 | `<circle cx={CX} cy={...} r={...} />` | **1.000** | Proportional | Properly implemented as SVG `<circle>` |
| **Beat 02: Ocular Outer Framing** | Circular Astrolabe Aperture | 1.000 | `<ellipse rx={irisRadiusX} ry={irisRadiusY} />` (`rx = 320, ry = 180`) | **1.778 : 1** (Wide Oval) | **D. Accidental Composition Distortion** | Stretched horizontally by 1.778× to fill the 16:9 monitor canvas instead of scaling camera or framing |
| **Beat 02: Smoked Quartz Bezel** | Circular Optical Chamfer | 1.000 | `<ellipse rx={irisRadiusX + 22} ry={irisRadiusY + 14} />` | **1.763 : 1** | **D. Accidental Composition Distortion** | Matches the flattened outer chassis ellipse |
| **Beat 02: Deep Pupil Portal** | Circular Singularity Well | 1.000 | `<ellipse rx={irisRadiusX * 0.42} ry={irisRadiusY * 0.42} />` | **1.778 : 1** | **D. Accidental Composition Distortion** | Pupil of a lens should be circular, but rendered as squashed oval |
| **Beat 02: Iris Shutter Leaves** | Symmetrical Mechanical Blades | Uniform Radial | Line endpoints squashed by `aspect = irisRadiusY / irisRadiusX = 0.5625` | **Non-uniform** | **D. Accidental Composition Distortion** | Tangent leaf angles sheared to conform to elliptical frame |
| **Beat 02: Astrolabe Degree Ticks** | Radial Degree Calibrations | Circular $360^\circ$ | Projected onto ellipse (`y = sin(rad) * (r * aspect)`) | **Elliptical Projection** | **D. Accidental Composition Distortion** | Astrolabe dial ticks are bunched at top/bottom and spaced at sides |
| **Beat 03: Typographic Hall «نقطه دید»** | Calligraphic Word Sculpture | Natural Glyph Ratio | `<text fontSize={130} letterSpacing="8px">` | **Natural Ratio** | Proportional | Scaled uniformly via `<g scale(colonnadeScale)>` with perspective floor lines |
| **Beat 03: Floating Quartz Scrim** | Architectural Glass Pane | Defined Rect | `<rect width={1120} height={340} rx={8}>` | **3.294 : 1** | Proportional | Intended architectural aspect ratio for wide plinth |
| **Beat 04: The Sacred Nuqteh** | Traditional 45° Rhombus (Square rotated $45^\circ$) | 1.000 (Symmetric Diamond) | `points="0,-110 143,0 0,110 -143,0"` (`rhombusSide * 1.3 = 143`) | **1.300 : 1** (Elongated Kite) | **D. Accidental Composition Distortion** | X-vertices artificially stretched by 1.30× (`* 1.3`) to make the diamond appear wider across 16:9 |
| **Beat 04: Nuqteh Crosshairs** | Symmetric Cartesian Axis | 1.000 | `x1={-143}, x2={143}` vs `y1={-110}, y2={110}` | **1.300 : 1** | **D. Accidental Composition Distortion** | Stretched horizontally with the diamond body |
| **Beat 05: Recoil Origin Diamond** | Diacritical Dot of «ن» | 1.000 (Symmetric Diamond) | Copied `points="0,-110 143,0 0,110 -143,0"` | **1.300 : 1** | **D. Accidental Composition Distortion** | Inherits the 1.30× horizontal elongation from Beat 04 |
| **Beat 05: Celestial Astrolabe Rings** | Concentric Orbital Spheres | 1.000 | `<circle cx={0} cy={60} r={580 / 540 / 360} />` | **1.000** | Proportional | Properly constructed with `<circle>` |
| **Beat 05: Noor Master Typography** | Monumental Calligraphy | Natural Glyph Ratio | `<text fontSize={440} letterSpacing="12px">` | **Natural Ratio** | Proportional | Text maintains genuine Persian font metrics |
| **Beat 05: Initial Recoil Launch (Fr 345)** | Center Origin | Scaled Frame | `scale(9.5)` at origin $(CX, CY)$ while dot is offset $(-140, -110)$ | **Off-Axis Cut** | **D. Camera Framing Misalignment** | High scale causes facet to crop severely across screen corner |

---

## 2. Key Diagnostic Findings

### Finding 1: The Ocular Aperture is a 1.778:1 Squashed Ellipse
In `V35_ArtDirectedMotion.tsx`, lines 95–96:
```typescript
const irisRadiusX = interpolate(apertureProgress, [0, 1], [10, 320]) * cameraBreachZoom;
const irisRadiusY = interpolate(apertureProgress, [0, 1], [2, 180]) * cameraBreachZoom;
```
$320 / 180 = 1.7777...$, which is exactly $16/9$.
**Why was it done?** The animator or developer wanted the circular iris to fill the 16:9 monitor canvas horizontally without spilling vertically.
**Why is it invalid?** A camera lens shutter, iris diaphragm, or human pupil is **circular**. A squashed ellipse does not look like a high-precision Leica aperture or an astrolabe portal; it looks like a 2D oval distorted to fit an aspect ratio.
**The Solution:**
Make `irisRadiusX === irisRadiusY = irisRadius`. A circular aperture with radius $R = 260\text{px}$ (diameter $520\text{px}$) fits comfortably within the 1080p vertical boundary ($CY = 540$), leaving dignified negative space ($280\text{px}$ above and below). When the camera breaches the aperture, uniform scaling up to $18\times$ expands the circle uniformly past the lens edges.

---

### Finding 2: The Sacred Nuqteh Rhombus is an Elongated Rhombus (1.30:1)
In `V35_ArtDirectedMotion.tsx`, line 137 & 629–670:
```typescript
const rhombusSide = 110;
points={`0,${-rhombusSide} ${rhombusSide * 1.3},0 0,${rhombusSide} ${-rhombusSide * 1.3},0`}
```
The horizontal half-width is $110 \times 1.3 = 143\text{px}$, while the vertical half-height is $110\text{px}$.
**Why was it done?** The developer felt a true square diamond looked too narrow on a wide screen, so they multiplied the X coordinates by $1.3$.
**Why is it invalid?** In classical Persian calligraphy (Nasta'liq and Thuluth), the **Nuqteh** (the dot) is formed by pressing the flat nib of the reed pen (*Qalam*) at a $45^\circ$ angle, creating a **geometric equilateral rhombus / tilted square where all four sides are identical ($L_1 = L_2 = L_3 = L_4$) and the aspect ratio is $1.000$**. Stretching it into a horizontal kite destroys its sacred geometric identity.
**The Solution:**
Make `halfWidth === halfHeight = 110px` (or `rhombusRadius = 110px`). A true $45^\circ$ equilateral diamond has vertices $(0, -110), (110, 0), (0, 110), (-110, 0)$.

---

### Finding 3: Recoil Pullback Origin Mismatch in Beat 05 (Frame 345)
In Beat 05, when the camera launches backwards at Frame 335, the group scale is $9.5\times$ centered at $(CX, CY)$. But the Nuqteh dot inside the group is translated by $(-140, -110)$. At scale $9.5\times$, that offset magnifies to $-1330\text{px}$ in X and $-1045\text{px}$ in Y, violently throwing the dot out of frame and causing an awkward corner crop (as seen in `still_345_frame_345.png`).
**The Solution:**
At the start of the recoil (Frame 335), the camera target must be centered exactly on the Nuqteh dot coordinates, so that as the camera pulls back, the dot remains the focal anchor of the pullback and gracefully reveals the surrounding word «نور».

---

## 3. Geometric Integrity Rules Established for V35.5
1. **Rule of the Circle:** All apertures, iris chassis, bezels, dials, and orbits must have aspect ratio $1.000$ (`rx === ry`).
2. **Rule of the Nuqteh:** The calligraphic dot must be an equilateral $45^\circ$ diamond with symmetric diagonal spans ($W = H$).
3. **Rule of Camera Over Deformation:** If an aperture needs to fill more screen, the camera approaches it ($Z$ dolly); the circle is never stretched into an ellipse.
4. **Rule of Intentional Motion Squash:** Non-uniform deformation is permitted only during active physical kinetic events (e.g. the 7-frame pre-recoil squash at Frame 338 where $S_Y$ briefly compresses to 0.92 before release).
