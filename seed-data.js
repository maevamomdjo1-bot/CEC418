// Script à exécuter côté backend pour créer des données de test
// Exécuter avec: node seed-data.js

require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connecté');
  } catch (error) {
    console.error('❌ Erreur MongoDB:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // 1. Créer un utilisateur vendor si nécessaire
    const existingVendor = await User.findOne({ email: 'vendor@test.com' });
    let vendorId;
    
    if (!existingVendor) {
      const hashedPassword = await bcrypt.hash('123456', 12);
      const vendor = new User({
        fullName: 'Vendor Test',
        email: 'vendor@test.com',
        password: hashedPassword,
        role: 'vendor'
      });
      const savedVendor = await vendor.save();
      vendorId = savedVendor._id;
      console.log('✅ Vendor créé: vendor@test.com / 123456');
    } else {
      vendorId = existingVendor._id;
      console.log('✅ Vendor existant utilisé');
    }

    // 2. Créer les catégories
    const categoryNames = ['Electronics', 'Clothing', 'Shoes', 'Home & Garden', 'Sports'];
    const categories = {};

    for (const name of categoryNames) {
      let category = await Category.findOne({ name });
      if (!category) {
        category = new Category({ name });
        await category.save();
        console.log(`✅ Catégorie créée: ${name}`);
      } else {
        console.log(`✅ Catégorie existante: ${name}`);
      }
      categories[name] = category._id;
    }

    // 3. Créer des produits de test
    const products = [
      { name: 'iPhone 15 Pro', price: 999.99, stock: 25, category: 'Electronics', description: 'Smartphone Apple dernière génération avec appareil photo professionnel' },
      { name: 'MacBook Air M3', price: 1299.99, stock: 15, category: 'Electronics', description: 'Ordinateur portable Apple avec puce M3 ultra-rapide' },
      { name: 'AirPods Pro', price: 249.99, stock: 50, category: 'Electronics', description: 'Écouteurs sans fil avec réduction de bruit active' },
      { name: 'Samsung Galaxy S24', price: 899.99, stock: 30, category: 'Electronics', description: 'Smartphone Samsung avec intelligence artificielle intégrée' },
      
      { name: 'T-Shirt Premium', price: 29.99, stock: 100, category: 'Clothing', description: 'T-shirt en coton bio de qualité supérieure' },
      { name: 'Jeans Slim Fit', price: 79.99, stock: 60, category: 'Clothing', description: 'Jean moderne coupe ajustée en denim stretch' },
      { name: 'Veste Hiver', price: 149.99, stock: 25, category: 'Clothing', description: 'Veste chaude et imperméable pour l\'hiver' },
      { name: 'Chemise Business', price: 59.99, stock: 40, category: 'Clothing', description: 'Chemise élégante pour le bureau en coton egyptien' },
      
      { name: 'Nike Air Max', price: 129.99, stock: 45, category: 'Shoes', description: 'Baskets Nike confortables avec amorti Air Max' },
      { name: 'Adidas Ultraboost', price: 149.99, stock: 35, category: 'Shoes', description: 'Chaussures de running haute performance' },
      { name: 'Bottes Chelsea', price: 189.99, stock: 20, category: 'Shoes', description: 'Bottes élégantes en cuir véritable' },
      
      { name: 'Cafetière Expresso', price: 299.99, stock: 15, category: 'Home & Garden', description: 'Machine à café automatique avec broyeur intégré' },
      { name: 'Plante Monstera', price: 39.99, stock: 50, category: 'Home & Garden', description: 'Plante tropicale d\'intérieur facile d\'entretien' },
      { name: 'Coussin Déco', price: 24.99, stock: 80, category: 'Home & Garden', description: 'Coussin décoratif en velours pour canapé' },
      
      { name: 'Tapis Yoga Pro', price: 49.99, stock: 60, category: 'Sports', description: 'Tapis de yoga antidérapant écologique' },
      { name: 'Haltères 5kg', price: 89.99, stock: 25, category: 'Sports', description: 'Paire d\'haltères réglables pour fitness' }
    ];

    // Supprimer les anciens produits pour éviter les doublons
    await Product.deleteMany({});
    console.log('🗑️ Anciens produits supprimés');

    for (const productData of products) {
      const product = new Product({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        category: categories[productData.category],
        vendor: vendorId,
        images: [] // Pas d'images uploadées, utilisera les images par défaut
      });

      await product.save();
      console.log(`✅ Produit créé: ${productData.name}`);
    }

    console.log('\n🎉 Base de données peuplée avec succès !');
    console.log('📱 Vous pouvez maintenant voir les produits sur la page products.html');
    console.log('🔑 Compte vendor: vendor@test.com / 123456');
    
  } catch (error) {
    console.error('❌ Erreur lors du peuplement:', error);
  } finally {
    mongoose.connection.close();
  }
};

const run = async () => {
  await connectDB();
  await seedData();
};

run();