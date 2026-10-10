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
