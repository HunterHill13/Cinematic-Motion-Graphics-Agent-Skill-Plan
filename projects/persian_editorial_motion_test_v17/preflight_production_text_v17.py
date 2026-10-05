#!/usr/bin/env python3
"""
V17 PREFLIGHT PRODUCTION TEXT VALIDATOR
Enforces Hard Invariants:
1. Zero developer metadata, zero English HUD/telemetry labels in visible JSX.
2. Zero invented phrases or unauthorized institutions.
3. Zero Latin copy leaking into visible broadcast text.
4. Exits with code 1 (FAIL) if any forbidden pattern is detected.
"""

import os
import re
import sys
from pathlib import Path

# Ensure UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8')

FORBIDDEN_PATTERNS = [
    # Developer HUD & Telemetry
    r'\bActor\b',
    r'\bRecipe\b',
    r'\bMotion\b',
    r'\bShot\b',
    r'\bScene\b',
    r'\bFrame\b',
    r'\bSync\b',
    r'\bDebug\b',
    r'\bSystem\b',
    r'\bSkill\b',
    r'\bReference\b',
    r'\bV11\b',
    r'\bV12\b',
    r'\bV13\b',
    r'\bV14\b',
    r'\bV15\b',
    r'\bV16\b',
    r'\bV17\b',
    r'\bHUD\b',
    r'\bTelemetry\b',
    r'\bSEC_\d+\b',
    r'\bCRITERION\b',
    r'\bTIER\b',
    r'\bSTATUS\b',
    r'\bCONTRACT\b',
    r'\bREGISTRATION\b',
    r'\bACCREDITATION\b',
    r'\bCODE\b',
    r'\bPROTOCOL\b',
    r'\bSTEADY_DATUM\b',
    r'\bT\d+_LAUNCH\b',
    r'\bFISSION_ACTIVE\b',
    r'\bMONOLITH_LOCKED\b',

    # Invented / Non-Source Content (Banned in V14, V15, V16 & V17)
    r'ستاد کل نیروهای مسلح',
    r'سربازی نخبگان',
    r'پروژه جایگزین خدمت',
    r'بنیاد ملی نخبگان',
    r'ایران اسلامی',
]

def check_file(file_path: Path):
    violations = []
    content = file_path.read_text(encoding='utf-8')
    
    for line_num, line in enumerate(content.splitlines(), start=1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*'):
            continue
        if stripped.startswith('{') and ('&&' in stripped or '?' in stripped):
            continue

        # Match JSX text: between > and <
        jsx_texts = re.findall(r'>([^<]+)<', line)
        for text in jsx_texts:
            t = text.strip()
            if not t or t.startswith('{') or t.startswith('}'):
                continue
            if any(op in t for op in ['&&', '||', '>=', '<=', '===', '!==', '=>', 'localFrame', 'globalFrame']):
                continue
            
            # Check forbidden terms
            for pattern in FORBIDDEN_PATTERNS:
                if re.search(pattern, t, re.IGNORECASE):
                    violations.append((line_num, f"Forbidden production content in JSX: '{t}' matches {pattern}"))
            
            # Check for English/Latin copy leaking into visible broadcast text
            latin_words = re.findall(r'[a-zA-Z]{3,}', t)
            if latin_words:
                violations.append((line_num, f"Latin copy detected in visible JSX: '{t}' (found: {latin_words})"))

    return violations

def main():
    v17_src = Path(__file__).resolve().parent / "src"
    if not v17_src.exists():
        print(f"Error: {v17_src} directory does not exist.")
        sys.exit(1)
        
    all_violations = {}
    files_checked = 0
    
    for ext in ("*.tsx", "*.ts"):
        for path in v17_src.rglob(ext):
            files_checked += 1
            v = check_file(path)
            if v:
                all_violations[str(path.relative_to(v17_src))] = v
                
    print("=" * 80)
    print("V17 PREFLIGHT PRODUCTION TEXT VALIDATOR")
    print(f"Target Directory: {v17_src}")
    print(f"Files Checked: {files_checked}")
    print("=" * 80)
    
    if all_violations:
        print("\n❌ PREFLIGHT CHECK FAILED: FORBIDDEN CONTENT DETECTED IN JSX")
        for f, issues in all_violations.items():
            print(f"\n  File: {f}")
            for line_no, msg in issues:
                print(f"    Line {line_no}: {msg}")
        sys.exit(1)
    else:
        print("\n✅ PREFLIGHT CHECK PASSED: 100% PURE SOURCE-AUTHORIZED BROADCAST TEXT")
        print("   Zero English HUD labels, telemetry, or invented content detected.")
        sys.exit(0)

if __name__ == "__main__":
    main()
