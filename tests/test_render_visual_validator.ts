/**
 * TEST HARNESS: Render-Level Visual Motion Validator (Tests A through F)
 */

import { RenderVisualValidator } from '../src/motion/validation/renderVisualValidator';
import {
  baseContract,
  generateTestA_CameraZoomHeroStatic,
  generateTestB_CameraPanHeroStatic,
  generateTestC_SubtitleAnimationHeroStatic,
  generateTestD_BackgroundParticlesHeroStatic,
  generateTestE_HeroGenuineTransformation,
  generateTestF_HeroEntranceExitHold,
} from './fixtures/render_fixtures';

function runRenderValidationSuite() {
  console.log('================================================================');
  console.log('RUNNING RENDER-LEVEL VISUAL MOTION VALIDATOR (PHASE 3)');
  console.log('================================================================');

  const validator = new RenderVisualValidator(480, 270);
  let allPassed = true;
  const startTotal = Date.now();

  // 1. Test A: Camera Zoom + Hero Static
  const samplesA = generateTestA_CameraZoomHeroStatic();
  const repA = validator.evaluateSamples(baseContract, samplesA);
  const passA = !repA.passed && repA.cameraCamouflageDetected;
  console.log(`[Test A - Camera Zoom + Hero Static]: Passed: ${passA} (Expected FAIL) - Violation: ${repA.cameraCamouflageDetected ? '✓ CAMERA_CAMOUFLAGE_DETECTED' : '✗ MISSED'} (${repA.executionTimeMs}ms)`);
  if (!passA) allPassed = false;

  // 2. Test B: Camera Pan + Hero Static
  const samplesB = generateTestB_CameraPanHeroStatic();
  const repB = validator.evaluateSamples(baseContract, samplesB);
  const passB = !repB.passed && repB.cameraCamouflageDetected;
  console.log(`[Test B - Camera Pan + Hero Static]: Passed: ${passB} (Expected FAIL) - Violation: ${repB.cameraCamouflageDetected ? '✓ CAMERA_CAMOUFLAGE_DETECTED' : '✗ MISSED'} (${repB.executionTimeMs}ms)`);
  if (!passB) allPassed = false;

  // 3. Test C: Subtitle Animation + Hero Static
  const samplesC = generateTestC_SubtitleAnimationHeroStatic();
  const repC = validator.evaluateSamples(baseContract, samplesC);
  const passC = !repC.passed && repC.subtitleOnlyMotionDetected;
  console.log(`[Test C - Subtitle Animation + Hero Static]: Passed: ${passC} (Expected FAIL) - Violation: ${repC.subtitleOnlyMotionDetected ? '✓ SUBTITLE_ONLY_MOTION_DETECTED' : '✗ MISSED'} (${repC.executionTimeMs}ms)`);
  if (!passC) allPassed = false;

  // 4. Test D: Background Particle Animation + Hero Static
  const samplesD = generateTestD_BackgroundParticlesHeroStatic();
  const repD = validator.evaluateSamples(baseContract, samplesD);
  const passD = !repD.passed && repD.backgroundOnlyMotionDetected;
  console.log(`[Test D - Background Particles + Hero Static]: Passed: ${passD} (Expected FAIL) - Violation: ${repD.backgroundOnlyMotionDetected ? '✓ BACKGROUND_ONLY_MOTION_DETECTED' : '✗ MISSED'} (${repD.executionTimeMs}ms)`);
  if (!passD) allPassed = false;

  // 5. Test E: Hero Genuine Middle Transformation (PASS)
  const samplesE = generateTestE_HeroGenuineTransformation();
  const repE = validator.evaluateSamples(baseContract, samplesE);
  const passE = repE.passed && repE.verbContractMatch && !repE.middleWindowStaticHoldDetected;
  console.log(`[Test E - Genuine Middle Transformation]: Passed: ${passE} (Expected PASS) - Violations: ${repE.violations.length} (${repE.executionTimeMs}ms)`);
  if (!passE) {
    allPassed = false;
    console.error('Test E failed unexpectedly:', repE.violations);
  }

  // 6. Test F: Hero Entrance/Exit Only, Middle Static
  const samplesF = generateTestF_HeroEntranceExitHold();
  const repF = validator.evaluateSamples(baseContract, samplesF);
  const passF = !repF.passed && repF.middleWindowStaticHoldDetected;
  console.log(`[Test F - Entrance/Exit Only, Middle Static]: Passed: ${passF} (Expected FAIL) - Violation: ${repF.middleWindowStaticHoldDetected ? '✓ MIDDLE_WINDOW_STATIC_HOLD' : '✗ MISSED'} (${repF.executionTimeMs}ms)`);
  if (!passF) allPassed = false;

  const totalTime = Date.now() - startTotal;
  console.log(`----------------------------------------------------------------`);
  console.log(`Total Render Validation Suite Runtime: ${totalTime}ms (Avg ${Math.round(totalTime / 6)}ms per shot)`);
  console.log(`================================================================`);

  if (allPassed) {
    console.log('✓ ALL RENDER-LEVEL VISUAL MOTION TESTS PASSED WITH 100% PRECISION');
  } else {
    console.error('✗ SOME RENDER TESTS FAILED');
    process.exit(1);
  }
}

runRenderValidationSuite();
