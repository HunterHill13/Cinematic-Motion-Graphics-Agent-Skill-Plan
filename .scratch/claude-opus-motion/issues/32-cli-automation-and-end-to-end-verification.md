# Ticket 32: CLI Automation, End-to-End Test & Production Verification

## Objective
Build the CLI command entry point `cli/create-motion-video.ts` and automated test suite `tests/test_zero_to_video.ts`.

## Requirements
1. Support syntax:
   `npm run create-video -- --topic "<موضوع یا سناریو>" --output renders/<نام_فایل>.mp4`
2. Automatically execute:
   - Manifest compilation
   - Remotion render
   - Contact sheet assembly
3. Automated test `tests/test_zero_to_video.ts` verifying manifest schema, compiler latency (<100ms), and Remotion bundle validity.
4. Full git sync and artifact generation.
