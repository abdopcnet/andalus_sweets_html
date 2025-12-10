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
    card.className = `card card-${cardNumber}`;

    card.innerHTML = `
      <div class="card-info">
        <p>${product.name}</p>
        <p>${product.price} ريال</p>
      </div>
      <button onclick="addProductToCart(${product.id})">أضف</button>
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

  // Hide all products section
  document.getElementById("products-section").style.display = "none";

  // Show category products section
  const categorySection = document.getElementById("category-products-section");
  categorySection.style.display = "block";
  document.getElementById("category-title").textContent = category;
  document.getElementById("category-name-span").textContent = category;

  // Render filtered products
  renderProducts(filteredProducts, "category-products-container");

  // Smooth scroll to category section
  setTimeout(() => {
    categorySection.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 100);
}

// Clear category filter
function clearCategory() {
  selectedCategory = null;
  document.getElementById("category-products-section").style.display = "none";
  document.getElementById("products-section").style.display = "block";
  document.getElementById("products-section").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Render all products initially
  renderProducts(products.slice(0, 8), "products-container");
});
