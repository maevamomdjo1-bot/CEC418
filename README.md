# SmartShop - E-commerce Dashboard

## 📋 Projet Structure

```
smartshop/
├── compoments/          # Composants réutilisables
│   ├── navbad.html     # Barre de navigation
│   └── sidebar.html    # Menu latéral avec liens vers toutes les pages
├── css/                 # Feuilles de style
├── database/
│   └── firebase-config.js # Configuration Firebase (à compléter)
├── html/               # Pages principales
│   ├── auth.html
│   ├── cart.html
│   ├── checkout.html
│   ├── client-dashboard.html
│   ├── inventory.html
│   ├── order-summary.html
│   ├── orders.html
│   ├── products.html
│   ├── profile.html
│   ├── users.html
│   └── vendor-dashboard.html
├── js/                 # Scripts JavaScript
│   ├── include.js      # Loader pour composants (navigation active)
│   ├── firebase-products.js # Intégration Firestore
│   ├── admin.js
│   ├── auth.js
│   ├── cart.js
│   ├── checkout.js
│   ├── dashboard.js
│   ├── inventory.js
│   ├── oders.js
│   ├── products.js
│   ├── profile.js
│   └── users.js
├── images/
└── pdf/
    └── invoices/
```

## ✨ Fonctionnalités Implémentées

1. **Navigation Réutilisable**
   - `compoments/sidebar.html` : Menu latéral avec tous les liens
   - `compoments/navbad.html` : Barre supérieure de navigation
   - Inclusion dynamique avec `js/include.js`
   - Surlignage automatique de la page active

2. **Intégration Firebase**
   - `database/firebase-config.js` : Configuration (à remplir avec vos credentials)
   - `js/firebase-products.js` : Charge les produits depuis Firestore
   - Page Products affiche les articles dynamiquement

3. **Pages Implémentées**
   - ✅ Dashboard
   - ✅ Products (avec chargement Firebase)
   - ✅ Cart
   - ✅ Checkout
   - ✅ Inventory
   - ✅ Orders
   - ✅ Users
   - ✅ Admin Panel
   - ✅ Profile
   - ✅ Auth
   - ✅ Order Summary

4. **Chemins Centralisés**
   - Tous les fichiers CSS pointent vers `../css/`
   - Tous les fichiers JS pointent vers `../js/`
   - Les composants incluent `../compoments/`

## 🚀 Démarrage Local

### Option 1 : Python (simple)
```bash
cd smartshop
python -m http.server 8000
```
Puis ouvrir http://localhost:8000/html/dashbord.html

### Option 2 : Node.js (avec live reload)
```bash
npm install -g http-server
cd smartshop
http-server -p 8000 -o html/dashbord.html
```

### Option 3 : VS Code Live Server
Clic-droit sur `html/dashbord.html` → Open with Live Server

## 🔧 Configuration Firebase

1. Accédez à [Firebase Console](https://console.firebase.google.com/)
2. Créez un projet Firebase
3. Récupérez votre configuration (Paramètres du projet)
4. Remplissez `database/firebase-config.js` :
```javascript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

5. Dans Firestore, créez une collection `products` avec des documents contenant :
```json
{
  "name": "Laptop",
  "price": 500,
  "category": "Electronics",
  "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
}
```

## 📱 Navigation

Depuis n'importe quelle page, vous pouvez accéder à :
- **Dashboard** → Aperçu général
- **Products** → Liste des produits (chargés depuis Firebase)
- **Inventory** → Gestion des stocks
- **Orders** → Suivi des commandes
- **Cart** → Panier d'achat
- **Checkout** → Passage de commande
- **Users** → Gestion des clients
- **Admin Panel** → Outils d'administration
- **Profile** → Profil utilisateur
- **Auth** → Authentification

## 🎨 Design

Toutes les pages utilisent :
- **Sidebar** cohérent avec tous les liens actifs automatiquement
- **Navbar** supérieure avec recherche et notifications
- **Design responsive** (prévu pour mobile et desktop)
- **Icônes Font Awesome 6.5.1**
- **Couleurs et styles CSS modulaires**

## 📝 Notes

- `include.js` gère automatiquement l'inclusion des composants et le surlignage de la page active
- Tous les fichiers JS CSS et HTML utilisent des chemins relatifs (`../`)
- Firebase charge les produits dynamiquement (à adapter selon vos besoins)
- Les pages vides créées peuvent être développées selon vos besoins spécifiques

## ✅ Prochaines Étapes

1. Configurer Firebase avec vos credentials
2. Ajouter des produits dans Firestore
3. Personnaliser les CSS dans le dossier `css/`
4. Implémenter la logique métier dans les fichiers `js/`
5. Ajouter l'authentification utilisateur
6. Mettre en place le panier (localStorage ou Firebase)
7. Intégrer le paiement
# 1. Start MongoDB locally

# 2. Start backend
cd backend
npm run dev

# 3. Open frontend
# Use VS Code Live Server on the frontend/ folder
# OR: npx serve frontend -p 3000
# Then visit: http://localhost:3000/pages/index.html
