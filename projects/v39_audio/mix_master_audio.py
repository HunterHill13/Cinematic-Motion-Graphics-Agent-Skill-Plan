import json
import subprocess
from pathlib import Path

def mix_audio():
    timing_file = Path("projects/v39_audio/timing.json")
    with open(timing_file, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    total_sec = data["totalSec"]
    sections = data["sections"]
    
    # 1. Build Voiceover track with exact adelay offsets
    # filter_complex string:
    # [0]adelay=500|500[v0]; [1]adelay=...[v1]; ... [v0][v1]...amix=inputs=11:normalize=0[vo_track]
    
    inputs = []
    filter_parts = []
    vo_labels = []
    
    for i, sec in enumerate(sections):
        inputs.extend(["-i", sec["file"]])
        delay_ms = round(sec["startSec"] * 1000)
        filter_parts.append(f"[{i}]adelay={delay_ms}|{delay_ms}[v{i}]")
        vo_labels.append(f"[v{i}]")
        
    mix_filter = ";".join(filter_parts) + f";{''.join(vo_labels)}amix=inputs={len(sections)}:normalize=0[vo_full]"
    
    vo_only_wav = Path("projects/v39_audio/v39_voice_assembled.wav")
    cmd_vo = ["ffmpeg", "-y"] + inputs + ["-filter_complex", mix_filter, "-map", "[vo_full]", "-ar", "44100", "-ac", "2", str(vo_only_wav)]
    print("Assembling voiceover track...")
    subprocess.run(cmd_vo, check=True)
    
    # 2. Prepare Background Music with Ducking and Loop
    # Music source: projects/persian_editorial_stress_test/audio/institutional_science_pulse.wav
    music_src = Path("projects/persian_editorial_stress_test/audio/institutional_science_pulse.wav")
    
    # SFX sources
    sfx_impact = Path("_research/video-shotcraft/template/public/audio/impact-cine.mp3")
    sfx_swoosh = Path("_research/video-shotcraft/template/public/audio/swoosh-quick.mp3")
    sfx_pop = Path("_research/video-shotcraft/template/public/audio/pop.mp3")
    sfx_snap = Path("_research/video-shotcraft/template/public/audio/transition-snap.mp3")
    
    # We will build master mix:
    # Voice (0dB, normalized)
    # Music: looped, sidechain-compressed (ducked) by voice, background level ~ -20dB, pause level ~ -14dB
    # SFX: selectively inserted at key timestamps
    
    # SFX cue times (ms):
    # F248 (Act 2 Hook): swoosh (8266 ms)
    # F487 (Act 3 Band K): snap (16233 ms)
    # F797 (Act 4 3 Conditions Gate): impact (26566 ms)
    # F1070 (Cond 1: 16): impact (35666 ms)
    # F1280 (Cond 2: Approval stamp): pop (42666 ms)
    # F1470 (Cond 3: 6 items): snap (49000 ms)
    # F1729 (Warning): swoosh (57633 ms)
    # F2182 (Thresholds 65): impact (72733 ms)
    # F2340 (Thresholds 110): impact (78000 ms)
    # F2430 (Thresholds 130): impact (81000 ms)
    # F2522 (Act 11 CTA): swoosh (84066 ms)
    
    sfx_cues = [
        (sfx_swoosh, 8266, 0.4),
        (sfx_snap, 16233, 0.4),
        (sfx_impact, 26566, 0.5),
        (sfx_impact, 35666, 0.5),
        (sfx_pop, 42666, 0.4),
        (sfx_snap, 49000, 0.4),
        (sfx_swoosh, 57633, 0.4),
        (sfx_impact, 72733, 0.5),
        (sfx_impact, 78000, 0.5),
        (sfx_impact, 81000, 0.5),
        (sfx_swoosh, 84066, 0.4),
    ]
    
    final_inputs = [
        "-i", str(vo_only_wav),                      # [0] VO
        "-stream_loop", "-1", "-i", str(music_src),  # [1] Music
    ]
    
    sfx_filter_chains = []
    sfx_labels = []
    
    for idx, (sfx_path, ms, vol) in enumerate(sfx_cues):
        final_inputs.extend(["-i", str(sfx_path)])
        input_idx = 2 + idx
        sfx_filter_chains.append(f"[{input_idx}]volume={vol},adelay={ms}|{ms}[sfx{idx}]")
        sfx_labels.append(f"[sfx{idx}]")
        
    # Duck music with sidechain:
    # [1]volume=0.18[music_bed];
    # [music_bed][0]sidechaincompress=threshold=0.08:ratio=4:attack=50:release=400[ducked_music];
    # [vo_full]volume=1.0[vo];
    # [sfx0][sfx1]...amix=...[all_sfx];
    # [vo][ducked_music][all_sfx]amix=inputs=3:normalize=0,volume=1.2,alimiter=limit=0.95[final_out]
    
    full_filter = (
        ";".join(sfx_filter_chains) +
        f";{''.join(sfx_labels)}amix=inputs={len(sfx_cues)}:normalize=0[all_sfx];"
        "[1]volume=0.20[bgm];"
        "[bgm][0]sidechaincompress=threshold=0.06:ratio=4.5:attack=60:release=450[ducked_bgm];"
        "[0]volume=1.05[vo_boost];"
        f"[vo_boost][ducked_bgm][all_sfx]amix=inputs=3:normalize=0:duration=first,atrim=0:{total_sec:.2f},alimiter=limit=0.96[out]"
    )
    
    master_wav = Path("projects/v39_audio/v39_master_mix.wav")
    master_mp3 = Path("projects/v39_audio/v39_master_mix.mp3")
    
    cmd_mix = ["ffmpeg", "-y"] + final_inputs + ["-filter_complex", full_filter, "-map", "[out]", "-ar", "44100", "-ac", "2", str(master_wav)]
    print("Mixing final master audio...")
    subprocess.run(cmd_mix, check=True)
    
    # Also encode MP3 version for easy Remotion <Audio> consumption
    cmd_mp3 = ["ffmpeg", "-y", "-i", str(master_wav), "-b:a", "256k", str(master_mp3)]
    subprocess.run(cmd_mp3, check=True)
    
    # Copy to public folder so Remotion staticFile() can load it seamlessly
    public_audio = Path("public/audio")
    public_audio.mkdir(parents=True, exist_ok=True)
    subprocess.run(["ffmpeg", "-y", "-i", str(master_wav), "-b:a", "256k", str(public_audio / "v39_master_mix.mp3")], check=True)
    
    print(f"Master mix rendered successfully: {master_wav} and {master_mp3}")
    print(f"Copied to public/audio/v39_master_mix.mp3")

if __name__ == "__main__":
    mix_audio()
