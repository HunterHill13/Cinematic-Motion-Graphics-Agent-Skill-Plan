# Ticket 30: Zero-to-Video Semantic Compiler

## Objective
Build the automated scenario compiler (`src/compiler/ZeroToVideoCompiler.ts`) that transforms a raw Persian/English topic or outline into a complete, mathematically quantized `VideoManifest`.

## Requirements
1. Define strict TypeScript schema for `VideoManifest`:
   - Global timing (FPS, Duration, BPM, Beat-Grid quantization)
   - Act 1 (Monolith Hero): Title, Subtitle, Badge, CTA Button text
   - Act 2 (Tactile Paper Stepper): 4 stages, vector shape IDs, descriptions, metrics
   - Act 3 (Blueprint Console): Telemetry stats, Kinetic Bar Chart items, agent cards
   - Act 4 (Brutalist Pavilion): Standard title, calibration gauge value, verification pill
2. Implement semantic rule engine:
   - Topic analyzer that automatically maps keywords to domains (e.g. medicine -> DNA_HELIX_ORBIT, AI -> NEURAL_SYNAPSE, finance -> EXPONENTIAL_CHART).
   - Generates persuasive, humanized Persian copy for all cards.
   - Enforces 75-80% canvas scale constraints.
