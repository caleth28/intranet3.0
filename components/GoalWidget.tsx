
import React from 'react';
import { Target, Zap, TrendingUp, ArrowUpRight } from 'lucide-react';

const GoalWidget: React.FC = () => {
  const percentage = 83;
  const missingAmount = "12,450.00";
  const quotaTotal = "150K";

  return (
    <div className="u-card p-10 relative overflow-hidden group">
      {/* Elemento Decorativo de Fondo */}
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
         <Target size={200} />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600 shadow-sm">
               <Zap size={20} fill="currentColor" />
            </div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] italic">Estado de Cuota Mensual</span>
          </div>
          
          <div>
            <div className="flex items-baseline gap-2">
              <h4 className="text-7xl font-black text-slate-900 italic tracking-tighter leading-none">
                {percentage}<span className="text-3xl text-red-600">%</span>
              </h4>
            </div>
            <p className="text-sm font-extrabold text-slate-900 mt-4 uppercase italic">
              ¡Estás a un paso del nivel Diamante, Caleth! 🚀
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-end gap-6">
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">CUOTA OBJETIVO</p>
              <div className="bg-slate-900 text-white px-6 py-2 rounded-2xl shadow-xl">
                 <h5 className="text-2xl font-black italic tracking-tighter leading-none">S/ {quotaTotal}</h5>
              </div>
           </div>
           
           <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-4 py-2 rounded-full shadow-sm">
             <TrendingUp size={16} strokeWidth={3} />
             <span className="text-[10px] font-black uppercase tracking-tight">+12% vs ayer</span>
           </div>
        </div>
      </div>

      {/* BARRA DE PROGRESO "CLEAN & IMPACT" */}
      <div className="mt-10 space-y-3">
        <div className="flex justify-between items-end text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
          <span>Progreso Actual</span>
          <span className="text-slate-900">Meta Final</span>
        </div>
        <div className="w-full h-5 bg-slate-50 rounded-full p-1 border border-slate-100 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000 relative shadow-lg"
            style={{ width: `${percentage}%` }}
          >
             <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px)'
             }}></div>
          </div>
        </div>
      </div>

      {/* LLAMADO A LA ACCIÓN / MOTIVACIÓN EXTRA */}
      <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
               <Target size={24} />
            </div>
            <div>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5 italic">RESTA PARA EL BONO MÁXIMO</p>
               <p className="text-xl font-black italic text-slate-900 tracking-tighter leading-none">S/ {missingAmount}</p>
            </div>
         </div>
         <button className="flex items-center gap-3 text-red-600 font-black uppercase italic text-[10px] tracking-widest hover:gap-5 transition-all group">
            VER MI PLAN DE VENTAS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
         </button>
      </div>
    </div>
  );
};

const ArrowRight = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

export default GoalWidget;
