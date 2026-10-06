import React from 'react';
import { AbsoluteFill } from 'remotion';
import { V25_01_DotToLineFidelity } from './V25_01_DotToLineFidelity';
import { V25_02_HeavyImpact } from './V25_02_HeavyImpact';
import { V25_03_ElasticBounce } from './V25_03_ElasticBounce';
import { V25_04_RigidReconfiguration } from './V25_04_RigidReconfiguration';
import { V25_05_CircleStarMorph } from './V25_05_CircleStarMorph';
import { V25_06_LetterGeometryMorph } from './V25_06_LetterGeometryMorph';
import { V25_07_BarLineTransform } from './V25_07_BarLineTransform';
import { V25_08_RibbonTunnelMotion } from './V25_08_RibbonTunnelMotion';
import { V25_09_CameraThroughFidelity } from './V25_09_CameraThroughFidelity';
import { V25_10_KineticTypeSlam } from './V25_10_KineticTypeSlam';

/**
 * V25 — MOTION FIDELITY CONTACT SHEET (4K UHD 3840x2160)
 * Renders a 2x5 grid displaying all 10 V25 laboratory studies.
 */
export const V25_MotionContactSheet: React.FC = () => {
  const studies = [
    { id: 'V25.01', title: 'Dot to Line C1 Velocity', comp: <V25_01_DotToLineFidelity /> },
    { id: 'V25.02', title: 'Heavy Impact Kinematics', comp: <V25_02_HeavyImpact /> },
    { id: 'V25.03', title: 'Elastic Harmonic Bounce', comp: <V25_03_ElasticBounce /> },
    { id: 'V25.04', title: 'Rigid Reconfiguration', comp: <V25_04_RigidReconfiguration /> },
    { id: 'V25.05', title: 'Circle ↔ Star Morph', comp: <V25_05_CircleStarMorph /> },
    { id: 'V25.06', title: 'Letterform Geometry', comp: <V25_06_LetterGeometryMorph /> },
    { id: 'V25.07', title: 'Bar Chart to Curve', comp: <V25_07_BarLineTransform /> },
    { id: 'V25.08', title: 'Fluid Ribbon Tunnel', comp: <V25_08_RibbonTunnelMotion /> },
    { id: 'V25.09', title: 'Camera-Through Plunge', comp: <V25_09_CameraThroughFidelity /> },
    { id: 'V25.10', title: 'Coordinated Type Slam', comp: <V25_10_KineticTypeSlam /> },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#020306',
        display: 'flex',
        flexDirection: 'column',
        padding: 40,
        fontFamily: 'Vazirmatn, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid rgba(212, 175, 55, 0.4)',
          paddingBottom: 20,
          marginBottom: 30,
        }}
      >
        <div>
          <span
            style={{
              backgroundColor: '#D4AF37',
              color: '#020306',
              fontSize: 22,
              fontWeight: 900,
              padding: '4px 14px',
              borderRadius: 6,
              marginRight: 18,
            }}
          >
            V25 LABORATORY
          </span>
          <span style={{ color: '#F8FAFC', fontSize: 32, fontWeight: 900 }}>
            MOTION FIDELITY & VELOCITY CONTINUITY CONTACT SHEET (4K UHD)
          </span>
        </div>
        <div style={{ color: '#38BDF8', fontSize: 20, fontWeight: 600 }}>
          10 Focused Studies • Kinematic C0/C1/C2 Analysis
        </div>
      </div>

      {/* 2x5 Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: 20,
          flex: 1,
        }}
      >
        {studies.map((s, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#070A10',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: 8,
              padding: 12,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: '#F8FAFC',
                fontSize: 16,
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              <span>{s.title}</span>
              <span style={{ color: '#D4AF37' }}>{s.id}</span>
            </div>

            <div
              style={{
                flex: 1,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 4,
                border: '1px solid rgba(212,175,55,0.2)',
              }}
            >
              <div
                style={{
                  width: 1920,
                  height: 1080,
                  transform: 'scale(0.36)',
                  transformOrigin: 'top left',
                }}
              >
                {s.comp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
