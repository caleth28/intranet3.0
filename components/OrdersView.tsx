
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Eye,
  Edit2,
  Trash2
} from 'lucide-react';
import CreateOrderView from './CreateOrderView';
import OrderDetailView from './OrderDetailView';

const OrdersView: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const rawData = localStorage.getItem('dex_orders');
    
    // Solo cargamos mocks si no hay NADA en storage (primera vez).
    // Si hay una lista vacía "[]", significa que el usuario borró todo.
    if (rawData === null) {
      const mockOrders = [
        { id: '102', client: 'MANCINI SALAZAR CARLOS ALBERTO', date: '22/05/2025 09:15 AM', status: 'Pendiente', total: 'S/ 1,250.00', items: '15 UND', observations: 'Pedido de prueba editable' },
        { id: '6', client: 'MANCINI SALAZAR CARLOS ALBERTO', date: '16/07/2024 03:23 PM', status: 'En Proceso', total: 'S/ 68.10', items: '12 UND', observations: 'Entrega prioritaria' },
        { id: '5', client: 'MANCINI SALAZAR CARLOS ALBERTO', date: '16/07/2024 10:26 AM', status: 'Aprobado', total: 'S/ 5,869.32', items: '22 UND' },
      ];
      setOrders(mockOrders);
      localStorage.setItem('dex_orders', JSON.stringify(mockOrders));
    } else {
      setOrders(JSON.parse(rawData));
    }
  };

  const getStatusStyle = (status: string) => {
    switch(status.toLowerCase()) {
      case 'pendiente': return 'bg-orange-50 text-orange-500 border-orange-100';
      case 'en proceso': return 'bg-blue-50 text-blue-500 border-blue-100';
      case 'aprobado': return 'bg-emerald-50 text-emerald-500 border-emerald-100';
      default: return 'bg-gray-50 text-gray-400 border-gray-100';
    }
  };

  const handleDeleteOrder = (id: string) => {
    if (window.confirm(`¿Estás seguro de eliminar permanentemente el pedido #${id}?`)) {
      setOrders(prevOrders => {
        const updated = prevOrders.filter(o => String(o.id) !== String(id));
        // Guardar en storage inmediatamente después de filtrar
        localStorage.setItem('dex_orders', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleEditOrder = (order: any) => {
    setEditingOrder(order);
    setIsCreating(true);
  };

  if (isCreating) {
    return (
      <CreateOrderView 
        onBack={() => {
          setIsCreating(false);
          setEditingOrder(null);
          loadOrders(); 
        }} 
        editOrder={editingOrder}
      />
    );
  }

  if (selectedOrder) {
    return <OrderDetailView order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

  const filteredOrders = orders.filter(o => 
    String(o.id).toLowerCase().includes(searchTerm.toLowerCase()) || 
    String(o.client).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      
      {/* KPIs SUPERIORES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Solicitudes', value: orders.length, color: 'text-gray-900', bg: 'bg-white' },
          { label: 'En Proceso', value: orders.filter(o => o.status === 'En Proceso').length, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Pendientes', value: orders.filter(o => o.status === 'Pendiente').length, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Cupo Disponible', value: 'S/ 180k', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        ].map((stat, idx) => (
          <div key={idx} className={`${stat.bg} p-8 rounded-[2.5rem] border border-gray-100 shadow-sm transition-transform hover:scale-105 duration-300`}>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <p className={`text-4xl font-black ${stat.color} italic leading-none`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
        {/* HEADER DE TABLA */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase italic leading-none mb-3">Historial de Pedidos DEX</h2>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Gestión técnica de órdenes PEUSAC.</p>
          </div>
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center px-10 py-5 bg-[#E21F26] text-white rounded-[1.8rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-red-100 hover:bg-red-700 active:scale-95 transition-all"
          >
            <Plus size={18} className="mr-3" /> Nuevo Pedido
          </button>
        </div>

        {/* BUSCADOR */}
        <div className="relative mb-10 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-500 transition-colors" size={20} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por ID o Cliente..."
            className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-transparent rounded-[2rem] text-sm font-medium outline-none focus:bg-white focus:border-red-100 transition-all"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Cliente</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Fecha</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Estado</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Total</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="group hover:bg-red-50/30 transition-all">
                  <td className="px-6 py-6 text-sm font-black text-gray-900 italic">#{order.id}</td>
                  <td className="px-6 py-6 text-sm font-black text-gray-900 uppercase italic truncate max-w-[200px]">{order.client}</td>
                  <td className="px-6 py-6 text-xs font-bold text-gray-400">{order.date}</td>
                  <td className="px-6 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-sm font-black text-gray-900 italic">{order.total}</td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelectedOrder(order)} className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-blue-500 hover:border-blue-100 transition-all shadow-sm">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleEditOrder(order)} className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-emerald-500 hover:border-emerald-100 transition-all shadow-sm">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteOrder(order.id)} className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredOrders.length === 0 && (
            <div className="py-20 text-center text-gray-300">
               <p className="text-sm font-black uppercase tracking-widest italic">No se encontraron pedidos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersView;
