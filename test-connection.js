const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('URI:', process.env.MONGO_URI.replace(/\/\/(.+):(.+)@/, '//***:***@'));
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test basic operations
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: 'connection', timestamp: new Date() });
    console.log('✅ Database write test successful!');
    
    mongoose.connection.close();
    console.log('Connection closed.');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('querySrv ECONNREFUSED')) {
      console.log('\n💡 Solutions:');
      console.log('1. Check your internet connection');
      console.log('2. Verify MongoDB Atlas IP whitelist');
      console.log('3. Check username/password credentials');
      console.log('4. Try using MongoDB Compass to test connection');
    }
  }
};

testConnection();