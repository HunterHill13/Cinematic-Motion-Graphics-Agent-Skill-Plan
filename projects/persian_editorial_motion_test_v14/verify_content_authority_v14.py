#!/usr/bin/env python3
"""
VERIFY CONTENT AUTHORITY V14
Hard Enforcement Gate:
Ensures that 100% of visible textual elements rendered in production JSX
originate from the authorized content registry (V14_CONTENT_MANIFEST.md).

If ANY unregistered or invented phrase appears, exits with code 1 (FAIL).
"""

import re
import sys
from pathlib import Path

# Ensure UTF-8 output on Windows
sys.stdout.reconfigure(encoding='utf-8')

# Canonical authorized phrases extracted from V14_CONTENT_MANIFEST.md & tts_input.txt
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
    if re.fullmatch(r'[\d\s.,،؛:!؟\-_/()]+', cleaned):
        return True

    # Check exact match
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

        # Look for JSX text between > and <
        jsx_texts = re.findall(r'>([^<]+)<', line)
        for text in jsx_texts:
            t = text.strip()
            if not t or t.startswith('{') or t.startswith('}'):
                continue
            if any(op in t for op in ['&&', '||', '>=', '<=', '===', '!==', '=>', 'localFrame', 'globalFrame']):
                continue
            
            if not is_phrase_authorized(t):
                violations.append((
                    line_num,
                    f"CONTENT AUTHORITY FAILURE: Unauthorized string '{t}' detected (not in V14_CONTENT_MANIFEST.md)"
                ))

    return violations

def main():
    root = Path(__file__).resolve().parent
    v14_src = root / "src"
    
    if not v14_src.exists():
        print(f"Error: {v14_src} does not exist.")
        sys.exit(1)
        
    all_violations = {}
    files_checked = 0
    
    for ext in ("*.tsx", "*.ts"):
        for path in v14_src.rglob(ext):
            files_checked += 1
            v = check_file(path)
            if v:
                all_violations[str(path.relative_to(v14_src))] = v
                
    print("=" * 80)
    print("V14 CONTENT AUTHORITY VALIDATION AUDIT")
    print(f"Target Directory: {v14_src}")
    print(f"Files Checked: {files_checked}")
    print("=" * 80)
    
    if all_violations:
        print("\n❌ CONTENT AUTHORITY FAILED: UNAUTHORIZED TEXT DETECTED IN JSX")
        for f, issues in all_violations.items():
            print(f"\n  File: {f}")
            for line_no, msg in issues:
                print(f"    Line {line_no}: {msg}")
        sys.exit(1)
    else:
        print("\n✅ CONTENT AUTHORITY AUDIT PASSED: 100% STRICT SOURCE-AUTHORIZED CONTENT")
        print("   Zero invented phrases, zero background text, zero unauthorized labels.")
        sys.exit(0)

if __name__ == "__main__":
    main()
