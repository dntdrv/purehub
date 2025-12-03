import React, { useState } from 'react';
import { getLibraryContent } from '../services/gemini';
import { BookOpen, Brain, Activity, Zap, Loader2, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const TOPICS = [
  { id: 'dopamine', title: 'The Dopamine Cycle', icon: Brain, color: 'bg-pink-100 text-pink-600' },
  { id: 'flatline', title: 'The Flatline Phase', icon: Activity, color: 'bg-blue-100 text-blue-600' },
  { id: 'triggers', title: 'Identifying Triggers', icon: Zap, color: 'bg-yellow-100 text-yellow-600' },
  { id: 'benefits', title: 'Benefits of Quitting', icon: BookOpen, color: 'bg-green-100 text-green-600' },
  { id: 'chaser', title: 'The Chaser Effect', icon: Activity, color: 'bg-red-100 text-red-600' },
  { id: 'stoicism', title: 'Stoic Mindset', icon: Brain, color: 'bg-slate-100 text-slate-600' },
];

const Library: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleTopicClick = async (topicId: string, topicTitle: string) => {
    setSelectedTopic(topicId);
    if (!content[topicId]) {
      setLoading(true);
      const text = await getLibraryContent(topicTitle);
      setContent(prev => ({ ...prev, [topicId]: text }));
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 space-y-6 h-full flex flex-col">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Knowledge Base</h1>
        <p className="text-slate-500 text-sm">Understand the science of recovery.</p>
      </header>

      {!selectedTopic ? (
        <div className="grid grid-cols-1 gap-4">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicClick(topic.id, topic.title)}
              className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-brand-300 hover:shadow-md transition-all text-left group"
            >
              <div className={`p-3 rounded-full ${topic.color}`}>
                <topic.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 group-hover:text-brand-600">{topic.title}</h3>
                <p className="text-xs text-slate-500">Tap to learn more</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-500" />
            </button>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col animate-in slide-in-from-right-10 fade-in duration-300">
          <button 
            onClick={() => setSelectedTopic(null)} 
            className="text-brand-600 text-sm font-semibold mb-4 hover:underline flex items-center gap-1"
          >
            ← Back to topics
          </button>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-1 overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              {TOPICS.find(t => t.id === selectedTopic)?.title}
            </h2>
            
            {loading ? (
               <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                 <Loader2 className="w-8 h-8 animate-spin mb-4 text-brand-500" />
                 <p>Consulting the archives...</p>
               </div>
            ) : (
              <div className="prose prose-sm prose-slate max-w-none text-slate-700 leading-relaxed">
                <ReactMarkdown>{content[selectedTopic]}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
