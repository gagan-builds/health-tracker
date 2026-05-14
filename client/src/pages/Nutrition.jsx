import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Apple, Coffee, Utensils, Pizza, Plus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const Nutrition = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock Macro Data
  const macroData = [
    { name: 'Protein', value: 120, color: '#fc4c02' }, // Primary Orange
    { name: 'Carbs', value: 250, color: '#3b82f6' },   // Blue
    { name: 'Fats', value: 65, color: '#10b981' },     // Emerald
  ];

  // Mock Meals
  const [meals, setMeals] = useState([
    { id: 1, type: 'Breakfast', name: 'Oatmeal & Protein Shake', calories: 450, icon: Coffee },
    { id: 2, type: 'Lunch', name: 'Grilled Chicken Salad', calories: 600, icon: Utensils },
    { id: 3, type: 'Snack', name: 'Greek Yogurt', calories: 150, icon: Apple },
  ]);

  const handleAddMeal = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Meal logged successfully!');
      setIsSubmitting(false);
    }, 800);
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <motion.div 
      className="space-y-8 pb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nutrition Tracker</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Monitor your macros and daily intake.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Macro Breakdown Chart */}
        <div className="lg:col-span-1 card p-6 shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white self-start w-full mb-6">Macro Distribution</h2>
          <div className="w-full h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
                  formatter={(value) => [`${value}g`, 'Amount']}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-gray-900 dark:text-white">{totalCalories}</span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Kcal</span>
            </div>
          </div>
          
          <div className="w-full mt-6 space-y-3">
            {macroData.map(macro => (
              <div key={macro.name} className="flex justify-between items-center px-4 py-2 bg-gray-50 dark:bg-slate-900 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }}></div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{macro.name}</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">{macro.value}g</span>
              </div>
            ))}
          </div>
        </div>

        {/* Meal Log */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card p-6 shadow-xl border border-gray-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Today's Meals</h2>
            
            <div className="space-y-4 mb-6">
              {meals.map(meal => (
                <motion.div 
                  key={meal.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-transparent hover:border-gray-200 dark:hover:border-slate-700 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm text-primary-500">
                      <meal.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{meal.type}</p>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{meal.name}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-gray-900 dark:text-white">{meal.calories}</span>
                    <span className="text-xs text-gray-500 ml-1">kcal</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Quick Log Form */}
            <div className="border-t border-gray-100 dark:border-slate-800 pt-6">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                <Plus className="w-4 h-4 mr-1 text-primary-500" /> Log a Meal
              </h3>
              <form onSubmit={handleAddMeal} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Meal Name</label>
                  <input type="text" placeholder="e.g. Avocado Toast" className="input bg-gray-50 dark:bg-slate-900" required />
                </div>
                <div className="w-32">
                  <label className="block text-xs font-medium text-gray-500 mb-1">Calories</label>
                  <input type="number" placeholder="400" className="input bg-gray-50 dark:bg-slate-900" required />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary flex items-center justify-center h-[42px] px-6">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Add'}
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Nutrition;
