# Reference Motion Analysis: Editorial Design

## Exemplars
- The New York Times Video Op-Docs
- Vox Explained Series
- Bloomberg Quicktake High-End Graphics

## Spatial Composition & Layout
- Rigid adherence to asymmetric typographic hierarchy.
- Prominent negative space (typically 40–50% breathing room).
- Clear anchor elements (e.g. ministerial seals, large display numerals, or primary cards) positioned at the optical center or Golden Ratio thirds.

## Motion & Easing
- Heavy reliance on polynomial decay curves (`E.poly(4)` or `cubic-bezier(0.16, 1, 0.3, 1)`).
- Visual elements enter with decisive momentum and decelerate smoothly over 20–30 frames.
- Strict rejection of constant velocity (linear) or floaty sinusoidal drifting.

## Kinetic Depth
- 3-plane camera parallax:
  - Background matrix: 0.35x rate
  - Core graphic card: 0.70x rate
  - Foreground typographic accents & atmosphere: 1.40x rate
- Zero erratic handheld camera shake; only deliberate, solemn, cinematic pushes (0.96x to 1.03x).

## Typography Integration
- Tracking expansion on large headings (`letterSpacing` 0.02em -> 0.12em) while opacity transitions cleanly.
- Absolute avoidance of layout shift or word wrapping during kinetic transitions.
