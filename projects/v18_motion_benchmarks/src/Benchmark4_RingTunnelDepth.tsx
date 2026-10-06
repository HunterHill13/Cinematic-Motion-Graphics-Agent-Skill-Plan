import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { executeRingTunnel } from '../../../src/motion/recipes/RingTunnelRecipe';
import { executeCameraPushPull } from '../../../src/motion/recipes/CameraPushPullRecipe';
import { AutoFitText } from '../../../src/motion/recipes/AutoFitTextRecipe';

/**
 * BENCHMARK 4: Spatial Ring Tunnel & Depth Parallax
 * Demonstrates:
 * 1. RingTunnel concentric spatial expansion.
 * 2. Camera slow-push driving deep focus into core threshold.
 * 3. Zero 3D engine/WebGL overhead while delivering cinematic camera depth.
 */
export const Benchmark4_RingTunnelDepth: React.FC = () => {
  const frame = useCurrentFrame();

  const camera = executeCameraPushPull(frame, 0, 120, 'slow-push');
  const tunnel = executeRingTunnel(frame, 0, 6, 45, 650);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07090E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 60,
        direction: 'rtl',
        fontFamily: 'Vazirmatn, system-ui, sans-serif',
        overflow: 'hidden',
        transform: `scale(${camera.scale})`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 80,
          right: 80,
          color: '#94A3B8',
          fontSize: 18,
          borderRight: '3px solid #6366F1',
          paddingRight: 12,
          zIndex: 200,
        }}
      >
        BENCHMARK 04 // SPATIAL DEPTH TUNNEL & CAMERA DYNAMICS
      </div>

      {/* Concentric Rings Tunnel SVG */}
      <svg
        width="1000"
        height="1000"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        {tunnel.rings.map((ring, idx) => (
          <circle
            key={idx}
            cx="500"
            cy="500"
            r={ring.radius}
            fill="none"
            stroke="#6366F1"
            strokeWidth={ring.strokeWidth}
            opacity={ring.opacity}
          />
        ))}

        {/* Central Convergent Core */}
        <circle
          cx="500"
          cy="500"
          r="48"
          fill="#1E1B4B"
          stroke="#818CF8"
          strokeWidth="2.5"
          opacity={tunnel.centerFocalOpacity}
        />
        <circle
          cx="500"
          cy="500"
          r="12"
          fill="#A5B4FC"
          opacity={tunnel.centerFocalOpacity}
        />
      </svg>

      {/* Core Typographic Label */}
      <div
        style={{
          position: 'relative',
          zIndex: 250,
          textAlign: 'center',
          marginTop: 240,
          opacity: tunnel.centerFocalOpacity,
        }}
      >
        <AutoFitText
          text="کاوش ساختاری در ریزمحیط تومور"
          maxFontSize={32}
          color="#F8FAFC"
          textAlign="center"
          dir="rtl"
        />
        <AutoFitText
          text="عمق‌سنجی نانومتری و تحلیل فضایی سلول‌ها"
          maxFontSize={20}
          color="#94A3B8"
          textAlign="center"
          dir="rtl"
          style={{ marginTop: 8 }}
        />
      </div>
    </AbsoluteFill>
  );
};
