// Vendor page alias for dashboard (legacy alias)
document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAuth('vendor')) return;

  const user = api.getUser();
  const adminName = document.getElementById('adminName');
  if (adminName) adminName.textContent = user?.fullName || '';

  try {
    const [statsData, productsData] = await Promise.all([
      api.get('/orders/vendor-stats'),
      api.get('/products/my-products')
    ]);

    const s = statsData.stats;
    if (document.getElementById('productCount')) document.getElementById('productCount').textContent = s.totalProducts;
    if (document.getElementById('userCount')) document.getElementById('userCount').textContent = s.totalOrders;

    const table = document.getElementById('productsTable');
    if (table) {
      const tbody = table.querySelector('tbody');
      if (tbody) {
        tbody.innerHTML = productsData.products.map(p => `
          <tr>
            <td><img src="${p.images?.[0] ? 'http://localhost:5000' + p.images[0] : 'https://via.placeholder.com/80'}" alt="${p.name}"></td>
            <td>${p.name}</td>
            <td>${formatPrice(p.price)}</td>
            <td>${p.stock}</td>
          </tr>`).join('');
      }
    }
  } catch (err) { console.error(err); }
});
