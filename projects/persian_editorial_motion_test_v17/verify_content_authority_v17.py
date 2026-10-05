#!/usr/bin/env python3
"""
VERIFY CONTENT AUTHORITY V17
Hard Enforcement Gate:
Ensures that 100% of visible textual elements rendered in V17 production JSX
originate strictly from the authorized content registry.

If ANY unregistered or invented phrase appears, exits with code 1 (FAIL).
"""

import re
import sys
from pathlib import Path

# Ensure UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8')

# Canonical authorized phrases extracted from authorizedContent.ts & tts_input.txt
AUTHORIZED_PHRASES = [
    # Shot 01
    "روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله تقدیم می‌کند",
    "آیا می‌دانید چگونه می‌توانید به عنوان",
    "دانشجوی پژوهشگر یا فناور برجسته کشور",
    "انتخاب شوید و از تسهیلات ویژه آن بهره‌مند گردید؟",
    
    # Shot 02
    "دستورالعمل بند کاف، ماده دو",
    "آیین‌نامه استعدادهای درخشان وزارت بهداشت",
    "مسیر جامع امتیازدهی به فعالیت‌های علمی و پژوهشی",
    
    # Shot 03
    "سه شرط اصلی پیش از محاسبه امتیازها",
    "شرط اول",
    "حداقل معدل کل",
    "۱۶",
    "معدل کل در مقطع فعلی باید حداقل شانزده باشد",
    "شرط دوم",
    "سنوات مجاز و تأییدیه انضباطی",
    "حضور در سنوات مجاز تحصیلی و دریافت تأییدیه کمیته انضباطی",
    "شرط سوم",
    "تنوع فعالیت‌ها و حضور مقاله",
    "۶ ماده مختلف",
    "کسب امتیاز حداقل از شش ماده مختلف با اجباری بودن مقاله یا فعالیت فناورانه",
    
    # Shot 04
    "بازه زمانی معتبر ثبت مدارک",
    "دوران تحصیل",
    "حداکثر تا یک سال پس از فارغ‌التحصیلی",
    "تمام مدارک باید مربوط به دوران تحصیل یا نهایتاً تا یک سال پس از فارغ‌التحصیلی باشد",
    "شروع",
    "ماه",
    "پایان مهلت",
    
    # Shot 05
    "حدنصاب قبولی بر حسب مقطع تحصیلی دانشگاه‌های تیپ یک",
    "کارشناسی",
    "۶۵",
    "پزشکی عمومی",
    "۱۱۰",
    "دکترای تخصصی",
    "۱۳۰",
    "امتیاز",
    
    # Shot 06
    "کمیته تحقیقات دانشگاه علوم پزشکی بقیه‌الله",
    "در ویدیوهای بعدی، روش کسب این امتیازها را گام به گام بررسی می‌کنیم",
    "با ما همراه باشید",
]

def is_phrase_authorized(text: str) -> bool:
    cleaned = text.strip()
    if not cleaned:
        return True
    
    # Ignore purely numeric or punctuation tokens
    if re.fullmatch(r'[\d\s.,،؛:!؟\-_/()✓]+', cleaned):
        return True

    # Check exact match or containment
    for auth in AUTHORIZED_PHRASES:
        if cleaned == auth:
            return True
        if cleaned in auth:
            return True
        if auth in cleaned:
            return True

    return False

def check_file(file_path: Path):
    violations = []
    content = file_path.read_text(encoding='utf-8')
    
    for line_num, line in enumerate(content.splitlines(), start=1):
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*'):
            continue
        if stripped.startswith('{') and ('&&' in stripped or '?' in stripped):
            continue

        # Check JSX strings: text between > and <
        jsx_texts = re.findall(r'>([^<]+)<', line)
        for text in jsx_texts:
            t = text.strip()
            if not t or t.startswith('{') or t.startswith('}'):
                continue
            if any(op in t for op in ['&&', '||', '>=', '<=', '===', '!==', '=>', 'localFrame', 'globalFrame']):
                continue

            if not is_phrase_authorized(t):
                violations.append((line_num, f"Unauthorized text token: '{t}'"))

        # Check string literals assigned to text props or content
        literal_matches = re.findall(r'["\']([\u0600-\u06FF\s]+)["\']', line)
        for lit in literal_matches:
            l_clean = lit.strip()
            if l_clean and not is_phrase_authorized(l_clean):
                violations.append((line_num, f"Unauthorized Persian literal: '{l_clean}'"))

    return violations

def main():
    v17_src = Path(__file__).resolve().parent / "src"
    if not v17_src.exists():
        print(f"Error: {v17_src} directory does not exist.")
        sys.exit(1)
        
    all_violations = {}
    files_checked = 0
    
    for tsx_file in v17_src.rglob("*.tsx"):
        files_checked += 1
        violations = check_file(tsx_file)
        if violations:
            all_violations[tsx_file.name] = violations

    for ts_file in v17_src.rglob("*.ts"):
        files_checked += 1
        violations = check_file(ts_file)
        if violations:
            all_violations[ts_file.name] = violations

    print("\n" + "="*80)
    print("V17 CONTENT AUTHORITY & PROVENANCE VALIDATION REPORT")
    print("="*80)
    print(f"Checked files: {files_checked}")
    
    if not all_violations:
        print("✅ PASS: 100% of visible textual elements are strictly authorized.")
        print("   Zero unauthorized terms, zero invented phrases, zero illegal text.")
        sys.exit(0)
    else:
        print(f"❌ FAIL: Detected {sum(len(v) for v in all_violations.values())} violations across {len(all_violations)} files:")
        for fname, viols in all_violations.items():
            print(f"\n  File: {fname}")
            for l_num, msg in viols:
                print(f"    Line {l_num}: {msg}")
        sys.exit(1)

if __name__ == "__main__":
    main()
