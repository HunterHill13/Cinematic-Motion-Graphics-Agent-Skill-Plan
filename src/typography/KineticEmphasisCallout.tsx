/**
 * ============================================================================
 * KINETIC EMPHASIS CALLOUT & SELECTIVE KEYWORD HIGHLIGHT ENGINE
 * ============================================================================
 * 
 * Provides selective, high-impact motion graphics callouts for key moments
 * of narration (climax words, numerical milestones, explicit user tags)
 * without cluttering the screen with full-time subtitle captions.
 * 
 * DESIGN PRINCIPLES:
 * 1. Selective Sparsity: Only appears on moments of dramatic emphasis.
 * 2. Hybrid Extraction: Auto-detects milestones/keywords + parses explicit markdown (**word**, [word]).
 * 3. Template-Reactive Styling: Morphs its visual identity into each of the 9 master archetypes.
 * 4. Musical Quantization: Snaps reveal springs to the audio tempo grid (e.g. 150 BPM).
 * ============================================================================
 */

import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { TemplateId } from '../motion/templates/TemplateCatalog';
import { YEKAN_BAKH_FONT } from '../fonts/yekanBakh';

export type EmphasisType = 'keyword' | 'number_milestone' | 'tag' | 'action';

export interface EmphasisToken {
  text: string;
  type: EmphasisType;
  startFrame: number;
  durationInFrames: number;
  position?: 'center' | 'top_right' | 'bottom_center' | 'floating_hero';
  customColor?: string;
}

/**
 * Extracts emphasis tokens from narration script using hybrid parsing:
 * 1. Explicit user tags: **کلمه**, [کلمه], «کلمه»
 * 2. Automatic numerical milestones: ۱۰۰٪, 10x, ۵۰ هزار, 99.9%
 * 3. Domain climax keywords: هوش مصنوعی, بحرانی, شتاب, ژنتیک, سودآوری, etc.
 */
export function extractEmphasisTokens(
  script: string,
  totalFrames: number,
  fps: number = 30
): EmphasisToken[] {
  const tokens: EmphasisToken[] = [];

  // 1. Explicit Markdown / Tagged matches: **word** or [word] or «word»
  const explicitRegex = /(\*\*|\[|«)(.*?)(\*\*|\]|»)/g;
  let match;
  while ((match = explicitRegex.exec(script)) !== null) {
    const rawWord = match[2].trim();
    if (rawWord.length > 0) {
      // Space them out proportionally across the script
      const ratio = match.index / Math.max(1, script.length);
      const startFrame = Math.round(ratio * (totalFrames - 60));
      tokens.push({
        text: rawWord,
        type: 'tag',
        startFrame: Math.max(15, startFrame),
        durationInFrames: 60, // 2.0s hold
      });
    }
  }

  // 2. Numerical Milestones (percentages, multipliers, currency)
  const numberRegex = /([0-9۰-۹]+(?:\.[0-9۰-۹]+)?\s*(?:٪|%|برابر|x|درصد|K|M|میلیون|هزار|تومان|دلار))/gi;
  while ((match = numberRegex.exec(script)) !== null) {
    const rawNum = match[1].trim();
    const ratio = match.index / Math.max(1, script.length);
    const startFrame = Math.round(ratio * (totalFrames - 60));

    // Avoid duplicate timestamp clashes
    const clashing = tokens.some((t) => Math.abs(t.startFrame - startFrame) < 40);
    if (!clashing) {
      tokens.push({
        text: rawNum,
        type: 'number_milestone',
        startFrame: Math.max(20, startFrame),
        durationInFrames: 55,
      });
    }
  }

  // 3. Domain Climax Keywords (if fewer than 3 tokens exist)
  if (tokens.length < 3) {
    const climaxKeywords = [
      'هوش مصنوعی',
      'معماری',
      'شتاب',
      'کوانتوم',
      'انقلاب',
      'بحرانی',
      'پایداری',
      'ژنتیک',
      'تغییر',
      'سرعت',
      'دقت',
      'سودآوری',
    ];

    for (const kw of climaxKeywords) {
      const idx = script.indexOf(kw);
      if (idx !== -1) {
        const ratio = idx / Math.max(1, script.length);
        const startFrame = Math.round(ratio * (totalFrames - 60));
        const clashing = tokens.some((t) => Math.abs(t.startFrame - startFrame) < 45);
        if (!clashing) {
          tokens.push({
            text: kw,
            type: 'keyword',
            startFrame: Math.max(25, startFrame),
            durationInFrames: 50,
          });
          if (tokens.length >= 4) break;
        }
      }
    }
  }

  return tokens.sort((a, b) => a.startFrame - b.startFrame);
}

export interface KineticEmphasisCalloutProps {
  token: EmphasisToken;
  templateId: TemplateId;
  bpm?: number;
}

/**
 * High-Impact Kinetic Emphasis Callout Component
 */
export const KineticEmphasisCallout: React.FC<KineticEmphasisCalloutProps> = ({
  token,
  templateId,
  bpm = 150,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Local frame relative to token start
  const relFrame = frame - token.startFrame;
  if (relFrame < 0 || relFrame > token.durationInFrames) {
    return null;
  }

  // Quantized entrance spring (overshoot pop)
  const enterSpring = spring({
    frame: relFrame,
    fps,
    config: {
      damping: templateId === 'NEO_BRUTALIST' ? 8 : 12,
      stiffness: templateId === 'NEO_BRUTALIST' ? 220 : 180,
      mass: 0.8,
    },
  });

  // Dissolve exit during last 12 frames
  const exitProgress = interpolate(
    relFrame,
    [token.durationInFrames - 12, token.durationInFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const opacity = (1 - exitProgress) * Math.min(1, enterSpring * 1.5);
  const scale = enterSpring * (1 + 0.05 * Math.sin((relFrame / fps) * Math.PI * 2));
  const exitTranslateY = exitProgress * -15;

  // Template-Reactive Styling Manifest
  const getStyleManifest = () => {
    switch (templateId) {
      case 'NEO_BRUTALIST':
        return {
          background: '#ffe600',
          color: '#000000',
          border: '4px solid #000000',
          boxShadow: '8px 8px 0px #000000',
          borderRadius: '4px',
          padding: '12px 32px',
          fontSize: 38,
          fontWeight: 900,
          letterSpacing: '-0.5px',
          badgeText: '★ PUNCH',
          badgeBg: '#ff3366',
          badgeColor: '#ffffff',
          rotation: (relFrame % 2 === 0 ? -1.5 : 1.5),
        };
      case 'DARK_GRAPHITE_TECH':
        return {
          background: 'rgba(10, 15, 26, 0.85)',
          color: '#00f2fe',
          border: '1px solid rgba(0, 242, 254, 0.6)',
          boxShadow: '0 0 25px rgba(0, 242, 254, 0.35), inset 0 0 15px rgba(0, 242, 254, 0.1)',
          borderRadius: '12px',
          padding: '10px 28px',
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: '0px',
          badgeText: 'SYS // EMPHASIS',
          badgeBg: 'rgba(6, 182, 212, 0.2)',
          badgeColor: '#38bdf8',
          rotation: 0,
        };
      case 'TECHNICAL_BLUEPRINT':
        return {
          background: 'rgba(5, 20, 40, 0.9)',
          color: '#00e5ff',
          border: '1px dashed #00e5ff',
          boxShadow: '0 0 20px rgba(0, 229, 255, 0.25)',
          borderRadius: '0px',
          padding: '10px 26px',
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: '1px',
          badgeText: 'SPEC // REF.01',
          badgeBg: '#00e5ff',
          badgeColor: '#051428',
          rotation: 0,
        };
      case 'STOP_MOTION_PAPER':
        return {
          background: '#faf6eb',
          color: '#3b2f20',
          border: '1px solid #d4c5a9',
          boxShadow: '4px 6px 12px rgba(60, 45, 20, 0.18)',
          borderRadius: '2px',
          padding: '12px 30px',
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: '0px',
          badgeText: 'نکته کلیدی',
          badgeBg: '#d9534f',
          badgeColor: '#ffffff',
          rotation: -2,
        };
      case 'FINTECH_TRADING':
        return {
          background: 'rgba(6, 20, 16, 0.92)',
          color: '#00e676',
          border: '1px solid #00e676',
          boxShadow: '0 0 30px rgba(0, 230, 118, 0.35)',
          borderRadius: '8px',
          padding: '10px 28px',
          fontSize: 36,
          fontWeight: 900,
          letterSpacing: '0px',
          badgeText: '+▲ DELTA CORE',
          badgeBg: '#00e676',
          badgeColor: '#05140f',
          rotation: 0,
        };
      case 'QUANTUM_BIO_DEEP_Z':
        return {
          background: 'rgba(13, 20, 36, 0.88)',
          color: '#10b981',
          border: '1px solid rgba(16, 185, 129, 0.5)',
          boxShadow: '0 0 35px rgba(16, 185, 129, 0.4), inset 0 0 20px rgba(139, 92, 246, 0.2)',
          borderRadius: '20px',
          padding: '12px 32px',
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: '0px',
          badgeText: 'BIOMETRIC PULSE',
          badgeBg: 'rgba(16, 185, 129, 0.2)',
          badgeColor: '#a7f3d0',
          rotation: 0,
        };
      default: // CONTINUOUS_UI_MORPH, BENTO_GRID_SAAS, KINETIC_ARCHITECTURAL_TYPO
        return {
          background: 'rgba(255, 255, 255, 0.12)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45)',
          borderRadius: '16px',
          padding: '12px 32px',
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: '0px',
          badgeText: 'HIGHLIGHT',
          badgeBg: 'rgba(255, 255, 255, 0.2)',
          badgeColor: '#ffffff',
          rotation: 0,
        };
    }
  };

  const manifest = getStyleManifest();

  return (
    <div
      style={{
        position: 'absolute',
        top: 80,
        left: '50%',
        transform: `translateX(-50%) translateY(${exitTranslateY}px) scale(${scale}) rotate(${manifest.rotation}deg)`,
        transformOrigin: 'center center',
        opacity,
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: YEKAN_BAKH_FONT,
        direction: 'rtl',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          background: manifest.background,
          border: manifest.border,
          boxShadow: manifest.boxShadow,
          borderRadius: manifest.borderRadius,
          padding: manifest.padding,
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Telemetry pill tag */}
        <span
          style={{
            fontSize: 13,
            fontWeight: 800,
            background: manifest.badgeBg,
            color: manifest.badgeColor,
            padding: '3px 9px',
            borderRadius: templateId === 'NEO_BRUTALIST' ? '2px' : '6px',
            letterSpacing: '0.5px',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
          }}
        >
          {manifest.badgeText}
        </span>

        {/* Highlighted text */}
        <span
          style={{
            fontSize: manifest.fontSize,
            fontWeight: manifest.fontWeight,
            color: manifest.color,
            lineHeight: 1.2,
          }}
        >
          {token.text}
        </span>
      </div>
    </div>
  );
};
