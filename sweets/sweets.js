/* Sweets Restaurant JavaScript */

// Products data
const sweetsProducts = [
	{
		id: 1,
		name: ' كيك',
		price: 45,
		category: 'كيك',
		image: 'images/cake.jpg',
	},
	{
		id: 2,
		name: 'كحك ',
		price: 55,
		category: 'كحك',
		image: 'images/kaa7k.jpg',
	},
	{
		id: 3,
		name: ' كنافة',
		price: 40,
		category: 'كنافة',
		image: 'images/konafa.jpg',
	},
	{
		id: 4,
		name: ' كحك',
		price: 60,
		category: 'كحك',
		image: 'images/kaa7k.jpg',
	},
	{
		id: 5,
		name: ' كحك',
		price: 38,
		category: 'كحك',
		image: 'images/cake.jpg',
	},
	{
		id: 6,
		name: ' جلاش',
		price: 70,
		category: 'جلاش',
		image: 'images/sweet2.png',
	},
	{
		id: 7,
		name: ' كيك',
		price: 35,
		category: 'كيك',
		image: 'images/kaa7k.jpg',
	},
	{
		id: 8,
		name: ' كحك',
		price: 65,
		category: 'كحك',
		image: 'images/sweet2.png',
	},
];

let selectedCategory = null;

// Get cart item quantity
function getCartItemQty(productId) {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	const item = cart.find((item) => item.id === productId);
	return item ? item.qty : 0;
}

// Render product card controls
function renderProductControls(productId, container) {
	const qty = getCartItemQty(productId);
	const product = sweetsProducts.find((p) => p.id === productId);

	container.innerHTML = '';

	if (qty > 0) {
		// Show quantity controls
		const controlsDiv = document.createElement('div');
		controlsDiv.className = 'product-quantity-controls';

		const decreaseBtn = document.createElement('button');
		decreaseBtn.className = 'qty-decrease-btn';
		decreaseBtn.textContent = '-';
		if (qty <= 1) {
			decreaseBtn.disabled = true;
		}
		decreaseBtn.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			decreaseSweetsQty(productId);
		});

		const qtyDisplay = document.createElement('span');
		qtyDisplay.className = 'qty-display';
		qtyDisplay.textContent = qty;

		const increaseBtn = document.createElement('button');
		increaseBtn.className = 'qty-increase-btn';
		increaseBtn.textContent = '+';
		increaseBtn.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			increaseSweetsQty(productId);
		});

		const removeBtn = document.createElement('button');
		removeBtn.className = 'qty-remove-btn';
		removeBtn.title = 'حذف';
		removeBtn.innerHTML = '🗑️';
		removeBtn.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			removeSweetsFromCart(productId);
		});

		controlsDiv.appendChild(decreaseBtn);
		controlsDiv.appendChild(qtyDisplay);
		controlsDiv.appendChild(increaseBtn);
		controlsDiv.appendChild(removeBtn);
		container.appendChild(controlsDiv);
	} else {
		// Show add to cart button
		const addBtn = document.createElement('button');
		addBtn.className = 'add-to-cart-btn';
		addBtn.textContent = 'أضف للسلة';
		addBtn.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			addSweetsToCart(productId);
		});
		container.appendChild(addBtn);
	}
}

// Render products
function renderSweetsProducts(productsToRender = null) {
	const container = document.querySelector('.products-container');
	if (!container) return;

	const products = productsToRender || sweetsProducts;
	container.innerHTML = '';

	products.forEach((product) => {
		const card = document.createElement('div');
		const cardNumber = (product.id % 6) + 1;
		card.className = `product-card product-card-${cardNumber}`;
		card.style.backgroundImage = `url(${product.image})`;
		card.setAttribute('data-product-id', product.id);

		const controlsContainer = document.createElement('div');
		controlsContainer.className = 'product-controls-container';

		card.innerHTML = `
      <div class="product-card-content">
        <div class="product-card-info">
          <p class="product-name">${product.name}</p>
          <p class="product-price">${product.price} ريال</p>
        </div>
        <div class="product-controls-container"></div>
      </div>
    `;

		const controlsDiv = card.querySelector('.product-controls-container');
		renderProductControls(product.id, controlsDiv);

		container.appendChild(card);
	});
}

// Update product card controls
function updateProductCardControls(productId) {
	const card = document.querySelector(`[data-product-id="${productId}"]`);
	if (card) {
		const controlsContainer = card.querySelector('.product-controls-container');
		if (controlsContainer) {
			renderProductControls(productId, controlsContainer);
		}
	}
}

// Add product to cart
function addSweetsToCart(productId) {
	const product = sweetsProducts.find((p) => p.id === productId);
	if (product && typeof addToCart === 'function') {
		addToCart(product);
		updateProductCardControls(productId);
	}
}

// Increase product quantity
function increaseSweetsQty(productId) {
	if (typeof increaseQty === 'function') {
		increaseQty(productId);
		updateProductCardControls(productId);
	}
}

// Decrease product quantity
function decreaseSweetsQty(productId) {
	if (typeof decreaseQty === 'function') {
		decreaseQty(productId);
		updateProductCardControls(productId);
	}
}

// Remove product from cart
function removeSweetsFromCart(productId) {
	if (typeof removeFromCart === 'function') {
		removeFromCart(productId);
		updateProductCardControls(productId);
	}
}

// Select category
function selectCategory(category) {
	selectedCategory = category;
	const filteredProducts = sweetsProducts.filter((p) => p.category === category);

	// Filter products in the same container
	const container = document.querySelector('.products-container');
	if (!container) return;

	renderSweetsProducts(filteredProducts);

	// Smooth scroll to products section
	setTimeout(() => {
		container.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, 100);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
	renderSweetsProducts();

	// Listen for cart updates to refresh product controls
	window.addEventListener('cartUpdated', () => {
		sweetsProducts.forEach((product) => {
			updateProductCardControls(product.id);
		});
	});
});
