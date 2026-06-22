// ============================================
// SPM Distributors — Checkout Flow
// ============================================

const Checkout = (() => {
  let selectedDay = null;
  let deliverySlots = {};

  function loadSlots() {
    try {
      const saved = localStorage.getItem(STORE_CONFIG.slotsStorageKey);
      deliverySlots = saved ? JSON.parse(saved) : { ...STORE_CONFIG.defaultSlots };
    } catch (e) {
      deliverySlots = { ...STORE_CONFIG.defaultSlots };
    }
  }

  function getUpcomingDays() {
    loadSlots();
    const days = [];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();

    for (let i = 1; i <= 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = dayNames[d.getDay()];
      days.push({
        dayName,
        date: d,
        dateStr: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        available: deliverySlots[dayName] !== false
      });
    }
    return days;
  }

  function open() {
    selectedDay = null;
    const overlay = document.getElementById('checkout-overlay');
    const modal = overlay.querySelector('.checkout-modal');
    renderCheckoutContent(modal);
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    const overlay = document.getElementById('checkout-overlay');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderCheckoutContent(modal) {
    const state = Cart.getState();
    const days = getUpcomingDays();
    const body = modal.querySelector('.checkout-modal-body');
    const isDelivery = state.serviceType === 'delivery';

    body.innerHTML = `
      <div class="order-summary">
        <h3>📦 Order Summary (${isDelivery ? 'Delivery' : 'Pickup'})</h3>
        ${state.items.map(item => `
          <div class="order-summary-item">
            <span>${item.name} × ${item.qty}</span>
            <span>${Cart.formatPrice(item.price * item.qty)}</span>
          </div>
        `).join('')}
        
        <div style="border-top: 1px dashed #ccc; margin-top: 10px; padding-top: 10px;">
          <div class="order-summary-item" style="color: #666;">
            <span>Subtotal</span>
            <span>${Cart.formatPrice(state.subtotal)}</span>
          </div>
          ${isDelivery ? `
          <div class="order-summary-item" style="color: #666;">
            <span>Delivery Fee</span>
            <span>${state.deliveryFee === 0 ? 'Free' : Cart.formatPrice(state.deliveryFee)}</span>
          </div>` : ''}
          ${state.taxes > 0 ? `
          <div class="order-summary-item" style="color: #666;">
            <span>Taxes</span>
            <span>${Cart.formatPrice(state.taxes)}</span>
          </div>` : ''}
          <div class="order-summary-total" style="margin-top: 5px;">
            <span>Total</span>
            <span>${Cart.formatPrice(state.finalTotal)}</span>
          </div>
        </div>
        <div class="cod-badge">💵 Payment: Cash on Delivery</div>
      </div>

      ${isDelivery ? `
      <!-- Delivery Day Picker -->
      <div class="slot-section">
        <h3><span class="section-icon">📅</span> Choose Delivery Day</h3>
        <div class="day-grid" id="day-grid">
          ${days.map((day, i) => `
            <div class="day-option ${day.available ? '' : 'unavailable'}"
                 data-day-index="${i}"
                 data-day-name="${day.dayName}"
                 data-day-date="${day.dateStr}"
                 onclick="${day.available ? `Checkout.selectDay(${i})` : ''}">
              <div class="day-name">${day.dayName.slice(0, 3)}</div>
              <div class="day-date">${day.dateStr}</div>
              <div class="day-status">${day.available ? 'Available' : 'Closed'}</div>
            </div>
          `).join('')}
        </div>
      </div>
      ` : `
      <!-- Pickup Time Picker -->
      <div class="slot-section">
        <h3><span class="section-icon">⏰</span> Choose Pickup Time</h3>
        <div class="form-group" id="fg-pickup-time">
          <input type="datetime-local" id="pickup-time" />
        </div>
      </div>
      `}

      <!-- Customer Info -->
      <div class="slot-section">
        <h3><span class="section-icon">👤</span> Your Details</h3>
        <div class="form-group" id="fg-name">
          <label for="customer-name">Full Name *</label>
          <input type="text" id="customer-name" placeholder="Enter your full name" />
        </div>
        <div class="form-group" id="fg-phone">
          <label for="customer-phone">Phone Number * (10 digits)</label>
          <input type="tel" id="customer-phone" placeholder="e.g. 07xxx xxxxxx" maxlength="10" inputmode="numeric" oninput="this.value=this.value.replace(/[^0-9]/g,'').slice(0,10)" />
        </div>
        ${isDelivery ? `
        <div class="form-group">
          <label>Delivery Area</label>
          <input type="text" value="${state.deliveryLocation}" readonly style="background:#eee; color:#555;" />
        </div>
        <div class="form-group" id="fg-address">
          <label for="customer-address">Full Address *</label>
          <textarea id="customer-address" placeholder="Enter your full delivery address including postcode">${state.deliveryLocation ? state.deliveryLocation + ', ' : ''}</textarea>
        </div>` : ''}
        <div class="form-group" id="fg-notes">
          <label for="customer-notes">Order Notes (optional)</label>
          <textarea id="customer-notes" placeholder="Any special instructions?" rows="2"></textarea>
        </div>
      </div>

      <button class="whatsapp-btn" id="whatsapp-order-btn" onclick="Checkout.submitOrder()">
        Send Order via WhatsApp
      </button>
    `;
  }

  function selectDay(index) {
    selectedDay = index;
    const options = document.querySelectorAll('#day-grid .day-option');
    options.forEach((opt, i) => opt.classList.toggle('selected', i === index));
  }

  function submitOrder() {
    let valid = true;
    const state = Cart.getState();
    const isDelivery = state.serviceType === 'delivery';

    if (isDelivery && selectedDay === null) {
      const grid = document.getElementById('day-grid');
      grid.style.outline = '2px solid var(--error)';
      setTimeout(() => { grid.style.outline = ''; }, 2000);
      valid = false;
    }

    let pickupTime = '';
    if (!isDelivery) {
      pickupTime = document.getElementById('pickup-time').value;
      if (!pickupTime) {
        document.getElementById('fg-pickup-time').classList.add('error');
        valid = false;
      } else {
        document.getElementById('fg-pickup-time').classList.remove('error');
      }
    }

    const name = document.getElementById('customer-name').value.trim();
    if (!name) { document.getElementById('fg-name').classList.add('error'); valid = false; }
    else document.getElementById('fg-name').classList.remove('error');

    const phone = document.getElementById('customer-phone').value.trim();
    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (!phone || phoneDigits.length !== 10) {
      document.getElementById('fg-phone').classList.add('error');
      const phoneInput = document.getElementById('customer-phone');
      phoneInput.placeholder = 'Must be exactly 10 digits';
      valid = false;
    } else {
      document.getElementById('fg-phone').classList.remove('error');
    }

    let address = '';
    if (isDelivery) {
      address = document.getElementById('customer-address').value.trim();
      if (!address) { document.getElementById('fg-address').classList.add('error'); valid = false; }
      else document.getElementById('fg-address').classList.remove('error');
    }

    if (!valid) return;

    const notes = document.getElementById('customer-notes').value.trim();
    
    // Build WhatsApp message
    let message = `🛒 *New Order — ${STORE_CONFIG.name}*\n`;
    message += `🏷️ *Service Type:* ${isDelivery ? 'Delivery' : 'Pickup'}\n\n`;
    message += `📦 *Items:*\n`;
    state.items.forEach(item => {
      message += `• ${item.name} (${item.unit}) × ${item.qty} — ${Cart.formatPrice(item.price * item.qty)}\n`;
    });
    
    message += `\n🧾 *Order Summary:*\n`;
    message += `Subtotal: ${Cart.formatPrice(state.subtotal)}\n`;
    if (isDelivery) message += `Delivery Fee: ${state.deliveryFee === 0 ? 'Free' : Cart.formatPrice(state.deliveryFee)}\n`;
    if (state.taxes > 0) message += `Taxes: ${Cart.formatPrice(state.taxes)}\n`;
    message += `*Total to Pay: ${Cart.formatPrice(state.finalTotal)}*\n`;
    
    message += `\n💵 *Payment:* Cash on Delivery\n\n`;
    
    if (isDelivery) {
      const days = getUpcomingDays();
      message += `📅 *Delivery Day:* ${days[selectedDay].dayName}, ${days[selectedDay].dateStr}\n`;
      message += `🏙️ *Area:* ${state.deliveryLocation}\n`;
      message += `📍 *Address:* ${address}\n`;
    } else {
      message += `⏰ *Pickup Time:* ${new Date(pickupTime).toLocaleString()}\n`;
    }
    
    message += `👤 *Customer:* ${name}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    if (notes) message += `\n📝 *Notes:* ${notes}\n`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encoded}`, '_blank');

    const orderData = {
      orderId: '#' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleString('en-GB'),
      items: state.items,
      subtotal: state.subtotal,
      deliveryFee: state.deliveryFee,
      taxes: state.taxes,
      finalTotal: state.finalTotal,
      serviceType: isDelivery ? 'Delivery' : 'Pickup',
      customerName: name,
      address: isDelivery ? address : 'Store Pickup'
    };
    
    const encodedData = encodeURIComponent(JSON.stringify(orderData));

    Cart.clear();
    close();
    
    // Save to LocalStorage Mockup
    let mockOrders = [];
    try {
      const saved = localStorage.getItem('spm_mock_orders');
      if (saved) mockOrders = JSON.parse(saved);
    } catch(e) {}
    
    mockOrders.push({
      ...orderData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('spm_mock_orders', JSON.stringify(mockOrders));

    window.location.href = 'receipt.html?data=' + encodedData;
  }

  loadSlots();

  return { open, close, selectDay, submitOrder };
})();
