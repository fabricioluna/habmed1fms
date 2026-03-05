import React, { useState, useEffect } from 'react';
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
  
  // --- NOVA REGRA: Rolar sempre para o topo ao mudar de tela ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);
  // -------------------------------------------------------------

  // LÓGICA DO MODO ESCURO (Padrão: Claro com Memória)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') return true;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Função centralizada para lidar com o botão voltar no Header
  const handleBack = () => {
    setCurrentView('home');
    setSelectedDisciplineId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f6] dark:bg-[#0f172a] text-gray-900 dark:text-slate-200 font-sans transition-colors duration-500">
      <Header 
        onNavigate={(view) => {
          setCurrentView(view);
          if (view === 'home') setSelectedDisciplineId(null);
        }} 
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        // Novas props passadas para o Header saber quando mostrar o botão voltar
        currentView={currentView}
        onBack={handleBack}
      />

      <div className="flex-grow">
        {currentView === 'home' && (
          <HomeView 
            disciplines={SIMULATIONS} 
            onNavigateToQuiz={() => setCurrentView('career-quiz')}
            onNavigateToCalculators={() => setCurrentView('calculators')}
            onSelectOption={(option, id) => { setSelectedDisciplineId(id); setCurrentView(option as ViewState); }}
          />
        )}
        {currentView === 'career-quiz' && <CareerQuiz onBack={handleBack} />}
        {currentView === 'calculators' && <CalculatorsView onBack={handleBack} />}
        {currentView === 'admin-login' && <AdminLoginView onLoginSuccess={() => setCurrentView('admin-dashboard')} onBack={handleBack} />}
        {currentView === 'admin-dashboard' && <AdminDashboardView onLogout={handleBack} />}
        {currentView === 'summaries-list' && selectedDisciplineId && <SummariesListView disciplineId={selectedDisciplineId} onBack={handleBack} />}
        {currentView === 'references-view' && selectedDisciplineId && <ReferencesView disciplineId={selectedDisciplineId} disciplines={SIMULATIONS} onBack={handleBack} />}
      </div>

      <footer className="bg-white dark:bg-[#1e293b] border-t border-gray-200 dark:border-slate-800/50 py-12 flex flex-col items-center gap-6 mt-auto transition-colors duration-500">
        
        {/* LOGO RODAPÉ NO CARTÃO BRANCO (MODO ESCURO) */}
        <div className="dark:bg-white dark:p-2 dark:rounded-2xl transition-all">
          <img 
            src="/logo.png" 
            alt="Logo da Faculdade" 
            className="h-10 w-auto opacity-50 dark:opacity-100 hover:opacity-100 transition-all grayscale hover:grayscale-0 dark:grayscale-0"
            onError={(e) => e.currentTarget.style.display = 'none'}
          />
        </div>

        <div className="text-center space-y-3">
          <div className="text-[#D4A017] text-[11px] font-black uppercase tracking-[0.2em]">
            Desenvolvido por Fabrício Luna - Turma VIII
          </div>
          <div className="text-gray-400 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest flex flex-col items-center gap-1">
            <a href="mailto:fabricioluna@gmail.com" className="hover:text-[#003366] dark:hover:text-[#D4A017] transition-colors mb-1">
              Contato: fabricioluna@gmail.com
            </a>
            <span>© 2026 Medicina do Sertão</span>
          </div>
        </div>

        <button 
          onClick={() => setCurrentView('admin-login')} 
          className="text-gray-300 dark:text-slate-600 hover:text-[#003366] dark:hover:text-[#D4A017] transition-colors text-[9px] font-black uppercase tracking-[0.3em] cursor-pointer mt-4"
        >
          Acesso Restrito
        </button>
      </footer>
    </div>
  );
};

export default App;