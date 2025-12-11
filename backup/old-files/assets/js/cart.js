/* Shopping Cart Management */

// Load cart from localStorage
function loadCart() {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Get cart array
let cart = loadCart();

// Add product to cart
function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
    });
  }
  saveCart(cart);
  updateCartUI();
  alert(`تمت إضافة ${product.name} إلى السلة ✅`);
}

// Remove product from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartUI();
}

// Increase quantity
function increaseQty(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.qty++;
    saveCart(cart);
    updateCartUI();
  }
}

// Decrease quantity
function decreaseQty(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item && item.qty > 1) {
    item.qty--;
    saveCart(cart);
    updateCartUI();
  }
}

// Get cart count (total items)
function getCartCount() {
  return cart.reduce((total, item) => total + item.qty, 0);
}

// Get total price
function getTotalPrice() {
  return cart.reduce((total, item) => total + item.price * item.qty, 0);
}

// Update cart UI (cart badge, etc.)
function updateCartUI() {
  const count = getCartCount();
  const cartBadges = document.querySelectorAll(".cart-badge");
  cartBadges.forEach((badge) => {
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = "inline-block";
    } else {
      badge.style.display = "none";
    }
  });
  // Dispatch event for navbar
  window.dispatchEvent(new Event("cartUpdated"));
}

// Initialize cart UI on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
});
