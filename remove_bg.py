import os
import glob
from rembg import remove

input_dir = r"d:\project\spm\img\new"
output_dir = r"d:\project\spm\img\processed"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

# Find all jpegs and pngs
image_files = glob.glob(os.path.join(input_dir, "*.jpeg")) + glob.glob(os.path.join(input_dir, "*.jpg")) + glob.glob(os.path.join(input_dir, "*.png"))

print(f"Found {len(image_files)} images to process.")

for img_path in image_files:
    filename = os.path.basename(img_path)
    name, ext = os.path.splitext(filename)
    
    # We save as PNG to keep the transparent background
    output_path = os.path.join(output_dir, f"{name}.png")
    
    # Skip if already processed
    if os.path.exists(output_path):
        print(f"⏭️ Skipping {filename} (already exists)")
        continue
        
    print(f"Processing: {filename}...")
    
    try:
        with open(img_path, 'rb') as i:
            with open(output_path, 'wb') as o:
                input_data = i.read()
                output_data = remove(input_data)
                o.write(output_data)
        print(f"✅ Saved clean image to {name}.png")
    except Exception as e:
        print(f"❌ Failed to process {filename}: {e}")

print("\n🎉 All done! Backgrounds removed.")
