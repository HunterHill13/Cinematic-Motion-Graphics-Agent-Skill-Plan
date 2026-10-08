# PHASE 5C — DEPTH, SPATIAL LAYERING & 2.5D SCENE ARCHITECTURE REPORT

**Phase:** Phase 5C — Depth, Spatial Layering & 2.5D Scene Architecture  
**Skill:** `cinematic-motion-director`  
**Status:** COMPLETE & CERTIFIED (100% PASS)  
**Verification Baseline:** Phase 1, Phase 2, Phase 3.1, Phase 4A, Phase 4A.1, Phase 4B-Core, Phase 4B.1, Phase 4B.2, Phase 4B.3, Phase 5A, Phase 5A.1, Phase 5B.1, Phase 5B.2, Phase 5C  

---

## A. Executive Summary & Purpose

Phase 5C completes the spatial layer of the visual architecture pipeline in the `cinematic-motion-director` skill.

Following the foundation laid by previous phases:
* **Phase 5A:** Visual World & Art Direction Contract (*What is the persistent visual universe and hierarchy?*)
* **Phase 5B.1:** Material Language & Material Response Contract (*What is the object physically made of and how does it deform?*)
* **Phase 5B.2:** Lighting Response & Cinematic Light Language (*How does light exist, propagate, and reveal material surfaces?*)

Phase 5C answers the fundamental question:
> **Where do objects exist in space, how are they layered relative to one another and the observer, and how do physical transformations move through depth?**

Prior to Phase 5C, scenes risked behaving as collections of flat 2D vector shapes arbitrarily placed on a canvas. Phase 5C transitions the pipeline to a **strictly semantic 2.5D spatial architecture** where:
1. Every actor occupies concrete normalized spatial coordinates $(x, y, z, \text{scale})$ within discrete depth bands (`FOREGROUND`, `MIDGROUND`, `HERO_PLANE`, `BACKGROUND`, `DEEP_BACKGROUND`).
2. Entities express explicit, machine-readable spatial relationships (`IN_FRONT_OF`, `BEHIND`, `CONTAINS`, `SURROUNDS`, `ORBITAL_AROUND`, etc.).
3. Occlusions are governed by physical depth coherence ($z_{\text{occluding}} < z_{\text{occluded}}$) and artistic framing intents (`PARTIAL`, `FRAMING`, `TRANSLUCENT_VEILING`).
4. Motion verbs translate into depth trajectories (`TOWARD_VIEWER`, `AWAY_FROM_VIEWER`, `MULTI_DEPTH_CONVERGENCE`, `VOLUMETRIC_RADIAL`).
5. Vague aesthetic buzzwords (`"make it 3D"`, `"more depth"`, `"make it pop"`) and fake styling tricks (CSS drop-shadow or blur pretending to be depth) are strictly rejected at the compilation gate.

---

## B. Concrete Spatial Vocabulary & Coordinate Model

Phase 5C establishes a normalized, unambiguous spatial coordinate contract:

### 1. Spatial Coordinate Space
* **Horizontal Axis ($x \in [-1.0, 1.0]$):** Normalized screen-space position ($-1.0$ = left frame edge, $0.0$ = center, $+1.0$ = right frame edge).
* **Vertical Axis ($y \in [-1.0, 1.0]$):** Normalized screen-space position ($-1.0$ = top frame edge, $0.0$ = center, $+1.0$ = bottom frame edge).
* **Depth Axis ($z \in [0.0, 1.0]$):** Normalized depth from observer ($0.0$ = immediate foreground near plane, $0.45\text{--}0.55$ = focal hero plane, $1.0$ = infinite deep background).
* **Scale Factor ($\text{scale} \in [0.05, 3.0]$):** Base physical scale prior to perspective projection.
* **Apparent Perspective Scale:** Computed deterministically via:
  $$\text{apparentScale} = \frac{\text{baseScale}}{1.0 + z \times 0.75}$$

### 2. Controlled Depth Bands
Every entity must reside within an assigned discrete depth band matching its numeric $z$:
* `FOREGROUND` ($z \in [0.00, 0.35]$): Framing elements, anterior exhaust, passing particles, foreground guide structures.
* `MIDGROUND` ($z \in [0.35, 0.65]$): Contextual actors interacting with the primary action.
* `HERO_PLANE` ($z \in [0.45, 0.55]$): The focal plane where the primary persistent hero entity resides.
* `BACKGROUND` ($z \in [0.65, 0.85]$): Supporting architecture, posterior biological structures, environment pedestal.
* `DEEP_BACKGROUND` ($z \in [0.70, 1.00]$): Distant cosmos, extracellular fluid matrix, studio canvas grid.

### 3. Spatial Relationships
Spatial relationships between entities are machine-readable and verifiable:
* `IN_FRONT_OF`: Source entity possesses smaller numeric $z$ than target entity.
* `BEHIND`: Source entity possesses greater numeric $z$ than target entity.
* `BESIDE` / `ABOVE` / `BELOW`: Planar spatial adjacency.
* `SURROUNDS`: Outer entity envelops inner entity in coordinate space.
* `CONTAINS`: Structural or biological encapsulation (e.g., cell membrane containing internal nucleus).
* `ORBITAL_AROUND`: Dynamic revolving spatial relationship (e.g., accretion disk around black hole).
* `CONNECTED_TO`: Direct physical or mechanical coupling.

### 4. Occlusion Intents
* `FULL`: Complete blocking of posterior entity.
* `PARTIAL`: Overlap across silhouette perimeter.
* `TRANSLUCENT_VEILING`: Semi-transparent membrane, glass, or plasma passing across background.
* `FRAMING`: Foreground geometry architecturally framing hero in focal plane.
* `NONE`: Unobstructed sightline.

### 5. Parallax & Motion Trajectories
* **Parallax Sensitivity:** `STRONG`, `BALANCED`, `SUBTLE`, `STATIC` (requires depth spread $|z_{\max} - z_{\min}| \ge 0.08$).
* **Z-Motion Trajectories:**
  * `TOWARD_VIEWER`: Decreasing $z$ toward camera plane.
  * `AWAY_FROM_VIEWER`: Increasing $z$ toward background.
  * `PLANAR_XY`: Lateral transformation within current depth plane.
  * `MULTI_DEPTH_CONVERGENCE`: Multi-layer fragments or entities converging to hero plane (e.g., `REASSEMBLE`).
  * `VOLUMETRIC_RADIAL`: Spherically symmetric expansion across $X, Y, Z$ (e.g., `EXPAND`).

---

## C. Strict Boundary Model

Phase 5C adheres to strict architectural boundaries:

| Permitted in Phase 5C | Strictly Prohibited in Phase 5C |
|:---|:---|
| Semantic spatial coordinate schema $(x, y, z, \text{scale})$ | WebGL, Three.js, Babylon.js, full 3D rendering engines |
| Normalized perspective scale projection function | Camera rigs, camera pathing, orbit controls (reserved for Phase 5D) |
| Physical occlusion rules ($z_{\text{occluding}} < z_{\text{occluded}}$) | Volumetric raymarching, true physical depth buffers |
| Z-axis trajectory binding for canonical Motion Verbs | Particle physics engines, PBR shaders |
| Depth ambiguity gate & fake depth rejection | CSS drop-shadow or blur masquerading as spatial depth |
| Explicit `FLAT_GRAPHIC` bypass mechanism | Bypassing depth in cinematic 3D modes |

---

## D. Depth & Spatial Schema Integration

The spatial contract is deeply integrated into `VisualWorld`:

### 1. TypeScript Contract (`src/motion/visual_world/depthSchema.ts`)
```ts
export interface SpatialDepthContract {
  id: string;
  compositionIntent: SpatialCompositionIntentType;
  placements: EntitySpatialPlacement[];
  relationships: SpatialRelationship[];
  occlusions: OcclusionIntent[];
  parallaxProfile: DepthParallaxProfile;
  motionResponses: SpatialMotionResponse[];
  isFlatGraphicOverride?: boolean;
}
```

### 2. Integration with `VisualWorld` (`src/motion/visual_world/visualWorldSchema.ts`)
```ts
export interface VisualWorld {
  worldId: string;
  title?: string;
  hero: VisualEntityIdentity;
  secondaryEntities: VisualEntityIdentity[];
  tertiaryEntities: VisualEntityIdentity[];
  environmentEntities: VisualEntityIdentity[];
  composition: CompositionContract;
  depth: DepthModel;
  artDirection: ArtDirectionContract;
  materials?: MaterialReference[];
  lighting?: LightingContract;
  spatial?: SpatialDepthContract; // Authoritative Phase 5C 2.5D spatial contract
}
```

### 3. JSON Schema Specification (`schemas/visual-world.schema.json`)
Added complete definitions for `SpatialDepthContract`, `EntitySpatialPlacement`, `SpatialRelationship`, `OcclusionIntent`, `DepthParallaxProfile`, and `SpatialMotionResponse` with validation properties and strict enums.

---

## E. Depth Ambiguity Gate & Anti-Fake-Depth Enforcement

### 1. Semantic Ambiguity Rejection (`DepthAmbiguityGate`)
Rejects subjective buzzwords without spatial grounding:
* Terms banned: `"make it 3D"`, `"add depth"`, `"more depth"`, `"more dimensional"`, `"cinematic depth"`, `"depth effect"`, `"make it pop"`, `"make it immersive"`.
* Throws `DepthDirectionAmbiguityError` (`DEPTH_DIRECTION_AMBIGUOUS`).

### 2. Anti-Fake-Depth Enforcement (Rule V-D14)
* Detects declarations of `dropShadow`, `fakeDepth: true`, or `useDropShadowForDepth: true`.
* Prevents agents from attempting to satisfy 3D depth requirements by applying CSS box-shadows or 2D blur filters.
* Raises violation `V_D14_FAKE_DEPTH_DETECTED`.

---

## F. Depth & Spatial Validator Engine (14 Governed Rules)

`DepthValidator.validate(world)` enforces Rules V-D1 through V-D14:

| Rule | Code | Description |
|:---|:---|:---|
| **V-D1** | `V_D1_MISSING_SPATIAL_CONTRACT` | Missing spatial contract in cinematic mode (`SPATIAL_REQUIRED`). |
| **V-D2** | `V_D2_MISSING_HERO_SPATIAL` | Hero entity has no valid placement in `placements`. |
| **V-D3** | `V_D3_INSUFFICIENT_DEPTH_SEPARATION` | Insufficient depth separation among declared entities ($< 0.10$). |
| **V-D4** | `V_D4_DEPTH_BAND_MISMATCH` | Placement declares depth band mismatched with numeric $z$ (e.g. `FOREGROUND` with $z=0.85$). |
| **V-D5** | `V_D5_UNRESOLVED_ENTITY_RELATION` | Relationship or placement references undeclared entity. |
| **V-D6** | `V_D6_SELF_RELATION` | Impossible self-relation or self-occlusion ($e_1 \to e_1$). |
| **V-D7** | `V_D7_INCOHERENT_OCCLUSION` | Physically incoherent occlusion (deeper object claiming to occlude nearer object, $z_{\text{occluding}} \ge z_{\text{occluded}}$). |
| **V-D8** | `V_D8_PARALLAX_WITHOUT_DEPTH` | `STRONG` parallax claimed without meaningful depth variation ($< 0.08$). |
| **V-D9** | `V_D9_INVALID_SPATIAL_BOUNDS` | Spatial coordinates outside normalized limits ($z \notin [0, 1]$, $\text{scale} \notin [0.05, 3.0]$). |
| **V-D10** | `V_D10_INVALID_COMPOSITION_INTENT` | Unknown or missing spatial composition intent. |
| **V-D11** | `V_D11_DEPTH_COLLAPSE` | Depth collapse detected ($|z_{\max} - z_{\min}| < 0.05$) (`DEPTH_COLLAPSE_DETECTED`). |
| **V-D12** | `V_D12_INVALID_MOTION_VERB` | Motion response references non-canonical MotionVerb or invalid trajectory. |
| **V-D13** | `V_D13_UNRESOLVED_ENTITY` | Spatial placement references undeclared visual entity. |
| **V-D14** | `V_D14_FAKE_DEPTH_DETECTED` | Decorative CSS drop-shadow/blur pretending to be spatial depth. |

---

## G. Cinematic Hard-Gate Enforcement

The Phase-5 cinematic compilation pipeline enforces spatial depth at both entry points:

1. **`MotionGraphCompiler.compileCinematicGraph` (Step 4 Spatial Depth Governance):**
   * Validates `world.spatial` against `SpatialDepthValidator`.
   * Throws `SpatialDepthGovernanceError` (`SPATIAL_REQUIRED`, `DEPTH_COLLAPSE_DETECTED`, or `SPATIAL_INVALID`).
   * Explicit `FLAT_GRAPHIC` compositions cleanly bypass the requirement when `world.depth.isExplicitFlatComposition === true`.

2. **`MotionPlanner.planCinematicSceneFromNaturalLanguage` (Step 4 Spatial Depth Governance):**
   * Validates natural language intent via `SpatialAmbiguityGate.validateNaturalIntent(creativeIntent)`.
   * Enforces spatial depth validation prior to constructing `MotionSceneGraph`.

---

## H. Test Matrix & Fresh-Agent Validation Results

The Phase 5C test suite (`tests/test_phase5c_depth_spatial.ts`) achieved **100% PASS** across all archetypes and gates:

### Part 1: Positive Archetypes (P1 – P4)
* **P1: Celestial / Black Hole Spatial Structure:** PASS
  * Hero singularity at $z=0.45$ (`HERO_PLANE`).
  * Relativistic plasma jets in foreground $z=0.18$.
  * Gravitationally lensed cosmic starfield in deep background $z=0.90$.
* **P2: Medical Cell Spatial Internal/External Layering:** PASS
  * Neoplastic cell core at $z=0.46$ (`HERO_PLANE`).
  * Drug nanocarrier approaching from foreground $z=0.18$.
  * Membrane receptors internal structure at $z=0.55$.
  * `CONTAINS` relation verified between cell and receptor core.
* **P3: Precision Hardware Spatial Assembly Layering:** PASS
  * Device core at $z=0.48$ (`HERO_PLANE`).
  * Precision guide rail framing foreground $z=0.22$.
  * Optical framing occlusion intent verified.
* **P4: Multi-Depth Convergence Spatial Contract:** PASS
  * 3 fragments across distinct depth planes ($z=0.20, 0.50, 0.80$) converging into hero monolith via `REASSEMBLE` and `MULTI_DEPTH_CONVERGENCE`.
  * Verified apparent perspective scale decay.

### Part 2: Negative Governance Tests (N1 – N14)
* **N1 (Missing spatial contract):** PASS (`SPATIAL_REQUIRED` / `V_D1_MISSING_SPATIAL_CONTRACT`).
* **N2 (Hero missing spatial placement):** PASS (`V_D2_MISSING_HERO_SPATIAL`).
* **N3 (Depth collapse $\Delta z = 0 < 0.05$):** PASS (`V_D11_DEPTH_COLLAPSE` / `DEPTH_COLLAPSE_DETECTED`).
* **N4 (Depth band mismatch):** PASS (`V_D4_DEPTH_BAND_MISMATCH`).
* **N5 (Unresolved relationship entity):** PASS (`V_D5_UNRESOLVED_ENTITY_RELATION`).
* **N6 (Self-relation / self-occlusion):** PASS (`V_D6_SELF_RELATION`).
* **N7 (Incoherent physical occlusion):** PASS (`V_D7_INCOHERENT_OCCLUSION`).
* **N8 (Parallax without depth variation):** PASS (`V_D8_PARALLAX_WITHOUT_DEPTH`).
* **N9 (Invalid spatial bounds $z=1.85$):** PASS (`V_D9_INVALID_SPATIAL_BOUNDS`).
* **N10 (Vague "make it 3D" buzzword):** PASS (`DEPTH_DIRECTION_AMBIGUOUS`).
* **N11 (Fake depth styling / drop shadow):** PASS (`V_D14_FAKE_DEPTH_DETECTED`).
* **N12 (Invalid MotionVerb in response):** PASS (`V_D12_INVALID_MOTION_VERB`).
* **N13 (Cinematic compile without spatial):** PASS (`SPATIAL_REQUIRED`).
* **N14 (Explicit FLAT_GRAPHIC bypass):** PASS (Clean pass).

### Part 3: Fresh-Agent Natural-Language Planning
* **Grounded Medical Mitosis Prompt:** Natural language prompt specifying multi-plane cell mitosis planned, bound, and compiled into certified Motion Contracts with multi-layered depth separation: PASS.
* **Ambiguous Buzzword Prompt ("Make the scene feel more 3D and immersive"):** Rejected immediately with `DEPTH_DIRECTION_AMBIGUOUS`: PASS.

### Workspace Regression Status
* `test_phase5c_depth_spatial.ts`: 100% PASS
* `test_phase5b2_lighting_language.ts`: 100% PASS
* `test_phase5b1_material_language.ts`: 100% PASS
* `test_phase5a1_hard_gate.ts`: 100% PASS
* `test_phase5a_visual_world.ts`: 100% PASS
* `test_phase4b1_fresh_agent.ts`: 100% PASS
* `test_phase4b_compiler.ts`: 100% PASS
* `test_ast_motion_validator.ts`: 100% PASS
* `npx tsc --noEmit`: 100% PASS (Zero TypeScript errors)

---

## I. Global Skill Packaging & Verification

All files were packaged and mirrored to the authoritative Global Skill directory:
* `C:\Users\Hill\.gemini\config\skills\cinematic-motion-director\`
* `C:\Users\Hill\.gemini\config\skills\cinematic-motion-director\template\`
* `.agents\skills\cinematic-motion-director\`

The Global Verification Suite (`scripts/verify_global_skill.ts`) was executed with complete success:
```text
====================================================
PHASE 4B.2: GLOBAL SKILL VERIFICATION & LOAD CHECK
Target: C:/Users/Hill/.gemini/config/skills/cinematic-motion-director
====================================================
--- Step 12: Verifying Mandated Global Files ---
  [PASS] All 26 mandated files exist
--- Checking Template Scaffolding Presence (template/src/motion) ---
  [PASS] All 23 template files exist
--- Step 8: Schema Verification ---
  [PASS] storyboard.schema.json contains structured motion verbs
--- Step 7: SKILL.md Architecture Enforcement Check ---
  [PASS] SKILL.md contains required architectural tokens
--- Step 13: Live Runtime Import & Execution Check ---
  [PASS] Live MotionPlanner & Compiler executed
  [PASS] AstMotionValidator loaded and callable
  [PASS] Live VisualWorldPlanner & Validator executed
--- Phase 5A.1: Cinematic Hard-Gate Enforcement Check ---
  [PASS] compileCinematicGraph blocked with VISUAL_WORLD_REQUIRED
--- Phase 5B.1: Material Language & Response Hard-Gate Check ---
  [PASS] compileCinematicGraph blocked with MATERIAL_REQUIRED
--- Phase 5B.2: Lighting Response & Cinematic Light Language Hard-Gate Check ---
  [PASS] compileCinematicGraph blocked with LIGHTING_REQUIRED
--- Phase 5C: Depth, Spatial Layering & 2.5D Architecture Hard-Gate Check ---
  [PASS] Live DepthValidator executed: World spatial contract valid (placements=4)
  [PASS] DepthAmbiguityGate blocked with DEPTH_DIRECTION_AMBIGUOUS
  [PASS] compileCinematicGraph blocked with SPATIAL_REQUIRED
====================================================
RESULT: PASS (100% of checks satisfied)
Global Skill is fully synchronized, self-contained, and valid.
====================================================
```

---

## J. Architectural Transition to Phase 5D

With Phase 5C established:
1. **Objects have identity and visual hierarchy** (Phase 5A).
2. **Objects have physical substance and motion responses** (Phase 5B.1).
3. **Objects have lighting sources, directionality, and illumination interactions** (Phase 5B.2).
4. **Objects have concrete spatial coordinates, depth layers, relationships, and occlusion order** (Phase 5C).

The scene architecture is now ready for **Phase 5D — Camera Grammar & Compositional Choreography**, where camera motion can participate as a motivated observer tracking spatial transformations and consequence without collapsing into fake motion.
