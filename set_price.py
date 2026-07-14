import json
import re

json_path = r'd:\project\spm\data\products.json'
js_path = r'd:\project\spm\js\products.js'
html_path = r'd:\project\spm\index.html'

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

updated = False
for cat in data:
    for item in cat.get('items', []):
        if item.get('name') == "Daawat Ponni Boiled Rice":
            if item.get('price') != 13.49:
                item['price'] = 13.49
                updated = True

if updated:
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
    
    print("Price updated to 13.49")
else:
    print("Price was already 13.49")
