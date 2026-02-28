import React, { useState } from 'react';
import Header from './components/Header.tsx';
import HomeView from './views/HomeView.tsx';
import CareerQuiz from './components/CareerQuiz.tsx';
import CalculatorsView from './views/CalculatorsView.tsx';
import DisciplineView from './views/DisciplineView.tsx'; // IMPORTAÇÃO DO HUB
import type { ViewState } from './types.ts';
import { SIMULATIONS } from './constants.tsx';

const APP_VERSION = "1.3.0 - Hub da Disciplina Ativado";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | null>(null);

  // Removido o alert! Agora ele navega de verdade.
  const handleSelectDiscipline = (id: string) => {
    setSelectedDisciplineId(id);
    setCurrentView('discipline');
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
            onNavigateToQuiz={() => setCurrentView('career-quiz')}
            onNavigateToCalculators={() => setCurrentView('calculators')}
          />
        )}
        
        {currentView === 'career-quiz' && (
          <CareerQuiz onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'calculators' && (
          <CalculatorsView onBack={() => setCurrentView('home')} />
        )}

        {/* ECRÃ DO HUB DA DISCIPLINA RENDERIZADO AQUI */}
        {currentView === 'discipline' && selectedDisciplineId && (
          <DisciplineView 
            disciplineId={selectedDisciplineId} 
            disciplines={SIMULATIONS}
            summaries={[]} // Array vazio temporário até ligarmos o Firebase
            onBack={() => setCurrentView('home')} 
            onSelectOption={(type) => setCurrentView(type as ViewState)}
          />
        )}
      </div>

      <footer className="bg-white border-t py-8 flex flex-col items-center gap-2 mt-auto">
        <div className="text-[#D4A017] text-[11px] font-black uppercase tracking-[0.2em] mb-1">
          Desenvolvido por Fabrício Luna - Turma VIII
        </div>
        <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
          © 2026 Medicina do Sertão
        </div>
        <div className="text-[8px] text-gray-300 font-black uppercase tracking-tighter">Build {APP_VERSION}</div>
      </footer>
    </div>
  );
};

export default App;