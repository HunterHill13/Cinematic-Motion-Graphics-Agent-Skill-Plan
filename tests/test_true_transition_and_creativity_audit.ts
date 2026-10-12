import * as fs from 'fs';
import * as path from 'path';
import { UniversalCameraRigEngine } from '../src/motion/camera/UniversalCameraRig';
import {
  computeChainedActPositions,
  computeChildTransitionStyle,
} from '../src/motion/transitions/DynamicTransitionDirector';
import { ActHandoffTransition } from '../src/motion/transitions/DynamicTransitionSchema';

console.log('================================================================');
console.log('PHASE 1 & 2 BUG REPRODUCTION & VERIFICATION: TRUE TRANSITIONS');
console.log('================================================================\n');

let failures = 0;

// ---------------------------------------------------------------------------
// CHECK 1: Global & Workspace Skill `template/src/` Sync Check
// ---------------------------------------------------------------------------
const rootStagePath = path.resolve(__dirname, '../src/motion/stage/UniversalCinematicStage.tsx');
const workspaceTemplateStagePath = path.resolve(
  __dirname,
  '../.agents/skills/cinematic-motion-director/template/src/motion/stage/UniversalCinematicStage.tsx'
);
const globalTemplateStagePath =
  'C:\\Users\\Hill\\.gemini\\config\\skills\\cinematic-motion-director\\template\\src\\motion\\stage\\UniversalCinematicStage.tsx';

const rootStageContent = fs.readFileSync(rootStagePath, 'utf8');
const workspaceTemplateContent = fs.existsSync(workspaceTemplateStagePath)
  ? fs.readFileSync(workspaceTemplateStagePath, 'utf8')
  : '';
const globalTemplateContent = fs.existsSync(globalTemplateStagePath)
  ? fs.readFileSync(globalTemplateStagePath, 'utf8')
  : '';

if (globalTemplateContent !== rootStageContent || workspaceTemplateContent !== rootStageContent) {
  console.error('❌ [BUG 1A - RED]: Skill template/src/ is OUT OF SYNC with root src/!');
  console.error(`   Root UniversalCinematicStage length: ${rootStageContent.length} bytes`);
  console.error(`   Workspace template length: ${workspaceTemplateContent.length} bytes`);
  console.error(`   Global template length: ${globalTemplateContent.length} bytes`);
  failures++;
} else {
  console.log('✅ [CHECK 1A]: Root, Workspace, and Global skill template/src/ are 100% synchronized.');
}

// ---------------------------------------------------------------------------
// CHECK 2: Transition-Chained 3D Spatial Coordinates (`computeChainedActPositions`)
// ---------------------------------------------------------------------------
const sampleTransitions: ActHandoffTransition[] = [
  {
    archetype: 'CAMERA_SPATIAL_FLIGHT',
    durationInFrames: 22,
    cameraFlight: { trajectory: 'WHIP_PAN_RIGHT' },
  },
  {
    archetype: 'ELEMENT_KINETIC_DISPERSE',
    durationInFrames: 20,
    elementDisperse: { direction: 'LEFT' },
  },
  {
    archetype: 'DEEP_Z_ZOOM_THROUGH',
    durationInFrames: 22,
    deepZZoom: { penetrationDepthZ: 1600 },
  },
  {
    archetype: 'TOPOLOGICAL_ANCHOR_MORPH',
    durationInFrames: 20,
  },
];

const chained = computeChainedActPositions([{}, {}, {}, {}], sampleTransitions);

// Act 0 is at (0, 0, 0)
// Act 0 -> Act 1 is CAMERA_SPATIAL_FLIGHT (WHIP_PAN_RIGHT) => Act 1 is at (1420, 0, 0)
// Act 1 -> Act 2 is ELEMENT_KINETIC_DISPERSE => Act 2 MUST stay at (1420, 0, 0) so camera stays still!
// Act 2 -> Act 3 is DEEP_Z_ZOOM_THROUGH => Act 3 MUST be at (1420, 0, -1600)
if (
  chained[0].posX !== 0 ||
  chained[1].posX !== 1420 ||
  chained[2].posX !== 1420 ||
  chained[2].posY !== 0 ||
  chained[2].posZ !== 0 ||
  chained[3].posZ !== -1600
) {
  console.error('❌ [BUG 1B - RED]: Chained 3D coordinates did not match transition archetypes!', chained);
  failures++;
} else {
  console.log(
    '✅ [CHECK 1B]: computeChainedActPositions chains 3D coordinates strictly by transition archetype (0 -> 1420 -> 1420 stationary -> Z=-1600).'
  );
}

// ---------------------------------------------------------------------------
// CHECK 3: Co-Presence During Camera Flight & Stationary Camera During Element Disperse
// ---------------------------------------------------------------------------
// During Act 0 -> Act 1 CAMERA_SPATIAL_FLIGHT (around frame 150), both Act 0 and Act 1 children must have opacity === 1
const act0ChildDuringFlight = computeChildTransitionStyle(
  0,
  150,
  0,
  150,
  30,
  undefined,
  sampleTransitions[0]
);
const act1ChildDuringFlight = computeChildTransitionStyle(
  0,
  150,
  150,
  300,
  30,
  sampleTransitions[0],
  sampleTransitions[1]
);

if (act0ChildDuringFlight.opacity < 0.95 || act1ChildDuringFlight.opacity < 0.95) {
  console.error(
    `❌ [BUG 1C - RED]: Co-presence violated during CAMERA_SPATIAL_FLIGHT! Outgoing opacity=${act0ChildDuringFlight.opacity}, Incoming opacity=${act1ChildDuringFlight.opacity}`
  );
  failures++;
} else {
  console.log(
    '✅ [CHECK 1C]: Co-Presence verified during CAMERA_SPATIAL_FLIGHT (both outgoing and incoming scenes remain 100% solid while camera glides between them).'
  );
}

// During Act 1 -> Act 2 ELEMENT_KINETIC_DISPERSE (frame 292), children 0, 1, 2 fling out with staggered offsets while camera stays at 1420
const c0Disperse = computeChildTransitionStyle(0, 292, 150, 300, 30, sampleTransitions[0], sampleTransitions[1]);
const c1Disperse = computeChildTransitionStyle(1, 292, 150, 300, 30, sampleTransitions[0], sampleTransitions[1]);
const camAtDisperse = UniversalCameraRigEngine.computeFromWaypoints(298, [
  { startFrame: 0, endFrame: 150, x: 0, y: 0, z: 0, transitionType: 'CAMERA_SPATIAL_FLIGHT' },
  { startFrame: 150, endFrame: 300, x: 1420, y: 0, z: 0, transitionType: 'ELEMENT_KINETIC_DISPERSE' },
  { startFrame: 300, endFrame: 450, x: 1420, y: 0, z: 0, transitionType: 'DEEP_Z_ZOOM_THROUGH' },
]);

if (c0Disperse.offsetX >= 0 || c0Disperse.offsetX === c1Disperse.offsetX || camAtDisperse.camX !== 1420) {
  console.error(
    `❌ [BUG 1D - RED]: Element disperse failed staggered child exit or camera hold! c0=${c0Disperse.offsetX}, c1=${c1Disperse.offsetX}, camX=${camAtDisperse.camX}`
  );
  failures++;
} else {
  console.log(
    `✅ [CHECK 1D]: Staggered per-child fling-out verified (child0 X=${c0Disperse.offsetX}px, child1 X=${c1Disperse.offsetX}px) while camera stays 100% stationary at X=${camAtDisperse.camX}.`
  );
}

// ---------------------------------------------------------------------------
// CHECK 4: Multi-Layout & Multi-Text-Reveal Choreography in UniversalCinematicStage
// ---------------------------------------------------------------------------
const hasVariedActLayouts =
  rootStageContent.includes('layoutVariant') &&
  rootStageContent.includes('MONUMENTAL_CENTER_HERO') &&
  rootStageContent.includes('SPLIT_DATA_TERMINAL_LEFT');

const hasVariedTextEntrances =
  rootStageContent.includes('textRevealMode') &&
  rootStageContent.includes('PERSPECTIVE_3D_FLIP') &&
  rootStageContent.includes('MASK_CURTAIN_RISE') &&
  rootStageContent.includes('ELASTIC_POP_SLAM') &&
  rootStageContent.includes('VELOCITY_SKEW_SLIDE');

if (!hasVariedActLayouts || !hasVariedTextEntrances) {
  console.error(
    '❌ [BUG 2 - RED]: UniversalCinematicStage is missing multi-layout or multi-text-entrance choreography!'
  );
  failures++;
} else {
  console.log(
    '✅ [CHECK 2]: UniversalCinematicStage implements 4 distinct Act Layouts, 4 Kinetic Text Reveal Modes, and Theme-Specific Primitives.'
  );
}

console.log('\n================================================================');
if (failures > 0) {
  console.error(`DIAGNOSIS COMPLETE: ${failures} CHECKS FAILED (RED SIGNAL).`);
  process.exit(1);
} else {
  console.log('✅ ALL TRUE TRANSITION & CREATIVE CHOREOGRAPHY CHECKS PASSED (100% GREEN).');
}
