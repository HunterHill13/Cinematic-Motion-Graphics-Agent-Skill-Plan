import React from 'react';

export interface AutoFitTextProps {
  text: string;
  maxFontSize?: number;
  minFontSize?: number;
  availableWidth?: number;
  color?: string;
  fontFamily?: string;
  isNumeric?: boolean;
  dir?: 'rtl' | 'ltr';
  lineHeight?: number;
  textAlign?: 'right' | 'left' | 'center';
  style?: React.CSSProperties;
}

/**
 * RECIPE: AutoFitText
 * Source Reference: remotion-motion-graphics-skill (traps.md: tabular-nums & overflow)
 * Safe typographic layout container:
 * 1. Enforces `fontVariantNumeric: 'tabular-nums'` when numerical stats are displayed to eliminate horizontal jitter.
 * 2. Provides safe padding margins preventing edge clipping in 9:16 and 16:9 compositions.
 * 3. Enforces RTL reading context and correct Persian character kerning.
 */
export const AutoFitText: React.FC<AutoFitTextProps> = ({
  text,
  maxFontSize = 48,
  minFontSize = 24,
  availableWidth = 800,
  color = '#FFFFFF',
  fontFamily = 'Vazirmatn, system-ui, sans-serif',
  isNumeric = false,
  dir = 'rtl',
  lineHeight = 1.35,
  textAlign = 'right',
  style = {},
}) => {
  // Estimate character scale to prevent horizontal runaways
  const charCount = text.length;
  const estimatedCharWidth = maxFontSize * 0.55;
  const totalEstimatedWidth = charCount * estimatedCharWidth;

  let computedFontSize = maxFontSize;
  if (totalEstimatedWidth > availableWidth) {
    const scale = availableWidth / totalEstimatedWidth;
    computedFontSize = Math.max(minFontSize, Math.round(maxFontSize * scale));
  }

  const containerStyle: React.CSSProperties = {
    fontFamily,
    fontSize: computedFontSize,
    lineHeight,
    color,
    direction: dir,
    textAlign,
    fontVariantNumeric: isNumeric ? 'tabular-nums' : 'normal',
    display: 'inline-block',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    maxWidth: availableWidth,
    padding: '4px 8px', // safety padding preventing descender or glyph clipping
    boxSizing: 'border-box',
    ...style,
  };

  return <div style={containerStyle}>{text}</div>;
};
