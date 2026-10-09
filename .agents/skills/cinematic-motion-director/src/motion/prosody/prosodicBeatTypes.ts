/**
 * V17 PROSODIC BEAT SYSTEM - TYPES
 * 
 * Defines schemas for prosody-driven motion choreography:
 * - Semantic Beat: WHAT is being said (narrative concept, layer budget, layout).
 * - Prosodic Beat: HOW it is being said (vocal stress, pitch contour, cadence, pauses, anticipation).
 * 
 * Invariants:
 * 1. Extends, does NOT replace, the 23-beat semantic trajectory.
 * 2. Restrained editorial synchronization (no erratic audio reactivity).
 * 3. Influences anticipation, settle damping, velocity ramp, and material illumination.
 */

export type VocalStress =
  | 'primary-stress'     // Climax keyword strike (e.g. hero titles, statutory numbers)
  | 'secondary-stress'   // Sub-clause or criterion introduction
  | 'unstressed'         // Flowing connective narrative
  | 'pause-cadence';      // Post-sentence breath or reflective boundary

export type PitchContour =
  | 'rising-interrogative' // Questions and open queries (rising vocal inflection)
  | 'peaking-declarative'  // Firm statutory mandates and authoritative announcements
  | 'falling-cadence'     // Sentence conclusions, resolutions, and settles
  | 'sustained-steady';    // Explanatory enumerations

export type SpeechCadence =
  | 'accelerando'         // Increasing vocal speed
  | 'ritardando'          // Deliberate deceleration into key term
  | 'staccato'            // Crisp numeric and criterion locks
  | 'legato';             // Smooth editorial institutional flow

export type VelocityRamp =
  | 'sharp-snap'          // Quick explosive arrival with tight damping
  | 'smooth-ease'         // Classic directorial ease-in-out
  | 'delayed-spring';     // Soft anticipation followed by fluid physical travel

export interface ProsodicBeat {
  id: string;
  semanticBeatId: string;
  shotId: 'Shot01' | 'Shot02' | 'Shot03' | 'Shot04' | 'Shot05' | 'Shot06';
  startFrame: number;
  endFrame: number;
  
  // Acoustic Prosody Attributes (Derived from narrator's delivery)
  vocalStress: VocalStress;
  pitchContour: PitchContour;
  speechCadence: SpeechCadence;
  pausePreRollFrames: number;
  pausePostRollFrames: number;
  
  // Motion Choreography Tuning
  anticipationFrames: number;
  settleDamping: number;
  scalePeakMultiplier: number;
  velocityRamp: VelocityRamp;
  
  // Materiality & Atmospheric Response
  materialResponse: {
    rimLightIntensity: number; // 0.2 to 0.8 golden rim intensity
    depthShadowBlur: number;   // 10px to 30px frosted shadow blur
    frostedBlurPx: number;     // 12px to 24px backdrop filter blur
  };
}

export interface ProsodicState {
  currentBeat: ProsodicBeat;
  frameInBeat: number;
  beatProgress: number; // 0.0 to 1.0
  isAnticipationPhase: boolean;
  isSettlePhase: boolean;
  modulatedScale: number;
  rimIntensity: number;
}
