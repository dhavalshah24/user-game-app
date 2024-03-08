const express = require('express');
const router = express.Router();
const dashboardService = require('../../../services/v1/dashboard/dashboardService');

router.post('/overall', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send({ success: false, message: 'All required fields must be provided' });
  }

  try {
    const overallScores = await dashboardService.getOverallScores(userId);
    return res.status(200).send({ success: true, message: 'Overall scores fetched successfully', data: overallScores });
  } catch (error) {
    return res.status(400).send({ success: false, message: 'Internal server error' });
  }
});

router.post('/weekly', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).send({ success: false, message: 'All required fields must be provided' });
  }

  try {
    const weeklyScores = await dashboardService.getWeeklyScores(userId);
    return res.status(200).send({ success: true, message: 'Weekly scores fetched successfully', data: weeklyScores });
  } catch (error) {
    return res.status(400).send({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
