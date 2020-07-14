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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur maximus massa. Suspendisse egestas eleifend purus, eget faucibus magna vulputate vel. ',
      modules: R.clone(ExampleModules)
    },
    {
      id: 'projetoespiral',
      title: 'Projeto Espiral',
      color: '#3568fb',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce consectetur maximus massa. Suspendisse egestas eleifend purus, eget faucibus magna vulputate vel. Aenean ligula lorem, imperdiet ac turpis id, aliquam vestibulum velit. Donec nec efficitur tortor. Aenean lacinia ornare dui non tempor. ',
      modules: R.clone(ExampleModules)
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