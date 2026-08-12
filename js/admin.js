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
    const tbody = document.getElementById('orders-tbody');
    tbody.innerHTML = '';
    
    if (snapshot.empty) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No orders found.</td></tr>';
      return;
    }

    snapshot.forEach((doc) => {
      const order = doc.data();
      order.id = doc.id;
      currentOrders.push(order);
      
      const statusClass = `status-${order.status || 'pending'}`;
      
      tbody.innerHTML += `
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
let flatProductsList = [];

async function loadWholesaleProducts() {
  const tbody = document.getElementById('ws-pricing-tbody');
  tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Fetching prices...</td></tr>';

  try {
    const [productsSnap, doverSnap, kentSnap, longDistSnap] = await Promise.all([
      db.collection('products').get(),
      db.collection('prices_dover').get(),
      db.collection('prices_kent').get(),
      db.collection('prices_long_distance').get()
    ]);

    flatProductsList = [];
    productsSnap.forEach(doc => {
      const p = doc.data();
      p.id = doc.id;
      flatProductsList.push(p);
    });
    
    // Sort products by category then name
    flatProductsList.sort((a,b) => (a.category + a.name).localeCompare(b.category + b.name));

    const doverPrices = {};
    const kentPrices = {};
    const longDistPrices = {};

    doverSnap.forEach(doc => { doverPrices[doc.id] = doc.data().price; });
    kentSnap.forEach(doc => { kentPrices[doc.id] = doc.data().price; });
    longDistSnap.forEach(doc => { longDistPrices[doc.id] = doc.data().price; });

    tbody.innerHTML = '';
    
    if (flatProductsList.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No products found in database. Run migration first.</td></tr>';
      return;
    }

    flatProductsList.forEach(p => {
      const dPrice = doverPrices[p.id] !== undefined ? doverPrices[p.id] : '';
      const kPrice = kentPrices[p.id] !== undefined ? kentPrices[p.id] : '';
      const lPrice = longDistPrices[p.id] !== undefined ? longDistPrices[p.id] : '';

      tbody.innerHTML += `
        <tr data-pid="${p.id}">
          <td><img src="${p.image}" alt="${p.name}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;"></td>
          <td>${p.name}<br><small style="color:#666;">${p.category}</small></td>
          <td>£${p.price}</td>
          <td><input type="number" step="0.01" class="price-input price-dover" value="${dPrice}"></td>
          <td><input type="number" step="0.01" class="price-input price-kent" value="${kPrice}"></td>
          <td><input type="number" step="0.01" class="price-input price-long" value="${lPrice}"></td>
        </tr>
      `;
    });
  } catch (err) {
    console.error(err);
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:red;">Error loading wholesale prices.</td></tr>';
  }
}

// Retail Catalog Logic
function loadRetailCatalog() {
  db.collection('products').onSnapshot(snapshot => {
    const tbody = document.getElementById('retail-products-tbody');
    tbody.innerHTML = '';
    if (snapshot.empty) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No retail products found in DB. Click Migrate Products to DB.</td></tr>';
      return;
    }
    
    let products = [];
    snapshot.forEach(doc => { products.push({id: doc.id, ...doc.data()}); });
    products.sort((a,b) => (a.category + a.name).localeCompare(b.category + b.name));
    
    products.forEach(p => {
      tbody.innerHTML += `
        <tr>
          <td><img src="${p.image}" alt="${p.name}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;"></td>
          <td><strong>${p.name}</strong></td>
          <td>${p.category}</td>
          <td>£${p.price}</td>
          <td>
            <button class="btn-action btn-reject" onclick="deleteRetailProduct('${p.id}')">Delete</button>
          </td>
        </tr>
      `;
    });
    
    // Also load wholesale prices since we might switch to that tab
    loadWholesaleProducts();
  });
}

function deleteRetailProduct(id) {
  if(confirm("Are you sure you want to delete this product?")) {
    db.collection('products').doc(id).delete().catch(err => alert(err));
  }
}

function showAddProductModal() {
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

async function saveProduct() {
  const name = document.getElementById('prod-name').value.trim();
  const category = document.getElementById('prod-category').value.trim();
  const unit = document.getElementById('prod-unit').value.trim();
  const price = parseFloat(document.getElementById('prod-price').value);
  const image = document.getElementById('prod-image').value.trim();
  
  if (!name || !category || isNaN(price)) {
    alert("Please fill in Name, Category, and Price.");
    return;
  }
  
  const id = 'prod_' + Math.random().toString(36).substring(2, 9);
  
  try {
    await db.collection('products').doc(id).set({
      name,
      category,
      unit,
      price,
      mrp: price,
      image,
      desc: ''
    });
    closeProductModal();
  } catch (err) {
    alert("Error saving: " + err.message);
  }
}

// Migration Script
async function migrateRetailProducts() {
  if (!confirm("This will read PRODUCTS_DATA from js/products.js and upload all categories and products to Firestore. Proceed?")) return;
  
  if (typeof PRODUCTS_DATA === 'undefined') {
    alert("PRODUCTS_DATA not found. Make sure products.js is loaded.");
    return;
  }
  
  try {
    const batch = db.batch();
    let count = 0;
    
    PRODUCTS_DATA.forEach((cat, index) => {
      // Create category doc
      const catRef = db.collection('categories').doc(cat.category.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase());
      batch.set(catRef, {
        name: cat.category,
        icon: cat.icon,
        order: index
      });
      
      // Create product docs
      cat.items.forEach(item => {
        const prodRef = db.collection('products').doc(item.id);
        batch.set(prodRef, {
          name: item.name,
          price: item.price,
          mrp: item.mrp || item.price,
          unit: item.unit || 'item',
          image: item.image,
          desc: item.desc || '',
          category: cat.category
        });
        count++;
      });
    });
    
    await batch.commit();
    alert(`Successfully migrated ${PRODUCTS_DATA.length} categories and ${count} products to Firestore!`);
  } catch (err) {
    console.error(err);
    alert("Error migrating products: " + err.message);
  }
}

async function saveAllWholesalePrices() {
  const rows = document.querySelectorAll('#ws-pricing-tbody tr[data-pid]');
  const batch = db.batch();
  
  rows.forEach(row => {
    const pid = row.getAttribute('data-pid');
    const doverVal = row.querySelector('.price-dover').value;
    const kentVal = row.querySelector('.price-kent').value;
    const longVal = row.querySelector('.price-long').value;

    const doverRef = db.collection('prices_dover').doc(pid);
    if (doverVal !== '') batch.set(doverRef, { price: parseFloat(doverVal) });
    else batch.delete(doverRef);

    const kentRef = db.collection('prices_kent').doc(pid);
    if (kentVal !== '') batch.set(kentRef, { price: parseFloat(kentVal) });
    else batch.delete(kentRef);

    const longRef = db.collection('prices_long_distance').doc(pid);
    if (longVal !== '') batch.set(longRef, { price: parseFloat(longVal) });
    else batch.delete(longRef);
  });

  try {
    await batch.commit();
    alert('All wholesale prices updated successfully!');
  } catch (err) {
    console.error(err);
    alert('Error saving prices: ' + err.message);
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
