import React, { useState } from 'react';
import { SHIELD_GUIDES } from '../services/content';
import { ShieldCheck, Smartphone, Monitor, Lock, ChevronDown, ChevronUp, Check, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Shield: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getIcon = (name: string) => {
    switch(name) {
      case 'android': return <Smartphone className="w-6 h-6" />;
      case 'monitor': return <Monitor className="w-6 h-6" />;
      case 'windows': return <Monitor className="w-6 h-6" />;
      case 'apple': return <Smartphone className="w-6 h-6" />;
      default: return <ShieldCheck className="w-6 h-6" />;
    }
  };

  return (
    <div className="pb-28 space-y-8">
      <header className="pt-4">
          <h1 className="text-3xl font-normal text-on-surface tracking-tight mb-2">Shield</h1>
          <p className="text-on-surface-variant text-base leading-relaxed max-w-xs">
            Use system-level tools to lock down your devices. Friction is the key.
          </p>
      </header>
      
      {/* Intro Card */}
      <div className="bg-primary-container/40 rounded-[28px] p-6 flex items-start gap-4">
         <div className="bg-primary-container p-3 rounded-full text-on-primary-container shrink-0">
           <Lock className="w-6 h-6" />
         </div>
         <div>
           <h3 className="font-bold text-on-surface">Why On-Device?</h3>
           <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">
             Network filters (DNS) are easily bypassed by switching to 4G. Native OS restrictions ("Screen Time") are much harder to disable in the heat of the moment.
           </p>
         </div>
      </div>

      <div className="space-y-4">
        {SHIELD_GUIDES.map((guide, index) => {
          const isExpanded = expandedId === guide.id;
          return (
            <motion.div 
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-surface-container rounded-[24px] overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-primary shadow-lg bg-surface-container-high' : 'shadow-sm'}`}
            >
              <button 
                onClick={() => toggleExpand(guide.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-full transition-colors ${isExpanded ? 'bg-primary text-on-primary' : 'bg-white text-on-surface-variant'}`}>
                    {getIcon(guide.iconName)}
                  </div>
                  <div>
                    <span className="text-lg font-medium text-on-surface block">{guide.platform}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${guide.difficulty === 'Hard' ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'}`}>
                      {guide.difficulty}
                    </span>
                  </div>
                </div>
                <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                   <ChevronDown className="text-outline" />
                </div>
              </button>

              <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-6 overflow-hidden"
                >
                  {guide.warning && (
                    <div className="bg-error-container/50 text-on-error-container p-4 rounded-2xl text-sm mb-6 flex gap-3 items-start border border-error-container">
                       <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                       <p>{guide.warning}</p>
                    </div>
                  )}
                  
                  <div className="space-y-6 relative">
                     {/* Connecting Line */}
                     <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-outline-variant/20"></div>

                    {guide.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4 relative z-10">
                        <div className="flex flex-col items-center shrink-0">
                           <div className="w-8 h-8 rounded-full bg-surface text-on-surface font-bold text-sm flex items-center justify-center border-2 border-outline-variant/20">
                             {idx + 1}
                           </div>
                        </div>
                        <div className="pb-2">
                           <h4 className="font-bold text-on-surface text-base">{step.title}</h4>
                           <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
                             {step.description}
                           </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-8 py-4 rounded-full bg-primary text-on-primary font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-md">
                     <Check className="w-5 h-5" />
                     Mark as Configured
                  </button>
                </motion.div>
              )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
};

export default Shield;