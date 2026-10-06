import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { PersianEditorialMasterV19 } from '../PersianEditorialMasterV19';

interface TransitionSheetProps {
  title: string;
  frames: number[];
}

const TransitionFrameSheet: React.FC<TransitionSheetProps> = ({ title, frames }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
        padding: 40,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          color: '#D4AF37',
          fontSize: 26,
          fontWeight: 900,
          borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
          paddingBottom: 16,
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>{title}</span>
        <span style={{ fontSize: 16, color: '#94A3B8' }}>
          Boundary Consecutive Slices (V22 Visual Transformation Continuity)
        </span>
      </div>

      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 20,
        }}
      >
        {frames.map((targetFrame, idx) => (
          <div
            key={idx}
            style={{
              position: 'relative',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 6,
              overflow: 'hidden',
              backgroundColor: '#000000',
            }}
          >
            <div
              style={{
                width: 1920,
                height: 1080,
                transform: 'scale(0.305)',
                transformOrigin: 'top left',
              }}
            >
              <Sequence from={-targetFrame}>
                <PersianEditorialMasterV19 />
              </Sequence>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                color: '#38BDF8',
                padding: '4px 10px',
                borderRadius: 4,
                fontSize: 14,
                fontWeight: 700,
                border: '1px solid rgba(56, 189, 248, 0.4)',
              }}
            >
              Frame {targetFrame} ({(targetFrame / 30).toFixed(2)}s)
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// Transition 1: S01 -> S02 Boundary (Range: 350 - 380)
export const V22Transition01Sheet: React.FC = () => (
  <TransitionFrameSheet
    title="V22 TRANSITION 1: S01 → S02 ROTATIONAL SWEEP CONTINUITY"
    frames={[350, 356, 362, 368, 374, 380]}
  />
);

// Transition 2: S02 -> S03 Boundary (Range: 620 - 650)
export const V22Transition02Sheet: React.FC = () => (
  <TransitionFrameSheet
    title="V22 TRANSITION 2: S02 → S03 3-AXIS SYMMETRIC FISSION CONTINUITY"
    frames={[620, 626, 632, 638, 644, 650]}
  />
);

// Transition 3: S03 -> S04 Boundary (Range: 1450 - 1480)
export const V22Transition03Sheet: React.FC = () => (
  <TransitionFrameSheet
    title="V22 TRANSITION 3: S03 → S04 BASELINE DATUM COLLAPSE CONTINUITY"
    frames={[1450, 1456, 1462, 1468, 1474, 1480]}
  />
);

// Transition 4: S04 -> S05 Boundary (Range: 1700 - 1730)
export const V22Transition04Sheet: React.FC = () => (
  <TransitionFrameSheet
    title="V22 TRANSITION 4: S04 → S05 FOUNDATION PLINTH DOCK CONTINUITY"
    frames={[1700, 1706, 1712, 1718, 1724, 1730]}
  />
);

// Transition 5: S05 -> S06 Boundary (Range: 2155 - 2185)
export const V22Transition05Sheet: React.FC = () => (
  <TransitionFrameSheet
    title="V22 TRANSITION 5: S05 → S06 GRAVITATIONAL SINGULARITY CONTINUITY"
    frames={[2155, 2161, 2167, 2173, 2179, 2185]}
  />
);
