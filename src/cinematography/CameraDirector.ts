/**
 * Cinematic Camera Director (v2.1)
 *
 * Formalizes narrative-motivated camera states and choreography.
 */

export type CameraNarrativeState =
  | 'ESTABLISH'
  | 'OBSERVE'
  | 'FOLLOW'
  | 'REVEAL'
  | 'PUSH_IN'
  | 'PULL_OUT'
  | 'ORBIT'
  | 'PAN'
  | 'TRACK'
  | 'FOCUS'
  | 'IMPACT'
  | 'HOLD';

export interface CameraStateConfig {
  state: CameraNarrativeState;
  narrativeJustification: string;
  scaleRange: [number, number];
  panDelta: [number, number]; // [dx, dy] px
  handheldDriftIntensity: number;
  shakeImpulse: number;
}

export const CAMERA_NARRATIVE_PRESETS: Record<CameraNarrativeState, CameraStateConfig> = {
  ESTABLISH: {
    state: 'ESTABLISH',
    narrativeJustification: 'Wide spatial context orientation; viewer grasps overall battlefield/organism',
    scaleRange: [0.98, 1.02],
    panDelta: [0, 0],
    handheldDriftIntensity: 4.0,
    shakeImpulse: 0,
  },
  OBSERVE: {
    state: 'OBSERVE',
    narrativeJustification: 'Contemplative study of active biological mechanism with micro-breathing',
    scaleRange: [1.00, 1.03],
    panDelta: [0, 0],
    handheldDriftIntensity: 5.0,
    shakeImpulse: 0,
  },
  FOLLOW: {
    state: 'FOLLOW',
    narrativeJustification: 'Tracking a moving molecule, electron, or signal through pathways',
    scaleRange: [1.02, 1.05],
    panDelta: [60, -20],
    handheldDriftIntensity: 7.0,
    shakeImpulse: 0,
  },
  REVEAL: {
    state: 'REVEAL',
    narrativeJustification: 'Unveiling a hidden mechanism or underlying molecular machinery',
    scaleRange: [1.08, 1.02],
    panDelta: [0, 40],
    handheldDriftIntensity: 6.0,
    shakeImpulse: 0,
  },
  PUSH_IN: {
    state: 'PUSH_IN',
    narrativeJustification: 'Dramatic focus sharpening on critical tipping point or decision',
    scaleRange: [1.00, 1.08],
    panDelta: [0, 0],
    handheldDriftIntensity: 8.0,
    shakeImpulse: 0,
  },
  PULL_OUT: {
    state: 'PULL_OUT',
    narrativeJustification: 'Expanding scope from molecular detail to systemic biological consequence',
    scaleRange: [1.08, 0.99],
    panDelta: [0, 0],
    handheldDriftIntensity: 5.0,
    shakeImpulse: 0,
  },
  ORBIT: {
    state: 'ORBIT',
    narrativeJustification: 'Volumetric 2.5D inspection of complex 3D protein structure',
    scaleRange: [1.03, 1.05],
    panDelta: [30, 20],
    handheldDriftIntensity: 8.0,
    shakeImpulse: 0,
  },
  PAN: {
    state: 'PAN',
    narrativeJustification: 'Traversing sequential pipeline from upstream receptor to downstream effector',
    scaleRange: [1.02, 1.02],
    panDelta: [120, 0],
    handheldDriftIntensity: 6.0,
    shakeImpulse: 0,
  },
  TRACK: {
    state: 'TRACK',
    narrativeJustification: 'Locked coordinate flight maintaining hero molecule dead-center',
    scaleRange: [1.04, 1.06],
    panDelta: [40, 40],
    handheldDriftIntensity: 7.0,
    shakeImpulse: 0,
  },
  FOCUS: {
    state: 'FOCUS',
    narrativeJustification: 'Depth-of-field isolation cutting away all background noise',
    scaleRange: [1.03, 1.06],
    panDelta: [0, 0],
    handheldDriftIntensity: 3.0,
    shakeImpulse: 0,
  },
  IMPACT: {
    state: 'IMPACT',
    narrativeJustification: 'MOMP puncture, membrane rupture, or major biological collision',
    scaleRange: [1.00, 1.05],
    panDelta: [0, 0],
    handheldDriftIntensity: 10.0,
    shakeImpulse: 16.0,
  },
  HOLD: {
    state: 'HOLD',
    narrativeJustification: 'Deliberate dramatic stillness before major climax',
    scaleRange: [1.02, 1.02],
    panDelta: [0, 0],
    handheldDriftIntensity: 2.0,
    shakeImpulse: 0,
  },
};
