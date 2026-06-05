// Profile page — load & update user profile
document.addEventListener('DOMContentLoaded', async () => {
  const user = api.getUser();
  if (!user || !api.getToken()) { window.location.href = 'auth.html'; return; }

  try {
    const data = await api.get('/auth/profile');
    const u = data.user;
    const usernameEl = document.getElementById('username');
    const emailEl = document.getElementById('email');
    if (usernameEl) usernameEl.textContent = u.fullName || u.email.split('@')[0];
    if (emailEl) emailEl.textContent = u.email;

    // Role badge
    const roleEl = document.querySelector('.role');
    if (roleEl) roleEl.textContent = u.role === 'vendor' ? 'Vendor / Store Manager' : 'Customer';
  } catch (err) { console.error(err); }
});

window.logout = function () {
  logout();
};
