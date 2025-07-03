const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    trim: true,
    sparse: true // Allows multiple null values
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profile: {
    bio: String,
    company: String,
    position: String,
    location: String
  },
  preferences: {
    notifications: {
      type: Boolean,
      default: true
    },
    darkMode: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'en'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'Users' // Explicitly set collection name
});

// Index for efficient queries
userSchema.index({ clerkId: 1 });
userSchema.index({ email: 1 });
userSchema.index({ createdAt: -1 });

// Method to update user data from Clerk
userSchema.methods.updateFromClerk = function(clerkData) {
  this.email = clerkData.email_addresses?.[0]?.email_address || this.email;
  this.name = `${clerkData.first_name || ''} ${clerkData.last_name || ''}`.trim() || this.name;
  this.firstName = clerkData.first_name || this.firstName;
  this.lastName = clerkData.last_name || this.lastName;
  this.username = clerkData.username || this.username;
  this.imageUrl = clerkData.image_url || this.imageUrl;
  this.lastLogin = new Date();
  return this;
};

// Remove sensitive data from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  // Remove any sensitive fields if needed
  return userObject;
};

module.exports = mongoose.model('User', userSchema); 