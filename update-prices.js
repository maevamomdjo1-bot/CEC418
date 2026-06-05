// Script pour mettre à jour les prix en CFA réalistes
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connecté');
  } catch (error) {
    console.error('❌ Erreur MongoDB:', error.message);
    process.exit(1);
  }
};

const updatePrices = async () => {
  try {
    // Prix réalistes en CFA
    const priceUpdates = {
      'iPhone 15 Pro': 750000,
      'MacBook Air M3': 850000, 
      'AirPods Pro': 180000,
      'Samsung Galaxy S24': 650000,
      'T-Shirt Premium': 15000,
      'Jeans Slim Fit': 25000,
      'Veste Hiver': 45000,
      'Chemise Business': 20000,
      'Nike Air Max': 85000,
      'Adidas Ultraboost': 95000,
      'Bottes Chelsea': 120000,
      'Cafetière Expresso': 150000,
      'Plante Monstera': 12000,
      'Coussin Déco': 8000,
      'Tapis Yoga Pro': 25000,
      'Haltères 5kg': 35000
    };

    console.log('🔄 Mise à jour des prix...');

    for (const [name, price] of Object.entries(priceUpdates)) {
      await Product.updateOne(
        { name: name },
        { $set: { price: price } }
      );
      console.log(`✅ ${name}: ${price.toLocaleString('fr-FR')} CFA`);
    }

    console.log('\n🎉 Prix mis à jour avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error);
  } finally {
    mongoose.connection.close();
  }
};

const run = async () => {
  await connectDB();
  await updatePrices();
};

run();