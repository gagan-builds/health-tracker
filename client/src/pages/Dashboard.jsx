import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://gagan-builds-health-tracker.onrender.com';
import { AuthContext } from '../context/AuthContext';
import { format, parseISO } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Flame, Droplets, Moon, Activity, Loader2 } from 'lucide-react';

import HeroStats from '../components/dashboard/HeroStats';
import HealthScore from '../components/dashboard/HealthScore';
import GoalRings from '../components/dashboard/GoalRings';
import WeeklyAnalytics from '../components/dashboard/WeeklyAnalytics';
import ActivityFeed from '../components/dashboard/ActivityFeed';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);
  const [formData, setFormData] = useState({
    calories: '', waterIntake: '', sleepHours: '', exerciseMinutes: '', activityType: 'Run', activityTitle: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/health`);
      const sortedLogs = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setLogs(sortedLogs);

      const today = new Date().toISOString().split('T')[0];
      const todayLog = sortedLogs.find(log => log.date.startsWith(today));
      if (todayLog) {
        setFormData({
          calories: todayLog.calories || '',
          waterIntake: todayLog.waterIntake || '',
          sleepHours: todayLog.sleepHours || '',
          exerciseMinutes: todayLog.exerciseMinutes || '',
          activityType: todayLog.activityType || 'Run',
          activityTitle: todayLog.activityTitle || ''
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${API_URL}/api/health`, {
        calories: Number(formData.calories) || 0,
        waterIntake: Number(formData.waterIntake) || 0,
        sleepHours: Number(formData.sleepHours) || 0,
        exerciseMinutes: Number(formData.exerciseMinutes) || 0,
        activityType: formData.activityType,
        activityTitle: formData.activityTitle || `Morning ${formData.activityType}`
      });
      fetchLogs();
      toast.success('Health log saved successfully!');

      // Smart Notifications / Goal Completions
      const water = Number(formData.waterIntake);
      const sleep = Number(formData.sleepHours);
      const exercise = Number(formData.exerciseMinutes);

      if (water >= 8) {
        setTimeout(() => toast.success('Water Goal Completed!', { icon: '💧' }), 800);
      } else if (water > 0 && water < 8) {
        setTimeout(() => toast('Keep drinking water to hit your goal!', { icon: '🚰' }), 800);
      }

      if (sleep >= 7) {
        setTimeout(() => toast.success('Sleep Target Achieved!', { icon: '🌙' }), 1600);
      }

      if (exercise >= 30) {
        setTimeout(() => toast.success('Daily Fitness Goal Crushed!', { icon: '🔥' }), 2400);
      }

    } catch (err) {
      console.error(err);
      toast.error('Failed to save log. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const chartData = logs.map(log => ({
    ...log,
    date: format(parseISO(log.date), 'MMM dd')
  })).slice(-7);

  const latestLog = logs.length > 0 ? logs[logs.length - 1] : null;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, {user?.name}. Here's your health overview.</p>
        </div>
      </div>

      {/* Hero Stats */}
      <HeroStats latestLog={latestLog} />

      {/* Main Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column (Wider) */}
        <div className="lg:col-span-2 space-y-8">
          <WeeklyAnalytics chartData={chartData} />

          {/* Quick Log Form */}
          <motion.div
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Log Today's Activity</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Flame className="w-4 h-4 mr-1 text-orange-500" /> Calories (kcal)
                  </label>
                  <input type="number" name="calories" className="input bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700" value={formData.calories} onChange={handleChange} />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Droplets className="w-4 h-4 mr-1 text-blue-500" /> Water (glasses)
                  </label>
                  <input type="number" name="waterIntake" className="input bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700" value={formData.waterIntake} onChange={handleChange} />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Moon className="w-4 h-4 mr-1 text-indigo-500" /> Sleep (hours)
                  </label>
                  <input type="number" name="sleepHours" className="input bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700" value={formData.sleepHours} onChange={handleChange} step="0.5" />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    <Activity className="w-4 h-4 mr-1 text-green-500" /> Exercise (mins)
                  </label>
                  <input type="number" name="exerciseMinutes" className="input bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700" value={formData.exerciseMinutes} onChange={handleChange} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Activity Type</label>
                  <select name="activityType" value={formData.activityType} onChange={handleChange} className="input bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700">
                    <option value="Run">Run</option>
                    <option value="Ride">Ride</option>
                    <option value="Swim">Swim</option>
                    <option value="Yoga">Yoga</option>
                    <option value="Weight Training">Weight Training</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Title (Optional)</label>
                  <input type="text" name="activityTitle" placeholder={`e.g. Lunch ${formData.activityType}`} className="input bg-gray-50 dark:bg-slate-900 border-gray-200 dark:border-slate-700" value={formData.activityTitle} onChange={handleChange} />
                </div>
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium py-3 px-4 rounded-xl shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center mt-6"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log Activity"}
              </motion.button>
            </form>
          </motion.div>

          {/* Strava Activity Feed */}
          <ActivityFeed logs={logs} />
        </div>

        {/* Right Column (Narrower Analytics Panel) */}
        <div className="space-y-8">
          <HealthScore latestLog={latestLog} />
          <GoalRings latestLog={latestLog} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
