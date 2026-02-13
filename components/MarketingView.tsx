
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Download, 
  FileText, 
  Search,
  ImageIcon, 
  Video, 
  FolderOpen, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Package,
  ArrowRight,
  Trash2,
  LayoutGrid,
  Loader2,
  Edit2,
  X,
  History
} from 'lucide-react';

interface Material {
  id: string;
  name: string;
  type: string;
  image: string;
  stockAvailable: number;
}

interface MaterialRequest {
  id: string;
  date: string;
  items: { id: string, name: string, qty: number }[];
  reason: string;
  status: 'Pendiente' | 'Evaluando' | 'Aprobado' | 'Despachado' | 'Entregado';
}

const MarketingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'files' | 'materials'>('files');
  const [materialsSubTab, setMaterialsSubTab] = useState<'catalog' | 'history'>('catalog');
  
  const [selectedMaterials, setSelectedMaterials] = useState<{ [key: string]: number }>({});
  const [requests, setRequests] = useState<MaterialRequest[]>([]);
  const [reason, setReason] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [materialSearch, setMaterialSearch] = useState('');

  const materials: Material[] = [
    { id: 'M-001', name: 'Cuadernos Universal Premium', type: 'Librería', stockAvailable: 500, image: '' },
    { id: 'M-002', name: 'Almanaques de Pared 2025', type: 'Publicidad', stockAvailable: 1200, image: '' },
    { id: 'M-003', name: 'Lapiceros Tinta Gel Universal', type: 'Librería', stockAvailable: 3000, image: '' },
    { id: 'M-004', name: 'Mandiles para Impulsadoras', type: 'Textil', stockAvailable: 85, image: '' },
    { id: 'M-005', name: 'Gorras Corporativas Rojas', type: 'Textil', stockAvailable: 150, image: '' },
  ];

  const filteredMaterials = useMemo(() => {
    return materials.filter(m => 
      m.name.toLowerCase().includes(materialSearch.toLowerCase()) || 
      m.type.toLowerCase().includes(materialSearch.toLowerCase())
    );
  }, [materialSearch]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('mkt_material_requests') || '[]');
    if (saved.length === 0) {
      const mock: MaterialRequest[] = [
        { 
          id: 'REQ-MKT-901', 
          date: '05/12/2025', 
          items: [{ id: 'M-001', name: 'Cuadernos Universal Premium', qty: 50 }], 
          reason: 'Fidelización de clientes zona norte',
          status: 'Aprobado'
        }
      ];
      setRequests(mock);
      localStorage.setItem('mkt_material_requests', JSON.stringify(mock));
    } else {
      setRequests(saved);
    }
  }, []);

  const handleUpdateQty = (id: string, delta: number) => {
    setSelectedMaterials(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleEditRequest = (req: MaterialRequest) => {
    if (req.status !== 'Pendiente') return;
    
    setEditingId(req.id);
    setReason(req.reason);
    const newSelected: { [key: string]: number } = {};
    req.items.forEach(item => {
      newSelected[item.id] = item.qty;
    });
    setSelectedMaterials(newSelected);
    setMaterialsSubTab('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSelectedMaterials({});
    setReason('');
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(selectedMaterials).length === 0 || !reason) return;

    setIsSending(true);
    setTimeout(() => {
      let updated: MaterialRequest[];
      
      if (editingId) {
        updated = requests.map(r => r.id === editingId ? {
          ...r,
          reason,
          items: Object.entries(selectedMaterials).map(([id, qty]) => ({
            id,
            name: materials.find(m => m.id === id)?.name || id,
            qty: qty as number
          }))
        } : r);
      } else {
        const newReq: MaterialRequest = {
          id: `REQ-MKT-${Math.floor(100 + Math.random() * 899)}`,
          date: new Date().toLocaleDateString('es-ES'),
          items: Object.entries(selectedMaterials).map(([id, qty]) => ({
            id,
            name: materials.find(m => m.id === id)?.name || id,
            qty: qty as number
          })),
          reason,
          status: 'Pendiente'
        };
        updated = [newReq, ...requests];
      }

      setRequests(updated);
      localStorage.setItem('mkt_material_requests', JSON.stringify(updated));
      
      setSelectedMaterials({});
      setReason('');
      setEditingId(null);
      setIsSending(false);
      setMaterialsSubTab('history');
    }, 1500);
  };

  const handleDeleteRequest = (id: string) => {
    if (!confirm('¿Seguro que deseas anular esta solicitud?')) return;
    const updated = requests.filter(r => r.id !== id);
    setRequests(updated);
    localStorage.setItem('mkt_material_requests', JSON.stringify(updated));
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Pendiente': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Evaluando': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Aprobado': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Despachado': return 'bg-purple-50 text-purple-600 border-purple-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 uppercase italic leading-none mb-2 tracking-tighter">Marketing Hub</h2>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.15em]">Recursos Digitales & Logística POP</p>
        </div>
        
        <div className="flex p-1.5 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm">
           <button 
             onClick={() => setActiveTab('files')}
             className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'files' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
           >
             Recursos Digitales
           </button>
           <button 
             onClick={() => setActiveTab('materials')}
             className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'materials' ? 'bg-red-600 text-white shadow-lg shadow-red-100' : 'text-slate-400 hover:text-red-600'}`}
           >
             Solicitud de Materiales
           </button>
        </div>
      </div>

      {activeTab === 'files' ? (
        <div className="animate-in slide-in-from-left-4 duration-500 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Fotografías HD', count: 124, icon: <ImageIcon className="text-blue-500" />, bg: 'bg-blue-50' },
                { name: 'Manuales de Marca', count: 12, icon: <FileText className="text-red-500" />, bg: 'bg-red-50' },
                { name: 'Fichas Técnicas', count: 85, icon: <FolderOpen className="text-yellow-500" />, bg: 'bg-yellow-50' },
                { name: 'Spots Video', count: 8, icon: <Video className="text-purple-500" />, bg: 'bg-purple-50' },
              ].map((cat) => (
                <div key={cat.name} className="p-8 bg-white rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-xl transition-all cursor-pointer group">
                  <div className={`w-14 h-14 ${cat.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-black text-slate-900 uppercase italic tracking-tighter mb-1">{cat.name}</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{cat.count} archivos</p>
                </div>
              ))}
           </div>

           <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 uppercase italic mb-8 flex items-center">
                 <Clock size={20} className="mr-3 text-red-600" /> Archivos Recientes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Brochure Postres Q4 2025', size: '12.4 MB', type: 'PDF' },
                  { name: 'Banner Redes Sociales - Verano', size: '4.8 MB', type: 'JPG' },
                  { name: 'Manual Impulsadoras v2.1', size: '2.1 MB', type: 'PDF' },
                  { name: 'Video Promocional Gelatinas', size: '45.0 MB', type: 'MP4' },
                ].map((file, i) => (
                  <div key={i} className="flex items-center p-6 bg-slate-50 rounded-[2rem] group hover:bg-white hover:border-red-100 border border-transparent transition-all">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-[10px] text-slate-400 shadow-sm">
                      {file.type}
                    </div>
                    <div className="ml-5 flex-1">
                      <h4 className="text-sm font-black text-slate-900 uppercase italic leading-tight mb-1">{file.name}</h4>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{file.size} • Actualizado hoy</p>
                    </div>
                    <button className="p-3 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                      <Download size={20} />
                    </button>
                  </div>
                ))}
              </div>
           </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
           <div className="flex gap-4">
              <button 
                onClick={() => setMaterialsSubTab('catalog')}
                className={`flex items-center px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${materialsSubTab === 'catalog' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
              >
                <LayoutGrid size={16} className="mr-2" /> Catálogo POP
              </button>
              <button 
                onClick={() => setMaterialsSubTab('history')}
                className={`flex items-center px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${materialsSubTab === 'history' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'}`}
              >
                <History size={16} className="mr-2" /> Mis Requerimientos
                {requests.filter(r => r.status === 'Pendiente').length > 0 && (
                   <span className="ml-2 w-4 h-4 bg-red-600 text-white text-[8px] flex items-center justify-center rounded-full">
                     {requests.filter(r => r.status === 'Pendiente').length}
                   </span>
                )}
              </button>
           </div>

           {materialsSubTab === 'catalog' ? (
             <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
               <div className="xl:col-span-8 bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm min-h-[700px]">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                     <h3 className="text-sm font-black text-slate-900 uppercase italic tracking-widest flex items-center shrink-0">
                       <ShoppingBag size={18} className="mr-3 text-red-600" /> Inventario POP Disponible
                     </h3>
                     
                     <div className="relative w-full md:w-64 group">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors" />
                        <input 
                          type="text" 
                          placeholder="Buscar material..." 
                          value={materialSearch}
                          onChange={(e) => setMaterialSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-red-100 transition-all"
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {filteredMaterials.map((m) => (
                       <div key={m.id} className="p-8 bg-slate-50/50 rounded-[2.5rem] border border-transparent hover:border-red-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm text-slate-300 group-hover:text-red-500 transition-colors">
                             <Package size={32} />
                          </div>
                          <div className="flex-1 min-w-0">
                             <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{m.type}</p>
                             <h4 className="text-base font-black text-slate-900 uppercase italic leading-tight mb-3 group-hover:text-red-600 transition-colors">{m.name}</h4>
                             <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Stock: {m.stockAvailable} UND</span>
                                <div className="flex items-center gap-3 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                                   <button onClick={() => handleUpdateQty(m.id, -1)} className="p-1.5 hover:text-red-600 transition-colors"><Minus size={14} /></button>
                                   <span className="text-xs font-black w-6 text-center">{selectedMaterials[m.id] || 0}</span>
                                   <button onClick={() => handleUpdateQty(m.id, 1)} className="p-1.5 hover:text-red-600 transition-colors"><Plus size={14} /></button>
                                </div>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="xl:col-span-4 space-y-8 sticky top-28">
                  <div className={`rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden transition-all duration-500 ${editingId ? 'bg-blue-900 ring-4 ring-blue-500/20' : 'bg-slate-900'}`}>
                    <div className="absolute -top-10 -right-10 opacity-5">
                       {editingId ? <Edit2 size={250} /> : <Send size={250} />}
                    </div>
                    
                    <div className="flex justify-between items-center mb-8">
                       <h3 className="text-sm font-black uppercase tracking-[0.3em] italic text-red-500 flex items-center">
                         {editingId ? <Edit2 size={18} className="mr-3 text-blue-400" /> : <Plus size={18} className="mr-3" />}
                         {editingId ? `Editando ${editingId}` : 'Nuevo Requerimiento'}
                       </h3>
                       {editingId && (
                         <button onClick={cancelEdit} className="p-2 hover:bg-white/10 rounded-full transition-all">
                           <X size={16} />
                         </button>
                       )}
                    </div>

                    <div className="space-y-8 relative z-10">
                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] block italic">1. Resumen de Materiales</label>
                          <div className="bg-white/5 rounded-3xl p-6 min-h-[100px] border border-white/5">
                             {Object.keys(selectedMaterials).length === 0 ? (
                               <p className="text-[11px] font-medium text-slate-600 italic">Selecciona materiales...</p>
                             ) : (
                               <ul className="space-y-3">
                                  {Object.entries(selectedMaterials).map(([id, qty]) => (
                                    <li key={id} className="flex justify-between items-center text-sm font-bold italic">
                                       <span className="truncate mr-4 text-slate-300">{materials.find(m => m.id === id)?.name}</span>
                                       <span className="text-red-500">{qty} UND</span>
                                    </li>
                                  ))}
                               </ul>
                             )}
                          </div>
                       </div>

                       <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] block italic">2. Justificación Técnica</label>
                          <textarea 
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Describe el uso del material..."
                            className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-5 text-sm font-medium outline-none focus:border-red-500 transition-all resize-none h-32 italic placeholder:text-slate-700"
                          />
                       </div>

                       <button 
                         onClick={handleSubmitRequest}
                         disabled={isSending || Object.keys(selectedMaterials).length === 0 || !reason}
                         className={`w-full py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center group relative overflow-hidden ${
                           isSending || Object.keys(selectedMaterials).length === 0 || !reason 
                           ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                           : (editingId ? 'bg-blue-600 hover:bg-blue-700 text-white italic' : 'bg-red-600 text-white hover:bg-red-700 shadow-red-900/50 italic')
                         }`}
                       >
                          {isSending ? (
                            <>
                              <Loader2 size={18} className="mr-3 animate-spin" /> PROCESANDO...
                            </>
                          ) : (
                            <>
                              {editingId ? 'Guardar Cambios' : 'Enviar Solicitud'} <ArrowRight size={18} className="ml-3 group-hover:translate-x-2 transition-transform" />
                            </>
                          )}
                       </button>
                    </div>
                  </div>
               </div>
             </div>
           ) : (
             <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm min-h-[600px] animate-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-between items-center mb-10">
                   <h3 className="text-xl font-black text-slate-900 uppercase italic flex items-center">
                      <History size={24} className="mr-3 text-red-600" /> Historial de Requerimientos DEX
                   </h3>
                </div>

                {requests.length === 0 ? (
                  <div className="py-24 text-center opacity-20 flex flex-col items-center">
                     <Package size={80} strokeWidth={1} className="mb-4" />
                     <p className="text-xs font-black uppercase tracking-widest italic">Aún no has realizado solicitudes</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {requests.map((req) => (
                      <div key={req.id} className="p-8 bg-slate-50/50 rounded-[2.8rem] border border-transparent hover:bg-white hover:border-slate-100 hover:shadow-2xl transition-all group">
                         <div className="flex flex-col md:flex-row justify-between gap-8">
                            <div className="flex gap-8">
                               <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm text-slate-400 group-hover:text-red-600 transition-colors shrink-0">
                                  <Package size={28} />
                               </div>
                               <div>
                                  <div className="flex items-center gap-4 mb-2">
                                     <p className="text-xs font-black text-slate-300 uppercase italic tracking-widest leading-none">{req.id}</p>
                                     <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase italic border shadow-sm ${getStatusStyle(req.status)}`}>
                                        {req.status}
                                     </span>
                                  </div>
                                  <h4 className="text-xl font-black text-slate-900 uppercase italic leading-tight mb-2">
                                     {req.items.map(i => `${i.qty} ${i.name}`).join(' • ')}
                                  </h4>
                                  <p className="text-xs text-slate-400 font-medium italic line-clamp-1">"{req.reason}"</p>
                               </div>
                            </div>
                            
                            <div className="flex flex-col md:items-end justify-between">
                               <div className="text-right">
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Fecha de Solicitud</p>
                                  <p className="text-sm font-black italic text-slate-900">{req.date}</p>
                               </div>

                               <div className="flex gap-3 mt-6">
                                  {req.status === 'Pendiente' && (
                                    <>
                                      <button 
                                        onClick={() => handleEditRequest(req)}
                                        className="flex items-center px-6 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
                                      >
                                        <Edit2 size={14} className="mr-2" /> Editar Solicitud
                                      </button>
                                      <button 
                                        onClick={() => handleDeleteRequest(req.id)}
                                        className="flex items-center px-4 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase text-red-500 hover:bg-red-50 transition-all shadow-sm"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </>
                                  )}
                                  <button className="flex items-center px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg">
                                     Detalles
                                  </button>
                               </div>
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
                )}
             </div>
           )}
        </div>
      )}
    </div>
  );
};

export default MarketingView;
