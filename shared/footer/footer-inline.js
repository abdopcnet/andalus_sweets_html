function loadFooterInline() {
    const footerHTML = `
        <footer class="footer">
            <div class="footer-container">
                <div class="footer-section about">
                    <h3>عن حلويات الأندلس</h3>
                    <p>
                        نقدم لك أشهى الحلويات الشرقية والغربية، وألذ الأكلات البيتية، مع إمكانية
                        تنفيذ طلبات خاصة تُحضّر بحب وجودة عالية.
                    </p>
                    <h3>منتجاتنا</h3>
                    <ul>
                        <li>حلويات غربية</li>
                        <li>حلويات شرقية</li>
                        <li>مأكولات بأنواعها</li>
                        <li>طلبات خاصة للحفلات</li>
                    </ul>
                </div>

                <div class="footer-section branches-map">
                    <h3>فروعنا - المملكة العربية السعودية</h3>
                    <div class="branch-item">
                        <h4>فرع الخضراء - حي الخضراء، مكة المكرمة</h4>
                        <p>📍 +966566956412</p>
                    </div>
                    <div class="branch-item">
                        <h4>فرع العوالي - Ibrahim Al Joufaili, مكة 24372</h4>
                        <p>📍 +966125666555</p>
                    </div>
                    <div class="branch-item">
                        <h4>فرع الشرائع - 8144 المهندس عمر قاضي، الخضراء، مكة</h4>
                        <p>📍 +966125666555</p>
                    </div>
                    <div class="branch-item">
                        <h4>فرع النوارية - العمرة الجديدة، مكة 24416</h4>
                        <p>📍 +966566756481</p>
                    </div>
                    <div class="branch-item">
                        <h4>فرع الستين - 7730 قصر الضيافة، الزهراء، مكة 24225</h4>
                        <p>📍 +966566956895</p>
                    </div>
                </div>

                <div class="footer-section branches-map">
                    <h3>موقعنا</h3>
                    <div class="branches-list">
                        <div class="map-box">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3713.6688259916573!2d39.91637687496799!3d21.473513080232166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c2011b1f773495%3A0x3b4a7e175a5a9267!2z2K3ZhNmI2YrYp9iqINin2YTYo9mG2K_ZhNizIC0g2YHYsdi5INin2YTYrtiu2LHYp9ih!5e0!3m2!1sar!2seg!4v1700000000000"
                                width="100%"
                                height="100%"
                                style="border: 0"
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p><span id="current-year"></span> © جميع الحقوق محفوظة - حلويات الأندلس</p>
            </div>
        </footer>
    `;

    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;

        // تحديث السنة
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}

// تشغيل عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooterInline);
} else {
    loadFooterInline();
}
