/* Food Restaurant JavaScript */

// Products data
const products = [
	{
		id: 1,
		name: 'أرز دجاج',
		price: 45,
		category: 'دواجن',
		image: 'images/food1.png',
	},
	{
		id: 2,
		name: 'كبسة لحم',
		price: 55,
		category: 'لحوم',
		image: 'images/food3.png',
	},
	{
		id: 3,
		name: 'مندي دجاج',
		price: 40,
		category: 'دواجن',
		image: 'images/food2.jpg',
	},
	{
		id: 4,
		name: 'مظبي لحم',
		price: 60,
		category: 'لحوم',
		image: 'images/food3.png',
	},
	{
		id: 5,
		name: 'برياني دجاج',
		price: 38,
		category: 'دواجن',
		image: 'images/food1.png',
	},
	{
		id: 6,
		name: 'مشوي مشكل',
		price: 70,
		category: 'لحوم',
		image: 'images/food2.jpg',
	},
	{
		id: 7,
		name: 'دجاج مشوي',
		price: 35,
		category: 'دواجن',
		image: 'images/food3.png',
	},
	{
		id: 8,
		name: 'ريش مشوي',
		price: 65,
		category: 'لحوم',
		image: 'images/food3.png',
	},
	{
		id: 9,
		name: 'حمص باللحمة',
		price: 30,
		category: 'مقبلات',
		image: 'images/food1.png',
	},
	{
		id: 10,
		name: 'فتوش',
		price: 20,
		category: 'مقبلات',
		image: 'images/food2.jpg',
	},
	{
		id: 11,
		name: 'متبل',
		price: 15,
		category: 'مقبلات',
		image: 'images/food3.png',
	},
	{
		id: 12,
		name: 'فطيرة جبن',
		price: 25,
		category: 'فطائر',
		image: 'images/food1.png',
	},
	{
		id: 13,
		name: 'فطيرة زعتر',
		price: 20,
		category: 'فطائر',
		image: 'images/food2.jpg',
	},
	{
		id: 14,
		name: 'فطيرة لحم',
		price: 30,
		category: 'فطائر',
		image: 'images/food3.png',
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
	const product = products.find((p) => p.id === productId);

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
			decreaseFoodQty(productId);
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
			increaseFoodQty(productId);
		});

		const removeBtn = document.createElement('button');
		removeBtn.className = 'qty-remove-btn';
		removeBtn.title = 'حذف';
		removeBtn.innerHTML = '🗑️';
		removeBtn.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			removeFoodFromCart(productId);
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
			addProductToCart(productId);
		});
		container.appendChild(addBtn);
	}
}

// Render products
function renderProducts(productsToRender, containerId) {
	const container = document.getElementById(containerId);
	if (!container) return;

	container.innerHTML = '';

	productsToRender.forEach((product) => {
		const card = document.createElement('div');
		const cardNumber = (product.id % 6) + 1;
		card.className = `product-card product-card-${cardNumber}`;
		card.style.backgroundImage = `url(${product.image})`;
		card.setAttribute('data-product-id', product.id);

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
function addProductToCart(productId) {
	const product = products.find((p) => p.id === productId);
	if (product) {
		addToCart(product);
		updateProductCardControls(productId);
	}
}

// Increase product quantity
function increaseFoodQty(productId) {
	increaseQty(productId);
	updateProductCardControls(productId);
}

// Decrease product quantity
function decreaseFoodQty(productId) {
	decreaseQty(productId);
	updateProductCardControls(productId);
}

// Remove product from cart
function removeFoodFromCart(productId) {
	removeFromCart(productId);
	updateProductCardControls(productId);
}

// Select category
function selectCategory(category) {
	selectedCategory = category;
	const filteredProducts = products.filter((p) => p.category === category);

	// Filter products in the same container
	const container = document.getElementById('products-section');
	if (!container) return;

	container.innerHTML = '';

	filteredProducts.forEach((product) => {
		const card = document.createElement('div');
		const cardNumber = (product.id % 6) + 1;
		card.className = `product-card product-card-${cardNumber}`;
		card.style.backgroundImage = `url(${product.image})`;
		card.setAttribute('data-product-id', product.id);

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

	// Smooth scroll to products section
	setTimeout(() => {
		container.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, 100);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
	// Render all products initially
	const container = document.getElementById('products-section');
	if (container) {
		container.className = 'products-container';
		renderProducts(products, 'products-section');
	}

	// Listen for cart updates to refresh product controls
	window.addEventListener('cartUpdated', () => {
		products.forEach((product) => {
			updateProductCardControls(product.id);
		});
	});
});
