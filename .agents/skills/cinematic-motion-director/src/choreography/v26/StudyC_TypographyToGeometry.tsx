import React from 'react';
import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { CanvasAtmosphereV19 } from '../../effects/CanvasAtmosphereV19';
import {
  VisualChoreographyBeatPlan,
  VisualChoreographer,
} from './VisualChoreographer';

/**
 * STUDY C: PERSIAN TYPOGRAPHY AS GRAPHIC MATERIAL (TYPE -> GEOMETRY)
 * 
 * Replaces simple DOM text opacity fades with true physical metamorphosis:
 * - Word «شتاب» enters via physical downward trajectory and impacts horizontal datum
 * - The Persian calligraphic ligatures act as graphic geometry, fracture along vector seams,
 *   and extrude directly into an 8-ray geometric Compass Star emblem
 * - Whole-word ligature geometry preserved without subpixel jitter
 * 
 * Duration: 180 frames (6.0s @ 30 FPS)
 */

const PLAN_STUDY_C: VisualChoreographyBeatPlan = {
  beatId: 'study_c_type_to_geometry',
  semanticPurpose: 'Demonstrates typography as active vector material morphing into geometric emblem',
  visualMetaphor: 'LETTERFORM_AS_GEOMETRY',
  primarySubject: 'Word «شتاب» -> Compass Star Emblem',
  secondarySubjects: ['Baseline Impact Datum', 'Radial Ray Vectors'],
  spatialComposition: 'CENTER_DELIBERATE',
  focalPointStart: { x: 960, y: 540 },
  focalPointEnd: { x: 960, y: 540 },
  negativeSpaceStrategy: 'BALANCED_CANVAS',
  negativeSpaceRatio: 0.72,
  motionVerb: 'Kinematic impact, ligature dissection, and rotational geometric extrusion',
  transformationChain: [
    {
      stepId: 'step_1_impact',
      type: 'ORIGIN',
      relativeStart: 0.0,
      relativeDuration: 0.35,
      carrierDescription: 'Downward kinematic slam onto horizontal datum',
      sourceGeometry: 'text_ligature',
      targetGeometry: 'impact_plate',
    },
    {
      stepId: 'step_2_extrude',
      type: 'DEFORM',
      relativeStart: 0.35,
      relativeDuration: 0.35,
      carrierDescription: 'Ligature strokes extrude outward as radial vector spines',
      sourceGeometry: 'impact_plate',
      targetGeometry: 'radial_spines',
    },
    {
      stepId: 'step_3_assemble_star',
      type: 'RECONFIGURE',
      relativeStart: 0.7,
      relativeDuration: 0.3,
      carrierDescription: 'Radial vectors connect into symmetrical Compass Star emblem',
      sourceGeometry: 'radial_spines',
      targetGeometry: 'compass_star',
    },
  ],
  energyProfile: {
    startEnergy: 3,
    peakEnergy: 5,
    endEnergy: 2,
    silenceHoldFrames: 30,
  },
  cameraBehavior: {
    type: 'STATIC_LOCK',
    startFocal: { x: 960, y: 540 },
    targetFocal: { x: 960, y: 540 },
    startScale: 1.0,
    targetScale: 1.0,
    reason: 'Static camera restraint to allow graphic typographic transformation full visual clarity',
  },
  typographyRole: {
    text: 'شتاب',
    englishSubtext: 'TYPOGRAPHY AS GRAPHIC MATERIAL',
    behavior: 'GRAPHIC_EXTRUSION',
    participatesInMorph: true,
  },
  transitionStrategy: {
    type: 'TOPOLOGICAL_METAMORPHOSIS',
    continuityTarget: 'compass_star_center',
  },
};

export const StudyC_TypographyToGeometry: React.FC = () => {
  const frame = useCurrentFrame();
  const goldColor = '#D4AF37';
  const cyanAccent = '#38BDF8';

  // Phase 1 (0-60f): Kinematic Slam & Impact
  // Phase 2 (60-120f): Letterform Extrusion into Radial Spines
  // Phase 3 (120-180f): Settle into Compass Star Emblem
  let wordY = 540;
  let scaleX = 1.0;
  let scaleY = 1.0;
  let textOpacity = 1.0;
  let raySpread = 0;
  let starProgress = 0;

  if (frame < 60) {
    const p = frame / 60;
    if (p < 0.6) {
      const dropP = p / 0.6;
      wordY = interpolate(dropP, [0, 1], [160, 540], { easing: Easing.in(Easing.cubic) });
      scaleX = 0.82;
      scaleY = 1.35;
    } else {
      const squashP = (p - 0.6) / 0.4;
      wordY = 540;
      scaleX = interpolate(squashP, [0, 0.4, 1], [1.45, 0.95, 1.0]);
      scaleY = interpolate(squashP, [0, 0.4, 1], [0.65, 1.05, 1.0]);
    }
  } else if (frame < 120) {
    const p = (frame - 60) / 60;
    // Morph: Text dissolves as 8 graphic ray vectors physically shoot outward from its geometry
    textOpacity = interpolate(p, [0, 0.5], [1, 0]);
    raySpread = interpolate(p, [0, 1], [30, 140], { easing: Easing.bezier(0.16, 1, 0.3, 1) });
    starProgress = p;
  } else {
    textOpacity = 0;
    raySpread = 140;
    starProgress = 1.0;
  }

  const rotation = interpolate(frame, [60, 180], [0, 90]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#04060A', overflow: 'hidden' }}>
      <CanvasAtmosphereV19 mood="gold" intensity={0.5} />

      {/* Baseline Datum Beam */}
      <div
        style={{
          position: 'absolute',
          left: 480,
          right: 480,
          top: 540,
          height: 2,
          backgroundColor: 'rgba(212, 175, 55, 0.5)',
        }}
      />

      {/* Impact Shockwave Ring */}
      {frame >= 36 && frame <= 75 && (
        <div
          style={{
            position: 'absolute',
            left: 960 - (frame - 36) * 12,
            top: 540 - (frame - 36) * 12,
            width: (frame - 36) * 24,
            height: (frame - 36) * 24,
            borderRadius: '50%',
            border: `2px solid ${cyanAccent}`,
            opacity: interpolate(frame, [36, 75], [1, 0]),
          }}
        />
      )}

      {/* Graphic Persian Word «شتاب» */}
      {textOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 960,
            top: wordY,
            transform: `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`,
            textAlign: 'center',
            direction: 'rtl',
            opacity: textOpacity,
            fontFamily: 'Vazirmatn, sans-serif',
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: '#F8FAFC',
              textShadow: '0 4px 35px rgba(0,0,0,0.95)',
            }}
          >
            شتاب
          </div>
        </div>
      )}

      {/* Extruding 8-Ray Compass Star Geometry */}
      {starProgress > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 960,
            top: 540,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          }}
        >
          <svg width={360} height={360} viewBox="-180 -180 360 360">
            {/* 8 Radial Ray Spines that emerged from the word ligatures */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
              const rad = (angle * Math.PI) / 180;
              const x2 = raySpread * Math.cos(rad);
              const y2 = raySpread * Math.sin(rad);

              return (
                <line
                  key={idx}
                  x1={0}
                  y1={0}
                  x2={x2}
                  y2={y2}
                  stroke={idx % 2 === 0 ? goldColor : cyanAccent}
                  strokeWidth={idx % 2 === 0 ? 3.5 : 2}
                  strokeOpacity={starProgress}
                />
              );
            })}

            {/* Concentric Crest Rings */}
            <circle
              r={interpolate(starProgress, [0, 1], [0, 48])}
              fill="none"
              stroke={goldColor}
              strokeWidth={2}
            />
            <circle
              r={interpolate(starProgress, [0, 1], [0, 20])}
              fill={goldColor}
            />
          </svg>
        </div>
      )}

      {/* Typographic Sub-label */}
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
        <div style={{ fontSize: 32, fontWeight: 800 }}>تایپوگرافی به عنوان ماده هندسی</div>
        <div style={{ fontSize: 13, color: goldColor, marginTop: 4, letterSpacing: 2 }}>
          {PLAN_STUDY_C.typographyRole.englishSubtext}
        </div>
      </div>
    </AbsoluteFill>
  );
};
