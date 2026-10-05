#!/usr/bin/env python3
"""
VERIFY PRONUNCIATION & DISPLAY ORTHOGRAPHY V15
Enforces hard separation between displayText (pure Persian typography) and ttsText (phonetized).

Invariants:
1. Visible production JSX / display strings must contain ZERO Arabic Harakat / diacritics
   (Unicode range U+064B to U+065F: fatha, damma, kasra, fathatan, dammatan, kasratan, sukun, shaddah).
2. Phonetization is strictly permitted ONLY inside src/audio/pronunciationDictionary.ts.
"""

import sys
import re
from pathlib import Path

# Ensure UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8')

# Regex for Arabic Harakat / diacritics
HARAKAT_REGEX = re.compile(r'[\u064B-\u065F]')

def check_file(file_path: Path):
    violations = []
    content = file_path.read_text(encoding='utf-8')
    
    for line_num, line in enumerate(content.splitlines(), start=1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*'):
            continue
            
        # Match JSX text content
        jsx_texts = re.findall(r'>([^<]+)<', line)
        for t in jsx_texts:
            t_clean = t.strip()
            if not t_clean or t_clean.startswith('{') or t_clean.startswith('}'):
                continue
            if HARAKAT_REGEX.search(t_clean):
                violations.append((line_num, f"Forbidden Arabic diacritic in visible JSX text: '{t_clean}'"))
                
        # Match Persian string literals
        literals = re.findall(r'["\']([\u0600-\u06FF\s]+)["\']', line)
        for lit in literals:
            l_clean = lit.strip()
            if l_clean and HARAKAT_REGEX.search(l_clean):
                # Check if this file is explicitly allowed (e.g. dictionary)
                if "pronunciationDictionary" not in file_path.name:
                    violations.append((line_num, f"Forbidden Arabic diacritic in literal string: '{l_clean}'"))

    return violations

def main():
    root = Path(__file__).resolve().parent
    v15_src = root / "src"
    
    if not v15_src.exists():
        print(f"Error: {v15_src} does not exist.")
        sys.exit(1)
        
    all_violations = {}
    files_checked = 0
    
    for path in v15_src.rglob("*.tsx"):
        files_checked += 1
        viols = check_file(path)
        if viols:
            all_violations[path.name] = viols
            
    for path in v15_src.rglob("*.ts"):
        files_checked += 1
        viols = check_file(path)
        if viols:
            all_violations[path.name] = viols

    print("\n" + "=" * 85)
    print("V15 PRONUNCIATION SEPARATION & DISPLAY ORTHOGRAPHY AUDIT REPORT")
    print("=" * 85)
    print(f"Checked files: {files_checked}")
    
    if not all_violations:
        print("✅ PASS: 100% of visible typography is pristine standard Persian orthography.")
        print("   Zero Arabic Harakat/diacritics leaked into visible screen rendering.")
        sys.exit(0)
    else:
        print(f"❌ FAIL: Detected {sum(len(v) for v in all_violations.values())} diacritic violations:")
        for fname, viols in all_violations.items():
            print(f"\n  File: {fname}")
            for l_num, msg in viols:
                print(f"    Line {l_num}: {msg}")
        sys.exit(1)

if __name__ == "__main__":
    main()
