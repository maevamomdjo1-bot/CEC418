// Orders page — vendor orders management
document.addEventListener('DOMContentLoaded', async () => {
  if (!requireAuth('vendor')) return;
  await loadOrders();

  // Filter buttons
  document.querySelectorAll('.filter-btn button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn button').forEach(b => {
        b.style.background = '';
        b.style.color = '';
      });
      btn.style.background = '#2563eb';
      btn.style.color = 'white';
      filterOrders(btn.textContent.trim().toLowerCase());
    });
  });

  // Search
  const searchInput = document.querySelector('.table-header input');
  if (searchInput) {
    searchInput.addEventListener('keyup', () => {
      filterOrders('all', searchInput.value.toLowerCase());
    });
  }
});

let allOrders = [];

function getOrdersTbody() {
  return document.getElementById('ordersTableBody') || document.querySelector('table tbody');
}

async function loadOrders() {
  const tbody = getOrdersTbody();
  if (!tbody) return;
  try {
    const data = await api.get('/orders/vendor-orders');
    allOrders = data.orders;
    renderOrders(allOrders);
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="7" style="color:red;padding:20px;">${err.message}</td></tr>`;
  }
}

function renderOrders(orders) {
  const tbody = getOrdersTbody();
  if (!tbody) return;
  if (!orders.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:gray;padding:20px;">No orders found.</td></tr>';
    return;
  }
  tbody.innerHTML = orders.map(o => `
    <tr>
      <td>#${o._id.slice(-8).toUpperCase()}</td>
      <td>${o.customer?.fullName || 'N/A'}</td>
      <td>${o.items.map(i => i.name).join(', ')}</td>
      <td>${formatPrice(o.total)}</td>
      <td>${getStatusBadge(o.orderStatus)}</td>
      <td>${formatDate(o.createdAt)}</td>
      <td>
        <select onchange="updateStatus('${o._id}', this.value)" style="padding:6px;border-radius:8px;border:1px solid #ddd;">
          ${['pending','confirmed','processing','shipped','delivered','cancelled'].map(s =>
            `<option value="${s}" ${s === o.orderStatus ? 'selected' : ''}>${s}</option>`
          ).join('')}
        </select>
      </td>
    </tr>`).join('');
}

function filterOrders(status, search = '') {
  let filtered = allOrders;
  if (status !== 'all orders' && status !== 'all') {
    filtered = filtered.filter(o => o.orderStatus === status);
  }
  if (search) {
    filtered = filtered.filter(o =>
      o._id.toLowerCase().includes(search) ||
      o.customer?.fullName?.toLowerCase().includes(search)
    );
  }
  renderOrders(filtered);
}

window.updateStatus = async function (id, status) {
  try {
    await api.put(`/orders/${id}`, { orderStatus: status });
    showAlert('Status updated!');
  } catch (err) { showAlert(err.message, 'error'); }
};
