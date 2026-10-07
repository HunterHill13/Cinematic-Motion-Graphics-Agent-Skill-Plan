import asyncio
import edge_tts
import json
import os
import subprocess
from pathlib import Path

SECTIONS = [
    {
        "id": "act_01_intro",
        "text": "روابطِ عمومیِ کُمیتهیِ تَحقیقاتِ دانشگاهِ عُلومِ پِزِشکیِ بَقیَّتُالله (عَج) تَقدیم میکُنَد!",
        "label": "Presentation & Institutional Identity"
    },
    {
        "id": "act_02_hook",
        "text": "آیا میدانید چِگونه میتَوانید به عُنوانِ دانشجویِ پَژوهِشگَر یا فَنّاوَرِ بَرجَستهیِ کِشوَر اِنتِخاب شَوید؟!",
        "label": "The Core Question / Hook"
    },
    {
        "id": "act_03_framework",
        "text": "دَستورُالعَمَلِ بَندِ «کاف»، مادّهیِ ۲ از آییننامهیِ اِستِعدادهایِ دِرَخشانِ وِزارَتِ بِهداشت، مَسیرِ جامِعِ امتیازدهی به فَعّالیتهایِ شُماست!",
        "label": "Band K Framework Definition"
    },
    {
        "id": "act_04_gate",
        "text": "اَمّا قَبل از مُحاسِبِهیِ اِمتیازها، ۳ شَرطِ اَصلی وجود دارَد:",
        "label": "The 3 Pre-Conditions Pivot"
    },
    {
        "id": "act_05_cond1",
        "text": "شَرطِ اَوَّل؛ مُعَدَّلِ کُلِّ شُما دَر مَقطَعِ فِعلی بایَد حَداقَل ۱۶ باشَد.",
        "label": "Condition 1: GPA >= 16"
    },
    {
        "id": "act_06_cond2",
        "text": "شَرطِ دُوُّم؛ بایَد دَر سَنَواتِ مُجازِ تَحصیلی باشِید و تأییدیهیِ کُمیتهیِ اِنضِباطی را دَریافت کُنید.",
        "label": "Condition 2: Valid Duration & Disciplinary Approval"
    },
    {
        "id": "act_07_cond3",
        "text": "شَرطِ سِوُّم؛ اِمتیازهایِ شُما بایَد حَداقَل از ۶ مادّهیِ مُختَلِفِ آییننامِه کَسب شَوَد؛ که حُضورِ مَقالِه یا فَعّالیتِ فَنّاوَرانِه دَر آن اِجباری اَست!",
        "label": "Condition 3: 6 Diverse Articles & Paper Requirement"
    },
    {
        "id": "act_08_warning",
        "text": "دِقَّت کُنید! تَمامِ مَدارِک بایَد مَربوط به دورانِ تَحصیل، یا نِهایَتاً تا ۱ سال پَس از فارِغُالتَّحصیلی باشَد.",
        "label": "Warning & Time Horizon"
    },
    {
        "id": "act_09_threshold_intro",
        "text": "حَدِّنِصابِ قَبولی، بَستِه به تیپِ دانشگاه و مَقطَعِ شُما فَرق میکُنَد:",
        "label": "Threshold Intro"
    },
    {
        "id": "act_10_thresholds",
        "text": "بَرایِ کارشِناسی دَر دانشگاههایِ تیپِ یک ۶۵ اِمتیاز، پِزِشکیِ عُمومی ۱۱۰ اِمتیاز، و دُکتِرایِ تَخَصُّصی به ۱۳۰ اِمتیاز نِیاز دارَد!",
        "label": "65 / 110 / 130 Score Thresholds"
    },
    {
        "id": "act_11_cta",
        "text": "دَر ویدیوهایِ بَعدی، رَوِشِ کَسبِ این اِمتیازها را گامبِهگام بَررِسی میکُنیم. با ما هَمراه باشِید!",
        "label": "Final CTA & Continuation"
    }
]

async def synthesize_sections():
    voice = "fa-IR-FaridNeural"
    base_dir = Path("projects/v39_audio/sections")
    base_dir.mkdir(parents=True, exist_ok=True)
    
    timing_data = []
    
    current_time_sec = 0.5  # 0.5s initial breath/preroll
    
    for i, sec in enumerate(SECTIONS):
        sec_id = sec["id"]
        out_mp3 = base_dir / f"{i+1:02d}_{sec_id}.mp3"
        out_wav = base_dir / f"{i+1:02d}_{sec_id}.wav"
        
        communicate = edge_tts.Communicate(sec["text"], voice, rate="+0%", volume="+0%")
        await communicate.save(str(out_mp3))
        
        # Convert to standard 44.1kHz wav for precise length
        cmd = ["ffmpeg", "-y", "-i", str(out_mp3), "-ar", "44100", "-ac", "2", str(out_wav)]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        
        # Get exact duration via ffprobe
        probe_cmd = [
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1", str(out_wav)
        ]
        res = subprocess.run(probe_cmd, stdout=subprocess.PIPE, text=True, check=True)
        dur_sec = float(res.stdout.strip())
        
        pause_sec = 0.55 if i < len(SECTIONS) - 1 else 1.2
        start_frame = round(current_time_sec * 30)
        end_frame = round((current_time_sec + dur_sec) * 30)
        dur_frames = end_frame - start_frame
        
        timing_data.append({
            "index": i + 1,
            "id": sec_id,
            "label": sec["label"],
            "text": sec["text"],
            "file": str(out_wav).replace("\\", "/"),
            "startSec": round(current_time_sec, 3),
            "durationSec": round(dur_sec, 3),
            "endSec": round(current_time_sec + dur_sec, 3),
            "startFrame": start_frame,
            "endFrame": end_frame,
            "durationFrames": dur_frames,
            "pauseSec": pause_sec
        })
        
        current_time_sec += dur_sec + pause_sec
        print(f"[{i+1}/{len(SECTIONS)}] {sec_id}: {dur_sec:.2f}s (Frames {start_frame} -> {end_frame})")

    total_frames = round(current_time_sec * 30)
    print(f"\nTotal Video Duration: {current_time_sec:.2f}s ({total_frames} frames @ 30fps)")
    
    with open("projects/v39_audio/timing.json", "w", encoding="utf-8") as f:
        json.dump({"totalSec": current_time_sec, "totalFrames": total_frames, "sections": timing_data}, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    asyncio.run(synthesize_sections())
