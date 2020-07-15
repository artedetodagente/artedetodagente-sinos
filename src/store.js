import * as R from 'ramda'

const ExampleClasses = [
  {
    title: 'Aula 1 - Primeira Aula',
    image: '/img/temp-1.jpg',
    embed_url: 'https://youtu.be/bXs_c3WOnl4',
    text: 'Mauris pharetra accumsan turpis eget rutrum. Curabitur maximus tristique tortor, in auctor orci dapibus sed.'
  },
  {
    title: 'Aula 2 - Segunda Aula',
    image: '/img/temp-2.jpg',
    embed_url: 'https://youtu.be/bXs_c3WOnl4',
    text: 'Mauris pharetra accumsan turpis eget rutrum. Curabitur maximus tristique tortor, in auctor orci dapibus sed.'
  },
  {
    title: 'Aula 3 - Terceira Aula',
    image: '/img/temp-3.jpg',
    embed_url: 'https://youtu.be/bXs_c3WOnl4',
    text: 'Mauris pharetra accumsan turpis eget rutrum. Curabitur maximus tristique tortor, in auctor orci dapibus sed.'
  }
]


const ExampleModules = [
  {
    id: 'viola',
    title: 'Viola',
    image: '/img/temp-7.jpg',
    text: 'Nullam sit amet libero metus. Cras bibendum lacinia ante ut tincidunt. Integer non ex volutpat, placerat est eu, ornare leo. Quisque tempor suscipit semper. Mauris pharetra accumsan turpis eget rutrum. Curabitur maximus tristique tortor, in auctor orci dapibus sed.',
    classes: R.clone(ExampleClasses) 
  },
  {
    id: 'violino',
    title: 'Violino',
    image: '/img/temp-8.jpg',
    text: 'Nullam sit amet libero metus. Cras bibendum lacinia ante ut tincidunt. Integer non ex volutpat, placerat est eu, ornare leo. Quisque tempor suscipit semper. Mauris pharetra accumsan turpis eget rutrum. Curabitur maximus tristique tortor, in auctor orci dapibus sed.',
    classes: R.clone(ExampleClasses) 
  },
  {
    id: 'violoncelo',
    title: 'Violoncelo',
    image: '/img/temp-9.jpg',
    text: 'Nullam sit amet libero metus. Cras bibendum lacinia ante ut tincidunt. Integer non ex volutpat, placerat est eu, ornare leo. Quisque tempor suscipit semper. Mauris pharetra accumsan turpis eget rutrum. Curabitur maximus tristique tortor, in auctor orci dapibus sed.',
    classes: R.clone(ExampleClasses) 
  },
  {
    id: 'clarinete',
    title: 'Clarinete',
    image: '/img/temp-10.jpg',
    text: 'Nullam sit amet libero metus. Cras bibendum lacinia ante ut tincidunt. Integer non ex volutpat, placerat est eu, ornare leo. Quisque tempor suscipit semper. Mauris pharetra accumsan turpis eget rutrum. Curabitur maximus tristique tortor, in auctor orci dapibus sed.',
    classes: R.clone(ExampleClasses) 
  },
  {
    id: 'fagote',
    title: 'Fagote',
    image: '/img/temp-11.jpg',
    text: 'Nullam sit amet libero metus. Cras bibendum lacinia ante ut tincidunt. Integer non ex volutpat, placerat est eu, ornare leo. Quisque tempor suscipit semper. Mauris pharetra accumsan turpis eget rutrum. Curabitur maximus tristique tortor, in auctor orci dapibus sed.',
    classes: R.clone(ExampleClasses) 
  },
]

export default {
  landing: {
    slides: [
      '/img/temp-1.jpg',
      '/img/temp-2.jpg',
      '/img/temp-3.jpg'
    ]
  },
  cursos: [
    {
      id: 'pedagogiadascordas',
      title: 'Pedagogia das Cordas',
      color: '#8bc73b',
      text: 'O Curso de Capacitação Pedagógica para o Ensino dos Instrumentos de Cordas é direcionado para professores e monitores de projetos sociais de todo o país. Ele é composto por 16 módulos de vídeo oficinas, a cargo de uma equipe de 16 professores e que abordam temas como postura, afinação e musicalidade, aplicadas à prática de violino, viola, violoncelo e contrabaixo.',
      fulltext: 'O Curso de Capacitação Pedagógica para o Ensino dos Instrumentos de Cordas é direcionado para professores e monitores de projetos sociais de todo o país. Ele é composto por 16 módulos de vídeo oficinas, a cargo de uma equipe de 16 professores e que abordam temas como postura, afinação e musicalidade, aplicadas à prática de violino, viola, violoncelo e contrabaixo.',
      modules: R.clone(ExampleModules)
    },
    {
      id: 'projetoespiral',
      title: 'Projeto Espiral',
      color: '#3568fb',
      text: 'Aqui estão reunidos cursos de capacitação para alunos de orquestras e bandas de projetos sociais de todo o Brasil. Estão incluídos, ainda, temas como música de câmara, teoria musical, história da música e reparo e manutenção de instrumentos de sopro e de cordas.',
      fulltext: 'Aqui estão reunidos cursos de capacitação para alunos de orquestras e bandas de projetos sociais de todo o Brasil. Ao todo, 40 professores distribuem-se entre 22 cursos livres, compostos, cada um, por 20 vídeos, com duração de oito a dez minutos, destinados a diversos instrumentos dos grupos de cordas, metais, madeiras e percussão. Estão incluídos, ainda, temas como música de câmara, teoria musical, história da música e reparo e manutenção de instrumentos de sopro e de cordas.',
      modules: R.clone(ExampleModules)
    },
    {
      id: 'academiaderegencia',
      title: 'Academia de Regência',
      color: '#ffa92e',
      text: 'A Academia é dirigida a jovens regentes das orquestras de projetos sociais, com a disponibilização de conteúdo didático e professores. O conteúdo inclui vídeo oficinas sobre temas introdutórios da regência, a partir de obras inéditas, encomendadas a compositores de todo o país.',
      fulltext: 'A Academia é dirigida a jovens regentes das orquestras de projetos sociais, com a disponibilização de conteúdo didático e professores. O conteúdo inclui vídeo oficinas sobre temas introdutórios da regência, a partir de obras inéditas, encomendadas a compositores de todo o país. Ao todo, são 24 vídeos, de seis professores diferentes e 30 compositores envolvidos com o projeto.',
      modules: R.clone(ExampleModules)
    }
  ],
  pages: {
    projeto: {
      title: "O Projeto",
      text: "Sinos",
      fulltext: `<strong>SISTEMA NACIONAL DE ORQUESTRAS SOCIAIS – SINOS</strong>

      Capacitação e apoio para músicos, regentes e professores 
      
      O Sistema Nacional de Orquestras Sociais (Sinos) é fruto de uma parceria entre a Fundação Nacional de Artes – Funarte e a Universidade Federal do Rio de Janeiro – UFRJ e é sustentado por uma rede composta por dezenas de profissionais de música, que atuam em cursos, oficinas, concertos e festivais, com início no segundo semestre se 2020 e que seguem por todo o ano de 2021. O objetivo é capacitar regentes, instrumentistas, compositores e educadores musicais, apoiando projetos sociais de música e, ainda, contribuir para o desenvolvimento das orquestras-escola de todo o Brasil. Esta iniciativa faz parte do Programa Funarte de Toda Gente. 
      
      O Sinos é composto por oito linhas de ação: 
      
      Pedagogia para cordas
      Projeto Espiral – capacitação instrumental de jovens músicos
      Projeto orquestra*
      Sinos e-orquestra
      Academia de regência
      Academia de ópera*
      Orquestra/Instituição parceira*
      Festivais de música*
      
      (*) atividades presenciais previstas para 2021
      
      Num primeiro momento, devido às restrições impostas pela pandemia de covid-19, o projeto desenvolve apenas algumas dessas linhas de ação, com atividades online – cursos, oficinas e publicações, disponibilizadas de modo virtual, todas gratuitas, mediante inscrição. Mais tarde, quando for possível, as atividades serão presenciais, em várias cidades das cinco regiões do país, junto a instituições parceiras. 
      
      <strong>Lives e publicações</strong>

      Como suporte a essas ações, o Sinos conta com duas ferramentas importantes: 
      A primeira são as “lives” na internet, em que, em formato interativo, professores, músicos e profissionais da área interagem com alunos das mais diferentes regiões do país, em tempo real, tratando de temas relacionados às oficinas e de atualidades da profissão. Há também espaço para entrevistas e mesas redondas. 
      
      A segunda é a publicação de cadernos pedagógicos, apostilas e partituras; e de um periódico, destinado ao universo das orquestras do Brasil – tanto profissionais quando acadêmicas, sejam formações jovens ou de projetos sociais. O objetivo é oferecer apoio pedagógico, teórico e prático ao trabalho de organizações sociais, instituições de ensino e orquestras do Brasil.
      
      
      <strong>Parceria estratégica</strong>
      
      Principal fomentadora, promotora e incentivadora governamental de atividades artísticas no país, a Funarte agrega, na parceria com a UFRJ, conhecimento e capacidade técnica para a execução do projeto Sinos. Uma das principais e mais respeitadas instituições de ensino superior do país, a Universidade – com sua Escola de Música – tem em seu quadro, docentes especializados, não somente em métodos e didática específicos, direcionados a alunos, como também na capacitação de professores e regentes; e no estímulo do desenvolvimento pedagógico e artístico das formações orquestrais, por meio de oficinas, palestras e preparação de material didático. 
      
      As parcerias com a UFRJ integram uma série de ações da Funarte, como parte do Programa Funarte de Toda Gente.`
    },
    eorquestras: {
      text: "Aqui jovens músicos de orquestras de projetos sociais de todo o Brasil se reunem com instrumentistas profissionais, numa grande celebração da música sinfônica brasileira. As apresentações, que conjugam as participações isoladas de cada músico, são registradas em vídeos, com execuções de peças orquestrais de compositores brasileiros, em formações de orquestras sinfônicas, de cordas e de sopros."
    }
  },
  posts: [
    {
      id: 'news-1',
      title: 'Apoio a quem já está com a mão na massa',
      text: 'Entrevista com André Cardoso.Nesta breve entrevista, o coordenador do Sinos, violista e professor de regência da Escola de Música da UFRJ André Cardoso fala sobre as origens do projeto e de algumas de suas principais características.',
      fulltext: ''
    }
  ],
  agenda: {
    cat: [
      {id: 'pedagogiadascordas', title: 'Pedagogia das Cordas'},
      {id: 'projetoespiral', title: 'Projeto Espiral'},
      {id: 'eorquestras', title: 'E-Orquestras'},
    ],
    posts: [
      {
        id: 1,
        date: '2020-07-15',
        time: '14h',
        title: 'Aula para instrumentos de corda',
        cat: 0
      },
      {
        id: 1,
        date: '2020-07-20',
        time: '14h',
        title: 'Aula para instrumentos de sopro',
        cat: 1
      },
      {
        id: 1,
        date: '2020-08-02',
        time: '14h',
        title: 'Aula para instrumentos de corda',
        cat: 2
      },
      {
        id: 1,
        date: '2020-08-30',
        time: '14h',
        title: 'Aula para instrumentos de sopro',
        cat: 0
      },
    ]
  }
}