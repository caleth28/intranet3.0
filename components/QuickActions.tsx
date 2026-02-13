
import React from 'react';
import { Plus, PackageSearch, FileDown } from 'lucide-react';

const QuickActions: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 w-full xl:w-auto">
      
      {/* GESTIÓN PREVENTA */}
      <button className="group relative bg-[#E21F26] p-7 pr-14 rounded-[3.5rem] flex items-center gap-7 shadow-[0_30px_60px_-15px_rgba(226,31,38,0.4)] hover:scale-[1.04] active:scale-95 transition-all w-full md:w-auto min-w-[340px] text-left">
        <div className="w-16 h-16 bg-white rounded-[1.8rem] flex items-center justify-center shrink-0 shadow-2xl group-hover:rotate-12 transition-transform">
          <Plus size={40} className="text-[#E21F26]" strokeWidth={4} />
        </div>
        <div>
          <span className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em] italic mb-1">DEX MANAGEMENT</span>
          <span className="block text-[1.2rem] font-black text-white uppercase italic tracking-widest leading-none">NUEVA PREVENTA</span>
        </div>
      </button>

      {/* STOCK PLANTA */}
      <button className="group relative bg-[#030712] p-7 pr-14 rounded-[3.5rem] flex items-center gap-7 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] hover:scale-[1.04] active:scale-95 transition-all w-full md:w-auto min-w-[340px] text-left">
        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[1.6rem] flex items-center justify-center shrink-0 shadow-lg group-hover:-rotate-12 transition-transform">
          <PackageSearch size={34} className="text-white" strokeWidth={1.5} />
        </div>
        <div>
          <span className="block text-[10px] font-black text-white/30 uppercase tracking-[0.3em] italic mb-1">INVENTORY CHECK</span>
          <span className="block text-[1.2rem] font-black text-white uppercase italic tracking-widest leading-none">STOCK PLANTA</span>
        </div>
      </button>

      {/* CATÁLOGO PDF */}
      <button className="group relative bg-white p-7 pr-14 rounded-[3.5rem] flex items-center gap-7 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:scale-[1.04] active:scale-95 transition-all w-full md:w-auto min-w-[340px] text-left">
        <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-[1.6rem] flex items-center justify-center shrink-0 group-hover:bg-red-50 transition-colors">
          <FileDown size={34} className="text-slate-900 group-hover:text-[#E21F26] transition-colors" strokeWidth={1.5} />
        </div>
        <div>
          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic mb-1">PRICE LIST Q4</span>
          <span className="block text-[1.2rem] font-black text-slate-950 uppercase italic tracking-widest leading-none">CATÁLOGO PDF</span>
        </div>
      </button>

    </div>
  );
};

export default QuickActions;
