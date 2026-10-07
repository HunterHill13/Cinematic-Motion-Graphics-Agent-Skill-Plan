import React from 'react';
import {
  PersistentWorld,
  PersistentHeroEntity,
} from '../../src/motion/grammar/PersistentWorld';
import {
  TransformationContract,
} from '../../src/motion/grammar/motionGrammar';

// ============================================================================
// POSITIVE FIXTURE: GENUINE CONTINUOUS TRANSFORMATION
// Uses PersistentWorld with certified TransformationContract.
// Hero undergoes genuine middle-beat spatial/volumetric transformation.
// Expected: PASS
// ============================================================================

const certifiedContract: TransformationContract = {
  shotId: 'shot_genuine_core',
  startFrame: 0,
  endFrame: 300,
  durationFrames: 300,
  heroEntity: {
    id: 'genuine_hero_core',
    label: 'هسته کوانتومی پیوسته',
    persistsFrom: 'GENESIS',
    persistsTo: 'TERMINUS',
  },
  initialState: {
    position: { x: 960, y: 540, z: 0 },
    scale: 1.0,
    rotation: { z: 0 },
    geometry: 'crystalline_cube',
    state: 'stable',
  },
  trigger: {
    frame: 40,
    narrationMarker: 'با اعمال نیروی برشی',
    forceType: 'bifurcation_shear_impulse',
  },
  midpointEvent: {
    verb: 'SPLIT',
    startFrame: 100, // Inside middle 60% (frames 60 - 240)
    endFrame: 200,
    subBeats: [
      { frame: 120, action: 'Bifurcation along vertical meridian' },
      { frame: 160, action: 'Sub-cores rotate 45 degrees' },
    ],
    meaningfulDelta: {
      property: 'position',
      expectedMinimumDelta: 160, // 160px spread > 24px threshold
    },
  },
  finalState: {
    position: { x: 960, y: 540, z: -80 },
    scale: 1.25,
    rotation: { z: 45 },
    geometry: 'dual_active_rotors',
    state: 'energized',
  },
  exitMomentum: {
    vector: { x: 12, y: 0, z: -10 },
    angularVelocity: 2.0,
    consequence: 'Translates kinetic spin to downstream receivers',
  },
};

export const PositiveFixture_GenuineTransformation: React.FC = () => {
  return (
    <PersistentWorld contracts={[certifiedContract]}>
      <PersistentHeroEntity
        contract={certifiedContract}
        render={(state) => (
          <div
            style={{
              width: 180,
              height: 180,
              background: '#06B6D4',
              borderRadius: state.geometry === 'dual_active_rotors' ? '50%' : '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 'bold',
            }}
          >
            {state.activeVerb}
          </div>
        )}
      />
    </PersistentWorld>
  );
};
