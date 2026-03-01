import React from 'react';
import type { SimulationInfo } from '../types';

interface HomeViewProps {
  disciplines: SimulationInfo[];
  onNavigateToQuiz: () => void;
  onNavigateToCalculators: () => void;
  onSelectOption: (option: any, disciplineId: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigateToQuiz, onNavigateToCalculators, onSelectOption }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in zoom-in duration-500 text-center">
      <div className="mb-12">
        <span className="bg-[#D4A017]/20 text-[#003366] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block border border-[#D4A017]/30">Turma IX</span>
        <h2 className="text-4xl md:text-5xl font-black text-[#003366] mb-2 tracking-tighter italic">Monitor Virtual</h2>
        <p className="text-gray-500 text-sm font-medium">Sua central de estudos e simuladores clínicos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <button onClick={() => onSelectOption('quiz-setup', 'hm1')} className="bg-white p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent hover:border-[#D4A017]">
          <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-[#003366] group-hover:text-white transition-all">📝</div>
          <h3 className="text-xl font-black text-[#003366] mb-1 uppercase tracking-tight">Simulador Teórico</h3>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-tight">Treino de Questões</p>
        </button>

        <button onClick={() => onSelectOption('osce-setup', 'hm1')} className="bg-white p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent hover:border-[#D4A017]">
          <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-[#003366] group-hover:text-white transition-all">🩺</div>
          <h3 className="text-xl font-black text-[#003366] mb-1 uppercase tracking-tight">Simulador Prático</h3>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-tight">Habilidades Clínicas</p>
        </button>

        <button onClick={() => onSelectOption('osce-ai-setup', 'hm1')} className="bg-[#003366] text-white p-8 rounded-[2rem] text-left hover:scale-[1.02] transition-all shadow-xl md:col-span-2 group relative">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:bg-[#D4A017] transition-all">🤖</div>
          <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-[#D4A017]">Paciente Virtual IA</h3>
          <p className="text-xs opacity-80 font-medium italic leading-relaxed">Pratique sua anamnese conversando com a inteligência artificial.</p>
        </button>

        <button onClick={() => onSelectOption('summaries-list', 'hm1')} className="bg-white p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent hover:border-[#D4A017]">
          <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-[#003366] group-hover:text-white transition-all">📂</div>
          <h3 className="text-xl font-black text-[#003366] mb-1 uppercase tracking-tight">Central de Materiais</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">Arquivos na Nuvem</p>
        </button>

        <button onClick={() => onSelectOption('references-view', 'hm1')} className="bg-white p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent hover:border-[#D4A017]">
          <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-[#003366] group-hover:text-white transition-all">📚</div>
          <h3 className="text-xl font-black text-[#003366] mb-1 uppercase tracking-tight">Referências</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">Bibliografia do Módulo</p>
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center border-t pt-10">
        <button onClick={onNavigateToCalculators} className="bg-[#003366] text-white p-5 rounded-3xl flex items-center gap-4 hover:bg-[#D4A017] hover:text-[#003366] transition-all shadow-md">
          <div className="text-2xl">🧮</div>
          <h4 className="font-black uppercase text-xs">Calculadora</h4>
        </button>
        <button onClick={onNavigateToQuiz} className="bg-white border-2 border-gray-100 p-5 rounded-3xl flex items-center gap-4 hover:border-[#D4A017] transition-all">
          <div className="text-2xl">🧭</div>
          <h4 className="font-black text-[#003366] uppercase text-xs">Quiz Vocacional</h4>
        </button>
      </div>
    </div>
  );
};

export default HomeView;