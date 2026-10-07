/**
 * TEST HARNESS: AstMotionValidator Against Negative, Positive Fixtures and Production Files
 */

import * as fs from 'fs';
import * as path from 'path';
import { AstMotionValidator } from '../src/motion/validation/astMotionValidator';

function runSuite() {
  console.log('================================================================');
  console.log('RUNNING AST MOTION VALIDATOR TESTS (PHASE 2)');
  console.log('================================================================');

  let passedAll = true;

  // 1. Negative Fixture A: Fake Spring
  const codeA = `
    import React from 'react';
    import { spring, useCurrentFrame, AbsoluteFill } from 'remotion';
    export const FixtureA = () => {
      const frame = useCurrentFrame();
      const opacity = spring({ frame, fps: 30 });
      return <AbsoluteFill style={{ opacity }}><div>Content</div></AbsoluteFill>;
    };
  `;
  const reportA = new AstMotionValidator('NegativeFixtureA.tsx', codeA).validate();
  const hasCodeA = reportA.violations.some((v) => v.code === 'OPACITY_ONLY_MOTION_TRAP');
  console.log(`[Negative Fixture A - Fake Spring]: Passed: ${!reportA.passed} (Expected FAIL) - Violation: ${hasCodeA ? '✓ OPACITY_ONLY_MOTION_TRAP' : '✗ MISSED'}`);
  if (reportA.passed || !hasCodeA) passedAll = false;

  // 2. Negative Fixture B: Camera Camouflage
  const codeB = `
    import React from 'react';
    import { interpolate, useCurrentFrame } from 'remotion';
    export const FixtureB = () => {
      const frame = useCurrentFrame();
      const craneProgress = interpolate(frame, [0, 300], [1.0, 1.05]);
      return (
        <CameraRig style={{ transform: \`scale(\${craneProgress})\` }}>
          <div>Static Hero</div>
        </CameraRig>
      );
    };
  `;
  const reportB = new AstMotionValidator('NegativeFixtureB.tsx', codeB).validate();
  const hasCodeB = reportB.violations.some((v) => v.code === 'CAMERA_CAMOUFLAGE_DETECTED');
  console.log(`[Negative Fixture B - Camera Camouflage]: Passed: ${!reportB.passed} (Expected FAIL) - Violation: ${hasCodeB ? '✓ CAMERA_CAMOUFLAGE_DETECTED' : '✗ MISSED'}`);
  if (reportB.passed || !hasCodeB) passedAll = false;

  // 3. Negative Fixture C: Entrance / Hold / Exit
  const codeC = `
    import React from 'react';
    import { interpolate, useCurrentFrame } from 'remotion';
    export const FixtureC = () => {
      const frame = useCurrentFrame();
      const enterY = interpolate(frame, [0, 25], [100, 0]);
      const exitY = interpolate(frame, [275, 300], [0, -100]);
      return <div style={{ transform: \`translateY(\${frame < 150 ? enterY : exitY}px)\` }}>Content</div>;
    };
  `;
  const reportC = new AstMotionValidator('NegativeFixtureC.tsx', codeC).validate();
  const hasCodeC = reportC.violations.some((v) => v.code === 'ENTRANCE_HOLD_EXIT_SLIDESHOW');
  console.log(`[Negative Fixture C - Entrance/Hold/Exit]: Passed: ${!reportC.passed} (Expected FAIL) - Violation: ${hasCodeC ? '✓ ENTRANCE_HOLD_EXIT_SLIDESHOW' : '✗ MISSED'}`);
  if (reportC.passed || !hasCodeC) passedAll = false;

  // 4. Negative Fixture D: Ambient Fake Motion
  const codeD = `
    import React from 'react';
    import { interpolate, useCurrentFrame } from 'remotion';
    export const FixtureD = () => {
      const frame = useCurrentFrame();
      const ambientJitterX = interpolate(frame, [0, 150], [0, 2]);
      return <div style={{ transform: \`translateX(\${ambientJitterX}px)\` }}>Content</div>;
    };
  `;
  const reportD = new AstMotionValidator('NegativeFixtureD.tsx', codeD).validate();
  const hasCodeD = reportD.violations.some((v) => v.code === 'AMBIENT_FAKE_MOTION_DETECTED');
  console.log(`[Negative Fixture D - Ambient Fake Motion]: Passed: ${!reportD.passed} (Expected FAIL) - Violation: ${hasCodeD ? '✓ AMBIENT_FAKE_MOTION_DETECTED' : '✗ MISSED'}`);
  if (reportD.passed || !hasCodeD) passedAll = false;

  // 5. Negative Fixture E: Sequence Slideshow
  const codeE = `
    import React from 'react';
    import { Sequence, AbsoluteFill } from 'remotion';
    export const FixtureE = () => {
      return (
        <AbsoluteFill>
          <Sequence from={0} durationInFrames={300}><div>Scene 1</div></Sequence>
          <Sequence from={300} durationInFrames={300}><div>Scene 2</div></Sequence>
        </AbsoluteFill>
      );
    };
  `;
  const reportE = new AstMotionValidator('NegativeFixtureE.tsx', codeE).validate();
  const hasCodeE = reportE.violations.some((v) => v.code === 'SEQUENCE_SLIDESHOW_DETECTED');
  console.log(`[Negative Fixture E - Sequence Slideshow]: Passed: ${!reportE.passed} (Expected FAIL) - Violation: ${hasCodeE ? '✓ SEQUENCE_SLIDESHOW_DETECTED' : '✗ MISSED'}`);
  if (reportE.passed || !hasCodeE) passedAll = false;

  // 6. Positive Fixture: Genuine Transformation
  const positivePath = path.resolve(__dirname, 'fixtures/positive_fixture.tsx');
  const reportPositive = new AstMotionValidator(positivePath).validate();
  console.log(`[Positive Fixture - Genuine Transformation]: Passed: ${reportPositive.passed} (Expected PASS) - Violations: ${reportPositive.violations.length}`);
  if (!reportPositive.passed) {
    passedAll = false;
    console.error('Positive fixture failed unexpectedly:', reportPositive.violations);
  }

  // 7. PRODUCTION FILE TEST 1: src/Main.tsx (Must FAIL!)
  const mainPath = path.resolve(__dirname, '../src/Main.tsx');
  const reportMain = new AstMotionValidator(mainPath).validate();
  console.log(`----------------------------------------------------------------`);
  console.log(`[Production Audit: src/Main.tsx]: Passed: ${reportMain.passed} (Expected FAIL)`);
  console.log(`Detected Violations in src/Main.tsx (${reportMain.violations.length}):`);
  reportMain.violations.forEach((v) => console.log(`  - [${v.code}]: ${v.message}`));
  if (reportMain.passed) {
    console.error('CRITICAL: src/Main.tsx was NOT rejected by the validator!');
    passedAll = false;
  }

  // 8. PRODUCTION FILE TEST 2: Apoptosis916Main.tsx (Must FAIL!)
  const apoptosisPath = path.resolve(__dirname, '../src/projects/apoptosis_cancer_9_16/src/Apoptosis916Main.tsx');
  const reportApoptosis = new AstMotionValidator(apoptosisPath).validate();
  console.log(`----------------------------------------------------------------`);
  console.log(`[Production Audit: Apoptosis916Main.tsx]: Passed: ${reportApoptosis.passed} (Expected FAIL)`);
  console.log(`Detected Violations in Apoptosis916Main.tsx (${reportApoptosis.violations.length}):`);
  reportApoptosis.violations.forEach((v) => console.log(`  - [${v.code}]: ${v.message}`));
  if (reportApoptosis.passed) {
    console.error('CRITICAL: Apoptosis916Main.tsx was NOT rejected by the validator!');
    passedAll = false;
  }

  console.log(`================================================================`);
  if (passedAll) {
    console.log('✓ ALL AST MOTION VALIDATOR TESTS PASSED WITH 100% PRECISION');
  } else {
    console.error('✗ SOME TESTS FAILED');
    process.exit(1);
  }
}

runSuite();
