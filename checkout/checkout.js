


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
    // Получаем значения из localStorage
    const subtotalElement = document.querySelector(".subtotal");
    const totalElement = document.querySelector(".total");
    
    const subtotal = localStorage.getItem("checkoutSubtotal") || "$0.00";
    const total = localStorage.getItem("checkoutTotal") || "$0.00";

    // Вставляем значения на страницу
    if (subtotalElement) subtotalElement.innerText = subtotal;
    if (totalElement) totalElement.innerText = total;

    // Находим форму и кнопку
    const form = document.querySelector("form");
    const placeOrderBtn = document.querySelector("button[type='submit']");


    const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.username}`)) || [];

    const newOrder = {
      id: Date.now(),
      subtotal,
      total,
      date: new Date().toLocaleString()
    };
    
    orders.push(newOrder);
    localStorage.setItem(`orders_${currentUser.username}`, JSON.stringify(orders));
    
 
    alert("✅ Ваш заказ принят!");
    window.location.href = "../orders.html";



    if (form && placeOrderBtn) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Предотвращаем стандартную отправку формы

            const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.username}`)) || [];

            const newOrder = {
              id: Date.now(),
              subtotal,
              total,
              date: new Date().toLocaleString()
            };
            
            orders.push(newOrder);
            localStorage.setItem(`orders_${currentUser.username}`, JSON.stringify(orders));
            
         
            alert("✅ Ваш заказ принят!");
            window.location.href = "../orders.html";
        
        
         
            // Очищаем корзину
            localStorage.removeItem(`cart_${currentUser.username}`);
            localStorage.removeItem("checkoutSubtotal");
            localStorage.removeItem("checkoutTotal");

            // Перенаправляем на главную страницу корзины
            window.location.href = "../cart/cart.html";
        });

        // Если форма не отправляется, можно добавить альтернативный обработчик
        placeOrderBtn.addEventListener("click", function (event) {
            event.preventDefault();
            form.dispatchEvent(new Event("submit"));
        });
    }
});

