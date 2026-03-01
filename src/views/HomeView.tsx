import React from 'react';
import type { SimulationInfo } from '../types';

interface HomeViewProps {
  disciplines: SimulationInfo[];
  onNavigateToQuiz: () => void;
  onNavigateToCalculators: () => void;
  onSelectOption: (option: any, disciplineId: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ disciplines, onNavigateToQuiz, onNavigateToCalculators, onSelectOption }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in zoom-in duration-500">
      
      <div className="mb-12 text-center">
        <span className="bg-[#D4A017]/20 text-[#003366] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block border border-[#D4A017]/30">
          Turma IX • 1º Semestre
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#003366] mb-4 tracking-tighter">
          Monitor Virtual
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm font-medium leading-relaxed text-center">
          Sua plataforma central de estudos: pratique com simuladores clínicos, acesse materiais da turma e calcule suas médias.
        </p>
      </div>

      <div className="mb-12">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest text-center mb-8">
          Módulo Ativo: Habilidades Médicas 1
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* SIMULADOR TEÓRICO */}
          <button onClick={() => onSelectOption('quiz-setup', 'hm1')} className="bg-white p-6 md:p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent hover:border-[#D4A017]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-xl flex items-center justify-center text-2xl group-hover:bg-[#003366] group-hover:text-white transition-colors">📝</div>
              <div className="text-gray-300 group-hover:text-[#D4A017] transition-colors">→</div>
            </div>
            <h3 className="text-xl font-black text-[#003366] mb-2 uppercase tracking-tight">Simulador Teórico</h3>
            <p className="text-xs text-gray-500 font-medium">Avalie seus conhecimentos com questões de múltipla escolha.</p>
          </button>

          {/* SIMULADOR PRÁTICO */}
          <button onClick={() => onSelectOption('osce-setup', 'hm1')} className="bg-white p-6 md:p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent hover:border-[#D4A017]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-xl flex items-center justify-center text-2xl group-hover:bg-[#003366] group-hover:text-white transition-colors">🩺</div>
              <div className="text-gray-300 group-hover:text-[#D4A017] transition-colors">→</div>
            </div>
            <h3 className="text-xl font-black text-[#003366] mb-2 uppercase tracking-tight">Simulador Prático</h3>
            <p className="text-xs text-gray-500 font-medium">Treine o passo a passo de exames clínicos.</p>
          </button>

          {/* CENTRAL DE MATERIAIS */}
          <button onClick={() => onSelectOption('summaries-list', 'hm1')} className="bg-white p-6 md:p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent hover:border-[#D4A017] md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-xl flex items-center justify-center text-2xl group-hover:bg-[#003366] group-hover:text-white transition-colors">📂</div>
              <div className="text-gray-300 group-hover:text-[#D4A017] transition-colors">→</div>
            </div>
            <h3 className="text-xl font-black text-[#003366] mb-2 uppercase tracking-tight">Central de Materiais</h3>
            <p className="text-xs text-gray-500 font-medium">Acesse e compartilhe resumos e simulados da turma na nuvem.</p>
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-12 text-center">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-8">Ferramentas Extras</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <button onClick={onNavigateToCalculators} className="bg-[#003366] text-white p-6 rounded-3xl flex items-center gap-4 hover:bg-[#D4A017] hover:text-[#003366] transition-all shadow-md">
            <div className="text-3xl">🧮</div>
            <div className="text-left">
              <h4 className="font-black uppercase tracking-tight">Calculadora de Média</h4>
              <p className="text-[10px] font-medium opacity-80 uppercase tracking-widest">Simule suas notas</p>
            </div>
          </button>
          <button onClick={onNavigateToQuiz} className="bg-white border-2 border-gray-100 p-6 rounded-3xl flex items-center gap-4 hover:border-[#D4A017] transition-all shadow-sm">
            <div className="text-3xl">🧭</div>
            <div className="text-left">
              <h4 className="font-black text-[#003366] uppercase tracking-tight">Quiz Vocacional</h4>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Descubra sua área</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;