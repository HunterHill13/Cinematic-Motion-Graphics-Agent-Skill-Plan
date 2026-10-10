/**
 * REAL REMOTION RENDER INTEGRATION TEST (PHASE 3.1)
 * 
 * Verifies real render execution and visual motion evaluation on:
 * 1. DiagnosticFilm (src/Main.tsx)
 * 2. Apoptosis916Main (src/projects/apoptosis_cancer_9_16/src/Apoptosis916Main.tsx)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';
import { execSync } from 'child_process';
import {
  RenderVisualValidator,
  FrameSample,
} from '../src/motion/validation/renderVisualValidator';
import { TransformationContract } from '../src/motion/grammar/motionGrammar';

/**
 * Pure TypeScript PNG Decoder using Node.js built-in zlib
 */
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

  // Convert RGBA to grayscale luminance (0.0 to 1.0)
  const pixels = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const r = raw[i * 4];
    const g = raw[i * 4 + 1];
    const b = raw[i * 4 + 2];
    pixels[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;
  }

  return { width, height, pixels };
}

export interface RealRenderResult {
  compositionId: string;
  sourceFile: string;
  renderStatus: 'PASS' | 'FAIL' | 'BLOCKED';
  visualValidatorStatus: 'PASS' | 'FAIL';
  violations: string[];
  framesSampled: number[];
  meanMiddleHeroDelta: number;
  meanMiddleHeroStaticRatio: number;
  cameraCamouflageDetected: boolean;
  middleWindowStaticHoldDetected: boolean;
  errorReason?: string;
}

export function testRealRemotionComposition(
  compositionId: string,
  sourceFile: string,
  frames: number[],
  contract: TransformationContract,
  width: number = 480,
  height: number = 270
): RealRenderResult {
  const tempDir = path.resolve(__dirname, 'temp_real_render', compositionId);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const samplePoints: FrameSample[] = [];

  try {
    for (const frame of frames) {
      const outPath = path.join(tempDir, `frame_${frame}.png`);
      const cmd = `npx.cmd remotion still src/index.ts ${compositionId} "${outPath}" --frame=${frame} --width=${width} --height=${height} --image-format=png --quiet`;
      execSync(cmd, { stdio: 'pipe' });

      if (!fs.existsSync(outPath)) {
        return {
          compositionId,
          sourceFile,
          renderStatus: 'BLOCKED',
          visualValidatorStatus: 'FAIL',
          violations: [`Failed to render frame ${frame}`],
          framesSampled: frames,
          meanMiddleHeroDelta: 0,
          meanMiddleHeroStaticRatio: 1,
          cameraCamouflageDetected: false,
          middleWindowStaticHoldDetected: true,
          errorReason: `Frame output ${outPath} was not created.`,
        };
      }

      const fileBuf = fs.readFileSync(outPath);
      const decoded = decodePngToLuminance(fileBuf);
      const percent = frame / (contract.endFrame - contract.startFrame);

      samplePoints.push({
        frame,
        percent,
        pixels: decoded.pixels,
        width: decoded.width,
        height: decoded.height,
      });
    }

    // Run Visual Evidence Layer evaluation
    const validator = new RenderVisualValidator(width, height);
    const report = validator.evaluateSamples(contract, samplePoints);

    return {
      compositionId,
      sourceFile,
      renderStatus: 'PASS',
      visualValidatorStatus: report.passed ? 'PASS' : 'FAIL',
      violations: report.violations,
      framesSampled: frames,
      meanMiddleHeroDelta: report.meanMiddleHeroDelta,
      meanMiddleHeroStaticRatio: report.meanMiddleHeroStaticRatio,
      cameraCamouflageDetected: report.cameraCamouflageDetected,
      middleWindowStaticHoldDetected: report.middleWindowStaticHoldDetected,
    };
  } catch (err: any) {
    return {
      compositionId,
      sourceFile,
      renderStatus: 'BLOCKED',
      visualValidatorStatus: 'FAIL',
      violations: [err.message],
      framesSampled: frames,
      meanMiddleHeroDelta: 0,
      meanMiddleHeroStaticRatio: 1,
      cameraCamouflageDetected: false,
      middleWindowStaticHoldDetected: true,
      errorReason: err.message,
    };
  } finally {
    // Cleanup rendered pngs
    try {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    } catch {}
  }
}

async function runRealIntegrationSuite() {
  console.log('================================================================');
  console.log('REAL REMOTION RENDER INTEGRATION TEST (PHASE 3.1)');
  console.log('================================================================');

  // Shot 1 Contract for DiagnosticFilm (Main.tsx - 300 frames)
  const mainContract: TransformationContract = {
    shotId: 'shot_01_hook',
    startFrame: 0,
    endFrame: 300,
    durationFrames: 300,
    heroEntity: {
      id: 'diagnostic_hero',
      label: 'سوژه تشخیصی',
      persistsFrom: 'GENESIS',
      persistsTo: 'TERMINUS',
    },
    initialState: {
      position: { x: 960, y: 540, z: 0 },
      scale: 1.0,
      rotation: { z: 0 },
    },
    trigger: {
      frame: 30,
      narrationMarker: 'هوک اولیه',
      forceType: 'entrance_impulse',
    },
    midpointEvent: {
      verb: 'TRAVEL',
      startFrame: 90,
      endFrame: 210,
      subBeats: [],
      meaningfulDelta: {
        property: 'position',
        expectedMinimumDelta: 60,
      },
    },
    finalState: {
      position: { x: 960, y: 540, z: 0 },
      scale: 1.0,
      rotation: { z: 0 },
    },
    exitMomentum: {
      vector: { x: 0, y: 0, z: 0 },
      consequence: 'None',
    },
  };

  const sampleFrames = [30, 60, 90, 120, 150, 180, 210, 240, 270];

  // 1. Audit DiagnosticFilm (src/Main.tsx)
  console.log('Rendering and Auditing DiagnosticFilm (src/Main.tsx)...');
  const resultMain = testRealRemotionComposition(
    'DiagnosticFilm',
    'src/Main.tsx',
    sampleFrames,
    mainContract,
    480,
    270
  );

  console.log('----------------------------------------------------------------');
  console.log(`Main.tsx Real Render Status: ${resultMain.renderStatus}`);
  console.log(`Main.tsx Visual Validator Status: ${resultMain.visualValidatorStatus} (Expected FAIL)`);
  console.log(`Main.tsx Static Ratio: ${Math.round(resultMain.meanMiddleHeroStaticRatio * 100)}% | Hero Delta: ${resultMain.meanMiddleHeroDelta}`);
  console.log('Main.tsx Violations:');
  resultMain.violations.forEach((v) => console.log(`  - ${v}`));

  // 2. Audit Apoptosis916Main
  console.log('\nRendering and Auditing Apoptosis916Main (src/projects/apoptosis_cancer_9_16/src/Apoptosis916Main.tsx)...');
  const apopContract: TransformationContract = {
    ...mainContract,
    shotId: 'shot_01_cancer_survival',
    endFrame: 225,
    durationFrames: 225,
  };
  const apopFrames = [25, 50, 75, 100, 125, 150, 175, 190, 210];

  const resultApop = testRealRemotionComposition(
    'Apoptosis916Main',
    'src/projects/apoptosis_cancer_9_16/src/Apoptosis916Main.tsx',
    apopFrames,
    apopContract,
    270,
    480
  );

  console.log('----------------------------------------------------------------');
  console.log(`Apoptosis916Main.tsx Real Render Status: ${resultApop.renderStatus}`);
  console.log(`Apoptosis916Main.tsx Visual Validator Status: ${resultApop.visualValidatorStatus} (Expected FAIL)`);
  console.log(`Apoptosis916Main.tsx Static Ratio: ${Math.round(resultApop.meanMiddleHeroStaticRatio * 100)}% | Hero Delta: ${resultApop.meanMiddleHeroDelta}`);
  console.log('Apoptosis916Main.tsx Violations:');
  resultApop.violations.forEach((v) => console.log(`  - ${v}`));

  console.log('================================================================');
  console.log('REAL REMOTION RENDER INTEGRATION AUDIT COMPLETE');
}

runRealIntegrationSuite();
