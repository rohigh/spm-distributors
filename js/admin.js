// Admin Logic
const formatPrice = (price) => '£' + Number(price).toFixed(2);
let currentOrders = [];

function login() {
  const pwd = document.getElementById('admin-pwd').value;
  if (pwd === STORE_CONFIG.adminPassword) {
    sessionStorage.setItem(STORE_CONFIG.adminAuthKey, 'true');
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    loadOrders();
    loadSettings();
  } else {
    alert("Incorrect password");
  }
}

// Check session on load
document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem(STORE_CONFIG.adminAuthKey) === 'true') {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    loadOrders();
    loadSettings();
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
