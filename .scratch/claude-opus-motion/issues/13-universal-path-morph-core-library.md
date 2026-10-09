# 13: Universal Path Morph Core Library

**What to build:** Build the core reusable SVG path morphing component library in `src/motion/library/UniversalPathMorph.tsx` using `@remotion/paths`. It provides:
1. Normalized SVG path dictionaries across domains (`science_biomedical`, `ai_future_tech`, `fintech_saas`, `geometry_abstract`, and custom path strings).
2. Elastic spring-driven path interpolation (`interpolatePath`) across keyframe sequence intervals.
3. Live stroke evolution (`evolvePath`) for drawing-on transitions.

**Blocked by:** None (can start immediately).

**Status:** done

- [x] Create `src/motion/library/UniversalPathMorph.tsx`.
- [x] Implement multi-keyframe sequence interpolation.
- [x] Connect `@remotion/paths`'s `interpolatePath` with spring easing.
- [x] Verify zero NaN/null errors on SVG path interpolation.
