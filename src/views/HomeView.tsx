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
        <span className="bg-[#D4A017]/20 text-[#003366] dark:bg-[#D4A017]/10 dark:text-[#D4A017] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block border border-[#D4A017]/30 dark:border-[#D4A017]/20">Turma IX</span>
        <h2 className="text-4xl md:text-5xl font-black text-[#003366] dark:text-slate-100 mb-2 tracking-tighter italic">Monitor Virtual</h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">Sua central de estudos e simuladores clínicos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <button onClick={() => onSelectOption('quiz-setup', 'hm1')} className="bg-white dark:bg-[#1e293b] p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent dark:border-slate-800 hover:border-[#D4A017] dark:hover:border-[#D4A017]">
          <div className="w-12 h-12 bg-blue-50 dark:bg-[#0f172a] text-[#003366] dark:text-[#D4A017] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-[#003366] dark:group-hover:bg-[#D4A017] group-hover:text-white dark:group-hover:text-[#0f172a] transition-all">📝</div>
          <h3 className="text-xl font-black text-[#003366] dark:text-slate-100 mb-1 uppercase tracking-tight">Simulador Teórico</h3>
          <p className="text-xs text-gray-400 dark:text-slate-400 font-bold uppercase tracking-widest leading-tight">Treino de Questões</p>
        </button>

        <button onClick={() => onSelectOption('osce-setup', 'hm1')} className="bg-white dark:bg-[#1e293b] p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent dark:border-slate-800 hover:border-[#D4A017] dark:hover:border-[#D4A017]">
          <div className="w-12 h-12 bg-blue-50 dark:bg-[#0f172a] text-[#003366] dark:text-[#D4A017] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-[#003366] dark:group-hover:bg-[#D4A017] group-hover:text-white dark:group-hover:text-[#0f172a] transition-all">🩺</div>
          <h3 className="text-xl font-black text-[#003366] dark:text-slate-100 mb-1 uppercase tracking-tight">Simulador Prático</h3>
          <p className="text-xs text-gray-400 dark:text-slate-400 font-bold uppercase tracking-widest leading-tight">Habilidades Clínicas</p>
        </button>

        <button onClick={() => onSelectOption('osce-ai-setup', 'hm1')} className="bg-[#003366] dark:bg-gradient-to-br dark:from-[#1e293b] dark:to-[#0f172a] text-white p-8 rounded-[2rem] text-left hover:scale-[1.02] transition-all shadow-xl md:col-span-2 group relative border-2 border-transparent dark:border-slate-800 dark:hover:border-[#D4A017]">
          <div className="w-14 h-14 bg-white/10 dark:bg-[#0f172a] rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:bg-[#D4A017] transition-all">🤖</div>
          <h3 className="text-2xl font-black uppercase tracking-tight mb-2 text-[#D4A017]">Paciente Virtual por IA</h3>
          <p className="text-xs opacity-80 dark:text-slate-300 font-medium italic leading-relaxed">Pratique sua anamnese conversando com a inteligência artificial.</p>
        </button>

        <button onClick={() => onSelectOption('summaries-list', 'hm1')} className="bg-white dark:bg-[#1e293b] p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent dark:border-slate-800 hover:border-[#D4A017] dark:hover:border-[#D4A017]">
          <div className="w-12 h-12 bg-blue-50 dark:bg-[#0f172a] text-[#003366] dark:text-[#D4A017] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-[#003366] dark:group-hover:bg-[#D4A017] group-hover:text-white dark:group-hover:text-[#0f172a] transition-all">📂</div>
          <h3 className="text-xl font-black text-[#003366] dark:text-slate-100 mb-1 uppercase tracking-tight">Central de Materiais</h3>
          <p className="text-[10px] text-gray-400 dark:text-slate-400 font-bold uppercase tracking-widest leading-tight">Arquivos na Nuvem</p>
        </button>

        <button onClick={() => onSelectOption('references-view', 'hm1')} className="bg-white dark:bg-[#1e293b] p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent dark:border-slate-800 hover:border-[#D4A017] dark:hover:border-[#D4A017]">
          <div className="w-12 h-12 bg-blue-50 dark:bg-[#0f172a] text-[#003366] dark:text-[#D4A017] rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:bg-[#003366] dark:group-hover:bg-[#D4A017] group-hover:text-white dark:group-hover:text-[#0f172a] transition-all">📚</div>
          <h3 className="text-xl font-black text-[#003366] dark:text-slate-100 mb-1 uppercase tracking-tight">Referências Bibliográficas</h3>
          <p className="text-[10px] text-gray-400 dark:text-slate-400 font-bold uppercase tracking-widest leading-tight">Bibliografia do Módulo</p>
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center border-t border-gray-200 dark:border-slate-800/50 pt-10">
        <button onClick={onNavigateToCalculators} className="bg-[#003366] dark:bg-[#1e293b] text-white dark:text-slate-200 p-5 rounded-3xl flex items-center gap-4 hover:bg-[#D4A017] dark:hover:bg-[#D4A017] dark:hover:text-[#0f172a] transition-all shadow-md">
          <div className="text-2xl">🧮</div>
          <h4 className="font-black uppercase text-xs">Calculadora</h4>
        </button>
        <button onClick={onNavigateToQuiz} className="bg-white dark:bg-[#1e293b] border-2 border-gray-100 dark:border-slate-700 dark:text-slate-200 p-5 rounded-3xl flex items-center gap-4 hover:border-[#D4A017] dark:hover:border-[#D4A017] transition-all">
          <div className="text-2xl">🧭</div>
          <h4 className="font-black uppercase text-xs">Quiz Vocacional</h4>
        </button>
      </div>
    </div>
  );
};

export default HomeView;