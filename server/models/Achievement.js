const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  achievementId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true,
    min: 0
  },
  icon: {
    type: String,
    default: 'trophy'
  },
  category: {
    type: String,
    enum: ['learning', 'practice', 'streak', 'score', 'time', 'level', 'special'],
    default: 'learning'
  },
  requirements: {
    type: {
      type: String,
      enum: ['scenario', 'lesson', 'streak', 'score', 'time', 'level', 'custom'],
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    condition: {
      type: String,
      enum: ['>=', '<=', '=', '>', '<'],
      default: '>='
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    default: 'common'
  }
}, {
  timestamps: true
});

const userAchievementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  achievementId: {
    type: String,
    required: true
  },
  unlockedAt: {
    type: Date,
    default: Date.now
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
userAchievementSchema.index({ userId: 1, achievementId: 1 }, { unique: true });

const Achievement = mongoose.model('Achievement', achievementSchema);
const UserAchievement = mongoose.model('UserAchievement', userAchievementSchema);

module.exports = { Achievement, UserAchievement }; 