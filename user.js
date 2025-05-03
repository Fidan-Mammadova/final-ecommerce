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
  

  function saveUser() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
  
    const accounts = {
      name: name,
      surname: surname,
      email: email,
      username: username
    };
  
    // Сохраняем в localStorage
    localStorage.setItem('accounts', JSON.stringify(accounts));
  
    // Переход на user.html
    window.location.href = './user.html';
  }
  


// --- ЗАГОТОВКА ДЛЯ API ---
// Отправка данных нового пользователя на сервер

/*
fetch('http://localhost:5000/api/users', {
  Метод POST — мы отправляем данные на сервер
  method: 'POST',

  Заголовки запроса: говорим серверу, что отправляем JSON
  headers: {
    'Content-Type': 'application/json'
  },

  Преобразуем объект newUser в строку JSON и отправляем его в теле запроса
  body: JSON.stringify(newUser)
})

Обработка ответа от сервера
.then(response => response.json()) // Преобразуем ответ в JSON
// .then(data => {
//   // Успешное сохранение пользователя
  console.log('Пользователь сохранён на сервере:', data);

  Перенаправляем на страницу пользователя
  window.location.href = './user.html';
})

Обработка ошибок
.catch(error => {
  Если что-то пошло не так — выводим сообщение в консоль
  console.error('Ошибка при сохранении:', error);

  И показываем пользователю алерт
  alert('Произошла ошибка. Попробуйте позже.');
});
*/
