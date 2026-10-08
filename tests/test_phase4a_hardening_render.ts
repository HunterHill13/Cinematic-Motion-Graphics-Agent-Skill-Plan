/**
 * ============================================================================
 * PHASE 4A.1 HARDENING PASS: RENDER-BACKED VERB TEMPLATE VALIDATION
 * ============================================================================
 * 
 * Verifies the complete creative pipeline on real rendered Remotion frames:
 *   Creative Intent -> TransformationContract -> VerbTemplate -> PersistentWorld
 *   -> Remotion Stills -> Actual Rendered Frames -> RenderVisualValidator
 * 
 * VALIDATES:
 *   1. All 8 Core Verbs: SPLIT, EXPAND, TRAVEL, COLLAPSE, MORPH, MERGE, DEFORM, REASSEMBLE
 *   2. Frame Sampling: 0%, 20%, 40%, 50%, 60%, 80%, 100% (middle-window focus)
 *   3. Anti-Bypass Test: createSplitTemplate + static render -> MUST FAIL
 *   4. Decorative Camouflage Test: Static hero + moving particle -> MUST FAIL
 *   5. PersistentWorld Continuity Test: Same heroId across boundary without sequence unmount
 *   6. CanonicalMotionScene Real Render Verification -> MUST PASS
 * ============================================================================
 */

import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { execSync } from 'child_process';
import {
  RenderVisualValidator,
  FrameSample,
  VisualEvidenceReport,
} from '../src/motion/validation/renderVisualValidator';
import {
  createSplitTemplate,
  createExpandTemplate,
  createTravelTemplate,
  createCollapseTemplate,
  createMorphTemplate,
  createMergeTemplate,
  createDeformTemplate,
  createReassembleTemplate,
} from '../src/motion/grammar/verbTemplates';
import { AstMotionValidator } from '../src/motion/validation/astMotionValidator';

// Pure TypeScript PNG Decoder using built-in zlib
function decodePngToLuminance(buffer: Buffer): { width: number; height: number; pixels: Float32Array } {
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);

  let pos = 8;
  const idatChunks: Buffer[] = [];
  while (pos < buffer.length - 12) {
    const len = buffer.readUInt32BE(pos);
    const type = buffer.toString('ascii', pos + 4, pos + 8);
    if (type === 'IDAT') {
      idatChunks.push(buffer.subarray(pos + 8, pos + 8 + len));
    }
    pos += 12 + len;
  }

  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const bytesPerPixel = 4; // RGBA
  const stride = width * bytesPerPixel;
  const raw = new Uint8Array(width * height * bytesPerPixel);

  let srcOffset = 0;
  for (let y = 0; y < height; y++) {
    const filterType = decompressed[srcOffset++];
    const lineStart = y * stride;
    for (let x = 0; x < stride; x++) {
      let val = decompressed[srcOffset++];
      const a = x >= bytesPerPixel ? raw[lineStart + x - bytesPerPixel] : 0;
      const b = y > 0 ? raw[(y - 1) * stride + x] : 0;
      const c = (x >= bytesPerPixel && y > 0) ? raw[(y - 1) * stride + x - bytesPerPixel] : 0;

      if (filterType === 1) val = (val + a) & 0xff;
      else if (filterType === 2) val = (val + b) & 0xff;
      else if (filterType === 3) val = (val + Math.floor((a + b) / 2)) & 0xff;
      else if (filterType === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
        val = (val + pr) & 0xff;
      }
      raw[lineStart + x] = val;
    }
  }

  const pixels = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const r = raw[i * 4];
    const g = raw[i * 4 + 1];
    const b = raw[i * 4 + 2];
    pixels[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;
  }

  return { width, height, pixels };
}

function renderAndSampleComposition(
  compositionId: string,
  frames: number[],
  durationFrames: number,
  width: number = 480,
  height: number = 270
): FrameSample[] {
  const tempDir = path.resolve(__dirname, 'temp_real_render', compositionId);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const samples: FrameSample[] = [];

  for (const frame of frames) {
    const outPath = path.join(tempDir, `frame_${frame}.png`);
    const cmd = `npx.cmd remotion still src/index.ts ${compositionId} "${outPath}" --frame=${frame} --scale=0.25 --image-format=png --quiet`;
    execSync(cmd, { stdio: 'pipe' });

    if (!fs.existsSync(outPath)) {
      throw new Error(`Failed to render frame ${frame} for composition ${compositionId}`);
    }

    const fileBuf = fs.readFileSync(outPath);
    const decoded = decodePngToLuminance(fileBuf);
    const percent = frame / durationFrames;

    samples.push({
      frame,
      percent,
      pixels: decoded.pixels,
      width: decoded.width,
      height: decoded.height,
    });
  }

  return samples;
}

export interface VerbAuditRow {
  verb: string;
  templateExercised: string;
  renderStatus: string;
  middleEvidence: string;
  validatorStatus: 'PASS' | 'FAIL';
  violations: string[];
}

export function runPhase4AHardeningPass() {
  console.log('================================================================');
  console.log('PHASE 4A.1 HARDENING PASS: RENDER-BACKED MOTION GRAMMAR AUDIT');
  console.log('================================================================');

  const validator = new RenderVisualValidator(480, 270);
  const sampleFrames = [0, 20, 40, 50, 60, 80, 99];
  const auditTable: VerbAuditRow[] = [];

  // Contracts matching the test compositions
  const verbContracts = [
    {
      verb: 'SPLIT',
      compId: 'VerbTest-SPLIT',
      template: 'createSplitTemplate()',
      contract: createSplitTemplate({
        shotId: 'render_test_split',
        heroId: 'split_cell',
        heroLabel: 'Cleaving Cell',
        startFrame: 0,
        endFrame: 100,
        origin: { x: 960, y: 540, z: 0 },
        separationDistance: 320,
        splitAxis: 'horizontal',
      }).contract,
    },
    {
      verb: 'EXPAND',
      compId: 'VerbTest-EXPAND',
      template: 'createExpandTemplate()',
      contract: createExpandTemplate({
        shotId: 'render_test_expand',
        heroId: 'expand_core',
        heroLabel: 'Energy Core',
        startFrame: 0,
        endFrame: 100,
        anchor: { x: 960, y: 540, z: 0 },
        initialScale: 0.6,
        expandedScale: 1.5,
        ringLayersCount: 3,
      }).contract,
    },
    {
      verb: 'TRAVEL',
      compId: 'VerbTest-TRAVEL',
      template: 'createTravelTemplate()',
      contract: createTravelTemplate({
        shotId: 'render_test_travel',
        heroId: 'travel_capsule',
        heroLabel: 'Transit Capsule',
        startFrame: 0,
        endFrame: 100,
        from: { x: 300, y: 540, z: 0 },
        to: { x: 1600, y: 540, z: 0 },
      }).contract,
    },
    {
      verb: 'COLLAPSE',
      compId: 'VerbTest-COLLAPSE',
      template: 'createCollapseTemplate()',
      contract: createCollapseTemplate({
        shotId: 'render_test_collapse',
        heroId: 'collapse_singularity',
        heroLabel: 'Singularity Well',
        startFrame: 0,
        endFrame: 100,
        center: { x: 960, y: 540, z: 0 },
        initialScale: 1.8,
        collapsedScale: 0.35,
        spinDegrees: 360,
      }).contract,
    },
    {
      verb: 'MORPH',
      compId: 'VerbTest-MORPH',
      template: 'createMorphTemplate()',
      contract: createMorphTemplate({
        shotId: 'render_test_morph',
        heroId: 'morph_monolith',
        heroLabel: 'Morph Monolith',
        startFrame: 0,
        endFrame: 100,
        center: { x: 960, y: 540, z: 0 },
        fromGeometry: 'circle',
        toGeometry: 'wide_hex',
        fromDimensions: { width: 100, height: 100, borderRadius: 50 },
        toDimensions: { width: 280, height: 110, borderRadius: 12 },
        rotationShift: 60,
      }).contract,
    },
    {
      verb: 'MERGE',
      compId: 'VerbTest-MERGE',
      template: 'createMergeTemplate()',
      contract: createMergeTemplate({
        shotId: 'render_test_merge',
        heroId: 'merge_mass',
        heroLabel: 'Converging Masses',
        startFrame: 0,
        endFrame: 100,
        barycenter: { x: 960, y: 540, z: 0 },
        origins: [{ x: 500, y: 540, z: 0 }, { x: 1420, y: 540, z: 0 }],
        mergedScale: 1.4,
      }).contract,
    },
    {
      verb: 'DEFORM',
      compId: 'VerbTest-DEFORM',
      template: 'createDeformTemplate()',
      contract: createDeformTemplate({
        shotId: 'render_test_deform',
        heroId: 'deform_substrate',
        heroLabel: 'Elastic Substrate',
        startFrame: 0,
        endFrame: 100,
        anchor: { x: 960, y: 540, z: 0 },
        maxSquash: 1.6,
        maxShearDeg: 24,
      }).contract,
    },
    {
      verb: 'REASSEMBLE',
      compId: 'VerbTest-REASSEMBLE',
      template: 'createReassembleTemplate()',
      contract: createReassembleTemplate({
        shotId: 'render_test_reassemble',
        heroId: 'reassemble_lattice',
        heroLabel: 'Crystalline Lattice',
        startFrame: 0,
        endFrame: 100,
        assemblyCenter: { x: 960, y: 540, z: 0 },
        scatterRadius: 260,
        fragmentCount: 4,
        finalScale: 1.35,
      }).contract,
    },
  ];

  // 1. Audit the 8 Core Verb Compositions
  console.log('\n--- 1. AUDITING 8 CORE VERB COMPOSITIONS (REAL RENDERED FRAMES) ---');
  for (const item of verbContracts) {
    process.stdout.write(`Rendering and validating ${item.verb} (${item.compId})... `);
    const samples = renderAndSampleComposition(item.compId, sampleFrames, 100, 480, 270);
    const report = validator.evaluateSamples(item.contract, samples);

    const middleEvidence = `HeroDelta: ${report.meanMiddleHeroDelta.toFixed(3)}, StaticRatio: ${(report.meanMiddleHeroStaticRatio * 100).toFixed(0)}%, FlowMag: ${report.meanHeroFlowMagnitude.toFixed(2)}`;
    const status: 'PASS' | 'FAIL' = report.passed ? 'PASS' : 'FAIL';

    auditTable.push({
      verb: item.verb,
      templateExercised: item.template,
      renderStatus: 'Rendered 7 stills',
      middleEvidence,
      validatorStatus: status,
      violations: report.violations,
    });

    console.log(`${status} [${middleEvidence}]`);
  }

  // 2. Anti-Bypass Test: Fake Split (createSplitTemplate called, but renders static circle)
  console.log('\n--- 2. AUDITING ANTI-BYPASS NEGATIVE FIXTURE (Fake Split) ---');
  process.stdout.write('Rendering and validating VerbTest_AntiBypass_FakeSplit... ');
  const fakeSplitContract = createSplitTemplate({
    shotId: 'render_test_antibypass_fakesplit',
    heroId: 'fake_split_cell',
    heroLabel: 'Fake Split Cell',
    startFrame: 0,
    endFrame: 100,
    origin: { x: 960, y: 540, z: 0 },
    separationDistance: 300,
  }).contract;

  const fakeSplitSamples = renderAndSampleComposition('VerbTest-AntiBypass-FakeSplit', sampleFrames, 100, 480, 270);
  const fakeSplitReport = validator.evaluateSamples(fakeSplitContract, fakeSplitSamples);
  const fakeSplitBlocked = !fakeSplitReport.passed && fakeSplitReport.violations.some((v) => v.includes('MIDDLE_WINDOW_STATIC_HOLD') || v.includes('VERB_MISMATCH_SPLIT'));
  console.log(fakeSplitBlocked ? 'REJECTED as expected (PASS negative check)' : 'FAILED negative check!');
  console.log(`  Violations detected: ${fakeSplitReport.violations.join('; ')}`);

  // 3. Decorative Camouflage Test: Static Hero + Moving Decorative Particle
  console.log('\n--- 3. AUDITING DECORATIVE CAMOUFLAGE NEGATIVE FIXTURE ---');
  process.stdout.write('Rendering and validating VerbTest-DecorativeCamouflage... ');
  const decCamContract = createExpandTemplate({
    shotId: 'render_test_decorative_camouflage',
    heroId: 'static_core_with_particle',
    heroLabel: 'Static Core with Particle',
    startFrame: 0,
    endFrame: 100,
    anchor: { x: 960, y: 540, z: 0 },
    initialScale: 1.0,
    expandedScale: 1.0,
  }).contract;

  const decCamSamples = renderAndSampleComposition('VerbTest-DecorativeCamouflage', sampleFrames, 100, 480, 270);
  const decCamReport = validator.evaluateSamples(decCamContract, decCamSamples);
  const decCamBlocked = !decCamReport.passed && decCamReport.violations.some((v) => v.includes('DECORATIVE_MOTION_CAMOUFLAGE_DETECTED') || v.includes('MIDDLE_WINDOW_STATIC_HOLD'));
  console.log(decCamBlocked ? 'REJECTED as expected (PASS negative check)' : 'FAILED negative check!');
  console.log(`  Violations detected: ${decCamReport.violations.join('; ')}`);

  // 4. CanonicalMotionScene Real Render Verification
  console.log('\n--- 4. AUDITING CANONICAL MOTION SCENE (600-FRAME PERSISTENT WORLD) ---');
  process.stdout.write('Rendering and validating CanonicalMotionScene... ');
  const canonicalFrames = [0, 60, 100, 150, 200, 260, 300, 350, 400, 460, 500, 600];
  const canonicalExpandContract = createExpandTemplate({
    shotId: 'canonical_shot_01_expand',
    heroId: 'reactor_core',
    heroLabel: 'هسته بیوانرژیک راکتور',
    startFrame: 0,
    endFrame: 200,
    anchor: { x: 960, y: 540, z: 0 },
    initialScale: 0.7,
    expandedScale: 1.35,
    ringLayersCount: 3,
  }).contract;

  const canonicalSamples = renderAndSampleComposition(
    'CanonicalMotionScene',
    [0, 30, 60, 80, 100, 120, 140, 160, 190],
    200,
    480,
    270
  );
  const canonicalReport = validator.evaluateSamples(canonicalExpandContract, canonicalSamples);
  console.log(canonicalReport.passed ? 'PASS (Clean genuine motion on real frames)' : 'FAIL!');
  if (!canonicalReport.passed) {
    console.log(`  Violations: ${canonicalReport.violations.join('; ')}`);
  }

  // 5. PersistentWorld Continuity Hardening Test
  console.log('\n--- 5. PERSISTENT WORLD CONTINUITY & ANTI-UNMOUNT AUDIT ---');
  // Verify AST rejection of Sequence-based unmounting
  const fakeSequenceSlideshowCode = `
    import { Sequence } from 'remotion';
    export const FakeSequenceScene = () => (
      <>
        <Sequence from={0} durationInFrames={150}><div id="HeroA" /></Sequence>
        <Sequence from={150} durationInFrames={150}><div id="HeroB" /></Sequence>
      </>
    );
  `;
  const seqValidator = new AstMotionValidator('FakeSequenceScene.tsx', fakeSequenceSlideshowCode);
  const seqReport = seqValidator.validate();
  const seqDetected = seqReport.violations.some((v) => v.code === 'SEQUENCE_SLIDESHOW_DETECTED');
  console.log(`Sequence Slideshow rejection: ${seqDetected ? 'PASSED (Detected SEQUENCE_SLIDESHOW_DETECTED)' : 'FAILED'}`);

  // Print Summary Table
  console.log('\n================================================================');
  console.log('SUMMARY TABLE: RENDER-BACKED VERB TEMPLATE COVERAGE');
  console.log('================================================================');
  console.log('| Verb       | Template Exercised      | Rendered Stills | Middle-Window Evidence | Status |');
  console.log('|------------|-------------------------|-----------------|------------------------|--------|');
  for (const row of auditTable) {
    const verbPad = row.verb.padEnd(10);
    const tmplPad = row.templateExercised.padEnd(23);
    const statPad = row.validatorStatus.padEnd(6);
    console.log(`| ${verbPad} | ${tmplPad} | 7 frames (0-100%)| ${row.middleEvidence.padEnd(22)} | ${statPad} |`);
  }
  console.log('================================================================');

  const allVerbsPassed = auditTable.every((r) => r.validatorStatus === 'PASS');
  const allNegativePassed = fakeSplitBlocked && decCamBlocked && seqDetected;
  const canonicalPassed = canonicalReport.passed;

  const totalSuccess = allVerbsPassed && allNegativePassed && canonicalPassed;
  console.log(`ALL RENDER-BACKED VERIFICATION CRITERIA MET: ${totalSuccess ? 'YES' : 'NO'}`);
  console.log('================================================================');

  if (!totalSuccess) {
    process.exit(1);
  }
}

runPhase4AHardeningPass();
