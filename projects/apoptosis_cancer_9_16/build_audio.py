"""
Build Narration Stems for 9:16 Apoptosis Video
Produces individual shot audio segments and concatenates them with precise timestamps.
"""

import os
import sys
import yaml
from pathlib import Path

# Add engine directory to path
sys.path.append(str(Path("audio/engine").resolve()))
from VoiceDirector import VoiceDirector
from PersianPronunciationPlanner import PersianPronunciationPlanner

def build_narration():
    with open("projects/apoptosis_cancer_9_16/choreography.yaml", "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)

    planner = PersianPronunciationPlanner()
    director = VoiceDirector(preferred_provider="edge") # Local or edge fallback

    out_dir = Path("projects/apoptosis_cancer_9_16/audio")
    out_dir.mkdir(parents=True, exist_ok=True)

    print("Generating audio for shots...")
    for idx, shot in enumerate(data["shots"]):
        pron = shot["narration"]["pronunciation"]
        out_wav = str(out_dir / f"shot_{idx+1}.mp3")
        res = director.produce_narration(pron, out_wav)
        print(f"Shot {idx+1} audio produced: {out_wav} (Provider: {res.get('provider')})")

if __name__ == "__main__":
    build_narration()
