import json
import re

json_path = r'd:\project\spm\data\products.json'
js_path = r'd:\project\spm\js\products.js'
html_path = r'd:\project\spm\index.html'

unpriced_items = [
    "Kohinoor Platinum Aromatic Basmati Rice",
    "Malabar Choice Briyani Rice",
    "Tilda Easy Cook Long Grain",
    "Tilda Grand Extra Long Stella Basmati Rice",
    "Trophy Basmati Rice",
    "Tilda Original Basmati Rice"
]

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

removed_count = 0
for cat in data:
    if cat.get('category') == "Rice":
        original_len = len(cat.get('items', []))
        cat['items'] = [item for item in cat.get('items', []) if item.get('name') not in unpriced_items]
        removed_count += original_len - len(cat['items'])

if removed_count > 0:
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
    
    print(f"Removed {removed_count} unpriced items.")
else:
    print("No items were removed.")
