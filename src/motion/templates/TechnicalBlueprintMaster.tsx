/**
 * ============================================================================
 * MASTER ARCHETYPE 8: TECHNICAL CAD BLUEPRINT
 * ============================================================================
 * 
 * Inspired by architectural engineering blueprints and technical schematics:
 * - Deep engineering navy (#040D1A) with cyan millimeter drafting grid (#00E5FF)
 * - Dimension calipers, millimeter coordinate axes (X, Y, Z), and crosshair markers
 * - Mechanical drafting lines drawing itself with mathematical precision
 * - Monospace telemetry badges and CAD component callouts
 * - Zero decorative fluff - 100% architectural rigor, precision, and structural mastery
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing, Audio, staticFile } from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { clampFontSize } from '../../typography/responsiveTypography';

export const BLUEPRINT_DURATION = 450; // 15.0s @ 30 FPS
export const BLUEPRINT_FPS = 30;
export const BLUEPRINT_WIDTH = 1920;
export const BLUEPRINT_HEIGHT = 1080;

export const TechnicalBlueprintMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = calculateBeatPulse(frame, 124, fps);

  // Phase Timing:
  // Phase 1 (0..110): CAD Crosshairs converge and central drafting frame unrolls
  // Phase 2 (110..220): Dimension calipers expand with live millimeter metric readouts
  // Phase 3 (220..330): 3-Node schematic architecture with live vector wiring
  // Phase 4 (330..450): Final structural blueprint certification and millimeter accuracy lock

  const unrollProgress = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 16, stiffness: 100 } });
  const caliperProgress = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 14, stiffness: 110 } });
  const schematicProgress = spring({ frame: Math.max(0, frame - 220), fps, config: { damping: 15, stiffness: 105 } });
  const lockProgress = spring({ frame: Math.max(0, frame - 330), fps, config: { damping: 13, stiffness: 120 } });

  // Grid pan offset
  const gridPan = interpolate(frame, [0, 450], [0, -60], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'relative',
        width: BLUEPRINT_WIDTH,
        height: BLUEPRINT_HEIGHT,
        backgroundColor: '#040D1A',
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
        direction: 'rtl',
      }}
    >
      {/* Studio Soundtrack: Precision Brain Dance Beat */}
      <Audio src={staticFile('music/Brain_Dance.mp3')} volume={0.8} />

      {/* ================================================================= */}
      {/* LAYER 1: MILLIMETER CAD DRAFTING GRID                             */}
      {/* ================================================================= */}
      <div
        style={{
          position: 'absolute',
          inset: -100,
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to right, rgba(0, 229, 255, 0.16) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.16) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px, 20px 20px, 100px 100px, 100px 100px',
          transform: `translate(${gridPan}px, ${gridPan * 0.5}px)`,
          pointerEvents: 'none',
        }}
      />

      {/* Coordinate Crosshairs at corners */}
      <div style={{ position: 'absolute', top: 40, left: 40, color: 'rgba(0, 229, 255, 0.4)', fontSize: 16, fontFamily: 'monospace' }}>
        + [X: 000.00 // Y: 1080.00]
      </div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, color: 'rgba(0, 229, 255, 0.4)', fontSize: 16, fontFamily: 'monospace' }}>
        + [ORIGIN LOCK: ISO-2768-mK]
      </div>

      {/* ================================================================= */}
      {/* LAYER 2: MAIN CAD BLUEPRINT SCHEMATIC PLATFORM                     */}
      {/* ================================================================= */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 1360,
          minHeight: 660,
          transform: `translate(-50%, -50%) scale(${unrollProgress * beatPulse.scalePulse})`,
          opacity: unrollProgress,
          backgroundColor: 'rgba(6, 21, 40, 0.92)',
          border: '2px solid rgba(0, 229, 255, 0.65)',
          boxShadow: '0 0 50px rgba(0, 229, 255, 0.15), inset 0 0 40px rgba(0, 229, 255, 0.06)',
          padding: 50,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Top Technical Drafting Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 229, 255, 0.25)', paddingBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: '#00E5FF',
                boxShadow: '0 0 10px #00E5FF',
              }}
            />
            <span
              style={{
                fontSize: clampFontSize(24, 'microTelemetry', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                fontWeight: 800,
                color: '#00E5FF',
                letterSpacing: 1,
              }}
            >
              {sanitizeForDisplay('نقشه فنی و مستندات مهندسی معماری')}
            </span>
          </div>

          <div
            style={{
              fontFamily: 'monospace',
              fontSize: clampFontSize(22, 'microTelemetry', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
              color: 'rgba(0, 229, 255, 0.8)',
              direction: 'ltr',
            }}
          >
            SYS.REV: 5.5-CAD // TOLERANCE: ±0.01mm
          </div>
        </div>

        {/* Blueprint Title Area */}
        <div style={{ marginTop: 24 }}>
          <div
            style={{
              fontSize: clampFontSize(26, 'microTelemetry', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
              fontWeight: 700,
              color: 'rgba(0, 229, 255, 0.75)',
              marginBottom: 10,
            }}
          >
            {sanitizeForDisplay('بخش اول: معماری مقیاس‌پذیر سیستم‌های توزیع‌شده')}
          </div>
          <h1
            style={{
              fontSize: clampFontSize(74, 'heroTitle', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
              fontWeight: 950,
              color: '#F0FDFA',
              margin: 0,
              lineHeight: 1.25,
              textShadow: '0 0 20px rgba(0, 229, 255, 0.25)',
            }}
          >
            {sanitizeForDisplay('طراحی دقیق و محاسباتی بلوپرینت')}
          </h1>
          <p
            style={{
              fontSize: clampFontSize(32, 'body', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
              fontWeight: 600,
              color: '#94A3B8',
              margin: '16px 0 0 0',
              lineHeight: 1.5,
              maxWidth: 1020,
            }}
          >
            {sanitizeForDisplay('تراز خطوط ایزومتریک، پایش داده‌های ابعادی و کالیبراسیون بدون خطای مؤلفه‌های زیرساخت.')}
          </p>
        </div>

        {/* 3 Isometric Dimension Calipers / Modules */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
            marginTop: 36,
            opacity: caliperProgress,
            transform: `translateY(${(1 - caliperProgress) * 30}px)`,
          }}
        >
          {[
            { tag: 'SECTION A-A', title: 'شبکه خط‌کش CAD', val: '۱۹۲۰ × ۱۰۸۰ px', metric: 'دقت ۱۰۰٪ برداری' },
            { tag: 'SECTION B-B', title: 'تله‌متری فرکانسی', val: '۱۲۴.۰۰ BPM', metric: 'سینک کوانتایز شده' },
            { tag: 'SECTION C-C', title: 'ضریب اطمینان تنش', val: 'k = ۱.۴۵', metric: 'پایداری ساختاری' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(4, 28, 54, 0.75)',
                border: '1px solid rgba(0, 229, 255, 0.35)',
                padding: 22,
                position: 'relative',
              }}
            >
              {/* Corner tick */}
              <div style={{ position: 'absolute', top: -1, right: -1, width: 8, height: 8, backgroundColor: '#00E5FF' }} />
              <div
                style={{
                  fontSize: clampFontSize(20, 'microTelemetry', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                  fontFamily: 'monospace',
                  color: 'rgba(0, 229, 255, 0.65)',
                }}
              >
                {item.tag}
              </div>
              <div
                style={{
                  fontSize: clampFontSize(32, 'cardHeader', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginTop: 6,
                }}
              >
                {sanitizeForDisplay(item.title)}
              </div>
              <div
                style={{
                  fontSize: clampFontSize(36, 'heroTitle', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                  fontWeight: 900,
                  color: '#00E5FF',
                  marginTop: 8,
                  direction: 'ltr',
                  textAlign: 'right',
                }}
              >
                {item.val}
              </div>
              <div
                style={{
                  fontSize: clampFontSize(22, 'body', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                  color: '#94A3B8',
                  marginTop: 6,
                  fontWeight: 600,
                }}
              >
                {sanitizeForDisplay(item.metric)}
              </div>
            </div>
          ))}
        </div>

        {/* Dimension Callout Baseline */}
        <div
          style={{
            marginTop: 32,
            paddingTop: 18,
            borderTop: '1px dashed rgba(0, 229, 255, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: schematicProgress,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: '#00E5FF', fontSize: 18 }}>◀---------</span>
            <span
              style={{
                fontSize: clampFontSize(24, 'microTelemetry', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                fontWeight: 700,
                color: '#E2E8F0',
              }}
            >
              {sanitizeForDisplay('پهنای زون امن: ۱۳۶۰ میلیمتر دیجیتال')}
            </span>
            <span style={{ color: '#00E5FF', fontSize: 18 }}>---------▶</span>
          </div>

          <div
            style={{
              fontSize: clampFontSize(24, 'microTelemetry', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
              fontWeight: 800,
              color: '#38BDF8',
            }}
          >
            {sanitizeForDisplay('وضعیت مهندسی: کامپایل تأیید شد')}
          </div>
        </div>

        {/* Structural Lock Seal */}
        {frame >= 330 && (
          <div
            style={{
              position: 'absolute',
              bottom: 45,
              left: 50,
              transform: `scale(${lockProgress})`,
              border: '2px solid #00E5FF',
              padding: '12px 28px',
              backgroundColor: 'rgba(4, 25, 48, 0.95)',
              boxShadow: '0 0 25px rgba(0, 229, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div style={{ width: 14, height: 14, backgroundColor: '#00E5FF', transform: 'rotate(45deg)' }} />
            <div>
              <div
                style={{
                  fontSize: clampFontSize(26, 'cardHeader', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                  fontWeight: 900,
                  color: '#FFFFFF',
                }}
              >
                {sanitizeForDisplay('تأییدیه مهندسی CAD')}
              </div>
              <div
                style={{
                  fontSize: clampFontSize(20, 'microTelemetry', BLUEPRINT_WIDTH, BLUEPRINT_HEIGHT),
                  fontFamily: 'monospace',
                  color: '#00E5FF',
                  direction: 'ltr',
                }}
              >
                APPROVED // ZERO TOLERANCE ERR
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
