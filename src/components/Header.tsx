import React from 'react';
import { ViewState } from '../types';
import { Settings, Home, Activity } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: ViewState) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-[#003366] text-white py-4 px-6 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('home')}>
          <div className="bg-white p-2 rounded-xl group-hover:scale-105 transition-transform shadow-sm">
            <Activity size={24} className="text-[#003366]" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tighter leading-none">
              Portal<span className="text-[#D4A017]">HM1</span>
            </h1>
            <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-0.5">
              1º Período • FMS
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-2 md:gap-4">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-xs font-bold text-gray-200 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-all">
            <Home size={16} />
            <span className="hidden md:inline">Início</span>
          </button>
          <button onClick={() => onNavigate('admin')} className="flex items-center gap-2 text-xs font-bold text-[#D4A017] hover:text-white bg-[#D4A017]/10 hover:bg-[#D4A017]/20 px-4 py-2 rounded-lg transition-all border border-[#D4A017]/20">
            <Settings size={16} />
            <span className="hidden md:inline">Admin</span>
          </button>
        </nav>
        
      </div>
    </header>
  );
};

export default Header;