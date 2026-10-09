import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { organicDrift2D } from './NoiseField';

export interface ParticleDriftProps {
  particleCount?: number;
  width?: number;
  height?: number;
  color?: string;
  maxSize?: number;
  driftSpeed?: number;
}

interface Particle {
  id: number;
  baseX: number;
  baseY: number;
  size: number;
  seed: number;
  opacity: number;
}

/**
 * ParticleDrift introduces subtle floating micro-matter/dust across the deep background,
 * maintaining vitality without cluttering primary subject hierarchy.
 */
export const ParticleDrift: React.FC<ParticleDriftProps> = ({
  particleCount = 28,
  width = 1920,
  height = 1080,
  color = 'rgba(255, 255, 255, 0.4)',
  maxSize = 3.5,
  driftSpeed = 1.0,
}) => {
  const frame = useCurrentFrame();

  const particles: Particle[] = useMemo(() => {
    const list: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      // Deterministic pseudo-random distribution
      const s = i * 193.13;
      const rx = (Math.sin(s) * 0.5 + 0.5) * width;
      const ry = (Math.cos(s * 1.3) * 0.5 + 0.5) * height;
      const sz = 1.0 + (Math.sin(s * 2.7) * 0.5 + 0.5) * (maxSize - 1.0);
      const op = 0.15 + (Math.sin(s * 0.9) * 0.5 + 0.5) * 0.35;
      list.push({ id: i, baseX: rx, baseY: ry, size: sz, seed: i * 31, opacity: op });
    }
    return list;
  }, [particleCount, width, height, maxSize]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => {
        const [dx, dy] = organicDrift2D(frame, {
          seed: p.seed,
          frequency: 0.012 * driftSpeed,
          amplitude: 25.0,
        });
        const x = (p.baseX + dx + frame * 0.2 * driftSpeed) % width;
        const y = (p.baseY + dy) % height;

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: color,
              opacity: p.opacity,
              filter: `blur(${p.size > 2.5 ? 1 : 0}px)`,
              willChange: 'transform',
            }}
          />
        );
      })}
    </div>
  );
};
