/**
 * ============================================================================
 * VERB TEMPLATE TEST COMPOSITIONS (PHASE 4A.1 HARDENING)
 * ============================================================================
 * 
 * Contains Remotion compositions that directly consume the 8 VerbTemplates
 * inside <PersistentWorld> for Render-Backed Frame Verification.
 * 
 * INCLUDES:
 *   1. VerbTest_SPLIT
 *   2. VerbTest_EXPAND
 *   3. VerbTest_TRAVEL
 *   4. VerbTest_COLLAPSE
 *   5. VerbTest_MORPH
 *   6. VerbTest_MERGE
 *   7. VerbTest_DEFORM
 *   8. VerbTest_REASSEMBLE
 *   9. VerbTest_AntiBypass_FakeSplit       (Negative: Calls createSplitTemplate but renders static hero)
 *  10. VerbTest_DecorativeCamouflage       (Negative: Calls createExpandTemplate but renders static hero + moving decorative particle)
 * ============================================================================
 */

import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { PersistentWorld, PersistentHeroEntity } from './PersistentWorld';
import {
  createSplitTemplate,
  createExpandTemplate,
  createTravelTemplate,
  createCollapseTemplate,
  createMorphTemplate,
  createMergeTemplate,
  createDeformTemplate,
  createReassembleTemplate,
} from './verbTemplates';

// ----------------------------------------------------------------------------
// 1. SPLIT Composition
// ----------------------------------------------------------------------------
export const VerbTest_SPLIT: React.FC = () => {
  const template = useMemo(() => {
    return createSplitTemplate({
      shotId: 'render_test_split',
      heroId: 'split_cell',
      heroLabel: 'Cleaving Cell',
      startFrame: 0,
      endFrame: 100,
      origin: { x: 960, y: 540, z: 0 },
      separationDistance: 320,
      splitAxis: 'horizontal',
      daughterCount: 2,
    });
  }, []);

  return (
    <PersistentWorld contracts={[template.contract]} style={{ backgroundColor: '#090D16' }}>
      <PersistentHeroEntity
        contract={template.contract}
        render={(state) => (
          <div style={{ position: 'relative', width: 200, height: 200 }}>
            {state.components?.map((c) => (
              <div
                key={c.id}
                style={{
                  position: 'absolute',
                  left: c.position.x - state.position.x + 100,
                  top: c.position.y - state.position.y + 100,
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #38BDF8 70%, #1D4ED8 100%)',
                  boxShadow: '0 0 35px #38BDF8',
                  transform: `translate(-50%, -50%) scale(${c.scale})`,
                }}
              />
            ))}
          </div>
        )}
      />
    </PersistentWorld>
  );
};

// ----------------------------------------------------------------------------
// 2. EXPAND Composition
// ----------------------------------------------------------------------------
export const VerbTest_EXPAND: React.FC = () => {
  const template = useMemo(() => {
    return createExpandTemplate({
      shotId: 'render_test_expand',
      heroId: 'expand_core',
      heroLabel: 'Energy Core',
      startFrame: 0,
      endFrame: 100,
      anchor: { x: 960, y: 540, z: 0 },
      initialScale: 0.6,
      expandedScale: 1.5,
      ringLayersCount: 3,
    });
  }, []);

  return (
    <PersistentWorld contracts={[template.contract]} style={{ backgroundColor: '#090D16' }}>
      <PersistentHeroEntity
        contract={template.contract}
        render={(state) => (
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #10B981 70%, #065F46 100%)',
              boxShadow: '0 0 50px rgba(16, 185, 129, 0.6)',
              transform: `scale(${state.scale}) rotate(${state.rotation.z}deg)`,
            }}
          />
        )}
      />
    </PersistentWorld>
  );
};

// ----------------------------------------------------------------------------
// 3. TRAVEL Composition
// ----------------------------------------------------------------------------
export const VerbTest_TRAVEL: React.FC = () => {
  const template = useMemo(() => {
    return createTravelTemplate({
      shotId: 'render_test_travel',
      heroId: 'travel_capsule',
      heroLabel: 'Transit Capsule',
      startFrame: 0,
      endFrame: 100,
      from: { x: 300, y: 540, z: 0 },
      to: { x: 1600, y: 540, z: 0 },
      headingTilt: 20,
    });
  }, []);

  return (
    <PersistentWorld contracts={[template.contract]} style={{ backgroundColor: '#090D16' }}>
      <PersistentHeroEntity
        contract={template.contract}
        render={(state) => (
          <div
            style={{
              width: 120,
              height: 80,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              boxShadow: '0 0 40px rgba(245, 158, 11, 0.6)',
              transform: `rotate(${state.rotation.z}deg) scale(${state.aspectRatio || 1}, 1)`,
            }}
          />
        )}
      />
    </PersistentWorld>
  );
};

// ----------------------------------------------------------------------------
// 4. COLLAPSE Composition
// ----------------------------------------------------------------------------
export const VerbTest_COLLAPSE: React.FC = () => {
  const template = useMemo(() => {
    return createCollapseTemplate({
      shotId: 'render_test_collapse',
      heroId: 'collapse_singularity',
      heroLabel: 'Singularity Well',
      startFrame: 0,
      endFrame: 100,
      center: { x: 960, y: 540, z: 0 },
      initialScale: 1.8,
      collapsedScale: 0.35,
      spinDegrees: 360,
    });
  }, []);

  return (
    <PersistentWorld contracts={[template.contract]} style={{ backgroundColor: '#090D16' }}>
      <PersistentHeroEntity
        contract={template.contract}
        render={(state) => (
          <div
            style={{
              width: 160,
              height: 160,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #EC4899 70%, #831843 100%)',
              boxShadow: '0 0 55px rgba(236, 72, 153, 0.7)',
              transform: `scale(${state.scale}) rotate(${state.rotation.z}deg)`,
            }}
          />
        )}
      />
    </PersistentWorld>
  );
};

// ----------------------------------------------------------------------------
// 5. MORPH Composition
// ----------------------------------------------------------------------------
export const VerbTest_MORPH: React.FC = () => {
  const template = useMemo(() => {
    return createMorphTemplate({
      shotId: 'render_test_morph',
      heroId: 'morph_monolith',
      heroLabel: 'Morph Monolith',
      startFrame: 0,
      endFrame: 100,
      center: { x: 960, y: 540, z: 0 },
      fromGeometry: 'circle',
      toGeometry: 'wide_hex',
      fromDimensions: { width: 100, height: 100, borderRadius: 50 },
      toDimensions: { width: 280, height: 110, borderRadius: 12 },
      rotationShift: 60,
    });
  }, []);

  return (
    <PersistentWorld contracts={[template.contract]} style={{ backgroundColor: '#090D16' }}>
      <PersistentHeroEntity
        contract={template.contract}
        render={(state) => (
          <div
            style={{
              width: 100 * (state.aspectRatio || 1),
              height: 100,
              borderRadius: state.state === 'morph_complete' ? '12px' : '50px',
              background: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
              boxShadow: '0 0 45px rgba(139, 92, 246, 0.6)',
              transform: `rotate(${state.rotation.z}deg)`,
            }}
          />
        )}
      />
    </PersistentWorld>
  );
};

// ----------------------------------------------------------------------------
// 6. MERGE Composition
// ----------------------------------------------------------------------------
export const VerbTest_MERGE: React.FC = () => {
  const template = useMemo(() => {
    return createMergeTemplate({
      shotId: 'render_test_merge',
      heroId: 'merge_mass',
      heroLabel: 'Converging Masses',
      startFrame: 0,
      endFrame: 100,
      barycenter: { x: 960, y: 540, z: 0 },
      origins: [{ x: 500, y: 540, z: 0 }, { x: 1420, y: 540, z: 0 }],
      mergedScale: 1.4,
    });
  }, []);

  return (
    <PersistentWorld contracts={[template.contract]} style={{ backgroundColor: '#090D16' }}>
      <PersistentHeroEntity
        contract={template.contract}
        render={(state) => (
          <div style={{ position: 'relative', width: 200, height: 200 }}>
            {state.components?.map((c) => (
              <div
                key={c.id}
                style={{
                  position: 'absolute',
                  left: c.position.x - state.position.x + 100,
                  top: c.position.y - state.position.y + 100,
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `radial-gradient(circle at 35% 35%, #FFFFFF 0%, ${c.color || '#38BDF8'} 70%, #1E3A8A 100%)`,
                  boxShadow: `0 0 35px ${c.color || '#38BDF8'}`,
                  transform: `translate(-50%, -50%) scale(${c.scale})`,
                }}
              />
            ))}
          </div>
        )}
      />
    </PersistentWorld>
  );
};

// ----------------------------------------------------------------------------
// 7. DEFORM Composition
// ----------------------------------------------------------------------------
export const VerbTest_DEFORM: React.FC = () => {
  const template = useMemo(() => {
    return createDeformTemplate({
      shotId: 'render_test_deform',
      heroId: 'deform_substrate',
      heroLabel: 'Elastic Substrate',
      startFrame: 0,
      endFrame: 100,
      anchor: { x: 960, y: 540, z: 0 },
      maxSquash: 1.6,
      maxShearDeg: 24,
    });
  }, []);

  return (
    <PersistentWorld contracts={[template.contract]} style={{ backgroundColor: '#090D16' }}>
      <PersistentHeroEntity
        contract={template.contract}
        render={(state) => (
          <div
            style={{
              width: 120 * (state.aspectRatio || 1),
              height: 120 / Math.max(0.2, state.aspectRatio || 1),
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #06B6D4, #0284C7)',
              boxShadow: '0 0 45px rgba(6, 182, 212, 0.6)',
              transform: `skewX(${state.shearDeg || 0}deg)`,
            }}
          />
        )}
      />
    </PersistentWorld>
  );
};

// ----------------------------------------------------------------------------
// 8. REASSEMBLE Composition
// ----------------------------------------------------------------------------
export const VerbTest_REASSEMBLE: React.FC = () => {
  const template = useMemo(() => {
    return createReassembleTemplate({
      shotId: 'render_test_reassemble',
      heroId: 'reassemble_lattice',
      heroLabel: 'Crystalline Lattice',
      startFrame: 0,
      endFrame: 100,
      assemblyCenter: { x: 960, y: 540, z: 0 },
      scatterRadius: 260,
      fragmentCount: 4,
      finalScale: 1.35,
    });
  }, []);

  return (
    <PersistentWorld contracts={[template.contract]} style={{ backgroundColor: '#090D16' }}>
      <PersistentHeroEntity
        contract={template.contract}
        render={(state) => (
          <div style={{ position: 'relative', width: 200, height: 200 }}>
            {state.components?.map((c) => (
              <div
                key={c.id}
                style={{
                  position: 'absolute',
                  left: c.position.x - state.position.x + 100,
                  top: c.position.y - state.position.y + 100,
                  width: 60,
                  height: 60,
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #6366F1, #4338CA)',
                  boxShadow: '0 0 35px #6366F1',
                  transform: `translate(-50%, -50%) scale(${c.scale}) rotate(${c.rotation.z}deg)`,
                }}
              />
            ))}
          </div>
        )}
      />
    </PersistentWorld>
  );
};

// ----------------------------------------------------------------------------
// 9. NEGATIVE ANTI-BYPASS: Fake Split (Calls createSplitTemplate but renders static hero)
// ----------------------------------------------------------------------------
export const VerbTest_AntiBypass_FakeSplit: React.FC = () => {
  const template = useMemo(() => {
    return createSplitTemplate({
      shotId: 'render_test_antibypass_fakesplit',
      heroId: 'fake_split_cell',
      heroLabel: 'Fake Split Cell',
      startFrame: 0,
      endFrame: 100,
      origin: { x: 960, y: 540, z: 0 },
      separationDistance: 300,
    });
  }, []);

  return (
    <PersistentWorld contracts={[template.contract]} style={{ backgroundColor: '#090D16' }}>
      <PersistentHeroEntity
        contract={template.contract}
        render={() => (
          // FAKE RENDER: Ignores template components and renders a static circle
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: '#38BDF8',
              boxShadow: '0 0 35px #38BDF8',
            }}
          />
        )}
      />
    </PersistentWorld>
  );
};

// ----------------------------------------------------------------------------
// 10. NEGATIVE DECORATIVE CAMOUFLAGE: Static Hero + Moving Decorative Particle
// ----------------------------------------------------------------------------
export const VerbTest_DecorativeCamouflage: React.FC = () => {
  const frame = useCurrentFrame();
  const template = useMemo(() => {
    const t = createExpandTemplate({
      shotId: 'render_test_decorative_camouflage',
      heroId: 'static_core_with_particle',
      heroLabel: 'Static Core with Particle',
      startFrame: 0,
      endFrame: 100,
      anchor: { x: 960, y: 540, z: 0 },
      initialScale: 1.0,
      expandedScale: 1.0, // Stays static
    });
    t.contract.evaluateVerbState = () => ({
      position: { x: 960, y: 540, z: 0 },
      scale: 1.0,
      rotation: { z: 0 },
      opacity: 1.0,
      geometry: 'static_core',
      state: 'static',
      activeVerb: 'EXPAND',
      instantaneousVelocity: { x: 0, y: 0, z: 0 },
      isMeaningfulMotionActive: false,
    });
    return t;
  }, []);

  // Moving decorative particle inside Hero ROI
  const particleOffset = ((frame * 2) % 120);

  return (
    <PersistentWorld contracts={[template.contract]} style={{ backgroundColor: '#090D16' }}>
      <PersistentHeroEntity
        contract={template.contract}
        render={() => (
          <div style={{ position: 'relative', width: 200, height: 200 }}>
            {/* Primary Hero Core is 100% STATIC */}
            <div
              style={{
                position: 'absolute',
                left: 30,
                top: 30,
                width: 140,
                height: 140,
                borderRadius: '50%',
                backgroundColor: '#10B981',
                boxShadow: '0 0 30px #10B981',
              }}
            />
            {/* Unrelated tiny decorative noise dot drifting across */}
            <div
              style={{
                position: 'absolute',
                left: 10 + particleOffset,
                top: 95,
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
              }}
            />
          </div>
        )}
      />
    </PersistentWorld>
  );
};
