import React, { useState, useEffect } from 'react';
import { Download, Loader2, Search, Plus, FileCheck, X, User, CheckCircle2, AlertTriangle } from 'lucide-react';
import { db, storage } from '../firebase';
import { collection, addDoc, query, where, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { Summary } from '../types';

interface SummariesListViewProps {
  disciplineId: string;
  onBack: () => void;
}

const SummariesListView: React.FC<SummariesListViewProps> = ({ disciplineId, onBack }) => {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({ title: '', author: '', description: '', type: 'summary' as any });

  useEffect(() => {
    // Escuta o banco de dados em tempo real. Se sumir ao recarregar, cheque o console F12 para o link do Índice.
    const q = query(
      collection(db, "materials"), 
      where("disciplineId", "==", disciplineId), 
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSummaries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Summary[]);
    }, (error) => {
      console.error("ERRO FIREBASE: Provável falta de índice. Veja o link no console.", error);
    });
    return () => unsubscribe();
  }, [disciplineId]);

  const handleConfirmUpload = async () => {
    if (!selectedFile || !formData.title || !formData.author) return alert("Preencha o Título e Autor.");
    try {
      setIsUploading(true);
      const sRef = ref(storage, `materials/${disciplineId}/${Date.now()}_${selectedFile.name}`);
      const snap = await uploadBytes(sRef, selectedFile);
      const url = await getDownloadURL(snap.ref);

      await addDoc(collection(db, "materials"), {
        ...formData,
        disciplineId,
        url,
        date: new Date().toLocaleDateString('pt-BR'),
        label: selectedFile.name.split('.').pop()?.toUpperCase() || 'PDF',
        createdAt: serverTimestamp()
      });

      alert("Enviado com sucesso para a nuvem da turma!");
      setShowForm(false); setSelectedFile(null);
      setFormData({ title: '', author: '', description: '', type: 'summary' });
    } catch (e) { alert("Erro ao enviar. Verifique as Rules do Storage no Firebase."); }
    finally { setIsUploading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
      <button onClick={onBack} className="text-[#003366] font-bold mb-8 flex items-center gap-2 hover:text-[#D4A017] transition-all">← Voltar</button>

      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100 mb-8 relative overflow-hidden text-left">
         <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-center">
           <div>
             <h1 className="text-4xl font-black text-[#003366] mb-2 tracking-tighter">Central de Materiais</h1>
             <p className="text-gray-500 font-medium italic leading-tight">Materiais compartilhados pela Turma IX.</p>
           </div>
           {!showForm ? (
             <button onClick={() => setShowForm(true)} className="bg-[#003366] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs flex items-center gap-2 shadow-xl hover:bg-[#D4A017] transition-all"><Plus size={18} /><span>Enviar Material</span></button>
           ) : (
             <button onClick={() => {setShowForm(false); setSelectedFile(null);}} className="bg-red-50 text-red-500 px-6 py-4 rounded-2xl font-black uppercase text-xs flex items-center gap-2"><X size={18} /><span>Fechar</span></button>
           )}
         </div>

         {showForm && (
           <div className="mt-8 p-6 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 animate-in zoom-in duration-300">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
               <input type="text" placeholder="Legenda / Título" className="bg-white p-4 rounded-xl outline-none font-bold text-sm border focus:border-[#D4A017]" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
               <input type="text" placeholder="Autor(a)" className="bg-white p-4 rounded-xl outline-none font-bold text-sm border focus:border-[#D4A017]" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
               <select className="bg-white p-4 rounded-xl font-bold text-sm border" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                 <option value="summary">Resumo</option><option value="script">Simulado</option><option value="other">Outro</option>
               </select>
             </div>
             <textarea placeholder="Descrição breve do que há no arquivo (Opcional)" className="w-full bg-white p-4 rounded-xl mb-6 min-h-[80px] font-bold text-sm border outline-none focus:border-[#D4A017] resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
             
             {!selectedFile ? (
               <label className="w-full cursor-pointer bg-white border-2 border-[#003366] text-[#003366] p-6 rounded-2xl font-black uppercase text-xs text-center block hover:bg-[#003366] hover:text-white transition-all shadow-sm">
                 <Plus className="inline mr-2" /> Escolher Arquivo do Dispositivo
                 <input type="file" className="hidden" onChange={e => e.target.files && setSelectedFile(e.target.files[0])} accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" />
               </label>
             ) : (
               <div className="bg-white border-2 border-green-200 p-8 rounded-3xl text-center shadow-lg animate-in zoom-in">
                 <div className="text-green-600 font-black uppercase text-[10px] tracking-widest mb-2"><CheckCircle2 className="inline mr-1" size={16} /> Arquivo Selecionado</div>
                 <h4 className="text-[#003366] font-black text-lg mb-6">{selectedFile.name}</h4>
                 <div className="flex gap-3">
                    <button onClick={() => setSelectedFile(null)} className="flex-1 bg-gray-100 text-gray-400 p-4 rounded-xl font-black uppercase text-xs hover:bg-gray-200 transition-colors">Trocar</button>
                    <button onClick={handleConfirmUpload} disabled={isUploading} className="flex-[2] bg-[#003366] text-white p-4 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#D4A017] transition-all">
                      {isUploading ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={18} />}
                      {isUploading ? 'ENVIANDO...' : 'CONFIRMAR E PUBLICAR AGORA'}
                    </button>
                 </div>
               </div>
             )}
           </div>
         )}
      </div>

      <div className="mb-8 relative text-left">
        <Search className="absolute inset-y-0 left-6 flex items-center text-gray-400" size={20} />
        <input type="text" placeholder="Pesquisar material..." className="w-full bg-white pl-14 pr-6 py-5 rounded-2xl border-2 border-transparent focus:border-[#D4A017] outline-none text-[#003366] font-bold shadow-sm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </div>

      <div className="space-y-4 text-left">
        {summaries.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 flex items-start justify-between group hover:border-[#D4A017] transition-all shadow-sm">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#003366] group-hover:bg-[#003366] group-hover:text-white transition-all shrink-0"><FileCheck size={28} /></div>
              <div>
                <h3 className="font-black text-[#003366] text-lg leading-tight">{s.title}</h3>
                <div className="flex items-center gap-3 mt-1 mb-2">
                  <div className="flex items-center gap-1 text-[10px] font-black text-[#D4A017] uppercase tracking-wider"><User size={12} /> {s.author}</div>
                  <span className="text-gray-300">|</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{s.date}</span>
                  <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[9px] font-black">{s.label}</span>
                </div>
                {s.description && <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs text-gray-500 italic">"{s.description}"</div>}
              </div>
            </div>
            <a href={s.url} target="_blank" rel="noreferrer" className="bg-[#f4f7f6] hover:bg-[#D4A017] text-[#003366] p-4 rounded-xl transition-all shrink-0"><Download size={24} /></a>
          </div>
        ))}
        {summaries.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">
             Nenhum material na nuvem
          </div>
        )}
      </div>
    </div>
  );
};

export default SummariesListView;