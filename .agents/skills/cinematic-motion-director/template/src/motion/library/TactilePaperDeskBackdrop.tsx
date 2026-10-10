import React from 'react';

/**
 * TACTILE PAPER DESK BACKDROP & PHYSICAL CRAFT ARTIFACTS
 * 
 * Provides an authentic, tangible artisan craft table environment:
 * - Rich textured warm paperboard / architect cutting desk surface
 * - Realistic Crumpled & Wrinkled Paper Creases (کاغذ چروک‌خورده و له‌شده)
 * - Highly detailed SVG Wooden Drafting Pencil (مداد چوبی شش‌ضلعی با پاک‌کن)
 * - Aluminum Wedge Pencil Sharpener with curled wood shavings (تراش فلزی با تراشه‌ها)
 * - Crumpled Paper Ball & torn kraft scraps (گلوله کاغذ مچاله‌شده)
 * - Polished Steel Paperclips (گیره کاغذ فلزی)
 * - 100% vector SVG rendering with multi-layer contact and ambient drop-shadows
 */

// ----------------------------------------------------------------------------
// 1. REALISTIC HEXAGONAL WOODEN DRAFTING PENCIL
// ----------------------------------------------------------------------------
export const WoodenPencilSvg: React.FC<{
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
  color?: string;
}> = ({ x = 1680, y = 140, rotation = -28, scale = 1.0, color = '#F59E0B' }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        transformOrigin: 'center center',
        pointerEvents: 'none',
        filter: 'drop-shadow(6px 14px 18px rgba(45, 30, 15, 0.35)) drop-shadow(2px 4px 6px rgba(45, 30, 15, 0.2))',
        zIndex: 5,
      }}
    >
      <svg width="340" height="42" viewBox="0 0 340 42" fill="none">
        {/* Soft pencil body shadow */}
        <defs>
          <linearGradient id="pencil-facet-top" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="pencil-facet-mid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="pencil-facet-bot" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="ferrule-brass" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="35%" stopColor="#FFFBEB" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="eraser-pink" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="50%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>
          <linearGradient id="cedar-wood" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4A373" />
            <stop offset="50%" stopColor="#E6CCB2" />
            <stop offset="100%" stopColor="#C38E5A" />
          </linearGradient>
        </defs>

        {/* --- 1. SHARPENED WOOD CONE & GRAPHITE TIP --- */}
        {/* Cedar wood cone */}
        <polygon points="50,6 0,21 50,36" fill="url(#cedar-wood)" />
        {/* Wood scalloped cut lines */}
        <path d="M 50,6 Q 47,13 50,21 Q 47,28 50,36" fill="#A77443" />
        {/* Sharp graphite tip */}
        <polygon points="16,16 0,21 16,26" fill="#1E293B" />
        {/* Graphite specular glint */}
        <line x1="2" y1="21" x2="16" y2="19" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />

        {/* --- 2. HEXAGONAL BODY (3 VISIBLE FACETS) --- */}
        {/* Top Highlight Facet */}
        <rect x="50" y="6" width="220" height="9" fill="url(#pencil-facet-top)" rx="1" />
        {/* Middle Main Facet */}
        <rect x="50" y="15" width="220" height="12" fill="url(#pencil-facet-mid)" />
        {/* Embossed Brand Imprint on body */}
        <text x="110" y="24" fontFamily="monospace" fontSize="8" fontWeight="bold" fill="#78350F" letterSpacing="2">
          ARTISAN CRAFT 2B // NO.2
        </text>
        {/* Bottom Shadow Facet */}
        <rect x="50" y="27" width="220" height="9" fill="url(#pencil-facet-bot)" rx="1" />

        {/* --- 3. BRASS FERRULE (METAL CONNECTOR) --- */}
        <rect x="270" y="5" width="35" height="32" rx="2" fill="url(#ferrule-brass)" stroke="#78350F" strokeWidth="0.5" />
        {/* Ferrule crimp lines */}
        <line x1="277" y1="6" x2="277" y2="36" stroke="#451A03" strokeWidth="1.5" />
        <line x1="293" y1="6" x2="293" y2="36" stroke="#451A03" strokeWidth="1.5" />

        {/* --- 4. RUBBER ERASER --- */}
        <path d="M 305,6 L 330,6 Q 338,6 338,21 Q 338,36 330,36 L 305,36 Z" fill="url(#eraser-pink)" />
        {/* Eraser slight wear angle */}
        <ellipse cx="328" cy="21" rx="2" ry="12" fill="#E11D48" opacity="0.3" />
      </svg>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 2. ALUMINUM WEDGE SHARPENER & CURLY WOOD SHAVINGS
// ----------------------------------------------------------------------------
export const MetalSharpenerSvg: React.FC<{
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
}> = ({ x = 1690, y = 880, rotation = 16, scale = 1.0 }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        transformOrigin: 'center center',
        pointerEvents: 'none',
        filter: 'drop-shadow(6px 12px 16px rgba(45, 30, 15, 0.35)) drop-shadow(2px 4px 6px rgba(45, 30, 15, 0.2))',
        zIndex: 5,
      }}
    >
      {/* Wood Shavings lying near sharpener */}
      <div style={{ position: 'absolute', top: -35, left: -45, transform: 'rotate(-20deg)' }}>
        <svg width="60" height="40" viewBox="0 0 60 40">
          {/* Shaving 1: coiled cedar wood */}
          <path
            d="M 5,25 Q 18,5 35,15 Q 45,22 30,32 Q 18,36 12,28 Z"
            fill="#E6CCB2"
            stroke="#B45309"
            strokeWidth="1.5"
          />
          <path d="M 12,22 Q 22,10 32,18" stroke="#F59E0B" strokeWidth="3" fill="none" />
          <path d="M 10,23 Q 16,15 22,20" stroke="#1E293B" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div style={{ position: 'absolute', top: 50, left: -25, transform: 'rotate(45deg)' }}>
        <svg width="45" height="30" viewBox="0 0 45 30">
          <path
            d="M 5,15 Q 15,2 28,10 Q 38,18 25,25 Z"
            fill="#D4A373"
            stroke="#92400E"
            strokeWidth="1.2"
          />
          <path d="M 8,14 Q 16,6 24,12" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
        </svg>
      </div>

      {/* Main Metal Sharpener Body */}
      <svg width="110" height="85" viewBox="0 0 110 85" fill="none">
        <defs>
          <linearGradient id="metal-body" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1F5F9" />
            <stop offset="40%" stopColor="#CBD5E1" />
            <stop offset="75%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id="blade-steel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* Sharpener wedge profile */}
        <polygon
          points="8,10 95,5 105,75 18,80"
          fill="url(#metal-body)"
          stroke="#475569"
          strokeWidth="2"
          rx="6"
        />

        {/* Side grip ridges (grooves for fingers) */}
        {[18, 26, 34, 42, 50, 58, 66].map((yPos, i) => (
          <line
            key={i}
            x1="12"
            y1={yPos}
            x2="22"
            y2={yPos - 1}
            stroke="#475569"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}

        {/* Pencil entry hole funnel shadow */}
        <ellipse cx="98" cy="40" rx="4" ry="24" fill="#1E293B" opacity="0.8" />

        {/* Blade recess */}
        <polygon points="30,16 90,13 86,66 26,69" fill="#334155" opacity="0.3" />

        {/* Steel Sharpener Blade */}
        <polygon
          points="32,18 88,15 84,62 28,65"
          fill="url(#blade-steel)"
          stroke="#334155"
          strokeWidth="1.5"
        />
        {/* Blade cutting edge bevel */}
        <line x1="32" y1="18" x2="88" y2="15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

        {/* Center Philips Screw */}
        <circle cx="58" cy="40" r="7" fill="#E2E8F0" stroke="#475569" strokeWidth="1.5" />
        <line x1="53" y1="40" x2="63" y2="40" stroke="#334155" strokeWidth="1.8" />
        <line x1="58" y1="35" x2="58" y2="45" stroke="#334155" strokeWidth="1.8" />
      </svg>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 3. AUTHENTIC CRUMPLED PAPER BALL (گلوله کاغذ مچاله‌شده فیزیکی)
// ----------------------------------------------------------------------------
export const CrumpledPaperBallSvg: React.FC<{
  x?: number;
  y?: number;
  rotation?: number;
  size?: number;
  colorTheme?: 'kraft' | 'white';
}> = ({ x = 110, y = 880, rotation = 12, size = 110, colorTheme = 'kraft' }) => {
  const isKraft = colorTheme === 'kraft';
  const base = isKraft ? '#D4B895' : '#F8FAFC';
  const shade1 = isKraft ? '#BFA17B' : '#E2E8F0';
  const shade2 = isKraft ? '#A88963' : '#CBD5E1';
  const shade3 = isKraft ? '#8F714B' : '#94A3B8';
  const highlight = isKraft ? '#F5E6D3' : '#FFFFFF';

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
        pointerEvents: 'none',
        filter: 'drop-shadow(8px 16px 20px rgba(40, 25, 10, 0.4)) drop-shadow(2px 4px 6px rgba(40, 25, 10, 0.2))',
        zIndex: 5,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        {/* Multi-faceted irregular polygon simulating crumpled paper ball geometry */}
        {/* Background base silhouette */}
        <polygon
          points="25,12 55,8 82,22 94,48 88,78 68,92 38,94 14,80 6,52 12,28"
          fill={shade2}
        />

        {/* Facet meshes with varied light reflections */}
        <polygon points="25,12 55,8 48,32 28,30" fill={highlight} opacity="0.9" />
        <polygon points="55,8 82,22 68,40 48,32" fill={base} />
        <polygon points="82,22 94,48 74,52 68,40" fill={shade1} />
        <polygon points="94,48 88,78 65,68 74,52" fill={shade3} />
        <polygon points="88,78 68,92 50,72 65,68" fill={shade2} />
        <polygon points="68,92 38,94 40,68 50,72" fill={shade3} />
        <polygon points="38,94 14,80 28,62 40,68" fill={shade1} />
        <polygon points="14,80 6,52 24,48 28,62" fill={shade3} />
        <polygon points="6,52 12,28 28,30 24,48" fill={base} />

        {/* Central crumpled peak facets */}
        <polygon points="28,30 48,32 42,50 24,48" fill={shade2} />
        <polygon points="48,32 68,40 58,54 42,50" fill={highlight} opacity="0.85" />
        <polygon points="68,40 74,52 58,54" fill={shade1} />
        <polygon points="42,50 58,54 50,72 40,68" fill={shade2} />
        <polygon points="24,48 42,50 40,68 28,62" fill={shade3} />
        <polygon points="58,54 65,68 50,72" fill={shade1} />

        {/* Crisp ridge creases */}
        <line x1="48" y1="32" x2="42" y2="50" stroke={highlight} strokeWidth="1.2" />
        <line x1="42" y1="50" x2="58" y2="54" stroke={shade3} strokeWidth="1.4" />
        <line x1="58" y1="54" x2="65" y2="68" stroke={shade3} strokeWidth="1.2" />
        <line x1="28" y1="30" x2="42" y2="50" stroke={shade3} strokeWidth="1.4" />
        <line x1="42" y1="50" x2="28" y2="62" stroke={highlight} strokeWidth="1" />
      </svg>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 4. POLISHED STEEL PAPERCLIP
// ----------------------------------------------------------------------------
export const SteelPaperclipSvg: React.FC<{
  x?: number;
  y?: number;
  rotation?: number;
  scale?: number;
}> = ({ x = 180, y = 130, rotation = 38, scale = 1.0 }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `rotate(${rotation}deg) scale(${scale})`,
        pointerEvents: 'none',
        filter: 'drop-shadow(3px 6px 8px rgba(40, 25, 10, 0.35)) drop-shadow(1px 2px 3px rgba(40, 25, 10, 0.2))',
        zIndex: 5,
      }}
    >
      <svg width="45" height="110" viewBox="0 0 45 110" fill="none">
        <path
          d="M 12,95 L 12,32 Q 12,10 24,10 Q 36,10 36,32 L 36,88 Q 36,102 24,102 Q 10,102 10,88 L 10,45"
          stroke="#475569"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Steel highlight core */}
        <path
          d="M 12,95 L 12,32 Q 12,10 24,10 Q 36,10 36,32 L 36,88 Q 36,102 24,102 Q 10,102 10,88 L 10,45"
          stroke="#F8FAFC"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 5. TORN KRAFT SCRAP WITH TAPE PINNED TO DESK
// ----------------------------------------------------------------------------
export const TornCraftScrapNote: React.FC<{
  x?: number;
  y?: number;
  rotation?: number;
  label?: string;
}> = ({ x = 70, y = 160, rotation = -8, label = 'IDEA_LAB // v30' }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `rotate(${rotation}deg)`,
        backgroundColor: '#E6D7C3',
        width: 130,
        height: 80,
        padding: '12px 10px',
        boxSizing: 'border-box',
        boxShadow: '0 8px 18px rgba(45, 30, 15, 0.18), 0 2px 5px rgba(45, 30, 15, 0.1)',
        borderLeft: '2px solid rgba(130, 100, 65, 0.3)',
        pointerEvents: 'none',
        zIndex: 4,
      }}
    >
      {/* Tape on top */}
      <div
        style={{
          position: 'absolute',
          top: -10,
          left: 35,
          width: 60,
          height: 22,
          backgroundColor: 'rgba(215, 185, 135, 0.85)',
          transform: 'rotate(2deg)',
          boxShadow: '0 2px 4px rgba(40, 25, 10, 0.15)',
          borderLeft: '1px dashed rgba(160, 130, 85, 0.6)',
          borderRight: '1px dashed rgba(160, 130, 85, 0.6)',
        }}
      />
      <div style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 900, color: '#785A3C', marginTop: 8 }}>
        {label}
      </div>
      <div style={{ marginTop: 6, display: 'flex', gap: 4 }}>
        <div style={{ width: 14, height: 14, backgroundColor: '#D9534F', borderRadius: 2 }} />
        <div style={{ width: 14, height: 14, backgroundColor: '#F59E0B', borderRadius: 2 }} />
        <div style={{ width: 14, height: 14, backgroundColor: '#10B981', borderRadius: 2 }} />
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------
// 6. PROCEDURAL CRUMPLED PAPER CREASE OVERLAY (الگوی چین‌وچروک و خطوط تای کاغذ)
// ----------------------------------------------------------------------------
export const CrumpledPaperCreaseOverlay: React.FC<{
  width?: number | string;
  height?: number | string;
  opacity?: number;
}> = ({ width = '100%', height = '100%', opacity = 0.45 }) => {
  return (
    <svg
      width={width}
      height={height}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        mixBlendMode: 'multiply',
      }}
    >
      <defs>
        {/* Soft diagonal highlight & shadow gradients for realistic origami/paper folds */}
        <linearGradient id="crease-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(80, 55, 30, 0.25)" />
          <stop offset="50%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.35)" />
        </linearGradient>
      </defs>

      {/* Crease line 1 (Main diagonal fold across card) */}
      <path
        d="M -50,180 Q 400,240 850,210 T 1500,280"
        stroke="rgba(70, 48, 25, 0.18)"
        strokeWidth="3.5"
        fill="none"
      />
      <path
        d="M -50,182 Q 400,242 850,212 T 1500,282"
        stroke="rgba(255, 255, 255, 0.45)"
        strokeWidth="2"
        fill="none"
      />

      {/* Crease line 2 (Intersecting cross fold) */}
      <path
        d="M 320,-20 Q 480,320 620,750"
        stroke="rgba(70, 48, 25, 0.15)"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M 322,-20 Q 482,320 622,750"
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="1.8"
        fill="none"
      />

      {/* Crease line 3 (Lower sharp bend fold) */}
      <path
        d="M 550,520 Q 980,440 1450,560"
        stroke="rgba(70, 48, 25, 0.16)"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M 550,522 Q 980,442 1450,562"
        stroke="rgba(255, 255, 255, 0.5)"
        strokeWidth="2"
        fill="none"
      />

      {/* Crease line 4 (Upper right angled crinkle) */}
      <path
        d="M 980,-10 Q 1120,260 1350,420"
        stroke="rgba(70, 48, 25, 0.14)"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d="M 982,-10 Q 1122,260 1352,420"
        stroke="rgba(255, 255, 255, 0.35)"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Subtle crinkle triangles (embossed origami stress points) */}
      <polygon points="620,210 700,290 640,310" fill="url(#crease-shadow)" opacity="0.6" />
      <polygon points="1050,380 1150,340 1110,430" fill="url(#crease-shadow)" opacity="0.5" />
      <polygon points="280,340 360,390 310,430" fill="url(#crease-shadow)" opacity="0.6" />
    </svg>
  );
};

// ----------------------------------------------------------------------------
// 7. COMPOSITE TACTILE CRAFT DESK BACKDROP
// ----------------------------------------------------------------------------
export const TactilePaperDeskBackdrop: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#E4DDD2', // Rich warm organic paperboard base
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Craft Cutting Mat / Drafting Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.14,
          backgroundImage: `
            linear-gradient(to right, #6E5B45 1px, transparent 1px),
            linear-gradient(to bottom, #6E5B45 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Organic Paper Fiber specks & wood pulp dots */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          backgroundImage: `
            radial-gradient(#4a3e2d 1px, transparent 1px),
            radial-gradient(#8c7b64 1.2px, #E4DDD2 1.2px)
          `,
          backgroundSize: '36px 36px',
          backgroundPosition: '0 0, 18px 18px',
        }}
      />

      {/* Studio Workbench Vignette & Warm Directional Lighting (Light from Top-Left) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 80% at 30% 25%, rgba(255, 250, 240, 0.4) 0%, rgba(90, 65, 40, 0.22) 100%)',
          boxShadow: 'inset 0 0 140px rgba(70, 48, 25, 0.28)',
        }}
      />

      {/* Ambient Crumpled Creases on Desk */}
      <CrumpledPaperCreaseOverlay opacity={0.35} />

      {/* =================================================================== */}
      {/* DESK PHYSICAL CRAFT OBJECTS                                          */}
      {/* =================================================================== */}
      {/* 1. Wooden Drafting Pencil (Top Right) */}
      <WoodenPencilSvg x={1640} y={110} rotation={-30} scale={1.05} />

      {/* 2. Metal Sharpener with Wood Shavings (Bottom Right) */}
      <MetalSharpenerSvg x={1710} y={870} rotation={14} scale={1.1} />

      {/* 3. Crumpled Paper Ball (Bottom Left) */}
      <CrumpledPaperBallSvg x={90} y={870} rotation={18} size={115} colorTheme="kraft" />

      {/* 4. Steel Paperclip (Top Left) */}
      <SteelPaperclipSvg x={190} y={90} rotation={32} scale={1.0} />

      {/* 5. Pinned Torn Craft Note (Top Left) */}
      <TornCraftScrapNote x={55} y={150} rotation={-9} label="PAPER_CRAFT // 30 FPS" />
    </div>
  );
};
