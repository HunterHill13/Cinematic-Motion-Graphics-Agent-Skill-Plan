import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { PersianEditorialMasterV19 } from './PersianEditorialMasterV19';

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
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#080C14',
        border: '1.5px solid rgba(212, 175, 55, 0.4)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.8)',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          backgroundColor: '#0F172A',
          borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              backgroundColor: '#D4AF37',
              color: '#07090E',
              fontWeight: 900,
              fontSize: 14,
              padding: '2px 8px',
              borderRadius: 6,
            }}
          >
            {number}
          </span>
          <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 16 }}>{title}</span>
        </div>
        <span style={{ color: '#94A3B8', fontSize: 13, fontWeight: 500 }}>{subtitle}</span>
      </div>

      {/* Screen viewport */}
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
 * V19 MASTER FINAL CONTACT SHEET (3840x2160 4K UHD)
 * Displays the 6 redesigned narrative hero frames side-by-side with architectural badges.
 */
export const V19MasterFinalContactSheet: React.FC = () => {
  const mWidth = 1180;
  const mHeight = 664;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#030508',
        color: '#FFFFFF',
        fontFamily: 'system-ui, sans-serif',
        padding: '48px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid rgba(212, 175, 55, 0.4)',
          paddingBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 44, fontWeight: 900, margin: 0, letterSpacing: '-0.02em', color: '#F8FAFC' }}>
            V19 TRUE MOTION GRAPHICS MASTER FINAL CONTACT SHEET
          </h1>
          <p style={{ margin: '8px 0 0 0', fontSize: 20, color: '#D4AF37', fontWeight: 600 }}>
            Director-Led Graphic Choreography • 100% Content-Locked • Canvas-First Editorial Staging
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#94A3B8' }}>
            Resolution: 3840x2160 (4K UHD) • Master 1080p @ 30 FPS
          </div>
          <div style={{ fontSize: 16, color: '#CBD5E1', marginTop: 4 }}>
            Hard Ban Enforced: Zero Cards • Zero Sliders • Zero Dashboard Grids
          </div>
        </div>
      </div>

      {/* 2x3 Grid of 6 Redesigned Narrative Shots */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 36,
          margin: '20px 0',
        }}
      >
        <ContactTile
          title="Hook & Seismic Strike"
          subtitle="Global Frame 234 (07.80s)"
          number="S01"
          width={mWidth}
          height={mHeight}
        >
          <Sequence from={-234}>
            <PersianEditorialMasterV19 />
          </Sequence>
        </ContactTile>

        <ContactTile
          title="Statute Decree Monolith"
          subtitle="Global Frame 450 (15.00s)"
          number="S02"
          width={mWidth}
          height={mHeight}
        >
          <Sequence from={-450}>
            <PersianEditorialMasterV19 />
          </Sequence>
        </ContactTile>

        <ContactTile
          title="Colossal Metric ۱۶ & Spatial Constellation"
          subtitle="Global Frame 855 (28.50s)"
          number="S03"
          width={mWidth}
          height={mHeight}
        >
          <Sequence from={-855}>
            <PersianEditorialMasterV19 />
          </Sequence>
        </ContactTile>

        <ContactTile
          title="Kinetic Horizon Collision Monolith"
          subtitle="Global Frame 1575 (52.50s)"
          number="S04"
          width={mWidth}
          height={mHeight}
        >
          <Sequence from={-1575}>
            <PersianEditorialMasterV19 />
          </Sequence>
        </ContactTile>

        <ContactTile
          title="Sculptural Numeric Ascendance (65 → 110 → 130)"
          subtitle="Global Frame 2080 (69.33s)"
          number="S05"
          width={mWidth}
          height={mHeight}
        >
          <Sequence from={-2080}>
            <PersianEditorialMasterV19 />
          </Sequence>
        </ContactTile>

        <ContactTile
          title="Detonation into Heraldic Institutional Crest"
          subtitle="Global Frame 2220 (74.00s)"
          number="S06"
          width={mWidth}
          height={mHeight}
        >
          <Sequence from={-2220}>
            <PersianEditorialMasterV19 />
          </Sequence>
        </ContactTile>
      </div>

      {/* Bottom Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: 16,
          color: '#94A3B8',
          fontSize: 16,
        }}
      >
        <span>True Transformation: A becomes B • Zero Accidental Black Gaps • EBU R128 Master Mix</span>
        <span>Antigravity Motion Graphics Engine • Production Delivery</span>
      </div>
    </AbsoluteFill>
  );
};

/**
 * V19 MOTION SAMPLING SHEET (1920x1080)
 * 12 Temporal Slices proving continuous transformation and verifying zero black gaps.
 */
export const V19MotionSheetMaster: React.FC = () => {
  const slices = [
    { frame: 30, desc: 'f30 • Horizon Rule & Attribution Unroll' },
    { frame: 234, desc: 'f234 • Hero Keyword Strike & Seismic Wave' },
    { frame: 365, desc: 'f365 • T1 Beam Accelerating into Shot 02' },
    { frame: 450, desc: 'f450 • Asymmetrical Legal Monolith & Seal' },
    { frame: 635, desc: 'f635 • T2 Symmetric Fission Tri-Axis Split' },
    { frame: 855, desc: 'f855 • Colossal Metric "۱۶" Seismic Lock' },
    { frame: 1035, desc: 'f1035 • Precision Caliper Gate Verification' },
    { frame: 1215, desc: 'f1215 • 6 Orbiting Articles Constellation' },
    { frame: 1575, desc: 'f1575 • Full-Bleed Kinetic Barrier Collision' },
    { frame: 1850, desc: 'f1850 • Bachelor 65 Monolith Elevation' },
    { frame: 2080, desc: 'f2080 • PhD 130 Summit Laser Ascendance' },
    { frame: 2220, desc: 'f2220 • Heraldic Institutional Crest Detonation' },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#04060A',
        color: '#F8FAFC',
        fontFamily: 'system-ui, sans-serif',
        padding: '24px 30px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Title Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          borderBottom: '1px solid rgba(212, 175, 55, 0.4)',
          paddingBottom: 10,
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 900, color: '#D4AF37' }}>
          V19 Master Narrative Temporal Progression — 12 Keyframe Slices (2361f)
        </span>
        <span style={{ fontSize: 16, color: '#94A3B8' }}>
          Zero Black Gaps • Continuous Spatial Transformations
        </span>
      </div>

      {/* 3x4 Grid of 12 Frames */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: 16,
        }}
      >
        {slices.map((slice, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#090D18',
              borderRadius: 8,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <div
                style={{
                  position: 'absolute',
                  width: 1920,
                  height: 1080,
                  transform: 'scale(0.23)',
                  transformOrigin: 'top left',
                  pointerEvents: 'none',
                }}
              >
                <Sequence from={-slice.frame}>
                  <PersianEditorialMasterV19 />
                </Sequence>
              </div>
            </div>
            <div
              style={{
                height: 28,
                backgroundColor: '#0D1424',
                padding: '0 8px',
                display: 'flex',
                alignItems: 'center',
                fontSize: 11,
                color: '#CBD5E1',
                fontWeight: 600,
                direction: 'ltr',
              }}
            >
              {slice.desc}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
