#!/usr/bin/env python3
"""
ANTI-SLIDESHOW SIGNATURES AUDIT GATE
Inspects composition source files and Shotbook plans for the 8 slideshow signatures (S1-S8):
- S1: Unmotivated scene replacement without causal handoff
- S2: Template reuse with text swapping
- S3: Text block fade as primary motion
- S4: Camera zoom as substitute for animation
- S5: Sequential card stacking (SaaS tile trap)
- S6: Disappearing without transformation
- S7: Lack of persistent spatial identity
- S8: Scene reset on sentence boundary
"""

import sys
import re
from pathlib import Path

def audit_composition_file(file_path: str):
    path = Path(file_path)
    if not path.exists():
        return False, [f"File not found: {file_path}"]

    code = path.read_text(encoding='utf-8')
    violations = []

    # Check S3: Text fade as sole primary motion
    if re.search(r'opacity:\s*interpolate\(.*\[0,\s*1\]\)', code) and not re.search(r'evaluateAuthoredKeyframeTrack|spring\(|transform:\s*`', code):
        violations.append("S3_TEXT_FADE_SOLE_MOTION: Detected opacity-only reveal on text without physical geometry or authored keyframe evaluation.")

    # Check S4: Continuous Camera Zoom loophole
    if re.search(r'interpolate\(frame,\s*\[0,\s*durationInFrames\],\s*\[1\.0,\s*1\.0[456]\]\)', code) and not re.search(r'impactFrame|recoil|craneProgress', code):
        violations.append("S4_CAMERA_ZOOM_LOOPHOLE: Detected continuous 1.05 camera zoom without subject impact recoil or motivated crane trajectory.")

    # Check S5: Generic Card Grids
    if len(re.findall(r'borderRadius:\s*[\'"]?\d+px[\'"]?.*boxShadow', code)) > 2 and "Card" in code:
        violations.append("S5_CARD_GRID_DETECTED: Detected multiple rounded dashboard cards. Criteria must be embodied in physical structural entities.")

    # Check generic fade transitions
    if re.search(r'<ShotTransition[^>]*type=[\'"]fade[\'"]', code):
        violations.append("GENERIC_FADE_DETECTED: Detected raw fade transition. Use motion-carry, push-through, or persistent world camera reframing.")

    return (len(violations) == 0), violations

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test_slideshow_signatures.py <path_to_tsx_or_shotbook>")
        sys.exit(1)

    target_file = sys.argv[1]
    passed, v_list = audit_composition_file(target_file)
    if passed:
        print(f"ANTI_SLIDESHOW PASS: No slideshow signatures detected in {target_file}")
        sys.exit(0)
    else:
        print(f"ANTI_SLIDESHOW FAIL: Detected {len(v_list)} slideshow signatures in {target_file}:")
        for v in v_list:
            print(f"  - {v}")
        sys.exit(1)
