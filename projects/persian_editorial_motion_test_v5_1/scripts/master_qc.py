import os
import subprocess
import json
from PIL import Image

SHOTS = [
    {"name": "shot01_hook", "frame": 90, "sec": 3.0},
    {"name": "shot02_problem", "frame": 270, "sec": 9.0},
    {"name": "shot03_concept", "frame": 450, "sec": 15.0},
    {"name": "shot04_data", "frame": 750, "sec": 25.0},
    {"name": "shot05_comparison", "frame": 1200, "sec": 40.0},
    {"name": "shot06_funnel", "frame": 1700, "sec": 56.6},
    {"name": "shot07_conclusion", "frame": 2200, "sec": 73.3},
]

PROJECT_ROOT = "g:/دانشگاه/کمیته تحقیقاتی/فیلم ها هفتگی/اسکیل موشن گرافیک"
RENDER_PATH = f"{PROJECT_ROOT}/projects/persian_editorial_motion_test_v5_1/renders/final.mp4"
QC_DIR = f"{PROJECT_ROOT}/projects/persian_editorial_motion_test_v5_1/qc"

def extract_keyframes_and_contact_sheet():
    os.makedirs(QC_DIR, exist_ok=True)
    if not os.path.exists(RENDER_PATH):
        print(f"Error: Render file not found: {RENDER_PATH}")
        return False

    extracted_imgs = []
    for shot in SHOTS:
        out_img = f"{QC_DIR}/{shot['name']}.jpg"
        sec = shot['sec']
        cmd = [
            "ffmpeg", "-y", "-ss", str(sec),
            "-i", RENDER_PATH,
            "-vframes", "1",
            "-q:v", "2",
            out_img
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode == 0 and os.path.exists(out_img):
            print(f"Extracted {shot['name']} at {sec}s")
            extracted_imgs.append(out_img)
        else:
            print(f"Failed to extract {shot['name']}: {res.stderr}")

    # Build Contact Sheet
    if extracted_imgs:
        images = [Image.open(p) for p in extracted_imgs]
        # 4 cols, 2 rows
        cols = 4
        rows = 2
        w, h = images[0].size
        thumb_w = w // 2 # 960
        thumb_h = h // 2 # 540

        contact = Image.new("RGB", (thumb_w * cols, thumb_h * rows), (10, 15, 30))
        for idx, img in enumerate(images):
            c = idx % cols
            r = idx // cols
            resized = img.resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
            contact.paste(resized, (c * thumb_w, r * thumb_h))

        contact_path = f"{QC_DIR}/contact_sheet_master.jpg"
        contact.save(contact_path, quality=92)
        print(f"Contact sheet saved to {contact_path}")
        return True

    return False

if __name__ == "__main__":
    extract_keyframes_and_contact_sheet()
