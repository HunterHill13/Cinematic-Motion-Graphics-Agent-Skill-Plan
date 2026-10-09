# 02: Studio-Grade Masked Typography Stencils & Yekan Bakh Glyph Padding

**What to build:**
Upgrade `MaskedKineticHeadline` to match Claude Opus 5.5 and official Remotion guidelines (`remotion-markup`). Wrap each individual word in an inline clipping stencil (`overflow: hidden`) with zero subpixel jitter. Ensure all glyphs in Yekan Bakh (especially dots, accents, and ascenders/descenders) have appropriate vertical padding so characters are never clipped during entrance.

**Blocked by:** 01: Fix Second 9 Layout & Clamp Inertial Physics

**Status:** ready-for-agent

- [ ] Each word emerges smoothly from an inline masked floor
- [ ] Yekan Bakh Persian glyphs have zero letter clipping
- [ ] Staggered entrance timing follows 3-frame offsets
- [ ] High-contrast radiant gradient highlighting works reliably across light and dark styles
