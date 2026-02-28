import React from 'react';
import type { SimulationInfo } from '../types.ts';

interface HomeViewProps {
  disciplines: SimulationInfo[];
  onSelectDiscipline: (id: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ disciplines, onSelectDiscipline }) => {
  const hm1 = disciplines.find(d => d.id === 'hm1');

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in zoom-in duration-500">
      
      <div className="mb-12 text-center">
        <span className="bg-[#D4A017]/20 text-[#003366] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block border border-[#D4A017]/30">
          Calouros • 1º Semestre
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#003366] mb-4 tracking-tighter">
          Laboratório de Simulação
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm font-medium leading-relaxed">
          Treine a sua prática clínica, responda a quizzes teóricos e faça simulações de atendimento com Inteligência Artificial.
        </p>
      </div>

      {hm1 && (
        <div className="max-w-2xl mx-auto mb-16">
          <button
            onClick={() => onSelectDiscipline(hm1.id)}
            className="w-full text-left p-8 md:p-10 bg-white rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#D4A017] relative overflow-hidden group hover:-translate-y-2 cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative z-10">
              <div className="w-28 h-28 bg-[#003366] rounded-[2.5rem] flex items-center justify-center text-6xl shadow-lg group-hover:scale-110 transition-transform shrink-0">
                {hm1.icon}
              </div>
              <div className="text-center sm:text-left">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-3 inline-block">
                  {hm1.meta}
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-[#003366] mb-3 tracking-tighter leading-tight">
                  {hm1.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
                  {hm1.description}
                </p>
                <div className="text-[#D4A017] font-black uppercase tracking-widest text-xs flex items-center justify-center sm:justify-start gap-2 bg-[#D4A017]/10 w-fit mx-auto sm:mx-0 px-4 py-2 rounded-xl group-hover:bg-[#003366] group-hover:text-white transition-colors">
                  Acessar Hub de Estudos <span>→</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeView;