/* Main JavaScript - Initialization */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
	// Initialize cart UI
	if (typeof updateCartUI === 'function') {
		updateCartUI();
	}

	// Initialize navbar (mobile menu, cart badge)
	if (typeof initNavbar === 'function') {
		initNavbar();
	} else {
		// If navbar.js is loaded separately, it will initialize itself
		console.log('Navbar will initialize automatically');
	}

	// Initialize location modal
	if (typeof initLocationModal === 'function') {
		initLocationModal();
	}

	// Listen for cart updates from cart.js
	// Note: updateCartUI is already called in cart.js before dispatching the event
	// This event is for product cards and other components to update their UI
	// Do NOT call updateCartUI here to avoid infinite recursion
	window.addEventListener('cartUpdated', () => {
		// Cart UI is already updated in cart.js
		// This event is only for other components (product cards, etc.)
	});
});
