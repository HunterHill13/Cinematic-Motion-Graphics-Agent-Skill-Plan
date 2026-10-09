import React from 'react';
import { theme } from '../theme';

export interface CardProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  hero?: boolean;
  style?: React.CSSProperties;
}

/**
 * Card / Surface primitive with controlled rim border and hero glow.
 */
export const Card: React.FC<CardProps> = ({
  children,
  width,
  height,
  hero = false,
  style,
}) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: hero ? theme.colors.surfaceElevated : theme.colors.surface,
        borderRadius: 16,
        border: `1.5px solid ${hero ? theme.colors.hero : theme.colors.border}`,
        boxShadow: hero
          ? `0 0 50px ${theme.colors.heroGlow}, 0 20px 40px rgba(0,0,0,0.4)`
          : '0 10px 30px rgba(0,0,0,0.3)',
        padding: '24px 32px',
        overflow: 'hidden',
        position: 'relative',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export interface BadgeProps {
  label: string;
  variant?: 'hero' | 'accent' | 'alert' | 'muted';
  style?: React.CSSProperties;
}

/**
 * Semantic Badge / Tag primitive.
 */
export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'hero',
  style,
}) => {
  let bg = theme.colors.heroGlow;
  let text = theme.colors.hero;
  let border = theme.colors.hero;

  if (variant === 'accent') {
    bg = 'rgba(16, 185, 129, 0.2)';
    text = theme.colors.accent;
    border = theme.colors.accent;
  } else if (variant === 'alert') {
    bg = 'rgba(239, 68, 68, 0.2)';
    text = theme.colors.alert || '#EF4444';
    border = theme.colors.alert || '#EF4444';
  } else if (variant === 'muted') {
    bg = 'rgba(148, 163, 184, 0.1)';
    text = theme.colors.textMuted;
    border = theme.colors.border;
  }

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 14px',
        borderRadius: 999,
        fontSize: 16,
        fontWeight: 600,
        fontFamily: theme.fonts.display,
        letterSpacing: '0.04em',
        backgroundColor: bg,
        color: text,
        border: `1px solid ${border}`,
        ...style,
      }}
    >
      {label}
    </span>
  );
};
