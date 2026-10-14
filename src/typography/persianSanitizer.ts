/**
 * PERSIAN SCRIPT DUAL-REPRESENTATION SANITIZER
 * 
 * Separates phonetic pronunciation strings (used for Google Gemini TTS)
 * from visual typography display strings.
 * 
 * Functions:
 * 1. Strips all Arabic/Persian diacritics (harakat/tashdid: Fatha, Damma, Kasra, Sukun, Tanwin, Shadda).
 * 2. Normalizes institutional zero-width non-joiners (e.g. «کمیته‌ی», «آیین‌نامه‌ی»).
 * 3. Enforces clean institutional orthography without altering the phonetic spoken script.
 */

export function sanitizeForDisplay(text: string): string {
  if (!text) return '';

  return text
    // Strip all Arabic/Persian diacritical marks (harakat, tashdid, sukun, tanwin)
    .replace(/[\u064B-\u0652\u0670\u0653\u0654\u0655]/g, '')
    // Institutional ZWNJ normalizations
    .replace(/کُمیتهیِ|کمیتهیِ/g, 'کمیته‌ی')
    .replace(/مادّهیِ|مادهیِ/g, 'ماده‌ی')
    .replace(/آییننامهیِ|آیین‌نامهیِ/g, 'آیین‌نامه‌ی')
    .replace(/بَرجَستهیِ|برجستهیِ/g, 'برجسته‌ی')
    .replace(/تأییدیهیِ|تاییدیهیِ/g, 'تأییدیه‌ی')
    .replace(/مُحاسِبِهیِ|محاسبهیِ/g, 'محاسبه‌ی')
    .replace(/دانشگاهِ/g, 'دانشگاه')
    .replace(/عُلومِ/g, 'علوم')
    .replace(/پِزِشکیِ/g, 'پزشکی')
    .replace(/و\s+جود/g, 'وجود')
    .replace(/گامبِهگام/g, 'گام‌به‌گام')
    .trim();
}

/**
 * Splits Persian headlines into natural semantic chunks,
 * prioritizing punctuation (، ؛ : -) and conjunctions,
 * preventing mid-ezafe arbitrary word-count chops.
 */
export function splitPersianPhrasesLinguistically(text: string): string[] {
  const sanitized = sanitizeForDisplay(text);
  if (!sanitized) return [];

  // 1. If explicit punctuation exists (comma, semicolon, colon, dash)
  if (/[،؛:\-]/.test(sanitized)) {
    const parts = sanitized.split(/[،؛:\-]/).map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 2) return parts;
  }

  const words = sanitized.split(/\s+/).filter(Boolean);
  if (words.length <= 3) {
    return [words.join(' ')];
  }

  // 2. Look for conjunctions / prepositions in the middle third (words 1 to words.length - 2)
  const midStart = Math.max(1, Math.floor(words.length * 0.35));
  const midEnd = Math.min(words.length - 1, Math.ceil(words.length * 0.65));

  for (let i = midStart; i <= midEnd; i++) {
    const w = words[i];
    if (w === 'و' || w === 'یا' || w === 'برای' || w === 'در' || w === 'با' || w === 'که') {
      return [words.slice(0, i).join(' '), words.slice(i).join(' ')];
    }
  }

  // 3. Fallback: split at balanced midpoint
  const midPoint = Math.ceil(words.length / 2);
  return [words.slice(0, midPoint).join(' '), words.slice(midPoint).join(' ')].filter(Boolean);
}
