import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Droplets, Moon, Flame, Dumbbell, AlertTriangle, CheckCircle2, ChevronRight, MessageSquare, TrendingUp, TrendingDown } from 'lucide-react';

const SmartInsights = ({ logs }) => {
  const insights = useMemo(() => {
    if (!logs || logs.length === 0) {
      return [{
        type: 'general',
        category: 'System Initialization',
        priority: 'Tip',
        text: "Initiate daily metric logging to unlock personalized, data-driven health analytics and physiological insights.",
        icon: Sparkles,
        color: "text-primary-500",
        bg: "bg-primary-500/10",
        badgeColor: "bg-primary-500/20 text-primary-400 border border-primary-500/30"
      }];
    }

    const latestLog = logs[logs.length - 1];
    const previousLog = logs.length > 1 ? logs[logs.length - 2] : null;

    const { waterIntake = 0, sleepHours = 0, calories = 0, exerciseMinutes = 0 } = latestLog;
    let suggestions = [];

    // Water Insights
    if (waterIntake < 8) {
      suggestions.push({
        type: 'water',
        category: 'Hydration Deficit',
        priority: 'Action Required',
        text: `Current intake (${waterIntake} glasses) is below optimal baseline. Increase hydration by ${8 - waterIntake} glasses to support muscle recovery and metabolic function.`,
        icon: Droplets,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        badgeColor: "bg-red-500/20 text-red-400 border border-red-500/30"
      });
    } else {
      let text = "Optimal hydration achieved. Maintaining this baseline supports joint lubrication and cardiovascular health.";
      if (previousLog && waterIntake > previousLog.waterIntake) {
        text = `Hydration trend positive (+${waterIntake - previousLog.waterIntake} glasses vs yesterday). Excellent adherence to intake goals.`;
      }
      suggestions.push({
        type: 'water',
        category: 'Hydration Optimal',
        priority: 'On Track',
        text,
        icon: CheckCircle2,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        badgeColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      });
    }

    // Sleep Insights
    if (sleepHours < 7) {
      suggestions.push({
        type: 'sleep',
        category: 'Sleep Deficit',
        priority: 'High Priority',
        text: `Suboptimal sleep duration (${sleepHours}h). Prioritize 7-9 hours to maximize CNS recovery and hormonal balance. Consider a 30-min earlier wind-down protocol.`,
        icon: Moon,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        badgeColor: "bg-amber-500/20 text-amber-400 border border-amber-500/30"
      });
    } else if (previousLog && sleepHours > previousLog.sleepHours) {
      suggestions.push({
        type: 'sleep',
        category: 'Recovery Trend',
        priority: 'Trending Up',
        text: `Recovery delta positive (+${sleepHours - previousLog.sleepHours}h vs yesterday). Enhanced sleep duration significantly improves muscle synthesis.`,
        icon: TrendingUp,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        badgeColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      });
    }

    // Fitness Insights
    if (exerciseMinutes < 30) {
      suggestions.push({
        type: 'fitness',
        category: 'Activity Low',
        priority: 'Tip',
        text: `Daily activity volume (${exerciseMinutes} mins) is below the recommended 30-min threshold. Consider incorporating a brief LISS session to boost cardiovascular health.`,
        icon: Dumbbell,
        color: "text-primary-400",
        bg: "bg-primary-500/10",
        badgeColor: "bg-primary-500/20 text-primary-400 border border-primary-500/30"
      });
    } else if (exerciseMinutes >= 60) {
      suggestions.push({
        type: 'fitness',
        category: 'High Volume',
        priority: 'Optimal',
        text: `High activity volume detected (>60 mins). Ensure adequate caloric intake and prioritize post-workout active recovery protocols.`,
        icon: Flame,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        badgeColor: "bg-orange-500/20 text-orange-400 border border-orange-500/30"
      });
    }

    // Calories Insights
    if (calories > 0 && calories < 1200) {
      suggestions.push({
        type: 'calories',
        category: 'Caloric Deficit',
        priority: 'Warning',
        text: `Severe caloric deficit detected (${calories} kcal). Prolonged low intake may compromise metabolic rate and muscle retention. Adjust macronutrients accordingly.`,
        icon: AlertTriangle,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        badgeColor: "bg-orange-500/20 text-orange-400 border border-orange-500/30"
      });
    } else if (previousLog && calories < previousLog.calories && previousLog.calories > 2500) {
      suggestions.push({
        type: 'calories',
        category: 'Nutrition Adjustment',
        priority: 'Trending Down',
        text: `Caloric intake normalized compared to yesterday's surplus. Maintaining this balance supports sustainable body composition goals.`,
        icon: TrendingDown,
        color: "text-green-400",
        bg: "bg-green-500/10",
        badgeColor: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
      });
    }

    // Streak logic (If logged multiple days)
    if (logs.length >= 3) {
      const isStreak = logs.slice(-3).every(log => log.exerciseMinutes >= 30);
      if (isStreak && !suggestions.find(s => s.type === 'streak')) {
        suggestions.unshift({
          type: 'streak',
          category: 'Consistency Milestone',
          priority: 'Achievement',
          text: `Exceptional adherence: 3+ consecutive days meeting activity thresholds. Sustained consistency is the primary driver of physiological adaptation.`,
          icon: Sparkles,
          color: "text-purple-400",
          bg: "bg-purple-500/10",
          badgeColor: "bg-purple-500/20 text-purple-400 border border-purple-500/30"
        });
      }
    }

    // Limit to top 4 insights
    return suggestions.slice(0, 4);
  }, [logs]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div className="col-span-1 md:col-span-2 relative rounded-[2.5rem] bg-slate-900 overflow-hidden shadow-2xl shadow-indigo-500/10 border border-white/10 p-1">
      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-indigo-500/20 blur-[120px] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-[50%] -right-[10%] w-[70%] h-[150%] bg-purple-500/20 blur-[120px] rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 bg-slate-900/40 backdrop-blur-2xl rounded-[2.25rem] p-8 h-full border border-white/5">

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-indigo-500 rounded-full blur-md opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">AI Coach Insights</h2>
              <p className="text-slate-400 text-sm font-medium">Real-time analysis of your health data</p>
            </div>
          </div>

          <button className="hidden md:flex items-center space-x-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/10 px-4 py-2 rounded-xl border border-indigo-500/20 hover:bg-indigo-500/20">
            <MessageSquare className="w-4 h-4" />
            <span>Chat with AI</span>
          </button>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {insights.map((insight, idx) => (
            <motion.div
              key={idx}
              className="relative group h-full"
              variants={itemVariants}
            >
              {/* Glowing Border Hover Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-white/20 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="bg-slate-800/50 hover:bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 h-full flex flex-col transition-all duration-300 relative z-10 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-black/50">

                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${insight.bg} shadow-inner`}>
                    <insight.icon className={`w-6 h-6 ${insight.color} drop-shadow-md`} />
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${insight.badgeColor}`}>
                    {insight.priority}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{insight.category}</h3>
                <p className="text-sm text-slate-300 leading-relaxed flex-grow">
                  {insight.text}
                </p>

                <div className="mt-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button className={`text-xs font-bold uppercase tracking-wider flex items-center ${insight.color} hover:text-white transition-colors`}>
                    Take Action <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default SmartInsights;
