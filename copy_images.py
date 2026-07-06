import shutil
import os
import glob

source_dir = r"C:\Users\17six\.gemini\antigravity-ide\brain\9effe51b-698e-4d51-91d8-f6fc9bb6853c"
dest_dir = r"d:\project\spm\img\processed"

os.makedirs(dest_dir, exist_ok=True)
png_files = glob.glob(os.path.join(source_dir, "*.png"))

for file_path in png_files:
    shutil.copy(file_path, dest_dir)
    print(f"Copied {os.path.basename(file_path)} to {dest_dir}")

print("All images copied successfully!")
