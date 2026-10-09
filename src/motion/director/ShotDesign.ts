/**
 * ============================================================================
 * SHOT DESIGN: VISUAL AUTHORSHIP BEFORE CODE (PHASE 6)
 * ============================================================================
 * 
 * Defines the creative and pictorial requirements for each shot BEFORE
 * any Remotion JSX or motion code is implemented.
 * 
 * CORE PRINCIPLE:
 *   "If I freeze this shot at its strongest frame, is the image itself visually compelling?"
 * 
 * A shot is NOT a list of motion verbs.
 * A shot is a designed visual picture that lives, transforms, and transitions.
 * ============================================================================
 */

export interface SubjectVisualSpec {
  name: string;
  silhouetteDescription: string;
  scaleFractionOfFrame: number; // Must occupy intentional frame presence (e.g. 0.25 - 0.55)
  internalStructures: string[]; // Intricate visible anatomy, not a hollow generic primitive
  surfaceTactility: string;     // Textures, membrane layers, refractive gradients
  accentDetails: string[];      // Organelles, bioluminescent nodes, fibrils, tension folds
}

export interface CompositionVisualSpec {
  focalAnchor: { xPct: number; yPct: number }; // Rule-of-thirds or motivated offset (not raw center lock)
  framingStrategy: string;                     // Natural environmental framing
  negativeSpaceBalance: string;               // Deliberate negative space
  depthPlanes: {
    foregroundFraming: string;   // Out-of-focus passing depth cues
    heroPlane: string;           // Pin-sharp focal plane with rich detail
    midgroundResponse: string;   // Environmental structures reacting to hero
    deepAtmosphere: string;      // Textured gradient atmosphere, not flat pitch black
  };
}

export interface LightingVisualSpec {
  keyLight: {
    direction: string;
    color: string;
    mood: string;
  };
  fillLight: {
    direction: string;
    color: string;
    ambientGaze: string;
  };
  rimLight: {
    direction: string;
    color: string;
    tensionResponse: string;
  };
  environmentalHaze: string;
}

export interface MotionVisualSpec {
  visualCatalyst: string;      // The visual/physical cause that initiates change
  primaryTransformation: string; // How the subject's physical shape/state visibly changes
  secondaryResponse: string;    // How attached/surrounding mass causally responds
  cameraMotivation: string;     // What the camera reveals or why it reframes
  transitionHandoff: string;    // How momentum and visual interest carry into the next shot
}

export interface VisualShotPlan {
  id: string;
  shotNumber: number;
  name: string;
  frameRange: { start: number; end: number };
  durationFrames: number;
  narrativeJob: string;
  stillFramePeakDescription: string; // The definitive hero image description at peak frame
  subject: SubjectVisualSpec;
  composition: CompositionVisualSpec;
  lighting: LightingVisualSpec;
  motion: MotionVisualSpec;
}
