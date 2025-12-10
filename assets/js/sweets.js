/* Sweets Restaurant JavaScript */

// Products data
const sweetsProducts = [
  {
    id: 1,
    name: " كيك",
    price: 45,
    category: "كيك",
    image: "/assets/images/sweets/cake.jpg",
  },
  {
    id: 2,
    name: "كحك ",
    price: 55,
    category: "كحك",
    image: "/assets/images/sweets/kaa7k.jpg",
  },
  {
    id: 3,
    name: " كنافة",
    price: 40,
    category: "كنافة",
    image: "/assets/images/sweets/konafa.jpg",
  },
  {
    id: 4,
    name: " كحك",
    price: 60,
    category: "كحك",
    image: "/assets/images/sweets/kaa7k.jpg",
  },
  {
    id: 5,
    name: " كحك",
    price: 38,
    category: "كحك",
    image: "/assets/images/sweets/cake.jpg",
  },
  {
    id: 6,
    name: " جلاش",
    price: 70,
    category: "جلاش",
    image: "/assets/images/sweets/sweet2.png",
  },
  {
    id: 7,
    name: " كيك",
    price: 35,
    category: "كيك",
    image: "/assets/images/sweets/kaa7k.jpg",
  },
  {
    id: 8,
    name: " كحك",
    price: 65,
    category: "كحك",
    image: "/assets/images/sweets/sweet2.png",
  },
];

let selectedCategory = null;

// Render products
function renderSweetsProducts(productsToRender = null) {
  const container = document.querySelector(".products-container");
  if (!container) return;

  const products = productsToRender || sweetsProducts;
  container.innerHTML = "";

  products.forEach((product) => {
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

// Select category
function selectCategory(category) {
  selectedCategory = category;
  const filteredProducts = sweetsProducts.filter(
    (p) => p.category === category
  );

  // Filter products in the same container
  const container = document.querySelector(".products-container");
  if (!container) return;

  renderSweetsProducts(filteredProducts);

  // Smooth scroll to products section
  setTimeout(() => {
    container.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  renderSweetsProducts();
});
