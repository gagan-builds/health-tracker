import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Plus, CheckCircle2, Circle, Trophy, Calendar, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Goals = () => {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Lose 5kg', targetDate: '2026-08-01', progress: 60, category: 'Weight Loss' },
    { id: 2, title: 'Drink 3L Water Daily', targetDate: '2026-06-01', progress: 85, category: 'Habit' },
    { id: 3, title: 'Run a 10K', targetDate: '2026-09-15', progress: 30, category: 'Fitness' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', targetDate: '', category: 'Fitness' });

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.targetDate) return;
    
    const goal = {
      id: Date.now(),
      title: newGoal.title,
      targetDate: newGoal.targetDate,
      category: newGoal.category,
      progress: 0
    };
    
    setGoals([goal, ...goals]);
    setNewGoal({ title: '', targetDate: '', category: 'Fitness' });
    setIsModalOpen(false);
    toast.success('Goal created successfully!');
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Goals</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Set, track, and crush your targets.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-xl shadow-primary-500/30 border-none p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl">Active Goals</h3>
            <Target className="w-6 h-6 opacity-80" />
          </div>
          <p className="text-4xl font-black">{goals.length}</p>
        </div>
        <div className="card bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-xl shadow-emerald-500/30 border-none p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl">Completed</h3>
            <Trophy className="w-6 h-6 opacity-80" />
          </div>
          <p className="text-4xl font-black">12</p>
        </div>
        <div className="card bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-xl shadow-indigo-500/30 border-none p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl">Avg. Completion</h3>
            <CheckCircle2 className="w-6 h-6 opacity-80" />
          </div>
          <p className="text-4xl font-black">78%</p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Target className="w-5 h-5 mr-2 text-primary-500" />
          Current Focus
        </h2>
        
        {goals.map((goal, index) => (
          <motion.div 
            key={goal.id}
            className="card p-6 shadow-md border border-gray-100 dark:border-slate-800 hover:shadow-lg transition-all"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{goal.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300">
                    {goal.category}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  Target Date: {goal.targetDate}
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-primary-500">{goal.progress}%</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 mb-1 overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-primary-400 to-primary-600 h-3 rounded-full" 
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            <div className="flex justify-between text-xs font-medium text-gray-400">
              <span>0%</span>
              <span>100%</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Goal Modal */}
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
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Goal</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddGoal} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Goal Title</label>
                  <input 
                    type="text" 
                    required 
                    className="input bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700" 
                    placeholder="e.g. Run a Marathon" 
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select 
                      className="input bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700"
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                    >
                      <option value="Fitness">Fitness</option>
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Habit">Habit</option>
                      <option value="Nutrition">Nutrition</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Target Date</label>
                    <input 
                      type="date" 
                      required 
                      className="input bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700" 
                      value={newGoal.targetDate}
                      onChange={(e) => setNewGoal({...newGoal, targetDate: e.target.value})}
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
                    className="btn-primary px-8"
                  >
                    Create
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Goals;
