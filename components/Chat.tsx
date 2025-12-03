import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToCoach } from '../services/gemini';
import { Send, Bot, User, Loader2 } from 'lucide-react';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi there. I'm your recovery coach. I'm here to listen without judgment. How are you feeling today?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToCoach(newHistory);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      // Handle error gracefully in UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
       <header className="mb-4 flex-shrink-0">
          <h1 className="text-2xl font-bold text-slate-900">AI Coach</h1>
          <p className="text-slate-500 text-sm">24/7 Support & Guidance</p>
      </header>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-brand-100' : 'bg-indigo-100'}`}>
              {msg.role === 'user' ? <User className="w-5 h-5 text-brand-600" /> : <Bot className="w-5 h-5 text-indigo-600" />}
            </div>
            
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-brand-600 text-white rounded-br-none' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex items-end gap-2">
             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
               <Bot className="w-5 h-5 text-indigo-600" />
             </div>
             <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm">
               <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
             </div>
           </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="mt-2 flex-shrink-0 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-transparent border-none focus:ring-0 p-2 text-slate-800 placeholder-slate-400"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="p-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-50 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Chat;