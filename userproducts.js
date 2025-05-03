



document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const usernameDisplay = document.getElementById('usernameDisplay');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  const tbody = document.querySelector('.tbody');
  let products = [];

  if (currentUser) {
    usernameDisplay.textContent = currentUser.username;
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';

    // Загружаем персональные продукты пользователя
    const userKey = `products_${currentUser.username}`;
    products = JSON.parse(localStorage.getItem(userKey)) || [];

    // Обновляем общий ключ "products" для редактирования
    localStorage.setItem('products', JSON.stringify(products));

    renderProducts();
  } 

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('products'); // только общие
    localStorage.removeItem('cart');
    localStorage.removeItem('currentUser');
    window.location.reload();
  });

  // Кнопка "Добавить продукт"
  document.getElementById('newProductBtn').addEventListener('click', () => {
    localStorage.removeItem('editProductIndex');
    window.location.href = './newproduct.html';
  });

  function renderProducts() {
    tbody.innerHTML = '';
    products.forEach((product, index) => {
      tbody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${product.brand}</td>
          <td>${product.model}</td>
          <td>${product.category}</td>
          <td><img src="${product.imageUrl}" alt="Product Image" width="50"></td>
          <td>${product.price}</td>
          <td>${product.rating}</td>
          <td>
            <button class="btn btn-warning btn-sm edit-btn" data-index="${index}">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
          </td>
        </tr>
      `;
    });

    // Обработчики кнопок
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        localStorage.setItem('editProductIndex', index);
        window.location.href = './newproduct.html';
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        products.splice(index, 1);

        // Сохраняем обновление в персональный ключ и в products
        localStorage.setItem(`products_${currentUser.username}`, JSON.stringify(products));
        localStorage.setItem('products', JSON.stringify(products));

        renderProducts(); // Перерисовываем
      });
    });
  }
});
