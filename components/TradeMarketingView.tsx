
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  MessageSquare,
  ArrowRight,
  Zap,
  Tag,
  Loader2,
  X,
  Edit2,
  Trash2,
  Lock,
  Calendar
} from 'lucide-react';

interface TradeRequest {
  id: string;
  type: 'Degustación' | 'Promotoría' | 'Impulsación';
  product: string;
  location: string;
  dexDate: string;
  mktDate: string | null;
  status: 'Pendiente' | 'Programado' | 'Bajo Revisión' | 'Finalizado';
  assigned: string;
}

const TradeMarketingView: React.FC = () => {
  const [requests, setRequests] = useState<TradeRequest[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'Degustación' | 'Promotoría' | 'Impulsación'>('Degustación');
  const [product, setProduct] = useState('Flan Universal Vainilla');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [days, setDays] = useState(2);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('trade_requests') || '[]');
    if (saved.length === 0) {
      const initial: TradeRequest[] = [
        { 
          id: 'TR-2025-001', 
          type: 'Degustación', 
          product: 'Flan Universal Vainilla', 
          location: 'Mercado Central - Puesto 45',
          dexDate: '2025-12-20',
          mktDate: '2025-12-21',
          status: 'Programado',
          assigned: 'Elena R. (Promotora)'
        }
      ];
      setRequests(initial);
      localStorage.setItem('trade_requests', JSON.stringify(initial));
    } else {
      setRequests(saved);
    }
  }, []);

  const handleEdit = (req: TradeRequest) => {
    if (req.status === 'Programado' || req.status === 'Finalizado') return;
    setEditingId(req.id);
    setSelectedType(req.type);
    setProduct(req.product);
    setLocation(req.location);
    setDate(req.dexDate);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    const req = requests.find(r => r.id === id);
    if (req?.status === 'Programado' || req?.status === 'Finalizado') {
       alert("Esta solicitud ya está programada y no puede ser eliminada.");
       return;
    }
    
    if (confirm("¿Estás seguro de eliminar esta solicitud de apoyo?")) {
      const updated = requests.filter(r => r.id !== id);
      setRequests(updated);
      localStorage.setItem('trade_requests', JSON.stringify(updated));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !date) return;

    setIsSending(true);
    
    setTimeout(() => {
      let updated: TradeRequest[];
      
      if (editingId) {
        updated = requests.map(r => r.id === editingId ? {
          ...r,
          type: selectedType,
          product,
          location,
          dexDate: date,
          status: 'Pendiente'
        } : r);
      } else {
        const newRequest: TradeRequest = {
          id: `TR-2025-${Math.floor(100 + Math.random() * 900)}`,
          type: selectedType,
          product,
          location,
          dexDate: date,
          mktDate: null,
          status: 'Pendiente',
          assigned: 'Por asignar'
        };
        updated = [newRequest, ...requests];
      }

      setRequests(updated);
      localStorage.setItem('trade_requests', JSON.stringify(updated));
      
      setIsSending(false);
      setShowSuccess(true);
      setEditingId(null);
      
      setLocation('');
      setDate('');
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setLocation('');
    setDate('');
    setSelectedType('Degustación');
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Programado': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Pendiente': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Finalizado': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  return (
    <div className="animate-in fade-in duration-700 space-y-8 pb-20">
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 uppercase italic leading-none mb-2 tracking-tighter">ACTIVACIONES TRADE</h2>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.15em]">Sincronización DEX & Marketing Central</p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
           <div className="px-6 py-2 border-r border-slate-50 text-center">
              <p className="text-[9px] font-black text-slate-400 uppercase italic">Ejecutadas</p>
              <p className="text-lg font-black text-slate-900 leading-none">24</p>
           </div>
           <div className="px-6 py-2 text-center">
              <p className="text-[9px] font-black text-red-500 uppercase italic">Pendientes</p>
              <p className="text-lg font-black text-slate-900 leading-none">{requests.filter(r => r.status === 'Pendiente').length}</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
        <div className="xl:col-span-7 space-y-6">
          <div className="bg-white rounded-[3.5rem] p-10 border border-gray-100 shadow-sm min-h-[700px]">
             <div className="flex justify-between items-center mb-12">
                <h3 className="text-sm font-black text-slate-900 uppercase italic tracking-widest flex items-center">
                  <Clock size={18} className="mr-2 text-red-600" /> Historial de Requerimientos
                </h3>
             </div>

             <div className="space-y-6">
                {requests.length === 0 ? (
                  <div className="py-20 text-center opacity-20 flex flex-col items-center">
                     <Zap size={60} strokeWidth={1} className="mb-4" />
                     <p className="text-xs font-black uppercase italic tracking-widest">No hay solicitudes activas</p>
                  </div>
                ) : (
                  requests.map((req) => {
                    const isLocked = req.status === 'Programado' || req.status === 'Finalizado';
                    return (
                      <div key={req.id} className={`p-8 bg-slate-50/50 rounded-[2.8rem] border transition-all duration-500 group relative overflow-hidden ${
                        editingId === req.id ? 'border-red-600 bg-white shadow-2xl ring-2 ring-red-50' : 'border-transparent hover:border-red-100 hover:bg-white hover:shadow-2xl'
                      }`}>
                         <div className="flex flex-col md:flex-row justify-between gap-8">
                            <div className="flex gap-8">
                               <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center shrink-0 shadow-lg ${
                                 req.type === 'Degustación' ? 'bg-blue-600 text-white' : 
                                 req.type === 'Impulsación' ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'
                               }`}>
                                  {req.type === 'Degustación' ? <Users size={32} /> : req.type === 'Impulsación' ? <Zap size={32} /> : <Tag size={32} />}
                               </div>
                               <div className="min-w-0">
                                  <div className="flex items-center gap-3 mb-2">
                                     <p className="text-[11px] font-black text-slate-300 uppercase tracking-widest italic">{req.id} • <span className="text-slate-500">{req.type}</span></p>
                                     {isLocked && <Lock size={12} className="text-slate-300" />}
                                  </div>
                                  <h4 className="text-2xl font-black text-slate-900 uppercase italic leading-tight truncate mb-3 group-hover:text-red-600 transition-colors">{req.product}</h4>
                                  <div className="flex items-center gap-4">
                                     <span className="flex items-center text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                                        <MapPin size={14} className="mr-2 text-red-600" /> {req.location}
                                     </span>
                                  </div>
                               </div>
                            </div>

                            <div className="flex flex-col md:items-end justify-between">
                               <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase italic border shadow-sm ${getStatusBadge(req.status)}`}>
                                  {req.status}
                               </span>
                               <div className="flex items-center gap-5 mt-6 bg-white p-3 rounded-2xl border border-slate-50 shadow-sm">
                                  <div className="text-right">
                                     <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest italic leading-none mb-1.5">Fecha DEX</p>
                                     <p className="text-xs font-black italic text-slate-900 leading-none">{req.dexDate}</p>
                                  </div>
                               </div>
                            </div>
                         </div>
                         
                         <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-[11px] font-black text-slate-500 italic border-2 border-white shadow-sm overflow-hidden">
                                 {req.assigned === 'Por asignar' ? <Clock size={16} /> : req.assigned[0]}
                               </div>
                               <div>
                                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Responsable Asignado</p>
                                  <p className="text-xs font-bold text-slate-900 italic">{req.assigned}</p>
                               </div>
                            </div>

                            <div className="flex items-center gap-2">
                               <button 
                                 onClick={() => handleEdit(req)}
                                 disabled={isLocked}
                                 className={`p-3 rounded-xl transition-all ${isLocked ? 'text-slate-200 cursor-not-allowed bg-slate-50' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50 bg-white shadow-sm border border-slate-100'}`}
                                 title={isLocked ? "Ya programado" : "Editar Solicitud"}
                               >
                                  <Edit2 size={16} />
                               </button>
                               <button 
                                 onClick={() => handleDelete(req.id)}
                                 disabled={isLocked}
                                 className={`p-3 rounded-xl transition-all ${isLocked ? 'text-slate-200 cursor-not-allowed bg-slate-50' : 'text-slate-400 hover:text-red-600 hover:bg-red-50 bg-white shadow-sm border border-slate-100'}`}
                                 title={isLocked ? "Ya programado" : "Eliminar Solicitud"}
                               >
                                  <Trash2 size={16} />
                               </button>
                               <div className="w-[1px] h-6 bg-slate-100 mx-2"></div>
                               <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase italic hover:bg-red-600 transition-all flex items-center shadow-lg shadow-slate-100 group/chat">
                                  Chat MKT <MessageSquare size={14} className="ml-2 group-hover/chat:translate-x-1 transition-transform" />
                               </button>
                            </div>
                         </div>
                      </div>
                    );
                  })
                )}
             </div>
          </div>
        </div>

        <div className="xl:col-span-5 space-y-8 sticky top-28">
           <div className={`rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden transition-all duration-500 ${editingId ? 'bg-blue-900 ring-4 ring-blue-500/20' : 'bg-slate-900'}`}>
              {showSuccess && (
                <div className="absolute inset-0 z-50 bg-emerald-600 flex flex-col items-center justify-center p-10 text-center animate-in fade-in duration-300">
                   <CheckCircle2 size={80} className="mb-6 animate-bounce" />
                   <h3 className="text-3xl font-black italic uppercase leading-tight mb-2">
                     {editingId ? 'Cambios Guardados' : 'Solicitud Enviada'}
                   </h3>
                   <p className="text-sm font-bold uppercase tracking-widest opacity-80">Marketing ha sido notificado.</p>
                </div>
              )}

              <div className="absolute -top-10 -right-10 opacity-5">
                 {editingId ? <Edit2 size={250} /> : <Zap size={250} />}
              </div>

              <div className="flex justify-between items-center mb-10">
                 <h3 className="text-sm font-black uppercase tracking-[0.3em] italic text-red-500 flex items-center">
                   {editingId ? <Edit2 size={20} className="mr-3 text-blue-400" /> : <Plus size={20} className="mr-3" />}
                   {editingId ? `Editando Ticket ${editingId}` : 'Crear Nueva Activación'}
                 </h3>
                 {editingId && (
                   <button 
                     onClick={cancelEdit}
                     className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
                   >
                     <X size={18} />
                   </button>
                 )}
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] block italic">1. Seleccionar Modalidad</label>
                    <div className="grid grid-cols-3 gap-4">
                       {[
                         { id: 'Degustación', icon: <Users size={20} /> },
                         { id: 'Promotoría', icon: <Tag size={20} /> },
                         { id: 'Impulsación', icon: <Zap size={20} /> }
                       ].map(cat => (
                         <button 
                           type="button"
                           key={cat.id} 
                           onClick={() => setSelectedType(cat.id as any)}
                           className={`flex flex-col items-center p-4 rounded-3xl border transition-all group ${
                             selectedType === cat.id 
                             ? 'bg-red-600 border-red-600 shadow-xl shadow-red-900/40' 
                             : 'bg-white/5 border-white/10 hover:border-white/30'
                           }`}
                         >
                            <div className={`${selectedType === cat.id ? 'text-white' : 'text-slate-500 group-hover:text-white'} transition-colors mb-3`}>
                               {cat.icon}
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest italic">{cat.id}</span>
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] block italic">2. Producto Foco</label>
                       <select 
                         value={product}
                         onChange={(e) => setProduct(e.target.value)}
                         className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] py-4 px-5 text-sm font-bold outline-none italic transition-all focus:border-red-500"
                       >
                          <option className="bg-slate-900 text-white">Flan Universal Vainilla</option>
                          <option className="bg-slate-900 text-white">Gelatina Fresa 500g</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] block italic">3. Lugar / Punto</label>
                       <input 
                          type="text" 
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Ej: Mercado Sur Puesto 10"
                          className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] py-4 px-5 text-sm font-bold outline-none italic placeholder:text-slate-700 transition-all focus:border-red-500"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] block italic">4. Fecha Propuesta</label>
                       <div className="relative">
                          <input 
                            type="date" 
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-[1.2rem] py-4 px-5 text-sm font-bold outline-none italic transition-all focus:border-red-500" 
                          />
                          <Calendar size={16} className="absolute right-5 top-1/2 -translate-y-1/2 opacity-20" />
                       </div>
                    </div>
                 </div>

                 <div className="flex flex-col gap-4">
                    <button 
                      type="submit"
                      disabled={isSending}
                      className={`w-full py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center group/btn relative overflow-hidden ${
                        isSending ? 'bg-slate-700 cursor-not-allowed' : (editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-red-600 hover:bg-red-700 shadow-red-900/50 italic')
                      }`}
                    >
                       {isSending ? (
                         <>
                           <Loader2 size={20} className="mr-3 animate-spin" /> SINCRONIZANDO...
                         </>
                       ) : (
                         <>
                           {editingId ? 'Guardar Cambios Ticket' : 'Enviar a Marketing TRADE'} 
                           <ArrowRight size={18} className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
                         </>
                       )}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TradeMarketingView;
