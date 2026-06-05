// Get user data on page load
document.addEventListener('DOMContentLoaded', async () => {
  await loadUserSettings();
  loadAddresses();
  setupEventListeners();
});

// Load user settings into form
async function loadUserSettings() {
  try {
    const user = api.getUser();
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    // Populate profile fields
    document.getElementById('fullName').value = user.fullName || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('address').value = user.address || '';
    document.getElementById('city').value = user.city || '';
    document.getElementById('zipcode').value = user.zipcode || '';

    // Load preferences from localStorage
    const preferences = JSON.parse(localStorage.getItem('kometa_preferences')) || {
      language: 'fr',
      emailNotifications: true,
      orderUpdates: true,
      newsletter: false
    };

    document.getElementById('language').value = preferences.language || 'fr';
    document.getElementById('emailNotifications').checked = preferences.emailNotifications !== false;
    document.getElementById('orderUpdates').checked = preferences.orderUpdates !== false;
    document.getElementById('newsletter').checked = preferences.newsletter === true;
  } catch (error) {
    console.error('Error loading user settings:', error);
    showToast('Erreur lors du chargement des paramètres', 'error');
  }
}

// Setup event listeners
function setupEventListeners() {
  document.getElementById('saveProfil')?.addEventListener('click', saveProfile);
  document.getElementById('changePassword')?.addEventListener('click', changePassword);
  document.getElementById('savePreferences')?.addEventListener('click', savePreferences);
  document.getElementById('addAddress')?.addEventListener('click', showAddressForm);
  document.getElementById('deleteAccount')?.addEventListener('click', deleteAccount);
}

// Save profile
async function saveProfile() {
  try {
    const user = api.getUser();
    const updateData = {
      fullName: document.getElementById('fullName').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      zipcode: document.getElementById('zipcode').value
    };

    // Validate required fields
    if (!updateData.fullName) {
      showToast('Le nom est requis', 'error');
      return;
    }

    // Send to API
    const response = await api.put('/users/profile', updateData);
    
    if (response) {
      // Update localStorage
      user.fullName = updateData.fullName;
      user.phone = updateData.phone;
      user.address = updateData.address;
      user.city = updateData.city;
      user.zipcode = updateData.zipcode;
      localStorage.setItem('kometa_user', JSON.stringify(user));

      showToast('Profil mis à jour avec succès', 'success');
    }
  } catch (error) {
    console.error('Error saving profile:', error);
    showToast('Erreur lors de la sauvegarde du profil', 'error');
  }
}

// Change password
async function changePassword() {
  try {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('Tous les champs sont obligatoires', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showToast('Le nouveau mot de passe doit contenir au moins 6 caractères', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('Les mots de passe ne correspondent pas', 'error');
      return;
    }

    const response = await api.put('/users/change-password', {
      currentPassword,
      newPassword
    });

    if (response) {
      document.getElementById('currentPassword').value = '';
      document.getElementById('newPassword').value = '';
      document.getElementById('confirmPassword').value = '';
      showToast('Mot de passe changé avec succès', 'success');
    }
  } catch (error) {
    console.error('Error changing password:', error);
    showToast(error.message || 'Erreur lors du changement de mot de passe', 'error');
  }
}

// Save preferences
function savePreferences() {
  try {
    const currentLang = getCurrentLanguage();
    const newLang = document.getElementById('language').value;
    
    const preferences = {
      language: newLang,
      emailNotifications: document.getElementById('emailNotifications').checked,
      orderUpdates: document.getElementById('orderUpdates').checked,
      newsletter: document.getElementById('newsletter').checked
    };

    localStorage.setItem('kometa_preferences', JSON.stringify(preferences));
    
    // Update document language
    document.documentElement.lang = preferences.language;
    
    // Si la langue a changé, recharger la page pour appliquer les traductions
    if (currentLang !== newLang) {
      showToast(t('msg.languageChanged'), 'success');
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      showToast(t('msg.preferencesChanged'), 'success');
    }
  } catch (error) {
    console.error('Error saving preferences:', error);
    showToast(t('msg.loadingError'), 'error');
  }
}

// Load addresses
async function loadAddresses() {
  try {
    const response = await api.get('/users/addresses');
    const addresses = response.addresses || [];
    const container = document.getElementById('addressesList');
    
    if (addresses.length === 0) {
      container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">Aucune adresse enregistrée. Ajoutez une adresse pour les livraisons.</p>';
      return;
    }

    container.innerHTML = addresses.map(address => `
      <div class="address-card ${address.isDefault ? 'default' : ''}">
        ${address.isDefault ? '<span class="default-badge">Par défaut</span>' : ''}
        <h4>${address.label || 'Adresse'}</h4>
        <p>
          ${address.fullName}<br>
          ${address.address}<br>
          ${address.zipcode} ${address.city}<br>
          ${address.phone}
        </p>
        <div class="address-card-actions">
          <button class="btn-edit" onclick="editAddress('${address._id}')"><i class="fa fa-pencil"></i> Éditer</button>
          <button class="btn-delete" onclick="deleteAddress('${address._id}')"><i class="fa fa-trash"></i> Supprimer</button>
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading addresses:', error);
    showToast('Erreur lors du chargement des adresses', 'error');
  }
}

// Show address form
function showAddressForm() {
  const html = `
    <div style="grid-column: 1/-1;">
      <div class="form-group">
        <label for="addressLabel">Label (ex: Maison, Bureau)</label>
        <input type="text" id="addressLabel" class="form-input" placeholder="Maison">
      </div>
      <div class="form-group">
        <label for="addressFullName">Nom Complet</label>
        <input type="text" id="addressFullName" class="form-input" placeholder="Jean Dupont">
      </div>
      <div class="form-group">
        <label for="addressPhone">Téléphone</label>
        <input type="tel" id="addressPhone" class="form-input" placeholder="+33 6 12 34 56 78">
      </div>
      <div class="form-group">
        <label for="addressStreet">Adresse</label>
        <input type="text" id="addressStreet" class="form-input" placeholder="123 Rue de la Paix">
      </div>
      <div class="form-group">
        <label for="addressCity">Ville</label>
        <input type="text" id="addressCity" class="form-input" placeholder="Paris">
      </div>
      <div class="form-group">
        <label for="addressZipcode">Code Postal</label>
        <input type="text" id="addressZipcode" class="form-input" placeholder="75001">
      </div>
      <div class="form-group checkbox-group">
        <label>
          <input type="checkbox" id="addressDefault">
          <span>Définir comme adresse par défaut</span>
        </label>
      </div>
      <div style="display: flex; gap: 12px;">
        <button class="btn-primary" onclick="saveAddress()">Enregistrer</button>
        <button class="btn-secondary" onclick="loadAddresses()">Annuler</button>
      </div>
    </div>
  `;

  document.getElementById('addressesList').innerHTML = html;
}

// Save address
async function saveAddress() {
  try {
    const addressData = {
      label: document.getElementById('addressLabel').value,
      fullName: document.getElementById('addressFullName').value,
      phone: document.getElementById('addressPhone').value,
      address: document.getElementById('addressStreet').value,
      city: document.getElementById('addressCity').value,
      zipcode: document.getElementById('addressZipcode').value,
      isDefault: document.getElementById('addressDefault').checked
    };

    if (!addressData.fullName || !addressData.address || !addressData.city || !addressData.zipcode) {
      showToast('Tous les champs sont obligatoires', 'error');
      return;
    }

    const response = await api.post('/users/addresses', addressData);
    
    if (response) {
      showToast('Adresse ajoutée avec succès', 'success');
      loadAddresses();
    }
  } catch (error) {
    console.error('Error saving address:', error);
    showToast('Erreur lors de l\'ajout de l\'adresse', 'error');
  }
}

// Edit address (placeholder)
function editAddress(addressId) {
  showToast('Édition d\'adresse - À implémenter', 'info');
}

// Delete address
async function deleteAddress(addressId) {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette adresse ?')) {
    return;
  }

  try {
    const response = await api.delete(`/users/addresses/${addressId}`);
    
    if (response) {
      showToast('Adresse supprimée', 'success');
      loadAddresses();
    }
  } catch (error) {
    console.error('Error deleting address:', error);
    showToast('Erreur lors de la suppression de l\'adresse', 'error');
  }
}

// Delete account
async function deleteAccount() {
  const confirmed = confirm('Êtes-vous absolument sûr ? Cette action est irréversible et supprimera toutes vos données.');
  if (!confirmed) return;

  const finalConfirm = prompt('Tapez votre email pour confirmer la suppression du compte:');
  const user = api.getUser();
  
  if (finalConfirm !== user?.email) {
    showToast('Email incorrect. Suppression annulée.', 'error');
    return;
  }

  try {
    const response = await api.delete('/users/profile');
    
    if (response) {
      localStorage.removeItem('kometa_token');
      localStorage.removeItem('kometa_user');
      localStorage.removeItem('kometa_cart');
      localStorage.removeItem('kometa_preferences');
      showToast('Compte supprimé. Redirection...', 'success');
      setTimeout(() => {
        window.location.href = '../html/auth.html';
      }, 2000);
    }
  } catch (error) {
    console.error('Error deleting account:', error);
    showToast('Erreur lors de la suppression du compte', 'error');
  }
}

// Toast notification
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast show ${type}`;
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
