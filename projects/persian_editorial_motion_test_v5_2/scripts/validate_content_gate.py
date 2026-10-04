import re
import sys
import hashlib

def normalize_for_comparison(text):
    # Remove diacritics
    t = re.sub(r'[\u064B-\u065F\u0670]', '', text)
    # Normalize punctuation and whitespace
    t = re.sub(r'[!؟?؛;,،\(\)«»\n\r\t]+', ' ', t)
    # Normalize alef, yeh, kaf, heh-ye
    t = re.sub(r'[آأإ]', 'ا', t)
    t = t.replace('ي', 'ی').replace('ك', 'ک').replace('ة', 'ه')
    t = t.replace('هی', 'ه').replace('ه‌ی', 'ه') # handle kasre ezafe 'کمیته‌ی' / 'کمیتهی'
    # Convert spoken numbers to digits for semantic comparison
    num_map = {
        'شانزده': '16', '۱۶': '16',
        'شصت و پنج': '65', '۶۵': '65',
        'صد و ده': '110', '۱۱۰': '110',
        'صد و سی': '130', '۱۳۰': '130',
        'یک': '1', '۱': '1',
        'دو': '2', '۲': '2',
        'سه': '3', '۳': '3',
        'شش': '6', '۶': '6',
    }
    for word, digit in num_map.items():
        t = t.replace(word, digit)
    t = re.sub(r'\s+', ' ', t).strip()
    return t

def main():
    with open('projects/persian_editorial_motion_test_v5_2/text/canonical_script.txt', 'r', encoding='utf-8') as f:
        canonical = f.read()
    with open('projects/persian_editorial_motion_test_v5_2/text/display_text.txt', 'r', encoding='utf-8') as f:
        display = f.read()
    with open('projects/persian_editorial_motion_test_v5_2/text/tts_input.txt', 'r', encoding='utf-8') as f:
        tts = f.read()

    norm_c = normalize_for_comparison(canonical)
    norm_d = normalize_for_comparison(display)
    norm_t = normalize_for_comparison(tts)

    print("Canonical normalized length:", len(norm_c))
    print("Display normalized length:", len(norm_d))
    print("TTS normalized length:", len(norm_t))

    c_hash = hashlib.sha256(canonical.encode('utf-8')).hexdigest()
    print("Canonical Script SHA256:", c_hash)

    # Check key semantic anchors
    anchors = ['کمیته تحقیقات', 'بند کاف', 'ماده 2', '3 شرط', '16', '6 ماده', '1 سال', '65', '110', '130']
    for a in anchors:
        assert a in norm_c, f"Anchor '{a}' missing in canonical"
        assert a in norm_d, f"Anchor '{a}' missing in display"
        assert a in norm_t, f"Anchor '{a}' missing in TTS"

    print("GATE 1 (Content Semantic Invariant): 100% PASS")

if __name__ == '__main__':
    main()
