# WORKFLOW: MODE B — SCRIPT TO VIDEO

## Overview
Triggered when the user provides an existing written script or narration text.

> [!IMPORTANT]
> The script is immutable semantic truth. Never rewrite or summarize user-supplied script without explicit permission.

```text
USER SCRIPT
    ↓
TIMING ESTIMATION & TTS GENERATION (tts_build.py)
    ↓
BEAT SHEET & STORYBOARD
    ↓
PILOT GATE (First 20s)
    ↓
PARALLEL SCENE IMPLEMENTATION
    ↓
QC & DELIVERY
```

## Step-by-Step Instructions
1. **Analyze User Script**: Parse sentence breaks, tone, key conceptual peaks, and compute target duration.
2. **Formulate Creative Brief**: Determine visual style, palette, and aspect ratio matching the script.
3. **Execute Audio Synthesis**: Run `tts_build.py` or import user's narration to establish frame timing.
4. **Translate Script into Beats**: Break script lines into visual beats with clear Hero designations.
5. **Enforce Pilot Gate**: Validate the first 20 seconds before full build.
6. **Parallel Shot Generation**: Implement Remotion components preserving theme tokens.
7. **QC & Delivery**: Full visual and technical audit.
