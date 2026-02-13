
import React from 'react';
import { MessageSquareText, Send, HelpCircle, PhoneCall } from 'lucide-react';

const SupportView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-right-4 duration-500">
      <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl">
        <div className="bg-[#E21F26] p-8 text-white">
          <h2 className="text-3xl font-black mb-2 flex items-center">
            <MessageSquareText className="mr-3" size={32} />
            Centro de Soporte Operativo
          </h2>
          <p className="text-white/80">Olvídate de WhatsApp. Envía tus requerimientos aquí y recibe seguimiento formal.</p>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Tipo de Incidencia</label>
              <select className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-red-100 transition-all text-sm font-medium">
                <option>Error en SKU de Pedido</option>
                <option>Problema con Despacho / Logística</option>
                <option>Solicitud de Acceso a Marketing</option>
                <option>Reporte de Producto Dañado</option>
                <option>Otros</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Descripción Detallada</label>
              <textarea 
                rows={5}
                placeholder="Explica tu requerimiento con el mayor detalle posible..."
                className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 outline-none focus:ring-2 focus:ring-red-100 transition-all text-sm resize-none"
              ></textarea>
            </div>

            <button className="w-full bg-[#E21F26] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200 flex items-center justify-center space-x-2">
              <Send size={18} />
              <span>Enviar Requerimiento</span>
            </button>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                <PhoneCall size={18} className="mr-2 text-red-600" />
                Línea Directa
              </h4>
              <p className="text-xs text-gray-500 mb-4">Solo para emergencias logísticas críticas:</p>
              <p className="text-lg font-black text-gray-900">+51 987 654 321</p>
              <p className="text-[10px] text-gray-400 mt-1">Horario: L-V 08:00 - 18:00</p>
            </div>

            <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                <HelpCircle size={18} className="mr-2" />
                FAQs
              </h4>
              <p className="text-xs text-blue-700">Revisa las preguntas frecuentes antes de abrir un ticket.</p>
              <button className="mt-3 text-[10px] font-black uppercase text-blue-900 hover:underline">Ir a Base de Conocimiento</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportView;
