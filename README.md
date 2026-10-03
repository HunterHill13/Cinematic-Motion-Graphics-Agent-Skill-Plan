# Cinematic Motion Director — AI Video Production Pipeline

A professional, enterprise-grade Motion Graphics Agent Skill built for **Google Antigravity + Gemini**, powered by **Remotion** and React.

---

## Quickstart

### 1. Preview in Remotion Studio
```bash
npm start
# Launches interactive Remotion Studio at http://localhost:3000
```

### 2. Render Pilot (First 20s)
```bash
npx remotion render PilotPreview renders/pilot/pilot_v1.mp4
```

### 3. Render Full Video Master (60s @ 30 FPS)
```bash
npx remotion render CinematicVideo renders/final/apoptosis_final.mp4
```

---

## Architecture Highlights
- **5 Input Modes:** Topic (A), Script (B), Voiceover (C), Script+VO (D), Docs/Lecture (E).
- **Anti-Slideshow System:** Continuous micro-movement via `CameraRig` ($1.00 \to 1.05$), non-dead backgrounds, and motion continuity transitions.
- **5-Layer Visual Stack:** Ambient Mesh -> CameraRig Content -> Color Grade -> Vignette -> Procedural Grain.
- **Medical/Scientific Factual Grounding:** Strict source traceability ledger (`research/sources.md`).
- **Enforced Pilot Gate:** Inspect and approve the first 10–30s before full production.
- **Two-Tier Quality Control:** Automated quantitative CV metrics + visual frame audit.

---

## Attribution & Licenses
See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) for full open-source licensing details.
