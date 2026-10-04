import os
import subprocess
from PIL import Image

def generate_v6_qc():
    video_path = "projects/persian_editorial_motion_test_v6/renders/final.mp4"
    qc_dir = "projects/persian_editorial_motion_test_v6/qc"
    frames_dir = os.path.join(qc_dir, "frames")
    trans_dir = os.path.join(qc_dir, "transitions")
    os.makedirs(frames_dir, exist_ok=True)
    os.makedirs(trans_dir, exist_ok=True)

    # 1. Extract Representative Frames for the 6 Shots
    # Shot 1: 150 (Hook Question)
    # Shot 2: 450 (Directive Decree)
    # Shot 3: 900 (Three Conditions Trifold)
    # Shot 4: 1560 (Time Window Horizon)
    # Shot 5: 1950 (Passing Thresholds Monoliths)
    # Shot 6: 2250 (Outro Sign-off)
    key_frames = [
        (150, "shot01_hook.jpg"),
        (450, "shot02_decree.jpg"),
        (900, "shot03_trifold.jpg"),
        (1560, "shot04_timewindow.jpg"),
        (1950, "shot05_thresholds.jpg"),
        (2250, "shot06_outro.jpg"),
    ]

    print("Extracting representative frames...")
    extracted_imgs = []
    for frame_num, filename in key_frames:
        time_sec = frame_num / 30.0
        out_path = os.path.join(frames_dir, filename)
        cmd = [
            "ffmpeg", "-y", "-ss", f"{time_sec:.3f}", "-i", video_path,
            "-vframes", "1", "-q:v", "2", out_path
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        if os.path.exists(out_path):
            extracted_imgs.append(out_path)

    # 2. Build 3x2 Master Contact Sheet
    if len(extracted_imgs) == 6:
        print("Assembling 3x2 Master Contact Sheet...")
        # Target thumbnail size: 640x360 -> Total grid: 1920x720
        grid = Image.new("RGB", (1920, 720), (4, 7, 17))
        for idx, img_path in enumerate(extracted_imgs):
            img = Image.open(img_path).resize((640, 360), Image.Resampling.LANCZOS)
            col = idx % 3
            row = idx // 3
            grid.paste(img, (col * 640, row * 360))
        grid.save(os.path.join(qc_dir, "contact_sheet_master_v6.jpg"), quality=92)

    # 3. Extract Transition Samples
    # T1: 350-380 (mid: 365)
    # T2: 620-650 (mid: 635)
    # T3: 1460-1490 (mid: 1475)
    # T4: 1700-1730 (mid: 1715)
    # T5: 2155-2185 (mid: 2170)
    transitions = [
        ("t1", 350, 365, 380),
        ("t2", 620, 635, 650),
        ("t3", 1460, 1475, 1490),
        ("t4", 1700, 1715, 1730),
        ("t5", 2155, 2170, 2185),
    ]

    print("Extracting transition triplets...")
    for name, f_start, f_mid, f_end in transitions:
        t_paths = []
        for stage, f_num in [("before", f_start), ("mid", f_mid), ("after", f_end)]:
            t_sec = f_num / 30.0
            out_file = os.path.join(trans_dir, f"{name}_{stage}.jpg")
            cmd = [
                "ffmpeg", "-y", "-ss", f"{t_sec:.3f}", "-i", video_path,
                "-vframes", "1", "-q:v", "2", out_file
            ]
            subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
            if os.path.exists(out_file):
                t_paths.append(out_file)

        # Assemble transition contact strip (1920x360: 3 columns of 640x360)
        if len(t_paths) == 3:
            strip = Image.new("RGB", (1920, 360), (4, 7, 17))
            for i, p in enumerate(t_paths):
                im = Image.open(p).resize((640, 360), Image.Resampling.LANCZOS)
                strip.paste(im, (i * 640, 0))
            strip.save(os.path.join(trans_dir, f"transition_{name}_contact.jpg"), quality=90)

    # 4. Extract 100% typography crop on Shot 3 (Grade 16 numeric impact)
    print("Extracting 100% typography crop...")
    shot3_path = os.path.join(frames_dir, "shot03_trifold.jpg")
    if os.path.exists(shot3_path):
        s3_img = Image.open(shot3_path)
        # Crop 800x450 center area
        crop_box = (560, 315, 1360, 765)
        crop_img = s3_img.crop(crop_box)
        crop_img.save(os.path.join(qc_dir, "crop_100pct_center.jpg"), quality=95)

    print("V6 QC Asset generation complete!")

if __name__ == "__main__":
    generate_v6_qc()
