import React from 'react';
import type { SimulationInfo } from '../types';

interface HomeViewProps {
  disciplines: SimulationInfo[];
  onNavigateToQuiz: () => void;
  onNavigateToCalculators: () => void;
  onSelectOption: (option: string, disciplineId: string) => void;
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
        <p className="text-gray-500 max-w-2xl mx-auto text-sm font-medium leading-relaxed">
          Sua plataforma central de estudos: pratique com simuladores clínicos, converse com pacientes virtuais por IA, acesse e compartilhe materiais com a turma, e calcule suas médias.
        </p>
      </div>

      <div className="mb-12">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest text-center mb-8">
          Módulo Ativo: Habilidades Médicas 1
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <button onClick={() => onSelectOption('quiz-setup', 'hm1')} className="bg-white p-6 md:p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent hover:border-[#D4A017]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-xl flex items-center justify-center text-2xl group-hover:bg-[#003366] group-hover:text-white transition-colors">📝</div>
              <div className="text-gray-300 group-hover:text-[#D4A017] transition-colors">→</div>
            </div>
            <h3 className="text-xl font-black text-[#003366] mb-2 uppercase tracking-tight">Simulador Teórico</h3>
            <p className="text-xs text-gray-500 font-medium">Avalie seus conhecimentos com questões de múltipla escolha.</p>
          </button>

          <button onClick={() => onSelectOption('osce-setup', 'hm1')} className="bg-white p-6 md:p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent hover:border-[#D4A017]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-xl flex items-center justify-center text-2xl group-hover:bg-[#003366] group-hover:text-white transition-colors">🩺</div>
              <div className="text-gray-300 group-hover:text-[#D4A017] transition-colors">→</div>
            </div>
            <h3 className="text-xl font-black text-[#003366] mb-2 uppercase tracking-tight">Simulador Prático Objetivo</h3>
            <p className="text-xs text-gray-500 font-medium">Treine o passo a passo de exames clínicos de forma gamificada.</p>
          </button>

          <button onClick={() => onSelectOption('osce-ai-setup', 'hm1')} className="bg-gradient-to-br from-[#003366] to-[#001f3f] text-white p-6 md:p-8 rounded-[2rem] text-left hover:scale-105 transition-all shadow-xl group relative overflow-hidden md:col-span-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-[#D4A017] group-hover:text-[#003366] transition-all">🤖</div>
              <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-[#D4A017] font-black">→</div>
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-[#D4A017]">Paciente Virtual por IA</h3>
            <p className="text-xs opacity-90 font-medium leading-relaxed">Pratique sua anamnese conversando livremente com nossa IA.</p>
          </button>

          <button onClick={() => onSelectOption('summaries-list', 'hm1')} className="bg-white p-6 md:p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent hover:border-[#D4A017]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-xl flex items-center justify-center text-2xl group-hover:bg-[#003366] group-hover:text-white transition-colors">📂</div>
              <div className="text-gray-300 group-hover:text-[#D4A017] transition-colors">→</div>
            </div>
            <h3 className="text-xl font-black text-[#003366] mb-2 uppercase tracking-tight">Central de Materiais</h3>
            <p className="text-xs text-gray-500 font-medium">Acesse e compartilhe resumos e roteiros da turma.</p>
          </button>

          <button onClick={() => onSelectOption('references-view', 'hm1')} className="bg-white p-6 md:p-8 rounded-[2rem] text-left hover:shadow-xl transition-all group border-2 border-transparent hover:border-[#D4A017]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 text-[#003366] rounded-xl flex items-center justify-center text-2xl group-hover:bg-[#003366] group-hover:text-white transition-colors">📚</div>
              <div className="text-gray-300 group-hover:text-[#D4A017] transition-colors">→</div>
            </div>
            <h3 className="text-xl font-black text-[#003366] mb-2 uppercase tracking-tight">Referências Bibliográficas</h3>
            <p className="text-xs text-gray-500 font-medium">Links para os livros oficiais na biblioteca da faculdade.</p>
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-12">
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest text-center mb-8">Ferramentas Extras</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <button onClick={onNavigateToCalculators} className="bg-[#003366] text-white p-6 rounded-3xl flex items-center gap-4 hover:bg-[#D4A017] hover:text-[#003366] transition-all shadow-md">
            <div className="text-3xl">🧮</div>
            <div className="text-left">
              <h4 className="font-black uppercase tracking-tight">Calculadora de Média</h4>
              <p className="text-[10px] font-medium opacity-80 uppercase tracking-widest">Simule suas notas FMS</p>
            </div>
          </button>
          <button onClick={onNavigateToQuiz} className="bg-white border-2 border-gray-100 p-6 rounded-3xl flex items-center gap-4 hover:border-[#D4A017] transition-all shadow-sm">
            <div className="text-3xl">🧭</div>
            <div className="text-left">
              <h4 className="font-black text-[#003366] uppercase tracking-tight">Quiz Vocacional</h4>
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Descubra sua especialidade</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;