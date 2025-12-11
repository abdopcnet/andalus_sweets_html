/* Orders Page JavaScript */

// Load and render cart items
function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items-container");
  const emptyCart = document.getElementById("empty-cart");
  const cartSummary = document.getElementById("cart-summary");

  if (cart.length === 0) {
    container.style.display = "none";
    emptyCart.style.display = "block";
    cartSummary.style.display = "none";
    return;
  }

  container.style.display = "block";
  emptyCart.style.display = "none";
  cartSummary.style.display = "block";

  container.innerHTML = "";

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-price">${item.price.toFixed(2)} ريال</p>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="increaseCartItem(${item.id})">+</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" onclick="decreaseCartItem(${item.id})" ${item.qty <= 1 ? 'disabled' : ''}>-</button>
      </div>
      <div class="cart-item-total">
        <span>${(item.price * item.qty).toFixed(2)} ريال</span>
      </div>
      <button class="delete-btn" onclick="removeCartItem(${item.id})">
        <i class="fas fa-trash"></i>
      </button>
    `;
    container.appendChild(cartItem);
  });

  updateTotalPrice();
}

// Increase item quantity
function increaseCartItem(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.qty++;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    if (typeof updateCartUI === "function") {
      updateCartUI();
    }
  }
}

// Decrease item quantity
function decreaseCartItem(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === productId);
  if (item && item.qty > 1) {
    item.qty--;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    if (typeof updateCartUI === "function") {
      updateCartUI();
    }
  }
}

// Remove item from cart
function removeCartItem(productId) {
  if (confirm("هل تريد حذف هذا العنصر من السلة؟")) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    if (typeof updateCartUI === "function") {
      updateCartUI();
    }
  }
}

// Update total price
function updateTotalPrice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const totalPriceElement = document.getElementById("total-price-amount");
  if (totalPriceElement) {
    totalPriceElement.textContent = total.toFixed(2) + " ريال";
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
});

