/* Shopping Cart Management */

// Load cart from localStorage
function loadCart() {
	const saved = localStorage.getItem('cart');
	return saved ? JSON.parse(saved) : [];
}

// Save cart to localStorage
function saveCart(cart) {
	localStorage.setItem('cart', JSON.stringify(cart));
}

// Get cart array
let cart = loadCart();

// Add product to cart
function addToCart(product) {
	cart = loadCart();
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
}

// Remove product from cart
function removeFromCart(productId) {
	cart = loadCart();
	cart = cart.filter((item) => item.id !== productId);
	saveCart(cart);
	updateCartUI();
}

// Increase quantity
function increaseQty(productId) {
	cart = loadCart();
	const item = cart.find((item) => item.id === productId);
	if (item) {
		item.qty++;
		saveCart(cart);
		updateCartUI();
	}
}

// Decrease quantity
function decreaseQty(productId) {
	cart = loadCart();
	const item = cart.find((item) => item.id === productId);
	if (item && item.qty > 1) {
		item.qty--;
		saveCart(cart);
		updateCartUI();
	} else if (item && item.qty === 1) {
		// If quantity is 1 and user tries to decrease, remove from cart
		removeFromCart(productId);
	}
}

// Get cart count (total items)
function getCartCount() {
	cart = loadCart();
	return cart.reduce((total, item) => total + item.qty, 0);
}

// Get total price
function getTotalPrice() {
	cart = loadCart();
	return cart.reduce((total, item) => total + item.price * item.qty, 0);
}

// Update cart UI (cart badge, etc.)
function updateCartUI() {
	const count = getCartCount();
	const cartBadges = document.querySelectorAll('.cart-badge');
	cartBadges.forEach((badge) => {
		if (count > 0) {
			badge.textContent = count;
			badge.style.display = 'inline-block';
		} else {
			badge.style.display = 'none';
		}
	});
	// Dispatch event for navbar and product cards
	window.dispatchEvent(new Event('cartUpdated'));
}

// Initialize cart UI on page load
document.addEventListener('DOMContentLoaded', () => {
	updateCartUI();
});
