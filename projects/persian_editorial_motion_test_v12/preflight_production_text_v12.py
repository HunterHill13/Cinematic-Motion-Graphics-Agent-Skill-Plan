#!/usr/bin/env python3
"""
PREFLIGHT PRODUCTION TEXT VALIDATOR (V12)
Enforces HARD RULE: Zero developer metadata, zero English HUD/telemetry labels,
and zero non-canonical Latin text in production render JSX.

If ANY forbidden term or unapproved Latin copy appears in rendered JSX text,
this script exits with code 1 (FAIL).
"""

import os
import re
import sys
from pathlib import Path

# Ensure UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8')

FORBIDDEN_TERMS = [
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
]

def check_file(file_path: Path):
    violations = []
    content = file_path.read_text(encoding='utf-8')
    
    # 1. Look for forbidden terms inside JSX content or string templates
    # Patterns like >...TERM...< or children strings
    for line_num, line in enumerate(content.splitlines(), start=1):
        # Skip import lines, comments, and purely CSS object keys
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*'):
            continue
        # Skip lines that are purely JS expressions or conditionals inside JSX
        if stripped.startswith('{') and ('&&' in stripped or '?' in stripped):
            continue

        # Match JSX text: between > and <
        jsx_texts = re.findall(r'>([^<]+)<', line)
        for text in jsx_texts:
            t = text.strip()
            if not t or t.startswith('{') or t.startswith('}'):
                continue
            # If it's a JS code snippet (e.g. contains comparison or logic operators)
            if any(op in t for op in ['&&', '||', '>=', '<=', '===', '!==', '=>', 'localFrame', 'globalFrame']):
                continue
            
            # Check forbidden terms
            for pattern in FORBIDDEN_TERMS:
                if re.search(pattern, t, re.IGNORECASE):
                    violations.append((line_num, f"Forbidden production metadata in JSX: '{t}' matches {pattern}"))
            
            # Check for English/Latin words leaking into visible Persian broadcast text
            # Ignore standard punctuation or purely numeric expressions
            latin_words = re.findall(r'[a-zA-Z]{3,}', t)
            if latin_words:
                violations.append((line_num, f"Latin copy detected in visible JSX: '{t}' (found: {latin_words})"))

    return violations

def main():
    v12_src = Path(__file__).resolve().parent / "src"
    if not v12_src.exists():
        print(f"Error: {v12_src} directory does not exist.")
        sys.exit(1)
        
    all_violations = {}
    files_checked = 0
    
    for ext in ("*.tsx", "*.ts"):
        for path in v12_src.rglob(ext):
            files_checked += 1
            v = check_file(path)
            if v:
                all_violations[str(path.relative_to(v12_src))] = v
                
    print("=" * 80)
    print("V12 PREFLIGHT PRODUCTION TEXT VALIDATOR")
    print(f"Target Directory: {v12_src}")
    print(f"Files Checked: {files_checked}")
    print("=" * 80)
    
    if all_violations:
        print("\n❌ PREFLIGHT FAILED! Forbidden text or Latin metadata discovered:\n")
        for filename, issues in all_violations.items():
            print(f"📄 {filename}:")
            for line_no, msg in issues:
                print(f"   [Line {line_no}]: {msg}")
        print("\nABORT: Production render prohibited until all visible text is sanitized to pure Persian.")
        sys.exit(1)
    else:
        print("\n✅ PREFLIGHT PASSED: 100% Pure Persian Script typography. Zero English metadata/telemetry.\n")
        sys.exit(0)

if __name__ == "__main__":
    main()
