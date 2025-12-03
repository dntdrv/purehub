import React, { useState, useEffect } from 'react';
import { ViewState, UserStats, User } from './types';
import Dashboard from './components/Dashboard';
import Learn from './components/Learn';
import Shield from './components/Shield';
import Panic from './components/Panic';
import Login from './components/Login';
import { LayoutDashboard, Brain, Shield as ShieldIcon, AlertCircle } from 'lucide-react';
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
    // Toast logic
    const btn = document.getElementById('checkin-toast');
    if (btn) {
       btn.classList.remove('translate-y-20', 'opacity-0');
       setTimeout(() => btn.classList.add('translate-y-20', 'opacity-0'), 3000);
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

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background flex justify-center text-on-surface font-sans">
      {/* Panic Overlay */}
      <AnimatePresence>
        {panicMode && <Panic onClose={() => setPanicMode(false)} />}
      </AnimatePresence>

      <div className="w-full max-w-md bg-surface min-h-screen relative flex flex-col shadow-2xl overflow-hidden">
        
        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            {view === ViewState.DASHBOARD && (
              <Dashboard key="dash" stats={stats} onCheckIn={handleCheckIn} onRelapse={handleRelapse} username={user.name} />
            )}
            {view === ViewState.LEARN && (
              <motion.div key="learn" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="h-full">
                 <Learn />
              </motion.div>
            )}
            {view === ViewState.SHIELD && (
              <motion.div key="shield" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                 <Shield />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Floating Panic Button */}
        <div className="absolute bottom-28 right-6 z-10">
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPanicMode(true)}
                className="w-16 h-16 bg-error-container text-on-error-container rounded-[20px] shadow-lg flex items-center justify-center border border-error/10"
                title="Emergency Help"
            >
                <AlertCircle className="w-8 h-8" />
            </motion.button>
        </div>

        {/* Toast Notification */}
        <div id="checkin-toast" className="fixed top-6 left-1/2 -translate-x-1/2 bg-on-surface text-surface px-6 py-3 rounded-full shadow-xl z-50 transition-all duration-500 translate-y-20 opacity-0 pointer-events-none">
           Check-in recorded
        </div>

        {/* Floating Navigation Bar - M3 Style */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface-container-high/90 rounded-full shadow-xl p-2 flex gap-1 z-20 border border-white/50 backdrop-blur-md">
          <NavButton 
            active={view === ViewState.DASHBOARD} 
            onClick={() => setView(ViewState.DASHBOARD)} 
            icon={LayoutDashboard} 
            label="Home" 
          />
          <NavButton 
            active={view === ViewState.LEARN} 
            onClick={() => setView(ViewState.LEARN)} 
            icon={Brain} 
            label="Learn" 
          />
          <NavButton 
            active={view === ViewState.SHIELD} 
            onClick={() => setView(ViewState.SHIELD)} 
            icon={ShieldIcon} 
            label="Shield" 
          />
        </nav>
      </div>
    </div>
  );
};

const NavButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-20 h-16 rounded-full transition-all duration-300 ${active ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-white/50'}`}
  >
    <div className={`mb-1 transition-all ${active ? 'bg-secondary text-white px-5 py-1 rounded-full' : ''}`}>
       <Icon className={`w-6 h-6 ${active ? 'text-white' : ''}`} />
    </div>
    {!active && <span className="text-[10px] font-medium opacity-80">{label}</span>}
  </button>
);

export default App;