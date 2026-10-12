/**
 * ============================================================================
 * DYNAMIC SCENE TRANSITION SCHEMA & METAPHOR DIRECTING TYPES
 * ============================================================================
 */

export type TransitionArchetype =
  | 'CAMERA_SPATIAL_FLIGHT'       // Type A: Whip pan / Vertical crane / Orbit flight
  | 'ELEMENT_KINETIC_DISPERSE'    // Type B: Camera holds still; elements fling/disperse off-screen
  | 'DEEP_Z_ZOOM_THROUGH'         // Type C: Crash zoom-in penetrating focal aperture into next act
  | 'TOPOLOGICAL_ANCHOR_MORPH'    // Type D: Hero token persists and morphs into next scene's hero
  | 'KINETIC_LIGHT_SWEEP';        // Type E: Directional light curtain / spatial slice

export interface CameraFlightOptions {
  trajectory?: 'WHIP_PAN_RIGHT' | 'WHIP_PAN_LEFT' | 'VERTICAL_CRANE_DOWN' | 'VERTICAL_CRANE_UP';
  bankingRollDegrees?: number;
  peakBlurPixels?: number;
}

export interface ElementDisperseOptions {
  direction?: 'LEFT' | 'RIGHT' | 'UP' | 'DOWN' | 'RADIAL_BURST';
  staggerDelayFrames?: number;
  rotationDegrees?: number;
}

export interface DeepZZoomOptions {
  penetrationDepthZ?: number;
  focalTargetToken?: string;
  radialEvacuateSurroundings?: boolean;
}

export interface AnchorMorphOptions {
  anchorTokenId: string;
  sourceSymbol: string;
  targetSymbol: string;
}

export interface KineticSliceOptions {
  angleDegrees?: number;
  hasRecoilShake?: boolean;
}

export interface ActHandoffTransition {
  archetype: TransitionArchetype;
  durationInFrames: number;
  semanticMetaphorFa?: string; // Narrative rationale for the transition
  cameraFlight?: CameraFlightOptions;
  elementDisperse?: ElementDisperseOptions;
  deepZZoom?: DeepZZoomOptions;
  anchorMorph?: AnchorMorphOptions;
  kineticSlice?: KineticSliceOptions;
  snapToMusicalBeat?: boolean;
}
