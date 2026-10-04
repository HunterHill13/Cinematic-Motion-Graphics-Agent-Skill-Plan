"""
Production Timeline & Transition Engine (v2.2)
The authoritative single source of truth coordinating:
- Visual Scene bounds
- Transition types and overlap frames
- Narration and speech boundaries
- Dynamic music volume keyframes
- Transition and impact SFX events
"""

import json
from typing import Dict, Any, List

class ProductionTimeline:
    """Master production timeline for Remotion rendering and QC verification."""

    # 30.0s total runtime @ 30 FPS = 900 frames
    TIMELINE_DATA: Dict[str, Any] = {
        "version": "2.2.0",
        "project": "apoptosis_cancer_9_16",
        "aspect_ratio": "9:16",
        "fps": 30,
        "total_frames": 900,
        "total_duration_sec": 30.0,
        "scenes": [
            {
                "id": "Scene01_CancerSurvival",
                "name": "بقای سلول سرطانی و مهار آپوپتوز",
                "start_frame": 0,
                "end_frame": 225, # 7.5s
                "duration_frames": 225,
                "transition_out": {
                    "type": "fade",
                    "duration_frames": 18,
                    "sfx": "whoosh-fast.mp3"
                }
            },
            {
                "id": "Scene02_BH3Inhibition",
                "name": "مهار هدفمند با مقلدهای BH3",
                "start_frame": 210, # 15 frame overlap for transition
                "end_frame": 450,
                "duration_frames": 240,
                "transition_out": {
                    "type": "slide",
                    "direction": "from-bottom",
                    "duration_frames": 20,
                    "sfx": "bass-hit-futuristic.mp3"
                }
            },
            {
                "id": "Scene03_MOMPPuncture",
                "name": "نفوذپذیری غشا و رهایش سیتوکروم c",
                "start_frame": 435, # Overlap
                "end_frame": 690,
                "duration_frames": 255,
                "transition_out": {
                    "type": "fade",
                    "duration_frames": 18,
                    "sfx": "transition-soft.mp3"
                }
            },
            {
                "id": "Scene04_Apoptosome",
                "name": "تشکیل آپوپتوزوم و فعال‌سازی کاسپازها",
                "start_frame": 675,
                "end_frame": 900,
                "duration_frames": 225,
                "transition_out": None
            }
        ],
        "master_audio": {
            "track": "public/audio/final_master_mix.mp3",
            "channels": 2,
            "sample_rate": 44100,
            "integrated_lufs": -16.2
        }
    }

    @classmethod
    def get_timeline(cls) -> Dict[str, Any]:
        return cls.TIMELINE_DATA

if __name__ == "__main__":
    tl = ProductionTimeline.get_timeline()
    with open("projects/apoptosis_cancer_9_16/production-timeline.json", "w", encoding="utf-8") as f:
        json.dump(tl, f, indent=2, ensure_ascii=False)
    print("Exported authoritative production timeline json successfully.")
