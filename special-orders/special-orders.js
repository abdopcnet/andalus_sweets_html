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
	// Hide current card
	const currentCard = document.getElementById(`card-${currentCardIndex}`);
	if (currentCard) {
		currentCard.style.display = 'none';
		currentCard.classList.remove('active');
	}

	// Move to next card
	currentCardIndex = (currentCardIndex + 1) % cards.length;

	// Show next card
	const nextCard = document.getElementById(`card-${currentCardIndex}`);
	if (nextCard) {
		nextCard.style.display = 'block';
		nextCard.classList.add('active');
	}
}

// Handle form submit
function handleFormSubmit(e) {
	e.preventDefault();

	const formData = {
		name: document.getElementById('order-name').value,
		phone: document.getElementById('order-phone').value,
		date: document.getElementById('order-date').value,
		details: document.getElementById('order-details').value,
	};

	console.log('Order Data:', formData);
	alert('تم استلام طلبك الخاص! سنتواصل معك قريباً 🎉');

	// Reset form
	document.getElementById('special-order-form').reset();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
	// Start carousel rotation
	setInterval(rotateCards, 3000);

	// Auto-open date picker on focus
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
});
