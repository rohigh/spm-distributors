import json
import re

json_path = r'd:\project\spm\data\products.json'
js_path = r'd:\project\spm\js\products.js'
html_path = r'd:\project\spm\index.html'

images = [
    "Daawat Ponni Boiled Rice.png",
    "Kohinoor Platinum Aromatic Basmati Rice.png",
    "Malabar Choice Briyani Rice.png",
    "Tilda Easy Cook Long Grain.png",
    "Tilda Grand Extra Long Stella Basmati Rice.png",
    "Trophy Basmati Rice.png",
    "Tilda Original Basmati Rice.png"
]

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Helper to find product by name (case-insensitive partial match)
def find_and_update(img_name):
    base_name = img_name.replace('.png', '').lower()
    for cat in data:
        for item in cat.get('items', []):
            if base_name in item.get('name', '').lower():
                item['image'] = f"img/processed/{img_name}"
                return item.get('name')
    return None

updated_items = []
missing_items = []

for img in images:
    found = find_and_update(img)
    if found:
        updated_items.append(found)
    else:
        # Check if we can find them with more relaxed matching
        base = img.replace('.png', '').lower().split()
        # Find if all words are in the item name
        found_relaxed = None
        for cat in data:
            for item in cat.get('items', []):
                item_name = item.get('name', '').lower()
                if all(w in item_name for w in base):
                    item['image'] = f"img/processed/{img}"
                    found_relaxed = item.get('name')
                    break
            if found_relaxed: break
        
        if found_relaxed:
            updated_items.append(found_relaxed)
        else:
            missing_items.append(img)

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

print(f"Updated {len(updated_items)} items: {updated_items}")
if missing_items:
    print(f"Missing items not found in db: {missing_items}")
