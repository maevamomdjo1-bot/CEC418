// Charge et applique les traductions au DOM
function initializeTranslations() {
  const currentLang = getCurrentLanguage();
  applyTranslations(currentLang);
}

// Applique les traductions à tous les éléments avec data-i18n
function applyTranslations(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = t(key, lang);
    
    // Pour les input/select, utiliser placeholder
    if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
      if (element.getAttribute('placeholder')) {
        element.setAttribute('placeholder', translation);
      }
    }
    // Pour les labels
    else if (element.tagName === 'LABEL') {
      // Garder les enfants (comme les checkboxes) et remplacer juste le texte
      if (element.querySelector('input[type="checkbox"], input[type="radio"]')) {
        const input = element.querySelector('input');
        const span = element.querySelector('span');
        if (span) {
          span.textContent = translation;
        }
      } else {
        element.textContent = translation;
      }
    }
    // Pour les boutons
    else if (element.tagName === 'BUTTON') {
      // Garder les icons (fa-*)
      const icons = element.querySelectorAll('i');
      const text = translation;
      element.textContent = text;
      
      // Re-ajouter les icons s'il y en avait
      icons.forEach((icon, index) => {
        if (index === 0) {
          element.insertAdjacentHTML('afterbegin', icon.outerHTML);
        }
      });
    }
    // Pour les titres et paragraphes
    else if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P'].includes(element.tagName)) {
      element.textContent = translation;
    }
    // Pour les spans
    else if (element.tagName === 'SPAN') {
      element.textContent = translation;
    }
    // Par défaut
    else {
      element.textContent = translation;
    }
  });
}

// Traduit une valeur et la retourne
function translate(key, lang = null) {
  return t(key, lang);
}

// Initialiser au chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTranslations);
} else {
  initializeTranslations();
}

// Exporter pour utilisation
window.applyTranslations = applyTranslations;
window.translate = translate;
