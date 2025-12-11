async function loadFooter() {
    try {
        // تحديد المسار الصحيح بناءً على موقع الصفحة الحالية
        let footerPath = '../shared/footer/footer.html';

        // إذا كانت الصفحة في المجلد الرئيسي
        if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
            footerPath = './shared/footer/footer.html';
        }

        const response = await fetch(footerPath);

        if (!response.ok) {
            throw new Error('فشل تحميل الـ Footer');
        }

        const footerHTML = await response.text();

        // البحث عن div بـ id="footer-container"
        const footerContainer = document.getElementById('footer-container');

        if (footerContainer) {
            footerContainer.innerHTML = footerHTML;

            // تحديث السنة الحالية
            const yearElement = document.getElementById('current-year');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
            }
        } else {
            console.error('لم يتم العثور على #footer-container');
        }
    } catch (error) {
        console.error('خطأ في تحميل الـ Footer:', error);
    }
}

// تشغيل الدالة عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}
