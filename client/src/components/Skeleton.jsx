import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard = ({ className = "" }) => (
  <motion.div 
    className={`bg-gray-200 dark:bg-slate-800 rounded-2xl overflow-hidden relative ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div 
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent z-10"
      animate={{ translateX: ['100%', '-100%'] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
    />
  </motion.div>
);

export const SkeletonText = ({ className = "" }) => (
  <SkeletonCard className={`h-4 w-full ${className}`} />
);

export const SkeletonCircle = ({ className = "w-12 h-12" }) => (
  <SkeletonCard className={`rounded-full ${className}`} />
);

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <SkeletonText className="w-64 h-10" />
      </div>
      
      {/* Hero Stats Skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <SkeletonCard key={i} className="h-32" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SkeletonCard className="h-96" />
          <SkeletonCard className="h-80" />
        </div>
        <div className="space-y-8">
          <SkeletonCard className="h-64" />
          <SkeletonCard className="h-64" />
        </div>
      </div>
    </div>
  );
};
