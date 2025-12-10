/* Food Restaurant JavaScript */

// Products data
const products = [
  {
    id: 1,
    name: "أرز دجاج",
    price: 45,
    category: "دواجن",
    image: "/assets/images/food/food1.png",
  },
  {
    id: 2,
    name: "كبسة لحم",
    price: 55,
    category: "لحوم",
    image: "/assets/images/food/food3.png",
  },
  {
    id: 3,
    name: "مندي دجاج",
    price: 40,
    category: "دواجن",
    image: "/assets/images/food/food2.jpg",
  },
  {
    id: 4,
    name: "مظبي لحم",
    price: 60,
    category: "لحوم",
    image: "/assets/images/food/food3.png",
  },
  {
    id: 5,
    name: "برياني دجاج",
    price: 38,
    category: "دواجن",
    image: "/assets/images/food/food1.png",
  },
  {
    id: 6,
    name: "مشوي مشكل",
    price: 70,
    category: "لحوم",
    image: "/assets/images/food/food2.jpg",
  },
  {
    id: 7,
    name: "دجاج مشوي",
    price: 35,
    category: "دواجن",
    image: "/assets/images/food/food3.png",
  },
  {
    id: 8,
    name: "ريش مشوي",
    price: 65,
    category: "لحوم",
    image: "/assets/images/food/food3.jpg",
  },
  {
    id: 9,
    name: "حمص باللحمة",
    price: 30,
    category: "مقبلات",
    image: "/assets/images/food/food1.png",
  },
  {
    id: 10,
    name: "فتوش",
    price: 20,
    category: "مقبلات",
    image: "/assets/images/food/food2.jpg",
  },
  {
    id: 11,
    name: "متبل",
    price: 15,
    category: "مقبلات",
    image: "/assets/images/food/food3.png",
  },
  {
    id: 12,
    name: "فطيرة جبن",
    price: 25,
    category: "فطائر",
    image: "/assets/images/food/food1.png",
  },
  {
    id: 13,
    name: "فطيرة زعتر",
    price: 20,
    category: "فطائر",
    image: "/assets/images/food/food2.jpg",
  },
  {
    id: 14,
    name: "فطيرة لحم",
    price: 30,
    category: "فطائر",
    image: "/assets/images/food/food3.png",
  },
];

let selectedCategory = null;

// Render products
function renderProducts(productsToRender, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  productsToRender.forEach((product) => {
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
        <button class="add-to-cart-btn" onclick="addProductToCart(${product.id})">
          أضف للسلة
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Add product to cart
function addProductToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product && typeof addToCart === "function") {
    addToCart(product);
  }
}

// Select category
function selectCategory(category) {
  selectedCategory = category;
  const filteredProducts = products.filter((p) => p.category === category);

  // Filter products in the same container
  const container = document.getElementById("products-section");
  if (!container) return;

  container.innerHTML = "";

  filteredProducts.forEach((product) => {
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
        <button class="add-to-cart-btn" onclick="addProductToCart(${product.id})">
          أضف للسلة
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // Smooth scroll to products section
  setTimeout(() => {
    container.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Render all products initially
  const container = document.getElementById("products-section");
  if (container) {
    container.className = "products-container";
    renderProducts(products, "products-section");
  }
});
