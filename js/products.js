// Products page — load from API, search, add to cart
document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('productsGrid');
  const searchInput = document.getElementById('searchInput');
  if (!grid) return;

  let allProducts = [];

  async function loadProducts(params = {}) {
    grid.innerHTML = '<div style="text-align:center;padding:40px;"><div class="spinner"></div></div>';
    try {
      const query = new URLSearchParams({ limit: 50, ...params }).toString();
      const data = await api.get(`/products?${query}`);
      allProducts = data.products;
      renderProducts(allProducts);
    } catch (err) {
      grid.innerHTML = `<p style="color:red;padding:20px;">${err.message}</p>`;
    }
  }

  function renderProducts(products) {
    if (!products.length) {
      grid.innerHTML = '<p style="text-align:center;color:gray;padding:40px;">No products found.</p>';
      return;
    }
    grid.innerHTML = products.map(p => `
      <div class="product-card">
        <div class="product-image">
          <img src="${imageUtils.getProductImage(p)}" alt="${p.name}" onerror="this.src='${imageUtils.getFallbackImage()}'">
        </div>
        <div class="product-info">
          <h3>${p.name}</h3>
          <p class="category"><i class="fas fa-tag"></i> ${p.category?.name || 'General'}</p>
          <p class="price">${formatPrice(p.price)}</p>
          <button onclick="addToCart('${p._id}')" ${p.stock === 0 ? 'disabled style="background:#9ca3af;"' : ''}>
            <i class="fas fa-shopping-cart"></i>
            ${p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>`).join('');
  }

  window.addToCart = async (id) => {
    try {
      const data = await api.get(`/products/${id}`);
      cart.add(data.product);
      showAlert('Product added to cart!', 'success');
    } catch (err) { showAlert(err.message, 'error'); }
  };

  if (searchInput) {
    searchInput.addEventListener('keyup', () => {
      const filter = searchInput.value.toLowerCase();
      const filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes(filter) || 
        p.category?.name?.toLowerCase().includes(filter)
      );
      renderProducts(filtered);
    });
  }

  await loadProducts();
});
