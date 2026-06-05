// Inventory — vendor product management (add, edit, delete)
document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAuth('vendor')) return;
  await loadProducts();
  await loadCategories();
});

async function loadProducts() {
  const tbody = document.getElementById('productTable');
  if (!tbody) return;
  try {
    const data = await api.get('/products/my-products');
    if (!data.products.length) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:gray;padding:20px;">No products yet.</td></tr>';
      return;
    }
    tbody.innerHTML = data.products.map(p => `
      <tr>
        <td>
          <img src="${imageUtils.getProductImage(p)}"
            style="width:50px;height:50px;object-fit:cover;border-radius:8px;vertical-align:middle;margin-right:8px;"
            onerror="this.src='${imageUtils.getFallbackImage()}'">
          ${p.name}
        </td>
        <td>${formatPrice(p.price)}</td>
        <td>${p.stock}</td>
        <td>${p.stock > 5
          ? '<span class="in-stock">In Stock</span>'
          : p.stock > 0
            ? '<span style="background:#fef3c7;color:#92400e;padding:5px 10px;border-radius:20px;font-size:13px;">Low Stock</span>'
            : '<span class="out-stock">Out of Stock</span>'
        }</td>
        <td>
          <button class="edit" onclick="editProduct('${p._id}')">Edit</button>
          <button class="delete" onclick="deleteProduct('${p._id}')">Delete</button>
        </td>
      </tr>`).join('');
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="5" style="color:red;">${err.message}</td></tr>`;
  }
}

async function loadCategories() {
  const select = document.getElementById('category');
  if (!select) return;
  try {
    const data = await api.get('/categories');
    select.innerHTML = '<option value="">Select Category</option>' +
      data.categories.map(c => `<option value="${c._id}">${c.name}</option>`).join('');
  } catch {}
}

window.openModal = function () {
  const modal = document.getElementById('modal') || document.querySelector('.modal');
  if (modal) { modal.style.display = 'flex'; modal.dataset.editId = ''; }
  // Reset form
  ['name', 'price', 'stock', 'category'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const h2 = document.querySelector('.modal-content h2');
  if (h2) h2.textContent = 'Add Product';
};

window.editProduct = async function (id) {
  try {
    const data = await api.get(`/products/${id}`);
    const p = data.product;
    const modal = document.getElementById('modal') || document.querySelector('.modal');
    if (modal) { modal.style.display = 'flex'; modal.dataset.editId = id; }
    document.getElementById('name').value = p.name;
    document.getElementById('price').value = p.price;
    document.getElementById('stock').value = p.stock;
    if (document.getElementById('category')) document.getElementById('category').value = p.category?._id || '';
    const h2 = document.querySelector('.modal-content h2');
    if (h2) h2.textContent = 'Edit Product';
  } catch (err) { showAlert(err.message, 'error'); }
};

window.addProduct = async function () {
  const name = document.getElementById('name')?.value.trim();
  const price = document.getElementById('price')?.value;
  const stock = document.getElementById('stock')?.value;
  const category = document.getElementById('category')?.value;
  const imageInput = document.getElementById('image');

  if (!name || !price || !stock || !category) { showAlert('Please fill all fields.', 'error'); return; }

  const modal = document.getElementById('modal') || document.querySelector('.modal');
  const editId = modal?.dataset.editId;

  try {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('price', price);
    fd.append('stock', stock);
    fd.append('category', category);
    fd.append('description', name); // fallback description
    if (imageInput?.files[0]) fd.append('images', imageInput.files[0]);

    if (editId) {
      await api.putForm(`/products/${editId}`, fd);
      showAlert('Product updated!');
    } else {
      await api.postForm('/products', fd);
      showAlert('Product added!');
    }

    if (modal) modal.style.display = 'none';
    await loadProducts();
  } catch (err) { showAlert(err.message, 'error'); }
};

window.deleteProduct = async function (id) {
  if (!confirm('Delete this product?')) return;
  try {
    await api.delete(`/products/${id}`);
    showAlert('Product deleted', 'warning');
    await loadProducts();
  } catch (err) { showAlert(err.message, 'error'); }
};

// Close modal on outside click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('modal') || document.querySelector('.modal');
  if (modal && e.target === modal) modal.style.display = 'none';
});
