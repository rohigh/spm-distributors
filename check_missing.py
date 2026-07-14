import csv
import json

js_file = r'd:\project\spm\js\products.js'
csv_file = r'd:\project\spm\products.csv'

with open(js_file, 'r', encoding='utf-8') as f:
    js_content = f.read()

# very rudimentary parsing of the JS file which contains an object. 
# Better yet, let's just search for the product names in the js file text.
import re

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    next(reader) # skip header
    for i, row in enumerate(reader):
        if not row or not row[0].strip():
            continue
        name = row[0].strip()
        in_stock = row[2].strip().lower()
        if in_stock == 'yes':
            # Check if name is in js_content
            # To be safe, let's just do a simple substring check.
            if name not in js_content:
                print(f"Line {i+2}: '{name}' is marked 'yes' but not found in products.js")
