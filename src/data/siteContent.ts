export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface PracticeArea {
  number: string;
  title: string;
  description: string;
  iconName: 'Compass' | 'ShieldCheck' | 'Layers' | 'FileText' | 'TrendingUp' | 'Scale';
}

export interface MethodStep {
  number: string;
  title: string;
  summary: string;
  detail: string;
}

export interface ResultMetric {
  target: number;
  suffix: string;
  padZero?: boolean;
  label: string;
  description: string;
}

export interface TestimonialItem {
  quote: string;
  clientName: string;
  clientRole: string;
  context: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContentArticle {
  id: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  fullText: string[];
}

export const SITE_CONTENT = {
  professional: {
    name: '[Nome do Profissional]',
    profession: '[Profissão]',
    city: '[Cidade]',
    phone: '[Telefone]',
    whatsappNumber: '5500000000000', // Substitua pelo número com DDI e DDD (apenas dígitos)
    email: '[E-mail]',
    registry: '[Registro profissional]',
    hours: '[Horário de atendimento]',
    year: '[Ano]',
  },

  nav: [
    { id: 'sobre', label: 'Sobre', href: '#sobre' },
    { id: 'atuacao', label: 'Atuação', href: '#atuacao' },
    { id: 'metodo', label: 'Método', href: '#metodo' },
    { id: 'resultados', label: 'Resultados', href: '#resultados' },
    { id: 'depoimentos', label: 'Depoimentos', href: '#depoimentos' },
    { id: 'contato', label: 'Contato', href: '#contato' },
  ] as NavItem[],

  hero: {
    kicker: '[Profissão] · Atendimento em [Cidade] e todo o país',
    headlineLines: [
      'Clareza estratégica para',
      '[promessa principal do',
      'profissional] com rigor.',
    ],
    subtitle:
      'Acompanhamento individual conduzido diretamente por [Nome do Profissional], unindo critério técnico, visão prática e total transparência em cada decisão.',
    primaryCta: 'Agendar conversa',
    secondaryCta: 'Ver como trabalho',
    photoLabel: 'Sua foto aqui',
    photoCaption: 'Retrato editorial · [Nome do Profissional]',
    badges: [
      { label: '[Anos de experiência]', detail: 'Trajetória consolidada' },
      { label: '[Clientes atendidos]', detail: 'Casos conduzidos' },
      { label: '[Registro profissional]', detail: 'Atuação regular' },
    ],
  },

  marqueeItems: [
    '[Área de atuação 1]',
    '[Área de atuação 2]',
    '[Área de atuação 3]',
    'Atendimento direto e confidencial',
    'Estratégia sob medida',
    '[Registro profissional]',
  ],

  about: {
    sectionTitle: 'Sobre mim',
    headline: 'Cada caso exige escuta atenta, método claro e responsabilidade direta.',
    photoLabel: 'Sua foto aqui',
    paragraphs: [
      'Sou [Nome do Profissional], [Profissão] com atuação dedicada em [Cidade] e atendimento remoto estruturado. Ao longo de [Anos de experiência], construí uma prática independente pautada pela proximidade com quem confia no meu trabalho.',
      'Acredito que decisões importantes não combinam com soluções genéricas nem com atendimento impessoal. Por isso, conduzo pessoalmente cada etapa: da análise inicial à entrega final, com comunicação direta e sem intermediários.',
      'Meu compromisso é traduzir cenários complexos em planos objetivos, protegendo o seu tempo, os seus recursos e os seus objetivos de médio e longo prazo.',
    ],
    ctaLabel: 'Falar comigo',
  },

  practiceAreas: {
    sectionTitle: 'Áreas de atuação',
    headline: 'Frentes de trabalho desenhadas para resolver demandas reais com precisão.',
    items: [
      {
        number: '01',
        title: '[Serviço 1]',
        description:
          'Diagnóstico completo e condução técnica orientada para metas claras e previsibilidade desde o primeiro contato.',
        iconName: 'Compass',
      },
      {
        number: '02',
        title: '[Serviço 2]',
        description:
          'Estruturação preventiva e acompanhamento contínuo para reduzir riscos e sustentar decisões seguras.',
        iconName: 'ShieldCheck',
      },
      {
        number: '03',
        title: '[Serviço 3]',
        description:
          'Planejamento personalizado com foco em eficiência, organização e alinhamento integral à sua realidade.',
        iconName: 'Layers',
      },
      {
        number: '04',
        title: '[Serviço 4]',
        description:
          'Revisão minuciosa de cenários, documentos e indicadores para identificar oportunidades de melhoria imediata.',
        iconName: 'FileText',
      },
      {
        number: '05',
        title: '[Serviço 5]',
        description:
          'Gestão estratégica voltada para evolução consistente, mensuração de avanços e ajustes ágeis de rota.',
        iconName: 'TrendingUp',
      },
      {
        number: '06',
        title: '[Serviço 6]',
        description:
          'Atuação consultiva pontual ou recorrente para momentos decisivos que exigem critério e segurança.',
        iconName: 'Scale',
      },
    ] as PracticeArea[],
  },

  method: {
    sectionTitle: 'Método',
    headline: 'Um processo estruturado em quatro etapas para transformar complexidade em direção.',
    steps: [
      {
        number: '01',
        title: 'Diagnóstico',
        summary: 'Leitura aprofundada do contexto atual, prioridades e restrições.',
        detail:
          'Na conversa inicial, reunimos os dados essenciais do seu cenário para mapear gargalos, urgências e o objetivo real por trás da demanda.',
      },
      {
        number: '02',
        title: 'Estratégia',
        summary: 'Desenho de um plano sob medida com prazos, escopo e critérios objetivos.',
        detail:
          'Você recebe uma proposta clara de atuação, com etapas bem definidas, entregas previstas e transparência total sobre investimentos.',
      },
      {
        number: '03',
        title: 'Execução',
        summary: 'Implementação técnica conduzida com rigor e comunicação periódica.',
        detail:
          'Cada ação é executada diretamente por [Nome do Profissional], garantindo padrão elevado de qualidade e atualizações constantes sobre o andamento.',
      },
      {
        number: '04',
        title: 'Acompanhamento',
        summary: 'Monitoramento contínuo de resultados e refinamentos estratégicos.',
        detail:
          'Após as entregas principais, avaliamos os indicadores definidos e ajustamos o percurso para consolidar ganhos duradouros.',
      },
    ] as MethodStep[],
  },

  results: {
    sectionTitle: 'Resultados',
    headline: 'Indicadores construídos com consistência ao longo da trajetória.',
    items: [
      {
        target: 12,
        suffix: '+',
        padZero: true,
        label: '[Anos de experiência]',
        description: 'Dedicação contínua e atualização constante em [Profissão].',
      },
      {
        target: 350,
        suffix: '+',
        label: '[Clientes atendidos]',
        description: 'Projetos e atendimentos conduzidos de forma personalizada.',
      },
      {
        target: 98,
        suffix: '%',
        padZero: true,
        label: 'Índice de aprovação',
        description: 'Clientes que permanecem ou indicam o acompanhamento.',
      },
      {
        target: 24,
        suffix: 'h',
        padZero: true,
        label: 'Retorno inicial',
        description: 'Prazo máximo para resposta e alinhamento do primeiro contato.',
      },
    ] as ResultMetric[],
  },

  testimonials: {
    sectionTitle: 'Depoimentos',
    headline: 'A percepção de quem já passou pelo acompanhamento.',
    items: [
      {
        quote:
          'Desde a primeira reunião, senti segurança na forma como [Nome do Profissional] organizou as prioridades do meu caso. A clareza nas explicações e o cumprimento rigoroso dos prazos fizeram toda a diferença.',
        clientName: '[Nome do cliente]',
        clientRole: '[Cargo ou empresa]',
        context: 'Atendimento em [Área de atuação 1]',
      },
      {
        quote:
          'O diferencial está no atendimento direto e sem rodeios. Recebi um plano objetivo, com acompanhamento próximo em cada etapa, o que nos trouxe tranquilidade para tomar decisões importantes.',
        clientName: '[Nome do cliente]',
        clientRole: '[Cargo ou empresa]',
        context: 'Atendimento em [Área de atuação 2]',
      },
      {
        quote:
          'Profissionalismo raro. Em poucas semanas já tínhamos visibilidade completa do processo e resultados consistentes. Recomendo sem ressalvas para quem busca critério técnico e seriedade.',
        clientName: '[Nome do cliente]',
        clientRole: '[Cargo ou empresa]',
        context: 'Atendimento em [Área de atuação 3]',
      },
    ] as TestimonialItem[],
  },

  faq: {
    sectionTitle: 'Perguntas frequentes',
    headline: 'Dúvidas comuns antes de iniciarmos uma conversa.',
    items: [
      {
        question: 'Como funciona o primeiro atendimento com [Nome do Profissional]?',
        answer:
          'A primeira conversa tem duração média de 30 a 45 minutos, por videochamada ou presencialmente em [Cidade]. Ela serve para compreender seu contexto, validar se há aderência ao meu trabalho e apresentar os próximos passos possíveis.',
      },
      {
        question: 'O atendimento é realizado exclusivamente em [Cidade]?',
        answer:
          'Não. Embora a base de atendimento presencial esteja em [Cidade], toda a estrutura de diagnóstico, reuniões e acompanhamento também funciona em formato digital para clientes de outras regiões.',
      },
      {
        question: 'Como são definidos os valores e formatos de contratação?',
        answer:
          'Cada demanda possui um nível próprio de complexidade. Após o diagnóstico inicial, apresento uma proposta formal com escopo fechado ou acompanhamento recorrente, detalhando prazos e condições com total transparência.',
      },
      {
        question: 'O atendimento é feito diretamente por você ou por uma equipe?',
        answer:
          'O ponto focal é sempre [Nome do Profissional]. Você trata diretamente com quem assina e conduz a estratégia, garantindo unidade de visão, sigilo e agilidade nas decisões.',
      },
      {
        question: 'Quanto tempo leva para iniciar após o contato pelo site?',
        answer:
          'O retorno acontece em até 24 horas úteis para alinhamento de agenda. Uma vez aprovada a proposta após a conversa inicial, o cronograma de diagnóstico começa imediatamente.',
      },
    ] as FaqItem[],
  },

  insights: {
    sectionTitle: 'Conteúdo',
    headline: 'Artigos e notas práticas sobre decisões estratégicas.',
    imageLabel: 'Sua imagem aqui',
    items: [
      {
        id: 'conteudo-1',
        category: '[Área de atuação 1]',
        title: '[Título do conteúdo] — Como estruturar decisões com previsibilidade',
        date: '14 Out [Ano]',
        readTime: '4 min de leitura',
        excerpt:
          'Os três critérios fundamentais que ajudam a evitar retrabalho e garantem mais segurança antes de assumir novos compromissos.',
        fullText: [
          'Este é um espaço reservado para o artigo completo de [Nome do Profissional]. Você pode substituir este texto por orientações práticas, estudos de caso ou análises relevantes para o seu público.',
          'Ao compartilhar conteúdo claro e objetivo, você demonstra domínio técnico antes mesmo da primeira reunião e ajuda o visitante a reconhecer o valor de um acompanhamento especializado.',
          'Estruture o texto com introdução direta ao problema, desenvolvimento em pontos acionáveis e um convite sutil para conversa ao final.',
        ],
      },
      {
        id: 'conteudo-2',
        category: '[Área de atuação 2]',
        title: '[Título do conteúdo] — Erros silenciosos que custam tempo e resultado',
        date: '02 Out [Ano]',
        readTime: '5 min de leitura',
        excerpt:
          'Um guia direto para identificar sinais de alerta precoces e corrigir a rota antes que pequenos desvios se tornem grandes problemas.',
        fullText: [
          'Substitua este bloco pelo conteúdo aprofundado do seu segundo artigo. Textos educativos reforçam autoridade e posicionam [Profissão] como investimento estratégico.',
          'Mantenha parágrafos curtos, linguagem acessível e exemplos alinhados à realidade dos clientes que você deseja atrair em [Cidade] e região.',
        ],
      },
      {
        id: 'conteudo-3',
        category: '[Área de atuação 3]',
        title: '[Título do conteúdo] — O que preparar antes da primeira reunião',
        date: '19 Set [Ano]',
        readTime: '3 min de leitura',
        excerpt:
          'Checklist prático com informações e objetivos essenciais para extrair o máximo de clareza logo no diagnóstico inicial.',
        fullText: [
          'Utilize este terceiro artigo para responder objeções frequentes ou orientar o cliente sobre como se preparar para trabalhar com você.',
          'Um material objetivo reduz o atrito no agendamento e eleva a qualidade das conversas que chegam pelo formulário de contato.',
        ],
      },
    ] as ContentArticle[],
  },

  finalCta: {
    kicker: 'Atendimento exclusivo · Vagas limitadas por agenda',
    headline: 'Vamos conversar sobre o seu caso?',
    subtitle:
      'Agende um horário ou envie uma mensagem direta para avaliar como posso ajudar no seu momento atual.',
    whatsappCta: 'Chamar no WhatsApp',
    scheduleCta: 'Agendar horário',
  },

  location: {
    sectionTitle: 'Localização',
    headline: 'Atendimento presencial em endereço de fácil acesso em [Cidade].',
    description:
      'Além das reuniões online, o atendimento presencial acontece com hora marcada em espaço reservado e confortável.',
    addressLine: 'Av. Exemplo Central, 1000 — Conjunto 402',
    neighborhood: 'Bairro Centro · [Cidade] — CEP 00000-000',
    reference: 'Próximo à estação central e com estacionamento conveniado no local.',
    coordinates: {
      lat: -23.561414,
      lng: -46.655881,
    },
  },

  contact: {
    sectionTitle: 'Contato',
    headline: 'Inicie uma conversa direta e confidencial.',
    description:
      'Preencha os campos ao lado com um breve resumo da sua necessidade. Retorno pessoalmente em até 24 horas úteis.',
    infoItems: [
      { label: 'Telefone / WhatsApp', value: '[Telefone]' },
      { label: 'E-mail profissional', value: '[E-mail]' },
      { label: 'Localidade', value: '[Cidade] · Atendimento presencial e online' },
      { label: 'Horário de atendimento', value: '[Horário de atendimento]' },
    ],
    subjects: [
      'Agendamento de conversa',
      '[Serviço 1]',
      '[Serviço 2]',
      '[Serviço 3]',
      'Outro assunto',
    ],
  },

  footer: {
    copyright: '© [Ano] [Nome do Profissional]. Todos os direitos reservados.',
    note: 'Modelo demonstrativo editável para profissionais liberais.',
    socials: [
      { label: 'LinkedIn', href: '#contato' },
      { label: 'Instagram', href: '#contato' },
      { label: 'YouTube', href: '#contato' },
    ],
  },
};
