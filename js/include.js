document.addEventListener('DOMContentLoaded', () => {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(async el => {
    const url = el.dataset.include;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      el.innerHTML = await res.text();

      // Highlight active sidebar link (new markup: <li class="sidebar-item"><a href="..."></a></li>)
      const currentPage = window.location.pathname.split('/').pop();
      el.querySelectorAll('.sidebar-list .sidebar-item').forEach(li => {
        const a = li.querySelector('a');
        if (!a) return;
        const linkPage = a.getAttribute('href')?.split('/').pop();
        if (linkPage === currentPage) a.classList.add('active');
        else a.classList.remove('active');
      });

      // Update cart badge after sidebar loads
      cart?.updateBadge?.();

      // Role-based sidebar: show/hide links according to user role (data-role on li)
      try {
        const sidebar = el.querySelector('.sidebar');
        if (sidebar) {
          const user = window.api?.getUser?.() || null;
          sidebar.querySelectorAll('.sidebar-item').forEach(li => {
            const roleAttr = li.dataset.role || 'both';
            if (!user) {
              if (roleAttr === 'vendor') li.style.display = 'none';
              else li.style.display = '';
            } else {
              if (roleAttr === 'both') li.style.display = '';
              else if (roleAttr === user.role) li.style.display = '';
              else li.style.display = 'none';
            }
          });
        }
      } catch (e) { console.warn('Sidebar role filter failed', e); }

      // Update nav user name if present
      try {
        const user = window.api?.getUser?.();
        const nameEl = el.querySelector('#navUserName');
        if (nameEl && user) nameEl.textContent = user.fullName;
        
        // Update greeting text based on language
        const greetingEl = el.querySelector('#greetingText');
        if (greetingEl) {
          const lang = getCurrentLanguage();
          const greetings = {
            'fr': 'Bonjour',
            'en': 'Hello',
            'es': 'Hola'
          };
          const greeting = greetings[lang] || 'Bonjour';
          if (user) {
            greetingEl.textContent = `${greeting}, `;
            const span = document.createElement('span');
            span.id = 'navUserName';
            span.textContent = user.fullName;
            greetingEl.appendChild(span);
          }
        }
      } catch (e) {}

      // Apply i18n translations to included content
      try {
        if (window.applyTranslations) {
          window.applyTranslations(getCurrentLanguage());
        }
      } catch (e) { console.warn('i18n translation failed', e); }

    } catch (err) {
      console.error('Include failed:', url, err);
    }
  });

  // Global helper: toggle sidebar (used by navbad.html)
  window.toggleSidebar = function() {
    document.querySelector('.sidebar')?.classList.toggle('collapsed');
    document.querySelector('.navbar')?.classList.toggle('shifted');
  };
});
