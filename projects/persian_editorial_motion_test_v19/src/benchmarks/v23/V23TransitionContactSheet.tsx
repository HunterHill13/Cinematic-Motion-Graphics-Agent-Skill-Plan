import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { V23DotBallBounceText } from './V23DotBallBounceText';
import { V23LetterformGeometry } from './V23LetterformGeometry';
import { V23TrueShapeMorph } from './V23TrueShapeMorph';
import { V23DataTransformation } from './V23DataTransformation';
import { V23RibbonLineTunnel } from './V23RibbonLineTunnel';
import { V23CameraThrough } from './V23CameraThrough';

interface SliceProps {
  title: string;
  subtitle: string;
  frameNo: number;
  width: number;
  height: number;
  children: React.ReactNode;
}

const TransitionSlice: React.FC<SliceProps> = ({ title, subtitle, frameNo, width, height, children }) => {
  const scale = width / 1920;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#080C14',
        border: '1.5px solid rgba(212, 175, 55, 0.4)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.8)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          backgroundColor: '#0F172A',
          borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 15 }}>{title}</span>
        <span style={{ color: '#38BDF8', fontSize: 13, fontWeight: 700 }}>Frame {frameNo} ({subtitle})</span>
      </div>

      <div style={{ width, height, position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            width: 1920,
            height: 1080,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * V23 TRANSITION CONTACT SHEET (3840x2160 4K UHD)
 * High-resolution inspection of metamorphosis midpoints and transition continuity.
 */
export const V23TransitionContactSheet: React.FC = () => {
  const sWidth = 1180;
  const sHeight = 660;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#030508',
        color: '#FFFFFF',
        fontFamily: 'system-ui, sans-serif',
        padding: '40px 54px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid rgba(212, 175, 55, 0.4)',
          paddingBottom: 16,
        }}
      >
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 900, margin: 0, color: '#F8FAFC' }}>
            V23 TRANSITION & METAMORPHOSIS CONTINUITY SHEET
          </h1>
          <p style={{ margin: '6px 0 0 0', fontSize: 16, color: '#D4AF37', fontWeight: 600 }}>
            Midpoint Verification: Squash/Stretch Bounce, Vector Fragment Reorganization, Bézier Morph, Data Collapse, Ring Tunnel
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#94A3B8' }}>
            Resolution: 3840x2160 (4K UHD)
          </div>
          <div style={{ fontSize: 14, color: '#CBD5E1', marginTop: 2 }}>
            Critical C0 & C1 Continuity Inspection Slices
          </div>
        </div>
      </div>

      {/* 2x3 Grid of 6 Critical Metamorphic Midpoints */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 24,
          margin: '20px 0',
        }}
      >
        <TransitionSlice
          title="B01: Ball Ground Impact Squash"
          subtitle="Impact Climax"
          frameNo={78}
          width={sWidth}
          height={sHeight}
        >
          <Sequence from={-78}>
            <V23DotBallBounceText />
          </Sequence>
        </TransitionSlice>

        <TransitionSlice
          title="B02: Letterform Vector Fragmentation"
          subtitle="Mid-Dispersal"
          frameNo={90}
          width={sWidth}
          height={sHeight}
        >
          <Sequence from={-90}>
            <V23LetterformGeometry />
          </Sequence>
        </TransitionSlice>

        <TransitionSlice
          title="B04: Torus to Rounded Cube Morph"
          subtitle="50% Bézier Interpolation"
          frameNo={90}
          width={sWidth}
          height={sHeight}
        >
          <Sequence from={-90}>
            <V23TrueShapeMorph />
          </Sequence>
        </TransitionSlice>

        <TransitionSlice
          title="B05: Bar Chart Mass Compression"
          subtitle="Accordion to Vertices"
          frameNo={70}
          width={sWidth}
          height={sHeight}
        >
          <Sequence from={-70}>
            <V23DataTransformation />
          </Sequence>
        </TransitionSlice>

        <TransitionSlice
          title="B06: Wave Traces Tunnel Folding"
          subtitle="3D Perspective Transition"
          frameNo={115}
          width={sWidth}
          height={sHeight}
        >
          <Sequence from={-115}>
            <V23RibbonLineTunnel />
          </Sequence>
        </TransitionSlice>

        <TransitionSlice
          title="B07: Camera Through Ring Aperture"
          subtitle="Near-Clip Boundary"
          frameNo={128}
          width={sWidth}
          height={sHeight}
        >
          <Sequence from={-128}>
            <V23CameraThrough />
          </Sequence>
        </TransitionSlice>
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: 12,
          color: '#94A3B8',
          fontSize: 14,
        }}
      >
        <span>Zero Opacity Fakes • Genuine Physical Metamorphosis • No Jump-Cuts at Morph Boundaries</span>
        <span>Antigravity Engine Visual QA Protocol</span>
      </div>
    </AbsoluteFill>
  );
};
