// Cart page — render from localStorage, update quantities
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
});

function renderCart() {
  const items = cart.get();
  const cartItemsEl = document.querySelector('.cart-items');
  const totalEl = document.getElementById('total');
  const checkoutBtn = document.querySelector('.checkout-btn');

  if (!cartItemsEl) return;

  if (!items.length) {
    cartItemsEl.innerHTML = '<p style="text-align:center;color:gray;padding:30px;">Your cart is empty. <a href="products.html">Shop now</a></p>';
    if (totalEl) totalEl.textContent = '$0.00';
    return;
  }

  cartItemsEl.innerHTML = items.map(item => `
    <div class="cart-item" data-id="${item._id}">
      <div class="details">
        <img src="${imageUtils.getProductImage(item)}" alt="${item.name}" onerror="this.src='${imageUtils.getFallbackImage()}'">
        <div>
          <h3>${item.name}</h3>
          <p>${formatPrice(item.price)}</p>
        </div>
      </div>
      <div class="quantity">
        <button onclick="decrease(this)">-</button>
        <span>${item.quantity}</span>
        <button onclick="increase(this)">+</button>
      </div>
      <div class="subtotal">${formatPrice(item.price * item.quantity)}</div>
      <button class="remove" onclick="removeItem('${item._id}')">Remove</button>
    </div>`).join('');

  updateTotal();

  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      if (!api.getToken()) { showAlert('Please login to checkout.', 'warning'); setTimeout(() => window.location.href = 'auth.html', 1000); return; }
      window.location.href = 'checkout.html';
    };
  }
}

function increase(button) {
  const id = button.closest('.cart-item').dataset.id;
  const items = cart.get();
  const item = items.find(i => i._id === id);
  if (item) { cart.updateQty(id, item.quantity + 1); renderCart(); }
}

function decrease(button) {
  const id = button.closest('.cart-item').dataset.id;
  const items = cart.get();
  const item = items.find(i => i._id === id);
  if (item) { cart.updateQty(id, item.quantity - 1); renderCart(); }
}

function removeItem(id) {
  cart.remove(id);
  renderCart();
  showAlert('Item removed', 'warning');
}

function updateTotal() {
  const totalEl = document.getElementById('total');
  if (totalEl) totalEl.textContent = formatPrice(cart.total());
}
