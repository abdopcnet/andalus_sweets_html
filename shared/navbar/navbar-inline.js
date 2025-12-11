// طريقة بديلة: وضع HTML مباشرة في JavaScript
function loadNavbarInline() {
    const navbarHTML = `
        <nav class="navbar">
            <div class="navbar-left">
                <a href="/">
                    <img src="/shared/navbar/images/mazaq_alandalus_navbar.jpg" alt="Company Logo" class="logo" />
                </a>
            </div>

            <a href="/orders/orders.html" class="nav-item cart-icon mobile-only-cart">
                <span class="cart-badge" id="mobile-cart-badge" style="display: none">0</span>
                <img src="/shared/navbar/images/cart.png" alt="Cart" />
            </a>

            <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div class="mobile-menu" id="mobile-menu">
                <div class="navbar-center">
                    <a href="/orders/orders.html" class="nav-item">عروض</a>
                    <a href="/contact/contact.html" class="nav-item">
                        <img src="/shared/navbar/images/contact_us.png" alt="" />
                        اتصل بنا
                    </a>
                    <a href="/food/food.html" class="nav-item">
                        <img src="/shared/navbar/images/mazaq_alnubala.jpg" style="height: 4vh" alt="" />
                        مذاق النبلاء للمأكولات
                    </a>
                    <a href="/sweets/sweets.html" class="nav-item">
                        <img src="/shared/navbar/images/mazaq_alandalus_logo.png" style="height: 4vh" alt="" />
                        مذاق الأندلس للحلويات
                    </a>
                    <a href="/special-orders/special-orders.html" class="nav-item">
                        <img src="/shared/navbar/images/delivery.png" style="height: 4vh" alt="" />
                        عروض المناسبات والحفلات
                    </a>
                </div>
                <div class="navbar-right">
                    <a href="/orders/orders.html" class="nav-item cart-icon">
                        <img src="/shared/navbar/images/cart.png" alt="" />
                        عربة التسوق
                        <span class="cart-badge" id="mobile-menu-cart-badge" style="display: none">0</span>
                    </a>
                </div>
            </div>

            <div class="desktop-menu">
                <div class="navbar-center main-links">
                    <a href="/food/food.html" class="nav-item">
                        <img src="/shared/navbar/images/mazaq_alnubala.jpg" style="height: 4vh" alt="" />
                        مذاق النبلاء للمأكولات
                    </a>
                    <a href="/sweets/sweets.html" class="nav-item">
                        <img src="/shared/navbar/images/mazaq_alandalus_logo.png" style="height: 4vh" alt="" />
                        مذاق الأندلس للحلويات
                    </a>
                    <a href="/special-orders/special-orders.html" class="nav-item">
                        <img src="/shared/navbar/images/delivery.png" style="height: 4vh" alt="" />
                        عروض المناسبات والحفلات
                    </a>
                </div>
                <div class="navbar-center">
                    <a href="/contact/contact.html" class="nav-item">
                        <img src="/shared/navbar/images/contact_us.png" alt="" />
                        اتصل بنا
                    </a>
                </div>
                <div class="navbar-right">
                    <a href="/orders/orders.html" class="nav-item cart-icon">
                        <img src="/shared/navbar/images/cart.png" alt="" />
                        عربة التسوق
                        <span class="cart-badge" id="desktop-cart-badge" style="display: none">0</span>
                    </a>
                </div>
            </div>
        </nav>

        <div id="location-modal" class="modal-overlay" style="display: none">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>اختر موقعك</h2>
                    <button class="close-btn" id="close-location-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <select id="branch-select" class="form-control">
                        <option value="">اختر الفرع</option>
                        <option value="khudraa">فرع الخضراء</option>
                        <option value="nawaria">فرع النوارية</option>
                        <option value="sharai">فرع الشرائع</option>
                        <option value="sitteen">فرع الستين</option>
                        <option value="awali">فرع العوالي</option>
                    </select>
                    <button id="get-location-btn" class="location-btn">📍 موقعي الحالي</button>
                    <button id="confirm-location-btn" class="confirm-btn">تأكيد</button>
                </div>
            </div>
        </div>
    `;

    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = navbarHTML;

        // تفعيل وظائف الـ Navbar
        initializeNavbar();
    }
}

// تفعيل وظائف الـ Navbar
function initializeNavbar() {
    // تفعيل زر القائمة المحمولة
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // تفعيل Modal الموقع
    const locationModal = document.getElementById('location-modal');
    const closeModalBtn = document.getElementById('close-location-modal');
    const confirmLocationBtn = document.getElementById('confirm-location-btn');

    if (closeModalBtn && locationModal) {
        closeModalBtn.addEventListener('click', function() {
            locationModal.style.display = 'none';
        });
    }

    if (confirmLocationBtn && locationModal) {
        confirmLocationBtn.addEventListener('click', function() {
            const branchSelect = document.getElementById('branch-select');
            if (branchSelect && branchSelect.value) {
                localStorage.setItem('selectedBranch', branchSelect.value);
                locationModal.style.display = 'none';
                alert('تم اختيار الفرع بنجاح');
            } else {
                alert('يرجى اختيار الفرع');
            }
        });
    }

    if (locationModal) {
        locationModal.addEventListener('click', function(e) {
            if (e.target === locationModal) {
                locationModal.style.display = 'none';
            }
        });
    }

    // تحديث Badge السلة
    updateCartBadges();
}

// تحديث Badge السلة
function updateCartBadges() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    const badges = [
        document.getElementById('mobile-cart-badge'),
        document.getElementById('mobile-menu-cart-badge'),
        document.getElementById('desktop-cart-badge')
    ];

    badges.forEach(badge => {
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

// تشغيل عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbarInline);
} else {
    loadNavbarInline();
}

window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartBadges();
    }
});
