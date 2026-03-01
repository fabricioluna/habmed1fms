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
  createdAt: any;
}

export interface SimulationInfo {
  id: string;
  title: string;
  description: string;
  meta: string;
  icon: string;
  status: 'active' | 'locked';
  themes: string[];
}