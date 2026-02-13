
import React, { useState } from 'react';
import { ChevronRight, X, Mail, Phone, MessageCircle, ShieldCheck, Briefcase } from 'lucide-react';

interface Member {
  name: string;
  fullName: string;
  initials: string;
  color: string;
  ring: string;
  role: string;
  email: string;
  phone: string;
}

interface ActiveMembersProps {
  onSupportClick?: () => void;
}

const ActiveMembers: React.FC<ActiveMembersProps> = ({ onSupportClick }) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const members: Member[] = [
    { 
      name: 'GERALDYNE NINA', 
      fullName: 'Geraldine Nina Vizcarra',
      initials: 'GN', 
      color: 'bg-red-500', 
      ring: 'ring-red-100',
      role: 'Analista de Ventas DEX',
      email: 'g.nina@universal.pe',
      phone: '+51 987 654 321'
    },
    { 
      name: 'JOAQUIN GONZALES', 
      fullName: 'Joaquín Gonzales Prada',
      initials: 'JG', 
      color: 'bg-blue-500', 
      ring: 'ring-blue-100',
      role: 'Coordinador Logístico Nacional',
      email: 'j.gonzales@universal.pe',
      phone: '+51 912 345 678'
    },
    { 
      name: 'MA. FERNANDA CH.', 
      fullName: 'María Fernanda Chávez',
      initials: 'MC', 
      color: 'bg-purple-500', 
      ring: 'ring-purple-100',
      role: 'Especialista Trade Marketing',
      email: 'm.chavez@universal.pe',
      phone: '+51 955 443 221'
    },
    { 
      name: 'MILUSKA OLARTE', 
      fullName: 'Miluska Olarte Poma',
      initials: 'MO', 
      color: 'bg-emerald-500', 
      ring: 'ring-emerald-100',
      role: 'Soporte Administrativo DIM',
      email: 'm.olarte@universal.pe',
      phone: '+51 944 332 110'
    },
    { 
      name: 'MARIA FERNANDA', 
      fullName: 'María Fernanda López',
      initials: 'MF', 
      color: 'bg-orange-500', 
      ring: 'ring-orange-100',
      role: 'Asistente de Créditos',
      email: 'mf.lopez@universal.pe',
      phone: '+51 922 887 766'
    },
    { 
      name: 'PETER COLACCI', 
      fullName: 'Peter Colacci Rossi',
      initials: 'PC', 
      color: 'bg-slate-700', 
      ring: 'ring-slate-100',
      role: 'Gerente de Distribución (DEX/DIM)',
      email: 'p.colacci@universal.pe',
      phone: '+51 999 000 111'
    },
    { 
      name: 'CALETH LAVADO', 
      fullName: 'Andhersson Caleth Lavado Verona',
      initials: 'CL', 
      color: 'bg-slate-950', 
      ring: 'ring-slate-200',
      role: 'Administrador de Portal DEX',
      email: 'c.lavado@universal.pe',
      phone: '+51 934 142 827'
    },
  ];

  return (
    <div className="u-card p-8 relative">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-slate-950 font-black uppercase italic text-xs tracking-tight">STAFF DE APOYO DEX</h3>
        <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">{members.length} ONLINE</span>
      </div>
      
      <div className="grid grid-cols-3 gap-y-10 gap-x-2 mb-10">
        {members.map((m) => (
          <div 
            key={m.name} 
            onClick={() => setSelectedMember(m)}
            className="flex flex-col items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              <div className={`w-14 h-14 rounded-full ${m.color} flex items-center justify-center text-white text-[10px] font-black shadow-md ring-4 ${m.ring} group-hover:scale-110 transition-transform duration-300`}>
                {m.initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                 <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>
            </div>
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-tighter text-center leading-tight w-full truncate italic px-1">
              {m.name}
            </p>
          </div>
        ))}
      </div>
      
      <button 
        onClick={onSupportClick}
        className="w-full py-4 text-red-600 font-extrabold uppercase italic text-[9px] tracking-[0.2em] border border-red-100 border-dashed rounded-2xl hover:bg-red-50 transition-all flex items-center justify-center gap-2 group shadow-sm active:scale-[0.98]"
      >
        SOLICITAR SOPORTE DIRECTO <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* MODAL DE PERFIL DEL STAFF - SOLUCIÓN DEFINITIVA DE ESPACIADO */}
      {selectedMember && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedMember(null)}></div>
          
          <div className="relative bg-white w-full max-w-sm rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 border border-white">
            {/* Cabecera de Color */}
            <div className={`h-28 ${selectedMember.color} relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white, white 10px, transparent 10px, transparent 20px)' }}></div>
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-all z-20"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="px-8 pb-10 text-center relative flex flex-col items-center">
              {/* Avatar Flotante con Z-Index superior */}
              <div className="absolute -top-12 z-20">
                <div className={`w-24 h-24 rounded-[2.2rem] ${selectedMember.color} border-[6px] border-white shadow-xl flex items-center justify-center text-white text-2xl font-black italic`}>
                  {selectedMember.initials}
                </div>
              </div>
              
              {/* CONTENIDO: Margen superior forzado (mt-20) para que el nombre NUNCA sea tapado */}
              <div className="mt-20 w-full space-y-2 mb-8 relative">
                <h4 className="text-xl font-black text-slate-950 uppercase italic leading-tight px-4">
                  {selectedMember.fullName}
                </h4>
                <div className="flex items-center justify-center gap-2 text-red-600 mt-2">
                  <Briefcase size={12} />
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none">{selectedMember.role}</p>
                </div>
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100 mt-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] font-black uppercase">Disponible Ahora</span>
                </div>
              </div>

              <div className="space-y-3 w-full">
                <a 
                  href={`mailto:${selectedMember.email}`}
                  className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl flex items-center gap-4 transition-all group border border-transparent hover:border-slate-100"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-red-600 shadow-sm transition-colors">
                    <Mail size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Correo Corporativo</p>
                    <p className="text-[11px] font-bold text-slate-900 lowercase">{selectedMember.email}</p>
                  </div>
                </a>

                <a 
                  href={`tel:${selectedMember.phone.replace(/\s/g, '')}`}
                  className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl flex items-center gap-4 transition-all group border border-transparent hover:border-slate-100"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-600 shadow-sm transition-colors">
                    <Phone size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Celular / WhatsApp</p>
                    <p className="text-[11px] font-bold text-slate-900">{selectedMember.phone}</p>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 w-full">
                <button className="w-full bg-slate-950 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest italic hover:bg-red-600 transition-all shadow-xl shadow-slate-100 flex items-center justify-center gap-2">
                  <MessageCircle size={14} /> ENVIAR MENSAJE DIRECTO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveMembers;
