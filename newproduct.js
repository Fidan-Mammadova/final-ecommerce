// document.addEventListener("DOMContentLoaded", () => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     const usernameDisplay = document.getElementById('usernameDisplay');
//     const loginBtn = document.getElementById('loginBtn');
//     const logoutBtn = document.getElementById('logoutBtn');
  
//     if (currentUser) {
//       // Отображаем имя пользователя и кнопку "Log out"
//       usernameDisplay.textContent = currentUser.username;
//       loginBtn.style.display = 'none';
//       logoutBtn.style.display = 'inline-block';
//     }
  
//     // Функция выхода из аккаунта
//     logoutBtn.addEventListener('click', () => {
//       localStorage.removeItem('currentUser');
//       window.location.reload(); // Перезагрузка страницы
//     });
//   });
  




// const form = document.querySelector('.form');
// const imageInput = document.querySelector('.imageInput');
// const imagePreview = document.querySelector('.imageInForm');

// // Получаем индекс редактируемого товара из localStorage
// const editProductIndex = localStorage.getItem('editProductIndex');
// const products = JSON.parse(localStorage.getItem('products')) || [];

// if (editProductIndex !== null) {
//   const productToEdit = products[editProductIndex];

//   // Заполняем поля формы значениями редактируемого товара
//   document.querySelector('.brandInput').value = productToEdit.brand;
//   document.querySelector('.modelInput').value = productToEdit.model;
//   document.querySelector('.categoryInput').value = productToEdit.category;
//   document.querySelector('.descriptionInput').value = productToEdit.description;
//   document.querySelector('.priceInput').value = productToEdit.price;
//   document.querySelector('.rateInput').value = productToEdit.rating;
//   document.querySelector('.imageInput').value = productToEdit.imageUrl;

//   // Подсвечиваем изображение в форме
//   imagePreview.src = productToEdit.imageUrl;
// }

// imageInput.addEventListener('input', () => {
//   imagePreview.src = imageInput.value;
// });

// form.addEventListener('submit', (e) => {
//   e.preventDefault(); // Отменяем стандартное поведение формы

//   // Проверка на валидацию всех полей формы
//   if (!form.checkValidity()) {
//     e.stopPropagation(); // Останавливаем выполнение, если форма невалидна
//   } else {
//     const updatedProduct = {
//       brand: document.querySelector('.brandInput').value,
//       model: document.querySelector('.modelInput').value,
//       category: document.querySelector('.categoryInput').value,
//       description: document.querySelector('.descriptionInput').value,
//       price: document.querySelector('.priceInput').value,
//       rating: document.querySelector('.rateInput').value,
//       imageUrl: document.querySelector('.imageInput').value
//     };

//     if (editProductIndex !== null) {
//       // Если редактируем существующий товар, обновляем его данные
//       products[editProductIndex] = updatedProduct;
//     } else {
//       // Если это новый товар, добавляем его в массив
//       products.push(updatedProduct);
//     }

//     // Сохраняем обновленные данные в localStorage
//     localStorage.setItem('products', JSON.stringify(products));

//     alert('Product saved successfully!');

//     // Сброс формы и очищаем предпросмотр изображения
//     form.reset();
//     imagePreview.src = ''; 

//     // Подсветка полей с ошибками, если они есть
//     form.classList.add('was-validated');

//     // Перенаправляем на страницу с товарами
//     window.location.href = 'userproducts.html';
//   }
// });




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
    localStorage.removeItem('currentUser');
    window.location.reload();
  });

  const form = document.querySelector('.form');
  const imageInput = document.querySelector('.imageInput');
  const imagePreview = document.querySelector('.imageInForm');

  const editProductIndex = localStorage.getItem('editProductIndex');
  let products = [];

  // Получаем персональные продукты пользователя
  if (currentUser) {
    const userKey = `products_${currentUser.username}`;
    products = JSON.parse(localStorage.getItem(userKey)) || [];
  }

  // Редактируем существующий товар
  if (editProductIndex !== null) {
    const productToEdit = products[editProductIndex];
    if (productToEdit) {
      document.querySelector('.brandInput').value = productToEdit.brand;
      document.querySelector('.modelInput').value = productToEdit.model;
      document.querySelector('.categoryInput').value = productToEdit.category;
      document.querySelector('.descriptionInput').value = productToEdit.description;
      document.querySelector('.priceInput').value = productToEdit.price;
      document.querySelector('.rateInput').value = productToEdit.rating;
      document.querySelector('.imageInput').value = productToEdit.imageUrl;
      imagePreview.src = productToEdit.imageUrl;
    }
  }

  imageInput.addEventListener('input', () => {
    imagePreview.src = imageInput.value;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      e.stopPropagation();
    } else {
      const updatedProduct = {
        brand: document.querySelector('.brandInput').value,
        model: document.querySelector('.modelInput').value,
        category: document.querySelector('.categoryInput').value,
        description: document.querySelector('.descriptionInput').value,
        price: document.querySelector('.priceInput').value,
        rating: document.querySelector('.rateInput').value,
        imageUrl: document.querySelector('.imageInput').value
      };

      if (editProductIndex !== null) {
        products[editProductIndex] = updatedProduct;
        localStorage.removeItem('editProductIndex'); // очищаем
      } else {
        products.push(updatedProduct);
      }

      // Сохраняем только в личный ключ пользователя
      if (currentUser) {
        const userKey = `products_${currentUser.username}`;
        localStorage.setItem(userKey, JSON.stringify(products));
      }

      alert('Product saved successfully!');
      form.reset();
      imagePreview.src = '';
      form.classList.add('was-validated');
      window.location.href = 'userproducts.html';
    }
  });
});
