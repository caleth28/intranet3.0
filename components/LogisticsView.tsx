
import React from 'react';
import { Truck, MapPin, Clock, Package, Phone, CheckCircle2, Check, PhoneCall } from 'lucide-react';

const LogisticsView: React.FC = () => {
  const shipments = [
    { 
      id: 'V3X-901', 
      driver: 'JUAN PÉREZ', 
      progress: 65,
    },
    { 
      id: 'A1B-223', 
      driver: 'MARCO TULIO', 
      progress: 15,
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* SECCIÓN SUPERIOR: MAPA Y UNIDADES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* PANEL IZQUIERDO: SEGUIMIENTO EN VIVO */}
        <div className="lg:col-span-8 bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden flex flex-col">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 uppercase italic leading-none mb-2">Seguimiento en Vivo</h2>
              <p className="text-sm text-gray-400 font-bold uppercase tracking-widest italic">Orden actual: DESP-9901</p>
            </div>
            <div className="bg-blue-50 text-blue-500 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center shadow-sm">
              <Truck size={16} className="mr-3" /> EN RUTA
            </div>
          </div>

          {/* Mapa con Estética de las Imágenes */}
          <div className="flex-1 min-h-[450px] bg-slate-50 rounded-[2.5rem] relative overflow-hidden border border-gray-100 group">
             <img 
               src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop" 
               className="w-full h-full object-cover opacity-30 grayscale contrast-125" 
               alt="Mapa Logístico"
             />
             
             {/* Línea de Ruta Punteada (SVG) */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-lg">
                <path 
                  d="M 550 350 Q 400 300 150 180" 
                  stroke="#E21F26" 
                  strokeWidth="4" 
                  fill="none" 
                  strokeDasharray="12,12"
                  className="animate-[dash_20s_linear_infinite]"
                />
             </svg>

             {/* Marcador: Destino (Pin Rojo) */}
             <div className="absolute top-[18%] left-[20%] -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl">
                <div className="relative">
                  <div className="absolute -inset-4 bg-red-500/20 rounded-full animate-ping"></div>
                  <MapPin size={48} className="text-[#E21F26] fill-white" strokeWidth={2.5} />
                </div>
             </div>

             {/* Marcador: Origen (Caja) */}
             <div className="absolute bottom-[25%] right-[30%] drop-shadow-xl bg-white p-3 rounded-xl border border-gray-100">
                <Package size={28} className="text-slate-800" />
             </div>
          </div>
        </div>

        {/* PANEL DERECHO: DETALLE Y ARRIBOS */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* DETALLE DE UNIDADES (DARK MODE) */}
          <div className="bg-[#0F172A] text-white rounded-[3rem] p-10 shadow-2xl flex-1 flex flex-col">
             <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-[#E21F26] mb-10">Detalle de Unidades</h3>
             
             <div className="space-y-12">
               {shipments.map((s, i) => (
                 <div key={i} className="group">
                    <div className="flex justify-between items-center mb-5">
                      <div>
                        <p className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-[#E21F26] transition-colors">{s.id}</p>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{s.driver}</p>
                      </div>
                      <button className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#E21F26] transition-all group/btn">
                        <Phone size={18} className="text-gray-400 group-hover/btn:text-white" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Progreso de entrega</span>
                        <span className="text-xs font-black italic">{s.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#E21F26] shadow-[0_0_10px_rgba(226,31,38,0.5)] transition-all duration-1000 ease-out" 
                          style={{ width: `${s.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    {i === 0 && <div className="mt-12 h-[1px] bg-white/5"></div>}
                 </div>
               ))}
             </div>
          </div>

          {/* PRÓXIMOS ARRIBOS */}
          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm">
             <h3 className="text-xl font-black text-gray-900 uppercase italic mb-8">Próximos Arribos</h3>
             <div className="space-y-5">
                {[1, 2].map((_, i) => (
                  <div key={i} className="flex items-center p-6 bg-[#F8FAFC] rounded-[2rem] group hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-300 shadow-sm mr-6 group-hover:scale-110 transition-transform">
                       <Truck size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-900 uppercase italic tracking-tight">MAÑANA, 09:00 AM</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1">PLANTA HUACHIPA -{'>'} DEX SUR</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN INFERIOR: ETAPAS DEL DESPACHO */}
      <div className="bg-white rounded-[3.5rem] p-12 border border-gray-100 shadow-sm">
         <h3 className="text-2xl font-black text-gray-900 uppercase italic mb-12">Etapas del Despacho</h3>
         
         <div className="flex flex-col md:flex-row justify-between items-center relative gap-12 md:gap-0">
            {/* Línea de conexión de fondo */}
            <div className="hidden md:block absolute top-7 left-10 right-10 h-[2px] bg-gray-50 -z-0"></div>
            
            {[
              { label: 'Pickeado', time: '08:00 AM', status: 'completed' },
              { label: 'Facturado', time: '09:30 AM', status: 'completed' },
              { label: 'En Ruta', time: '11:00 AM', status: 'completed' },
              { label: 'Entrega', time: 'Estimado', status: 'pending' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative z-10 w-full md:w-auto">
                <div className={`
                  w-14 h-14 rounded-full flex items-center justify-center border-[6px] border-white shadow-xl transition-all duration-500
                  ${step.status === 'completed' ? 'bg-[#E21F26] text-white scale-110' : 'bg-[#F1F5F9] text-slate-300'}
                `}>
                  {step.status === 'completed' ? <Check size={24} strokeWidth={4} /> : <Clock size={24} strokeWidth={2.5} />}
                </div>
                <p className="text-xs font-black uppercase italic mt-6 text-gray-900 tracking-tight">{step.label}</p>
                <p className={`text-[10px] font-bold uppercase tracking-widest mt-1.5 ${step.status === 'completed' ? 'text-gray-400' : 'text-slate-300 italic'}`}>
                  {step.time}
                </p>
              </div>
            ))}
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}} />
    </div>
  );
};

export default LogisticsView;
