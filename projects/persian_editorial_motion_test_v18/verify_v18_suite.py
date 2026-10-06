#!/usr/bin/env python3
"""
UNIFIED V18 AUTOMATED QA VERIFICATION SUITE
Runs all critical verification gates for V18:
1. verify_v18_pronunciation_lock.py
2. verify_v18_recipes_catalog.py
3. verify_v18_anti_cliche_guard.py
4. verify_v18_content_authority.py
5. verify_v18_audio_loudness_and_sync.py
6. verify_v18_artifacts.py
"""

import sys
import subprocess
from pathlib import Path

# Ensure UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8')

ROOT = Path(__file__).resolve().parent
PYTHON = sys.executable

TESTS = [
    ("Critical Pronunciation Lock Gate («بقیه‌الله»)", ROOT / "verify_v18_pronunciation_lock.py"),
    ("Atomic Recipes Catalog Integrity", ROOT / "verify_v18_recipes_catalog.py"),
    ("Anti-Cliché Craft & Materiality Guard", ROOT / "verify_v18_anti_cliche_guard.py"),
    ("Content Authority & Source Provenance", ROOT / "verify_v18_content_authority.py"),
    ("Master Audio Loudness & Acoustic Sync", ROOT / "verify_v18_audio_loudness_and_sync.py"),
    ("Render Artifacts & Visual Proof Validation", ROOT / "verify_v18_artifacts.py"),
]

def main():
    print("\n" + "#" * 80)
    print("RUNNING COMPLETE V18 QUALITY ASSURANCE SUITE")
    print("#" * 80 + "\n")

    passed_count = 0
    total_count = len(TESTS)

    for name, script_path in TESTS:
        print(f"▶ Running: {name} ({script_path.name})...")
        res = subprocess.run([PYTHON, str(script_path)], capture_output=True, text=True, encoding='utf-8')
        if res.returncode == 0:
            print(f"  ✅ PASS: {name}")
            passed_count += 1
        else:
            print(f"  ❌ FAIL: {name}")
            print(res.stdout)
            print(res.stderr)
            print("\n❌ SUITE TERMINATED DUE TO FAILURE.\n")
            sys.exit(1)

    print("\n" + "=" * 80)
    print(f"🎉 ALL V18 QUALITY GATES SATISFIED: {passed_count}/{total_count} PASSED (100%)")
    print("   The V18 Reference-Integrated Motion System is fully verified and production-ready.")
    print("=" * 80 + "\n")

if __name__ == '__main__':
    main()
