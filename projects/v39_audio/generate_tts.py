import asyncio
import edge_tts
import json
import re

TEXT = """روابطِ عمومیِ کُمیتهیِ تَحقیقاتِ دانشگاهِ عُلومِ پِزِشکیِ بَقیَّتُالله (عَج) تَقدیم میکُنَد!

آیا میدانید چِگونه میتَوانید به عُنوانِ دانشجویِ پَژوهِشگَر یا فَنّاوَرِ بَرجَستهیِ کِشوَر اِنتِخاب شَوید؟!

دَستورُالعَمَلِ بَندِ «کاف»، مادّهیِ ۲ از آییننامهیِ اِستِعدادهایِ دِرَخشانِ وِزارَتِ بِهداشت، مَسیرِ جامِعِ امتیازدهی به فَعّالیتهایِ شُماست!

اَمّا قَبل از مُحاسِبِهیِ اِمتیازها، ۳ شَرطِ اَصلی وجود دارَد:

شَرطِ اَوَّل؛ مُعَدَّلِ کُلِّ شُما دَر مَقطَعِ فِعلی بایَد حَداقَل ۱۶ باشَد.

شَرطِ دُوُّم؛ بایَد دَر سَنَواتِ مُجازِ تَحصیلی باشِید و تأییدیهیِ کُمیتهیِ اِنضِباطی را دَریافت کُنید.

شَرطِ سِوُّم؛ اِمتیازهایِ شُما بایَد حَداقَل از ۶ مادّهیِ مُختَلِفِ آییننامِه کَسب شَوَد؛ که حُضورِ مَقالِه یا فَعّالیتِ فَنّاوَرانِه دَر آن اِجباری اَست!

دِقَّت کُنید! تَمامِ مَدارِک بایَد مَربوط به دورانِ تَحصیل، یا نِهایَتاً تا ۱ سال پَس از فارِغُالتَّحصیلی باشَد.

حَدِّنِصابِ قَبولی، بَستِه به تیپِ دانشگاه و مَقطَعِ شُما فَرق میکُنَد:

بَرایِ کارشِناسی دَر دانشگاههایِ تیپِ یک ۶۵ اِمتیاز،

پِزِشکیِ عُمومی ۱۱۰ اِمتیاز،

و دُکتِرایِ تَخَصُّصی به ۱۳۰ اِمتیاز نِیاز دارَد!

دَر ویدیوهایِ بَعدی، رَوِشِ کَسبِ این اِمتیازها را گامبِهگام بَررِسی میکُنیم. با ما هَمراه باشِید!"""

async def main():
    voice = "fa-IR-FaridNeural"
    output_file = "projects/v39_audio/v39_voice_farid.mp3"
    subtitles_file = "projects/v39_audio/v39_voice_farid.vtt"
    
    communicate = edge_tts.Communicate(TEXT, voice, rate="+0%", volume="+0%")
    
    print(f"Generating TTS with voice: {voice}...")
    sub_maker = edge_tts.SubMaker()
    with open(output_file, "wb") as file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                file.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                sub_maker.feed(chunk)
                
    with open(subtitles_file, "w", encoding="utf-8") as file:
        file.write(sub_maker.get_srt())
        
    print(f"Successfully generated {output_file} and {subtitles_file}")

if __name__ == "__main__":
    asyncio.run(main())
