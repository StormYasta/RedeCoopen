/* Conteúdo integralmente fictício para demonstração de interface. */
window.REDE_DATA = {
  categories: [
    { id: "todos", name: "Todos", emoji: "✳️" },
    { id: "tecnologia", name: "Tecnologia", emoji: "💻" },
    { id: "casa", name: "Casa e obras", emoji: "🏠" },
    { id: "marketing", name: "Marketing", emoji: "📣" },
    { id: "educacao", name: "Educação", emoji: "📚" },
    { id: "bem-estar", name: "Bem-estar", emoji: "🌿" },
    { id: "alimentacao", name: "Alimentação", emoji: "☕" },
    { id: "negocios", name: "Negócios", emoji: "💼" }
  ],
  profiles: [
    {
      id: "p1", name: "Marina Oliveira", company: "Ateliê Norte Arquitetura", type: "empresa",
      category: "casa", profession: "Arquiteta e urbanista", city: "São José do Rio Preto",
      initials: "MO", emoji: "◈", accent: "peach", featured: true,
      short: "Projetos de arquitetura e interiores que valorizam cada espaço.",
      description: "Atendimento personalizado em arquitetura residencial, reformas e interiores. Do estudo inicial ao acompanhamento de execução.",
      services: ["Projetos residenciais", "Design de interiores", "Consultoria para reformas"],
      tags: ["Projetos", "Interiores", "Reformas"]
    },
    {
      id: "p2", name: "Rafael Martins", company: "Oliva Tecnologia", type: "empresa",
      category: "tecnologia", profession: "Soluções de TI", city: "São José do Rio Preto",
      initials: "RM", emoji: "⌘", accent: "mint", featured: true,
      short: "Tecnologia descomplicada para empresas e pequenos negócios.",
      description: "Suporte de TI, redes de computadores e desenvolvimento de soluções digitais para pequenas empresas.",
      services: ["Suporte técnico", "Redes e infraestrutura", "Sites institucionais"],
      tags: ["Infraestrutura", "Sites", "Suporte"]
    },
    {
      id: "p3", name: "Camila Ferreira", company: "Estúdio Camila", type: "profissional",
      category: "marketing", profession: "Designer gráfica", city: "São José do Rio Preto",
      initials: "CF", emoji: "✳", accent: "lavender", featured: true,
      short: "Identidades visuais e comunicação com personalidade.",
      description: "Criação de marcas, materiais para redes sociais e peças gráficas para divulgação de produtos e serviços.",
      services: ["Identidade visual", "Design para redes sociais", "Materiais impressos"],
      tags: ["Design", "Marca", "Redes sociais"]
    },
    {
      id: "p4", name: "Bruno Almeida", company: "Solis Energia", type: "empresa",
      category: "casa", profession: "Energia solar e elétrica", city: "Mirassol",
      initials: "BA", emoji: "☀", accent: "sun", featured: false,
      short: "Eficiência energética para residências e comércios.",
      description: "Projetos e instalação de soluções elétricas e energia fotovoltaica, com orientação técnica durante o processo.",
      services: ["Energia solar", "Instalações elétricas", "Manutenção preventiva"],
      tags: ["Solar", "Elétrica", "Instalação"]
    },
    {
      id: "p5", name: "Juliana Costa", company: "Aprender Mais", type: "profissional",
      category: "educacao", profession: "Professora particular", city: "São José do Rio Preto",
      initials: "JC", emoji: "✎", accent: "blue", featured: false,
      short: "Aulas de reforço e acompanhamento escolar individualizado.",
      description: "Acompanhamento pedagógico com planos de estudo personalizados para estudantes da educação básica.",
      services: ["Reforço escolar", "Organização de estudos", "Aulas individuais"],
      tags: ["Reforço", "Estudos", "Aulas"]
    },
    {
      id: "p6", name: "Fernanda Rocha", company: "Flor de Casa", type: "empresa",
      category: "alimentacao", profession: "Confeitaria artesanal", city: "São José do Rio Preto",
      initials: "FR", emoji: "✿", accent: "rose", featured: true,
      short: "Doces e lembranças especiais para celebrar bons momentos.",
      description: "Confeitaria por encomenda para aniversários, eventos e pequenos encontros, com opções personalizadas.",
      services: ["Bolos por encomenda", "Doces para eventos", "Kits presenteáveis"],
      tags: ["Confeitaria", "Eventos", "Presentes"]
    },
    {
      id: "p7", name: "Henrique Lima", company: "HL Consultoria", type: "profissional",
      category: "negocios", profession: "Consultor financeiro", city: "São José do Rio Preto",
      initials: "HL", emoji: "▤", accent: "mint", featured: false,
      short: "Organização financeira para empreendedores e famílias.",
      description: "Consultoria de planejamento financeiro e organização de processos para micro e pequenas empresas.",
      services: ["Planejamento financeiro", "Organização de custos", "Consultoria empresarial"],
      tags: ["Finanças", "Planejamento", "Empresas"]
    },
    {
      id: "p8", name: "Patrícia Mendes", company: "Raiz Estúdio", type: "profissional",
      category: "bem-estar", profession: "Instrutora de movimento", city: "Bady Bassitt",
      initials: "PM", emoji: "❋", accent: "sage", featured: false,
      short: "Aulas de movimento e qualidade de vida para diferentes rotinas.",
      description: "Aulas e atividades de mobilidade e alongamento adaptadas ao objetivo de cada turma.",
      services: ["Aulas de alongamento", "Mobilidade", "Atividades em grupo"],
      tags: ["Movimento", "Bem-estar", "Aulas"]
    },
    {
      id: "p9", name: "Lucas Ribeiro", company: "Seta Segurança", type: "empresa",
      category: "tecnologia", profession: "Segurança eletrônica", city: "São José do Rio Preto",
      initials: "LR", emoji: "⬡", accent: "slate", featured: false,
      short: "Instalação de câmeras, alarmes e sistemas de acesso.",
      description: "Planejamento e instalação de segurança eletrônica para residências, condomínios e pequenos comércios.",
      services: ["Câmeras de segurança", "Alarmes", "Controle de acesso"],
      tags: ["CFTV", "Alarmes", "Instalação"]
    },
    {
      id: "p10", name: "Aline Barros", company: "Linha Clara", type: "empresa",
      category: "marketing", profession: "Comunicação e impressão", city: "São José do Rio Preto",
      initials: "AB", emoji: "▧", accent: "blue", featured: false,
      short: "Materiais impressos e comunicação visual sob medida.",
      description: "Produção gráfica para marcas, eventos e sinalização comercial.",
      services: ["Impressão de materiais", "Sinalização", "Brindes personalizados"],
      tags: ["Gráfica", "Impressão", "Sinalização"]
    },
    {
      id: "p11", name: "Eduardo Nunes", company: "EN Serviços", type: "profissional",
      category: "casa", profession: "Manutenção residencial", city: "São José do Rio Preto",
      initials: "EN", emoji: "⌂", accent: "sun", featured: false,
      short: "Pequenos reparos e manutenção para o dia a dia.",
      description: "Serviços de manutenção, montagem e pequenos reparos residenciais com agendamento.",
      services: ["Reparos residenciais", "Montagem de móveis", "Manutenção geral"],
      tags: ["Manutenção", "Reparos", "Montagem"]
    },
    {
      id: "p12", name: "Beatriz Lopes", company: "Bela Mesa", type: "empresa",
      category: "alimentacao", profession: "Buffet e eventos", city: "São José do Rio Preto",
      initials: "BL", emoji: "✧", accent: "peach", featured: false,
      short: "Coffee breaks e pequenas celebrações planejados com carinho.",
      description: "Organização de cardápios para reuniões, celebrações e eventos corporativos de pequeno porte.",
      services: ["Coffee break", "Buffet para eventos", "Cestas corporativas"],
      tags: ["Eventos", "Buffet", "Coffee break"]
    }
  ],
  demands: [
    {
      id: "d1", title: "Comunicação visual para um evento da escola",
      author: "Coopen (exemplo)", kind: "institucional", category: "marketing",
      description: "Exemplo fictício de solicitação de orçamento para peças gráficas, sinalização e materiais de divulgação de um evento institucional.",
      label: "Demanda institucional", time: "Exemplo de demanda", status: "aberta"
    },
    {
      id: "d2", title: "Procuro profissional para reforma de cozinha",
      author: "Cooperada demonstrativa", kind: "cooperado", category: "casa",
      description: "Gostaria de conversar com arquitetos e profissionais de reforma para avaliar possibilidades e solicitar orçamento.",
      label: "Pedido de cooperado", time: "Exemplo de demanda", status: "aberta"
    },
    {
      id: "d3", title: "Preciso de um site para meu pequeno negócio",
      author: "Cooperado demonstrativo", kind: "cooperado", category: "tecnologia",
      description: "Procuro profissional ou empresa da comunidade para desenvolver um site institucional simples.",
      label: "Pedido de cooperado", time: "Exemplo de demanda", status: "aberta"
    },
    {
      id: "d4", title: "Serviço de coffee break para reunião",
      author: "Coopen (exemplo)", kind: "institucional", category: "alimentacao",
      description: "Simulação de cotação para coffee break em uma reunião. Quantidade, prazos e critérios seriam definidos na versão real.",
      label: "Demanda institucional", time: "Exemplo de demanda", status: "aberta"
    },
    {
      id: "d5", title: "Aulas de reforço de matemática",
      author: "Cooperada demonstrativa", kind: "cooperado", category: "educacao",
      description: "Busco indicação de professor particular para acompanhamento escolar presencial ou remoto.",
      label: "Pedido de cooperado", time: "Exemplo de demanda", status: "aberta"
    }
  ],
  offers: [
    {
      id: "o1", providerId: "p3", title: "Identidade visual para novos negócios",
      benefit: "Condição especial para a comunidade", category: "marketing",
      description: "Exemplo de benefício em um pacote de identidade visual para pequenos empreendedores.",
      accent: "lavender", emoji: "✳"
    },
    {
      id: "o2", providerId: "p6", title: "Kits de doces para eventos",
      benefit: "Atendimento dedicado a cooperados", category: "alimentacao",
      description: "Exemplo de condição especial para encomendas de festas e eventos.",
      accent: "rose", emoji: "✿"
    },
    {
      id: "o3", providerId: "p2", title: "Diagnóstico inicial de tecnologia",
      benefit: "Benefício exclusivo demonstrativo", category: "tecnologia",
      description: "Exemplo de avaliação inicial das necessidades de tecnologia de um pequeno negócio.",
      accent: "mint", emoji: "⌘"
    },
    {
      id: "o4", providerId: "p1", title: "Consultoria de ambientes",
      benefit: "Condição especial para cooperados", category: "casa",
      description: "Exemplo de atendimento de orientação sobre organização e aproveitamento de ambientes.",
      accent: "peach", emoji: "◈"
    }
  ]
};