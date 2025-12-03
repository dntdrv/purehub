import React, { useMemo } from 'react';
import { UserStats } from '../types';
import { Trophy, Flame, RefreshCcw, ArrowUpRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardProps {
  stats: UserStats;
  onCheckIn: () => void;
  onRelapse: () => void;
  username: string;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, onCheckIn, onRelapse, username }) => {
  
  const currentStreak = useMemo(() => {
    if (!stats.streakStartDate) return 0;
    const diff = Date.now() - stats.streakStartDate;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }, [stats.streakStartDate]);

  // Visual calculation for "Level" or "Phase"
  const phaseProgress = Math.min((currentStreak % 30) / 30 * 100, 100); 

  return (
    <div className="space-y-6">
      
      {/* Greeting - Large and Expressive */}
      <header className="py-2">
         <h1 className="text-5xl font-normal text-on-surface tracking-tighter leading-[1.1]">
           Keep going,<br />
           <span className="text-primary font-serif italic">{username}.</span>
         </h1>
      </header>

      {/* Main Hero Card - "The Monolith" */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-primary-container text-on-primary-container rounded-[32px] p-8 overflow-hidden min-h-[360px] flex flex-col justify-between shadow-sm group"
      >
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors duration-500" />
         
         <div className="relative z-10 flex justify-between items-start">
            <div className="bg-white/30 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-on-primary-container/80">
              Current Streak
            </div>
            <motion.button 
               whileTap={{ scale: 0.9 }}
               onClick={onCheckIn}
               className="bg-on-primary-container text-primary-container p-3 rounded-2xl hover:scale-105 transition-transform"
            >
               <ArrowUpRight className="w-6 h-6" />
            </motion.button>
         </div>

         <div className="relative z-10 flex flex-col items-center py-8">
            <motion.span 
              key={currentStreak}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-[140px] leading-none font-bold tracking-tighter text-primary font-sans mix-blend-multiply"
            >
              {currentStreak}
            </motion.span>
            <span className="text-xl font-medium text-on-primary-container/60 mt-[-10px]">Days Clean</span>
         </div>

         {/* Progress Bar for "Next Milestone" */}
         <div className="relative z-10">
            <div className="flex justify-between text-sm font-medium mb-2 opacity-70">
               <span>Level {stats.level}</span>
               <span>{Math.round(phaseProgress)}%</span>
            </div>
            <div className="h-2 w-full bg-white/30 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }} 
                 animate={{ width: `${phaseProgress}%` }} 
                 className="h-full bg-primary"
                 transition={{ duration: 1.5, ease: "circOut" }}
               />
            </div>
         </div>
      </motion.div>

      {/* Stats Grid - "Bento Box" Style */}
      <div className="grid grid-cols-2 gap-4">
         <StatCard icon={Trophy} label="Best Streak" value={`${stats.longestStreak}d`} color="tertiary" />
         <StatCard icon={Flame} label="Check-ins" value={stats.totalCheckins} color="secondary" />
      </div>

      {/* The Relapse Button - De-emphasized but accessible */}
      <div className="pt-8 flex justify-center">
         <button 
           onClick={() => {
             if(confirm("This will reset your streak counter to 0. Are you sure?")) onRelapse();
           }}
           className="text-error/60 text-sm font-medium hover:text-error hover:underline transition-colors flex items-center gap-2"
         >
           <RefreshCcw className="w-3 h-3" />
           I slipped up (Reset Counter)
         </button>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className={`bg-${color}-container text-on-${color}-container p-6 rounded-[28px] flex flex-col justify-between h-40 relative overflow-hidden`}
  >
    <Icon className="w-8 h-8 opacity-20 absolute top-4 right-4 rotate-12" />
    <div className={`w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4`}>
       <Icon className="w-5 h-5" />
    </div>
    <div>
       <span className="text-4xl font-bold tracking-tight block">{value}</span>
       <span className="text-xs font-bold uppercase tracking-wider opacity-70">{label}</span>
    </div>
  </motion.div>
);

export default Dashboard;