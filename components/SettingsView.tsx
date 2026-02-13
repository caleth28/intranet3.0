
import React from 'react';
import { User, Bell, Shield, Smartphone } from 'lucide-react';

const SettingsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h2 className="text-3xl font-black text-gray-900 mb-8">Configuraciones</h2>
      
      <div className="space-y-6">
        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-blue-900 flex items-center justify-center text-white text-3xl font-black">CL</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Caleth Lavado</h3>
              <p className="text-sm text-gray-500">Operaciones DEX Sur • ID: 2025-001</p>
              <button className="mt-2 text-xs font-bold text-red-600 hover:underline">Cambiar foto de perfil</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2">Nombre Completo</label>
              <input type="text" defaultValue="Caleth Lavado Verona" className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2">Correo Corporativo</label>
              <input type="email" defaultValue="c.lavado@universal.pe" className="w-full bg-gray-50 border-none rounded-xl py-3 px-4 text-sm" />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6 flex items-center">
            <Bell className="mr-2 text-red-600" size={20} />
            Notificaciones
          </h3>
          <div className="space-y-4">
            {[
              { title: 'Estado de Pedidos', desc: 'Recibe alertas cuando tu pedido cambie de estado.' },
              { title: 'Nuevos Recursos Marketing', desc: 'Avisar cuando se suban fotos o brochures.' },
              { title: 'Alertas de Stock', desc: 'Notificar quiebres de stock en mis SKUs favoritos.' },
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between py-2">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <div className="w-12 h-6 bg-red-600 rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end space-x-3">
          <button className="px-6 py-2.5 rounded-2xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancelar</button>
          <button className="bg-[#E21F26] text-white px-8 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-red-100 hover:bg-red-700 transition-all">Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
