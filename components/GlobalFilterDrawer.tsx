
import React, { useState } from 'react';
import { X, Filter, Calendar, MapPin, CheckCircle2, RefreshCcw, ArrowRight } from 'lucide-react';

interface GlobalFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalFilterDrawer: React.FC<GlobalFilterDrawerProps> = ({ isOpen, onClose }) => {
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
      {/* Overlay oscuro con desenfoque */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Panel Lateral */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 ease-out flex flex-col">
        
        {/* Header del Filtro */}
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                <Filter size={20} />
             </div>
             <div>
                <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter leading-none">Filtros Avanzados</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Sincronización de Datos BI</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-slate-50 rounded-2xl text-slate-300 hover:text-red-600 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Contenido de Filtros */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">
           
           {/* Rango de Fechas */}
           <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic flex items-center">
                <Calendar size={14} className="mr-2 text-red-600" /> 1. Periodo de Consulta
              </label>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-1">
                    <p className="text-[8px] font-bold text-slate-300 uppercase pl-1 italic">Desde</p>
                    <input type="date" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-red-100" />
                 </div>
                 <div className="space-y-1">
                    <p className="text-[8px] font-bold text-slate-300 uppercase pl-1 italic">Hasta</p>
                    <input type="date" className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-xs font-bold outline-none focus:ring-2 focus:ring-red-100" />
                 </div>
              </div>
           </div>

           {/* Sedes / DEX */}
           <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic flex items-center">
                <MapPin size={14} className="mr-2 text-red-600" /> 2. Sedes / Distribuidoras
              </label>
              <div className="grid grid-cols-2 gap-3">
                 {['Lima Norte', 'Lima Sur', 'Provincia Sur', 'Provincia Norte'].map(dex => (
                    <button key={dex} className="flex items-center gap-2 p-3 bg-slate-50 hover:bg-white hover:ring-2 hover:ring-red-100 rounded-xl transition-all group">
                       <div className="w-4 h-4 rounded border-2 border-slate-200 group-hover:border-red-500 flex items-center justify-center">
                          <div className="w-2 h-2 bg-red-600 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                       </div>
                       <span className="text-[10px] font-black text-slate-600 uppercase italic truncate">{dex}</span>
                    </button>
                 ))}
              </div>
           </div>

           {/* Estados Operativos */}
           <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic flex items-center">
                <CheckCircle2 size={14} className="mr-2 text-red-600" /> 3. Estados Operativos
              </label>
              <div className="space-y-2">
                 {[
                   { id: 'all', label: 'Todos los estados', count: 124 },
                   { id: 'pending', label: 'Pendientes / Revisión', count: 18 },
                   { id: 'approved', label: 'Aprobados / Ruta', count: 42 },
                   { id: 'done', label: 'Entregados / Finalizados', count: 64 },
                 ].map(status => (
                    <button key={status.id} className="w-full flex justify-between items-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                       <span className="text-xs font-black text-slate-900 uppercase italic">{status.label}</span>
                       <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-lg border border-slate-100">{status.count}</span>
                    </button>
                 ))}
              </div>
           </div>

        </div>

        {/* Footer de Acciones */}
        <div className="p-8 bg-slate-900 border-t border-white/5 space-y-4">
           <button 
             onClick={handleApply}
             disabled={isApplying}
             className="w-full bg-red-600 text-white py-5 rounded-[1.8rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-red-900/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 italic"
           >
             {isApplying ? (
               <RefreshCcw size={18} className="animate-spin" />
             ) : (
               <>APLICAR FILTROS BI <ArrowRight size={18} /></>
             )}
           </button>
           <button 
             onClick={onClose}
             className="w-full py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-white transition-colors italic"
           >
             Limpiar todos los campos
           </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalFilterDrawer;
