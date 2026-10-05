# V11_REFERENCE_IMPLEMENTATION_MAP.md — Reference Architecture to Native Code Mapping

## 1. Reference Implementation Matrix

| Reference Repository | Reference Concept | Extracted Principle | Native Implementation | Used By |
| :--- | :--- | :--- | :--- | :--- |
| **Vincentwei1021/video-talkcraft** | Motion Recipes | Reusable multi-actor motion behaviors composed of atomic primitives | `src/motion/recipes/` | Shots 01–06 & Lab |
| **Vincentwei1021/video-talkcraft** | Word-Level Audio Sync | Semantic phrase timing: anticipation $\to$ contact $\to$ reaction $\to$ settle | `src/audio/syncPhrase.ts` | All Shots & Proof |
| **feitangyuan/onetake** | Carry Object & Lineage | Persistent visual entities surviving cuts with physical causality | `src/motion/continuity/carryContract.ts` | Shot Transitions 1–5 |
| **feitangyuan/onetake** | Beat Boundary & Camera Lead | Transition-first choreography where outgoing beat physically leads incoming beat | `src/motion/continuity/carryScore.ts` | Transition Handoffs |
| **echris6/motion-video-kit** | Motion Grammar & Mechanisms | Atomic mechanisms library (Travel, Fold, Push, Mask, DiagramBuild, etc.) | `src/motion/mechanisms/` | Recipe Library |
| **echris6/motion-video-kit** | Two-Tier Critic Loop | Visual contact sheets, transition strips, and automated continuity scoring | `qc/` & `verify_carry_continuity_v11.py` | QC Suite |

---

## 2. Abstraction Definitions

### A. Atomic Motion Mechanisms (`src/motion/mechanisms/`)
Pure, single-responsibility physical or optical transformations:
- **Kinetic:** `Travel`, `Follow`, `Relay`, `Push`, `Pull`, `Collision`, `CounterMotion`
- **Geometric:** `Fold`, `Collapse`, `Morph`, `Split`, `Merge`
- **Graphic/Visual:** `Draw`, `Reveal`, `Mask`, `Ripple`, `Orbit`, `Gravity`
- **Spatial/Camera:** `CameraThrough`, `ZoomThrough`, `Parallax`
- **Diagrammatic/Type:** `DiagramBuild`, `DiagramDecompose`, `KineticType`

### B. Motion Recipes (`src/motion/recipes/`)
Compositions of 2 to 5 atomic mechanisms producing a complete, predictable motion-design gesture with defined entry, peak action, settle, and audio alignment.

### C. Semantic Audio Sync (`src/audio/syncPhrase.ts`)
Converts narration acoustic timestamps into a 4-phase physical trajectory:
$$\text{Phase}(t) = \begin{cases} 
\text{Anticipation}(t) & t < t_{\text{contact}} \\
\text{Contact Strike} & t = t_{\text{contact}} \\
\text{Harmonic Reaction}(t) & t_{\text{contact}} \le t < t_{\text{reaction}} \\
\text{Damped Settle}(t) & t \ge t_{\text{reaction}}
\end{cases}$$

### D. Carry Contract & Continuity Score (`src/motion/continuity/`)
Quantifies physical and visual persistence across shot boundaries:
$$\text{CarryScore} = \sum w_i \cdot S_i \in [0.0, 1.0]$$
- Target average: $\ge 0.75$
- Minimum threshold: $> 0.50$
