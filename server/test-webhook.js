// Test webhook functionality manually
const axios = require('axios');

async function testUserCreation() {
  console.log('🧪 Testing manual user creation...');
  
  const testUser = {
    clerkId: 'test_user_123',
    email: 'test@example.com',
    name: 'Test User',
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    imageUrl: 'https://example.com/avatar.jpg'
  };

  try {
    // Test user creation endpoint
    const response = await axios.post('http://localhost:5000/api/users/create', testUser);
    console.log('✅ User creation test successful:', response.data);
    
    // Test getting the user
    const getResponse = await axios.get(`http://localhost:5000/api/users/clerk/${testUser.clerkId}`);
    console.log('✅ User retrieval test successful:', getResponse.data.user.name);
    
    // Test progress retrieval
    const progressResponse = await axios.get(`http://localhost:5000/api/progress/clerk/${testUser.clerkId}`);
    console.log('✅ Progress retrieval test successful. XP:', progressResponse.data.xp);
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testUserCreation(); 