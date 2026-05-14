import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { Dumbbell, MapPin, Heart, MessageCircle, Share2, Award } from 'lucide-react';

const MockMapPath = ({ type }) => {
  if (type === 'Ride') {
    return (
      <svg viewBox="0 0 400 200" className="w-full h-40 object-cover opacity-80" preserveAspectRatio="none">
        <path d="M50,150 Q100,50 150,100 T250,50 T350,150" fill="none" stroke="#fc4c02" strokeWidth="4" />
        <circle cx="50" cy="150" r="6" fill="#10b981" />
        <circle cx="350" cy="150" r="6" fill="#3b82f6" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 400 200" className="w-full h-40 object-cover opacity-80" preserveAspectRatio="none">
      <path d="M50,100 Q150,180 200,100 T350,80" fill="none" stroke="#fc4c02" strokeWidth="4" />
      <circle cx="50" cy="100" r="6" fill="#10b981" />
      <circle cx="350" cy="80" r="6" fill="#3b82f6" />
    </svg>
  );
};

const ActivityCard = ({ log, index }) => {
  // Infer activity type based on some logic or default
  const activityType = log.activityType || (log.exerciseMinutes > 45 ? 'Ride' : 'Run');
  const title = log.activityTitle || `Morning ${activityType}`;
  
  const isOutdoor = ['Run', 'Ride', 'Swim'].includes(activityType);

  const metric1Label = isOutdoor ? 'Distance' : 'Calories';
  const metric1Value = isOutdoor 
    ? (log.distance || (activityType === 'Ride' ? (log.exerciseMinutes * 0.4).toFixed(1) : (log.exerciseMinutes * 0.15).toFixed(2)))
    : (log.calories || Math.floor(log.exerciseMinutes * 6.5));
  const metric1Unit = isOutdoor ? 'km' : 'kcal';

  const metric2Label = isOutdoor ? 'Pace' : 'Avg HR';
  const metric2Value = isOutdoor 
    ? (log.pace || (activityType === 'Ride' ? '24.5 km/h' : (activityType === 'Swim' ? '1:45 /100m' : '5:30 /km')))
    : (Math.floor(Math.random() * 30) + 110 + ' bpm');

  const elevation = Math.floor(Math.random() * 150) + 20;

  const getCategoryColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'run': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'ride':
      case 'cycling': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'swim': return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400';
      case 'yoga': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'weight training':
      case 'strength': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300';
    }
  };

  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 overflow-hidden mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 flex-shrink-0 flex items-center justify-center font-bold text-gray-500">
            Me
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">You</h3>
            <p className="text-xs text-gray-500">{format(parseISO(log.date), 'MMMM d, yyyy')}</p>
          </div>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${getCategoryColor(activityType)}`}>
          {activityType}
        </span>
      </div>

      {/* Activity Details */}
      <div className="px-4 pb-3">
        <div className="flex items-center space-x-2 mb-2">
          {activityType === 'Yoga' ? <Heart className="w-4 h-4 text-purple-500" /> : <Dumbbell className="w-4 h-4 text-gray-500" />}
          <h4 className="font-bold text-xl text-gray-900 dark:text-white">{title}</h4>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="border-l-2 border-primary-500 pl-2">
            <p className="text-xs text-gray-500">{metric1Label}</p>
            <p className="text-lg font-light text-gray-900 dark:text-white">{metric1Value} <span className="text-sm">{metric1Unit}</span></p>
          </div>
          <div className="border-l-2 border-gray-200 dark:border-slate-700 pl-2">
            <p className="text-xs text-gray-500">{metric2Label}</p>
            <p className="text-lg font-light text-gray-900 dark:text-white">{metric2Value}</p>
          </div>
          <div className="border-l-2 border-gray-200 dark:border-slate-700 pl-2">
            <p className="text-xs text-gray-500">Time</p>
            <p className="text-lg font-light text-gray-900 dark:text-white">{log.exerciseMinutes} <span className="text-sm">m</span></p>
          </div>
        </div>
      </div>

      {/* Visuals */}
      <div className="w-full h-40 bg-gray-50 dark:bg-slate-900/50 relative overflow-hidden flex items-center justify-center border-t border-gray-100 dark:border-slate-800">
        {isOutdoor ? (
          <>
            <MockMapPath type={activityType} />
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-md px-2 py-1 flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-white" />
              <span className="text-xs text-white font-medium">{elevation}m Elev</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-gray-400 dark:text-slate-600">
            {activityType === 'Yoga' ? <Heart className="w-12 h-12 mb-2" /> : <Dumbbell className="w-12 h-12 mb-2" />}
            <span className="text-sm font-medium tracking-wide">INDOOR WORKOUT</span>
          </div>
        )}
      </div>

      {/* Social Actions */}
      <div className="p-4 flex items-center space-x-6 border-t border-gray-100 dark:border-slate-700">
        <button className="flex items-center space-x-1.5 text-gray-500 hover:text-primary-500 transition-colors group">
          <Heart className="w-5 h-5 group-hover:fill-primary-500" />
          <span className="text-sm font-medium">Kudos</span>
        </button>
        <button className="flex items-center space-x-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Comment</span>
        </button>
        <button className="flex items-center space-x-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors ml-auto">
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

const ActivityFeed = ({ logs }) => {
  const [filter, setFilter] = useState('All');

  // Only show logs that have actual workouts
  const allWorkoutLogs = logs.filter(log => log.exerciseMinutes > 0).reverse();

  if (allWorkoutLogs.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 text-center border border-gray-100 dark:border-slate-700 shadow-sm">
        <Award className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Activities Yet</h3>
        <p className="text-gray-500 mt-1">Go for a run or ride to see your feed fill up!</p>
      </div>
    );
  }

  // Get unique activity types for the filter
  const activityTypes = ['All', ...new Set(allWorkoutLogs.map(log => log.activityType || (log.exerciseMinutes > 45 ? 'Ride' : 'Run')))];

  const filteredLogs = filter === 'All' 
    ? allWorkoutLogs 
    : allWorkoutLogs.filter(log => (log.activityType || (log.exerciseMinutes > 45 ? 'Ride' : 'Run')) === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-0">Your Activity Feed</h2>
        <div className="flex space-x-2 overflow-x-auto pb-2 sm:pb-0" style={{ scrollbarWidth: 'none' }}>
          {activityTypes.map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                filter === type 
                  ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20' 
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      
      <AnimatePresence mode="popLayout">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log, i) => (
            <motion.div
              key={log._id || `${log.date}-${i}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <ActivityCard log={log} index={i} />
            </motion.div>
          ))
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center p-8 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-gray-200 dark:border-slate-700"
          >
            <p className="text-gray-500">No {filter} activities found.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActivityFeed;
