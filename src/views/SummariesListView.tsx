import React, { useState, useEffect } from 'react';
import { Download, Loader2, Search, Plus, FileCheck, X, User, CheckCircle2, Link as LinkIcon, Cloud } from 'lucide-react';
import { db, storage } from '../firebase';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { Summary } from '../types';

interface SummariesListViewProps {
  disciplineId: string;
  onBack: () => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const SummariesListView: React.FC<SummariesListViewProps> = ({ disciplineId, onBack }) => {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // Novo estado para controlar se é arquivo ou link
  const [uploadMode, setUploadMode] = useState<'file' | 'link'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({ 
    title: '', 
    author: '', 
    description: '', 
    type: 'summary' as any,
    linkUrl: '' // Campo novo para o link
  });

  useEffect(() => {
    const q = query(
      collection(db, "materials"), 
      where("disciplineId", "==", disciplineId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Summary[];
      
      const sortedDocs = docs.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;
        return timeB - timeA;
      });

      setSummaries(sortedDocs);
    }, (error) => {
      console.error("Erro ao carregar materiais:", error);
    });

    return () => unsubscribe();
  }, [disciplineId]);

  const handleConfirmUpload = async () => {
    if (!formData.title || !formData.author) {
      return alert("Título e Autor são obrigatórios.");
    }

    try {
      setIsUploading(true);

      if (uploadMode === 'file') {
        // LÓGICA DE UPLOAD DE ARQUIVO FÍSICO
        if (!selectedFile) return alert("Selecione um arquivo para enviar.");

        const MAX_MB = 50; 
        const MAX_BYTES = MAX_MB * 1024 * 1024; 

        if (selectedFile.size > MAX_BYTES) {
          setIsUploading(false);
          return alert(`⚠️ Arquivo muito grande!\nO limite é de ${MAX_MB} MB. Seu arquivo tem ${formatFileSize(selectedFile.size)}.\nPara arquivos maiores, por favor, use a opção "Adicionar Link na Nuvem".`);
        }

        const sRef = ref(storage, `materials/${disciplineId}/${Date.now()}_${selectedFile.name}`);
        const snap = await uploadBytes(sRef, selectedFile);
        const url = await getDownloadURL(snap.ref);
        const fileSize = formatFileSize(selectedFile.size);

        await addDoc(collection(db, "materials"), {
          title: formData.title,
          author: formData.author,
          description: formData.description,
          type: formData.type,
          disciplineId,
          url,
          date: new Date().toLocaleDateString('pt-BR'),
          label: selectedFile.name.split('.').pop()?.toUpperCase() || 'PDF',
          size: fileSize,
          createdAt: serverTimestamp()
        });

      } else {
        // LÓGICA DE ENVIO DE LINK EXTERNO
        if (!formData.linkUrl) return alert("Por favor, cole o link de compartilhamento.");
        if (!formData.linkUrl.startsWith('http')) return alert("O link deve começar com http:// ou https://");

        await addDoc(collection(db, "materials"), {
          title: formData.title,
          author: formData.author,
          description: formData.description,
          type: formData.type,
          disciplineId,
          url: formData.linkUrl, // Salva o link externo
          date: new Date().toLocaleDateString('pt-BR'),
          label: 'LINK', // Identificador visual
          size: 'Nuvem Externa', // Oculta o tamanho em bytes
          createdAt: serverTimestamp()
        });
      }

      alert("Material compartilhado com sucesso!");
      setShowForm(false); 
      setSelectedFile(null);
      setUploadMode('file');
      setFormData({ title: '', author: '', description: '', type: 'summary', linkUrl: '' });
    } catch (e) { 
      alert("Erro ao compartilhar o material. Verifique sua conexão e tente novamente."); 
      console.error(e);
    } finally { 
      setIsUploading(false); 
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
      <button onClick={onBack} className="text-[#003366] dark:text-slate-300 font-bold mb-8 flex items-center gap-2 hover:text-[#D4A017] dark:hover:text-[#D4A017] transition-all">← Voltar</button>

      <div className="bg-white dark:bg-[#1e293b] rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-slate-800/60 mb-8 relative overflow-hidden text-left transition-colors duration-500">
         <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
           <div className="flex-1">
             <h1 className="text-4xl font-black text-[#003366] dark:text-slate-100 mb-4 tracking-tighter leading-tight text-left">Central de Materiais</h1>
             {/* DESCRIÇÃO ATUALIZADA */}
             <p className="text-gray-500 dark:text-slate-400 font-medium leading-relaxed text-left max-w-2xl">
               Compartilhe materiais de estudo com a turma. Para arquivos de <b>até 50MB</b>, faça o upload direto no portal. Para pastas completas ou arquivos mais pesados, adicione um <b>link de compartilhamento</b> (Google Drive, OneDrive, etc.).
             </p>
           </div>
           {!showForm ? (
             <button onClick={() => setShowForm(true)} className="bg-[#003366] dark:bg-[#D4A017] text-white dark:text-[#0f172a] px-8 py-4 rounded-2xl font-black uppercase text-xs flex items-center gap-2 shadow-xl hover:scale-105 transition-all shrink-0"><Plus size={18} /><span>Compartilhar</span></button>
           ) : (
             <button onClick={() => {setShowForm(false); setSelectedFile(null); setUploadMode('file');}} className="bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 px-6 py-4 rounded-2xl font-black uppercase text-xs flex items-center gap-2 shrink-0"><X size={18} /><span>Cancelar</span></button>
           )}
         </div>

         {showForm && (
           <div className="mt-8 p-6 bg-gray-50 dark:bg-[#0f172a] rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-slate-700 animate-in zoom-in duration-300">
             
             {/* ABAS DE SELEÇÃO: ARQUIVO OU LINK */}
             <div className="flex p-1 bg-gray-200 dark:bg-slate-800 rounded-2xl mb-6 shadow-inner overflow-hidden">
               <button
                 onClick={() => setUploadMode('file')}
                 className={`flex-1 py-3 px-2 text-[10px] sm:text-xs font-black uppercase rounded-xl transition-all flex items-center justify-center gap-2 ${uploadMode === 'file' ? 'bg-white dark:bg-slate-700 text-[#003366] dark:text-white shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-[#003366] dark:hover:text-white'}`}
               >
                 <FileCheck size={16} /> <span className="hidden sm:inline">Upload de Arquivo (Até 50MB)</span><span className="sm:hidden">Arquivo</span>
               </button>
               <button
                 onClick={() => setUploadMode('link')}
                 className={`flex-1 py-3 px-2 text-[10px] sm:text-xs font-black uppercase rounded-xl transition-all flex items-center justify-center gap-2 ${uploadMode === 'link' ? 'bg-white dark:bg-slate-700 text-[#003366] dark:text-white shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-[#003366] dark:hover:text-white'}`}
               >
                 <Cloud size={16} /> <span className="hidden sm:inline">Link (Arquivos Grandes / Pastas)</span><span className="sm:hidden">Link Nuvem</span>
               </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
               <input type="text" placeholder="Legenda / Título" className="bg-white dark:bg-[#1e293b] p-4 rounded-xl outline-none font-bold text-sm border border-transparent dark:border-slate-700 dark:text-slate-200 focus:border-[#D4A017] dark:focus:border-[#D4A017] transition-colors" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
               <input type="text" placeholder="Autor(a)" className="bg-white dark:bg-[#1e293b] p-4 rounded-xl outline-none font-bold text-sm border border-transparent dark:border-slate-700 dark:text-slate-200 focus:border-[#D4A017] dark:focus:border-[#D4A017] transition-colors" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
               <select className="bg-white dark:bg-[#1e293b] p-4 rounded-xl font-bold text-sm border border-transparent dark:border-slate-700 dark:text-slate-200 transition-colors" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                 <option value="summary">Resumo</option><option value="script">Simulado</option><option value="other">Outro / Pasta</option>
               </select>
             </div>
             <textarea placeholder="Descrição breve do material (Opcional)" className="w-full bg-white dark:bg-[#1e293b] p-4 rounded-xl mb-6 min-h-[80px] font-bold text-sm border border-transparent dark:border-slate-700 dark:text-slate-200 outline-none focus:border-[#D4A017] resize-none transition-colors" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
             
             {/* RENDERIZAÇÃO CONDICIONAL: ARQUIVO OU LINK */}
             {uploadMode === 'file' ? (
               <>
                 {!selectedFile ? (
                   <label className="w-full cursor-pointer bg-white dark:bg-[#1e293b] border-2 border-dashed border-[#003366] dark:border-slate-600 text-[#003366] dark:text-slate-300 p-8 rounded-2xl font-black uppercase text-xs text-center block hover:bg-[#003366] hover:text-white dark:hover:border-[#D4A017] dark:hover:text-[#D4A017] transition-all shadow-sm">
                     <Plus className="inline mr-2" /> Escolher Arquivo do Dispositivo
                     <input type="file" className="hidden" onChange={e => e.target.files && setSelectedFile(e.target.files[0])} accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" />
                   </label>
                 ) : (
                   <div className="bg-white dark:bg-[#1e293b] border-2 border-green-200 dark:border-green-800/50 p-8 rounded-3xl text-center shadow-lg animate-in zoom-in">
                     <div className="text-green-600 dark:text-green-400 font-black uppercase text-[10px] tracking-widest mb-2"><CheckCircle2 className="inline mr-1" size={16} /> Arquivo Selecionado</div>
                     <h4 className="text-[#003366] dark:text-slate-100 font-black text-lg mb-1">{selectedFile.name}</h4>
                     <p className="text-gray-400 dark:text-slate-500 font-bold text-xs uppercase mb-6">{formatFileSize(selectedFile.size)}</p>
                     <div className="flex gap-3">
                        <button onClick={() => setSelectedFile(null)} className="flex-1 bg-gray-100 dark:bg-[#0f172a] text-gray-400 dark:text-slate-400 p-4 rounded-xl font-black uppercase text-xs hover:bg-gray-200 transition-colors">Trocar</button>
                        <button onClick={handleConfirmUpload} disabled={isUploading} className="flex-[2] bg-[#003366] dark:bg-[#D4A017] text-white dark:text-[#0f172a] p-4 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-all">
                          {isUploading ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={18} />}
                          {isUploading ? 'ENVIANDO...' : 'CONFIRMAR E PUBLICAR'}
                        </button>
                     </div>
                   </div>
                 )}
               </>
             ) : (
               <div className="bg-white dark:bg-[#1e293b] border-2 border-[#003366] dark:border-slate-600 p-6 rounded-2xl shadow-sm animate-in zoom-in">
                 <div className="flex items-center gap-2 mb-4">
                   <LinkIcon size={18} className="text-[#003366] dark:text-[#D4A017]" />
                   <span className="font-black text-[#003366] dark:text-slate-200 text-xs uppercase tracking-widest">URL de Compartilhamento</span>
                 </div>
                 <input
                   type="url"
                   placeholder="Cole aqui o link (ex: https://drive.google.com/open?...)"
                   className="w-full bg-gray-50 dark:bg-[#0f172a] p-4 rounded-xl outline-none font-bold text-sm border border-transparent dark:border-slate-700 dark:text-slate-200 focus:border-[#D4A017] dark:focus:border-[#D4A017] mb-6 transition-colors"
                   value={formData.linkUrl}
                   onChange={e => setFormData({...formData, linkUrl: e.target.value})}
                 />
                 <button onClick={handleConfirmUpload} disabled={isUploading} className="w-full bg-[#003366] dark:bg-[#D4A017] text-white dark:text-[#0f172a] p-4 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-all">
                    {isUploading ? <Loader2 className="animate-spin" /> : <LinkIcon size={18} />}
                    {isUploading ? 'SALVANDO...' : 'CONFIRMAR E PUBLICAR LINK'}
                 </button>
               </div>
             )}
           </div>
         )}
      </div>

      <div className="mb-8 relative text-left">
        <Search className="absolute inset-y-0 left-6 flex items-center text-gray-400" size={20} />
        <input type="text" placeholder="Pesquisar material..." className="w-full bg-white dark:bg-[#1e293b] pl-14 pr-6 py-5 rounded-2xl border-2 border-transparent dark:border-slate-800 dark:text-slate-200 focus:border-[#D4A017] dark:focus:border-[#D4A017] outline-none font-bold shadow-sm transition-colors duration-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>

      <div className="space-y-4 text-left">
        {summaries.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => (
          <div key={s.id} className="bg-white dark:bg-[#1e293b] p-6 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 flex items-start justify-between group hover:border-[#D4A017] dark:hover:border-[#D4A017] transition-all shadow-sm">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-blue-50 dark:bg-[#0f172a] rounded-2xl flex items-center justify-center text-[#003366] dark:text-[#D4A017] group-hover:bg-[#003366] dark:group-hover:bg-[#D4A017] group-hover:text-white dark:group-hover:text-[#0f172a] transition-all shrink-0">
                {s.label === 'LINK' ? <LinkIcon size={28} /> : <FileCheck size={28} />}
              </div>
              <div>
                <h3 className="font-black text-[#003366] dark:text-slate-100 text-lg leading-tight">{s.title}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1 mb-2">
                  <div className="flex items-center gap-1 text-[10px] font-black text-[#D4A017] uppercase tracking-wider"><User size={12} /> {s.author}</div>
                  <span className="text-gray-300 dark:text-slate-600">|</span>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase">{s.date}</span>
                  
                  {s.size && (
                    <>
                      <span className="text-gray-300 dark:text-slate-600">|</span>
                      <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase">{s.size}</span>
                    </>
                  )}

                  <span className={`px-2 py-0.5 rounded text-[9px] font-black ${s.label === 'LINK' ? 'bg-[#D4A017]/20 text-[#D4A017]' : 'bg-gray-100 dark:bg-[#0f172a] text-gray-500 dark:text-slate-400'}`}>
                    {s.label}
                  </span>
                </div>
                {s.description && <div className="bg-gray-50 dark:bg-[#0f172a] p-3 rounded-xl border border-gray-100 dark:border-transparent text-xs text-gray-500 dark:text-slate-400 italic">"{s.description}"</div>}
              </div>
            </div>
            <a href={s.url} target="_blank" rel="noreferrer" className="bg-[#f4f7f6] dark:bg-[#0f172a] hover:bg-[#D4A017] dark:hover:bg-[#D4A017] text-[#003366] dark:text-slate-300 dark:hover:text-[#0f172a] p-4 rounded-xl transition-all shrink-0">
              {s.label === 'LINK' ? <Cloud size={24} /> : <Download size={24} />}
            </a>
          </div>
        ))}
        {summaries.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-[#1e293b] rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-slate-800 text-gray-400 dark:text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] transition-colors duration-500">
             Nenhum material compartilhado ainda.
          </div>
        )}
      </div>
    </div>
  );
};

export default SummariesListView;