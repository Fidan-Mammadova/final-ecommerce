document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const usernameDisplay = document.getElementById('usernameDisplay');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
  
    if (currentUser) {
      usernameDisplay.textContent = currentUser.username;
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
    } else {
      usernameDisplay.textContent = '';
      loginBtn.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
    }
  
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.reload();
    });
  
    const dynamicProducts = JSON.parse(localStorage.getItem("products") || "[]");
    const allProducts = [...staticProducts, ...hiddenStaticProducts, ...dynamicProducts];
    let displayedProducts = [...staticProducts, ...dynamicProducts];
    let currentCategory = "";
    let currentRating = 0;
  
    renderProducts(displayedProducts);
  
    document.getElementById("show-all-btn").addEventListener("click", () => {
      displayedProducts = [...allProducts];
      currentCategory = "";
      currentRating = 0;
      document.querySelectorAll(".category-item").forEach(i => i.classList.remove("active"));
      document.querySelectorAll(".star-filter").forEach(s => s.classList.remove("active"));
      applyFilters();
    });
  
    document.getElementById("searchInput").addEventListener("input", applyFilters);
    document.getElementById("sortSelect").addEventListener("change", applyFilters);
  
    document.querySelectorAll(".category-item").forEach(item => {
      item.addEventListener("click", () => {
        if (item.classList.contains("active")) {
          item.classList.remove("active");
          currentCategory = "";
        } else {
          document.querySelectorAll(".category-item").forEach(i => i.classList.remove("active"));
          item.classList.add("active");
          currentCategory = item.textContent;
        }
        applyFilters();
      });
    });
  
    document.querySelectorAll(".star-filter").forEach(star => {
      star.addEventListener("click", () => {
        document.querySelectorAll(".star-filter").forEach(s => s.classList.remove("active"));
        star.classList.add("active");
        currentRating = parseInt(star.getAttribute("data-rate"));
        applyFilters();
      });
    });
  
    function renderProducts(productsArray) {
      const container = document.getElementById("product-container");
      container.innerHTML = "";
      productsArray.forEach(product => {
        const col = document.createElement("div");
        col.className = "col-md-3";
        col.innerHTML = `
          <div class="product-card">
            <img src="${product.url}" alt="${product.model}">
            <h6>${product.brand} ${product.model}</h6>
            <p class="text-danger">${product.price}$</p>
            <p class="star-rating">${"⭐".repeat(product.rating)} (${Math.floor(Math.random() * 100)})</p>
            <button class="btn btn-dark w-100 add-to-cart">Add to cart</button>
          </div>
        `;
        col.querySelector(".product-card").addEventListener("click", (e) => {
          if (!e.target.classList.contains("add-to-cart")) {
            localStorage.setItem("selectedProduct", JSON.stringify(product));
            window.location.href = "../productpage/product.html";
          }
        });
        col.querySelector(".add-to-cart").addEventListener("click", (e) => {
          e.stopPropagation();
          addToCart(product);
        });
        container.appendChild(col);
      });
    }
  
    function applyFilters() {
      const searchValue = document.getElementById("searchInput").value.toLowerCase();
      const sortValue = document.getElementById("sortSelect").value;
  
      let filtered = [...displayedProducts];
      if (searchValue) {
        filtered = filtered.filter(p => `${p.brand} ${p.model}`.toLowerCase().includes(searchValue));
      }
      if (currentCategory) {
        filtered = filtered.filter(p => p.category === currentCategory);
      }
      if (currentRating > 0) {
        filtered = filtered.filter(p => p.rating === currentRating);
      }
  
      if (sortValue === "low") {
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (sortValue === "high") {
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      } else if (sortValue === "rate") {
        filtered.sort((a, b) => b.rating - a.rating);
      }
  
      renderProducts(filtered);
    }
  
    function addToCart(product) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart!");
    }
  });
  
  // Static and hidden products
  const staticProducts = [
    { url: "/images/t-shirt.jpg", brand: "Hanes", model: "Cotton T-Shirt", price: "19.99", rating: 5, category: "Clothing" },
    { url: "/images/NIKE+INTERACT+RUN.avif", brand: "Nike", model: "Running Shoes", price: "89.99", rating: 5, category: "Footwear" },
    { url: "/images/backpack.avif", brand: "Samsonite", model: "Backpack", price: "79.99", rating: 5, category: "Accessories" },
    { url: "/images/ipad pro.jpg", brand: "Apple", model: "iPad Pro", price: "899.99", rating: 5, category: "Tablets" }
  ];
  
  const hiddenStaticProducts = [
    { url: "/images/gg.avif", brand: "Gucci", model: "Mini backpack", price: "69.99", rating: 4, category: "Accessories" },
    { url: "/images/puma.jpg", brand: "Puma", model: "Orange T-shirt", price: "16.99", rating: 4, category: "Clothing" },
    { url: "/images/nike men.jpg", brand: "Nike", model: "Blue Shoes", price: "39.99", rating: 3, category: "Footwear" },
    { url: "/images/Без названия (1).jpeg", brand: "Apple", model: "iPad Pro 12.9", price: "699.99", rating: 3, category: "Tablets" }
  ];
  