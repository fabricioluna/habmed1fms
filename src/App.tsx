import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './views/HomeView';
import CareerQuiz from './components/CareerQuiz';
import CalculatorsView from './views/CalculatorsView';
import ReferencesView from './views/ReferencesView';
import SummariesListView from './views/SummariesListView';
import AdminLoginView from './views/AdminLoginView';
import AdminDashboardView from './views/AdminDashboardView';
import type { ViewState } from './types';
import { SIMULATIONS } from './constants';

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
            onSelectOption={(option, id) => { setSelectedDisciplineId(id); setCurrentView(option as ViewState); }}
          />
        )}
        {currentView === 'career-quiz' && <CareerQuiz onBack={() => setCurrentView('home')} />}
        {currentView === 'calculators' && <CalculatorsView onBack={() => setCurrentView('home')} />}
        {currentView === 'admin-login' && <AdminLoginView onLoginSuccess={() => setCurrentView('admin-dashboard')} onBack={() => setCurrentView('home')} />}
        {currentView === 'admin-dashboard' && <AdminDashboardView onLogout={() => setCurrentView('home')} />}
        {currentView === 'summaries-list' && selectedDisciplineId && <SummariesListView disciplineId={selectedDisciplineId} onBack={() => setCurrentView('home')} />}
        {currentView === 'references-view' && selectedDisciplineId && <ReferencesView disciplineId={selectedDisciplineId} disciplines={SIMULATIONS} onBack={() => setCurrentView('home')} />}
      </div>

      <footer className="bg-white border-t py-12 flex flex-col items-center gap-4 mt-auto">
        <button onClick={() => setCurrentView('admin-login')} className="text-gray-300 hover:text-[#003366] transition-colors text-[10px] font-black uppercase tracking-[0.3em] cursor-pointer">Acesso Restrito</button>
        <div className="text-center">
          <div className="text-[#D4A017] text-[11px] font-black uppercase tracking-[0.2em] mb-1">Desenvolvido por Fabrício Luna - Turma VIII</div>
          <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">© 2026 Medicina do Sertão</div>
        </div>
      </footer>
    </div>
  );
};

export default App;