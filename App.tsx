
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProfileView from './components/ProfileView';
import OrdersView from './components/OrdersView';
import MarketingView from './components/MarketingView';
import ReportsView from './components/ReportsView';
import SupportView from './components/SupportView';
import SettingsView from './components/SettingsView';
import LogisticsView from './components/LogisticsView';
import FinanceView from './components/FinanceView';
import TrainingView from './components/TrainingView';
import MessagesView from './components/MessagesView';
import TradeMarketingView from './components/TradeMarketingView';
import SellOutView from './components/SellOutView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard onViewChange={setActiveView} />;
      case 'pedidos': return <OrdersView />;
      case 'sellout': return <SellOutView />;
      case 'logistica': return <LogisticsView />;
      case 'reportes': return <ReportsView />;
      case 'documentos': return <FinanceView />;
      case 'marketing': return <MarketingView />;
      case 'trade': return <TradeMarketingView />;
      case 'escuela': return <TrainingView />;
      case 'mensajes': return <MessagesView />;
      case 'soporte': return <SupportView />;
      case 'profile': return <ProfileView />;
      case 'settings': return <SettingsView />;
      default: return <Dashboard onViewChange={setActiveView} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar 
        isOpen={true} 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <Header 
          onToggleSidebar={() => {}} 
          onViewChange={setActiveView} 
        />
        
        <main className="flex-1 overflow-y-auto no-scrollbar p-2 md:p-4 scroll-smooth">
          <div className="w-full mx-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
