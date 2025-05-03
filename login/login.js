

function login(event) {
    event.preventDefault(); 
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
  
    const user = accounts.find(acc => acc.username === username);
  
    if (!user) {
      alert("Пользователь не найден!");
      return;
    }
  
    if (user.password !== password) {
      alert("Неверный пароль!");
      return;
    }
  
    // Сохраняем текущего пользователя
    localStorage.setItem('currentUser', JSON.stringify(user));
  
    alert("Вы успешно вошли!");
    window.location.href = '../home/home.html';
  }
  


// ПОДГОТОВКА ДЛЯ БЭКА — пока он не готов
// Отправка POST-запроса на сервер для входа пользователя
// fetch("http://localhost:5000/api/login", {
  // Указываем метод запроса (POST — отправка данных)
  // method: "POST",

  // Указываем заголовки: мы отправляем данные в формате JSON
  // headers: {
  //   "Content-Type": "application/json"
  // },

  // Преобразуем данные пользователя (логин и пароль) в JSON и прикрепляем к запросу
  // body: JSON.stringify({ username, password })
// })

// Обрабатываем ответ от сервера
// .then(res => {
  // Если статус ответа не OK (не 200–299), выбрасываем ошибку
  // if (!res.ok) {
  //   throw new Error("Ошибка входа");
  // }
  // Преобразуем ответ сервера из JSON в объект JavaScript
  // return res.json();
// })

// Обработка данных, полученных от сервера
// .then(data => {
  // Сохраняем пользователя в localStorage (для использования позже)
  // localStorage.setItem("currentUser", JSON.stringify(data.user));

  // Показываем сообщение об успешном входе
  // alert("Вы успешно вошли!");

  // Перенаправляем пользователя на домашнюю страницу
  // window.location.href = "../home/home.html";
// })

// Обработка ошибок
// .catch(error => {
  // Показываем сообщение об ошибке
  // alert("Ошибка: " + error.message);
// });
