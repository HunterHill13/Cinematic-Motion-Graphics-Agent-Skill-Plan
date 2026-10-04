import os
import sys
import json
import subprocess
import shutil

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(BASE_DIR, "audio")
RAW_DIR = os.path.join(AUDIO_DIR, "raw")
MASTERED_DIR = os.path.join(AUDIO_DIR, "mastered")
BENCHMARK_DIR = os.path.join(AUDIO_DIR, "benchmark")

os.makedirs(RAW_DIR, exist_ok=True)
os.makedirs(MASTERED_DIR, exist_ok=True)
os.makedirs(BENCHMARK_DIR, exist_ok=True)

# Load Prompt Specifications
PROMPT_CONFIG_PATH = os.path.join(BENCHMARK_DIR, "prompt_variations.json")
if os.path.exists(PROMPT_CONFIG_PATH):
    with open(PROMPT_CONFIG_PATH, "r", encoding="utf-8") as f:
        PROMPT_SPECS = json.load(f)
else:
    PROMPT_SPECS = {}

RECOMMENDED_STYLE_PROMPT = PROMPT_SPECS.get("prompts", {}).get(
    "variation_01_recommended_documentary", {}
).get(
    "prompt_text",
    "گوینده مرد فارسی‌زبان ایرانی، لحن مستند علمی و حرفه‌ای، طبیعی و مطمئن. صدای گرم و واضح، انرژی متوسط رو به بالا، بدون لحن تبلیغاتی، بدون اغراق، با تأکید طبیعی روی کلمات کلیدی. ریتم شبیه گوینده مستند علمی تلویزیونی. مکث‌های طبیعی بین جملات و تأکید کنترل‌شده روی اعداد و نکات مهم."
)

# Semantic Narration Segments (A5: Segment-Level Generation)
SEGMENTS = {
    "segment_001": {
        "shot": "01_hook",
        "start_frame": 10,
        "duration_frames": 160,
        "text_display": "بر اساس دستورالعمل بند «کاف» ماده ۲ آیین‌نامه استعدادهای درخشان وزارت بهداشت، شرایط انتخاب دانشجوی پژوهشگر برجسته تعیین شده است.",
        "text_phonetic": "بَر اَساسِ دَستورُالعَمَلِ بَندِ کاف... مادّه‌یِ دو... آیین‌نامه‌یِ اِستِعدادهایِ دِرَخشانِ وِزارَتِ بِهداشت، دَرمان و آموزِشِ پِزِشکی... شَرایِطِ اِنتِخابِ دانش‌جویِ پَژوهِشگَرِ بَرجَستِه، تَعین شُده اَست."
    },
    "segment_002": {
        "shot": "02_problem",
        "start_frame": 190,
        "duration_frames": 160,
        "text_display": "دانشجویان متقاضی باید حداقل امتیاز لازم را در مقاطع مختلف کسب کنند: ۱۶ امتیاز در دکتری تخصصی بالینی، ۶۵ امتیاز در کارشناسی ارشد، ۱۱۰ امتیاز در دکتری تخصصی و ۱۳۰ امتیاز در پزشکی و دندانپزشکی.",
        "text_phonetic": "دانش‌جویانِ مُتِقاضی بایَد حَدِّاَقَلِ اِمتیازِ لازِم را دَر مَقاطِعِ مُختَلِف کَسب کُنَند: شانزَدَه اِمتیاز دَر دُکتِرایِ تَخَصُّصیِ بالینی، شَصت و پَنج اِمتیاز دَر کارشناسیِ اَرشَد، صَد و دَه اِمتیاز دَر دُکتِرایِ تَخَصُّصی، و صَد و سی اِمتیاز دَر رِشته‌هایِ پِزِشکی و دَندان‌پِزِشکی."
    },
    "segment_003": {
        "shot": "03_concept",
        "start_frame": 370,
        "duration_frames": 160,
        "text_display": "امتیازات نهایی از چهار محور اصلی شامل مقالات علمی، اختراعات، طرح‌های تحقیقاتی و همایش‌های بین‌المللی محاسبه می‌گردد.",
        "text_phonetic": "اِمتیازاتِ نَهایی، اَز چَهار مِحوَرِ اَصلی... شامِلِ مَقالّاتِ عِلمی، اِختِراعات، طَرح‌هایِ تَحقیقاتی، و هَمایِش‌هایِ بَین‌ُالمِلَلی مُحاسِبِه می‌گَردَد."
    },
    "segment_004": {
        "shot": "04_data",
        "start_frame": 550,
        "duration_frames": 400,
        "text_display": "در بخش مقالات، شاخص‌های کیفی از جمله مقالات نمایه شده در Web of Science و مجلات با رتبه Q1 بالاترین ضریب را دارا می‌باشند.",
        "text_phonetic": "دَر بَخشِ مَقالّات، شاخِص‌هایِ کِیفی... اَز جُمله مَقالّاتِ نَمایِه شُده دَر وِب آو سایِنس و مَجَلّات با رُتبه‌یِ کیو وان، بالاتَرین ضَریب را دارا می‌باشَند."
    },
    "segment_005": {
        "shot": "05_comparison",
        "start_frame": 970,
        "duration_frames": 450,
        "text_display": "رعایت کامل کدهای اخلاق در پژوهش و عدم وجود هرگونه تخلف علمی یا سرقت ادبی، شرط بدون قید و شرط ورود به فرآیند داوری است.",
        "text_phonetic": "رِعایَتِ کامِلِ کُدهایِ اَخلاق دَر پَژوهِش... و عَدَمِ وُجودِ هَرگونه تَخَلُّفِ عِلمی یا سِرقَتِ اَدَبی، شَرطِ بِدونِ قِید و شَرطِ وُرود به فَرایَندِ داوَری است."
    },
    "segment_006": {
        "shot": "06_funnel",
        "start_frame": 1450,
        "duration_frames": 510,
        "text_display": "پرونده‌ها در کمیته تحقیقات دانشجویی دانشگاه بررسی و برترین رتبه‌ها جهت داوری نهایی به معاونت تحقیقات و فناوری وزارت بهداشت ارسال می‌شوند.",
        "text_phonetic": "پَرَوَنده‌ها دَر کُمیته‌یِ تَحقیقاتِ دانش‌جوییِ دانِشگاه بَررِسی... و بَرتَرین رُتبه‌ها جِهَتِ داوَریِ نَهایی به مُعاوِنَتِ تَحقیقات و فَنّاوریِ وِزارَتِ بِهداشت اَرسال می‌شَوَند."
    },
    "segment_007": {
        "shot": "07_conclusion",
        "start_frame": 1990,
        "duration_frames": 490,
        "text_display": "کمیته تحقیقات و فناوری دانشجویی دانشگاه علوم پزشکی بقیه‌الله (عج)، حامی پژوهشگران و فناوران برجسته سلامت کشور.",
        "text_phonetic": "کُمیته‌یِ تَحقیقات و فَنّاوریِ دانش‌جوییِ دانِشگاهِ عُلومِ پِزِشکیِ بَقیَّةُ الله، عَجَّلَ اللهُ تَعالیٰ فَرَجَهُ الشَّریف... حامیِ پَژوهِشگَران و فَنّاوَرانِ بَرجَسته‌یِ سَلامَتِ کِشوَر."
    }
}

class VoiceEngineManager:
    def __init__(self):
        self.api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
        self.google_creds = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
        self.active_engine = self._detect_engine()

    def _detect_engine(self):
        # Priority Check (A1)
        # 1. Gemini 2.5 Pro TTS
        # 2. Gemini 2.5 Flash TTS
        # 3. Google Cloud Text-to-Speech (fa-IR)
        # 4. Edge TTS fallback (fa-IR-FaridNeural)
        if self.api_key:
            return "Gemini-2.5-TTS"
        elif self.google_creds and os.path.exists(self.google_creds):
            return "Google-Cloud-TTS"
        else:
            return "Edge-TTS-Phonetic-Fallback"

    def synthesize(self, segment_id, text_phonetic, style_prompt, output_wav):
        print(f"[{segment_id}] Synthesizing with engine: {self.active_engine}...")
        
        if self.active_engine == "Gemini-2.5-TTS":
            try:
                # Attempt direct Gemini TTS generation
                from google import genai
                client = genai.Client(api_key=self.api_key)
                response = client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=f"Style: {style_prompt}\nText: {text_phonetic}",
                    config={'response_mime_type': 'audio/mp3'}
                )
                with open(output_wav.replace(".wav", ".mp3"), "wb") as f:
                    f.write(response.parts[0].inline_data.data)
                # Convert to wav
                subprocess.run(["ffmpeg", "-y", "-i", output_wav.replace(".wav", ".mp3"), "-ar", "44100", "-ac", "1", output_wav], check=True)
                return True
            except Exception as e:
                print(f"Gemini-2.5-TTS encountered exception: {e}. Falling back to Google-Cloud or Edge-TTS.")

        if self.active_engine == "Google-Cloud-TTS":
            try:
                from google.cloud import texttospeech
                client = texttospeech.TextToSpeechClient()
                s_input = texttospeech.SynthesisInput(text=text_phonetic)
                voice = texttospeech.VoiceSelectionParams(
                    language_code="fa-IR",
                    ssml_gender=texttospeech.SsmlVoiceGender.MALE
                )
                audio_config = texttospeech.AudioConfig(
                    audio_encoding=texttospeech.AudioEncoding.LINEAR16,
                    sample_rate_hertz=44100
                )
                response = client.synthesize_speech(input=s_input, voice=voice, audio_config=audio_config)
                with open(output_wav, "wb") as f:
                    f.write(response.audio_content)
                return True
            except Exception as e:
                print(f"Google-Cloud-TTS encountered exception: {e}. Falling back to Edge-TTS.")

        # Priority 4: Verified Edge-TTS Fallback
        tmp_mp3 = output_wav.replace(".wav", ".tmp.mp3")
        edge_bin = os.path.join(os.path.dirname(sys.executable), "edge-tts.exe")
        if not os.path.exists(edge_bin):
            cmd = [sys.executable, "-m", "edge_tts"]
        else:
            cmd = [edge_bin]

        cmd += [
            "--voice", "fa-IR-FaridNeural",
            "--rate=-4%",
            "--text", text_phonetic,
            "--write-media", tmp_mp3
        ]
        subprocess.run(cmd, check=True)
        subprocess.run(["ffmpeg", "-y", "-i", tmp_mp3, "-ar", "44100", "-ac", "1", output_wav],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        if os.path.exists(tmp_mp3):
            os.remove(tmp_mp3)
        return True

def generate_all_raw_segments():
    manager = VoiceEngineManager()
    print(f"=== Generating Raw Narration Segments (Engine: {manager.active_engine}) ===")
    for seg_id, data in SEGMENTS.items():
        out_wav = os.path.join(RAW_DIR, f"{seg_id}.wav")
        manager.synthesize(
            seg_id,
            data["text_phonetic"],
            RECOMMENDED_STYLE_PROMPT,
            out_wav
        )
    print("All raw segments generated successfully.")

if __name__ == "__main__":
    generate_all_raw_segments()
