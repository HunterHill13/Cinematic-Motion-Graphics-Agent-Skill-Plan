# 03: 6-DOF Speed Ramp Camera with Directional Motion Blur

**What to build:**
Implement the Claude Opus 5.5 camera paradigm: Replace linear camera cruising with micro-breathing focal holds and rapid 10-frame exponential bezier speed ramps (`Easing.bezier(0.85, 0.0, 0.15, 1.0)`) between acts. Trigger dynamic horizontal directional motion blur (`blur(6px)`) and slight coordinate skew at peak velocity frames to impart physical momentum.

**Blocked by:** 01: Fix Second 9 Layout & Clamp Inertial Physics

**Status:** ready-for-agent

- [ ] Camera holds still on focal subjects with gentle sine breathing
- [ ] Transitions between acts snap over 10-12 frames with exponential speed curve
- [ ] Directional motion blur automatically engages during peak velocity frames
- [ ] Transition sound effects (whip, whoosh, shutter) land exactly on the peak velocity frame
