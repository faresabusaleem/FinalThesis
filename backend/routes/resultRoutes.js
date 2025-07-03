import express from 'express';
import TestResult from '../models/TestResult.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/results - Save a result (protected)
router.post('/', protect, async (req, res) => {
  const { testName, score } = req.body;

  try {
    const result = new TestResult({
      user: req.user._id,
      testName,
      score,
    });

    const saved = await result.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save result', error });
  }
});

// GET /api/results/user - All scores for logged-in user
router.get('/user', protect, async (req, res) => {
  try {
    const results = await TestResult.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user results', error });
  }
});

// GET /api/results/user/highest - Highest score per test for user
router.get('/user/highest', protect, async (req, res) => {
  try {
    const results = await TestResult.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: "$testName",
          highestScore: { $max: "$score" }
        }
      }
    ]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching highest scores', error });
  }
});

// GET /api/results/leaderboards - Top 10 results for all test types
router.get('/leaderboards', async (req, res) => {
  try {
    const testNames = [
      'visual-memory',
      'number-memory',
      'chimp-test',
      'reaction-time',
      'sequence-memory'
    ];

    const leaderboards = {};

    for (const name of testNames) {
      const topScores = await TestResult.find({ testName: name })
        .populate('user', 'username')
        .sort({ score: -1 })
        .limit(10);

      leaderboards[name] = topScores;
    }

    res.json(leaderboards);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load leaderboards', error: err.message });
  }
});

// ✅ SAFER: GET /api/results/test/:testName
router.get('/test/:testName', async (req, res) => {
  try {
    const results = await TestResult.find({ testName: req.params.testName })
      .populate('user', 'username')
      .sort({ score: -1 })
      .limit(10);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching results', error });
  }
});

export default router;
