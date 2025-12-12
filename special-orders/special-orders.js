/* Special Orders JavaScript */

let currentCardIndex = 0;
const cards = [
  {
    icon: '📦',
    title: 'كميات كبيرة',
    description: 'نوفر طلبات بكميات كبيرة للمناسبات والحفلات',
  },
  {
    icon: '👥',
    title: 'مناسبات خاصة',
    description: 'أعياد ميلاد، حفلات، مناسبات عائلية',
  },
  {
    icon: '✨',
    title: 'تصميم خاص',
    description: 'سجل طلبك بالمكونات والطريقة التي تفضلها',
  },
];

// Rotate cards
function rotateCards() {
  const currentCard = document.getElementById(`card-${currentCardIndex}`);
  if (currentCard) {
    currentCard.style.display = 'none';
    currentCard.classList.remove('active');
  }

  currentCardIndex = (currentCardIndex + 1) % cards.length;

  const nextCard = document.getElementById(`card-${currentCardIndex}`);
  if (nextCard) {
    nextCard.style.display = 'block';
    nextCard.classList.add('active');
  }
}

/* ================== زر الإرسال والتأكد من الحقول ================== */

// كل الحقول المطلوبة لتمكين الزر
const requiredFields = [
  'order-name',
  'order-phone',
  'order-address',
  'branch-select',
  'order-date',
  'order-details',
];


function checkFormValidity() {
  const submitBtn = document.getElementById('submit-button');
  if (!submitBtn) return;

  let isValid = true;

  requiredFields.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (!el.value || el.value.trim() === '') {
      isValid = false;
    }
  });

  if (isValid) {
    submitBtn.disabled = false;
    submitBtn.classList.remove('disabled');
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled');
  }
}

// Handle form submit
function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById('order-name').value,
    phone: document.getElementById('order-phone').value,
    address: document.getElementById('order-address').value,
    branch: document.getElementById('branch-select').value,
    date: document.getElementById('order-date').value,
    details: document.getElementById('order-details').value,
  };

  console.log('Order Data:', formData);
  alert('تم استلام طلبك الخاص! سنتواصل معك قريباً 🎉');

  document.getElementById('special-order-form').reset();
  checkFormValidity(); // يرجع الزر معطل بعد التفريغ
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Start carousel rotation
  setInterval(rotateCards, 3000);

  // Auto-open date picker on focus (إن كان مدعوم)
  const orderDateInput = document.getElementById('order-date');
  if (orderDateInput && typeof orderDateInput.showPicker === 'function') {
    orderDateInput.addEventListener('focus', () => {
      orderDateInput.showPicker();
    });
  }

  // Handle form submit
  const form = document.getElementById('special-order-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // ربط التحقق بجميع الحقول المطلوبة
 requiredFields.forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.addEventListener('input', checkFormValidity);
  el.addEventListener('change', checkFormValidity);
});

// أول استدعاء
checkFormValidity();

});
