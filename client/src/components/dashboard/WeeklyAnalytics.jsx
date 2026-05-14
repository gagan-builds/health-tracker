import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const WeeklyAnalytics = ({ chartData }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-slate-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Weekly Trends</h2>
      
      <div className="h-72 w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExercise" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.2)" />
              <XAxis dataKey="date" tick={{fontSize: 12, fill: '#6b7280'}} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{fontSize: 12, fill: '#6b7280'}} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{fontSize: 12, fill: '#6b7280'}} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} 
                cursor={{stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2}}
              />
              <Area yAxisId="left" type="monotone" dataKey="calories" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorCalories)" name="Calories" />
              <Area yAxisId="right" type="monotone" dataKey="exerciseMinutes" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorExercise)" name="Exercise (m)" />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col h-full items-center justify-center text-gray-400">
            <p>No analytics data available yet.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WeeklyAnalytics;
