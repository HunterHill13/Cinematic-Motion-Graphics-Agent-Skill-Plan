import os
import subprocess

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIDEO_PATH = os.path.join(os.path.dirname(BASE_DIR), "..", "renders", "persian_editorial_motion_test_v4", "proof_of_quality.mp4")
QC_DIR = os.path.join(BASE_DIR, "qc")
FRAMES_DIR = os.path.join(QC_DIR, "frames")

os.makedirs(FRAMES_DIR, exist_ok=True)

# Keyframes to extract:
# Shot 1 (0-180): f30 (emblem build), f60 (tracking expand), f120 (hold)
# Shot 2 (180-360): f210 (gauge sweep), f260 (scores pop), f320 (gauge hold)
# Shot 3 (360-540): f390 (line carry), f430 (box perimeter), f490 (pillars bloom)
FRAMES = [30, 60, 120, 210, 260, 320, 390, 430, 490]

def extract_frames():
    print("=== Extracting Representative Keyframes ===")
    for f in FRAMES:
        out_jpg = os.path.join(FRAMES_DIR, f"frame_{f:04d}.jpg")
        pts = f / 30.0
        cmd = [
            "ffmpeg", "-y", "-ss", f"{pts:.3f}",
            "-i", VIDEO_PATH,
            "-vframes", "1",
            "-q:v", "2",
            out_jpg
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        print(f"Extracted {out_jpg} (t={pts:.2f}s, frame={f})")

def build_contact_sheet():
    print("=== Building Proof Contact Sheet ===")
    out_sheet = os.path.join(QC_DIR, "contact_sheet_proof.jpg")
    # 3x3 grid
    inputs = []
    for f in FRAMES:
        inputs.extend(["-i", os.path.join(FRAMES_DIR, f"frame_{f:04d}.jpg")])
    
    filter_complex = "xstack=inputs=9:layout=0_0|w0_0|w0+w1_0|0_h0|w0_h0|w0+w1_h0|0_h0+h1|w0_h0+h1|w0+w1_h0+h1,scale=1920:1080"
    
    cmd = ["ffmpeg", "-y"] + inputs + ["-filter_complex", filter_complex, out_sheet]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    print(f"Contact sheet saved to {out_sheet}")

if __name__ == "__main__":
    extract_frames()
    build_contact_sheet()
