import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, TrendingDown, Clock, Zap, CalendarDays } from 'lucide-react';

const Analytics = () => {
  // Mock Data
  const weeklyData = [
    { day: 'Mon', activeMins: 45, target: 30 },
    { day: 'Tue', activeMins: 30, target: 30 },
    { day: 'Wed', activeMins: 60, target: 30 },
    { day: 'Thu', activeMins: 20, target: 30 },
    { day: 'Fri', activeMins: 45, target: 30 },
    { day: 'Sat', activeMins: 90, target: 30 },
    { day: 'Sun', activeMins: 0, target: 30 },
  ];

  const weightTrend = [
    { date: '1st', weight: 80.5 },
    { date: '5th', weight: 80.2 },
    { date: '10th', weight: 79.8 },
    { date: '15th', weight: 79.5 },
    { date: '20th', weight: 79.0 },
    { date: '25th', weight: 78.8 },
    { date: '30th', weight: 78.5 },
  ];

  const keyMetrics = [
    { label: 'Total Active Time', value: '4h 50m', trend: '+15%', trendUp: true, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Avg Calories/Day', value: '2,450', trend: '-2%', trendUp: false, icon: Zap, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    { label: 'Longest Streak', value: '14 Days', trend: '+2', trendUp: true, icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-3 rounded-xl shadow-xl border-none">
          <p className="font-bold mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="space-y-8 pb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Deep dive into your performance data.</p>
        </div>
        <div className="bg-gray-200/50 dark:bg-slate-800 p-1 rounded-xl shadow-inner flex">
          <button className="px-4 py-1.5 rounded-lg font-semibold text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm">Weekly</button>
          <button className="px-4 py-1.5 rounded-lg font-semibold text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Monthly</button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {keyMetrics.map((metric, index) => (
          <div key={index} className="card p-6 shadow-xl border border-gray-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">{metric.label}</p>
              <div className="flex items-end space-x-3">
                <h3 className="text-3xl font-black text-gray-900 dark:text-white">{metric.value}</h3>
                <span className={`flex items-center text-sm font-bold pb-1 ${metric.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
                  {metric.trendUp ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {metric.trend}
                </span>
              </div>
            </div>
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${metric.bg} ${metric.color}`}>
              <metric.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Weekly Active Minutes Chart */}
        <div className="card p-6 shadow-xl border border-gray-100 dark:border-slate-800">
          <div className="flex items-center space-x-2 mb-6">
            <CalendarDays className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Active Minutes</h2>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.2)" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(156, 163, 175, 0.1)' }} />
                <Bar dataKey="activeMins" name="Active (mins)" fill="url(#primaryGradientBar)" radius={[6, 6, 6, 6]} barSize={30} />
                <Line type="monotone" dataKey="target" name="Target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} isAnimationActive={false} />
                <defs>
                  <linearGradient id="primaryGradientBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary-color, #fc4c02)" stopOpacity={1}/>
                    <stop offset="100%" stopColor="var(--primary-color, #fc4c02)" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weight Trend Line Chart */}
        <div className="card p-6 shadow-xl border border-gray-100 dark:border-slate-800">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingDown className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Weight Trend</h2>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(156, 163, 175, 0.2)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="weight" 
                  name="Weight (kg)"
                  stroke="#3b82f6" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#blueGradient)" 
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
                />
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Analytics;
