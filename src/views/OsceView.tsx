import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, XCircle, Skull, Play, RotateCcw, Shuffle, ListFilter, X, ChevronUp, ChevronDown } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import type { OsceStation, OsceAction, OsceTheme } from '../types';

interface OsceViewProps {
  onBack: () => void;
}

export const OsceView: React.FC<OsceViewProps> = ({ onBack }) => {
  const [stations, setStations] = useState<OsceStation[]>([]);
  const [themes, setThemes] = useState<OsceTheme[]>([]);
  const [selectedStation, setSelectedStation] = useState<OsceStation | null>(null);
  
  // Filtros da tela inicial
  const [selectedThemeFilter, setSelectedThemeFilter] = useState<string>('all');
  const [isChoosingRandomTheme, setIsChoosingRandomTheme] = useState<string>('');

  // Estados da Simulação
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [shuffledActions, setShuffledActions] = useState<OsceAction[]>([]);
  const [selectedActions, setSelectedActions] = useState<OsceAction[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Carregar dados
  useEffect(() => {
    const fetchData = async () => {
      const [stationsSnap, themesSnap] = await Promise.all([
        getDocs(collection(db, 'osce_stations')),
        getDocs(collection(db, 'osce_themes'))
      ]);
      setStations(stationsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as OsceStation)));
      setThemes(themesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as OsceTheme)));
    };
    fetchData();
  }, []);

  // Lógica do Cronômetro
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isActive && timeLeft > 0 && !isFinished) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isActive && !isFinished) {
      handleFinish(); 
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, isFinished]);

  // FUNÇÕES DE SORTEIO E INÍCIO
  const handleStart = (station: OsceStation) => {
    setSelectedStation(station);
    setTimeLeft(station.timeLimit * 60);
    const shuffled = [...station.actions].sort(() => Math.random() - 0.5);
    setShuffledActions(shuffled);
    setSelectedActions([]);
    setIsFinished(false);
    setIsActive(true);
  };

  const handleRandomAll = () => {
    if (stations.length === 0) return;
    const randomStation = stations[Math.floor(Math.random() * stations.length)];
    handleStart(randomStation);
  };

  const handleRandomByTheme = () => {
    if (!isChoosingRandomTheme) return;
    const themeStations = stations.filter(s => s.themeId === isChoosingRandomTheme);
    if (themeStations.length === 0) {
      alert("Nenhuma estação cadastrada para este tema ainda.");
      return;
    }
    const randomStation = themeStations[Math.floor(Math.random() * themeStations.length)];
    handleStart(randomStation);
  };

  // AÇÕES DURANTE A SIMULAÇÃO
  const handleActionClick = (action: OsceAction) => {
    if (isFinished) return;
    // Se não está na lista, adiciona no final
    if (!selectedActions.find(a => a.id === action.id)) {
      setSelectedActions(prev => [...prev, action]);
    }
  };

  // --- NOVAS FUNÇÕES: MOVER E REMOVER AÇÕES ---
  const handleRemoveAction = (actionId: string) => {
    if (isFinished) return;
    setSelectedActions(prev => prev.filter(a => a.id !== actionId));
  };

  const handleMoveAction = (index: number, direction: 'up' | 'down') => {
    if (isFinished) return;
    
    const newActions = [...selectedActions];
    if (direction === 'up' && index > 0) {
      // Troca com o de cima
      const temp = newActions[index];
      newActions[index] = newActions[index - 1];
      newActions[index - 1] = temp;
    } else if (direction === 'down' && index < newActions.length - 1) {
      // Troca com o de baixo
      const temp = newActions[index];
      newActions[index] = newActions[index + 1];
      newActions[index + 1] = temp;
    }
    setSelectedActions(newActions);
  };
  // --------------------------------------------

  const handleFinish = () => {
    setIsFinished(true);
    setIsActive(false);
  };

  // TELA INICIAL (MENU DE SELEÇÃO)
  if (!selectedStation) {
    const filteredStations = selectedThemeFilter === 'all' 
      ? stations 
      : stations.filter(s => s.themeId === selectedThemeFilter);

    return (
      <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-[#003366] hover:text-white dark:hover:bg-blue-600 transition-colors shadow-sm">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-black text-[#003366] dark:text-slate-100">Laboratório de Habilidades (OSCE)</h2>
            <p className="text-sm text-gray-500 font-medium">Configure seu plantão simulado.</p>
          </div>
        </div>

        {/* MÓDULOS DE SORTEIO */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gradient-to-br from-[#003366] to-blue-900 p-8 rounded-3xl text-white shadow-lg flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black mb-2 flex items-center gap-2"><Shuffle size={20}/> Sorteio Global (Prova Final)</h3>
              <p className="text-sm text-blue-200 mb-6">O sistema escolherá aleatoriamente qualquer caso clínico disponível. Ideal para testar tudo.</p>
            </div>
            <button onClick={handleRandomAll} className="bg-white text-[#003366] font-black uppercase text-xs px-6 py-4 rounded-xl hover:bg-[#D4A017] hover:text-white transition-all shadow-md">
              Sortear Qualquer Caso
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black text-[#003366] dark:text-slate-100 mb-2 flex items-center gap-2"><ListFilter size={20} className="text-[#D4A017]"/> Sorteio Direcionado</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Escolha um tema específico para treinar e nós sortearemos um caso dentro dele.</p>
              <select 
                value={isChoosingRandomTheme}
                onChange={(e) => setIsChoosingRandomTheme(e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm font-bold text-gray-700 dark:text-slate-200 p-3 rounded-xl outline-none mb-4"
              >
                <option value="">-- Selecione o Tema --</option>
                {themes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <button 
              onClick={handleRandomByTheme} 
              disabled={!isChoosingRandomTheme}
              className={`font-black uppercase text-xs px-6 py-4 rounded-xl transition-all shadow-sm ${!isChoosingRandomTheme ? 'bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed' : 'bg-[#003366] text-white hover:bg-blue-800'}`}
            >
              Sortear Neste Tema
            </button>
          </div>
        </div>

        {/* ESCOLHA LIVRE */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h3 className="text-lg font-black text-gray-700 dark:text-slate-200">Ou escolha um caso específico:</h3>
            <select 
              value={selectedThemeFilter}
              onChange={(e) => setSelectedThemeFilter(e.target.value)}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-sm font-bold text-gray-700 dark:text-slate-200 px-4 py-2 rounded-xl outline-none shadow-sm"
            >
              <option value="all">Todos os Temas</option>
              {themes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStations.map(station => (
              <div key={station.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                <div>
                  <span className="text-[9px] font-black uppercase text-[#D4A017] tracking-widest">{themes.find(t=>t.id === station.themeId)?.name}</span>
                  <h4 className="font-black text-[#003366] dark:text-blue-400 mb-2 mt-1 leading-tight">{station.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-slate-400 line-clamp-2 mb-4">{station.scenario}</p>
                </div>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-gray-50 dark:border-slate-800/50">
                  <span className="text-[10px] font-black uppercase text-gray-400 flex items-center gap-1"><Clock size={12}/> {station.timeLimit} MIN</span>
                  <button onClick={() => handleStart(station)} className="bg-blue-50 dark:bg-blue-900/30 text-[#003366] dark:text-blue-300 p-2 rounded-xl group-hover:bg-[#003366] group-hover:text-white transition-colors">
                    <Play size={16} />
                  </button>
                </div>
              </div>
            ))}
            {filteredStations.length === 0 && (
              <p className="col-span-full text-center text-sm font-bold text-gray-400 py-10">Nenhum caso encontrado para este filtro.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- LÓGICAS DO FEEDBACK (isFinished) ---
  const isFatal = selectedActions.some(a => a.type === 'fatal');
  const correctExpected = selectedStation.actions.filter(a => a.type === 'correct'); // Ordem Original do CSV
  const correctSelected = selectedActions.filter(a => a.type === 'correct');
  const incorrectSelected = selectedActions.filter(a => a.type === 'incorrect');
  
  let score = 0;
  if (!isFatal) {
    const pointPerCorrect = 100 / correctExpected.length;
    score = correctSelected.length * pointPerCorrect;
    score -= (incorrectSelected.length * (pointPerCorrect / 2)); 
    if (score < 0) score = 0;
  }

  // Função avançada para checar se a ação correta foi selecionada fora de ordem
  const checkIfOutOfOrder = (actionId: string) => {
    const targetIdxUser = correctSelected.findIndex(a => a.id === actionId);
    if (targetIdxUser <= 0) return false; 
    const targetIdxExpected = correctExpected.findIndex(a => a.id === actionId);

    for (let i = 0; i < targetIdxUser; i++) {
      const prevActionId = correctSelected[i].id;
      const prevIdxExpected = correctExpected.findIndex(a => a.id === prevActionId);
      if (prevIdxExpected > targetIdxExpected) {
        return true; 
      }
    }
    return false;
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      
      {/* HEADER DA ESTAÇÃO EM ANDAMENTO */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#D4A017]">OSCE em Andamento</span>
          <h2 className="text-xl md:text-2xl font-black text-[#003366] dark:text-slate-100">{selectedStation.title}</h2>
        </div>
        
        <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-2xl tracking-widest transition-colors ${timeLeft < 60 && !isFinished ? 'bg-red-50 text-red-600 animate-pulse border border-red-200' : 'bg-gray-50 dark:bg-slate-800 text-[#003366] dark:text-blue-300'}`}>
          <Clock size={24} />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-[2rem] border border-blue-100 dark:border-blue-800/50 mb-8">
        <h3 className="text-xs font-black uppercase text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2"><AlertTriangle size={16}/> Cenário do Paciente</h3>
        <p className="text-sm font-medium text-blue-900 dark:text-blue-100 leading-relaxed">{selectedStation.scenario}</p>
      </div>

      {!isFinished ? (
        /* TELA DE JOGO */
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <h3 className="text-sm font-black text-[#003366] dark:text-slate-200 mb-4">Ações Disponíveis</h3>
            <div className="flex flex-wrap gap-2.5">
              {shuffledActions.map(action => {
                const isSelected = selectedActions.some(a => a.id === action.id);
                // O botão na nuvem agora fica desabilitado visualmente se já foi escolhido
                return (
                  <button
                    key={action.id}
                    onClick={() => handleActionClick(action)}
                    disabled={isSelected}
                    className={`text-left text-[13px] font-bold px-4 py-3 rounded-xl transition-all border-2 ${isSelected ? 'bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-400 dark:text-slate-600 cursor-not-allowed opacity-60' : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:border-[#D4A017] shadow-sm'}`}
                  >
                    {action.text}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-slate-900/50 p-6 rounded-[2rem] border border-gray-200 dark:border-slate-800 flex flex-col h-full shadow-sm">
            <h3 className="text-sm font-black text-[#003366] dark:text-slate-200 mb-4">Sua Conduta (Ordem Cronológica)</h3>
            
            <div className="flex-grow space-y-3 overflow-y-auto max-h-[450px] mb-6 pr-2">
              {selectedActions.length === 0 ? (
                <p className="text-xs font-medium text-gray-400 italic text-center mt-10">Clique nas ações ao lado para montar sua conduta.</p>
              ) : (
                selectedActions.map((action, index) => (
                  <div key={action.id} className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 p-2 pl-3 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 animate-in slide-in-from-left-2">
                    
                    {/* Número */}
                    <span className="w-6 h-6 rounded-full bg-[#003366] text-white flex items-center justify-center text-[10px] font-black shrink-0">
                      {index + 1}
                    </span>
                    
                    {/* Texto da Ação */}
                    <span className="text-[12px] font-bold text-gray-700 dark:text-slate-200 flex-grow leading-tight py-1">
                      {action.text}
                    </span>

                    {/* Controles: Mover Cima/Baixo e Excluir */}
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      <div className="flex flex-col gap-0.5 mr-1">
                        <button 
                          onClick={() => handleMoveAction(index, 'up')}
                          disabled={index === 0}
                          className="p-1 rounded bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-300 disabled:opacity-30 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                          title="Mover para Cima"
                        >
                          <ChevronUp size={12} strokeWidth={3}/>
                        </button>
                        <button 
                          onClick={() => handleMoveAction(index, 'down')}
                          disabled={index === selectedActions.length - 1}
                          className="p-1 rounded bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-300 disabled:opacity-30 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                          title="Mover para Baixo"
                        >
                          <ChevronDown size={12} strokeWidth={3}/>
                        </button>
                      </div>
                      <button 
                        onClick={() => handleRemoveAction(action.id)}
                        className="p-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                        title="Remover Ação"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <button 
              onClick={handleFinish}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-xs py-4 rounded-2xl transition-all shadow-lg flex justify-center items-center gap-2 mt-auto"
            >
              <CheckCircle size={18}/> Finalizar Atendimento
            </button>
          </div>
        </div>
      ) : (

        /* TELA DE FEEDBACK (LADO A LADO) */
        <div className="animate-in zoom-in-95 duration-500">
          
          <div className={`p-8 rounded-[2rem] text-center mb-8 flex flex-col items-center shadow-lg ${isFatal ? 'bg-red-600 text-white' : score >= 70 ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'}`}>
            {isFatal ? <Skull size={50} className="mb-4 opacity-80 animate-bounce" /> : score >= 70 ? <CheckCircle size={50} className="mb-4 opacity-80" /> : <AlertTriangle size={50} className="mb-4 opacity-80" />}
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-2">
              {isFatal ? 'Conduta Fatal' : score >= 70 ? 'Estação Aprovada' : 'Atenção aos Detalhes'}
            </h2>
            <p className="text-sm font-bold opacity-90 uppercase tracking-widest">Nota Clínica: <span className="font-black text-xl">{isFatal ? 0 : Math.round(score)}%</span></p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-800 mb-8">
             <h3 className="text-xs font-black uppercase text-[#003366] dark:text-blue-400 mb-3 tracking-widest">Debriefing do Preceptor</h3>
             <p className="text-sm font-medium text-gray-700 dark:text-slate-300 leading-relaxed text-justify">{selectedStation.debriefing}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            
            {/* COLUNA 1: O QUE O ALUNO FEZ */}
            <div className="bg-gray-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-gray-200 dark:border-slate-800">
              <h3 className="text-sm font-black text-[#003366] dark:text-slate-200 mb-6 flex items-center gap-2">Sua Conduta</h3>
              <div className="space-y-3">
                {selectedActions.length === 0 && <p className="text-xs text-gray-400 font-bold">Nenhuma ação foi tomada.</p>}
                
                {selectedActions.map((action, index) => {
                  const isCorrect = action.type === 'correct';
                  const isFatalAct = action.type === 'fatal';
                  const outOfOrder = isCorrect && checkIfOutOfOrder(action.id);

                  return (
                    <div key={action.id} className={`p-3 rounded-xl border text-xs font-bold flex flex-col gap-1 ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400' : isFatalAct ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400' : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400'}`}>
                      <div className="flex items-start gap-2">
                        <span className="shrink-0 mt-0.5">
                          {isCorrect ? <CheckCircle size={14}/> : isFatalAct ? <Skull size={14}/> : <XCircle size={14}/>}
                        </span>
                        <span>{index + 1}. {action.text}</span>
                      </div>
                      
                      {/* Alerta de fora de ordem */}
                      {outOfOrder && (
                        <div className="flex items-center gap-1 text-[10px] text-orange-600 bg-orange-100 dark:bg-orange-900/50 px-2 py-1 rounded mt-1 ml-6 w-fit">
                          <AlertTriangle size={10} /> Realizado fora de ordem
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* COLUNA 2: O GABARITO (O QUE DEVERIA TER FEITO) */}
            <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-[2rem] border border-blue-100 dark:border-blue-900/30">
              <h3 className="text-sm font-black text-blue-900 dark:text-blue-400 mb-6 flex items-center gap-2">Gabarito Esperado</h3>
              <div className="space-y-3">
                {correctExpected.map((action, index) => {
                  const userGotIt = selectedActions.some(a => a.id === action.id);
                  return (
                    <div key={action.id} className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 border ${userGotIt ? 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300' : 'bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/50 text-red-500 dark:text-red-400 border-dashed'}`}>
                       <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] shrink-0 ${userGotIt ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                         {index + 1}
                       </span>
                       {action.text}
                       {!userGotIt && <span className="ml-auto text-[9px] uppercase tracking-widest opacity-60">Esqueceu</span>}
                    </div>
                  )
                })}
              </div>
            </div>

          </div>

          <div className="mt-10 flex justify-center">
            <button 
              onClick={() => setSelectedStation(null)}
              className="bg-[#003366] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-[#D4A017] transition-all shadow-md"
            >
              <RotateCcw size={16} /> Retornar ao Menu de Sorteio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OsceView;