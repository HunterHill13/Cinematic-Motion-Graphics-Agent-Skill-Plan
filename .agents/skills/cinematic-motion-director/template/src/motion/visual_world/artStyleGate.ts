/**
 * ============================================================================
 * MANDATORY ART DIRECTION & MULTI-STYLE SELECTION GATE (GATE 0.6)
 * ============================================================================
 * 
 * Enforces deliberate visual art direction across narrative acts:
 * 1. Proposes 5 curated art style paradigms (Modern Glassmorphic, Stop-Motion Paper,
 *    Painterly Watercolor, Technical Blueprint, Neo-Brutalist).
 * 2. Supports multi-style hybrid assignment:
 *    - Unified Global Style (all acts share identical art style).
 *    - Act-by-Act Dynamic Evolution (e.g. Act 1: Glass -> Act 2: Paper -> Act 3: Blueprint -> Act 4: Neo-Brutalist).
 * 3. Enforces aesthetic rendering shaders, frame-rate quantization (12 FPS for stop-motion),
 *    tactile edges, paper drop-shadows, and organic ink bleed.
 * ============================================================================
 */

export type ArtStyleId = 
  | 'MODERN_GLASSMORPHIC'
  | 'STOP_MOTION_PAPER'
  | 'PAINTERLY_WATERCOLOR'
  | 'TECHNICAL_BLUEPRINT'
  | 'NEO_BRUTALIST';

export interface ArtStyleDefinition {
  id: ArtStyleId;
  name: string;
  nameFa: string;
  description: string;
  fpsStyle: 'smooth_30fps' | 'stop_motion_12fps' | 'tactile_15fps';
  edgeStyle: 'clean_rounded' | 'torn_paper' | 'sketch_ink' | 'cad_crosshair' | 'brutal_sharp';
  shadowStyle: 'diffuse_blur' | 'layered_paper_stack' | 'ink_stain' | 'technical_none' | 'hard_offset_black';
  textureOverlay: 'subtle_noise' | 'paper_grain' | 'watercolor_wash' | 'blueprint_grid' | 'halftone_dots';
  cardCssTemplate: {
    background: string;
    backdropFilter?: string;
    border: string;
    boxShadow: string;
    borderRadius: string;
  };
}

export const APPROVED_ART_STYLES: Record<ArtStyleId, ArtStyleDefinition> = {
  MODERN_GLASSMORPHIC: {
    id: 'MODERN_GLASSMORPHIC',
    name: 'Modern Glassmorphic & 3D Flight',
    nameFa: 'مدرن گلس‌مورفیک و پرواز سه‌بعدی',
    description: 'High-end Claude Opus 5.5 and Linear dark aesthetic: Frosted glass, 3D perspective, luminous borders, and smooth spring physics.',
    fpsStyle: 'smooth_30fps',
    edgeStyle: 'clean_rounded',
    shadowStyle: 'diffuse_blur',
    textureOverlay: 'subtle_noise',
    cardCssTemplate: {
      background: 'rgba(2, 44, 34, 0.75)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
    },
  },
  STOP_MOTION_PAPER: {
    id: 'STOP_MOTION_PAPER',
    name: 'Stop-Motion Paper Cutout & Collage',
    nameFa: 'استاپ‌موشن برش کاغذ و کلاژ دستی',
    description: 'Tactile artisanal stop-motion: Stepped 12 FPS temporal judder, paper fiber textures, rough cut edges, and layered paper shadows.',
    fpsStyle: 'stop_motion_12fps',
    edgeStyle: 'torn_paper',
    shadowStyle: 'layered_paper_stack',
    textureOverlay: 'paper_grain',
    cardCssTemplate: {
      background: '#f8faf5',
      border: '2px solid rgba(16, 185, 129, 0.5)',
      boxShadow: '4px 6px 0px rgba(2, 26, 20, 0.6), 8px 12px 0px rgba(2, 26, 20, 0.25)',
      borderRadius: '6px',
    },
  },
  PAINTERLY_WATERCOLOR: {
    id: 'PAINTERLY_WATERCOLOR',
    name: 'Painterly Watercolor & Risograph',
    nameFa: 'نقاشی آبرنگی و چاپ دستی ریزوگراف',
    description: 'Expressive organic editorial: Halftone stipple dot patterns, watercolor ink bleed washes, and soft textured edges.',
    fpsStyle: 'tactile_15fps',
    edgeStyle: 'sketch_ink',
    shadowStyle: 'ink_stain',
    textureOverlay: 'watercolor_wash',
    cardCssTemplate: {
      background: 'rgba(254, 249, 231, 0.92)',
      border: '2px dashed rgba(245, 158, 11, 0.6)',
      boxShadow: '0 8px 32px rgba(245, 158, 11, 0.25)',
      borderRadius: '16px',
    },
  },
  TECHNICAL_BLUEPRINT: {
    id: 'TECHNICAL_BLUEPRINT',
    name: 'Technical Blueprint & Architectural CAD',
    nameFa: 'نقشه فنی مهندسی و دیاگرام معماری',
    description: 'Rigorous engineering precision: CAD drafting grid, cyan isometric calipers, monospace telemetry guides, and crosshair corners.',
    fpsStyle: 'smooth_30fps',
    edgeStyle: 'cad_crosshair',
    shadowStyle: 'technical_none',
    textureOverlay: 'blueprint_grid',
    cardCssTemplate: {
      background: 'rgba(3, 23, 38, 0.88)',
      backdropFilter: 'blur(10px)',
      border: '1.5px solid rgba(6, 182, 212, 0.8)',
      boxShadow: '0 0 25px rgba(6, 182, 212, 0.25), inset 0 0 15px rgba(6, 182, 212, 0.15)',
      borderRadius: '4px',
    },
  },
  NEO_BRUTALIST: {
    id: 'NEO_BRUTALIST',
    name: 'Neo-Brutalist & High-Contrast Editorial',
    nameFa: 'نئوبروتالیسم گرافیکی با کنتراست تند',
    description: 'High-voltage poster punch: Thick black outlines, un-blurred offset drop shadows (6px 6px #000), vibrant acid accents, and heavy typography.',
    fpsStyle: 'smooth_30fps',
    edgeStyle: 'brutal_sharp',
    shadowStyle: 'hard_offset_black',
    textureOverlay: 'halftone_dots',
    cardCssTemplate: {
      background: '#fef08a',
      border: '3.5px solid #021a14',
      boxShadow: '7px 7px 0px #021a14',
      borderRadius: '12px',
    },
  },
};

export interface MultiStyleAssignment {
  defaultStyle: ArtStyleId;
  actStyles: Record<string, ArtStyleId>;
}

export function resolveActArtStyle(
  assignment: MultiStyleAssignment,
  actId: string
): ArtStyleDefinition {
  const styleId = assignment.actStyles[actId] || assignment.defaultStyle;
  return APPROVED_ART_STYLES[styleId] || APPROVED_ART_STYLES.MODERN_GLASSMORPHIC;
}

export function quantizeFrameForStopMotion(frame: number, fpsStyle: ArtStyleDefinition['fpsStyle']): number {
  if (fpsStyle === 'stop_motion_12fps') {
    // Quantize 30fps to ~12-15fps by holding frames for 2-3 ticks
    return Math.floor(frame / 2) * 2;
  }
  if (fpsStyle === 'tactile_15fps') {
    return Math.floor(frame / 2) * 2;
  }
  return frame;
}
