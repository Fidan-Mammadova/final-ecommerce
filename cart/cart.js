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

  
  
  // import { fetchCart, saveCart } from "./cartApi.js"; 


document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
 
  
    const userCartKey = `cart_${currentUser.username}`;
    let cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
  
    const cartList = document.querySelector(".list");
    cartList.innerHTML = "";
  
    cart.forEach((product, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img width="70px" src="${product.image}" alt=""> <span>${product.title}</span></td>
        <td class="price">${parseFloat(product.price).toFixed(2)}$</td>
        <td><input class="form-control quantity" min="1" style="width: 60px;" type="number" value="${product.quantity}" data-index="${index}"></td>
        <td class="subtotal">${(parseFloat(product.price) * product.quantity).toFixed(2)}$</td>
        <td><button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button></td>
      `;
      cartList.appendChild(row);
    });
  
    updateCartTotals();
  
    document.querySelectorAll(".quantity").forEach((input) => {
      input.addEventListener("input", function () {
        const index = this.dataset.index;
        let newQuantity = parseInt(this.value);
  
        if (newQuantity < 1 || isNaN(newQuantity)) {
          newQuantity = 1;
          this.value = 1;
        }
  
        cart[index].quantity = newQuantity;
        saveCart();
        updateSubtotal(index);
        updateCartTotals();
      });
    });
  
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        const index = this.dataset.index;
        cart.splice(index, 1);
        saveCart();
        location.reload();
      });
    });
  
    function updateSubtotal(index) {
      const row = document.querySelectorAll(".list tr")[index];
      const price = parseFloat(cart[index].price);
      const quantity = cart[index].quantity;
      const subtotal = row.querySelector(".subtotal");
      subtotal.innerText = `${(price * quantity).toFixed(2)}$`;
    }
  
    function updateCartTotals() {
      let total = 0;
  
      document.querySelectorAll(".subtotal").forEach((subtotalElement) => {
        total += parseFloat(subtotalElement.innerText);
      });
  
      document.querySelector(".subtotalElement").innerText = `$${total.toFixed(2)}`;
      document.querySelector(".totalElement").innerText = `$${total.toFixed(2)}`;
  
      // Сохраняем общую сумму на время для checkout
      localStorage.setItem("checkoutSubtotal", `$${total.toFixed(2)}`);
      localStorage.setItem("checkoutTotal", `$${total.toFixed(2)}`);
    }
  

    function saveCart() {
      localStorage.setItem(userCartKey, JSON.stringify(cart));
      localStorage.setItem("cart", JSON.stringify(cart)); // временно, для совместимости
    }
  
    document.querySelector(".checkoutBtn").addEventListener("click", function () {
      const subtotal = document.querySelector(".subtotalElement").innerText;
      const total = document.querySelector(".totalElement").innerText;
      localStorage.setItem("checkoutSubtotal", subtotal);
      localStorage.setItem("checkoutTotal", total);
      window.location.href = "../checkout/checkout.html";
    });
  });
  






  // cartApi.js

// export async function fetchCart(username) {
//   try {
//     const response = await fetch(`https://yourapi.com/cart?username=${username}`);
//     if (!response.ok) throw new Error("Ошибка при получении корзины");
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.error("fetchCart error:", err);
//     return [];
//   }
// }

// export async function saveCart(username, cart) {
//   try {
//     const response = await fetch(`https://yourapi.com/cart`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, cart }),
//     });
//     if (!response.ok) throw new Error("Ошибка при сохранении корзины");
//   } catch (err) {
//     console.error("saveCart error:", err);
//   }
// }
