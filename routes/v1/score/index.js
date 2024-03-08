const express = require('express');
const router = express.Router();
const scoreService = require('../../../services/v1/score/scoreService');

router.post('/save', async (req, res) => {
  const { userId, score } = req.body;

  if (!userId || !score) {
    return res.status(400).send({ success: false, message: 'All required fields must be provided' });
  }

  if (score < 50 || score > 500) {
    return res.status(400).send({ success: false, message: 'Score should be between 50 and 500' });
  }

  try {
    const scoreCountToday = await scoreService.getScoreCountToday(userId);
    if (scoreCountToday >= 3) {
      return res.status(400).send({ success: false, message: 'Score limit exceeded for today' });
    }

    await scoreService.saveScore(userId, score);
    return res.status(200).send({ success: true, message: 'Score saved successfully' });
  } catch (error) {
    return res.status(500).send({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
