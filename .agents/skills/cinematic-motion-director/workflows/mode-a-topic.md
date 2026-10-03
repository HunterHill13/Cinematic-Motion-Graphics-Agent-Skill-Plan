# WORKFLOW: MODE A — TOPIC TO VIDEO

## Overview
Triggered when the user provides an open topic, idea, or concept (e.g. *"Create a 60-second video explaining CRISPR"*).

```text
TOPIC & REQUIREMENTS
        ↓
CREATIVE BRIEF & STYLE LOCK
        ↓ (CHECKPOINT 1)
FACTUAL RESEARCH & SOURCES LEDGER
        ↓
NARRATION SCRIPTWRITING
        ↓
VOICE & TIMING SYNTHESIS (tts_build.py)
        ↓
CANONICAL BEAT SHEET (beat-sheet.yaml)
        ↓
STORYBOARD SPECIFICATION (storyboard.yaml)
        ↓ (CHECKPOINT 2)
PILOT PRODUCTION (First 20s)
        ↓ (CHECKPOINT 3: Pilot Visual QC)
PARALLEL SHOT IMPLEMENTATION
        ↓
QUANTITATIVE & VISUAL QC LOOP
        ↓
FINAL RENDER & DELIVERY (CHECKPOINT 4)
```

## Step-by-Step Instructions
1. **Formulate Creative Brief**: Ask only essential clarifying questions if duration or platform is ambiguous. Auto-fill `production/creative-brief.yaml`.
2. **Lock Visual Style**: Generate `production/style-lock.yaml` with chosen palette and typography tokens.
3. **Conduct Grounded Research**: Gather verified facts, metrics, and mechanisms. Populate `research/sources.md`.
4. **Draft Narration**: Apply the 13 spoken prose rules. Keep sentence density within comfortable limits (~2.3 to 2.8 words/second).
5. **Generate Audio & Dual-Clock Timeline**: Run `python scripts/tts_build.py` to produce audio and exact word/sentence frame boundaries.
6. **Produce Beat Sheet & Storyboard**: Assign hero elements, camera moves, and sound design cues.
7. **Execute Pilot Production Gate**: Build and render only the first 10–30 seconds. Run `scripts/motion_check.py` on pilot frames. Obtain client approval.
8. **Assemble Remaining Shots**: Build shot components in parallel, referencing shared `theme.ts` tokens.
9. **Execute Two-Tier QC**: Automated CV analysis + visual frame audit. Fix any defects.
10. **Final Render**: Deliver MP4 with `DELIVERY_NOTES.md` and complete attributions.
