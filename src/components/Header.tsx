import React from 'react';
import { Home, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'admin-login') => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isDarkMode, toggleDarkMode }) => {
  return (
    <header className="bg-white dark:bg-[#0f172a] border-b border-gray-100 dark:border-slate-800/60 sticky top-0 z-50 transition-colors duration-500 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 md:px-6 h-24 flex items-center justify-between">
        
        <div 
          className="flex items-center gap-4 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          {/* TRUQUE ELEGANTE PARA A LOGO: Fundo branco arredondado no modo escuro */}
          <div className="dark:bg-white dark:p-1.5 dark:rounded-2xl dark:shadow-sm transition-all duration-300">
            <img 
              src="/logo.png" 
              alt="Logo da Faculdade" 
              className="h-14 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
              }}
            />
            <div className="hidden fallback-icon w-12 h-12 bg-[#003366] rounded-xl flex items-center justify-center text-white shadow-lg">
              <span className="font-black text-xl">FMS</span>
            </div>
          </div>

          <div className="text-left hidden sm:block pl-1">
            <h1 className="text-xl font-black text-[#003366] dark:text-slate-100 tracking-tighter leading-none group-hover:text-[#D4A017] transition-colors">HABILIDADES MÉDICAS 1</h1>
            <p className="text-[10px] font-black text-[#D4A017] uppercase tracking-[0.2em] mt-1">Monitor Virtual • Turma IX</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gray-50 dark:bg-[#1e293b] text-[#003366] dark:text-slate-200 font-bold text-xs uppercase tracking-widest hover:bg-[#003366] hover:text-white dark:hover:bg-[#D4A017] dark:hover:text-[#003366] transition-all shadow-sm"
          >
            <Home size={16} />
            <span className="hidden lg:block">Início</span>
          </button>

          <button 
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-300 font-bold text-xs uppercase tracking-widest hover:border-[#D4A017] dark:hover:border-[#D4A017] hover:text-[#D4A017] dark:hover:text-[#D4A017] transition-all"
            title="Alternar Modo"
          >
            {isDarkMode ? <Sun size={16} className="text-[#D4A017]" /> : <Moon size={16} />}
            <span className="hidden lg:block">{isDarkMode ? 'Claro' : 'Escuro'}</span>
          </button>
        </div>
        
      </div>
    </header>
  );
};

export default Header;