document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const usernameDisplay = document.getElementById('usernameDisplay');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
  
    if (currentUser) {
      // Отображаем имя пользователя и кнопку "Log out"
      usernameDisplay.textContent = currentUser.username;
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
    }
  
    // Функция выхода из аккаунта
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.reload(); // Перезагрузка страницы
    });
  });
  




  // Функция для получения параметра из URL<script>

  document.addEventListener("DOMContentLoaded", function () {
    function getQueryParam(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name);
    }

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const staticProducts = [
      { id: 1, model: "Calcius Magnesium plus", price: 19.99, rating: 5, imageUrl: "https://cdn.dsmcdn.com/mnresize/1200/1800/ty1582/prod/QC/20241009/11/9974e13d-ad2a-332b-b116-ad5f7e1ba7a7/1_org_zoom.jpg", category: "Vitamins", description: "Calcium & Magnesium supplement." },
      { id: 2, model: "Biotin 5000 Mg 50 K", price: 89.99, rating: 4, imageUrl: "https://cdn.dsmcdn.com/mnresize/1200/1800/ty1582/prod/QC/20241009/11/b10cec6e-992a-3264-8ca1-1cac8fe35708/1_org_zoom.jpg", category: "Vitamins", description: "Supports hair and nail growth." },
      { id: 3, model: "Vitamin D3 1000 iu", price: 79.99, rating: 5, imageUrl: "https://cdn.dsmcdn.com/mnresize/1200/1800/ty1641/prod/QC/20250221/14/01094d46-50e1-379d-bd38-4a074521c06a/1_org_zoom.jpg", category: "Vitamins", description: "Supports hair and nail growth." },
      { id: 4, model: "Magnesium Citrate", price: 79.99, rating: 5, imageUrl: "https://cdn.dsmcdn.com/mnresize/1200/1800/ty1544/product/media/images/ty1543/prod/QC/20240914/18/12c65036-70dd-369d-ad75-c5bab0c9a705/1_org_zoom.jpg", category: "Minerals", description: "Supports hair and nail growth." },
      { id: 5, model: "Fellas Protein Bars", price: 79.99, rating: 4, imageUrl: "https://cdn.dsmcdn.com/mnresize/1200/1800/ty1210/product/media/images/prod/SPM/PIM/20240315/13/fe94d8cd-da7f-3180-9b2e-4c1ec600a423/1_org_zoom.jpg", category: "Proteins", description: "Supports hair and nail growth." },
      { id: 6, model: "Dna Nutrition Creatine", price: 79.99, rating: 5, imageUrl: "https://cdn.dsmcdn.com/mnresize/1200/1800/ty1651/prod/QC/20250319/17/1343dc5d-5178-3f66-9c76-595e73805157/1_org_zoom.jpg", category: "Supplements", description: "Supports hair and nail growth." }
    ];
    

    const allProducts = [...staticProducts, ...products];

    const productId = getQueryParam("id");
    const product = allProducts.find(p => p.id == productId);

    if (product) {
      document.getElementById("product-image").src = product.imageUrl;
      document.getElementById("product-title").textContent = product.model;
      document.getElementById("product-price").textContent = `$${product.price}`;
      document.getElementById("product-rating").textContent =
        "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
      document.getElementById("product-description").textContent = product.description;
    } else {
      document.body.innerHTML = "<h2 class='text-center text-danger'>Product not found</h2>";
    }
  });

  // Функция для добавления товара в корзину




  document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Получаем кнопку "Add to cart"
    const button = document.getElementById("add-to-cart");
    
    button.addEventListener("click", function () {
        // Получаем информацию о товаре
        const title = document.getElementById("product-title").innerText;
        const price = parseFloat(document.getElementById("product-price").innerText.replace("$", ""));
        const image = document.getElementById("product-image").src;

      
        // Создаем объект с товаром
        const product = { title, price, image, quantity: 1 };
  
        // Проверяем, есть ли уже товар в корзине
        const existingProduct = cart.find((item) => item.title === title);
        if (existingProduct) {
            existingProduct.quantity += 1; // Если товар уже есть, увеличиваем количество
        } else {
            cart.push(product); // Если товара нет в корзине, добавляем его
        }
  
        // Сохраняем корзину в localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Уведомление, что товар добавлен в корзину
        alert("Product added to cart!");
    });
});
