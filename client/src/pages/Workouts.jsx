import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Play, Timer, Flame, CheckCircle, X, Pause, Square } from 'lucide-react';
import toast from 'react-hot-toast';

const Workouts = () => {
  const library = [
    { id: 1, title: 'HIIT Cardio', duration: 25, calories: 350, level: 'Advanced', color: 'from-orange-400 to-orange-600' },
    { id: 2, title: 'Upper Body Strength', duration: 45, calories: 200, level: 'Intermediate', color: 'from-blue-400 to-blue-600' },
    { id: 3, title: 'Core Crusher', duration: 15, calories: 120, level: 'Beginner', color: 'from-emerald-400 to-emerald-600' },
    { id: 4, title: 'Yoga Flow', duration: 30, calories: 150, level: 'All Levels', color: 'from-purple-400 to-purple-600' }
  ];

  const [recentSessions, setRecentSessions] = useState([
    { id: 1, name: 'Morning Run', date: 'Today, 7:00 AM', duration: '30 min', calories: 400, icon: Flame },
    { id: 2, name: 'HIIT Cardio', date: 'Yesterday, 6:30 PM', duration: '25 min', calories: 350, icon: Dumbbell },
    { id: 3, name: 'Yoga Flow', date: 'Mon, 8:00 AM', duration: '30 min', calories: 150, icon: Timer },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({ name: '', duration: '', calories: '' });

  // Timer State
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  useEffect(() => {
    let interval = null;
    if (activeWorkout && !isTimerPaused) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    } else if (!activeWorkout) {
      setTimerSeconds(0);
    }
    return () => clearInterval(interval);
  }, [activeWorkout, isTimerPaused]);

  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartLibraryWorkout = (workout) => {
    setActiveWorkout(workout);
    setTimerSeconds(0);
    setIsTimerPaused(false);
  };

  const handleFinishTimerWorkout = () => {
    const session = {
      id: Date.now(),
      name: activeWorkout.title,
      date: 'Just Now',
      duration: `${Math.max(1, Math.floor(timerSeconds / 60))} min`,
      calories: activeWorkout.calories,
      icon: Dumbbell
    };
    
    setRecentSessions([session, ...recentSessions]);
    setActiveWorkout(null);
    toast.success('Workout completed and saved!');
  };

  const handleStartWorkout = (e) => {
    e.preventDefault();
    if (!newWorkout.name || !newWorkout.duration) return;
    
    const session = {
      id: Date.now(),
      name: newWorkout.name,
      date: 'Just Now',
      duration: `${newWorkout.duration} min`,
      calories: newWorkout.calories || 0,
      icon: Dumbbell
    };
    
    setRecentSessions([session, ...recentSessions]);
    setNewWorkout({ name: '', duration: '', calories: '' });
    setIsModalOpen(false);
    toast.success('Workout logged successfully!');
  };

  return (
    <motion.div 
      className="space-y-8 pb-12 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Workouts</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Explore routines and track your progress.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
          type="button"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Start Empty Workout</span>
        </button>
      </div>

      {/* Workout Library Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Workout Library</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {library.map((workout) => (
            <motion.div 
              key={workout.id}
              onClick={() => handleStartLibraryWorkout(workout)}
              className={`rounded-3xl p-6 text-white shadow-lg bg-gradient-to-br ${workout.color} relative overflow-hidden group cursor-pointer`}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-colors"></div>
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-1">{workout.title}</h3>
                <span className="inline-block px-2 py-1 bg-white/20 rounded-lg text-xs font-semibold mb-6 backdrop-blur-sm">
                  {workout.level}
                </span>
                
                <div className="flex items-center justify-between text-sm font-medium">
                  <div className="flex items-center space-x-1">
                    <Timer className="w-4 h-4" />
                    <span>{workout.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Flame className="w-4 h-4" />
                    <span>{workout.calories}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="card p-6 shadow-xl border border-gray-100 dark:border-slate-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-primary-500" />
          Recent Sessions
        </h2>
        <div className="space-y-4">
          {recentSessions.map(session => (
            <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm text-primary-500">
                  <session.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{session.name}</h3>
                  <p className="text-xs text-gray-500">{session.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <div className="flex items-center flex-col">
                  <span className="text-gray-400 text-xs uppercase">Time</span>
                  <span>{session.duration}</span>
                </div>
                <div className="flex items-center flex-col">
                  <span className="text-gray-400 text-xs uppercase">Cals</span>
                  <span className="text-primary-500">{session.calories}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start Empty Workout Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Log Custom Workout</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition-colors"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleStartWorkout} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Workout Name</label>
                  <input 
                    type="text" 
                    required 
                    className="input bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700" 
                    placeholder="e.g. Evening Walk" 
                    value={newWorkout.name}
                    onChange={(e) => setNewWorkout({...newWorkout, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Duration (mins)</label>
                    <input 
                      type="number" 
                      required 
                      min="1"
                      className="input bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700" 
                      placeholder="45"
                      value={newWorkout.duration}
                      onChange={(e) => setNewWorkout({...newWorkout, duration: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Calories Burned</label>
                    <input 
                      type="number" 
                      min="0"
                      className="input bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700" 
                      placeholder="Optional"
                      value={newWorkout.calories}
                      onChange={(e) => setNewWorkout({...newWorkout, calories: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end space-x-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="btn-primary px-8 flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Save Workout
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Timer Modal */}
      <AnimatePresence>
        {activeWorkout && (
          <motion.div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={`bg-gradient-to-br ${activeWorkout.color} rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden text-white relative`}
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <button 
                onClick={() => setActiveWorkout(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-12 flex flex-col items-center justify-center text-center relative z-10">
                <h2 className="text-3xl font-black mb-2">{activeWorkout.title}</h2>
                <p className="text-white/80 font-medium mb-12 flex items-center">
                  <Timer className="w-5 h-5 mr-2" />
                  Target: {activeWorkout.duration} min
                </p>

                {/* Animated Timer Circle */}
                <div className="relative w-64 h-64 flex items-center justify-center mb-12">
                  <motion.div 
                    className="absolute inset-0 rounded-full border-4 border-white/20"
                    animate={isTimerPaused ? {} : { rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute inset-4 rounded-full border-4 border-t-white border-transparent"
                    animate={isTimerPaused ? {} : { rotate: -360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Pulsing glow */}
                  {!isTimerPaused && (
                    <motion.div 
                      className="absolute inset-0 bg-white/20 rounded-full blur-2xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-6xl font-black tabular-nums tracking-tighter">
                      {formatTime(timerSeconds)}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-widest mt-2 text-white/80">Elapsed</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-6 w-full">
                  <button 
                    onClick={() => setIsTimerPaused(!isTimerPaused)}
                    className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all"
                  >
                    {isTimerPaused ? <Play className="w-8 h-8 fill-current ml-1" /> : <Pause className="w-8 h-8 fill-current" />}
                  </button>
                  
                  <button 
                    onClick={handleFinishTimerWorkout}
                    className="flex-1 max-w-[200px] h-16 rounded-full bg-white text-gray-900 font-bold text-lg hover:scale-105 transition-all flex items-center justify-center space-x-2 shadow-xl"
                  >
                    <Square className="w-5 h-5 fill-current text-red-500" />
                    <span>Finish Workout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Workouts;
