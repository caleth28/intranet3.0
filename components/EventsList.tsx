
import React, { useState, useEffect } from 'react';
import { Plus, X, Edit3, Trash2, Save, Calendar as CalendarIcon, Clock, MapPin, Bell, Share2, CheckCircle2 } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  date: string;
  fullDate: string;
  time: string;
  color: string;
  textColor: string;
  bgLight: string;
  priority: 'ALTA' | 'MEDIA' | 'ESTÁNDAR';
  description: string;
  location: string;
}

interface EventsListProps {
  externalDateSelection?: string | null;
  onClearDate?: () => void;
}

const EventsList: React.FC<EventsListProps> = ({ externalDateSelection, onClearDate }) => {
  const currentUser = { name: 'Caleth Lavado', role: 'Administrador de Portal DEX' };
  const isAdmin = currentUser.role === 'Administrador de Portal DEX';

  const [events, setEvents] = useState<EventItem[]>([
    { 
      id: '1', 
      title: 'CIERRE DE PEDIDOS LIMA', 
      date: '12 FEB', 
      fullDate: '2026-02-12',
      time: '5:00 PM', 
      color: 'bg-red-600',
      textColor: 'text-red-600',
      bgLight: 'bg-red-50',
      priority: 'ALTA',
      location: 'Sede Central / DEX Lima',
      description: 'Corte final para procesamiento de carga.'
    },
    { 
      id: '2', 
      title: 'PLANIFICACIÓN Q1', 
      date: '18 FEB', 
      fullDate: '2026-02-18',
      time: '10:00 AM', 
      color: 'bg-blue-600',
      textColor: 'text-blue-600',
      bgLight: 'bg-blue-50',
      priority: 'MEDIA',
      location: 'DIM Arequipa',
      description: 'Reunión de estrategia regional.'
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<EventItem> | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  useEffect(() => {
    if (externalDateSelection && isAdmin) {
      setEditingEvent({ fullDate: externalDateSelection, priority: 'ESTÁNDAR', time: '09:00 AM' });
      setShowFormModal(true);
      if (onClearDate) onClearDate();
    }
  }, [externalDateSelection, isAdmin, onClearDate]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent?.title || !editingEvent?.fullDate) return;

    const newEvent: EventItem = {
      id: editingEvent.id || Math.random().toString(36).substr(2, 9),
      title: (editingEvent.title || '').toUpperCase(),
      date: new Date(editingEvent.fullDate + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }).toUpperCase(),
      fullDate: editingEvent.fullDate || '',
      time: editingEvent.time || '09:00 AM',
      color: editingEvent.priority === 'ALTA' ? 'bg-red-600' : editingEvent.priority === 'MEDIA' ? 'bg-blue-600' : 'bg-emerald-600',
      textColor: editingEvent.priority === 'ALTA' ? 'text-red-600' : editingEvent.priority === 'MEDIA' ? 'text-blue-600' : 'text-emerald-600',
      bgLight: editingEvent.priority === 'ALTA' ? 'bg-red-50' : editingEvent.priority === 'MEDIA' ? 'bg-blue-50' : 'bg-emerald-50',
      priority: editingEvent.priority as any || 'ESTÁNDAR',
      location: editingEvent.location || 'Oficina Central',
      description: editingEvent.description || ''
    };

    if (editingEvent.id) {
      setEvents(prev => prev.map(ev => ev.id === editingEvent.id ? newEvent : ev));
      showToast('Reunión actualizada');
    } else {
      setEvents(prev => [...prev, newEvent]);
      showToast('Reunión programada');
    }

    setShowFormModal(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('¿Eliminar esta reunión?')) {
      setEvents(prev => prev.filter(ev => ev.id !== id));
      setSelectedEvent(null);
      showToast('Evento eliminado', 'error');
    }
  };

  return (
    <div className="bg-white rounded-[3rem] p-8 border border-slate-50 shadow-sm relative w-full overflow-hidden">
      {/* HEADER: Coincide con Screenshot 1 */}
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-slate-900 font-black uppercase italic text-[11px] tracking-tight">AGENDA OPERATIVA</h3>
        {isAdmin && (
          <button 
            onClick={() => { setEditingEvent({ priority: 'ESTÁNDAR', time: '09:00 AM' }); setShowFormModal(true); }}
            className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center hover:bg-slate-900 transition-all shadow-lg shadow-red-200"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
        )}
      </div>
      
      {/* LISTA DE EVENTOS: Estilo Screenshot 1 */}
      <div className="space-y-8 max-h-[320px] overflow-y-auto no-scrollbar pb-2">
        {events.sort((a,b) => a.fullDate.localeCompare(b.fullDate)).map((event) => (
          <div 
            key={event.id} 
            onClick={() => setSelectedEvent(event)}
            className="flex gap-4 group cursor-pointer"
          >
            <div className="flex flex-col items-center pt-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${event.color} shadow-sm group-hover:scale-125 transition-transform`}></div>
              <div className="w-[1px] flex-1 bg-slate-100 mt-2"></div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[11px] font-black text-slate-900 group-hover:text-red-600 transition-colors leading-tight uppercase italic mb-1">
                {event.title}
              </h4>
              <p className="text-[10px] font-bold text-slate-200 uppercase tracking-widest leading-none">
                {event.date} • {event.time}
              </p>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-center py-10 text-[10px] font-black text-slate-200 uppercase tracking-widest italic">Sin eventos programados</p>
        )}
      </div>

      {/* TOAST FEEDBACK */}
      {toast && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] px-6 py-3 text-white rounded-2xl shadow-2xl animate-in slide-in-from-bottom-5 flex items-center gap-3 ${toast.type === 'error' ? 'bg-red-600' : 'bg-slate-950'}`}>
          <CheckCircle2 size={16} className={toast.type === 'success' ? 'text-emerald-500' : 'text-blue-400'} />
          <span className="text-[10px] font-black uppercase tracking-widest italic">{toast.message}</span>
        </div>
      )}

      {/* MODAL FORMULARIO */}
      {showFormModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setShowFormModal(false)}></div>
           <form onSubmit={handleSaveEvent} className="relative bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95">
              <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
                 <h4 className="text-xs font-black uppercase italic tracking-widest">Gestión de Agenda</h4>
                 <button type="button" onClick={() => setShowFormModal(false)}><X size={20} /></button>
              </div>
              <div className="p-8 space-y-5">
                 <input 
                   type="text" required placeholder="TÍTULO DE REUNIÓN"
                   value={editingEvent?.title || ''}
                   onChange={e => setEditingEvent(prev => ({...prev, title: e.target.value}))}
                   className="w-full bg-slate-50 rounded-2xl p-4 text-xs font-black uppercase outline-none focus:ring-2 focus:ring-red-100"
                 />
                 <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="date" required
                      value={editingEvent?.fullDate || ''}
                      onChange={e => setEditingEvent(prev => ({...prev, fullDate: e.target.value}))}
                      className="w-full bg-slate-50 rounded-2xl p-4 text-xs font-bold"
                    />
                    <input 
                      type="text" required placeholder="09:00 AM"
                      value={editingEvent?.time || ''}
                      onChange={e => setEditingEvent(prev => ({...prev, time: e.target.value}))}
                      className="w-full bg-slate-50 rounded-2xl p-4 text-xs font-bold"
                    />
                 </div>
                 <select 
                   value={editingEvent?.priority || 'ESTÁNDAR'}
                   onChange={e => setEditingEvent(prev => ({...prev, priority: e.target.value as any}))}
                   className="w-full bg-slate-50 rounded-2xl p-4 text-xs font-black uppercase italic outline-none"
                 >
                    <option value="ALTA">PRIORIDAD ALTA</option>
                    <option value="MEDIA">PRIORIDAD MEDIA</option>
                    <option value="ESTÁNDAR">PRIORIDAD ESTÁNDAR</option>
                 </select>
                 <button type="submit" className="w-full bg-red-600 text-white py-5 rounded-3xl font-black text-xs uppercase shadow-xl hover:bg-slate-900 transition-all">
                    GUARDAR CAMBIOS
                 </button>
              </div>
           </form>
        </div>
      )}

      {/* MODAL DETALLE EVENTO */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 animate-in fade-in">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className={`h-20 ${selectedEvent.color} flex items-center justify-center`}>
              <CalendarIcon size={30} className="text-white opacity-20" />
            </div>
            <div className="p-8">
              <h4 className="text-xl font-black text-slate-950 uppercase italic mb-2">{selectedEvent.title}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 italic">{selectedEvent.fullDate} • {selectedEvent.time}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm"><MapPin size={18} /></div>
                   <div><p className="text-[8px] font-black text-slate-400 uppercase italic mb-1">Ubicación</p><p className="text-sm font-black text-slate-900 uppercase italic">{selectedEvent.location}</p></div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => { setSelectedEvent(null); showToast(`Recordatorio programado: ${selectedEvent.title}`, 'success'); }}
                  className="flex-1 bg-slate-950 text-white py-4 rounded-2xl font-black text-[10px] uppercase italic tracking-widest hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                >
                   <Bell size={14} /> RECORDATORIO
                </button>
                <button 
                  onClick={() => { setSelectedEvent(null); showToast('Enlace copiado al portapapeles', 'info'); }}
                  className="w-14 h-14 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-2xl flex items-center justify-center transition-all border border-slate-100 group"
                >
                   <Share2 size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
              
              {isAdmin && (
                <div className="mt-4 flex gap-2">
                   <button onClick={() => { setEditingEvent(selectedEvent); setShowFormModal(true); setSelectedEvent(null); }} className="flex-1 py-3 text-[9px] font-black uppercase text-slate-400 border border-slate-100 rounded-xl hover:bg-slate-50">Editar</button>
                   <button onClick={() => handleDeleteEvent(selectedEvent.id)} className="flex-1 py-3 text-[9px] font-black uppercase text-red-400 border border-red-50 rounded-xl hover:bg-red-50">Eliminar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsList;
