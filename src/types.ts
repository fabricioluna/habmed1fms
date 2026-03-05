export type ViewState = 
  | 'home' 
  | 'discipline' 
  | 'admin-login' 
  | 'admin-dashboard' 
  | 'career-quiz' 
  | 'calculators'
  | 'quiz-setup'
  | 'osce-setup'
  | 'osce-ai-setup'
  | 'summaries-list'
  | 'references-view';

export interface ReferenceMaterial {
  id: string;
  title: string;
  author?: string;
  type: 'book' | 'article' | 'link' | 'video';
  url?: string;
}

export interface SimulationInfo {
  id: string;
  title: string;
  description: string;
  meta: string;
  icon: string;
  status: 'active' | 'locked';
  themes: string[];
  references?: ReferenceMaterial[];
}

export interface Summary {
  id: string;
  disciplineId: string;
  title: string;
  author: string;
  description?: string;
  url: string;
  type: 'summary' | 'script' | 'other';
  date: string;
  label: string;
  size?: string; // NOVO CAMPO ADICIONADO AQUI
  createdAt: any;
}

// --- NOVAS INTERFACES DO SIMULADOR OSCE ---

export interface OsceTheme {
  id?: string;
  name: string;
  description: string;
}

export interface OsceAction {
  id: string;
  text: string;
  type: 'correct' | 'incorrect' | 'fatal';
}

export interface OsceStation {
  id?: string;
  themeId: string;
  title: string;
  scenario: string;
  actions: OsceAction[];
  debriefing: string;
  timeLimit: number; // em minutos
}