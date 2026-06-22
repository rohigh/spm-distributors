// ============================================
// SPM Distributors — Main App Logic
// ============================================

const App = (() => {
  let products = [];
  let allProducts = [];
  let activeCategory = 'all';
  let searchQuery = '';
  let categoryEmojis = {};

  // Initialize app
  async function init() {
    setupStoreStatus();
    await loadProducts();
    renderProducts();
    setupHeader();
    setupSearch();
    setupCartUI();
    setupCartDrawer();
    setupCheckoutOverlay();
    setupHeroSlider();
    
    Cart.onChange(onCartUpdate);
    onCartUpdate(Cart.getState());
  }

  function setupStoreStatus() {
    const badge = document.getElementById('store-status-badge');
    if (badge) {
      const isOpen = STORE_CONFIG.shopStatus === 'open';
      badge.textContent = isOpen ? 'Open' : 'Closed';
      badge.className = 'store-status ' + (isOpen ? 'open' : 'closed');
      badge.title = STORE_CONFIG.shopTiming;
    }
  }

  function setupHeroSlider() {
    const slides = document.querySelectorAll('#hero-slider .slide');
    const dots = document.querySelectorAll('#slider-dots .dot');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    if (!slides.length) return;

    let currentSlide = 0;
    let slideInterval;

    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startSlider() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    function resetSlider() {
      clearInterval(slideInterval);
      startSlider();
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlider();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlider();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetSlider();
      });
    });

    startSlider();
  }


  async function loadProducts() {
    try {
      const categories = typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA : [];
      products = categories;
      allProducts = [];
      categories.forEach(cat => {
        categoryEmojis[cat.category] = cat.icon;
        cat.items.forEach(item => {
          allProducts.push({ ...item, category: cat.category, icon: cat.icon });
        });
      });
    } catch (e) {
      document.getElementById('products-container').innerHTML = `
        <div class="no-results"><p>Failed to load products</p></div>
      `;
    }
  }

  function renderProducts() {
    const container = document.getElementById('products-container');
    const tabsContainer = document.getElementById('category-tabs');
    let filtered = allProducts;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = allProducts.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    const grouped = {};
    filtered.forEach(p => {
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p);
    });

    const categories = Object.keys(grouped);
    tabsContainer.innerHTML = `
      <button class="category-tab ${activeCategory === 'all' ? 'active' : ''}" onclick="App.filterCategory('all')">
        <span class="tab-icon">🏪</span> All
      </button>
      ${categories.map(cat => `
        <button class="category-tab ${activeCategory === cat ? 'active' : ''}" onclick="App.filterCategory('${cat.replace(/'/g, "\\'")}')">
          <span class="tab-icon">${categoryEmojis[cat] || '📦'}</span> ${cat}
        </button>
      `).join('')}
    `;

    const displayCategories = activeCategory === 'all' ? categories : categories.filter(c => c === activeCategory);
    if (displayCategories.length === 0) {
      container.innerHTML = `<div class="no-results"><p>No products found</p></div>`;
      return;
    }

    container.innerHTML = displayCategories.map(cat => `
      <section class="category-section" id="cat-${cat.replace(/[^a-zA-Z0-9]/g, '')}">
        <div class="category-header">
          <span class="cat-icon">${categoryEmojis[cat] || '📦'}</span>
          <h2>${cat}</h2>
          <span class="item-count">${grouped[cat].length} items</span>
        </div>
        <div class="product-grid">
          ${grouped[cat].map(product => renderProductCard(product)).join('')}
        </div>
      </section>
    `).join('');
  }

  function renderProductCard(product) {
    const qty = Cart.getQty(product.id);
    const hasImage = product.image && product.image.length > 0;
    const isOutOfStock = product.availability === false || (product.available_stock !== undefined && product.available_stock <= 0);
    const hasDiscount = product.mrp > product.price;

    return `
      <div class="product-card ${isOutOfStock ? 'out-of-stock' : ''}" id="product-${product.id}">
        <div class="product-image" onclick="App.openProductModal('${product.id}')" style="cursor: pointer;">
          ${hasImage
            ? `<img src="${product.image}" alt="${product.name}" loading="lazy" />`
            : `<span class="placeholder-icon">${categoryEmojis[product.category] || '🛒'}</span>`
          }
        </div>
        <div class="product-info">
          <div class="product-name" onclick="App.openProductModal('${product.id}')" style="cursor: pointer;">${product.name}</div>
          <div class="product-unit">per ${product.unit}</div>
          ${isOutOfStock ? '<div class="out-of-stock-badge">Out of Stock</div>' : ''}
          <div class="product-footer" style="${isOutOfStock ? 'margin-top: 5px;' : ''}">
            <div class="price-wrap">
              <div class="product-price ${hasDiscount ? 'sale' : ''}">${Cart.formatPrice(product.price)}</div>
              ${hasDiscount ? `<div class="product-mrp">${Cart.formatPrice(product.mrp)}</div>` : ''}
            </div>
            ${!isOutOfStock ? (qty > 0
              ? `<div class="qty-control">
                   <button class="qty-btn minus" onclick="App.decrement('${product.id}')">−</button>
                   <span class="qty-value">${qty}</span>
                   <button class="qty-btn plus" onclick="App.increment('${product.id}')">+</button>
                 </div>`
              : `<button class="add-btn" onclick="App.addToCart('${product.id}')" aria-label="Add to cart">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                     <line x1="12" y1="5" x2="12" y2="19"></line>
                     <line x1="5" y1="12" x2="19" y2="12"></line>
                   </svg>
                 </button>`
            ) : ''}
          </div>
        </div>
      </div>
    `;
  }

  function openProductModal(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    const overlay = document.getElementById('product-modal-overlay');
    const body = document.getElementById('product-modal-body');
    if (!overlay || !body) return;

    const images = [];
    if (product.image) images.push(product.image);
    if (product.secondary_pictures) {
      product.secondary_pictures.forEach(img => {
        if (img !== product.image) images.push(img);
      });
    }

    const hasDiscount = product.mrp > product.price;

    body.innerHTML = `
      <div class="pm-images">
        ${images.length > 0 ? images.map(img => `<img src="${img}" alt="${product.name}" />`).join('') : '<div style="padding: 40px; text-align:center; background:#eee; width:100%;">No image available</div>'}
      </div>
      <h2 class="pm-title">${product.name}</h2>
      ${product.desc ? `<div class="pm-desc" style="text-align: left; padding: 10px; background: #f9f9f9; border-radius: 8px; margin: 15px 0;">${product.desc}</div>` : ''}
      <div class="pm-price-wrap">
        <span class="pm-price ${hasDiscount ? 'sale' : ''}">${Cart.formatPrice(product.price)}</span>
        ${hasDiscount ? `<span class="pm-mrp">${Cart.formatPrice(product.mrp)}</span>` : ''}
        <span style="color:#888; font-size:0.9rem;">per ${product.unit}</span>
      </div>
    `;
    overlay.classList.add('open');
  }

  function closeProductModal() {
    const overlay = document.getElementById('product-modal-overlay');
    if (overlay) overlay.classList.remove('open');
  }

  function filterCategory(cat) {
    activeCategory = cat;
    renderProducts();
    if (cat !== 'all') {
      const section = document.getElementById('cat-' + cat.replace(/[^a-zA-Z0-9]/g, ''));
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function addToCart(productId) {
    if (STORE_CONFIG.shopStatus === 'closed') {
      alert("The store is currently closed.");
      return;
    }
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      Cart.addItem(product);
      animateAdd(productId);
    }
  }

  function increment(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) Cart.addItem(product);
  }

  function decrement(productId) {
    Cart.decrementItem(productId);
  }

  function animateAdd(productId) {
    const card = document.getElementById('product-' + productId);
    const badge = document.getElementById('cart-badge');
    if (badge) {
      badge.classList.remove('bounce');
      void badge.offsetWidth; 
      badge.classList.add('bounce');
    }
    if (card) {
      const rect = card.getBoundingClientRect();
      const emoji = document.createElement('div');
      emoji.className = 'add-feedback';
      emoji.textContent = '✓';
      emoji.style.left = (rect.left + rect.width / 2) + 'px';
      emoji.style.top = (rect.top + rect.height / 2) + 'px';
      document.body.appendChild(emoji);
      setTimeout(() => emoji.remove(), 700);
    }
  }

  function onCartUpdate(state) {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      badge.textContent = state.totalItems;
      badge.classList.toggle('hidden', state.totalItems === 0);
    }
    const floating = document.getElementById('floating-cart');
    if (floating) {
      floating.classList.toggle('visible', state.totalItems > 0);
      const fcItems = floating.querySelector('.fc-items');
      const fcTotal = floating.querySelector('.fc-total');
      if (fcItems) fcItems.textContent = `${state.totalItems} item${state.totalItems !== 1 ? 's' : ''}`;
      if (fcTotal) fcTotal.textContent = Cart.formatPrice(state.subtotal); // floating cart usually shows subtotal
    }
    renderProducts();
    renderCartDrawer();
  }

  function handleServiceChange(type) {
    Cart.setServiceType(type);
  }

  function handleLocationChange(loc) {
    Cart.setLocation(loc);
  }


  function renderCartDrawer() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');
    if (!cartItemsEl) return;
    
    const state = Cart.getState();
    if (state.items.length === 0) {
      cartItemsEl.innerHTML = `
        <div class="cart-empty">
          <div class="empty-icon">🛒</div>
          <p>Your cart is empty</p>
          <span>Browse products and add items to get started</span>
        </div>
      `;
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }
    if (cartFooter) cartFooter.style.display = 'block';

    cartItemsEl.innerHTML = state.items.map(item => {
      let offerNotice = '';
      if (item.id === 'acp_51') {
        const rem = item.qty % 3;
        if (rem === 2) {
          offerNotice = `<div class="item-offer-notice" style="color: #22a660; font-size: 0.8rem; margin-top: 4px; font-weight: bold;">🎉 Add 1 more to get 1 FREE!</div>`;
        } else if (rem === 1) {
          offerNotice = `<div class="item-offer-notice" style="color: #e67e22; font-size: 0.8rem; margin-top: 4px;">💡 Buy 2 get 1 FREE! Add 2 more.</div>`;
        } else if (item.qty > 0) {
          offerNotice = `<div class="item-offer-notice" style="color: #22a660; font-size: 0.8rem; margin-top: 4px; font-weight: bold;">✅ Buy 2 Get 1 Free applied!</div>`;
        }
      } else if (item.id === 'acp_52' || item.id === 'acp_53') {
        const rem = item.qty % 2;
        if (rem === 1) {
          offerNotice = `<div class="item-offer-notice" style="color: #22a660; font-size: 0.8rem; margin-top: 4px; font-weight: bold;">🎉 Add 1 more to get 1 FREE!</div>`;
        } else if (item.qty > 0) {
          offerNotice = `<div class="item-offer-notice" style="color: #22a660; font-size: 0.8rem; margin-top: 4px; font-weight: bold;">✅ Buy 1 Get 1 Free applied!</div>`;
        }
      }

      return `
        <div class="cart-item">
          <div class="cart-item-image">
            ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:contain;padding:10px;border-radius:4px;" />` : '🛒'}
          </div>
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-meta">${Cart.formatPrice(item.price)} / ${item.unit}</div>
            ${offerNotice}
          </div>
          <div class="cart-item-right">
            <div class="cart-item-price">${Cart.formatPrice(item.totalPrice)}</div>
            <div class="cart-item-qty">
              <button class="ciq-minus" onclick="App.decrement('${item.id}')">−</button>
              <span>${item.qty}</span>
              <button class="ciq-plus" onclick="App.increment('${item.id}')">+</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Update Totals
    document.getElementById('cart-subtotal').textContent = Cart.formatPrice(state.subtotal);
    document.getElementById('cart-total').textContent = Cart.formatPrice(state.finalTotal);
    
    // Discount row
    const discountRow = document.getElementById('cart-discount-row');
    if (discountRow) {
      if (state.discount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('cart-discount').textContent = `-${Cart.formatPrice(state.discount)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }
    
    // Tax row
    const taxRow = document.getElementById('cart-tax-row');
    if (state.taxes > 0) {
      taxRow.style.display = 'flex';
      document.getElementById('cart-tax').textContent = Cart.formatPrice(state.taxes);
    } else {
      taxRow.style.display = 'none';
    }

    // Delivery row
    const deliveryRow = document.getElementById('cart-delivery-row');
    const deliverySpan = document.getElementById('cart-delivery');
    if (state.serviceType === 'pickup') {
      deliverySpan.textContent = 'Free';
    } else {
      if (!state.deliveryLocation) {
         deliverySpan.textContent = 'Select Area';
         deliverySpan.className = 'text-muted';
      } else if (state.deliveryFee === 0) {
         deliverySpan.textContent = 'Free';
         deliverySpan.className = 'text-success';
      } else {
         deliverySpan.textContent = Cart.formatPrice(state.deliveryFee);
         deliverySpan.className = '';
      }
    }

    // Location select sync
    const locationRow = document.getElementById('cart-location-row');
    if (locationRow) {
      locationRow.style.display = state.serviceType === 'delivery' ? 'block' : 'none';
    }
    const locationSelect = document.getElementById('delivery-location');
    if (locationSelect) {
      locationSelect.value = state.deliveryLocation;
    }

    // Service radio sync
    const serviceRadios = document.getElementsByName('service_type');
    serviceRadios.forEach(r => r.checked = (r.value === state.serviceType));
    
    // Threshold messaging & Proceed Button
    const thresholdMsg = document.getElementById('cart-threshold-msg');
    const btnProceed = document.getElementById('btn-proceed-checkout');
    thresholdMsg.style.display = 'none';
    btnProceed.disabled = false;
    btnProceed.style.opacity = '1';
    
    if (state.serviceType === 'delivery') {
      const minOrder = STORE_CONFIG.services.delivery.minOrder;
      
      if (!state.deliveryLocation) {
        thresholdMsg.textContent = `Please select a delivery area to proceed.`;
        thresholdMsg.style.display = 'block';
        btnProceed.disabled = true;
        btnProceed.style.opacity = '0.5';
      } else if (state.subtotal < minOrder) {
        const diff = minOrder - state.subtotal;
        thresholdMsg.textContent = `Add ${Cart.formatPrice(diff)} more to reach minimum delivery order.`;
        thresholdMsg.style.display = 'block';
        btnProceed.disabled = true;
        btnProceed.style.opacity = '0.5';
      } else {
        const paidLocations = ['Ashford', 'Maidstone', 'Canterbury', 'Deal', 'Margate'];
        if (paidLocations.includes(state.deliveryLocation) && state.subtotal < 50) {
          const diff = 50 - state.subtotal;
          thresholdMsg.textContent = `Add ${Cart.formatPrice(diff)} more to get FREE Delivery!`;
          thresholdMsg.style.display = 'block';
        }
      }
    }
  }

  function setupHeader() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => { header.classList.toggle('scrolled', window.scrollY > 10); });
  }

  function setupSearch() {
    const toggle = document.getElementById('search-toggle');
    const wrapper = document.getElementById('search-bar-wrapper');
    const input = document.getElementById('search-input');
    if (toggle) {
      toggle.addEventListener('click', () => {
        wrapper.classList.toggle('open');
        if (wrapper.classList.contains('open')) setTimeout(() => input.focus(), 300);
      });
    }
    if (input) {
      let debounce;
      input.addEventListener('input', (e) => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
          searchQuery = e.target.value.trim();
          activeCategory = 'all';
          renderProducts();
        }, 250);
      });
    }
  }

  function setupCartUI() {
    const cartBtn = document.getElementById('cart-btn');
    const closeBtn = document.getElementById('cart-close-btn');
    const floatingCart = document.getElementById('floating-cart');
    if (cartBtn) cartBtn.addEventListener('click', openCartDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
    if (floatingCart) floatingCart.addEventListener('click', openCartDrawer);
  }

  function setupCartDrawer() {
    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.addEventListener('click', closeCartDrawer);
  }

  function openCartDrawer() {
    document.getElementById('cart-overlay').classList.add('open');
    document.getElementById('cart-drawer').classList.add('open');
    document.body.style.overflow = 'hidden';
    renderCartDrawer();
  }

  function closeCartDrawer() {
    document.getElementById('cart-overlay').classList.remove('open');
    document.getElementById('cart-drawer').classList.remove('open');
    document.body.style.overflow = '';
  }

  function setupCheckoutOverlay() {
    const overlay = document.getElementById('checkout-overlay');
    if (overlay) overlay.addEventListener('click', (e) => {
      if (e.target === overlay) Checkout.close();
    });
  }

  function proceedToCheckout() {
    const state = Cart.getState();
    if (state.serviceType === 'delivery' && state.subtotal < STORE_CONFIG.services.delivery.minOrder) return;
    if (state.serviceType === 'delivery' && !state.deliveryLocation) return;
    
    closeCartDrawer();
    setTimeout(() => Checkout.open(), 300);
  }

  return {
    init,
    filterCategory,
    addToCart,
    increment,
    decrement,
    openCartDrawer,
    closeCartDrawer,
    proceedToCheckout,
    handleServiceChange,
    handleLocationChange,
    openProductModal,
    closeProductModal
  };
})();

document.addEventListener('DOMContentLoaded', App.init);
