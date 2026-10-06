import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Benchmark1_KineticTypeSlam } from './Benchmark1_KineticTypeSlam';
import { Benchmark2_DotToLineRibbon } from './Benchmark2_DotToLineRibbon';
import { Benchmark3_ShapeMorphToChart } from './Benchmark3_ShapeMorphToChart';
import { Benchmark4_RingTunnelDepth } from './Benchmark4_RingTunnelDepth';
import { Benchmark5_ClichéVsCinematic } from './Benchmark5_ClichéVsCinematic';
import { PersianEditorialMasterV18 } from '../../persian_editorial_motion_test_v18/src/PersianEditorialMasterV18';

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
        backgroundColor: '#0E131F',
        border: '1.5px solid rgba(212, 175, 55, 0.4)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.7)',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          backgroundColor: '#161F33',
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
 * V18 VISUAL REVIEW CONTACT SHEET
 * Resolution: 3840 x 2160 (4K Ultra HD)
 * - Row 1: 5 Benchmark Stills (B1 to B5)
 * - Row 2: 6 Master Narrative Stills (Shot 01 to Shot 06)
 */
export const V18VisualReviewContactSheet: React.FC = () => {
  // Row 1: 5 items across 3840 width (item width ~ 720, height ~ 405)
  const bWidth = 720;
  const bHeight = 405;

  // Row 2: 6 items across 3840 width (item width ~ 590, height ~ 332)
  const mWidth = 590;
  const mHeight = 332;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        color: '#FFFFFF',
        fontFamily: 'system-ui, sans-serif',
        padding: '36px 40px',
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
          paddingBottom: 16,
        }}
      >
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 900, margin: 0, letterSpacing: '-0.02em', color: '#F8FAFC' }}>
            V18 VISUAL REVIEW CONTACT SHEET
          </h1>
          <div style={{ fontSize: 18, color: '#D4AF37', marginTop: 4, fontWeight: 600 }}>
            Cinematic Motion Graphics Agent Skill Plan — Reference-Integrated Visual Language Audit
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 15, color: '#94A3B8' }}>
          <div>Resolution: 3840 x 2160 (4K UHD)</div>
          <div>Standards: EBU R128 / Content-Locked / Anti-Cliché</div>
        </div>
      </div>

      {/* SECTION 1: BENCHMARK ROW (5 Columns) */}
      <div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#38BDF8', marginBottom: 12, letterSpacing: '0.04em' }}>
          ROW 1: PROVEN MOTION-CRAFT ATOMIC BENCHMARKS
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'space-between' }}>
          <ContactTile title="Kinetic Type Slam" subtitle="Frame 45 (Impact)" number="B1" width={bWidth} height={bHeight}>
            <Sequence from={-45}>
              <Benchmark1_KineticTypeSlam />
            </Sequence>
          </ContactTile>

          <ContactTile title="Dot → Line → Ribbon" subtitle="Frame 60 (Evolution)" number="B2" width={bWidth} height={bHeight}>
            <Sequence from={-60}>
              <Benchmark2_DotToLineRibbon />
            </Sequence>
          </ContactTile>

          <ContactTile title="Shape Morph → Chart" subtitle="Frame 70 (Morph)" number="B3" width={bWidth} height={bHeight}>
            <Sequence from={-70}>
              <Benchmark3_ShapeMorphToChart />
            </Sequence>
          </ContactTile>

          <ContactTile title="Ring Tunnel Depth" subtitle="Frame 60 (Waves)" number="B4" width={bWidth} height={bHeight}>
            <Sequence from={-60}>
              <Benchmark4_RingTunnelDepth />
            </Sequence>
          </ContactTile>

          <ContactTile title="Cliché vs Cinematic" subtitle="Frame 75 (Split)" number="B5" width={bWidth} height={bHeight}>
            <Sequence from={-75}>
              <Benchmark5_ClichéVsCinematic />
            </Sequence>
          </ContactTile>
        </div>
      </div>

      {/* SECTION 2: MASTER NARRATIVE ROW (6 Columns) */}
      <div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#D4AF37', marginBottom: 12, letterSpacing: '0.04em' }}>
          ROW 2: MASTER EDITORIAL NARRATIVE SHOTS (PersianEditorialMasterV18)
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'space-between' }}>
          <ContactTile title="Hook & Strike" subtitle="Global Frame 234" number="S01" width={mWidth} height={mHeight}>
            <Sequence from={-234}>
              <PersianEditorialMasterV18 />
            </Sequence>
          </ContactTile>

          <ContactTile title="Statute Decree" subtitle="Global Frame 450" number="S02" width={mWidth} height={mHeight}>
            <Sequence from={-450}>
              <PersianEditorialMasterV18 />
            </Sequence>
          </ContactTile>

          <ContactTile title="Criteria Cards" subtitle="Global Frame 855" number="S03" width={mWidth} height={mHeight}>
            <Sequence from={-855}>
              <PersianEditorialMasterV18 />
            </Sequence>
          </ContactTile>

          <ContactTile title="Calendar Cutoff" subtitle="Global Frame 1575" number="S04" width={mWidth} height={mHeight}>
            <Sequence from={-1575}>
              <PersianEditorialMasterV18 />
            </Sequence>
          </ContactTile>

          <ContactTile title="Score Pedestals" subtitle="Global Frame 2100" number="S05" width={mWidth} height={mHeight}>
            <Sequence from={-2100}>
              <PersianEditorialMasterV18 />
            </Sequence>
          </ContactTile>

          <ContactTile title="Institutional Crest" subtitle="Global Frame 2200" number="S06" width={mWidth} height={mHeight}>
            <Sequence from={-2200}>
              <PersianEditorialMasterV18 />
            </Sequence>
          </ContactTile>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: 12,
          fontSize: 14,
          color: '#64748B',
        }}
      >
        <div>HunterHill13 / Cinematic-Motion-Graphics-Agent-Skill-Plan • V18 Visual Review Package</div>
        <div>All text strictly 100% source-authorized • Zero diacritical leakage in display strings</div>
      </div>
    </AbsoluteFill>
  );
};
