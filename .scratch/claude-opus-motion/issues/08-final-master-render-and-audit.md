# 08: Final Master Render and Audit

**What to build:** Compile the complete 60-second 1080p master showreel with all physics, lighting sweeps, style-aware particles, and tri-layer audio. Render diagnostic stills, generate a 12-frame contact sheet, run full benchmark test suites, copy artifacts to brain directory, and push to GitHub.

**Blocked by:** 07: Tri-Layer Beat-Quantized Diegetic Sound Design.

**Status:** done

- [x] Execute `npx remotion render SkillIntroShowreel renders/claude/SKILL_INTRO_SHOWREEL.mp4`.
- [x] Generate 12-frame contact sheet with ffmpeg.
- [x] Run `npx tsx scripts/verify_global_skill.ts` and `npx tsx tests/test_cinematic_benchmark.ts`.
- [x] Commit and push to GitHub repository.
