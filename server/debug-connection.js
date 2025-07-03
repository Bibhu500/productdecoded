const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 MongoDB Connection Debugger');
console.log('================================');

// Check environment variables
console.log('📁 Environment Variables:');
console.log('   MONGODB_URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');
console.log('   PORT:', process.env.PORT || 'Not set');

if (!process.env.MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env file');
  process.exit(1);
}

// Display connection string (with password masked)
const maskedUri = process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@');
console.log('🔗 Connection String:', maskedUri);

// Test connection
async function testConnection() {
  console.log('\n🔄 Attempting MongoDB connection...');
  
  try {
    // Set connection timeout
    const options = {
      serverSelectionTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
    };
    
    console.log('⏱️  Connecting with 10-second timeout...');
    
    await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log('✅ MongoDB connection successful!');
    console.log('📊 Connection Details:');
    console.log('   - State:', mongoose.connection.readyState);
    console.log('   - Database:', mongoose.connection.db.databaseName);
    console.log('   - Host:', mongoose.connection.host);
    console.log('   - Port:', mongoose.connection.port);
    
  } catch (error) {
    console.error('❌ MongoDB connection failed!');
    console.error('📋 Error Details:');
    console.error('   - Type:', error.constructor.name);
    console.error('   - Message:', error.message);
    console.error('   - Code:', error.code || 'N/A');
    console.error('   - CodeName:', error.codeName || 'N/A');
    
    if (error.reason) {
      console.error('   - Reason:', error.reason);
    }
    
    // Common solutions
    console.log('\n🔧 Common Solutions:');
    console.log('   1. Check if your IP is whitelisted in MongoDB Atlas');
    console.log('   2. Verify username and password are correct');
    console.log('   3. Ensure network connectivity');
    console.log('   4. Check if database name is specified in URI');
    console.log('   5. Verify cluster is running and accessible');
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
    process.exit(0);
  }
}

testConnection(); 