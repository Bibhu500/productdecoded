const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Progress = require('../models/Progress');
const { body, validationResult } = require('express-validator');

// @route   POST /api/users/create
// @desc    Create or update user from Clerk data
// @access  Public
router.post('/create', [
  body('clerkId').notEmpty().withMessage('Clerk ID is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('name').notEmpty().withMessage('Name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { clerkId, email, name, username, firstName, lastName, imageUrl } = req.body;

    // Check if user already exists
    let user = await User.findOne({ clerkId });
    
    if (user) {
      // Update existing user
      user.email = email;
      user.name = name;
      user.username = username;
      user.firstName = firstName;
      user.lastName = lastName;
      user.imageUrl = imageUrl;
      user.lastLogin = new Date();
      await user.save();
    } else {
      // Create new user
      user = new User({
        clerkId,
        email,
        name,
        username,
        firstName,
        lastName,
        imageUrl,
        lastLogin: new Date()
      });
      await user.save();

      // Create initial progress for new user
      const progress = new Progress({
        userId: user._id,
        clerkId: clerkId,
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
      await progress.save();
    }

    res.status(201).json({
      message: 'User created/updated successfully',
      user: {
        id: user._id,
        clerkId: user.clerkId,
        name: user.name,
        email: user.email,
        username: user.username,
        imageUrl: user.imageUrl,
        profile: user.profile
      }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Server error during user creation' });
  }
});

// @route   GET /api/users/clerk/:clerkId
// @desc    Get user by Clerk ID
// @access  Public
router.get('/clerk/:clerkId', async (req, res) => {
  try {
    const user = await User.findOne({ clerkId: req.params.clerkId, isActive: true });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        clerkId: user.clerkId,
        name: user.name,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        profile: user.profile,
        preferences: user.preferences,
        lastLogin: user.lastLogin
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/:id
// @desc    Get user profile
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { name, profile, preferences } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (profile) updateData.profile = { ...updateData.profile, ...profile };
    if (preferences) updateData.preferences = { ...updateData.preferences, ...preferences };

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 