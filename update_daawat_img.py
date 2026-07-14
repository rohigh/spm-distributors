import json
import shutil
import re

# File paths
src_img = r'C:\Users\17six\.gemini\antigravity-ide\brain\ddcfaad8-1c27-469b-8da6-b82899092fb9\daawat_10kg_sona_masoori_1784056155004.png'
dst_img = r'd:\project\spm\img\new\Daawat-10kg-Sona-Masoori-gen.png'
json_path = r'd:\project\spm\data\products.json'
js_path = r'd:\project\spm\js\products.js'
html_path = r'd:\project\spm\index.html'

# Copy image
try:
    shutil.copyfile(src_img, dst_img)
    print("Image copied successfully.")
except Exception as e:
    print(f"Error copying image: {e}")

# Update JSON
with open(json_path, 'r', encoding='utf-8') as f:
    products_data = json.load(f)

for category in products_data:
    for item in category.get('items', []):
        if item.get('name') == "Daawat Sona Masoori Rice":
            item['image'] = "img/new/Daawat-10kg-Sona-Masoori-gen.png"
            item['price'] = 12.99
            item['mrp'] = 15.00
            print("Updated item in JSON.")

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(products_data, f, indent=2)

# Update JS
js_content = "const PRODUCTS_DATA = " + json.dumps(products_data, indent=2) + ";\n"
with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js_content)
print("Updated JS file.")

# Update HTML version
with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

def bump_version(match):
    prefix = match.group(1)
    version = int(match.group(2))
    return f"{prefix}{version + 1}"

html_content = re.sub(r'(products\.js\?v=)(\d+)', bump_version, html_content)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_content)
print("Bumped cache version in HTML.")

