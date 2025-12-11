// Simple HTML include loader for navbar and footer
document.addEventListener('DOMContentLoaded', () => {
	const includeElements = Array.from(document.querySelectorAll('[data-include]'));
	if (!includeElements.length) {
		document.dispatchEvent(new Event('includes:ready'));
		return;
	}

	const fetches = includeElements.map((el) => {
		const url = el.getAttribute('data-include');
		return fetch(url)
			.then((resp) => resp.text())
			.then((html) => {
				el.innerHTML = html;
			})
			.catch((err) => {
				console.error(`Failed to load include ${url}`, err);
			});
	});

	Promise.all(fetches).then(() => {
		// update year in footer if present
		const yearEl = document.querySelector('#current-year');
		if (yearEl) yearEl.textContent = new Date().getFullYear();

		document.dispatchEvent(new Event('includes:ready'));
	});
});

