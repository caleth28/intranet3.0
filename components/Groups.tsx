
import React, { useState } from 'react';
import { Map, MapPin, Search, ChevronRight, X, Info, ExternalLink, Navigation, Users } from 'lucide-react';

const Groups: React.FC = () => {
  const [activeTab, setActiveTab] = useState('CANALES');
  const [showTerritoryMap, setShowTerritoryMap] = useState(false);
  const [districtFilter, setDistrictFilter] = useState('');
  const [selectedDex, setSelectedDex] = useState<string | null>(null);
  
  const groups = [
    { name: 'Lima Metropolitana', status: 'DEX LIMA SUR / NORTE / ESTE', initials: 'LM', color: 'bg-slate-900' },
    { name: 'Región Sur', status: 'DIM AREQUIPA / CUSCO / PUNO', initials: 'RS', color: 'bg-red-600' },
    { name: 'Región Norte', status: 'DEX TRUJILLO / PIURA / CHICLAYO', initials: 'RN', color: 'bg-blue-600' },
    { name: 'Región Este', status: 'DIM HUANCAYO / AYACUCHO', initials: 'RE', color: 'bg-emerald-600' },
    { name: 'Norte Chico', status: 'DEX HUACHIPA / HUACHO / BARRANCA', initials: 'NC', color: 'bg-orange-500' },
  ];

  const dexDirectory = [
    { name: 'DEX DISGEL', region: 'Lima Sur', code: 'D-001' },
    { name: 'DEX COMERSUR', region: 'Lima Sur', code: 'D-002' },
    { name: 'DEX LIMA NORTE', region: 'Lima Norte', code: 'D-003' },
    { name: 'DEX ORIENTE SAC', region: 'Lima Este', code: 'D-004' },
    { name: 'DEX CENTRAL', region: 'Lima Centro', code: 'D-005' },
    { name: 'DIM AREQUIPA', region: 'Sur', code: 'D-006' },
    { name: 'DIM CUSCO', region: 'Sur', code: 'D-007' },
    { name: 'DEX TRUJILLO', region: 'Norte', code: 'D-008' },
    { name: 'DEX CHICLAYO', region: 'Norte', code: 'D-009' },
    { name: 'DEX PIURA', region: 'Norte', code: 'D-010' },
    { name: 'DIM HUANCAYO', region: 'Este', code: 'D-011' },
    { name: 'DIM AYACUCHO', region: 'Este', code: 'D-012' },
    { name: 'DEX HUACHIPA', region: 'Norte Chico', code: 'D-013' },
    { name: 'DEX HUACHO', region: 'Norte Chico', code: 'D-014' },
    { name: 'DEX BARRANCA', region: 'Norte Chico', code: 'D-015' },
    { name: 'DEX CAÑETE', region: 'Sur Chico', code: 'D-016' },
    { name: 'DEX ICA', region: 'Sur Chico', code: 'D-017' },
    { name: 'DEX TACNA', region: 'Extremo Sur', code: 'D-018' },
    { name: 'DEX PUCALLPA', region: 'Selva', code: 'D-019' },
    { name: 'DEX IQUITOS', region: 'Selva', code: 'D-020' },
    { name: 'DEX TARAPOTO', region: 'Selva', code: 'D-021' },
    { name: 'DEX JULIACA', region: 'Altiplano', code: 'D-022' },
  ];

  const territoryMap = [
    { 
      dex: 'DEX DISGEL', 
      districts: ['Villa El Salvador', 'Villa María del Triunfo'], 
      color: 'border-l-red-600', 
      bg: 'bg-red-50/30',
      coords: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d62402.26126601246!2d-76.92987153641214!3d-12.203063533833076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2spe!4v1710000000000!5m2!1ses!2spe',
      mapsLink: 'https://www.google.com/maps/search/Villa+El+Salvador+Villa+Maria+del+Triunfo'
    },
    { 
      dex: 'DEX COMERSUR', 
      districts: ['San Juan de Miraflores', 'Lurín', 'Pachacamac'], 
      color: 'border-l-blue-600', 
      bg: 'bg-blue-50/30',
      coords: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d62410.26126601246!2d-76.95087153641214!3d-12.163063533833076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2spe!4v1710000000000!5m2!1ses!2spe',
      mapsLink: 'https://www.google.com/maps/search/San+Juan+de+Miraflores+Lurin'
    },
    { 
      dex: 'DEX LIMA NORTE', 
      districts: ['Los Olivos', 'SMP', 'Comas', 'Independencia'], 
      color: 'border-l-slate-900', 
      bg: 'bg-slate-50',
      coords: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d62420.26126601246!2d-77.07087153641214!3d-11.963063533833076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2spe!4v1710000000000!5m2!1ses!2spe',
      mapsLink: 'https://www.google.com/maps/search/Los+Olivos+Comas'
    }
  ];

  const filteredTerritories = territoryMap.filter(t => 
    t.dex.toLowerCase().includes(districtFilter.toLowerCase()) || 
    t.districts.some(d => d.toLowerCase().includes(districtFilter.toLowerCase()))
  );

  const activeDexData = territoryMap.find(t => t.dex === selectedDex) || territoryMap[0];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-slate-950 font-black uppercase italic text-sm tracking-tight">CANALES DE DISTRIBUCIÓN</h3>
        <button 
          onClick={() => setShowTerritoryMap(true)}
          className="p-2 bg-slate-50 text-slate-400 hover:text-red-600 rounded-xl transition-all"
          title="Ver Mapa de Zonificación"
        >
          <Map size={18} />
        </button>
      </div>

      <div className="flex p-1.5 bg-slate-50 rounded-2xl mb-8">
        {['CANALES', 'ZONAS', 'DEX'].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              if (tab === 'ZONAS') setShowTerritoryMap(true);
            }}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${
              activeTab === tab ? 'bg-red-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'DEX' ? (
        <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar animate-in fade-in duration-300">
           <div className="flex items-center gap-2 mb-4">
              <Users size={14} className="text-red-600" />
              <p className="text-[10px] font-black uppercase text-slate-400 italic">Directorio Nacional (22 Sedes)</p>
           </div>
           {dexDirectory.map((d) => (
             <div key={d.code} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                <div>
                   <p className="text-[11px] font-black text-slate-950 uppercase italic leading-none mb-1 group-hover:text-red-600 transition-colors">{d.name}</p>
                   <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{d.region}</p>
                </div>
                <span className="text-[8px] font-black text-slate-300 uppercase tracking-tighter">{d.code}</span>
             </div>
           ))}
        </div>
      ) : (
        <div className="space-y-5">
          {groups.map((g) => (
            <div 
              key={g.name} 
              onClick={() => g.name === 'Lima Metropolitana' && setShowTerritoryMap(true)}
              className="flex items-center gap-4 group cursor-pointer p-2 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100"
            >
              <div className={`w-12 h-12 rounded-full ${g.color} flex items-center justify-center text-white text-[10px] font-black border-4 border-white shadow-md shrink-0`}>
                {g.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black text-slate-950 truncate uppercase italic leading-none mb-1 group-hover:text-red-600 transition-colors">
                  {g.name}
                </p>
                <p className="text-[9px] text-slate-400 truncate uppercase font-bold tracking-tight">{g.status}</p>
              </div>
              {g.name === 'Lima Metropolitana' && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={14} className="text-red-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* MODAL / OVERLAY: MAPA DE TERRITORIOS LIMA - VISTA EXTENDIDA */}
      {showTerritoryMap && (
        <div className="fixed inset-0 z-[100] bg-white p-6 md:p-12 flex flex-col animate-in slide-in-from-bottom duration-500 overflow-hidden">
          
          {/* Header del Mapa */}
          <div className="flex justify-between items-center mb-8 shrink-0">
            <div>
              <div className="flex items-center gap-3 mb-1">
                 <div className="p-2 bg-red-600 text-white rounded-lg shadow-lg">
                    <Map size={24} />
                 </div>
                 <h4 className="text-2xl font-black text-slate-950 uppercase italic leading-none">GUÍA DE ZONIFICACIÓN LIMA</h4>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] ml-12">Visualización de Territorios por Operador Logístico (DEX)</p>
            </div>
            <button 
              onClick={() => { setShowTerritoryMap(false); setActiveTab('CANALES'); }}
              className="p-4 bg-slate-50 hover:bg-red-50 rounded-2xl text-slate-300 hover:text-red-600 transition-all shadow-sm active:scale-95"
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden">
            
            {/* COLUMNA IZQUIERDA: LISTA Y BUSCADOR */}
            <div className="w-full lg:w-[400px] flex flex-col gap-6 overflow-hidden">
               <div className="relative shrink-0">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" 
                    placeholder="BUSCAR DISTRITO O DEX..."
                    value={districtFilter}
                    onChange={(e) => setDistrictFilter(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-xs font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-red-100 transition-all"
                  />
               </div>

               <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-2">
                  {filteredTerritories.map((item, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedDex(item.dex)}
                      className={`
                        p-6 rounded-[2rem] border-l-8 transition-all cursor-pointer relative group
                        ${selectedDex === item.dex ? 'bg-white shadow-2xl ring-2 ring-red-100 ' + item.color : item.bg + ' ' + item.color + ' border-transparent'}
                      `}
                    >
                      <div className="flex justify-between items-center mb-4">
                         <h5 className="text-sm font-black text-slate-900 uppercase italic tracking-tight">{item.dex}</h5>
                         <div className={`p-2 rounded-xl bg-white shadow-sm text-slate-300 group-hover:text-red-600 transition-colors`}>
                            <MapPin size={16} />
                         </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                         {item.districts.map(dist => (
                           <span key={dist} className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase border ${selectedDex === item.dex ? 'bg-red-50 text-red-600 border-red-100' : 'bg-white/80 text-slate-500 border-white'}`}>
                             {dist}
                           </span>
                         ))}
                      </div>
                      {selectedDex === item.dex && (
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-in fade-in zoom-in">
                            <ChevronRight className="text-red-600" size={24} />
                         </div>
                      )}
                    </div>
                  ))}
               </div>
               
               <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shrink-0">
                  <Info className="text-red-600 mb-4" size={24} />
                  <p className="text-xs font-black uppercase italic mb-2">Ayuda Técnica</p>
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed italic">
                    Si un distrito no está asignado o existe duda sobre la frontera entre DEX, reporte al equipo de soporte de Peter Colacci.
                  </p>
               </div>
            </div>

            {/* COLUMNA DERECHA: EL MAPA VISUAL */}
            <div className="flex-1 bg-slate-50 rounded-[3rem] border-4 border-white shadow-inner relative overflow-hidden flex flex-col">
               
               {/* Iframe de Google Maps o Mock de Mapa */}
               <div className="flex-1 relative">
                  <iframe 
                    src={activeDexData.coords} 
                    className="w-full h-full grayscale opacity-60 contrast-125"
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  
                  {/* Overlay Informativo sobre el Mapa */}
                  <div className="absolute top-8 left-8 right-8 flex justify-between items-start pointer-events-none">
                     <div className="bg-white/95 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl pointer-events-auto border border-white max-w-xs animate-in slide-in-from-top duration-700">
                        <div className="flex items-center gap-3 mb-4">
                           <div className="w-10 h-10 bg-red-600 text-white rounded-2xl flex items-center justify-center">
                              <Navigation size={20} />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Zona Seleccionada</p>
                              <p className="text-sm font-black text-slate-900 uppercase italic">{selectedDex || 'LIMA SUR'}</p>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                              <span>COBERTURA TOTAL:</span>
                              <span className="text-red-600 font-black">{activeDexData.districts.length} DISTRITOS</span>
                           </div>
                           <a 
                             href={activeDexData.mapsLink} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="w-full py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-600 transition-all pointer-events-auto shadow-xl shadow-slate-900/20"
                           >
                             ABRIR GOOGLE MAPS GPS <ExternalLink size={14} />
                           </a>
                        </div>
                     </div>
                  </div>

                  {/* Leyenda Flotante Inferior */}
                  <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur p-4 rounded-2xl border border-white shadow-lg pointer-events-none">
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                           <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                           <span className="text-[9px] font-black text-slate-900 uppercase italic tracking-widest">DEX ACTIVO</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                           <span className="text-[9px] font-black text-slate-400 uppercase italic tracking-widest">OTRAS ZONAS</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;
