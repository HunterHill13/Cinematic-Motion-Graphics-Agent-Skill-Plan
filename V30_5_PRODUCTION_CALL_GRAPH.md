# V30.5 Production Call Graph & Source Reachability Audit

## Executive Summary

**Milestone:** V30.5 — Production Truth & Visual Delta Audit  
**Status:** COMPLETE & VERIFIED VIA SOURCE INSPECTION & VISUAL SENTINEL  
**Audit Purpose:** Prove whether the code modified during V30 actually reached the rendered video output (`renders/v30/V30_PRODUCTION_MASTER.mp4`), trace the exact runtime call graph from `Root.tsx` to pixels, and identify reachable vs. unreachable components.

---

## 1. The Exact Production Call Graph

Source tracing of the render command:
```bash
npx remotion render V27-KeyframeCraftedMaster renders/v30/V30_PRODUCTION_MASTER.mp4
```

### Call Hierarchy:

```text
Root.tsx (Composition Registration: id="V27-KeyframeCraftedMaster")
  │ [src/Root.tsx: Lines 1531-1538]
  ▼
component={V25_5_IntegratedProduction}
  │ [Imported at src/Root.tsx: Line 128]
  │ Source: projects/persian_editorial_motion_test_v19/src/narrative/v25_5/V25_5_IntegratedProduction.tsx
  ▼
Master Narrative Container: <V25_5_IntegratedProduction />
  │ [Lines 78-1021]
  │ ├─ Camera/Canvas Stage: <div style={{ transform: `scale(${camera.scale})...` }}>
  │ ├─ Beat 01 (Frames 0-180): Persian Editorial Hook («آیا هوش مصنوعی...»)
  │ ├─ Beat 02 (Frames 180-360): The Singularity Seed & Trajectory
  │ ├─ Beat 03 (Frames 270-450): Empirical Foundations («پایه‌های تجربی») [V30 MODIFIED REGION]
  │ ├─ Beat 04 (Frames 450-630): Acceleration / Transformation («جهش»)
  │ ├─ Beat 05 (Frames 630-810): Topological Convergence («همگرایی»)
  │ └─ Beat 06 (Frames 810-1080): Typographic Climax («اصالت»)
  ▼
Rendered Output: renders/v30/V30_PRODUCTION_MASTER.mp4 (1080 frames / 36.0s @ 30 FPS)
```

---

## 2. Node-by-Node Reachability Verification

| Node Level | File Path | Component Name | Line / Range | Reachable? | Proof / Mechanism |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **1. Root Entry** | [`src/Root.tsx`](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/src/Root.tsx) | `<Root />` | L1531–1538 | **YES** | Composition `V27-KeyframeCraftedMaster` explicitly maps to `V25_5_IntegratedProduction`. |
| **2. Master Component** | [`projects/.../V25_5_IntegratedProduction.tsx`](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/projects/persian_editorial_motion_test_v19/src/narrative/v25_5/V25_5_IntegratedProduction.tsx) | `V25_5_IntegratedProduction` | L78–1021 | **YES** | Direct functional component rendered by Remotion. |
| **3. Beat 01 (Hook)** | `V25_5_IntegratedProduction.tsx` | Inline Beat 01 block | L140–250 | **YES** | Rendered when `currentFrame < 180`. |
| **4. Beat 02 (Seed)** | `V25_5_IntegratedProduction.tsx` | Inline Beat 02 block | L251–360 | **YES** | Rendered when `currentFrame >= 180 && currentFrame < 360`. |
| **5. Beat 03 (Empirical)** | `V25_5_IntegratedProduction.tsx` | Inline Beat 03 block | L361–470 | **YES** | Rendered when `currentFrame >= 270 && currentFrame < 450`. Contains V30 changes. |
| **6. Beat 04 (Mutation)** | `V25_5_IntegratedProduction.tsx` | Inline Beat 04 block | L471–650 | **YES** | Rendered when `currentFrame >= 450 && currentFrame < 630`. |
| **7. Beat 05 (Convergence)**| `V25_5_IntegratedProduction.tsx` | Inline Beat 05 block | L651–830 | **YES** | Rendered when `currentFrame >= 630 && currentFrame < 810`. |
| **8. Beat 06 (Climax)** | `V25_5_IntegratedProduction.tsx` | Inline Beat 06 block | L831–1020 | **YES** | Rendered when `currentFrame >= 810`. |
| **9. VisualConceptDirector**| [`src/director/VisualConceptDirector.ts`](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/src/director/VisualConceptDirector.ts) | Class `VisualConceptDirector` | L1–151 | **NO** | **UNREACHABLE FROM PRODUCTION MASTER.** Never imported or instantiated in `V25_5_IntegratedProduction.tsx`. |
| **10. Creative Lab** | [`src/motion/precision_lab/V30_CreativeDirectionLab.tsx`](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/src/motion/precision_lab/V30_CreativeDirectionLab.tsx) | `V30_CreativeDirectionLab` | L1–355 | **NO** | **LAB COMPOSITION ONLY.** Registered in `Root.tsx` under id `V30-CreativeDirectionLab` (duration 240f); not imported into production master. |

---

## 3. The Composition ID Discrepancy & Aliasing Explained

The prompt raised a critical red flag:
> "Your V30 report states that you modified `V25_5_IntegratedProduction.tsx`. However, the production render command was: `npx remotion render V27-KeyframeCraftedMaster ...`"

### The Source Reality:
In [`src/Root.tsx`](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/src/Root.tsx):
* Line 1385: `<Composition id="V25-5-Integrated" component={V25_5_IntegratedProduction} ... />`
* Line 1459: `<Composition id="V26-ChoreographedMaster" component={V25_5_IntegratedProduction} ... />`
* Line 1532: `<Composition id="V27-KeyframeCraftedMaster" component={V25_5_IntegratedProduction} ... />`

All three composition IDs (`V25-5-Integrated`, `V26-ChoreographedMaster`, and `V27-KeyframeCraftedMaster`) point to the **exact same underlying component**: `V25_5_IntegratedProduction`.

Therefore:
1. `V27-KeyframeCraftedMaster` **DOES** render `V25_5_IntegratedProduction`.
2. Any edit made inside `V25_5_IntegratedProduction.tsx` **DOES** reach the render of `V27-KeyframeCraftedMaster`.
3. However, this aliasing masks architectural debt: multiple milestone compositions share a single mutable file instead of properly versioned files.

---

## 4. Empirical Proof of Reachability: Visual Sentinel Test

To guarantee beyond any theoretical doubt that editing `V25_5_IntegratedProduction.tsx` alters the pixels rendered by `V27-KeyframeCraftedMaster`, a high-visibility diagnostic sentinel was injected into Beat 03:

### Injected Sentinel Code:
```tsx
{/* V30.5 TEMPORARY VISUAL SENTINEL FOR PROOF OF REACHABILITY */}
<div
  style={{
    position: 'absolute',
    left: 960 - 150,
    top: 480,
    width: 300,
    height: 50,
    backgroundColor: '#ff0055',
    border: '3px solid #ffffff',
    color: '#ffffff',
    fontWeight: 900,
    fontSize: 22,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    boxShadow: '0 0 30px #ff0055',
  }}
>
  V30.5 SENTINEL PROOF
</div>
```

### Test Render Command:
```bash
npx remotion still V27-KeyframeCraftedMaster renders/v30/sentinel_proof_f330.png --frame=330
```

### Result:
* Rendered image: [`renders/v30/sentinel_proof_f330.png`](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/renders/v30/sentinel_proof_f330.png)
* Visual outcome: The bright magenta badge with bold white text `V30.5 SENTINEL PROOF` rendered dead-center over Beat 03.
* Sentinel was subsequently reverted, leaving the working copy clean.

**Conclusion:** Source code changes in `V25_5_IntegratedProduction.tsx` **100% reach the rendered production video.**

---

## 5. Reachable vs. Unreachable V30 Changes

### Reachable Changes:
* Modifications to Beat 03 (Frames 270–450) inside `V25_5_IntegratedProduction.tsx`:
  * Removal of numeric analytics annotations (`+151.2`, `84.3%`, `+92.4`, `+121.8`).
  * Removal of cyan apex circular nodes.
  * Widening of pillar bodies (56px $\to$ 64px) and styling adjustments (slate fills, zenith gold highlights).

### Unreachable Changes:
* The entire [`src/director/VisualConceptDirector.ts`](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/src/director/VisualConceptDirector.ts) module (151 lines):
  * Was created as a standalone architecture file.
  * Was never imported, linked, or consumed by `V25_5_IntegratedProduction.tsx`.
* The four creative studies in [`V30_CreativeDirectionLab.tsx`](file:///g:/دانشگاه/کمیته%20تحقیقاتی/فیلم%20ها%20هفتگی/اسکیل%20موشن%20گرافیک/src/motion/precision_lab/V30_CreativeDirectionLab.tsx):
  * Study 01 (Negative-space razor slit): LAB ONLY.
  * Study 03 (Ligature uncoiling into compass star): LAB ONLY.
  * Study 04 (28-frame frozen iris stillness): LAB ONLY.
  * Only Study 02's visual concept (monolith styling) was manually transcribed into Beat 03.
