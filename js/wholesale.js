const Wholesale = {
  init() {
    this.bindEvents();
    this.checkAuthState();
  },

  bindEvents() {
    const googleLoginBtn = document.getElementById('btn-google-login');
    if (googleLoginBtn) {
      googleLoginBtn.addEventListener('click', () => {
        this.loginWithGoogle();
      });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitApplication();
      });
    }

    // Close suggestions and category dropdown on outside click
    document.addEventListener('click', (e) => {
      // Close search suggestions
      const searchContainer = document.querySelector('.search-container');
      if (searchContainer && !searchContainer.contains(e.target)) {
        const suggestionsBox = document.getElementById('ws-search-suggestions');
        if (suggestionsBox) suggestionsBox.style.display = 'none';
        const inputWrapper = document.querySelector('.search-input-wrapper');
        if (inputWrapper) inputWrapper.style.borderRadius = '24px';
      }
      
      // Close custom category dropdown
      const categoryContainer = document.getElementById('ws-category-container');
      if (categoryContainer && !categoryContainer.contains(e.target)) {
        const menu = document.getElementById('ws-custom-dropdown-menu');
        if (menu) menu.classList.remove('show');
      }
    });
  },

  checkAuthState() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is logged in, check their wholesale status
        try {
          const doc = await db.collection('wholesale_users').doc(user.uid).get();
          if (doc.exists) {
            const userData = doc.data();
            this.handleUserStatus(userData);
          } else {
            // Logged in but NO wholesale application. Prompt them to complete it.
            document.getElementById('auth-screen').style.display = 'block';
            document.getElementById('google-login-section').style.display = 'none';
            document.getElementById('complete-application-section').style.display = 'block';
            document.getElementById('wholesale-dashboard').style.display = 'none';
            
            // Pre-fill fields from Google
            document.getElementById('reg-name').value = user.displayName || '';
            document.getElementById('reg-email').value = user.email || '';
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          this.showError('login', 'Error verifying account status: ' + error.message);
          // Do not auto-logout on error so user can see it
          // this.logout();
        }
      } else {
        // Not logged in
        document.getElementById('auth-screen').style.display = 'block';
        
        const googleLogin = document.getElementById('google-login-section');
        if(googleLogin) googleLogin.style.display = 'block';
        
        const completeApp = document.getElementById('complete-application-section');
        if(completeApp) completeApp.style.display = 'none';
        
        document.getElementById('wholesale-dashboard').style.display = 'none';
      }
    });
  },

  handleUserStatus(userData) {
    if (userData.status === 'APPROVED') {
      document.getElementById('auth-screen').style.display = 'none';
      document.getElementById('wholesale-dashboard').style.display = 'block';
      document.getElementById('ws-user-name').innerText = userData.fullName;
      const catEl = document.getElementById('ws-user-category');
      if (catEl) catEl.innerText = userData.category || 'N/A';
      // Load products later
      this.loadWholesaleProducts(userData.category);
    } else if (userData.status === 'PENDING') {
      // Hide the complete application section and show a pending message
      document.getElementById('auth-screen').style.display = 'block';
      
      const googleLogin = document.getElementById('google-login-section');
      if(googleLogin) googleLogin.style.display = 'block';
      
      const completeApp = document.getElementById('complete-application-section');
      if(completeApp) completeApp.style.display = 'none';
      
      document.getElementById('wholesale-dashboard').style.display = 'none';
      
      this.showError('login', 'Your account is currently pending approval. Our team will contact you soon.');
      // Do not auto-logout to avoid UX confusion
      // firebase.auth().signOut();
    } else if (userData.status === 'SUSPENDED') {
      this.showError('login', 'Your wholesale account has been suspended. Please contact support.');
      this.logout(false);
    } else if (userData.status === 'REJECTED') {
      this.showError('login', 'Your wholesale application was not approved.');
      this.logout(false);
    }
  },

  async loginWithGoogle() {
    this.hideError('login');
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      // checkAuthState will handle the rest
    } catch (error) {
      console.error(error);
      this.showError('login', 'Error signing in with Google: ' + error.message);
    }
  },

  async submitApplication() {
    this.hideError('register');
    const user = firebase.auth().currentUser;
    
    if (!user) {
      this.showError('register', 'You must be signed in to submit an application.');
      return;
    }
    
    const btn = document.querySelector('#register-form button');
    btn.disabled = true;
    btn.innerText = 'Submitting...';

    const data = {
      fullName: document.getElementById('reg-name').value.trim(),
      company: document.getElementById('reg-company').value.trim(),
      email: document.getElementById('reg-email').value.trim(),
      phone: document.getElementById('reg-phone').value.trim(),
      address: document.getElementById('reg-address').value.trim(),
      city: document.getElementById('reg-city').value.trim(),
      postcode: document.getElementById('reg-postcode').value.trim(),
      businessType: document.getElementById('reg-business-type').value,
      status: 'PENDING',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
      // Save wholesale user data for the Google user
      await db.collection('wholesale_users').doc(user.uid).set(data);
      
      document.getElementById('register-form').reset();
      
      // Update local state by signing out so they see the PENDING state if they sign in again, or we can just sign them out
      await firebase.auth().signOut();
      
      // Reset UI back to login screen with success msg
      document.getElementById('complete-application-section').style.display = 'none';
      document.getElementById('google-login-section').style.display = 'block';
      
      const successMsg = document.getElementById('register-success');
      // We'll borrow the login error div to show the success message so it's above the login button
      const loginError = document.getElementById('login-error');
      loginError.style.display = 'block';
      loginError.style.color = '#28a745';
      loginError.innerText = 'Your application has been submitted successfully! We will review it shortly.';
      
    } catch (error) {
      console.error(error);
      this.showError('register', error.message);
    } finally {
      btn.disabled = false;
      btn.innerText = 'Submit Application';
    }
  },

  logout(showAlert = true) {
    firebase.auth().signOut().then(() => {
      if (showAlert) alert("Logged out successfully.");
      document.getElementById('wholesale-dashboard').style.display = 'none';
      document.getElementById('auth-screen').style.display = 'block';
    });
  },

  showError(form, message) {
    const el = document.getElementById(`${form}-error`);
    if (el) {
      el.innerText = message;
      el.style.display = 'block';
    }
  },
  
  hideError(form) {
    const el = document.getElementById(`${form}-error`);
    if (el) el.style.display = 'none';
  },

  cart: [],
  wholesaleProducts: [],
  wholesaleCategories: [],
  activeCategory: 'all',
  searchQuery: '',

  handleSearch(query) {
    this.searchQuery = query.toLowerCase().trim();
    
    const clearBtn = document.getElementById('ws-search-clear');
    if (this.searchQuery.length > 0) {
      if (clearBtn) clearBtn.style.display = 'flex';
    } else {
      if (clearBtn) clearBtn.style.display = 'none';
    }

    this.renderSuggestions();
    this.renderProducts();
  },

  clearSearch() {
    const input = document.getElementById('ws-search-input');
    if (input) input.value = '';
    this.handleSearch('');
    const inputWrapper = document.querySelector('.search-input-wrapper');
    if (inputWrapper) inputWrapper.style.borderRadius = '24px';
  },

  renderSuggestions() {
    const suggestionsBox = document.getElementById('ws-search-suggestions');
    const inputWrapper = document.querySelector('.search-input-wrapper');
    if (!suggestionsBox) return;

    if (!this.searchQuery) {
      suggestionsBox.style.display = 'none';
      if (inputWrapper) inputWrapper.style.borderRadius = '24px';
      return;
    }

    const matches = this.wholesaleProducts.filter(p => p.name.toLowerCase().includes(this.searchQuery));
    
    if (matches.length === 0) {
      suggestionsBox.style.display = 'none';
      if (inputWrapper) inputWrapper.style.borderRadius = '24px';
      return;
    }

    // Adjust borders for dropdown effect like Youtube
    if (inputWrapper) {
      inputWrapper.style.borderBottomLeftRadius = '0px';
      inputWrapper.style.borderBottomRightRadius = '0px';
    }

    const topMatches = matches.slice(0, 8);

    suggestionsBox.innerHTML = topMatches.map(p => {
      const name = p.name;
      const lowerName = name.toLowerCase();
      const startIndex = lowerName.indexOf(this.searchQuery);
      
      let highlightedName = name;
      if (startIndex >= 0) {
        const prefix = name.substring(0, startIndex);
        const match = name.substring(startIndex, startIndex + this.searchQuery.length);
        const suffix = name.substring(startIndex + this.searchQuery.length);
        // Youtube style: the un-typed text is bold
        highlightedName = `<strong>${prefix}</strong>${match}<strong>${suffix}</strong>`;
      }

      return `
        <div class="search-suggestion-item" onclick="Wholesale.selectSuggestion('${name.replace(/'/g, "\\'")}')" style="padding: 10px 15px; display: flex; align-items: center; cursor: pointer; gap: 15px;">
          <svg style="color: #999; width: 18px; height: 18px; min-width: 18px;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <span style="font-size: 0.95rem; color: #111;">${highlightedName}</span>
        </div>
      `;
    }).join('');

    suggestionsBox.style.display = 'block';
  },

  selectSuggestion(name) {
    const input = document.getElementById('ws-search-input');
    if (input) input.value = name;
    this.handleSearch(name);
    
    const suggestionsBox = document.getElementById('ws-search-suggestions');
    if (suggestionsBox) suggestionsBox.style.display = 'none';
    
    const inputWrapper = document.querySelector('.search-input-wrapper');
    if (inputWrapper) inputWrapper.style.borderRadius = '24px';
  },

  async loadWholesaleProducts(category) {
    // category here was the user's tier, but now we don't need to load different collections for tiers.
    const container = document.getElementById('ws-products-container');
    container.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';
    
    try {
      const [productsSnap, catsSnap] = await Promise.all([
        db.collection('wholesale_products').get(),
        db.collection('wholesale_categories').orderBy('order').get()
      ]);

      this.wholesaleProducts = [];
      productsSnap.forEach(doc => {
        const item = doc.data();
        item.id = doc.id;
        this.wholesaleProducts.push(item);
      });
      // Sort by name for consistency
      this.wholesaleProducts.sort((a,b) => a.name.localeCompare(b.name));

      this.wholesaleCategories = [];
      catsSnap.forEach(doc => {
        this.wholesaleCategories.push(doc.data());
      });

      this.renderProducts();
      this.loadCart();
    } catch (err) {
      console.error(err);
      container.innerHTML = '<p style="color:red; text-align:center;">Failed to load wholesale catalog.</p>';
    }
  },

  activeSubcategory: null,

  toggleCategoryDropdown() {
    const menu = document.getElementById('ws-custom-dropdown-menu');
    if (menu) menu.classList.toggle('show');
  },

  filterCategory(catName, subCatName = null) {
    this.activeCategory = catName;
    this.activeSubcategory = subCatName;
    
    // Close dropdown
    const menu = document.getElementById('ws-custom-dropdown-menu');
    if (menu) menu.classList.remove('show');
    
    this.renderProducts();
  },

  renderProducts() {
    const container = document.getElementById('ws-products-container');
    const selectContainer = document.getElementById('ws-category-container');
    
    if (!container || !selectContainer) return;

    if (this.wholesaleProducts.length === 0) {
      container.innerHTML = '<p style="text-align:center; padding: 40px;">No wholesale products available.</p>';
      selectContainer.innerHTML = '<button class="custom-dropdown-btn">No categories</button>';
      return;
    }

    // Pre-calculate subcategories for each main category
    const subcatsMap = {};
    this.wholesaleProducts.forEach(p => {
      if (p.category && p.subcategory) {
        if (!subcatsMap[p.category]) subcatsMap[p.category] = new Set();
        subcatsMap[p.category].add(p.subcategory);
      }
    });

    let activeLabel = '🏪 All Categories';
    if (this.activeCategory !== 'all') {
      const catObj = this.wholesaleCategories.find(c => c.name === this.activeCategory);
      activeLabel = catObj ? `${catObj.icon || '📦'} ${catObj.name}` : this.activeCategory;
      if (this.activeSubcategory) {
        activeLabel += ` > ${this.activeSubcategory}`;
      }
    }

    // Render Custom Dropdown
    selectContainer.innerHTML = `
      <button class="custom-dropdown-btn" onclick="Wholesale.toggleCategoryDropdown()">
        <span>${activeLabel}</span>
        <svg style="width: 20px; height: 20px; color: #666;" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      <ul class="custom-dropdown-menu" id="ws-custom-dropdown-menu">
        <li class="dropdown-item ${this.activeCategory === 'all' ? 'active' : ''}" onclick="Wholesale.filterCategory('all')">
          <span>🏪 All Categories</span>
        </li>
        ${this.wholesaleCategories.map(cat => {
          const subcats = subcatsMap[cat.name] ? Array.from(subcatsMap[cat.name]).sort() : [];
          const hasSub = subcats.length > 0;
          return `
            <li class="dropdown-item ${this.activeCategory === cat.name && !this.activeSubcategory ? 'active' : ''} ${hasSub ? 'has-submenu' : ''}" onclick="${hasSub ? '' : `Wholesale.filterCategory('${cat.name.replace(/'/g, "\\'")}')`}">
              <span onclick="Wholesale.filterCategory('${cat.name.replace(/'/g, "\\'")}')" style="flex:1;">${cat.icon || '📦'} ${cat.name}</span>
              ${hasSub ? `
                <ul class="submenu">
                  ${subcats.map(sub => `
                    <li class="dropdown-item ${this.activeSubcategory === sub ? 'active' : ''}" onclick="event.stopPropagation(); Wholesale.filterCategory('${cat.name.replace(/'/g, "\\'")}', '${sub.replace(/'/g, "\\'")}')">${sub}</li>
                  `).join('')}
                </ul>
              ` : ''}
            </li>
          `;
        }).join('')}
      </ul>
    `;

    // Group products by category
    let filtered = this.wholesaleProducts;
    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.activeCategory);
    }
    if (this.activeSubcategory) {
      filtered = filtered.filter(p => p.subcategory === this.activeSubcategory);
    }
    
    if (this.searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(this.searchQuery));
    }

    const grouped = {};
    filtered.forEach(p => {
      const cat = p.category || 'Uncategorized';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(p);
    });

    const displayCategories = this.activeCategory === 'all' ? Object.keys(grouped) : Object.keys(grouped).filter(c => c === this.activeCategory);

    if (displayCategories.length === 0) {
      container.innerHTML = `<div class="no-results"><p>No products found</p></div>`;
      return;
    }

    container.innerHTML = displayCategories.map(catName => {
      // Find category object for icon
      const catObj = this.wholesaleCategories.find(c => c.name === catName) || { icon: '📦' };
      
      return `
      <section class="category-section" id="ws-cat-${catName.replace(/[^a-zA-Z0-9]/g, '')}">
        <div class="category-header">
          <span class="cat-icon">${catObj.icon}</span>
          <h2>${catName}</h2>
          <span class="item-count">${grouped[catName].length} items</span>
        </div>
        <div class="product-grid">
          ${grouped[catName].map(product => this.renderProductCard(product)).join('')}
        </div>
      </section>
    `}).join('');
  },

  renderProductCard(product) {
    const cartItem = this.cart.find(item => item.id === product.id);
    const qty = cartItem ? cartItem.qty : 0;
    const price = product.wholesalePrice || 0;

    return `
      <div class="product-card" id="ws-product-${product.id}">
        <div class="product-info">
          <div class="product-name" onclick="Wholesale.openProductModal('${product.id}')" style="cursor: pointer;">${product.name}</div>
          <div class="product-unit">per ${product.unit}</div>
          <div class="product-footer">
            <div class="price-wrap">
              <div class="product-price">£${price.toFixed(2)}</div>
            </div>
            ${qty > 0
              ? `<div class="qty-control">
                   <button class="qty-btn minus" onclick="Wholesale.decrement('${product.id}')">−</button>
                   <span class="qty-value">${qty}</span>
                   <button class="qty-btn plus" onclick="Wholesale.increment('${product.id}')">+</button>
                 </div>`
              : `<button class="add-btn" onclick="Wholesale.increment('${product.id}')" aria-label="Add to cart">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                     <line x1="12" y1="5" x2="12" y2="19"></line>
                     <line x1="5" y1="12" x2="19" y2="12"></line>
                   </svg>
                 </button>`
            }
          </div>
        </div>
      </div>
    `;
  },

  loadCart() {
    const saved = localStorage.getItem('spm_wholesale_cart');
    if (saved) {
      this.cart = JSON.parse(saved);
    }
    this.updateCartUI();
  },

  saveCart() {
    localStorage.setItem('spm_wholesale_cart', JSON.stringify(this.cart));
    this.updateCartUI();
  },

  increment(id) {
    const product = this.wholesaleProducts.find(p => p.id === id);
    if (!product) return;

    const existing = this.cart.find(item => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.wholesalePrice || 0,
        image: product.image,
        qty: 1
      });
    }
    this.saveCart();
    
    // Refresh only this product card to avoid re-rendering entire grid
    const oldCard = document.getElementById(`ws-product-${id}`);
    if (oldCard) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = this.renderProductCard(product);
      oldCard.replaceWith(tempDiv.firstElementChild);
    }
  },

  decrement(id) {
    const existing = this.cart.find(item => item.id === id);
    if (!existing) return;

    existing.qty -= 1;
    if (existing.qty <= 0) {
      this.cart = this.cart.filter(item => item.id !== id);
    }
    this.saveCart();

    const product = this.wholesaleProducts.find(p => p.id === id);
    const oldCard = document.getElementById(`ws-product-${id}`);
    if (oldCard && product) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = this.renderProductCard(product);
      oldCard.replaceWith(tempDiv.firstElementChild);
    }
  },

  removeFromCart(id) {
    this.cart = this.cart.filter(item => item.id !== id);
    this.saveCart();
    this.renderProducts(); // Need to re-render to show Add button again
  },

  updateCartUI() {
    const count = this.cart.reduce((sum, item) => sum + item.qty, 0);
    const total = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    // Floating cart
    const fcItems = document.getElementById('ws-fc-items');
    const fcTotal = document.getElementById('ws-fc-total');
    const floatingCart = document.getElementById('ws-floating-cart');
    
    if (fcItems) fcItems.innerText = `${count} items`;
    if (fcTotal) fcTotal.innerText = `£${total.toFixed(2)}`;
    
    if (floatingCart) {
      if (count > 0) {
        floatingCart.classList.add('visible');
        floatingCart.style.display = 'flex';
      } else {
        floatingCart.classList.remove('visible');
        floatingCart.style.display = 'none';
      }
    }

    // Cart drawer totals
    const cartTotal = document.getElementById('ws-cart-total');
    if (cartTotal) cartTotal.innerText = `£${total.toFixed(2)}`;
    
    const cartFooter = document.getElementById('ws-cart-footer');
    if (cartFooter) {
      cartFooter.style.display = count > 0 ? 'block' : 'none';
    }

    // Render cart items
    const itemsContainer = document.getElementById('ws-cart-items');
    if (!itemsContainer) return;

    if (this.cart.length === 0) {
      itemsContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Your cart is empty</div>';
      return;
    }

    itemsContainer.innerHTML = this.cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <div class="price">£${item.price.toFixed(2)}</div>
          <div class="qty-control">
            <button class="qty-btn minus" onclick="Wholesale.decrement('${item.id}')">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn plus" onclick="Wholesale.increment('${item.id}')">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="Wholesale.removeFromCart('${item.id}')" aria-label="Remove item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('');
  },

  openCart() {
    const drawer = document.getElementById('ws-cart-drawer');
    const overlay = document.getElementById('ws-cart-overlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
  },

  closeCart() {
    const drawer = document.getElementById('ws-cart-drawer');
    const overlay = document.getElementById('ws-cart-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  },

  openCheckout() {
    this.closeCart();
    document.getElementById('ws-checkout-overlay').style.display = 'flex';
  },

  closeCheckout() {
    document.getElementById('ws-checkout-overlay').style.display = 'none';
  },

  openProductModal(id) {
    const product = this.wholesaleProducts.find(p => p.id === id);
    if (!product) return;
    
    const body = document.getElementById('ws-product-modal-body');
    const overlay = document.getElementById('ws-product-modal-overlay');
    if (!body || !overlay) return;
    
    body.innerHTML = `
      <h2 class="pm-title">${product.name}</h2>
      ${product.desc ? `<div class="pm-desc" style="text-align: left; padding: 10px; background: #f9f9f9; border-radius: 8px; margin: 15px 0;">${product.desc}</div>` : ''}
      <div class="pm-price-wrap">
        <span class="pm-price">£${(product.wholesalePrice || 0).toFixed(2)}</span>
        <span style="color:#888; font-size:0.9rem;">per ${product.unit}</span>
      </div>
      <div class="pm-actions">
        <button class="btn-primary" onclick="Wholesale.increment('${product.id}'); Wholesale.closeProductModal();" style="width:100%; padding: 12px; font-size:1.1rem; margin-top:20px;">
          Add to Cart
        </button>
      </div>
    `;
    overlay.classList.add('active');
  },

  closeProductModal() {
    const overlay = document.getElementById('ws-product-modal-overlay');
    if (overlay) overlay.classList.remove('active');
  },

  async submitOrder() {
    if (this.cart.length === 0) return;
    
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const btn = document.querySelector('#ws-checkout-form button');
    btn.disabled = true;
    btn.innerText = 'Processing...';
    
    const orderData = {
      orderId: 'WS-' + Math.floor(100000 + Math.random() * 900000),
      orderType: 'wholesale',
      userId: user.uid,
      customerName: document.getElementById('ws-chk-name').value,
      customerPhone: document.getElementById('ws-chk-phone').value,
      address: document.getElementById('ws-chk-address').value,
      deliveryDate: document.getElementById('ws-chk-date').value,
      notes: document.getElementById('ws-chk-notes').value,
      items: this.cart,
      subtotal: this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
      deliveryFee: 0,
      finalTotal: this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
      status: 'pending',
      date: new Date().toISOString()
    };
    
    try {
      await db.collection('orders').add(orderData);
      alert('Order placed successfully! Order ID: ' + orderData.orderId);
      this.cart = [];
      this.saveCart();
      this.closeCheckout();
    } catch (err) {
      console.error(err);
      alert('Error placing order: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.innerText = 'Confirm Order';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Wholesale.init();
});
