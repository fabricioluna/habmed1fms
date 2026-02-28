import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './views/HomeView';
import type { ViewState } from './types';
import { SIMULATIONS } from './constants';

const APP_VERSION = "1.0.0 - Base Visual HM1";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | null>(null);

  const handleSelectDiscipline = (id: string) => {
    setSelectedDisciplineId(id);
    alert(`Preparando o hub de ${id}... Próxima etapa!`); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f6] font-sans">
      <Header onNavigate={(view) => {
        setCurrentView(view);
        if (view === 'home') setSelectedDisciplineId(null);
      }} />

      <div className="flex-grow">
        {currentView === 'home' && (
          <HomeView 
            disciplines={SIMULATIONS} 
            onSelectDiscipline={handleSelectDiscipline} 
          />
        )}
      </div>

      <footer className="bg-white border-t py-8 flex flex-col items-center gap-2 mt-auto">
        <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">© 2026 Medicina do Sertão • 1º Período</div>
        <div className="text-[#D4A017] text-[11px] font-black uppercase tracking-[0.2em] mb-1">Desenvolvido por Fabrício Luna</div>
        <div className="text-[8px] text-gray-300 font-black uppercase tracking-tighter">Build {APP_VERSION}</div>
      </footer>
    </div>
  );
};

export default App;