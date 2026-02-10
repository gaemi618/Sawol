import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { sendMessageToSawol } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'sawol'; text: string }[]>([
    { sender: 'sawol', text: "아씨(도련님), 오셨어유? 심심하시면 저랑 말동무라도 해유." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setIsLoading(true);

    const reply = await sendMessageToSawol(userMsg);
    
    setMessages(prev => [...prev, { sender: 'sawol', text: reply }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-serif">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-hanji border-2 border-wood shadow-xl rounded-lg overflow-hidden flex flex-col h-[500px] animate-[slideUp_0.3s_ease-out]">
          {/* Header */}
          <div className="bg-wood text-hanji p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="font-bold">사월이</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-denggi transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-paper-pattern">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[80%] p-3 text-sm leading-relaxed rounded-lg shadow-sm
                  ${msg.sender === 'user' 
                    ? 'bg-wood/10 text-ink rounded-tr-none border border-wood/20' 
                    : 'bg-white text-ink rounded-tl-none border border-wood/20'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
               <div className="bg-white p-3 rounded-lg rounded-tl-none border border-wood/20 text-xs text-gray-500 flex gap-1">
                 <span>생</span><span>각</span><span>중</span><span>...</span>
               </div>
             </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-hanji-dark/50 border-t border-wood/20 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="말을 걸어보셔유..."
              className="flex-1 bg-white border border-wood/30 px-3 py-2 text-sm focus:outline-none focus:border-denggi rounded"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-wood text-hanji p-2 rounded hover:bg-wood-light transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 bg-denggi text-white px-4 py-3 rounded-full shadow-lg hover:bg-red-800 transition-all hover:scale-105 active:scale-95"
      >
        {!isOpen && <span className="text-sm font-bold">사월이와 대화하기</span>}
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default ChatWidget;