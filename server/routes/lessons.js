const express = require('express');
const router = express.Router();

// Mock lessons data - in production, this would come from database
const lessons = [
  {
    id: 'rca-intro',
    moduleId: 'fundamentals',
    title: 'Introduction to RCA',
    description: 'Learn the basics of Product Problem Analysis',
    duration: '15 mins',
    type: 'text',
    difficulty: 'beginner',
    points: 50
  },
  {
    id: '5-whys',
    moduleId: 'fundamentals',
    title: 'The 5 Whys Technique',
    description: 'Master the fundamental 5 Whys questioning technique',
    duration: '20 mins',
    type: 'text',
    difficulty: 'beginner',
    points: 60
  },
  {
    id: 'fishbone-diagram',
    moduleId: 'techniques',
    title: 'Fishbone Diagrams',
    description: 'Learn to create and use fishbone diagrams for cause analysis',
    duration: '25 mins',
    type: 'video',
    difficulty: 'intermediate',
    points: 75
  }
];

// @route   GET /api/lessons
// @desc    Get all available lessons
// @access  Public
router.get('/', (req, res) => {
  try {
    const { moduleId } = req.query;
    
    let filteredLessons = lessons;
    if (moduleId) {
      filteredLessons = lessons.filter(lesson => lesson.moduleId === moduleId);
    }

    res.json({
      message: 'Lessons retrieved successfully',
      lessons: filteredLessons
    });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/lessons/:id
// @desc    Get specific lesson
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const lesson = lessons.find(l => l.id === req.params.id);
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json({
      message: 'Lesson retrieved successfully',
      lesson
    });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/lessons/:id/complete
// @desc    Mark lesson as complete
// @access  Public
router.post('/:id/complete', (req, res) => {
  try {
    const { timeSpent, quizScore } = req.body;
    
    if (!timeSpent || timeSpent < 0) {
      return res.status(400).json({ message: 'Valid time spent is required' });
    }

    const lesson = lessons.find(l => l.id === req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Calculate completion score
    let completionScore = 100;
    if (quizScore !== undefined) {
      completionScore = quizScore;
    }

    res.json({
      message: 'Lesson completed successfully',
      points: lesson.points,
      score: completionScore,
      timeSpent: timeSpent
    });
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 