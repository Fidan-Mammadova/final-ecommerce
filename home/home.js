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
  