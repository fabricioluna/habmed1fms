import type { SimulationInfo } from './types';

export const SIMULATIONS: SimulationInfo[] = [
  {
    id: 'hm1',
    title: 'Habilidades Médicas 1',
    description: 'Introdução à Prática Médica: Biossegurança, sinais vitais, administração de medicamentos e Suporte Básico de Vida (BLS/AHA).',
    meta: 'Módulo Exclusivo',
    icon: '🩺',
    status: 'active',
    themes: [
      'Biossegurança e Higienização das Mãos',
      'Sinais Vitais, Antropometria e Glicemia Capilar',
      'Administração de Medicamentos (IM, SC, IV)',
      'Suporte Básico de Vida (BLS/PCR)',
      'Abordagem Inicial em Urgências (ABCDE)'
    ],
    references: [
      { id: 'ref1', title: 'Normas, rotinas e técnicas de enfermagem', author: 'MOTTA AL', type: 'book' },
      { id: 'ref2', title: 'Suporte básico de vida: primeiro atendimento na emergência', author: 'QUILICI AP et al.', type: 'book' }
    ]
  }
];