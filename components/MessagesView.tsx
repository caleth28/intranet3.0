
import React, { useState, useMemo } from 'react';
import { Send, Search, CheckCheck, Phone, Video, Info, Paperclip, Smile } from 'lucide-react';

const MessagesView: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [msgInput, setMsgInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para los mensajes de la conversación activa
  const [chatHistory, setChatHistory] = useState<{ [key: number]: any[] }>({
    0: [
      { id: 1, text: 'Hola Caleth, ¿Cómo vas con la zona sur?', sender: 'them', time: '10:15 AM' },
      { id: 2, text: 'Todo bien Peter, ya estamos terminando el ruteo.', sender: 'me', time: '10:20 AM' },
      { id: 3, text: '¿Confirmaste la recepción del lote sur?', sender: 'them', time: '10:30 AM' },
    ],
    1: [{ id: 1, text: 'El camión V3X-901 tuvo un ligero retraso.', sender: 'them', time: '09:15 AM' }],
  });

  const chats = [
    { id: 0, name: 'Peter (Supervisor)', lastMsg: '¿Confirmaste la recepción del lote sur?', time: '10:30 AM', unread: 1, avatar: 'https://picsum.photos/seed/peter/100/100', online: true },
    { id: 1, name: 'Logística Nacional', lastMsg: 'El camión V3X-901 tuvo un ligero retraso.', time: '09:15 AM', unread: 1, avatar: 'https://picsum.photos/seed/log/100/100', online: false },
    { id: 2, name: 'Soledad (DEX Norte)', lastMsg: 'Mañana cierro pedidos a las 4pm.', time: 'Ayer', unread: 0, avatar: 'https://picsum.photos/seed/sole/100/100', online: true },
    { id: 3, name: 'Stevens (DIM)', lastMsg: 'Adjunto el reporte de ventas Q4.', time: 'Lun', unread: 0, avatar: 'https://picsum.photos/seed/stev/100/100', online: false },
  ];

  const filteredChats = useMemo(() => 
    chats.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())), 
  [searchTerm]);

  const handleSendMessage = () => {
    if (!msgInput.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      text: msgInput,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg]
    }));
    
    setMsgInput('');
  };

  const currentMessages = chatHistory[selectedChat] || [];

  return (
    <div className="h-[calc(100vh-160px)] flex gap-6 animate-in fade-in duration-500">
      
      {/* Listado de Chats (Sidebar Izquierdo) */}
      <div className="w-96 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden shrink-0">
        <div className="p-8 pb-4">
          <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-6">Mensajes</h2>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-500 transition-colors" size={18} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar conversación..." 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-xs font-bold uppercase tracking-widest outline-none focus:ring-2 focus:ring-red-100 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`
                w-full p-4 rounded-3xl flex items-center gap-4 transition-all group
                ${selectedChat === chat.id ? 'bg-red-600 text-white shadow-xl shadow-red-100' : 'hover:bg-slate-50'}
              `}
            >
              <div className="relative shrink-0">
                <img src={chat.avatar} className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm" alt={chat.name} />
                {chat.online && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex justify-between items-start mb-0.5">
                  <p className={`text-[11px] font-black uppercase italic truncate ${selectedChat === chat.id ? 'text-white' : 'text-slate-900'}`}>{chat.name}</p>
                  <span className={`text-[9px] font-bold ${selectedChat === chat.id ? 'text-white/70' : 'text-slate-400'}`}>{chat.time}</span>
                </div>
                <p className={`text-[10px] font-medium truncate ${selectedChat === chat.id ? 'text-white/80' : 'text-slate-500'}`}>{chat.lastMsg}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Área de Chat (Contenido Derecho) */}
      <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col overflow-hidden relative">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-4">
            <img src={chats.find(c => c.id === selectedChat)?.avatar} className="w-12 h-12 rounded-2xl object-cover" alt="" />
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase italic tracking-tight">{chats.find(c => c.id === selectedChat)?.name}</h3>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{chats.find(c => c.id === selectedChat)?.online ? '● En línea' : 'Desconectado'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors"><Phone size={20} /></button>
            <button className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors"><Video size={20} /></button>
            <button className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400 transition-colors"><Info size={20} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50/30 no-scrollbar">
          {currentMessages.map((m) => (
            <div key={m.id} className={`flex animate-in slide-in-from-bottom-2 duration-300 ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] space-y-2`}>
                <div className={`
                  p-6 rounded-[2rem] text-sm font-medium leading-relaxed shadow-sm
                  ${m.sender === 'me' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'}
                `}>
                  {m.text}
                </div>
                <div className={`flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  {m.time} {m.sender === 'me' && <CheckCheck size={12} className="text-emerald-500" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-white border-t border-slate-50">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="bg-slate-50 rounded-[2rem] p-2 flex items-center gap-2 focus-within:ring-2 focus-within:ring-red-100 transition-all"
          >
            <button type="button" className="p-4 hover:bg-white rounded-2xl text-slate-400 transition-all"><Paperclip size={20} /></button>
            <input 
              type="text" 
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              placeholder="Escribe un mensaje operativo..." 
              className="flex-1 bg-transparent border-none outline-none px-2 text-sm font-medium text-slate-700 placeholder:text-slate-300"
            />
            <button type="button" className="p-4 hover:bg-white rounded-2xl text-slate-400 transition-all"><Smile size={20} /></button>
            <button 
              type="submit"
              className="bg-red-600 text-white p-5 rounded-[1.8rem] shadow-xl shadow-red-100 hover:scale-105 active:scale-95 transition-all"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesView;
