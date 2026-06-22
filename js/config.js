// ============================================
// SPM Distributors — Store Configuration
// ============================================
// Edit these values to customize your store.

const STORE_CONFIG = {
  // Store branding
  name: "SPM Distributors",
  fullName: "SPM Distributors Ltd",
  tagline: "Fresh groceries delivered to your door",
  email: "Info@spmdistributors.co.uk",
  
  // Shop status (can be dynamically managed or static)
  shopTiming: "9:00 AM - 9:00 PM",
  shopStatus: "open", // 'open' or 'closed'

  // WhatsApp number (with country code, no spaces)
  whatsappNumber: "447466885371",

  // Currency settings
  currency: "£",
  currencyCode: "GBP",

  // Admin panel password
  adminPassword: "spm2026",

  // Default delivery day availability
  defaultSlots: {
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: false
  },

  // Service Options
  services: {
    delivery: {
      enabled: true,
      minOrder: 20.00, // Minimum order value to allow delivery
      fee: 3.50, // Flat delivery fee
      freeThreshold: 50.00 // Free delivery if order is above this amount
    },
    pickup: {
      enabled: true,
      fee: 0
    }
  },

  // Taxes
  taxes: [
    // Add taxes if needed. Example:
    // { name: "VAT", percent: 0 }
  ],

  // Coupons (currently disabled)
  coupons: [],

  // Storage keys
  slotsStorageKey: "spm_delivery_slots",
  cartStorageKey: "spm_cart",
  adminAuthKey: "spm_admin_auth"
};
