/**
 * ============================================================================
 * TEMPLATE ARCHETYPE 7: FINTECH TRADING & MARKET INTELLIGENCE MASTER
 * ============================================================================
 *
 * Open-Canvas 3D Algorithmic Liquidity Choreography:
 * - Zero top ticker tape bar & zero outer 1400x690 card boxes
 * - Candlesticks, order-book depth waves, PnL counters, and execution nodes
 *   float directly on the Open 3D Canvas connected by SVG laser conduits (`strokeDashoffset`)
 * - Every candlestick, metric node, and text phrase animates independently via
 *   staggered springs (`idx *`) and continuous floating micro-motion
 * - Subtle Videolancer Ultimate SFX via `<UniversalSoundDirector>` (<= 0.14 volume)
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing } from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { GraphiteCircuitBackdrop } from '../library/GraphiteCircuitBackdrop';
import { UniversalSoundDirector } from '../audio/UniversalSoundDirector';

export const FINTECH_DURATION = 450; // 15.0s @ 30 FPS
export const FINTECH_FPS = 30;
export const FINTECH_WIDTH = 1920;
export const FINTECH_HEIGHT = 1080;

const CANDLESTICK_SERIES = [
  { x: 110, open: 230, close: 185, high: 165, low: 250, green: true },
  { x: 205, open: 185, close: 205, high: 172, low: 220, green: false },
  { x: 300, open: 205, close: 152, high: 132, low: 215, green: true },
  { x: 395, open: 152, close: 128, high: 108, low: 170, green: true },
  { x: 490, open: 128, close: 158, high: 118, low: 178, green: false },
  { x: 585, open: 158, close: 106, high: 86, low: 168, green: true },
  { x: 680, open: 106, close: 84, high: 66, low: 118, green: true },
  { x: 775, open: 84, close: 54, high: 36, low: 98, green: true },
  { x: 870, open: 54, close: 76, high: 46, low: 88, green: false },
  { x: 965, open: 76, close: 32, high: 14, low: 88, green: true },
];

const LIQUIDITY_TELEMETRY_NODES = [
  { title: 'بازده کل سبد الگوریتمی', value: '+۳۴.۸٪', accent: '#10b981', code: 'ROI_ALPHA' },
  { title: 'تاخیر اجرای سفارش بازار', value: '۰.۲۴ میلی‌ثانیه', accent: '#38bdf8', code: 'HFT_LATENCY' },
  { title: 'عمق نقدینگی تایید شده', value: '۹۹.۹٪ بدون اسلیپیج', accent: '#f59e0b', code: 'LIQ_DEPTH' },
];

export const FinTechTradingMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = calculateBeatPulse(frame, 124, fps).lightPulse;
  const breathingPulse = 1 + beatPulse * 0.016;

  // Dynamic Open-Canvas Camera Trajectory (>= 920px travel across market canvas)
  const camX = interpolate(
    frame,
    [0, 85, 135, 215, 265, 345, 395, 450],
    [0, 0, 460, 180, -460, -180, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  const camY = interpolate(
    frame,
    [0, 85, 135, 215, 265, 345, 395, 450],
    [0, 0, -30, -15, 30, 15, 0, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  const camScale = interpolate(
    frame,
    [0, 90, 180, 290, 390, 450],
    [0.95, 1.02, 1.06, 1.04, 1.0, 1.0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0, 0.2, 1) }
  );

  // PnL count-up ($12,400 -> $89,450)
  const pnlValue = interpolate(
    frame,
    [40, 260],
    [12400, 89450],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.1, 0.9, 0.2, 1) }
  );

  // Order book bid/ask waves
  const depthWave = Math.sin((frame / 18) * Math.PI) * 14;

  const titleSpring = spring({ frame: Math.max(0, frame - 6), fps, config: { damping: 14, stiffness: 110 } });
  const conduitSpring = spring({ frame: Math.max(0, frame - 18), fps, config: { damping: 14, stiffness: 95 } });
  const pnlSpring = spring({ frame: Math.max(0, frame - 32), fps, config: { damping: 13, stiffness: 110 } });

  const floatWave = (seed: number, amp = 6) =>
    Math.round(Math.sin((frame + seed) * 0.065) * amp);

  return (
    <div
      style={{
        position: 'relative',
        width: FINTECH_WIDTH,
        height: FINTECH_HEIGHT,
        backgroundColor: '#050811',
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
        direction: 'rtl',
      }}
    >
      {/* 1. SUBTLE VIDEOLANCER ULTIMATE SFX & BGM DIRECTOR */}
      <UniversalSoundDirector
        bgmTrack="music/Brain_Dance.mp3"
        bgmVolume={0.14}
        themeId="FINTECH_TRADING"
      />

      {/* 2. WALL STREET TECH CIRCUIT BACKDROP (ZERO TOP TICKER BAR CLUTTER) */}
      <GraphiteCircuitBackdrop
        camX={camX}
        camY={camY}
        accentColor="#10b981"
        secondaryColor="#06b6d4"
      />

      {/* 3. OPEN-CANVAS 3D ALGORITHMIC TRADING STAGE (NO OUTER 1400x690 CARD BOX) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${camScale * breathingPulse}) translate3d(${Math.round(camX * 0.32)}px, ${Math.round(camY)}px, 0px)`,
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          zIndex: 10,
        }}
      >
        {/* SVG Constellation Laser Conduits Connecting Candlesticks & PnL Nodes */}
        <svg
          width={1640}
          height={860}
          viewBox="0 0 1640 860"
          style={{ position: 'absolute', overflow: 'visible', pointerEvents: 'none' }}
        >
          <path
            d="M 220 460 C 560 390, 920 260, 1340 240"
            fill="none"
            stroke="#10b981"
            strokeWidth={2.5}
            strokeDasharray="1280"
            strokeDashoffset={Math.round(1280 * (1 - conduitSpring))}
            strokeOpacity={0.55}
          />
          <path
            d="M 260 660 L 1380 660"
            fill="none"
            stroke="#38bdf8"
            strokeWidth={2}
            strokeDasharray="1120"
            strokeDashoffset={Math.round(1120 * (1 - conduitSpring))}
            strokeOpacity={0.4}
          />
          <circle
            cx={1340}
            cy={240}
            r={95}
            fill="none"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="16 10"
            strokeDashoffset={Math.round(-frame * 2)}
            strokeOpacity={0.5}
          />
        </svg>

        {/* OPEN-CANVAS FLOATING HEADLINE PHRASE */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 28,
            opacity: titleSpring,
            transform: `translate3d(0px, ${Math.round((1 - titleSpring) * -38 + floatWave(0, 5))}px, 0px) scale(${titleSpring})`,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 18px',
              borderRadius: 999,
              background: 'rgba(16, 185, 129, 0.14)',
              border: '1px solid #10b981',
              color: '#34d399',
              fontSize: 14,
              fontWeight: 900,
              marginBottom: 12,
            }}
          >
            <span>●</span>
            <span>{sanitizeForDisplay('موتور پردازش فرکانس بالا (HFT) · جریان زنده نقدینگی')}</span>
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 48,
              fontWeight: 950,
              color: '#f8fafc',
              textShadow: '0 10px 35px rgba(0,0,0,0.9)',
            }}
          >
            {sanitizeForDisplay('تریدینگ الگوریتمی و تحلیل آنی عمق بازار')}
          </h1>
        </div>

        {/* OPEN-CANVAS SPATIAL WORKSPACE: CANDLESTICK FIELD + FLOATING PnL CORE */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 1480,
            gap: 48,
          }}
        >
          {/* OPEN-CANVAS CANDLESTICK & ORDER-BOOK WAVE FIELD */}
          <div style={{ flex: 1, position: 'relative' }}>
            <svg width="100%" height={310} viewBox="0 0 1060 300" style={{ overflow: 'visible' }}>
              {/* Subtle Open-Canvas Horizon Guides */}
              <line x1={40} y1={70} x2={1020} y2={70} stroke="rgba(56, 189, 248, 0.14)" strokeDasharray="6 6" />
              <line x1={40} y1={150} x2={1020} y2={150} stroke="rgba(56, 189, 248, 0.14)" strokeDasharray="6 6" />
              <line x1={40} y1={230} x2={1020} y2={230} stroke="rgba(56, 189, 248, 0.14)" strokeDasharray="6 6" />

              {/* Liquidity Trend Laser Line */}
              <polyline
                fill="none"
                stroke="#38bdf8"
                strokeWidth={3}
                strokeDasharray="1100"
                strokeDashoffset={Math.round(1100 * (1 - conduitSpring))}
                points="110,205 205,195 300,175 395,140 490,145 585,130 680,95 775,70 870,65 965,50"
                opacity={0.75}
              />
            </svg>

            {/* Independent Staggered Candlestick Nodes */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                padding: '0 40px',
                pointerEvents: 'none',
              }}
            >
              {CANDLESTICK_SERIES.map((candle, idx) => {
                const candleSpring = spring({
                  frame: Math.max(0, frame - 14 - idx * 7),
                  fps,
                  config: { damping: 12, stiffness: 120 },
                });
                const color = candle.green ? '#10b981' : '#f43f5e';
                const bodyHeight = Math.max(16, Math.abs(candle.open - candle.close));
                const wickHeight = Math.abs(candle.low - candle.high);
                return (
                  <div
                    key={`candle-${candle.x}`}
                    style={{
                      position: 'relative',
                      width: 32,
                      height: 280,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: candleSpring,
                      transform: `translate3d(0px, ${Math.round((1 - candleSpring) * 60 + floatWave(idx * 14, 4) + idx * 0)}px, 0px) scaleY(${candleSpring})`,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: Math.min(candle.high, candle.low),
                        width: 2,
                        height: wickHeight,
                        backgroundColor: color,
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: Math.min(candle.open, candle.close),
                        width: 26,
                        height: bodyHeight,
                        borderRadius: 4,
                        backgroundColor: color,
                        boxShadow: `0 0 18px ${color}66`,
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Live Order-Book Bid/Ask Depth Wave Bar */}
            <div
              style={{
                display: 'flex',
                gap: 18,
                alignItems: 'center',
                marginTop: 18,
                transform: `translate3d(0px, ${Math.round(floatWave(30, 4))}px, 0px)`,
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 800, color: '#cbd5e1' }}>
                {sanitizeForDisplay('موج تقاضا و عرضه اردربوک')}
              </span>
              <div style={{ flex: 1, height: 12, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${66 + depthWave * 0.5}%`, backgroundColor: '#10b981' }} />
                <div style={{ width: `${34 - depthWave * 0.5}%`, backgroundColor: '#f43f5e' }} />
              </div>
              <span style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 900, color: '#34d399' }}>
                66% BID
              </span>
            </div>
          </div>

          {/* FLOATING PnL HOLOGRAPHIC CORE ON OPEN CANVAS */}
          <div
            style={{
              width: 390,
              padding: '32px 28px',
              borderRadius: 28,
              background: 'radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.24) 0%, rgba(9, 14, 26, 0.88) 100%)',
              border: '1.5px solid rgba(16, 185, 129, 0.5)',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.8), 0 0 45px rgba(16, 185, 129, 0.2)',
              textAlign: 'center',
              opacity: pnlSpring,
              transform: `translate3d(0px, ${Math.round((1 - pnlSpring) * 50 + floatWave(50, 7))}px, 0px) scale(${pnlSpring})`,
            }}
          >
            <span style={{ fontSize: 17, fontWeight: 800, color: '#a7f3d0' }}>
              {sanitizeForDisplay('سود تحقق‌یافته خالص (PnL)')}
            </span>
            <div
              style={{
                fontSize: 52,
                fontWeight: 950,
                color: '#ffffff',
                fontFamily: 'monospace',
                margin: '14px 0',
                direction: 'ltr',
                textShadow: '0 0 28px rgba(16, 185, 129, 0.5)',
              }}
            >
              +${Math.floor(pnlValue).toLocaleString()}
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#34d399' }}>
              {sanitizeForDisplay('تایید الگوریتمی در شبکه غیرمتمرکز')}
            </div>
          </div>
        </div>

        {/* STAGGERED OPEN-CANVAS LIQUIDITY TELEMETRY NODES */}
        <div style={{ display: 'flex', gap: 28, marginTop: 42, width: 1480 }}>
          {LIQUIDITY_TELEMETRY_NODES.map((node, idx) => {
            const nodeSpring = spring({
              frame: Math.max(0, frame - 48 - idx * 9),
              fps,
              config: { damping: 13, stiffness: 115 },
            });
            return (
              <div
                key={node.code}
                style={{
                  flex: 1,
                  padding: '20px 26px',
                  borderRadius: 20,
                  background: 'rgba(13, 20, 36, 0.82)',
                  border: `1.5px solid ${node.accent}66`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: nodeSpring,
                  transform: `translate3d(0px, ${Math.round((1 - nodeSpring) * 40 + floatWave(idx * 24, 5) + idx * 0)}px, 0px) scale(${nodeSpring})`,
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#94a3b8' }}>
                    {sanitizeForDisplay(node.title)}
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 950, color: node.accent, marginTop: 6 }}>
                    {sanitizeForDisplay(node.value)}
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 12,
                    fontWeight: 800,
                    color: node.accent,
                    padding: '5px 10px',
                    borderRadius: 8,
                    background: `${node.accent}18`,
                  }}
                >
                  {node.code}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
