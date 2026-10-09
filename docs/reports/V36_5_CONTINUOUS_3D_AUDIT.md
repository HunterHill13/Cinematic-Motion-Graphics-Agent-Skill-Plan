# V36.5 CRAFT FIX — CONTINUOUS 2D → 3D TRANSFORMATION AUDIT

## 1. Executive Summary

This audit investigates the root cause of the geometric discontinuity in the 2D → 3D transformation of `V36_5_CraftMasterpiece.tsx`. 

Visual symptom:
> Rather than the 3D side naturally emerging from camera rotation and perspective, an additional geometric side suddenly pops into existence. The transition reads as:  
> `2D shape → sudden geometry addition → 3D object`  
> instead of:  
> `2D shape → continuous rotation → progressively revealed depth → complete 3D object`.

Crucially, the user observed that the **adjacent/neighboring shape (the box frame "0") performs the 3D transition correctly**, whereas the companion shape (the numeral "1") suffers from a sudden, jarring geometry addition.

---

## 2. Code Trace & Root Cause Analysis

Tracing the exact implementation in `src/motion/precision_lab/V36_5_CraftMasterpiece.tsx`:

### Cause 1: Asymmetric Cross-Section Geometry (The Core Flaw)
In the 2D front face (`translateZ(0px)`), the two glyphs are defined as:
* **Glyph "0" (Left - The Neighboring Shape):**
  - Outer bounds: $150 \times 400\,\text{px}$.
  - Structure: Hollow box frame with `border: 64px solid #0C0E12`.
  - Negative space: Centered open window of $22 \times 272\,\text{px}$.
* **Glyph "1" (Right - The Problematic Shape):**
  - Outer bounds: $110 \times 400\,\text{px}$.
  - Main Stem: $80\,\text{px}$ wide, pinned to the right (`right: 0`, spanning $x = 30$ to $x = 110$).
  - Top Beak Flag: $52 \times 52\,\text{px}$, pinned to the top left (`left: 0, top: 0`).
  - **Negative Space:** Between $y = 52$ and $y = 400$, the entire left region ($x = 0$ to $x = 30$) is **completely empty air**.

Now, inspect how the 48 extruded volumetric slices (`translateZ(-zStep)`) were constructed (lines 246–266):
```tsx
{/* Stem "0" Extruded Wall */}
<div
  style={{
    width: 150,
    height: 400,
    border: "64px solid #141923",
    boxSizing: "border-box",
    backgroundColor: "transparent",
  }}
/>

{/* Stem "1" Extruded Column */}
<div
  style={{
    width: 110,
    height: 400,
    position: "relative",
    backgroundColor: flankTone,
  }}
/>
```

#### The Smoking Gun:
* **Why Glyph "0" worked:** For Glyph "0", every single extrusion slice has the **exact same geometry** as the 2D front face (a $150 \times 400$ frame with $64\,\text{px}$ borders and a transparent center). As it rotates, the side of the box emerges naturally because the extrusion cross-section is topologically identical to the front face.
* **Why Glyph "1" failed:** For Glyph "1", the extrusion slice was implemented as a **solid $110 \times 400\,\text{px}$ rectangle**! 
  It completely lacked the $80\,\text{px}$ stem offset, lacked the beak flag cutout, and filled the empty negative space ($x = 0$ to $x = 30$, $y = 52$ to $y = 400$) with a solid dark slab.
  When the object turned in 3D, a massive, flat rectangular wall (which never existed in the 2D design) suddenly appeared under the beak! This was literally an **unauthorized geometric addition**.

---

### Cause 2: Arbitrary Extrusion Delay & Decoupling from Rotation
In lines 51–82:
```tsx
// Rotation starts at Frame 36 and runs to Frame 125:
const orbitProgress = interpolate(frame, [36, 125], [0, 1], ...);
const baseRotateX = interpolate(orbitProgress, [0, 1], [0, 42]);
const baseRotateZ = interpolate(orbitProgress, [0, 1], [0, -32]);

// But Extrusion was artificially delayed by 16 frames (Frames 52 to 132):
const extrusionProgress = interpolate(frame, [52, 132], [0, 1], ...);
const maxExtrusion = interpolate(extrusionProgress, [0, 1], [0, 160]);
```
And line 225:
```tsx
{maxExtrusion > 0 && Array.from({ length: 48 }).map(...)
```

#### Consequences:
1. **The "Paper Sheet" Phase (Frames 36–51):** For 15 full frames (0.5 seconds), the camera and object rotated through $15^\circ$ of $X$ and $-11^\circ$ of $Z$ while `maxExtrusion == 0`. The shapes rotated as paper-thin 2D wafers with zero physical thickness.
2. **The Sudden Geometric Eruption (Frame 52):** At Frame 52, when the object was already tilted at a steep $15^\circ$ angle, `maxExtrusion` abruptly started growing, and the 48 slice layers suddenly mounted. Because the object was already tilted, the newly born thickness shot out sideways all at once instead of dawning smoothly from $\theta = 0^\circ$.

---

## 3. Comparison Between Neighboring Shape ("0") and Problematic Shape ("1")

| Characteristic | Neighboring Shape ("0") | Problematic Shape ("1") | Diagnosis |
| :--- | :--- | :--- | :--- |
| **2D Geometry** | $150 \times 400$ hollow box frame | $80\text{px}$ stem + $52\text{px}$ triangular beak | Asymmetric silhouette |
| **Extrusion Slice Geometry** | $150 \times 400$ hollow box frame | Solid $110 \times 400$ flat rectangle | **Severe mismatch in "1"** |
| **Negative Space Preserved?** | Yes (center remains open) | No (negative space filled with solid block) | Causes sudden block pop |
| **Side Face Emergence** | True to boundary edges | Injected phantom geometry | Eye flags "1" as broken |
| **Perception** | "The box turned into depth" | "A new side was glued onto the numeral" | Confirms user observation |

---

## 4. The Mathematical & Architectural Solution

To achieve a 100% continuous 2D → 3D transformation:

1. **Topological Equivalence Across All Slices:**
   Every single slice of Glyph "1" must be geometrically identical to the 2D front face:
   - Stem: $80 \times 400\,\text{px}$ pinned at `right: 0`.
   - Crown: Top $32\,\text{px}$ rendered with Klein Blue (`#002FA7`) on apex surfaces.
   - Beak: $52 \times 52\,\text{px}$ with `polygon(0 0, 100% 0, 100% 100%)`.
   - Under-beak space: Strictly transparent/empty ($x = 0$ to $x = 30$, $y = 52$ to $y = 400$).

2. **Unified Single-Source Transformation Driver:**
   Eliminate the artificial 16-frame extrusion delay.
   Depth $D$ must be driven continuously by the same motion state as rotation:
   $$D(t) = D_{\text{max}} \cdot \text{orbitProgress}(t)$$
   At Frame 36, $\theta = 0^\circ$ and $D = 0$.
   As $\theta$ increases continuously, $D$ expands continuously.
   The visible edge width on screen evolves as:
   $$W_{\text{visible}}(t) = D(t) \cdot \sin(\theta(t))$$
   Because both $D(t)$ and $\sin(\theta(t))$ start at 0 and grow smoothly, $W_{\text{visible}}(t)$ starts at a subpixel hairline ($<0.1\,\text{px}$) and widens smoothly. There is zero pop, zero sudden geometry appearance, and zero paper-sheet phase.
