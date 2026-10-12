/**
 * ============================================================================
 * DYNAMIC SCENE TRANSITION SCHEMA, ACT LAYOUTS & TEXT REVEAL MODES
 * ============================================================================
 */

export type TransitionArchetype =
  | 'CAMERA_SPATIAL_FLIGHT'       // Type A: Whip pan / Vertical crane / Diagonal glide (Both scenes visible during flight!)
  | 'ELEMENT_KINETIC_DISPERSE'    // Type B: Camera holds still; individual children fling out & next children pop in
  | 'DEEP_Z_ZOOM_THROUGH'         // Type C: Crash zoom-in penetrating focal aperture into next act in Z-space
  | 'TOPOLOGICAL_ANCHOR_MORPH'    // Type D: Hero token persists in place and morphs into next scene's hero
  | 'KINETIC_LIGHT_SWEEP';        // Type E: Directional laser light curtain / spatial slice

export type ActLayoutVariant =
  | 'SPLIT_SCULPTURE_RIGHT'       // Layout 1: Right RTL typography + Left sculptural orbital core + Bottom constellation
  | 'MONUMENTAL_CENTER_HERO'      // Layout 2: Centered architectural manifesto + Giant headline + Flanked metric wings
  | 'SPLIT_DATA_TERMINAL_LEFT'    // Layout 3: Left typography + Right live multi-bar/candlestick chart & radial gauge
  | 'CONSTELLATION_BENTO_MATRIX'; // Layout 4: Top architectural lintel + 3-column spatial modular cards with SVG conduits

export type TextRevealMode =
  | 'MASK_CURTAIN_RISE'           // Reveal 1: Word/phrase floor-masked rise (overflow:hidden, translateY 120% -> 0%)
  | 'PERSPECTIVE_3D_FLIP'         // Reveal 2: 3D origami/architectural rotation (rotateX -68deg -> 0deg)
  | 'ELASTIC_POP_SLAM'            // Reveal 3: High-energy scale slam (scale 1.45 -> 0.96 -> 1.0)
  | 'VELOCITY_SKEW_SLIDE';        // Reveal 4: High-speed horizontal RTL whip-in (translateX 160px -> 0, skewX -16deg -> 0)

export interface CameraFlightOptions {
  trajectory?: 'WHIP_PAN_RIGHT' | 'WHIP_PAN_LEFT' | 'VERTICAL_CRANE_DOWN' | 'VERTICAL_CRANE_UP' | 'DIAGONAL_GLIDE';
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
  anchorTokenId?: string;
  sourceSymbol?: string;
  targetSymbol?: string;
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
