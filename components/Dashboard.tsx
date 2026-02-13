
import React, { useState } from 'react';
import KPISection from './KPISection';
import ActiveMembers from './ActiveMembers';
import Groups from './Groups';
import FeaturedBanner from './FeaturedBanner';
import ChatInput from './ChatInput';
import PostFeed from './PostFeed';
import CalendarWidget from './CalendarWidget';
import EventsList from './EventsList';
import GoalWidget from './GoalWidget';
import { Package } from 'lucide-react';

const Dashboard: React.FC<{ onViewChange?: (view: string) => void }> = ({ onViewChange }) => {
  // Estado compartido para sincronizar el calendario con la lista
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  return (
    <div className="animate-in fade-in duration-700 space-y-10 pb-20">
      
      {/* SECCIÓN 1: BANNER DE GALERÍA SUPERIOR (FULL WIDTH) */}
      <div className="w-full">
         <FeaturedBanner />
      </div>

      {/* SECCIÓN 2: KPIs OPERATIVOS (Solo los 3 primeros, el 4to irá en el sidebar derecho según imagen) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="u-card p-8 flex items-center gap-6">
          <div className={`w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shrink-0`}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/></svg>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">VENTAS ACUMULADAS</p>
            <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">S/ 124,500</h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">+15% VS MES ANTERIOR</p>
          </div>
        </div>
        <div className="u-card p-8 flex items-center gap-6">
          <div className={`w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shrink-0`}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H10v12zM3 17h4v-7H3v7zm14-10v10h4V7h-4z"/></svg>
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">PEDIDOS EN TRÁNSITO</p>
            <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">08</h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">PRÓXIMA ENTREGA: MAÑANA</p>
          </div>
        </div>
        <div className="u-card p-8 flex items-center gap-6">
          <div className={`w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shrink-0`}>
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <line x1="12" x2="12" y1="8" y2="12"/>
  <line x1="12" x2="12.01" y1="16" y2="16"/>
</svg>          </div>
          <div>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">ALERTAS DE STOCK</p>
            <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">04</h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">SKUS CON BAJO INVENTARIO</p>
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: GRID PRINCIPAL DE CONTENIDO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA (25%) - Personal y Canales */}
        <div className="lg:col-span-3 space-y-8">
           <ActiveMembers onSupportClick={() => onViewChange?.('mensajes')} />
           <Groups />
        </div>

        {/* COLUMNA CENTRAL (60%) - El corazón del portal (Metas + Posts) */}
        <div className="lg:col-span-6 space-y-8">
           <GoalWidget />
           
           <div className="space-y-6">
              <div className="u-card p-6">
                 <ChatInput />
              </div>

              <PostFeed 
                admin="ADMINISTRACIÓN CENTRAL UNIVERSAL" 
                time="HACE 30 MINUTOS" 
                content="IMPORTANTE: Se ha actualizado la lista de precios para la categoría de Repostería Industrial. Por favor, revisen el módulo de Catálogo para descargar el nuevo PDF vigente desde mañana 09/12."
                official
              />

              <PostFeed 
                admin="LOGÍSTICA DEX" 
                time="HACE 2 HORAS" 
                content="Recordatorio: Los cierres de liquidación para la zona Lima Sur deben enviarse antes de las 5:00 PM para asegurar el despacho del día siguiente. No habrá prórrogas."
                image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop"
              />
           </div>
        </div>

        {/* COLUMNA DERECHA (25%) - Siderbar de Widgets Sincronizados (Según Imagen 3) */}
        <div className="lg:col-span-3 space-y-8">
           {/* Widget de Cumplimiento DIM (Extrapolado de KPISection para el Sidebar) */}
           <div className="u-card p-8 flex items-center gap-6">
              <div className={`w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shrink-0`}>
                 <Package size={24} />
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">CUMPLIMIENTO DIM</p>
                <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-none mb-1">96%</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">NIVEL DE SERVICIO ACTUAL</p>
              </div>
           </div>

           {/* Calendario Widget (Según Imagen 3) */}
           <div className="u-card p-8 shadow-sm border-slate-50">
              <CalendarWidget onDayClick={setSelectedDate} />
           </div>

           {/* Agenda Operativa (Según Imagen 1) */}
           <EventsList externalDateSelection={selectedDate} onClearDate={() => setSelectedDate(null)} />
        </div>

      </div>
      
    </div>
  );
};

export default Dashboard;
