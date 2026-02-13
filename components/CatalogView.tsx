
import React, { useState } from 'react';
import ProductCatalog from './ProductCatalog';
import { 
  Package, 
  Search, 
  Grid, 
  List, 
  Layers,
  ShoppingCart,
  Trash2,
  X,
  Truck,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
  Minus,
  Plus
} from 'lucide-react';

interface CatalogViewProps {
  onViewChange?: (view: string) => void;
}

const CatalogView: React.FC<CatalogViewProps> = ({ onViewChange }) => {
  const [activeTab, setActiveTab] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{product: any, qty: number}[]>([]);
  const [showCart, setShowCart] = useState(false);

  const categories = [
    { id: 'Todos', label: 'Todos', count: 180 },
    { id: 'Postres', label: 'Postres', count: 42 },
    { id: 'Reposteria', label: 'Repostería', count: 38 },
    { id: 'Refrescos', label: 'Refrescos', count: 25 },
    { id: 'Sin Azucar', label: 'Sin Azúcar', count: 15 },
    { id: 'Granel', label: 'Granel', count: 60 },
  ];

  const handleAddToCart = (product: any) => {
    setCart(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { product, qty: 1 }];
    });
    setShowCart(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const updateQty = (id: string, value: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        return { ...item, qty: Math.max(1, value) };
      }
      return item;
    }));
  };

  const totalUnits = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (parseFloat(item.product.price.replace('S/ ', '')) * item.qty), 0);

  return (
    <div className="relative space-y-8 animate-in fade-in zoom-in-95 duration-500 min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight uppercase italic leading-none mb-2">Catálogo Maestro</h2>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Consulta oficial de productos y preventa DEX.</p>
        </div>
        <div className="flex items-center space-x-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Buscar por SKU o Nombre..." className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-red-50 transition-all" />
          </div>
          <button onClick={() => { setShowCart(!showCart); }} className="relative bg-slate-900 text-white p-3.5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl">
            <ShoppingCart size={22} />
            {totalUnits > 0 && <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white animate-bounce">{totalUnits}</span>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className={`space-y-8 transition-all duration-500 ${showCart ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          <div className="flex p-1.5 bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setActiveTab(cat.id)} className={`flex items-center space-x-2 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === cat.id ? 'bg-red-600 text-white shadow-lg' : 'text-gray-400 hover:text-red-600'}`}>
                <span>{cat.label}</span>
                <span className={`px-2 py-0.5 rounded-md text-[8px] ${activeTab === cat.id ? 'bg-white/20' : 'bg-gray-100 text-gray-400'}`}>{cat.count}</span>
              </button>
            ))}
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative min-h-[600px]">
            <ProductCatalog activeCategory={activeTab} searchQuery={searchQuery} onAdd={handleAddToCart} />
          </div>
        </div>

        {showCart && (
          <div className="lg:col-span-4 sticky top-28 animate-in slide-in-from-right-10 duration-500">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-160px)]">
               <div className="p-8 bg-slate-900 text-white flex justify-between items-center">
                  <div className="flex items-center space-x-3"><ShoppingCart className="text-red-500" size={24} /><h3 className="text-sm font-black uppercase italic">Intención de Carga</h3></div>
                  <button onClick={() => setShowCart(false)}><X size={20} /></button>
               </div>
               <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar bg-slate-50/50">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-white rounded-2xl border border-transparent hover:border-red-100 transition-all shadow-sm group">
                       <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-black uppercase italic truncate">{item.product.name}</p>
                          <div className="flex items-center mt-2 bg-slate-50 rounded-lg p-0.5 w-fit border border-gray-100">
                             <button onClick={() => updateQty(item.product.id, item.qty - 1)} className="p-1 hover:text-red-600 transition-colors"><Minus size={12} /></button>
                             <input 
                               type="number" 
                               value={item.qty}
                               min="1"
                               onChange={(e) => updateQty(item.product.id, parseInt(e.target.value) || 1)}
                               className="w-10 text-center text-[11px] font-black bg-transparent outline-none border-none"
                             />
                             <button onClick={() => updateQty(item.product.id, item.qty + 1)} className="p-1 hover:text-red-600 transition-colors"><Plus size={12} /></button>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-xs font-black italic">S/ {(parseFloat(item.product.price.replace('S/ ', '')) * item.qty).toFixed(2)}</p>
                          <button onClick={() => removeFromCart(item.product.id)} className="text-[9px] font-black text-red-500 uppercase mt-1">Quitar</button>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="p-8 bg-white border-t border-gray-100 space-y-4">
                  <div className="flex justify-between items-center text-red-600">
                    <span className="text-[10px] font-black uppercase">Total Solicitado</span>
                    <span className="text-2xl font-black italic">S/ {totalPrice.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={() => onViewChange?.('pedidos')} 
                    className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-xs uppercase italic shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    CONTINUAR A PEDIDOS <ArrowRight size={16} />
                  </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogView;
