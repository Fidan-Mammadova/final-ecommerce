




// function createAccount(event) {
//     event.preventDefault(); 
  
//     const name = document.getElementById('name').value;
//     const surname = document.getElementById('surname').value;
//     const email = document.getElementById('email').value;
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
  
//     // Получаем все аккаунты из localStorage
//     const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  
//     // Проверка на существующего пользователя
//     if (accounts.some(acc => acc.username === username)) {
//       alert("Такой пользователь уже существует!");
//       return;
//     }
  
//     // Создаем нового пользователя
//     const newUser = { name, surname, email, username, password };
  
//     // Добавляем в массив и сохраняем в localStorage
//     accounts.push(newUser);
//     localStorage.setItem('accounts', JSON.stringify(accounts));
  
//     // Сохраняем текущего пользователя
//     localStorage.setItem('currentUser', JSON.stringify(newUser));
  
//     alert("Аккаунт успешно создан!");
//     window.location.href = '../login/login.html';
//   }
  

//  // Отправка запроса на сервер для регистрации нового пользователя

fetch("http://localhost:5000/api/register", {
  // Метод POST — отправляем данные на сервер
  method: "POST",

  // Заголовок указывает, что данные отправляются в формате JSON
  headers: 
  {
    "Content-Type": "application/json"
  },

  // Тело запроса: преобразуем объект newUser в строку JSON
  body: JSON.stringify(newUser)
})

// Обработка ответа от сервера
.then(res => {
  // Если ответ не ОК (статус не 2xx), выбрасываем ошибку
  if (!res.ok) throw new Error("Ошибка при создании аккаунта");

  // Иначе преобразуем ответ в объект
  return res.json();
})

// Обработка полученных данных
.then(data => {
  // Уведомляем пользователя об успешной регистрации
  alert("Аккаунт успешно создан!");

  // Сохраняем данные пользователя в localStorage
  localStorage.setItem('currentUser', JSON.stringify(data));

  // Перенаправляем на страницу входа
  window.location.href = '../login/login.html';
})

// Обработка ошибок, если что-то пошло не так
.catch(error => {
  alert("Ошибка: " + error.message);
});

