const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

const connectDB = async () => {
  try {
    // Try regular MongoDB first
    if (process.env.MONGO_URI.includes('localhost')) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('✅ MongoDB local connected');
      return;
    }
    
    // If that fails, try MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Atlas connected');
    
  } catch (error) {
    console.warn('⚠️ Regular MongoDB failed, starting in-memory database...');
    
    // Start in-memory MongoDB
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log('✅ In-memory MongoDB started');
  }
};

const disconnectDB = async () => {
  await mongoose.connection.close();
  if (mongod) {
    await mongod.stop();
  }
};

module.exports = { connectDB, disconnectDB };