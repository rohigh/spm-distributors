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

    getUpcomingDays() {
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
        available: true // Always available for wholesale
      });
    }
    return days;
  },

  selectDay(index) {
    this.selectedDay = index;
    const options = document.querySelectorAll('#ws-day-grid .day-option');
    options.forEach((opt, i) => opt.classList.toggle('selected', i === index));
  },

  openCheckout() {
    this.closeCart();
    this.selectedDay = null;
    const overlay = document.getElementById('ws-checkout-overlay');
    const body = document.getElementById('ws-checkout-body');
    if (!overlay || !body) return;

    const days = this.getUpcomingDays();
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const user = firebase.auth().currentUser;

    body.innerHTML = `
      <div class="order-summary">
        <h3>📦 Order Summary (Wholesale Delivery)</h3>
        ${this.cart.map(item => `
          <div class="order-summary-item">
            <span>${item.name} × ${item.qty}</span>
            <span>£${(item.price * item.qty).toFixed(2)}</span>
          </div>
        `).join('')}
        
        <div style="border-top: 1px dashed #ccc; margin-top: 10px; padding-top: 10px;">
          <div class="order-summary-item" style="color: #666;">
            <span>Subtotal</span>
            <span>£${subtotal.toFixed(2)}</span>
          </div>
          <div class="order-summary-item" style="color: #666;">
            <span>Delivery Fee</span>
            <span>Free</span>
          </div>
          <div class="order-summary-total" style="margin-top: 5px;">
            <span>Total</span>
            <span>£${subtotal.toFixed(2)}</span>
          </div>
        </div>
        <div class="payment-method-section" style="margin-top: 15px; padding: 15px; background: #f9f9f9; border: 1px solid #eee; border-radius: 8px;">
          <h4 style="margin: 0 0 10px 0; font-size: 1rem; color: #333;">💵 Payment Method</h4>
          <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; cursor: pointer;">
            <input type="radio" name="ws_payment_method" value="Cash on Delivery" checked style="accent-color: #22a660; width: 18px; height: 18px;" />
            <span>Cash on Delivery</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="radio" name="ws_payment_method" value="Card on Delivery" style="accent-color: #22a660; width: 18px; height: 18px;" />
            <span>Card on Delivery</span>
          </label>
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="radio" name="ws_payment_method" value="Invoice / Bank Transfer" style="accent-color: #22a660; width: 18px; height: 18px;" />
            <span>Invoice / Bank Transfer</span>
          </label>
        </div>
      </div>

      <div class="slot-section">
        <h3><span class="section-icon">📅</span> Choose Delivery Day</h3>
        <div class="day-grid" id="ws-day-grid">
          ${days.map((day, i) => `
            <div class="day-option"
                 data-day-index="${i}"
                 data-day-name="${day.dayName}"
                 data-day-date="${day.dateStr}"
                 onclick="Wholesale.selectDay(${i})">
              <div class="day-name">${day.dayName.slice(0, 3)}</div>
              <div class="day-date">${day.dateStr}</div>
              <div class="day-status">Available</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="slot-section">
        <h3><span class="section-icon">👤</span> Your Details</h3>
        <div class="form-group" id="ws-fg-name">
          <label for="ws-customer-name">Full Name *</label>
          <input type="text" id="ws-customer-name" value="${document.getElementById('ws-user-name').innerText}" placeholder="Enter your full name" />
        </div>
        <div class="form-group" id="ws-fg-phone">
          <label for="ws-customer-phone">Phone Number * (10 digits)</label>
          <input type="tel" id="ws-customer-phone" placeholder="e.g. 07xxx xxxxxx" maxlength="10" inputmode="numeric" oninput="this.value=this.value.replace(/[^0-9]/g,'').slice(0,10)" />
        </div>
        <div class="form-group" id="ws-fg-address">
          <label for="ws-customer-address">Full Address *</label>
          <textarea id="ws-customer-address" placeholder="Enter your full delivery address including postcode"></textarea>
        </div>
        <div class="form-group" id="ws-fg-notes">
          <label for="ws-customer-notes">Order Notes (optional)</label>
          <textarea id="ws-customer-notes" placeholder="Any special instructions?" rows="2"></textarea>
        </div>
      </div>

      <button class="whatsapp-btn" id="ws-whatsapp-order-btn" onclick="Wholesale.submitOrder()">
        Send Order via WhatsApp
      </button>
    `;

    overlay.style.display = 'flex';
  },

  closeCheckout() {
    document.getElementById('ws-checkout-overlay').style.display = 'none';
  },

  openProductModal(id) {openProductModal(id) {
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
    
    let valid = true;
    
    if (this.selectedDay === null) {
      const grid = document.getElementById('ws-day-grid');
      grid.style.outline = '2px solid var(--error)';
      setTimeout(() => { grid.style.outline = ''; }, 2000);
      valid = false;
    }
    
    const name = document.getElementById('ws-customer-name').value.trim();
    if (!name) { document.getElementById('ws-fg-name').classList.add('error'); valid = false; }
    else document.getElementById('ws-fg-name').classList.remove('error');

    const phone = document.getElementById('ws-customer-phone').value.trim();
    const phoneDigits = phone.replace(/[^0-9]/g, '');
    if (!phone || phoneDigits.length !== 10) {
      document.getElementById('ws-fg-phone').classList.add('error');
      valid = false;
    } else {
      document.getElementById('ws-fg-phone').classList.remove('error');
    }

    const address = document.getElementById('ws-customer-address').value.trim();
    if (!address) { document.getElementById('ws-fg-address').classList.add('error'); valid = false; }
    else document.getElementById('ws-fg-address').classList.remove('error');

    if (!valid) return;
    
    const user = firebase.auth().currentUser;
    if (!user) return;
    
    const btn = document.getElementById('ws-whatsapp-order-btn');
    btn.disabled = true;
    btn.innerText = 'Processing...';
    
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const notes = document.getElementById('ws-customer-notes').value.trim();
    const paymentMethodEl = document.querySelector('input[name="ws_payment_method"]:checked');
    const paymentMethod = paymentMethodEl ? paymentMethodEl.value : 'Cash on Delivery';
    
    const days = this.getUpcomingDays();
    const selectedDateStr = days[this.selectedDay].dateStr;
    const selectedDayName = days[this.selectedDay].dayName;

    const orderId = 'WS-' + Math.floor(100000 + Math.random() * 900000);
    const receiptUrl = `https://spm-distributors.vercel.app/receipt.html?orderId=${orderId}`;
    
    // Build WhatsApp message
    let message = `🛒 *New Wholesale Order — SPM Distributors*
`;
    message += `📦 *Items:*
`;
    this.cart.forEach(item => {
      message += `🔹 ${item.name} - ${item.qty} × £${item.price.toFixed(2)} = £${(item.price * item.qty).toFixed(2)}
`;
    });
    
    message += `
💰 *Order Summary:*
`;
    message += `Subtotal: £${subtotal.toFixed(2)}
`;
    message += `Delivery Fee: Free
`;
    message += `Total: £${subtotal.toFixed(2)}
`;
    
    message += `
🚚 *Delivery Details:*
`;
    message += `Date: ${selectedDayName}, ${selectedDateStr}
`;
    message += `Name: ${name}
`;
    message += `Phone: ${phone}
`;
    message += `Address: ${address}
`;
    if (notes) message += `Notes: ${notes}
`;
    message += `Payment Method: ${paymentMethod}
`;
    message += `
🧾 *Invoice:* ${receiptUrl}
`;
    
    const orderData = {
      orderId: orderId,
      orderType: 'wholesale',
      userId: user.uid,
      customerName: name,
      customerPhone: phone,
      address: address,
      deliveryDate: `${selectedDayName}, ${selectedDateStr}`,
      notes: notes,
      paymentMethod: paymentMethod,
      items: this.cart,
      subtotal: subtotal,
      deliveryFee: 0,
      finalTotal: subtotal,
      status: 'pending',
      date: new Date().toISOString()
    };
    
    try {
      await db.collection('orders').add(orderData);
      
      const encoded = encodeURIComponent(message);
      // Use STORE_CONFIG.whatsappNumber if config.js is loaded, else fallback
      const waNumber = typeof STORE_CONFIG !== 'undefined' ? STORE_CONFIG.whatsappNumber : "447423545011";
      window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank');
      
      this.cart = [];
      this.saveCart();
      this.closeCheckout();
    } catch (err) {
      console.error(err);
      alert('Error placing order: ' + err.message);
    } finally {
      btn.disabled = false;
      btn.innerText = 'Send Order via WhatsApp';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Wholesale.init();
});
