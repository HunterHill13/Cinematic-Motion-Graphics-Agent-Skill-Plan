import asyncio
import edge_tts
from pathlib import Path

# The rigorous test script containing ordinary Persian, complex biomedical terms, acronyms, and questions
BENCHMARK_TEXT_PHONETIC = (
  "سلولِ سرطانی با پروتئینِ بی‌سی‌اِل دو، مسیرِ آپوپْتوز را مسدود می‌کند. "
  "آیا داروهایِ مهارکننده می‌توانند این سپر را بشکنند؟ "
  "با ورودِ پپتیدِ بی‌اِچ‌تری و فعال شدنِ مامْپ، سیتوکْرومِ سی آزاد شده و کاسْپازها فرمانِ مرگ را اجرا می‌کنند."
)

async def generate_benchmark_audio():
    out_dir = Path("audio/voice-benchmark/v3_1")
    out_dir.mkdir(parents=True, exist_ok=True)

    candidates = [
        {
            "id": "edge_farid_calibrated",
            "voice": "fa-IR-FaridNeural",
            "rate": "+7%",
            "pitch": "-1Hz",
            "file": out_dir / "edge_farid_calibrated.mp3"
        },
        {
            "id": "edge_dilara_calibrated",
            "voice": "fa-IR-DilaraNeural",
            "rate": "+5%",
            "pitch": "+0Hz",
            "file": out_dir / "edge_dilara_calibrated.mp3"
        },
        {
            "id": "edge_farid_raw_baseline",
            "voice": "fa-IR-FaridNeural",
            "rate": "+0%",
            "pitch": "+0Hz",
            "file": out_dir / "edge_farid_raw_baseline.mp3"
        }
    ]

    for c in candidates:
        print(f"Synthesizing {c['id']} with voice {c['voice']}...")
        communicate = edge_tts.Communicate(
            text=BENCHMARK_TEXT_PHONETIC,
            voice=c["voice"],
            rate=c["rate"],
            pitch=c["pitch"]
        )
        await communicate.save(str(c["file"]))
        print(f"Saved: {c['file']}")

if __name__ == "__main__":
    asyncio.run(generate_benchmark_audio())
