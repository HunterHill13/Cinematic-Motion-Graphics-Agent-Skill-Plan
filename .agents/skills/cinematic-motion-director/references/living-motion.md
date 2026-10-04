# Living Motion Engine Reference (v2)

The Living Motion Engine guarantees that animations never feel like static presentation slides.

---

## 1. Core Principles

1. **Continuous Vitality:** No visual hero element ever rests at absolute zero velocity. Even in "hold" periods, elements undergo subtle breathing ($1.000 \to 1.012$ micro-scale at $0.2\,\text{Hz}$) and sub-perceptual rotation.
2. **Procedural Multi-Octave Noise:** Deterministic, frame-driven noise (`f(frame, seed)`) creates natural handheld camera drift without relying on nondeterministic runtime randoms.
3. **Secondary Follower Physics:** Badges, connectors, and callouts trail parent movements with spring elasticity and 4–8 frame inertial lag.
4. **Ambient Background Drift:** Deep environments contain floating micro-particles executing organic Brownian motion.

---

## 2. Using Living Motion Components in Remotion

### 2.1 LivingCameraRig
Replaces the standard rigid camera rig with continuous scale, organic handheld drift, and beat impact impulses:
```tsx
import { LivingCameraRig } from '../living-motion/LivingCameraRig';

export const MyScene: React.FC = () => {
  return (
    <LivingCameraRig
      durationInFrames={150}
      initialScale={1.0}
      targetScale={1.045}
      enableHandheldDrift={true}
      driftIntensity={7.0}
      enableImpulseShake={true}
      shakeAtFrame={30}
    >
      {/* Scene Content */}
    </LivingCameraRig>
  );
};
```

### 2.2 OrganicBreathing
Keeps hero elements alive during their on-screen presentation:
```tsx
import { OrganicBreathing } from '../living-motion/OrganicBreathing';

<OrganicBreathing amplitude={0.012} frequency={0.035} seed={42} enableGlow={true}>
  <ProteinModel data={structure} />
</OrganicBreathing>
```

### 2.3 SecondaryPhysics
Ensures annotations and labels lag behind parent heroes naturally:
```tsx
import { SecondaryPhysics } from '../living-motion/SecondaryPhysics';

<SecondaryPhysics delayFrames={6} stiffness={100} damping={18}>
  <CalloutBadge text="Cytochrome c" />
</SecondaryPhysics>
```

### 2.4 ParticleDrift
Injects subtle floating dust/matter across the deep background:
```tsx
import { ParticleDrift } from '../living-motion/ParticleDrift';

<ParticleDrift particleCount={30} color="rgba(255, 255, 255, 0.35)" driftSpeed={1.2} />
```
