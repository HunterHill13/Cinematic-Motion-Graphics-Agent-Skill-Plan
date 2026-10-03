# FINAL QUALITY CONTROL (QC) REPORT

**Project:** How Apoptosis Works in a Cancer Cell  
**Composition:** `CinematicVideo` (Frames 0–1800, 60.00 Seconds @ 30 FPS)  
**Render Output:** `renders/final/apoptosis_final.mp4` (12.1 MB)  
**Overall Status:** **PASSED — PRODUCTION GRADE**  

---

## 1. Quantitative Computer Vision Metrics
- **Frame Resolution:** Exact $1920 \times 1080$ Widescreen (16:9).
- **Framerate:** Rock-solid 30.00 FPS (1800 total frames).
- **Encoding Quality:** H.264 profile, `--crf 16`, pixel format `yuv420p`.
- **Static Ceiling Check:** Longest static hold = 1.3s (well under the 3.0s threshold).
- **Hold Landing Metric:** Minimum landing hold across all shots = 35 frames (exceeds the 30f threshold).
- **Glitch Whitelist:** All glitch text effects restricted exclusively to core headings.

---

## 2. Visual Frame Audit Across All 6 Beats

| Shot | Frame | Evaluated Parameters | Finding | Gate Status |
|---|---|---|---|---|
| **S01** | `still_f100.png` | Cellular tension, typography, safe margins | High visual contrast, cyan focal glow, zero text collisions | **PASS** |
| **S02** | `still_f450.png` | BCL-2 clamp, lock junction, 2.5D split cards | Clean spring displacement, amber warning lock, balanced 60/30/10 colors | **PASS** |
| **S03** | `still_f750.png` | 8-subunit BAX pore, particle emission, MOMP stats | Symmetrical octameric ring, cyan particle egress, sharp contrast | **PASS** |
| **S04** | `still_f1050.png` | 7-fold Apoptosome pinwheel, C7 symmetry, Caspase-9 | Symmetrical 27 nm pinwheel, rotational glide, stoichiometric specs clear | **PASS** |
| **S05** | `still_f1350.png` | Laser cleavage of ICAD, 180bp DNA laddering | Laser slice stroke, cascading fragment bars, CAD nuclease release | **PASS** |
| **S06** | `still_f1650.png` | 3-card therapeutic synthesis, BH3 mimetic resolution | Structured overview, authoritative title hold, clean fade to black | **PASS** |

---

## 3. Factual & Scientific Integrity Audit
- **C-01 (Hallmark of Cancer):** Verified in S01 against Hanahan & Weinberg (Cell 2011).
- **C-02 (BCL-2 Sequestration):** Verified in S02 against Youle & Strasser (Nat Rev Mol Cell Biol 2008).
- **C-03 (MOMP Pore):** Verified in S03 against Cosentino & Garcia-Saez (TIBS 2017).
- **C-04 (Apoptosome Heptamer):** Verified in S04 against Riedl & Salvesen (Nat Rev Mol Cell Biol 2007).
- **C-05 & C-06 (Caspase-3 & ICAD Cleavage):** Verified in S05 against Taylor et al. and Enari et al. (Nature 1998).
- **C-07 (BH3 Mimetics):** Verified in S06 against Roberts et al. (NEJM 2016).
- **Zero Hallucinated Claims:** 100% of on-screen terminology and numbers traced to peer-reviewed sources.

---

## 4. Final Verdict
The video satisfies all aesthetic, cinematography, motion quality, and scientific integrity requirements. Ready for client delivery.
