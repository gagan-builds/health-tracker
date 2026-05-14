import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User as UserIcon, Download, Award, CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import toast from 'react-hot-toast';
import HealthScore from '../components/dashboard/HealthScore';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null);

  const calculateBMI = () => {
    if (!user || !user.height || !user.weight) return null;
    const heightInMeters = user.height / 100;
    return (user.weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const bmi = calculateBMI();
  let bmiCategory = '';
  let bmiColor = '';
  if (bmi) {
    if (bmi < 18.5) { bmiCategory = 'Underweight'; bmiColor = 'text-blue-500'; }
    else if (bmi < 24.9) { bmiCategory = 'Normal Weight'; bmiColor = 'text-green-500'; }
    else if (bmi < 29.9) { bmiCategory = 'Overweight'; bmiColor = 'text-orange-500'; }
    else { bmiCategory = 'Obese'; bmiColor = 'text-red-500'; }
  }

  // Mock data for Heatmap
  const today = new Date();
  const getHeatmapData = () => {
    const data = [];
    let date = new Date();
    date.setMonth(date.getMonth() - 6);
    for (let i = 0; i < 180; i++) {
      data.push({
        date: new Date(date).toISOString().split('T')[0],
        count: Math.random() > 0.4 ? Math.floor(Math.random() * 4) + 1 : 0
      });
      date.setDate(date.getDate() + 1);
    }
    return data;
  };
  const heatmapData = getHeatmapData();

  // Mock latest log for Health Score
  const mockLatestLog = { sleepHours: 7.5, waterIntake: 8, exerciseMinutes: 45 };

  // Mock Achievements
  const achievements = [
    { title: "7 Day Streak", icon: "🔥", color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30", earned: true },
    { title: "Hydration Master", icon: "💧", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", earned: true },
    { title: "Sleep Champion", icon: "🌙", color: "text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-900/30", earned: false },
    { title: "Fitness Beast", icon: "🦍", color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30", earned: false },
  ];

  const handleExportPDF = async () => {
    setIsExporting(true);
    const toastId = toast.loading('Generating PDF Report...');
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('FitLife-Health-Report.pdf');
      toast.success('PDF Exported Successfully!', { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate PDF', { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center py-8 space-y-8 pb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Actions */}
      <div className="w-full max-w-5xl flex justify-end px-4">
        <button 
          onClick={handleExportPDF}
          disabled={isExporting}
          className="flex items-center space-x-2 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span className="font-medium text-sm">Export Report</span>
        </button>
      </div>

      <div ref={reportRef} className="w-full max-w-5xl space-y-8 bg-gray-50 dark:bg-slate-900 p-2 sm:p-4 rounded-3xl">
        
        {/* Top Row: Profile Card & Health Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card shadow-xl border-none bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-800/50">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <motion.div 
                className="bg-gradient-to-br from-primary-400 to-primary-600 p-6 rounded-3xl text-white shadow-2xl relative overflow-hidden"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
                <UserIcon className="w-16 h-16 relative z-10" />
              </motion.div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{user?.name}</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium">{user?.email}</p>
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Height</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{user?.height ? `${user.height} cm` : '--'}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Weight</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{user?.weight ? `${user.weight} kg` : '--'}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Age</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{user?.age || '--'}</p>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-xl border border-primary-100 dark:border-primary-900/50">
                    <p className="text-xs text-primary-600 dark:text-primary-400 uppercase font-bold tracking-wider">BMI</p>
                    <div className="flex items-baseline space-x-1">
                      <p className={`text-lg font-bold ${bmiColor}`}>{bmi || '--'}</p>
                      {bmi && <span className="text-xs font-medium text-gray-500 dark:text-gray-400">({bmiCategory})</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 h-full">
            <HealthScore latestLog={mockLatestLog} />
          </div>
        </div>

        {/* Heatmap & Achievements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calendar Heatmap */}
          <div className="lg:col-span-2 card shadow-lg border border-gray-100 dark:border-slate-700">
            <div className="flex items-center space-x-2 mb-6">
              <CalendarDays className="w-5 h-5 text-primary-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Activity Consistency</h2>
            </div>
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[600px]">
                <CalendarHeatmap
                  startDate={new Date(new Date().setMonth(new Date().getMonth() - 6))}
                  endDate={today}
                  values={heatmapData}
                  classForValue={(value) => {
                    if (!value || value.count === 0) {
                      return 'fill-gray-100 dark:fill-slate-800';
                    }
                    if (value.count === 1) return 'fill-primary-200';
                    if (value.count === 2) return 'fill-primary-400';
                    if (value.count === 3) return 'fill-primary-600';
                    return 'fill-primary-800';
                  }}
                  showWeekdayLabels={true}
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">Data from the last 6 months</p>
          </div>

          {/* Achievements */}
          <div className="card shadow-lg border border-gray-100 dark:border-slate-700">
            <div className="flex items-center space-x-2 mb-6">
              <Award className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Badges</h2>
            </div>
            <div className="space-y-4">
              {achievements.map((ach, i) => (
                <div key={i} className={`flex items-center space-x-4 p-3 rounded-2xl border ${ach.earned ? 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 shadow-sm' : 'bg-gray-50 dark:bg-slate-800/50 border-transparent opacity-50 grayscale'}`}>
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-2xl ${ach.bg}`}>
                    {ach.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${ach.earned ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{ach.title}</h3>
                    <p className="text-xs text-gray-400">{ach.earned ? 'Unlocked' : 'Locked'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
