// Traductions multilingues
const translations = {
  fr: {
    // Navigation & Sidebar
    'nav.dashboard': 'Dashboard',
    'nav.products': 'Produits',
    'nav.inventory': 'Inventaire',
    'nav.orders': 'Commandes',
    'nav.customers': 'Clients',
    'nav.cart': 'Panier',
    'nav.checkout': 'Paiement',
    'nav.profile': 'Profil',
    'nav.settings': 'Paramètres',
    'nav.logout': 'Déconnexion',

    // Client Dashboard
    'dashboard.title': 'Mon Tableau de Bord',
    'dashboard.subtitle': 'Gérez vos commandes et découvrez nos produits recommandés',
    'dashboard.myOrders': 'Mes Commandes',
    'dashboard.recommended': 'Produits Recommandés',
    'dashboard.noOrders': 'Vous n\'avez pas encore de commandes.',
    'table.image': 'Image',
    'table.products': 'Produits',
    'table.quantity': 'Quantité',
    'table.total': 'Total',
    'table.status': 'Statut',

    // Cart Page
    'cart.title': 'Votre Commande',
    'cart.subtitle': 'Vérifiez vos articles et procédez au paiement',
    'cart.items': 'Articles du panier',
    'cart.summary': 'Résumé de la commande',
    'cart.subtotal': 'Sous-total',
    'cart.shipping': 'Livraison',
    'cart.total': 'Total',
    'cart.checkout': 'Passer la commande',
    'cart.empty': 'Votre panier est vide',
    'cart.continueShopping': 'Continuer vos achats',

    // Settings Page
    'settings.title': 'Paramètres',
    'settings.subtitle': 'Gérez vos préférences et informations personnelles',
    'settings.profile': 'Profil',
    'settings.security': 'Sécurité',
    'settings.preferences': 'Préférences',
    'settings.addresses': 'Adresses de Livraison',
    'settings.dangerZone': 'Zone de Danger',

    // Profile Form
    'form.fullName': 'Nom Complet',
    'form.email': 'Email',
    'form.phone': 'Téléphone',
    'form.address': 'Adresse',
    'form.city': 'Ville',
    'form.zipcode': 'Code Postal',
    'form.saveProfile': 'Enregistrer le Profil',

    // Security Form
    'form.currentPassword': 'Mot de passe actuel',
    'form.newPassword': 'Nouveau mot de passe',
    'form.confirmPassword': 'Confirmer le mot de passe',
    'form.changePassword': 'Changer le mot de passe',

    // Preferences Form
    'form.language': 'Langue',
    'form.emailNotifications': 'Recevoir les notifications par email',
    'form.orderUpdates': 'Notifications de mise à jour des commandes',
    'form.newsletter': 'S\'abonner à la newsletter',
    'form.savePreferences': 'Enregistrer les Préférences',

    // Address Management
    'form.addAddress': 'Ajouter',
    'form.addressLabel': 'Label (ex: Maison, Bureau)',
    'form.addressFullName': 'Nom Complet',
    'form.addressPhone': 'Téléphone',
    'form.addressStreet': 'Adresse',
    'form.addressCity': 'Ville',
    'form.addressZipcode': 'Code Postal',
    'form.defaultAddress': 'Définir comme adresse par défaut',
    'form.save': 'Enregistrer',
    'form.cancel': 'Annuler',
    'form.edit': 'Éditer',
    'form.delete': 'Supprimer',
    'form.noAddresses': 'Aucune adresse enregistrée. Ajoutez une adresse pour les livraisons.',

    // Danger Zone
    'danger.warning': 'Ces actions sont irréversibles. Soyez prudent.',
    'danger.deleteAccount': 'Supprimer le Compte',

    // Messages
    'msg.error': 'Erreur',
    'msg.success': 'Succès',
    'msg.info': 'Information',
    'msg.profileUpdated': 'Profil mis à jour avec succès',
    'msg.passwordChanged': 'Mot de passe changé avec succès',
    'msg.preferencesChanged': 'Préférences sauvegardées',
    'msg.addressAdded': 'Adresse ajoutée avec succès',
    'msg.addressDeleted': 'Adresse supprimée',
    'msg.accountDeleted': 'Compte supprimé. Redirection...',
    'msg.languageChanged': 'Langue changée avec succès',
    'msg.loadingError': 'Erreur lors du chargement',
    'msg.required': 'Tous les champs sont obligatoires',
    'msg.passwordMismatch': 'Les mots de passe ne correspondent pas',
    'msg.passwordShort': 'Le mot de passe doit contenir au moins 6 caractères'
  },

  en: {
    // Navigation & Sidebar
    'nav.dashboard': 'Dashboard',
    'nav.products': 'Products',
    'nav.inventory': 'Inventory',
    'nav.orders': 'Orders',
    'nav.customers': 'Customers',
    'nav.cart': 'Cart',
    'nav.checkout': 'Checkout',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',

    // Client Dashboard
    'dashboard.title': 'My Dashboard',
    'dashboard.subtitle': 'Manage your orders and discover recommended products',
    'dashboard.myOrders': 'My Orders',
    'dashboard.recommended': 'Recommended Products',
    'dashboard.noOrders': 'You don\'t have any orders yet.',
    'table.image': 'Image',
    'table.products': 'Products',
    'table.quantity': 'Quantity',
    'table.total': 'Total',
    'table.status': 'Status',

    // Cart Page
    'cart.title': 'Your Order',
    'cart.subtitle': 'Check your items and proceed to checkout',
    'cart.items': 'Cart Items',
    'cart.summary': 'Order Summary',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.total': 'Total',
    'cart.checkout': 'Place Order',
    'cart.empty': 'Your cart is empty',
    'cart.continueShopping': 'Continue Shopping',

    // Settings Page
    'settings.title': 'Settings',
    'settings.subtitle': 'Manage your preferences and personal information',
    'settings.profile': 'Profile',
    'settings.security': 'Security',
    'settings.preferences': 'Preferences',
    'settings.addresses': 'Shipping Addresses',
    'settings.dangerZone': 'Danger Zone',

    // Profile Form
    'form.fullName': 'Full Name',
    'form.email': 'Email',
    'form.phone': 'Phone',
    'form.address': 'Address',
    'form.city': 'City',
    'form.zipcode': 'Postal Code',
    'form.saveProfile': 'Save Profile',

    // Security Form
    'form.currentPassword': 'Current Password',
    'form.newPassword': 'New Password',
    'form.confirmPassword': 'Confirm Password',
    'form.changePassword': 'Change Password',

    // Preferences Form
    'form.language': 'Language',
    'form.emailNotifications': 'Receive email notifications',
    'form.orderUpdates': 'Order update notifications',
    'form.newsletter': 'Subscribe to newsletter',
    'form.savePreferences': 'Save Preferences',

    // Address Management
    'form.addAddress': 'Add',
    'form.addressLabel': 'Label (ex: Home, Office)',
    'form.addressFullName': 'Full Name',
    'form.addressPhone': 'Phone',
    'form.addressStreet': 'Address',
    'form.addressCity': 'City',
    'form.addressZipcode': 'Postal Code',
    'form.defaultAddress': 'Set as default address',
    'form.save': 'Save',
    'form.cancel': 'Cancel',
    'form.edit': 'Edit',
    'form.delete': 'Delete',
    'form.noAddresses': 'No addresses registered. Add an address for deliveries.',

    // Danger Zone
    'danger.warning': 'These actions are irreversible. Be careful.',
    'danger.deleteAccount': 'Delete Account',

    // Messages
    'msg.error': 'Error',
    'msg.success': 'Success',
    'msg.info': 'Information',
    'msg.profileUpdated': 'Profile updated successfully',
    'msg.passwordChanged': 'Password changed successfully',
    'msg.preferencesChanged': 'Preferences saved',
    'msg.addressAdded': 'Address added successfully',
    'msg.addressDeleted': 'Address deleted',
    'msg.accountDeleted': 'Account deleted. Redirecting...',
    'msg.languageChanged': 'Language changed successfully',
    'msg.loadingError': 'Loading error',
    'msg.required': 'All fields are required',
    'msg.passwordMismatch': 'Passwords do not match',
    'msg.passwordShort': 'Password must be at least 6 characters'
  },

  es: {
    // Navigation & Sidebar
    'nav.dashboard': 'Panel',
    'nav.products': 'Productos',
    'nav.inventory': 'Inventario',
    'nav.orders': 'Pedidos',
    'nav.customers': 'Clientes',
    'nav.cart': 'Carrito',
    'nav.checkout': 'Pago',
    'nav.profile': 'Perfil',
    'nav.settings': 'Configuración',
    'nav.logout': 'Cerrar sesión',

    // Client Dashboard
    'dashboard.title': 'Mi Panel de Control',
    'dashboard.subtitle': 'Gestione sus pedidos y descubra productos recomendados',
    'dashboard.myOrders': 'Mis Pedidos',
    'dashboard.recommended': 'Productos Recomendados',
    'dashboard.noOrders': 'Aún no tiene pedidos.',
    'table.image': 'Imagen',
    'table.products': 'Productos',
    'table.quantity': 'Cantidad',
    'table.total': 'Total',
    'table.status': 'Estado',

    // Cart Page
    'cart.title': 'Tu Pedido',
    'cart.subtitle': 'Verifica tus artículos y procede al pago',
    'cart.items': 'Artículos del carrito',
    'cart.summary': 'Resumen del pedido',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Envío',
    'cart.total': 'Total',
    'cart.checkout': 'Realizar pedido',
    'cart.empty': 'Tu carrito está vacío',
    'cart.continueShopping': 'Continuar comprando',

    // Settings Page
    'settings.title': 'Configuración',
    'settings.subtitle': 'Gestione sus preferencias e información personal',
    'settings.profile': 'Perfil',
    'settings.security': 'Seguridad',
    'settings.preferences': 'Preferencias',
    'settings.addresses': 'Direcciones de Envío',
    'settings.dangerZone': 'Zona de Peligro',

    // Profile Form
    'form.fullName': 'Nombre Completo',
    'form.email': 'Correo Electrónico',
    'form.phone': 'Teléfono',
    'form.address': 'Dirección',
    'form.city': 'Ciudad',
    'form.zipcode': 'Código Postal',
    'form.saveProfile': 'Guardar Perfil',

    // Security Form
    'form.currentPassword': 'Contraseña Actual',
    'form.newPassword': 'Nueva Contraseña',
    'form.confirmPassword': 'Confirmar Contraseña',
    'form.changePassword': 'Cambiar Contraseña',

    // Preferences Form
    'form.language': 'Idioma',
    'form.emailNotifications': 'Recibir notificaciones por correo',
    'form.orderUpdates': 'Notificaciones de actualización de pedidos',
    'form.newsletter': 'Suscribirse al boletín',
    'form.savePreferences': 'Guardar Preferencias',

    // Address Management
    'form.addAddress': 'Añadir',
    'form.addressLabel': 'Etiqueta (ej: Casa, Oficina)',
    'form.addressFullName': 'Nombre Completo',
    'form.addressPhone': 'Teléfono',
    'form.addressStreet': 'Dirección',
    'form.addressCity': 'Ciudad',
    'form.addressZipcode': 'Código Postal',
    'form.defaultAddress': 'Establecer como dirección predeterminada',
    'form.save': 'Guardar',
    'form.cancel': 'Cancelar',
    'form.edit': 'Editar',
    'form.delete': 'Eliminar',
    'form.noAddresses': 'Sin direcciones registradas. Añada una dirección para entregas.',

    // Danger Zone
    'danger.warning': 'Estas acciones son irreversibles. Tenga cuidado.',
    'danger.deleteAccount': 'Eliminar Cuenta',

    // Messages
    'msg.error': 'Error',
    'msg.success': 'Éxito',
    'msg.info': 'Información',
    'msg.profileUpdated': 'Perfil actualizado correctamente',
    'msg.passwordChanged': 'Contraseña cambiada correctamente',
    'msg.preferencesChanged': 'Preferencias guardadas',
    'msg.addressAdded': 'Dirección añadida correctamente',
    'msg.addressDeleted': 'Dirección eliminada',
    'msg.accountDeleted': 'Cuenta eliminada. Redirigiendo...',
    'msg.languageChanged': 'Idioma cambiado correctamente',
    'msg.loadingError': 'Error de carga',
    'msg.required': 'Todos los campos son obligatorios',
    'msg.passwordMismatch': 'Las contraseñas no coinciden',
    'msg.passwordShort': 'La contraseña debe tener al menos 6 caracteres'
  }
};

// Fonction de traduction
function t(key, lang = null) {
  // Récupérer la langue si non spécifiée
  if (!lang) {
    const prefs = JSON.parse(localStorage.getItem('kometa_preferences')) || {};
    lang = prefs.language || 'fr';
  }

  // Récupérer la traduction
  const langTranslations = translations[lang] || translations['fr'];
  return langTranslations[key] || key;
}

// Fonction pour obtenir la langue actuelle
function getCurrentLanguage() {
  const prefs = JSON.parse(localStorage.getItem('kometa_preferences')) || {};
  return prefs.language || 'fr';
}

// Exporter les fonctions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { translations, t, getCurrentLanguage };
}
