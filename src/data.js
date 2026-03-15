export const subjects = [
  { id: 'sciences', label: 'Sciences & Nature', emoji: '🔬', color: '#51CF66' },
  { id: 'histoire', label: 'Histoire', emoji: '🏛️', color: '#FFB347' },
  { id: 'langue', label: 'Langue & Mots', emoji: '📝', color: '#74C0FC' },
  { id: 'corps', label: 'Le Corps Humain', emoji: '🧠', color: '#FF8787' },
  { id: 'monde', label: 'Le Monde & les Gens', emoji: '🌍', color: '#20C997' },
  { id: 'arts', label: 'Arts & Musique', emoji: '🎨', color: '#DA77F2' },
  { id: 'espace', label: "L'Espace", emoji: '🚀', color: '#748FFC' },
  { id: 'grandes-questions', label: 'Grandes Questions', emoji: '💭', color: '#FFA94D' },
];

export const questionsOfTheDay = {
  '4-7': {
    question: 'Pourquoi la lune change de forme ?',
    subject: 'espace',
  },
  '8-11': {
    question: 'Comment les dinosaures ont-ils disparu ?',
    subject: 'sciences',
  },
  '12-15': {
    question: 'Est-ce que l\'intelligence artificielle peut vraiment penser ?',
    subject: 'grandes-questions',
  },
};

export const moods = [
  { id: 'curious', emoji: '🤩', label: 'Super curieux·se' },
  { id: 'normal', emoji: '😊', label: 'Ça va bien' },
  { id: 'tired', emoji: '😴', label: 'Un peu fatigué·e' },
];

export const historyItems = {
  '4-7': [
    { question: 'Pourquoi les étoiles brillent ?', subject: 'espace', keyword: 'Étoiles' },
    { question: 'C\'est quoi un dinosaure ?', subject: 'sciences', keyword: 'Dinosaures' },
    { question: 'Pourquoi on pleure ?', subject: 'corps', keyword: 'Larmes' },
    { question: 'C\'est quoi un ami ?', subject: 'grandes-questions', keyword: 'Amitié' },
  ],
  '8-11': [
    { question: 'Comment fonctionne un volcan ?', subject: 'sciences', keyword: 'Volcans' },
    { question: 'Qui a inventé l\'écriture ?', subject: 'histoire', keyword: 'Écriture' },
    { question: 'Pourquoi on rêve la nuit ?', subject: 'corps', keyword: 'Rêves' },
    { question: 'C\'est quoi la démocratie ?', subject: 'monde', keyword: 'Démocratie' },
  ],
  '12-15': [
    { question: 'Comment fonctionne le cerveau ?', subject: 'corps', keyword: 'Cerveau' },
    { question: 'Pourquoi y a-t-il des guerres ?', subject: 'grandes-questions', keyword: 'Conflits' },
    { question: 'C\'est quoi le Big Bang ?', subject: 'espace', keyword: 'Big Bang' },
    { question: 'La musique peut-elle changer le monde ?', subject: 'arts', keyword: 'Musique' },
  ],
};

export const demoResponses = {
  '4-7': {
    question: 'Pourquoi les gens font la guerre ?',
    cold: `La guerre est un conflit armé entre des groupes organisés, généralement des États ou des nations. Les causes principales incluent les différends territoriaux, les ressources naturelles, les idéologies politiques et religieuses divergentes, ainsi que les tensions ethniques. Les guerres peuvent être classifiées en guerres civiles, guerres internationales et conflits asymétriques.`,
    warm: `Tu sais, parfois les gens ne sont pas d'accord entre eux. Comme quand tu te disputes avec un copain pour un jouet, mais en beaucoup, beaucoup plus grand.\n\nIl y a des adultes qui veulent la même chose — un endroit pour vivre, de la nourriture, ou qui pensent très très fort que leur idée est la meilleure. Et au lieu de parler, ils se battent. C'est très triste.\n\nMais tu sais quoi ? Il y a aussi plein de gens qui travaillent tous les jours pour que les disputes se règlent avec des mots, pas avec des armes. On les appelle des diplomates, des médiateurs. Et des enfants comme toi, en apprenant à écouter les autres, ça aide aussi.`,
    aporia: `Et toi, est-ce que tu penses que c'est possible de ne jamais se disputer avec personne... ou est-ce que c'est normal de ne pas toujours être d'accord ?`,
  },
  '8-11': {
    question: 'Pourquoi les gens font la guerre ?',
    cold: `La guerre est un conflit armé entre des groupes organisés, généralement des États ou des nations. Les causes principales incluent les différends territoriaux, les ressources naturelles, les idéologies politiques et religieuses divergentes, ainsi que les tensions ethniques. Les guerres peuvent être classifiées en guerres civiles, guerres internationales et conflits asymétriques. L'histoire montre que les guerres ont façonné les frontières géopolitiques actuelles.`,
    warm: `Les guerres arrivent quand des groupes de personnes — souvent des pays — n'arrivent plus à résoudre un problème en discutant.\n\nLes raisons sont variées : parfois c'est pour un territoire (« cette terre est à nous ! »), parfois pour des richesses comme le pétrole, parfois parce que deux groupes ont des croyances très différentes et refusent de coexister.\n\nCe qui est intéressant, c'est qu'après chaque grande guerre, les humains ont essayé de créer des règles pour éviter la suivante. L'ONU, par exemple, a été créée après la Seconde Guerre mondiale pour ça. Est-ce que ça marche toujours ? Non. Mais c'est une tentative.`,
    aporia: `D'après toi, si tout le monde était d'accord sur tout, est-ce que le monde serait vraiment mieux... ou est-ce qu'on a besoin de débattre pour avancer ?`,
  },
  '12-15': {
    question: 'Pourquoi les gens font la guerre ?',
    cold: `La guerre est un conflit armé entre des groupes organisés, généralement des États ou des nations. Les causes principales incluent les différends territoriaux, les ressources naturelles, les idéologies politiques et religieuses divergentes, ainsi que les tensions ethniques. Les guerres peuvent être classifiées en guerres civiles, guerres internationales et conflits asymétriques. L'analyse géopolitique contemporaine distingue les guerres conventionnelles des conflits de basse intensité et des guerres hybrides.`,
    warm: `Les guerres naissent à l'intersection de plusieurs forces : le pouvoir, l'identité, les ressources, et l'idéologie.\n\nPrenons un exemple concret. La guerre en Ukraine : on y retrouve des questions de territoire, d'identité nationale, d'influence géopolitique entre grandes puissances, et d'accès à des ressources stratégiques. C'est rarement une seule raison — c'est un engrenage.\n\nLe philosophe Thomas Hobbes pensait que sans État fort, les humains vivraient dans une « guerre de tous contre tous ». Rousseau, lui, pensait que c'est la société qui nous rend violents. Deux visions opposées, et la vérité est probablement entre les deux.\n\nCe qui est certain, c'est que la guerre a un coût humain immense. Et que la paix, ce n'est pas juste « l'absence de guerre » — c'est un travail actif, permanent, souvent ingrat.`,
    aporia: `Est-ce que tu crois qu'un monde sans aucune violence est réaliste... ou est-ce que la vraie question, c'est comment on choisit de gérer nos désaccords ?`,
  },
};
