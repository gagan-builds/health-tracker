import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';

const HealthScore = ({ latestLog }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Animate the score filling up
    let targetScore = 0;
    if (latestLog) {
      // Calculate a dummy health score based on metrics
      let sleepScore = Math.min((latestLog.sleepHours / 8) * 100, 100);
      let waterScore = Math.min((latestLog.waterIntake / 8) * 100, 100);
      let exerciseScore = Math.min((latestLog.exerciseMinutes / 30) * 100, 100);
      targetScore = Math.round((sleepScore + waterScore + exerciseScore) / 3);
    }
    
    // Smooth counter animation
    let current = 0;
    const interval = setInterval(() => {
      if (current >= targetScore) {
        clearInterval(interval);
      } else {
        current += 1;
        setScore(current);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [latestLog]);

  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-700 flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
      
      <div className="flex items-center space-x-2 w-full mb-6">
        <HeartPulse className="text-emerald-500 w-5 h-5" />
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Overall Health Score</h2>
      </div>

      <div className="w-40 h-40 relative">
        <CircularProgressbar 
          value={score} 
          text={`${score}`} 
          strokeWidth={8}
          styles={buildStyles({
            pathColor: `url(#healthGradient)`,
            textColor: 'transparent', // We'll render custom text
            trailColor: 'rgba(156, 163, 175, 0.2)',
            strokeLinecap: 'round',
          })}
        />
        <svg style={{ height: 0, width: 0 }}>
          <defs>
            <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">{score}</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">out of 100</span>
        </div>
      </div>
      
      <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6 max-w-xs">
        Based on your daily hydration, sleep, and fitness consistency.
      </p>
    </motion.div>
  );
};

export default HealthScore;
