"""
Voice Quality Recovery & Phonetic Benchmark (v3.3)
Generates and audits calibrated Persian narration samples for all difficult academic phrases.
"""

import asyncio
import os
import sys
import subprocess
import edge_tts
from pathlib import Path

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BENCHMARK_SAMPLES = [
    {
        "id": "sample_01_institution",
        "label": "کمیته تحقیقات دانشگاه بقیةالله",
        "phonetic": "رَوابِطِ عُمومیِ کُمیته‌یِ تَحقیقات... دانشگاهِ عُلومِ پِزِشکیِ بَقیَّةُ‌الله، عَجَّلَ‌اللهُ فَرَجَه... تَقدیم می‌کُنَد!",
        "rate": "+5%",
        "pitch": "-1Hz"
    },
    {
        "id": "sample_02_question",
        "label": "طرح سوال پژوهشگر / فناور",
        "phonetic": "آیا می‌دانید چِگونه می‌تَوانید به عُنوانِ دانشجویِ پَژوهِشگَر، یا فَنّاوَرِ بَرجَسته‌یِ کِشوَر اِنتِخاب شَوید؟!",
        "rate": "+6%",
        "pitch": "+0Hz"
    },
    {
        "id": "sample_03_regulation",
        "label": "بند کاف ماده ۲ استعدادهای درخشان",
        "phonetic": "دَستورُالعَمَلِ بَندِ کاف، مادّه‌یِ دو، از آیین‌نامه‌یِ اِستِعدادهایِ دِرَخشانِ وِزارَتِ بِهداشت... مَسیرِ جامِعِ اِمتیازدهی به فَعّالیَت‌هایِ شماست!",
        "rate": "+6%",
        "pitch": "-1Hz"
    },
    {
        "id": "sample_04_condition1",
        "label": "شرط اول: معدل ۱۶",
        "phonetic": "شَرطِ اَوَّل؛ مُعَدَّلِ کُلِّ شما دَر مَقطَعِ فِعلی، بایَد حَداقَل شانزدَه باشَد.",
        "rate": "+6%",
        "pitch": "-1Hz"
    },
    {
        "id": "sample_05_condition2",
        "label": "شرط دوم: سنوات و تأییدیه انضباطی",
        "phonetic": "شَرطِ دُوُّم؛ بایَد دَر سَنَواتِ مُجازِ تَحصیلی باشِید، و تأییدیِه‌یِ کُمیته‌یِ اِنضِباطی را دَریافت کُنید.",
        "rate": "+6%",
        "pitch": "-1Hz"
    },
    {
        "id": "sample_06_condition3",
        "label": "شرط سوم: ۶ ماده + مقاله یا فناورانه",
        "phonetic": "شَرطِ سِوُّم؛ اِمتیازهایِ شما بایَد حَداقَل از شِش مادّه‌یِ مُختَلِفِ آیین‌نامِه کَسب شَوَد؛ که حُضورِ مَقالِه یا فَعّالیَتِ فَنّاوَرانِه دَر آن اِجباری اَست!",
        "rate": "+6%",
        "pitch": "-1Hz"
    },
    {
        "id": "sample_07_caveat",
        "label": "۱ سال پس از فارغ‌التحصیلی",
        "phonetic": "دِقَّت کُنید! تَمامِ مَدارِک بایَد مَربوط به دورانِ تَحصیل، یا نِهایَتاً تا یک سال پَس از فارِغُ‌التَّحصیلی باشَد.",
        "rate": "+5%",
        "pitch": "-1Hz"
    },
    {
        "id": "sample_08_thresholds",
        "label": "حدنصاب‌های ۶۵، ۱۱۰، ۱۳۰",
        "phonetic": "حَدِّ نِصابِ قَبولی، بَستِه به تیپِ دانشگاه و مَقطَعِ شما فَرق می‌کُنَد: کارشِناسی شَصت و پَنج اِمتیاز... پِزِشکیِ عُمومی صَد و دَه اِمتیاز... و دُکتِرایِ تَخَصُّصی به صَد و سی اِمتیاز نَیاز دارَد!",
        "rate": "+6%",
        "pitch": "-1Hz"
    }
]

async def run_voice_benchmark():
    out_dir = Path("projects/persian_editorial_motion_test_v3_3/audio/benchmark")
    out_dir.mkdir(parents=True, exist_ok=True)
    
    print("Synthesizing Voice Benchmark Samples (fa-IR-FaridNeural Calibrated)...")
    for s in BENCHMARK_SAMPLES:
        p = out_dir / f"{s['id']}.mp3"
        comm = edge_tts.Communicate(s["phonetic"], "fa-IR-FaridNeural", rate=s["rate"], pitch=s["pitch"])
        await comm.save(str(p))
        dur = subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', str(p)]).decode().strip()
        print(f"[{s['id']}] {s['label']} -> {dur}s")

if __name__ == "__main__":
    asyncio.run(run_voice_benchmark())
