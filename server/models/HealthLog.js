const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true, default: Date.now },
  calories: { type: Number, default: 0 },
  waterIntake: { type: Number, default: 0 }, // in glasses or ml
  sleepHours: { type: Number, default: 0 },
  exerciseMinutes: { type: Number, default: 0 },
  activityType: { type: String, default: 'Run' },
  activityTitle: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('HealthLog', healthLogSchema);
