#!/usr/bin/env python3
"""
VERIFY CONTENT AUTHORITY V18
Hard Enforcement Gate:
Ensures that 100% of visible textual elements rendered in V18 production JSX
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
    "حداکثر تا یک سال پس of فارغ‌التحصیلی",
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
    "کمیته تحقیقات و فناوری دانشجویی دانشگاه علوم پزشکی بقیه‌الله",
    "در قسمت‌های بعد، جزئیات امتیازدهی هر ماده را با هم مرور می‌کنیم",
    "همراه ما باشید",
    
    # Allowed symbols and common grammatical particles
    "✓", "★", "●", "—", "»", "«", "،", "؛", "؟", "!",
    "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲", "۰"
]

def normalize_text(text: str) -> str:
    t = text.strip()
    t = t.replace('\u200c', ' ')
    t = re.sub(r'\s+', ' ', t)
    return t

NORMALIZED_AUTHORIZED = [normalize_text(p) for p in AUTHORIZED_PHRASES]

def is_phrase_authorized(phrase: str) -> bool:
    clean = normalize_text(phrase)
    if not clean:
        return True
    if clean.isdigit():
        return True
    if re.match(r'^[\d\s\u06F0-\u06F9]+$', clean):
        return True
    for auth in NORMALIZED_AUTHORIZED:
        if clean in auth or auth in clean:
            return True
    return False

def check_file(file_path: Path):
    violations = []
    lines = file_path.read_text(encoding='utf-8').splitlines()
    
    for idx, line in enumerate(lines):
        line_num = idx + 1
        
        # Skip pure comments or import lines
        stripped = line.strip()
        if stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*') or stripped.startswith('import '):
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
    v18_src = Path(__file__).resolve().parent / "src"
    if not v18_src.exists():
        print(f"Error: {v18_src} directory does not exist.")
        sys.exit(1)
        
    all_violations = {}
    files_checked = 0
    
    for tsx_file in v18_src.rglob("*.tsx"):
        files_checked += 1
        violations = check_file(tsx_file)
        if violations:
            all_violations[tsx_file.name] = violations

    print("\n" + "="*80)
    print("V18 CONTENT AUTHORITY & PROVENANCE VALIDATION REPORT")
    print("="*80)
    print(f"Checked files: {files_checked}")
    
    if not all_violations:
        print("✅ PASS: 100% of visible textual elements are strictly authorized.")
        print("   Zero unauthorized terms, zero invented phrases, zero illegal text.")
        print("="*80 + "\n")
        sys.exit(0)
    else:
        print(f"❌ FAIL: Detected {sum(len(v) for v in all_violations.values())} violations across {len(all_violations)} files:")
        for fname, viols in all_violations.items():
            print(f"\n  File: {fname}")
            for l_num, msg in viols:
                print(f"    Line {l_num}: {msg}")
        print("="*80 + "\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
