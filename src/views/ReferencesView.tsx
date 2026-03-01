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
      case 'book': return <BookOpen size={24} className="text-[#003366]" />;
      case 'article': return <FileText size={24} className="text-[#003366]" />;
      case 'video': return <Video size={24} className="text-[#003366]" />;
      case 'link':
      default: return <LinkIcon size={24} className="text-[#003366]" />;
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
        className="group flex items-center text-[#003366] font-bold mb-8 hover:text-[#D4A017] transition-all"
      >
        <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> 
        Voltar ao Início
      </button>

      <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-gray-100 mb-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-20 -mt-20 opacity-50"></div>
         <div className="relative z-10">
           <span className="bg-[#D4A017]/20 text-[#003366] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block border border-[#D4A017]/30">
             Biblioteca Virtual
           </span>
           <h1 className="text-4xl md:text-5xl font-black text-[#003366] mb-4 tracking-tighter leading-tight">
             Referências Bibliográficas
           </h1>
           <p className="text-gray-600 text-lg leading-relaxed max-w-2xl font-medium">
             Literatura oficial e recomendada para o módulo de {discipline.title}.
           </p>
         </div>
      </div>

      {references.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {references.map((ref) => (
            <div key={ref.id} className="bg-white p-6 md:p-8 rounded-[2rem] border-2 border-transparent hover:border-[#D4A017] shadow-lg hover:shadow-xl transition-all group flex flex-col h-full relative overflow-hidden">
              <div className="flex items-start gap-4 mb-4 relative z-10">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#003366] transition-colors [&>svg]:group-hover:text-white">
                  {getIcon(ref.type)}
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest block mb-1">
                    {getTypeLabel(ref.type)}
                  </span>
                  <h3 className="text-lg font-black text-[#003366] leading-tight group-hover:text-[#D4A017] transition-colors">
                    {ref.title}
                  </h3>
                  {ref.author && (
                    <p className="text-sm text-gray-500 font-medium mt-2">
                      <span className="opacity-60">Autor(es):</span> {ref.author}
                    </p>
                  )}
                </div>
              </div>
              
              {ref.url && (
                <div className="mt-auto pt-6 relative z-10">
                  <a 
                    href={ref.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-blue-50 hover:bg-[#003366] text-[#003366] hover:text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors"
                  >
                    Acessar Material <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 text-center">
          <div className="text-6xl mb-4 opacity-50">📚</div>
          <h3 className="text-xl font-black text-[#003366] mb-2">Nenhuma referência cadastrada</h3>
          <p className="text-gray-500 font-medium">Os materiais recomendados para este módulo estarão disponíveis em breve.</p>
        </div>
      )}
    </div>
  );
};

export default ReferencesView;