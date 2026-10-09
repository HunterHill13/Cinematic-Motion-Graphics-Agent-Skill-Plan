# 05: Dynamic Fresnel Specular Sweep

**What to build:** Implement an angle-driven specular light sweep component for cards and glass surfaces. It computes the specular reflection vector dynamically from camera `camYaw`, `camRoll`, and `camPitch`, creating realistic physical light glints across frosted glass borders.

**Blocked by:** None (can start immediately).

**Status:** done

- [x] Create `DynamicFresnelSweep.tsx` in `src/motion/library/`.
- [x] Connect camera yaw and roll to gradient angle and highlight offset.
- [x] Apply the dynamic specular sweep to Act 1 hero card and Act 3 isometric console.
- [x] Verify clean rendering without border clipping.
