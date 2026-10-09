# Ticket 35: Newtonian Vector Attractor Swarm Engine

## Objective
Build `src/motion/library/NewtonianAttractorSwarm.tsx`:
A deterministic physics particle swarm that calculates gravitational attraction toward an arbitrary vector attractor point $(cx, cy, cz)$, reacts to musical beat pulses, and disperses with explosive kinetic scattering upon cursor clicks.

## Requirements
1. Support $N=60..100$ particles calculated with deterministic pseudo-physics:
   - Attractive force proportional to $1 / (r + \epsilon)$
   - Angular vortex velocity around the attractor center
   - Style-aware particle colors (emerald/gold for Act 1/2, cyan/blue for Act 3, black/amber for Act 4)
2. Interactive impulse: Repulsive dispersion at button click (frame 219) and rhythmic radial expansion on beat-grid drops.
3. 60 FPS zero-jitter WebGL/SVG/Canvas performance.
