/* All Shared JavaScript - One File for Everything */

// ============================================
// Shopping Cart Functions
// ============================================

function loadCart() {
	const saved = localStorage.getItem('cart');
	return saved ? JSON.parse(saved) : [];
}

function saveCart(cart) {
	localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartCount() {
	const cart = loadCart();
	return cart.reduce((total, item) => total + item.qty, 0);
}

function getTotalPrice() {
	const cart = loadCart();
	return cart.reduce((total, item) => total + item.price * item.qty, 0);
}

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
	
	// Update floating cart badge
	const floatingBadge = document.getElementById('floating-cart-badge');
	const floatingBtn = document.getElementById('floating-cart-btn');
	if (floatingBadge && floatingBtn) {
		if (count > 0) {
			floatingBadge.textContent = count;
			floatingBadge.style.display = 'flex';
			floatingBtn.classList.remove('hidden');
		} else {
			floatingBadge.style.display = 'none';
			floatingBtn.classList.add('hidden');
		}
	}
	
	window.dispatchEvent(new Event('cartUpdated'));
}

function addToCart(product) {
	let cart = loadCart();
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

function removeFromCart(productId) {
	let cart = loadCart();
	cart = cart.filter((item) => item.id !== productId);
	saveCart(cart);
	updateCartUI();
}

function increaseQty(productId) {
	let cart = loadCart();
	const item = cart.find((item) => item.id === productId);
	if (item) {
		item.qty++;
		saveCart(cart);
		updateCartUI();
	}
}

function decreaseQty(productId) {
	let cart = loadCart();
	const item = cart.find((item) => item.id === productId);
	if (item && item.qty > 1) {
		item.qty--;
		saveCart(cart);
		updateCartUI();
	} else if (item && item.qty === 1) {
		removeFromCart(productId);
	}
}

// ============================================
// Location Modal Functions
// ============================================

function showLocationModal() {
	const modal = document.getElementById('location-modal');
	if (modal) {
		modal.style.display = 'flex';
	}
}

function hideLocationModal() {
	const modal = document.getElementById('location-modal');
	if (modal) {
		modal.style.display = 'none';
	}
}

function getCurrentLocation() {
	const btn = document.getElementById('get-location-btn');
	if (btn) {
		btn.disabled = true;
		btn.textContent = 'جاري التحديد...';
	}

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				if (btn) {
					btn.disabled = false;
					btn.textContent = '📍 موقعي الحالي';
				}
				alert('تم الحصول على موقعك');
			},
			(error) => {
				if (btn) {
					btn.disabled = false;
					btn.textContent = '📍 موقعي الحالي';
				}
				alert('لم نتمكن من الحصول على موقعك');
			},
		);
	} else {
		if (btn) {
			btn.disabled = false;
			btn.textContent = '📍 موقعي الحالي';
		}
		alert('المتصفح لا يدعم تحديد الموقع');
	}
}

function confirmLocation() {
	const select = document.getElementById('branch-select');
	if (select && select.value) {
		localStorage.setItem('userLocation', select.value);
		hideLocationModal();
		alert('تم اختيار الفرع: ' + select.value);
		const pending = localStorage.getItem('pendingRedirect');
		if (pending) {
			localStorage.removeItem('pendingRedirect');
			window.location.href = pending;
			return;
		}
		window.location.reload();
	} else {
		alert('الرجاء اختيار فرع');
	}
}

function initLocationModal() {
	const modal = document.getElementById('location-modal');
	if (!modal) return;

	const closeBtn = modal.querySelector('.close-btn');
	if (closeBtn) {
		closeBtn.addEventListener('click', hideLocationModal);
	}

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			hideLocationModal();
		}
	});

	const getLocationBtn = document.getElementById('get-location-btn');
	if (getLocationBtn) {
		getLocationBtn.addEventListener('click', getCurrentLocation);
	}

	const confirmBtn = document.getElementById('confirm-location-btn');
	if (confirmBtn) {
		confirmBtn.addEventListener('click', confirmLocation);
	}

	const checkoutButtons = document.querySelectorAll('.checkout-btn');
	checkoutButtons.forEach((btn) => {
		btn.addEventListener('click', function (e) {
			const userLocation = localStorage.getItem('userLocation');
			const href = this.getAttribute('href') || this.dataset.href;
			if (!userLocation) {
				e.preventDefault();
				if (href) {
					localStorage.setItem('pendingRedirect', href);
				}
				showLocationModal();
			}
		});
	});
}

// ============================================
// Navbar Loader
// ============================================

async function loadNavbar() {
	try {
		let navbarPath = '../shared/navbar/navbar.html';
		if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
			navbarPath = 'shared/navbar/navbar.html';
		}

		const response = await fetch(navbarPath);
		if (!response.ok) throw new Error('فشل تحميل الـ Navbar');

		const navbarHTML = await response.text();
		const navbarContainer = document.getElementById('navbar-container');

		if (navbarContainer) {
			navbarContainer.innerHTML = navbarHTML;
			initializeNavbar();
		}
	} catch (error) {
		console.error('خطأ في تحميل الـ Navbar:', error);
	}
}

function initializeNavbar() {
	const menuToggle = document.getElementById('menu-toggle');
	const mobileMenu = document.getElementById('mobile-menu');

	if (menuToggle && mobileMenu) {
		menuToggle.addEventListener('click', function (e) {
			e.stopPropagation();
			mobileMenu.classList.toggle('active');
			menuToggle.classList.toggle('active');
		});

		const mobileLinks = mobileMenu.querySelectorAll('a');
		mobileLinks.forEach((link) => {
			link.addEventListener('click', () => {
				mobileMenu.classList.remove('active');
				menuToggle.classList.remove('active');
			});
		});

		document.addEventListener('click', (e) => {
			if (
				!mobileMenu.contains(e.target) &&
				!menuToggle.contains(e.target) &&
				mobileMenu.classList.contains('active')
			) {
				mobileMenu.classList.remove('active');
				menuToggle.classList.remove('active');
			}
		});
	}

	updateCartUI();
}

// ============================================
// Footer Loader
// ============================================

async function loadFooter() {
	try {
		let footerPath = '../shared/footer/footer.html';
		if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
			footerPath = 'shared/footer/footer.html';
		}

		const response = await fetch(footerPath);
		if (!response.ok) throw new Error('فشل تحميل الـ Footer');

		const footerHTML = await response.text();
		const footerContainer = document.getElementById('footer-container');

		if (footerContainer) {
			footerContainer.innerHTML = footerHTML;
			const yearElement = document.getElementById('current-year');
			if (yearElement) {
				yearElement.textContent = new Date().getFullYear();
			}
		}
	} catch (error) {
		console.error('خطأ في تحميل الـ Footer:', error);
	}
}

// ============================================
// Main Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
	// Load navbar and footer
	loadNavbar();
	loadFooter();
	
	// Update cart UI on page load
	updateCartUI();

	// Initialize cart UI
	updateCartUI();

	// Initialize location modal
	initLocationModal();

	// Listen for cart updates
	window.addEventListener('cartUpdated', () => {
		// Cart UI is already updated
	});
});
