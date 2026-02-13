
import React, { useState } from 'react';
import { 
  Home, 
  ClipboardCheck, 
  Truck, 
  BarChart3,
  FileText, 
  Image as ImageIcon, 
  Zap,
  GraduationCap, 
  LifeBuoy, 
  User,
  Settings,
  Star,
  Coins
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { id: 'dashboard', icon: <Home size={24} strokeWidth={2} />, label: 'Inicio' },
    { id: 'pedidos', icon: <ClipboardCheck size={24} strokeWidth={2} />, label: 'Pedidos' },
    { id: 'sellout', icon: <Coins size={24} strokeWidth={2} />, label: 'Sell-Out & Bonos' },
    { id: 'logistica', icon: <Truck size={24} strokeWidth={2} />, label: 'Logística' },
    { id: 'reportes', icon: <BarChart3 size={24} strokeWidth={2} />, label: 'Reportes BI' },
    { id: 'documentos', icon: <FileText size={24} strokeWidth={2} />, label: 'Documentos' },
    { id: 'marketing', icon: <ImageIcon size={24} strokeWidth={2} />, label: 'Marketing' },
    { id: 'trade', icon: <Zap size={24} strokeWidth={2} />, label: 'Trade Marketing' },
    { id: 'escuela', icon: <GraduationCap size={24} strokeWidth={2} />, label: 'Escuela' },
    { id: 'soporte', icon: <LifeBuoy size={24} strokeWidth={2} />, label: 'Ayuda' },
  ];

  return (
    <aside 
      className={`bg-white border-r border-gray-100 flex flex-col py-8 h-full z-50 transition-all duration-300 ease-in-out shadow-2xl shadow-slate-200/50 ${isExpanded ? 'w-72' : 'w-24'}`}
    >
      <div className="flex justify-center mb-10 px-4">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex flex-col items-center justify-center space-y-1.5 w-12 h-12 hover:bg-slate-50 rounded-2xl transition-all"
        >
          <div className={`h-[3px] bg-red-600 rounded-full transition-all ${isExpanded ? 'w-8' : 'w-6'}`}></div>
          <div className={`h-[3px] bg-red-600 rounded-full transition-all ${isExpanded ? 'w-6' : 'w-4'}`}></div>
          <div className={`h-[3px] bg-red-600 rounded-full transition-all ${isExpanded ? 'w-8' : 'w-6'}`}></div>
        </button>
      </div>

      <nav className="flex-1 flex flex-col space-y-3 px-4 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => onViewChange(item.id)}
                className={`
                  w-full h-14 flex items-center transition-all duration-300 rounded-[1.2rem]
                  ${isActive 
                    ? 'bg-[#E21F26] text-white shadow-xl shadow-red-200 ring-4 ring-red-50' 
                    : 'text-slate-400 hover:text-red-600 hover:bg-red-50/50'}
                  ${isExpanded ? 'px-6 justify-start' : 'justify-center'}
                `}
              >
                <div className={`shrink-0 ${isActive ? 'animate-in zoom-in-75 duration-300' : ''}`}>
                  {item.icon}
                </div>
                
                {isExpanded && (
                  <span className={`ml-4 text-[11px] font-black uppercase tracking-[0.1em] whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300 italic ${isActive ? 'text-white' : ''}`}>
                    {item.label}
                  </span>
                )}
              </button>

              {!isExpanded && (
                <span className="absolute left-20 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2.5 rounded-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-all z-[100] whitespace-nowrap italic shadow-2xl translate-x-2 group-hover:translate-x-0">
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      <div className={`mt-auto pt-8 border-t border-gray-50 flex items-center ${isExpanded ? 'px-8' : 'justify-center'}`}>
        <button 
          onClick={() => onViewChange('profile')}
          className={`rounded-2xl transition-all p-0.5 shrink-0 ${activeView === 'profile' ? 'ring-2 ring-red-600 ring-offset-4' : 'hover:scale-105'}`}
        >
          <img 
            src="https://picsum.photos/seed/user123/100/100" 
            alt="User" 
            className="w-11 h-11 rounded-[1rem] object-cover shadow-md border-2 border-white"
          />
        </button>
        {isExpanded && (
          <div className="ml-4 overflow-hidden animate-in fade-in slide-in-from-left-2 shrink-0">
            <p className="text-[12px] font-black text-slate-900 uppercase italic whitespace-nowrap leading-none mb-1.5 tracking-tight">
              Caleth Lavado
            </p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
              DEX LIMA SUR
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
