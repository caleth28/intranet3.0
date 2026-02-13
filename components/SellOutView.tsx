
import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Download, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Coins, 
  TrendingUp, 
  Target,
  FileSpreadsheet,
  Save,
  Clock,
  X,
  FileUp,
  Calculator,
  ArrowRightLeft,
  Lock,
  Unlock,
  ShieldAlert,
  ArrowRight,
  Receipt,
  Printer,
  ShieldCheck,
  Loader2
} from 'lucide-react';

interface SellOutRow {
  id: string;
  factura: string;
  vendedor: string;
  codigo: string;
  producto: string;
  cantidad: string;
  cliente: string;
  direccion: string;
  distrito: string;
  fecha: string;
  montoSinIgv: string;
  montoConIgv: string;
}

const SellOutView: React.FC = () => {
  const [rows, setRows] = useState<SellOutRow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isRequestingPayment, setIsRequestingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [opNumber, setOpNumber] = useState('');

  const [formData, setFormData] = useState<Omit<SellOutRow, 'id'>>({
    factura: '', vendedor: '', codigo: '', producto: '', cantidad: '',
    cliente: '', direccion: '', distrito: '', fecha: new Date().toISOString().split('T')[0],
    montoSinIgv: '', montoConIgv: ''
  });

  const isUnlocked = rows.length > 0;
  const purchaseVolume = 125400;
  const bonusTarget = 150000;
  const progressPerc = (purchaseVolume / bonusTarget) * 100;
  const bonusAmount = "8,450.00";

  const handleInputChange = (field: keyof Omit<SellOutRow, 'id'>, value: string) => {
    let updatedData = { ...formData, [field]: value };
    if (field === 'montoSinIgv') {
      const val = parseFloat(value);
      if (!isNaN(val)) updatedData.montoConIgv = (val * 1.18).toFixed(2);
    }
    setFormData(updatedData);
  };

  const handleAddRow = (e: React.FormEvent) => {
    e.preventDefault();
    setRows([{ ...formData, id: Date.now().toString() }, ...rows]);
    setIsModalOpen(false);
    setFormData({
      factura: '', vendedor: '', codigo: '', producto: '', cantidad: '',
      cliente: '', direccion: '', distrito: '', fecha: new Date().toISOString().split('T')[0],
      montoSinIgv: '', montoConIgv: ''
    });
  };

  const simulateExcelUpload = () => {
    setIsImporting(true);
    setTimeout(() => {
      const mockData: SellOutRow[] = [
        { id: 'm1', factura: 'F001-5520', vendedor: 'CARLOS RIVAS', codigo: 'UN-FLV-160', producto: 'FLAN VAINILLA 160G', cantidad: '120', cliente: 'SUPERMERCADOS PERU', direccion: 'AV. LARCO 445', distrito: 'MIRAFLORES', fecha: '2025-05-10', montoSinIgv: '450.00', montoConIgv: '531.00' },
        { id: 'm2', factura: 'F001-5521', vendedor: 'ANA LOPEZ', codigo: 'UN-GEF-500', producto: 'GELATINA FRESA 500G', cantidad: '80', cliente: 'BODEGA DON PEPE', direccion: 'JR. HUANCAYO 122', distrito: 'LIMA', fecha: '2025-05-11', montoSinIgv: '320.50', montoConIgv: '378.19' },
      ];
      setRows([...mockData, ...rows]);
      setIsImporting(false);
    }, 1500);
  };

  const handleRequestPayment = () => {
    if (!isUnlocked) return;
    setIsRequestingPayment(true);
    
    // Simulación de Auditoría de Planta
    setTimeout(() => {
      setOpNumber(`OP-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsRequestingPayment(false);
      setPaymentSuccess(true);
    }, 2500);
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* HEADER COMPACTO */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
           <div className={`w-12 h-12 ${isUnlocked ? 'bg-emerald-500 shadow-emerald-100' : 'bg-slate-300'} text-white rounded-2xl flex items-center justify-center shadow-lg transition-all`}>
              {isUnlocked ? <Unlock size={24} /> : <Lock size={24} />}
           </div>
           <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase italic leading-none tracking-tighter">SISTEMA DE SELL-OUT</h2>
              <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${isUnlocked ? 'text-emerald-500 animate-pulse' : 'text-slate-400'}`}>
                {isUnlocked ? '● INCENTIVO DESBLOQUEADO - LISTO PARA ENVÍO' : '● ACCESO RESTRINGIDO - REQUIERE CARGA DE VENTAS'}
              </p>
           </div>
        </div>
        
        <div className="flex items-center gap-4">
           <button onClick={simulateExcelUpload} disabled={isImporting || paymentSuccess} className="flex items-center px-6 py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-600 transition-all disabled:opacity-30">
             {isImporting ? <Loader2 className="animate-spin mr-2" size={14} /> : <FileUp size={14} className="mr-2" />}
             Cargar Excel Sell-Out
           </button>
           <button onClick={() => setIsModalOpen(true)} disabled={paymentSuccess} className="flex items-center px-6 py-3 bg-red-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all shadow-lg disabled:opacity-30">
             <Plus size={14} className="mr-2" /> Nueva Fila
           </button>
        </div>
      </div>

      {/* PANEL DE STATUS E INCENTIVO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
         <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-6 mb-8">
               <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shrink-0 ${isUnlocked ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500 animate-pulse'}`}>
                  <ShieldAlert size={32} />
               </div>
               <div className="flex-1">
                  <h3 className="text-xl font-black text-slate-900 uppercase italic leading-tight">Control de Cumplimiento Planta</h3>
                  <div className="flex justify-between items-end mt-4 mb-2">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Avance vs Cuota Q1</span>
                     <span className="text-xs font-black text-slate-900 italic">S/ {purchaseVolume.toLocaleString()} / S/ {bonusTarget.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                     <div 
                       className={`h-full transition-all duration-1000 ${progressPerc >= 80 ? 'bg-emerald-500' : 'bg-red-500'}`}
                       style={{ width: `${progressPerc}%` }}
                     ></div>
                  </div>
               </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
               <div className="px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${progressPerc >= 95 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                     {progressPerc >= 95 ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                  </div>
                  <p className="text-[9px] font-black uppercase text-slate-500 tracking-tighter italic leading-none">Compra Planta {progressPerc >= 95 ? 'OK' : 'FALTANTE'}</p>
               </div>
               <div className={`px-4 py-3 rounded-2xl border transition-all flex items-center gap-3 ${isUnlocked ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100 animate-pulse'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isUnlocked ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                     {isUnlocked ? <CheckCircle2 size={14} /> : <Lock size={14} />}
                  </div>
                  <p className={`text-[9px] font-black uppercase tracking-tighter italic leading-none ${isUnlocked ? 'text-emerald-600' : 'text-red-600'}`}>
                    Sell-Out {isUnlocked ? 'DECLARADO' : 'PENDIENTE'}
                  </p>
               </div>
            </div>
         </div>

         {/* CARD DE DINERO DINÁMICO */}
         <div className="lg:col-span-4 relative group">
            <div className={`h-full rounded-[2.5rem] p-8 flex flex-col items-center text-center justify-between transition-all duration-700 shadow-2xl relative overflow-hidden ${paymentSuccess ? 'bg-emerald-600 text-white' : (isUnlocked ? 'bg-[#E21F26] text-white' : 'bg-slate-200 text-slate-400 grayscale')}`}>
               
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, white 10px, white 11px)' }}></div>

               <div className="relative z-10">
                  <div className={`mb-6 flex flex-col items-center ${!isUnlocked ? 'animate-bounce' : ''}`}>
                     {paymentSuccess ? <ShieldCheck size={48} className="mb-2" /> : (isUnlocked ? <Unlock size={48} className="mb-2" /> : <Lock size={48} className="mb-2" />)}
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] italic">Incentivo Extraordinario</p>
                  </div>
                  <h4 className="text-5xl font-black italic tracking-tighter leading-none mb-2">S/ {bonusAmount}</h4>
                  <p className={`text-[9px] font-bold uppercase tracking-widest ${isUnlocked ? 'text-white/70' : 'text-slate-400'}`}>
                    {paymentSuccess ? 'TRANSFERENCIA EN PROCESO' : 'Monto Bruto Proyectado'}
                  </p>
               </div>

               <button 
                 onClick={handleRequestPayment}
                 disabled={!isUnlocked || isRequestingPayment || paymentSuccess}
                 className={`relative z-10 w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest italic transition-all flex items-center justify-center gap-2 group/btn
                   ${paymentSuccess 
                      ? 'bg-emerald-800 text-white cursor-default' 
                      : (isUnlocked 
                        ? 'bg-white text-red-600 hover:bg-slate-900 hover:text-white shadow-xl active:scale-95' 
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed')
                   }
                 `}
               >
                  {isRequestingPayment ? (
                    <><Loader2 size={14} className="animate-spin" /> VALIDANDO AUDITORÍA...</>
                  ) : (
                    paymentSuccess ? (
                      <><CheckCircle2 size={14} /> SOLICITUD ENVIADA</>
                    ) : (
                      isUnlocked ? (
                        <>SOLICITAR COBRO AHORA <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" /></>
                      ) : (
                        <>CARGUE DATOS PARA DESBLOQUEAR</>
                      )
                    )
                  )}
               </button>
            </div>
         </div>
      </div>

      {/* TABLA DE REGISTROS */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col w-full relative">
         <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-black/5 to-transparent pointer-events-none z-10"></div>
         <div className="w-full overflow-x-auto custom-scrollbar-horizontal bg-white">
            <table className="w-full text-center border-collapse min-w-[1700px]">
               <thead>
                  <tr className="bg-[#02A6E3] text-white">
                     <th className="px-4 py-5 text-[10px] font-black uppercase italic border-r border-white/10 sticky left-0 bg-[#02A6E3] z-20">Factura - Boleta</th>
                     <th className="px-4 py-5 text-[10px] font-black uppercase italic border-r border-white/10 w-40">Vendedor</th>
                     <th className="px-4 py-5 text-[10px] font-black uppercase italic border-r border-white/10 w-40">Cod. Producto</th>
                     <th className="px-6 py-5 text-[10px] font-black uppercase italic border-r border-white/10 text-left min-w-[250px]">Producto</th>
                     <th className="px-4 py-5 text-[10px] font-black uppercase italic border-r border-white/10">Cant. Pedida</th>
                     <th className="px-4 py-5 text-[10px] font-black uppercase italic border-r border-white/10 min-w-[200px]">Nombre Cliente</th>
                     <th className="px-4 py-5 text-[10px] font-black uppercase italic border-r border-white/10 min-w-[200px] text-left">Dirección</th>
                     <th className="px-4 py-5 text-[10px] font-black uppercase italic border-r border-white/10 w-32">Distrito</th>
                     <th className="px-4 py-5 text-[10px] font-black uppercase italic border-r border-white/10 w-32">Fecha Doc.</th>
                     <th className="px-4 py-5 text-[10px] font-black uppercase italic border-r border-white/10 w-36 text-right">Monto S/ IGV</th>
                     <th className="px-4 py-5 text-[10px] font-black uppercase italic border-r border-white/10 w-36 text-right bg-[#018abe]">Monto C/ IGV</th>
                     <th className="px-4 py-5 text-[10px] font-black uppercase italic sticky right-0 bg-[#02A6E3] z-20">Acción</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="py-32 text-center bg-slate-50/30">
                         <div className="flex flex-col items-center animate-bounce">
                            <Lock size={60} className="text-red-500 opacity-20 mb-4" />
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Incentivo Bloqueado: Ingrese facturas para activar el beneficio</p>
                         </div>
                      </td>
                    </tr>
                  ) : (
                    rows.map((row, i) => (
                      <tr key={row.id} className={`${i % 2 === 0 ? 'bg-[#E1F5FD]' : 'bg-white'} hover:bg-emerald-50/30 transition-colors group`}>
                         <td className="px-4 py-4 text-[11px] font-black text-slate-900 italic uppercase sticky left-0 bg-inherit z-10 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">{row.factura}</td>
                         <td className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase">{row.vendedor}</td>
                         <td className="px-4 py-4 text-[10px] font-bold text-slate-400">{row.codigo}</td>
                         <td className="px-6 py-4 text-[10px] font-black text-slate-900 uppercase italic text-left">{row.producto}</td>
                         <td className="px-4 py-4 text-[11px] font-black text-slate-900">{row.cantidad}</td>
                         <td className="px-4 py-4 text-[10px] font-bold text-slate-700 uppercase italic truncate max-w-[150px]">{row.cliente}</td>
                         <td className="px-4 py-4 text-[9px] font-medium text-slate-400 uppercase italic text-left">{row.direccion}</td>
                         <td className="px-4 py-4 text-[10px] font-black text-slate-500 uppercase italic">{row.distrito}</td>
                         <td className="px-4 py-4 text-[10px] font-bold text-slate-400">{row.fecha}</td>
                         <td className="px-4 py-4 text-[10px] font-black text-slate-900 italic text-right">S/ {parseFloat(row.montoSinIgv).toFixed(2)}</td>
                         <td className="px-4 py-4 text-[10px] font-black text-emerald-600 italic text-right bg-emerald-50/10">S/ {parseFloat(row.montoConIgv).toFixed(2)}</td>
                         <td className="px-4 py-4 sticky right-0 bg-inherit z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.02)]">
                            <button onClick={() => setRows(rows.filter(r => r.id !== row.id))} className="p-2 text-slate-300 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                         </td>
                      </tr>
                    ))
                  )}
               </tbody>
            </table>
         </div>

         {/* FOOTER TOTALES */}
         <div className="p-6 bg-slate-900 text-white flex justify-between items-center italic">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
               ITEMS EN DECLARACIÓN: <span className="text-white font-black">{rows.length} REGISTROS</span>
            </p>
            <div className="flex gap-10">
               <div className="text-right">
                  <p className="text-[8px] font-bold uppercase text-slate-500 leading-none mb-1">Monto Subtotal</p>
                  <p className="text-lg font-black leading-none italic">S/ {rows.reduce((acc, r) => acc + (parseFloat(r.montoSinIgv) || 0), 0).toLocaleString()}</p>
               </div>
               <div className="text-right border-l border-white/10 pl-10">
                  <p className="text-[8px] font-black uppercase text-emerald-500 leading-none mb-1 italic">Total Sell-Out Validado</p>
                  <p className="text-2xl font-black text-emerald-500 leading-none tracking-tighter italic">S/ {rows.reduce((acc, r) => acc + (parseFloat(r.montoConIgv) || 0), 0).toLocaleString()}</p>
               </div>
            </div>
         </div>
      </div>

      {/* MODAL DE ÉXITO DE COBRO (GOLDEN TICKET) */}
      {paymentSuccess && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setPaymentSuccess(false)}></div>
           <div className="relative bg-white w-full max-w-xl rounded-[3rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border-8 border-white animate-in zoom-in-95 duration-500">
              <div className="p-12 text-center relative">
                 {/* Decoración de éxito */}
                 <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                    <CheckCircle2 size={56} strokeWidth={3} className="animate-bounce" />
                 </div>

                 <h3 className="text-3xl font-black text-slate-900 uppercase italic leading-none mb-2">¡Solicitud Procesada!</h3>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10 italic">Auditoría Planta Universal SAC</p>

                 <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 text-left space-y-6 mb-10">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                       <span className="text-[9px] font-black text-slate-400 uppercase italic">ID Operación</span>
                       <span className="text-sm font-black text-slate-900">{opNumber}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                       <span className="text-[9px] font-black text-slate-400 uppercase italic">Beneficiario</span>
                       <span className="text-sm font-black text-slate-900 uppercase">CALETH LAVADO (DEX SUR)</span>
                    </div>
                    <div className="flex justify-between items-end">
                       <div>
                         <span className="text-[9px] font-black text-emerald-600 uppercase italic block mb-1">Monto a Liquidar</span>
                         <span className="text-4xl font-black italic tracking-tighter text-slate-900 leading-none">S/ {bonusAmount}</span>
                       </div>
                       <Receipt size={32} className="text-slate-200" />
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button onClick={() => window.print()} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest italic hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                       <Download size={14} /> DESCARGAR TICKET
                    </button>
                    <button onClick={() => setPaymentSuccess(false)} className="flex-1 py-4 border border-slate-200 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                       CERRAR VENTANA
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* ESTILOS SCROLLBAR */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar-horizontal::-webkit-scrollbar { height: 12px; }
        .custom-scrollbar-horizontal::-webkit-scrollbar-track { background: #F1F5F9; border-radius: 6px; }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb { background: #02A6E3; border-radius: 6px; border: 3px solid #F1F5F9; }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb:hover { background: #E21F26; }
      `}} />

      {/* MODAL DE REGISTRO MANUAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <form onSubmit={handleAddRow} className="relative bg-white w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="p-8 bg-[#02A6E3] text-white flex justify-between items-center">
               <div className="flex items-center gap-4">
                  <Plus size={24} strokeWidth={4} />
                  <h3 className="text-xl font-black uppercase italic leading-none text-white">Nueva Factura Sell-Out</h3>
               </div>
               <button type="button" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-4">
               <div className="space-y-1"><label className="text-[9px] font-black uppercase text-slate-400 italic">Factura</label><input required placeholder="F001-001" className="w-full bg-slate-50 p-3 rounded-xl border-none text-xs font-black uppercase outline-none focus:ring-2 focus:ring-[#02A6E3]" value={formData.factura} onChange={(e) => handleInputChange('factura', e.target.value)} /></div>
               <div className="space-y-1"><label className="text-[9px] font-black uppercase text-slate-400 italic">Vendedor</label><input required placeholder="Juan Pérez" className="w-full bg-slate-50 p-3 rounded-xl border-none text-xs font-black uppercase outline-none focus:ring-2 focus:ring-[#02A6E3]" value={formData.vendedor} onChange={(e) => handleInputChange('vendedor', e.target.value)} /></div>
               <div className="space-y-1"><label className="text-[9px] font-black uppercase text-slate-400 italic">Cod. Producto</label><input required placeholder="UN-01" className="w-full bg-slate-50 p-3 rounded-xl border-none text-xs font-black uppercase outline-none focus:ring-2 focus:ring-[#02A6E3]" value={formData.codigo} onChange={(e) => handleInputChange('codigo', e.target.value)} /></div>
               <div className="space-y-1"><label className="text-[9px] font-black uppercase text-slate-400 italic">Cant.</label><input required type="number" placeholder="0" className="w-full bg-slate-50 p-3 rounded-xl border-none text-xs font-black outline-none focus:ring-2 focus:ring-[#02A6E3]" value={formData.cantidad} onChange={(e) => handleInputChange('cantidad', e.target.value)} /></div>
               <div className="space-y-1 md:col-span-2"><label className="text-[9px] font-black uppercase text-slate-400 italic">Producto</label><input required placeholder="FLAN VAINILLA" className="w-full bg-slate-50 p-3 rounded-xl border-none text-xs font-black uppercase outline-none focus:ring-2 focus:ring-[#02A6E3]" value={formData.producto} onChange={(e) => handleInputChange('producto', e.target.value)} /></div>
               <div className="space-y-1 md:col-span-2"><label className="text-[9px] font-black uppercase text-slate-400 italic">Cliente</label><input required placeholder="BODEGA" className="w-full bg-slate-50 p-3 rounded-xl border-none text-xs font-black uppercase outline-none focus:ring-2 focus:ring-[#02A6E3]" value={formData.cliente} onChange={(e) => handleInputChange('cliente', e.target.value)} /></div>
               <div className="space-y-1 md:col-span-2"><label className="text-[9px] font-black uppercase text-slate-400 italic">Dirección</label><input required placeholder="AV. SUCRE" className="w-full bg-slate-50 p-3 rounded-xl border-none text-xs font-black uppercase outline-none focus:ring-2 focus:ring-[#02A6E3]" value={formData.direccion} onChange={(e) => handleInputChange('direccion', e.target.value)} /></div>
               <div className="space-y-1"><label className="text-[9px] font-black uppercase text-slate-400 italic">Distrito</label><input required placeholder="LIMA" className="w-full bg-slate-50 p-3 rounded-xl border-none text-xs font-black uppercase outline-none focus:ring-2 focus:ring-[#02A6E3]" value={formData.distrito} onChange={(e) => handleInputChange('distrito', e.target.value)} /></div>
               <div className="space-y-1"><label className="text-[9px] font-black uppercase text-slate-400 italic">Fecha</label><input required type="date" className="w-full bg-slate-50 p-3 rounded-xl border-none text-xs font-black outline-none focus:ring-2 focus:ring-[#02A6E3]" value={formData.fecha} onChange={(e) => handleInputChange('fecha', e.target.value)} /></div>
               <div className="space-y-1 md:col-span-2"><label className="text-[9px] font-black uppercase text-slate-400 italic flex items-center justify-between">Monto S/ IGV <Calculator size={10} /></label><input required type="number" step="0.01" placeholder="0.00" className="w-full bg-slate-50 p-3 rounded-xl border-none text-xs font-black outline-none focus:ring-2 focus:ring-[#02A6E3]" value={formData.montoSinIgv} onChange={(e) => handleInputChange('montoSinIgv', e.target.value)} /></div>
               <div className="space-y-1 md:col-span-2"><label className="text-[9px] font-black uppercase text-emerald-600 italic">Monto C/ IGV (Auto)</label><input required type="number" step="0.01" placeholder="0.00" className="w-full bg-emerald-50 p-3 rounded-xl border-none text-xs font-black outline-none ring-1 ring-emerald-100" value={formData.montoConIgv} onChange={(e) => handleInputChange('montoConIgv', e.target.value)} /></div>
            </div>
            <div className="p-8 bg-slate-50 flex justify-end gap-3">
               <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-[9px] font-black uppercase text-slate-400 hover:text-slate-900 transition-colors">Cancelar</button>
               <button type="submit" className="px-10 py-3 bg-[#02A6E3] text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg italic">Insertar Registro</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SellOutView;
