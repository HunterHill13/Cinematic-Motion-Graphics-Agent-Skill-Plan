import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Benchmark1_KineticTypeSlam } from './Benchmark1_KineticTypeSlam';
import { Benchmark2_DotToLineRibbon } from './Benchmark2_DotToLineRibbon';
import { Benchmark3_ShapeMorphToChart } from './Benchmark3_ShapeMorphToChart';
import { Benchmark4_RingTunnelDepth } from './Benchmark4_RingTunnelDepth';
import { Benchmark5_ClichéVsCinematic } from './Benchmark5_ClichéVsCinematic';
import { PersianEditorialMasterV18 } from '../../persian_editorial_motion_test_v18/src/PersianEditorialMasterV18';

interface MotionCellProps {
  label: string;
  sub: string;
  width: number;
  height: number;
  children: React.ReactNode;
}

const MotionCell: React.FC<MotionCellProps> = ({ label, sub, width, height, children }) => {
  const scale = width / 1920;
  return (
    <div
      style={{
        width,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#0E131F',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 12px',
          backgroundColor: '#161F33',
          fontFamily: 'system-ui, sans-serif',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
        }}
      >
        <span style={{ color: '#D4AF37', fontWeight: 800, fontSize: 13 }}>{label}</span>
        <span style={{ color: '#94A3B8', fontSize: 12 }}>{sub}</span>
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

interface GridSheetProps {
  title: string;
  benchmarkId: string;
  frames: { f: number; phase: string }[];
  renderComponent: (frame: number) => React.ReactNode;
  cols?: number;
}

const GridMotionSheet: React.FC<GridSheetProps> = ({
  title,
  benchmarkId,
  frames,
  renderComponent,
  cols = 3,
}) => {
  const cellWidth = cols === 3 ? 580 : 440;
  const cellHeight = Math.round(cellWidth * (1080 / 1920));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        color: '#FFFFFF',
        fontFamily: 'system-ui, sans-serif',
        padding: '30px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid rgba(212, 175, 55, 0.4)',
          paddingBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 14, color: '#D4AF37', fontWeight: 700, letterSpacing: '0.08em' }}>
            V18 MOTION SAMPLING AUDIT • {benchmarkId}
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: '4px 0 0 0', color: '#F8FAFC' }}>
            {title}
          </h1>
        </div>
        <div style={{ textAlign: 'right', fontSize: 13, color: '#94A3B8' }}>
          <div>Sample Count: {frames.length} Temporal Slices</div>
          <div>Sampling Density: ~10-15 frame intervals</div>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
          justifyContent: 'center',
          alignItems: 'center',
          margin: '14px 0',
        }}
      >
        {frames.map((item, idx) => (
          <MotionCell
            key={idx}
            label={`Frame ${item.f}`}
            sub={`t = ${(item.f / 30).toFixed(2)}s • ${item.phase}`}
            width={cellWidth}
            height={cellHeight}
          >
            <Sequence from={-item.f}>
              {renderComponent(item.f)}
            </Sequence>
          </MotionCell>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: 10,
          fontSize: 13,
          color: '#64748B',
        }}
      >
        <div>Anti-Cliché Discipline: 0 Frosted Blur, 0 Neon Clichés, Pure Spring Dynamics</div>
        <div>Remotion Vector Engine Output</div>
      </div>
    </AbsoluteFill>
  );
};

// ==================== B1: KINETIC TYPE SLAM ====================
export const V18MotionSheetB1: React.FC = () => {
  const frames = [
    { f: 0, phase: 'Initial Rest' },
    { f: 12, phase: 'Elastic Launch' },
    { f: 24, phase: 'Deceleration' },
    { f: 36, phase: 'Peak Horizon' },
    { f: 45, phase: 'Kinetic Slam' },
    { f: 56, phase: 'Shockwave Squash' },
    { f: 72, phase: 'Spring Settle' },
    { f: 90, phase: 'Equilibrium' },
    { f: 115, phase: 'Stable Hold' },
  ];
  return (
    <GridMotionSheet
      title="Benchmark 1 — Kinetic Typography Slam (120f)"
      benchmarkId="B1 MOTION BREAKDOWN"
      frames={frames}
      renderComponent={() => <Benchmark1_KineticTypeSlam />}
    />
  );
};

// ==================== B2: DOT TO LINE TO RIBBON ====================
export const V18MotionSheetB2: React.FC = () => {
  const frames = [
    { f: 0, phase: 'Zero State' },
    { f: 15, phase: 'Point Emergence' },
    { f: 28, phase: 'Anticipation Squash' },
    { f: 42, phase: 'Dot Extrusion' },
    { f: 56, phase: 'Line Evolution' },
    { f: 70, phase: 'Ribbon Unfurl' },
    { f: 85, phase: 'Wave Undulation' },
    { f: 100, phase: 'Harmonic Flow' },
    { f: 118, phase: 'Vector Anchor' },
  ];
  return (
    <GridMotionSheet
      title="Benchmark 2 — Dot → Line → Ribbon Geometric Evolution (120f)"
      benchmarkId="B2 MOTION BREAKDOWN"
      frames={frames}
      renderComponent={() => <Benchmark2_DotToLineRibbon />}
    />
  );
};

// ==================== B3: SHAPE MORPH TO CHART ====================
export const V18MotionSheetB3: React.FC = () => {
  const frames = [
    { f: 0, phase: 'Circle Primitive' },
    { f: 18, phase: 'Polygon Torsion' },
    { f: 36, phase: 'Diamond Morph' },
    { f: 52, phase: 'Fission Preparation' },
    { f: 68, phase: 'Data Axis Bloom' },
    { f: 82, phase: 'Columns Elevation' },
    { f: 95, phase: 'Metric Counter Strike' },
    { f: 108, phase: 'Secondary Damping' },
    { f: 118, phase: 'Architectural Lock' },
  ];
  return (
    <GridMotionSheet
      title="Benchmark 3 — Shape Morph to Data Chart Bar (120f)"
      benchmarkId="B3 MOTION BREAKDOWN"
      frames={frames}
      renderComponent={() => <Benchmark3_ShapeMorphToChart />}
    />
  );
};

// ==================== B4: RING TUNNEL DEPTH ====================
export const V18MotionSheetB4: React.FC = () => {
  const frames = [
    { f: 0, phase: 'Center Seed' },
    { f: 15, phase: 'Initial Pulse' },
    { f: 30, phase: 'Ring 1 Expansion' },
    { f: 48, phase: 'Concentric Wave 2' },
    { f: 64, phase: 'Perspective Depth' },
    { f: 80, phase: 'Spatial Tunneling' },
    { f: 94, phase: 'Focal Pull-Back' },
    { f: 108, phase: 'Ambient Decay' },
    { f: 118, phase: 'Resonant Stillness' },
  ];
  return (
    <GridMotionSheet
      title="Benchmark 4 — Ring Tunnel Spatial Perspective Depth (120f)"
      benchmarkId="B4 MOTION BREAKDOWN"
      frames={frames}
      renderComponent={() => <Benchmark4_RingTunnelDepth />}
    />
  );
};

// ==================== B5: CLICHE VS CINEMATIC ====================
export const V18MotionSheetB5: React.FC = () => {
  const frames = [
    { f: 0, phase: 'Split Stage Entry' },
    { f: 20, phase: 'Blur vs Solid' },
    { f: 40, phase: 'Halos vs Specular' },
    { f: 60, phase: 'Card Soup vs Monolith' },
    { f: 75, phase: 'Equal Progress Scan' },
    { f: 95, phase: 'Material Comparison' },
    { f: 115, phase: 'Typography Restraint' },
    { f: 130, phase: 'Atmospheric Discipline' },
    { f: 148, phase: 'Final Editorial Proof' },
  ];
  return (
    <GridMotionSheet
      title="Benchmark 5 — Cliché vs Cinematic Split Screen (150f)"
      benchmarkId="B5 MOTION BREAKDOWN"
      frames={frames}
      renderComponent={() => <Benchmark5_ClichéVsCinematic />}
    />
  );
};

// ==================== MASTER EDITORIAL NARRATIVE ====================
export const V18MotionSheetMaster: React.FC = () => {
  const frames = [
    { f: 30, phase: 'Shot 01 — Intro Mask Reveal' },
    { f: 234, phase: 'Shot 01 — Hero Keyword Strike' },
    { f: 365, phase: 'T1 — Underline Handoff' },
    { f: 450, phase: 'Shot 02 — Decree Monolith Seal' },
    { f: 650, phase: 'T2 — Symmetric Fission' },
    { f: 855, phase: 'Shot 03 — GPA 16 Milestone Lock' },
    { f: 1215, phase: 'Shot 03 — 6 Articles Activity Lock' },
    { f: 1465, phase: 'T3 — Axis Collapse Handoff' },
    { f: 1575, phase: 'Shot 04 — Calendar Barrier Collision' },
    { f: 1914, phase: 'Shot 05 — Bachelor 65 Elevation' },
    { f: 2100, phase: 'Shot 05 — PhD 130 Peak Pedestal' },
    { f: 2200, phase: 'Shot 06 — Heraldic Crest Resolve' },
  ];
  return (
    <GridMotionSheet
      title="Persian Editorial Master — 12-Frame Narrative Progression (2361f)"
      benchmarkId="MASTER NARRATIVE BREAKDOWN"
      frames={frames}
      cols={4}
      renderComponent={() => <PersianEditorialMasterV18 />}
    />
  );
};
