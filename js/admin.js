// ============================================
// SPM Distributors — Admin Panel Logic
// ============================================

const Admin = (() => {
  let isAuthenticated = false;

  function init() {
    // Check if already authenticated this session
    try {
      const auth = sessionStorage.getItem(STORE_CONFIG.adminAuthKey);
      if (auth === 'true') {
        isAuthenticated = true;
        showPanel();
      }
    } catch (e) {}

    setupLogin();
    setupActions();
  }

  function setupLogin() {
    const loginBtn = document.getElementById('admin-login-btn');
    const passwordInput = document.getElementById('admin-password');
    const errorEl = document.getElementById('admin-error');

    if (loginBtn) {
      loginBtn.addEventListener('click', () => attemptLogin());
    }

    if (passwordInput) {
      passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') attemptLogin();
      });
    }
  }

  function attemptLogin() {
    const passwordInput = document.getElementById('admin-password');
    const errorEl = document.getElementById('admin-error');
    const password = passwordInput.value.trim();

    if (password === STORE_CONFIG.adminPassword) {
      isAuthenticated = true;
      sessionStorage.setItem(STORE_CONFIG.adminAuthKey, 'true');
      showPanel();
    } else {
      errorEl.classList.add('show');
      passwordInput.value = '';
      passwordInput.focus();
      setTimeout(() => errorEl.classList.remove('show'), 3000);
    }
  }

  function showPanel() {
    document.getElementById('admin-login-section').style.display = 'none';
    document.getElementById('admin-panel-section').style.display = 'block';
    loadCurrentSlots();
    loadOrders();
  }

  function loadOrders() {
    const tbody = document.getElementById('orders-tbody');
    if (!tbody) return;
    
    let mockOrders = [];
    try {
      const saved = localStorage.getItem('spm_mock_orders');
      if (saved) mockOrders = JSON.parse(saved);
    } catch(e) {}
    
    // Sort newest first
    mockOrders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (mockOrders.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="padding: 20px; text-align: center; color: var(--neutral-500);">No orders found on this device yet. (Mockup Mode)</td></tr>';
      return;
    }
    
    let html = '';
    mockOrders.forEach((order) => {
      html += `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px;">${order.date || 'Unknown'}</td>
          <td style="padding: 10px; font-weight: bold;">${order.orderId || '#---'}</td>
          <td style="padding: 10px;">${order.customerName || 'Guest'}<br><small style="color: #888;">${order.address || 'Pickup'}</small></td>
          <td style="padding: 10px;">${order.serviceType || 'Delivery'}</td>
          <td style="padding: 10px; color: var(--primary);">£${Number(order.finalTotal).toFixed(2)}</td>
          <td style="padding: 10px;">${order.items ? order.items.length : 0} items</td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  }

  function loadCurrentSlots() {
    let slots;
    try {
      const saved = localStorage.getItem(STORE_CONFIG.slotsStorageKey);
      slots = saved ? JSON.parse(saved) : { ...STORE_CONFIG.defaultSlots };
    } catch (e) {
      slots = { ...STORE_CONFIG.defaultSlots };
    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const list = document.getElementById('slot-toggle-list');

    list.innerHTML = days.map(day => `
      <li class="slot-toggle-item">
        <span class="slot-toggle-label">${day}</span>
        <label class="toggle-switch">
          <input type="checkbox" id="toggle-${day}" ${slots[day] !== false ? 'checked' : ''} />
          <span class="toggle-slider"></span>
        </label>
      </li>
    `).join('');
  }

  function setupActions() {
    const saveBtn = document.getElementById('admin-save-btn');
    const resetBtn = document.getElementById('admin-reset-btn');

    if (saveBtn) saveBtn.addEventListener('click', saveSlots);
    if (resetBtn) resetBtn.addEventListener('click', resetSlots);
  }

  function saveSlots() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const slots = {};

    days.forEach(day => {
      const checkbox = document.getElementById('toggle-' + day);
      slots[day] = checkbox ? checkbox.checked : true;
    });

    localStorage.setItem(STORE_CONFIG.slotsStorageKey, JSON.stringify(slots));
    showToast('✅ Delivery days updated successfully!');
  }

  function resetSlots() {
    localStorage.setItem(STORE_CONFIG.slotsStorageKey, JSON.stringify(STORE_CONFIG.defaultSlots));
    loadCurrentSlots();
    showToast('🔄 Reset to default schedule');
  }

  function showToast(message) {
    const toast = document.getElementById('save-toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  function logout() {
    sessionStorage.removeItem(STORE_CONFIG.adminAuthKey);
    isAuthenticated = false;
    document.getElementById('admin-login-section').style.display = 'block';
    document.getElementById('admin-panel-section').style.display = 'none';
    document.getElementById('admin-password').value = '';
  }

  return { init, logout };
})();

document.addEventListener('DOMContentLoaded', Admin.init);
