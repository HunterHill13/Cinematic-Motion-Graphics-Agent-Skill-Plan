# Sound Design & STEM Mixing Specification (v4.1)

## 1. Stem Architecture
The film audio pipeline is built on 3 decoupled stems:
1. **Dialogue Stem (`voice.wav`)**: Clean vocal narration (either human recording or normalized neural TTS). Normalized to $-16\text{ LUFS}$.
2. **Music Bed Stem (`music.wav`)**: Institutional scientific score (`institutional_science_pulse.wav`) featuring rhythmic synthesized pulses, cello sub-drones, and gentle high-frequency harmonic shimmer.
3. **Foley & SFX Stem (`sfx.wav`)**: Tactile acoustic feedback locked to visual kinematic events.

---

## 2. Automated Voice Ducking
Music volume is dynamically controlled by voice activity:
- **Baseline Music Level**: $-12\text{ dBFS}$ during purely visual pauses.
- **Ducked Music Level**: $-26\text{ dBFS}$ (a $-14\text{ dB}$ cut) whenever voice narration is active.
- **Attack Time**: 12 frames ($400\text{ ms}$) prior to speech onset.
- **Release Time**: 18 frames ($600\text{ ms}$) after speech cessation.

---

## 3. Kinetic SFX Cue Sheet (Proof of Quality: 0–540f)

| Frame | Visual Trigger | SFX Category | Acoustic Signature | Gain |
| :--- | :--- | :--- | :--- | :--- |
| **f15** | Crest line formation | Institutional Tone | Sub-harmonic gold chime + low sine swell (60Hz) | $-9\text{ dB}$ |
| **f45** | Tracking expand settle | Typographic Hit | Subtle pneumatic air whoosh | $-14\text{ dB}$ |
| **f185** | Gauge dial entrance | Mechanical | Precision rotary click | $-12\text{ dB}$ |
| **f210** | Gauge 1 needle snap (16 pts) | Metric Lock | Clean mechanical relay latch | $-10\text{ dB}$ |
| **f225** | Gauge 2 needle snap (65 pts) | Metric Lock | Clean mechanical relay latch (higher pitch) | $-10\text{ dB}$ |
| **f240** | Gauge 3 needle snap (110 pts)| Metric Lock | Clean mechanical relay latch (higher pitch) | $-10\text{ dB}$ |
| **f255** | Gauge 4 needle snap (130 pts)| Metric Lock | High resonance chime lock | $-8\text{ dB}$ |
| **f365** | Line shoot across screen | Transition Whoosh | Linear Doppler friction whoosh | $-11\text{ dB}$ |
| **f405** | Right angle box boundary draw | Geometric Draw | Razor etching sound | $-13\text{ dB}$ |
| **f440** | 4 Pillars icon bloom | Acoustic Stamp | Solid multi-frequency acoustic lock | $-9\text{ dB}$ |
