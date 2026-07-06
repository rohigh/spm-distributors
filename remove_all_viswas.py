import json
import csv
import os

products_json_path = r"d:\project\spm\data\products.json"
price_list_csv_path = r"d:\project\spm\price_list.csv"

# 1. Process products.json
try:
    with open(products_json_path, 'r', encoding='utf-8') as f:
        categories = json.load(f)

    json_removed = 0
    for category in categories:
        if 'items' in category:
            original_len = len(category['items'])
            # Keep items that DO NOT have "viswas" in their name or image URL
            category['items'] = [
                item for item in category['items'] 
                if "viswas" not in item.get("name", "").lower() and "viswas" not in item.get("image", "").lower()
            ]
            json_removed += (original_len - len(category['items']))

    with open(products_json_path, 'w', encoding='utf-8') as f:
        json.dump(categories, f, indent=2)
    print(f"Removed {json_removed} Viswas items from products.json")
except Exception as e:
    print(f"Error processing products.json: {e}")

# 2. Process price_list.csv
try:
    if os.path.exists(price_list_csv_path):
        with open(price_list_csv_path, 'r', encoding='utf-8', newline='') as f:
            reader = csv.reader(f)
            rows = list(reader)
        
        csv_removed = 0
        filtered_rows = []
        for row in rows:
            # Check if any column contains "viswas"
            if any("viswas" in str(col).lower() for col in row) or any("vis " in str(col).lower() for col in row):
                csv_removed += 1
            else:
                filtered_rows.append(row)
                
        with open(price_list_csv_path, 'w', encoding='utf-8', newline='') as f:
            writer = csv.writer(f)
            writer.writerows(filtered_rows)
        print(f"Removed {csv_removed} Viswas rows from price_list.csv")
except Exception as e:
    print(f"Error processing price_list.csv: {e}")

print("Done! Viswas products have been cleared.")
