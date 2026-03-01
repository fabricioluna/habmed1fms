import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './views/HomeView';
import CareerQuiz from './components/CareerQuiz';
import CalculatorsView from './views/CalculatorsView';
import ReferencesView from './views/ReferencesView';
import SummariesListView from './views/SummariesListView'; // NOVA IMPORTAÇÃO
import type { ViewState } from './types';
import { SIMULATIONS } from './constants';

const APP_VERSION = "1.6.0 - Central de Materiais Ativa";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | null>(null);

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
            onNavigateToQuiz={() => setCurrentView('career-quiz')}
            onNavigateToCalculators={() => setCurrentView('calculators')}
            onSelectOption={(option, disciplineId) => {
              setSelectedDisciplineId(disciplineId);
              setCurrentView(option as ViewState);
            }}
          />
        )}
        
        {currentView === 'career-quiz' && (
          <CareerQuiz onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'calculators' && (
          <CalculatorsView onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'references-view' && selectedDisciplineId && (
          <ReferencesView 
            disciplineId={selectedDisciplineId}
            disciplines={SIMULATIONS}
            onBack={() => setCurrentView('home')}
          />
        )}

        {/* NOVO ECRÃ: CENTRAL DE MATERIAIS */}
        {currentView === 'summaries-list' && selectedDisciplineId && (
          <SummariesListView 
            disciplineId={selectedDisciplineId}
            onBack={() => setCurrentView('home')}
          />
        )}

        {/* As futuras telas (Quiz, Paciente IA) serão renderizadas aqui em breve! */}
        
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