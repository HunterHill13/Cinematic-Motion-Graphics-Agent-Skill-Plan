# V26 — Production Architecture & Visual Diagnosis

## 1. Executive Summary
Prior to V26, the codebase made substantial mathematical progress (V24 Adaptive Director, V25 Kinematics & Morph correspondence, V25.5 Motion Ownership). However, a candid audit of the actual visual output reveals why the result still looks like an **animated tech UI / presentation slide** rather than **high-end cinematic motion graphics**:

1. **Persistent Centered Staging ("The Center Cliché")**:
   - In Beats 01, 04, 05, 06, 07, and 08, almost all primary heroes and typography are locked to `(960, 540)` (exact canvas center).
   - The eye never travels through the frame. Composition does not migrate; negative space does not breathe or rebalance.
2. **Typography as HTML Text Overlay**:
   - Words like «نقطه آغاز», «جهش», and «شتاب» are rendered primarily as standard HTML `<div>` elements with drop shadows, rather than being treated as graphic vector material that deforms, splits, interacts with axes, or directly metamorphoses into geometry.
3. **Weak Transformation Chains ($A \to B \to C$)**:
   - Beats still largely behave as: *Hero enters $\to$ Hold $\to$ Fade out $\to$ Next hero enters*.
   - In Beat 06, the word «شتاب» simply fades out (`opacity: interpolate(b6Frame, [40, 65], [1, 0])`) while an SVG Compass Star fades in underneath it, rather than the Persian letterforms physically fracturing and extruding into the star's radial spines.
4. **Passive Camera vs. Motivated Re-framing**:
   - The camera acts mostly as a gentle push or static hold. It does not reframe with narrative purpose (e.g. following an off-center projectile, sudden extreme close-up, or motivated editorial reframe).

---

## 2. The Architectural Gap

| Current Pipeline (V24 - V25.5) | Required V26 Paradigm |
| :--- | :--- |
| **Narrative $\to$ Beat $\to$ Element $\to$ Animation** | **Narrative Beat $\to$ Visual Metaphor $\to$ Choreography Plan $\to$ Transformation Chain $\to$ Asymmetric Composition $\to$ Kinematics $\to$ Render** |
| Elements are placed in DOM and then given CSS transitions. | Motion IS the composition. Elements exist only as expressions of a continuous transformation chain. |
| Typography is static text animated into place. | Typography is graphic vector material that participates directly in the physical causality of the scene. |
| The camera merely zooms in slightly. | The camera reframes dynamically to guide focal-point migration and negative space. |

---

## 3. V26 Strategy
1. Build `VisualChoreographer.ts` as the declarative planning engine converting narrative beats into authored visual choreography plans with explicit spatial focal points, negative space budgets, and $A \to B \to C$ transformation chains.
2. Develop 5 focused Choreography Studies in `src/choreography/v26/` proving:
   - Study A: One object, three transformations ($A \to B \to C$ continuous mass).
   - Study B: Dynamic focal point migration and asymmetric framing.
   - Study C: Persian Typography $\to$ Geometry (letterforms physically extruding into geometric structure).
   - Study D: Physical scene handoff without cross-dissolve.
   - Study E: Complete 10s editorial beat uniting metaphor, typography, camera, and stillness.
3. Redesign at least 3 real production beats in the production master using the `VisualChoreographer`.
