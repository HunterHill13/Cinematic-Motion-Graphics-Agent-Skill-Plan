# Issue 20: Master Render, Audit Benchmark, and Git Sync

## Objective
Verify the entire codebase, render the updated master showreel video and contact sheet, pass benchmark audits, and push to GitHub.

## Tasks
1. Run `npx tsc --noEmit` and ensure 0 TypeScript errors.
2. Run benchmark and global skill validation suites (`test_cinematic_benchmark.ts`, `verify_global_skill.ts`).
3. Render `renders/claude/SKILL_INTRO_SHOWREEL.mp4` and 12-frame contact sheet `renders/claude/SKILL_INTRO_CONTACT_SHEET.png`.
4. Commit and push all artifacts to `origin/main`.
