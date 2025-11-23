import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import type { Guardian } from '../../entities/guardian/guardian.data';
import type { Message } from '../../entities/chat/chat.model';
import { getMockReply } from '../../entities/chat/chat.model';

interface ChatWindowProps {
  guardian: Guardian;
  initialEmotion: string;
}

export const ChatWindow = ({ guardian, initialEmotion }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialMsg: Message = {
      id: 'init',
      sender: 'AI',
      text: `${guardian.quote}\n"${initialEmotion}" 때문에 왔구나. 잘 왔어.`,
      timestamp: new Date(),
    };
    setMessages([initialMsg]);
  }, [guardian, initialEmotion]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'USER',
      text: inputValue,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'AI',
        text: getMockReply(guardian.id, userMsg.text),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiReply]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-3xl mx-auto relative">
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        <AnimatePresence>
          {messages.map((msg) => {
            const isAi = msg.sender === 'AI';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-md border 
                  ${isAi 
                    ? `bg-gray-900/80 border-gray-700 text-gray-100 rounded-tl-none` 
                    : `bg-${guardian.bgColor}/20 border-${guardian.bgColor}/50 text-white rounded-tr-none shadow-[0_0_10px_rgba(255,255,255,0.1)]`
                  }`}
                >
                  {isAi && <div className={`text-xs ${guardian.color} mb-1 font-bold`}>{guardian.name}</div>}
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-gray-900/60 p-3 rounded-2xl rounded-tl-none border border-gray-700 flex gap-1">
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-20 shrink-0">
        <form onSubmit={handleSend} className="relative max-w-3xl mx-auto">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`${guardian.name}에게 말하기...`}
            className="w-full bg-gray-900/90 border border-gray-600 text-white rounded-full py-4 px-6 pr-12 focus:outline-none focus:border-white transition-colors shadow-lg backdrop-blur-xl"
          />
          <button 
            type="submit" 
            disabled={!inputValue.trim()}
            className="absolute right-2 top-2 p-2 bg-white/10 rounded-full hover:bg-white/20 disabled:opacity-30 transition-all text-white"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
      
    </div>
  );
};