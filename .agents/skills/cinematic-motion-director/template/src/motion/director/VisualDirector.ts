/**
 * ============================================================================
 * VISUAL DIRECTOR: THE HIGH-LEVEL AESTHETIC BRAIN (PHASE 6)
 * ============================================================================
 * 
 * Replaces the implementation-first pipeline with an Art-Direction-First
 * workflow. Reasons about composition, silhouette, lighting as shape reveal,
 * material tactility, scale presence, and visual storytelling.
 * 
 * CORE DOCTRINE:
 *   1. "The rendered video is the product. Everything else is infrastructure."
 *   2. "A bad still with beautiful motion is still a bad shot."
 *   3. "Ban the generic scientific SVG look (small glowing circle in a black void)."
 * ============================================================================
 */

import { VisualShotPlan } from './ShotDesign';

export interface VisualMotif {
  worldTheme: string;
  palette: {
    deepAtmosphere: string[]; // Multi-stop gradient for environment [deep base, ambient haze, light bloom]
    heroMembrane: {
      outerBilayer: string;
      innerStroma: string;
      subsurfaceGaze: string;
      stressRim: string;
    };
    nuclearPlasma: {
      core: string;
      corona: string;
      chromatinNodes: string;
    };
    environmentalFilaments: string[];
    particulateFloaters: string[];
  };
  silhouettePhilosophy: string;
  lightingGrammar: string;
}

export class VisualDirector {
  /**
   * The Master Artistic Motif for the Phase 6 Benchmark:
   * "Bioluminescent Cytosolic Deep-Sea Microcosm"
   * 
   * Moves far beyond the flat "blue circle on black" diagnostic look:
   * - Deep textured atmosphere with ambient gradient illumination.
   * - Anatomically rich cellular stroma with undulating lipid bilayer.
   * - Visible inner organelle network (chromatin, mitochondria, micro-vesicles).
   * - Expressive rim lighting that shifts dynamically under physical tension.
   */
  public static getMasterMotif(): VisualMotif {
    return {
      worldTheme: 'Bioluminescent Microcosm',
      palette: {
        deepAtmosphere: [
          '#020617', // Obsidian deep abyss
          '#09132e', // Deep cytosolic stroma
          '#0f172a', // Midnight slate
          '#1e1b4b', // Indigo environmental depth
        ],
        heroMembrane: {
          outerBilayer: '#38bdf8', // Bio-cyan
          innerStroma: '#0369a1',  // Deep aquamarine
          subsurfaceGaze: '#0284c7', // Translucent fluid glow
          stressRim: '#fb7185',    // Mechanical tension crimson
        },
        nuclearPlasma: {
          core: '#ffffff',         // White-hot plasma singularity
          corona: '#67e8f9',       // Radiant cyan aura
          chromatinNodes: '#818cf8', // Electric violet genetic cluster
        },
        environmentalFilaments: ['#1e293b', '#334155', '#475569', '#1e1b4b'],
        particulateFloaters: ['#38bdf8', '#818cf8', '#e0f2fe', '#0284c7'],
      },
      silhouettePhilosophy:
        'Organic, anatomical asymmetry with fluid membrane undulations, intricate internal organelles, and structural extracellular matrix framing.',
      lightingGrammar:
        'Chiaroscuro microscopic illumination: strong Upper-Left directional Key (cyan), Lower-Right ambient Fill (indigo), and dramatic Lower-Left grazing Rim (crimson tension response).',
    };
  }

  /**
   * Authors the 5-Shot Phase 6 Benchmark Sequence:
   * Total Duration: 420 Frames (14.0 Seconds @ 30 FPS)
   * 
   * Tight, focused, highly polished narrative:
   *   Shot 1: The Living Microcosm (Frames 0–90 / 3.0s)
   *   Shot 2: Kinetic Vector & Tension Coil (Frames 90–180 / 3.0s)
   *   Shot 3: Asymmetric Rupture & Focal Impact (Frames 180–240 / 2.0s)
   *   Shot 4: Deep Parallax Flight & Lead Room (Frames 240–330 / 3.0s)
   *   Shot 5: Harmonic Reorganization & Equilibrium (Frames 330–420 / 3.0s)
   */
  public static designBenchmarkSequence(): VisualShotPlan[] {
    return [
      {
        id: 'SHOT_01',
        shotNumber: 1,
        name: 'The Living Microcosm',
        frameRange: { start: 0, end: 90 },
        durationFrames: 90,
        narrativeJob: 'Hook & Establish World',
        stillFramePeakDescription:
          'Frame 45: A commanding bioluminescent organism suspended in a luminous deep-indigo fluid environment. The cell occupies 45% of the frame with a shimmering lipid bilayer, pulsating chromatin nucleus, and surrounding translucent organelle nodes framed by textured collagen fibers.',
        subject: {
          name: 'Primary Living Protocell',
          silhouetteDescription: 'Broad organic amoebic contour with active membrane waves',
          scaleFractionOfFrame: 0.42,
          internalStructures: [
            'Phospholipid bilayer contour with receptor protein nodules',
            'Dense chromatin nuclear core with radiating plasma corona',
            'Cluster of 6 cytosolic vesicles orbiting the stroma',
            'Translucent cytoplasmic stroma with multi-stop volumetric gradient',
          ],
          surfaceTactility: 'Subsurface viscous membrane with fluid refractive highlights',
          accentDetails: ['Bioluminescent receptor nodes', 'Cytosolic droplets', 'Chromatin filaments'],
        },
        composition: {
          focalAnchor: { xPct: 0.50, yPct: 0.50 },
          framingStrategy: 'Diagonal extracellular collagen filaments framing the upper-left and lower-right quadrants',
          negativeSpaceBalance: 'Balanced 58% environment to 42% hero presence',
          depthPlanes: {
            foregroundFraming: 'Two soft, out-of-focus cytosolic globules drifting across the near lens plane',
            heroPlane: 'Pin-sharp hero cell and internal organelle complex at focal depth',
            midgroundResponse: 'Micro-vesicles suspended in extracellular currents',
            deepAtmosphere: 'Luminous deep-indigo nebula gradient with intersecting structural scaffolding',
          },
        },
        lighting: {
          keyLight: { direction: 'UPPER_LEFT', color: '#38bdf8', mood: 'Warm bioluminescent clarity' },
          fillLight: { direction: 'LOWER_RIGHT', color: '#818cf8', ambientGaze: 'Cool mysterious deep-matrix gaze' },
          rimLight: { direction: 'LOWER_LEFT', color: '#38bdf8', tensionResponse: 'Subtle calming edge halo' },
          environmentalHaze: 'Volumetric indigo gradient bloom (#09132e to #020617)',
        },
        motion: {
          visualCatalyst: 'Gentle fluid hydrostatic respiration',
          primaryTransformation: 'Continuous biological breathing oscillation (±6px stroma pulse, cycle 45f)',
          secondaryResponse: 'Internal nucleus lags stroma expansion by 4 frames; organelle vesicles float in orbit',
          cameraMotivation: 'Slow, majestic push-in revealing internal cellular anatomy (zoom 0.95 -> 1.08)',
          transitionHandoff: 'Spatial persistence: cell stabilizes as kinetic force vector enters upper periphery',
        },
      },
      {
        id: 'SHOT_02',
        shotNumber: 2,
        name: 'Kinetic Vector & Tension Coil',
        frameRange: { start: 90, end: 180 },
        durationFrames: 90,
        narrativeJob: 'Escalate Tension & Anticipation',
        stillFramePeakDescription:
          'Frame 165: The cell is deeply compressed along the diagonal of incoming kinetic force, coiling backward with high membrane tension. The trailing edge flares with vivid crimson stress rim lighting, while the nucleus squashes into a dense high-energy oval.',
        subject: {
          name: 'Compressed Protocell under Kinetic Strain',
          silhouetteDescription: 'Asymmetric squash-stretch contour coiled backward (-40px X, -12° tilt)',
          scaleFractionOfFrame: 0.44,
          internalStructures: [
            'Strained lipid bilayer with localized thinning at the impact apex',
            'Squashed high-density nucleus glowing with intensified radiance',
            'Organelles compressed against the trailing membrane wall',
          ],
          surfaceTactility: 'Taut, stressed membrane with sharp specular highlight and crimson rim glow',
          accentDetails: ['Incoming electric shock arc', 'Localized membrane thinning', 'Crimson stress rim'],
        },
        composition: {
          focalAnchor: { xPct: 0.45, yPct: 0.52 },
          framingStrategy: 'Diagonal tension line connecting upper-right force vector to coiled lower-left cell',
          negativeSpaceBalance: 'Dynamic tension distribution with lead room given to incoming wavefront',
          depthPlanes: {
            foregroundFraming: 'Fast-moving energy sparks sweeping through the foreground',
            heroPlane: 'Coiling hero cell and incoming energy wavefront',
            midgroundResponse: 'Extracellular filaments flexing under acoustic pressure wave',
            deepAtmosphere: 'Background nebula darkens slightly as energy concentrates in the foreground',
          },
        },
        lighting: {
          keyLight: { direction: 'UPPER_RIGHT', color: '#67e8f9', mood: 'Harsh impinging wavefront illuminance' },
          fillLight: { direction: 'LOWER_LEFT', color: '#4f46e5', ambientGaze: 'Deep stroma shadow' },
          rimLight: { direction: 'LOWER_LEFT', color: '#fb7185', tensionResponse: 'Intense crimson stress flare' },
          environmentalHaze: 'Radial energy halo expanding from incoming wavefront',
        },
        motion: {
          visualCatalyst: 'High-energy compressive wavefront impinging on outer membrane',
          primaryTransformation: 'Retrograde anticipation coil: cell pulls back -40px while compressing to 0.82x axial scale',
          secondaryResponse: 'Nucleus resists compression initially then violently squashes; trailing vesicles bunch together',
          cameraMotivation: 'Reframes dynamically to encompass both incoming force and recoiling cell (zoom 1.08 -> 1.22)',
          transitionHandoff: 'Elastic tension reaches breaking threshold at frame 180 -> instantaneous snap',
        },
      },
      {
        id: 'SHOT_03',
        shotNumber: 3,
        name: 'Asymmetric Rupture & Focal Impact',
        frameRange: { start: 180, end: 240 },
        durationFrames: 60,
        narrativeJob: 'Climax & Structural Disruption',
        stillFramePeakDescription:
          'Frame 192: The membrane has violently ruptured. A brilliant flash of released stroma energy illuminates the frame as the cell divides into two distinct polarized daughter bodies propelled apart with high velocity, punctuated by an instantaneous camera punch-in.',
        subject: {
          name: 'Bifurcated Daughter Entities',
          silhouetteDescription: 'Two polarized, aerodynamic daughter amoebas tearing along the mitotic axis',
          scaleFractionOfFrame: 0.52,
          internalStructures: [
            'Daughter Alpha: dominant leftward core with intact glowing nucleus',
            'Daughter Beta: secondary rightward core with turbulent trailing stroma',
            'Fracture filaments and released organelle micro-droplets between the two bodies',
          ],
          surfaceTactility: 'Dynamic fluid shear with cavitation highlights and turbulent membrane edges',
          accentDetails: ['Cavitation flash', 'Filamentous tether tearing', 'Ejected micro-vesicles'],
        },
        composition: {
          focalAnchor: { xPct: 0.42, yPct: 0.54 },
          framingStrategy: 'Dynamic bilateral divergence along 45° diagonal axis',
          negativeSpaceBalance: 'Expansive center rift opening between separating masses',
          depthPlanes: {
            foregroundFraming: 'Microscopic cavitation shockwave expanding outward past lens',
            heroPlane: 'Two separating daughter cells and tearing central stroma',
            midgroundResponse: 'Surrounding collagen matrix vibrating from shock impulse',
            deepAtmosphere: 'Deep atmospheric flare illuminating the background scaffolding',
          },
        },
        lighting: {
          keyLight: { direction: 'CENTER', color: '#ffffff', mood: 'Instantaneous cavitation rupture flash' },
          fillLight: { direction: 'LOWER_RIGHT', color: '#818cf8', ambientGaze: 'Cool matrix fill' },
          rimLight: { direction: 'OPPOSING', color: '#38bdf8', tensionResponse: 'Bilateral edge definition' },
          environmentalHaze: 'Radiant cyan stroma discharge haze',
        },
        motion: {
          visualCatalyst: 'Tension threshold collapse at frame 184',
          primaryTransformation: 'Violent rupture: daughter Alpha propels left-down (v0 = -26px/f), daughter Beta propels right-up (v0 = +18px/f)',
          secondaryResponse: 'Shockwave expels cloud of 8 micro-vesicles; camera absorbs shock with 1.35x punch-in at frame 188',
          cameraMotivation: 'Focal punctuation: punches in to 1.35x on impact, then tracks dominant daughter Alpha',
          transitionHandoff: 'Conserved high-speed flight momentum carried into Shot 4',
        },
      },
      {
        id: 'SHOT_04',
        shotNumber: 4,
        name: 'Deep Parallax Flight & Lead Room',
        frameRange: { start: 240, end: 330 },
        durationFrames: 90,
        narrativeJob: 'Spatial Flight & Continuous Momentum',
        stillFramePeakDescription:
          'Frame 285: Daughter Alpha glides gracefully across the frame, positioned with generous anticipatory lead room. Camera sweeps along an orbital curve, revealing deep 2.5D parallax between the moving hero cell, sharp foreground floaters, and slow background scaffolding.',
        subject: {
          name: 'Gliding Daughter Protocell Alpha',
          silhouetteDescription: 'Streamlined droplet shape with trailing organelles lagging naturally behind',
          scaleFractionOfFrame: 0.38,
          internalStructures: [
            'Harmonized daughter nucleus settled in the anterior stroma',
            'Streamlined organelle train trailing 28px behind the anterior pole',
            'Oscillating caudal membrane skirt shedding micro-vesicles',
          ],
          surfaceTactility: 'Viscous laminar flow surface with glistening anterior specular highlight',
          accentDetails: ['Trailing organelle train', 'Anterior specular lens', 'Viscous wake ripple'],
        },
        composition: {
          focalAnchor: { xPct: 0.38, yPct: 0.50 },
          framingStrategy: 'Strong left-third composition with open lead room in the direction of flight',
          negativeSpaceBalance: '62% open forward lead room allowing the viewer to anticipate trajectory',
          depthPlanes: {
            foregroundFraming: 'Rapidly sweeping out-of-focus cytomatrix globules creating intense speed parallax',
            heroPlane: 'Pin-sharp daughter Alpha gliding with viscous stability',
            midgroundResponse: 'Daughter Beta visible in the deep background, curving in a wide return arc',
            deepAtmosphere: 'Collagen fibers slowly shifting in opposing parallax direction',
          },
        },
        lighting: {
          keyLight: { direction: 'UPPER_LEFT', color: '#38bdf8', mood: 'Crisp navigational key on anterior hull' },
          fillLight: { direction: 'BOTTOM', color: '#312e81', ambientGaze: 'Deep stroma shadow' },
          rimLight: { direction: 'RIGHT', color: '#a5b4fc', tensionResponse: 'Delicate trailing edge separation' },
          environmentalHaze: 'Directional motion haze stretching along flight path',
        },
        motion: {
          visualCatalyst: 'Fluid hydrodynamic drag slowing the initial explosive impulse',
          primaryTransformation: 'Laminar deceleration: daughter Alpha glides from (-180, 80) to (-340, 40)',
          secondaryResponse: 'Trailing organelles lag behind by 7 frames, then overshoot forward as deceleration begins',
          cameraMotivation: 'Orbital track: camera sweeps -16° to +14°, providing lead room and magnifying parallax',
          transitionHandoff: 'Velocity vector gently curves inward toward the central harmonic basin at frame 330',
        },
      },
      {
        id: 'SHOT_05',
        shotNumber: 5,
        name: 'Harmonic Reorganization & Equilibrium',
        frameRange: { start: 330, end: 420 },
        durationFrames: 90,
        narrativeJob: 'Reassembly, Homeostasis & Grand Resolution',
        stillFramePeakDescription:
          'Frame 390: The two daughter entities have coalesced into a reconstituted, higher-order master cell. The unified membrane glows with tranquil equilibrium, suspended in a majestic deep-indigo cosmos with balanced respiration.',
        subject: {
          name: 'Reconstituted Master Protocell',
          silhouetteDescription: 'Monumental, perfectly balanced living cell with complex internal architecture',
          scaleFractionOfFrame: 0.48,
          internalStructures: [
            'Fused macro-nucleus with twin glowing chromatin hubs',
            'Full suite of 10 harmonious organelles arranged in stable orbital symmetry',
            'Re-knitted double phospholipid bilayer with shimmering surface tension',
            'Bioluminescent surface constellation pulsing in unison',
          ],
          surfaceTactility: 'Velvety stroma with jewel-like internal refraction and serene subsurface glow',
          accentDetails: ['Bioluminescent crown', 'Harmonic respiration rings', 'Twin chromatin hubs'],
        },
        composition: {
          focalAnchor: { xPct: 0.50, yPct: 0.50 },
          framingStrategy: 'Regal central focal placement framed by concentric environmental scaffolding and subtle vignetting',
          negativeSpaceBalance: 'Harmonious 52% environment to 48% monumental hero presence',
          depthPlanes: {
            foregroundFraming: 'Gentle, slow cytomatrix particles framing the outer edges of the screen',
            heroPlane: 'Magnificent reconstituted cell in pin-sharp homeostatic breathing',
            midgroundResponse: 'Micro-vesicles settling into tranquil satellite orbits',
            deepAtmosphere: 'Deep indigo nebula with serene ambient gradients and soft structural scaffolding',
          },
        },
        lighting: {
          keyLight: { direction: 'UPPER_LEFT', color: '#38bdf8', mood: 'Triumphant bioluminescent glow' },
          fillLight: { direction: 'LOWER_RIGHT', color: '#818cf8', ambientGaze: 'Harmonious supportive stroma' },
          rimLight: { direction: 'CIRCULAR', color: '#e0f2fe', tensionResponse: 'Complete, unbroken ethereal rim of wholeness' },
          environmentalHaze: 'Tranquil atmospheric glow breathing in synchronization with the hero cell',
        },
        motion: {
          visualCatalyst: 'Centripetal harmonic potential drawing fragments into unified symmetry',
          primaryTransformation: 'Topological fusion and settling: fragments merge at (0, 0), stroma knits, breathing settles to serene homeostasis',
          secondaryResponse: 'All secondary organelles settle with exponential damping (zeta = 3.2); zero jarring stop',
          cameraMotivation: 'Eases back into a majestic, wide, stable observation perspective (zoom settles to 1.0, orbit settles to 0°)',
          transitionHandoff: 'Final tranquil fade into deep microscopic infinity',
        },
      },
    ];
  }
}
