#!/usr/bin/env python3
"""
VERIFY MOTION DIVERSITY V12
Audits the distribution of Motion Recipes, Typography Behaviors, and Transition Types
to prevent motion monoculture and ensure variety through appropriateness.
"""

import sys
from pathlib import Path

# Ensure UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8')

# V12 Architectural Catalog
SHOT_DESIGNS = [
    {
        "shotId": "Shot 01",
        "archetype": "Hook & Narrative Ignition",
        "recipe": "TypographySlamRecipe + MarkerUnderline",
        "typography": "KineticSlam + MarkerUnderline",
        "companion": "Architectural Brackets",
        "transitionOut": "KineticUnderlineHandoff",
    },
    {
        "shotId": "Shot 02",
        "archetype": "Legal Authority & Decree",
        "recipe": "ObjectHandoff + ImpactAndRipple",
        "typography": "MaskedReveal",
        "companion": "Embossed Seal & Medallion",
        "transitionOut": "SymmetricFission",
    },
    {
        "shotId": "Shot 03",
        "archetype": "Structural Diagram & Sequential Milestone",
        "recipe": "SplitAndConverge + SequentialMilestone",
        "typography": "NumericMeterReveal",
        "companion": "Tripartite Gauge / Stamp / Hexagon Nodes",
        "transitionOut": "DatumRuleAxisCollapse",
    },
    {
        "shotId": "Shot 04",
        "archetype": "Chronological Progression & Temporal Cutoff",
        "recipe": "AxisCollapse + FoldAndUnfold",
        "typography": "DirectionalSlide",
        "companion": "12-Month Chronological Ruler Gate",
        "transitionOut": "PlanarStageFold",
    },
    {
        "shotId": "Shot 05",
        "archetype": "Quantitative Comparison & Crescendo Pedestals",
        "recipe": "CounterBalancedSweep + KineticType",
        "typography": "AscendingNumericImpact",
        "companion": "Ascending Plinths & Level Indicators",
        "transitionOut": "GravitationalSingularity",
    },
    {
        "shotId": "Shot 06",
        "archetype": "Climax & Institutional Authority",
        "recipe": "DimensionalPortal + ElasticSnapping",
        "typography": "HeraldicTitleSnap",
        "companion": "Heraldic Laurel Wreath & Concentric Detonation",
        "transitionOut": "MasterResolveFreeze",
    },
]

def main():
    print("\n" + "=" * 80)
    print("V12 MOTION DIVERSITY & VOCABULARY AUDIT REPORT")
    print("=" * 80)
    
    recipes = {}
    archetypes = {}
    typography = {}
    transitions = {}
    companions = {}
    
    for shot in SHOT_DESIGNS:
        recipes[shot["recipe"]] = recipes.get(shot["recipe"], 0) + 1
        archetypes[shot["archetype"]] = archetypes.get(shot["archetype"], 0) + 1
        typography[shot["typography"]] = typography.get(shot["typography"], 0) + 1
        transitions[shot["transitionOut"]] = transitions.get(shot["transitionOut"], 0) + 1
        companions[shot["companion"]] = companions.get(shot["companion"], 0) + 1
        
    print(f"\n1. Shot Archetypes ({len(archetypes)} unique across 6 shots):")
    for k, v in archetypes.items():
        print(f"   - {k:<45}: {v}")
        
    print(f"\n2. Level 2 Motion Recipes ({len(recipes)} unique across 6 shots):")
    for k, v in recipes.items():
        print(f"   - {k:<45}: {v}")
        
    print(f"\n3. Typography Behaviors ({len(typography)} unique across 6 shots):")
    for k, v in typography.items():
        print(f"   - {k:<45}: {v}")
        
    print(f"\n4. Transition Types ({len(transitions)} unique across 5 boundaries):")
    for k, v in transitions.items():
        print(f"   - {k:<45}: {v}")

    print(f"\n5. Visual Companions (Anti-Naked Text):")
    for k, v in companions.items():
        print(f"   - {k:<45}: {v}")

    # Monoculture audit
    max_recipe_count = max(recipes.values())
    max_transition_count = max(transitions.values())
    
    print("\n" + "-" * 80)
    if max_recipe_count > 2 or max_transition_count > 2:
        print("⚠️ WARN: Motion monoculture detected (a single pattern repeats > 2 times).")
        return 1
    else:
        print("✅ PASS: High Motion Diversity achieved! Zero repetitive monoculture.")
        print("=" * 80 + "\n")
        return 0

if __name__ == "__main__":
    sys.exit(main())
