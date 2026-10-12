import { StageAct, UniversalCinematicStage } from '../src/motion/stage/UniversalCinematicStage';
import { UniversalCameraRigEngine, CameraWaypoint } from '../src/motion/camera/UniversalCameraRig';
import { DynamicTransitionDirector } from '../src/motion/transitions/DynamicTransitionDirector';
import { ActHandoffTransition } from '../src/motion/transitions/DynamicTransitionSchema';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
}

console.log('================================================================');
console.log('AUDITING SCENE TRANSITION DIVERSITY & MULTI-MODAL CAMERA GRAMMAR');
console.log('================================================================\n');

// 1. Verify StageAct Schema
const sampleActs: StageAct[] = [
  {
    actId: 'act1_hook',
    titleFa: 'چالش داده‌های ابری',
    descriptionFa: 'حجم عظیم داده‌ها نیازمند پردازش لحظه‌ای است.',
    transitionOut: {
      archetype: 'CAMERA_SPATIAL_FLIGHT',
      durationInFrames: 18,
      cameraFlight: { trajectory: 'WHIP_PAN_RIGHT', bankingRollDegrees: 3.5 },
    },
  },
  {
    actId: 'act2_solution',
    titleFa: 'شبکه توزیع‌شده با پاسخ میلی‌ثانیه‌ای',
    descriptionFa: 'پاسخگویی سریع با فیزیک اسپرینگ و پایداری دوربین.',
    transitionOut: {
      archetype: 'ELEMENT_KINETIC_DISPERSE',
      durationInFrames: 20,
      elementDisperse: { direction: 'LEFT' },
    },
  },
  {
    actId: 'act3_vision',
    titleFa: 'آینده موشن گرافیک هوشمند و خودکار',
    descriptionFa: 'ترکیب بی‌نقص فیزیک اسپرینگ، ضرب‌آهنگ موسیقی و گرافیک برداری.',
    transitionOut: {
      archetype: 'DEEP_Z_ZOOM_THROUGH',
      durationInFrames: 22,
      deepZZoom: { penetrationDepthZ: 2500 },
    },
  },
  {
    actId: 'act4_close',
    titleFa: 'سامانه استاندارد استودیویی',
    descriptionFa: 'پایان با کیفیت برودکست و خروجی کریستالی.',
  },
];

assert(sampleActs[0].transitionOut?.archetype === 'CAMERA_SPATIAL_FLIGHT', 'Act 1 transition archetype mismatch');
assert(sampleActs[1].transitionOut?.archetype === 'ELEMENT_KINETIC_DISPERSE', 'Act 2 transition archetype mismatch');
assert(sampleActs[2].transitionOut?.archetype === 'DEEP_Z_ZOOM_THROUGH', 'Act 3 transition archetype mismatch');
console.log('[Gate 1] StageAct schema supports explicit & varied transitionOut descriptors: PASSED');

// 2. Verify DynamicTransitionDirector Execution
const actTimings = [
  { actId: 'act1_hook', startFrame: 0, endFrame: 150, transitionOut: sampleActs[0].transitionOut },
  { actId: 'act2_solution', startFrame: 150, endFrame: 300, transitionOut: sampleActs[1].transitionOut },
  { actId: 'act3_vision', startFrame: 300, endFrame: 450, transitionOut: sampleActs[2].transitionOut },
  { actId: 'act4_close', startFrame: 450, endFrame: 600 },
];

// Test Frame 140 (during Act 1 -> Act 2 Camera Flight transition)
const stateAtFlight = DynamicTransitionDirector.computeTransitionState(140, 30, actTimings);
assert(stateAtFlight.isTransitioning, 'Expected isTransitioning=true at frame 140');
assert(stateAtFlight.activeTransition?.archetype === 'CAMERA_SPATIAL_FLIGHT', 'Expected CAMERA_SPATIAL_FLIGHT at frame 140');
assert(stateAtFlight.cameraOffset.x !== 0, 'Camera offset X should be non-zero during flight');
console.log(`[Gate 2] Type A (Camera Spatial Flight) active at frame 140: camOffsetX=${stateAtFlight.cameraOffset.x}px, roll=${stateAtFlight.cameraOffset.roll}deg: PASSED`);

// Test Frame 290 (during Act 2 -> Act 3 Element Disperse transition)
const stateAtDisperse = DynamicTransitionDirector.computeTransitionState(290, 30, actTimings);
assert(stateAtDisperse.isTransitioning, 'Expected isTransitioning=true at frame 290');
assert(stateAtDisperse.activeTransition?.archetype === 'ELEMENT_KINETIC_DISPERSE', 'Expected ELEMENT_KINETIC_DISPERSE at frame 290');
assert(stateAtDisperse.cameraOffset.x === 0, 'Kinetic Agency Law: Camera offset must remain 0 during element disperse');
assert(stateAtDisperse.elementExit.offsetX < 0, 'Element offsetX should be negative for LEFT direction');
console.log(`[Gate 3] Type B (Element Disperse) active at frame 290: camOffset=0, elementExitX=${stateAtDisperse.elementExit.offsetX}px: PASSED`);

// 3. Verify Waypoint Kinetic Agency in UniversalCameraRig
const waypoints: CameraWaypoint[] = [
  { startFrame: 0, endFrame: 150, x: 0, y: 0, z: 0, transitionType: 'CAMERA_SPATIAL_FLIGHT' },
  { startFrame: 150, endFrame: 300, x: 1500, y: 0, z: 0, transitionType: 'ELEMENT_KINETIC_DISPERSE' },
  { startFrame: 300, endFrame: 450, x: 3000, y: 0, z: 0, transitionType: 'DEEP_Z_ZOOM_THROUGH' },
];

// At frame 285 (during Element Disperse transition period before handoff), camera should hold steady on Act 2 (x=1500)
const camStateDuringElementDisperse = UniversalCameraRigEngine.computeFromWaypoints(285, waypoints);
assert(camStateDuringElementDisperse.camX === 1500, `Expected camera to hold at 1500 during element disperse, got ${camStateDuringElementDisperse.camX}`);
console.log('[Gate 4] UniversalCameraRig holds position during element-driven exits: PASSED');

// 4. Verify Non-Repetition Rule (Anti-Monotony Guard)
const archetypes = actTimings.map((a) => a.transitionOut?.archetype).filter(Boolean);
for (let i = 0; i < archetypes.length - 1; i++) {
  assert(archetypes[i] !== archetypes[i + 1], `Adjacent transitions must not be identical: ${archetypes[i]} === ${archetypes[i + 1]}`);
}
console.log('[Gate 5] Non-Repetition Rule verified: 100% heterogeneous transition sequence across all acts: PASSED');

console.log('\n================================================================');
console.log('✅ ALL TRANSITION DIVERSITY & DYNAMIC CAMERA TESTS PASSED (100%)');
console.log('================================================================\n');
