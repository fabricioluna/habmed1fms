import React, { useState, useEffect } from 'react';
import { FileText, Download, Loader2, Search, Plus, FileCheck, ExternalLink } from 'lucide-react';
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

  // 1. Monitorar o Banco de Dados em tempo real
  useEffect(() => {
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
    });

    return () => unsubscribe();
  }, [disciplineId]);

  // 2. Função de Upload Automático para o Firebase
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Filtro de extensões permitidas
    const allowedExtensions = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'txt'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';

    if (!allowedExtensions.includes(fileExtension)) {
      alert("⚠️ Apenas documentos são permitidos (PDF, DOC, DOCX, PPT, TXT).");
      return;
    }

    try {
      setIsUploading(true);
      
      // Criar referência no Storage
      const storageRef = ref(storage, `materials/${disciplineId}/${Date.now()}_${file.name}`);
      
      // Fazer o upload do arquivo
      const snapshot = await uploadBytes(storageRef, file);
      
      // Pegar o link público gerado
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Salvar as informações no Firestore Database
      await addDoc(collection(db, "materials"), {
        disciplineId,
        title: file.name,
        url: downloadURL,
        type: 'summary',
        date: new Date().toLocaleDateString('pt-BR'),
        label: fileExtension.toUpperCase(),
        createdAt: serverTimestamp() // Usar o tempo do servidor do Firebase
      });

      alert("Documento compartilhado com sucesso! 📄");
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar. Verifique se você ativou o Storage e publicou as Rules no console do Firebase.");
    } finally {
      setIsUploading(false);
      e.target.value = ''; // Limpa o seletor de arquivo
    }
  };

  const filteredSummaries = summaries.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-32">
      <button 
        onClick={onBack} 
        className="group flex items-center text-[#003366] font-bold mb-8 hover:text-[#D4A017] transition-all"
      >
        <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> 
        Voltar ao Início
      </button>

      {/* Cabeçalho da Central */}
      <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-gray-100 mb-8 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-20 -mt-20 opacity-50"></div>
         <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between items-center md:items-start">
           <div className="flex-grow">
             <span className="bg-[#D4A017]/20 text-[#003366] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block border border-[#D4A017]/30">
               Drive de Habilidades
             </span>
             <h1 className="text-4xl md:text-5xl font-black text-[#003366] mb-4 tracking-tighter">
               Central de Materiais
             </h1>
             <p className="text-gray-600 text-lg font-medium leading-tight">
               Compartilhe resumos e roteiros em PDF ou DOC diretamente com a turma.
             </p>
           </div>
           
           {/* BOTÃO DE UPLOAD - Agora sem link externo, apenas lógica interna */}
           <label className={`cursor-pointer bg-[#003366] text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-[#D4A017] hover:text-[#003366] transition-all flex items-center gap-2 shrink-0 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
             {isUploading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
             <span>{isUploading ? 'Enviando...' : 'Enviar Documento'}</span>
             <input 
                type="file" 
                className="hidden" 
                onChange={handleFileUpload} 
                disabled={isUploading}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt" 
             />
           </label>
         </div>
      </div>

      {/* Barra de Pesquisa */}
      <div className="mb-8 relative">
        <Search className="absolute inset-y-0 left-6 flex items-center text-gray-400 my-auto" size={20} />
        <input 
          type="text" 
          placeholder="Buscar material na nuvem..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white pl-14 pr-6 py-5 rounded-2xl border-2 border-transparent focus:border-[#D4A017] outline-none text-[#003366] font-bold shadow-sm placeholder:text-gray-300"
        />
      </div>

      {/* Lista de Materiais vinda do Firebase */}
      <div className="grid grid-cols-1 gap-4">
        {filteredSummaries.length > 0 ? (
          filteredSummaries.map((summary) => (
            <div key={summary.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#003366] group-hover:bg-[#003366] group-hover:text-white transition-all">
                  <FileCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#003366] text-sm md:text-base line-clamp-1">
                    {summary.title}
                  </h3>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[9px] font-black bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                      {summary.label}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase">
                      {summary.date}
                    </span>
                  </div>
                </div>
              </div>
              <a 
                href={summary.url} 
                target="_blank" 
                rel="noreferrer" 
                className="bg-[#f4f7f6] hover:bg-[#D4A017] text-[#003366] p-4 rounded-xl transition-all"
              >
                <Download size={20} />
              </a>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="text-5xl mb-4">📂</div>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">
              Nenhum documento encontrado na nuvem
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummariesListView;