
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarWidgetProps {
  onDayClick?: (date: string) => void;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ onDayClick }) => {
  // Configuración para que coincida con la imagen: FEBRERO 2026
  const [viewDate, setViewDate] = useState(new Date(2026, 1, 1)); 

  const months = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];

  const daysLabels = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isToday = (day: number) => {
    const today = new Date();
    // Para efectos de demo, asumimos que hoy es 12 de Febrero 2026 si estamos en ese mes
    return day === 12 && month === 1 && year === 2026;
  };

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  // Simulación de días con eventos (puntos grises en la imagen)
  const eventDays = [18, 25];

  const handleDaySelect = (day: number) => {
    if (onDayClick) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      onDayClick(dateStr);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* HEADER: NOMBRE MES Y AÑO (Estilo imagen) */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase italic tracking-tighter">
            {months[month]}
          </h3>
          <p className="text-[10px] font-bold text-slate-300 mt-1">{year}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handlePrevMonth} className="text-slate-200 hover:text-red-600 transition-colors">
            <ChevronLeft size={18} strokeWidth={3} />
          </button>
          <button onClick={handleNextMonth} className="text-slate-200 hover:text-red-600 transition-colors">
            <ChevronRight size={18} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* GRID DE DÍAS */}
      <div className="grid grid-cols-7 gap-y-6 text-center">
        {daysLabels.map(day => (
          <span key={day} className="text-[9px] font-black text-slate-200 uppercase tracking-widest">
            {day}
          </span>
        ))}
        
        {calendarDays.map((date, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center h-10">
            {date !== null && (
              <div 
                onClick={() => handleDaySelect(date)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <span className={`
                  text-[11px] font-extrabold transition-all duration-300 mb-1
                  ${isToday(date) ? 'text-slate-900' : 'text-slate-900 hover:text-red-600'}
                `}>
                  {date}
                </span>
                {/* PUNTOS INDICADORES (Debajo del número como en la imagen) */}
                <div className="h-1">
                  {isToday(date) ? (
                    <div className="w-1 h-1 bg-red-600 rounded-full"></div>
                  ) : eventDays.includes(date) ? (
                    <div className="w-1 h-1 bg-slate-200 rounded-full group-hover:bg-red-400"></div>
                  ) : (
                    <div className="w-1 h-1 bg-transparent rounded-full group-hover:bg-slate-100"></div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* LEYENDA (Estilo imagen) */}
      <div className="pt-8 border-t border-slate-50 mt-8 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
          <span className="text-[9px] font-black text-slate-300 uppercase italic tracking-widest">Hoy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
          <span className="text-[9px] font-black text-slate-300 uppercase italic tracking-widest">Eventos</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
