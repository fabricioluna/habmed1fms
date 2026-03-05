import React from 'react';
import { Shield, Moon, Sun, ArrowLeft } from 'lucide-react';
import type { ViewState } from '../types';

interface HeaderProps {
  onNavigate: (view: ViewState) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentView?: ViewState;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isDarkMode, toggleDarkMode, currentView, onBack }) => {
  return (
    <header className="bg-[#003366] dark:bg-[#0b1120] text-white shadow-lg border-b-4 border-[#D4A017] dark:border-slate-800 transition-colors duration-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        
        {/* Lado Esquerdo: Botão Voltar + Logo */}
        <div className="flex items-center gap-4">
          
          {/* Botão Voltar aparece se a tela não for a Home */}
          {currentView && currentView !== 'home' && onBack && (
            <button 
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group mr-2"
              title="Voltar"
            >
              <ArrowLeft size={18} className="text-blue-200 group-hover:text-white transition-colors" />
            </button>
          )}

          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4A017] blur-md opacity-30 group-hover:opacity-60 transition-opacity rounded-full"></div>
              <div className="bg-white p-2 rounded-2xl shadow-xl relative z-10 group-hover:scale-105 transition-transform">
                <img 
                  src="/logo.png" 
                  alt="Logo FMS" 
                  className="h-10 w-10 object-contain"
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-none group-hover:text-blue-100 transition-colors flex items-center gap-2">
                Habilidades Médicas 
                <Shield size={16} className="text-[#D4A017] opacity-80" />
              </h1>
              <p className="text-[#D4A017] text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mt-1">
                Monitoria Virtual FMS
              </p>
            </div>
          </div>
        </div>

        {/* Lado Direito: Toggle Dark Mode */}
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all group"
            title={isDarkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
          >
            {isDarkMode ? (
              <Sun size={20} className="text-[#D4A017] group-hover:rotate-90 transition-transform duration-500" />
            ) : (
              <Moon size={20} className="text-blue-200 group-hover:-rotate-12 transition-transform duration-500" />
            )}
          </button>
        </div>
        
      </div>
    </header>
  );
};

export default Header;