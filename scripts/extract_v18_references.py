import os
import shutil
import zipfile
import sys
import stat

sys.stdout.reconfigure(encoding='utf-8')

def remove_readonly(func, path, exc_info):
    try:
        os.chmod(path, stat.S_IWRITE)
        func(path)
    except Exception as e:
        pass

RESEARCH_DIR = os.path.abspath("_research")

ZIPS = [
    ("chief-motion-skill", "chief-motion-skill.zip"),
    ("remotion-motion-graphics-skill", "remotion-motion-graphics-skill.zip"),
    ("hyperframes", "hyperframes.zip"),
    ("motion-graphics-skills", "motion-graphics-skills.zip"),
]

for target_name, zip_filename in ZIPS:
    target_dir = os.path.join(RESEARCH_DIR, target_name)
    if target_name in ["chief-motion-skill", "remotion-motion-graphics-skill", "hyperframes"] and os.path.exists(target_dir):
        print(f"Already extracted: {target_name}")
        continue

    zip_path = os.path.join(RESEARCH_DIR, zip_filename)
    temp_dir = os.path.join(RESEARCH_DIR, f"temp_{target_name}")

    if not os.path.exists(zip_path):
        print(f"Skipping {zip_filename}: not found.")
        continue

    print(f"Extracting {zip_filename}...")
    if os.path.exists(temp_dir):
        shutil.rmtree(temp_dir, onerror=remove_readonly)
    if os.path.exists(target_dir):
        shutil.rmtree(target_dir, onerror=remove_readonly)

    with zipfile.ZipFile(zip_path, 'r') as z:
        z.extractall(temp_dir)

    items = os.listdir(temp_dir)
    if len(items) == 1 and os.path.isdir(os.path.join(temp_dir, items[0])):
        inner = os.path.join(temp_dir, items[0])
        shutil.move(inner, target_dir)
        shutil.rmtree(temp_dir, onerror=remove_readonly)
    else:
        shutil.move(temp_dir, target_dir)

    print(f"Successfully extracted {target_name}")

print("Extraction complete.")
