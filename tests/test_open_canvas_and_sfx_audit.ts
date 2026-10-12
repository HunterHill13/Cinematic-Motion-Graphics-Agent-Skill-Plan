import * as fs from 'fs';
import * as path from 'path';

export interface OpenCanvasSfxAuditResult {
  file: string;
  passed: boolean;
  defects: string[];
}

export function auditOpenCanvasAndSfx(filePath: string): OpenCanvasSfxAuditResult {
  const content = fs.readFileSync(filePath, 'utf-8');
  const defects: string[] = [];

  // 1. Check for Corner HUD / Persistent Header / Footer Clutter
  if (
    content.includes('PERSISTENT TOP HUD') ||
    content.includes('PERSISTENT TOP INSTITUTIONAL HUD') ||
    content.includes('FOOTER TIMELINE HUD') ||
    content.includes('topHeaderTitleFa') ||
    content.includes('footerTitleFa') ||
    /Math\.floor\(frame\s*\/\s*fps\)\s*\}\s*s\s*\/\s*\{/.test(content)
  ) {
    defects.push(
      '[CORNER_HUD_CLUTTER] Persistent top/bottom HUD headers, institutional corner labels, or timeline footers detected. Canvas must focus 100% on the narrated subject without corner clutter.'
    );
  }

  // 2. Check for Excessive SFX Volume (> 0.20 linear volume)
  const volumeMatches = [...content.matchAll(/volume:\s*(0\.[2-9]\d*|1\.0)/g)];
  for (const match of volumeMatches) {
    const vol = parseFloat(match[1]);
    // Ignore voiceVolume = 1.0
    const contextSlice = content.slice(Math.max(0, (match.index ?? 0) - 40), (match.index ?? 0) + 40);
    if (!contextSlice.includes('voiceVolume') && !contextSlice.includes('voice')) {
      if (vol > 0.20) {
        defects.push(
          `[EXCESSIVE_SFX_VOLUME] Loud SFX volume (${vol}) detected in "${contextSlice.trim()}". SFX volume must be subtle (0.05 to 0.16) so it never annoys the viewer.`
        );
      }
    }
  }

  // Also check fallback ternary volumes in UniversalSoundDirector
  const fallbackVolMatches = [...content.matchAll(/\?\s*(0\.[2-9]\d*)\s*:/g)];
  for (const match of fallbackVolMatches) {
    const vol = parseFloat(match[1]);
    if (vol > 0.20) {
      defects.push(
        `[EXCESSIVE_SFX_DEFAULT_VOLUME] Default SFX fallback volume (${vol}) exceeds subtle ceiling (0.16).`
      );
    }
  }

  // 3. Check for Repetitive SFX Cues (same type repeated >= 3 times in a row without variant/file diversity)
  const sfxTypeSequence = [...content.matchAll(/type:\s*'([^']+)'/g)].map((m) => m[1]);
  let consecutiveSame = 1;
  for (let i = 1; i < sfxTypeSequence.length; i++) {
    if (sfxTypeSequence[i] === sfxTypeSequence[i - 1]) {
      consecutiveSame++;
      if (consecutiveSame >= 3) {
        defects.push(
          `[REPETITIVE_SFX_CUES] SFX type '${sfxTypeSequence[i]}' repeated ${consecutiveSame}+ times consecutively without variation.`
        );
        break;
      }
    } else {
      consecutiveSame = 1;
    }
  }

  // 4. Check for Giant Rigid Card Wrapper with Static Internal Children (Card/Slide Syndrome)
  if (content.includes('HERO CONTAINER')) {
    // Check if h1 and p inside UniversalCinematicStage lack their own spring/interpolate transform
    const heroContainerIdx = content.indexOf('HERO CONTAINER');
    const heroSection = content.slice(heroContainerIdx, heroContainerIdx + 3500);
    const springCountInHero = (heroSection.match(/spring\(/g) || []).length;
    if (springCountInHero === 0) {
      defects.push(
        '[STATIC_INTERNAL_CHILDREN] Act content is trapped inside a single rigid HERO CONTAINER box with 0 internal spring animations for title, description, metrics, or visuals (Slide Syndrome).'
      );
    }
  }

  // Check if map() items in scene acts have zero individual stagger/spring
  const mapBlocks = [...content.matchAll(/\.map\(\(\s*[^,)]+,\s*([a-zA-Z0-9_]+)\s*\)\s*=>\s*\(/g)];
  for (const match of mapBlocks) {
    const idxVar = match[1];
    const sliceAfter = content.slice(match.index ?? 0, (match.index ?? 0) + 700);
    // If rendering visual DOM elements inside map, check if index variable is used for stagger timing or transform
    if (sliceAfter.includes('<div') && !sliceAfter.includes(`${idxVar} *`)) {
      defects.push(
        `[UNSTAGGERED_LIST_ITEMS] Mapped visual elements using index '${idxVar}' have no staggered timing ('${idxVar} * ...'), causing all items to appear frozen together like a static slide.`
      );
    }
  }

  return {
    file: path.basename(filePath),
    passed: defects.length === 0,
    defects,
  };
}

if (require.main === module) {
  const targets = [
    path.resolve(__dirname, '../src/motion/stage/UniversalCinematicStage.tsx'),
    path.resolve(__dirname, '../src/motion/audio/UniversalSoundDirector.tsx'),
    path.resolve(__dirname, '../src/motion/compositions/BaqiyatallahResearchAwardsScene.tsx'),
    path.resolve(__dirname, '../src/motion/templates/DarkGraphiteTechMaster.tsx'),
    path.resolve(__dirname, '../src/motion/templates/ContinuousUiMorphMaster.tsx'),
    path.resolve(__dirname, '../src/motion/templates/QuantumBioDeepZMaster.tsx'),
    path.resolve(__dirname, '../src/motion/templates/KineticArchitecturalTypoMaster.tsx'),
    path.resolve(__dirname, '../src/motion/templates/BentoGridSaasMaster.tsx'),
    path.resolve(__dirname, '../src/motion/templates/FinTechTradingMaster.tsx'),
    path.resolve(__dirname, '../src/motion/templates/StopMotionPaperMaster.tsx'),
    path.resolve(__dirname, '../src/motion/templates/TechnicalBlueprintMaster.tsx'),
    path.resolve(__dirname, '../src/motion/templates/NeoBrutalistMaster.tsx'),
  ];

  let anyFailed = false;
  console.log('================================================================');
  console.log('PHASE 1 DIAGNOSTIC FEEDBACK LOOP: OPEN-CANVAS & SFX AUDIT');
  console.log('================================================================');

  for (const target of targets) {
    if (!fs.existsSync(target)) continue;
    const res = auditOpenCanvasAndSfx(target);
    console.log(`\nFile: ${res.file} -> ${res.passed ? 'PASS ✅' : 'FAIL ❌'}`);
    for (const d of res.defects) {
      console.log(`  - ${d}`);
    }
    if (!res.passed) anyFailed = true;
  }

  if (anyFailed) {
    process.exit(1);
  }
}
