# WORKFLOW: MODE C — VOICEOVER TO VIDEO

## Overview
Triggered when the user provides pre-recorded voiceover audio files.

> [!IMPORTANT]
> The audio recording is the single source of timing truth. Video frames and transitions must anchor strictly to audio timestamps.

```text
AUDIO FILE (.wav / .mp3)
    ↓
TRANSCRIPTION & WORD BOUNDARIES
    ↓
FRAME-ACCURATE TIMELINE
    ↓
BEAT SHEET & STORYBOARD
    ↓
PILOT GATE
    ↓
FULL BUILD & RENDER
```

## Step-by-Step Instructions
1. **Import Audio**: Place audio in `public/assets/<slug>/audio.wav`.
2. **Extract Word-Level Timestamps**: Use automatic speech recognition or whisper transcription to produce sentence and word boundary maps.
3. **Populate `src/utils/timeline.ts` and `src/captions/subs.ts`**: Register exact start and end frames for every phrase.
4. **Draft Visual Beats to Match Audio Peaks**: Align visual impacts to precede voiceover emphasis points by 2–3 frames.
5. **Pilot & Parallel Build**: Standard execution using locked design tokens.
