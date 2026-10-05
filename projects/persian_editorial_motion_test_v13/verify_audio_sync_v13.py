#!/usr/bin/env python3
"""
VERIFY AUDIO SYNC V13
Measures frame-accurate synchronization between spoken acoustic events and visual motion triggers.
Criterion: Delta must be <= 2 frames (67ms) across all major semantic milestones (target: 0 frames).
"""

import json
import sys
from pathlib import Path

# Ensure UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8')

def main():
    root = Path(__file__).resolve().parent
    timeline_path = root.parent.parent / "src" / "audio" / "voiceTimeline.json"
    
    if not timeline_path.exists():
        timeline_path = root.parent / "persian_editorial_motion_test_v10" / "src" / "motion" / "timing" / "voiceTimeline.json"

    if not timeline_path.exists():
        print(f"Error: {timeline_path} not found.")
        sys.exit(1)
        
    with open(timeline_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    events = data.get("events", {})
    
    # Visual trigger points configured in V13 shot components
    visual_triggers = {
        "shot01_intro_start": 0,
        "shot01_question_start": 184,
        "shot01_researcher_keyword_strike": 234,
        "shot01_shot02_handoff": 350,
        "shot02_decree_speech_start": 379,
        "shot02_numeral_kaaf_strike": 395,  # 350 + 45
        "shot02_shot03_handoff": 620,
        "shot03_three_conditions_speech_start": 654,
        "shot03_criterion1_gpa16_strike": 855,  # 620 + 235
        "shot03_criterion2_disciplinary_strike": 1035, # 620 + 415
        "shot03_criterion3_articles_strike": 1215, # 620 + 595
        "shot03_shot04_handoff": 1450,
        "shot04_time_speech_start": 1476,
        "shot04_cutoff_1year_strike": 1575, # 1450 + 125
        "shot04_shot05_handoff": 1700,
        "shot05_tiers_speech_start": 1715,
        "shot05_tier1_65_strike": 1914, # 1700 + 214
        "shot05_tier2_110_strike": 2010, # 1700 + 310
        "shot05_tier3_130_strike": 2100, # 1700 + 400
        "shot05_shot06_handoff": 2155,
        "shot06_outro_speech_start": 2186,
        "shot06_seal_crest_strike": 2195, # 2155 + 40
        "shot06_speech_end": 2317,
        "shot06_master_resolve": 2361
    }
    
    print("\n" + "="*85)
    print("V13 AUDIO-VISUAL DETERMINISTIC SYNCHRONIZATION AUDIT")
    print("="*85)
    print(f"{'Event Key':<42} | {'Acoustic (f)':<12} | {'Visual (f)':<10} | {'Delta':<8} | {'Status'}")
    print("-" * 85)
    
    passed = 0
    total = len(events)
    max_delta = 0
    
    for key, acoustic_frame in events.items():
        if key not in visual_triggers:
            print(f"MISSING: Visual trigger for {key}")
            continue
            
        vis_frame = visual_triggers[key]
        delta = abs(vis_frame - acoustic_frame)
        max_delta = max(max_delta, delta)
        
        status = "PASS (0-frame)" if delta == 0 else f"PASS ({delta}f delta)" if delta <= 2 else "FAIL"
        if delta <= 2:
            passed += 1
            
        print(f"{key:<42} | {acoustic_frame:<12} | {vis_frame:<10} | {delta:<8} | {status}")
        
    print("-" * 85)
    print(f"Summary: {passed}/{total} sync points verified. Max Delta: {max_delta} frames.")
    
    if passed == total and max_delta <= 2:
        print("\n✅ V13 AUDIO-VISUAL SYNCHRONIZATION: 100% PERFECT CONVERGENCE")
        sys.exit(0)
    else:
        print("\n❌ AUDIO SYNC VIOLATIONS DETECTED")
        sys.exit(1)

if __name__ == "__main__":
    main()
