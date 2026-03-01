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
      // Bibliografia Básica
      { 
        id: 'ref1', 
        title: 'Normas, rotinas e técnicas de enfermagem (5ª ed.)', 
        author: 'MOTTA AL', 
        type: 'book' 
      },
      { 
        id: 'ref2', 
        title: 'Avaliação nutricional de coletividades (4ª ed.)', 
        author: 'VASCONCELOS FAG', 
        type: 'book' 
      },
      { 
        id: 'ref3', 
        title: 'Avaliação antropométrica em Pediatria: guia prático para profissionais da saúde', 
        author: 'BARROS SP et al.', 
        type: 'book' 
      },
      
      // Bibliografia Complementar
      { 
        id: 'ref4', 
        title: 'Curso básico de controle de infecção hospitalar (E-book)', 
        author: 'BRASIL. Ministério da Saúde', 
        type: 'book'
      },
      { 
        id: 'ref5', 
        title: 'Metodologia científica (6ª ed.)', 
        author: 'CERVO AL et al.', 
        type: 'book' 
      },
      { 
        id: 'ref6', 
        title: 'Semiologia para enfermagem: conceitos e prática clínica', 
        author: 'JENSEN S', 
        type: 'book' 
      },
      { 
        id: 'ref7', 
        title: 'Suporte básico de vida: primeiro atendimento na emergência para profissionais da saúde', 
        author: 'QUILICI AP et al.', 
        type: 'book' 
      },
      { 
        id: 'ref8', 
        title: 'Vigilância Epidemiológica das infecções hospitalares no estado de São Paulo', 
        author: 'Governo de São Paulo. Coord. de Controle de Doenças.', 
        type: 'article'
      }
    ]
  }
];