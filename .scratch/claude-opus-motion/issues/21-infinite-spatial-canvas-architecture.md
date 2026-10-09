# Issue 21: Infinite Spatial Canvas Architecture

## Objective
Implement generic, reusable components `InfiniteSpatialCanvas` and `SpatialEntity` in `src/motion/grammar/InfiniteSpatialCanvas.tsx`.

## Requirements
1. `InfiniteSpatialCanvas`: Wraps a persistent 3D world with `perspective: 1200px` and applies inverse camera translation `translate3d(-camX, -camY, -camZ)` and rotations (`rotateX`, `rotateY`, `rotateZ`).
2. `SpatialEntity`: Declares a children's world coordinate `(worldX, worldY, worldZ)` and optional yaw/pitch/roll.
3. Completely generic and reusable across any topic (medicine, finance, SaaS, biology).
4. No sequence unmounting; elements stay at their coordinates and move naturally in and out of the viewport.
