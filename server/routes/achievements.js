const express = require('express');
const router = express.Router();
const { Achievement, UserAchievement } = require('../models/Achievement');
const Progress = require('../models/Progress');

// @route   GET /api/achievements
// @desc    Get all available achievements
// @access  Public
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find({ isActive: true }).sort({ points: 1 });
    res.json(achievements);
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/achievements/:userId
// @desc    Get user's achievements
// @access  Public
router.get('/:userId', async (req, res) => {
  try {
    const userAchievements = await UserAchievement.find({ userId: req.params.userId });
    const allAchievements = await Achievement.find({ isActive: true });
    
    const achievementsWithProgress = allAchievements.map(achievement => {
      const userAchievement = userAchievements.find(ua => ua.achievementId === achievement.achievementId);
      
      return {
        id: achievement.achievementId,
        title: achievement.title,
        description: achievement.description,
        points: achievement.points,
        icon: achievement.icon,
        category: achievement.category,
        rarity: achievement.rarity,
        unlocked: !!userAchievement,
        unlockedAt: userAchievement ? userAchievement.unlockedAt : null,
        progress: userAchievement ? 100 : 0
      };
    });

    res.json(achievementsWithProgress);
  } catch (error) {
    console.error('Get user achievements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/achievements/check/:userId
// @desc    Check and unlock achievements for user
// @access  Public
router.post('/check/:userId', async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.params.userId });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    const achievements = await Achievement.find({ isActive: true });
    const userAchievements = await UserAchievement.find({ userId: req.params.userId });
    const unlockedAchievementIds = userAchievements.map(ua => ua.achievementId);
    
    const newlyUnlocked = [];

    for (const achievement of achievements) {
      if (unlockedAchievementIds.includes(achievement.achievementId)) {
        continue; // Already unlocked
      }

      let shouldUnlock = false;

      switch (achievement.requirements.type) {
        case 'scenario':
          const completedScenarios = progress.scenarios.filter(s => s.completed).length;
          shouldUnlock = this.checkCondition(completedScenarios, achievement.requirements.condition, achievement.requirements.value);
          break;
        
        case 'lesson':
          const completedLessons = progress.lessons.filter(l => l.completed).length;
          shouldUnlock = this.checkCondition(completedLessons, achievement.requirements.condition, achievement.requirements.value);
          break;
        
        case 'streak':
          shouldUnlock = this.checkCondition(progress.currentStreak, achievement.requirements.condition, achievement.requirements.value);
          break;
        
        case 'score':
          const avgScore = progress.stats.averageScore;
          shouldUnlock = this.checkCondition(avgScore, achievement.requirements.condition, achievement.requirements.value);
          break;
        
        case 'time':
          shouldUnlock = this.checkCondition(progress.totalTimeSpent, achievement.requirements.condition, achievement.requirements.value);
          break;
        
        case 'level':
          shouldUnlock = this.checkCondition(progress.level, achievement.requirements.condition, achievement.requirements.value);
          break;
      }

      if (shouldUnlock) {
        const userAchievement = new UserAchievement({
          userId: req.params.userId,
          achievementId: achievement.achievementId
        });
        await userAchievement.save();
        
        // Add XP for achievement
        progress.xp += achievement.points;
        newlyUnlocked.push({
          id: achievement.achievementId,
          title: achievement.title,
          description: achievement.description,
          points: achievement.points
        });
      }
    }

    if (newlyUnlocked.length > 0) {
      await progress.save();
    }

    res.json({
      message: `${newlyUnlocked.length} new achievements unlocked`,
      newlyUnlocked
    });
  } catch (error) {
    console.error('Check achievements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to check conditions
router.checkCondition = function(value, condition, target) {
  switch (condition) {
    case '>=': return value >= target;
    case '<=': return value <= target;
    case '=': return value === target;
    case '>': return value > target;
    case '<': return value < target;
    default: return false;
  }
};

// @route   POST /api/achievements/seed
// @desc    Seed initial achievements (admin only)
// @access  Public (should be protected in production)
router.post('/seed', async (req, res) => {
  try {
    const defaultAchievements = [
      {
        achievementId: 'first-steps',
        title: 'First Steps',
        description: 'Complete your first scenario',
        points: 50,
        icon: 'play',
        category: 'practice',
        requirements: { type: 'scenario', value: 1, condition: '>=' },
        rarity: 'common'
      },
      {
        achievementId: 'quick-learner',
        title: 'Quick Learner',
        description: 'Complete your first lesson',
        points: 30,
        icon: 'book',
        category: 'learning',
        requirements: { type: 'lesson', value: 1, condition: '>=' },
        rarity: 'common'
      },
      {
        achievementId: 'dedicated-student',
        title: 'Dedicated Student',
        description: 'Complete 5 lessons',
        points: 100,
        icon: 'graduation-cap',
        category: 'learning',
        requirements: { type: 'lesson', value: 5, condition: '>=' },
        rarity: 'uncommon'
      },
      {
        achievementId: 'streak-starter',
        title: 'Streak Starter',
        description: 'Maintain a 3-day learning streak',
        points: 75,
        icon: 'flame',
        category: 'streak',
        requirements: { type: 'streak', value: 3, condition: '>=' },
        rarity: 'uncommon'
      },
      {
        achievementId: 'perfectionist',
        title: 'Perfectionist',
        description: 'Achieve 100% on a scenario',
        points: 150,
        icon: 'star',
        category: 'score',
        requirements: { type: 'score', value: 100, condition: '>=' },
        rarity: 'rare'
      },
      {
        achievementId: 'level-up',
        title: 'Level Up',
        description: 'Reach Level 5',
        points: 200,
        icon: 'trophy',
        category: 'level',
        requirements: { type: 'level', value: 5, condition: '>=' },
        rarity: 'rare'
      }
    ];

    // Only create if they don't exist
    for (const achievementData of defaultAchievements) {
      const existing = await Achievement.findOne({ achievementId: achievementData.achievementId });
      if (!existing) {
        await Achievement.create(achievementData);
      }
    }

    res.json({ message: 'Achievements seeded successfully' });
  } catch (error) {
    console.error('Seed achievements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 