#!/usr/bin/env python3
"""
ANTI-SLIDESHOW DATA-FLOW AST AUDIT GATE (PHASE 2 UPGRADE)

Replaces naive regex matching with Data-Flow Aware AST Structural Analysis:
- Flags opacity-only springs and interpolations
- Flags camera camouflage (camera moving with static objects)
- Flags entrance-hold-exit defect (missing middle 60% transformation)
- Flags ambient / micro-jitter fake motion (delta <= 2px or scale <= 0.03)
- Flags isolated <Sequence> unmounting slideshow patterns
- Enforces: VALID MOTION = MEANINGFUL + SPATIAL + CAUSALLY TRIGGERED
"""

import sys
import os
import subprocess
import json
from pathlib import Path

def audit_composition_file(file_path: str):
    path = Path(file_path).resolve()
    if not path.exists():
        return False, [f"File not found: {file_path}"]

    if not str(file_path).endswith('.tsx') and not str(file_path).endswith('.ts'):
        # For non-TSX files (e.g. shotbook text), verify keywords
        content = path.read_text(encoding='utf-8')
        if "PRIMARY VISUAL JOB" not in content and "TransformationContract" not in content:
            return False, ["MISSING_TRANSFORMATION_PLAN: Shotbook does not define transformation contracts."]
        return True, []

    repo_root = Path(__file__).resolve().parent.parent.parent
    runner_script = repo_root / "src" / "motion" / "validation" / "runAstValidator.ts"

    try:
        proc = subprocess.run(
            ["npx.cmd", "tsx", str(runner_script), str(path)],
            cwd=str(repo_root),
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='replace'
        )
        
        output = (proc.stdout or "") + (proc.stderr or "")
        if "__JSON_REPORT_START__" in output:
            json_str = output.split("__JSON_REPORT_START__")[1].split("__JSON_REPORT_END__")[0]
            report = json.loads(json_str)
            if report.get("passed", False):
                return True, []
            else:
                violations = [f"[{v['code']}]: {v['message']}" for v in report.get("violations", [])]
                return False, violations
        else:
            return False, [f"AST Validator execution error: {proc.stderr or proc.stdout}"]
    except Exception as e:
        return False, [f"Execution exception in AST validator: {str(e)}"]

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
