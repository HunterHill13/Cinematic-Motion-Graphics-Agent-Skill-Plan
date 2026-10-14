import React from 'react';
import { interpolate } from 'remotion';
import { executeStandardSpring } from '../motion/physics/SpringPhysicsMatrix';
import { sanitizeForDisplay } from './persianSanitizer';

export type KineticTextMode = 'curtain' | 'flip3d' | 'pop' | 'skew';

export interface SemanticHighlightCue {
  word: string;
  startFrame: number;
  endFrame: number;
  accentColor?: string;
  glowRadius?: number;
}

export interface PersianKineticTextProps {
  text: string;
  frame: number;
  fps?: number;
  startFrame?: number;
  mode?: KineticTextMode;
  staggerFrames?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  backgroundColor?: string;
  boxShadow?: string;
  lineHeight?: number;
  alignCenter?: boolean;
  semanticHighlights?: SemanticHighlightCue[];
  style?: React.CSSProperties;
}

/**
 * PersianKineticText:
 * High-impact, Persian-safe word-level kinetic typography reveal component.
 * 
 * LINGUISTIC CRAFT INVARIANT:
 * Persian is a cursive script where letters connect through contextual ligatures.
 * Splitting text character-by-character (`text.split('')`) irreparably destroys ligatures.
 * This component decomposes text STRICTLY into whole words, applying granular staggered
 * spring physics, vertical masks, and 3D tilts without breaking cursive continuity.
 */
export const PersianKineticText: React.FC<PersianKineticTextProps> = ({
  text,
  frame,
  fps = 30,
  startFrame = 0,
  mode = 'curtain',
  staggerFrames = 2.5,
  fontSize = 52,
  fontWeight = 900,
  color = '#ffffff',
  backgroundColor,
  boxShadow,
  lineHeight = 1.35,
  alignCenter = false,
  semanticHighlights,
  style,
}) => {
  const sanitized = sanitizeForDisplay(text);
  const words = sanitized.trim().split(/\s+/).filter(Boolean);
  const localFrame = Math.max(0, frame - startFrame);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: alignCenter ? 'center' : 'flex-end',
        alignItems: 'center',
        direction: 'rtl',
        gap: '0.28em',
        perspective: 900,
        WebkitFontSmoothing: 'antialiased',
        ...style,
      }}
    >
      {words.map((word, wordIdx) => {
        const delay = Math.round(wordIdx * staggerFrames);
        const presetKey =
          mode === 'pop'
            ? 'ELASTIC_POP_SLAM'
            : 'TYPOGRAPHY_WORD_STAGGER';

        const progress = executeStandardSpring(localFrame, fps, presetKey, delay);
        const clampedP = Math.min(1, Math.max(0, progress));

        let wordTransform = '';
        let clipPath: string | undefined = undefined;

        switch (mode) {
          case 'curtain': {
            const hiddenInset = Math.round((1 - clampedP) * 100);
            clipPath = `inset(0% 0% ${hiddenInset}% 0%)`;
            const riseY = Math.round((1 - progress) * 44);
            wordTransform = `translate3d(0px, ${riseY}px, 0px)`;
            break;
          }
          case 'flip3d': {
            const flipX = Number(((1 - progress) * -78).toFixed(1));
            const shiftY = Math.round((1 - progress) * 24);
            wordTransform = `translate3d(0px, ${shiftY}px, 0px) rotateX(${flipX}deg)`;
            break;
          }
          case 'pop': {
            const popScale = Number(interpolate(progress, [0, 1], [1.5, 1.0]).toFixed(2));
            wordTransform = `translate3d(0px, 0px, 0px) scale(${popScale})`;
            break;
          }
          case 'skew': {
            const slideX = Math.round((1 - clampedP) * (wordIdx % 2 === 0 ? 80 : -80));
            const skewDeg = Number(((1 - clampedP) * -16).toFixed(1));
            wordTransform = `translate3d(${slideX}px, 0px, 0px) skewX(${skewDeg}deg)`;
            break;
          }
        }

        // Voice-synced semantic keyword illumination
        const cleanWord = word.replace(/[،؛.؟!]/g, '').trim();
        const highlightCue = semanticHighlights?.find((cue) => {
          const cueClean = cue.word.replace(/[،؛.؟!]/g, '').trim();
          return cueClean === cleanWord || word.includes(cueClean);
        });

        const isHighlightActive = Boolean(
          highlightCue &&
          frame >= highlightCue.startFrame &&
          frame <= highlightCue.endFrame
        );
        const isHighlightPast = Boolean(
          highlightCue &&
          frame > highlightCue.endFrame
        );

        const highlightProgress = isHighlightActive
          ? interpolate(
              frame,
              [highlightCue!.startFrame, highlightCue!.startFrame + 4],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            )
          : 0;

        const effectiveColor = isHighlightActive
          ? (highlightCue?.accentColor || '#38BDF8')
          : isHighlightPast
          ? '#FFFFFF'
          : color;

        const effectiveGlow = isHighlightActive
          ? `0 0 ${highlightCue?.glowRadius || 24}px ${highlightCue?.accentColor || '#38BDF8'}`
          : undefined;

        const highlightScale = isHighlightActive ? 1.0 + highlightProgress * 0.05 : 1.0;
        const finalTransform = highlightScale !== 1.0 ? `${wordTransform} scale(${highlightScale})` : wordTransform;

        const opacity = Math.min(1, progress * 1.35);

        return (
          <span
            key={wordIdx}
            style={{
              display: 'inline-block',
              position: 'relative',
              overflow: mode === 'curtain' ? 'hidden' : 'visible',
              fontSize,
              fontWeight,
              color: effectiveColor,
              textShadow: effectiveGlow,
              lineHeight,
              backgroundColor,
              boxShadow,
              padding: backgroundColor ? '4px 14px' : undefined,
              borderRadius: backgroundColor ? 4 : undefined,
              clipPath,
              transform: finalTransform,
              opacity,
              backfaceVisibility: 'hidden',
              transition: 'color 0.15s ease, text-shadow 0.15s ease',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
