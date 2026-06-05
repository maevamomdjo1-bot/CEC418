import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "../database/firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  try {
    const snapshot = await getDocs(collection(db, 'products'));
    snapshot.forEach(doc => {
      const p = doc.data();
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.image || 'https://via.placeholder.com/300'}" alt="">
        <h3>${p.name || 'Unnamed'}</h3>
        <p class="category">${p.category || ''}</p>
        <p class="price">${p.price ? '$' + p.price : ''}</p>
        <button>Add to Cart</button>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error('Failed to load products from Firestore:', err);
  }
}

loadProducts();
