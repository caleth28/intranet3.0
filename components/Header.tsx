
import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Mail, Truck, FileText, AlertCircle, MessageSquare, Check } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onViewChange?: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onViewChange }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  
  const notificationsRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(event.target as Node)) {
        setShowMessages(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'Pedido DESP-9901', desc: 'Tu despacho está a 15 minutos de la zona.', time: 'Ahora', icon: <Truck size={16} />, color: 'text-blue-600 bg-blue-50' },
    { id: 2, title: 'Nueva Lista de Precios', desc: 'Se actualizaron los precios de Repostería.', time: 'Hace 2h', icon: <FileText size={16} />, color: 'text-emerald-600 bg-emerald-50' },
    { id: 3, title: 'Alerta de Stock', desc: 'Stock crítico en Gelatina Fresa 500g.', time: 'Hace 5h', icon: <AlertCircle size={16} />, color: 'text-red-600 bg-red-50' },
  ];

  const messages = [
    { id: 1, sender: 'Peter (Supervisor)', text: '¿Confirmaste la recepción del lote sur?', time: '10:30 AM', avatar: 'https://picsum.photos/seed/peter/100/100' },
    { id: 2, sender: 'Logística Nacional', text: 'El camión V3X-901 tuvo un ligero retraso.', time: '09:15 AM', avatar: 'https://picsum.photos/seed/log/100/100' },
  ];

  const handleGoToMessages = () => {
    if (onViewChange) {
      onViewChange('mensajes');
      setShowMessages(false);
    }
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center px-8 z-[60] sticky top-0">
      {/* ESPACIO IZQUIERDO */}
      <div className="w-1/4 hidden lg:block"></div>

      {/* LOGO CENTRAL */}
      <div className="flex-1 flex justify-center">
        <img 
          src="https://www.universal.com.pe/wp-content/uploads/2021/08/logo-universal.png" 
          alt="Universal Logo" 
          className="h-10 md:h-12 object-contain hover:scale-110 transition-transform cursor-pointer drop-shadow-sm"
          onClick={() => onViewChange?.('dashboard')}
        />
      </div>

      <div className="w-auto flex items-center justify-end space-x-6">
        <div className="relative group hidden xl:block">
          <input
            type="text"
            placeholder="Buscar pedido, SKU..."
            className="bg-gray-50 border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm font-medium w-48 focus:w-64 transition-all outline-none focus:ring-2 focus:ring-red-100"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>

        <div className="flex items-center space-x-2">
          {/* BOTÓN MENSAJES */}
          <div className="relative" ref={messagesRef}>
            <button 
              onClick={() => { setShowMessages(!showMessages); setShowNotifications(false); }}
              className={`relative p-3 rounded-xl transition-all ${showMessages ? 'bg-red-50 text-red-600' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'}`}
            >
              <Mail size={22} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white"></span>
            </button>

            {showMessages && (
              <div className="absolute right-0 mt-4 w-80 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                  <h3 className="font-black text-xs uppercase tracking-widest text-gray-900 italic">Mensajes Operativos</h3>
                  <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-black">2 NUEVOS</span>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      onClick={handleGoToMessages}
                      className="p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 flex space-x-4"
                    >
                      <img src={msg.avatar} className="w-10 h-10 rounded-full object-cover shrink-0" alt={msg.sender} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-[11px] font-black text-gray-900 uppercase tracking-tight">{msg.sender}</p>
                          <span className="text-[9px] text-gray-400 font-bold">{msg.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-2 leading-tight">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={handleGoToMessages}
                  className="w-full p-4 text-[10px] font-black uppercase tracking-widest text-red-600 hover:bg-red-50 transition-colors border-t border-gray-50 flex items-center justify-center"
                >
                  IR AL CENTRO DE MENSAJES <MessageSquare size={12} className="ml-2" />
                </button>
              </div>
            )}
          </div>

          {/* BOTÓN NOTIFICACIONES */}
          <div className="relative" ref={notificationsRef}>
            <button 
              onClick={() => { setShowNotifications(!showNotifications); setShowMessages(false); }}
              className={`relative p-3 rounded-xl transition-all ${showNotifications ? 'bg-red-50 text-red-600' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'}`}
            >
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-4 w-80 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                  <h3 className="font-black text-xs uppercase tracking-widest text-gray-900 italic">Notificaciones</h3>
                  <button className="text-[9px] font-black text-gray-400 uppercase hover:text-red-600">Marcar todo</button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 flex space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notif.color}`}>
                        {notif.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-[11px] font-black text-gray-900 uppercase tracking-tight italic">{notif.title}</p>
                          <span className="text-[9px] text-gray-400 font-bold uppercase">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 leading-tight">{notif.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full p-4 text-[10px] font-black uppercase tracking-widest text-gray-900 hover:bg-gray-50 transition-colors border-t border-gray-50 flex items-center justify-center">
                  VER TODA LA ACTIVIDAD <Check size={12} className="ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* PERFIL */}
        <div 
          onClick={() => onViewChange?.('profile')}
          className="flex items-center space-x-4 cursor-pointer group ml-4 border-l border-gray-100 pl-8 shrink-0"
        >
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-black text-gray-900 group-hover:text-red-600 transition-colors uppercase italic whitespace-nowrap leading-none mb-1.5 tracking-normal">
              Caleth Lavado
            </p>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">
              DEX LIMA SUR
            </p>
          </div>
          <img
            src="https://picsum.photos/seed/user123/100/100"
            alt="User Profile"
            className="w-12 h-12 rounded-full object-cover shadow-sm group-hover:ring-4 group-hover:ring-red-50 transition-all border border-gray-100"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
