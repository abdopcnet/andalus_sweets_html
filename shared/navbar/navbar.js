/* Navbar JavaScript Functions */

// Mobile Menu Toggle
function initMobileMenu() {
	const menuToggle = document.getElementById('menu-toggle');
	const mobileMenu = document.getElementById('mobile-menu');

	if (menuToggle && mobileMenu) {
		menuToggle.addEventListener('click', () => {
			mobileMenu.classList.toggle('is-open');
		});

		// Close menu when clicking outside
		document.addEventListener('click', (e) => {
			if (
				!mobileMenu.contains(e.target) &&
				!menuToggle.contains(e.target) &&
				mobileMenu.classList.contains('is-open')
			) {
				mobileMenu.classList.remove('is-open');
			}
		});
	}
}

// Update Cart Badge
function updateCartBadge() {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	const count = cart.reduce((total, item) => total + item.qty, 0);

	const badges = document.querySelectorAll('.cart-badge');
	badges.forEach((badge) => {
		if (count > 0) {
			badge.textContent = count;
			badge.style.display = 'inline-block';
		} else {
			badge.style.display = 'none';
		}
	});
}

// Initialize Navbar
function initNavbar() {
	initMobileMenu();
	updateCartBadge();

	// Update cart badge when cart changes
	window.addEventListener('storage', (e) => {
		if (e.key === 'cart') {
			updateCartBadge();
		}
	});

	// Also listen for custom cart update events
	window.addEventListener('cartUpdated', () => {
		updateCartBadge();
	});

	// Register link handlers
	const registerLinks = document.querySelectorAll(
		'#register-link-mobile, #register-link-desktop',
	);
	registerLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			// Do not trigger location modal here. If the link has a real href,
			// allow default navigation; otherwise prevent default to avoid page jump.
			const href = link.getAttribute('href');
			if (!href || href === '#') {
				e.preventDefault();
			}
		});
	});
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initNavbar);
} else {
	initNavbar();
}
