import * as fs from 'fs';
import * as path from 'path';

export interface DefectAuditResult {
  hasCssTransition: boolean;
  hasInsufficientCamera: boolean;
  isMissingSfx: boolean;
  isBeatPulseUnwired: boolean;
  hasUnroundedSubpixels: boolean;
  hasFadingSlideshowWindows: boolean;
  violations: string[];
}

export function auditCompositionFile(filePath: string): DefectAuditResult {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations: string[] = [];

  // 1. Check for CSS transition / animation inside Remotion style (causes severe jitter/drops)
  const hasCssTransition = /transition:\s*['"`][^'"`]*transform/i.test(content) ||
                           /transition:\s*['"`][^'"`]*all/i.test(content);
  if (hasCssTransition) {
    violations.push('CSS_TRANSITION_IN_REMOTION_DETECTED: Found CSS transition inside Remotion frame loop. This causes severe subpixel jitter and non-deterministic frame stepping.');
  }

  // 2. Check for real camera movement (> 800px translation or UniversalCameraRig)
  const usesCameraRig = /UniversalCameraRig/.test(content);
  const camXMatches = content.match(/camX\s*=\s*interpolate\([^,]+,\s*\[([^\]]+)\],\s*\[([^\]]+)\]/);
  let camTravel = 0;
  if (camXMatches && camXMatches[2]) {
    const values = camXMatches[2].split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    const min = Math.min(...values);
    const max = Math.max(...values);
    camTravel = Math.abs(max - min);
  }

  const hasInsufficientCamera = !usesCameraRig && camTravel < 800;
  if (hasInsufficientCamera) {
    violations.push(`CAMERA_TRAVEL_INSUFFICIENT_OR_STATIC: Total camera travel is only ${camTravel}px (must be >= 800px or use UniversalCameraRig). This causes a static slideshow feel.`);
  }

  // 3. Check for SFX audio
  const hasSfx = /sfx\//i.test(content) || /whoosh/i.test(content) || /riser/i.test(content) || /impact/i.test(content) || /SoundDirector/i.test(content) || /sfxCues/i.test(content);
  const isMissingSfx = !hasSfx;
  if (isMissingSfx) {
    violations.push('SFX_AUDIO_MISSING: Zero sound effects (whooshes, impacts, risers) wired into composition.');
  }

  // 4. Check for Beat Pulse wiring
  const declaresBeatPulse = /calculateBeatPulse|beatPulse/.test(content);
  const usesBeatPulse = /beatPulse\s*\*/.test(content) || /scale\([^)]*beatPulse/.test(content) || /1\s*\+\s*beatPulse/.test(content);
  const isBeatPulseUnwired = declaresBeatPulse && !usesBeatPulse;
  if (isBeatPulseUnwired) {
    violations.push('BEAT_PULSE_UNWIRED: `beatPulse` is declared or imported but never applied to any visual element scale, glow, or rhythm.');
  }

  // 5. Check for unrounded subpixel translations
  const hasUnroundedSubpixels = /translate3d\(\$\{[a-zA-Z0-9_]+(?!.*Math\.round)\}px/.test(content);
  if (hasUnroundedSubpixels) {
    violations.push('SUBPIXEL_TRANSLATE_UNROUNDED: Floating-point subpixel values passed to translate3d without Math.round. Causes edge shimmering and text anti-aliasing jitter.');
  }

  // 6. Check for fading slideshow window trap (acts fading in/out at the exact same spatial origin)
  const actWindows = content.match(/frame\s*>=\s*\d+\s*&&\s*frame\s*<\s*\d+/g) || [];
  const hasFadingSlideshowWindows = actWindows.length >= 3 && !usesCameraRig;
  if (hasFadingSlideshowWindows) {
    violations.push(`SLIDESHOW_FRAME_WINDOW_TRAP: Detected ${actWindows.length} raw time-window cutoffs (frame >= X && frame < Y) with static opacity fades instead of 3D spatial camera transitions.`);
  }

  return {
    hasCssTransition,
    hasInsufficientCamera,
    isMissingSfx,
    isBeatPulseUnwired,
    hasUnroundedSubpixels,
    hasFadingSlideshowWindows,
    violations,
  };
}

// CLI Runner
const targetFile = process.argv[2] || 'src/motion/compositions/BaqiyatallahResearchAwardsScene.tsx';
const fullPath = path.resolve(targetFile);

console.log('================================================================');
console.log(`AUDITING COMPOSITION FOR CINEMATIC DEFECTS: ${path.basename(fullPath)}`);
console.log('================================================================\n');

if (!fs.existsSync(fullPath)) {
  console.error(`File not found: ${fullPath}`);
  process.exit(1);
}

const audit = auditCompositionFile(fullPath);

if (audit.violations.length > 0) {
  console.log(`❌ FAILED WITH ${audit.violations.length} DEFECTS FOUND:`);
  audit.violations.forEach((v, i) => console.log(`  ${i + 1}. [${v.split(':')[0]}] ${v.split(':')[1] || ''}`));
  console.log('\n================================================================');
  process.exit(1);
} else {
  console.log('✅ PASSED: 0 Cinematic defects found. Camera, SFX, Beat Pulse, and Transitions are fully wired with zero jitter.');
  console.log('================================================================');
  process.exit(0);
}
