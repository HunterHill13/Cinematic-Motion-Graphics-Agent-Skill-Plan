# Issue 23: Showreel Infinite Spatial Canvas Migration

## Objective
Migrate `SkillIntroShowreel.tsx` from isolated opacity stacking to a genuine continuous 3D coordinate avenue.

## Tasks
1. Assign world coordinates:
   - Act 1 (Monolith): `worldX = 0, worldY = 0, worldZ = 0`
   - Act 2 (Paper Morph): `worldX = 1500, worldY = 0, worldZ = -40`
   - Act 3 (Blueprint Console): `worldX = 3000, worldY = 0, worldZ = 20`
   - Act 4 (Calibration Gauge): `worldX = 4200, worldY = 0, worldZ = 0`
2. Remove discrete opacity cross-fades; elements remain rendered at their world coordinates.
3. Drive the continuous camera X translation `camX` across the timeline:
   - Frames 0..280: `camX = 0`
   - Frames 280..380: Glide `camX: 0 -> 1500` with banking roll (-3.5 deg)
   - Frames 380..680: `camX = 1500`
   - Frames 680..780: Glide `camX: 1500 -> 3000` with banking roll (+3.5 deg)
   - Frames 780..1180: `camX = 3000`
   - Frames 1180..1280: Glide `camX: 3000 -> 3600` (docking both Act 3 and Act 4 into balanced view)
4. Ensure zero subpixel jitter and verify multi-plane parallax.
