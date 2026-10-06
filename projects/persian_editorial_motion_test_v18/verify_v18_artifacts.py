#!/usr/bin/env python3
"""
VERIFY V18 RENDER ARTIFACTS
Validates that all proof-of-concept benchmarks, hero gate videos, and shot stills
exist on disk with non-zero byte size.
"""

import sys
from pathlib import Path

# Ensure UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8')

ROOT = Path(__file__).resolve().parent.parent.parent
RENDERS_DIR = ROOT / "renders" / "v18_benchmarks"

REQUIRED_ARTIFACTS = [
    ("b1_slam.png", 20000, "Benchmark 1: Kinetic Type Slam Still"),
    ("b2_ribbon.png", 20000, "Benchmark 2: Dot To Line & Ribbon Growth Still"),
    ("b3_chart.png", 20000, "Benchmark 3: Shape Morph To Chart Bar Still"),
    ("b4_tunnel.png", 20000, "Benchmark 4: Ring Tunnel Depth Still"),
    ("b5_split.png", 20000, "Benchmark 5: Cliche vs Cinematic Split Still"),
    ("proof_of_quality_v18.mp4", 500000, "Hero Quality Proof Video (540 frames)"),
    ("shot01_f234.png", 20000, "Persian Editorial Shot 01 (Hero Keyword Strike Still)"),
    ("shot02_f450.png", 20000, "Persian Editorial Shot 02 (Statute Decree Monolith Still)"),
    ("shot03_f855.png", 20000, "Persian Editorial Shot 03 (GPA 16 Milestone Still)"),
    ("shot04_f1575.png", 20000, "Persian Editorial Shot 04 (Cutoff Barrier Collision Still)"),
    ("shot05_f2100.png", 20000, "Persian Editorial Shot 05 (Score Pedestals Still)"),
    ("shot06_f2200.png", 20000, "Persian Editorial Shot 06 (Heraldic Crest Resolve Still)"),
]

def check_step(name: str, passed: bool, detail: str = ""):
    status = "PASS" if passed else "FAIL"
    print(f"  [{status}] {name:<50} : {detail}")
    if not passed:
        print(f"\n❌ ARTIFACT FAILURE: {name} - {detail}")
        sys.exit(1)

def main():
    print("\n" + "=" * 80)
    print("V18 RENDER ARTIFACTS & VISUAL ASSETS VERIFICATION")
    print("=" * 80)

    if not RENDERS_DIR.is_dir():
        check_step("Renders Directory Exists", False, f"Missing {RENDERS_DIR}")

    for filename, min_bytes, desc in REQUIRED_ARTIFACTS:
        filepath = RENDERS_DIR / filename
        exists = filepath.is_file()
        size = filepath.stat().st_size if exists else 0
        valid = exists and size >= min_bytes
        check_step(desc, valid, f"{size / 1024:.1f} KB ({filename})")

    print("-" * 80)
    print("✅ V18 RENDER ARTIFACT CHECK: 100% PASS")
    print(f"   All {len(REQUIRED_ARTIFACTS)} benchmark renders and shot stills verified on disk.")
    print("=" * 80 + "\n")

if __name__ == '__main__':
    main()
