"""
Master Persian Narration Generator (v2.2)
Generates high-energy, fluent, professionally-inflected Persian narration for the apoptosis explainer.
Uses calibrated prosody parameters (energetic cadence, natural pitch inflection) and
strategic phonetic diacritics to ensure crisp, non-robotic Persian speech.
"""

import os
import sys
import asyncio
import edge_tts
from pathlib import Path

# The four continuous narrative sentences for the apoptosis story
SENTENCES = [
    {
        "id": "shot_1",
        "visible": "سلول سرطانی با تکیه بر پروتئین BCL-2، فرمان مرگ طبیعی را نادیده می‌گیرد.",
        "spoken": "سلول سرطانی با تکیه بر پروتئین بی‌سی‌ال دو، فرمان مرگ طبیعی را نادیده می‌گیرد.",
        # High naturalness text with strategic diacritics for Iranian Persian cadence
        "phonetic": "سِلّولِ سَرَطانی با تَکیه بَر پِروتِئینِ بی‌سی‌اِل دو، فَرمانِ مَرگِ طَبیعی را نادیده می‌گیرَد.",
        "voice": "fa-IR-FaridNeural", # Professional Iranian science presenter tone
        "rate": "+9%",
        "pitch": "-1Hz"
    },
    {
        "id": "shot_2",
        "visible": "اما مهارکننده‌های هدفمند BH3، سپر BCL-2 را می‌شکنند.",
        "spoken": "اما مهارکننده‌های هدفمند بی‌اچ‌تری، سپر بی‌سی‌ال دو را می‌شکنند.",
        "phonetic": "اَمّا مَهارکُنَنده‌هایِ هَدَفمَندِ بیِ‌اِچ‌تری، سِپَرِ بی‌سی‌اِل دو را می‌شِکَنَند.",
        "voice": "fa-IR-FaridNeural",
        "rate": "+8%",
        "pitch": "-1Hz"
    },
    {
        "id": "shot_3",
        "visible": "با فعال شدن BAX، منافذ MOMP باز شده و سیتوکروم c آزاد می‌شود.",
        "spoken": "با فعال شدن بَکس، منافذ مامپ باز شده و سیتوکروم سی آزاد می‌شود.",
        "phonetic": "با فَعّال شُدَنِ بَکْس، مَنافِذِ مامْپ باز شُده و سیتوکْرومِ سی آزاد می‌شَوَد.",
        "voice": "fa-IR-FaridNeural",
        "rate": "+7%",
        "pitch": "-1Hz"
    },
    {
        "id": "shot_4",
        "visible": "تشکیل آپوپتوزوم، کاسپازهای مرگبار را فعال کرده و سلول خاموش می‌شود.",
        "spoken": "تشکیل آپوپتوزوم، کاسپازهای مرگبار را فعال کرده و سلول خاموش می‌شود.",
        "phonetic": "تَشکیلِ آپوپْتوزوم، کاسْپازهایِ مَرگبار را فَعّال کَرده و سِلّول خاموش می‌شَوَد.",
        "voice": "fa-IR-FaridNeural",
        "rate": "+6%",
        "pitch": "-1Hz"
    }
]

async def build_master_narration():
    out_dir = Path("public")
    out_dir.mkdir(parents=True, exist_ok=True)
    audio_dir = Path("audio/narration")
    audio_dir.mkdir(parents=True, exist_ok=True)

    print("Synthesizing calibrated Persian narration stems...")
    import shutil
    for s in SENTENCES:
        comm = edge_tts.Communicate(s["phonetic"], s["voice"], rate=s["rate"], pitch=s["pitch"])
        target_public = str(out_dir / f"{s['id']}.mp3")
        target_audio = str(audio_dir / f"{s['id']}.mp3")
        await comm.save(target_public)
        shutil.copyfile(target_public, target_audio)
        print(f"Generated {s['id']}: {s['visible']}")

if __name__ == "__main__":
    asyncio.run(build_master_narration())
