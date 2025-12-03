import React, { useMemo } from 'react';
import { UserStats, Rank } from '../types';
import { Trophy, Flame, RefreshCcw, ArrowUpRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface DashboardProps {
  stats: UserStats;
  onCheckIn: () => void;
  onRelapse: () => void;
  username: string;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, onCheckIn, onRelapse, username }) => {
  
  const currentStreakDays = useMemo(() => {
    if (!stats.streakStartDate) return 0;
    const diff = Date.now() - stats.streakStartDate;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }, [stats.streakStartDate]);

  const streakData = [
    { name: 'Completed', value: currentStreakDays },
    { name: 'Goal (90 Days)', value: Math.max(0, 90 - currentStreakDays) },
  ];

  const COLORS = ['#0061a4', '#e2e2e9']; // Primary, Surface Variant

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-24"
    >
      
      {/* M3 Large Top App Bar equivalent */}
      <motion.header variants={itemVariants} className="pt-4 pb-2">
        <div className="flex justify-between items-end">
          <div>
             <span className="text-sm font-medium text-secondary">
               {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
             </span>
             <h1 className="text-4xl font-normal text-on-surface tracking-tight mt-1">
               Hello, <span className="font-semibold text-primary">{username}</span>
             </h1>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={onCheckIn} 
            className="bg-primary-container text-on-primary-container p-4 rounded-2xl hover:brightness-105 transition-all shadow-sm"
          >
            <ArrowUpRight className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Card - Expressive */}
      <motion.div variants={itemVariants} className="bg-surface-container-high rounded-[32px] p-6 relative overflow-hidden shadow-sm min-h-[300px] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center relative z-10 w-full">
           <div className="w-64 h-64 relative mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={streakData}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={115}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={12}
                    paddingAngle={4}
                  >
                    {streakData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <motion.span 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="text-7xl font-bold text-on-surface-variant tracking-tighter"
                >
                  {currentStreakDays}
                </motion.span>
                <span className="text-sm font-medium text-secondary uppercase tracking-widest mt-1">Days Free</span>
              </div>
           </div>
           
           <div className="bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">
              <span className="text-primary font-medium">Next Milestone: 7 Days</span>
           </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div variants={itemVariants} className="bg-secondary-container text-on-secondary-container p-5 rounded-[28px] flex flex-col items-start gap-4 hover:shadow-md transition-shadow">
          <div className="bg-white/20 p-3 rounded-full">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-3xl font-bold block">{stats.longestStreak}</span>
            <span className="text-xs opacity-70 uppercase tracking-wide">Record</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-tertiary-container text-on-tertiary-container p-5 rounded-[28px] flex flex-col items-start gap-4 hover:shadow-md transition-shadow">
          <div className="bg-white/20 p-3 rounded-full">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <span className="text-3xl font-bold block">{stats.totalCheckins}</span>
            <span className="text-xs opacity-70 uppercase tracking-wide">Check-ins</span>
          </div>
        </motion.div>
      </div>

      {/* Relapse Action - Outlined Card */}
      <motion.div variants={itemVariants} className="border border-outline-variant rounded-[24px] p-6 bg-surface-container-low">
        <h3 className="text-lg font-semibold text-on-surface mb-2">Slip Up?</h3>
        <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
            Honesty is the foundation of recovery. Resetting is not failure; it is a recalibration of your strategy.
        </p>
        <motion.button 
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if(confirm("Confirm reset? This will restart your current streak.")) {
              onRelapse();
            }
          }}
          className="w-full flex items-center justify-center gap-2 text-error font-medium bg-error-container/10 hover:bg-error-container/20 py-4 rounded-full transition-colors border border-error/20"
        >
            <RefreshCcw className="w-4 h-4" />
            Reset Counter
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;