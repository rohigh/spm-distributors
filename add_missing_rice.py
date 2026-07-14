import json
import re

json_path = r'd:\project\spm\data\products.json'
js_path = r'd:\project\spm\js\products.js'
html_path = r'd:\project\spm\index.html'

missing_images = [
    "Kohinoor Platinum Aromatic Basmati Rice.png",
    "Malabar Choice Briyani Rice.png",
    "Tilda Easy Cook Long Grain.png",
    "Tilda Grand Extra Long Stella Basmati Rice.png",
    "Trophy Basmati Rice.png",
    "Tilda Original Basmati Rice.png"
]

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Find the Rice category
rice_cat = None
for cat in data:
    if cat.get('category') == "Rice":
        rice_cat = cat
        break

if not rice_cat:
    rice_cat = {"category": "Rice", "icon": "📦", "items": []}
    data.append(rice_cat)

import uuid

added_items = []
for img in missing_images:
    name = img.replace('.png', '')
    new_item = {
        "id": "new_rice_" + str(uuid.uuid4())[:8],
        "name": name,
        "price": 0.00,
        "unit": "pack",
        "image": f"img/processed/{img}",
        "desc": "",
        "mrp": 0.00
    }
    rice_cat['items'].append(new_item)
    added_items.append(name)

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

js_content = "const PRODUCTS_DATA = " + json.dumps(data, indent=2) + ";\n"
with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

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

print(f"Added {len(added_items)} new rice products to the site.")
