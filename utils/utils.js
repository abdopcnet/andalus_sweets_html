/* Utility Functions */

// Location Modal Functions
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
				console.log('Location:', position.coords);
				if (btn) {
					btn.disabled = false;
					btn.textContent = '📍 موقعي الحالي';
				}
				alert('تم الحصول على موقعك');
			},
			(error) => {
				console.error('Error:', error);
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
		// If there's a pending redirect (user tried to checkout), continue it
		const pending = localStorage.getItem('pendingRedirect');
		if (pending) {
			localStorage.removeItem('pendingRedirect');
			window.location.href = pending;
			return;
		}
		// Otherwise reload to apply location-based behavior
		window.location.reload();
	} else {
		alert('الرجاء اختيار فرع');
	}
}

// Initialize Location Modal
function initLocationModal() {
	const modal = document.getElementById('location-modal');
	if (!modal) return;

	// Close button
	const closeBtn = modal.querySelector('.close-btn');
	if (closeBtn) {
		closeBtn.addEventListener('click', hideLocationModal);
	}

	// Close on overlay click
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			hideLocationModal();
		}
	});

	// Get location button
	const getLocationBtn = document.getElementById('get-location-btn');
	if (getLocationBtn) {
		getLocationBtn.addEventListener('click', getCurrentLocation);
	}

	// Confirm button
	const confirmBtn = document.getElementById('confirm-location-btn');
	if (confirmBtn) {
		confirmBtn.addEventListener('click', confirmLocation);
	}

	// Do NOT auto-show location modal anymore. Instead, show it only when
	// the user initiates an order (clicks a checkout button).
	// Intercept checkout links/buttons to require location first.
	const checkoutButtons = document.querySelectorAll('.checkout-btn');
	checkoutButtons.forEach((btn) => {
		btn.addEventListener('click', function (e) {
			const userLocation = localStorage.getItem('userLocation');
			const href = this.getAttribute('href') || this.dataset.href;
			if (!userLocation) {
				// prevent navigation and show modal; remember where to go
				e.preventDefault();
				if (href) {
					localStorage.setItem('pendingRedirect', href);
				}
				showLocationModal();
			} else {
				// allow default navigation
			}
		});
	});
}

// Navigation Helpers
function navigateTo(path) {
	window.location.href = path;
}

// Check if user has location set
function hasUserLocation() {
	return !!localStorage.getItem('userLocation');
}

// Get user location
function getUserLocation() {
	return localStorage.getItem('userLocation');
}
