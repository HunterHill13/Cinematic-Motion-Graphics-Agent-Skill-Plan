# 06: Style-Aware Particle Grammar

**What to build:** An act-aware background particle and texture system where floating atmospheric elements morph in real-time according to each act's art style (sub-surface emerald bokeh for Glassmorphism, paper fiber dust for Paper Cutout, CAD dimension reticles for Blueprint, and registration crosses for Neo-Brutalism).

**Blocked by:** None (can run in parallel with 05).

**Status:** done

- [x] Create `StyleAwareAtmosphereLayer.tsx` in `src/motion/library/`.
- [x] Implement smooth cross-fading of particle types based on act frame boundaries.
- [x] Connect camera parallax (camX, camY) to particle drift.
- [x] Verify zero frame jitter during transitions.
