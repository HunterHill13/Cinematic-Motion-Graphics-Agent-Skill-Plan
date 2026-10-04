import os
import subprocess

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIDEO_PATH = os.path.join(os.path.dirname(BASE_DIR), "..", "renders", "persian_editorial_motion_test_v4", "final.mp4")
QC_DIR = os.path.join(BASE_DIR, "qc")
FRAMES_DIR = os.path.join(QC_DIR, "master_frames")

os.makedirs(FRAMES_DIR, exist_ok=True)

# 7 representative keyframes across the 7 shots:
# Shot 1 (0-180): f90 (t=3.0s) - Decree Title & Emblem
# Shot 2 (180-360): f270 (t=9.0s) - 4 Score Gauges Readout
# Shot 3 (360-540): f460 (t=15.33s) - Four Pillars Assembly
# Shot 4 (540-960): f750 (t=25.0s) - Paper Oscilloscope & Q1 Quartiles
# Shot 5 (960-1440): f1200 (t=40.0s) - National Ethics Committee Verification
# Shot 6 (1440-1980): f1710 (t=57.0s) - National Candidate Swarm & Funnel
# Shot 7 (1980-2500): f2250 (t=75.0s) - Baqiyatallah Grand Assembly Sign-off
MASTER_FRAMES = [90, 270, 460, 750, 1200, 1710, 2250]

def extract_master_frames():
    print("=== Extracting Master Representative Keyframes ===")
    for idx, f in enumerate(MASTER_FRAMES):
        out_jpg = os.path.join(FRAMES_DIR, f"shot_{idx+1:02d}_frame_{f:04d}.jpg")
        pts = f / 30.0
        cmd = [
            "ffmpeg", "-y", "-ss", f"{pts:.3f}",
            "-i", VIDEO_PATH,
            "-vframes", "1",
            "-q:v", "2",
            out_jpg
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        print(f"Extracted {out_jpg} (Shot {idx+1}, frame {f})")

def build_master_contact_sheet():
    print("=== Building Master 7-Shot Contact Sheet ===")
    out_sheet = os.path.join(QC_DIR, "contact_sheet_master.jpg")
    
    # Pad to 8 images (duplicate shot 7 or use 8 grid) for clean 4x2 grid
    inputs = []
    for idx, f in enumerate(MASTER_FRAMES):
        inputs.extend(["-i", os.path.join(FRAMES_DIR, f"shot_{idx+1:02d}_frame_{f:04d}.jpg")])
    # Add frame 2400 as 8th
    f_end = 2400
    out_end = os.path.join(FRAMES_DIR, f"shot_07b_frame_{f_end:04d}.jpg")
    subprocess.run(["ffmpeg", "-y", "-ss", f"{f_end/30.0:.3f}", "-i", VIDEO_PATH, "-vframes", "1", "-q:v", "2", out_end], check=True)
    inputs.extend(["-i", out_end])

    filter_complex = "xstack=inputs=8:layout=0_0|w0_0|w0+w1_0|w0+w1+w2_0|0_h0|w0_h0|w0+w1_h0|w0+w1+w2_h0,scale=1920:1080"
    cmd = ["ffmpeg", "-y"] + inputs + ["-filter_complex", filter_complex, out_sheet]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    print(f"Master contact sheet saved to {out_sheet}")

if __name__ == "__main__":
    extract_master_frames()
    build_master_contact_sheet()
