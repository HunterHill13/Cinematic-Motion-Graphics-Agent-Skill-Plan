/**
 * ============================================================================
 * BAQIYATALLAH UNIVERSITY - STUDENT RESEARCH & TECHNOLOGY COMMITTEE
 * OFFICIAL MOTION GRAPHICS PRODUCTION: STOP-MOTION PAPERCRAFT EDITION
 * ============================================================================
 *
 * Directive: Ministry of Health Exceptional Talents Directive (Band Kaf, Article 2)
 * Narrator: Callirrhoe (Google Gemini Multimodal Audio - Female, Warm, Articulate)
 * Audio Master: public/audio/baqiyatallah_callirrhoe_paper_master_voice.wav (84.47s / 2534f)
 * Composition Duration: 2610 frames @ 30 FPS (~87.0 seconds)
 *
 * Visual Grammar: Pure Open-Canvas Tactile Stop-Motion Papercraft
 * - Zero outer card boxes on the desk
 * - Artisan desk canvas with wood cutting grid, pencil, paperclips, kraft tape
 * - Independent staggered spring physics per child element (idx * 10..16)
 * - Living 30 FPS micro-motion & subtle paper wobble
 * - Handcrafted dashed SVG conduits linking nodes
 * - Zero persistent corner HUDs, zero timeline footers
 * - Zero sound effects (Pure Speech 1.0 + Ducked Acoustic Music 0.14 -> 0.05)
 * ============================================================================
 */

import React, { useMemo } from 'react';
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  staticFile,
  Img,
  Audio,
  Easing,
} from 'remotion';
import { sanitizeForDisplay } from '../../typography/persianSanitizer';
import { UniversalSoundDirector } from '../audio/UniversalSoundDirector';
import { calculateBeatPulse } from '../audio/SemanticMusicDirector';
import { UniversalCameraRig, CameraWaypoint } from '../camera/UniversalCameraRig';
import { YEKAN_BAKH_FONT } from '../../fonts/yekanBakh';
import {
  TactilePaperDeskBackdrop,
  CrumpledPaperCreaseOverlay,
  WoodenPencilSvg,
} from '../library/TactilePaperDeskBackdrop';

export const BAQIYATALLAH_STOP_MOTION_DURATION = 2610; // 87.0s @ 30 FPS
export const BAQIYATALLAH_STOP_MOTION_FPS = 30;
export const BAQIYATALLAH_STOP_MOTION_WIDTH = 1920;
export const BAQIYATALLAH_STOP_MOTION_HEIGHT = 1080;

// Authentic Stop-Motion Color Palette
const PAPER_BG = '#F5EFE6';
const INK_CHARCOAL = '#1C1917';
const INK_MUTED = '#44403C';
const TAPE_KRAFT = 'rgba(217, 179, 126, 0.9)';
const STAMP_RED = '#DC2626';
const SAGE_GREEN = '#15803D';
const BLUEPRINT_NAVY = '#1E3A8A';
const TERRACOTTA = '#EA580C';

export const BaqiyatallahStopMotionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle stop-motion frame quantization for authentic tactile feel
  const quantizedFrame = Math.floor(frame / 2) * 2;

  // Acoustic musical pulse (Cipher2.mp3 @ 150 BPM)
  const pulseData = calculateBeatPulse(frame, 150, fps, 0.005);
  const beatPulse = pulseData.lightPulse;
  const breathingScale = 1 + beatPulse * 0.012;

  // 9 Spatial Desk Waypoints with Multi-Modal Transitions
  const waypoints: CameraWaypoint[] = useMemo(
    () => [
      { startFrame: 0, endFrame: 200, x: 0, y: 0, z: 0, transitionType: 'CAMERA_SPATIAL_FLIGHT' },
      { startFrame: 200, endFrame: 440, x: 1600, y: 0, z: 0, transitionType: 'ELEMENT_KINETIC_DISPERSE' },
      { startFrame: 440, endFrame: 710, x: 3200, y: 0, z: 0, transitionType: 'DEEP_Z_ZOOM_THROUGH' },
      { startFrame: 710, endFrame: 1090, x: 4800, y: 0, z: 0, transitionType: 'TOPOLOGICAL_ANCHOR_MORPH' },
      { startFrame: 1090, endFrame: 1370, x: 6400, y: 0, z: 0, transitionType: 'KINETIC_LIGHT_SWEEP' },
      { startFrame: 1370, endFrame: 1810, x: 8000, y: 0, z: 0, transitionType: 'CAMERA_SPATIAL_FLIGHT' },
      { startFrame: 1810, endFrame: 2090, x: 9600, y: 0, z: 0, transitionType: 'ELEMENT_KINETIC_DISPERSE' },
      { startFrame: 2090, endFrame: 2480, x: 11200, y: 0, z: 0, transitionType: 'DEEP_Z_ZOOM_THROUGH' },
      { startFrame: 2480, endFrame: 2610, x: 12800, y: 0, z: 0, transitionType: 'TOPOLOGICAL_ANCHOR_MORPH' },
    ],
    []
  );

  // Motivated Open-Canvas Camera Trajectory across the Artisan Desk (>= 1200px total travel)
  const camX = interpolate(
    frame,
    [0, 200, 440, 710, 1090, 1370, 1810, 2090, 2480, 2610],
    [0, -900, 0, -900, 0, -900, 0, -900, 0, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
    }
  );

  // Numerical Count Interpolations
  const gpaCounter = interpolate(frame, [760, 910], [0, 16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scoreBSc = interpolate(frame, [2140, 2240], [0, 65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scoreMed = interpolate(frame, [2250, 2340], [0, 110], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scorePhD = interpolate(frame, [2350, 2440], [0, 130], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: BAQIYATALLAH_STOP_MOTION_WIDTH,
        height: BAQIYATALLAH_STOP_MOTION_HEIGHT,
        backgroundColor: PAPER_BG,
        overflow: 'hidden',
        fontFamily: YEKAN_BAKH_FONT,
        direction: 'rtl',
        perspective: 1400,
      }}
    >
      {/* 1. AUDIO LAYER: Studio Narration (Callirrhoe) + Ducked Acoustic BGM (No SFX) */}
      <UniversalSoundDirector
        bgmTrack="music/Cipher2.mp3"
        bgmVolume={0.14}
        themeId="STOP_MOTION_PAPER"
      />
      <Audio
        src={staticFile('audio/baqiyatallah_callirrhoe_paper_master_voice.wav')}
        volume={1.0}
      />

      {/* 2. PHYSICAL TACTILE DESK BACKDROP & WOODEN DRAFTING ARTIFACTS */}
      <TactilePaperDeskBackdrop />
      <CrumpledPaperCreaseOverlay />
      <WoodenPencilSvg
        x={Math.round(1640 + camX * 0.04)}
        y={120}
        rotation={-32}
        scale={0.95}
      />

      {/* 3. OPEN-CANVAS 3D CAMERA RIG ACROSS ALL 9 ARTISAN DESK STATIONS */}
      <UniversalCameraRig mode="PANORAMIC_HORIZONTAL" customWaypoints={waypoints}>
        {/* ============================================================== */}
        {/* ACT 1: INTRO PR LOGO & BAQIYATALLAH UNIVERSITY (f: 0..200)      */}
        {/* ============================================================== */}
        {frame >= 0 && frame < 235 && (
          <div
            style={{
              position: 'absolute',
              width: 1920,
              height: 1080,
              transform: 'translate3d(0px, 0px, 0px)',
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 70,
              padding: '0 120px',
              opacity: interpolate(frame, [0, 15, 185, 215], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {/* PR Logo Physical Paper Plaque */}
            {(() => {
              const springVal = spring({
                frame: quantizedFrame,
                fps,
                config: { damping: 13, stiffness: 120 },
              });
              const wobble = Math.round(Math.sin((quantizedFrame + 10) * 0.1) * 3);
              return (
                <div
                  style={{
                    position: 'relative',
                    width: 280,
                    height: 280,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    padding: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow:
                      '0 18px 36px rgba(45, 30, 15, 0.18), 0 3px 10px rgba(45, 30, 15, 0.1)',
                    transform: `translate3d(0px, ${Math.round((1 - springVal) * 40 + wobble)}px, 0px) rotate(-1.5deg) scale(${springVal * breathingScale})`,
                  }}
                >
                  {/* Top Kraft Tape Strip */}
                  <div
                    style={{
                      position: 'absolute',
                      top: -16,
                      left: 70,
                      width: 140,
                      height: 32,
                      backgroundColor: TAPE_KRAFT,
                      transform: 'rotate(2deg)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Img
                    src={staticFile('logos/pr_logo.png')}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              );
            })()}

            {/* Introductory Typography */}
            {(() => {
              const titleSpring = spring({
                frame: Math.max(0, quantizedFrame - 10),
                fps,
                config: { damping: 14, stiffness: 115 },
              });
              const subSpring = spring({
                frame: Math.max(0, quantizedFrame - 22),
                fps,
                config: { damping: 15, stiffness: 110 },
              });
              return (
                <div
                  style={{
                    maxWidth: 960,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    direction: 'rtl',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      backgroundColor: '#FEF3C7',
                      border: '1px dashed #D97706',
                      padding: '6px 18px',
                      borderRadius: 8,
                      color: '#92400E',
                      fontSize: 22,
                      fontWeight: 800,
                      marginBottom: 16,
                      transform: `translate3d(0px, ${Math.round((1 - titleSpring) * 20)}px, 0px)`,
                      opacity: titleSpring,
                    }}
                  >
                    <span>📌</span>
                    <span>{sanitizeForDisplay('روابط عمومی کمیته تحقیقات دانشجویی')}</span>
                  </div>
                  <h1
                    style={{
                      fontSize: 54,
                      fontWeight: 950,
                      color: INK_CHARCOAL,
                      lineHeight: 1.35,
                      margin: '0 0 16px 0',
                      textShadow: '0 2px 4px rgba(0,0,0,0.06)',
                      transform: `translate3d(0px, ${Math.round((1 - titleSpring) * 30)}px, 0px)`,
                      opacity: titleSpring,
                    }}
                  >
                    {sanitizeForDisplay(
                      'روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بقیةالله (عج) تقدیم می‌کند!'
                    )}
                  </h1>
                  <p
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: INK_MUTED,
                      margin: 0,
                      transform: `translate3d(0px, ${Math.round((1 - subSpring) * 20)}px, 0px)`,
                      opacity: subSpring,
                    }}
                  >
                    {sanitizeForDisplay(
                      'راهنمای جامع آیین‌نامه انتخاب دانشجوی پژوهشگر و فناور برجسته کشور'
                    )}
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 2: INQUIRY HOOK (f: 200..440)                               */}
        {/* ============================================================== */}
        {frame >= 180 && frame < 470 && (
          <div
            style={{
              position: 'absolute',
              width: 1920,
              height: 1080,
              transform: 'translate3d(1600px, 0px, 0px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 140px',
              opacity: interpolate(frame, [190, 210, 425, 455], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {/* Header Ribbon */}
            {(() => {
              const headSpring = spring({
                frame: Math.max(0, quantizedFrame - 200),
                fps,
                config: { damping: 13, stiffness: 120 },
              });
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: 44,
                    transform: `translate3d(0px, ${Math.round((1 - headSpring) * 30)}px, 0px)`,
                    opacity: headSpring,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#E0E7FF',
                      border: '1px dashed #4F46E5',
                      padding: '6px 20px',
                      borderRadius: 8,
                      color: '#3730A3',
                      fontSize: 22,
                      fontWeight: 800,
                      marginBottom: 14,
                    }}
                  >
                    {sanitizeForDisplay('فراخوان ملی استعدادهای درخشان')}
                  </div>
                  <h2
                    style={{
                      fontSize: 50,
                      fontWeight: 950,
                      color: INK_CHARCOAL,
                      maxWidth: 1200,
                      lineHeight: 1.4,
                      margin: '0 0 10px 0',
                    }}
                  >
                    {sanitizeForDisplay(
                      'آیا می‌دانید چگونه می‌توانید به عنوان دانشجوی پژوهشگر یا فناور برجسته کشور انتخاب شوید؟!'
                    )}
                  </h2>
                </div>
              );
            })()}

            {/* 3 Staggered Kraft Paper Note Cards Pinned to the Desk */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                gap: 36,
                width: '100%',
                justifyContent: 'center',
              }}
            >
              {[
                {
                  icon: '📄',
                  title: 'پژوهش اصیل',
                  desc: 'مقالات علمی معتبر ISI و Scopus',
                  tilt: -2.0,
                  color: '#EFF6FF',
                  border: '#93C5FD',
                },
                {
                  icon: '💡',
                  title: 'نوآوری سلامت',
                  desc: 'طرح‌های فناورانه، اختراع و تولید محصول',
                  tilt: 1.5,
                  color: '#ECFDF5',
                  border: '#A7F3D0',
                },
                {
                  icon: '🏆',
                  title: 'افتخارات علمی',
                  desc: 'تالیف کتب و کسب رتبه‌های المپیاد',
                  tilt: -1.2,
                  color: '#FFFBEB',
                  border: '#FDE68A',
                },
              ].map((card, idx) => (
                <div
                  key={idx * 1}
                  style={{
                    flex: '0 0 340px',
                    backgroundColor: card.color,
                    border: `2px solid ${card.border}`,
                    borderRadius: 14,
                    padding: '24px 22px',
                    boxShadow:
                      '0 12px 24px rgba(45, 30, 15, 0.12), 0 2px 6px rgba(45, 30, 15, 0.08)',
                    transform: `translate3d(0px, ${Math.round(
                      (1 -
                        spring({
                          frame: Math.max(0, quantizedFrame - (220 + idx * 14)),
                          fps,
                          config: { damping: 13, stiffness: 125 },
                        })) *
                        40 +
                        Math.sin((quantizedFrame + idx * 20) * 0.08) * 3
                    )}px, 0px) rotate(${card.tilt}deg) scale(${spring({
                      frame: Math.max(0, quantizedFrame - (220 + idx * 14)),
                      fps,
                      config: { damping: 13, stiffness: 125 },
                    })})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: 44, marginBottom: 12 }}>{card.icon}</span>
                  <h3
                    style={{
                      fontSize: 28,
                      fontWeight: 900,
                      color: INK_CHARCOAL,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {sanitizeForDisplay(card.title)}
                  </h3>
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: INK_MUTED,
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {sanitizeForDisplay(card.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 3: GUIDELINE BLUEPRINT (f: 440..710)                        */}
        {/* ============================================================== */}
        {frame >= 420 && frame < 740 && (
          <div
            style={{
              position: 'absolute',
              width: 1920,
              height: 1080,
              transform: 'translate3d(3200px, 0px, 0px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 120px',
              opacity: interpolate(frame, [430, 450, 695, 725], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {/* Blueprint Header */}
            {(() => {
              const bpSpring = spring({
                frame: Math.max(0, quantizedFrame - 440),
                fps,
                config: { damping: 14, stiffness: 115 },
              });
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: 40,
                    transform: `translate3d(0px, ${Math.round((1 - bpSpring) * 30)}px, 0px)`,
                    opacity: bpSpring,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#EFF6FF',
                      border: '1px dashed #2563EB',
                      padding: '6px 20px',
                      borderRadius: 8,
                      color: BLUEPRINT_NAVY,
                      fontSize: 22,
                      fontWeight: 800,
                      marginBottom: 14,
                    }}
                  >
                    {sanitizeForDisplay('سند رسمی وزارت بهداشت')}
                  </div>
                  <h2
                    style={{
                      fontSize: 48,
                      fontWeight: 950,
                      color: INK_CHARCOAL,
                      maxWidth: 1240,
                      lineHeight: 1.4,
                      margin: '0 0 10px 0',
                    }}
                  >
                    {sanitizeForDisplay(
                      'دستورالعمل بند «کاف»، ماده ۲ از آیین‌نامه استعدادهای درخشان وزارت بهداشت'
                    )}
                  </h2>
                  <p
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: TERRACOTTA,
                      margin: 0,
                    }}
                  >
                    {sanitizeForDisplay('مسیر جامع امتیازدهی به فعالیت‌های شماست!')}
                  </p>
                </div>
              );
            })()}

            {/* Official Red Stamp + 3 Stage Milestones */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                gap: 50,
              }}
            >
              {/* Official Red Stamp Seal */}
              {(() => {
                const stampSpring = spring({
                  frame: Math.max(0, quantizedFrame - 470),
                  fps,
                  config: { damping: 11, stiffness: 150 },
                });
                const scaleVal = interpolate(stampSpring, [0, 0.7, 1], [2.4, 0.95, 1.0]);
                return (
                  <div
                    style={{
                      width: 220,
                      height: 220,
                      borderRadius: '50%',
                      border: `4px double ${STAMP_RED}`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: STAMP_RED,
                      transform: `rotate(-8deg) scale(${scaleVal * breathingScale})`,
                      opacity: stampSpring,
                      boxShadow: '0 8px 20px rgba(220, 38, 38, 0.2)',
                    }}
                  >
                    <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: 1 }}>
                      وزارت بهداشت
                    </span>
                    <span style={{ fontSize: 32, fontWeight: 950, margin: '4px 0' }}>
                      بند «کاف»
                    </span>
                    <span style={{ fontSize: 20, fontWeight: 800 }}>ماده ۲</span>
                  </div>
                );
              })()}

              {/* 3 Step Tags */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { step: 'گام اول', label: 'احراز ۳ شرط اصلی ورود به فرآیند ارزیابی' },
                  { step: 'گام دوم', label: 'توزیع متوازن امتیازها در حداقل ۶ ماده مختلف' },
                  { step: 'گام سوم', label: 'کسب حدنصاب مجموع امتیاز متناسب با مقطع تحصیلی' },
                ].map((item, idx) => (
                  <div
                    key={idx * 1}
                    style={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      alignItems: 'center',
                      gap: 18,
                      backgroundColor: '#FFFFFF',
                      border: '1.5px solid #CBD5E1',
                      borderRadius: 10,
                      padding: '12px 24px',
                      boxShadow: '0 6px 14px rgba(0,0,0,0.06)',
                      transform: `translate3d(0px, ${Math.round(
                        (1 -
                          spring({
                            frame: Math.max(0, quantizedFrame - (490 + idx * 16)),
                            fps,
                            config: { damping: 14, stiffness: 120 },
                          })) *
                          25
                      )}px, 0px)`,
                      opacity: spring({
                        frame: Math.max(0, quantizedFrame - (490 + idx * 16)),
                        fps,
                        config: { damping: 14, stiffness: 120 },
                      }),
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#FEF3C7',
                        color: '#92400E',
                        padding: '4px 12px',
                        borderRadius: 6,
                        fontSize: 20,
                        fontWeight: 900,
                      }}
                    >
                      {item.step}
                    </span>
                    <span
                      style={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: INK_CHARCOAL,
                      }}
                    >
                      {sanitizeForDisplay(item.label)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 4: 3 CONDITIONS + CONDITION 1: GPA >= 16 (f: 710..1090)     */}
        {/* ============================================================== */}
        {frame >= 690 && frame < 1120 && (
          <div
            style={{
              position: 'absolute',
              width: 1920,
              height: 1080,
              transform: 'translate3d(4800px, 0px, 0px)',
              display: 'flex',
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 80,
              padding: '0 120px',
              opacity: interpolate(frame, [700, 720, 1075, 1105], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {/* Condition 1: Animated Circular Paper Gauge */}
            {(() => {
              const gaugeSpring = spring({
                frame: Math.max(0, quantizedFrame - 720),
                fps,
                config: { damping: 13, stiffness: 120 },
              });
              const strokeCirc = 2 * Math.PI * 105;
              const progressRatio = Math.min(1, gpaCounter / 20);
              const strokeOffset = strokeCirc * (1 - progressRatio);

              return (
                <div
                  style={{
                    position: 'relative',
                    width: 290,
                    height: 290,
                    backgroundColor: '#FFFFFF',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow:
                      '0 18px 36px rgba(45, 30, 15, 0.16), 0 4px 10px rgba(45, 30, 15, 0.08)',
                    transform: `translate3d(0px, ${Math.round((1 - gaugeSpring) * 35)}px, 0px) scale(${gaugeSpring * breathingScale})`,
                  }}
                >
                  <svg
                    width={270}
                    height={270}
                    viewBox="0 0 270 270"
                    style={{ position: 'absolute', transform: 'rotate(-90deg)' }}
                  >
                    <circle
                      cx={135}
                      cy={135}
                      r={105}
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth={16}
                    />
                    <circle
                      cx={135}
                      cy={135}
                      r={105}
                      fill="none"
                      stroke={SAGE_GREEN}
                      strokeWidth={16}
                      strokeDasharray={strokeCirc}
                      strokeDashoffset={strokeOffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      direction: 'rtl',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 56,
                        fontWeight: 950,
                        color: INK_CHARCOAL,
                        fontFamily: 'monospace',
                      }}
                    >
                      {gpaCounter.toFixed(1)}
                    </span>
                    <span style={{ fontSize: 20, fontWeight: 800, color: SAGE_GREEN }}>
                      {sanitizeForDisplay('حداقل از ۲۰')}
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* Condition 1 Headlines */}
            {(() => {
              const textSpring = spring({
                frame: Math.max(0, quantizedFrame - 730),
                fps,
                config: { damping: 14, stiffness: 115 },
              });
              return (
                <div
                  style={{
                    maxWidth: 820,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    direction: 'rtl',
                    transform: `translate3d(0px, ${Math.round((1 - textSpring) * 30)}px, 0px)`,
                    opacity: textSpring,
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      backgroundColor: '#FEF2F2',
                      border: '1px dashed #EF4444',
                      padding: '6px 18px',
                      borderRadius: 8,
                      color: STAMP_RED,
                      fontSize: 22,
                      fontWeight: 800,
                      marginBottom: 16,
                    }}
                  >
                    <span>⚠️</span>
                    <span>
                      {sanitizeForDisplay('اما قبل از محاسبه امتیازها، ۳ شرط اصلی وجود دارد')}
                    </span>
                  </div>
                  <h2
                    style={{
                      fontSize: 50,
                      fontWeight: 950,
                      color: INK_CHARCOAL,
                      lineHeight: 1.35,
                      margin: '0 0 16px 0',
                    }}
                  >
                    {sanitizeForDisplay(
                      'شرط اول؛ معدل کل شما در مقطع فعلی باید حداقل ۱۶ باشد.'
                    )}
                  </h2>
                  <p
                    style={{
                      fontSize: 26,
                      fontWeight: 700,
                      color: INK_MUTED,
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {sanitizeForDisplay(
                      'احراز حداقل معدل کل ۱۶ از ۲۰ در مقطع تحصیلی فعلی به عنوان نخستین پیش‌نیاز الزامی ورود به فرآیند امتیازدهی'
                    )}
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 5: CONDITION 2: ACADEMIC YEARS & DISCIPLINARY (f: 1090..1370)*/}
        {/* ============================================================== */}
        {frame >= 1070 && frame < 1400 && (
          <div
            style={{
              position: 'absolute',
              width: 1920,
              height: 1080,
              transform: 'translate3d(6400px, 0px, 0px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 120px',
              opacity: interpolate(frame, [1080, 1100, 1355, 1385], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {/* Header */}
            {(() => {
              const headSpring = spring({
                frame: Math.max(0, quantizedFrame - 1090),
                fps,
                config: { damping: 14, stiffness: 115 },
              });
              return (
                <div
                  style={{
                    textAlign: 'center',
                    marginBottom: 44,
                    transform: `translate3d(0px, ${Math.round((1 - headSpring) * 25)}px, 0px)`,
                    opacity: headSpring,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#ECFDF5',
                      border: '1px dashed #10B981',
                      padding: '6px 20px',
                      borderRadius: 8,
                      color: SAGE_GREEN,
                      fontSize: 22,
                      fontWeight: 800,
                      marginBottom: 14,
                      display: 'inline-block',
                    }}
                  >
                    {sanitizeForDisplay('شرط دوم از شروط سه‌گانه')}
                  </div>
                  <h2
                    style={{
                      fontSize: 48,
                      fontWeight: 950,
                      color: INK_CHARCOAL,
                      maxWidth: 1100,
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {sanitizeForDisplay(
                      'شرط دوم؛ باید در سنوات مجاز تحصیلی باشید و تأییدیه کمیته انضباطی را دریافت کنید.'
                    )}
                  </h2>
                </div>
              );
            })()}

            {/* Dual Pinned Paper Approval Certificates */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                gap: 50,
                justifyContent: 'center',
              }}
            >
              {[
                {
                  icon: '⏳',
                  stamp: 'تأیید سنوات',
                  title: 'سنوات مجاز تحصیلی',
                  desc: 'اشتغال به تحصیل در سقف سنوات قانونی مصوب و عدم اتمام مهلت مجاز',
                  tilt: -2.5,
                },
                {
                  icon: '⚖️',
                  stamp: 'تأییدیه انضباطی',
                  title: 'تأییدیه کمیته انضباطی',
                  desc: 'اخذ گواهی رسمی حسن اخلاق و عدم محکومیت قطعی در کمیته انضباطی دانشگاه',
                  tilt: 2.0,
                },
              ].map((cert, idx) => (
                <div
                  key={idx * 1}
                  style={{
                    width: 440,
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #E2E8F0',
                    borderRadius: 16,
                    padding: '30px 28px',
                    boxShadow: '0 14px 28px rgba(45, 30, 15, 0.12)',
                    transform: `translate3d(0px, ${Math.round(
                      (1 -
                        spring({
                          frame: Math.max(0, quantizedFrame - (1120 + idx * 20)),
                          fps,
                          config: { damping: 13, stiffness: 125 },
                        })) *
                        35
                    )}px, 0px) rotate(${cert.tilt}deg) scale(${spring({
                      frame: Math.max(0, quantizedFrame - (1120 + idx * 20)),
                      fps,
                      config: { damping: 13, stiffness: 125 },
                    })})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  {/* Metal Paperclip Graphic */}
                  <div
                    style={{
                      position: 'absolute',
                      top: -14,
                      right: 40,
                      width: 20,
                      height: 48,
                      borderRadius: 10,
                      border: '3px solid #94A3B8',
                      backgroundColor: 'transparent',
                    }}
                  />
                  <span style={{ fontSize: 50, marginBottom: 12 }}>{cert.icon}</span>
                  <h3
                    style={{
                      fontSize: 30,
                      fontWeight: 900,
                      color: INK_CHARCOAL,
                      margin: '0 0 10px 0',
                    }}
                  >
                    {sanitizeForDisplay(cert.title)}
                  </h3>
                  <p
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: INK_MUTED,
                      margin: '0 0 20px 0',
                      lineHeight: 1.45,
                    }}
                  >
                    {sanitizeForDisplay(cert.desc)}
                  </p>
                  {/* Green Approval Stamp */}
                  <div
                    style={{
                      border: `2px dashed ${SAGE_GREEN}`,
                      borderRadius: 8,
                      padding: '4px 18px',
                      color: SAGE_GREEN,
                      fontSize: 20,
                      fontWeight: 900,
                    }}
                  >
                    {cert.stamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 6: CONDITION 3: 6 ARTICLES & MANDATORY PAPER/TECH (f: 1370..1810) */}
        {/* ============================================================== */}
        {frame >= 1350 && frame < 1840 && (
          <div
            style={{
              position: 'absolute',
              width: 1920,
              height: 1080,
              transform: 'translate3d(8000px, 0px, 0px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 80px',
              opacity: interpolate(frame, [1360, 1380, 1795, 1825], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {/* Header */}
            {(() => {
              const hSpring = spring({
                frame: Math.max(0, quantizedFrame - 1370),
                fps,
                config: { damping: 14, stiffness: 115 },
              });
              return (
                <div
                  style={{
                    textAlign: 'center',
                    marginBottom: 36,
                    transform: `translate3d(0px, ${Math.round((1 - hSpring) * 25)}px, 0px)`,
                    opacity: hSpring,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#FFFBEB',
                      border: '1px dashed #D97706',
                      padding: '6px 20px',
                      borderRadius: 8,
                      color: TERRACOTTA,
                      fontSize: 22,
                      fontWeight: 800,
                      marginBottom: 12,
                      display: 'inline-block',
                    }}
                  >
                    {sanitizeForDisplay('شرط سوم از شروط سه‌گانه')}
                  </div>
                  <h2
                    style={{
                      fontSize: 44,
                      fontWeight: 950,
                      color: INK_CHARCOAL,
                      maxWidth: 1350,
                      lineHeight: 1.4,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {sanitizeForDisplay(
                      'شرط سوم؛ امتیازهای شما باید حداقل از ۶ ماده مختلف آیین‌نامه کسب شود؛'
                    )}
                  </h2>
                  <p
                    style={{
                      fontSize: 28,
                      fontWeight: 900,
                      color: STAMP_RED,
                      margin: 0,
                    }}
                  >
                    {sanitizeForDisplay('که حضور مقاله یا فعالیت فناورانه در آن اجباری است!')}
                  </p>
                </div>
              );
            })()}

            {/* 6 Pinned Article Cards Grid */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                gap: 20,
                width: '100%',
                justifyContent: 'center',
              }}
            >
              {[
                {
                  code: 'ماده ۱',
                  name: 'مقاله پژوهشی',
                  icon: '📄',
                  mandatory: true,
                },
                {
                  code: 'ماده ۲',
                  name: 'فعالیت فناورانه',
                  icon: '🔬',
                  mandatory: true,
                },
                { code: 'ماده ۳', name: 'کتاب تالیف/ترجمه', icon: '📚', mandatory: false },
                { code: 'ماده ۴', name: 'کنگره و همایش', icon: '🎤', mandatory: false },
                { code: 'ماده ۵', name: 'طرح تحقیقاتی', icon: '📊', mandatory: false },
                { code: 'ماده ۶', name: 'جوایز و المپیاد', icon: '🏅', mandatory: false },
              ].map((art, idx) => (
                <div
                  key={idx * 1}
                  style={{
                    flex: '0 0 250px',
                    backgroundColor: art.mandatory ? '#FEF2F2' : '#FFFFFF',
                    border: art.mandatory
                      ? `2.5px solid ${STAMP_RED}`
                      : '1.5px solid #CBD5E1',
                    borderRadius: 14,
                    padding: '20px 16px',
                    boxShadow: '0 8px 18px rgba(45, 30, 15, 0.1)',
                    transform: `translate3d(0px, ${Math.round(
                      (1 -
                        spring({
                          frame: Math.max(0, quantizedFrame - (1400 + idx * 10)),
                          fps,
                          config: { damping: 13, stiffness: 125 },
                        })) *
                        35
                    )}px, 0px) scale(${spring({
                      frame: Math.max(0, quantizedFrame - (1400 + idx * 10)),
                      fps,
                      config: { damping: 13, stiffness: 125 },
                    })})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <span style={{ fontSize: 38, marginBottom: 8 }}>{art.icon}</span>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 900,
                      color: art.mandatory ? STAMP_RED : '#64748B',
                      marginBottom: 4,
                    }}
                  >
                    {art.code}
                  </span>
                  <h4
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: INK_CHARCOAL,
                      margin: '0 0 10px 0',
                    }}
                  >
                    {sanitizeForDisplay(art.name)}
                  </h4>
                  {art.mandatory ? (
                    <span
                      style={{
                        backgroundColor: STAMP_RED,
                        color: '#FFFFFF',
                        fontSize: 15,
                        fontWeight: 900,
                        padding: '3px 12px',
                        borderRadius: 999,
                      }}
                    >
                      اجباری
                    </span>
                  ) : (
                    <span
                      style={{
                        backgroundColor: '#F1F5F9',
                        color: '#475569',
                        fontSize: 15,
                        fontWeight: 700,
                        padding: '3px 12px',
                        borderRadius: 999,
                      }}
                    >
                      اختیاری
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 7: 1-YEAR POST-GRADUATION TIMELINE (f: 1810..2090)          */}
        {/* ============================================================== */}
        {frame >= 1790 && frame < 2120 && (
          <div
            style={{
              position: 'absolute',
              width: 1920,
              height: 1080,
              transform: 'translate3d(9600px, 0px, 0px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 120px',
              opacity: interpolate(frame, [1800, 1820, 2075, 2105], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {/* Caution Badge */}
            {(() => {
              const cautionSpring = spring({
                frame: Math.max(0, quantizedFrame - 1810),
                fps,
                config: { damping: 14, stiffness: 120 },
              });
              return (
                <div
                  style={{
                    textAlign: 'center',
                    marginBottom: 44,
                    transform: `translate3d(0px, ${Math.round((1 - cautionSpring) * 25)}px, 0px)`,
                    opacity: cautionSpring,
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      backgroundColor: '#FEF2F2',
                      border: '1.5px dashed #EF4444',
                      padding: '6px 22px',
                      borderRadius: 8,
                      color: STAMP_RED,
                      fontSize: 22,
                      fontWeight: 800,
                      marginBottom: 14,
                    }}
                  >
                    <span>⚠️</span>
                    <span>{sanitizeForDisplay('دقت کنید! بازه زمانی معتبر ارائه مدارک')}</span>
                  </div>
                  <h2
                    style={{
                      fontSize: 48,
                      fontWeight: 950,
                      color: INK_CHARCOAL,
                      maxWidth: 1200,
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {sanitizeForDisplay(
                      'دقت کنید! تمام مدارک باید مربوط به دوران تحصیل، یا نهایتاً تا ۱ سال پس از فارغ‌التحصیلی باشد.'
                    )}
                  </h2>
                </div>
              );
            })()}

            {/* Paper Ruler Timeline */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                gap: 40,
                alignItems: 'center',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              {[
                {
                  step: '۱. طول دوران تحصیل',
                  desc: 'پذیرش کامل و نامحدود تمام مدارک پژوهشی و فناورانه',
                  status: 'مجاز',
                  color: SAGE_GREEN,
                },
                {
                  step: '۲. تاریخ فراغت از تحصیل',
                  desc: 'آغاز شمارش مهلت قانونی یک‌ساله جهت ثبت و ارسال پرونده',
                  status: 'مبنای محاسبه',
                  color: BLUEPRINT_NAVY,
                },
                {
                  step: '۳. تا ۱ سال پس از فارغ‌التحصیلی',
                  desc: 'پایان قطعی مهلت قانونی؛ مدارک پس از آن بررسی نخواهد شد',
                  status: 'سقف نهایی',
                  color: STAMP_RED,
                },
              ].map((point, idx) => (
                <div
                  key={idx * 1}
                  style={{
                    flex: '0 0 360px',
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #E2E8F0',
                    borderRadius: 14,
                    padding: '24px 20px',
                    boxShadow: '0 10px 22px rgba(45, 30, 15, 0.1)',
                    transform: `translate3d(0px, ${Math.round(
                      (1 -
                        spring({
                          frame: Math.max(0, quantizedFrame - (1830 + idx * 16)),
                          fps,
                          config: { damping: 13, stiffness: 125 },
                        })) *
                        35
                    )}px, 0px) scale(${spring({
                      frame: Math.max(0, quantizedFrame - (1830 + idx * 16)),
                      fps,
                      config: { damping: 13, stiffness: 125 },
                    })})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      backgroundColor: `${point.color}18`,
                      color: point.color,
                      padding: '4px 14px',
                      borderRadius: 6,
                      fontSize: 18,
                      fontWeight: 900,
                      marginBottom: 10,
                    }}
                  >
                    {point.status}
                  </span>
                  <h3
                    style={{
                      fontSize: 26,
                      fontWeight: 900,
                      color: INK_CHARCOAL,
                      margin: '0 0 8px 0',
                    }}
                  >
                    {sanitizeForDisplay(point.step)}
                  </h3>
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: INK_MUTED,
                      margin: 0,
                      lineHeight: 1.45,
                    }}
                  >
                    {sanitizeForDisplay(point.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 8: SCORE THRESHOLDS: 65, 110, 130 (f: 2090..2480)           */}
        {/* ============================================================== */}
        {frame >= 2070 && frame < 2510 && (
          <div
            style={{
              position: 'absolute',
              width: 1920,
              height: 1080,
              transform: 'translate3d(11200px, 0px, 0px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 100px',
              opacity: interpolate(frame, [2080, 2100, 2465, 2495], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {/* Header */}
            {(() => {
              const headSpring = spring({
                frame: Math.max(0, quantizedFrame - 2090),
                fps,
                config: { damping: 14, stiffness: 115 },
              });
              return (
                <div
                  style={{
                    textAlign: 'center',
                    marginBottom: 44,
                    transform: `translate3d(0px, ${Math.round((1 - headSpring) * 25)}px, 0px)`,
                    opacity: headSpring,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#FEF3C7',
                      border: '1px dashed #D97706',
                      padding: '6px 20px',
                      borderRadius: 8,
                      color: '#92400E',
                      fontSize: 22,
                      fontWeight: 800,
                      marginBottom: 12,
                      display: 'inline-block',
                    }}
                  >
                    {sanitizeForDisplay('حدنصاب قبولی در دانشگاه‌های تیپ یک')}
                  </div>
                  <h2
                    style={{
                      fontSize: 48,
                      fontWeight: 950,
                      color: INK_CHARCOAL,
                      maxWidth: 1200,
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    {sanitizeForDisplay(
                      'حدنصاب قبولی، بسته به تیپ دانشگاه و مقطع شما فرق می‌کند:'
                    )}
                  </h2>
                </div>
              );
            })()}

            {/* 3 Papercraft Podium Score Cards */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                gap: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              {[
                {
                  level: 'کارشناسی',
                  sub: 'دانشگاه‌های تیپ یک',
                  score: Math.round(scoreBSc),
                  height: 290,
                  color: BLUEPRINT_NAVY,
                },
                {
                  level: 'پزشکی عمومی',
                  sub: 'دکتری حرفه‌ای عمومی',
                  score: Math.round(scoreMed),
                  height: 330,
                  color: SAGE_GREEN,
                },
                {
                  level: 'دکترای تخصصی',
                  sub: 'Ph.D و دستیاری تخصصی',
                  score: Math.round(scorePhD),
                  height: 370,
                  color: TERRACOTTA,
                },
              ].map((podium, idx) => (
                <div
                  key={idx * 1}
                  style={{
                    flex: '0 0 360px',
                    height: podium.height,
                    backgroundColor: '#FFFFFF',
                    border: `2px solid ${podium.color}`,
                    borderRadius: 16,
                    padding: '24px 20px',
                    boxShadow: '0 14px 28px rgba(45, 30, 15, 0.12)',
                    transform: `translate3d(0px, ${Math.round(
                      (1 -
                        spring({
                          frame: Math.max(0, quantizedFrame - (2110 + idx * 16)),
                          fps,
                          config: { damping: 13, stiffness: 125 },
                        })) *
                        40
                    )}px, 0px) scale(${spring({
                      frame: Math.max(0, quantizedFrame - (2110 + idx * 16)),
                      fps,
                      config: { damping: 13, stiffness: 125 },
                    })})`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 900,
                      color: INK_CHARCOAL,
                      marginBottom: 4,
                    }}
                  >
                    {sanitizeForDisplay(podium.level)}
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: INK_MUTED,
                      marginBottom: 16,
                    }}
                  >
                    {sanitizeForDisplay(podium.sub)}
                  </span>
                  <div
                    style={{
                      fontSize: 68,
                      fontWeight: 950,
                      color: podium.color,
                      fontFamily: 'monospace',
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    {podium.score}
                  </div>
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: podium.color,
                    }}
                  >
                    امتیاز
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ACT 9: OUTRO DUAL LOGOS & CLOSING CALLOUT (f: 2480..2610)       */}
        {/* ============================================================== */}
        {frame >= 2465 && (
          <div
            style={{
              position: 'absolute',
              width: 1920,
              height: 1080,
              transform: 'translate3d(12800px, 0px, 0px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 120px',
              opacity: interpolate(frame, [2470, 2495], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            {/* Dual Logos Paper Plaques */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                gap: 50,
                alignItems: 'center',
                marginBottom: 36,
              }}
            >
              {[
                {
                  logo: 'logos/university_logo.png',
                  title: 'دانشگاه علوم پزشکی بقیةالله (عج)',
                  tilt: -2.0,
                },
                {
                  logo: 'logos/committee_logo.png',
                  title: 'کمیته تحقیقات و فناوری دانشجویی',
                  tilt: 2.0,
                },
              ].map((plaque, idx) => (
                <div
                  key={idx * 1}
                  style={{
                    width: 260,
                    height: 260,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    padding: 22,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 18px 36px rgba(45, 30, 15, 0.16)',
                    transform: `translate3d(0px, ${Math.round(
                      (1 -
                        spring({
                          frame: Math.max(0, quantizedFrame - (2485 + idx * 14)),
                          fps,
                          config: { damping: 13, stiffness: 120 },
                        })) *
                        35
                    )}px, 0px) rotate(${plaque.tilt}deg) scale(${spring({
                      frame: Math.max(0, quantizedFrame - (2485 + idx * 14)),
                      fps,
                      config: { damping: 13, stiffness: 120 },
                    })})`,
                  }}
                >
                  <Img
                    src={staticFile(plaque.logo)}
                    style={{
                      width: '78%',
                      height: '78%',
                      objectFit: 'contain',
                      marginBottom: 10,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: INK_CHARCOAL,
                      textAlign: 'center',
                    }}
                  >
                    {sanitizeForDisplay(plaque.title)}
                  </span>
                </div>
              ))}
            </div>

            {/* Concluding Headline */}
            {(() => {
              const outSpring = spring({
                frame: Math.max(0, quantizedFrame - 2510),
                fps,
                config: { damping: 14, stiffness: 115 },
              });
              return (
                <div
                  style={{
                    textAlign: 'center',
                    transform: `translate3d(0px, ${Math.round((1 - outSpring) * 25)}px, 0px)`,
                    opacity: outSpring,
                  }}
                >
                  <h2
                    style={{
                      fontSize: 46,
                      fontWeight: 950,
                      color: INK_CHARCOAL,
                      lineHeight: 1.4,
                      maxWidth: 1100,
                      margin: '0 0 10px 0',
                    }}
                  >
                    {sanitizeForDisplay(
                      'در ویدیوهای بعدی، روش کسب این امتیازها را گام‌به‌گام بررسی می‌کنیم. با ما همراه باشید!'
                    )}
                  </h2>
                  <p
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: SAGE_GREEN,
                      margin: 0,
                    }}
                  >
                    {sanitizeForDisplay(
                      'دانشگاه علوم پزشکی بقیةالله (عج) • کمیته تحقیقات و فناوری دانشجویی'
                    )}
                  </p>
                </div>
              );
            })()}
          </div>
        )}
      </UniversalCameraRig>
    </div>
  );
};
