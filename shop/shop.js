


document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const usernameDisplay = document.getElementById('usernameDisplay');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  if (currentUser) {
    usernameDisplay.textContent = currentUser.username;
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  }

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem(`cart_${currentUser.username}`);
    localStorage.removeItem('currentUser');
    window.location.reload();
  });
});








document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const productsContainer = document.querySelector(".col-md-9 .row");
  const categories = document.querySelectorAll(".list-group-item");
  

  const ratings = document.querySelectorAll(".rating-filter");

  // Создание dropdown для сортировки
  const sortDropdown = document.createElement("select");
  sortDropdown.innerHTML = `
      <option value="">Sort by</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
  `;
  sortDropdown.classList.add("form-select", "mt-3");

  const categoryList = document.querySelector(".list-group");
  categoryList.insertAdjacentElement("afterend", sortDropdown);

  function getStarRating(value) {
      value = parseInt(value);
      if (value >= 80) return "5";
      if (value >= 70) return "4";
      if (value >= 50) return "3";
      if (value >= 30) return "2";
      return "1";
  }

  function updateProductRatings() {
      document.querySelectorAll(".product").forEach(product => {
          const ratingValue = product.querySelector(".rating-value").textContent.replace(/\D/g, "");
          const starsElement = product.querySelector(".stars");
          const stars = getStarRating(ratingValue);

          // Обновляем звёздочки у продукта
          starsElement.textContent = "★".repeat(stars) + "☆".repeat(5 - stars);
          starsElement.style.color = "gold";

          // Добавляем рейтинг в dataset для фильтрации
          product.dataset.rating = stars;
      });
  }

  function filterProducts() {
      const searchText = searchInput.value.toLowerCase();
      const activeCategory = document.querySelector(".list-group-item.active")?.textContent || "All";
      const activeRating = document.querySelector(".rating-filter.active")?.dataset.rating || "";

      document.querySelectorAll(".product").forEach(product => {
          const title = product.querySelector(".card-title").textContent.toLowerCase();
          const category = product.dataset.category;
          const productStars = product.dataset.rating;

          let matchesSearch = title.includes(searchText);
          let matchesCategory = activeCategory === "All" || category === activeCategory;
          let matchesRating = activeRating === "" || productStars === activeRating;

          product.style.display = (matchesSearch && matchesCategory && matchesRating) ? "block" : "none";
      });
  }




 


  const products = JSON.parse(localStorage.getItem("products")) || [];

  
  function renderProducts() {
    products.forEach(product => {
      const rating = Number(product.rating) || 0;
      const stars = '★'.repeat(Math.min(rating, 5)) + '☆'.repeat(5 - Math.min(rating, 5));
  
      productsContainer.insertAdjacentHTML('beforeend', `
        <div class="col-md-3 product mb-3" data-category="${product.category}" data-rating="${rating}">
          <div class="card">
            <a href="../productpage.html?id=${product.id}">
              <img src="${product.imageUrl}" class="card-img-top" alt="${product.model}">
            </a>
            <div class="card-body">
              <h5 class="card-title">${product.model}</h5>
              <p class="card-text">${product.price}$</p>
              <p class="rating">
                <span class="stars">${stars}</span>
                <span class="rating-value">(${rating})</span>
              </p>
              <button class="btn btn-dark">Add to cart</button>
            </div>
          </div>
        </div>
      `);
    });
  }
  
  renderProducts();
  
  // Сохраняем продукты, если их нет
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  






  function sortProducts(order) {
      let productsArray = Array.from(document.querySelectorAll(".product"));
      productsArray.sort((a, b) => {
          let priceA = parseFloat(a.querySelector(".card-text").textContent.replace("$", ""));
          let priceB = parseFloat(b.querySelector(".card-text").textContent.replace("$", ""));
          return order === "low" ? priceA - priceB : priceB - priceA;
      });

      productsArray.forEach(product => productsContainer.appendChild(product));
  }

  searchInput.addEventListener("input", filterProducts);
  sortDropdown.addEventListener("change", function () {
      if (this.value) sortProducts(this.value);
  });





  categories.forEach(category => {
    category.addEventListener("click", function () {
        categories.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
        
        // If "All" is clicked, reset sorting to the default option
        if (this.textContent === "All") {
            sortDropdown.value = ""; // Clear the sort selection
        }

        filterProducts();
    });
});

sortDropdown.addEventListener("change", function () {
  if (this.value) {
      sortProducts(this.value);
  } else {
      // If sorting is cleared (value is empty), reset the product display
      filterProducts();
  }
});




  ratings.forEach(rating => {
      rating.addEventListener("click", function () {
          ratings.forEach(item => {
              item.classList.remove("active");
              item.style.color = "";
              item.style.backgroundColor = "";
          });0
          this.classList.add("active");
          this.style.color = "gold";
          this.style.backgroundColor = "black";
          filterProducts();
      });
  });

  updateProductRatings(); // Обновляем рейтинги при загрузке
});








document.addEventListener("DOMContentLoaded", function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));


  const userCartKey = `cart_${currentUser.username}`;
  let cart = JSON.parse(localStorage.getItem(userCartKey)) || [];

  document.querySelectorAll(".btn-dark").forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".card");
      const title = card.querySelector(".card-title").innerText;
      const price = parseFloat(card.querySelector(".card-text").innerText); // remove "$"
      const image = card.querySelector(".card-img-top").src;

      const product = { title, price, image, quantity: 1 };

      const existingProduct = cart.find((item) => item.title === title);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push(product);
      }

      localStorage.setItem(userCartKey, JSON.stringify(cart));
      localStorage.setItem("cart", JSON.stringify(cart)); // для совместимости, если нужно
      alert("Product added to cart!");
    });
  });
});




// /**
//  * Получить корзину пользователя с сервера по username
//  * @param {string} username
//  * @returns {Promise<Array>} - массив товаров в корзине
//  */
// export async function fetchCart(username) {
//   try {
//     const response = await fetch(`https://yourapi.com/cart?username=${username}`);
//     if (!response.ok) {
//       throw new Error("Ошибка при получении корзины");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Ошибка fetchCart:", error);
//     return [];
//   }
// }

// /**
//  * Сохранить корзину пользователя на сервер
//  * @param {string} username
//  * @param {Array} cart - массив товаров
//  * @returns {Promise<void>}
//  */
// export async function saveCart(username, cart) {
//   try {
//     const response = await fetch(`https://yourapi.com/cart`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, cart }),
//     });

//     if (!response.ok) {
//       throw new Error("Ошибка при сохранении корзины");
//     }
//   } catch (error) {
//     console.error("Ошибка saveCart:", error);
//   }
// }
