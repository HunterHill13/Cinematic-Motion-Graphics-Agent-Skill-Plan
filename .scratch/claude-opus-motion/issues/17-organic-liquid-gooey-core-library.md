# Issue 17: Organic Liquid Gooey Core Library

## Objective
Implement `src/motion/library/OrganicLiquidGooey.tsx` utilizing SVG filter thresholding (`feGaussianBlur` + `feColorMatrix`) to produce organic liquid droplet fusion and detachment (metaballs) with spring tension.

## Requirements
1. Define a self-contained SVG filter with configurable `blurRadius` and contrast threshold matrix (`values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"`).
2. Create `LiquidMetaballGroup`: A container wrapping multiple animated circular nodes that merge seamlessly when their bounding envelopes overlap.
3. Create `LiquidButtonPulse`: An interactive wrapper that responds to trigger frames by squashing, stretching, emitting transient micro-droplets, and absorbing them back with visceral viscosity.
4. Support full spring dynamics using Remotion `spring()` with zero subpixel jitter.
