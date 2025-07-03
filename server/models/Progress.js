const mongoose = require('mongoose');

const scenarioProgressSchema = new mongoose.Schema({
  scenarioId: {
    type: String,
    required: true
  },
  bestScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  attempts: {
    type: Number,
    default: 0
  },
  lastAttempt: {
    type: Date,
    default: Date.now
  },
  timeSpent: {
    type: Number,
    default: 0 // in minutes
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const lessonProgressSchema = new mongoose.Schema({
  lessonId: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  timeSpent: {
    type: Number,
    default: 0 // in minutes
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  score: {
    type: Number,
    min: 0,
    max: 100
  }
});

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  clerkId: {
    type: String,
    required: true,
    index: true
  },
  scenarios: [scenarioProgressSchema],
  lessons: [lessonProgressSchema],
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement'
  }],
  totalTimeSpent: {
    type: Number,
    default: 0 // in minutes
  },
  lastActive: {
    type: Date,
    default: Date.now
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1,
    min: 1
  },
  xp: {
    type: Number,
    default: 0,
    min: 0
  },
  stats: {
    totalScenarios: {
      type: Number,
      default: 0
    },
    totalLessons: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for efficient queries
progressSchema.index({ userId: 1 });
progressSchema.index({ lastActive: -1 });

// Update stats before saving
progressSchema.pre('save', function(next) {
  this.stats.totalScenarios = this.scenarios.filter(s => s.completed).length;
  this.stats.totalLessons = this.lessons.filter(l => l.completed).length;
  
  const completedScenarios = this.scenarios.filter(s => s.completed);
  if (completedScenarios.length > 0) {
    this.stats.averageScore = completedScenarios.reduce((sum, s) => sum + s.bestScore, 0) / completedScenarios.length;
  }
  
  next();
});

module.exports = mongoose.model('Progress', progressSchema); 