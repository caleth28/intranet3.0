
import React from 'react';
import { Clock, CheckCircle2, Truck, AlertCircle, ClipboardList } from 'lucide-react';

const OrderStatus: React.FC = () => {
  const myOrders = [
    { id: 'ORD-8821', date: '04 Mar', status: 'en_camino', items: 12 },
    { id: 'ORD-8755', date: '02 Mar', status: 'aprobado', items: 5 },
    { id: 'ORD-8712', date: '28 Feb', status: 'entregado', items: 24 },
  ];

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'en_camino': return { icon: <Truck size={14} />, color: 'text-blue-600', bg: 'bg-blue-50', label: 'En Camino' };
      case 'aprobado': return { icon: <CheckCircle2 size={14} />, color: 'text-green-600', bg: 'bg-green-50', label: 'Aprobado' };
      case 'entregado': return { icon: <Clock size={14} />, color: 'text-gray-500', bg: 'bg-gray-50', label: 'Entregado' };
      default: return { icon: <AlertCircle size={14} />, color: 'text-red-600', bg: 'bg-red-50', label: 'Pendiente' };
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
      <h3 className="text-gray-900 font-bold mb-4 flex items-center">
        <ClipboardList className="mr-2 text-[#E21F26]" size={20} />
        Seguimiento DEX/DIM
      </h3>
      <div className="space-y-4">
        {myOrders.map((order) => {
          const style = getStatusStyle(order.status);
          return (
            <div key={order.id} className="p-3 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-900">{order.id}</span>
                <span className="text-[10px] text-gray-400">{order.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className={`flex items-center px-2 py-1 rounded-full ${style.bg} ${style.color}`}>
                  {style.icon}
                  <span className="ml-1.5 text-[10px] font-bold">{style.label}</span>
                </div>
                <span className="text-[10px] font-medium text-gray-500">{order.items} productos</span>
              </div>
            </div>
          );
        })}
      </div>
      <button className="w-full mt-4 py-2 text-[#E21F26] text-xs font-bold hover:bg-red-50 rounded-xl transition-colors">
        Ver Historial Completo
      </button>
    </div>
  );
};

export default OrderStatus;
