
import React from 'react';
import { 
  ChevronLeft, 
  Printer, 
  Download, 
  FileText, 
  User, 
  MapPin, 
  Calendar,
  Package,
  BadgeCheck,
  CreditCard,
  Info
} from 'lucide-react';

interface OrderDetailViewProps {
  order: any;
  onBack: () => void;
}

const OrderDetailView: React.FC<OrderDetailViewProps> = ({ order, onBack }) => {
  // Datos exactos basados en la imagen de referencia técnica
  const items = [
    { id: '20201120100', name: 'FLAN UNIVERSAL VAINILLA 150 Gr. 1.5LT PAQ 24 UNDS', qty: 500.00, price: 53.47, disc: 0.00 },
    { id: '20201220700', name: 'FLAN UNIVERSAL VAINILLA 5 KG. 30LT BOLSA 1 UND', qty: 50.00, price: 43.39, disc: 0.00 },
    { id: '20301120400', name: 'MAZAMORRA UNIVERSAL MORADA 150 Gr. 1.5LT PAQ 24 UNDS', qty: 110.00, price: 40.51, disc: 0.00 },
    { id: '20301120500', name: 'MAZAMORRA UNIVERSAL DURAZNO 150 Gr. 1.5LT PAQ 24 UNDS', qty: 10.00, price: 40.51, disc: 0.00 },
    { id: '20301121900', name: 'MAZAMORRA UNIVERSAL PIÑA 150 Gr. 1.5LT PAQ 24 UNDS', qty: 10.00, price: 40.51, disc: 0.00 },
    { id: '20401150100', name: 'PUDIN UNIVERSAL VAINILLA 100 Gr. 1.0LT PAQ 24 UNDS', qty: 200.00, price: 40.51, disc: 0.00 },
    { id: '20401150200', name: 'PUDIN UNIVERSAL CHOCOLATE 100 Gr. 1.0LT PAQ 24 UNDS', qty: 250.00, price: 40.51, disc: 0.00 },
    { id: '20901310000', name: 'COLAPIZ UNIVERSAL 20 Gr. DSP 36 UNDS', qty: 680.00, price: 49.92, disc: 0.00 },
    { id: '21005290000', name: 'COLAGENO SANAVITA 10 Gr. PACK 8 X 15', qty: 1.00, price: 201.36, disc: 0.00 },
  ];

  // Cálculos totales
  const totalProducts = items.reduce((acc, item) => acc + item.qty, 0);
  const totalSubTotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const totalIGV = totalSubTotal * 0.18;
  const grandTotal = totalSubTotal + totalIGV;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 pb-20">
      
      {/* BARRA DE ACCIONES SUPERIOR */}
      <div className="flex justify-between items-center mb-10">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-400 hover:text-red-600 font-black text-[10px] uppercase tracking-[0.2em] italic transition-all"
        >
          <ChevronLeft size={18} className="mr-2" /> Volver al listado
        </button>
        <div className="flex gap-4">
          <button className="flex items-center px-6 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download size={14} className="mr-2" /> Descargar PDF
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl shadow-slate-100"
          >
            <Printer size={14} className="mr-2" /> Imprimir Documento
          </button>
        </div>
      </div>

      {/* CABECERA DE DOCUMENTO */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <FileText size={200} />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] mb-2 italic">Información del Cliente</p>
              <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-tight mb-2">CORPORACION JULCAP EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIM</h2>
              <div className="flex flex-wrap gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <span className="flex items-center"><BadgeCheck size={14} className="mr-2 text-blue-500" /> RUC: 20538446182</span>
                <span className="flex items-center"><MapPin size={14} className="mr-2 text-red-600" /> LA VICTORIA, LIMA</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur rounded-[2rem] border border-white/10 p-8 grid grid-cols-2 gap-8">
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Nro Pedido</p>
              <p className="text-2xl font-black italic tracking-tighter text-red-500">#{order.id}</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Estado</p>
              <p className="text-lg font-black uppercase italic text-emerald-400">{order.status}</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Cond. Venta</p>
              <p className="text-sm font-bold uppercase italic tracking-widest">CONTADO</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Emisión</p>
              <p className="text-sm font-bold uppercase italic tracking-widest">{order.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CUERPO DEL PEDIDO - TABLA TÉCNICA */}
      <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden mb-10">
        <div className="p-10 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
          <h3 className="text-sm font-black uppercase italic tracking-widest flex items-center text-slate-900">
            <Package size={20} className="mr-3 text-red-600" /> Detalle Deep-Search de Productos
          </h3>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left min-w-[1200px]">
            <thead>
              <tr className="bg-white border-b border-slate-50">
                <th className="px-8 py-6 text-[9px] font-black text-slate-300 uppercase tracking-widest italic">Código</th>
                <th className="px-8 py-6 text-[9px] font-black text-slate-300 uppercase tracking-widest italic">Producto</th>
                <th className="px-8 py-6 text-[9px] font-black text-slate-300 uppercase tracking-widest italic text-center">Cant.</th>
                <th className="px-8 py-6 text-[9px] font-black text-slate-300 uppercase tracking-widest italic text-right">Precio Paq.</th>
                <th className="px-8 py-6 text-[9px] font-black text-slate-300 uppercase tracking-widest italic text-center">% Desc</th>
                <th className="px-8 py-6 text-[9px] font-black text-slate-300 uppercase tracking-widest italic text-right">Sub-Total</th>
                <th className="px-8 py-6 text-[9px] font-black text-slate-300 uppercase tracking-widest italic text-right">I.G.V.</th>
                <th className="px-8 py-6 text-[9px] font-black text-slate-900 uppercase tracking-widest italic text-right bg-slate-50/30">Total S/.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {items.map((item, idx) => {
                const subLine = item.qty * item.price;
                const igvLine = subLine * 0.18;
                const totalLine = subLine + igvLine;

                return (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-5 text-[11px] font-black text-slate-400 italic">{item.id}</td>
                    <td className="px-8 py-5">
                      <p className="text-[12px] font-black text-slate-900 uppercase italic leading-tight group-hover:text-red-600 transition-colors">
                        {item.name}
                      </p>
                    </td>
                    <td className="px-8 py-5 text-center font-black text-slate-900 italic text-xs">
                      {item.qty.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-8 py-5 text-right font-bold text-slate-500 text-xs">
                      {item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-8 py-5 text-center font-bold text-slate-400 text-[10px]">
                      {item.disc.toFixed(2)}
                    </td>
                    <td className="px-8 py-5 text-right font-bold text-slate-600 text-xs">
                      {subLine.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-8 py-5 text-right font-bold text-slate-400 text-[10px]">
                      {igvLine.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-8 py-5 text-right font-black text-slate-900 italic text-sm bg-slate-50/20">
                      {totalLine.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Pie de tabla para totales directos */}
            <tfoot className="bg-slate-50 border-t-2 border-slate-100">
               <tr>
                  <td className="px-8 py-6 font-black text-slate-900 text-sm italic" colSpan={2}>
                    {totalProducts.toLocaleString()} <span className="text-[9px] uppercase tracking-widest text-slate-400 ml-2">Total Productos</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-xs font-black text-slate-400 uppercase italic tracking-widest">Totales</span>
                  </td>
                  <td colSpan={2}></td>
                  <td className="px-8 py-6 text-right font-black text-slate-900 text-sm italic">
                    {totalSubTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-8 py-6 text-right font-black text-slate-400 text-xs italic">
                    {totalIGV.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-8 py-6 text-right font-black text-red-600 text-lg italic tracking-tighter">
                    S/ {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
               </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* SECCIÓN DE OBSERVACIONES Y RESUMEN FINAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
              <Info size={18} className="text-slate-400" />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Observación del Pedido</h4>
           </div>
           <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 min-h-[120px]">
              <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
                {order.observations || "El despacho se realizará según el cronograma DIM establecido."}
              </p>
           </div>
        </div>

        <div className="lg:col-span-5 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl">
           <div className="space-y-6">
              <div className="flex justify-between items-center opacity-60">
                 <span className="text-[10px] font-black uppercase tracking-widest italic">Base Imponible</span>
                 <span className="text-lg font-black italic">S/ {totalSubTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center opacity-60">
                 <span className="text-[10px] font-black uppercase tracking-widest italic">I.G.V. (18%)</span>
                 <span className="text-lg font-black italic">S/ {totalIGV.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                 <div>
                    <span className="text-[10px] font-black uppercase text-red-500 tracking-widest italic block mb-2">Total Final del Pedido</span>
                    <div className="flex items-center gap-3">
                       <CreditCard className="text-red-600" size={32} />
                       <span className="text-5xl font-black italic tracking-tighter leading-none">
                         S/ {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                       </span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailView;
