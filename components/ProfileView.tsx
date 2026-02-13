
import React from 'react';
import { Camera, Facebook, Youtube, Twitter, Mail, Phone, User, ShieldCheck } from 'lucide-react';

const ProfileView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-[1200px] mx-auto pb-10">
      
      {/* TARJETA DE PERFIL PRINCIPAL */}
      <div className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm">
        
        {/* BANNER CON LÍNEAS DIAGONALES */}
        <div className="relative h-72 bg-slate-900 group overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-80" 
            alt="Cover"
          />
          
          <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #2563EB 10px, #2563EB 11px)'
          }}></div>
          
          <button className="absolute top-6 right-8 bg-white/95 backdrop-blur px-5 py-2.5 rounded-2xl text-[10px] font-black text-slate-800 flex items-center shadow-2xl hover:bg-white transition-all uppercase tracking-widest italic">
            <Camera size={14} className="mr-2 text-red-600" />
            Reposicion Cover Photo
          </button>
        </div>

        {/* INFO DE PERFIL Y AVATAR */}
        <div className="relative px-10 pb-12 text-center flex flex-col items-center">
          
          {/* Avatar con posición absoluta controlada */}
          <div className="absolute -top-32 z-10">
            <div className="relative inline-block">
              <img 
                src="https://picsum.photos/seed/user123/400/400" 
                className="w-52 h-52 rounded-full border-[10px] border-white object-cover shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                alt="Avatar"
              />
              <div className="absolute bottom-6 right-6 w-8 h-8 bg-emerald-500 border-[5px] border-white rounded-full shadow-lg"></div>
            </div>
          </div>

          {/* Nombre con Padding Top (pt-28) fijo para evitar solapamiento con la foto de 208px */}
          <div className="pt-28 space-y-3 w-full">
            <div className="mt-8">
              <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-tight">
                Andhersson Caleth Lavado Verona
              </h2>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">
                @calethlavado • Usuario desde Dic 2023
              </p>
            </div>

            <div className="flex justify-center items-center space-x-8 mt-6">
              <p className="text-sm font-black text-slate-800">
                <span className="text-slate-300 font-bold mr-2 italic">13</span> seguidores
              </p>
              <p className="text-sm font-black text-slate-800">
                <span className="text-slate-300 font-bold mr-2 italic">16</span> siguiendo
              </p>
            </div>

            <div className="flex justify-center space-x-4 mt-8">
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-100 text-slate-300 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
                <Facebook size={18} />
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-100 text-slate-300 hover:text-red-600 hover:border-red-100 transition-all shadow-sm">
                <Youtube size={18} />
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-100 text-slate-300 hover:text-blue-400 hover:border-blue-100 transition-all shadow-sm">
                <Twitter size={18} />
              </button>
            </div>
          </div>

          <div className="flex justify-center border-t border-slate-50 mt-14 w-full">
            <div className="flex space-x-12">
              {['Perfil', 'Timeline', 'Conecciones', 'Grupos', 'Documentos', 'Fotos'].map((tab) => (
                <button 
                  key={tab} 
                  className={`
                    py-6 text-[11px] font-black uppercase tracking-widest transition-all border-t-2 -mt-[2px]
                    ${tab === 'Perfil' ? 'text-red-600 border-red-600' : 'text-slate-300 border-transparent hover:text-slate-500'}
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm group hover:shadow-xl transition-shadow">
           <div className="flex items-center mb-10">
             <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
               <User size={28} strokeWidth={2.5} />
             </div>
             <h3 className="text-xl font-black text-slate-900 uppercase italic">Información Personal</h3>
           </div>
           
           <div className="grid grid-cols-2 gap-y-10">
              <div>
                <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mb-1.5 italic">DNI / Documento</p>
                <p className="text-sm font-black text-slate-800 uppercase italic">12345678</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mb-1.5 italic">Nacimiento</p>
                <p className="text-sm font-black text-slate-800 uppercase italic">08 AGO, 1995</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mb-1.5 italic">Género</p>
                <p className="text-sm font-black text-slate-800 uppercase italic">Masculino</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest mb-1.5 italic">Estado Civil</p>
                <p className="text-sm font-black text-slate-800 uppercase italic">Casado</p>
              </div>
           </div>
        </div>

        <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-sm group hover:shadow-xl transition-shadow">
           <div className="flex items-center mb-10">
             <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
               <Mail size={28} strokeWidth={2.5} />
             </div>
             <h3 className="text-xl font-black text-slate-900 uppercase italic">Contacto Operativo</h3>
           </div>
           
           <div className="space-y-8">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mr-5 text-slate-400">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest mb-0.5 italic">Corporativo</p>
                  <p className="text-sm font-black text-slate-800 italic">c.lavado@universal.pe</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mr-5 text-slate-400">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest mb-0.5 italic">Móvil DEX</p>
                  <p className="text-sm font-black text-slate-800 italic">+51 934 142 827</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mr-5 text-slate-400">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest mb-0.5 italic">Rol de Sistema</p>
                  <p className="text-sm font-black text-emerald-600 uppercase italic">Administrador DEX Lima Sur</p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
