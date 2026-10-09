# Issue 18: Style-Aware Fluid Shaders

## Objective
Enable multi-style adaptive rendering in `OrganicLiquidGooey.tsx` so fluid entities naturally inherit the active Art Style.

## Requirements
1. `MODERN_GLASSMORPHIC`: Caustic radial highlights, high specular rim, translucent gradient fluid.
2. `STOP_MOTION_PAPER`: Frame quantization via `quantizeFrameForStopMotion` (12 FPS), rough edge displacement or fibrous border accents.
3. `TECHNICAL_BLUEPRINT`: CAD vector contour rings, high-contrast cyan/teal monochrome fluid with crosshair nodes.
4. `NEO_BRUTALIST`: Pure black/electric accent colors, zero-blur drop shadow offset (4px/4px), heavy border outlines.
