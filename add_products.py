import json
import re
import hashlib

with open(r'd:\project\spm\js\products.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract JSON
match = re.search(r'const PRODUCTS_DATA = (\[.*\]);', content, re.DOTALL)
if not match:
    print("Could not find PRODUCTS_DATA")
    exit(1)

data_json = match.group(1)
data = json.loads(data_json)

new_products = [
    # Processed images
    {"name": "BRAHMINS ASAFOETIDA 50 G", "price": 2.37, "unit": "pack", "image": "img/processed/brahmins_asafoetida_1783346320009.png", "desc": "", "mrp": 2.37},
    {"name": "BRAHMINS BLACK GRAM 500 G", "price": 2.38, "unit": "pack", "image": "img/processed/brahmins_black_gram_1783346332878.png", "desc": "", "mrp": 2.38},
    {"name": "BRAHMINS GINGER GARLIC PASTE 100 G", "price": 1.25, "unit": "pack", "image": "img/processed/brahmins_ginger_garlic_paste_1783346342848.png", "desc": "", "mrp": 1.25},
    {"name": "BRAHMINS RED LENTILS (MASOOR DAL)500 G", "price": 1.75, "unit": "pack", "image": "img/processed/brahmins_red_lentils_1783346355677.png", "desc": "", "mrp": 1.75},
    {"name": "BRAHMINS SPLIT CHICKPEAS 500 G", "price": 1.89, "unit": "pack", "image": "img/processed/brahmins_split_chickpeas_1783346377840.png", "desc": "", "mrp": 1.89},
    {"name": "KT PALAKKADAN MATTA RICE 10 KG", "price": 19.59, "unit": "pack", "image": "img/processed/kerala_taste_palakkadan_matta_rice_1783346390894.png", "desc": "", "mrp": 19.59},
    {"name": "NIRU PLAIN APPALAM (MADRAS PAPPADOM) 100 G", "price": 1.19, "unit": "pack", "image": "img/processed/niru_poppadom_1783346402717.png", "desc": "", "mrp": 1.19},
    {"name": "TATA SALT 1KG", "price": 1.54, "unit": "pack", "image": "img/processed/tata_salt_1783346414921.png", "desc": "", "mrp": 1.54},
    {"name": "THEKKANS CHICK PEAS WHITE 500G", "price": 2.37, "unit": "pack", "image": "img/processed/thekkans_chick_peas_white_1783346435189.png", "desc": "", "mrp": 2.37},
    {"name": "THEKKANS CHICK PEAS BROWN 500 G", "price": 1.75, "unit": "pack", "image": "img/processed/thekkans_chickpeas_brown_1783346446925.png", "desc": "", "mrp": 1.75},
    {"name": "THEKKANS COCONUT OIL ROASTED 1 LTR", "price": 6.29, "unit": "pack", "image": "img/processed/thekkans_coconut_oil_1783346458700.png", "desc": "", "mrp": 6.29},
    {"name": "THEKKANS GARCINIA CAMBOGIA (KUDAMPULI) 200G", "price": 3.63, "unit": "pack", "image": "img/processed/thekkans_garcinia_cambogia_1783346471333.png", "desc": "", "mrp": 3.63},
    {"name": "THEKKANS IDLY RICE 1 KG", "price": 2.23, "unit": "pack", "image": "img/processed/thekkans_idly_rice_1783346492184.png", "desc": "", "mrp": 2.23},
    {"name": "THEKKANS MAIDA 1 KG", "price": 1.82, "unit": "pack", "image": "img/processed/thekkans_maida_1783346506781.png", "desc": "", "mrp": 1.82},
    {"name": "THEKKANS RAGI WHOLE 500G", "price": 1.19, "unit": "pack", "image": "img/processed/thekkans_ragi_whole_1783346516293.png", "desc": "", "mrp": 1.19},
    {"name": "THEKKANS RIBBON ADA 200 G", "price": 1.95, "unit": "pack", "image": "img/processed/thekkans_ribbon_ada_1783346527857.png", "desc": "", "mrp": 1.95},
    {"name": "THEKKANS TOOR DAL 500 G", "price": 2.09, "unit": "pack", "image": "img/processed/thekkans_toor_dal_1783346538084.png", "desc": "", "mrp": 2.09},

    # WhatsApp images without images for now
    {"name": "DH IDLI RAVA 1 KG", "price": 3.22, "unit": "pack", "image": "", "desc": "", "mrp": 3.22},
    {"name": "MELAM EASY IDILI MIX 1 KG", "price": 3.63, "unit": "pack", "image": "", "desc": "", "mrp": 3.63},
    {"name": "TN APM IDYPM PTHIRI R/RFLOUR 1 KG", "price": 3.43, "unit": "pack", "image": "", "desc": "", "mrp": 3.43},
    {"name": "MELAM PUTTU PODI 1KG", "price": 3.21, "unit": "pack", "image": "", "desc": "", "mrp": 3.21},
    {"name": "MELAM CHEMBA PUTTU PODI 1 KG", "price": 3.21, "unit": "pack", "image": "", "desc": "", "mrp": 3.21},
    {"name": "KT ACHAPPAM 150 G", "price": 2.17, "unit": "pack", "image": "", "desc": "", "mrp": 2.17, "cat": "Snacks"},
    {"name": "DH ROASTED VERMICELLI 500 G", "price": 1.82, "unit": "pack", "image": "", "desc": "", "mrp": 1.82},
    {"name": "KT BANANA CHIPS 200 G", "price": 2.51, "unit": "pack", "image": "", "desc": "", "mrp": 2.51, "cat": "Snacks"},
    {"name": "TN ALL PURPOSE WHITE R/P 1KG", "price": 2.87, "unit": "pack", "image": "", "desc": "", "mrp": 2.87},
    {"name": "KT RASAM POWDER 200G", "price": 2.17, "unit": "pack", "image": "", "desc": "", "mrp": 2.17},
    {"name": "KT CHICKEN FRY MASALA 200G", "price": 2.65, "unit": "pack", "image": "", "desc": "", "mrp": 2.65},
    {"name": "KT ROASTED MASALA PEANUT 200 G", "price": 2.38, "unit": "pack", "image": "", "desc": "", "mrp": 2.38, "cat": "Snacks"},
    {"name": "KT EGG ROAST MASALA 200G", "price": 2.59, "unit": "pack", "image": "", "desc": "", "mrp": 2.59},
    {"name": "KT SAMBAR POWDER 200 G", "price": 2.37, "unit": "pack", "image": "", "desc": "", "mrp": 2.37},
    {"name": "KT MEAT MASALA 200G", "price": 2.59, "unit": "pack", "image": "", "desc": "", "mrp": 2.59},
    {"name": "KT GARAM MASALA 200 G", "price": 2.87, "unit": "pack", "image": "", "desc": "", "mrp": 2.87},
    {"name": "KT BEEF ULARTHU MASALA 200 G", "price": 2.73, "unit": "pack", "image": "", "desc": "", "mrp": 2.73},
    {"name": "KT BIRIYANI MASALA 200 G", "price": 3.15, "unit": "pack", "image": "", "desc": "", "mrp": 3.15},
    {"name": "KT MUTTON MASALA 200G", "price": 2.59, "unit": "pack", "image": "", "desc": "", "mrp": 2.59},

    # New 11 items
    {"name": "KT PULINJI PICKLE", "price": 2.59, "unit": "pack", "image": "", "desc": "", "mrp": 2.59},
    {"name": "KT CUT MANGO PICKLE", "price": 2.59, "unit": "pack", "image": "", "desc": "", "mrp": 2.59},
    {"name": "KT LIME PICKLE", "price": 2.59, "unit": "pack", "image": "", "desc": "", "mrp": 2.59},
    {"name": "KT HOT & SWEET PICKLE", "price": 2.59, "unit": "pack", "image": "", "desc": "", "mrp": 2.59},
    {"name": "KT FISH PICKLE", "price": 3.15, "unit": "pack", "image": "", "desc": "", "mrp": 3.15},
    {"name": "KT DATES PICKLE", "price": 2.59, "unit": "pack", "image": "", "desc": "", "mrp": 2.59},
    {"name": "KT GOOSEBERRY PICKLE", "price": 2.59, "unit": "pack", "image": "", "desc": "", "mrp": 2.59},
    {"name": "KT PRAWN PICKLE", "price": 3.15, "unit": "pack", "image": "", "desc": "", "mrp": 3.15},
    {"name": "MELAM EASY DOSA MIX 1KG", "price": 3.63, "unit": "pack", "image": "", "desc": "", "mrp": 3.63},
    {"name": "KT SPICY KERALA MIXTURE", "price": 2.51, "unit": "pack", "image": "", "desc": "", "mrp": 2.51, "cat": "Snacks"},
    {"name": "DH ROASTED RAGI POWDER 1KG", "price": 3.22, "unit": "pack", "image": "", "desc": "", "mrp": 3.22}
]

groceries_items = None
snacks_items = None

for cat in data:
    if cat['category'] == 'Groceries':
        groceries_items = cat['items']
    elif cat['category'] == 'Snacks':
        snacks_items = cat['items']
        
if snacks_items is None:
    snacks_items = groceries_items # fallback

for p in new_products:
    item = p.copy()
    c = item.pop("cat", "Groceries")
    item['id'] = "new_" + hashlib.md5(item['name'].encode()).hexdigest()[:10]
    
    if c == "Snacks":
        snacks_items.insert(0, item)
    else:
        groceries_items.insert(0, item)

new_json = json.dumps(data, indent=2)
new_content = content[:match.start(1)] + new_json + content[match.end(1):]

with open(r'd:\project\spm\js\products.js', 'w', encoding='utf-8') as f:
    f.write(new_content)
    
print("Added 47 new products to products.js!")
