/**
 * Modular Voice Architecture for V4.1 Production Pipeline.
 * Decouples synthesis from rendering and provides seamless human voice fallback.
 */

export interface VoiceTrack {
  shotId: string;
  audioPath: string; // Relative or staticFile path
  durationInSeconds: number;
  sampleRate: number;
  channels: number;
  displayText: string;
  phoneticText: string;
}

export interface VoiceProvider {
  readonly name: string;
  readonly isHuman: boolean;
  getTrack(shotId: string): VoiceTrack;
  listTracks(): VoiceTrack[];
}

export const SHOT_SCRIPTS: Record<
  string,
  { displayText: string; phoneticText: string; duration: number }
> = {
  shot_01: {
    displayText:
      'بر اساس دستورالعمل بند «کاف» ماده ۲ آیین‌نامه استعدادهای درخشان وزارت بهداشت، درمان و آموزش پزشکی، شرایط انتخاب دانشجوی پژوهشگر برجسته تعیین شده است.',
    phoneticText:
      'بَر اَساسِ دَستورُالعَمَلِ بَندِ کاف... مادّه‌یِ دو... آیین‌نامه‌یِ اِستِعدادهایِ دِرَخشانِ وِزارَتِ بِهداشت، دَرمان و آموزِشِ پِزِشکی... شَرایِطِ اِنتِخابِ دانش‌جویِ پَژوهِشگَرِ بَرجَستِه، تَعین شُده اَست.',
    duration: 6.0,
  },
  shot_02: {
    displayText:
      'دانشجویان متقاضی باید حداقل امتیاز لازم را در مقاطع مختلف کسب کنند: ۱۶ امتیاز در دکتری تخصصی بالینی، ۶۵ امتیاز در کارشناسی ارشد، ۱۱۰ امتیاز در دکتری تخصصی و ۱۳۰ امتیاز در پزشکی و دندانپزشکی.',
    phoneticText:
      'دانش‌جویانِ مُتِقاضی بایَد حَدِّاَقَلِ اِمتیازِ لازِم را دَر مَقاطِعِ مُختَلِف کَسب کُنَند: شانزَدَه اِمتیاز دَر دُکتِرایِ تَخَصُّصیِ بالینی، شَصت و پَنج اِمتیاز دَر کارشناسیِ اَرشَد، صَد و دَه اِمتیاز دَر دُکتِرایِ تَخَصُّصی، و صَد و سی اِمتیاز دَر رِشته‌هایِ پِزِشکی و دَندان‌پِزِشکی.',
    duration: 6.0,
  },
  shot_03: {
    displayText:
      'امتیازات نهایی از چهار محور اصلی شامل مقالات علمی، اختراعات، طرح‌های تحقیقاتی و همایش‌های بین‌المللی محاسبه می‌گردد.',
    phoneticText:
      'اِمتیازاتِ نَهایی، اَز چَهار مِحوَرِ اَصلی... شامِلِ مَقالّاتِ عِلمی، اِختِراعات، طَرح‌هایِ تَحقیقاتی، و هَمایِش‌هایِ بَین‌ُالمِلَلی مُحاسِبِه می‌گَردَد.',
    duration: 6.0,
  },
  shot_04: {
    displayText:
      'در بخش مقالات، شاخص‌های کیفی از جمله مقالات نمایه شده در Web of Science و مجلات با رتبه Q1 بالاترین ضریب را دارا می‌باشند.',
    phoneticText:
      'دَر بَخشِ مَقالّات، شاخِص‌هایِ کِیفی... اَز جُمله مَقالّاتِ نَمایِه شُده دَر وِب آو سایِنس و مَجَلّات با رُتبه‌یِ کیو وان، بالاتَرین ضَریب را دارا می‌باشَند.',
    duration: 14.0,
  },
  shot_05: {
    displayText:
      'رعایت کامل کدهای اخلاق در پژوهش و عدم وجود هرگونه تخلف علمی یا سرقت ادبی، شرط بدون قید و شرط ورود به فرآیند داوری است.',
    phoneticText:
      'رِعایَتِ کامِلِ کُدهایِ اَخلاق دَر پَژوهِش... و عَدَمِ وُجودِ هَرگونه تَخَلُّفِ عِلمی یا سِرقَتِ اَدَبی، شَرطِ بِدونِ قِید و شَرطِ وُرود به فَرایَندِ داوَری است.',
    duration: 16.0,
  },
  shot_06: {
    displayText:
      'پرونده‌ها در کمیته تحقیقات دانشجویی دانشگاه بررسی و برترین رتبه‌ها جهت داوری نهایی به معاونت تحقیقات و فناوری وزارت بهداشت ارسال می‌شوند.',
    phoneticText:
      'پَرَوَنده‌ها دَر کُمیته‌یِ تَحقیقاتِ دانش‌جوییِ دانِشگاه بَررِسی... و بَرتَرین رُتبه‌ها جِهَتِ داوَریِ نَهایی به مُعاوِنَتِ تَحقیقات و فَنّاوریِ وِزارَتِ بِهداشت اَرسال می‌شَوَند.',
    duration: 18.0,
  },
  shot_07: {
    displayText:
      'کمیته تحقیقات و فناوری دانشجویی دانشگاه علوم پزشکی بقیه‌الله (عج)، حامی پژوهشگران و فناوران برجسته سلامت کشور.',
    phoneticText:
      'کُمیته‌یِ تَحقیقات و فَنّاوریِ دانش‌جوییِ دانِشگاهِ عُلومِ پِزِشکیِ بَقیَّةُ الله، عَجَّلَ اللهُ تَعالیٰ فَرَجَهُ الشَّریف... حامیِ پَژوهِشگَران و فَنّاوَرانِ بَرجَسته‌یِ سَلامَتِ کِشوَر.',
    duration: 17.3,
  },
};

export class EdgeTtsProvider implements VoiceProvider {
  readonly name = 'EdgeTTS (fa-IR-FaridNeural - Phonetically Normalized)';
  readonly isHuman = false;

  getTrack(shotId: string): VoiceTrack {
    const meta = SHOT_SCRIPTS[shotId] ?? {
      displayText: '',
      phoneticText: '',
      duration: 6.0,
    };
    return {
      shotId,
      audioPath: `projects/persian_editorial_motion_test_v4/audio/voice/${shotId}.wav`,
      durationInSeconds: meta.duration,
      sampleRate: 24000,
      channels: 1,
      displayText: meta.displayText,
      phoneticText: meta.phoneticText,
    };
  }

  listTracks(): VoiceTrack[] {
    return Object.keys(SHOT_SCRIPTS).map((id) => this.getTrack(id));
  }
}

export class HumanVoiceProvider implements VoiceProvider {
  readonly name = 'Human Voice (Studio Recording)';
  readonly isHuman = true;

  getTrack(shotId: string): VoiceTrack {
    const meta = SHOT_SCRIPTS[shotId] ?? {
      displayText: '',
      phoneticText: '',
      duration: 6.0,
    };
    return {
      shotId,
      audioPath: `projects/persian_editorial_motion_test_v4/audio/voice/human/${shotId}.wav`,
      durationInSeconds: meta.duration,
      sampleRate: 48000,
      channels: 2,
      displayText: meta.displayText,
      phoneticText: meta.phoneticText,
    };
  }

  listTracks(): VoiceTrack[] {
    return Object.keys(SHOT_SCRIPTS).map((id) => this.getTrack(id));
  }
}
