import React, { useState, useEffect } from 'react';
import { FileText, Download, Loader2, Search, Plus, FileCheck } from 'lucide-react';
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

  useEffect(() => {
    // Busca em tempo real no Firestore
    const q = query(
      collection(db, "materials"),
      where("disciplineId", "==", disciplineId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Summary[];
      setSummaries(docs);
    }, (error) => {
      console.error("Erro no Firestore:", error);
    });

    return () => unsubscribe();
  }, [disciplineId]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Filtro rigoroso de extensões
    const allowedExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'txt'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';

    if (!allowedExtensions.includes(fileExtension)) {
      alert("⚠️ Formato não permitido. Use apenas PDF, DOC, DOCX ou PPT.");
      return;
    }

    try {
      setIsUploading(true);
      
      // 1. Upload para o Firebase Storage
      const fileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `materials/${disciplineId}/${fileName}`);
      
      console.log("Iniciando upload para o Storage...");
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Upload concluído. URL:", downloadURL);

      // 2. Registro no Firestore Database
      await addDoc(collection(db, "materials"), {
        disciplineId,
        title: file.name,
        url: downloadURL,
        type: 'summary',
        date: new Date().toLocaleDateString('pt-BR'),
        label: fileExtension.toUpperCase(),
        createdAt: serverTimestamp()
      });

      alert("Material compartilhado com sucesso! 🚀");
    } catch (error: any) {
      console.error("Erro detalhado:", error);
      alert(`Erro ao enviar: ${error.message}. Verifique as Rules do Storage no Firebase.`);
    } finally {
      setIsUploading(false);
      e.target.value = ''; 
    }
  };

  const filteredSummaries = summaries.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
      <button onClick={onBack} className="group flex items-center text-[#003366] font-bold mb-8 hover:text-[#D4A017] transition-all">
        <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> Voltar ao Início
      </button>

      <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-gray-100 mb-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-20 -mt-20 opacity-50"></div>
         <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-center md:items-start">
           <div className="flex-grow text-left">
             <span className="bg-[#D4A017]/20 text-[#003366] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block border border-[#D4A017]/30">
               Nuvem da Turma IX
             </span>
             <h1 className="text-4xl md:text-5xl font-black text-[#003366] mb-4 tracking-tighter leading-tight">Central de Materiais</h1>
             <p className="text-gray-600 text-lg font-medium">O upload é automático e o link fica disponível para todos na hora.</p>
           </div>
           
           <label className={`cursor-pointer bg-[#003366] text-white px-8 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-[#D4A017] hover:text-[#003366] transition-all flex items-center gap-3 shrink-0 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
             {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
             <span>{isUploading ? 'Processando...' : 'Enviar Documento'}</span>
             <input type="file" className="hidden" onChange={handleFileUpload} disabled={isUploading} accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" />
           </label>
         </div>
      </div>

      <div className="mb-8 relative">
        <Search className="absolute inset-y-0 left-6 flex items-center text-gray-400 my-auto" size={20} />
        <input 
          type="text" 
          placeholder="Pesquisar nos materiais da turma..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white pl-14 pr-6 py-5 rounded-2xl border-2 border-transparent focus:border-[#D4A017] outline-none text-[#003366] font-bold shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filteredSummaries.length > 0 ? (
          filteredSummaries.map((summary) => (
            <div key={summary.id} className="bg-white p-5 rounded-[1.5rem] border border-gray-100 flex items-center justify-between group hover:border-[#D4A017] transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#003366] group-hover:bg-[#003366] group-hover:text-white transition-all">
                  <FileCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#003366] text-sm md:text-base">{summary.title}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[9px] font-black bg-gray-100 px-2 py-0.5 rounded text-gray-500">{summary.label}</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase">{summary.date}</span>
                  </div>
                </div>
              </div>
              <a href={summary.url} target="_blank" rel="noreferrer" className="bg-[#f4f7f6] hover:bg-[#D4A017] text-[#003366] p-3 rounded-xl transition-all">
                <Download size={20} />
              </a>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 text-gray-400 font-bold uppercase text-xs tracking-[0.2em]">
            Nenhum material na nuvem
          </div>
        )}
      </div>
    </div>
  );
};

export default SummariesListView;