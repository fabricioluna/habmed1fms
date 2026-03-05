import React, { useState } from 'react';
import { 
  ArrowRight, RefreshCw, ArrowLeft, Brain, Activity, Slice, Syringe, Home, 
  Zap, Users, FlaskConical, UserCheck, Target, Waves, 
  Stethoscope, Heart, Baby, Eye, Shield, HardHat, Scissors, Search,
  Wind, Ear, Scale, Microscope as MicroscopeIcon, BookOpen, GraduationCap
} from 'lucide-react';

type Specialty = 
  | 'Clínica Médica' | 'Pediatria' | 'Cirurgia Geral' | 'Ginecologia e Obstetrícia'
  | 'Anestesiologia' | 'Ortopedia e Traumatologia' | 'Medicina do Trabalho'
  | 'Cardiologia' | 'Oftalmologia' | 'Radiologia e Diagnóstico por Imagem'
  | 'Psiquiatria' | 'Dermatologia' | 'Medicina Intensiva' | 'Otorrinolaringologia'
  | 'Cirurgia Plástica' | 'Medicina de Família e Comunidade' | 'Urologia'
  | 'Neurologia' | 'Endocrinologia e Metabologia' | 'Infectologia'
  | 'Gastroenterologia' | 'Nefrologia' | 'Cirurgia Vascular'
  | 'Neurocirurgia' | 'Pneumologia' | 'Alergologia e Imunologia'
  | 'Hematologia' | 'Genética' | 'Oncologia' | 'Patologia' | 'Reumatologia' 
  | 'Cuidados Paliativos' | 'Geriatria' | 'Emergência';

interface AnswerOption {
  text: string;
  weights: Partial<Record<Specialty, number>>; 
}

interface Question {
  id: number;
  category: 'Lifestyle' | 'Academic' | 'Psychological' | 'Technical' | 'Sensory';
  text: string;
  options: AnswerOption[];
}

// Tipagem afrouxada para "Record<string, any>" para impedir que o Vite dê erro 500 no compilador
const specialtyDetails: Record<string, any> = {
  'Clínica Médica': { 
    icon: <Stethoscope size={48} />, desc: "O Detetive do Corpo Humano", 
    profile: "Você possui uma mente investigativa, movida pela curiosidade e pelo desejo de entender o paciente como um todo sistêmico. Seu cérebro busca padrões complexos, conectando sintomas aparentemente difusos para formar um diagnóstico preciso. Valoriza a escuta ativa, o raciocínio intelectual minucioso e o desafio de desvendar enigmas fisiológicos.", 
    advice: "Para se destacar, mergulhe profundamente na Fisiopatologia e na Semiologia Médica durante o ciclo clínico da FMS. Não aceite apenas o 'como' tratar, busque sempre o 'porquê' da doença ocorrer. Desenvolva uma anamnese irretocável, pois a conversa será sua principal ferramenta.", 
    book: "Harrison: Medicina Interna | Goldman-Cecil Medicine | Bates: Propedêutica Médica | Porto: Semiologia Médica", 
    subjects: ["Fisiopatologia", "Semiologia Médica", "Farmacologia Clínica"] 
  },
  'Cirurgia Geral': { 
    icon: <Slice size={48}/>, desc: "O Resolutor Pragmático", 
    profile: "Você é pragmático, objetivo e movido pela ação. Prefere intervir diretamente no problema e ver o resultado físico do seu trabalho de forma imediata. Possui alta resiliência para o estresse hospitalar, boa destreza manual e uma capacidade inata de manter o foco em situações críticas de bloco cirúrgico.", 
    advice: "Seu foco no ciclo básico deve ser a Anatomia Humana — especialmente a topográfica — como se fosse sua língua materna. Durante as práticas, busque o máximo de horas no bloco cirúrgico para observar e aprimorar sua técnica operatória, de paramentação a nós cirúrgicos.", 
    book: "Sabiston: Tratado de Cirurgia | Townsend: Sabiston Textbook | Moore: Anatomia Orientada", 
    subjects: ["Anatomia Humana", "Técnica Cirúrgica", "Bases Operatórias"] 
  },
  'Pediatria': { 
    icon: <Baby size={48}/>, desc: "O Guardião do Futuro", 
    profile: "Você se destaca por uma empatia natural, ludicidade e paciência. Diferente de outras áreas, você não trata apenas uma doença, mas atua como um educador familiar, gerenciando ansiedades e acompanhando o desenvolvimento humano desde o primeiro choro até a adolescência.", 
    advice: "O domínio da Puericultura (acompanhamento do desenvolvimento saudável) é o que diferencia o pediatra de excelência. Estude profundamente os marcos do desenvolvimento neuropsicomotor, calendário vacinal e genética. Aprenda a examinar o paciente através do lúdico.", 
    book: "Nelson: Tratado de Pediatria | Tratado de Pediatria da SBP | Moore: Embriologia Básica", 
    subjects: ["Genética", "Saúde da Criança", "Embriologia Humana"] 
  },
  'Psiquiatria': { 
    icon: <Users size={48}/>, desc: "O Arquiteto da Psique", 
    profile: "Fascinado pela subjetividade humana, pelo comportamento e pelos mistérios da mente. Você prefere a escuta profunda ao exame físico e entende que o sofrimento emocional é tão ou mais complexo que o orgânico. Seu perfil é altamente analítico, filosófico e desprovido de preconceitos.", 
    advice: "A psicopatologia é o coração da sua futura atuação. Estude Neurociências no ciclo básico para entender o substrato biológico dos transtornos, mas invista pesado em Psicologia Médica e na técnica da entrevista psiquiátrica.", 
    book: "Kaplan & Sadock: Compêndio de Psiquiatria | Stahl: Psicofarmacologia Essencial | DSM-5-TR", 
    subjects: ["Psicologia Médica", "Neurociências", "Psiquiatria Clínica"] 
  },
  'Emergência': { 
    icon: <Zap size={48}/>, desc: "A Linha de Frente da Vida", 
    profile: "O caos não te paralisa; ele te energiza. Você funciona perfeitamente sob pressão extrema, possui raciocínio ultrarrápido e sabe tomar decisões difíceis em frações de segundo. Sua prioridade não é descobrir a doença rara, mas estabilizar o paciente.", 
    advice: "Torne-se um mestre absoluto em Suporte Básico e Avançado de Vida. Decore os fluxogramas do ACLS, ATLS e PHTLS até que virem reflexo medular. Estude a fisiopatologia aguda e as respostas sistêmicas ao trauma e choque.", 
    book: "Rosen's Emergency Medicine | Tintinalli's Emergency Medicine | Manual ATLS/ACLS", 
    subjects: ["Suporte Básico de Vida", "Fisiopatologia Aguda", "Emergências Médicas"] 
  },
  'Ginecologia e Obstetrícia': { 
    icon: <Target size={48}/>, desc: "O Médico da Vida", 
    profile: "Seu perfil é incrivelmente versátil, transitando com fluidez entre consultas clínicas calmas e o ambiente cirúrgico de alta urgência. Você valoriza a saúde integral da mulher e possui resiliência emocional para lidar com as alegrias e lutos da maternidade.", 
    advice: "Sua base teórica deve ser ancorada na Fisiologia Endócrina Feminina e na Embriologia. Domine a estática e a mecânica fetal para compreender o parto. Aproveite os estágios para praticar o exame especular e o toque bimanual.", 
    book: "Zugaib: Obstetrícia | Berek & Novak: Ginecologia | Rezende: Obstetrícia Fundamental", 
    subjects: ["Fisiologia Reprodutiva", "Saúde da Mulher", "Técnica Cirúrgica Básica"] 
  },
  'Anestesiologia': { 
    icon: <Syringe size={48}/>, desc: "O Mestre da Fisiologia", 
    profile: "Você é focado, exato e adora estar no controle absoluto da situação. Encanta-se com a farmacologia e gosta de ver as respostas imediatas do corpo às suas intervenções. Garante a ausência de dor e a manutenção da vida durante momentos cirúrgicos cruciais.", 
    advice: "Farmacologia e Fisiologia Humana (respiratória e cardiovascular) devem ser dominadas com perfeição matemática. Aprofunde-se no mecanismo de ação das drogas anestésicas e na interpretação avançada do monitoramento multiparamétrico.", 
    book: "Miller: Anestesiologia | Morgan & Mikhail's Clinical Anesthesiology | Barash: Clinical Anesthesia", 
    subjects: ["Farmacologia I e II", "Fisiologia CV e Respiratória", "Clínica Cirúrgica"] 
  },
  'Radiologia e Diagnóstico por Imagem': { 
    icon: <MicroscopeIcon size={48}/>, desc: "A Visão Além do Alcance", 
    profile: "Seu perfil é extremamente visual, metódico e voltado à tecnologia. Prefere a tranquilidade da sala de laudos, onde pode focar 100% de sua energia mental no processamento de imagens complexas, longe do agito direto das enfermarias.", 
    advice: "Seu sucesso depende do domínio absoluto da Anatomia Humana normal e seccional. Antes de procurar a doença, você precisa saber cada milímetro do saudável. Aprofunde-se nos princípios de Biofísica.", 
    book: "Felson: Princípios de Radiologia do Tórax | Netter: Anatomia Radiológica Clássica | Herring: Learning Radiology", 
    subjects: ["Biofísica", "Anatomia Topográfica", "Imagenologia Médica"] 
  },
  'Medicina de Família e Comunidade': { 
    icon: <Home size={48}/>, desc: "O Médico da Pessoa", 
    profile: "Profundamente humano, empático e generalista. Você entende que a saúde de um paciente depende do meio em que ele vive. Prioriza vínculos longitudinais, acompanhando famílias ao longo de décadas e atuando fortemente na prevenção.", 
    advice: "Aproprie-se do Método Clínico Centrado na Pessoa (MCCP), ouvindo a narrativa do adoecimento, não apenas a patologia. Estude a estrutura do SUS, Saúde Coletiva e Epidemiologia.", 
    book: "Tratado de Medicina de Família e Comunidade (Duncan) | Gusso & Lopes: Tratado de MFC", 
    subjects: ["Saúde Coletiva", "Epidemiologia", "Semiologia Integrada"] 
  },
  'Dermatologia': { 
    icon: <Search size={48}/>, desc: "A Visão Cutânea", 
    profile: "Você é altamente observador, esteta e detalhista. Encontra satisfação na inspeção visual imediata e valoriza intervenções que melhorem significativamente a autoestima e a qualidade de vida do paciente.", 
    advice: "A base da dermatologia é a Imunologia Clínica e a Histologia. Entenda que a pele é frequentemente a janela para doenças sistêmicas, portanto, a clínica médica básica é essencial.", 
    book: "Azulay: Dermatologia | Fitzpatrick's Dermatology in General Medicine | Bolognia: Dermatology", 
    subjects: ["Histologia Humana", "Imunologia", "Dermatologia Clínica"] 
  },
  'Ortopedia e Traumatologia': { 
    icon: <HardHat size={48}/>, desc: "O Engenheiro do Corpo", 
    profile: "Pragmático, direto e com forte raciocínio espacial e mecânico. Você prefere o ambiente cirúrgico e de urgências onde pode reconstruir estruturas quebradas, lidando com ossos, alavancas e parafusos.", 
    advice: "Anatomia Musculoesquelética é o seu pilar fundamental; estude origens, inserções e inervações musculares incansavelmente. No ciclo clínico, foque nas manobras de semiologia ortopédica.", 
    book: "Rockwood and Green's Fractures in Adults | Campbell's Operative Orthopaedics | Netter's Concise Anatomy", 
    subjects: ["Anatomia do Aparelho Locomotor", "Traumatologia", "Biomecânica"] 
  },
  'Cardiologia': { 
    icon: <Heart size={48}/>, desc: "O Mestre do Ritmo", 
    profile: "Raciocínio lógico, calculista e fascinado pelas leis da física aplicadas ao fluxo sanguíneo e dinâmica do coração. Toma decisões baseadas em protocolos rigorosos e evidências científicas sólidas.", 
    advice: "Sua fundação deve ser a Fisiologia Cardiovascular (ciclo cardíaco, potenciais de ação) e a Hemodinâmica. Acostume-se a ler Eletrocardiogramas (ECG) diariamente até que pareça um idioma nativo.", 
    book: "Braunwald's Heart Disease | Tratado de Cardiologia da SOCESP | Guyton e Hall (Fisiologia)", 
    subjects: ["Fisiologia Cardiovascular", "Semiologia Cardiológica", "Farmacologia"] 
  },
  'Medicina Intensiva': { 
    icon: <Zap size={48}/>, desc: "A Elite do Suporte Vital", 
    profile: "Frio sob pressão, organizado e intensamente metódico. Onde outros veem caos clínico e falência múltipla, você vê variáveis fisiológicas que precisam ser reequilibradas através de dados constantes de monitores.", 
    advice: "O domínio da interpretação do Equilíbrio Ácido-Básico, parâmetros de Ventilação Mecânica e resposta inflamatória sistêmica é mandatório. Estude fisiologia renal e pulmonar com nível de detalhe superior.", 
    book: "Marino: O Livro da UTI | Irwin and Rippe's Intensive Care Medicine | Knobel: Terapia Intensiva", 
    subjects: ["Fisiologia Renal e Respiratória", "Farmacologia (Drogas Vasoativas)", "Medicina de Urgência"] 
  },
  'Otorrinolaringologia': { 
    icon: <Ear size={48}/>, desc: "O Mestre dos Sentidos", 
    profile: "Busca um equilíbrio perfeito entre o atendimento ambulatorial clínico e a destreza da microcirurgia. Seu foco está em cavidades e espaços minuciosos, exigindo precisão motora refinada.", 
    advice: "A Anatomia Topográfica da cabeça, face e pescoço deve ser dominada aos mínimos detalhes. Preste muita atenção na neuroanatomia e nos pares cranianos durante o ciclo básico.", 
    book: "Cummings Otolaryngology | Tratado de Otorrinolaringologia (ABORL-CCF) | Bailey's Head and Neck Surgery", 
    subjects: ["Anatomia de Cabeça e Pescoço", "Neuroanatomia", "Otorrinolaringologia"] 
  },
  'Cirurgia Plástica': { 
    icon: <Scissors size={48}/>, desc: "O Artista Funcional", 
    profile: "Profundamente perfeccionista, detalhista e com um senso inato de proporção espacial e estética. Você entende que restaurar a forma é também restaurar a mente do paciente, equilibrando estética e função.", 
    advice: "A base biológica do seu trabalho será a Fisiologia da Cicatrização, a nutrição dos tecidos e a resposta inflamatória. Estude intensamente a anatomia vascular aplicada a retalhos e enxertos.", 
    book: "Neligan: Plastic Surgery | Grabb and Smith's Plastic Surgery | Mélega: Cirurgia Plástica", 
    subjects: ["Técnica Operatória", "Anatomia Topográfica", "Histologia"] 
  },
  'Urologia': { 
    icon: <Activity size={48}/>, desc: "O Especialista Resolutivo", 
    profile: "Prático, tecnológico e voltado para a intervenção imediata. Gosta da inovação robótica e de procedimentos minimamente invasivos (endourologia), equilibrando volume ambulatorial com cirurgia.", 
    advice: "Estude de forma dedicada a Anatomia Geniturinária, da pélvis ao períneo. Entenda muito bem as bases do metabolismo renal para compreender as disfunções de trato urinário.", 
    book: "Campbell-Walsh Urology | Smith and Tanagho's General Urology | SBU: Urologia Fundamental", 
    subjects: ["Anatomia do Sistema Excretor", "Clínica Cirúrgica", "Fisiologia Renal"] 
  },
  'Neurologia': { 
    icon: <Brain size={48}/>, desc: "O Arquiteto do Pensamento", 
    profile: "Possui o raciocínio dedutivo mais puro e lógico da medicina. Apaixonado por desvendar sintomas complexos através da clínica exata, localizar lesões com precisão matemática e gerenciar disfunções do sistema nervoso.", 
    advice: "O segredo da neurologia é: saiba sempre 'onde' está o problema antes de perguntar 'o que' é o problema. A Neuroanatomia Funcional e a Neurofisiologia são absolutas.", 
    book: "Adams and Victor's Principles of Neurology | Machado: Neuroanatomia Funcional | Bear: Neurociências", 
    subjects: ["Neuroanatomia", "Semiologia Neurológica", "Neurofisiologia"] 
  },
  'Endocrinologia e Metabologia': { 
    icon: <Activity size={48}/>, desc: "O Mestre do Metabolismo", 
    profile: "Metódico, profundo estudioso e focado na gestão de doenças sistêmicas e crônicas. Você entende o corpo como uma orquestra regida por moléculas microscópicas e ciclos hormonais.", 
    advice: "A Bioquímica Humana e a Fisiologia Endócrina são a sua matéria-prima. Entenda perfeitamente os eixos hipotálamo-hipófise e as vias de feedback negativo.", 
    book: "Williams Textbook of Endocrinology | Greenspan's Basic & Clinical Endocrinology | Vilar: Endocrinologia Clínica", 
    subjects: ["Bioquímica Metabólica", "Fisiologia Endócrina", "Clínica Médica"] 
  },
  'Infectologia': { 
    icon: <FlaskConical size={48}/>, desc: "O Investigador Global", 
    profile: "Sistêmico, curioso e com um olhar amplo que transcende o indivíduo e alcança a saúde global e a epidemiologia. Enxerga os micro-organismos como um exército invisível a ser combatido com estratégia.", 
    advice: "Seus pilares são a Microbiologia Médica e a Farmacologia dos Antimicrobianos. Compreenda a fundo os mecanismos de resistência bacteriana e viral.", 
    book: "Mandell's Principles and Practice of Infectious Diseases | Guia Sanford de Terapia Antimicrobiana", 
    subjects: ["Microbiologia Patogênica", "Imunologia", "Saúde Coletiva"] 
  },
  'Gastroenterologia': { 
    icon: <Activity size={48}/>, desc: "O Especialista Dinâmico", 
    profile: "Busca a união perfeita entre o atendimento clínico investigativo focado na biografia do paciente e a praticidade resolutiva de procedimentos intervencionistas, como a endoscopia e colonoscopia.", 
    advice: "Concentre seus estudos na Fisiologia da Digestão, e no complexo funcionamento do fígado e pâncreas. Treine intensamente a palpação abdominal durante a cadeira de Semiologia.", 
    book: "Sleisenger and Fordtran's Gastrointestinal Disease | Yamada's Textbook of Gastroenterology", 
    subjects: ["Fisiologia Digestiva", "Semiologia do Abdome", "Clínica Médica"] 
  },
  'Nefrologia': { 
    icon: <Waves size={48}/>, desc: "O Mestre dos Filtros e Fluidos", 
    profile: "Mente matemática, altamente clínica e capaz de compreender a fisiologia baseada em física e química aplicada. Encontra fascínio nos equilíbrios microscópicos e nas bombas iônicas.", 
    advice: "O domínio integral do Equilíbrio Ácido-Básico, da gasometria e do balanço hidroeletrolítico é inegociável. Estude a fundo o sistema renina-angiotensina-aldosterona.", 
    book: "Brenner & Rector's The Kidney | Riella: Princípios de Nefrologia | Schrier's Diseases of the Kidney", 
    subjects: ["Fisiologia Renal", "Bioquímica", "Clínica Médica Avançada"] 
  },
  'Cirurgia Vascular': { 
    icon: <Activity size={48}/>, desc: "O Arquiteto dos Fluxos", 
    profile: "Trabalha com altíssima precisão e técnica, equilibrando grandes cirurgias abertas com inovações endovasculares e hemodinâmicas. Possui sangue frio para agir rapidamente frente a hemorragias.", 
    advice: "A Anatomia do Sistema Circulatório Periférico e a Fisiologia da Hemodinâmica (fluxo laminar, tensão de cisalhamento) são fundamentais. Domine os princípios da ultrassonografia com Doppler.", 
    book: "Rutherford's Vascular Surgery and Endovascular Therapy | Brito: Cirurgia Vascular", 
    subjects: ["Anatomia CV", "Fisiologia Hemodinâmica", "Bases da Cirurgia"] 
  },
  'Neurocirurgia': { 
    icon: <Zap size={48}/>, desc: "A Elite Estrutural do Sistema Nervoso", 
    profile: "Combina perfeccionismo extremo com uma das maiores cargas de resiliência física e emocional da medicina. Suporta cirurgias que duram horas ininterruptas sob alto grau de tensão.", 
    advice: "A Neuroanatomia Topográfica e Tridimensional é o oxigênio da sua profissão. Você precisa mapear o cérebro e a medula milímetro por milímetro em sua mente.", 
    book: "Greenberg: Handbook of Neurosurgery | Youmans and Winn Neurological Surgery", 
    subjects: ["Neuroanatomia Tridimensional", "Técnica Cirúrgica Avançada", "Neurocirurgia"] 
  },
  'Pneumologia': { 
    icon: <Wind size={48}/>, desc: "O Respiro da Vida", 
    profile: "Clínico com alma de fisiologista. Sente-se confortável investigando falta de ar crônica em ambulatório, mas também assume o protagonismo na beira do leito da UTI organizando o caos respiratório.", 
    advice: "Seus pilares são a Fisiologia Pulmonar (mecânica respiratória, trocas gasosas, relação V/Q) e o perfeito entendimento da espirometria.", 
    book: "Fishman's Pulmonary Diseases and Disorders | West's Respiratory Physiology | Diretrizes da SBPT", 
    subjects: ["Fisiologia Respiratória", "Semiologia do Tórax", "Clínica Médica"] 
  },
  'Alergologia e Imunologia': { 
    icon: <Shield size={48}/>, desc: "A Defesa Microscópica", 
    profile: "Especialista profundamente investigativo, focado na intersecção entre a biologia molecular, genética e a clínica. Encontra fascínio nas reações de hipersensibilidade e imunodeficiências primárias.", 
    advice: "Sua vida acadêmica precisa ser imersa em Imunologia Celular e Bioquímica. Compreenda minuciosamente as vias do sistema complemento, tipos de anticorpos e citocinas inflamatórias.", 
    book: "Middleton's Allergy: Principles and Practice | Abbas: Imunologia Celular e Molecular", 
    subjects: ["Imunologia Básica e Aplicada", "Genética Humana", "Farmacologia (Biológicos)"] 
  },
  'Hematologia': { 
    icon: <FlaskConical size={48}/>, desc: "O Mestre do Sangue e da Medula", 
    profile: "Profissional híbrido entre a bancada do laboratório (microscopia e lâminas) e a clínica beira-leito. Encanta-se pela onco-hematologia e patologias intrínsecas da medula óssea.", 
    advice: "A Histologia do tecido hematopoiético e do tecido linfoide é vital. Entenda as intrincadas cascatas de coagulação e a leitura crítica de hemogramas, indo muito além do básico.", 
    book: "Hoffman: Hematology: Basic Principles and Practice | Zago: Hematologia Fundamentos e Prática", 
    subjects: ["Histologia Sistêmica", "Patologia Clínica", "Imunologia"] 
  },
  'Genética': { 
    icon: <Brain size={48}/>, desc: "O Tradutor do Código Humano", 
    profile: "Puro cientista, metódico e analítico. Focado em investigar síndromes raras e no aconselhamento genético familiar ético e humanizado. Não busca a emergência, mas a resposta científica profunda.", 
    advice: "Domine a Biologia Molecular, os padrões de herança mendeliana e não-mendeliana e a Citogenética clássica. A embriologia será seu maior auxílio para entender malformações congênitas.", 
    book: "Thompson & Thompson: Genética Médica | Borges-Osório: Genética Humana", 
    subjects: ["Biologia Molecular e Celular", "Genética Humana", "Embriologia"] 
  },
  'Oncologia': { 
    icon: <Shield size={48}/>, desc: "O Estrategista da Cura e da Esperança", 
    profile: "Combina o que há de mais moderno na biologia de receptores e genômica celular com uma profunda capacidade humanística. É extremamente resiliente diante do sofrimento terminal.", 
    advice: "Aprofunde-se absurdamente em Patologia Geral (especialmente a neoplasia celular e apoptose) e na Farmacologia de quimioterápicos e inibidores imunológicos.", 
    book: "DeVita, Hellman, and Rosenberg's Cancer: Principles & Practice | Manual de Oncologia Clínica (SBOC)", 
    subjects: ["Patologia Geral e Especial", "Biologia Celular", "Farmacologia Clínica"] 
  },
  'Patologia': { 
    icon: <MicroscopeIcon size={48}/>, desc: "A Última Instância Diagnóstica", 
    profile: "Profundamente visual, recluso e focado. Você é a pessoa que detém a palavra final após as cirurgias e biópsias. Sente-se confortável trabalhando sozinho no laboratório, analisando tecidos.", 
    advice: "O Robbins será seu parceiro constante desde o ciclo básico até o resto da vida. Entenda perfeitamente os mecanismos de adaptação, lesão celular e inflamação antes de focar em neoplasias.", 
    book: "Robbins e Cotran: Bases Patológicas das Doenças | Bogliolo: Patologia | Rosai and Ackerman's Surgical Pathology", 
    subjects: ["Histologia dos Tecidos", "Citologia e Biologia Celular", "Patologia Geral e Especial"] 
  },
  'Reumatologia': { 
    icon: <Activity size={48}/>, desc: "O Detetive Sistêmico", 
    profile: "Altamente investigativo e lógico, fascinado por como o corpo humano é capaz de atacar a si mesmo gerando síndromes confusas e sistêmicas que afetam múltiplos órgãos.", 
    advice: "Para ter sucesso, a Imunologia Básica e Clínica deve ser estudada de ponta a ponta. Compreenda as respostas inatas e adaptativas, além de dominar a leitura de autoanticorpos.", 
    book: "Kelley and Firestein's Textbook of Rheumatology | Livro da Sociedade Brasileira de Reumatologia (SBR)", 
    subjects: ["Imunologia Aplicada", "Semiologia Articular", "Farmacologia (Imunossupressores)"] 
  },
  'Medicina do Trabalho': { 
    icon: <Scale size={48}/>, desc: "O Gestor da Saúde Ocupacional", 
    profile: "Visão estratégica, corporativa e previdenciária. Foco na saúde de grandes populações laborais, elaborando laudos ergonômicos e implementando medidas de prevenção.", 
    advice: "Dê atenção dobrada às disciplinas do eixo de Saúde Coletiva e Epidemiologia desde o primeiro período. Estude Medicina Legal e entenda as leis trabalhistas e toxicologia ambiental.", 
    book: "Mendes: Patologia do Trabalho | De Marco: Medicina do Trabalho e Perícias Médicas", 
    subjects: ["Saúde Coletiva (IESC)", "Epidemiologia", "Medicina Legal e Toxicologia"] 
  },
  'Cuidados Paliativos': { 
    icon: <Heart size={48}/>, desc: "O Conforto da Alma", 
    profile: "Sua inteligência emocional e humanismo são incomparáveis. Tem a força interior para amparar o paciente e a família quando o paradigma da 'cura' técnica esgota suas possibilidades.", 
    advice: "Treine exaustivamente os protocolos de comunicação de más notícias (como o SPIKES). Desenvolva bases robustas em Bioética Médica e Filosofia na área da saúde.", 
    book: "Manual de Cuidados Paliativos da ANCP | Oxford Textbook of Palliative Medicine", 
    subjects: ["Bioética e Humanidades", "Psicologia Médica", "Farmacologia da Dor"] 
  },
  'Geriatria': { 
    icon: <Users size={48}/>, desc: "O Especialista na Longevidade", 
    profile: "Paciente, holístico e observador de sutilezas. Diferente de focar em um único órgão, você é especialista em gerenciar múltiplas patologias crônicas simultaneamente.", 
    advice: "A fisiologia muda completamente ao longo da vida: foque nas aulas de Fisiologia do Envelhecimento. Tenha cautela extremada nas aulas de Farmacologia Clínica para dominar as interações.", 
    book: "Brocklehurst's Textbook of Geriatric Medicine | Tratado de Geriatria e Gerontologia (SBGG)", 
    subjects: ["Fisiologia do Envelhecimento", "Farmacologia Clínica", "Semiologia Integral"] 
  }
};

const quizQuestions: Question[] = [
  { id: 1, category: 'Psychological', text: "O monitor apita, a pressão cai bruscamente e a equipe olha para você. Qual sua reação imediata?", options: [
      { text: "Adrenalina e foco total. O caos me energiza para agir.", weights: { 'Anestesiologia': 5, 'Medicina Intensiva': 5, 'Emergência': 5, 'Neurocirurgia': 4 } },
      { text: "Mantenho a calma e analiso os dados antes de qualquer intervenção.", weights: { 'Clínica Médica': 5, 'Nefrologia': 4, 'Neurologia': 5, 'Infectologia': 4 } },
      { text: "Priorizo o acolhimento do paciente e a organização da equipe.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 4, 'Psiquiatria': 3 } },
      { text: "Foco no procedimento técnico específico para estancar o problema.", weights: { 'Cirurgia Vascular': 5, 'Cardiologia': 4, 'Urologia': 3 } }
  ]},
  { id: 2, category: 'Academic', text: "Qual área do ciclo básico desperta sua maior curiosidade intelectual?", options: [
      { text: "Anatomia e a arquitetura física do corpo humano.", weights: { 'Cirurgia Geral': 4, 'Ortopedia e Traumatologia': 5, 'Neurocirurgia': 5, 'Radiologia e Diagnóstico por Imagem': 3 } },
      { text: "Fisiologia e os complexos equilíbrios químicos e elétricos.", weights: { 'Clínica Médica': 5, 'Anestesiologia': 5, 'Cardiologia': 5, 'Nefrologia': 5 } },
      { text: "Imunologia e a biologia molecular da inflamação.", weights: { 'Alergologia e Imunologia': 5, 'Infectologia': 4, 'Dermatologia': 3, 'Pneumologia': 3 } },
      { text: "Neurociências e o mistério do comportamento humano.", weights: { 'Psiquiatria': 5, 'Neurologia': 5, 'Neurocirurgia': 3 } }
  ]},
  { id: 3, category: 'Technical', text: "Como você avalia seu interesse em manusear tecnologias e ferramentas?", options: [
      { text: "Quero robótica, lasers e instrumentos de microcirurgia.", weights: { 'Urologia': 5, 'Oftalmologia': 5, 'Neurocirurgia': 5, 'Cirurgia Plástica': 4 } },
      { text: "Prefiro ferramentas de imagem: ultrassom, tomografia e telas.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Cardiologia': 4, 'Gastroenterologia': 4 } },
      { text: "Minha ferramenta principal é o estetoscópio e a semiologia armada.", weights: { 'Clínica Médica': 5, 'Cardiologia': 5, 'Pediatria': 4, 'Pneumologia': 4 } },
      { text: "Minha ferramenta é a palavra e a análise do discurso do paciente.", weights: { 'Psiquiatria': 5, 'Medicina de Família e Comunidade': 5, 'Neurologia': 3 } }
  ]},
  { id: 4, category: 'Sensory', text: "Qual é sua tolerância a odores fortes, secreções e fluidos corporais?", options: [
      { text: "Indiferente. Vejo apenas biologia e patologia.", weights: { 'Gastroenterologia': 5, 'Urologia': 5, 'Infectologia': 4, 'Cirurgia Geral': 5 } },
      { text: "Lido bem em ambientes cirúrgicos, mas prefiro o 'limpo'.", weights: { 'Cirurgia Plástica': 5, 'Otorrinolaringologia': 4, 'Dermatologia': 3 } },
      { text: "Prefiro o ambiente asséptico do consultório ou sala de laudos.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Oftalmologia': 5, 'Dermatologia': 5, 'Psiquiatria': 5 } },
      { text: "Consigo lidar, mas o foco deve ser o alívio imediato do paciente.", weights: { 'Medicina Intensiva': 5, 'Anestesiologia': 4, 'Ginecologia e Obstetrícia': 4 } }
  ]},
  { id: 5, category: 'Lifestyle', text: "Como você visualiza seu equilíbrio entre vida pessoal e trabalho?", options: [
      { text: "Sucesso e prestígio, mesmo que custe noites de sono e feriados.", weights: { 'Neurocirurgia': 5, 'Cirurgia Plástica': 5, 'Cardiologia': 4, 'Cirurgia Vascular': 4 } },
      { text: "Rotina comercial estável, com horários fixos de consultório.", weights: { 'Dermatologia': 5, 'Endocrinologia e Metabologia': 5, 'Oftalmologia': 5, 'Medicina do Trabalho': 5 } },
      { text: "Plantões intensos intercalados com períodos longos de folga.", weights: { 'Anestesiologia': 5, 'Medicina Intensiva': 5, 'Radiologia e Diagnóstico por Imagem': 4 } },
      { text: "Imerso em uma comunidade, sendo referência para famílias.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 4, 'Clínica Médica': 3 } }
  ]},
  { id: 6, category: 'Psychological', text: "Qual destas gratificações profissionais mais te atrai?", options: [
      { text: "Resolver um problema mecânico ou agudo com as mãos.", weights: { 'Cirurgia Geral': 5, 'Ortopedia e Traumatologia': 5, 'Oftalmologia': 4, 'Urologia': 4 } },
      { text: "Desvendar um enigma diagnóstico que ninguém mais conseguiu.", weights: { 'Clínica Médica': 5, 'Infectologia': 5, 'Neurologia': 5, 'Endocrinologia e Metabologia': 4 } },
      { text: "Ver o impacto da prevenção e do cuidado na vida de uma criança.", weights: { 'Pediatria': 5, 'Medicina de Família e Comunidade': 4, 'Alergologia e Imunologia': 3 } },
      { text: "Controlar variáveis vitais críticas no limite entre a vida e a morte.", weights: { 'Medicina Intensiva': 5, 'Anestesiologia': 5, 'Neurocirurgia': 4 } }
  ]},
  { id: 7, category: 'Academic', text: "Se você tivesse que escrever um livro, qual seria o tema principal?", options: [
      { text: "Manual de Técnicas e Habilidades Manuais em Medicina.", weights: { 'Cirurgia Geral': 4, 'Ortopedia e Traumatologia': 5, 'Cirurgia Plástica': 5, 'Otorrinolaringologia': 4 } },
      { text: "Tratado de Fisiopatologia e Raciocínio Clínico Avançado.", weights: { 'Clínica Médica': 5, 'Infectologia': 4, 'Cardiologia': 4, 'Nefrologia': 4 } },
      { text: "Saúde Pública, Epidemiologia e Gestão de Sistemas de Saúde.", weights: { 'Medicina de Família e Comunidade': 5, 'Medicina do Trabalho': 5 } },
      { text: "Atlas de Diagnóstico por Imagem e Visualização Funcional.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Dermatologia': 4, 'Oftalmologia': 4 } }
  ]},
  { id: 8, category: 'Technical', text: "Qual destas tarefas você considera a mais tediante?", options: [
      { text: "Ouvir queixas subjetivas e histórias longas sem parar.", weights: { 'Cirurgia Geral': 4, 'Ortopedia e Traumatologia': 5, 'Anestesiologia': 5, 'Radiologia e Diagnóstico por Imagem': 5 } },
      { text: "Ficar horas em pé operando sob um microscópio.", weights: { 'Psiquiatria': 5, 'Clínica Médica': 5, 'Medicina de Família e Comunidade': 5, 'Pediatria': 4 } },
      { text: "Preencher formulários e burocracia governamental.", weights: { 'Neurocirurgia': 5, 'Cardiologia': 4, 'Medicina Intensiva': 4 } },
      { text: "Ter que fazer a mesma pergunta simples 50 vezes ao dia.", weights: { 'Psiquiatria': -2, 'Neurologia': -2, 'Genética': 3 } }
  ]},
  { id: 9, category: 'Lifestyle', text: "Como você lida com a ansiedade e pressão de familiares?", options: [
      { text: "Com paciência e técnicas de comunicação clara.", weights: { 'Pediatria': 5, 'Medicina de Família e Comunidade': 5, 'Psiquiatria': 4, 'Ginecologia e Obstetrícia': 4 } },
      { text: "Prefiro ser técnico e direto ao ponto sobre os riscos.", weights: { 'Cirurgia Geral': 5, 'Anestesiologia': 4, 'Neurocirurgia': 5, 'Urologia': 4 } },
      { text: "Uso dados e evidências para acalmar os ânimos.", weights: { 'Infectologia': 4, 'Oncologia': 5, 'Nefrologia': 4 } },
      { text: "Prefiro que a equipe de apoio faça essa mediação inicial.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Patologia': 5 } }
  ]},
  { id: 10, category: 'Sensory', text: "Você prefere o silêncio de uma sala de laudos ou o agito da UTI?", options: [
      { text: "Silêncio: preciso de concentração absoluta e foco visual.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Dermatologia': 4, 'Oftalmologia': 5, 'Alergologia e Imunologia': 3 } },
      { text: "Agito: o som de alarmes me mantém alerta e focado.", weights: { 'Medicina Intensiva': 5, 'Anestesiologia': 4, 'Cardiologia': 4, 'Ginecologia e Obstetrícia': 3 } },
      { text: "Equilíbrio: prefiro o dinamismo controlado de uma enfermaria.", weights: { 'Clínica Médica': 5, 'Infectologia': 5, 'Pediatria': 4, 'Gastroenterologia': 4 } },
      { text: "Ambiente Externo: gosto de sair do hospital e ir à comunidade.", weights: { 'Medicina de Família e Comunidade': 5, 'Medicina do Trabalho': 4 } }
  ]},
  { id: 11, category: 'Academic', text: "Qual destes dilemas te atrai mais?", options: [
      { text: "Como o pulmão gerencia a troca gasosa em condições extremas?", weights: { 'Pneumologia': 5, 'Medicina Intensiva': 5 } },
      { text: "Por que o sistema imune ataca o próprio corpo?", weights: { 'Alergologia e Imunologia': 5, 'Reumatologia': 5 } },
      { text: "Como o rim filtra toxinas sem perder eletrólitos vitais?", weights: { 'Nefrologia': 5, 'Medicina Intensiva': 3 } },
      { text: "Como o feto se desenvolve sem ser rejeitado pela mãe?", weights: { 'Ginecologia e Obstetrícia': 5, 'Pediatria': 3 } }
  ]},
  { id: 12, category: 'Psychological', text: "Como você lida com pacientes crônicos que nunca 'ficam bons'?", options: [
      { text: "Amo o vínculo de longo prazo e ser o gestor da saúde deles.", weights: { 'Medicina de Família e Comunidade': 5, 'Endocrinologia e Metabologia': 5, 'Nefrologia': 5, 'Pneumologia': 4 } },
      { text: "Frustrante. Prefiro doenças agudas que eu possa 'curar' de vez.", weights: { 'Infectologia': 5, 'Cirurgia Geral': 5, 'Anestesiologia': 4 } },
      { text: "Aceito se eu puder ver pequenas melhorias na qualidade de vida.", weights: { 'Neurologia': 4, 'Psiquiatria': 4, 'Reumatologia': 5, 'Alergologia e Imunologia': 5 } },
      { text: "Foco na fase diagnóstica; o tratamento de longo prazo é com outro.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Oftalmologia': 3 } }
  ]},
  { id: 13, category: 'Technical', text: "Você se considera mais visual ou auditivo?", options: [
      { text: "Totalmente visual: Meus olhos são minha principal ferramenta.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Dermatologia': 5, 'Oftalmologia': 5 } },
      { text: "Auditivo/Conversacional: Minha ferramenta é a escuta e a fala.", weights: { 'Psiquiatria': 5, 'Medicina de Família e Comunidade': 5, 'Neurologia': 4 } },
      { text: "Tátil/Motor: Minhas mãos precisam estar em movimento constante.", weights: { 'Cirurgia Geral': 5, 'Ortopedia e Traumatologia': 5, 'Urologia': 4, 'Cirurgia Plástica': 5 } },
      { text: "Analítico: Gosto da interpretação lógica de dados brutos.", weights: { 'Clínica Médica': 5, 'Endocrinologia e Metabologia': 4, 'Infectologia': 5, 'Alergologia e Imunologia': 5 } }
  ]},
  { id: 14, category: 'Lifestyle', text: "Qual sua relação com o estresse?", options: [
      { text: "Preciso de adrenalina para me sentir vivo no trabalho.", weights: { 'Medicina Intensiva': 5, 'Neurocirurgia': 5, 'Cirurgia Vascular': 4, 'Anestesiologia': 4 } },
      { text: "Prefiro rotinas previsíveis e ambiente calmo.", weights: { 'Endocrinologia e Metabologia': 5, 'Alergologia e Imunologia': 5, 'Medicina do Trabalho': 5, 'Dermatologia': 5 } },
      { text: "Estresse intelectual me agrada; estresse operacional não.", weights: { 'Neurologia': 5, 'Clínica Médica': 5, 'Psiquiatria': 4 } },
      { text: "Lido bem se for em equipe e com protocolos muito claros.", weights: { 'Medicina Intensiva': 5, 'Infectologia': 4, 'Cardiologia': 4 } }
  ]},
  { id: 15, category: 'Sensory', text: "Qual destes ambientes você escolheria para passar 40 anos?", options: [
      { text: "Uma UBS acolhedora com quintal e muito movimento social.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 4 } },
      { text: "Um centro cirúrgico tecnológico, frio e estéril.", weights: { 'Cirurgia Geral': 5, 'Urologia': 5, 'Anestesiologia': 5, 'Neurocirurgia': 5 } },
      { text: "Um consultório de luxo com poltronas confortáveis.", weights: { 'Psiquiatria': 5, 'Dermatologia': 5, 'Cirurgia Plástica': 4 } },
      { text: "Uma sala de laudos climatizada com telas 4K de alta definição.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Oftalmologia': 4 } }
  ]},
  { id: 16, category: 'Psychological', text: "Como você lida com a morte e o fim da vida?", options: [
      { text: "Luto até o último segundo com suporte avançado à vida.", weights: { 'Medicina Intensiva': 5, 'Cardiologia': 4, 'Cirurgia Vascular': 4 } },
      { text: "Acolho o luto e foco no conforto e na dignidade do paciente.", weights: { 'Cuidados Paliativos': 5, 'Geriatria': 5, 'Clínica Médica': 4 } },
      { text: "Prefiro áreas onde a morte é um evento raríssimo.", weights: { 'Oftalmologia': 5, 'Dermatologia': 5, 'Alergologia e Imunologia': 5, 'Medicina do Trabalho': 4 } },
      { text: "Vejo a morte como um processo biológico inevitável e estudo suas causas.", weights: { 'Patologia': 5, 'Infectologia': 3 } }
  ]},
  { id: 17, category: 'Academic', text: "Se você fosse ser monitor, qual disciplina escolheria?", options: [
      { text: "Anatomia e Técnica Cirúrgica.", weights: { 'Cirurgia Geral': 5, 'Ortopedia e Traumatologia': 5, 'Cirurgia Plástica': 4 } },
      { text: "Fisiologia e Farmacologia.", weights: { 'Anestesiologia': 5, 'Cardiologia': 5, 'Nefrologia': 5, 'Pneumologia': 4 } },
      { text: "Imunologia e Microbiologia.", weights: { 'Alergologia e Imunologia': 5, 'Infectologia': 5 } },
      { text: "Semiologia e Propedêutica Clínica.", weights: { 'Clínica Médica': 5, 'Neurologia': 5, 'Medicina de Família e Comunidade': 5, 'Pediatria': 4 } }
  ]},
  { id: 18, category: 'Technical', text: "Você prefere ter 100 pacientes rápidos ou 10 pacientes profundos no dia?", options: [
      { text: "100 Rápidos: Adoro o volume e a resolutividade imediata.", weights: { 'Oftalmologia': 5, 'Dermatologia': 5, 'Medicina do Trabalho': 4, 'Radiologia e Diagnóstico por Imagem': 4 } },
      { text: "10 Profundos: Quero entender a biografia e o contexto total.", weights: { 'Psiquiatria': 5, 'Medicina de Família e Comunidade': 5, 'Clínica Médica': 4 } },
      { text: "Intermediário: Foco na patologia e no tratamento específico.", weights: { 'Endocrinologia e Metabologia': 5, 'Nefrologia': 5, 'Neurologia': 5, 'Gastroenterologia': 5 } },
      { text: "Zero pacientes: Prefiro lidar com exames, lâminas ou dados.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Patologia': 5 } }
  ]},
  { id: 19, category: 'Lifestyle', text: "Qual é sua ambição financeira predominante?", options: [
      { text: "Ficar rico rápido com procedimentos estéticos/particulares.", weights: { 'Cirurgia Plástica': 5, 'Dermatologia': 5, 'Oftalmologia': 5, 'Otorrinolaringologia': 4 } },
      { text: "Ter estabilidade, propósito e ser o pilar da minha cidade.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 4, 'Infectologia': 4 } },
      { text: "Ganhar muito por hora em plantões de alta complexidade.", weights: { 'Anestesiologia': 5, 'Medicina Intensiva': 5, 'Radiologia e Diagnóstico por Imagem': 4 } },
      { text: "Ser o especialista 'referência nacional' em um nicho acadêmico raro.", weights: { 'Neurologia': 5, 'Alergologia e Imunologia': 5, 'Genética': 5 } }
  ]},
  { id: 20, category: 'Psychological', text: "Você prefere operar um paciente por 30 anos ou por 30 minutos?", options: [
      { text: "30 minutos: Resolvo o problema e sigo para o próximo desafio.", weights: { 'Cirurgia Geral': 5, 'Anestesiologia': 5, 'Ortopedia e Traumatologia': 5, 'Urologia': 4 } },
      { text: "30 anos: Quero envelhecer e ver os filhos dos meus pacientes crescerem.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 5, 'Geriatria': 5, 'Endocrinologia e Metabologia': 4 } },
      { text: "Acompanhamento por fases: Lidar com a doença até a remissão ou controle.", weights: { 'Infectologia': 4, 'Oncologia': 5, 'Psiquiatria': 4 } },
      { text: "Não quero ver o paciente, apenas o resultado técnico da sua biologia.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Patologia': 5 } }
  ]},
  { id: 21, category: 'Technical', text: "Como você lida com o erro médico (seu ou de outros)?", options: [
      { text: "Sou perfeccionista extremo; o erro manual me causa angústia física.", weights: { 'Neurocirurgia': 5, 'Cirurgia Plástica': 5, 'Oftalmologia': 5, 'Cirurgia Vascular': 5 } },
      { text: "Foco na gestão de danos e na segurança do paciente em tempo real.", weights: { 'Anestesiologia': 5, 'Medicina Intensiva': 5, 'Emergência': 5 } },
      { text: "Analiso as falhas sistêmicas e protocolos para evitar repetições.", weights: { 'Medicina do Trabalho': 5, 'Infectologia': 4 } },
      { text: "Lido com a culpa e o impacto emocional no paciente e na família.", weights: { 'Psiquiatria': 5, 'Cuidados Paliativos': 5, 'Medicina de Família e Comunidade': 4 } }
  ]},
  { id: 22, category: 'Academic', text: "Qual destas especialidades 'irmãs' você mais respeita intelectualmente?", options: [
      { text: "Neurologia: Pelo diagnóstico puramente clínico e lógico.", weights: { 'Neurologia': 5, 'Neurocirurgia': 3, 'Psiquiatria': 3 } },
      { text: "Alergologia e Imunologia: Pelo domínio molecular e celular.", weights: { 'Alergologia e Imunologia': 5, 'Reumatologia': 4, 'Infectologia': 3 } },
      { text: "Infectologia: Pela visão global e epidemiológica.", weights: { 'Infectologia': 5, 'Medicina Intensiva': 3 } },
      { text: "Anestesiologia: Pelo controle absoluto da fisiologia aguda.", weights: { 'Anestesiologia': 5, 'Cardiologia': 3, 'Medicina Intensiva': 4 } }
  ]},
  { id: 23, category: 'Sensory', text: "Você prefere ter as mãos ocupadas ou a mente acelerada?", options: [
      { text: "Mãos ocupadas: Preciso de atividades motoras finas.", weights: { 'Cirurgia Plástica': 5, 'Oftalmologia': 5, 'Neurocirurgia': 5, 'Otorrinolaringologia': 5 } },
      { text: "Mente acelerada: Prefiro o processamento de informações complexas.", weights: { 'Clínica Médica': 5, 'Neurologia': 5, 'Radiologia e Diagnóstico por Imagem': 5, 'Infectologia': 4 } },
      { text: "Equilíbrio: Gosto de raciocinar e agir fisicamente em seguida.", weights: { 'Ortopedia e Traumatologia': 5, 'Gastroenterologia': 5, 'Urologia': 5, 'Ginecologia e Obstetrícia': 4 } },
      { text: "Observação: Prefiro observar e analisar comportamentos.", weights: { 'Psiquiatria': 5, 'Medicina do Trabalho': 4 } }
  ]},
  { id: 24, category: 'Lifestyle', text: "Qual é seu nível de paciência para 'queixas bobas' (sem gravidade)?", options: [
      { text: "Baixo: Se não for grave ou cirúrgico, me sinto perdendo tempo.", weights: { 'Cirurgia Geral': 4, 'Neurocirurgia': 5, 'Anestesiologia': 4, 'Medicina Intensiva': 5 } },
      { text: "Alto: Entendo que toda queixa esconde uma necessidade humana.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 5, 'Psiquiatria': 5, 'Cuidados Paliativos': 4 } },
      { text: "Moderado: Lido bem se houver um desafio diagnóstico interessante.", weights: { 'Neurologia': 5, 'Endocrinologia e Metabologia': 4, 'Clínica Médica': 4 } },
      { text: "Tecnicista: Analiso o sintoma objetivamente, independente da gravidade.", weights: { 'Dermatologia': 5, 'Oftalmologia': 5, 'Alergologia e Imunologia': 5 } }
  ]},
  { id: 25, category: 'Academic', text: "Qual destes nomes da medicina você mais admira?", options: [
      { text: "William Osler (O pai da clínica moderna).", weights: { 'Clínica Médica': 5, 'Infectologia': 3 } },
      { text: "Sigmund Freud (O explorador da mente).", weights: { 'Psiquiatria': 5, 'Neurologia': 3 } },
      { text: "Joseph Lister (O pioneiro da antissepsia cirúrgica).", weights: { 'Cirurgia Geral': 5, 'Infectologia': 3 } },
      { text: "Jean-Martin Charcot (O pai da neurologia moderna).", weights: { 'Neurologia': 5, 'Psiquiatria': 4 } }
  ]},
  { id: 26, category: 'Technical', text: "Qual sua relação com os 'grandes volumes' (sangue, trauma, ossos expostos)?", options: [
      { text: "Mantenho o foco absoluto; o impacto visual não me afeta.", weights: { 'Ortopedia e Traumatologia': 5, 'Cirurgia Geral': 5, 'Emergência': 5, 'Neurocirurgia': 4 } },
      { text: "Prefiro evitar; meu interesse é na microcirurgia ou clínica.", weights: { 'Oftalmologia': 5, 'Endocrinologia e Metabologia': 4, 'Psiquiatria': 5, 'Dermatologia': 5 } },
      { text: "Lido bem se estiver focado em salvar a vida do paciente.", weights: { 'Medicina Intensiva': 5, 'Anestesiologia': 5, 'Cirurgia Vascular': 5 } },
      { text: "Prefiro que o contato seja mediado por exames laboratoriais.", weights: { 'Patologia': 5, 'Alergologia e Imunologia': 4 } }
  ]},
  { id: 27, category: 'Lifestyle', text: "Você prefere ter 1 paciente VIP por mês ou 50 pacientes SUS por dia?", options: [
      { text: "VIP: Foco no detalhe, na sofisticação e no resultado estético.", weights: { 'Cirurgia Plástica': 5, 'Dermatologia': 5, 'Oftalmologia': 4 } },
      { text: "50 SUS: Adoro a resolutividade pública e o impacto social.", weights: { 'Medicina de Família e Comunidade': 5, 'Infectologia': 4, 'Pediatria': 4, 'Ginecologia e Obstetrícia': 4 } },
      { text: "Intermediário: Gosto de consultório estável de classe média.", weights: { 'Cardiologia': 5, 'Gastroenterologia': 5, 'Urologia': 5, 'Endocrinologia e Metabologia': 5 } },
      { text: "Institucional: Prefiro trabalhar para grandes hospitais ou empresas.", weights: { 'Anestesiologia': 5, 'Medicina Intensiva': 5, 'Medicina do Trabalho': 5 } }
  ]},
  { id: 28, category: 'Psychological', text: "Qual sua tolerância à 'incerteza' diagnóstica?", options: [
      { text: "Baixa: Preciso de exames de imagem e provas cabais.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Patologia': 5, 'Ortopedia e Traumatologia': 4 } },
      { text: "Alta: Consigo lidar com diagnósticos sindrômicos e subjetivos.", weights: { 'Psiquiatria': 5, 'Geriatria': 5, 'Clínica Médica': 4, 'Neurologia': 4 } },
      { text: "Moderada: Investigo até o fim com todas as ferramentas disponíveis.", weights: { 'Infectologia': 5, 'Alergologia e Imunologia': 5, 'Endocrinologia e Metabologia': 5 } },
      { text: "Pragmática: Trato o sintoma mais grave primeiro.", weights: { 'Medicina Intensiva': 5, 'Anestesiologia': 5, 'Emergência': 5 } }
  ]},
  { id: 29, category: 'Technical', text: "Você prefere resolver a causa ou gerenciar o sintoma?", options: [
      { text: "Causa: Quero erradicar o micro-organismo ou retirar o tumor.", weights: { 'Infectologia': 5, 'Cirurgia Geral': 5, 'Urologia': 4, 'Neurocirurgia': 4 } },
      { text: "Sintoma: O alívio do sofrimento é minha principal missão.", weights: { 'Cuidados Paliativos': 5, 'Anestesiologia': 5, 'Psiquiatria': 4, 'Medicina Intensiva': 4 } },
      { text: "Equilíbrio: Quero ajustar o sistema para que ele volte ao normal.", weights: { 'Endocrinologia e Metabologia': 5, 'Nefrologia': 5, 'Cardiologia': 5, 'Pneumologia': 5 } },
      { text: "Prevenção: Quero evitar que a doença sequer apareça.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 5, 'Medicina do Trabalho': 5 } }
  ]},
  { id: 30, category: 'Lifestyle', text: "Você se vê usando jaleco de seda no consultório ou pijama cirúrgico no bloco?", options: [
      { text: "Pijama Cirúrgico: Adoro o ambiente dinâmico do bloco.", weights: { 'Cirurgia Geral': 5, 'Anestesiologia': 5, 'Neurocirurgia': 5, 'Ortopedia e Traumatologia': 5 } },
      { text: "Jaleco de Seda: Gosto da elegância e do formalismo do consultório.", weights: { 'Dermatologia': 5, 'Psiquiatria': 5, 'Endocrinologia e Metabologia': 5, 'Alergologia e Imunologia': 5 } },
      { text: "Roupa Casual: Prefiro a informalidade e proximidade com o paciente.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 5, 'Infectologia': 4 } },
      { text: "Equipamento Tecnológico: Óculos de proteção, telas e fones.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Oftalmologia': 4, 'Urologia': 4 } }
  ]}
];

export const CareerQuiz: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<Record<string, number>[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (weights: Partial<Record<Specialty, number>>) => {
    setHistory(prev => [...prev, { ...scores }]);
    
    const newScores = { ...scores };
    (Object.keys(weights) as string[]).forEach(k => {
      newScores[k] = (newScores[k] || 0) + (weights[k as Specialty] || 0);
    });
    setScores(newScores);

    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setScores(history[history.length - 1]);
      setHistory(prev => prev.slice(0, -1));
      setCurrentIdx(prev => prev - 1);
    }
  };

  const reset = () => {
    setScores({});
    setHistory([]);
    setCurrentIdx(0);
    setShowResult(false);
  };

  if (showResult) {
    const sorted = (Object.entries(scores) as [string, number][])
      .sort((a, b) => b[1] - a[1]);

    const top = sorted[0] || ['Clínica Médica', 0];
    const data = specialtyDetails[top[0]] || specialtyDetails['Clínica Médica'];

    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8 pb-20 animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-[#003366] p-10 text-center text-white relative overflow-hidden">
            <div className="absolute right-8 top-4 opacity-10 scale-[2.0]">{data.icon}</div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-[#D4A017]">Laudo Vocacional Oficial • FMS</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">{top[0]}</h2>
          </div>

          <div className="p-6 md:p-10 space-y-8">
            
            {/* NOVO LAYOUT DO LAUDO PROFUNDO */}
            <div className="space-y-6">
              
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h3 className="flex items-center gap-3 text-sm font-black uppercase text-[#003366] mb-4"><UserCheck size={20} className="text-[#D4A017]"/> Perfil Analítico</h3>
                <p className="text-sm text-gray-700 leading-relaxed font-medium text-justify">{data.profile}</p>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                <h3 className="flex items-center gap-3 text-sm font-black uppercase text-blue-900 mb-4"><Target size={20} className="text-[#D4A017]"/> Aconselhamento do Mentor</h3>
                <p className="text-sm text-blue-800 leading-relaxed font-medium text-justify">{data.advice}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-start">
                  <h3 className="flex items-center gap-2 text-[11px] font-black uppercase text-slate-500 mb-5 tracking-widest"><GraduationCap size={18} className="text-[#D4A017]"/> Foco no Currículo FMS</h3>
                  <div className="flex flex-col gap-2.5">
                    {(data.subjects || []).map((s: string) => (
                      <div key={s} className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-[#003366] shadow-sm flex items-center gap-2">
                        <ArrowRight size={14} className="text-[#D4A017]"/> {s}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-start">
                  <h3 className="flex items-center gap-2 text-[11px] font-black uppercase text-slate-500 mb-5 tracking-widest"><BookOpen size={18} className="text-[#003366]"/> Arsenal Literário</h3>
                  <div className="space-y-3">
                    {(data.book.split(' | ') || []).map((b: string) => (
                      <div key={b} className="flex items-start gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm">
                        <BookOpen size={14} className="mt-0.5 text-[#D4A017] shrink-0"/>
                        <p className="text-xs font-bold text-slate-700 leading-snug">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* PÓDIO */}
            <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
              <h3 className="text-center text-[10px] font-black uppercase text-[#003366] tracking-[0.3em] mb-8">Outras Compatibilidades Altas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                {sorted.slice(1, 7).map(([spec, score], idx) => (
                  <div key={spec}>
                    <div className="flex justify-between text-[10px] font-black mb-1.5 uppercase text-gray-500">
                      <span>{idx+2}º {spec}</span>
                      <span className="text-[#003366]">{score} pts</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#003366]/30 h-full transition-all duration-1000" style={{width: `${Math.max(10, (score/(top[1] as number))*100)}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AÇÕES */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-gray-100">
              <button onClick={() => window.print()} className="bg-white border-2 border-gray-100 text-[#003366] px-10 py-4 rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
                🖨️ Imprimir Laudo
              </button>
              <button onClick={reset} className="bg-[#003366] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-[#D4A017] transition-all shadow-md">
                <RefreshCw size={16}/> Refazer Teste
              </button>
              <button onClick={onBack} className="bg-white border-2 border-[#003366] text-[#003366] px-10 py-4 rounded-2xl font-black uppercase text-[10px] hover:bg-gray-50 transition-all">
                Voltar ao Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = quizQuestions[currentIdx];

  // CONTAINER SLIM PARA AS PERGUNTAS
  return (
    <div className="max-w-2xl mx-auto p-4 md:py-10 animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-[#003366] uppercase tracking-tighter italic">Entrevista Vocacional</h2>
        <div className="mt-4 flex justify-center gap-1.5 px-2">
          {quizQuestions.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= currentIdx ? 'bg-[#D4A017]' : 'bg-gray-200'}`}></div>
          ))}
        </div>
        <p className="mt-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Passo {currentIdx + 1} de {quizQuestions.length}</p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl border border-gray-50 relative overflow-hidden">
        <div className="flex justify-between items-center mb-5">
           <p className="text-[9px] font-black uppercase text-[#D4A017] tracking-[0.2em]">
             {q.category === 'Lifestyle' ? 'Estilo de Vida' : 
              q.category === 'Academic' ? 'Afinidade Acadêmica' : 
              q.category === 'Psychological' ? 'Perfil Psicológico' : 
              q.category === 'Technical' ? 'Habilidade Técnica' : 'Percepção Sensorial'}
           </p>
           <span className="bg-[#003366]/5 px-3 py-1 rounded-full text-[9px] font-black text-[#003366]">{currentIdx + 1}/30</span>
        </div>
        
        <h3 className="text-lg md:text-xl font-black text-[#003366] mb-8 leading-tight">{q.text}</h3>
        
        <div className="grid gap-2.5">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt.weights)}
              className="w-full text-left p-3.5 md:p-4 rounded-xl border-2 border-gray-50 hover:border-[#003366] hover:bg-blue-50/30 transition-all group flex items-center justify-between shadow-sm"
            >
              <span className="text-[13px] md:text-sm font-bold text-gray-600 group-hover:text-[#003366] leading-snug pr-4">{opt.text}</span>
              <div className="w-6 h-6 bg-gray-50 rounded-md flex items-center justify-center group-hover:bg-[#003366] group-hover:text-white transition-all shrink-0">
                <ArrowRight size={14} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between max-w-xs mx-auto">
        <button 
          onClick={handleBack}
          disabled={currentIdx === 0}
          className={`flex items-center gap-2 font-black text-[10px] uppercase transition-colors ${currentIdx === 0 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-[#003366]'}`}
        >
          <ArrowLeft size={12}/> Voltar
        </button>
        <button 
          onClick={onBack} 
          className="text-[10px] font-black text-red-300 uppercase hover:text-red-500 transition-colors"
        >
          Abandonar
        </button>
      </div>
    </div>
  );
};

export default CareerQuiz;