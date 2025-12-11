/* Contact Page JavaScript */

// Handle form submit
function handleContactSubmit(e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("contact-name").value,
    phone: document.getElementById("contact-phone").value,
    email: document.getElementById("contact-email").value,
    message: document.getElementById("contact-message").value,
  };

  console.log("Form Data:", formData);
  alert("شكراً لتواصلك معنا! سنرد عليك قريباً 💚");

  // Reset form
  document.getElementById("contact-form").reset();
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Handle form submit
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", handleContactSubmit);
  }
});
