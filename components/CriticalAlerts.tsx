
import React from 'react';
import { Package, ArrowRight, AlertTriangle } from 'lucide-react';

const CriticalAlerts: React.FC = () => {
  return (
    <div className="bg-[#E21F26] rounded-[3.5rem] p-10 text-white shadow-2xl shadow-red-200 relative overflow-hidden flex flex-col justify-between h-[300px] group">
      {/* Elemento decorativo de fondo */}
      <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
         <AlertTriangle size={250} strokeWidth={1} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] italic">ALERTAS CRÍTICAS</h3>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex items-center gap-5 hover:bg-white/20 transition-all cursor-default">
           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-red-900/20">
              <Package size={20} className="text-[#E21F26]" />
           </div>
           <div>
              <p className="text-[11px] font-black uppercase italic leading-tight">
                QUIEBRE DE STOCK: GELATINA FRESA 500G
              </p>
              <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest mt-1">LOTE 22-SUR • HUACHIPA</p>
           </div>
        </div>
      </div>

      <button className="w-full py-5 bg-white text-[#E21F26] rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest italic hover:bg-slate-900 hover:text-white transition-all shadow-xl flex items-center justify-center group/btn relative z-10">
        VER TODAS LAS ALERTAS <ArrowRight size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default CriticalAlerts;
