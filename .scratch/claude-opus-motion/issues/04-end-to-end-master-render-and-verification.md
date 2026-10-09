# 04: 60-Second Master Video Render, Contact Sheet & Benchmark Verification

**What to build:**
Re-render all diagnostic stills (frames 60, 270, 520, 950, 1450) and assemble the updated 4-act contact sheet. Render the full 1800-frame 60-second video master (`SKILL_INTRO_SHOWREEL.mp4`) with stem-mixed audio. Execute all automated verification suites (TypeScript compile, global skill test, 8 cinematic benchmark tests, 6 anti-bypass negative gates).

**Blocked by:** 02: Studio-Grade Masked Typography Stencils & Yekan Bakh Glyph Padding, 03: 6-DOF Speed Ramp Camera with Directional Motion Blur

**Status:** ready-for-agent

- [ ] Frame 270 diagnostic still proves 100% horizontal alignment and no card overflow
- [ ] 60-second MP4 renders cleanly with zero Remotion errors
- [ ] `tests/test_cinematic_benchmark.ts` passes 8/8 tests and 6/6 negative gates
- [ ] `scripts/verify_global_skill.ts` passes with 100% satisfied checks
- [ ] Git repository is fully synchronized and pushed to origin/main
