import React from 'react';
import type { SimulationInfo } from '../types';
import { BookOpen, Link as LinkIcon, FileText, Video, ExternalLink } from 'lucide-react';

interface ReferencesViewProps {
  disciplineId: string;
  disciplines: SimulationInfo[];
  onBack: () => void;
}

const ReferencesView: React.FC<ReferencesViewProps> = ({ disciplineId, disciplines, onBack }) => {
  const discipline = disciplines.find(d => d.id === disciplineId);
  
  if (!discipline) return null;

  const references = discipline.references || [];

  const getIcon = (type: string) => {
    switch (type) {
      case 'book': return <BookOpen size={24} className="text-[#003366] dark:text-[#D4A017] transition-colors" />;
      case 'article': return <FileText size={24} className="text-[#003366] dark:text-[#D4A017] transition-colors" />;
      case 'video': return <Video size={24} className="text-[#003366] dark:text-[#D4A017] transition-colors" />;
      case 'link':
      default: return <LinkIcon size={24} className="text-[#003366] dark:text-[#D4A017] transition-colors" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'book': return 'Livro Oficial';
      case 'article': return 'Artigo / Manual';
      case 'video': return 'Vídeo Aula';
      case 'link':
      default: return 'Link Externo';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
      <button 
        onClick={onBack} 
        className="group flex items-center text-[#003366] dark:text-slate-300 font-bold mb-8 hover:text-[#D4A017] dark:hover:text-[#D4A017] transition-all"
      >
        <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> 
        Voltar ao Início
      </button>

      {/* CABEÇALHO SUAVIZADO */}
      <div className="bg-white dark:bg-[#1e293b] rounded-[3rem] p-8 md:p-14 shadow-2xl border border-gray-100 dark:border-slate-800/60 mb-12 relative overflow-hidden transition-colors duration-500">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-slate-800/30 rounded-full -mr-20 -mt-20 opacity-50"></div>
         <div className="relative z-10">
           <span className="bg-[#D4A017]/20 text-[#003366] dark:bg-[#D4A017]/10 dark:text-[#D4A017] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block border border-[#D4A017]/30 dark:border-[#D4A017]/20">
             Biblioteca Virtual
           </span>
           <h1 className="text-4xl md:text-5xl font-black text-[#003366] dark:text-slate-100 mb-4 tracking-tighter leading-tight">
             Referências Bibliográficas
           </h1>
           <p className="text-gray-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl font-medium">
             Literatura oficial e recomendada para o módulo de {discipline.title}.
           </p>
         </div>
      </div>

      {references.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {references.map((ref) => (
            <div key={ref.id} className="bg-white dark:bg-[#1e293b] p-6 md:p-8 rounded-[2rem] border-2 border-transparent dark:border-slate-800 hover:border-[#D4A017] dark:hover:border-[#D4A017] shadow-lg hover:shadow-xl transition-all group flex flex-col h-full relative overflow-hidden">
              <div className="flex items-start gap-4 mb-4 relative z-10">
                
                {/* ÍCONE DO CARD */}
                <div className="w-14 h-14 bg-blue-50 dark:bg-[#0f172a] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#003366] dark:group-hover:bg-[#D4A017] transition-colors [&>svg]:group-hover:text-white dark:[&>svg]:group-hover:text-[#0f172a]">
                  {getIcon(ref.type)}
                </div>
                
                <div>
                  <span className="text-[9px] font-black uppercase text-gray-400 dark:text-slate-500 tracking-widest block mb-1">
                    {getTypeLabel(ref.type)}
                  </span>
                  <h3 className="text-lg font-black text-[#003366] dark:text-slate-100 leading-tight group-hover:text-[#D4A017] dark:group-hover:text-[#D4A017] transition-colors">
                    {ref.title}
                  </h3>
                  {ref.author && (
                    <p className="text-sm text-gray-500 dark:text-slate-400 font-medium mt-2">
                      <span className="opacity-60">Autor(es):</span> {ref.author}
                    </p>
                  )}
                </div>
              </div>
              
              {ref.url && (
                <div className="mt-auto pt-6 relative z-10">
                  {/* BOTÃO SUAVIZADO: Sem preenchimento forte inicial, ganhando cor no Hover */}
                  <a 
                    href={ref.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-transparent border-2 border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-300 hover:border-[#D4A017] dark:hover:border-[#D4A017] hover:bg-[#D4A017] dark:hover:bg-[#D4A017] hover:text-white dark:hover:text-[#0f172a] py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-sm"
                  >
                    Acessar Material <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1e293b] p-12 rounded-[3rem] shadow-xl border border-gray-100 dark:border-slate-800 text-center transition-colors duration-500">
          <div className="text-6xl mb-4 opacity-50 grayscale dark:grayscale-0">📚</div>
          <h3 className="text-xl font-black text-[#003366] dark:text-slate-100 mb-2">Nenhuma referência cadastrada</h3>
          <p className="text-gray-500 dark:text-slate-400 font-medium">Os materiais recomendados para este módulo estarão disponíveis em breve.</p>
        </div>
      )}
    </div>
  );
};

export default ReferencesView;