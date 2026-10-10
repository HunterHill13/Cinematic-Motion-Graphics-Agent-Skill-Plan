/**
 * ============================================================================
 * TEMPLATE ARCHETYPE 7: FINTECH TRADING & MARKET INTELLIGENCE MASTER
 * ============================================================================
 * 
 * High-Frequency Algorithmic Market & Trading Visualizer:
 * - Obsidian Wall Street foundation (#050811)
 * - Real-time animated candlestick chart sequence with volume profiles
 * - Live Order-Book Depth Waves (Bid / Ask market liquidity)
 * - Continuous scrolling financial ticker tape (BTC, ETH, AI_INDEX, MCP)
 * - Rapid algorithmic execution counter & PnL telemetry (+34.8% ROI)
 * - 100% Yekan Bakh typography & monospace financial figures
 * ============================================================================
 */

import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, spring, Easing, Audio, staticFile } from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import { GraphiteCircuitBackdrop } from '../library/GraphiteCircuitBackdrop';

export const FINTECH_DURATION = 450; // 15.0s @ 30 FPS
export const FINTECH_FPS = 30;
export const FINTECH_WIDTH = 1920;
export const FINTECH_HEIGHT = 1080;

export const FinTechTradingMaster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beatPulse = calculateBeatPulse(frame, 124, fps);

  // Candlestick height reveal
  const chartProgress = interpolate(frame, [20, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.16, 1, 0.3, 1) });

  // PnL count-up ($10,000 -> $84,950)
  const pnlValue = interpolate(frame, [80, 260], [12400, 89450], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.1, 0.9, 0.2, 1) });

  // Ticker horizontal scroll
  const tickerScroll = (frame * 4) % 1200;

  // Order book bid/ask waves
  const depthWave = Math.sin((frame / 18) * Math.PI) * 15;

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
      {/* 1. WALL STREET TECH CIRCUIT BACKDROP */}
      <GraphiteCircuitBackdrop
        camX={0}
        camY={0}
        accentColor="#10b981"
        secondaryColor="#06b6d4"
      />

      {/* 2. TOP TICKER TAPE BAR */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 48,
          backgroundColor: 'rgba(9, 14, 26, 0.95)',
          borderBottom: '1px solid rgba(16, 185, 129, 0.25)',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          zIndex: 30,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 48,
            transform: `translateX(${-tickerScroll}px)`,
            fontFamily: 'monospace',
            fontSize: 14,
            fontWeight: 800,
            whiteSpace: 'nowrap',
            direction: 'ltr',
          }}
        >
          <span style={{ color: '#34d399' }}>▲ BTC/USD: $94,280.50 (+5.2%)</span>
          <span style={{ color: '#38bdf8' }}>▲ ETH/USD: $3,840.10 (+3.8%)</span>
          <span style={{ color: '#34d399' }}>▲ OPUS_INDEX: 4,920.00 (+8.4%)</span>
          <span style={{ color: '#f59e0b' }}>● MCP_FLOW: 1.2M REQ/S (99.9%)</span>
          <span style={{ color: '#34d399' }}>▲ BTC/USD: $94,280.50 (+5.2%)</span>
          <span style={{ color: '#38bdf8' }}>▲ ETH/USD: $3,840.10 (+3.8%)</span>
          <span style={{ color: '#34d399' }}>▲ OPUS_INDEX: 4,920.00 (+8.4%)</span>
        </div>
      </div>

      {/* 3. MAIN TERMINAL DASHBOARD CONTAINER */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 100,
          right: 100,
          bottom: 60,
          display: 'grid',
          gridTemplateColumns: '1fr 440px',
          gap: 28,
        }}
      >
        {/* LEFT COLUMN: CANDLESTICK & LIQUIDITY DEPTH */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(13, 20, 36, 0.88) 0%, rgba(7, 11, 22, 0.95) 100%)',
            borderRadius: 24,
            border: '1.5px solid rgba(16, 185, 129, 0.35)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(16, 185, 129, 0.1)',
            padding: 36,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 950, color: '#f8fafc' }}>
                {sanitizeForDisplay('داشبورد تریدینگ الگوریتمی و تحلیل آنی نقدینگی')}
              </h2>
              <span style={{ fontSize: 14, color: '#64748b', fontWeight: 700 }}>
                {sanitizeForDisplay('موتور پردازش فرکانس بالا (HFT) · تراز کانتکست')}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#34d399', fontSize: 14, fontWeight: 900 }}>
              <span>●</span>
              <span>{sanitizeForDisplay('بازار زنده')}</span>
            </div>
          </div>

          {/* Candlestick SVG Chart */}
          <div style={{ position: 'relative', width: '100%', height: 320, display: 'flex', alignItems: 'flex-end' }}>
            <svg width="100%" height="100%" viewBox="0 0 1100 320">
              {/* Horizontal Gridlines */}
              <line x1="0" y1="80" x2="1100" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <line x1="0" y1="160" x2="1100" y2="160" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
              <line x1="0" y1="240" x2="1100" y2="240" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

              {/* Candlestick Bars */}
              {[
                { x: 100, open: 220, close: 180, high: 160, low: 240, green: true },
                { x: 200, open: 180, close: 200, high: 170, low: 210, green: false },
                { x: 300, open: 200, close: 150, high: 130, low: 210, green: true },
                { x: 400, open: 150, close: 130, high: 110, low: 170, green: true },
                { x: 500, open: 130, close: 160, high: 120, low: 180, green: false },
                { x: 600, open: 160, close: 110, high: 90, low: 170, green: true },
                { x: 700, open: 110, close: 90, high: 70, low: 120, green: true },
                { x: 800, open: 90, close: 60, high: 40, low: 100, green: true },
                { x: 900, open: 60, close: 80, high: 50, low: 90, green: false },
                { x: 1000, open: 80, close: 40, high: 20, low: 90, green: true },
              ].map((c, i) => {
                const color = c.green ? '#10b981' : '#f43f5e';
                const yTop = Math.min(c.open, c.close);
                const height = Math.abs(c.open - c.close);
                const scale = Math.min(1, Math.max(0, (chartProgress * 10) - i));
                return (
                  <g key={i} opacity={scale}>
                    {/* Wick */}
                    <line x1={c.x} y1={c.high} x2={c.x} y2={c.low} stroke={color} strokeWidth="2" />
                    {/* Body */}
                    <rect x={c.x - 14} y={yTop} width="28" height={Math.max(4, height)} rx="3" fill={color} />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Order Book Liquidity Depth Bars */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#94a3b8' }}>
              {sanitizeForDisplay('عمق اردرهای سفارش')}
            </span>
            <div style={{ flex: 1, height: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 5, overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${65 + depthWave * 0.5}%`, backgroundColor: '#10b981' }} />
              <div style={{ width: `${35 - depthWave * 0.5}%`, backgroundColor: '#f43f5e' }} />
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: 13, color: '#34d399' }}>65% تقاضا</span>
          </div>
        </div>

        {/* RIGHT COLUMN: PnL TELEMETRY & EXECUTION SEAL */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          {/* PnL Card */}
          <div
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(9, 14, 26, 0.95) 100%)',
              borderRadius: 24,
              border: '1.5px solid rgba(16, 185, 129, 0.4)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#a7f3d0' }}>
                {sanitizeForDisplay('سود تحقق‌یافته خالص')}
              </span>
              <div style={{ fontSize: 44, fontWeight: 950, color: '#ffffff', fontFamily: 'monospace', marginTop: 10 }}>
                +${Math.floor(pnlValue).toLocaleString()}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderRadius: 14, background: 'rgba(16, 185, 129, 0.12)' }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#f8fafc' }}>{sanitizeForDisplay('بازده کل سبد')}</span>
              <span style={{ fontFamily: 'monospace', fontSize: 20, fontWeight: 900, color: '#34d399' }}>+34.8%</span>
            </div>
          </div>

          {/* Execution Telemetry Card */}
          <div
            style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.9)',
              borderRadius: 24,
              border: '1.5px solid rgba(56, 189, 248, 0.3)',
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#94a3b8' }}>
                {sanitizeForDisplay('سرعت پردازش الگوریتم')}
              </span>
              <div style={{ fontSize: 36, fontWeight: 950, color: '#38bdf8', fontFamily: 'monospace', marginTop: 8 }}>
                0.24 ms
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#10b981', fontSize: 15, fontWeight: 900 }}>
              <span>✔</span>
              <span>{sanitizeForDisplay('اجرای بدون اسلیپیج در بازار')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* STUDIO SOUNDTRACK */}
      <Audio src={staticFile('music/Brain_Dance.mp3')} volume={0.8} />
    </div>
  );
};
