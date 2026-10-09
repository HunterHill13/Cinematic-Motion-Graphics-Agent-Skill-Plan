# Ticket 36: Integration, Render Audit & Production Verification

## Objective
Integrate the smooth camera bounds, docked framing overhaul, and Newtonian attractor swarm into `SkillIntroShowreel.tsx` and `UniversalStudioShowreel.tsx`.

## Verification Steps
1. TypeScript compilation check (`tsc --noEmit`).
2. Run full cinematic benchmark tests.
3. Render fresh stills at frames 360 (sec 12), 780 (sec 26), 1440 (sec 48).
4. Inspect visual framing to verify:
   - Zero pop-out or sudden disappearing at seconds 12 and 26.
   - Beautiful, balanced, tightly docked layout at second 48 without any cutoff on the left or empty gap in the center.
   - Newtonian particle swarm adding energetic life to vector targets.
5. Re-assemble contact sheet, render master video, commit and git sync.
