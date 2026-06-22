// ============================================
// SPM Distributors — Cart Management
// ============================================

const Cart = (() => {
  let state = {
    items: [],
    serviceType: "delivery", // 'delivery' or 'pickup'
    deliveryLocation: ""
  };
  let listeners = [];

  // Load cart from localStorage
  function load() {
    try {
      const saved = localStorage.getItem(STORE_CONFIG.cartStorageKey);
      if (saved) {
        state = JSON.parse(saved);
        // Ensure defaults if missing
        state.items = state.items || [];
        state.serviceType = state.serviceType || "delivery";
        state.deliveryLocation = state.deliveryLocation || "";
      }
    } catch (e) {
      state = { items: [], serviceType: "delivery", deliveryLocation: "" };
    }
  }

  // Save cart to localStorage
  function save() {
    localStorage.setItem(STORE_CONFIG.cartStorageKey, JSON.stringify(state));
    notifyListeners();
  }

  // Subscribe to cart changes
  function onChange(callback) {
    listeners.push(callback);
  }

  function notifyListeners() {
    listeners.forEach(cb => cb(getState()));
  }

  // Set Service Type
  function setServiceType(type) {
    if (type === "delivery" || type === "pickup") {
      state.serviceType = type;
      save();
    }
  }

  // Set Location
  function setLocation(loc) {
    state.deliveryLocation = loc;
    save();
  }

  // Calculations
  function calculateSubtotal() {
    return state.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  function calculateTaxes(taxableAmount) {
    let totalTax = 0;
    if (STORE_CONFIG.taxes && STORE_CONFIG.taxes.length > 0) {
      STORE_CONFIG.taxes.forEach(tax => {
        totalTax += (taxableAmount * tax.percent) / 100;
      });
    }
    return totalTax;
  }

  function calculateDeliveryFee(subtotal) {
    if (state.serviceType === "pickup") return 0;
    
    const freeLocations = ['Dover', 'Folkestone', 'Aylesham'];
    const paidLocations = ['Ashford', 'Maidstone', 'Canterbury', 'Deal', 'Margate'];
    
    if (freeLocations.includes(state.deliveryLocation)) {
      return 0;
    } else if (paidLocations.includes(state.deliveryLocation)) {
      if (subtotal >= 50) return 0;
      return 1.99;
    }
    
    // Default or not selected
    return 0;
  }

  // Get comprehensive state
  function getState() {
    const items = [...state.items];
    const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = calculateSubtotal();
    
    const taxes = calculateTaxes(subtotal);
    const deliveryFee = calculateDeliveryFee(subtotal);
    
    const finalTotal = subtotal + taxes + deliveryFee;

    return {
      items,
      totalItems,
      subtotal,
      taxes,
      deliveryFee,
      finalTotal,
      serviceType: state.serviceType,
      deliveryLocation: state.deliveryLocation
    };
  }

  // Add item to cart
  function addItem(product) {
    const existing = state.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      state.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.image, // helpful for cart UI
        qty: 1
      });
    }
    save();
  }

  // Remove one quantity
  function decrementItem(productId) {
    const index = state.items.findIndex(i => i.id === productId);
    if (index > -1) {
      state.items[index].qty -= 1;
      if (state.items[index].qty <= 0) {
        state.items.splice(index, 1);
      }
      save();
    }
  }

  // Set quantity directly
  function setQuantity(productId, qty) {
    if (qty <= 0) {
      removeItem(productId);
      return;
    }
    const existing = state.items.find(i => i.id === productId);
    if (existing) {
      existing.qty = qty;
      save();
    }
  }

  // Remove item completely
  function removeItem(productId) {
    state.items = state.items.filter(i => i.id !== productId);
    save();
  }

  // Get quantity of a specific product
  function getQty(productId) {
    const item = state.items.find(i => i.id === productId);
    return item ? item.qty : 0;
  }

  // Clear entire cart
  function clear() {
    state.items = [];
    save();
  }

  // Format price
  function formatPrice(price) {
    return `${STORE_CONFIG.currency}${price.toFixed(2)}`;
  }

  // Initialize
  load();

  return {
    getState,
    addItem,
    decrementItem,
    setQuantity,
    removeItem,
    getQty,
    clear,
    onChange,
    formatPrice,
    setServiceType,
    setLocation
  };
})();
