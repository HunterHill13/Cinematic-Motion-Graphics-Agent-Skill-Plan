import React from 'react';
import { Composition } from 'remotion';

// ============================================================================
// 1. THE 6 MASTER PRODUCTION ARCHETYPES (AWESOME OPUS 5.5 CATALOG)
// ============================================================================
import {
  DarkGraphiteTechMaster,
  DARK_GRAPHITE_DURATION,
  DARK_GRAPHITE_FPS,
  DARK_GRAPHITE_WIDTH,
  DARK_GRAPHITE_HEIGHT,
} from './motion/templates/DarkGraphiteTechMaster';
import {
  ContinuousUiMorphMaster,
  CONTINUOUS_UI_DURATION,
  CONTINUOUS_UI_FPS,
  CONTINUOUS_UI_WIDTH,
  CONTINUOUS_UI_HEIGHT,
} from './motion/templates/ContinuousUiMorphMaster';
import {
  QuantumBioDeepZMaster,
  QUANTUM_BIO_DURATION,
  QUANTUM_BIO_FPS,
  QUANTUM_BIO_WIDTH,
  QUANTUM_BIO_HEIGHT,
} from './motion/templates/QuantumBioDeepZMaster';
import {
  KineticArchitecturalTypoMaster,
  KINETIC_TYPO_DURATION,
  KINETIC_TYPO_FPS,
  KINETIC_TYPO_WIDTH,
  KINETIC_TYPO_HEIGHT,
} from './motion/templates/KineticArchitecturalTypoMaster';
import {
  BentoGridSaasMaster,
  BENTO_GRID_DURATION,
  BENTO_GRID_FPS,
  BENTO_GRID_WIDTH,
  BENTO_GRID_HEIGHT,
} from './motion/templates/BentoGridSaasMaster';
import {
  BaqiyatallahResearchAwardsScene,
  BAQIYATALLAH_AWARDS_DURATION,
  BAQIYATALLAH_AWARDS_FPS,
  BAQIYATALLAH_AWARDS_WIDTH,
  BAQIYATALLAH_AWARDS_HEIGHT,
} from './motion/compositions/BaqiyatallahResearchAwardsScene';
import {
  BaqiyatallahArchitecturalTypoScene,
  ARCH_TYPO_DURATION,
  ARCH_TYPO_FPS,
  ARCH_TYPO_WIDTH,
  ARCH_TYPO_HEIGHT,
} from './motion/compositions/BaqiyatallahArchitecturalTypoScene';
import {
  FinTechTradingMaster,
  FINTECH_DURATION,
  FINTECH_FPS,
  FINTECH_WIDTH,
  FINTECH_HEIGHT,
} from './motion/templates/FinTechTradingMaster';
import {
  StopMotionPaperMaster,
  STOP_MOTION_DURATION,
  STOP_MOTION_FPS,
  STOP_MOTION_WIDTH,
  STOP_MOTION_HEIGHT,
} from './motion/templates/StopMotionPaperMaster';
import {
  TechnicalBlueprintMaster,
  BLUEPRINT_DURATION,
  BLUEPRINT_FPS,
  BLUEPRINT_WIDTH,
  BLUEPRINT_HEIGHT,
} from './motion/templates/TechnicalBlueprintMaster';
import {
  NeoBrutalistMaster,
  NEO_BRUTALIST_DURATION,
  NEO_BRUTALIST_FPS,
  NEO_BRUTALIST_WIDTH,
  NEO_BRUTALIST_HEIGHT,
} from './motion/templates/NeoBrutalistMaster';

// ============================================================================
// 2. FLAGSHIP SHOWREELS & BENCHMARKS
// ============================================================================
import { UniversalStudioShowreelContent } from './motion/claude/UniversalStudioShowreel';
import {
  SkillIntroShowreelContent,
  SKILL_INTRO_DURATION,
  SKILL_INTRO_FPS,
  SKILL_INTRO_WIDTH,
  SKILL_INTRO_HEIGHT,
} from './motion/claude/SkillIntroShowreel';
import {
  ClaudeFluidShowreelContent,
  CLAUDE_FLUID_DURATION,
  CLAUDE_FLUID_FPS,
  CLAUDE_FLUID_WIDTH,
  CLAUDE_FLUID_HEIGHT,
} from './motion/claude/ClaudeFluidShowreel';
import {
  ClaudeOpusShowreelContent,
  CLAUDE_OPUS_SHOWREEL_DURATION,
  CLAUDE_OPUS_SHOWREEL_FPS,
  CLAUDE_OPUS_SHOWREEL_WIDTH,
  CLAUDE_OPUS_SHOWREEL_HEIGHT,
} from './motion/claude/ClaudeOpusShowreel';
import {
  ClaudePersianShowreelContent,
  CLAUDE_PERSIAN_DURATION,
  CLAUDE_PERSIAN_FPS,
  CLAUDE_PERSIAN_WIDTH,
  CLAUDE_PERSIAN_HEIGHT,
} from './motion/claude/ClaudePersianShowreel';

/**
 * ============================================================================
 * CONSOLIDATED STUDIO ROOT COMPOSITION REGISTRY (CLEAN PRODUCTION ARCHITECTURE)
 * ============================================================================
 */
// ============================================================================
// 3. MOTION GRAMMAR & COMPILER HARNESS (TEST COMPOSITIONS)
// ============================================================================
import { CanonicalMotionScene } from './motion/grammar/CanonicalMotionScene';
import { CanonicalCompilerScene } from './motion/compiler/CanonicalCompilerScene';
import {
  VerbTest_SPLIT,
  VerbTest_EXPAND,
  VerbTest_TRAVEL,
  VerbTest_COLLAPSE,
  VerbTest_MORPH,
  VerbTest_MERGE,
  VerbTest_DEFORM,
  VerbTest_REASSEMBLE,
  VerbTest_AntiBypass_FakeSplit,
  VerbTest_DecorativeCamouflage,
} from './motion/grammar/VerbTemplateTestCompositions';

import { UniversalCinematicStoryScene } from './motion/templates/UniversalCinematicStoryScene';
import { UniversalCinematicStage } from './motion/stage/UniversalCinematicStage';

const UniversalCinematicStageDemo: React.FC = () => {
  return (
    <UniversalCinematicStage
      acts={[
        {
          actId: 'act1_hook',
          badgeFa: 'چالش داده‌ها',
          titleFa: 'انفجار اطلاعات و پیچیدگی سیستم‌ها',
          descriptionFa: 'جریان داده‌های لحظه‌ای نیازمند هماهنگی شناختی چندعاملی است.',
          heroSymbol: '⚡',
          lottiePreset: 'tech_ai_core',
          emphasisTokens: ['انفجار اطلاعات'],
        },
        {
          actId: 'act2_engine',
          badgeFa: 'موتور نوآوری',
          titleFa: 'شبکه توزیع‌شده با پاسخ میلی‌ثانیه‌ای',
          descriptionFa: 'موتور پردازش بدون وقفه با تفکیک وظایف و ترنزیشن‌های سینمایی.',
          heroSymbol: '🧬',
          lottiePreset: 'bio_helix_pulse',
          emphasisTokens: ['شبکه توزیع‌شده'],
        },
        {
          actId: 'act3_vision',
          badgeFa: 'اکوسیستم آینده',
          titleFa: 'آینده موشن گرافیک هوشمند',
          descriptionFa: 'ترکیب بی‌نقص فیزیک اسپرینگ، ضرب‌آهنگ موسیقی و گرافیک برداری.',
          heroSymbol: '🌐',
          lottiePreset: 'abstract_portal',
          emphasisTokens: ['آینده هوشمند'],
        },
      ]}
      themeId="DARK_GRAPHITE_TECH"
      cameraMode="PANORAMIC_HORIZONTAL"
      bgmTrack="music/Tech_Live.mp3"
      bpm={124}
    />
  );
};

export const Root: React.FC = () => {
  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* 1. MASTER ARCHETYPE 1: DARK GRAPHITE TECH (KEYNOTE LAUNCH)        */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="DarkGraphiteTechMaster"
        component={DarkGraphiteTechMaster}
        durationInFrames={DARK_GRAPHITE_DURATION}
        fps={DARK_GRAPHITE_FPS}
        width={DARK_GRAPHITE_WIDTH}
        height={DARK_GRAPHITE_HEIGHT}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 2. MASTER ARCHETYPE 2: CONTINUOUS UI MORPH (DRIBBBLE POLISH)      */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="ContinuousUiMorphMaster"
        component={ContinuousUiMorphMaster}
        durationInFrames={CONTINUOUS_UI_DURATION}
        fps={CONTINUOUS_UI_FPS}
        width={CONTINUOUS_UI_WIDTH}
        height={CONTINUOUS_UI_HEIGHT}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 3. MASTER ARCHETYPE 3: QUANTUM & BIO DEEP-Z (3D PUSH-IN DIVE)     */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="QuantumBioDeepZMaster"
        component={QuantumBioDeepZMaster}
        durationInFrames={QUANTUM_BIO_DURATION}
        fps={QUANTUM_BIO_FPS}
        width={QUANTUM_BIO_WIDTH}
        height={QUANTUM_BIO_HEIGHT}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 4. MASTER ARCHETYPE 4: KINETIC ARCHITECTURAL TYPO (MANIFESTO)     */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="KineticArchitecturalTypoMaster"
        component={KineticArchitecturalTypoMaster}
        durationInFrames={KINETIC_TYPO_DURATION}
        fps={KINETIC_TYPO_FPS}
        width={KINETIC_TYPO_WIDTH}
        height={KINETIC_TYPO_HEIGHT}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 5. MASTER ARCHETYPE 5: BENTO GRID SAAS FEATURE MATRIX             */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="BentoGridSaasMaster"
        component={BentoGridSaasMaster}
        durationInFrames={BENTO_GRID_DURATION}
        fps={BENTO_GRID_FPS}
        width={BENTO_GRID_WIDTH}
        height={BENTO_GRID_HEIGHT}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 6. MASTER ARCHETYPE 6: FINTECH TRADING & MARKET INTELLIGENCE      */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="FinTechTradingMaster"
        component={FinTechTradingMaster}
        durationInFrames={FINTECH_DURATION}
        fps={FINTECH_FPS}
        width={FINTECH_WIDTH}
        height={FINTECH_HEIGHT}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 7. MASTER ARCHETYPE 7: STOP-MOTION TACTILE PAPER CUTOUT           */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="StopMotionPaperMaster"
        component={StopMotionPaperMaster}
        durationInFrames={STOP_MOTION_DURATION}
        fps={STOP_MOTION_FPS}
        width={STOP_MOTION_WIDTH}
        height={STOP_MOTION_HEIGHT}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 8. MASTER ARCHETYPE 8: TECHNICAL CAD BLUEPRINT                     */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="TechnicalBlueprintMaster"
        component={TechnicalBlueprintMaster}
        durationInFrames={BLUEPRINT_DURATION}
        fps={BLUEPRINT_FPS}
        width={BLUEPRINT_WIDTH}
        height={BLUEPRINT_HEIGHT}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 9. MASTER ARCHETYPE 9: NEO-BRUTALIST HIGH-VOLTAGE                 */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="NeoBrutalistMaster"
        component={NeoBrutalistMaster}
        durationInFrames={NEO_BRUTALIST_DURATION}
        fps={NEO_BRUTALIST_FPS}
        width={NEO_BRUTALIST_WIDTH}
        height={NEO_BRUTALIST_HEIGHT}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 7. UNIVERSAL PARAMETRIC STUDIO SHOWREEL                           */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="UniversalStudioShowreel"
        component={UniversalStudioShowreelContent}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 8. SKILL INTRO SHOWREEL (60-SECOND CINEMATIC TOUR)                */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="SkillIntroShowreel"
        component={SkillIntroShowreelContent}
        durationInFrames={SKILL_INTRO_DURATION}
        fps={SKILL_INTRO_FPS}
        width={SKILL_INTRO_WIDTH}
        height={SKILL_INTRO_HEIGHT}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 9. CLAUDE FLUID ONE-TAKE SHOWREEL                                 */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="ClaudeFluidShowreel"
        component={ClaudeFluidShowreelContent}
        durationInFrames={CLAUDE_FLUID_DURATION}
        fps={CLAUDE_FLUID_FPS}
        width={CLAUDE_FLUID_WIDTH}
        height={CLAUDE_FLUID_HEIGHT}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 10. CLAUDE OPUS MASTER SHOWREEL                                   */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="ClaudeOpusShowreel"
        component={ClaudeOpusShowreelContent}
        durationInFrames={CLAUDE_OPUS_SHOWREEL_DURATION}
        fps={CLAUDE_OPUS_SHOWREEL_FPS}
        width={CLAUDE_OPUS_SHOWREEL_WIDTH}
        height={CLAUDE_OPUS_SHOWREEL_HEIGHT}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 11. CLAUDE PERSIAN DUAL-SCRIPT SHOWREEL                           */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="ClaudePersianShowreel"
        component={ClaudePersianShowreelContent}
        durationInFrames={CLAUDE_PERSIAN_DURATION}
        fps={CLAUDE_PERSIAN_FPS}
        width={CLAUDE_PERSIAN_WIDTH}
        height={CLAUDE_PERSIAN_HEIGHT}
      />
      {/* ----------------------------------------------------------------- */}
      {/* 12. GRAMMAR & COMPILER HARNESS COMPOSITIONS (TEST RUNNERS)        */}
      {/* ----------------------------------------------------------------- */}
      <Composition id="CanonicalMotionScene" component={CanonicalMotionScene} durationInFrames={600} fps={30} width={1920} height={1080} />
      <Composition id="CanonicalCompilerScene" component={CanonicalCompilerScene} durationInFrames={600} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-SPLIT" component={VerbTest_SPLIT} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-EXPAND" component={VerbTest_EXPAND} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-TRAVEL" component={VerbTest_TRAVEL} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-COLLAPSE" component={VerbTest_COLLAPSE} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-MORPH" component={VerbTest_MORPH} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-MERGE" component={VerbTest_MERGE} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-DEFORM" component={VerbTest_DEFORM} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-REASSEMBLE" component={VerbTest_REASSEMBLE} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-AntiBypass-FakeSplit" component={VerbTest_AntiBypass_FakeSplit} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="VerbTest-DecorativeCamouflage" component={VerbTest_DecorativeCamouflage} durationInFrames={100} fps={30} width={1920} height={1080} />
      <Composition id="UniversalCinematicStoryScene" component={UniversalCinematicStoryScene} durationInFrames={600} fps={30} width={1920} height={1080} />
      <Composition
        id="UniversalCinematicStage"
        component={UniversalCinematicStageDemo}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 13. BAQIYATALLAH RESEARCH AWARDS (STUDENT RESEARCHER MASTER)       */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="BaqiyatallahResearchAwards"
        component={BaqiyatallahResearchAwardsScene}
        durationInFrames={BAQIYATALLAH_AWARDS_DURATION}
        fps={BAQIYATALLAH_AWARDS_FPS}
        width={BAQIYATALLAH_AWARDS_WIDTH}
        height={BAQIYATALLAH_AWARDS_HEIGHT}
      />

      {/* ----------------------------------------------------------------- */}
      {/* 14. BAQIYATALLAH ARCHITECTURAL TYPO (KINETIC MANIFESTO MASTER)    */}
      {/* ----------------------------------------------------------------- */}
      <Composition
        id="BaqiyatallahArchitecturalTypo"
        component={BaqiyatallahArchitecturalTypoScene}
        durationInFrames={ARCH_TYPO_DURATION}
        fps={ARCH_TYPO_FPS}
        width={ARCH_TYPO_WIDTH}
        height={ARCH_TYPO_HEIGHT}
      />
    </>
  );
};
