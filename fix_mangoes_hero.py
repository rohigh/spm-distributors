import json
import re

json_path = r'd:\project\spm\data\products.json'
js_path = r'd:\project\spm\js\products.js'
html_path = r'd:\project\spm\index.html'

# --- UPDATE HTML ---
with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# Remove the slide
html_content = re.sub(
    r'\s*<!-- Slide 2: Mangoes Promo -->.*?</div>\s*</div>\s*</div>',
    '',
    html_content,
    flags=re.DOTALL
)

# Update slider dots
dots_replacement = '''    <div class="slider-dots" id="slider-dots">
      <span class="dot active" data-slide="0"></span>
      <span class="dot" data-slide="1"></span>
    </div>'''
html_content = re.sub(
    r'<div class="slider-dots" id="slider-dots">.*?</div>',
    dots_replacement,
    html_content,
    flags=re.DOTALL
)

# Bump version
def bump_version(match):
    prefix = match.group(1)
    version = int(match.group(2))
    return f"{prefix}{version + 1}"
html_content = re.sub(r'(products\.js\?v=)(\d+)', bump_version, html_content)
html_content = re.sub(r'(style\.css\?v=)(\d+)', bump_version, html_content)
html_content = re.sub(r'(app\.js\?v=)(\d+)', bump_version, html_content)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_content)


# --- UPDATE JSON/JS ---
with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

removed_count = 0
for cat in data:
    if 'items' in cat:
        original_len = len(cat['items'])
        cat['items'] = [item for item in cat['items'] if 'mango' not in item.get('name', '').lower()]
        removed_count += original_len - len(cat['items'])

# Add Mangoes to Fruits
fruits_cat = next((c for c in data if c.get('category') == 'Fruits'), None)
import uuid

new_mango = {
    "id": "new_mango_" + str(uuid.uuid4())[:8],
    "name": "Mangoes",
    "price": 11.99,
    "unit": "pack",
    "image": "img/kesar.jpeg", # fallback to existing image
    "desc": "",
    "mrp": 11.99
}

if fruits_cat:
    fruits_cat['items'].append(new_mango)
else:
    data.append({
        "category": "Fruits",
        "icon": "📦",
        "items": [new_mango]
    })

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

js_content = "const PRODUCTS_DATA = " + json.dumps(data, indent=2) + ";\n"
with open(js_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Removed {removed_count} mango varieties and added single 'Mangoes'. Updated HTML.")
