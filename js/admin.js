// Admin Logic
const formatPrice = (price) => '£' + Number(price).toFixed(2);
let currentOrders = [];

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // Logged in successfully. The onAuthStateChanged listener will handle the UI update.
    }).catch((error) => {
      console.error(error);
      alert("Google Sign-In failed: " + error.message);
    });
}

function logout() {
  firebase.auth().signOut().then(() => {
    // Logged out successfully.
  }).catch((error) => {
    alert("Error logging out: " + error.message);
  });
}

// Check session on load
firebase.auth().onAuthStateChanged((user) => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) loadingScreen.style.display = 'none';

  if (user) {
    const allowedEmails = STORE_CONFIG.adminEmails ? STORE_CONFIG.adminEmails.map(e => e.toLowerCase().trim()) : [];
    if (allowedEmails.length > 0 && !allowedEmails.includes(user.email.toLowerCase())) {
      alert("Unauthorized email address.");
      logout();
      return;
    }
    // User is signed in and authorized
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
      loadOrders();
      loadSettings();
      loadWholesaleUsers();
      loadWholesaleProducts();
      loadRetailCatalog();
  } else {
    // No user is signed in
    document.getElementById('login-screen').style.display = 'block';
    document.getElementById('admin-dashboard').style.display = 'none';
  }
});

function loadOrders() {
    db.collection('orders').orderBy('date', 'desc').onSnapshot((snapshot) => {
      currentOrders = [];
      const retailTbody = document.getElementById('orders-tbody');
      const wsTbody = document.getElementById('wholesale-orders-tbody');
      
      retailTbody.innerHTML = '';
      if(wsTbody) wsTbody.innerHTML = '';
      
      if (snapshot.empty) {
        retailTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No retail orders found.</td></tr>';
        if(wsTbody) wsTbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No wholesale orders found.</td></tr>';
        return;
      }
  
      snapshot.forEach((doc) => {
        const order = doc.data();
        order.id = doc.id;
        currentOrders.push(order);
        
        const statusClass = `status-${order.status || 'pending'}`;
        const isWholesale = order.orderId && order.orderId.startsWith('WS-');
        
        const rowHTML = `
          <tr>
            <td><strong>${order.orderId || '#---'}</strong></td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${order.customerName || 'N/A'}<br><small>${order.customerPhone || ''}</small></td>
            <td>${formatPrice(order.finalTotal)}</td>
            <td><span class="status-badge ${statusClass}">${order.status || 'pending'}</span></td>
            <td>
              ${(order.status === 'pending' || !order.status) ? `
                <button class="btn-action btn-approve" onclick="updateStatus('${doc.id}', 'approved')">Approve</button>
                <button class="btn-action btn-reject" onclick="updateStatus('${doc.id}', 'rejected')">Reject</button>
              ` : ''}
              <a href="receipt.html?id=${doc.id}" target="_blank" class="btn-action btn-view">View Invoice</a>
            </td>
          </tr>
        `;
        
        if (isWholesale && wsTbody) {
            wsTbody.innerHTML += rowHTML;
        } else {
            retailTbody.innerHTML += rowHTML;
        }
      });
    }, err => {
      console.error("Error loading orders:", err);
      document.getElementById('orders-tbody').innerHTML = '<tr><td colspan="6" style="text-align:center; color:red;">Error loading data</td></tr>';
    });
}

function updateStatus(id, newStatus) {
  if (confirm(`Are you sure you want to mark this order as ${newStatus}?`)) {
    db.collection('orders').doc(id).update({
      status: newStatus
    }).catch(err => alert("Error updating status: " + err));
  }
}

// Delivery Days Logic
const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function loadSettings() {
  db.collection('settings').doc('delivery_days').get().then(doc => {
    let daysConfig = STORE_CONFIG.defaultSlots;
    if (doc.exists) {
      daysConfig = doc.data();
    }
    
    const container = document.getElementById('days-container');
    container.innerHTML = '';
    
    dayNames.forEach(day => {
      const isChecked = daysConfig[day] !== false; // default true if undefined
      container.innerHTML += `
        <div class="day-toggle">
          <input type="checkbox" id="chk-${day}" ${isChecked ? 'checked' : ''}>
          <label for="chk-${day}"><strong>${day}</strong></label>
        </div>
      `;
    });
  }).catch(err => console.error("Error loading settings:", err));
}

function saveDeliveryDays() {
  const newConfig = {};
  dayNames.forEach(day => {
    newConfig[day] = document.getElementById(`chk-${day}`).checked;
  });
  
  db.collection('settings').doc('delivery_days').set(newConfig)
    .then(() => alert("Delivery days updated successfully!"))
    .catch(err => alert("Error saving: " + err));
}

// Tab Switching
function switchTab(tabId) {
  document.querySelectorAll('.admin-tab').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(`tab-${tabId}`).classList.add('active');
  document.getElementById(`btn-tab-${tabId}`).classList.add('active');
}

// Wholesale Users Logic
let currentWholesaleUsers = {};

function loadWholesaleUsers() {
  db.collection('wholesale_users').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
    const tbody = document.getElementById('ws-users-tbody');
    tbody.innerHTML = '';
    if (snapshot.empty) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No wholesale customers found.</td></tr>';
      return;
    }
    
    snapshot.forEach(doc => {
      const u = doc.data();
      currentWholesaleUsers[doc.id] = u;
      const statusClass = `status-${u.status.toLowerCase()}`;
      
      let categorySelect = `
        <select id="cat-${doc.id}" onchange="updateWholesaleCategory('${doc.id}', this.value)">
          <option value="">-- Select --</option>
          <option value="DOVER" ${u.category === 'DOVER' ? 'selected' : ''}>Dover</option>
          <option value="KENT" ${u.category === 'KENT' ? 'selected' : ''}>Kent</option>
          <option value="LONG_DISTANCE" ${u.category === 'LONG_DISTANCE' ? 'selected' : ''}>Long Distance</option>
        </select>
      `;

      let actionButtons = `<button class="btn-action btn-view" onclick="viewWsReviewModal('${doc.id}')">View Details</button>`;
      if (u.status === 'PENDING') {
        actionButtons += `
          <button class="btn-action btn-approve" onclick="updateWholesaleStatus('${doc.id}', 'APPROVED')">Approve</button>
          <button class="btn-action btn-reject" onclick="updateWholesaleStatus('${doc.id}', 'REJECTED')">Reject</button>
        `;
      } else if (u.status === 'APPROVED') {
        actionButtons += `<button class="btn-action btn-reject" style="background:#ffc107; color:black;" onclick="updateWholesaleStatus('${doc.id}', 'SUSPENDED')">Suspend</button>`;
      } else if (u.status === 'SUSPENDED' || u.status === 'REJECTED') {
        actionButtons += `<button class="btn-action btn-approve" onclick="updateWholesaleStatus('${doc.id}', 'APPROVED')">Reactivate/Approve</button>`;
      }

      tbody.innerHTML += `
        <tr>
          <td><strong>${u.fullName}</strong><br><small>${u.company}</small></td>
          <td>${u.email}<br><small>${u.phone}</small></td>
          <td>${u.city}, ${u.postcode}</td>
          <td>${categorySelect}</td>
          <td><span class="status-badge ${statusClass}">${u.status}</span></td>
          <td>${actionButtons}</td>
        </tr>
      `;
    });
  }, err => console.error("Error loading wholesale users:", err));
}

function viewWsReviewModal(uid) {
  const u = currentWholesaleUsers[uid];
  if (!u) return;
  
  document.getElementById('ws-review-details').innerHTML = `
    <p><strong>Name:</strong> ${u.fullName}</p>
    <p><strong>Company:</strong> ${u.company}</p>
    <p><strong>Email:</strong> ${u.email}</p>
    <p><strong>Phone:</strong> ${u.phone}</p>
    <p><strong>Business Type:</strong> ${u.businessType || 'N/A'}</p>
    <p><strong>Address:</strong><br>${u.address}<br>${u.city}, ${u.postcode}</p>
    <p><strong>Applied On:</strong> ${u.createdAt ? new Date(u.createdAt.toDate()).toLocaleString() : 'N/A'}</p>
  `;
  document.getElementById('ws-review-modal-overlay').classList.add('active');
}

function closeWsReviewModal() {
  document.getElementById('ws-review-modal-overlay').classList.remove('active');
}

function updateWholesaleStatus(uid, status) {
  if (confirm(`Change status to ${status}?`)) {
    db.collection('wholesale_users').doc(uid).update({ status: status })
      .catch(err => alert("Error: " + err));
  }
}

function updateWholesaleCategory(uid, category) {
  if (!category) return;
  db.collection('wholesale_users').doc(uid).update({ category: category })
    .then(() => console.log('Category updated'))
    .catch(err => alert("Error updating category: " + err));
}

// Wholesale Pricing Logic
  let currentWholesaleProductsData = [];

  function loadWholesaleProducts() {
    db.collection('wholesale_products').onSnapshot(snapshot => {
      const tbody = document.getElementById('ws-pricing-tbody');
      tbody.innerHTML = '';
      currentWholesaleProductsData = [];
      
      if (snapshot.empty) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No wholesale products found.</td></tr>';
        return;
      }

      snapshot.forEach(doc => {
        const p = doc.data();
        p.id = doc.id;
        currentWholesaleProductsData.push(p);
      });

      // Sort by category then name
      currentWholesaleProductsData.sort((a,b) => ((a.category || '') + (a.name || '')).localeCompare((b.category || '') + (b.name || '')));

      currentWholesaleProductsData.forEach(p => {
        const imageHtml = p.image ? `<img src="${p.image}" alt="Product" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">` : 'No Image';
        const wPrice = p.wholesalePrice ? p.wholesalePrice : (p.price || 0);

        tbody.innerHTML += `
          <tr>
            <td>${imageHtml}</td>
            <td><strong>${p.name}</strong><br><small>${p.subcategory || ''}</small></td>
            <td>${p.category}</td>
            <td>£${Number(wPrice).toFixed(2)}</td>
            <td>
              <button class="btn-action btn-approve" onclick="editWholesaleProduct('${p.id}')">Edit</button>
              <button class="btn-action btn-reject" onclick="deleteWholesaleProduct('${p.id}')">Delete</button>
            </td>
          </tr>
        `;
      });
    });
  }
  
  function showAddWholesaleProductModal() {
    document.getElementById('ws-prod-id').value = '';
    document.getElementById('ws-prod-name').value = '';
    document.getElementById('ws-prod-category').value = '';
    document.getElementById('ws-prod-subcategory').value = '';
    document.getElementById('ws-prod-unit').value = 'item';
    document.getElementById('ws-prod-price').value = '';
    document.getElementById('ws-prod-image').value = '';
    
    document.getElementById('ws-product-modal-title').innerText = "Add Wholesale Product";
    document.getElementById('ws-product-modal-overlay').classList.add('active');
  }

  function closeWsProductModal() {
    document.getElementById('ws-product-modal-overlay').classList.remove('active');
  }

  function editWholesaleProduct(id) {
    const p = currentWholesaleProductsData.find(prod => prod.id === id);
    if (!p) return;
    document.getElementById('ws-prod-id').value = p.id;
    document.getElementById('ws-prod-name').value = p.name || '';
    document.getElementById('ws-prod-category').value = p.category || '';
    document.getElementById('ws-prod-subcategory').value = p.subcategory || '';
    document.getElementById('ws-prod-unit').value = p.unit || 'item';
    const wPrice = p.wholesalePrice ? p.wholesalePrice : (p.price || '');
    document.getElementById('ws-prod-price').value = wPrice;
    document.getElementById('ws-prod-image').value = p.image || '';
    
    document.getElementById('ws-product-modal-title').innerText = "Edit Wholesale Product";
    document.getElementById('ws-product-modal-overlay').classList.add('active');
  }

  async function saveWholesaleProduct() {
    const id = document.getElementById('ws-prod-id').value;
    const name = document.getElementById('ws-prod-name').value.trim();
    const category = document.getElementById('ws-prod-category').value.trim();
    const subcategory = document.getElementById('ws-prod-subcategory').value.trim();
    const unit = document.getElementById('ws-prod-unit').value.trim();
    const price = parseFloat(document.getElementById('ws-prod-price').value);
    const image = document.getElementById('ws-prod-image').value.trim();

    if (!name || !category || !price) return alert("Please fill required fields.");

    const data = { name, category, subcategory, unit, wholesalePrice: price, image };

    if (id) {
      await db.collection('wholesale_products').doc(id).update(data);
    } else {
      await db.collection('wholesale_products').add(data);
    }
    closeWsProductModal();
  }

  function deleteWholesaleProduct(id) {
    if(confirm("Are you sure you want to delete this wholesale product?")) {
      db.collection('wholesale_products').doc(id).delete().catch(err => alert(err));
    }
  }


// Wholesale Migration Script
async function migrateWholesaleCatalog() {
  if (!confirm("This will read WHOLESALE_CATALOG and upload all categories and products to the wholesale database. Proceed?")) return;
  
  if (typeof WHOLESALE_CATALOG === 'undefined') {
    alert("WHOLESALE_CATALOG not found. Make sure catalogue-data.js is loaded.");
    return;
  }
  
  try {
    // Collect unique categories
    const categoriesMap = {};
    WHOLESALE_CATALOG.forEach(item => {
      const catName = item["Tertiary Category"];
      if (catName && !categoriesMap[catName]) {
        categoriesMap[catName] = {
          id: catName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase(),
          name: catName,
          icon: '📦', // Default placeholder icon
          order: Object.keys(categoriesMap).length
        };
      }
    });

    // We can only commit batches of 500 max in Firestore, but usually the dataset isn't that large. 
    // To be safe against large limits, let's just do it sequentially or chunked.
    // Excel size: depends on how many items. Let's do simple sequential uploads for simplicity if it's small, 
    // but batch is faster. Let's chunk into 400 operations.
    let batch = db.batch();
    let opCount = 0;
    let totalCount = 0;

    const commitBatchIfNeeded = async () => {
      if (opCount >= 400) {
        await batch.commit();
        batch = db.batch();
        opCount = 0;
      }
    };

    // 1. Upload categories
    for (const catKey in categoriesMap) {
      const cat = categoriesMap[catKey];
      const catRef = db.collection('wholesale_categories').doc(cat.id);
      batch.set(catRef, cat);
      opCount++;
      await commitBatchIfNeeded();
    }

    // 2. Upload products
    for (const item of WHOLESALE_CATALOG) {
      const pid = String(item["PID"]);
      const prodRef = db.collection('wholesale_products').doc(pid);
      
      const price = parseFloat(item["Dover Marina Price"]) || 0;
      const catName = item["Tertiary Category"] || "Uncategorized";

      batch.set(prodRef, {
        name: item["Product Name"],
        wholesalePrice: price, // Single price for all
        unit: item["Pack Description"] || 'item',
        subcategory: item["Subcategory"] || '',
        category: catName,
        image: 'https://via.placeholder.com/150?text=Product+Image', // Placeholder
        desc: ''
      });
      
      opCount++;
      totalCount++;
      await commitBatchIfNeeded();
    }

    // Commit any remaining
    if (opCount > 0) {
      await batch.commit();
    }
    
    alert(`Successfully migrated ${Object.keys(categoriesMap).length} categories and ${totalCount} products to wholesale Firestore!`);
  } catch (err) {
    console.error(err);
    alert("Error migrating wholesale products: " + err.message);
  }
}

// Category Normalization
window.normalizeWholesaleCategories = async function() {
  if (!confirm("This will normalize all wholesale categories into high-level groups. Proceed?")) return;
  try {
    const productsSnap = await db.collection("wholesale_products").get();
    let batch = db.batch();
    let opCount = 0;
    const newCategoriesSet = new Set();
    let updatedCount = 0;

    function getHighLevelCategory(oldCat) {
      if (!oldCat) return "Miscellaneous";
      const cat = oldCat.toLowerCase();
      
      const produce = ["fruit", "veg", "salad", "apple", "banana", "melon", "berry", "potato", "onion", "mushroom", "carrot", "cabbage", "broccoli", "lettuce", "tomato", "cress", "endive", "roquette", "asparagus", "aubergine", "bean", "beetroot", "celeriac", "ginger", "leek", "mooli", "okra", "parsnip", "pumpkin", "shallot", "squash", "swede", "garlic", "chilli", "herb", "thyme", "rosemary", "radish", "sprout"];
      if (produce.some(p => cat.includes(p))) {
        if (cat.includes("frozen")) return "Frozen Foods";
        if (cat.includes("juice")) return "Beverages";
        return "Fresh Produce";
      }
      if (cat.includes("cheese") || cat.includes("dairy") || cat.includes("egg") || cat.includes("milk") || cat.includes("cream") || cat.includes("yogurt") || cat.includes("yoghurt") || cat.includes("butter") || cat.includes("british")) {
        return "Dairy & Eggs";
      }
      if (cat.includes("fish") || cat.includes("seafood") || cat.includes("meat") || cat.includes("poultry") || cat.includes("beef") || cat.includes("pork") || cat.includes("chicken") || cat.includes("turkey") || cat.includes("sausage") || cat.includes("burger") || cat.includes("prawn") || cat.includes("crustacean") || cat.includes("mollusc")) {
        if (cat.includes("frozen")) return "Frozen Foods";
        return "Meat & Seafood";
      }
      if (cat.includes("frozen") || cat.includes("ice cream")) return "Frozen Foods";
      if (cat.includes("drink") || cat.includes("mix")) return "Beverages";
      if (cat.includes("snack") || cat.includes("bread")) return "Snacks & Bakery";
      if (cat.includes("packaging") || cat.includes("film") || cat.includes("foil")) return "Packaging & Non-Food";
      if (cat.includes("sauce") || cat.includes("spice") || cat.includes("dry") || cat.includes("sugar") || cat.includes("vinegar") || cat.includes("oil") || cat.includes("rice") || cat.includes("paste") || cat.includes("pickle") || cat.includes("seasoning") || cat.includes("gravy") || cat.includes("colouring") || cat.includes("flavouring") || cat.includes("nut") || cat.includes("seed") || cat.includes("lentil") || cat.includes("basmati") || cat.includes("mayonnaise") || cat.includes("accompaniment")) return "Pantry & Dry Goods";
      
      return "Miscellaneous";
    }

    const commitBatchIfNeeded = async () => {
      if (opCount >= 400) {
        await batch.commit();
        batch = db.batch();
        opCount = 0;
      }
    };

    for (let i = 0; i < productsSnap.docs.length; i++) {
      const doc = productsSnap.docs[i];
      const data = doc.data();
      const newCat = getHighLevelCategory(data.category);
      newCategoriesSet.add(newCat);
      batch.update(doc.ref, { category: newCat });
      opCount++;
      updatedCount++;
      await commitBatchIfNeeded();
    }
    
    if (opCount > 0) { await batch.commit(); batch = db.batch(); opCount = 0; }
    
    const catsSnap = await db.collection("wholesale_categories").get();
    for (let i = 0; i < catsSnap.docs.length; i++) {
      batch.delete(catsSnap.docs[i].ref);
      opCount++;
      await commitBatchIfNeeded();
    }
    if (opCount > 0) { await batch.commit(); batch = db.batch(); opCount = 0; }
    
    let order = 0;
    const icons = {
      "Fresh Produce": "🥬", "Dairy & Eggs": "🥚", "Meat & Seafood": "🥩", "Frozen Foods": "❄️", "Beverages": "🥤", "Snacks & Bakery": "🍞", "Packaging & Non-Food": "🥡", "Pantry & Dry Goods": "🥫", "Miscellaneous": "📦"
    };

    for (const catName of newCategoriesSet) {
      const catId = catName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
      const catRef = db.collection("wholesale_categories").doc(catId);
      batch.set(catRef, { id: catId, name: catName, icon: icons[catName] || "📦", order: order++ });
      opCount++;
      await commitBatchIfNeeded();
    }
    if (opCount > 0) { await batch.commit(); }
    
    alert("Successfully normalized " + updatedCount + " products into " + newCategoriesSet.size + " categories!");
  } catch (error) {
    console.error(error);
    alert("Error normalizing categories: " + error.message);
  }
};

window.assignWholesaleImages = async function() {
  if (!confirm("This will auto-assign local images to wholesale products based on name matching. Proceed?")) return;
  const mappings = {
    "8556534": "img/Apple 4 pieces.jfif",
    "7990135": "img/Red grapes punnet.jfif",
    "8273161": "img/Drumstick leaves packet.jfif",
    "7437705": "img/Carrots 500g.jfif",
    "10831457": "img/red onion.jfif",
    "8191290": "img/Green grapes punnet.jfif",
    "9686884": "img/Apple 4 pieces.jfif",
    "9552289": "img/Apple 4 pieces.jfif",
    "9229398": "img/Baby leaf each.jfif",
    "301752": "img/Apple 4 pieces.jfif",
    "885653": "img/TRS Fennel seeds 1kg.jfif",
    "199182": "img/tomatoes.jfif",
    "194805": "img/TRS Red Lentills 2kg.webp",
    "779909": "img/TRS Garam Masala 1kg.jfif",
    "3964614": "img/TRS Chilli Powder 1kg.jfif",
    "4534282": "img/coriander and mint.png",
    "8802098": "img/TRS Chilli Powder 1kg.jfif",
    "6792540": "img/TRS Cardomom Green 750g.jfif",
    "4752084": "img/TRS Turmeric Powder 1kg.jfif",
    "250022": "img/Aubergine each.jfif",
    "353265": "img/Banana 5 pieces.jfif",
    "305436": "img/Blueberry punnet.jfif",
    "198019": "img/image.png",
    "8807261": "img/Mandarin 4 pieces.jfif",
    "198021": "img/Mandarin 4 pieces.jfif",
    "8015577": "img/Honeydew each.jfif",
    "8807241": "img/Cantaloupe each.jfif",
    "198121": "img/Pineapple each.jfif",
    "198176": "img/Strawberry punnet.jfif",
    "635568": "img/coriander and mint.png",
    "3265074": "img/ginger.jpg",
    "200957": "img/Cucumber each.jfif",
    "205823": "img/red onion.jfif",
    "696835": "img/tomatoes.jfif",
    "545698": "img/tomatoes.jfif",
    "220871": "img/tomatoes.jfif",
    "275788": "img/tomatoes.jfif",
    "8652345": "img/Aubergine each.jfif",
    "353267": "img/Carrots 500g.jfif",
    "252869": "img/Cauliflower each.jfif",
    "200784": "img/ginger.jpg",
    "200841": "img/Parsnips kg.jfif",
    "213296": "img/Parsnips kg.jfif",
    "362093": "img/Swede.jfif",
    "8213349": "img/Aubergine each.jfif",
    "2140764": "img/Baby spinach packet.jfif",
    "2338608": "img/garlic.jpg",
    "8500508": "img/auto_8500508.jpg",
    "8918472": "img/auto_8918472.jpg",
    "9430576": "img/auto_9430576.jpg",
    "10831497": "img/auto_10831497.jpg",
    "8459423": "img/auto_8459423.jpg",
    "8773013": "img/auto_8773013.jpg",
    "9430579": "img/auto_9430579.jpg",
    "9686887": "img/auto_9686887.jpg",
    "8500532": "img/auto_8500532.jpg",
    "8773006": "img/auto_8773006.jpg",
    "10831513": "img/auto_10831513.jpg",
    "9430567": "img/auto_9430567.jpg",
    "9430596": "img/auto_9430596.jpg",
    "8459417": "img/auto_8459417.jpg",
    "9430575": "img/auto_9430575.jpg",
    "9569783": "img/auto_9569783.jpg",
    "9766333": "img/auto_9766333.jpg",
    "9268441": "img/auto_9268441.jpg",
    "10404224": "img/auto_10404224.jpg",
    "9229405": "img/auto_9229405.jpg",
    "8918504": "img/auto_8918504.jpg",
    "9746097": "img/auto_9746097.jpg",
    "8772984": "img/auto_8772984.jpg",
    "11142585": "img/auto_11142585.jpg",
    "7990102": "img/auto_7990102.jpg",
    "9229402": "img/auto_9229402.jpg",
    "7990158": "img/auto_7990158.jpg",
    "9569804": "img/auto_9569804.jpg",
    "7990053": "img/auto_7990053.jpg",
    "8191289": "img/auto_8191289.jpg",
    "8273174": "img/auto_8273174.jpg",
    "7990120": "img/auto_7990120.jpg",
    "7990128": "img/auto_7990128.jpg",
    "7990296": "img/auto_7990296.jpg",
    "7990093": "img/auto_7990093.jpg",
    "3432616": "img/auto_3432616.jpg",
    "7990144": "img/auto_7990144.jpg",
    "8556532": "img/auto_8556532.jpg",
    "7990009": "img/auto_7990009.jpg",
    "8208892": "img/auto_8208892.jpg",
    "8273168": "img/auto_8273168.jpg",
    "8887139": "img/auto_8887139.jpg",
    "7989953": "img/auto_7989953.jpg",
    "7990067": "img/auto_7990067.jpg",
    "7990169": "img/auto_7990169.jpg",
    "8685307": "img/auto_8685307.jpg",
    "7990115": "img/auto_7990115.jpg",
    "10404217": "img/auto_10404217.jpg",
    "7990163": "img/auto_7990163.jpg",
    "9228767": "img/auto_9228767.jpg",
    "10154859": "img/auto_10154859.jpg",
    "621884": "img/auto_621884.jpg",
    "9686882": "img/auto_9686882.jpg",
    "192003": "img/auto_192003.jpg",
    "10955766": "img/auto_10955766.jpg",
    "8910915": "img/auto_8910915.jpg",
    "225709": "img/auto_225709.jpg",
    "988745": "img/auto_988745.jpg",
    "10465052": "img/auto_10465052.jpg",
    "885622": "img/auto_885622.jpg",
    "191937": "img/auto_191937.jpg",
    "7329447": "img/auto_7329447.jpg",
    "8773141": "img/auto_8773141.jpg",
    "6774913": "img/auto_6774913.jpg",
    "9873635": "img/auto_9873635.jpg",
    "8803006": "img/auto_8803006.jpg",
    "8812308": "img/auto_8812308.jpg",
    "9745067": "img/auto_9745067.jpg",
    "4301160": "img/auto_4301160.jpg",
    "2389374": "img/auto_2389374.jpg",
    "447177": "img/auto_447177.jpg",
    "1950014": "img/auto_1950014.jpg",
    "9374390": "img/auto_9374390.jpg",
    "8772664": "img/auto_8772664.jpg",
    "8773365": "img/auto_8773365.jpg",
    "8920434": "img/auto_8920434.jpg",
    "4726060": "img/auto_4726060.jpg",
    "8809940": "img/auto_8809940.jpg",
    "8811737": "img/auto_8811737.jpg",
    "8802111": "img/auto_8802111.jpg",
    "9088294": "img/auto_9088294.jpg",
    "250104": "img/auto_250104.jpg",
    "1276375": "img/auto_1276375.jpg",
    "216191": "img/auto_216191.jpg",
    "8920218": "img/auto_8920218.jpg",
    "8803004": "img/auto_8803004.jpg",
    "8803007": "img/auto_8803007.jpg",
    "3802857": "img/auto_3802857.jpg",
    "9943718": "img/auto_9943718.jpg",
    "8773175": "img/auto_8773175.jpg",
    "4756253": "img/auto_4756253.jpg",
    "8773174": "img/auto_8773174.jpg",
    "9716357": "img/auto_9716357.jpg",
    "4253594": "img/auto_4253594.jpg",
    "8772648": "img/auto_8772648.jpg",
    "3282675": "img/auto_3282675.jpg",
    "8811747": "img/auto_8811747.jpg",
    "8772145": "img/auto_8772145.jpg",
    "9061714": "img/auto_9061714.jpg",
    "8772646": "img/auto_8772646.jpg",
    "8811744": "img/auto_8811744.jpg",
    "8920225": "img/auto_8920225.jpg",
    "8809977": "img/auto_8809977.jpg",
    "816351": "img/auto_816351.jpg",
    "2226339": "img/auto_2226339.jpg",
    "196034": "img/auto_196034.jpg",
    "218835": "img/auto_218835.jpg",
    "10585468": "img/auto_10585468.jpg",
    "222916": "img/auto_222916.jpg",
    "8809967": "img/auto_8809967.jpg",
    "3389993": "img/auto_3389993.jpg",
    "8368880": "img/auto_8368880.jpg",
    "8222067": "img/auto_8222067.jpg",
    "4543942": "img/auto_4543942.jpg",
    "8093495": "img/auto_8093495.jpg",
    "8048506": "img/auto_8048506.jpg",
    "3763473": "img/auto_3763473.jpg",
    "8377521": "img/auto_8377521.jpg",
    "474021": "img/auto_474021.jpg",
    "10603587": "img/auto_10603587.jpg",
    "201130": "img/auto_201130.jpg",
    "218528": "img/auto_218528.jpg",
    "1537617": "img/auto_1537617.jpg"
};

  try {
    let batch = db.batch();
    let opCount = 0;
    
    for (const pid in mappings) {
      const ref = db.collection('wholesale_products').doc(pid);
      batch.update(ref, { image: mappings[pid] });
      opCount++;
      if(opCount >= 400) {
        await batch.commit();
        batch = db.batch();
        opCount = 0;
      }
    }
    
    if(opCount > 0) {
      await batch.commit();
    }
    alert("Successfully assigned " + Object.keys(mappings).length + " images to wholesale products!");
  } catch(e) {
    console.error(e);
    alert("Error updating images: " + e.message);
  }
};

window.restoreWholesaleSubcategories = async function() {
  if (!confirm("This will restore the original granular categories to the 'subcategory' field from the catalogue data. Proceed?")) return;
  if (typeof WHOLESALE_CATALOG === 'undefined') {
    alert("WHOLESALE_CATALOG not found. Make sure catalogue-data.js is loaded.");
    return;
  }
  
  try {
    const subcatMap = {};
    WHOLESALE_CATALOG.forEach(item => {
      subcatMap[String(item["PID"])] = item["Tertiary Category"] || "Uncategorized";
    });

    const productsSnap = await db.collection("wholesale_products").get();
    let batch = db.batch();
    let opCount = 0;
    let updatedCount = 0;

    for (let i = 0; i < productsSnap.docs.length; i++) {
      const doc = productsSnap.docs[i];
      const pid = doc.id;
      const subcat = subcatMap[pid] || "Uncategorized";
      
      batch.update(doc.ref, { subcategory: subcat });
      opCount++;
      updatedCount++;
      
      if (opCount >= 400) {
        await batch.commit();
        batch = db.batch();
        opCount = 0;
      }
    }
    
    if (opCount > 0) {
      await batch.commit();
    }
    
    alert(`Successfully restored subcategories for ${updatedCount} products!`);
  } catch (error) {
    console.error(error);
    alert("Error restoring subcategories: " + error.message);
  }
};

// Retail Catalog Logic
function loadRetailCatalog() {
  db.collection('products').onSnapshot(snapshot => {
    const tbody = document.getElementById('retail-products-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (snapshot.empty) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No retail products found in DB.</td></tr>';
      return;
    }
    
    let products = [];
    snapshot.forEach(doc => { products.push({id: doc.id, ...doc.data()}); });
    products.sort((a,b) => ((a.category||'') + (a.name||'')).localeCompare((b.category||'') + (b.name||'')));
    
    products.forEach(p => {
      tbody.innerHTML += `
        <tr>
          <td><img src="${p.image}" alt="${p.name}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;"></td>
          <td><strong>${p.name}</strong></td>
          <td>${p.category}</td>
          <td>£${p.price}</td>
          <td>
            <button class="btn-action btn-approve" onclick="editRetailProduct('${p.id}')">Edit</button>
            <button class="btn-action btn-reject" onclick="deleteRetailProduct('${p.id}')">Delete</button>
          </td>
        </tr>
      `;
    });
  });
}

function deleteRetailProduct(id) {
  if(confirm("Are you sure you want to delete this product?")) {
    db.collection('products').doc(id).delete().catch(err => alert(err));
  }
}

function showAddProductModal() {
  document.getElementById('prod-id').value = '';
  document.getElementById('prod-name').value = '';
  document.getElementById('prod-category').value = '';
  document.getElementById('prod-unit').value = 'item';
  document.getElementById('prod-price').value = '';
  document.getElementById('prod-image').value = '';
  document.getElementById('product-modal-title').innerText = "Add Retail Product";
  
  document.getElementById('product-modal-overlay').classList.add('active');
}

function closeProductModal() {
  document.getElementById('product-modal-overlay').classList.remove('active');
}

function editRetailProduct(id) {
  db.collection('products').doc(id).get().then(doc => {
    if (doc.exists) {
      const p = doc.data();
      document.getElementById('prod-id').value = doc.id;
      document.getElementById('prod-name').value = p.name || '';
      document.getElementById('prod-category').value = p.category || '';
      document.getElementById('prod-unit').value = p.unit || 'item';
      document.getElementById('prod-price').value = p.price || '';
      document.getElementById('prod-image').value = p.image || '';
      
      document.getElementById('product-modal-title').innerText = "Edit Retail Product";
      document.getElementById('product-modal-overlay').classList.add('active');
    }
  });
}

async function saveProduct() {
  const id = document.getElementById('prod-id').value;
  const name = document.getElementById('prod-name').value.trim();
  const category = document.getElementById('prod-category').value.trim();
  const unit = document.getElementById('prod-unit').value.trim();
  const price = parseFloat(document.getElementById('prod-price').value);
  const image = document.getElementById('prod-image').value.trim();

  if (!name || !category || isNaN(price)) {
    return alert("Please fill required fields (Name, Category, Price).");
  }

  const data = { name, category, unit, price, image };

  if (id) {
    await db.collection('products').doc(id).update(data);
  } else {
    await db.collection('products').add(data);
  }
  closeProductModal();
}
