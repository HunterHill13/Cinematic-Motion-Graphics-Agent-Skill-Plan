import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { PersianEditorialMasterV19 } from '../PersianEditorialMasterV19';

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
 * V21 MASTER FINAL CONTACT SHEET (3840x2160 4K UHD)
 * Showcases the 6 pivotal narrative moments including:
 * - Opening PR Logo Sting
 * - Narrative Hero Strike
 * - Statute Decree Monolith
 * - Tripartite Criteria
 * - Temporal Cutoff Collision
 * - Grand Unified Institutional End Card (University + Committee)
 */
export const V21MasterFinalContactSheet: React.FC = () => {
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
      {/* Top Header Banner */}
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
            V21 CHOREOGRAPHY 2.0 & INSTITUTIONAL BRANDING CONTACT SHEET
          </h1>
          <p style={{ margin: '8px 0 0 0', fontSize: 20, color: '#D4AF37', fontWeight: 600 }}>
            Continuous Visual Causality • Motion Rhythm 2.0 • Canonical Pronunciation Lock • Institutional Identity
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#94A3B8' }}>
            Resolution: 3840x2160 (4K UHD) • Master 1080p @ 30 FPS
          </div>
          <div style={{ fontSize: 16, color: '#CBD5E1', marginTop: 4 }}>
            Opening PR Logo Sting + Unified University & Committee End Card
          </div>
        </div>
      </div>

      {/* 2x3 Grid */}
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
          title="PR Logo Sting & Attribution"
          subtitle="Global Frame 60 (02.00s)"
          number="S01"
          width={mWidth}
          height={mHeight}
        >
          <Sequence from={-60}>
            <PersianEditorialMasterV19 />
          </Sequence>
        </ContactTile>

        <ContactTile
          title="Hook Keyword Strike"
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
          title="Tripartite Prerequisite Criteria"
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
          title="Temporal Cutoff Horizon Collision"
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
          title="Grand Unified Institutional End Card"
          subtitle="Global Frame 2320 (77.33s)"
          number="S06"
          width={mWidth}
          height={mHeight}
        >
          <Sequence from={-2320}>
            <PersianEditorialMasterV19 />
          </Sequence>
        </ContactTile>
      </div>

      {/* Footer */}
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
        <span>Choreography 2.0 • Settle-Locked Typography • Seamless Handoff Carriers</span>
        <span>Antigravity Motion Graphics Engine • Production Delivery V21</span>
      </div>
    </AbsoluteFill>
  );
};
