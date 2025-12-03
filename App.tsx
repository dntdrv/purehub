import React, { useState, useEffect } from 'react';
import { ViewState, UserStats, User } from './types';
import Dashboard from './components/Dashboard';
import Learn from './components/Learn';
import Shield from './components/Shield';
import Panic from './components/Panic';
import Login from './components/Login';
import { LayoutDashboard, Brain, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>(ViewState.DASHBOARD);
  const [panicMode, setPanicMode] = useState(false);
  
  // Persisted State
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('purepath_stats');
    return saved ? JSON.parse(saved) : {
      streakStartDate: Date.now(),
      longestStreak: 0,
      totalCheckins: 0,
      lastRelapseDate: null,
      level: 1
    };
  });

  useEffect(() => {
    localStorage.setItem('purepath_stats', JSON.stringify(stats));
  }, [stats]);

  // Check for existing session
  useEffect(() => {
    const savedUser = localStorage.getItem('purepath_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('purepath_user', JSON.stringify(newUser));
  };

  const handleCheckIn = () => {
    setStats(prev => ({
      ...prev,
      totalCheckins: prev.totalCheckins + 1
    }));
    // Toast
    const toast = document.getElementById('toast');
    if(toast) {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
        }, 3000);
    }
  };

  const handleRelapse = () => {
    const currentStreak = Math.floor((Date.now() - (stats.streakStartDate || Date.now())) / (1000 * 60 * 60 * 24));
    setStats(prev => ({
      ...prev,
      lastRelapseDate: Date.now(),
      streakStartDate: Date.now(),
      longestStreak: Math.max(prev.longestStreak, currentStreak)
    }));
  };

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-background text-on-surface font-sans selection:bg-primary-container">
      <AnimatePresence>
        {panicMode && <Panic onClose={() => setPanicMode(false)} />}
      </AnimatePresence>

      <div className="max-w-md mx-auto min-h-screen bg-surface relative flex flex-col shadow-2xl overflow-hidden border-x border-outline-variant/10">
        
        {/* Top App Bar Area */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 pointer-events-none">
           <span className="text-sm font-bold tracking-widest text-primary/50 uppercase mix-blend-multiply">PurePath</span>
           <motion.button 
             initial={{ scale: 0 }} animate={{ scale: 1 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => setPanicMode(true)}
             className="pointer-events-auto bg-error-container text-on-error-container px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm border border-error/10"
           >
             <Zap className="w-4 h-4 fill-current" /> PANIC
           </motion.button>
        </div>

        {/* Toast */}
        <div 
            id="toast"
            className="absolute top-20 left-1/2 -translate-x-1/2 bg-on-surface/90 text-surface px-6 py-2 rounded-full text-sm font-medium opacity-0 translate-y-5 transition-all duration-500 z-30 pointer-events-none"
        >
            Check-in recorded
        </div>

        <main className="flex-1 overflow-y-auto scrollbar-hide pt-24 pb-32 px-6">
          <AnimatePresence mode="wait" initial={false}>
            {view === ViewState.DASHBOARD && (
              <Dashboard key="dash" stats={stats} onCheckIn={handleCheckIn} onRelapse={handleRelapse} username={user.name} />
            )}
            {view === ViewState.LEARN && (
              <motion.div key="learn" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -20}}>
                 <Learn />
              </motion.div>
            )}
            {view === ViewState.SHIELD && (
              <motion.div key="shield" initial={{opacity: 0, scale: 0.95}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 1.05}}>
                 <Shield />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* M3 Expressive Navigation Bar */}
        <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-surface via-surface to-transparent pointer-events-none">
          <nav className="bg-surface-container-high rounded-full p-2 flex justify-between items-center shadow-lg border border-white/50 relative pointer-events-auto">
             <NavTab 
               active={view === ViewState.DASHBOARD} 
               onClick={() => setView(ViewState.DASHBOARD)} 
               icon={LayoutDashboard} 
               label="Focus" 
             />
             <NavTab 
               active={view === ViewState.LEARN} 
               onClick={() => setView(ViewState.LEARN)} 
               icon={Brain} 
               label="Learn" 
             />
             <NavTab 
               active={view === ViewState.SHIELD} 
               onClick={() => setView(ViewState.SHIELD)} 
               icon={ShieldCheck} 
               label="Shield" 
             />
          </nav>
        </div>
      </div>
    </div>
  );
};

const NavTab = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className="relative flex-1 h-14 rounded-full flex items-center justify-center transition-all duration-300 overflow-hidden group"
  >
    {active && (
      <motion.div 
        layoutId="nav-pill"
        className="absolute inset-0 bg-secondary-container rounded-full"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
    <div className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${active ? 'text-on-secondary-container font-semibold' : 'text-on-surface-variant group-hover:text-primary'}`}>
       <Icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} />
       {active && <motion.span initial={{width:0, opacity:0}} animate={{width:'auto', opacity:1}} className="text-sm overflow-hidden whitespace-nowrap">{label}</motion.span>}
    </div>
  </button>
);

export default App;