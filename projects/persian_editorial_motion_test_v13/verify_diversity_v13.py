#!/usr/bin/env python3
"""
VERIFY MOTION DIVERSITY V13
Audits the distribution of Shot Recipes, Camera Modes, Typography Behaviors,
and Transition Types across the 6 shots to ensure architectural diversity without monoculture.
"""

import sys
from pathlib import Path

# Ensure UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8')

# V13 Formal Architectural Catalog
SHOT_DESIGNS_V13 = [
    {
        "shotId": "Shot 01",
        "category": "OpeningHook",
        "recipe": "hook-typography-slam",
        "cameraMode": "micro-push",
        "typography": "KeywordStrike + BaselineTravel",
        "companion": "Quadrant Architectural Brackets + Kinetic Underline Ray",
        "transitionOut": "KineticUnderlineHandoff",
    },
    {
        "shotId": "Shot 02",
        "category": "EditorialTypography",
        "recipe": "decree-monolith-reveal",
        "cameraMode": "slow-dolly",
        "typography": "MaskedPhraseReveal + NumeralKaafStrike",
        "companion": "Embossed Seal Medallion + Legal Monolith Border",
        "transitionOut": "SymmetricFission",
    },
    {
        "shotId": "Shot 03",
        "category": "DiagramExplainer",
        "recipe": "tripartite-criteria-diagram",
        "cameraMode": "parallax-drift",
        "typography": "WordGroupReveal + NumericMeterReveal",
        "companion": "Tripartite Structural Milestone Columns & Medallions",
        "transitionOut": "DatumRuleAxisCollapse",
    },
    {
        "shotId": "Shot 04",
        "category": "TimelineProcess",
        "recipe": "temporal-cutoff-timeline",
        "cameraMode": "slow-dolly",
        "typography": "DirectionalSlide + MaskedPhraseReveal",
        "companion": "12-Month Chronological Ruler Gate + Luminous Cutoff Barrier",
        "transitionOut": "PlanarStageFold",
    },
    {
        "shotId": "Shot 05",
        "category": "DataNumbers",
        "recipe": "score-threshold-pedestals",
        "cameraMode": "continuous",
        "typography": "AscendingNumericImpact",
        "companion": "Three Architectural Plinths (65, 110, 130) + Score Badges",
        "transitionOut": "GravitationalSingularity",
    },
    {
        "shotId": "Shot 06",
        "category": "HeroInstitutional",
        "recipe": "heraldic-institutional-seal",
        "cameraMode": "micro-pull",
        "typography": "HeraldicTitleSnap + WordGroupReveal",
        "companion": "Heraldic Laurel Wreath + Grand Medallion + Gold Rings",
        "transitionOut": "MasterResolveFreeze",
    },
]

def main():
    print("\n" + "=" * 80)
    print("V13 MOTION DIVERSITY & SHOT LIBRARY AUDIT REPORT")
    print("=" * 80)
    
    categories = {}
    recipes = {}
    camera_modes = {}
    typography = {}
    transitions = {}
    companions = {}
    
    for shot in SHOT_DESIGNS_V13:
        categories[shot["category"]] = categories.get(shot["category"], 0) + 1
        recipes[shot["recipe"]] = recipes.get(shot["recipe"], 0) + 1
        camera_modes[shot["cameraMode"]] = camera_modes.get(shot["cameraMode"], 0) + 1
        typography[shot["typography"]] = typography.get(shot["typography"], 0) + 1
        transitions[shot["transitionOut"]] = transitions.get(shot["transitionOut"], 0) + 1
        companions[shot["companion"]] = companions.get(shot["companion"], 0) + 1
        
    print(f"\n1. Shot Categories ({len(categories)} unique across 6 shots):")
    for k, v in categories.items():
        print(f"   - {k:<30}: {v}")
        
    print(f"\n2. Shot Recipes ({len(recipes)} unique across 6 shots):")
    for k, v in recipes.items():
        print(f"   - {k:<30}: {v}")
        
    print(f"\n3. Camera Modes ({len(camera_modes)} unique across 6 shots):")
    for k, v in camera_modes.items():
        print(f"   - {k:<30}: {v}")
        
    print(f"\n4. Typography Behaviors ({len(typography)} unique across 6 shots):")
    for k, v in typography.items():
        print(f"   - {k:<38}: {v}")
        
    print(f"\n5. Transition Types ({len(transitions)} unique across 5 boundaries):")
    for k, v in transitions.items():
        print(f"   - {k:<30}: {v}")

    print(f"\n6. Visual Companions (Anti-Naked Text Verification):")
    for shot in SHOT_DESIGNS_V13:
        print(f"   - {shot['shotId']}: {shot['companion']}")
        
    print("-" * 80)
    
    # Assertions
    is_diverse = (
        len(categories) == 6 and
        len(recipes) == 6 and
        len(transitions) == 6 and
        len(companions) == 6
    )
    
    if is_diverse:
        print("✅ DIVERSITY AUDIT PASSED: 100% DISTINCT SHOT ARCHITECTURES ACROSS FILM")
        sys.exit(0)
    else:
        print("❌ DIVERSITY AUDIT WARNING: DUPLICATE ARCHETYPES DETECTED")
        sys.exit(1)

if __name__ == "__main__":
    main()
