import React from 'react';
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { CanvasAtmosphereV19 } from '../../effects/CanvasAtmosphereV19';
import {
  VisualChoreographyBeatPlan,
  VisualChoreographer,
} from './VisualChoreographer';

/**
 * STUDY B: COMPOSITION MIGRATION & ASYMMETRIC FRAMING
 * 
 * Demonstrates intentional off-center staging and dynamic camera reframing:
 * - Begins tightly focused on Left Third (X=480, Y=380) with 80% negative space on right
 * - Migrates dynamically across frame to Bottom Right (X=1440, Y=720)
 * - Camera performs motivated pan/zoom to balance the void
 * - Concludes with asymmetric anchor plinth
 * 
 * Duration: 180 frames (6.0s @ 30 FPS)
 */

const PLAN_STUDY_B: VisualChoreographyBeatPlan = {
  beatId: 'study_b_composition_migration',
  semanticPurpose: 'Proves non-centered composition, asymmetric negative space, and motivated camera tracking',
  visualMetaphor: 'COMPRESSION_AND_RELEASE',
  primarySubject: 'Migrating Dynamic Pulse Node',
  secondarySubjects: ['Asymmetric Architectural Rail', 'Guide Annotations'],
  spatialComposition: 'DYNAMIC_MIGRATING',
  focalPointStart: { x: 480, y: 380 },
  focalPointEnd: { x: 1440, y: 720 },
  negativeSpaceStrategy: 'VAST_VOID',
  negativeSpaceRatio: 0.82,
  motionVerb: 'Diagonal traversal with camera tracking and asymmetric lock',
  transformationChain: [
    {
      stepId: 'step_1_left_anchor',
      type: 'ORIGIN',
      relativeStart: 0.0,
      relativeDuration: 0.3,
      carrierDescription: 'Asymmetric left-third anchor cluster',
      sourceGeometry: 'point',
      targetGeometry: 'travel_vector',
    },
    {
      stepId: 'step_2_diagonal_flight',
      type: 'TRAVEL',
      relativeStart: 0.3,
      relativeDuration: 0.4,
      carrierDescription: 'High-speed diagonal trajectory through empty void',
      sourceGeometry: 'travel_vector',
      targetGeometry: 'settled_plinth',
    },
    {
      stepId: 'step_3_bottom_right_lock',
      type: 'RECONFIGURE',
      relativeStart: 0.7,
      relativeDuration: 0.3,
      carrierDescription: 'Bottom-right sovereign plinth settle lock',
      sourceGeometry: 'settled_plinth',
      targetGeometry: 'permanent_crest',
    },
  ],
  energyProfile: {
    startEnergy: 2,
    peakEnergy: 4,
    endEnergy: 1,
    silenceHoldFrames: 30,
  },
  cameraBehavior: {
    type: 'LATERAL_TRACK',
    startFocal: { x: 480, y: 380 },
    targetFocal: { x: 1440, y: 720 },
    startScale: 1.05,
    targetScale: 1.15,
    reason: 'Motivated pan to maintain dynamic composition during diagonal travel',
  },
  typographyRole: {
    text: 'مهاجرت کانون توجه',
    englishSubtext: 'ASYMMETRIC COMPOSITION MIGRATION',
    behavior: 'SUBORDINATE_AXIS_LABEL',
    participatesInMorph: false,
  },
  transitionStrategy: {
    type: 'CONTINUOUS_MASS_HANDOFF',
    continuityTarget: 'bottom_right_plinth',
  },
};

export const StudyB_CompositionMigration: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frame / 180;

  const evalState = VisualChoreographer.evaluateChoreographyAtProgress(PLAN_STUDY_B, progress);
  const { currentFocalPoint, cameraScale, cameraTranslateX, cameraTranslateY } = evalState;

  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="azure" intensity={0.4} />

      {/* Global Motivated Camera Rig */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${cameraScale}) translate(${cameraTranslateX}px, ${cameraTranslateY}px)`,
          transformOrigin: '960px 540px',
        }}
      >
        <svg
          width={1920}
          height={1080}
          style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
        >
          {/* Asymmetric Diagonal Guide Rail across the canvas */}
          <line
            x1={480}
            y1={380}
            x2={1440}
            y2={720}
            stroke="rgba(212, 175, 55, 0.25)"
            strokeWidth={1.5}
            strokeDasharray="6 6"
          />

          {/* Left Third Initial Datum Base (fades as hero departs) */}
          <line
            x1={360}
            y1={380}
            x2={600}
            y2={380}
            stroke={goldColor}
            strokeWidth={2}
            strokeOpacity={interpolate(progress, [0.2, 0.5], [1, 0.2])}
          />

          {/* Bottom Right Target Plinth Base (grows as hero arrives) */}
          <line
            x1={1300}
            y1={720}
            x2={1580}
            y2={720}
            stroke={goldColor}
            strokeWidth={2.5}
            strokeOpacity={interpolate(progress, [0.5, 0.8], [0.2, 1])}
          />

          {/* The Migrating Hero Entity */}
          <g transform={`translate(${currentFocalPoint.x}, ${currentFocalPoint.y})`}>
            {/* Energy Core */}
            <circle r={14} fill={goldColor} />
            <circle r={28} fill="none" stroke={cyanAccent} strokeWidth={1.5} opacity={0.7} />

            {/* Dynamic Velocity Wake Vector */}
            {progress >= 0.25 && progress <= 0.75 && (
              <line
                x1={0}
                y1={0}
                x2={-120}
                y2={-42}
                stroke={cyanAccent}
                strokeWidth={3}
                strokeLinecap="round"
                opacity={0.8}
              />
            )}
          </g>
        </svg>

        {/* Dynamic Context Typographic Callout (stays off-center to balance negative space) */}
        <div
          style={{
            position: 'absolute',
            left: currentFocalPoint.x > 960 ? 240 : 1200,
            top: 500,
            direction: 'rtl',
            color: '#FFF',
            fontFamily: 'Vazirmatn, sans-serif',
            transition: 'left 0.2s linear',
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 900 }}>{PLAN_STUDY_B.typographyRole.text}</div>
          <div style={{ fontSize: 13, color: goldColor, marginTop: 4, letterSpacing: 2 }}>
            {PLAN_STUDY_B.typographyRole.englishSubtext}
          </div>
          <div
            style={{
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
              marginTop: 10,
              fontFamily: 'monospace',
            }}
          >
            FOCAL: X={Math.round(currentFocalPoint.x)} Y={Math.round(currentFocalPoint.y)} | RATIO: 82% VOID
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
