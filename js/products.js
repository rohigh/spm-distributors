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
        "image": "img/veg box with eggs.jpeg",
        "desc": "<strong>Includes:</strong><ul style='margin-top:8px; padding-left:20px; line-height:1.6;'><li>6 Class A Eggs</li><li>Bananas</li><li>Blueberries</li><li>Cauliflower</li><li>Melon</li><li>Lettuce</li><li>Loose Potatoes</li><li>Cucumbers</li><li>Green Apples</li><li>Oranges</li><li>Spring Onions</li><li>Tomatoes</li></ul>",
        "mrp": 20.0
      },
      {
        "id": "box_fruit_02",
        "name": "Fruit Box",
        "price": 20.0,
        "unit": "box",
        "image": "img/fruit box.jpeg",
        "desc": "<strong>Includes:</strong><ul style='margin-top:8px; padding-left:20px; line-height:1.6;'><li>Bananas</li><li>Blueberries</li><li>Green Pears</li><li>Honeydew Melon</li><li>Oranges</li><li>Pineapple</li><li>Red Gala Apple</li><li>Strawberries</li><li>Cantaloupe</li><li>Plums</li></ul>",
        "mrp": 20.0
      },
      {
        "id": "box_family_03",
        "name": "Family Box",
        "price": 30.0,
        "unit": "box",
        "image": "img/family box.jpeg",
        "desc": "<div style='display:flex; flex-wrap:wrap; gap:20px;'><div style='flex:1; min-width:200px;'><strong>\ud83e\udd55 Vegetables</strong><ul style='margin-top:8px; padding-left:20px; line-height:1.6;'><li>2kg Standard Loose Potatoes</li><li>Broccoli (~300g)</li><li>Cauliflower (~800g)</li><li>1kg Onions</li><li>1kg Sweet Potatoes</li><li>1kg New Potatoes</li><li>1kg Tomatoes</li><li>Cherry Tomatoes (~500g)</li><li>1 Lettuce</li><li>1 Cucumber</li><li>Mushrooms (~500g)</li><li>2 Leeks</li></ul></div><div style='flex:1; min-width:200px;'><strong>\ud83c\udf4e Fruit</strong><ul style='margin-top:8px; padding-left:20px; line-height:1.6;'><li>1kg Bananas</li><li>1kg Green Apples</li><li>1kg Pears</li></ul><br><strong>\ud83e\udd5a Eggs</strong><ul style='margin-top:8px; padding-left:20px; line-height:1.6;'><li>15 Free Range Eggs</li></ul></div></div>",
        "mrp": 30.0
      },
      {
        "id": "deal_freerange_egg_30",
        "name": "30 Free Range Eggs",
        "price": 10.0,
        "unit": "pack",
        "image": "img/free_range_eggs.png",
        "desc": "",
        "mrp": 10.0
      },
      {
        "id": "deal_classa_egg_30",
        "name": "30 Class A Caged Eggs",
        "price": 7.0,
        "unit": "pack",
        "image": "img/caged_eggs.png",
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
        "id": "new_brahmins_asafoetida",
        "name": "BRAHMINS ASAFOETIDA 50 G",
        "price": 2.37,
        "unit": "pack",
        "image": "img/processed/brahmins_asafoetida_1783346320009.png",
        "desc": "",
        "mrp": 2.37
      },
      {
        "id": "new_brahmins_black_gram",
        "name": "BRAHMINS BLACK GRAM 500 G",
        "price": 2.38,
        "unit": "pack",
        "image": "img/processed/brahmins_black_gram_1783346332878.png",
        "desc": "",
        "mrp": 2.38
      },
      {
        "id": "new_brahmins_ginger_garlic_paste",
        "name": "BRAHMINS GINGER GARLIC PASTE 100 G",
        "price": 1.25,
        "unit": "pack",
        "image": "img/processed/brahmins_ginger_garlic_paste_1783346342848.png",
        "desc": "",
        "mrp": 1.25
      },
      {
        "id": "new_brahmins_red_lentils",
        "name": "BRAHMINS RED LENTILS (MASOOR DAL)500 G",
        "price": 1.75,
        "unit": "pack",
        "image": "img/processed/brahmins_red_lentils_1783346355677.png",
        "desc": "",
        "mrp": 1.75
      },
      {
        "id": "new_brahmins_split_chickpeas",
        "name": "BRAHMINS SPLIT CHICKPEAS 500 G",
        "price": 1.89,
        "unit": "pack",
        "image": "img/processed/brahmins_split_chickpeas_1783346377840.png",
        "desc": "",
        "mrp": 1.89
      },
      {
        "id": "new_kt_palakkadan_matta_rice",
        "name": "KT PALAKKADAN MATTA RICE 10 KG",
        "price": 19.59,
        "unit": "pack",
        "image": "img/processed/kerala_taste_palakkadan_matta_rice_1783346390894.png",
        "desc": "",
        "mrp": 19.59
      },
      {
        "id": "new_niru_plain_appalam",
        "name": "NIRU PLAIN APPALAM (MADRAS PAPPADOM) 100 G",
        "price": 1.19,
        "unit": "pack",
        "image": "img/processed/niru_poppadom_1783346402717.png",
        "desc": "",
        "mrp": 1.19
      },
      {
        "id": "new_tata_salt",
        "name": "TATA SALT 1KG",
        "price": 1.54,
        "unit": "pack",
        "image": "img/processed/tata_salt_1783346414921.png",
        "desc": "",
        "mrp": 1.54
      },
      {
        "id": "new_thekkans_chick_peas_white",
        "name": "THEKKANS CHICK PEAS WHITE 500G",
        "price": 2.37,
        "unit": "pack",
        "image": "img/processed/thekkans_chick_peas_white_1783346435189.png",
        "desc": "",
        "mrp": 2.37
      },
      {
        "id": "new_thekkans_chick_peas_brown",
        "name": "THEKKANS CHICK PEAS BROWN 500 G",
        "price": 1.75,
        "unit": "pack",
        "image": "img/processed/thekkans_chickpeas_brown_1783346446925.png",
        "desc": "",
        "mrp": 1.75
      },
      {
        "id": "new_thekkans_coconut_oil",
        "name": "THEKKANS COCONUT OIL ROASTED 1 LTR",
        "price": 6.29,
        "unit": "pack",
        "image": "img/processed/thekkans_coconut_oil_1783346458700.png",
        "desc": "",
        "mrp": 6.29
      },
      {
        "id": "new_thekkans_garcinia_cambogia",
        "name": "THEKKANS GARCINIA CAMBOGIA (KUDAMPULI) 200G",
        "price": 3.63,
        "unit": "pack",
        "image": "img/processed/thekkans_garcinia_cambogia_1783346471333.png",
        "desc": "",
        "mrp": 3.63
      },
      {
        "id": "new_thekkans_idly_rice",
        "name": "THEKKANS IDLY RICE 1 KG",
        "price": 2.23,
        "unit": "pack",
        "image": "img/processed/thekkans_idly_rice_1783346492184.png",
        "desc": "",
        "mrp": 2.23
      },
      {
        "id": "new_thekkans_maida",
        "name": "THEKKANS MAIDA 1 KG",
        "price": 1.82,
        "unit": "pack",
        "image": "img/processed/thekkans_maida_1783346506781.png",
        "desc": "",
        "mrp": 1.82
      },
      {
        "id": "new_thekkans_ragi_whole",
        "name": "THEKKANS RAGI WHOLE 500G",
        "price": 1.19,
        "unit": "pack",
        "image": "img/processed/thekkans_ragi_whole_1783346516293.png",
        "desc": "",
        "mrp": 1.19
      },
      {
        "id": "new_thekkans_ribbon_ada",
        "name": "THEKKANS RIBBON ADA 200 G",
        "price": 1.95,
        "unit": "pack",
        "image": "img/processed/thekkans_ribbon_ada_1783346527857.png",
        "desc": "",
        "mrp": 1.95
      },
      {
        "id": "new_thekkans_toor_dal",
        "name": "THEKKANS TOOR DAL 500 G",
        "price": 2.09,
        "unit": "pack",
        "image": "img/processed/thekkans_toor_dal_1783346538084.png",
        "desc": "",
        "mrp": 2.09
      },
      {
        "id": "new_dh_idli_rava",
        "name": "DH IDLI RAVA 1 KG",
        "price": 3.22,
        "unit": "pack",
        "image": "img/processed/Double Horse Idli Rava.png",
        "desc": "",
        "mrp": 3.22
      },
      {
        "id": "new_melam_easy_idli_mix",
        "name": "MELAM EASY IDILI MIX 1 KG",
        "price": 3.63,
        "unit": "pack",
        "image": "img/processed/Melam Easy Idli Mix.png",
        "desc": "",
        "mrp": 3.63
      },
      {
        "id": "new_tn_apm_idypm",
        "name": "TN APM IDYPM PTHIRI R/RFLOUR 1 KG",
        "price": 3.43,
        "unit": "pack",
        "image": "img/processed/Tasty Nibbles Appam Idiyappam Pathiri.png",
        "desc": "",
        "mrp": 3.43
      },
      {
        "id": "new_melam_puttu_podi",
        "name": "MELAM PUTTU PODI 1KG",
        "price": 3.21,
        "unit": "pack",
        "image": "img/processed/Melam Puttu Podi.png",
        "desc": "",
        "mrp": 3.21
      },
      {
        "id": "new_melam_chemba_puttu_podi",
        "name": "MELAM CHEMBA PUTTU PODI 1 KG",
        "price": 3.21,
        "unit": "pack",
        "image": "img/processed/Melam Chemba puttu Podi.png",
        "desc": "",
        "mrp": 3.21
      },
      {
        "id": "new_dh_roasted_vermicelli",
        "name": "DH ROASTED VERMICELLI 500 G",
        "price": 1.82,
        "unit": "pack",
        "image": "img/processed/Double Horse Roasted Vermicelli.png",
        "desc": "",
        "mrp": 1.82
      },
      {
        "id": "new_tn_all_purpose_white",
        "name": "TN ALL PURPOSE WHITE R/P 1KG",
        "price": 2.87,
        "unit": "pack",
        "image": "img/processed/Tasty Nibbles White Rice Powder.png",
        "desc": "",
        "mrp": 2.87
      },
      {
        "id": "new_kt_rasam_powder",
        "name": "KT RASAM POWDER 200G",
        "price": 2.17,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Rasam Powder.png",
        "desc": "",
        "mrp": 2.17
      },
      {
        "id": "new_kt_chicken_fry_masala",
        "name": "KT CHICKEN FRY MASALA 200G",
        "price": 2.65,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Chicken Fry Masala.png",
        "desc": "",
        "mrp": 2.65
      },
      {
        "id": "new_kt_egg_roast_masala",
        "name": "KT EGG ROAST MASALA 200G",
        "price": 2.59,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Egg Roast Masala.png",
        "desc": "",
        "mrp": 2.59
      },
      {
        "id": "new_kt_sambar_powder",
        "name": "KT SAMBAR POWDER 200 G",
        "price": 2.37,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Sambar Powder.png",
        "desc": "",
        "mrp": 2.37
      },
      {
        "id": "new_kt_meat_masala",
        "name": "KT MEAT MASALA 200G",
        "price": 2.59,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Meat Masala.png",
        "desc": "",
        "mrp": 2.59
      },
      {
        "id": "new_kt_garam_masala",
        "name": "KT GARAM MASALA 200 G",
        "price": 2.87,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Garam Masala.png",
        "desc": "",
        "mrp": 2.87
      },
      {
        "id": "new_kt_beef_ularthu_masala",
        "name": "KT BEEF ULARTHU MASALA 200 G",
        "price": 2.73,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Beef Ulurthu Masala.png",
        "desc": "",
        "mrp": 2.73
      },
      {
        "id": "new_kt_biriyani_masala",
        "name": "KT BIRIYANI MASALA 200 G",
        "price": 3.15,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Briyani Masala.png",
        "desc": "",
        "mrp": 3.15
      },
      {
        "id": "new_kt_mutton_masala",
        "name": "KT MUTTON MASALA 200G",
        "price": 2.59,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Mutton Masala.png",
        "desc": "",
        "mrp": 2.59
      },
      {
        "id": "new_kt_pulinji_pickle",
        "name": "KT PULINJI PICKLE",
        "price": 2.59,
        "unit": "pack",
        "image": "img/processed/kerala Taste Pulinji Pickle.png",
        "desc": "",
        "mrp": 2.59
      },
      {
        "id": "new_kt_cut_mango_pickle",
        "name": "KT CUT MANGO PICKLE",
        "price": 2.59,
        "unit": "pack",
        "image": "img/processed/kerala Taste Cut Mango Pickle.png",
        "desc": "",
        "mrp": 2.59
      },
      {
        "id": "new_kt_lime_pickle",
        "name": "KT LIME PICKLE",
        "price": 2.59,
        "unit": "pack",
        "image": "img/processed/kerala Taste Lime Pickle.png",
        "desc": "",
        "mrp": 2.59
      },
      {
        "id": "new_kt_hot_sweet_pickle",
        "name": "KT HOT & SWEET PICKLE",
        "price": 2.59,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Hot and Sweet Pickle.png",
        "desc": "",
        "mrp": 2.59
      },
      {
        "id": "new_kt_fish_pickle",
        "name": "KT FISH PICKLE",
        "price": 3.15,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Fish Pickle.png",
        "desc": "",
        "mrp": 3.15
      },
      {
        "id": "new_kt_dates_pickle",
        "name": "KT DATES PICKLE",
        "price": 2.59,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Dates Pickle.png",
        "desc": "",
        "mrp": 2.59
      },
      {
        "id": "new_kt_gooseberry_pickle",
        "name": "KT GOOSEBERRY PICKLE",
        "price": 2.59,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Gooseberry Pickle.png",
        "desc": "",
        "mrp": 2.59
      },
      {
        "id": "new_kt_prawn_pickle",
        "name": "KT PRAWN PICKLE",
        "price": 3.15,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Prawn Pickle.png",
        "desc": "",
        "mrp": 3.15
      },
      {
        "id": "new_dh_roasted_ragi_powder",
        "name": "DH ROASTED RAGI POWDER 1KG",
        "price": 3.22,
        "unit": "pack",
        "image": "img/processed/Double Horse Ragi Powder.png",
        "desc": "",
        "mrp": 3.22
      },
      {
        "id": "new_melam_easy_dosa_mix",
        "name": "MELAM EASY DOSA MIX 1KG",
        "price": 3.63,
        "unit": "pack",
        "image": "img/processed/Melam Easy Dosa Mix.png",
        "desc": "",
        "mrp": 3.63
      },
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
        "id": "new_6",
        "name": "TRS Chanadall 2kg",
        "price": 5.49,
        "unit": "nounit",
        "image": "img/TRS Chanadall 2kg.webp",
        "desc": "",
        "mrp": 5.49
      },
      {
        "id": "new_7",
        "name": "TRS Red Lentills 2kg",
        "price": 3.99,
        "unit": "nounit",
        "image": "img/TRS Red Lentills 2kg.webp",
        "desc": "",
        "mrp": 3.99
      },
      {
        "id": "new_8",
        "name": "TRS ToorDall Plain 2kg",
        "price": 5.99,
        "unit": "nounit",
        "image": "img/TRS ToorDall Plain 2kg.jfif",
        "desc": "",
        "mrp": 5.99
      },
      {
        "id": "new_11",
        "name": "TRS Kashmiri Chilli Whole 150g",
        "price": 2.49,
        "unit": "nounit",
        "image": "img/TRS Kashmiri Chilli Whole 150g.jfif",
        "desc": "",
        "mrp": 2.49
      },
      {
        "id": "new_12",
        "name": "TRS Cardomom Green 750g",
        "price": 35.49,
        "unit": "nounit",
        "image": "img/TRS Cardomom Green 750g.jfif",
        "desc": "",
        "mrp": 35.49
      },
      {
        "id": "new_13",
        "name": "TRS Chilli Powder 1kg",
        "price": 6.69,
        "unit": "nounit",
        "image": "img/TRS Chilli Powder 1kg.jfif",
        "desc": "",
        "mrp": 6.69
      },
      {
        "id": "new_14",
        "name": "TRS Garam Masala 1kg",
        "price": 7.99,
        "unit": "nounit",
        "image": "img/TRS Garam Masala 1kg.jfif",
        "desc": "",
        "mrp": 7.99
      },
      {
        "id": "new_15",
        "name": "TRS Turmeric Powder 1kg",
        "price": 4.99,
        "unit": "nounit",
        "image": "img/TRS Turmeric Powder 1kg.jfif",
        "desc": "",
        "mrp": 4.99
      },
      {
        "id": "new_16",
        "name": "TRS Fennel seeds 1kg",
        "price": 6.99,
        "unit": "nounit",
        "image": "img/TRS Fennel seeds 1kg.jfif",
        "desc": "",
        "mrp": 6.99
      },
      {
        "id": "new_18",
        "name": "Heera Tamarind Sauce 1Litre",
        "price": 3.99,
        "unit": "nounit",
        "image": "img/Heera Tamarid Sause 1Litre.jfif",
        "desc": "",
        "mrp": 3.99
      },
      {
        "id": "new_19",
        "name": "suvai Dosa batter 1kg packet",
        "price": 2.99,
        "unit": "nounit",
        "image": "img/suvai Dosa batter 1kg packet.jfif",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "new_20",
        "name": "Suvai Appam batter 1kg packet",
        "price": 2.99,
        "unit": "nounit",
        "image": "img/Suvai Appam batter 1kg packet.jfif",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "new_23",
        "name": "Drumstick leaves packet",
        "price": 3.99,
        "unit": "nounit",
        "image": "img/Drumstick leaves packet.jfif",
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
        "id": "new_kt_achappam",
        "name": "KT ACHAPPAM 150 G",
        "price": 2.17,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Achappam.png",
        "desc": "",
        "mrp": 2.17
      },
      {
        "id": "new_kt_banana_chips",
        "name": "KT BANANA CHIPS 200 G",
        "price": 2.51,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Banana Chips.png",
        "desc": "",
        "mrp": 2.51
      },
      {
        "id": "new_kt_roasted_masala_peanut",
        "name": "KT ROASTED MASALA PEANUT 200 G",
        "price": 2.38,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Rosted Masala Peanut.png",
        "desc": "",
        "mrp": 2.38
      },
      {
        "id": "new_kt_spicy_kerala_mixture",
        "name": "KT SPICY KERALA MIXTURE",
        "price": 2.51,
        "unit": "pack",
        "image": "img/processed/Kerala Taste Spicy Kerala Mixture.png",
        "desc": "",
        "mrp": 2.51
      },
      {
        "id": "69f3bd1584e6de290d258db9",
        "name": "Maagi 5 for \u00a32",
        "price": 2,
        "unit": "piece",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/15237f7b0a7fca71_Maagi.jpg?width=300",
        "desc": "",
        "mrp": 2
      },
      {
        "id": "69f3bcf184e6de290d258b4d",
        "name": "Maagi 2 for \u00a31",
        "price": 1,
        "unit": "piece",
        "image": "https://d1mzjggyz5012h.cloudfront.net/quickzu.com/products/786c92fb91d58242_Maagi.jpg?width=300",
        "desc": "",
        "mrp": 1
      },
      {
        "id": "new_9",
        "name": "TRS Cashew Kernels 750g",
        "price": 8.99,
        "unit": "nounit",
        "image": "img/TRS Cashew Kernels 750g.jfif",
        "desc": "",
        "mrp": 8.99
      },
      {
        "id": "new_10",
        "name": "TRS Cashew Broken 750g",
        "price": 6.99,
        "unit": "nounit",
        "image": "img/TRS Cashew Broken 750g.jfif",
        "desc": "",
        "mrp": 6.99
      },
      {
        "id": "new_17",
        "name": "TRS Papads Madras plain 200",
        "price": 1.99,
        "unit": "nounit",
        "image": "img/TRS Papads Madras plain 200.jfif",
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
        "image": "img/image.png",
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
      }
    ]
  },
  {
    "category": "Pickles",
    "icon": "\ud83d\udce6",
    "items": []
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
        "image": "img/washed_potato_25kg.png",
        "desc": "",
        "mrp": 17.0
      },
      {
        "id": "6a04175584e6de290d48dc06",
        "name": "Coriander + Mint",
        "price": 1.89,
        "unit": "nounit",
        "image": "img/coriander and mint.png",
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
        "image": "img/garlic.jpg",
        "desc": "",
        "mrp": 2.89
      },
      {
        "id": "new_1",
        "name": "Ginger (500g)",
        "price": 1.99,
        "unit": "nounit",
        "image": "img/ginger.jpg",
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
        "image": "img/red onion.jfif",
        "desc": "",
        "mrp": 3.99
      },
      {
        "id": "new_21",
        "name": "Ponnagani keerai bunch",
        "price": 3.99,
        "unit": "nounit",
        "image": "img/Ponnagani keerai bunch.jfif",
        "desc": "",
        "mrp": 3.99
      },
      {
        "id": "new_22",
        "name": "Vallari keerai bunch",
        "price": 3.99,
        "unit": "nounit",
        "image": "img/Vallari keerai bunch.jfif",
        "desc": "",
        "mrp": 3.99
      },
      {
        "id": "new_24",
        "name": "Red spinach packet",
        "price": 3.99,
        "unit": "nounit",
        "image": "img/Red spinach packet.jfif",
        "desc": "",
        "mrp": 3.99
      },
      {
        "id": "new_25",
        "name": "Baby spinach packet",
        "price": 1.49,
        "unit": "nounit",
        "image": "img/Baby spinach packet.jfif",
        "desc": "",
        "mrp": 1.49
      },
      {
        "id": "new_36",
        "name": "Carrots 500g",
        "price": 0.69,
        "unit": "nounit",
        "image": "img/Carrots 500g.jfif",
        "desc": "",
        "mrp": 0.69
      },
      {
        "id": "new_37",
        "name": "Baby leaf each",
        "price": 1.49,
        "unit": "nounit",
        "image": "img/Baby leaf each.jfif",
        "desc": "",
        "mrp": 1.49
      },
      {
        "id": "new_38",
        "name": "Cucumber each",
        "price": 0.79,
        "unit": "nounit",
        "image": "img/Cucumber each.jfif",
        "desc": "",
        "mrp": 0.79
      },
      {
        "id": "new_39",
        "name": "White cabbage each",
        "price": 1.29,
        "unit": "nounit",
        "image": "img/White cabbage each.jfif",
        "desc": "",
        "mrp": 1.29
      },
      {
        "id": "new_40",
        "name": "Red cabbage each",
        "price": 1.29,
        "unit": "nounit",
        "image": "img/Red cabbage each.jfif",
        "desc": "",
        "mrp": 1.29
      },
      {
        "id": "new_41",
        "name": "Cauliflower each",
        "price": 1.79,
        "unit": "nounit",
        "image": "img/Cauliflower each.jfif",
        "desc": "",
        "mrp": 1.79
      },
      {
        "id": "new_42",
        "name": "Savoy cabbage each",
        "price": 1.69,
        "unit": "nounit",
        "image": "img/Savoy cabbage each.jfif",
        "desc": "",
        "mrp": 1.69
      },
      {
        "id": "new_43",
        "name": "Washed potato 2kg",
        "price": 2.0,
        "unit": "nounit",
        "image": "img/Washed potato 2kg.jfif",
        "desc": "",
        "mrp": 2.0
      },
      {
        "id": "new_44",
        "name": "Parsnips kg",
        "price": 2.99,
        "unit": "nounit",
        "image": "img/Parsnips kg.jfif",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "new_45",
        "name": "Swede",
        "price": 1.1,
        "unit": "nounit",
        "image": "img/Swede.jfif",
        "desc": "",
        "mrp": 1.1
      },
      {
        "id": "new_46",
        "name": "Eddoes 500g",
        "price": 2.99,
        "unit": "nounit",
        "image": "img/Eddoes 500g.jfif",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "new_47",
        "name": "Aubergine each",
        "price": 0.99,
        "unit": "nounit",
        "image": "img/Aubergine each.jfif",
        "desc": "",
        "mrp": 0.99
      },
      {
        "id": "new_48",
        "name": "Peeled garlic kg",
        "price": 4.99,
        "unit": "nounit",
        "image": "img/Peeled garlic kg.jfif",
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
        "image": "img/kesar.jpeg",
        "desc": "",
        "mrp": 11.99
      },
      {
        "id": "6a04175584e6de290d48a",
        "name": "Alphonso Mango 6s",
        "price": 11.99,
        "unit": "pack",
        "image": "img/alphonso.jpeg",
        "desc": "",
        "mrp": 11.99
      },
      {
        "id": "6a04175584e6de290d48d",
        "name": "Dominican mango",
        "price": 10.99,
        "unit": "pack",
        "image": "img/dominican.jpeg",
        "desc": "",
        "mrp": 10.99
      },
      {
        "id": "new_26",
        "name": "Apple 4 pieces",
        "price": 1.0,
        "unit": "nounit",
        "image": "img/Apple 4 pieces.jfif",
        "desc": "",
        "mrp": 1.0
      },
      {
        "id": "new_27",
        "name": "Honeydew each",
        "price": 2.69,
        "unit": "nounit",
        "image": "img/Honeydew each.jfif",
        "desc": "",
        "mrp": 2.69
      },
      {
        "id": "new_28",
        "name": "Cantaloupe each",
        "price": 2.69,
        "unit": "nounit",
        "image": "img/Cantaloupe each.jfif",
        "desc": "",
        "mrp": 2.69
      },
      {
        "id": "new_29",
        "name": "Pineapple each",
        "price": 2.69,
        "unit": "nounit",
        "image": "img/Pineapple each.jfif",
        "desc": "",
        "mrp": 2.69
      },
      {
        "id": "new_30",
        "name": "Mandarin 4 pieces",
        "price": 1.0,
        "unit": "nounit",
        "image": "img/Mandarin 4 pieces.jfif",
        "desc": "",
        "mrp": 1.0
      },
      {
        "id": "new_31",
        "name": "Banana 5 pieces",
        "price": 1.0,
        "unit": "nounit",
        "image": "img/Banana 5 pieces.jfif",
        "desc": "",
        "mrp": 1.0
      },
      {
        "id": "new_32",
        "name": "Green grapes punnet",
        "price": 2.49,
        "unit": "nounit",
        "image": "img/Green grapes punnet.jfif",
        "desc": "",
        "mrp": 2.49
      },
      {
        "id": "new_33",
        "name": "Red grapes punnet",
        "price": 2.49,
        "unit": "nounit",
        "image": "img/Red grapes punnet.jfif",
        "desc": "",
        "mrp": 2.49
      },
      {
        "id": "new_34",
        "name": "Strawberry punnet",
        "price": 2.99,
        "unit": "nounit",
        "image": "img/Strawberry punnet.jfif",
        "desc": "",
        "mrp": 2.99
      },
      {
        "id": "new_35",
        "name": "Blueberry punnet",
        "price": 2.49,
        "unit": "nounit",
        "image": "img/Blueberry punnet.jfif",
        "desc": "",
        "mrp": 2.49
      }
    ]
  },
  {
    "category": "New Arrivals",
    "icon": "\ud83c\udd95",
    "items": [
      {
        "id": "new_arr_1",
        "name": "Boost 500g",
        "price": 6.99,
        "unit": "nounit",
        "image": "img/boost.jfif",
        "desc": "",
        "mrp": 6.99
      },
      {
        "id": "new_arr_2",
        "name": "Yellow plantain each",
        "price": 0.89,
        "unit": "nounit",
        "image": "img/Yellow plantain each.jfif",
        "desc": "",
        "mrp": 0.89
      },
      {
        "id": "new_arr_3",
        "name": "Green curry mango 500g",
        "price": 2.9,
        "unit": "nounit",
        "image": "img/Green curry mango.jfif",
        "desc": "",
        "mrp": 2.9
      }
    ]
  }
];
