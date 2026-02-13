
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  PieChart as PieChartIcon, 
  ChevronDown,
  Info,
  Target,
  ArrowUpRight,
  TrendingDown,
  Lock,
  UserCheck,
  AlertCircle
} from 'lucide-react';

const ReportsView: React.FC = () => {
  const [selectedQuarter, setSelectedQuarter] = useState('T2');
  const [selectedMonth, setSelectedMonth] = useState('enero');
  const [lostSales, setLostSales] = useState<any[]>([]);

  useEffect(() => {
    // Captura real de los datos guardados en localStorage desde CreateOrderView
    const data = JSON.parse(localStorage.getItem('gerencia_ventas_perdidas') || '[]');
    setLostSales(data);
  }, []);

  const productMix = [
    { name: 'GELATINA ENV...', value: '64% PARTICIPACIÓN', color: 'bg-blue-600' },
    { name: 'REPOSTERIA', value: '19% PARTICIPACIÓN', color: 'bg-slate-400' },
    { name: 'POSTRES', value: '9% PARTICIPACIÓN', color: 'bg-amber-600' },
    { name: 'GELATINA GRA...', value: '5% PARTICIPACIÓN', color: 'bg-emerald-500' },
    { name: 'OTROS', value: '3% PARTICIPACIÓN', color: 'bg-slate-200' },
  ];

  const rebateScales = [
    { cat: 'POSTRES', quota: 'S/ 32,494', saldo1: 'S/ 28,550', esc2: 'S/ 36,718', esc3: 'S/ 38,343' },
    { cat: 'REPOSTERÍA', quota: 'S/ 30,875', saldo1: 'S/ 22,106', esc2: 'S/ 34,889', esc3: 'S/ 36,433' },
    { cat: 'GELATINA 0% AZUCAR', quota: 'S/ 6,636', saldo1: 'S/ 5,100', esc2: 'S/ 7,499', esc3: 'S/ 7,831' },
    { cat: 'REFRESCOS', quota: 'S/ 635', saldo1: 'S/ 635', esc2: 'S/ 717', esc3: 'S/ 749' },
    { cat: 'POSTRES 0% AZUCAR', quota: 'S/ 288', saldo1: 'S/ 288', esc2: 'S/ 326', esc3: 'S/ 340' },
  ];

  const totalLostValue = lostSales.reduce((acc, curr) => acc + curr.lossValue, 0);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-24">
      
      {/* SECCIÓN SUPERIOR: POWER BI COMPLETO */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* SIDEBAR DE FILTROS */}
        <div className="w-full lg:w-64 shrink-0 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
            <div className="mb-10">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">ÚLTIMA COMPRA</p>
              <p className="text-[11px] font-black text-slate-900 uppercase italic">MIÉRCOLES, 21 DE ENERO DE 2026</p>
            </div>
            
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 block italic">TRIMESTRE</label>
                <div className="relative">
                  <select value={selectedQuarter} onChange={(e) => setSelectedQuarter(e.target.value)} className="w-full bg-slate-50/50 border border-slate-100/50 rounded-xl py-3.5 px-4 text-[11px] font-black uppercase italic outline-none appearance-none cursor-pointer text-slate-900">
                    <option value="T1">TRIMESTRE 1 (T1)</option>
                    <option value="T2">TRIMESTRE 2 (T2)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-3 block italic">MES</label>
                <div className="relative">
                  <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="w-full bg-slate-50/50 border border-slate-100/50 rounded-xl py-3.5 px-4 text-[11px] font-black uppercase italic outline-none appearance-none cursor-pointer text-slate-900">
                    <option value="enero">ENERO</option>
                    <option value="febrero">FEBRERO</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#E21F26] rounded-[2.5rem] p-8 text-white shadow-xl shadow-red-100 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-20"><Info size={40} /></div>
             <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mb-6"><Info size={20} /></div>
             <h3 className="text-xl font-black uppercase italic tracking-tighter leading-tight mb-4">REBATE VARIABLE</h3>
             <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed opacity-90">CUMPLE TUS ESCALAS TRIMESTRALES PARA ACCEDER A LAS BONIFICACIONES DE PLANTA.</p>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL DASHBOARD BI */}
        <div className="flex-1 space-y-6">
          
          {/* CUMPLIMIENTO CUOTA GENERAL */}
          <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-4 mb-12">
               <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center"><Target size={24} /></div>
               <h2 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">CUMPLIMIENTO CUOTA GENERAL (ENE)</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
              {[
                { label: 'AÑO 2024', val: 'S/ 107,972', sub: 'CIERRE HISTÓRICO', color: 'text-slate-400' },
                { label: 'AÑO 2025', val: 'S/ 85,187', sub: 'AÑO ANTERIOR', color: 'text-slate-400' },
                { label: 'CUOTA', val: 'S/ 84,019', sub: 'OBJETIVO MENSUAL', color: 'text-blue-600' },
                { label: 'AÑO 2026', val: 'S/ 46,097', sub: 'VENTA ACTUAL', color: 'text-slate-900' },
                { label: 'AVANCE %', val: '55%', sub: 'PROGRESO REAL', color: 'text-emerald-500' },
                { label: 'SALDO FALTANTE', val: 'S/ -37,922', sub: 'POR RECAUDAR', color: 'text-red-500' },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">{stat.label}</p>
                  <p className={`text-xl font-black italic tracking-tighter leading-none ${stat.color}`}>{stat.val}</p>
                  <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-emerald-500 to-emerald-500" style={{ width: '55%' }}></div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            
            {/* MIX DE PRODUCTOS */}
            <div className="xl:col-span-5 bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-3">
                     <PieChartIcon className="text-slate-900" size={20} />
                     <h3 className="text-sm font-black text-slate-900 uppercase italic">MIX DE PRODUCTOS</h3>
                  </div>
                  <ArrowUpRight className="text-emerald-500" size={20} strokeWidth={3} />
               </div>

               <div className="relative w-full max-w-[220px] aspect-square mx-auto flex items-center justify-center mb-10">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#F8FAFC" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#2563EB" strokeWidth="12" strokeDasharray="168, 264" strokeLinecap="round" />
                  </svg>
                  <div className="text-center z-10">
                    <p className="text-5xl font-black italic text-slate-900 leading-none">64%</p>
                    <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest mt-2 italic">LÍDER: GELATINA</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  {productMix.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <div className={`w-3 h-3 rounded-full ${p.color} shrink-0`}></div>
                       <div className="min-w-0">
                          <p className="text-[10px] font-black text-slate-900 uppercase italic truncate leading-none">{p.name}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{p.value}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* ESCALAS REBATE VARIABLE */}
            <div className="xl:col-span-7 bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
               <div className="p-10 pb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <TrendingUp className="text-red-600" size={20} />
                     <h3 className="text-sm font-black text-slate-900 uppercase italic">ESCALAS REBATE VARIABLE (TRIMESTRAL)</h3>
                  </div>
                  <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-slate-900 transition-all"><Download size={18} /></button>
               </div>

               <div className="px-10 flex-1 overflow-x-auto no-scrollbar">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="border-b border-slate-50">
                           <th className="py-6 text-[9px] font-black text-slate-300 uppercase italic">CATEGORÍA</th>
                           <th className="py-6 text-[9px] font-black text-slate-300 uppercase italic">CUOTA</th>
                           <th className="py-6 text-[9px] font-black text-slate-300 uppercase italic">SALDO 1</th>
                           <th className="py-6 text-[9px] font-black text-emerald-500 uppercase italic bg-emerald-50/20 text-center rounded-t-xl px-2">ESCALA 2</th>
                           <th className="py-6 text-[9px] font-black text-amber-600 uppercase italic text-center">ESCALA 3</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {rebateScales.map((item, i) => (
                          <tr key={i} className="group hover:bg-slate-50/50">
                             <td className="py-5 text-[10px] font-black text-slate-900 uppercase italic">{item.cat}</td>
                             <td className="py-5 text-[10px] font-bold text-slate-600 italic">{item.quota}</td>
                             <td className="py-5 text-[10px] font-black text-red-500 italic">{item.saldo1}</td>
                             <td className="py-5 text-[10px] font-black text-emerald-600 italic bg-emerald-50/20 text-center">{item.esc2}</td>
                             <td className="py-5 text-[10px] font-black text-amber-600 italic text-center">{item.esc3}</td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               {/* PROYECCIÓN DE CIERRE PANEL */}
               <div className="m-8 mt-4 bg-[#0F172A] rounded-[2rem] p-8 flex justify-between items-center text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px)' }}></div>
                  <div>
                     <p className="text-[10px] font-black text-red-500 uppercase tracking-widest italic mb-2">PROYECCIÓN DE CIERRE T1</p>
                     <h4 className="text-3xl font-black italic tracking-tighter leading-none">S/ 458,922.00</h4>
                  </div>
                  <div className="text-right">
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic mb-2">POTENCIAL REBATE</p>
                     <p className="text-2xl font-black italic text-emerald-500 leading-none">+ S/ 12,400.00</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN INFERIOR: LOG DE VENTA PERDIDA (FUNCIONAL) */}
      <div className="bg-slate-950 rounded-[4rem] p-12 text-white shadow-3xl relative overflow-hidden border border-white/5 animate-in slide-in-from-bottom-8 duration-1000 delay-200">
         <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Lock size={300} strokeWidth={1} />
         </div>

         <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
               <div className="flex items-center gap-5">
                  <div className="w-20 h-20 bg-red-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-red-900/50 ring-8 ring-white/5">
                     <UserCheck size={40} className="text-white" />
                  </div>
                  <div>
                     <h3 className="text-4xl font-black italic uppercase tracking-tighter">Log de Venta Perdida</h3>
                     <p className="text-[11px] font-black text-red-500 uppercase tracking-[0.4em] mt-2">Área Gerencial - Análisis de Demanda DEX</p>
                  </div>
               </div>
               <div className="bg-white/5 backdrop-blur-xl px-10 py-6 rounded-[2.5rem] border border-white/10 text-center">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 italic">Valor de Oportunidad Detectada</p>
                  <p className="text-4xl font-black italic text-red-500 tracking-tighter">S/ {totalLostValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
               <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white/5 p-10 rounded-[3rem] border border-white/5 flex flex-col items-center text-center">
                     <TrendingDown className="text-red-500 mb-6" size={48} />
                     <h4 className="text-lg font-black uppercase italic mb-3 tracking-widest">GAP de Suministro</h4>
                     <p className="text-xs text-slate-400 font-medium leading-relaxed italic">Este monto representa el interés real de compra declarado por los DEX que el sistema no pudo facturar por quiebre de stock físico.</p>
                  </div>
                  <div className="bg-white p-10 rounded-[3rem] relative overflow-hidden group">
                     <Target className="absolute -bottom-8 -right-8 opacity-10 text-slate-900 group-hover:scale-110 transition-transform duration-700" size={180} />
                     <p className="text-[10px] font-black text-slate-400 uppercase italic mb-2 tracking-widest">Casos de Desabastecimiento</p>
                     <p className="text-3xl font-black italic tracking-tighter leading-none text-slate-900 mb-8">{lostSales.length} Registros Críticos</p>
                     <button className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl">NOTIFICAR A PLANTA/COMPRAS</button>
                  </div>
               </div>

               <div className="lg:col-span-8 bg-white/5 rounded-[3.5rem] border border-white/5 p-10 overflow-hidden flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                     <h4 className="text-sm font-black uppercase italic tracking-widest text-slate-500">Detalle de Intención No Servida</h4>
                     <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-white transition-all"><Download size={14} /> Exportar Auditoría (.XLS)</button>
                  </div>
                  <div className="overflow-x-auto no-scrollbar flex-1">
                     <table className="w-full text-left">
                        <thead>
                           <tr className="border-b border-white/10">
                              <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Orden / Fecha</th>
                              <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest italic">SKU / Producto</th>
                              <th className="pb-6 text-[10px] font-black text-slate-500 uppercase tracking-widest italic text-center">Gap (U.)</th>
                              <th className="pb-6 text-[10px] font-black text-red-500 uppercase tracking-widest italic text-right">Monto Perdido</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                           {lostSales.length === 0 ? (
                             <tr>
                               <td colSpan={4} className="py-24 text-center">
                                  <div className="flex flex-col items-center opacity-30">
                                     <AlertCircle size={48} className="mb-4" />
                                     <p className="text-xs font-black uppercase tracking-[0.4em] italic">No se han registrado quiebres de stock</p>
                                  </div>
                               </td>
                             </tr>
                           ) : (
                             lostSales.map((item, idx) => (
                               <tr key={idx} className="group hover:bg-white/5 transition-all">
                                  <td className="py-7">
                                     <p className="text-[12px] font-black text-slate-200 italic leading-none mb-1">{item.orderId}</p>
                                     <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">{item.date}</p>
                                  </td>
                                  <td className="py-7">
                                     <p className="text-[12px] font-black text-slate-400 uppercase italic truncate max-w-[280px]">{item.product}</p>
                                  </td>
                                  <td className="py-7 text-center"><span className="text-[14px] font-black text-slate-200 italic">{item.lost}</span></td>
                                  <td className="py-7 text-right"><span className="text-[16px] font-black text-red-500 italic tracking-tighter">S/ {item.lossValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span></td>
                               </tr>
                             ))
                           )}
                        </tbody>
                     </table>
                  </div>
                  <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                     <p className="text-[10px] font-bold text-slate-600 italic uppercase">© Inteligencia Comercial Universal SAC 2026</p>
                     <div className="flex items-center gap-3 bg-red-600/10 px-4 py-2 rounded-xl border border-red-600/20">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                        <span className="text-[9px] font-black uppercase italic text-red-500 tracking-widest">Datos Sincronizados con SAP</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
};

export default ReportsView;
