const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const scoreRoutes = require('./score');
const dashboardRoutes = require('./dashboard');

router.use('/user', userRoutes);
router.use('/score', scoreRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;