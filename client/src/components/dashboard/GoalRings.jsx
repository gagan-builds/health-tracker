import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { motion } from 'framer-motion';

const GoalRing = ({ title, current, target, color, delay }) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100) || 0;

  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-slate-700/30 rounded-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="w-20 h-20 mb-3">
        <CircularProgressbar 
          value={percentage} 
          text={`${percentage}%`} 
          strokeWidth={10}
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            trailColor: 'rgba(156, 163, 175, 0.2)',
            strokeLinecap: 'round',
            textSize: '22px',
          })}
        />
      </div>
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-gray-200 mt-1">{current} / {target}</span>
    </motion.div>
  );
};

const GoalRings = ({ latestLog }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Daily Goals</h2>
      <div className="grid grid-cols-2 gap-4">
        <GoalRing 
          title="Water" 
          current={latestLog?.waterIntake || 0} 
          target={8} 
          color="#3b82f6" 
          delay={0.1} 
        />
        <GoalRing 
          title="Sleep" 
          current={latestLog?.sleepHours || 0} 
          target={8} 
          color="#6366f1" 
          delay={0.2} 
        />
        <GoalRing 
          title="Exercise" 
          current={latestLog?.exerciseMinutes || 0} 
          target={30} 
          color="#10b981" 
          delay={0.3} 
        />
        <GoalRing 
          title="Calories" 
          current={latestLog?.calories || 0} 
          target={2000} 
          color="#f97316" 
          delay={0.4} 
        />
      </div>
    </motion.div>
  );
};

export default GoalRings;
