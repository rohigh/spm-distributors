const PRODUCTS_DATA = [
  {
    "category": "Fresh Boxes",
    "icon": "\ud83d\udce6",
    "items": [
      {
        "id": "box_veg_egg_01",
        "name": "Veg and Fruit Box with 6 Class A Eggs",
        "price": 20.0,
        "unit": "box",
        "image": "veg box with eggs.jpeg",
        "desc": "<strong>Includes:</strong><ul style='margin-top:8px; padding-left:20px; line-height:1.6;'><li>6 Class A Eggs</li><li>Bananas</li><li>Blueberries</li><li>Cauliflower</li><li>Melon</li><li>Lettuce</li><li>Loose Potatoes</li><li>Cucumbers</li><li>Green Apples</li><li>Oranges</li><li>Spring Onions</li><li>Tomatoes</li></ul>",
        "mrp": 20.0
      },
      {
        "id": "box_fruit_02",
        "name": "Fruit Box",
        "price": 20.0,
        "unit": "box",
        "image": "fruit box.jpeg",
        "desc": "<strong>Includes:</strong><ul style='margin-top:8px; padding-left:20px; line-height:1.6;'><li>Bananas</li><li>Blueberries</li><li>Green Pears</li><li>Honeydew Melon</li><li>Oranges</li><li>Pineapple</li><li>Red Gala Apple</li><li>Strawberries</li><li>Cantaloupe</li><li>Plums</li></ul>",
        "mrp": 20.0
      },
      {
        "id": "box_family_03",
        "name": "Family Box",
        "price": 30.0,
        "unit": "box",
        "image": "family box.jpeg",
        "desc": "<div style='display:flex; flex-wrap:wrap; gap:20px;'><div style='flex:1; min-width:200px;'><strong>\ud83e\udd55 Vegetables</strong><ul style='margin-top:8px; padding-left:20px; line-height:1.6;'><li>2kg Standard Loose Potatoes</li><li>Broccoli (~300g)</li><li>Cauliflower (~800g)</li><li>1kg Onions</li><li>1kg Sweet Potatoes</li><li>1kg New Potatoes</li><li>1kg Tomatoes</li><li>Cherry Tomatoes (~500g)</li><li>1 Lettuce</li><li>1 Cucumber</li><li>Mushrooms (~500g)</li><li>2 Leeks</li></ul></div><div style='flex:1; min-width:200px;'><strong>\ud83c\udf4e Fruit</strong><ul style='margin-top:8px; padding-left:20px; line-height:1.6;'><li>1kg Bananas</li><li>1kg Green Apples</li><li>1kg Pears</li></ul><br><strong>\ud83e\udd5a Eggs</strong><ul style='margin-top:8px; padding-left:20px; line-height:1.6;'><li>15 Free Range Eggs</li></ul></div></div>",
        "mrp": 30.0
      },
      {
        "id": "deal_freerange_egg_30",
        "name": "30 Free Range Eggs",
        "price": 10.0,
        "unit": "pack",
        "image": "free_range_eggs.png",
        "desc": "",
        "mrp": 10.0
      },
      {
        "id": "deal_classa_egg_30",
        "name": "30 Class A Caged Eggs",
        "price": 7.0,
        "unit": "pack",
        "image": "caged_eggs.png",
        "desc": "",
        "mrp": 7.0
      }
    ]
  },
  {
    "category": "Groceries",
    "icon": "\ud83d\udce6",
    "items": [
      {
        "id": "6a038df684e6de290d44c0d8",
        "name": "Everest Paneer",
        "price": 2.29,
        "unit": "gram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/48f63d3b45806d3f_Paneer.jpg?width=300",
        "desc": "",
        "mrp": 2.29
      },
      {
        "id": "69f3c07384e6de290d25c9d2",
        "name": "Aashirwad Multi grain Atta 5kg",
        "price": 8.99,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/05c9bf1cd9072809_Aashirwad-Multi-grain-5kg.jpg?width=300",
        "desc": "",
        "mrp": 11
      },
      {
        "id": "69f3c05184e6de290d25c775",
        "name": "Aashirwad whole wheat 5kg",
        "price": 8.99,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/c1a6226945a040da_Aashirwad-Whole-Wheat-10kg.jpg?width=300",
        "desc": "",
        "mrp": 11
      },
      {
        "id": "69f3c03184e6de290d25c51d",
        "name": "TRS Green Gram 1kg ( Cherupayar  Whole)",
        "price": 2.3,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/6a6ff04bb2446dfb_TRS-Green-Gram-1kg.jpg?width=300",
        "desc": "",
        "mrp": 2.49
      },
      {
        "id": "69f3beb284e6de290d25aa83",
        "name": "Shankar UnRoasted Rava 1kg",
        "price": 2.89,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/9ea0831e28eea242_Shankar-Unroasted-Rava-1kg.jpg?width=300",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "69f3be9584e6de290d25a8af",
        "name": "Shankar Roasted Rava 1kg",
        "price": 2.89,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/9f235d5bb0bae492_Shankar-Roasted-Rava-1kg.jpg?width=300",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "69f3bab484e6de290d2558e6",
        "name": "TRS Red Peanuts 1.5kg",
        "price": 6.49,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/fe04a87b7f2a1d44_TRS-Red-Peanuts-1.5kg.jpg?width=300",
        "desc": "",
        "mrp": 6.99
      },
      {
        "id": "69f3ba2a84e6de290d254b60",
        "name": "Coconut Milk (Natco) 400ml",
        "price": 1.1,
        "unit": "mililitre",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/ce0bce691d8e85f7_Coconut-Milk-(Natco)-400ml.jpg?width=300",
        "desc": "",
        "mrp": 1.1
      },
      {
        "id": "69f3b9be84e6de290d254468",
        "name": "Aashirwad whole wheat 10kg",
        "price": 14.49,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/e8301b3c86d9c674_Aashirwad-whole-wheat-10kg.jpg?width=300",
        "desc": "",
        "mrp": 16
      },
      {
        "id": "acp_2",
        "name": "KITCHEN TREASURES (KTS) CHICKEN MASALA 200 GM",
        "price": 2.69,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) CHICKEN MASALA 200 GM.webp",
        "desc": "",
        "mrp": 2.69
      },
      {
        "id": "acp_3",
        "name": "KITCHEN TREASURES (KTS) MEAT MASALA 200 GM",
        "price": 2.69,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/products/MeatMasalanewlogo.jpg?v=1655969347",
        "desc": "",
        "mrp": 2.69
      },
      {
        "id": "acp_4",
        "name": "KITCHEN TREASURES (KTS) FISH MASALA 200 GM",
        "price": 2.69,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) FISH MASALA 200 GM.png",
        "desc": "",
        "mrp": 2.69
      },
      {
        "id": "acp_5",
        "name": "KITCHEN TREASURES (KTS) SAMBAR POWDER 200 GM",
        "price": 2.69,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/products/KT-SambarPowder-200g-Fn.jpg?v=1655969720",
        "desc": "",
        "mrp": 2.69
      },
      {
        "id": "acp_6",
        "name": "KITCHEN TREASURES (KTS) RASAM POWDER 200 GM",
        "price": 2.69,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) RASAM POWDER 200 GM.png",
        "desc": "",
        "mrp": 2.69
      },
      {
        "id": "acp_7",
        "name": "KITCHEN TREASURES (KTS) GARAM MASALA 100 GM",
        "price": 2.49,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) GARAM MASALA 100 GM.png",
        "desc": "",
        "mrp": 2.49
      },
      {
        "id": "acp_8",
        "name": "KITCHEN TREASURES (KTS) FISH FRY MASALA 100 GM",
        "price": 1.99,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/products/FishfryMasalaanewlogoncolorchangecurved.jpg?v=1655970363",
        "desc": "",
        "mrp": 1.99
      },
      {
        "id": "acp_9",
        "name": "KITCHEN TREASURES (KTS) CHICKEN FRY MASALA 100 GM",
        "price": 1.99,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/products/100gChickenFryFINALCURVEDfopnaddrscorctionscmykconversion.jpg?v=1655970245",
        "desc": "",
        "mrp": 1.99
      },
      {
        "id": "acp_10",
        "name": "KITCHEN TREASURES (KTS) BIRIYANI MASALA 100 GM",
        "price": 1.99,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) BIRIYANI MASALA 100 GM.png",
        "desc": "",
        "mrp": 1.99
      },
      {
        "id": "acp_11",
        "name": "KITCHEN TREASURES (KTS) CHANA MASALA 100 GM",
        "price": 1.99,
        "unit": "nounit",
        "image": "",
        "desc": "",
        "mrp": 1.99
      },
      {
        "id": "acp_12",
        "name": "KITCHEN TREASURES (KTS) CORIANDER POWDER 400 GM",
        "price": 3.29,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) CORIANDER POWDER 400 GM.png",
        "desc": "",
        "mrp": 3.29
      },
      {
        "id": "acp_13",
        "name": "KITCHEN TREASURES (KTS) TURMERIC POWDER 400 GM",
        "price": 4.09,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) TURMERIC POWDER 400 GM.png",
        "desc": "",
        "mrp": 4.09
      },
      {
        "id": "acp_14",
        "name": "KITCHEN TREASURES (KTS) RED CHILLI POWDER 400 GM",
        "price": 5.29,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/files/97B5DD3A-863E-4D32-8E1A-665B90F26CDE.jpg?v=1695581464",
        "desc": "",
        "mrp": 5.29
      },
      {
        "id": "acp_15",
        "name": "KITCHEN TREASURES (KTS) KASHMIRI CHILLI POWDER 400 GM",
        "price": 6.79,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/products/kashmirichilli1kg_f69e2815-ef7e-4e94-aed2-961e7f5c6b01.jpg?v=1656005420",
        "desc": "",
        "mrp": 6.79
      },
      {
        "id": "acp_16",
        "name": "KITCHEN TREASURES (KTS) FENNUGREEK SEED 250 GM",
        "price": 1.89,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) FENNUGREEK SEED 250 GM.png",
        "desc": "",
        "mrp": 1.89
      },
      {
        "id": "acp_17",
        "name": "KITCHEN TREASURES (KTS) CUMIN WHOLE 200 GM",
        "price": 3.29,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) CUMIN WHOLE 200 GM.jpg",
        "desc": "",
        "mrp": 3.29
      },
      {
        "id": "acp_18",
        "name": "KITCHEN TREASURES (KTS) GARAM WHOLE 100 GM",
        "price": 3.29,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) GARAM WHOLE 100 GM.jpg",
        "desc": "",
        "mrp": 3.29
      },
      {
        "id": "acp_26",
        "name": "KITCHEN TREASURES (KTS) PUTTU PODI WHITE 1 KG",
        "price": 2.79,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/products/PuttuPodi.jpg?v=1655972485",
        "desc": "",
        "mrp": 2.79
      },
      {
        "id": "acp_27",
        "name": "KITCHEN TREASURES (KTS) CHEMBA PUTTU PODI 1 KG",
        "price": 3.29,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/products/chembaputtupodi.jpg?v=1657534933",
        "desc": "",
        "mrp": 3.29
      },
      {
        "id": "acp_28",
        "name": "KITCHEN TREASURES (KTS) RAGI PUTTU PODI 1 KG",
        "price": 3.29,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/products/RagiPuttuPodiPack.jpg?v=1655971682",
        "desc": "",
        "mrp": 3.29
      },
      {
        "id": "acp_29",
        "name": "KITCHEN TREASURES (KTS) CORN PUTTU PODI 1 KG",
        "price": 3.29,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/products/CornPuttuPodiPack.jpg?v=1655971550",
        "desc": "",
        "mrp": 3.29
      },
      {
        "id": "acp_30",
        "name": "KITCHEN TREASURES (KTS) WHEAT PUTTU PODI 1 KG",
        "price": 3.49,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) WHEAT PUTTU PODI 1 KG.avif",
        "desc": "",
        "mrp": 3.49
      },
      {
        "id": "acp_31",
        "name": "KITCHEN TREASURES (KTS) DOSA POWDER 1 KG",
        "price": 3.49,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/products/IMG_2693.jpg?v=1670400128",
        "desc": "",
        "mrp": 3.49
      },
      {
        "id": "acp_32",
        "name": "KITCHEN TREASURES (KTS) IDLY POWDER 1 KG",
        "price": 3.49,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) IDLY POWDER 1 KG.webp",
        "desc": "",
        "mrp": 3.49
      },
      {
        "id": "acp_33",
        "name": "KITCHEN TREASURES (KTS) EASY PALAPPAM 1 KG",
        "price": 3.19,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) EASY PALAPPAM 1 KG.webp",
        "desc": "",
        "mrp": 3.19
      },
      {
        "id": "acp_34",
        "name": "KITCHEN TREASURES (KTS) APPAM IDIYAPPAM POWDER 1 KG",
        "price": 2.79,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/products/AppamIdiyappam_1.jpg?v=1655971390",
        "desc": "",
        "mrp": 2.79
      },
      {
        "id": "acp_35",
        "name": "KITCHEN TREASURES (KTS) ROASTED RAVA 1 KG",
        "price": 3.19,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/files/RoastedUpmaRava_400x_58dc6c86-a52b-4346-96ad-cc445241913c.jpg?v=1753082003",
        "desc": "",
        "mrp": 3.19
      },
      {
        "id": "acp_36",
        "name": "KITCHEN TREASURES (KTS) MALABAR PATHIRI PODI 1 KG",
        "price": 2.79,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) MALABAR PATHIRI PODI 1 KG.jpg",
        "desc": "",
        "mrp": 2.79
      },
      {
        "id": "acp_38",
        "name": "KITCHEN TREASURES (KTS) GURUVAYOOR PAPPADAM 150 GM",
        "price": 1.69,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/files/CC614C23-9720-41E3-B053-2A101A6F83E2.jpg?v=1699996539",
        "desc": "",
        "mrp": 1.69
      },
      {
        "id": "acp_39",
        "name": "KITCHEN TREASURES (KTS) TAMARIND 200 GM",
        "price": 1.49,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) TAMARIND 200 GM.jpg",
        "desc": "",
        "mrp": 1.49
      },
      {
        "id": "acp_40",
        "name": "KITCHEN TREASURES (KTS) ASEFOETIDA 50 GM",
        "price": 2.09,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/files/ktasf.jpg?v=1769793300",
        "desc": "",
        "mrp": 2.09
      },
      {
        "id": "acp_50",
        "name": "JACME DRY (JK) NADAN KAAPPI PODI 200GM",
        "price": 4.69,
        "unit": "nounit",
        "image": "",
        "desc": "",
        "mrp": 4.69
      },
      {
        "id": "acp_51",
        "name": "GRANDMA'S FROZEN GRATED COCONUT   ( BUY TWO GET ONE FREE) 400GM",
        "price": 3.19,
        "unit": "nounit",
        "image": "GRANDMA'S FROZEN GRATED COCONUT ( BUY TWO GET ONE FREE) 400GM.png",
        "desc": "",
        "mrp": 3.19
      },
      {
        "id": "acp_52",
        "name": "GRANDMA'S FROZEN TAPIOCA SLICED      (BUY ONE GET ONE FREE) 908GM",
        "price": 2.79,
        "unit": "nounit",
        "image": "GRANDMA'S FROZEN TAPIOCA SLICED (BUY ONE GET ONE FREE) 908GM.webp",
        "desc": "",
        "mrp": 2.79
      },
      {
        "id": "acp_53",
        "name": "GRANDMA'S FROZEN TAPIOCA WHOLE     (BUY ONE GET ONE FREE) 908GM",
        "price": 2.79,
        "unit": "nounit",
        "image": "",
        "desc": "",
        "mrp": 2.79
      },
      {
        "id": "new_6",
        "name": "TRS Chanadall 2kg",
        "price": 5.49,
        "unit": "nounit",
        "image": "TRS Chanadall 2kg.webp",
        "desc": "",
        "mrp": 5.49
      },
      {
        "id": "new_7",
        "name": "TRS Red Lentills 2kg",
        "price": 3.99,
        "unit": "nounit",
        "image": "TRS Red Lentills 2kg.webp",
        "desc": "",
        "mrp": 3.99
      },
      {
        "id": "new_8",
        "name": "TRS ToorDall Plain 2kg",
        "price": 5.99,
        "unit": "nounit",
        "image": "TRS ToorDall Plain 2kg.jfif",
        "desc": "",
        "mrp": 5.99
      },
      {
        "id": "new_11",
        "name": "TRS Kashmiri Chilli Whole 150g",
        "price": 2.49,
        "unit": "nounit",
        "image": "TRS Kashmiri Chilli Whole 150g.jfif",
        "desc": "",
        "mrp": 2.49
      },
      {
        "id": "new_12",
        "name": "TRS Cardomom Green 750g",
        "price": 35.49,
        "unit": "nounit",
        "image": "TRS Cardomom Green 750g.jfif",
        "desc": "",
        "mrp": 35.49
      },
      {
        "id": "new_13",
        "name": "TRS Chilli Powder 1kg",
        "price": 6.69,
        "unit": "nounit",
        "image": "TRS Chilli Powder 1kg.jfif",
        "desc": "",
        "mrp": 6.69
      },
      {
        "id": "new_14",
        "name": "TRS Garam Masala 1kg",
        "price": 7.99,
        "unit": "nounit",
        "image": "TRS Garam Masala 1kg.jfif",
        "desc": "",
        "mrp": 7.99
      },
      {
        "id": "new_15",
        "name": "TRS Turmeric Powder 1kg",
        "price": 4.99,
        "unit": "nounit",
        "image": "TRS Turmeric Powder 1kg.jfif",
        "desc": "",
        "mrp": 4.99
      },
      {
        "id": "new_16",
        "name": "TRS Fennel seeds 1kg",
        "price": 6.99,
        "unit": "nounit",
        "image": "TRS Fennel seeds 1kg.jfif",
        "desc": "",
        "mrp": 6.99
      },
      {
        "id": "new_18",
        "name": "Heera Tamarind Sauce 1Litre",
        "price": 3.99,
        "unit": "nounit",
        "image": "Heera Tamarid Sause 1Litre.jfif",
        "desc": "",
        "mrp": 3.99
      },
      {
        "id": "new_19",
        "name": "suvai Dosa batter 1kg packet",
        "price": 2.99,
        "unit": "nounit",
        "image": "suvai Dosa batter 1kg packet.jfif",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "new_20",
        "name": "Suvai Appam batter 1kg packet",
        "price": 2.99,
        "unit": "nounit",
        "image": "Suvai Appam batter 1kg packet.jfif",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "new_23",
        "name": "Drumstick leaves packet",
        "price": 3.99,
        "unit": "nounit",
        "image": "Drumstick leaves packet.jfif",
        "desc": "",
        "mrp": 3.99
      }
    ]
  },
  {
    "category": "Snacks",
    "icon": "\ud83d\udce6",
    "items": [
      {
        "id": "69f3bd1584e6de290d258db9",
        "name": "Maagi 5 for £2",
        "price": 2,
        "unit": "piece",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/15237f7b0a7fca71_Maagi.jpg?width=300",
        "desc": "",
        "mrp": 2
      },
      {
        "id": "69f3bcf184e6de290d258b4d",
        "name": "Maagi 2 for £1",
        "price": 1,
        "unit": "piece",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/786c92fb91d58242_Maagi.jpg?width=300",
        "desc": "",
        "mrp": 1
      },
      {
        "id": "acp_41",
        "name": "KITCHEN TREASURES (KTS) BANANA CHIPS (FRESH COCONUT OIL) 300 GM",
        "price": 3.19,
        "unit": "nounit",
        "image": "",
        "desc": "",
        "mrp": 3.19
      },
      {
        "id": "acp_42",
        "name": "KITCHEN TREASURES (KTS) BANANA CHIPS (CHILLI BLAST) 170 GM",
        "price": 2.09,
        "unit": "nounit",
        "image": "",
        "desc": "",
        "mrp": 2.09
      },
      {
        "id": "acp_43",
        "name": "KITCHEN TREASURES (KTS) TAPIOCA CHIPS (LIGHTLY SALTED) 150 GM",
        "price": 1.89,
        "unit": "nounit",
        "image": "",
        "desc": "",
        "mrp": 1.89
      },
      {
        "id": "acp_44",
        "name": "KITCHEN TREASURES (KTS) TAPIOCA CHIPS (CHILLI BLAST) 150 GM",
        "price": 1.89,
        "unit": "nounit",
        "image": "",
        "desc": "",
        "mrp": 1.89
      },
      {
        "id": "acp_45",
        "name": "KITCHEN TREASURES (KTS) ROASTED PEANUT 150 GM",
        "price": 1.89,
        "unit": "nounit",
        "image": "",
        "desc": "",
        "mrp": 1.89
      },
      {
        "id": "acp_46",
        "name": "KITCHEN TREASURES (KTS) SPICY MASALA PEANUT 150 GM",
        "price": 1.89,
        "unit": "nounit",
        "image": "",
        "desc": "",
        "mrp": 1.89
      },
      {
        "id": "acp_48",
        "name": "JACME DRY (JK) KERALA HOT MIXTURE 400 GM",
        "price": 2.79,
        "unit": "nounit",
        "image": "JACME DRY (JK) KERALA HOT MIXTURE 400 GM.jpg",
        "desc": "",
        "mrp": 2.79
      },
      {
        "id": "new_9",
        "name": "TRS Cashew Kernels 750g",
        "price": 8.99,
        "unit": "nounit",
        "image": "TRS Cashew Kernels 750g.jfif",
        "desc": "",
        "mrp": 8.99
      },
      {
        "id": "new_10",
        "name": "TRS Cashew Broken 750g",
        "price": 6.99,
        "unit": "nounit",
        "image": "TRS Cashew Broken 750g.jfif",
        "desc": "",
        "mrp": 6.99
      },
      {
        "id": "new_17",
        "name": "TRS Papads Madras plain 200",
        "price": 1.99,
        "unit": "nounit",
        "image": "TRS Papads Madras plain 200.jfif",
        "desc": "",
        "mrp": 1.99
      }
    ]
  },
  {
    "category": "Rice",
    "icon": "\ud83d\udce6",
    "items": [
      {
        "id": "6a04175584e6de290d48dc07",
        "name": "Laila Basmati Rice 10Kg",
        "price": 16.99,
        "unit": "kilogram",
        "image": "image.png",
        "desc": "",
        "mrp": 19.0
      },
      {
        "id": "69f3c11384e6de290d25d4b3",
        "name": "Ajmi Kaima 5kg",
        "price": 15.99,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/ef92dbb163575584_Ajmi-Kaima-5kg.jpg?width=300",
        "desc": "",
        "mrp": 15.99
      },
      {
        "id": "69f3beff84e6de290d25b0e3",
        "name": "Shankar Matta Rice 10kg",
        "price": 13.99,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/bf89e060ac596c52_Shankar-Matta-Rice-10kg.jpg?width=300",
        "desc": "",
        "mrp": 13.99
      },
      {
        "id": "69f3b96984e6de290d253da0",
        "name": "Shankar Idly Rice 10kg",
        "price": 12.99,
        "unit": "nounit",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/68cb0c356b37ff82_Shankar-Idly-Rice-10kg.jpg?width=300",
        "desc": "",
        "mrp": 12.99
      },
      {
        "id": "69f3b94b84e6de290d253b5f",
        "name": "Veetee Mega Basmati Rice 10kg",
        "price": 19.99,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/7e1b2d27bdaaa1a7_Veetee-Mega-Basmati-Rice-10kg.jpg?width=300",
        "desc": "",
        "mrp": 25
      },
      {
        "id": "69f3b88884e6de290d252ab4",
        "name": "Shankar Sona Masoori Rice 10kg",
        "price": 14.99,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/cc4b79e2edc9f3b7_Shankar-Sona-Masoori-Rice-10kg.jpg?width=300",
        "desc": "",
        "mrp": 14.99
      },
      {
        "id": "69f3b86884e6de290d252700",
        "name": "Dawaat Extra Long 20kg",
        "price": 39.99,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/d340ebd33485aec5_Dawaat-Extra-Long-20kg.jpg?width=300",
        "desc": "",
        "mrp": 45
      },
      {
        "id": "69f3b83a84e6de290d25212c",
        "name": "Dawaat Extra Long 10kg",
        "price": 19.98,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/a068f1443193228f_Dawaat-Extra-Long-10kg.jpg?width=300",
        "desc": "",
        "mrp": 26
      },
      {
        "id": "69f3b65984e6de290d24f49e",
        "name": "Dawaat Extra Long 5kg",
        "price": 9.99,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/a0aa09daae0e09f3_Dawaat-Extra-Long-5kg-(Green).jpg?width=300",
        "desc": "",
        "mrp": 9.99
      },
      {
        "id": "acp_0",
        "name": "KITCHEN TREASURES (KTS) PALAKKADAN MATTA RICE 10 KG",
        "price": 12.59,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/products/image_eee641fd-65b4-402f-a1c5-76a9c22adb24.jpg?v=1657303973",
        "desc": "",
        "mrp": 12.59
      },
      {
        "id": "acp_1",
        "name": "KITCHEN TREASURES (KTS) JAYA RICE 10 KG",
        "price": 18.19,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) JAYA RICE 10 KG.png",
        "desc": "",
        "mrp": 18.19
      },
      {
        "id": "acp_37",
        "name": "KITCHEN TREASURES (KTS) RICE POWDER 1 KG",
        "price": 2.79,
        "unit": "nounit",
        "image": "KITCHEN TREASURES (KTS) RICE POWDER 1 KG.png",
        "desc": "",
        "mrp": 2.79
      },
      {
        "id": "acp_47",
        "name": "NILA (NL) PALAKKADAN MATTA RICE 10 KG",
        "price": 12.59,
        "unit": "nounit",
        "image": "NILA (NL) PALAKKADAN MATTA RICE 10 KG.webp",
        "desc": "",
        "mrp": 12.59
      }
    ]
  },
  {
    "category": "Oil",
    "icon": "\ud83d\udce6",
    "items": [
      {
        "id": "69fb2ad584e6de290dadef29",
        "name": "KTC Sunflower Oil 5Ltr",
        "price": 7.79,
        "unit": "litre",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/8819e913b2b4c858_KTC-Sunflower-Oil-5Ltr.jpg?width=300",
        "desc": "",
        "mrp": 8.1
      },
      {
        "id": "69f3bedd84e6de290d25ae3b",
        "name": "Filippo Berio Xtra VirginOil 500ml",
        "price": 5.99,
        "unit": "mililitre",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/4a74cb09cf5897ed_Filippo-Berio-Extra-Virgin-Olive-Oil-500ml.jpg?width=300",
        "desc": "",
        "mrp": 5.99
      },
      {
        "id": "acp_49",
        "name": "JACME DRY (JK) COCONUT OIL 1 LTR",
        "price": 8.49,
        "unit": "nounit",
        "image": "JACME DRY (JK) COCONUT OIL 1 LTR.webp",
        "desc": "",
        "mrp": 8.49
      }
    ]
  },
  {
    "category": "Pickles",
    "icon": "\ud83d\udce6",
    "items": [
      {
        "id": "acp_19",
        "name": "KITCHEN TREASURES (KTS) PRAWNS PICKLE 400 GM",
        "price": 6.69,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/products/image_3b7b316f-385f-4b3d-a2c1-95818ee7f96a.jpg?v=1680643373",
        "desc": "",
        "mrp": 6.69
      },
      {
        "id": "acp_20",
        "name": "KITCHEN TREASURES (KTS) FISH PICKLE 400 GM",
        "price": 6.29,
        "unit": "nounit",
        "image": "https://cdn.shopify.com/s/files/1/0511/9239/7999/products/IMG_2689-Recovered.jpg?v=1670496888",
        "desc": "",
        "mrp": 6.29
      }
    ]
  },
  {
    "category": "Special Deals",
    "icon": "\ud83d\udce6",
    "items": [
      {
        "id": "deal_potato_25kg",
        "name": "Washed Potato 25kg",
        "price": 17.0,
        "unit": "pack",
        "image": "washed_potato_25kg.png",
        "desc": "",
        "mrp": 17.0
      },
      {
        "id": "6a04175584e6de290d48dc06",
        "name": "Coriander + Mint",
        "price": 1.89,
        "unit": "nounit",
        "image": "coriander and mint.png",
        "desc": "",
        "mrp": 1.89
      }
    ]
  },
  {
    "category": "Vegetables",
    "icon": "\ud83d\udce6",
    "items": [
      {
        "id": "69fcb1b784e6de290dd60d11",
        "name": "Gongura",
        "price": 3.08,
        "unit": "nounit",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/6e26a795b0dff57d_Gongura.jpg?width=300",
        "desc": "",
        "mrp": 3.08
      },
      {
        "id": "69fcb19884e6de290dd6093b",
        "name": "Drumstick Leaves (Murungai)",
        "price": 3.99,
        "unit": "nounit",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/5a848401745f1601_Moringa-Bunch.jpg?width=300",
        "desc": "",
        "mrp": 3.99
      },
      {
        "id": "69fcb18084e6de290dd607bc",
        "name": "Methi Bunch",
        "price": 1.29,
        "unit": "nounit",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/69608522579d159c_Methi-Bunch.jpg?width=300",
        "desc": "",
        "mrp": 1.29
      },
      {
        "id": "69fcb12c84e6de290dd601ab",
        "name": "Mint",
        "price": 1.09,
        "unit": "nounit",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/db9a813cee6198ca_mint.jpg?width=300",
        "desc": "",
        "mrp": 1.09
      },
      {
        "id": "69fcb11a84e6de290dd600b0",
        "name": "Coriander",
        "price": 1.09,
        "unit": "nounit",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/bd0a44b0e237cece_Coriander.jpg?width=300",
        "desc": "",
        "mrp": 1.09
      },
      {
        "id": "69fcb10084e6de290dd5fe68",
        "name": "Curry Leaves",
        "price": 1.09,
        "unit": "nounit",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/1b50a95f431e6008_Curry-Leaves.jpg?width=300",
        "desc": "",
        "mrp": 1.09
      },
      {
        "id": "69fcb0d884e6de290dd5fbf6",
        "name": "Green Chilli (100g)",
        "price": 0.89,
        "unit": "gram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/6acb0f3996109cb0_Green-Chilli.jpg?width=300",
        "desc": "",
        "mrp": 0.89
      },
      {
        "id": "69fcb0bc84e6de290dd5fa3f",
        "name": "Fresh Coconut",
        "price": 1.49,
        "unit": "piece",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/9eb299b3da34678b_Fresh-Coconut.jpg?width=300",
        "desc": "",
        "mrp": 1.49
      },
      {
        "id": "69fcb0a584e6de290dd5f81c",
        "name": "Green Lime",
        "price": 0.29,
        "unit": "nounit",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/cd6303d221263d05_Green-Lime.jpg?width=300",
        "desc": "",
        "mrp": 0.29
      },
      {
        "id": "69fcb07084e6de290dd5f538",
        "name": "Garlic (350g)",
        "price": 1.99,
        "unit": "gram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/8286fa9491d6d1e9_Garlic.jpg?width=300",
        "desc": "",
        "mrp": 1.99
      },
      {
        "id": "69fcb03184e6de290dd5ed5b",
        "name": "Indian Ginger (250g)",
        "price": 1.63,
        "unit": "gram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/9f0f5664e05c75e0_Ginger.jpg?width=300",
        "desc": "",
        "mrp": 1.63
      },
      {
        "id": "69fcb01784e6de290dd5ebb3",
        "name": "Bombay Onions (1 bag)",
        "price": 2.99,
        "unit": "pack",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/ee126677cf7ab3e7_Bombay-Onion.jpg?width=300",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "69fcaff284e6de290dd5e84b",
        "name": "Vine Tomatoes 500gm",
        "price": 1.69,
        "unit": "kilogram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/d4a336a7546c14a4_Tomato.jpg?width=300",
        "desc": "",
        "mrp": 1.69
      },
      {
        "id": "69fcafdd84e6de290dd5e5de",
        "name": "Ash Banana (450\u2013500g)",
        "price": 4.49,
        "unit": "gram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/d68d898c541bcabe_Ash-Banana.jpg?width=300",
        "desc": "",
        "mrp": 4.49
      },
      {
        "id": "69fcafbe84e6de290dd5e316",
        "name": "Beetroot (500g)",
        "price": 0.79,
        "unit": "piece",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/d50fbafbe9c037cd_Beetroot.jpg?width=300",
        "desc": "",
        "mrp": 0.79
      },
      {
        "id": "69fcafa584e6de290dd5dfd1",
        "name": "Drumsticks (pack of 3)",
        "price": 2.29,
        "unit": "piece",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/f7319e9bc61896a1_Drumsticks.jpg?width=300",
        "desc": "",
        "mrp": 2.29
      },
      {
        "id": "69fcaf8984e6de290dd5cf45",
        "name": "Snake Guard (400g)",
        "price": 5.49,
        "unit": "gram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/9cf58c9cc9bc7f85_Snake-Gourd.jpg?width=300",
        "desc": "",
        "mrp": 5.49
      },
      {
        "id": "69fcaf6e84e6de290dd5ccab",
        "name": "Indian Cucumber/Sambar Cucumber (300g)",
        "price": 2.99,
        "unit": "gram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/61518ee716df88f5_sambar-cucumber.jpg?width=300",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "69fcaf4a84e6de290dd5c8f1",
        "name": "Long Dudhi/Bottle Guard (500g)",
        "price": 3.79,
        "unit": "gram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/e7fe7014fa02b979_Bottle-Gourd.jpg?width=300",
        "desc": "",
        "mrp": 3.79
      },
      {
        "id": "69fcaf2c84e6de290dd5c5f2",
        "name": "Turai/Ridge Guard/Beerakaiya (500g)",
        "price": 2.99,
        "unit": "gram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/ea9df5aa9397daf2_Ridge-Guard.jpg?width=300",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "69fcadf284e6de290dd59b15",
        "name": "Okra/ Ladies Finger 300gm",
        "price": 2.25,
        "unit": "gram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/b5151436a63913e1_Okra.jpeg?width=300",
        "desc": "",
        "mrp": 2.25
      },
      {
        "id": "new_0",
        "name": "Garlic (400g)",
        "price": 2.89,
        "unit": "nounit",
        "image": "garlic.jpg",
        "desc": "",
        "mrp": 2.89
      },
      {
        "id": "new_1",
        "name": "Ginger (500g)",
        "price": 1.99,
        "unit": "nounit",
        "image": "ginger.jpg",
        "desc": "",
        "mrp": 1.99
      },
      {
        "id": "new_2",
        "name": "Tomatoes 500gm",
        "price": 1.69,
        "unit": "nounit",
        "image": "https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=300&q=80",
        "desc": "",
        "mrp": 1.69
      },
      {
        "id": "new_3",
        "name": "Okra/ Ladies Finger 500gm",
        "price": 3.99,
        "unit": "nounit",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/b5151436a63913e1_Okra.jpeg?width=300",
        "desc": "",
        "mrp": 3.99
      },
      {
        "id": "new_5",
        "name": "Red Onion 5kg",
        "price": 3.99,
        "unit": "nounit",
        "image": "red onion.jfif",
        "desc": "",
        "mrp": 3.99
      },
      {
        "id": "new_21",
        "name": "Ponnagani keerai bunch",
        "price": 3.99,
        "unit": "nounit",
        "image": "Ponnagani keerai bunch.jfif",
        "desc": "",
        "mrp": 3.99
      },
      {
        "id": "new_22",
        "name": "Vallari keerai bunch",
        "price": 3.99,
        "unit": "nounit",
        "image": "Vallari keerai bunch.jfif",
        "desc": "",
        "mrp": 3.99
      },
      {
        "id": "new_24",
        "name": "Red spinach packet",
        "price": 3.99,
        "unit": "nounit",
        "image": "Red spinach packet.jfif",
        "desc": "",
        "mrp": 3.99
      },
      {
        "id": "new_25",
        "name": "Baby spinach packet",
        "price": 1.49,
        "unit": "nounit",
        "image": "Baby spinach packet.jfif",
        "desc": "",
        "mrp": 1.49
      },
      {
        "id": "new_36",
        "name": "Carrots 500g",
        "price": 0.69,
        "unit": "nounit",
        "image": "Carrots 500g.jfif",
        "desc": "",
        "mrp": 0.69
      },
      {
        "id": "new_37",
        "name": "Baby leaf each",
        "price": 1.49,
        "unit": "nounit",
        "image": "Baby leaf each.jfif",
        "desc": "",
        "mrp": 1.49
      },
      {
        "id": "new_38",
        "name": "Cucumber each",
        "price": 0.79,
        "unit": "nounit",
        "image": "Cucumber each.jfif",
        "desc": "",
        "mrp": 0.79
      },
      {
        "id": "new_39",
        "name": "White cabbage each",
        "price": 1.29,
        "unit": "nounit",
        "image": "White cabbage each.jfif",
        "desc": "",
        "mrp": 1.29
      },
      {
        "id": "new_40",
        "name": "Red cabbage each",
        "price": 1.29,
        "unit": "nounit",
        "image": "Red cabbage each.jfif",
        "desc": "",
        "mrp": 1.29
      },
      {
        "id": "new_41",
        "name": "Cauliflower each",
        "price": 1.79,
        "unit": "nounit",
        "image": "Cauliflower each.jfif",
        "desc": "",
        "mrp": 1.79
      },
      {
        "id": "new_42",
        "name": "Savoy cabbage each",
        "price": 1.69,
        "unit": "nounit",
        "image": "Savoy cabbage each.jfif",
        "desc": "",
        "mrp": 1.69
      },
      {
        "id": "new_43",
        "name": "Washed potato 2kg",
        "price": 2.0,
        "unit": "nounit",
        "image": "Washed potato 2kg.jfif",
        "desc": "",
        "mrp": 2.0
      },
      {
        "id": "new_44",
        "name": "Parsnips kg",
        "price": 2.99,
        "unit": "nounit",
        "image": "Parsnips kg.jfif",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "new_45",
        "name": "Swede",
        "price": 1.1,
        "unit": "nounit",
        "image": "Swede.jfif",
        "desc": "",
        "mrp": 1.1
      },
      {
        "id": "new_46",
        "name": "Eddoes 500g",
        "price": 2.99,
        "unit": "nounit",
        "image": "Eddoes 500g.jfif",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "new_47",
        "name": "Aubergine each",
        "price": 0.99,
        "unit": "nounit",
        "image": "Aubergine each.jfif",
        "desc": "",
        "mrp": 0.99
      },
      {
        "id": "new_48",
        "name": "Peeled garlic kg",
        "price": 4.99,
        "unit": "nounit",
        "image": "Peeled garlic kg.jfif",
        "desc": "",
        "mrp": 4.99
      }
    ]
  },
  {
    "category": "Fruits",
    "icon": "\ud83d\udce6",
    "items": [
      {
        "id": "69fcb21684e6de290dd6123c",
        "name": "Yellow Papaya",
        "price": 5.99,
        "unit": "piece",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/930c48260c9b8049_Yellow-Papaya.jpg?width=300",
        "desc": "",
        "mrp": 5.99
      },
      {
        "id": "69fcb1e684e6de290dd60fe8",
        "name": "Watermelon Big",
        "price": 5.59,
        "unit": "piece",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/3f03ec2263e34753_Watermelon.jpg?width=300",
        "desc": "",
        "mrp": 5.59
      },
      {
        "id": "69fcb1cf84e6de290dd60e08",
        "name": "Guava Green (400g)",
        "price": 3.08,
        "unit": "gram",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/a2a1746d5687c9af_guava.jpg?width=300",
        "desc": "",
        "mrp": 3.08
      },
      {
        "id": "6a04175584e6de290d48k",
        "name": "Mango kesar 6s",
        "price": 11.99,
        "unit": "pack",
        "image": "kesar.jpeg",
        "desc": "",
        "mrp": 11.99
      },
      {
        "id": "6a04175584e6de290d48a",
        "name": "Alphonso Mango 6s",
        "price": 11.99,
        "unit": "pack",
        "image": "alphonso.jpeg",
        "desc": "",
        "mrp": 11.99
      },
      {
        "id": "6a04175584e6de290d48d",
        "name": "Dominican mango",
        "price": 10.99,
        "unit": "pack",
        "image": "dominican.jpeg",
        "desc": "",
        "mrp": 10.99
      },
      {
        "id": "new_26",
        "name": "Apple 4 pieces",
        "price": 1.0,
        "unit": "nounit",
        "image": "Apple 4 pieces.jfif",
        "desc": "",
        "mrp": 1.0
      },
      {
        "id": "new_27",
        "name": "Honeydew each",
        "price": 2.69,
        "unit": "nounit",
        "image": "Honeydew each.jfif",
        "desc": "",
        "mrp": 2.69
      },
      {
        "id": "new_28",
        "name": "Cantaloupe each",
        "price": 2.69,
        "unit": "nounit",
        "image": "Cantaloupe each.jfif",
        "desc": "",
        "mrp": 2.69
      },
      {
        "id": "new_29",
        "name": "Pineapple each",
        "price": 2.69,
        "unit": "nounit",
        "image": "Pineapple each.jfif",
        "desc": "",
        "mrp": 2.69
      },
      {
        "id": "new_30",
        "name": "Mandarin 4 pieces",
        "price": 1.0,
        "unit": "nounit",
        "image": "Mandarin 4 pieces.jfif",
        "desc": "",
        "mrp": 1.0
      },
      {
        "id": "new_31",
        "name": "Banana 5 pieces",
        "price": 1.0,
        "unit": "nounit",
        "image": "Banana 5 pieces.jfif",
        "desc": "",
        "mrp": 1.0
      },
      {
        "id": "new_32",
        "name": "Green grapes punnet",
        "price": 2.49,
        "unit": "nounit",
        "image": "Green grapes punnet.jfif",
        "desc": "",
        "mrp": 2.49
      },
      {
        "id": "new_33",
        "name": "Red grapes punnet",
        "price": 2.49,
        "unit": "nounit",
        "image": "Red grapes punnet.jfif",
        "desc": "",
        "mrp": 2.49
      },
      {
        "id": "new_34",
        "name": "Strawberry punnet",
        "price": 2.99,
        "unit": "nounit",
        "image": "Strawberry punnet.jfif",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "new_35",
        "name": "Blueberry punnet",
        "price": 2.49,
        "unit": "nounit",
        "image": "Blueberry punnet.jfif",
        "desc": "",
        "mrp": 2.49
      }
    ]
  },
  {
    "category": "New Arrivals",
    "icon": "\ud83c\udd95",
    "items": []
  }
];
