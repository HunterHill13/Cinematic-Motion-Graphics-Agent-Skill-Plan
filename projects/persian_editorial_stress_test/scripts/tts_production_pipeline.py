import asyncio
import os
import json
import edge_tts
from pathlib import Path

# Clean display sentences (for on-screen typography only)
SHOTS_DISPLAY = [
    {
        "id": "shot_1",
        "name": "Institutional Opening",
        "display": "روابط عمومی کمیته تحقیقات دانشگاه علوم پزشکی بقیةالله (عج) تقدیم می‌کند!",
        # Calibrated phonetic TTS: expanded acronym, precise kasreh ezafe, professional broadcast pacing
        "phonetic": "رَوابِطِ عُمومیِ کُمیته‌یِ تَحقیقاتِ دانشگاهِ عُلومِ پِزِشکیِ بَقیَّتُ‌الله عَجَّلَ‌اللهُ فَرَجَه، تَقدیم می‌کُنَد!",
        "rate": "+6%",
        "pitch": "-1Hz"
    },
    {
        "id": "shot_2",
        "name": "The Question",
        "display": "آیا می‌دانید چگونه می‌توانید به عنوان دانشجوی پژوهشگر یا فناور برجسته کشور انتخاب شوید؟! ",
        "phonetic": "آیا می‌دانید چِگونه می‌تَوانید به عُنوانِ دانشجویِ پَژوهِشگَر، یا فَنّاوَرِ بَرجَسته‌یِ کِشوَر اِنتِخاب شَوید؟! ",
        "rate": "+6%",
        "pitch": "-1Hz"
    },
    {
        "id": "shot_3",
        "name": "The Regulation",
        "display": "دستورالعمل بند «کاف»، ماده ۲ از آیین‌نامه استعدادهای درخشان وزارت بهداشت، مسیر جامع امتیازدهی به فعالیت‌های شماست!",
        "phonetic": "دَستورُالعَمَلِ بَندِ کاف، مادّه‌یِ دو از آیین‌نامه‌یِ اِستِعدادهایِ دِرَخشانِ وِزارَتِ بِهداشت، مَسیرِ جامِعِ اِمتیازدهی به فَعّالیَت‌هایِ شُماست!",
        "rate": "+6%",
        "pitch": "-1Hz"
    },
    {
        "id": "shot_4",
        "name": "Three Conditions",
        "display": "اما قبل از محاسبه امتیازها، ۳ شرط اصلی وجود دارد: شرط اول؛ معدل کل شما در مقطع فعلی باید حداقل ۱۶ باشد. شرط دوم؛ باید در سنوات مجاز تحصیلی باشید و تأییدیه کمیته انضباطی را دریافت کنید. شرط سوم؛ امتیازهای شما باید حداقل از ۶ ماده مختلف آیین‌نامه کسب شود؛ که حضور مقاله یا فعالیت فناورانه در آن اجباری است!",
        "phonetic": "اَمّا قَبل از مُحاسِبِه‌یِ اِمتیازها، ۳ شَرطِ اَصلی وجود دارَد: شَرطِ اَوَّل؛ مُعَدَّلِ کُلِّ شُما دَر مَقطَعِ فِعلی، بایَد حَداقَل ۱۶ باشَد. شَرطِ دُوُّم؛ بایَد دَر سَنَواتِ مُجازِ تَحصیلی باشِید و تأییدیِه‌یِ کُمیته‌یِ اِنضِباطی را دَریافت کُنید. شَرطِ سِوُّم؛ اِمتیازهایِ شُما بایَد حَداقَل از ۶ مادّه‌یِ مُختَلِفِ آیین‌نامِه کَسب شَوَد؛ که حُضورِ مَقالِه یا فَعّالیَتِ فَنّاوَرانِه دَر آن اِجباری اَست!",
        "rate": "+7%",
        "pitch": "-1Hz"
    },
    {
        "id": "shot_5",
        "name": "Important Caveat",
        "display": "دقت کنید! تمام مدارک باید مربوط به دوران تحصیل، یا نهایتاً تا ۱ سال پس از فارغ‌التحصیلی باشد.",
        "phonetic": "دِقَّت کُنید! تَمامِ مَدارِک بایَد مَربوط به دورانِ تَحصیل، یا نِهایَتاً تا یک سال پَس از فارِغُ‌التَّحصیلی باشَد.",
        "rate": "+6%",
        "pitch": "-1Hz"
    },
    {
        "id": "shot_6",
        "name": "Score Thresholds",
        "display": "حدنصاب قبولی، بسته به تیپ دانشگاه و مقطع شما فرق می‌کند: برای کارشناسی در دانشگاه‌های تیپ یک ۶۵ امتیاز، پزشکی عمومی ۱۱۰ امتیاز، و دکترای تخصصی به ۱۳۰ امتیاز نیاز دارد!",
        "phonetic": "حَدِّ نِصابِ قَبولی، بَستِه به تیپِ دانشگاه و مَقطَعِ شُما فَرق می‌کُنَد: بَرایِ کارشِناسی دَر دانشگاه‌هایِ تیپِ یک ۶۵ اِمتیاز، پِزِشکیِ عُمومی ۱۱۰ اِمتیاز، و دُکتِرایِ تَخَصُّصی به ۱۳۰ اِمتیاز نَیاز دارَد!",
        "rate": "+6%",
        "pitch": "-1Hz"
    },
    {
        "id": "shot_7",
        "name": "Closing",
        "display": "در ویدیوهای بعدی، روش کسب این امتیازها را گام‌به‌گام بررسی می‌کنیم. با ما همراه باشید!",
        "phonetic": "دَر ویدیوهایِ بَعدی، رَوِشِ کَسبِ این اِمتیازها را گام‌به‌گام بَررِسی می‌کُنیم. با ما هَمراه باشِید!",
        "rate": "+5%",
        "pitch": "-1Hz"
    }
]

async def run_pipeline():
    audio_dir = Path("projects/persian_editorial_stress_test/audio")
    audio_dir.mkdir(parents=True, exist_ok=True)
    
    print("=== Step 1: Benchmarking 3 TTS Engine Configurations ===")
    sample_text_raw = "روابطِ عمومیِ کُمیتهیِ تَحقیقاتِ دانشگاهِ عُلومِ پِزِشکیِ بَقیَّتُالله (عَج) تَقدیم میکُنَد! آیا میدانید چِگونه میتَوانید به عُنوانِ دانشجویِ پَژوهِشگَر یا فَنّاوَرِ بَرجَستهیِ کِشوَر اِنتِخاب شَوید؟!"
    sample_text_calibrated = "رَوابِطِ عُمومیِ کُمیته‌یِ تَحقیقاتِ دانشگاهِ عُلومِ پِزِشکیِ بَقیَّتُ‌الله عَجَّلَ‌اللهُ فَرَجَه، تَقدیم می‌کُنَد! آیا می‌دانید چِگونه می‌تَوانید به عُنوانِ دانشجویِ پَژوهِشگَر، یا فَنّاوَرِ بَرجَسته‌یِ کِشوَر اِنتِخاب شَوید؟!"
    
    # Config A: fa-IR-FaridNeural Raw
    print("Generating Config A (Farid Raw)...")
    comm_a = edge_tts.Communicate(sample_text_raw, "fa-IR-FaridNeural")
    await comm_a.save(str(audio_dir / "bench_a_farid_raw.mp3"))
    
    # Config B: fa-IR-DilaraNeural Raw
    print("Generating Config B (Dilara Raw)...")
    comm_b = edge_tts.Communicate(sample_text_raw, "fa-IR-DilaraNeural")
    await comm_b.save(str(audio_dir / "bench_b_dilara_raw.mp3"))
    
    # Config C: fa-IR-FaridNeural Calibrated (Iranian Presenter)
    print("Generating Config C (Farid Calibrated)...")
    comm_c = edge_tts.Communicate(sample_text_calibrated, "fa-IR-FaridNeural", rate="+6%", pitch="-1Hz")
    await comm_c.save(str(audio_dir / "bench_c_farid_calibrated.mp3"))

    print("\n=== Step 2: Synthesizing Individual Narrative Shots ===")
    timeline = []
    current_frame = 0
    fps = 30
    
    for shot in SHOTS_DISPLAY:
        target_mp3 = audio_dir / f"{shot['id']}.mp3"
        comm = edge_tts.Communicate(shot["phonetic"], "fa-IR-FaridNeural", rate=shot["rate"], pitch=shot["pitch"])
        await comm.save(str(target_mp3))
        
        # Read duration with pydub or mutagen or wave via ffmpeg probe
        timeline_entry = {
            "id": shot["id"],
            "name": shot["name"],
            "display": shot["display"],
            "phonetic": shot["phonetic"],
            "file": str(target_mp3)
        }
        timeline.append(timeline_entry)
        print(f"Generated {shot['id']} ({shot['name']}) -> {target_mp3}")
        
    with open("projects/persian_editorial_stress_test/production_timeline_draft.json", "w", encoding="utf-8") as f:
        json.dump(timeline, f, ensure_ascii=False, indent=2)
    print("Done generating shot audios.")

if __name__ == "__main__":
    asyncio.run(run_pipeline())
