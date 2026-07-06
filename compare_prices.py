import pandas as pd
import re
import sys
import subprocess

def install(package):
    print(f"Installing {package}...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    import pdfplumber
except ImportError:
    install("pdfplumber")
    import pdfplumber

try:
    import openpyxl
except ImportError:
    install("openpyxl")
    import openpyxl

def parse_pdf(pdf_path):
    pdf_items = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text:
                continue
            for line in text.split('\n'):
                line = line.strip()
                if not line:
                    continue
                match = re.match(r'^([A-Z0-9\.\/\-]+)\s+(.+?)\s+(\d+\.\d{2})$', line, re.IGNORECASE)
                if match:
                    code = match.group(1).strip()
                    desc = match.group(2).strip()
                    price = float(match.group(3).strip())
                    pdf_items.append({'Product Code': code, 'PDF Description': desc, 'PDF Price': price})
    return pd.DataFrame(pdf_items)

def main():
    excel_file = r"d:\project\spm\ProductServiceList - 25_06_2026.xlsx"
    pdf_file = r"d:\project\spm\price list 29 06 26 (1).pdf"
    template_file = r"d:\project\spm\ACP_Price_Comparison.xlsx"
    
    print("Parsing PDF file...")
    pdf_df = parse_pdf(pdf_file)
    print(f"Extracted {len(pdf_df)} items from PDF.")
    
    print("Reading Source Excel file...")
    excel_df = pd.read_excel(excel_file)
    print(f"Read {len(excel_df)} rows from Excel.")
    
    # Identify code and price columns in the source excel
    code_col = None
    price_col = None
    desc_col = None
    
    for col in excel_df.columns:
        col_str = str(col).lower()
        if not code_col and any(k in col_str for k in ['code', 'item', 'sku', 'id']):
            code_col = col
        elif not price_col and any(k in col_str for k in ['price', 'rate', 'mrp', 'sale', 'amount']):
            price_col = col
        elif not desc_col and any(k in col_str for k in ['desc', 'name', 'product']):
            desc_col = col
            
    if not code_col: code_col = excel_df.columns[0]
    if not price_col: price_col = excel_df.columns[-1]
    
    # Clean excel price
    excel_clean = excel_df.copy()
    if excel_clean[price_col].dtype == 'object':
        excel_clean[price_col] = excel_clean[price_col].astype(str).str.replace(r'[^\d\.]', '', regex=True)
        excel_clean[price_col] = pd.to_numeric(excel_clean[price_col], errors='coerce')
        
    excel_clean = excel_clean.rename(columns={code_col: 'Product Code', price_col: 'Excel Price'})
    if desc_col: excel_clean = excel_clean.rename(columns={desc_col: 'Excel Description'})
    
    pdf_df['Product Code'] = pdf_df['Product Code'].astype(str).str.strip().str.upper()
    excel_clean['Product Code'] = excel_clean['Product Code'].astype(str).str.strip().str.upper()
    
    pdf_df = pdf_df.drop_duplicates(subset=['Product Code'])
    excel_clean = excel_clean.drop_duplicates(subset=['Product Code'])
    
    merged_df = pd.merge(excel_clean, pdf_df, on='Product Code', how='outer')
    merged_df['Difference'] = merged_df['Excel Price'] - merged_df['PDF Price']
    
    # Now read the template file to get the exact columns
    print(f"Reading template file to match format: {template_file}...")
    try:
        template_df = pd.read_excel(template_file)
        template_columns = list(template_df.columns)
        print(f"Template columns found: {template_columns}")
        
        # Create an empty dataframe with template columns
        final_df = pd.DataFrame(columns=template_columns)
        
        # Map our data to template columns heuristically
        for col in template_columns:
            col_lower = str(col).lower()
            if any(k in col_lower for k in ['code', 'item', 'sku']):
                final_df[col] = merged_df['Product Code']
            elif any(k in col_lower for k in ['desc', 'name', 'product']):
                if 'Excel Description' in merged_df.columns:
                    # Prefer PDF description if available, else Excel
                    final_df[col] = merged_df['PDF Description'].fillna(merged_df['Excel Description'])
                else:
                    final_df[col] = merged_df['PDF Description']
            elif any(k in col_lower for k in ['excel', 'old', 'previous', 'current']):
                final_df[col] = merged_df['Excel Price']
            elif any(k in col_lower for k in ['pdf', 'new', 'revised', 'sale']):
                final_df[col] = merged_df['PDF Price']
            elif any(k in col_lower for k in ['diff', 'var', 'change']):
                final_df[col] = merged_df['Difference']
            elif any(k in col_lower for k in ['match', 'status']):
                final_df[col] = merged_df['Excel Price'] == merged_df['PDF Price']
                
        # If heuristics completely failed, fallback to original structure
        if final_df.isna().all().all():
             print("Could not map columns automatically, falling back to default structure.")
             final_df = merged_df
    except Exception as e:
        print(f"Error reading template: {e}")
        final_df = merged_df
        
    out_file = r"d:\project\spm\Price_Comparison_Report_Formatted.xlsx"
    final_df.to_excel(out_file, index=False)
    print(f"Formatted report successfully saved to: {out_file}")

if __name__ == '__main__':
    main()
