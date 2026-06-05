const API_BASE = 'http://https://cec-418-3tkp.vercel.app/api';

const api = {
  getToken: () => localStorage.getItem('kometa_token'),
  getUser: () => JSON.parse(localStorage.getItem('kometa_user') || 'null'),

  headers() {
    const h = { 'Content-Type': 'application/json' };
    const token = this.getToken();
    if (token) h['Authorization'] = `Bearer ${token}`;
    return h;
  },

  async request(method, endpoint, data = null, isFormData = false) {
    const options = {
      method,
      headers: isFormData
        ? { Authorization: `Bearer ${this.getToken()}` }
        : this.headers()
    };

    if (data) {
      options.body = isFormData ? data : JSON.stringify(data);
    }

    const res = await fetch(`${API_BASE}${endpoint}`, options);
    const json = await res.json();

    if (!res.ok) {
      throw new Error(
        json.message ||
        json.errors?.[0]?.msg ||
        'Request failed'
      );
    }

    return json;
  },

  get: (ep) => api.request('GET', ep),
  post: (ep, d) => api.request('POST', ep, d),
  put: (ep, d) => api.request('PUT', ep, d),
  delete: (ep) => api.request('DELETE', ep),
  postForm: (ep, fd) => api.request('POST', ep, fd, true),
  putForm: (ep, fd) => api.request('PUT', ep, fd, true),
};

function showAlert(message, type = 'success') {
  const existing = document.getElementById('_alert');
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.id = '_alert';

  el.style.cssText = `
    position:fixed;
    top:20px;
    right:20px;
    z-index:9999;
    padding:14px 20px;
    border-radius:12px;
    font-weight:600;
    font-size:14px;
    box-shadow:0 4px 20px rgba(0,0,0,.15);
    animation:slideIn .3s ease;
    background:${type === 'error'
      ? '#ef4444'
      : type === 'warning'
      ? '#f59e0b'
      : '#16a34a'};
    color:white;
    min-width:260px;
  `;

  el.textContent = message;
  document.body.appendChild(el);

  setTimeout(() => el.remove(), 3500);
}

// =========================
// AUTH GUARD
// =========================

function requireAuth(role = null) {
  const user = api.getUser();
  const token = api.getToken();

  // Not logged in
  if (!user || !token) {
    window.location.href = '../html/auth.html';
    return false;
  }

  // Wrong role
  if (role && user.role !== role) {
    window.location.href =
      user.role === 'vendor'
        ? '../html/vendor-dashboard.html'
        : '../html/client-dashboard.html';

    return false;
  }

  return true;
}

// =========================
// LOGOUT
// =========================

function logout() {
  localStorage.removeItem('kometa_token');
  localStorage.removeItem('kometa_user');
  localStorage.removeItem('kometa_cart');

  window.location.href = '../html/auth.html';
}

// =========================
// HELPERS
// =========================

function formatPrice(price) {
  return `${Number(price).toLocaleString('fr-FR')} CFA`;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function getStatusBadge(status) {
  const colors = {
    pending: '#f59e0b',
    confirmed: '#3b82f6',
    processing: '#8b5cf6',
    shipped: '#6b7280',
    delivered: '#16a34a',
    cancelled: '#ef4444'
  };

  const color = colors[status] || '#6b7280';

  return `
    <span
      class="status"
      style="
        background:${color}20;
        color:${color};
        padding:5px 12px;
        border-radius:20px;
        font-size:13px;
      "
    >
      ${status}
    </span>
  `;
}

// =========================
// CART
// =========================

const cart = {
  get() {
    return JSON.parse(localStorage.getItem('kometa_cart') || '[]');
  },

  save(items) {
    localStorage.setItem('kometa_cart', JSON.stringify(items));
    this.updateBadge();
  },

  add(product, qty = 1) {
    const items = this.get();

    const index = items.findIndex(
      item => item._id === product._id
    );

    if (index > -1) {
      items[index].quantity += qty;
    } else {
      items.push({
        ...product,
        quantity: qty
      });
    }

    this.save(items);
    showAlert(`${product.name} added to cart!`);
  },

  remove(id) {
    this.save(
      this.get().filter(item => item._id !== id)
    );
  },

  updateQty(id, qty) {
    const items = this.get();

    const index = items.findIndex(
      item => item._id === id
    );

    if (index > -1) {
      if (qty <= 0) {
        items.splice(index, 1);
      } else {
        items[index].quantity = qty;
      }
    }

    this.save(items);
  },

  clear() {
    localStorage.removeItem('kometa_cart');
    this.updateBadge();
  },

  total() {
    return this.get().reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },

  count() {
    return this.get().reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  },

  updateBadge() {
    document
      .querySelectorAll('.cart-count')
      .forEach(el => {
        el.textContent = this.count();
      });
  }
};

// =========================
// SIDEBAR ACTIVE LINK
// =========================

function highlightActive() {
  const page = window.location.pathname.split('/').pop();

  document.querySelectorAll('.sidebar a').forEach(a => {
    const li = a.querySelector('li');

    if (!li) return;

    if (a.getAttribute('href') === page) {
      li.classList.add('active');
    } else {
      li.classList.remove('active');
    }
  });
}

// =========================
// PAGE LOAD
// =========================

document.addEventListener('DOMContentLoaded', () => {
  cart.updateBadge();

  document.querySelectorAll('[data-include]').forEach(async el => {
    try {
      const res = await fetch(el.dataset.include);

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      el.innerHTML = await res.text();

      highlightActive();

      const user = api.getUser();
      const nameEl = el.querySelector('#navUserName');

      if (nameEl && user) {
        nameEl.textContent = user.fullName;
      }

    } catch (err) {
      console.error(
        'Include failed:',
        el.dataset.include,
        err
      );
    }
  });
});