/**
 * Centralized Design Token Engine
 * Governs Color, Typography, Spring/Easing Curves, and Layout Safe Zones.
 * No component should invent its own isolated palette.
 */

export interface ThemePalette {
  base: string;
  surface: string;
  surfaceElevated: string;
  hero: string;
  heroGlow: string;
  accent: string;
  text: string;
  textMuted: string;
  border: string;
  alert?: string;
}

export const PALETTES: Record<string, ThemePalette> = {
  // Scientific / Medical Explainer (Deep navy/cyan/emerald)
  medicalBio: {
    base: '#070B14',
    surface: '#0E1726',
    surfaceElevated: '#17253B',
    hero: '#06B6D4', // Cyan
    heroGlow: 'rgba(6, 182, 212, 0.45)',
    accent: '#10B981', // Emerald
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    border: 'rgba(148, 163, 184, 0.2)',
    alert: '#EF4444',
  },
  // Dark Tech (Violet/Cyan)
  darkTech: {
    base: '#0A0A0F',
    surface: '#14141E',
    surfaceElevated: '#1F1F2E',
    hero: '#7C3AED', // Electric Purple
    heroGlow: 'rgba(124, 58, 237, 0.5)',
    accent: '#22D3EE', // Cyan
    text: '#F4F4F5',
    textMuted: '#A1A1AA',
    border: 'rgba(255, 255, 255, 0.12)',
    alert: '#F43F5E',
  },
  // Warm Editorial
  warmEditorial: {
    base: '#FAF7F2',
    surface: '#F2EDE4',
    surfaceElevated: '#E8E1D5',
    hero: '#D97757', // Clay
    heroGlow: 'rgba(217, 119, 87, 0.3)',
    accent: '#2563EB', // Cobalt
    text: '#1F1E1B',
    textMuted: '#716D66',
    border: 'rgba(31, 30, 27, 0.15)',
    alert: '#DC2626',
  },
  // Dark Minimalist (Deep Gray/Amber)
  warmPremium: {
    base: '#121110',
    surface: '#1C1A18',
    surfaceElevated: '#282522',
    hero: '#E8A33D', // Amber gold
    heroGlow: 'rgba(232, 163, 61, 0.4)',
    accent: '#F4E9DA',
    text: '#FDFBF7',
    textMuted: '#9C958C',
    border: 'rgba(244, 233, 218, 0.15)',
    alert: '#E11D48',
  },
};

export const theme = {
  colors: PALETTES.medicalBio, // Default to medical/science

  setPalette(name: keyof typeof PALETTES) {
    if (PALETTES[name]) {
      this.colors = PALETTES[name];
    }
  },

  fonts: {
    hero: "'Orbitron', 'Cabinet Grotesk', -apple-system, sans-serif",
    display: "'Exo 2', 'Clash Display', -apple-system, sans-serif",
    body: "'Noto Sans SC', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'Audiowide', 'JetBrains Mono', monospace",
  },

  typography: {
    heroSize: 100, // px for landscape 1920x1080
    sectionTitleSize: 56,
    bodySize: 34,
    captionSize: 44,
    hudSize: 26,
    trackingTight: '-0.03em',
    trackingWide: '0.08em',
    // Hard legibility absolute floors
    floors: {
      microTelemetry: 13,
      body: 16,
      subtitle: 24,
      cardHeader: 22,
      heroTitle: 36,
      kineticWord: 84,
    },
  },

  spring: {
    smooth: { damping: 18, stiffness: 90, mass: 0.9 },
    snappy: { damping: 14, stiffness: 140, mass: 0.7 },
    bouncy: { damping: 9, stiffness: 110, mass: 0.8 },
    heavy: { damping: 26, stiffness: 70, mass: 1.4 },
  },

  ease: {
    out: (t: number) => 1 - Math.pow(1 - t, 3),
    inOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    linear: (t: number) => t,
  },

  layout: {
    width: 1920,
    height: 1080,
    fps: 30,
    safeZoneVertical: 0.12, // 12% padding top/bottom
    safeZoneHorizontal: 0.08, // 8% padding left/right
  },
};
