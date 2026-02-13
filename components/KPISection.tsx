
import React from 'react';
import { TrendingUp, Truck, AlertCircle, Package } from 'lucide-react';

const KPISection: React.FC = () => {
  const stats = [
    {
      label: 'VENTAS ACUMULADAS',
      value: 'S/ 124,500',
      sub: '+15% VS MES ANTERIOR',
      icon: <TrendingUp size={20} />,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'PEDIDOS EN TRÁNSITO',
      value: '08',
      sub: 'PRÓXIMA ENTREGA: MAÑANA',
      icon: <Truck size={20} />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'ALERTAS DE STOCK',
      value: '04',
      sub: 'SKUS CON BAJO INVENTARIO',
      icon: <AlertCircle size={20} />,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      label: 'CUMPLIMIENTO DIM',
      value: '96%',
      sub: 'NIVEL DE SERVICIO ACTUAL',
      icon: <Package size={20} />,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div key={i} className="u-card p-8 flex items-center gap-6">
          <div className={`w-14 h-14 ${s.bgColor} rounded-2xl flex items-center justify-center ${s.color} shrink-0`}>
            {s.icon}
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
            <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">{s.value}</h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{s.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPISection;
