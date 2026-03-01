import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, query, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { Trash2, ShieldCheck, Database, LogOut, FileText } from 'lucide-react';
import type { Summary } from '../types';

interface AdminDashboardViewProps {
  onLogout: () => void;
}

const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onLogout }) => {
  const [materials, setMaterials] = useState<Summary[]>([]);

  useEffect(() => {
    const q = query(collection(db, "materials"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as Summary[];
      setMaterials(docs);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (materialId: string, fileUrl: string) => {
    if (!window.confirm("Tem certeza que deseja apagar este material permanentemente?")) return;

    try {
      // 1. Apaga do Firestore
      await deleteDoc(doc(db, "materials", materialId));
      
      // Nota: Para apagar do Storage automaticamente, precisaríamos salvar o storagePath.
      // Por agora, o registro sai da lista do portal imediatamente.
      alert("Material removido com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao remover material.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#003366] text-white rounded-2xl flex items-center justify-center shadow-lg">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#003366] tracking-tighter">Painel de Gestão</h1>
            <p className="text-[10px] font-black text-[#D4A017] uppercase tracking-[0.2em]">Administrador: Luna</p>
          </div>
        </div>
        <button onClick={onLogout} className="bg-red-50 text-red-500 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all">
          Sair <LogOut size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <div className="text-gray-400 mb-2"><Database size={20} /></div>
          <div className="text-3xl font-black text-[#003366]">{materials.length}</div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Materiais na Nuvem</div>
        </div>
      </div>

      <h2 className="text-sm font-black text-[#003366] uppercase tracking-[0.2em] mb-6 ml-4">Gerenciar Materiais</h2>
      
      <div className="space-y-3">
        {materials.map((m) => (
          <div key={m.id} className="bg-white p-5 rounded-3xl border border-gray-100 flex items-center justify-between group hover:border-red-200 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#003366] text-sm">{m.title}</h3>
                <p className="text-[10px] font-medium text-gray-400">Por: {m.author} • {m.date}</p>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(m.id, m.url)}
              className="text-gray-300 hover:text-red-500 p-3 rounded-xl transition-colors"
              title="Apagar Material"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {materials.length === 0 && (
          <div className="text-center py-20 text-gray-300 font-bold uppercase text-xs">Nenhum material para gerenciar.</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardView;