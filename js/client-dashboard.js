// Client dashboard — orders + recommended products
document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAuth('customer')) return;

  // Load orders
  const orderCount = document.getElementById('orderCount');
  const ordersTableBody = document.querySelector('#ordersTable tbody');
  const noOrders = document.getElementById('noOrders');

  try {
    const data = await api.get('/orders/my-orders');
    const orders = data.orders;
    if (orderCount) orderCount.textContent = orders.length;

    if (!orders.length) {
      if (noOrders) noOrders.style.display = 'block';
      if (ordersTableBody) ordersTableBody.innerHTML = '';
    } else {
      if (noOrders) noOrders.style.display = 'none';
      if (ordersTableBody) {
        ordersTableBody.innerHTML = orders.map(o => `
          <tr>
            <td><img src="${o.items[0]?.image ? 'http://localhost:5000' + o.items[0].image : '../assets/products/electronic1.jpg'}" alt="" style="width:60px;height:60px;object-fit:cover;border-radius:8px;"></td>
            <td>${o.items.map(i => i.name).join(', ')}</td>
            <td>${o.items.reduce((s, i) => s + i.quantity, 0)}</td>
            <td>${formatPrice(o.total)}</td>
            <td>${getStatusBadge(o.orderStatus)}</td>
          </tr>`).join('');
      }
    }
  } catch (err) { console.error('Orders error:', err); }

  // Recommended products
  const recommended = document.getElementById('recommended');
  if (recommended) {
    try {
      const data = await api.get('/products?limit=6');
      recommended.innerHTML = data.products.map(p => `
        <div class="product-card">
          <img src="${typeof imageUtils !== 'undefined' ? imageUtils.getProductImage(p) : (p.images?.[0] ? 'http://localhost:5000' + p.images[0] : '../assets/products/electronic1.jpg')}" alt="${p.name}">
          <h4>${p.name}</h4>
          <p class="price">${formatPrice(p.price)}</p>
          <button onclick="location.href='products.html'" class="view-btn">Voir</button>
        </div>`).join('');
    } catch (err) { console.error('Products error:', err); }
  }
});
