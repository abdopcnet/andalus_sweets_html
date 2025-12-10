/* Main JavaScript - Initialization */

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize cart UI
  if (typeof updateCartUI === "function") {
    updateCartUI();
  }

  // Initialize navbar (mobile menu, cart badge)
  if (typeof initNavbar === "function") {
    initNavbar();
  } else {
    // If navbar.js is loaded separately, it will initialize itself
    console.log("Navbar will initialize automatically");
  }

  // Initialize location modal
  if (typeof initLocationModal === "function") {
    initLocationModal();
  }

  // Dispatch cart updated event for navbar
  const originalAddToCart = window.addToCart;
  if (originalAddToCart) {
    window.addToCart = function (product) {
      originalAddToCart(product);
      window.dispatchEvent(new Event("cartUpdated"));
    };
  }

  // Listen for cart updates from cart.js
  window.addEventListener("cartUpdated", () => {
    if (typeof updateCartUI === "function") {
      updateCartUI();
    }
  });
});
