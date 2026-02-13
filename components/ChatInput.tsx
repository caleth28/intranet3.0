
import React from 'react';
import { Send, ImageIcon } from 'lucide-react';

const ChatInput: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      <img 
        src="https://picsum.photos/seed/user123/100/100" 
        alt="User" 
        className="w-12 h-12 rounded-full object-cover shrink-0 shadow-lg border-4 border-white"
      />
      <div className="flex-1 relative">
        <input 
          type="text" 
          placeholder="¿Dudas sobre pedidos o SKUs? Escribe aquí..."
          className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-medium outline-none placeholder:text-slate-400 placeholder:italic focus:ring-2 focus:ring-red-100 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
           <button className="p-2 text-slate-300 hover:text-red-600 transition-colors">
             <ImageIcon size={20} />
           </button>
           <button className="w-10 h-10 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-xl hover:bg-red-700 transition-all">
             <Send size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
