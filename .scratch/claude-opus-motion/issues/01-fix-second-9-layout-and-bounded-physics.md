# 01: Fix Second 9 Layout & Clamp Inertial Physics

**What to build:**
Fix the visual regression at Second 9 (Frame 270) where the headline tilted by -6 degrees and overflowed the frosted glass container. Add physical bounding clamps to `InertialRig` (`dragX` clamped to [-8px, 8px], `dragTilt` clamped to 0deg for typography). Re-align the interactive cursor click at Frame 220 to target the button center at (X=960, Y=565).

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Frame 270 headline is 100% horizontal with 0 degrees unwanted tilt
- [ ] Headline text is completely contained inside the frosted glass card boundaries
- [ ] Interactive cursor at Frame 220 lands precisely on the amber button target dot
- [ ] `InertialRig` has a `disableTilt` prop for typography stability
