import React, { useState } from 'react';
import { TOPICS } from '../services/content';
import { ArrowLeft, Brain, Zap, BookOpen, Activity, Search, ChevronRight, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

const Learn: React.FC = () => {
  const [currentId, setCurrentId] = useState<string>('root');
  const [history, setHistory] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const currentNode = TOPICS[currentId] || TOPICS['root'];

  const handleNavigate = (id: string) => {
    setHistory([...history, currentId]);
    setCurrentId(id);
    setSearchQuery('');
  };

  const handleBack = () => {
    const prev = history[history.length - 1];
    if (prev) {
      setHistory(history.slice(0, -1));
      setCurrentId(prev);
    } else {
        // If empty history but not at root, go root
        if(currentId !== 'root') setCurrentId('root');
    }
  };

  const getIcon = (category: string) => {
    switch(category) {
      case 'science': return <Brain className="w-6 h-6 text-tertiary" />;
      case 'strategy': return <Zap className="w-6 h-6 text-primary" />;
      case 'philosophy': return <BookOpen className="w-6 h-6 text-secondary" />;
      default: return <Activity className="w-6 h-6" />;
    }
  };

  const filteredTopics = searchQuery 
    ? Object.values(TOPICS).filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.summary.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="h-full flex flex-col pb-28 relative">
      {/* Header */}
      <div className="py-4 space-y-4 px-1">
         <h1 className="text-3xl font-normal text-on-surface tracking-tight">Library</h1>
         
         {/* Search Bar */}
         <div className="relative z-10">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-on-surface-variant opacity-50" />
            <input 
              type="text" 
              placeholder="Search concepts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-high rounded-full py-3 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
            />
         </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 relative">
        <AnimatePresence mode="wait">
        {searchQuery ? (
           <motion.div 
             key="search"
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0 }}
             className="space-y-3 pt-2"
           >
             <p className="text-sm font-medium text-secondary ml-2">Found {filteredTopics.length} results</p>
             {filteredTopics.map(topic => (
                <button 
                  key={topic.id}
                  onClick={() => handleNavigate(topic.id)}
                  className="w-full bg-surface-container rounded-[20px] p-4 text-left flex items-start gap-4 hover:bg-surface-container-high transition-colors"
                >
                  <div className="bg-white p-2 rounded-full shadow-sm shrink-0">
                    {getIcon(topic.category)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-on-surface">{topic.title}</h3>
                    <p className="text-sm text-on-surface-variant line-clamp-2">{topic.summary}</p>
                  </div>
                </button>
             ))}
           </motion.div>
        ) : (
          <motion.div 
             key={currentId}
             initial={{ x: 20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             exit={{ x: -20, opacity: 0 }}
             transition={{ duration: 0.3, ease: "easeInOut" }}
             className="pb-6"
          >
             {/* Navigation Header */}
             {history.length > 0 && (
                <button onClick={handleBack} className="flex items-center gap-1 text-primary font-medium mb-4 pl-1 hover:underline">
                   <ArrowLeft className="w-4 h-4" /> Back
                </button>
             )}

             {/* Content Node - Visualized as a Card */}
             <div className="bg-surface-container-low rounded-[28px] p-6 mb-8 border border-outline-variant/20 shadow-sm relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 bg-${currentNode.category === 'science' ? 'tertiary' : currentNode.category === 'strategy' ? 'primary' : 'secondary'}`}></div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-${currentNode.category === 'science' ? 'tertiary-container text-on-tertiary-container' : currentNode.category === 'strategy' ? 'primary-container text-on-primary-container' : 'secondary-container text-on-secondary-container'}`}>
                    {currentNode.category}
                  </span>
                  <div className="text-on-surface-variant/50">
                    {getIcon(currentNode.category)}
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-on-surface mb-4 tracking-tight">{currentNode.title}</h2>
                <div className="prose prose-slate prose-p:text-on-surface-variant prose-headings:text-on-surface max-w-none leading-relaxed">
                   <ReactMarkdown>{currentNode.content}</ReactMarkdown>
                </div>
             </div>

             {/* Branch Lines (Visual Connector) */}
             {currentNode.childrenIds.length > 0 && (
                <div className="relative pl-4 mb-6">
                  {/* Vertical Line */}
                  <div className="absolute left-[19px] top-0 bottom-6 w-0.5 bg-outline-variant/30"></div>
                  
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4 ml-4">Next Steps</h3>
                  
                  <div className="space-y-4">
                    {currentNode.childrenIds.map((childId, index) => {
                      const child = TOPICS[childId];
                      if (!child) return null;
                      return (
                        <motion.button 
                          key={childId}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleNavigate(childId)}
                          className="relative w-full bg-surface-container rounded-2xl p-5 flex items-center justify-between group hover:bg-surface-container-high transition-colors z-10"
                        >
                           {/* Horizontal Connector */}
                           <div className="absolute right-full top-1/2 w-4 h-0.5 bg-outline-variant/30 -mr-0.5"></div>

                           <div className="flex items-center gap-4">
                             <div className="p-3 bg-white rounded-full shadow-sm">
                               {getIcon(child.category)}
                             </div>
                             <div className="text-left">
                               <span className="block text-lg font-semibold text-on-surface">{child.title}</span>
                               <span className="text-sm text-on-surface-variant">{child.summary}</span>
                             </div>
                           </div>
                           <ChevronRight className="w-5 h-5 text-outline-variant group-hover:text-primary transition-colors" />
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
             )}

             {/* Related Nodes */}
             {currentNode.relatedIds.length > 0 && (
               <div className="mt-8 border-t border-outline-variant/20 pt-6">
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">Related Concepts</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentNode.relatedIds.map(relId => {
                      const rel = TOPICS[relId];
                      if (!rel) return null;
                      return (
                        <button
                          key={relId}
                          onClick={() => handleNavigate(relId)}
                          className="bg-secondary-container/50 text-on-secondary-container px-4 py-2 rounded-xl text-sm font-medium hover:bg-secondary-container transition-colors flex items-center gap-2"
                        >
                          <Share2 className="w-3 h-3 opacity-50" />
                          {rel.title}
                        </button>
                      )
                    })}
                  </div>
               </div>
             )}
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Learn;