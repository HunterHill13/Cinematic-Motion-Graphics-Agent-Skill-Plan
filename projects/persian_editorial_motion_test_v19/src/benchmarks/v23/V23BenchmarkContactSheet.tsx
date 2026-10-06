import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { V23DotBallBounceText } from './V23DotBallBounceText';
import { V23LetterformGeometry } from './V23LetterformGeometry';
import { V23KineticTypeBenchmark } from './V23KineticTypeBenchmark';
import { V23TrueShapeMorph } from './V23TrueShapeMorph';
import { V23DataTransformation } from './V23DataTransformation';
import { V23RibbonLineTunnel } from './V23RibbonLineTunnel';
import { V23CameraThrough } from './V23CameraThrough';
import { V23PersistentMotif } from './V23PersistentMotif';
import { V23MotionRhythm } from './V23MotionRhythm';
import { V23AssetGeometryBenchmark } from './V23AssetGeometryBenchmark';

interface TileProps {
  title: string;
  subtitle: string;
  number: string;
  width: number;
  height: number;
  children: React.ReactNode;
}

const ContactTile: React.FC<TileProps> = ({ title, subtitle, number, width, height, children }) => {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              backgroundColor: '#D4AF37',
              color: '#07090E',
              fontWeight: 900,
              fontSize: 12,
              padding: '2px 6px',
              borderRadius: 4,
            }}
          >
            {number}
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 14 }}>{title}</span>
        </div>
        <span style={{ color: '#94A3B8', fontSize: 12, fontWeight: 500 }}>{subtitle}</span>
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
 * V23 BENCHMARK CONTACT SHEET (3840x2160 4K UHD)
 * Displays all 10 Motion Studies simultaneously at their climax / transformation midpoints.
 */
export const V23BenchmarkContactSheet: React.FC = () => {
  const tWidth = 710;
  const tHeight = 400;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#030508',
        color: '#FFFFFF',
        fontFamily: 'system-ui, sans-serif',
        padding: '36px 48px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top Header */}
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
          <h1 style={{ fontSize: 36, fontWeight: 900, margin: 0, color: '#F8FAFC', letterSpacing: '-0.02em' }}>
            V23 VISUAL LANGUAGE BENCHMARK LABORATORY
          </h1>
          <p style={{ margin: '6px 0 0 0', fontSize: 16, color: '#D4AF37', fontWeight: 600 }}>
            Motion-As-Message • Metamorphic Transformations • Persian Kinetic Typography • True Shape Morph • Motivated Camera
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#94A3B8' }}>
            Resolution: 3840x2160 (4K UHD) • 10 Independent Motion Studies
          </div>
          <div style={{ fontSize: 14, color: '#CBD5E1', marginTop: 2 }}>
            Antigravity Motion Graphics Engine • Production Delivery V23
          </div>
        </div>
      </div>

      {/* 2x5 Grid of 10 Benchmarks */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 20,
          margin: '16px 0',
        }}
      >
        <ContactTile title="Dot → Ball → Bounce → Text" subtitle="Frame 135" number="B01" width={tWidth} height={tHeight}>
          <Sequence from={-135}>
            <V23DotBallBounceText />
          </Sequence>
        </ContactTile>

        <ContactTile title="Letterform → Geometry" subtitle="Frame 115" number="B02" width={tWidth} height={tHeight}>
          <Sequence from={-115}>
            <V23LetterformGeometry />
          </Sequence>
        </ContactTile>

        <ContactTile title="Kinetic Typography" subtitle="Frame 165" number="B03" width={tWidth} height={tHeight}>
          <Sequence from={-165}>
            <V23KineticTypeBenchmark />
          </Sequence>
        </ContactTile>

        <ContactTile title="True Cubic Bézier Morph" subtitle="Frame 150" number="B04" width={tWidth} height={tHeight}>
          <Sequence from={-150}>
            <V23TrueShapeMorph />
          </Sequence>
        </ContactTile>

        <ContactTile title="Data Transformation" subtitle="Frame 145" number="B05" width={tWidth} height={tHeight}>
          <Sequence from={-145}>
            <V23DataTransformation />
          </Sequence>
        </ContactTile>

        <ContactTile title="Ribbon Line Field & Tunnel" subtitle="Frame 120" number="B06" width={tWidth} height={tHeight}>
          <Sequence from={-120}>
            <V23RibbonLineTunnel />
          </Sequence>
        </ContactTile>

        <ContactTile title="Ring / Camera Through" subtitle="Frame 135" number="B07" width={tWidth} height={tHeight}>
          <Sequence from={-135}>
            <V23CameraThrough />
          </Sequence>
        </ContactTile>

        <ContactTile title="Persistent Evolving Motif" subtitle="Frame 170" number="B08" width={tWidth} height={tHeight}>
          <Sequence from={-170}>
            <V23PersistentMotif />
          </Sequence>
        </ContactTile>

        <ContactTile title="Motion Rhythm & Silence" subtitle="Frame 85" number="B09" width={tWidth} height={tHeight}>
          <Sequence from={-85}>
            <V23MotionRhythm />
          </Sequence>
        </ContactTile>

        <ContactTile title="Asset → Geometry Ingestion" subtitle="Frame 110" number="B10" width={tWidth} height={tHeight}>
          <Sequence from={-110}>
            <V23AssetGeometryBenchmark />
          </Sequence>
        </ContactTile>
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
        <span>True Vector Interpolation • Settle-Locked Typography • Zero Subpixel Jitter • Asset Agnostic</span>
        <span>Visual Language Laboratory • All Studies Rendered to MP4 in renders/v23/</span>
      </div>
    </AbsoluteFill>
  );
};
