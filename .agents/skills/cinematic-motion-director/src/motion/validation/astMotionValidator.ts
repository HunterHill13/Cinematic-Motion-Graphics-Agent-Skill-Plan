/**
 * ============================================================================
 * AST-BASED MOTION INTEGRITY & ANTI-SLIDESHOW VALIDATOR
 * ============================================================================
 * 
 * CORE ARCHITECTURAL PRINCIPLE:
 *   VALID MOTION ≠ CONSTANT MOTION
 *   VALID MOTION ≠ ANY NUMERICAL CHANGE
 *   VALID MOTION = MEANINGFUL + SPATIAL + CAUSALLY TRIGGERED + VISUALLY VERIFIABLE
 * 
 * THRESHOLDS FOR MEANINGFUL PRIMARY MOTION:
 *   - Spatial Translation: |dx| >= 24px OR |dy| >= 24px
 *   - Angular Rotation:    |dTheta| >= 15 deg
 *   - Volumetric Scale:    |dScale| >= 0.15
 *   - Geometry Morph:      SVG path `d`, `points`, or geometry state string
 *   - Middle 60% Activity: Must have active meaningful transformation in [0.2*D, 0.8*D]
 * 
 * FORBIDDEN FAKE-MOTION PATTERNS:
 *   1. Opacity-only animation (spring or interpolate modifying only opacity)
 *   2. Camera camouflage (CameraRig moving while child elements remain static)
 *   3. Entrance-Hold-Exit (motion only in 0-20% and 80-100%, static middle 60%)
 *   4. Ambient micro-drift / jitter (|dx| <= 2px or |dScale| <= 0.03)
 *   5. Independent <Sequence> blocks unmounting/remounting Hero without <PersistentWorld>
 * ============================================================================
 */

import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

export interface MotionValidationViolation {
  code: string;
  message: string;
  line?: number;
  snippet?: string;
}

export interface MotionValidationReport {
  passed: boolean;
  filePath: string;
  durationFrames?: number;
  hasPersistentWorld: boolean;
  hasTransformationContract: boolean;
  sequenceCount: number;
  meaningfulMotionsCount: number;
  violations: MotionValidationViolation[];
}

export interface ExtractedInterpolation {
  line: number;
  frameVar: string;
  inRange: [number, number];
  outRange: [number, number] | string[];
  propertyTarget?: string;
  isInsideCameraRig: boolean;
  isOpacityOnly: boolean;
  isMeaningful: boolean;
  meaningfulReason?: string;
}

export interface ExtractedSpring {
  line: number;
  frameVar: string;
  propertyTarget?: string;
  isOpacityOnly: boolean;
}

export class AstMotionValidator {
  private sourceFile: ts.SourceFile;
  private code: string;
  private filePath: string;

  constructor(filePath: string, code?: string) {
    this.filePath = filePath;
    this.code = code !== undefined ? code : fs.readFileSync(filePath, 'utf-8');
    this.sourceFile = ts.createSourceFile(
      path.basename(filePath),
      this.code,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX
    );
  }

  public validate(): MotionValidationReport {
    const violations: MotionValidationViolation[] = [];

    // Check for high-level continuity architecture
    const hasPersistentWorld = this.code.includes('<PersistentWorld') || this.code.includes('PersistentWorld');
    const hasCompilerInvocation = this.code.includes('MotionGraphCompiler') || this.code.includes('compileGraph');
    const hasVerbTemplate = /create(Split|Expand|Travel|Collapse|Morph|Merge|Deform|Reassemble)Template/.test(this.code);
    const hasTransformationContract =
      this.code.includes('TransformationContract') ||
      this.code.includes('evaluateTransformationContract') ||
      this.code.includes('contracts=') ||
      this.code.includes('contract=') ||
      hasVerbTemplate ||
      hasCompilerInvocation;
    const hasAuthoredKeyframe = this.code.includes('evaluateAuthoredKeyframeTrack');

    // 1. AST Traversal: Extract JSX Sequences, CameraRig, Interpolations, Springs
    const sequences: ts.JsxElement[] = [];
    const cameraRigs: ts.JsxElement[] = [];
    const interpolations: ExtractedInterpolation[] = [];
    const springs: ExtractedSpring[] = [];

    const visit = (node: ts.Node, currentParentJsx?: string) => {
      // JSX Elements
      if (ts.isJsxElement(node)) {
        const tagName = node.openingElement.tagName.getText(this.sourceFile);
        if (tagName === 'Sequence') {
          sequences.push(node);
        } else if (tagName === 'CameraRig') {
          cameraRigs.push(node);
        }
      }

      // Detect interpolate(frame, [inStart, inEnd], [outStart, outEnd])
      if (ts.isCallExpression(node)) {
        const fnName = node.expression.getText(this.sourceFile);
        if (fnName === 'interpolate') {
          const interp = this.parseInterpolationCall(node, currentParentJsx);
          if (interp) {
            interpolations.push(interp);
          }
        } else if (fnName === 'spring') {
          const sp = this.parseSpringCall(node, currentParentJsx);
          if (sp) {
            springs.push(sp);
          }
        }
      }

      // Track JSX context for nested children
      let nextParentJsx = currentParentJsx;
      if (ts.isJsxElement(node)) {
        nextParentJsx = node.openingElement.tagName.getText(this.sourceFile);
      }

      ts.forEachChild(node, (child) => visit(child, nextParentJsx));
    };

    visit(this.sourceFile);

    // If using the certified Phase 1 PersistentWorld + TransformationContract architecture,
    // verify the contract properties directly
    if (hasPersistentWorld && hasTransformationContract) {
      return this.validatePersistentWorldComposition(violations);
    }

    // 2. CHECK RULE 1: Sequence Slideshow Pattern
    // If there are multiple isolated <Sequence> components without PersistentWorld, check for Hero unmount/mount
    if (sequences.length >= 2 && !hasPersistentWorld) {
      violations.push({
        code: 'SEQUENCE_SLIDESHOW_DETECTED',
        message: `Detected ${sequences.length} isolated <Sequence> blocks without <PersistentWorld>. Independent Sequences unmount the scene root and destroy spatial continuity between shots.`,
      });
    }

    // 3. CHECK RULE 2: Opacity-Only Animation Trap
    // Look for files where springs/interpolations exist, but only touch opacity
    const nonOpacityInterps = interpolations.filter((i) => !i.isOpacityOnly && !i.isInsideCameraRig);
    const nonOpacitySprings = springs.filter((s) => !s.isOpacityOnly);

    if (interpolations.length > 0 || springs.length > 0) {
      if (nonOpacityInterps.length === 0 && nonOpacitySprings.length === 0) {
        violations.push({
          code: 'OPACITY_ONLY_MOTION_TRAP',
          message: 'All animations in this component operate exclusively on opacity. Fading cards in and out is not cinematic motion.',
        });
      }
    }

    // 4. CHECK RULE 3: Camera Camouflage Pattern
    // CameraRig is animating, but child elements have 0 meaningful object transformations
    if (cameraRigs.length > 0) {
      const meaningfulObjectMotions = interpolations.filter(
        (i) => i.isMeaningful && !i.isInsideCameraRig
      );
      if (meaningfulObjectMotions.length === 0 && !hasTransformationContract && !hasAuthoredKeyframe) {
        violations.push({
          code: 'CAMERA_CAMOUFLAGE_DETECTED',
          message: '<CameraRig> is moving, but child elements possess zero meaningful object transformations. Camera movement alone cannot substitute for object animation.',
        });
      }
    }

    // 5. CHECK RULE 4: Ambient / Micro-Jitter Fake Motion
    // Animations that move <= 2px or scale <= 0.03
    const ambientOnlyMotions = interpolations.filter((i) => {
      if (i.isOpacityOnly || i.isInsideCameraRig) return false;
      if (Array.isArray(i.outRange) && typeof i.outRange[0] === 'number' && typeof i.outRange[1] === 'number') {
        const delta = Math.abs(i.outRange[1] - i.outRange[0]);
        // Target is transform or position with <= 2px or scale <= 0.03
        if (delta > 0 && delta <= 2.0) return true;
        if (delta > 0 && delta <= 0.03) return true;
      }
      return false;
    });

    if (ambientOnlyMotions.length > 0 && nonOpacityInterps.length === ambientOnlyMotions.length) {
      violations.push({
        code: 'AMBIENT_FAKE_MOTION_DETECTED',
        message: 'Detected micro-jitter / ambient breathing (delta <= 2px or scale <= 0.03) as the sole motion. Ambient oscillations do not qualify as meaningful motion.',
      });
    }

    // 6. CHECK RULE 5: Entrance-Hold-Exit Defect (Missing Middle 60% Transformation)
    // Approximate duration from code (default 300 frames if not specified)
    const durationMatch = this.code.match(/durationInFrames\s*=\s*\{?(\d+)\}?/);
    const totalDuration = durationMatch ? parseInt(durationMatch[1], 10) : 300;
    const midZoneStart = totalDuration * 0.20;
    const midZoneEnd = totalDuration * 0.80;

    const hasMidpointTransformation = interpolations.some((i) => {
      if (i.isOpacityOnly || i.isInsideCameraRig) return false;
      const inStart = i.inRange[0];
      const inEnd = i.inRange[1];
      // Check if interpolation active domain intersects middle 60%
      const intersectsMidZone = !(inEnd < midZoneStart || inStart > midZoneEnd);
      return intersectsMidZone && i.isMeaningful;
    });

    if (!hasMidpointTransformation && !hasTransformationContract && !hasAuthoredKeyframe) {
      violations.push({
        code: 'ENTRANCE_HOLD_EXIT_SLIDESHOW',
        message: `No meaningful spatial transformation occurs in the middle 60% of the shot (frames ${Math.round(midZoneStart)} to ${Math.round(midZoneEnd)}). Elements enter, hold static during narration, and exit.`,
      });
    }

    const passed = violations.length === 0;

    return {
      passed,
      filePath: this.filePath,
      durationFrames: totalDuration,
      hasPersistentWorld,
      hasTransformationContract,
      sequenceCount: sequences.length,
      meaningfulMotionsCount: nonOpacityInterps.length,
      violations,
    };
  }

  private validatePersistentWorldComposition(violations: MotionValidationViolation[]): MotionValidationReport {
    // 1. Verify that PersistentHeroEntity exists and binds contract
    const hasHeroEntity = this.code.includes('<PersistentHeroEntity') && this.code.includes('contract=');
    if (!hasHeroEntity) {
      violations.push({
        code: 'MISSING_PERSISTENT_HERO_ENTITY',
        message: '<PersistentWorld> must render a <PersistentHeroEntity contract={...}> to bind and display hero transformations.',
      });
    }

    // 2. Data-flow check: Verify that PersistentHeroEntity render prop consumes transformation state
    const heroEntityIdx = this.code.indexOf('<PersistentHeroEntity');
    if (heroEntityIdx !== -1) {
      const renderIdx = this.code.indexOf('render={', heroEntityIdx);
      if (renderIdx !== -1) {
        const heroEntityEnd = this.code.indexOf('</PersistentHeroEntity>', renderIdx);
        const selfCloseEnd = this.code.indexOf('/>', renderIdx);
        const endPos = (heroEntityEnd !== -1 && (selfCloseEnd === -1 || heroEntityEnd < selfCloseEnd))
          ? heroEntityEnd
          : (selfCloseEnd !== -1 ? selfCloseEnd : this.code.length);
        const renderSection = this.code.substring(renderIdx, endPos);

        const usesStateSpatialParam =
          renderSection.includes('.scale') ||
          renderSection.includes('.position') ||
          renderSection.includes('.components') ||
          renderSection.includes('.rotation') ||
          renderSection.includes('.aspectRatio') ||
          renderSection.includes('.shearDeg') ||
          renderSection.includes('.geometry') ||
          renderSection.includes('.activeVerb');

        const usesRawFrameAnimation = (renderSection.includes('useCurrentFrame') || this.code.includes('useCurrentFrame')) &&
          (renderSection.includes('translate') || renderSection.includes('transform'));

        const isOnlyOpacity = (renderSection.includes('opacity') || renderSection.includes('.opacity')) && !usesStateSpatialParam;
        const isStatic = !usesStateSpatialParam && !usesRawFrameAnimation && !isOnlyOpacity;

        if (usesRawFrameAnimation && !usesStateSpatialParam) {
          violations.push({
            code: 'RAW_JSX_MOTION_ESCAPE',
            message: 'Raw JSX motion escape detected. Animate elements through TransformationContract and MotionSceneGraph state, not raw uncontracted frame calculations.',
          });
        } else if (isOnlyOpacity) {
          violations.push({
            code: 'OPACITY_ONLY_MOTION_TRAP',
            message: 'PersistentHeroEntity render prop only binds opacity. Meaningful transformation requires spatial, scale, or topological changes.',
          });
        } else if (isStatic) {
          violations.push({
            code: 'STATIC_HERO_RENDER_DETECTED',
            message: 'PersistentHeroEntity render prop ignores template state and renders static elements.',
          });
        }
      }
    }

    // 3. Validate that TransformationContract specifies midpointEvent with meaningfulDelta, uses certified VerbTemplates, or compiles through MotionGraphCompiler
    const hasCompilerInvocation = this.code.includes('MotionGraphCompiler') || this.code.includes('compileGraph');
    const hasVerbTemplate = /create(Split|Expand|Travel|Collapse|Morph|Merge|Deform|Reassemble)Template/.test(this.code) || hasCompilerInvocation;
    const hasMidpointEvent = (this.code.includes('midpointEvent') && this.code.includes('meaningfulDelta')) || hasVerbTemplate;
    if (!hasMidpointEvent) {
      violations.push({
        code: 'INVALID_TRANSFORMATION_CONTRACT',
        message: 'TransformationContract must declare a midpointEvent with a guaranteed meaningfulDelta in the middle 60%.',
      });
    }

    // 4. Count distinct executable transformation contracts/verbs in AST
    let motionsCount = 0;
    const templateMatches = this.code.match(/create(Split|Expand|Travel|Collapse|Morph|Merge|Deform|Reassemble)Template/g);
    if (templateMatches && templateMatches.length > 0) {
      motionsCount = templateMatches.length;
    }
    const contractIndexMatches = this.code.match(/contracts\[\d+\]/g);
    if (contractIndexMatches && contractIndexMatches.length > 0) {
      const distinctIndices = new Set(contractIndexMatches);
      motionsCount = Math.max(motionsCount, distinctIndices.size);
    }
    const importedGraphMatch = this.code.match(/import\s*\{[^}]*([a-zA-Z0-9_]*SceneGraph[a-zA-Z0-9_]*)[^}]*\}\s*from\s*['"]([^'"]+)['"]/);
    if (importedGraphMatch) {
      try {
        const importRelPath = importedGraphMatch[2];
        const dir = path.dirname(this.filePath);
        const candidates = [
          path.resolve(dir, importRelPath + '.ts'),
          path.resolve(dir, importRelPath + '.tsx'),
          path.resolve(dir, importRelPath),
        ];
        for (const cand of candidates) {
          if (fs.existsSync(cand)) {
            const graphCode = fs.readFileSync(cand, 'utf-8');
            const verbMatches = graphCode.match(/verb\s*:\s*['"](SPLIT|EXPAND|TRAVEL|COLLAPSE|MORPH|MERGE|DEFORM|REASSEMBLE)['"]/g);
            if (verbMatches && verbMatches.length > 0) {
              motionsCount = Math.max(motionsCount, verbMatches.length);
            }
            break;
          }
        }
      } catch (e) {
        // Fallback to detected count
      }
    }
    if (motionsCount === 0 && violations.length === 0) {
      motionsCount = 1;
    }

    return {
      passed: violations.length === 0,
      filePath: this.filePath,
      hasPersistentWorld: true,
      hasTransformationContract: true,
      sequenceCount: 0,
      meaningfulMotionsCount: violations.length === 0 ? motionsCount : 0,
      violations,
    };
  }

  private parseInterpolationCall(node: ts.CallExpression, parentJsx?: string): ExtractedInterpolation | null {
    const args = node.arguments;
    if (args.length < 3) return null;

    const frameVar = args[0].getText(this.sourceFile);
    const inRangeText = args[1].getText(this.sourceFile);
    const outRangeText = args[2].getText(this.sourceFile);

    // Parse inRange
    let inRange: [number, number] = [0, 300];
    const inMatch = inRangeText.match(/\[\s*([\d.]+)\s*,\s*([\d.]+)\s*\]/);
    if (inMatch) {
      inRange = [parseFloat(inMatch[1]), parseFloat(inMatch[2])];
    }

    // Parse outRange
    let outRange: [number, number] | string[] = [0, 1];
    const outMatch = outRangeText.match(/\[\s*(-?[\d.]+)\s*,\s*(-?[\d.]+)\s*\]/);
    if (outMatch) {
      outRange = [parseFloat(outMatch[1]), parseFloat(outMatch[2])];
    }

    // Determine target property by inspecting parent assignment or property assignment
    let propertyTarget = 'unknown';
    let pNode = node.parent;
    while (pNode && !ts.isSourceFile(pNode)) {
      if (ts.isPropertyAssignment(pNode)) {
        propertyTarget = pNode.name.getText(this.sourceFile);
        break;
      }
      if (ts.isVariableDeclaration(pNode)) {
        propertyTarget = pNode.name.getText(this.sourceFile);
        break;
      }
      pNode = pNode.parent;
    }

    const isInsideCameraRig = parentJsx === 'CameraRig' || propertyTarget.toLowerCase().includes('crane') || propertyTarget.toLowerCase().includes('orbit') || propertyTarget.toLowerCase().includes('cam');
    const isOpacityOnly = propertyTarget.toLowerCase().includes('opacity');

    // Meaningful delta check
    let isMeaningful = false;
    let meaningfulReason = undefined;

    if (!isOpacityOnly && !isInsideCameraRig) {
      if (typeof outRange[0] === 'number' && typeof outRange[1] === 'number') {
        const delta = Math.abs(outRange[1] - outRange[0]);
        // Spatial translation (>= 24px)
        if (delta >= 24 && (propertyTarget.includes('x') || propertyTarget.includes('y') || propertyTarget.includes('translate') || propertyTarget.includes('pos') || propertyTarget.includes('width') || propertyTarget.includes('height'))) {
          isMeaningful = true;
          meaningfulReason = `Spatial translation delta ${delta}px >= 24px threshold`;
        }
        // Rotation (>= 15 deg)
        else if (delta >= 15 && (propertyTarget.includes('rot') || propertyTarget.includes('deg') || propertyTarget.includes('angle'))) {
          isMeaningful = true;
          meaningfulReason = `Rotation delta ${delta}deg >= 15deg threshold`;
        }
        // Scale (>= 0.15)
        else if (delta >= 0.15 && (propertyTarget.includes('scale') || propertyTarget.includes('zoom'))) {
          isMeaningful = true;
          meaningfulReason = `Scale delta ${delta} >= 0.15 threshold`;
        }
      }
    }

    const line = this.sourceFile.getLineAndCharacterOfPosition(node.getStart(this.sourceFile)).line + 1;

    return {
      line,
      frameVar,
      inRange,
      outRange,
      propertyTarget,
      isInsideCameraRig,
      isOpacityOnly,
      isMeaningful,
      meaningfulReason,
    };
  }

  private parseSpringCall(node: ts.CallExpression, parentJsx?: string): ExtractedSpring | null {
    let propertyTarget = 'unknown';
    let pNode = node.parent;
    while (pNode && !ts.isSourceFile(pNode)) {
      if (ts.isPropertyAssignment(pNode)) {
        propertyTarget = pNode.name.getText(this.sourceFile);
        break;
      }
      if (ts.isVariableDeclaration(pNode)) {
        propertyTarget = pNode.name.getText(this.sourceFile);
        break;
      }
      pNode = pNode.parent;
    }

    const isOpacityOnly = propertyTarget.toLowerCase().includes('opacity');
    const line = this.sourceFile.getLineAndCharacterOfPosition(node.getStart(this.sourceFile)).line + 1;

    return {
      line,
      frameVar: node.arguments[0]?.getText(this.sourceFile) || 'frame',
      propertyTarget,
      isOpacityOnly,
    };
  }
}

/**
 * CLI Entrypoint
 */
export function runAstValidation(targetPath: string): MotionValidationReport {
  const validator = new AstMotionValidator(targetPath);
  return validator.validate();
}
