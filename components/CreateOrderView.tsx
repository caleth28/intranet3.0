
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  ShieldCheck, 
  PackageSearch, 
  AlertTriangle,
  Info,
  ShieldAlert
} from 'lucide-react';

interface CreateOrderViewProps {
  onBack: () => void;
  editOrder?: any;
}

const CreateOrderView: React.FC<CreateOrderViewProps> = ({ onBack, editOrder }) => {
  const [step, setStep] = useState<'selection' | 'validation' | 'success'>('selection');
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<{ product: any, requestedQty: number }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  const products = [
    { id: '20101100100', name: 'GELATINA UNIVERSAL FRESA 150 Gr.', stock: 24, price: 57.71, category: 'GELATINAS' },
    { id: '20101100200', name: 'GELATINA UNIVERSAL NARANJA 150 Gr.', stock: 12, price: 57.71, category: 'GELATINAS' },
    { id: '20201120100', name: 'FLAN UNIVERSAL VAINILLA 150 Gr.', stock: 200, price: 53.47, category: 'POSTRES' },
    { id: '20301120400', name: 'MAZAMORRA UNIVERSAL MORADA 150 Gr.', stock: 0, price: 40.51, category: 'POSTRES' },
  ];

  useEffect(() => {
    if (editOrder) {
      setCart([
        { product: products[0], requestedQty: 30 },
        { product: products[3], requestedQty: 12 }
      ]);
    }
  }, [editOrder]);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search)
  );

  const addToCart = (product: any) => {
    setCart(prev => {
      const exists = prev.find(i => i.product.id === product.id);
      if (exists) return prev.map(i => i.product.id === product.id ? { ...i, requestedQty: i.requestedQty + 1 } : i);
      return [...prev, { product, requestedQty: 1 }];
    });
  };

  const updateQty = (id: string, value: number) => {
    setCart(prev => prev.map(i => i.product.id === id ? { ...i, requestedQty: Math.max(1, value) } : i));
  };

  const handleConfirmPurchase = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const orderId = editOrder ? editOrder.id : `DESP-${Math.floor(9000 + Math.random() * 999)}`;
      
      // LOGICA DE VENTA PERDIDA (GAP)
      const currentLostSales = JSON.parse(localStorage.getItem('gerencia_ventas_perdidas') || '[]');
      
      const newLostEntries = cart
        .filter(item => item.requestedQty > item.product.stock)
        .map(item => ({
          orderId: orderId,
          date: new Date().toLocaleDateString('es-ES'),
          product: item.product.name,
          lost: item.requestedQty - item.product.stock,
          lossValue: (item.requestedQty - item.product.stock) * item.product.price
        }));

      if (newLostEntries.length > 0) {
        localStorage.setItem('gerencia_ventas_perdidas', JSON.stringify([...newLostEntries, ...currentLostSales]));
      }

      // GUARDAR PEDIDO (STOCK QUE SÍ HAY)
      const finalItems = cart
        .map(i => ({ ...i, confirmedQty: Math.min(i.requestedQty, i.product.stock) }))
        .filter(i => i.confirmedQty > 0);

      const totalValue = finalItems.reduce((acc, i) => acc + (i.confirmedQty * i.product.price), 0);
      const savedOrders = JSON.parse(localStorage.getItem('dex_orders') || '[]');
      
      if (editOrder) {
        const updated = savedOrders.map((o: any) => o.id === orderId ? {
          ...o,
          total: `S/ ${totalValue.toFixed(2)}`,
          items: `${finalItems.length} ITEMS`,
          date: new Date().toLocaleString(),
        } : o);
        localStorage.setItem('dex_orders', JSON.stringify(updated));
      } else {
        const newOrder = {
          id: orderId,
          client: "MANCINI SALAZAR CARLOS ALBERTO",
          date: new Date().toLocaleString(),
          status: 'Pendiente',
          total: `S/ ${totalValue.toFixed(2)}`,
          items: `${finalItems.length} ITEMS`
        };
        localStorage.setItem('dex_orders', JSON.stringify([newOrder, ...savedOrders]));
      }

      setGeneratedOrderId(orderId);
      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  // Cálculo de totales dinámicos según la fase
  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const qtyToBill = step === 'validation' ? Math.min(item.requestedQty, item.product.stock) : item.requestedQty;
      return acc + (item.product.price * qtyToBill);
    }, 0);
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-24 animate-in zoom-in-95 duration-500 text-center">
        <div className="w-28 h-28 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-10 shadow-xl shadow-emerald-50">
          <CheckCircle2 size={64} strokeWidth={3} className="animate-bounce" />
        </div>
        <h3 className="text-5xl font-black italic uppercase text-slate-900 tracking-tighter mb-4">
          {editOrder ? '¡Pedido Actualizado!' : '¡Pedido Sincronizado!'}
        </h3>
        <div className="bg-emerald-50 px-8 py-4 rounded-2xl mb-12">
           <p className="text-emerald-700 font-black uppercase text-xs tracking-widest italic">Carga autorizada por el sistema</p>
        </div>
        <p className="text-slate-400 font-bold uppercase tracking-widest mb-12 italic">ID Transacción: {generatedOrderId}</p>
        <button onClick={onBack} className="bg-slate-900 text-white px-16 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] italic hover:bg-red-600 transition-all shadow-2xl">VOLVER AL LISTADO</button>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div>
        <button onClick={onBack} className="flex items-center text-slate-400 font-black text-[10px] uppercase tracking-widest italic mb-4 hover:text-red-600 transition-colors">
          <ChevronLeft size={16} className="mr-1" /> Atrás
        </button>
        <h2 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter leading-none">
          {step === 'selection' 
            ? (editOrder ? `Ajuste de Pedido #${editOrder.id}` : '1. Captura de Demanda') 
            : '2. Validación de Planta'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          {step === 'selection' ? (
            <>
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors" size={22} />
                <input 
                  type="text" 
                  placeholder="Ingresa SKU o nombre del producto..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2rem] text-sm font-medium outline-none focus:ring-4 focus:ring-red-50 transition-all shadow-sm"
                />
              </div>
              <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm min-h-[500px]">
                <div className="space-y-4">
                  {filteredProducts.map(p => (
                    <div key={p.id} className="flex items-center gap-6 p-6 bg-slate-50/30 rounded-[2.5rem] border border-transparent hover:border-red-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                       <div className="flex-1">
                          <p className="text-[10px] font-black text-slate-300 uppercase italic tracking-widest mb-1.5">{p.id}</p>
                          <h4 className="text-base font-black text-slate-900 uppercase italic group-hover:text-red-600 transition-colors">{p.name}</h4>
                          <span className="text-xl font-black italic text-slate-900 mt-2 block">S/ {p.price.toFixed(2)}</span>
                       </div>
                       <button onClick={() => addToCart(p)} className="w-16 h-16 bg-slate-900 text-white rounded-3xl flex items-center justify-center hover:bg-red-600 transition-all shadow-lg active:scale-95">
                         <Plus size={28} strokeWidth={3} />
                       </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm space-y-8 animate-in slide-in-from-left-4 duration-500">
               <h3 className="text-xl font-black uppercase italic tracking-widest text-slate-900 flex items-center">
                 <ShieldCheck size={28} className="mr-4 text-emerald-500" /> Resultados de Auditoría Stock
               </h3>
               
               <div className="space-y-6">
                  {cart.map(item => {
                    const hasInsufficient = item.requestedQty > item.product.stock;
                    return (
                      <div key={item.product.id} className={`p-8 rounded-[3rem] border flex flex-col md:flex-row items-center gap-8 transition-all ${hasInsufficient ? 'bg-red-50/50 border-red-200' : 'bg-emerald-50/30 border-emerald-100'}`}>
                         <div className="flex-1 text-center md:text-left">
                            <h4 className="text-sm font-black text-slate-900 uppercase italic mb-4">{item.product.name}</h4>
                            <div className="flex justify-center md:justify-start gap-12">
                               <div><p className="text-[9px] font-black text-slate-400 uppercase">Demanda Real</p><p className="text-xl font-black italic">{item.requestedQty} UND</p></div>
                               <div><p className="text-[9px] font-black text-slate-400 uppercase">Disponible</p><p className={`text-xl font-black italic ${hasInsufficient ? 'text-red-600' : 'text-emerald-600'}`}>{item.product.stock} UND</p></div>
                            </div>
                         </div>
                         <div className="shrink-0">
                            {hasInsufficient ? (
                               <div className="flex flex-col items-center">
                                 <AlertTriangle size={32} className="text-orange-500 mb-2" />
                                 <span className="text-[9px] font-black text-red-600 uppercase italic">Stock Insuficiente</span>
                               </div>
                            ) : (
                               <div className="flex flex-col items-center">
                                 <ShieldCheck size={32} className="text-emerald-500 mb-2" />
                                 <span className="text-[9px] font-black text-emerald-600 uppercase italic">Stock Ok</span>
                               </div>
                            )}
                         </div>
                      </div>
                    );
                  })}
               </div>
               
               {cart.some(i => i.requestedQty > i.product.stock) && (
                 <div className="bg-orange-50 border border-orange-200 rounded-[2rem] p-8 flex items-start gap-6">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                       <Info size={24} />
                    </div>
                    <div>
                       <h5 className="text-sm font-black text-orange-800 uppercase italic mb-1">Aviso de Restricción Operativa</h5>
                       <p className="text-[11px] font-medium text-orange-700 italic leading-relaxed">
                         Debido a políticas de planta, las solicitudes que superen el stock físico serán ajustadas automáticamente para procesar la facturación. El diferencial (GAP) será registrado en el reporte de Gerencia para su análisis.
                       </p>
                    </div>
                 </div>
               )}
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
           <div className="bg-slate-900 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden sticky top-28 flex flex-col h-[calc(100vh-160px)]">
              <div className="p-10 bg-slate-950 text-white">
                <h3 className="text-sm font-black uppercase italic tracking-[0.2em] text-red-500 mb-1">Resumen de Carga</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{cart.length} productos seleccionados</p>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-4 no-scrollbar bg-slate-900/50">
                 {cart.map(item => {
                   const isCapped = step === 'validation' && item.requestedQty > item.product.stock;
                   const finalQty = isCapped ? item.product.stock : item.requestedQty;
                   
                   return (
                     <div key={item.product.id} className={`p-5 rounded-3xl border transition-all flex items-center gap-4 ${isCapped ? 'bg-red-950/30 border-red-500/30' : 'bg-white/5 border-white/5'}`}>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-2 mb-2">
                             <p className="text-[11px] font-black uppercase italic truncate text-white">{item.product.name}</p>
                             {isCapped && <span className="bg-red-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded-sm animate-pulse">AJUSTADO A STOCK</span>}
                           </div>
                           <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className={`text-[14px] font-black italic ${isCapped ? 'text-red-500' : 'text-slate-300'}`}>S/ {(item.product.price * finalQty).toFixed(2)}</span>
                                {isCapped && <span className="text-[8px] font-bold text-slate-500 uppercase italic">Facturando {finalQty} de {item.requestedQty}</span>}
                              </div>

                              {step === 'selection' && (
                                <div className="flex items-center gap-1 bg-white/5 rounded-2xl p-1">
                                   <button onClick={() => updateQty(item.product.id, item.requestedQty - 1)} className="p-1.5 text-slate-400 hover:text-white transition-colors"><Minus size={14} /></button>
                                   <input type="number" value={item.requestedQty} onChange={(e) => updateQty(item.product.id, parseInt(e.target.value) || 1)} className="w-10 text-center text-xs font-black bg-transparent outline-none border-none text-white" />
                                   <button onClick={() => updateQty(item.product.id, item.requestedQty + 1)} className="p-1.5 text-slate-400 hover:text-white transition-colors"><Plus size={14} /></button>
                                </div>
                              )}
                           </div>
                        </div>
                        {step === 'selection' && (
                          <button onClick={() => setCart(prev => prev.filter(i => i.product.id !== item.product.id))} className="text-white/10 hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        )}
                     </div>
                   );
                 })}
              </div>

              <div className="p-10 bg-slate-950 border-t border-white/5 space-y-8">
                 <div className="flex justify-between items-center text-white">
                    <span className="text-[11px] font-black uppercase italic text-slate-500">
                      {step === 'validation' ? 'Monto a Facturar' : 'Valor Estimado'}
                    </span>
                    <span className={`text-3xl font-black italic ${step === 'validation' ? 'text-emerald-500' : 'text-white'}`}>
                      S/ {calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                 </div>
                 
                 {step === 'selection' ? (
                   <button onClick={() => setStep('validation')} disabled={cart.length === 0} className="w-full py-6 bg-red-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 disabled:opacity-30 transition-all italic flex items-center justify-center gap-3">
                     VALIDAR EN PLANTA <ArrowRight size={20} />
                   </button>
                 ) : (
                   <button onClick={handleConfirmPurchase} disabled={isProcessing} className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 disabled:opacity-30 transition-all italic flex items-center justify-center gap-3">
                     {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <>{editOrder ? 'ACTUALIZAR PEDIDO' : 'CONFIRMAR CARGA REAL'} <ShieldCheck size={20} /></>}
                   </button>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderView;
