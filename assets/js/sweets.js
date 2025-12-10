/* Sweets Restaurant JavaScript */

// Products data
const sweetsProducts = [
  {
    id: 1,
    name: " كيك",
    price: 45,
    image: "/assets/images/sweets/cake.jpg",
  },
  {
    id: 2,
    name: "كحك ",
    price: 55,
    image: "/assets/images/sweets/kaa7k.jpg",
  },
  {
    id: 3,
    name: " كنافة",
    price: 40,
    image: "/assets/images/sweets/konafa.jpg",
  },
  {
    id: 4,
    name: " كحك",
    price: 60,
    image: "/assets/images/sweets/kaa7k.jpg",
  },
  {
    id: 5,
    name: " كحك",
    price: 38,
    image: "/assets/images/sweets/cake.jpg",
  },
  {
    id: 6,
    name: " جلاش",
    price: 70,
    image: "/assets/images/sweets/sweet2.png",
  },
  {
    id: 7,
    name: " كيك",
    price: 35,
    image: "/assets/images/sweets/kaa7k.jpg",
  },
  {
    id: 8,
    name: " كحك",
    price: 65,
    image: "/assets/images/sweets/sweet2.png",
  },
];

// Render products
function renderSweetsProducts() {
  const container = document.querySelector(".products-container");
  if (!container) return;

  container.innerHTML = "";

  sweetsProducts.forEach((product) => {
    const card = document.createElement("div");
    const cardNumber = (product.id % 6) + 1;
    card.className = `product-card product-card-${cardNumber}`;
    card.style.backgroundImage = `url(${product.image})`;

    card.innerHTML = `
      <div class="product-card-content">
        <div class="product-card-info">
          <p class="product-name">${product.name}</p>
          <p class="product-price">${product.price} ريال</p>
        </div>
        <button class="add-to-cart-btn" onclick="addSweetsToCart(${product.id})">
          أضف للسلة
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Add product to cart
function addSweetsToCart(productId) {
  const product = sweetsProducts.find((p) => p.id === productId);
  if (product && typeof addToCart === "function") {
    addToCart(product);
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  renderSweetsProducts();
});
