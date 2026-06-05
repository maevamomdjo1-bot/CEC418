// Vendor dashboard — stats + recent orders
document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAuth('vendor')) return;

  const user = api.getUser();
  const msgEl = document.getElementById('dashboardMessage');
  if (msgEl) msgEl.textContent = `Welcome back, ${user?.fullName || ''}!`;

  // Stats
  try {
    const data = await api.get('/orders/vendor-stats');
    const s = data.stats;
    if (document.getElementById('totalRevenue'))  document.getElementById('totalRevenue').textContent  = formatPrice(s.totalRevenue);
    if (document.getElementById('productCount'))  document.getElementById('productCount').textContent  = s.totalProducts;
    if (document.getElementById('orderCount'))    document.getElementById('orderCount').textContent    = s.totalOrders;
    if (document.getElementById('lowStock'))      document.getElementById('lowStock').textContent      = s.lowStock;
    // vendor dashboard aliases
    if (document.getElementById('userCount'))     document.getElementById('userCount').textContent     = s.totalOrders;
    if (document.getElementById('adminName')) {
      const adminName = document.getElementById('adminName');
      adminName.textContent = user?.fullName || '';
    }
  } catch (err) { console.error('Stats error:', err.message); }

  // Recent orders table
  const recentOrders = document.getElementById('recentOrders');
  if (recentOrders) {
    try {
      const data = await api.get('/orders/vendor-orders');
      if (!data.orders.length) {
        recentOrders.innerHTML = '<tr><td colspan="5" style="text-align:center;color:gray;padding:20px;">No orders yet.</td></tr>';
        return;
      }
      recentOrders.innerHTML = data.orders.slice(0, 5).map(o => `
        <tr>
          <td>#${o._id.slice(-8).toUpperCase()}</td>
          <td>${o.customer?.fullName || 'N/A'}</td>
          <td>${formatPrice(o.total)}</td>
          <td>${getStatusBadge(o.orderStatus)}</td>
          <td>${formatDate(o.createdAt)}</td>
        </tr>`).join('');
    } catch (err) {
      recentOrders.innerHTML = `<tr><td colspan="5" style="color:red;">${err.message}</td></tr>`;
    }
  }

  // Vendor products table
  const productsTable = document.getElementById('productsTable');
  if (productsTable) {
    try {
      const data = await api.get('/products/my-products');
      const tbody = productsTable.querySelector('tbody');
      if (tbody) {
        tbody.innerHTML = data.products.map(p => `
          <tr>
            <td><img src="${typeof imageUtils !== 'undefined' ? imageUtils.getProductImage(p) : (p.images?.[0] ? 'http://localhost:5000' + p.images[0] : '../assets/products/electronic1.jpg')}" alt="${p.name}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;"></td>
            <td>${p.name}</td>
            <td>${formatPrice(p.price)}</td>
            <td>${p.stock}</td>
          </tr>`).join('');
      }
    } catch (err) { console.error('Products error:', err.message); }
  }

  // Recent products preview (dashboard)
  const recentProducts = document.getElementById('recentProducts');
  if (recentProducts) {
    try {
      const data = await api.get('/products/my-products');
      if (!data.products.length) {
        recentProducts.innerHTML = '<p style="text-align:center;color:gray;padding:20px;">Aucun produit encore.</p>';
        return;
      }
      recentProducts.innerHTML = data.products.slice(0, 6).map(p => `
        <div class="product-preview-card">
          <img src="${typeof imageUtils !== 'undefined' ? imageUtils.getProductImage(p) : (p.images?.[0] ? 'http://localhost:5000' + p.images[0] : '../assets/products/electronic1.jpg')}" alt="${p.name}">
          <div class="product-preview-info">
            <h4>${p.name}</h4>
            <p class="price">${formatPrice(p.price)}</p>
            <span class="stock ${p.stock < 10 ? 'low' : ''}">${p.stock} en stock</span>
          </div>
        </div>`).join('');
    } catch (err) {
      recentProducts.innerHTML = `<p style="color:red;padding:20px;">${err.message}</p>`;
    }
  }
});
