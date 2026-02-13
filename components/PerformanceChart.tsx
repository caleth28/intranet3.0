
import React from 'react';

const PerformanceChart: React.FC = () => {
  return (
    <div className="w-full h-full relative flex flex-col justify-between py-4">
      <div className="flex-1 relative">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
          {/* Grillas sutiles */}
          {[0, 33, 66, 100].map((v) => (
            <line key={v} x1="0" y1={`${v}%`} x2="100%" y2={`${v}%`} stroke="#F1F5F9" strokeWidth="1" />
          ))}

          {/* Gradiente de relleno */}
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
               <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
               <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Área de relleno animada */}
          <path 
            d="M 0 60 Q 50 80, 80 40 T 150 20 T 220 50 T 290 80 T 360 40 T 430 15 T 500 45 L 500 100 L 0 100 Z" 
            fill="url(#chartGrad)"
            className="animate-in fade-in duration-1000"
          />

          {/* Línea de tendencia principal */}
          <path 
            d="M 0 60 Q 50 80, 80 40 T 150 20 T 220 50 T 290 80 T 360 40 T 430 15 T 500 45" 
            fill="none" 
            stroke="#10B981" 
            strokeWidth="5" 
            strokeLinecap="round"
            className="animate-in slide-in-from-left duration-1000"
          />

          {/* Nodos de datos con efectos de pulsación */}
          {[20, 45, 65, 85].map((pos, idx) => (
             <g key={idx}>
                <circle cx={`${pos}%`} cy={`${Math.random() * 60 + 20}%`} r="6" fill="#10B981" stroke="white" strokeWidth="3" className="shadow-xl" />
                {idx === 3 && <circle cx={`${pos}%`} cy="30%" r="12" fill="#10B981" className="animate-ping opacity-20" />}
             </g>
          ))}
        </svg>

        {/* Simulación de Tooltip BI */}
        <div className="absolute top-10 left-[75%] bg-slate-950 text-white p-4 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100 border border-white/10">
           <p className="text-[9px] font-black uppercase text-red-500 tracking-widest mb-1 italic">HOY 10:45 AM</p>
           <p className="text-xl font-black italic">S/ 12,450.00</p>
           <div className="h-1 w-full bg-emerald-500 mt-2 rounded-full"></div>
        </div>
      </div>
      
      {/* Eje X */}
      <div className="flex justify-between mt-12 px-6">
         {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'HOY'].map(day => (
           <span key={day} className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">{day}</span>
         ))}
      </div>
    </div>
  );
};

export default PerformanceChart;
