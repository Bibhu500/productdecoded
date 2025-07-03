const express = require('express');
const router = express.Router();

// Mock scenarios data - in production, this would come from database
const scenarios = [
  {
    id: 'user-engagement-drop',
    title: 'User Engagement Drop',
    description: 'Monthly active users dropped by 30% in the last quarter',
    difficulty: 'intermediate',
    estimatedTime: '20 mins',
    category: 'engagement',
    initialScore: 0
  },
  {
    id: 'feature-adoption-low',
    title: 'Low Feature Adoption',
    description: 'New feature launched 3 months ago has only 5% adoption rate',
    difficulty: 'beginner',
    estimatedTime: '15 mins',
    category: 'adoption',
    initialScore: 0
  },
  {
    id: 'conversion-rate-decline',
    title: 'Conversion Rate Decline',
    description: 'Sign-up to paid conversion rate dropped from 12% to 8%',
    difficulty: 'advanced',
    estimatedTime: '30 mins',
    category: 'conversion',
    initialScore: 0
  }
];

// @route   GET /api/scenarios
// @desc    Get all available scenarios
// @access  Public
router.get('/', (req, res) => {
  try {
    res.json({
      message: 'Scenarios retrieved successfully',
      scenarios
    });
  } catch (error) {
    console.error('Get scenarios error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/scenarios/:id
// @desc    Get specific scenario
// @access  Public
router.get('/:id', (req, res) => {
  try {
    const scenario = scenarios.find(s => s.id === req.params.id);
    
    if (!scenario) {
      return res.status(404).json({ message: 'Scenario not found' });
    }

    res.json({
      message: 'Scenario retrieved successfully',
      scenario
    });
  } catch (error) {
    console.error('Get scenario error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/scenarios/:id/submit
// @desc    Submit scenario solution
// @access  Public
router.post('/:id/submit', (req, res) => {
  try {
    const { solution, steps, timeSpent } = req.body;
    
    if (!solution || !steps) {
      return res.status(400).json({ message: 'Solution and steps are required' });
    }

    // Simple scoring logic - in production, this would be more sophisticated
    let score = 0;
    
    // Score based on number of steps (basic validation)
    if (steps.length >= 5) score += 30;
    if (steps.length >= 7) score += 20;
    
    // Score based on solution quality (keywords, length, etc.)
    const solutionLength = solution.length;
    if (solutionLength > 100) score += 20;
    if (solutionLength > 300) score += 30;
    
    // Bonus points for thoroughness
    if (solution.toLowerCase().includes('data') || solution.toLowerCase().includes('metric')) score += 10;
    if (solution.toLowerCase().includes('user') || solution.toLowerCase().includes('customer')) score += 10;
    
    // Cap at 100
    score = Math.min(score, 100);

    res.json({
      message: 'Scenario submitted successfully',
      score,
      feedback: score >= 70 ? 'Great job! You demonstrated good RCA skills.' : 'Good effort! Consider adding more detailed analysis.',
      passed: score >= 70
    });
  } catch (error) {
    console.error('Submit scenario error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 