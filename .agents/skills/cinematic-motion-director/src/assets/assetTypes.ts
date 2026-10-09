/**
 * EXTERNAL VISUAL ASSET ARCHITECTURE (V22)
 * 
 * Generic, decoupled interface for user-supplied visual assets:
 * - Logos
 * - SVGs
 * - PNGs / WebPs / JPGs
 * - Illustrations / Diagrams / Icons
 * 
 * Strict Invariant:
 * The core production engine is 100% functional without external binary assets.
 * Assets are injected optionally and dynamically; no specific institutional asset
 * is hardcoded into the default engine or Skill.
 */

export type VisualAssetType = 'png' | 'jpg' | 'svg' | 'webp';

export type VisualAssetRole =
  | 'logo'
  | 'image'
  | 'illustration'
  | 'diagram'
  | 'icon'
  | 'watermark';

export interface ExternalVisualAsset {
  id: string;
  src: string;
  type: VisualAssetType;
  role?: VisualAssetRole;
  preserveAspectRatio?: boolean;
  opticalWidth?: number;
  opticalHeight?: number;
  alt?: string;
  filter?: string;
  clipPath?: string;
}

export interface AssetStingConfig {
  asset?: ExternalVisualAsset;
  title?: string;
  subtitle?: string;
  startFrame?: number;
  settleFrame?: number;
  exitFrame?: number;
}
