export interface ShotPlan {
  shotId: string;
  durationFrames: number;
  narrationRange: [number, number]; // [startSec, endSec]
  purpose: string;
  visualAnchor: string;
  primarySubject: string;
  secondaryElements: string[];
  entranceRecipe: string;
  exitRecipe: string;
  transformationRecipe: string;
  cameraRecipe: string;
  transitionIn: string;
  transitionOut: string;
  typographyRecipe: string;
  particleRecipe: string;
  sfx: string[];
  musicState: string;
  continuityAnchor: string;
}

export class ShotPlanner {
  private shots: ShotPlan[] = [];

  constructor() {
    this.initDefaultApoptosisPlan();
  }

  private initDefaultApoptosisPlan(): void {
    this.shots = [
      {
        shotId: 'shot_01',
        durationFrames: 225,
        narrationRange: [0.3, 7.0],
        purpose: 'Establish cancer survival barrier and BCL-2 fortress',
        visualAnchor: 'cytochrome_energy_particle (trapped seed)',
        primarySubject: 'Mitochondrial Bilayer & BCL-2 Defense Shield',
        secondaryElements: ['Matrix Cristae Folds', 'LaserCallout Reticle'],
        entranceRecipe: 'spring-pop',
        exitRecipe: 'optical-defocus',
        transformationRecipe: 'seed-to-vector',
        cameraRecipe: 'cinematic-push',
        transitionIn: 'none',
        transitionOut: 'match-cut-morph',
        typographyRecipe: 'kinetic-word-cascade',
        particleRecipe: 'ambient-drift',
        sfx: ['whoosh-fast'],
        musicState: 'atmospheric-sub-drone',
        continuityAnchor: 'center_seed',
      },
      {
        shotId: 'shot_02',
        durationFrames: 240,
        narrationRange: [7.0, 14.5],
        purpose: 'Direct collision of BH3 mimetic vector and shield fracture',
        visualAnchor: 'cytochrome_energy_particle (kinetic spearhead)',
        primarySubject: 'BH3-Mimetic Peptide Rocket & Shield Fracture',
        secondaryElements: ['Energy Wake Spline', 'LaserCallout Reticle', 'Impact Shockwave'],
        entranceRecipe: 'directional-reveal',
        exitRecipe: 'directional-exit',
        transformationRecipe: 'membrane-pore-rupture',
        cameraRecipe: 'impact-shake',
        transitionIn: 'match-cut-morph',
        transitionOut: 'dive-through-pore',
        typographyRecipe: 'kinetic-word-cascade',
        particleRecipe: 'impact-debris',
        sfx: ['whoosh-fast', 'bass-hit-futuristic'],
        musicState: 'arpeggiated-tension-build',
        continuityAnchor: 'impact_locus',
      },
      {
        shotId: 'shot_03',
        durationFrames: 240,
        narrationRange: [14.5, 22.2],
        purpose: 'MOMP pore opening and relativistic Cytochrome c release',
        visualAnchor: 'cytochrome_energy_particle (rupture core swarm)',
        primarySubject: 'MOMP Dilation Pore & Escaping Cytochrome c',
        secondaryElements: ['8-Particle Radial Swarm', 'Volumetric Glow Halo'],
        entranceRecipe: 'dive-through-pore',
        exitRecipe: 'particle-wheel-assembly',
        transformationRecipe: 'particle-wheel-assembly',
        cameraRecipe: 'cinematic-push',
        transitionIn: 'dive-through-pore',
        transitionOut: 'match-cut-morph',
        typographyRecipe: 'kinetic-word-cascade',
        particleRecipe: 'radial-burst',
        sfx: ['bass-hit-futuristic', 'whoosh-fast'],
        musicState: 'harmonic-choir-swell',
        continuityAnchor: 'dispersed_particles',
      },
      {
        shotId: 'shot_04',
        durationFrames: 251,
        narrationRange: [22.2, 30.0],
        purpose: 'Assembly of the 7-spoke Apoptosome and Caspase-9 ignition',
        visualAnchor: 'cytochrome_energy_particle (Caspase-9 activation hub)',
        primarySubject: 'Heptameric Apaf-1 Wheel of Death & Caspase-9',
        secondaryElements: ['7 Staggered Spokes', 'Concentric Cleavage Waves'],
        entranceRecipe: 'particle-wheel-assembly',
        exitRecipe: 'scale-collapse',
        transformationRecipe: 'final-execution',
        cameraRecipe: 'orbital-roll',
        transitionIn: 'match-cut-morph',
        transitionOut: 'fade-to-black',
        typographyRecipe: 'kinetic-word-cascade',
        particleRecipe: 'ambient-glow-mesh',
        sfx: ['transition-soft', 'bass-hit-futuristic'],
        musicState: 'climactic-resolution',
        continuityAnchor: 'caspase9_hub',
      },
    ];
  }

  public getPlan(): ShotPlan[] {
    return this.shots;
  }

  public getShot(id: string): ShotPlan | undefined {
    return this.shots.find((s) => s.shotId === id);
  }
}
