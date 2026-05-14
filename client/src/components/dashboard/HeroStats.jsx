import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Droplets, Moon, Dumbbell } from 'lucide-react';

const StatCard = ({ title, value, unit, icon: Icon, color, bgClass, delay }) => (
  <motion.div 
    className={`relative overflow-hidden rounded-2xl p-6 ${bgClass} border border-white/20 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all group`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5, scale: 1.02 }}
  >
    {/* Glowing orb background effect */}
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 blur-xl ${color}`}></div>
    
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-3 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-md shadow-sm`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
    
    <div className="relative z-10">
      <h3 className="text-gray-600 dark:text-gray-300 font-medium text-sm mb-1">{title}</h3>
      <div className="flex items-baseline space-x-1">
        <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{value}</span>
        <span className="text-gray-500 dark:text-gray-400 font-semibold">{unit}</span>
      </div>
    </div>
  </motion.div>
);

const HeroStats = ({ latestLog }) => {
  const stats = [
    {
      title: 'Calories Burned',
      value: latestLog?.calories || 0,
      unit: 'kcal',
      icon: Flame,
      color: 'bg-orange-500 text-orange-500',
      bgClass: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-slate-800 dark:to-slate-800/80',
    },
    {
      title: 'Water Intake',
      value: latestLog?.waterIntake || 0,
      unit: 'glasses',
      icon: Droplets,
      color: 'bg-blue-500 text-blue-500',
      bgClass: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-800/80',
    },
    {
      title: 'Sleep Duration',
      value: latestLog?.sleepHours || 0,
      unit: 'hours',
      icon: Moon,
      color: 'bg-indigo-500 text-indigo-500',
      bgClass: 'bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-slate-800 dark:to-slate-800/80',
    },
    {
      title: 'Active Workout',
      value: latestLog?.exerciseMinutes || 0,
      unit: 'mins',
      icon: Dumbbell,
      color: 'bg-emerald-500 text-emerald-500',
      bgClass: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-slate-800 dark:to-slate-800/80',
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
      {stats.map((stat, i) => (
        <StatCard key={stat.title} {...stat} delay={i * 0.1} />
      ))}
    </div>
  );
};

export default HeroStats;
