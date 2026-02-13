
import React from 'react';

interface CounterItemProps {
  label: string;
  value: string;
  sub: string;
  color: 'red' | 'blue' | 'emerald' | 'purple';
}

const CounterItem: React.FC<CounterItemProps> = ({ label, value, sub, color }) => {
  const colorMap = {
    red: { bg: 'bg-red-50', text: 'text-red-600', shadow: 'shadow-red-100' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', shadow: 'shadow-blue-100' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', shadow: 'shadow-emerald-100' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', shadow: 'shadow-purple-100' },
  };

  return (
    <div className={`bg-white rounded-[3.5rem] p-12 border border-slate-50 shadow-[0_20px_40px_rgba(0,0,0,0.02)] hover:shadow-2xl hover:border-white transition-all duration-500 group cursor-default relative overflow-hidden`}>
      <div className={`absolute top-0 right-0 w-2 h-full ${colorMap[color].text} opacity-20`}></div>
      <p className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-300 mb-10 italic leading-none">{label}</p>
      <div className="flex items-baseline gap-4">
        <h4 className={`text-6xl font-black italic tracking-tighter leading-none text-slate-900 group-hover:text-red-600 transition-colors`}>
          {value}
        </h4>
        <span className={`text-[12px] font-black uppercase italic ${colorMap[color].text} tracking-widest`}>
          {sub}
        </span>
      </div>
    </div>
  );
};

export default CounterItem;
