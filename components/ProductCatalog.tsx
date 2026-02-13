
import React, { useState } from 'react';
import { ShoppingCart, Plus, Tag, Info, CheckCircle2, AlertCircle, Check, Package } from 'lucide-react';

interface ProductCatalogProps {
  activeCategory?: string;
  searchQuery?: string;
  onAdd?: (product: any) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ activeCategory = 'Todos', searchQuery = '', onAdd }) => {
  const [addingId, setAddingId] = useState<string | null>(null);

  const products = [
    { id: '1', name: 'Flan Vainilla Universal 160g', sku: 'UN-FLV-001', stock: 1000, price: 'S/ 45.00', category: 'Postres', weight: '0.16kg' },
    { id: '2', name: 'Gelatina Fresa Familiar 500g', sku: 'UN-GEF-005', stock: 5, price: 'S/ 38.50', category: 'Postres', weight: '0.50kg' },
    { id: '3', name: 'Polvo de Hornear Industrial 1kg', sku: 'UN-PHP-102', stock: 500, price: 'S/ 62.00', category: 'Reposteria', weight: '1.00kg' },
    { id: '4', name: 'Refresco Chicha Morada 1kg', sku: 'UN-REF-901', stock: 200, price: 'S/ 12.50', category: 'Refrescos', weight: '1.00kg' },
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddAction = (product: any) => {
    setAddingId(product.id);
    if (onAdd) onAdd(product);
    setTimeout(() => setAddingId(null), 1000);
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-300">
        <Package size={80} strokeWidth={1} className="mb-4" />
        <p className="text-sm font-black uppercase tracking-widest italic">No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {filteredProducts.map((product) => (
        <div 
          key={product.id} 
          className="group relative flex flex-col md:flex-row items-center gap-6 p-6 bg-white border border-gray-100 rounded-[2rem] hover:border-red-100 hover:shadow-2xl hover:shadow-red-50/40 transition-all duration-500"
        >
          <div className="w-14 h-14 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
            <Package size={24} />
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">SKU: {product.sku}</p>
              <h4 className="text-xl font-black text-slate-900 italic uppercase leading-tight group-hover:text-red-600 transition-colors">
                {product.name}
              </h4>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
              {/* NOTA DE INTENCIÓN */}
              <div className="flex items-center text-slate-400 bg-slate-50 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest italic border border-slate-100">
                <ShoppingCart size={10} className="mr-1.5" /> AGREGAR A INTENCIÓN DE COMPRA
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase border-l border-gray-200 pl-3">Format: {product.weight}</span>
            </div>
          </div>

          <div className="flex items-center space-x-8 shrink-0">
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Precio Unitario</p>
              <p className="text-2xl font-black text-slate-900 tracking-tighter italic">{product.price}</p>
            </div>

            <button 
              onClick={() => handleAddAction(product)}
              className={`relative p-5 rounded-2xl transition-all shadow-xl active:scale-95 ${addingId === product.id ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-slate-900 text-white hover:bg-red-600 shadow-slate-100'}`}
            >
              {addingId === product.id ? <Check size={24} strokeWidth={4} className="animate-in zoom-in" /> : <Plus size={24} strokeWidth={3} />}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCatalog;
