# V35.5 Geometric Corrections Matrix

This document records the exact geometric corrections implemented in `V35_5_GeometricIntegrity.tsx`.

---

## Correction 1: Circular Ocular Aperture Restoration (Beat 02)

### Before
```typescript
const irisRadiusX = interpolate(apertureProgress, [0, 1], [10, 320]) * cameraBreachZoom;
const irisRadiusY = interpolate(apertureProgress, [0, 1], [2, 180]) * cameraBreachZoom;
// Aspect ratio: 320 / 180 = 1.778 : 1 (Squashed horizontal ellipse)
```
- **Cause:** Artificially squashed vertically by 43.7% to conform to 16:9 monitor boundaries rather than maintaining circular lens geometry.
- **Correction:**
```typescript
// Restored strict circular geometry with aspect ratio 1.000
const irisRadius = interpolate(apertureProgress, [0, 1], [6, 260]) * cameraBreachZoom;
const irisRadiusX = irisRadius;
const irisRadiusY = irisRadius;
```
- **Camera / Composition Adaptation:**
  - Diameter of $520\text{px}$ provides a majestic, imposing circular lens within the $1080\text{px}$ canvas ($CY = 540$), leaving exactly $280\text{px}$ of deep obsidian negative space on top and bottom.
  - The astrolabe degree dial, the smoked quartz bezel, and all 12 overlapping brass leaves are rendered with true radial symmetry ($r_{\text{aspect}} = 1.000$).
- **Result:** The aperture now looks like an authentic, high-precision circular mechanical shutter / astronomical astrolabe lens.

---

## Correction 2: Classical Sacred Nuqteh Rhombus Restoration (Beat 04)

### Before
```typescript
const rhombusSide = 110;
points={`0,${-rhombusSide} ${rhombusSide * 1.3},0 0,${rhombusSide} ${-rhombusSide * 1.3},0`}
// Aspect ratio: 1.300 : 1 (Stretched horizontal quadrilateral / kite)
```
- **Cause:** Artificially widened by 30% to take up more horizontal space on wide screens.
- **Correction:**
```typescript
// Restored true 45° equilateral square / Persian calligraphic Nuqteh
const rhombusRadius = 110;
points={`0,${-rhombusRadius} ${rhombusRadius},0 0,${rhombusRadius} ${-rhombusRadius},0`}
```
- **Composition Adaptation:**
  - The 4-faceted milled brass diamond has identical $110\text{px}$ diagonal radii ($W = 220\text{px}, H = 220\text{px}$), forming an equilateral square rotated exactly $45^\circ$.
  - The 4 triangular surface facets meet at an exact $90^\circ$ central vertex.
  - The crosshairs are perfectly orthogonal ($90^\circ$ Cartesian axes).
- **Result:** The Nuqteh restores its sacred proportional status as the fundamental geometric atom of Persian calligraphy.

---

## Correction 3: Kinetic Recoil Focal Pivot Alignment (Beat 05)

### Before
- In Beat 05, the camera group scaled by `worldScale` (up to $9.5\times$) around screen center $(CX, CY)$, while the Nuqteh dot was positioned at offset $(-140, -110)$.
- At $9.5\times$ scale, this offset was multiplied to $(-1330\text{px}, -1045\text{px})$, throwing the diamond violently against the top-left screen boundary (causing the cropped corner in Frame 345).
- **Correction:**
```typescript
// Smooth focal handoff: camera origin starts exactly on the Nuqteh dot (-140, -110)
// and dynamically glides toward the optical center of the word «نور» as scale pulls back
const recoilPivotX = interpolate(pullBackProgress, [0, 1], [-140, 0]);
const recoilPivotY = interpolate(pullBackProgress, [0, 1], [-110, 60]);
```
- **Result:** The pullback starts with the camera centered on the sacred Nuqteh dot. As the explosive recoil triggers, the dot remains visible and stable as the surrounding universe expands into view, completely eliminating awkward screen cropping.

---

## Correction 4: Astrolabe Radial Ray Symmetry (Beat 02 & Beat 05)

### Before
- In Beat 02, the outer dial tick marks were squashed by `aspect = 180 / 320`, making them unevenly spaced and distorted.
- **Correction:**
- Since the aperture is now circular ($rx = ry = R$), all radial rays are calculated using true trigonometric circles ($x = \cos(\theta) \cdot r, y = \sin(\theta) \cdot r$), producing uniform $10^\circ$ and $30^\circ$ metric intervals.
