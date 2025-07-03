const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const { body, validationResult } = require('express-validator');

// @route   GET /api/progress/:userId
// @desc    Get user progress (supports both MongoDB ObjectId and Clerk ID)
// @access  Public
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    let progress;
    
    // Try to find by MongoDB ObjectId first, then by Clerk ID
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      // MongoDB ObjectId format
      progress = await Progress.findOne({ userId: userId });
    } else {
      // Assume it's a Clerk ID
      progress = await Progress.findOne({ clerkId: userId });
    }
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found. User may need to be created first.' });
    }

    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/progress/clerk/:clerkId
// @desc    Get user progress by Clerk ID
// @access  Public
router.get('/clerk/:clerkId', async (req, res) => {
  try {
    let progress = await Progress.findOne({ clerkId: req.params.clerkId });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found. User may need to be created first.' });
    }

    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/progress/:userId/scenario
// @desc    Update scenario progress (supports both MongoDB ObjectId and Clerk ID)
// @access  Public
router.post('/:userId/scenario', [
  body('scenarioId').notEmpty().withMessage('Scenario ID is required'),
  body('score').isNumeric().withMessage('Score must be a number'),
  body('timeSpent').isNumeric().withMessage('Time spent must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { scenarioId, score, timeSpent } = req.body;
    const userId = req.params.userId;
    let progress;
    
    // Find progress by MongoDB ObjectId or Clerk ID
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      progress = await Progress.findOne({ userId: userId });
    } else {
      progress = await Progress.findOne({ clerkId: userId });
    }

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found. User may need to be created first.' });
    }

    // Update streak logic
    const now = new Date();
    const lastActive = new Date(progress.lastActive);
    const daysDiff = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      progress.currentStreak++;
      progress.longestStreak = Math.max(progress.currentStreak, progress.longestStreak);
    } else if (daysDiff > 1) {
      progress.currentStreak = 1;
    }

    progress.lastActive = now;

    // Find existing scenario progress
    const existingScenario = progress.scenarios.find(s => s.scenarioId === scenarioId);

    if (existingScenario) {
      existingScenario.attempts++;
      existingScenario.timeSpent += timeSpent;
      existingScenario.lastAttempt = now;
      if (score > existingScenario.bestScore) {
        existingScenario.bestScore = score;
        progress.xp += Math.floor(score / 10); // Award XP for improvement
      }
      existingScenario.completed = score >= 70;
    } else {
      progress.scenarios.push({
        scenarioId,
        bestScore: score,
        attempts: 1,
        lastAttempt: now,
        timeSpent,
        completed: score >= 70
      });
      progress.xp += 10; // Award XP for first attempt
    }

    progress.totalTimeSpent += timeSpent;
    
    // Update level
    const newLevel = Math.floor(progress.xp / 100) + 1;
    if (newLevel > progress.level) {
      progress.level = newLevel;
    }

    await progress.save();

    res.json({
      message: 'Scenario progress updated successfully',
      progress
    });
  } catch (error) {
    console.error('Update scenario progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/progress/:userId/lesson
// @desc    Update lesson progress (supports both MongoDB ObjectId and Clerk ID)
// @access  Public
router.post('/:userId/lesson', [
  body('lessonId').notEmpty().withMessage('Lesson ID is required'),
  body('completed').isBoolean().withMessage('Completed must be a boolean'),
  body('timeSpent').isNumeric().withMessage('Time spent must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { lessonId, completed, timeSpent, score } = req.body;
    const userId = req.params.userId;
    let progress;
    
    // Find progress by MongoDB ObjectId or Clerk ID
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      progress = await Progress.findOne({ userId: userId });
    } else {
      progress = await Progress.findOne({ clerkId: userId });
    }

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found. User may need to be created first.' });
    }

    // Update streak logic
    const now = new Date();
    const lastActive = new Date(progress.lastActive);
    const daysDiff = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      progress.currentStreak++;
      progress.longestStreak = Math.max(progress.currentStreak, progress.longestStreak);
    } else if (daysDiff > 1) {
      progress.currentStreak = 1;
    }

    progress.lastActive = now;

    // Find existing lesson progress
    const existingLesson = progress.lessons.find(l => l.lessonId === lessonId);

    if (existingLesson) {
      existingLesson.timeSpent += timeSpent;
      existingLesson.lastAccessed = now;
      if (completed && !existingLesson.completed) {
        existingLesson.completed = true;
        existingLesson.score = score;
        progress.xp += 20; // Award XP for completion
      }
    } else {
      progress.lessons.push({
        lessonId,
        completed,
        timeSpent,
        lastAccessed: now,
        score
      });
      if (completed) {
        progress.xp += 20; // Award XP for completion
      }
    }

    progress.totalTimeSpent += timeSpent;
    
    // Update level
    const newLevel = Math.floor(progress.xp / 100) + 1;
    if (newLevel > progress.level) {
      progress.level = newLevel;
    }

    await progress.save();

    res.json({
      message: 'Lesson progress updated successfully',
      progress
    });
  } catch (error) {
    console.error('Update lesson progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/progress/:userId/stats
// @desc    Get user stats summary (supports both MongoDB ObjectId and Clerk ID)
// @access  Public
router.get('/:userId/stats', async (req, res) => {
  try {
    const userId = req.params.userId;
    let progress;
    
    // Find progress by MongoDB ObjectId or Clerk ID
    if (userId.match(/^[0-9a-fA-F]{24}$/)) {
      progress = await Progress.findOne({ userId: userId });
    } else {
      progress = await Progress.findOne({ clerkId: userId });
    }
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    const stats = {
      totalPoints: progress.xp,
      level: progress.level,
      scenariosCompleted: progress.stats.totalScenarios,
      lessonsCompleted: progress.stats.totalLessons,
      averageScore: Math.round(progress.stats.averageScore),
      timeSpent: `${Math.floor(progress.totalTimeSpent / 60)}h ${progress.totalTimeSpent % 60}m`,
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak
    };

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/progress/clerk/:clerkId/scenario
// @desc    Update scenario progress by Clerk ID
// @access  Public
router.post('/clerk/:clerkId/scenario', [
  body('scenarioId').notEmpty().withMessage('Scenario ID is required'),
  body('score').isNumeric().withMessage('Score must be a number'),
  body('timeSpent').isNumeric().withMessage('Time spent must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { scenarioId, score, timeSpent } = req.body;
    let progress = await Progress.findOne({ clerkId: req.params.clerkId });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found. User may need to be created first.' });
    }

    // Update streak logic
    const now = new Date();
    const lastActive = new Date(progress.lastActive);
    const daysDiff = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      progress.currentStreak++;
      progress.longestStreak = Math.max(progress.currentStreak, progress.longestStreak);
    } else if (daysDiff > 1) {
      progress.currentStreak = 1;
    }

    progress.lastActive = now;

    // Find existing scenario progress
    const existingScenario = progress.scenarios.find(s => s.scenarioId === scenarioId);

    if (existingScenario) {
      existingScenario.attempts++;
      existingScenario.timeSpent += timeSpent;
      existingScenario.lastAttempt = now;
      if (score > existingScenario.bestScore) {
        existingScenario.bestScore = score;
        progress.xp += Math.floor(score / 10);
      }
      existingScenario.completed = score >= 70;
    } else {
      progress.scenarios.push({
        scenarioId,
        bestScore: score,
        attempts: 1,
        lastAttempt: now,
        timeSpent,
        completed: score >= 70
      });
      progress.xp += 10;
    }

    progress.totalTimeSpent += timeSpent;
    
    // Update level
    const newLevel = Math.floor(progress.xp / 100) + 1;
    if (newLevel > progress.level) {
      progress.level = newLevel;
    }

    await progress.save();

    res.json({
      message: 'Scenario progress updated successfully',
      progress,
      levelUp: newLevel > progress.level
    });
  } catch (error) {
    console.error('Update scenario progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/progress/clerk/:clerkId/lesson
// @desc    Update lesson progress by Clerk ID
// @access  Public
router.post('/clerk/:clerkId/lesson', [
  body('lessonId').notEmpty().withMessage('Lesson ID is required'),
  body('completed').isBoolean().withMessage('Completed must be a boolean'),
  body('timeSpent').isNumeric().withMessage('Time spent must be a number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { lessonId, completed, timeSpent, score } = req.body;
    let progress = await Progress.findOne({ clerkId: req.params.clerkId });

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found. User may need to be created first.' });
    }

    // Update streak logic
    const now = new Date();
    const lastActive = new Date(progress.lastActive);
    const daysDiff = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      progress.currentStreak++;
      progress.longestStreak = Math.max(progress.currentStreak, progress.longestStreak);
    } else if (daysDiff > 1) {
      progress.currentStreak = 1;
    }

    progress.lastActive = now;

    // Find existing lesson progress
    const existingLesson = progress.lessons.find(l => l.lessonId === lessonId);

    if (existingLesson) {
      existingLesson.timeSpent += timeSpent;
      existingLesson.lastAccessed = now;
      if (completed && !existingLesson.completed) {
        existingLesson.completed = true;
        existingLesson.score = score;
        progress.xp += 20;
      }
    } else {
      progress.lessons.push({
        lessonId,
        completed,
        timeSpent,
        lastAccessed: now,
        score
      });
      if (completed) {
        progress.xp += 20;
      }
    }

    progress.totalTimeSpent += timeSpent;
    
    // Update level
    const oldLevel = progress.level;
    const newLevel = Math.floor(progress.xp / 100) + 1;
    if (newLevel > progress.level) {
      progress.level = newLevel;
    }

    await progress.save();

    res.json({
      message: 'Lesson progress updated successfully',
      progress,
      levelUp: newLevel > oldLevel
    });
  } catch (error) {
    console.error('Update lesson progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 