
import React from 'react';
import { FileDown, Image, FileText, Share2 } from 'lucide-react';

const MarketingAssets: React.FC = () => {
  const assets = [
    { title: 'Brochure Universal 2025', type: 'PDF', size: '4.2 MB', icon: <FileText className="text-red-500" /> },
    { title: 'Pack Fotos Postres HQ', type: 'ZIP', size: '128 MB', icon: <Image className="text-blue-500" /> },
    { title: 'Manual de Identidad DEX', type: 'PDF', size: '2.1 MB', icon: <Share2 className="text-purple-500" /> },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900 font-bold">Recursos para DIM/DEX</h3>
        <span className="text-[10px] text-gray-400">Actualizado hace 1 día</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {assets.map((asset, idx) => (
          <div key={idx} className="p-4 bg-gray-50 rounded-2xl flex items-center group cursor-pointer hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100">
            <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-gray-50">
              {asset.icon}
            </div>
            <div className="ml-3 overflow-hidden">
              <h4 className="text-xs font-bold text-gray-900 truncate">{asset.title}</h4>
              <p className="text-[10px] text-gray-500">{asset.type} • {asset.size}</p>
            </div>
            <button className="ml-auto p-2 text-gray-400 hover:text-[#E21F26]">
              <FileDown size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingAssets;
