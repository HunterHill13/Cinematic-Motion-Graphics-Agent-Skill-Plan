import os
import shutil
import urllib.request
import zipfile

REPOS = [
    {
        "name": "motion-graphics-skills",
        "url_main": "https://codeload.github.com/imMamdouhaboammar/motion-graphics-skills/zip/refs/heads/main",
        "url_master": "https://codeload.github.com/imMamdouhaboammar/motion-graphics-skills/zip/refs/heads/master",
    },
    {
        "name": "hyperframes",
        "url_main": "https://codeload.github.com/heygen-com/hyperframes/zip/refs/heads/main",
        "url_master": "https://codeload.github.com/heygen-com/hyperframes/zip/refs/heads/master",
    },
    {
        "name": "chief-motion-skill",
        "url_main": "https://codeload.github.com/CodeBreaker02/chief-motion-skill/zip/refs/heads/main",
        "url_master": "https://codeload.github.com/CodeBreaker02/chief-motion-skill/zip/refs/heads/master",
    },
    {
        "name": "remotion-motion-graphics-skill",
        "url_main": "https://codeload.github.com/fernandokaraka/remotion-motion-graphics-skill/zip/refs/heads/main",
        "url_master": "https://codeload.github.com/fernandokaraka/remotion-motion-graphics-skill/zip/refs/heads/master",
    },
]

RESEARCH_DIR = os.path.abspath("_research")
os.makedirs(RESEARCH_DIR, exist_ok=True)

headers = {"User-Agent": "Mozilla/5.0"}

for repo in REPOS:
    name = repo["name"]
    target_dir = os.path.join(RESEARCH_DIR, name)
    zip_path = os.path.join(RESEARCH_DIR, f"{name}.zip")
    
    print(f"--- Fetching {name} ---")
    
    # Try main first, then master
    downloaded = False
    for url in [repo["url_main"], repo["url_master"]]:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=30) as resp, open(zip_path, "wb") as out:
                shutil.copyfileobj(resp, out)
            downloaded = True
            print(f"Downloaded from {url}")
            break
        except Exception as e:
            print(f"Failed {url}: {e}")
            
    if not downloaded:
        print(f"ERROR: Could not download {name}")
        continue
        
    # Extract
    if os.path.exists(target_dir):
        shutil.rmtree(target_dir)
        
    temp_extract = os.path.join(RESEARCH_DIR, f"temp_{name}")
    if os.path.exists(temp_extract):
        shutil.rmtree(temp_extract)
        
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(temp_extract)
        
    # Inside temp_extract, there is usually a single folder like name-main or name-master
    extracted_items = os.listdir(temp_extract)
    if len(extracted_items) == 1 and os.path.isdir(os.path.join(temp_extract, extracted_items[0])):
        inner_dir = os.path.join(temp_extract, extracted_items[0])
        shutil.move(inner_dir, target_dir)
        shutil.rmtree(temp_extract)
    else:
        shutil.move(temp_extract, target_dir)
        
    if os.path.exists(zip_path):
        os.remove(zip_path)
        
    print(f"Successfully unpacked {name} to {target_dir}")

print("All reference repositories downloaded and extracted successfully.")
