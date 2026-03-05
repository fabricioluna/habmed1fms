import React, { useState, useEffect } from 'react';
import { LogOut, Plus, Trash2, Upload, FileText, Activity, Layers, AlertTriangle, Eraser } from 'lucide-react';
import { collection, addDoc, getDocs, deleteDoc, doc, writeBatch, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import type { OsceTheme, OsceStation, OsceAction } from '../types';

interface AdminDashboardViewProps {
  onLogout: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'resumos' | 'osce-themes' | 'osce-stations'>('osce-stations');
  
  // Estados para Temas OSCE
  const [themes, setThemes] = useState<OsceTheme[]>([]);
  const [newThemeName, setNewThemeName] = useState('');
  const [newThemeDesc, setNewThemeDesc] = useState('');
  
  // Estados para Estações OSCE
  const [stations, setStations] = useState<OsceStation[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  // Carregar dados iniciais
  useEffect(() => {
    fetchThemes();
    fetchStations();
  }, []);

  const fetchThemes = async () => {
    const snapshot = await getDocs(collection(db, 'osce_themes'));
    setThemes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as OsceTheme)));
  };

  const fetchStations = async () => {
    const snapshot = await getDocs(collection(db, 'osce_stations'));
    setStations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as OsceStation)));
  };

  // --- GERENCIAMENTO DE TEMAS ---
  const handleAddTheme = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThemeName) return;
    await addDoc(collection(db, 'osce_themes'), { name: newThemeName, description: newThemeDesc });
    setNewThemeName('');
    setNewThemeDesc('');
    fetchThemes();
  };

  const handleDeleteTheme = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este tema?')) {
      await deleteDoc(doc(db, 'osce_themes', id));
      fetchThemes();
    }
  };

  // --- LIMPEZA EM MASSA ---
  const handleDeleteAllStations = async () => {
    if (!window.confirm('⚠️ ATENÇÃO: Isso apagará TODOS os casos clínicos do sistema. Esta ação não pode ser desfeita. Deseja continuar?')) return;

    setIsUploading(true);
    try {
      const snapshot = await getDocs(collection(db, 'osce_stations'));
      const batch = writeBatch(db);
      snapshot.docs.forEach((document) => {
        batch.delete(doc(db, 'osce_stations', document.id));
      });
      await batch.commit();
      setUploadMessage('Todos os casos foram removidos.');
      fetchStations();
    } catch (error) {
      console.error(error);
      setUploadMessage('Erro ao limpar banco de dados.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteByTheme = async () => {
    if (!selectedThemeId) {
      alert("Selecione um tema primeiro.");
      return;
    }
    const themeName = themes.find(t => t.id === selectedThemeId)?.name;
    if (!window.confirm(`Deseja apagar TODOS os casos do tema "${themeName}"?`)) return;

    setIsUploading(true);
    try {
      const q = query(collection(db, 'osce_stations'), where('themeId', '==', selectedThemeId));
      const snapshot = await getDocs(q);
      const batch = writeBatch(db);
      snapshot.docs.forEach((document) => {
        batch.delete(doc(db, 'osce_stations', document.id));
      });
      await batch.commit();
      setUploadMessage(`Casos de "${themeName}" removidos.`);
      fetchStations();
    } catch (error) {
      console.error(error);
      setUploadMessage('Erro ao remover casos por tema.');
    } finally {
      setIsUploading(false);
    }
  };

  // --- UPLOAD CSV ---
  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedThemeId) {
      alert("Selecione um Tema OSCE antes de carregar.");
      e.target.value = '';
      return;
    }
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage('Processando CSV...');

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const rows = text.split('\n').filter(row => row.trim() !== '');
        let successCount = 0;

        for (let i = 1; i < rows.length; i++) {
          const columns = rows[i].split(';');
          if (columns.length < 7) continue;

          const [titulo, cenario, corretas, incorretas, fatais, debriefing, tempo] = columns;
          const actions: OsceAction[] = [];
          
          corretas.split('|').forEach(a => { if (a.trim()) actions.push({ id: crypto.randomUUID(), text: a.trim(), type: 'correct' }) });
          incorretas.split('|').forEach(a => { if (a.trim()) actions.push({ id: crypto.randomUUID(), text: a.trim(), type: 'incorrect' }) });
          fatais.split('|').forEach(a => { if (a.trim()) actions.push({ id: crypto.randomUUID(), text: a.trim(), type: 'fatal' }) });

          await addDoc(collection(db, 'osce_stations'), {
            themeId: selectedThemeId,
            title: titulo.trim(),
            scenario: cenario.trim(),
            actions,
            debriefing: debriefing.trim(),
            timeLimit: parseInt(tempo.trim()) || 5
          });
          successCount++;
        }
        setUploadMessage(`Sucesso! ${successCount} estações carregadas.`);
        fetchStations();
      } catch (error) {
        console.error(error);
        setUploadMessage('Erro no CSV. Verifique o formato.');
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsText(file, 'UTF-8');
  };

  const handleDeleteStation = async (id: string) => {
    if (window.confirm('Excluir esta estação clínica?')) {
      await deleteDoc(doc(db, 'osce_stations', id));
      fetchStations();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#003366] dark:text-slate-100 tracking-tighter">Painel de Controle</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400 font-medium">Gestão de Conteúdo e Simuladores Práticos</p>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-100 transition-colors">
          <LogOut size={16} /> Sair
        </button>
      </div>

      <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-slate-800 pb-px overflow-x-auto">
        <button onClick={() => setActiveTab('resumos')} className={`flex items-center gap-2 pb-3 px-2 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'resumos' ? 'border-[#D4A017] text-[#003366] dark:text-[#D4A017]' : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-slate-300'}`}><FileText size={18}/> Resumos Teóricos</button>
        <button onClick={() => setActiveTab('osce-themes')} className={`flex items-center gap-2 pb-3 px-2 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'osce-themes' ? 'border-[#D4A017] text-[#003366] dark:text-[#D4A017]' : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-slate-300'}`}><Layers size={18}/> Temas OSCE</button>
        <button onClick={() => setActiveTab('osce-stations')} className={`flex items-center gap-2 pb-3 px-2 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'osce-stations' ? 'border-[#D4A017] text-[#003366] dark:text-[#D4A017]' : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-slate-300'}`}><Activity size={18}/> Estações Clínicas (CSV)</button>
      </div>

      {activeTab === 'osce-themes' && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
            <h3 className="font-black text-[#003366] dark:text-slate-100 mb-4">Novo Tema</h3>
            <form onSubmit={handleAddTheme} className="space-y-4">
              <input type="text" required value={newThemeName} onChange={(e) => setNewThemeName(e.target.value)} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm dark:text-white outline-none focus:border-[#D4A017] transition-all" placeholder="Nome do Tema" />
              <input type="text" value={newThemeDesc} onChange={(e) => setNewThemeDesc(e.target.value)} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm dark:text-white outline-none focus:border-[#D4A017] transition-all" placeholder="Descrição Curta" />
              <button type="submit" className="w-full bg-[#003366] text-white font-bold text-sm px-4 py-3 rounded-xl hover:bg-[#D4A017] transition-all flex justify-center items-center gap-2"><Plus size={18} /> Adicionar Tema</button>
            </form>
          </div>
          <div className="md:col-span-2 space-y-4">
            {themes.map(theme => (
              <div key={theme.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex justify-between items-center group">
                <div><h4 className="font-bold text-[#003366] dark:text-blue-400">{theme.name}</h4><p className="text-xs text-gray-500">{theme.description}</p></div>
                <button onClick={() => theme.id && handleDeleteTheme(theme.id)} className="text-gray-300 hover:text-red-500 transition-colors p-2"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'osce-stations' && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
              <h3 className="font-black text-[#003366] dark:text-slate-100 mb-4 flex items-center gap-2"><Upload size={18}/> Importar CSV</h3>
              <div className="space-y-6">
                <select value={selectedThemeId} onChange={(e) => setSelectedThemeId(e.target.value)} className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm dark:text-white outline-none focus:border-[#D4A017] transition-all font-medium">
                  <option value="" disabled>-- Selecione o Tema --</option>
                  {themes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
                <div className={`p-4 rounded-2xl border-2 border-dashed text-center ${selectedThemeId ? 'border-blue-300 bg-blue-50/50 dark:border-blue-800' : 'border-gray-200 opacity-50'}`}>
                  <input type="file" accept=".csv" disabled={!selectedThemeId || isUploading} onChange={handleCsvUpload} className="hidden" id="csv-upload" />
                  <label htmlFor="csv-upload" className={`flex flex-col items-center gap-2 ${selectedThemeId && !isUploading ? 'cursor-pointer text-[#003366] dark:text-blue-400' : 'text-gray-400'}`}><FileText size={32} /><span className="text-sm font-bold">{isUploading ? 'Processando...' : 'Subir CSV'}</span></label>
                </div>
                {uploadMessage && <div className="text-xs font-bold text-center p-2 rounded-lg bg-emerald-50 text-emerald-600">{uploadMessage}</div>}
              </div>
            </div>

            <div className="bg-red-50/50 dark:bg-red-900/10 p-6 rounded-3xl border border-red-100 dark:border-red-900/30">
              <h3 className="font-black text-red-600 dark:text-red-400 mb-4 flex items-center gap-2 text-sm"><AlertTriangle size={18}/> Zona de Manutenção</h3>
              <div className="space-y-3">
                <button onClick={handleDeleteByTheme} disabled={!selectedThemeId || isUploading} className="w-full flex items-center justify-between bg-white dark:bg-slate-900 border border-red-200 p-3 rounded-xl text-xs font-bold text-red-600 hover:bg-red-600 hover:text-white transition-all">Limpar Tema <Eraser size={16} /></button>
                <button onClick={handleDeleteAllStations} disabled={isUploading} className="w-full flex items-center justify-between bg-red-600 text-white p-3 rounded-xl text-xs font-bold hover:bg-red-700">APAGAR TUDO <Trash2 size={16} /></button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4 overflow-y-auto max-h-[800px] pr-2">
            {stations.map(station => (
              <div key={station.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-black uppercase text-[#D4A017]">{themes.find(t => t.id === station.themeId)?.name}</span>
                  <h4 className="font-bold text-[#003366] dark:text-slate-100">{station.title}</h4>
                </div>
                <button onClick={() => station.id && handleDeleteStation(station.id)} className="text-red-500 p-2"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardView;