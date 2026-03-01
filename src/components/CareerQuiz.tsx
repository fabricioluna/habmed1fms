import React, { useState } from 'react';
import { 
  ArrowRight, RefreshCw, ArrowLeft, Brain, Activity, Slice, Syringe, Home, 
  Zap, Users, FlaskConical, UserCheck, Target, Waves, 
  Stethoscope, Heart, Baby, Eye, Shield, HardHat, Scissors, Search,
  Wind, Ear, Scale, Microscope as MicroscopeIcon
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

const quizQuestions: Question[] = [
  {
    id: 1,
    category: 'Psychological',
    text: "O monitor apita, a pressão cai bruscamente e a equipe olha para você. Qual sua reação imediata?",
    options: [
      { text: "Adrenalina e foco total. O caos me energiza para agir.", weights: { 'Anestesiologia': 5, 'Medicina Intensiva': 5, 'Emergência': 5, 'Neurocirurgia': 4 } },
      { text: "Mantenho a calma e analiso os dados antes de qualquer intervenção.", weights: { 'Clínica Médica': 5, 'Nefrologia': 4, 'Neurologia': 5, 'Infectologia': 4 } },
      { text: "Priorizo o acolhimento do paciente e a organização da equipe.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 4, 'Psiquiatria': 3 } },
      { text: "Foco no procedimento técnico específico para estancar o problema.", weights: { 'Cirurgia Vascular': 5, 'Cardiologia': 4, 'Urologia': 3 } }
    ]
  },
  {
    id: 2,
    category: 'Academic',
    text: "Qual área do ciclo básico desperta sua maior curiosidade intelectual?",
    options: [
      { text: "Anatomia e a arquitetura física do corpo humano.", weights: { 'Cirurgia Geral': 4, 'Ortopedia e Traumatologia': 5, 'Neurocirurgia': 5, 'Radiologia e Diagnóstico por Imagem': 3 } },
      { text: "Fisiologia e os complexos equilíbrios químicos e elétricos.", weights: { 'Clínica Médica': 5, 'Anestesiologia': 5, 'Cardiologia': 5, 'Nefrologia': 5 } },
      { text: "Imunologia e a biologia molecular da inflamação.", weights: { 'Alergologia e Imunologia': 5, 'Infectologia': 4, 'Dermatologia': 3, 'Pneumologia': 3 } },
      { text: "Neurociências e o mistério do comportamento humano.", weights: { 'Psiquiatria': 5, 'Neurologia': 5, 'Neurocirurgia': 3 } }
    ]
  },
  {
    id: 3,
    category: 'Technical',
    text: "Como você avalia seu interesse em manusear tecnologias e ferramentas?",
    options: [
      { text: "Quero robótica, lasers e instrumentos de microcirurgia.", weights: { 'Urologia': 5, 'Oftalmologia': 5, 'Neurocirurgia': 5, 'Cirurgia Plástica': 4 } },
      { text: "Prefiro ferramentas de imagem: ultrassom, tomografia e telas.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Cardiologia': 4, 'Gastroenterologia': 4 } },
      { text: "Minha ferramenta principal é o estetoscópio e a semiologia armada.", weights: { 'Clínica Médica': 5, 'Cardiologia': 5, 'Pediatria': 4, 'Pneumologia': 4 } },
      { text: "Minha ferramenta é a palavra e a análise do discurso do paciente.", weights: { 'Psiquiatria': 5, 'Medicina de Família e Comunidade': 5, 'Neurologia': 3 } }
    ]
  },
  {
    id: 4,
    category: 'Sensory',
    text: "Qual é sua tolerância a odores fortes, secreções e fluidos corporais?",
    options: [
      { text: "Indiferente. Vejo apenas biologia e patologia.", weights: { 'Gastroenterologia': 5, 'Urologia': 5, 'Infectologia': 4, 'Cirurgia Geral': 5 } },
      { text: "Lido bem em ambientes cirúrgicos, mas prefiro o 'limpo'.", weights: { 'Cirurgia Plástica': 5, 'Otorrinolaringologia': 4, 'Dermatologia': 3 } },
      { text: "Prefiro o ambiente asséptico do consultório ou sala de laudos.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Oftalmologia': 5, 'Dermatologia': 5, 'Psiquiatria': 5 } },
      { text: "Consigo lidar, mas o foco deve ser o alívio imediato do paciente.", weights: { 'Medicina Intensiva': 5, 'Anestesiologia': 4, 'Ginecologia e Obstetrícia': 4 } }
    ]
  },
  {
    id: 5,
    category: 'Lifestyle',
    text: "Como você visualiza seu equilíbrio entre vida pessoal e trabalho?",
    options: [
      { text: "Sucesso e prestígio, mesmo que custe noites de sono e feriados.", weights: { 'Neurocirurgia': 5, 'Cirurgia Plástica': 5, 'Cardiologia': 4, 'Cirurgia Vascular': 4 } },
      { text: "Rotina comercial estável, com horários fixos de consultório.", weights: { 'Dermatologia': 5, 'Endocrinologia e Metabologia': 5, 'Oftalmologia': 5, 'Medicina do Trabalho': 5 } },
      { text: "Plantões intensos intercalados com períodos longos de folga.", weights: { 'Anestesiologia': 5, 'Medicina Intensiva': 5, 'Radiologia e Diagnóstico por Imagem': 4 } },
      { text: "Imerso em uma comunidade, sendo referência para famílias.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 4, 'Clínica Médica': 3 } }
    ]
  },
  {
    id: 6,
    category: 'Psychological',
    text: "Qual destas gratificações profissionais mais te atrai?",
    options: [
      { text: "Resolver um problema mecânico ou agudo com as mãos.", weights: { 'Cirurgia Geral': 5, 'Ortopedia e Traumatologia': 5, 'Oftalmologia': 4, 'Urologia': 4 } },
      { text: "Desvendar um enigma diagnóstico que ninguém mais conseguiu.", weights: { 'Clínica Médica': 5, 'Infectologia': 5, 'Neurologia': 5, 'Endocrinologia e Metabologia': 4 } },
      { text: "Ver o impacto da prevenção e do cuidado na vida de uma criança.", weights: { 'Pediatria': 5, 'Medicina de Família e Comunidade': 4, 'Alergologia e Imunologia': 3 } },
      { text: "Controlar variáveis vitais críticas no limite entre a vida e a morte.", weights: { 'Medicina Intensiva': 5, 'Anestesiologia': 5, 'Neurocirurgia': 4 } }
    ]
  },
  {
    id: 7,
    category: 'Academic',
    text: "Se você tivesse que escrever um livro, qual seria o tema principal?",
    options: [
      { text: "Manual de Técnicas e Habilidades Manuais em Medicina.", weights: { 'Cirurgia Geral': 4, 'Ortopedia e Traumatologia': 5, 'Cirurgia Plástica': 5, 'Otorrinolaringologia': 4 } },
      { text: "Tratado de Fisiopatologia e Raciocínio Clínico Avançado.", weights: { 'Clínica Médica': 5, 'Infectologia': 4, 'Cardiologia': 4, 'Nefrologia': 4 } },
      { text: "Saúde Pública, Epidemiologia e Gestão de Sistemas de Saúde.", weights: { 'Medicina de Família e Comunidade': 5, 'Medicina do Trabalho': 5 } },
      { text: "Atlas de Diagnóstico por Imagem e Visualização Funcional.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Dermatologia': 4, 'Oftalmologia': 4 } }
    ]
  },
  {
    id: 8,
    category: 'Technical',
    text: "Qual destas tarefas você considera a mais tediante?",
    options: [
      { text: "Ouvir queixas subjetivas e histórias longas sem parar.", weights: { 'Cirurgia Geral': 4, 'Ortopedia e Traumatologia': 5, 'Anestesiologia': 5, 'Radiologia e Diagnóstico por Imagem': 5 } },
      { text: "Ficar horas em pé operando sob um microscópio.", weights: { 'Psiquiatria': 5, 'Clínica Médica': 5, 'Medicina de Família e Comunidade': 5, 'Pediatria': 4 } },
      { text: "Preencher formulários e burocracia governamental.", weights: { 'Neurocirurgia': 5, 'Cardiologia': 4, 'Medicina Intensiva': 4 } },
      { text: "Ter que fazer a mesma pergunta simples 50 vezes ao dia.", weights: { 'Psiquiatria': -2, 'Neurologia': -2, 'Genética': 3 } }
    ]
  },
  {
    id: 9,
    category: 'Lifestyle',
    text: "Como você lida com a ansiedade e pressão de familiares?",
    options: [
      { text: "Com paciência e técnicas de comunicação clara.", weights: { 'Pediatria': 5, 'Medicina de Família e Comunidade': 5, 'Psiquiatria': 4, 'Ginecologia e Obstetrícia': 4 } },
      { text: "Prefiro ser técnico e direto ao ponto sobre os riscos.", weights: { 'Cirurgia Geral': 5, 'Anestesiologia': 4, 'Neurocirurgia': 5, 'Urologia': 4 } },
      { text: "Uso dados e evidências para acalmar os ânimos.", weights: { 'Infectologia': 4, 'Oncologia': 5, 'Nefrologia': 4 } },
      { text: "Prefiro que a equipe de apoio faça essa mediação inicial.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Patologia': 5 } }
    ]
  },
  {
    id: 10,
    category: 'Sensory',
    text: "Você prefere o silêncio de uma sala de laudos ou o agito da UTI?",
    options: [
      { text: "Silêncio: preciso de concentração absoluta e foco visual.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Dermatologia': 4, 'Oftalmologia': 5, 'Alergologia e Imunologia': 3 } },
      { text: "Agito: o som de alarmes me mantém alerta e focado.", weights: { 'Medicina Intensiva': 5, 'Anestesiologia': 4, 'Cardiologia': 4, 'Ginecologia e Obstetrícia': 3 } },
      { text: "Equilíbrio: prefiro o dinamismo controlado de uma enfermaria.", weights: { 'Clínica Médica': 5, 'Infectologia': 5, 'Pediatria': 4, 'Gastroenterologia': 4 } },
      { text: "Ambiente Externo: gosto de sair do hospital e ir à comunidade.", weights: { 'Medicina de Família e Comunidade': 5, 'Medicina do Trabalho': 4 } }
    ]
  },
  {
    id: 11,
    category: 'Academic',
    text: "Qual destes dilemas te atrai mais?",
    options: [
      { text: "Como o pulmão gerencia a troca gasosa em condições extremas?", weights: { 'Pneumologia': 5, 'Medicina Intensiva': 5 } },
      { text: "Por que o sistema imune ataca o próprio corpo?", weights: { 'Alergologia e Imunologia': 5, 'Reumatologia': 5 } },
      { text: "Como o rim filtra toxinas sem perder eletrólitos vitais?", weights: { 'Nefrologia': 5, 'Medicina Intensiva': 3 } },
      { text: "Como o feto se desenvolve sem ser rejeitado pela mãe?", weights: { 'Ginecologia e Obstetrícia': 5, 'Pediatria': 3 } }
    ]
  },
  {
    id: 12,
    category: 'Psychological',
    text: "Como você lida com pacientes crônicos que nunca 'ficam bons'?",
    options: [
      { text: "Amo o vínculo de longo prazo e ser o gestor da saúde deles.", weights: { 'Medicina de Família e Comunidade': 5, 'Endocrinologia e Metabologia': 5, 'Nefrologia': 5, 'Pneumologia': 4 } },
      { text: "Frustrante. Prefiro doenças agudas que eu possa 'curar' de vez.", weights: { 'Infectologia': 5, 'Cirurgia Geral': 5, 'Anestesiologia': 4 } },
      { text: "Aceito se eu puder ver pequenas melhorias na qualidade de vida.", weights: { 'Neurologia': 4, 'Psiquiatria': 4, 'Reumatologia': 5, 'Alergologia e Imunologia': 5 } },
      { text: "Foco na fase diagnóstica; o tratamento de longo prazo é com outro.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Oftalmologia': 3 } }
    ]
  },
  {
    id: 13,
    category: 'Technical',
    text: "Você se considera mais visual ou auditivo?",
    options: [
      { text: "Totalmente visual: Meus olhos são minha principal ferramenta.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Dermatologia': 5, 'Oftalmologia': 5 } },
      { text: "Auditivo/Conversacional: Minha ferramenta é a escuta e a fala.", weights: { 'Psiquiatria': 5, 'Medicina de Família e Comunidade': 5, 'Neurologia': 4 } },
      { text: "Tátil/Motor: Minhas mãos precisam estar em movimento constante.", weights: { 'Cirurgia Geral': 5, 'Ortopedia e Traumatologia': 5, 'Urologia': 4, 'Cirurgia Plástica': 5 } },
      { text: "Analítico: Gosto da interpretação lógica de dados brutos.", weights: { 'Clínica Médica': 5, 'Endocrinologia e Metabologia': 4, 'Infectologia': 5, 'Alergologia e Imunologia': 5 } }
    ]
  },
  {
    id: 14,
    category: 'Lifestyle',
    text: "Qual sua relação com o estresse?",
    options: [
      { text: "Preciso de adrenalina para me sentir vivo no trabalho.", weights: { 'Medicina Intensiva': 5, 'Neurocirurgia': 5, 'Cirurgia Vascular': 4, 'Anestesiologia': 4 } },
      { text: "Prefiro rotinas previsíveis e ambiente calmo.", weights: { 'Endocrinologia e Metabologia': 5, 'Alergologia e Imunologia': 5, 'Medicina do Trabalho': 5, 'Dermatologia': 5 } },
      { text: "Estresse intelectual me agrada; estresse operacional não.", weights: { 'Neurologia': 5, 'Clínica Médica': 5, 'Psiquiatria': 4 } },
      { text: "Lido bem se for em equipe e com protocolos muito claros.", weights: { 'Medicina Intensiva': 5, 'Infectologia': 4, 'Cardiologia': 4 } }
    ]
  },
  {
    id: 15,
    category: 'Sensory',
    text: "Qual destes ambientes você escolheria para passar 40 anos?",
    options: [
      { text: "Uma UBS acolhedora com quintal e muito movimento social.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 4 } },
      { text: "Um centro cirúrgico tecnológico, frio e estéril.", weights: { 'Cirurgia Geral': 5, 'Urologia': 5, 'Anestesiologia': 5, 'Neurocirurgia': 5 } },
      { text: "Um consultório de luxo com poltronas confortáveis.", weights: { 'Psiquiatria': 5, 'Dermatologia': 5, 'Cirurgia Plástica': 4 } },
      { text: "Uma sala de laudos climatizada com telas 4K de alta definição.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Oftalmologia': 4 } }
    ]
  },
  {
    id: 16,
    category: 'Psychological',
    text: "Como você lida com a morte e o fim da vida?",
    options: [
      { text: "Luto até o último segundo com suporte avançado à vida.", weights: { 'Medicina Intensiva': 5, 'Cardiologia': 4, 'Cirurgia Vascular': 4 } },
      { text: "Acolho o luto e foco no conforto e na dignidade do paciente.", weights: { 'Cuidados Paliativos': 5, 'Geriatria': 5, 'Clínica Médica': 4 } },
      { text: "Prefiro áreas onde a morte é um evento raríssimo.", weights: { 'Oftalmologia': 5, 'Dermatologia': 5, 'Alergologia e Imunologia': 5, 'Medicina do Trabalho': 4 } },
      { text: "Vejo a morte como um processo biológico inevitável e estudo suas causas.", weights: { 'Patologia': 5, 'Infectologia': 3 } }
    ]
  },
  {
    id: 17,
    category: 'Academic',
    text: "Se você fosse ser monitor, qual disciplina escolheria?",
    options: [
      { text: "Anatomia e Técnica Cirúrgica.", weights: { 'Cirurgia Geral': 5, 'Ortopedia e Traumatologia': 5, 'Cirurgia Plástica': 4 } },
      { text: "Fisiologia e Farmacologia.", weights: { 'Anestesiologia': 5, 'Cardiologia': 5, 'Nefrologia': 5, 'Pneumologia': 4 } },
      { text: "Imunologia e Microbiologia.", weights: { 'Alergologia e Imunologia': 5, 'Infectologia': 5 } },
      { text: "Semiologia e Propedêutica Clínica.", weights: { 'Clínica Médica': 5, 'Neurologia': 5, 'Medicina de Família e Comunidade': 5, 'Pediatria': 4 } }
    ]
  },
  {
    id: 18,
    category: 'Technical',
    text: "Você prefere ter 100 pacientes rápidos ou 10 pacientes profundos no dia?",
    options: [
      { text: "100 Rápidos: Adoro o volume e a resolutividade imediata.", weights: { 'Oftalmologia': 5, 'Dermatologia': 5, 'Medicina do Trabalho': 4, 'Radiologia e Diagnóstico por Imagem': 4 } },
      { text: "10 Profundos: Quero entender a biografia e o contexto total.", weights: { 'Psiquiatria': 5, 'Medicina de Família e Comunidade': 5, 'Clínica Médica': 4 } },
      { text: "Intermediário: Foco na patologia e no tratamento específico.", weights: { 'Endocrinologia e Metabologia': 5, 'Nefrologia': 5, 'Neurologia': 5, 'Gastroenterologia': 5 } },
      { text: "Zero pacientes: Prefiro lidar com exames, lâminas ou dados.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Patologia': 5 } }
    ]
  },
  {
    id: 19,
    category: 'Lifestyle',
    text: "Qual é sua ambição financeira predominante?",
    options: [
      { text: "Ficar rico rápido com procedimentos estéticos/particulares.", weights: { 'Cirurgia Plástica': 5, 'Dermatologia': 5, 'Oftalmologia': 5, 'Otorrinolaringologia': 4 } },
      { text: "Ter estabilidade, propósito e ser o pilar da minha cidade.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 4, 'Infectologia': 4 } },
      { text: "Ganhar muito por hora em plantões de alta complexidade.", weights: { 'Anestesiologia': 5, 'Medicina Intensiva': 5, 'Radiologia e Diagnóstico por Imagem': 4 } },
      { text: "Ser o especialista 'referência nacional' em um nicho acadêmico raro.", weights: { 'Neurologia': 5, 'Alergologia e Imunologia': 5, 'Genética': 5 } }
    ]
  },
  {
    id: 20,
    category: 'Psychological',
    text: "Você prefere operar um paciente por 30 anos ou por 30 minutos?",
    options: [
      { text: "30 minutos: Resolvo o problema e sigo para o próximo desafio.", weights: { 'Cirurgia Geral': 5, 'Anestesiologia': 5, 'Ortopedia e Traumatologia': 5, 'Urologia': 4 } },
      { text: "30 anos: Quero envelhecer e ver os filhos dos meus pacientes crescerem.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 5, 'Geriatria': 5, 'Endocrinologia e Metabologia': 4 } },
      { text: "Acompanhamento por fases: Lidar com a doença até a remissão ou controle.", weights: { 'Infectologia': 4, 'Oncologia': 5, 'Psiquiatria': 4 } },
      { text: "Não quero ver o paciente, apenas o resultado técnico da sua biologia.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Patologia': 5 } }
    ]
  },
  {
    id: 21,
    category: 'Technical',
    text: "Como você lida com o erro médico (seu ou de outros)?",
    options: [
      { text: "Sou perfeccionista extremo; o erro manual me causa angústia física.", weights: { 'Neurocirurgia': 5, 'Cirurgia Plástica': 5, 'Oftalmologia': 5, 'Cirurgia Vascular': 5 } },
      { text: "Foco na gestão de danos e na segurança do paciente em tempo real.", weights: { 'Anestesiologia': 5, 'Medicina Intensiva': 5, 'Emergência': 5 } },
      { text: "Analiso as falhas sistêmicas e protocolos para evitar repetições.", weights: { 'Medicina do Trabalho': 5, 'Infectologia': 4 } },
      { text: "Lido com a culpa e o impacto emocional no paciente e na família.", weights: { 'Psiquiatria': 5, 'Cuidados Paliativos': 5, 'Medicina de Família e Comunidade': 4 } }
    ]
  },
  {
    id: 22,
    category: 'Academic',
    text: "Qual destas especialidades 'irmãs' você mais respeita intelectualmente?",
    options: [
      { text: "Neurologia: Pelo diagnóstico puramente clínico e lógico.", weights: { 'Neurologia': 5, 'Neurocirurgia': 3, 'Psiquiatria': 3 } },
      { text: "Alergologia e Imunologia: Pelo domínio molecular e celular.", weights: { 'Alergologia e Imunologia': 5, 'Reumatologia': 4, 'Infectologia': 3 } },
      { text: "Infectologia: Pela visão global e epidemiológica.", weights: { 'Infectologia': 5, 'Medicina Intensiva': 3 } },
      { text: "Anestesiologia: Pelo controle absoluto da fisiologia aguda.", weights: { 'Anestesiologia': 5, 'Cardiologia': 3, 'Medicina Intensiva': 4 } }
    ]
  },
  {
    id: 23,
    category: 'Sensory',
    text: "Você prefere ter as mãos ocupadas ou a mente acelerada?",
    options: [
      { text: "Mãos ocupadas: Preciso de atividades motoras finas.", weights: { 'Cirurgia Plástica': 5, 'Oftalmologia': 5, 'Neurocirurgia': 5, 'Otorrinolaringologia': 5 } },
      { text: "Mente acelerada: Prefiro o processamento de informações complexas.", weights: { 'Clínica Médica': 5, 'Neurologia': 5, 'Radiologia e Diagnóstico por Imagem': 5, 'Infectologia': 4 } },
      { text: "Equilíbrio: Gosto de raciocinar e agir fisicamente em seguida.", weights: { 'Ortopedia e Traumatologia': 5, 'Gastroenterologia': 5, 'Urologia': 5, 'Ginecologia e Obstetrícia': 4 } },
      { text: "Observação: Prefiro observar e analisar comportamentos.", weights: { 'Psiquiatria': 5, 'Medicina do Trabalho': 4 } }
    ]
  },
  {
    id: 24,
    category: 'Lifestyle',
    text: "Qual é seu nível de paciência para 'queixas bobas' (sem gravidade)?",
    options: [
      { text: "Baixo: Se não for grave ou cirúrgico, me sinto perdendo tempo.", weights: { 'Cirurgia Geral': 4, 'Neurocirurgia': 5, 'Anestesiologia': 4, 'Medicina Intensiva': 5 } },
      { text: "Alto: Entendo que toda queixa esconde uma necessidade humana.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 5, 'Psiquiatria': 5, 'Cuidados Paliativos': 4 } },
      { text: "Moderado: Lido bem se houver um desafio diagnóstico interessante.", weights: { 'Neurologia': 5, 'Endocrinologia e Metabologia': 4, 'Clínica Médica': 4 } },
      { text: "Tecnicista: Analiso o sintoma objetivamente, independente da gravidade.", weights: { 'Dermatologia': 5, 'Oftalmologia': 5, 'Alergologia e Imunologia': 5 } }
    ]
  },
  {
    id: 25,
    category: 'Academic',
    text: "Qual destes nomes da medicina você mais admira?",
    options: [
      { text: "William Osler (O pai da clínica moderna).", weights: { 'Clínica Médica': 5, 'Infectologia': 3 } },
      { text: "Sigmund Freud (O explorador da mente).", weights: { 'Psiquiatria': 5, 'Neurologia': 3 } },
      { text: "Joseph Lister (O pioneiro da antissepsia cirúrgica).", weights: { 'Cirurgia Geral': 5, 'Infectologia': 3 } },
      { text: "Jean-Martin Charcot (O pai da neurologia moderna).", weights: { 'Neurologia': 5, 'Psiquiatria': 4 } }
    ]
  },
  {
    id: 26,
    category: 'Technical',
    text: "Qual sua relação com os 'grandes volumes' (sangue, trauma, ossos expostos)?",
    options: [
      { text: "Mantenho o foco absoluto; o impacto visual não me afeta.", weights: { 'Ortopedia e Traumatologia': 5, 'Cirurgia Geral': 5, 'Emergência': 5, 'Neurocirurgia': 4 } },
      { text: "Prefiro evitar; meu interesse é na microcirurgia ou clínica.", weights: { 'Oftalmologia': 5, 'Endocrinologia e Metabologia': 4, 'Psiquiatria': 5, 'Dermatologia': 5 } },
      { text: "Lido bem se estiver focado em salvar a vida do paciente.", weights: { 'Medicina Intensiva': 5, 'Anestesiologia': 5, 'Cirurgia Vascular': 5 } },
      { text: "Prefiro que o contato seja mediado por exames laboratoriais.", weights: { 'Patologia': 5, 'Alergologia e Imunologia': 4 } }
    ]
  },
  {
    id: 27,
    category: 'Lifestyle',
    text: "Você prefere ter 1 paciente VIP por mês ou 50 pacientes SUS por dia?",
    options: [
      { text: "VIP: Foco no detalhe, na sofisticação e no resultado estético.", weights: { 'Cirurgia Plástica': 5, 'Dermatologia': 5, 'Oftalmologia': 4 } },
      { text: "50 SUS: Adoro a resolutividade pública e o impacto social.", weights: { 'Medicina de Família e Comunidade': 5, 'Infectologia': 4, 'Pediatria': 4, 'Ginecologia e Obstetrícia': 4 } },
      { text: "Intermediário: Gosto de consultório estável de classe média.", weights: { 'Cardiologia': 5, 'Gastroenterologia': 5, 'Urologia': 5, 'Endocrinologia e Metabologia': 5 } },
      { text: "Institucional: Prefiro trabalhar para grandes hospitais ou empresas.", weights: { 'Anestesiologia': 5, 'Medicina Intensiva': 5, 'Medicina do Trabalho': 5 } }
    ]
  },
  {
    id: 28,
    category: 'Psychological',
    text: "Qual sua tolerância à 'incerteza' diagnóstica?",
    options: [
      { text: "Baixa: Preciso de exames de imagem e provas cabais.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Patologia': 5, 'Ortopedia e Traumatologia': 4 } },
      { text: "Alta: Consigo lidar com diagnósticos sindrômicos e subjetivos.", weights: { 'Psiquiatria': 5, 'Geriatria': 5, 'Clínica Médica': 4, 'Neurologia': 4 } },
      { text: "Moderada: Investigo até o fim com todas as ferramentas disponíveis.", weights: { 'Infectologia': 5, 'Alergologia e Imunologia': 5, 'Endocrinologia e Metabologia': 5 } },
      { text: "Pragmática: Trato o sintoma mais grave primeiro.", weights: { 'Medicina Intensiva': 5, 'Anestesiologia': 5, 'Emergência': 5 } }
    ]
  },
  {
    id: 29,
    category: 'Technical',
    text: "Você prefere resolver a causa ou gerenciar o sintoma?",
    options: [
      { text: "Causa: Quero erradicar o micro-organismo ou retirar o tumor.", weights: { 'Infectologia': 5, 'Cirurgia Geral': 5, 'Urologia': 4, 'Neurocirurgia': 4 } },
      { text: "Sintoma: O alívio do sofrimento é minha principal missão.", weights: { 'Cuidados Paliativos': 5, 'Anestesiologia': 5, 'Psiquiatria': 4, 'Medicina Intensiva': 4 } },
      { text: "Equilíbrio: Quero ajustar o sistema para que ele volte ao normal.", weights: { 'Endocrinologia e Metabologia': 5, 'Nefrologia': 5, 'Cardiologia': 5, 'Pneumologia': 5 } },
      { text: "Prevenção: Quero evitar que a doença sequer apareça.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 5, 'Medicina do Trabalho': 5 } }
    ]
  },
  {
    id: 30,
    category: 'Lifestyle',
    text: "Você se vê usando jaleco de seda no consultório ou pijama cirúrgico no bloco?",
    options: [
      { text: "Pijama Cirúrgico: Adoro o ambiente dinâmico do bloco.", weights: { 'Cirurgia Geral': 5, 'Anestesiologia': 5, 'Neurocirurgia': 5, 'Ortopedia e Traumatologia': 5 } },
      { text: "Jaleco de Seda: Gosto da elegância e do formalismo do consultório.", weights: { 'Dermatologia': 5, 'Psiquiatria': 5, 'Endocrinologia e Metabologia': 5, 'Alergologia e Imunologia': 5 } },
      { text: "Roupa Casual: Prefiro a informalidade e proximidade com o paciente.", weights: { 'Medicina de Família e Comunidade': 5, 'Pediatria': 5, 'Infectologia': 4 } },
      { text: "Equipamento Tecnológico: Óculos de proteção, telas e fones.", weights: { 'Radiologia e Diagnóstico por Imagem': 5, 'Oftalmologia': 4, 'Urologia': 4 } }
    ]
  }
];

const specialtyDetails: Record<string, { 
  icon: React.ReactNode, 
  desc: string, 
  profile: string,
  advice: string,
  league: string,
  book: string,
  color: string 
}> = {
  'Clínica Médica': { icon: <Stethoscope size={48} />, desc: "O Detetive do Corpo Humano", profile: "Você ama o diagnóstico e a complexidade. Seu cérebro busca padrões e integrações sistêmicas.", advice: "Estude Semiologia e Fisiopatologia integradas. O Harrison deve ser seu melhor amigo.", league: "LACM - Liga de Clínica Médica", book: "Harrison - Medicina Interna", color: "text-blue-700" },
  'Pediatria': { icon: <Baby size={48}/>, desc: "O Guardião do Futuro", profile: "Você possui paciência, ludicidade e foco no desenvolvimento global. Sabe gerenciar a tríade médico-paciente-família.", advice: "Aprenda a examinar brincando. Domine o Calendário Vacinal e os marcos do desenvolvimento.", league: "LAPED - Liga de Pediatria", book: "Nelson - Tratado de Pediatria", color: "text-pink-600" },
  'Cirurgia Geral': { icon: <Slice size={48}/>, desc: "O Resolutor Pragmático", profile: "Você quer ver o problema e resolvê-lo na hora. Possui destreza manual e raciocínio espacial apurado.", advice: "Domine a Anatomia Topográfica e Técnica Cirúrgica.", league: "LACIG - Liga de Cirurgia Geral", book: "Sabiston - Tratado de Cirurgia", color: "text-red-700" },
  'Ginecologia e Obstetrícia': { icon: <Target size={48}/>, desc: "O Médico da Vida", profile: "Combina clínica, cirurgia e o milagre do nascimento. Dedicado à saúde feminina em todas as fases.", advice: "Estude Fisiologia Endócrina Feminina e Mecanismos do Parto.", league: "LAGO - Liga de Ginecologia e Obstetrícia", book: "Zugaib - Obstetrícia", color: "text-purple-600" },
  'Anestesiologia': { icon: <Syringe size={48}/>, desc: "O Mestre da Fisiologia", profile: "Você ama farmacologia e controle total das funções vitais. Gosta de precisão e resultados imediatos.", advice: "Aprofunde-se em Hemodinâmica e Farmacologia dos Gases.", league: "LAAD - Liga de Anestesiologia e Dor", book: "Miller - Anestesiologia", color: "text-cyan-700" },
  'Ortopedia e Traumatologia': { icon: <HardHat size={48}/>, desc: "O Engenheiro do Corpo", profile: "Pragmático e vigoroso. Ama a mecânica do movimento e a reconstrução traumática.", advice: "Domine a Anatomia Musculoesquelética.", league: "LAOT - Liga de Ortopedia", book: "Rockwood and Green's Fractures", color: "text-amber-800" },
  'Medicina do Trabalho': { icon: <Scale size={48}/>, desc: "O Médico da Produtividade", profile: "Focado em prevenção, legislação e saúde organizacional.", advice: "Estude Epidemiologia Ocupacional e Direito Médico.", league: "LAMT - Liga de Medicina do Trabalho", book: "Mendes - Patologia do Trabalho", color: "text-gray-700" },
  'Cardiologia': { icon: <Heart size={48}/>, desc: "O Mestre do Ritmo", profile: "Focado no motor da vida. Ama hemodinâmica, eletrocardiografia e intervenções precisas.", advice: "Domine o ECG e a Fisiologia Cardiovascular. O Braunwald é a bíblia.", league: "LAC - Liga de Cardiologia", book: "Braunwald's Heart Disease", color: "text-red-600" },
  'Oftalmologia': { icon: <Eye size={48}/>, desc: "O Mestre da Visão", profile: "Microcirurgia de alta precisão e tecnologia diagnóstica avançada.", advice: "Estude a óptica e anatomia ocular.", league: "LAOFTALMO - Liga de Oftalmologia", book: "Kanski's Clinical Ophthalmology", color: "text-blue-400" },
  'Radiologia e Diagnóstico por Imagem': { icon: <MicroscopeIcon size={48}/>, desc: "A Visão Além do Alcance", profile: "Visual e tecnológico. Prefere o diagnóstico e a tecnologia à intervenção direta constante.", advice: "Estude Anatomia Radiológica exaustivamente.", league: "LAIR - Liga de Imagem", book: "Felson - Radiologia de Tórax", color: "text-slate-600" },
  'Psiquiatria': { icon: <Users size={48}/>, desc: "O Arquiteto da Psique", profile: "Valoriza a subjetividade humana. Sua ferramenta é a escuta, a empatia e a neurociência.", advice: "Leia sobre Psicopatologia e Neurociências. Pratique a escuta ativa.", league: "LAPSI - Liga de Psiquiatria", book: "Kaplan & Sadock - Compêndio de Psiquiatria", color: "text-purple-700" },
  'Dermatologia': { icon: <Search size={48}/>, desc: "A Visão Cutânea", profile: "Detalhista, visual e focado em qualidade de vida. Especialista no diagnóstico por inspeção.", advice: "Foque em Histologia e Imunologia da pele.", league: "LADERM - Liga de Dermatologia", book: "Azulay - Dermatologia", color: "text-rose-600" },
  'Medicina Intensiva': { icon: <Zap size={48}/>, desc: "A Elite do Suporte Vital", profile: "Frio sob pressão, domina a fisiologia avançada. O mestre da UTI.", advice: "Domine o Suporte Avançado (ACLS/ATLS).", league: "LAMI - Liga de Medicina Intensiva", book: "Marino - O Livro da UTI", color: "text-red-900" },
  'Otorrinolaringologia': { icon: <Ear size={48}/>, desc: "O Mestre dos Sentidos", profile: "Precisão em microcirurgias e manejo clínico de vias aéreas superiores.", advice: "Estude a anatomia da cabeça e pescoço.", league: "LAORL - Liga de Otorrino", book: "Cummings Otolaryngology", color: "text-cyan-600" },
  'Cirurgia Plástica': { icon: <Scissors size={48}/>, desc: "O Artista da Medicina", profile: "Busca a perfeição estética e a reconstrução funcional detalhada.", advice: "Estude Anatomia dos Retalhos e Cicatrização.", league: "LACP - Liga de Cirurgia Plástica", book: "Neligan - Plastic Surgery", color: "text-rose-700" },
  'Medicina de Família e Comunidade': { icon: <Home size={48}/>, desc: "O Médico da Pessoa", profile: "Social, empático e generalista. Foca no vínculo e na prevenção.", advice: "Estude Abordagem Centrada na Pessoa.", league: "LAMFAC - Liga de Medicina de Família", book: "Tratado de Medicina de Família e Comunidade", color: "text-emerald-700" },
  'Urologia': { icon: <Activity size={48}/>, desc: "O Mestre das Vias Urinárias", profile: "Combina cirurgia robótica de ponta com clínica resolutiva.", advice: "Estude a Anatomia do Sistema Geniturinário.", league: "LAURO - Liga de Urologia", book: "Campbell-Walsh Urology", color: "text-blue-800" },
  'Neurologia': { icon: <Brain size={48}/>, desc: "O Arquiteto do Pensamento", profile: "Analítico e detalhista. Fascina-se pela complexidade do sistema nervoso.", advice: "Domine a Neuroanatomia Funcional.", league: "LAN - Liga de Neurologia", book: "Adams and Victor's Neurology", color: "text-indigo-700" },
  'Endocrinologia e Metabologia': { icon: <Activity size={48}/>, desc: "O Mestre do Equilíbrio", profile: "Fascinado por ciclos hormonais e metabólicos. Foco em controle de longo prazo.", advice: "Domine a Bioquímica e a Fisiologia das Glândulas.", league: "LAEM - Liga de Endocrinologia", book: "Williams Textbook of Endocrinology", color: "text-orange-600" },
  'Infectologia': { icon: <FlaskConical size={48}/>, desc: "O Caçador de Micro-organismos", profile: "Ama a epidemiologia e o raciocínio sistêmico. Vê o paciente como um todo.", advice: "Estude Microbiologia e Antibioticoterapia.", league: "LAINF - Liga de Infectologia", book: "Mandell - Infectious Diseases", color: "text-yellow-800" },
  'Gastroenterologia': { icon: <Activity size={48}/>, desc: "O Mestre da Digestão", profile: "Une raciocínio clínico aguçado com procedimentos (Endoscopia).", advice: "Estude Fisiologia Digestória.", league: "LAGASTRO - Liga de Gastro", book: "Sleisenger and Fordtran's", color: "text-amber-700" },
  'Nefrologia': { icon: <Waves size={48}/>, desc: "O Mestre dos Fluidos", profile: "Ama física e química aplicada. O rim é seu órgão sagrado.", advice: "Domine o Equilíbrio Ácido-Básico.", league: "LANEFRO - Liga de Nefrologia", book: "Brenner & Rector's The Kidney", color: "text-blue-900" },
  'Cirurgia Vascular': { icon: <Activity size={48}/>, desc: "O Arquiteto das Veias", profile: "Precisão absoluta em anastomoses e intervenções endovasculares.", advice: "Domine a Anatomia Vascular.", league: "LAVASC - Liga de Vascular", book: "Rutherford's Vascular Surgery", color: "text-red-800" },
  'Neurocirurgia': { icon: <Zap size={48}/>, desc: "A Elite do Sistema Nervoso", profile: "Resiliência extrema, perfeccionismo e coragem técnica.", advice: "Domine a Neuroanatomia Funcional.", league: "LANC - Liga de Neurocirurgia", book: "Greenberg - Handbook of Neurosurgery", color: "text-indigo-900" },
  'Pneumologia': { icon: <Wind size={48}/>, desc: "O Mestre da Respiração", profile: "Especialista em trocas gasosas e ventilação. Lida com doenças obstrutivas.", advice: "Estude Fisiologia Respiratória e Ventilação Mecânica.", league: "LAPNEUMO - Liga de Pneumologia", book: "Fishman's Pulmonary Diseases", color: "text-blue-500" },
  'Alergologia e Imunologia': { icon: <Shield size={48}/>, desc: "O Mestre das Defesas", profile: "Fascinado pela biologia molecular e imunologia clínica.", advice: "Aprofunde-se em Imunologia Celular.", league: "LAAMI - Liga de Alergologia Médica", book: "Middleton's Allergy", color: "text-sky-600" }
};

export const CareerQuiz: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<Record<string, number>[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (weights: Partial<Record<Specialty, number>>) => {
    setHistory(prev => [...prev, { ...scores }]);
    
    const newScores = { ...scores };
    (Object.keys(weights) as Specialty[]).forEach(k => {
      newScores[k] = (newScores[k] || 0) + (weights[k] || 0);
    });
    setScores(newScores);

    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowResult(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setScores(history[history.length - 1]);
      setHistory(prev => prev.slice(0, -1));
      setCurrentIdx(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const reset = () => {
    setScores({});
    setHistory([]);
    setCurrentIdx(0);
    setShowResult(false);
  };

  if (showResult) {
    const sorted = (Object.entries(scores) as [Specialty, number][])
      .sort((a, b) => b[1] - a[1])
      .filter(([spec]) => specialtyDetails[spec]);

    const top = sorted[0] || ['Clínica Médica', 0];
    const data = specialtyDetails[top[0]] || specialtyDetails['Clínica Médica']!;

    return (
      <div className="max-w-4xl mx-auto p-4 md:p-10 pb-20 animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-[#003366] p-12 text-center text-white relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10 text-white transform scale-150">{data.icon}</div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-[#D4A017]">Laudo Vocacional Medicina do Sertão</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-none">{top[0]}</h2>
            <p className="text-xl italic text-blue-100 font-light">"{data.desc}"</p>
          </div>

          <div className="p-10 space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h3 className="flex items-center gap-2 text-xs font-black uppercase text-[#003366] mb-4"><UserCheck size={18} className="text-[#D4A017]"/> Perfil Analítico</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">{data.profile}</p>
              </div>
              <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                <h3 className="flex items-center gap-2 text-xs font-black uppercase text-blue-800 mb-4"><Target size={18} className="text-[#D4A017]"/> Guia para o Ciclo Básico</h3>
                <p className="text-sm text-blue-700 leading-relaxed font-medium">{data.advice}</p>
                <div className="mt-4 pt-4 border-t border-blue-100 space-y-2">
                  <p className="text-[9px] font-black uppercase text-blue-400 tracking-widest">📚 Livro Padrão-Ouro</p>
                  <p className="text-xs font-bold text-blue-900">{data.book}</p>
                  <p className="text-[9px] font-black uppercase text-blue-400 tracking-widest mt-2">⭐ Liga Acadêmica Sugerida</p>
                  <p className="text-xs font-bold text-blue-900">{data.league}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-10 rounded-[2.5rem]">
              <h3 className="text-center text-[10px] font-black uppercase text-[#003366] tracking-[0.3em] mb-8">Pódio de Compatibilidade</h3>
              <div className="space-y-6">
                {sorted.slice(0, 5).map(([spec, score], idx) => (
                  <div key={spec}>
                    <div className="flex justify-between text-[11px] font-black mb-2 uppercase text-gray-500">
                      <span>{idx+1}º {spec}</span>
                      <span className="text-[#003366]">{score} pts</span>
                    </div>
                    <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden shadow-inner">
                      <div className={`h-full transition-all duration-1000 ${idx === 0 ? 'bg-[#003366]' : idx === 1 ? 'bg-[#D4A017]' : 'bg-gray-400'}`} style={{width: `${Math.max(10, (score/top[1])*100)}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 border-t border-gray-50">
              <button onClick={() => window.print()} className="bg-white border-2 border-gray-100 text-[#003366] px-10 py-5 rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
                🖨️ Imprimir Laudo Oficial
              </button>
              <button onClick={reset} className="bg-[#003366] text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] flex items-center justify-center gap-2 hover:bg-[#D4A017] transition-all shadow-md">
                <RefreshCw size={18}/> Refazer Teste
              </button>
              <button onClick={onBack} className="bg-white border-2 border-[#003366] text-[#003366] px-10 py-5 rounded-2xl font-black uppercase text-[10px] hover:bg-gray-50 transition-all">
                Voltar ao Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = quizQuestions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto p-6 md:py-16 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-[#003366] uppercase tracking-tighter">Entrevista Vocacional FMS</h2>
        <div className="mt-8 flex justify-center gap-1.5 px-2 md:px-0">
          {quizQuestions.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= currentIdx ? 'bg-[#D4A017]' : 'bg-gray-200'}`}></div>
          ))}
        </div>
        <p className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Dimensão {currentIdx + 1} de {quizQuestions.length}</p>
      </div>

      <div className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl border border-gray-50 relative overflow-hidden">
        <p className="text-[10px] font-black uppercase text-[#D4A017] mb-6 tracking-[0.3em]">
          {q.category === 'Lifestyle' ? '🏠 Estilo de Vida' : 
           q.category === 'Academic' ? '📚 Afinidade Acadêmica' : 
           q.category === 'Psychological' ? '🧠 Perfil Psicológico' : 
           q.category === 'Technical' ? '🛠️ Habilidades Técnicas' : '👃 Percepção Sensorial'}
        </p>
        
        <h3 className="text-2xl md:text-3xl font-black text-[#003366] mb-12 leading-tight tracking-tight">{q.text}</h3>
        
        <div className="grid gap-4">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt.weights)}
              className="w-full text-left p-6 rounded-2xl border-2 border-gray-50 hover:border-[#003366] hover:bg-blue-50/30 transition-all group flex items-center justify-between shadow-sm hover:shadow-md"
            >
              <span className="text-sm md:text-base font-bold text-gray-600 group-hover:text-[#003366] pr-4 leading-relaxed">{opt.text}</span>
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-[#003366] group-hover:text-white transition-all flex-shrink-0">
                <ArrowRight size={20} />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center max-w-xs mx-auto">
        <button 
          onClick={handleBack}
          disabled={currentIdx === 0}
          className={`flex items-center gap-2 font-bold text-xs uppercase transition-colors ${currentIdx === 0 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-[#003366]'}`}
        >
          <ArrowLeft size={14}/> Voltar Pergunta
        </button>
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-red-300 font-bold text-xs uppercase hover:text-red-500 transition-colors"
        >
          Abandonar
        </button>
      </div>
    </div>
  );
};

export default CareerQuiz;