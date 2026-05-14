const express = require('express');
const auth = require('../middleware/auth');
const HealthLog = require('../models/HealthLog');

const router = express.Router();

// @route   GET /api/health
// @desc    Get all health logs for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const logs = await HealthLog.find({ user: req.user.id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/health
// @desc    Add or update today's health log
// @access  Private
router.post('/', auth, async (req, res) => {
  const { calories, waterIntake, sleepHours, exerciseMinutes, date, activityType, activityTitle } = req.body;

  try {
    let logDate = date ? new Date(date) : new Date();
    logDate.setHours(0, 0, 0, 0);

    let nextDate = new Date(logDate);
    nextDate.setDate(logDate.getDate() + 1);

    let log = await HealthLog.findOne({
      user: req.user.id,
      date: { $gte: logDate, $lt: nextDate }
    });

    if (log) {
      log.calories = calories !== undefined ? calories : log.calories;
      log.waterIntake = waterIntake !== undefined ? waterIntake : log.waterIntake;
      log.sleepHours = sleepHours !== undefined ? sleepHours : log.sleepHours;
      log.exerciseMinutes = exerciseMinutes !== undefined ? exerciseMinutes : log.exerciseMinutes;
      log.activityType = activityType !== undefined ? activityType : log.activityType;
      log.activityTitle = activityTitle !== undefined ? activityTitle : log.activityTitle;
      await log.save();
      return res.json(log);
    }

    log = new HealthLog({
      user: req.user.id,
      date: logDate,
      calories,
      waterIntake,
      sleepHours,
      exerciseMinutes,
      activityType: activityType || 'Run',
      activityTitle: activityTitle || ''
    });

    await log.save();
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
