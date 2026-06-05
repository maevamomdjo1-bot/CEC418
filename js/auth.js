// Auth page — handles signup & login, redirects by role

document.addEventListener('DOMContentLoaded', () => {
  const user = api.getUser();

  if (user && api.getToken()) {
    window.location.href =
      user.role === 'vendor'
        ? 'vendor-dashboard.html'
        : 'client-dashboard.html';
    return;
  }
});

// ==================== SIGNUP ====================

window.signup = async function () {
  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value;

  const rawRole =
    document.querySelector('input[name="role"]:checked')?.value || 'customer';

  const role = rawRole;

  if (!name || !email || !password) {
    showAlert('Please fill all fields.', 'error');
    return;
  }

  try {
    const data = await api.post('/auth/register', {
      fullName: name,
      email,
      password,
      role
    });

    console.log('Registered User:', data.user);

    localStorage.setItem('kometa_token', data.token);
    localStorage.setItem('kometa_user', JSON.stringify(data.user));

    showAlert('Account created successfully!');

    setTimeout(() => {
      window.location.href =
        data.user.role === 'vendor'
          ? 'vendor-dashboard.html'
          : 'client-dashboard.html';
    }, 800);

  } catch (err) {
    console.error(err);
    showAlert(err.message || 'Registration failed', 'error');
  }
};

// ==================== LOGIN ====================

window.login = async function () {
  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value;

  if (!email || !password) {
    showAlert('Please enter email and password.', 'error');
    return;
  }

  try {
    const data = await api.post('/auth/login', {
      email,
      password
    });

    console.log('User connecté :', data.user);

    localStorage.setItem('kometa_token', data.token);
    localStorage.setItem('kometa_user', JSON.stringify(data.user));

    showAlert('Login successful!');

    setTimeout(() => {
      window.location.href =
        data.user.role === 'vendor'
          ? 'vendor-dashboard.html'
          : 'client-dashboard.html';
    }, 800);

  } catch (err) {
    console.error(err);
    showAlert(err.message || 'Login failed', 'error');
  }
};