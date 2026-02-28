export type ViewState = 
  | 'home' 
  | 'discipline' 
  | 'admin' 
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
  url: string;
  type: 'summary' | 'script' | 'other';
  date: string;
  label: string;
  isFolder?: boolean;
  firebaseId?: string;
}