// تحميل الـ Navbar تلقائياً في كل صفحة
async function loadNavbar() {
	try {
		// تحديد المسار الصحيح بناءً على موقع الصفحة الحالية
		let navbarPath = '../shared/navbar/navbar.html';

		// إذا كانت الصفحة في المجلد الرئيسي
		if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
			navbarPath = './shared/navbar/navbar.html';
		}

		const response = await fetch(navbarPath);

		if (!response.ok) {
			throw new Error('فشل تحميل الـ Navbar');
		}

		const navbarHTML = await response.text();

		// البحث عن div بـ id="navbar-container"
		const navbarContainer = document.getElementById('navbar-container');

		if (navbarContainer) {
			navbarContainer.innerHTML = navbarHTML;

			// تفعيل JavaScript الخاص بالـ Navbar بعد التحميل
			initializeNavbar();
		} else {
			console.error('لم يتم العثور على #navbar-container');
		}
	} catch (error) {
		console.error('خطأ في تحميل الـ Navbar:', error);
	}
}

// تفعيل وظائف الـ Navbar
function initializeNavbar() {
	// تفعيل زر القائمة المحمولة
	const menuToggle = document.getElementById('menu-toggle');
	const mobileMenu = document.getElementById('mobile-menu');

	if (menuToggle && mobileMenu) {
		menuToggle.addEventListener('click', function (e) {
			e.stopPropagation();
			mobileMenu.classList.toggle('active');
			menuToggle.classList.toggle('active');
		});

		// Close mobile menu when clicking on a link
		const mobileLinks = mobileMenu.querySelectorAll('a');
		mobileLinks.forEach((link) => {
			link.addEventListener('click', () => {
				mobileMenu.classList.remove('active');
				menuToggle.classList.remove('active');
			});
		});

		// Close menu when clicking outside
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

	// تفعيل Modal الموقع
	const registerLinks = document.querySelectorAll(
		'#register-link-mobile, #register-link-desktop',
	);
	const locationModal = document.getElementById('location-modal');
	const closeModalBtn = document.getElementById('close-location-modal');
	const confirmLocationBtn = document.getElementById('confirm-location-btn');

	registerLinks.forEach((link) => {
		if (link) {
			link.addEventListener('click', function (e) {
				// Do not trigger the location modal from register links.
				// If link has no meaningful href, prevent default to avoid jump.
				const href = link.getAttribute('href');
				if (!href || href === '#') e.preventDefault();
			});
		}
	});

	if (closeModalBtn && locationModal) {
		closeModalBtn.addEventListener('click', function () {
			locationModal.style.display = 'none';
		});
	}

	if (confirmLocationBtn && locationModal) {
		confirmLocationBtn.addEventListener('click', function () {
			const branchSelect = document.getElementById('branch-select');
			if (branchSelect && branchSelect.value) {
				// حفظ الفرع المختار
				localStorage.setItem('selectedBranch', branchSelect.value);
				locationModal.style.display = 'none';
				alert('تم اختيار الفرع بنجاح');
			} else {
				alert('يرجى اختيار الفرع');
			}
		});
	}

	// إغلاق Modal عند الضغط خارجه
	if (locationModal) {
		locationModal.addEventListener('click', function (e) {
			if (e.target === locationModal) {
				locationModal.style.display = 'none';
			}
		});
	}

	// تحديث عدد المنتجات في السلة
	updateCartBadges();
}

// تحديث Badge السلة
function updateCartBadges() {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

	const badges = [
		document.getElementById('mobile-cart-badge'),
		document.getElementById('mobile-menu-cart-badge'),
		document.getElementById('desktop-cart-badge'),
	];

	badges.forEach((badge) => {
		if (badge) {
			if (totalItems > 0) {
				badge.textContent = totalItems;
				badge.style.display = 'flex';
			} else {
				badge.style.display = 'none';
			}
		}
	});
}

// تشغيل الدالة عند تحميل الصفحة
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
	loadNavbar();
}

// تحديث Badge عند تغيير localStorage
window.addEventListener('storage', function (e) {
	if (e.key === 'cart') {
		updateCartBadges();
	}
});
