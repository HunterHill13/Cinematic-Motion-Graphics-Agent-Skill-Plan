import React from 'react';
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { CanvasAtmosphereV19 } from '../../effects/CanvasAtmosphereV19';
import {
  VisualChoreographyBeatPlan,
  VisualChoreographer,
} from './VisualChoreographer';

/**
 * STUDY A: ONE OBJECT, THREE TRANSFORMATIONS
 * 
 * Demonstrates strict Mass Conservation across an authored A -> B -> C transformation chain:
 * State A: Singular compressed golden node (frames 0 - 60)
 *   ↓ deforms & splits into 3 orbiting vector lines
 * State B: Triangular spatial truss / coordinate frame (frames 60 - 120)
 *   ↓ reconfigures & folds
 * State C: Solid faceted geometric prism with settle lock (frames 120 - 180)
 * 
 * Duration: 180 frames (6.0s @ 30 FPS)
 */

const PLAN_STUDY_A: VisualChoreographyBeatPlan = {
  beatId: 'study_a_triple_transform',
  semanticPurpose: 'Continuous physical metamorphosis of a single mass through 3 geometric states',
  visualMetaphor: 'SEED_TO_EXPANDING_NETWORK',
  primarySubject: 'Metamorphic Core Entity',
  secondarySubjects: ['Tether vectors', 'Coordinate ticks'],
  spatialComposition: 'DYNAMIC_MIGRATING',
  focalPointStart: { x: 640, y: 540 },
  focalPointEnd: { x: 1280, y: 540 },
  negativeSpaceStrategy: 'BALANCED_CANVAS',
  negativeSpaceRatio: 0.75,
  motionVerb: 'Metamorphic extrusion, triangulation, and planar crystallization',
  transformationChain: [
    {
      stepId: 'step_1_seed',
      type: 'ORIGIN',
      relativeStart: 0.0,
      relativeDuration: 0.33,
      carrierDescription: 'Golden nucleus dot with breathing aura',
      sourceGeometry: 'point',
      targetGeometry: 'triad_lines',
    },
    {
      stepId: 'step_2_truss',
      type: 'SPLIT',
      relativeStart: 0.33,
      relativeDuration: 0.34,
      carrierDescription: 'Expanding triangular truss with vertex nodes',
      sourceGeometry: 'triad_lines',
      targetGeometry: 'faceted_prism',
    },
    {
      stepId: 'step_3_prism',
      type: 'RECONFIGURE',
      relativeStart: 0.67,
      relativeDuration: 0.33,
      carrierDescription: 'Crystallized geometric prism locked on horizontal plinth',
      sourceGeometry: 'faceted_prism',
      targetGeometry: 'solid_prism',
    },
  ],
  energyProfile: {
    startEnergy: 2,
    peakEnergy: 4,
    endEnergy: 2,
    silenceHoldFrames: 25,
  },
  cameraBehavior: {
    type: 'MOTIVATED_PUSH',
    startFocal: { x: 640, y: 540 },
    targetFocal: { x: 1280, y: 540 },
    startScale: 1.0,
    targetScale: 1.08,
    reason: 'Follows migratory focal point while conveying expanding geometric volume',
  },
  typographyRole: {
    text: 'تغییر فرم پیوسته',
    englishSubtext: 'CONTINUOUS METAMORPHOSIS (A → B → C)',
    behavior: 'SUBORDINATE_AXIS_LABEL',
    participatesInMorph: false,
  },
  transitionStrategy: {
    type: 'CONTINUOUS_MASS_HANDOFF',
    continuityTarget: 'triangular_prism_center',
  },
};

export const StudyA_OneObjectThreeTransforms: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frame / 180;

  const evalState = VisualChoreographer.evaluateChoreographyAtProgress(PLAN_STUDY_A, progress);
  const { currentFocalPoint, cameraScale } = evalState;

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.5} />

      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${cameraScale})`,
          transformOrigin: `${currentFocalPoint.x}px ${currentFocalPoint.y}px`,
        }}
      >
        {/* State A -> State B -> State C Visual Carrier */}
        <svg
          width={1920}
          height={1080}
          style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
        >
          {(() => {
            if (frame < 60) {
              // STATE A: Compressed Nucleus Dot mutating into 3 extruding lines
              const p = frame / 60;
              const radius = interpolate(p, [0, 0.7, 1], [16, 24, 8]);
              const spread = interpolate(p, [0.5, 1], [0, 90]);

              return (
                <g transform={`translate(${currentFocalPoint.x}, ${currentFocalPoint.y})`}>
                  {/* Central Node */}
                  <circle r={radius} fill={goldColor} />
                  
                  {/* 3 Radiating Tether Lines starting to emerge */}
                  {[0, 120, 240].map((angle, idx) => {
                    const rad = (angle * Math.PI) / 180;
                    const x2 = spread * Math.cos(rad);
                    const y2 = spread * Math.sin(rad);
                    return (
                      <line
                        key={idx}
                        x1={0}
                        y1={0}
                        x2={x2}
                        y2={y2}
                        stroke={goldColor}
                        strokeWidth={2}
                        strokeOpacity={p > 0.5 ? (p - 0.5) * 2 : 0}
                      />
                    );
                  })}
                </g>
              );
            } else if (frame < 120) {
              // STATE B: Expanding Triangular Truss
              const p = (frame - 60) / 60;
              const rot = interpolate(p, [0, 1], [0, 120]);
              const size = interpolate(p, [0, 1], [90, 160]);

              // 3 vertices of triangle
              const v1 = { x: 0, y: -size };
              const v2 = { x: size * 0.866, y: size * 0.5 };
              const v3 = { x: -size * 0.866, y: size * 0.5 };

              return (
                <g
                  transform={`translate(${currentFocalPoint.x}, ${currentFocalPoint.y}) rotate(${rot})`}
                >
                  <polygon
                    points={`${v1.x},${v1.y} ${v2.x},${v2.y} ${v3.x},${v3.y}`}
                    fill="rgba(56, 189, 248, 0.12)"
                    stroke={goldColor}
                    strokeWidth={2.5}
                  />
                  {/* Vertex energy nodes */}
                  {[v1, v2, v3].map((v, i) => (
                    <circle key={i} cx={v.x} cy={v.y} r={6} fill={cyanAccent} />
                  ))}
                </g>
              );
            } else {
              // STATE C: Crystallized Solid Faceted Prism with Settle Lock
              const p = Math.min(1, (frame - 120) / 40);
              const settleP = Easing.bezier(0.16, 1, 0.3, 1)(p);
              const scale = interpolate(settleP, [0, 1], [0.85, 1.0]);

              return (
                <g
                  transform={`translate(${currentFocalPoint.x}, ${currentFocalPoint.y}) scale(${scale})`}
                >
                  {/* Facet 1 */}
                  <polygon
                    points="0,-160 140,40 0,100"
                    fill="rgba(212, 175, 55, 0.35)"
                    stroke={goldColor}
                    strokeWidth={2}
                  />
                  {/* Facet 2 */}
                  <polygon
                    points="0,-160 -140,40 0,100"
                    fill="rgba(56, 189, 248, 0.25)"
                    stroke={cyanAccent}
                    strokeWidth={2}
                  />
                  {/* Center Crest Node */}
                  <circle cx={0} cy={100} r={5} fill="#FFF" />
                </g>
              );
            }
          })()}
        </svg>

        {/* Minimal Typographic Anchor */}
        <div
          style={{
            position: 'absolute',
            left: 120,
            bottom: 100,
            direction: 'rtl',
            color: '#FFF',
            fontFamily: 'Vazirmatn, sans-serif',
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 800 }}>{PLAN_STUDY_A.typographyRole.text}</div>
          <div style={{ fontSize: 13, color: goldColor, marginTop: 4, letterSpacing: 2 }}>
            {PLAN_STUDY_A.typographyRole.englishSubtext}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
