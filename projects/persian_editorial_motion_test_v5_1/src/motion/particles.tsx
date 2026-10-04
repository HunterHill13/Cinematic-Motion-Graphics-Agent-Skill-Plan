/**
 * V5.1 Motion Primitives: Restrained Particle Accents
 * Implements Rule B17: Restrained, intentional particle atmospheres.
 */
import React from 'react';

export const GoldAtmosphereParticles: React.FC<{
  count?: number;
  frame?: number;
  speed?: number;
  opacity?: number;
}> = ({ count = 6, frame: passedFrame, speed = 0.35, opacity = 0.35 }) => {
  const currentFrame = passedFrame ?? 0;
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {Array.from({ length: count }).map((_, idx) => {
        const y = (idx * 170 + currentFrame * speed) % 1080;
        const x = (idx * 310 + 100) % 1920;
        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 4,
              height: 4,
              borderRadius: '50%',
              backgroundColor: '#F9E79F',
              boxShadow: '0 0 10px rgba(212, 175, 55, 0.6)',
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};

export const AtmosphereParticles = GoldAtmosphereParticles;

