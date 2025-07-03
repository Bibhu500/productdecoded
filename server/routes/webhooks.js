const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Progress = require('../models/Progress');

// Middleware to parse raw body for webhook verification
const parseRawBody = (req, res, next) => {
  req.rawBody = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    req.rawBody += chunk;
  });
  req.on('end', () => {
    next();
  });
};

// @route   POST /api/webhooks/clerk
// @desc    Handle Clerk webhook events
// @access  Public (but should validate webhook signature in production)
router.post('/clerk', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    console.log('🔥 Webhook received!');
    console.log('Headers:', req.headers);
    console.log('Raw body length:', req.body ? req.body.length : 'No body');
    
    const event = JSON.parse(req.body);
    
    console.log('📦 Parsed event:', {
      type: event.type,
      id: event.data?.id,
      email: event.data?.email_addresses?.[0]?.email_address
    });

    switch (event.type) {
      case 'user.created':
        console.log('👤 Creating new user...');
        await handleUserCreated(event.data);
        console.log('✅ User created successfully');
        break;
      case 'user.updated':
        console.log('📝 Updating user...');
        await handleUserUpdated(event.data);
        console.log('✅ User updated successfully');
        break;
      case 'user.deleted':
        console.log('🗑️ Deleting user...');
        await handleUserDeleted(event.data);
        console.log('✅ User deleted successfully');
        break;
      default:
        console.log('❓ Unhandled event type:', event.type);
    }

    res.status(200).json({ received: true, eventType: event.type });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    console.error('Request body:', req.body?.toString());
    res.status(400).json({ error: 'Webhook processing failed', message: error.message });
  }
});

// Handle user creation from Clerk
async function handleUserCreated(userData) {
  try {
    console.log('📋 Processing user data:', {
      id: userData.id,
      email_addresses: userData.email_addresses?.length,
      first_name: userData.first_name,
      last_name: userData.last_name
    });

    const primaryEmail = userData.email_addresses?.find(email => email.id === userData.primary_email_address_id);
    
    if (!primaryEmail) {
      console.error('❌ No primary email found');
      throw new Error('No primary email address found');
    }

    const user = new User({
      clerkId: userData.id,
      email: primaryEmail.email_address,
      name: `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'User',
      firstName: userData.first_name || '',
      lastName: userData.last_name || '',
      username: userData.username,
      imageUrl: userData.image_url,
      lastLogin: new Date()
    });

    console.log('💾 Saving user to database...');
    const savedUser = await user.save();
    console.log('✅ User saved with ID:', savedUser._id);

    // Create initial progress for the user
    console.log('📊 Creating initial progress...');
    const progress = new Progress({
      userId: savedUser._id,
      clerkId: userData.id,
      scenarios: [],
      lessons: [],
      achievements: [],
      totalTimeSpent: 0,
      lastActive: new Date(),
      currentStreak: 0,
      longestStreak: 0,
      level: 1,
      xp: 0
    });

    const savedProgress = await progress.save();
    console.log('✅ Progress created with ID:', savedProgress._id);

  } catch (error) {
    console.error('❌ Error in handleUserCreated:', error);
    throw error;
  }
}

// Handle user updates from Clerk
async function handleUserUpdated(userData) {
  try {
    const user = await User.findOne({ clerkId: userData.id });
    
    if (user) {
      user.updateFromClerk(userData);
      await user.save();
      console.log('✅ User updated:', user._id);
    } else {
      console.log('❓ User not found for update, creating new user...');
      await handleUserCreated(userData);
    }
  } catch (error) {
    console.error('❌ Error updating user:', error);
    throw error;
  }
}

// Handle user deletion from Clerk
async function handleUserDeleted(userData) {
  try {
    const user = await User.findOne({ clerkId: userData.id });
    
    if (user) {
      user.isActive = false;
      await user.save();
      
      await Progress.updateOne(
        { clerkId: userData.id },
        { $set: { isActive: false } }
      );
      
      console.log('✅ User deactivated:', user._id);
    }
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    throw error;
  }
}

// @route   GET /api/webhooks/test
// @desc    Test webhook endpoint
// @access  Public
router.get('/test', (req, res) => {
  console.log('🧪 Test endpoint called');
  res.json({ 
    message: 'Webhook endpoint is working!', 
    timestamp: new Date().toISOString(),
    mongodbStatus: require('mongoose').connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// @route   POST /api/webhooks/clerk/sync-user
// @desc    Manually sync user from Clerk (for testing/migration)
// @access  Public
router.post('/clerk/sync-user', async (req, res) => {
  try {
    const { clerkId, userData } = req.body;
    
    if (!clerkId || !userData) {
      return res.status(400).json({ message: 'ClerkId and userData are required' });
    }

    let user = await User.findOne({ clerkId });
    
    if (user) {
      user.updateFromClerk(userData);
      await user.save();
    } else {
      await handleUserCreated(userData);
      user = await User.findOne({ clerkId });
    }

    res.json({
      message: 'User synced successfully',
      user
    });
  } catch (error) {
    console.error('Sync user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 