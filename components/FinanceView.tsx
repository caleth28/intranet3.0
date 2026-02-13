
import React from 'react';
import { CreditCard, FileText, Download, TrendingUp, AlertCircle, Banknote, Landmark } from 'lucide-react';

const FinanceView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Resumen de Crédito */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10">
              <CreditCard size={120} />
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-2">Línea de Crédito Total</p>
           <h3 className="text-4xl font-black italic uppercase">S/ 250,000</h3>
           <div className="mt-8 space-y-4">
              <div className="flex justify-between text-xs font-bold">
                 <span className="text-gray-400">Utilizado (60%)</span>
                 <span>S/ 150,000</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-red-600" style={{ width: '60%' }}></div>
              </div>
           </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
           <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6">
              <AlertCircle size={24} />
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Próximo Vencimiento</p>
           <h3 className="text-2xl font-black text-gray-900 uppercase italic">15 DIC, 2025</h3>
           <p className="text-sm font-bold text-red-600 mt-2 uppercase tracking-tighter">Monto a pagar: S/ 12,450.00</p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
           <div>
             <h3 className="text-sm font-black text-gray-900 uppercase italic mb-4 flex items-center">
               <Landmark size={18} className="mr-2 text-blue-600" /> Cuentas para Depósito
             </h3>
             <div className="space-y-3">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                   <span className="text-[10px] font-black uppercase text-gray-500">BCP Soles</span>
                   <span className="text-xs font-bold text-gray-900">191-2233445-0-91</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                   <span className="text-[10px] font-black uppercase text-gray-500">BBVA Soles</span>
                   <span className="text-xs font-bold text-gray-900">0011-0901-01000223</span>
                </div>
             </div>
           </div>
        </div>
      </div>

      {/* Listado de Facturas */}
      <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
         <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black text-gray-900 uppercase italic">Facturación Reciente</h3>
            <button className="text-xs font-black uppercase tracking-widest text-red-600 border border-red-100 px-6 py-2 rounded-xl hover:bg-red-50 transition-all">
               Descargar Historial Anual
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-gray-100">
                     <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Nro Factura</th>
                     <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Fecha Emisión</th>
                     <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Monto</th>
                     <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Estado</th>
                     <th className="pb-6 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Acciones</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {[
                    { nro: 'F001-002231', date: '04 Dic, 2025', amount: 'S/ 4,500.20', status: 'Pagado', color: 'text-emerald-600 bg-emerald-50' },
                    { nro: 'F001-002232', date: '01 Dic, 2025', amount: 'S/ 12,450.00', status: 'Pendiente', color: 'text-orange-600 bg-orange-50' },
                    { nro: 'F001-002233', date: '28 Nov, 2025', amount: 'S/ 8,900.00', status: 'Vencido', color: 'text-red-600 bg-red-50' },
                  ].map((fact, i) => (
                    <tr key={i} className="group hover:bg-gray-50/50 transition-all">
                       <td className="py-6 text-sm font-black text-gray-900 italic uppercase">{fact.nro}</td>
                       <td className="py-6 text-sm font-medium text-gray-500">{fact.date}</td>
                       <td className="py-6 text-sm font-black text-gray-900">{fact.amount}</td>
                       <td className="py-6">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${fact.color}`}>
                             {fact.status}
                          </span>
                       </td>
                       <td className="py-6 text-right">
                          <div className="flex justify-end space-x-2">
                             <button className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                                <FileText size={16} />
                             </button>
                             <button className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                                <Download size={16} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default FinanceView;
