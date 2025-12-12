/* Orders Page JavaScript */

// Load and render cart items
function renderCartItems() {
	const cart = loadCart();
	const container = document.getElementById('cart-items-container');
	const emptyCart = document.getElementById('empty-cart');
	const cartSummary = document.getElementById('cart-summary');

	if (cart.length === 0) {
		container.style.display = 'none';
		emptyCart.style.display = 'block';
		cartSummary.style.display = 'none';
		return;
	}

	container.style.display = 'block';
	emptyCart.style.display = 'none';
	cartSummary.style.display = 'block';

	container.innerHTML = '';

	cart.forEach((item) => {
		const cartItem = document.createElement('div');
		cartItem.className = 'cart-item';
		cartItem.innerHTML = `
      <div class="cart-item-image">
        <img data-cart-img alt="${item.name}" />
      </div>
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-price">${item.price.toFixed(2)} ريال</p>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" data-increase>+</button>
        <span class="qty-value">${item.qty}</span>
        <button class="qty-btn" data-decrease ${item.qty <= 1 ? 'disabled' : ''}>-</button>
      </div>
      <div class="cart-item-total">
        <span>${(item.price * item.qty).toFixed(2)} ريال</span>
      </div>
      <button class="delete-btn" data-remove>
        🗑️
      </button>
    `;

		// Append and then configure dynamic behaviors (image fallbacks and event handlers)
		container.appendChild(cartItem);

		// Image fallback logic: try multiple candidate paths if the original fails
		const imgEl = cartItem.querySelector('img[data-cart-img]');
		const rawPath = item.image || '';
		const candidates = [
			`../food/${rawPath}`,
			`../sweets/${rawPath}`,
			`/food/${rawPath}`,
			`/sweets/${rawPath}`,
			rawPath,
			`../${rawPath}`,
			`/${rawPath}`,
			'/shared/navbar/images/mazaq_alandalus_navbar.jpg',
		].filter(Boolean);

		let tryIndex = 0;
		imgEl.onerror = function () {
			tryIndex++;
			if (tryIndex < candidates.length) {
				imgEl.src = candidates[tryIndex];
			} else {
				// last resort: remove broken icon and show a background color
				imgEl.style.display = 'none';
				const wrapper = cartItem.querySelector('.cart-item-image');
				if (wrapper) wrapper.style.background = '#f2f2f2';
			}
		};
		// start with first candidate
		imgEl.src = candidates[0];

		// Wire up buttons to existing functions
		const incBtn = cartItem.querySelector('button[data-increase]');
		const decBtn = cartItem.querySelector('button[data-decrease]');
		const delBtn = cartItem.querySelector('button[data-remove]');

		if (incBtn) incBtn.addEventListener('click', () => increaseCartItem(item.id));
		if (decBtn) decBtn.addEventListener('click', () => decreaseCartItem(item.id));
		if (delBtn) delBtn.addEventListener('click', () => removeCartItem(item.id));
	});

	updateTotalPrice();
}

// Increase item quantity
function increaseCartItem(productId) {
	let cart = loadCart();
	const item = cart.find((item) => item.id === productId);
	if (item) {
		item.qty++;
		saveCart(cart);
		renderCartItems();
		updateCartUI();
	}
}

// Decrease item quantity
function decreaseCartItem(productId) {
	let cart = loadCart();
	const item = cart.find((item) => item.id === productId);
	if (item && item.qty > 1) {
		item.qty--;
		saveCart(cart);
		renderCartItems();
		updateCartUI();
	}
}

// Remove item from cart
function removeCartItem(productId) {
	let cart = loadCart();
	cart = cart.filter((item) => item.id !== productId);
	saveCart(cart);
	renderCartItems();
	updateCartUI();
}

// Update total price
function updateTotalPrice() {
	const cart = loadCart();
	const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
	const totalPriceElement = document.getElementById('total-price-amount');
	if (totalPriceElement) {
		totalPriceElement.textContent = total.toFixed(2) + ' ريال';
	}
}

// ============================================
// Checkout Modal Functions
// ============================================

// Show checkout modal
function showCheckoutModal() {
	const modal = document.getElementById('checkout-modal');
	if (modal) {
		modal.style.display = 'flex';
		// Set default delivery date to tomorrow
		const tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		const deliveryDateInput = document.getElementById('delivery-date');
		if (deliveryDateInput) {
			deliveryDateInput.value = tomorrow.toISOString().split('T')[0];
		}
	}
}

// Hide checkout modal
function hideCheckoutModal() {
	const modal = document.getElementById('checkout-modal');
	if (modal) {
		modal.style.display = 'none';
		// Reset form
		const form = document.getElementById('checkout-form');
		if (form) {
			form.reset();
		}
		// Clear error/success messages
		const errorDiv = document.getElementById('checkout-error');
		const successDiv = document.getElementById('checkout-success');
		if (errorDiv) errorDiv.style.display = 'none';
		if (successDiv) successDiv.style.display = 'none';
	}
}

// Handle checkout form submission
async function handleCheckoutSubmit(event) {
	event.preventDefault();

	const submitBtn = document.getElementById('submit-order-btn');
	const errorDiv = document.getElementById('checkout-error');
	const successDiv = document.getElementById('checkout-success');

	// Disable submit button
	if (submitBtn) {
		submitBtn.disabled = true;
		submitBtn.textContent = 'جاري المعالجة...';
	}

	// Hide previous messages
	if (errorDiv) errorDiv.style.display = 'none';
	if (successDiv) successDiv.style.display = 'none';

	try {
		// Get form data
		const formData = new FormData(event.target);
		const customerInfo = {
			customer_name: formData.get('customer_name'),
			mobile_no: formData.get('mobile_no'),
			shipping_address: formData.get('shipping_address'),
			delivery_date: formData.get('delivery_date'),
		};

		// Validate required fields
		if (!customerInfo.customer_name || !customerInfo.mobile_no) {
			throw new Error('الرجاء إدخال الاسم الكامل ورقم الهاتف');
		}

		// Submit order to Frappe
		const result = await submitCartAsOrder(customerInfo);

		if (result.success) {
			// Show success message
			if (successDiv) {
				successDiv.textContent = `تم إرسال الطلب بنجاح! رقم الطلب: ${
					result.salesOrder?.name || 'N/A'
				}`;
				successDiv.style.display = 'block';
			}

			// Clear cart and redirect after 3 seconds
			setTimeout(() => {
				hideCheckoutModal();
				window.location.href = '../index.html';
			}, 3000);
		} else {
			throw new Error(result.error || 'فشل إرسال الطلب');
		}
	} catch (error) {
		console.error('Checkout error:', error);
		if (errorDiv) {
			errorDiv.textContent = error.message || 'حدث خطأ أثناء إرسال الطلب';
			errorDiv.style.display = 'block';
		}
		if (submitBtn) {
			submitBtn.disabled = false;
			submitBtn.textContent = 'تأكيد الطلب';
		}
	}
}

// Initialize checkout modal
function initCheckoutModal() {
	const checkoutBtn = document.getElementById('checkout-btn');
	const modal = document.getElementById('checkout-modal');
	const closeBtn = document.querySelector('.checkout-modal-close');
	const cancelBtn = document.getElementById('cancel-checkout-btn');
	const checkoutForm = document.getElementById('checkout-form');

	// Open modal on checkout button click
	if (checkoutBtn) {
		checkoutBtn.addEventListener('click', showCheckoutModal);
	}

	// Close modal on close button click
	if (closeBtn) {
		closeBtn.addEventListener('click', hideCheckoutModal);
	}

	// Close modal on cancel button click
	if (cancelBtn) {
		cancelBtn.addEventListener('click', hideCheckoutModal);
	}

	// Close modal when clicking outside
	if (modal) {
		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				hideCheckoutModal();
			}
		});
	}

	// Handle form submission
	if (checkoutForm) {
		checkoutForm.addEventListener('submit', handleCheckoutSubmit);
	}
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
	renderCartItems();
	initCheckoutModal();
});
