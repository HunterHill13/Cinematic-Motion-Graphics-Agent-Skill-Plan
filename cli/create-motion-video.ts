#!/usr/bin/env node
/**
 * ============================================================================
 * CLAUDE OPUS 5.5: ZERO-TO-VIDEO CLI AUTOMATION PIPELINE
 * ============================================================================
 * 
 * Usage:
 *   npx ts-node --project tsconfig.json cli/create-motion-video.ts \
 *     --topic "تحلیل توالی ژنتیک و پزشکی فردمحور" \
 *     --output renders/genetic_medicine.mp4
 * 
 * Flags:
 *   --topic       Topic, title, or scenario in Persian or English (Required)
 *   --output      Target MP4 file path (Default: renders/output.mp4)
 *   --duration    Duration in seconds (Default: 60)
 *   --dry-run     Only compile and output manifest JSON without rendering
 * ============================================================================
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { ZeroToVideoCompiler, VideoManifest } from '../src/compiler/ZeroToVideoCompiler';

function parseArgs(): { topic: string; output: string; duration: number; dryRun: boolean } {
  const args = process.argv.slice(2);
  let topic = 'کارگردانی سینمایی ویدیو در تراز کلاد اوپوس ۵.۵';
  let output = 'renders/output.mp4';
  let duration = 60;
  let dryRun = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--topic' && args[i + 1]) {
      topic = args[++i];
    } else if (arg === '--output' && args[i + 1]) {
      output = args[++i];
    } else if (arg === '--duration' && args[i + 1]) {
      duration = parseInt(args[++i], 10) || 60;
    } else if (arg === '--dry-run') {
      dryRun = true;
    }
  }

  return { topic, output, duration, dryRun };
}

async function main() {
  const { topic, output, duration, dryRun } = parseArgs();

  console.log('\n================================================================');
  console.log('CLAUDE OPUS 5.5: ZERO-TO-VIDEO CINEMATIC COMPILER PIPELINE');
  console.log('================================================================');
  console.log(`[TOPIC]     ${topic}`);
  console.log(`[OUTPUT]    ${output}`);
  console.log(`[DURATION]  ${duration}s (${duration * 30} frames @ 30 FPS)`);
  console.log('----------------------------------------------------------------');

  const startTime = Date.now();

  // 1. Compile VideoManifest
  console.log('[1/3] Compiling semantic scenario to mathematical beat-grid...');
  const manifest: VideoManifest = ZeroToVideoCompiler.compile({
    topic,
    durationInSeconds: duration,
  });

  const manifestPath = path.resolve('.scratch/last_video_manifest.json');
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`      ✓ Manifest generated: ${manifestPath}`);
  console.log(`      ✓ Resolved Topology: ${manifest.act2.stages.map((s) => s.id).join(' -> ')}`);
  console.log(`      ✓ Hero Headline: "${manifest.act1.headline}"`);

  if (dryRun) {
    console.log('\n[DRY RUN COMPLETE] Compilation verified in ' + (Date.now() - startTime) + 'ms.');
    return;
  }

  // 2. Render Master MP4 Video via Remotion CLI
  console.log('\n[2/3] Invoking Remotion Studio Engine to render master video...');
  const resolvedOutput = path.resolve(output);
  fs.mkdirSync(path.dirname(resolvedOutput), { recursive: true });

  const renderCmd = `npx remotion render src/index.ts UniversalStudioShowreel "${resolvedOutput}" --concurrency=4`;
  console.log(`      Executing: ${renderCmd}\n`);

  try {
    execSync(renderCmd, { stdio: 'inherit' });
    console.log(`\n      ✓ Render successful: ${resolvedOutput}`);
  } catch (err) {
    console.error('Render failed:', err);
    process.exit(1);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n================================================================');
  console.log(`✅ ZERO-TO-VIDEO PIPELINE COMPLETE IN ${elapsed}s`);
  console.log(`Master Video: ${resolvedOutput}`);
  console.log('================================================================\n');
}

main().catch((err) => {
  console.error('Fatal CLI Error:', err);
  process.exit(1);
});
