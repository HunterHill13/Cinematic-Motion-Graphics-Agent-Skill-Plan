# 09: Kinetic Data Viz Core Library

**What to build:** Build the core motion graphics data visualization component library in `src/motion/library/KineticDataViz.tsx`. It provides four spring-animated, studio-grade data components:
1. `KineticBarChart`: multi-column bar graph with spring growth and staggered entry.
2. `KineticRadialProgress`: SVG circular gauge with glowing head and angular sweep.
3. `KineticMetricCounter`: animated rolling numbers with decimal support.
4. `KineticTrendLine`: continuous SVG line graph with smooth bezier interpolation and area fill.

**Blocked by:** None (can start immediately).

**Status:** done

- [x] Create `src/motion/library/KineticDataViz.tsx`.
- [x] Implement damped spring animation for bars and radial arcs.
- [x] Implement exponential ease rolling for decimal metric counters.
- [x] Export clean TypeScript interfaces and verify types with `tsc`.
