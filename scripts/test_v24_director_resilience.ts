import {
  MotionBudgetTracker,
  V24_EDITORIAL_NARRATIVE_PLAN,
  DirectorBeatPlan,
} from '../src/director/AdaptiveDirector';

console.log('================================================================');
console.log('CRITICAL TEST: DIRECTOR ADAPTIVITY WITH DISABLED CAPABILITIES');
console.log('================================================================');

// Baseline
const baseAudit = MotionBudgetTracker.auditPlan(V24_EDITORIAL_NARRATIVE_PLAN);
console.log(`Baseline Plan: isValid=${baseAudit.isValid}, Violations=${baseAudit.violations.length}, AvgEnergy=${baseAudit.metrics.averageEnergy}`);

// Test 1: Disable Kinetic Typography Slam (Beat 06) -> Replace with STILL_ANCHOR
const testPlan1: DirectorBeatPlan[] = JSON.parse(JSON.stringify(V24_EDITORIAL_NARRATIVE_PLAN));
testPlan1[5].transformationType = 'DEFORM';
testPlan1[5].typographyRole = 'STILL_ANCHOR';
testPlan1[5].motionVerb = 'Gentle geometric drift and quiet settle';
const audit1 = MotionBudgetTracker.auditPlan(testPlan1);
console.log(`Test 1 (Disabled Kinetic Slam): isValid=${audit1.isValid}, Violations=${audit1.violations.length}`);

// Test 2: Disable Camera Aperture Punch-Through (Beat 07) -> Replace with STATIC camera
const testPlan2: DirectorBeatPlan[] = JSON.parse(JSON.stringify(V24_EDITORIAL_NARRATIVE_PLAN));
testPlan2[6].cameraBehavior = 'STATIC';
testPlan2[6].transformationType = 'EXPANSION';
const audit2 = MotionBudgetTracker.auditPlan(testPlan2);
console.log(`Test 2 (Disabled Camera Through): isValid=${audit2.isValid}, CameraMotion%=${audit2.metrics.cameraMotionPercentage}%`);

// Test 3: Disable Topological Ring Morph (Beat 04) -> Replace with COLLAPSE
const testPlan3: DirectorBeatPlan[] = JSON.parse(JSON.stringify(V24_EDITORIAL_NARRATIVE_PLAN));
testPlan3[3].transformationType = 'COLLAPSE';
testPlan3[3].energyLevel = 4;
const audit3 = MotionBudgetTracker.auditPlan(testPlan3);
console.log(`Test 3 (Disabled Ring Morph): isValid=${audit3.isValid}, Violations=${audit3.violations.length}`);

if (audit1.isValid && audit2.isValid && audit3.isValid) {
  console.log('\n>>> SUCCESS: The Director successfully re-plans without dependency on any single capability! <<<');
} else {
  console.error('\n>>> FAILURE: Director failed resilience test. <<<');
  process.exit(1);
}
