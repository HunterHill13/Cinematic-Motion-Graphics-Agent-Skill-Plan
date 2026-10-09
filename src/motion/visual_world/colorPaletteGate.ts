/**
 * ============================================================================
 * MANDATORY COLOR PALETTE SELECTION GATE (GATE 0.5)
 * ============================================================================
 * 
 * Mandates topic-tailored, cohesive chromatic art direction:
 * 1. Proposes 3 domain-tailored color palettes (e.g. Bio-Emerald, Neon Obsidian, Cyber Amber)
 *    plus user custom write-in.
 * 2. Visual World, Lighting, Materials, Conduits, and HUD strictly inherit
 *    the selected chromatic DNA across all acts.
 * ============================================================================
 */

export interface ColorPalette {
  id: string;
  name: string;
  description: string;
  background: string;
  surface: string;
  primaryGlow: string;
  accent: string;
  secondary: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
}

export const CURATED_COLOR_PALETTES: Record<string, ColorPalette[]> = {
  biotech_medical: [
    {
      id: 'deep_emerald_cyber_gold',
      name: 'Deep Emerald & Cyber Gold',
      description: 'Advanced biomedical & scientific research: Deep emerald obsidian, bio-luminescent glow, and calibration amber-gold.',
      background: '#021a14',
      surface: 'rgba(2, 44, 34, 0.75)',
      primaryGlow: '#10b981',
      accent: '#f59e0b',
      secondary: '#06b6d4',
      textPrimary: '#f0fdf4',
      textSecondary: '#6ee7b7',
      border: 'rgba(16, 185, 129, 0.25)',
    },
    {
      id: 'clinical_cyan_clean',
      name: 'Clinical Cyan & Pure Silver',
      description: 'Sterile high-precision diagnostics: Crisp cyan lasers, pharmaceutical white, and deep ocean slate.',
      background: '#031726',
      surface: 'rgba(15, 33, 55, 0.75)',
      primaryGlow: '#06b6d4',
      accent: '#38bdf8',
      secondary: '#6366f1',
      textPrimary: '#ffffff',
      textSecondary: '#94a3b8',
      border: 'rgba(56, 189, 248, 0.25)',
    },
    {
      id: 'biocell_magenta_violet',
      name: 'Bio-Cellular Neon Magenta',
      description: 'Molecular genetic sequencing: Vibrant cell magenta, deep purple void, and energetic gold.',
      background: '#190326',
      surface: 'rgba(38, 7, 56, 0.75)',
      primaryGlow: '#d946ef',
      accent: '#fbbf24',
      secondary: '#8b5cf6',
      textPrimary: '#fdf4ff',
      textSecondary: '#f0abfc',
      border: 'rgba(217, 70, 239, 0.25)',
    },
  ],
  ai_tech_future: [
    {
      id: 'midnight_obsidian_cyan',
      name: 'Midnight Obsidian & Electric Cyan',
      description: 'Claude Opus 5.5 and Linear dark aesthetic: Deep slate void, electric cyan pulses, and neon violet conduits.',
      background: '#020617',
      surface: 'rgba(15, 23, 42, 0.8)',
      primaryGlow: '#38bdf8',
      accent: '#818cf8',
      secondary: '#a855f7',
      textPrimary: '#f8fafc',
      textSecondary: '#94a3b8',
      border: 'rgba(255, 255, 255, 0.12)',
    },
    {
      id: 'cyberpunk_amber_slate',
      name: 'Cyberpunk Amber & Carbon Black',
      description: 'High-contrast industrial AI: Carbon black matte, high-heat amber neon, and laser yellow alerts.',
      background: '#0c0a09',
      surface: 'rgba(28, 25, 23, 0.8)',
      primaryGlow: '#f59e0b',
      accent: '#eab308',
      secondary: '#f97316',
      textPrimary: '#fef3c7',
      textSecondary: '#a8a29e',
      border: 'rgba(245, 158, 11, 0.25)',
    },
    {
      id: 'quantum_emerald_matrix',
      name: 'Quantum Emerald & Deep Gold',
      description: 'Next-gen algorithmic compute: Deep forest obsidian, crystalline matrix green, and sovereign gold seal.',
      background: '#021810',
      surface: 'rgba(4, 38, 26, 0.8)',
      primaryGlow: '#10b981',
      accent: '#fbbf24',
      secondary: '#14b8a6',
      textPrimary: '#ecfdf5',
      textSecondary: '#a7f3d0',
      border: 'rgba(16, 185, 129, 0.25)',
    },
  ],
};

export function proposeColorPalettes(domainOrTopic: string): ColorPalette[] {
  const lower = domainOrTopic.toLowerCase();
  if (lower.includes('medical') || lower.includes('bio') || lower.includes('پزشک') || lower.includes('درمان') || lower.includes('ژن')) {
    return CURATED_COLOR_PALETTES.biotech_medical;
  }
  return CURATED_COLOR_PALETTES.ai_tech_future;
}
