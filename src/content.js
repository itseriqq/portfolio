// Single source of truth, in two languages. The film captions, the plain-text
// article, the side index, the sticky notes and the downloadable ERICK.md are
// all generated from this file. Edit text here, nowhere else.

export const LANGS = ['en', 'pt'];

const links = {
  linkedin: 'https://br.linkedin.com/in/oerickaugusto',
  github: 'https://github.com/itseriqq',
  cv: './src/cv-erick-augusto.pdf',
  email: 'mailto:erickaug13@hotmail.com',
};

// shared by both languages; only the tag changes
const projects = [
  { name: 'Itaú Unibanco', href: links.linkedin, tag: { en: 'data · AWS · automation', pt: 'dados · AWS · automação' } },
  { name: 'Where2Go', href: 'https://w2go.com.br', tag: { en: 'co-founder · tech lead', pt: 'co-founder · tech lead' } },
  { name: 'UniStore', href: 'https://unistoreapp.com', tag: { en: 'founder · offline-first', pt: 'founder · offline-first' } },
  { name: 'AM Fernandes', href: 'https://amfernandes.com.br/', tag: { en: 'dashboard −56% render', pt: 'dashboard −56% render' } },
  { name: 'Nova Finance', href: 'https://novafinance.tech', tag: { en: 'B2B finance dashboard', pt: 'dashboard B2B' } },
  { name: 'SaborBrasil', href: './project-saborbrasil/index.html', tag: { en: 'web · reservations', pt: 'web · reservas' } },
];

// the stack, grouped by layer (chip labels are the same in both languages)
export const stack = [
  { id: 'front', items: ['React', 'Next.js', 'React Native', 'Expo', 'TypeScript', 'Tailwind', 'FlutterFlow', 'Figma'] },
  { id: 'back', items: ['Node.js', 'Express', 'Fastify', 'Laravel', 'PHP', 'REST APIs'] },
  { id: 'data', items: ['Python', 'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Supabase', 'Firebase'] },
  { id: 'cloud', items: ['AWS Glue', 'Athena', 'S3', 'Lambda', 'Amplify', 'Cloud Run', 'Power Automate', 'Power Apps'] },
];

export const content = {
  en: {
    ui: { read: 'read as text', watch: 'watch the film', download: 'download .md', scroll: 'scroll', top: '# top', open: 'open ↗', skip: 'Skip to the text', system: '// map the process, find the pain', wires: ['map', 'pain', 'fix', 'ship'] },
    meta: {
      name: 'Erick Augusto',
      file: 'ERICK.md',
      date: 'NOV 2026',
      description: 'A readme for the human behind the commits. Data analytics & software engineer at Itaú Unibanco.',
      tagline: ['> a readme for the human behind the commits.', '> not a résumé. not a pitch deck.', '> written in Grajaú, São Paulo, after hours.'],
    },
    chapters: [
      {
        id: 'who',
        title: '## who',
        lines: [
          'Data Analytics & Software Engineer at Itaú Unibanco. Joined as an intern in Nov 2025, Data Analytics Jr. since June 2026.',
          '23, from Grajaú, south side of São Paulo. Computer Science at UFABC, already a BSc in Science & Technology.',
          'Academic Merit Award (Frederick Winslow Taylor) and an honorable mention at the UFABC Undergraduate Research Symposium.',
        ],
        cap: [
          'Data Analytics & Software Engineer at Itaú Unibanco. Intern in 2025, Jr. since June 2026.',
          '23, from Grajaú, south side of São Paulo. Computer Science at UFABC.',
        ],
      },
      {
        id: 'does',
        title: '## what I actually do',
        lines: [
          'At Itaú: automation, system integration and data pipelines in a corporate setting. Python, AWS (Glue, Athena, S3, Lambda), Power Automate and Power Apps.',
          'At startups: products from zero, legacy refactors and architecture calls. React, Next.js, React Native, Node.js, Laravel, PostgreSQL, MySQL, MongoDB.',
        ],
      },
      {
        id: 'stack',
        title: '## stack',
        lines: [
          'Front end & mobile: React, Next.js, React Native, Expo, TypeScript, Tailwind, FlutterFlow, Figma.',
          'Back end: Node.js, Express, Fastify, Laravel and PHP, REST APIs.',
          'Data: Python, SQL, PostgreSQL, MySQL, MongoDB, Supabase, Firebase.',
          'Cloud & automation: AWS (Glue, Athena, S3, Lambda, Amplify), Google Cloud Run, Power Automate, Power Apps.',
          'Academic base in Java (OOP) and C, which makes switching paradigms easier.',
        ],
        cap: ['The tools I reach for, sorted by layer.'],
        groups: { front: 'front & mobile', back: 'back end', data: 'data', cloud: 'cloud & automation' },
      },
      {
        id: 'built',
        title: '## where I worked & what I built',
        lines: [
          'Itaú Unibanco (2025–now): pipelines, integrations and automation on AWS and the Power Platform.',
          'Where2Go (w2go.com.br, 2024–2026): co-founder and technical reference. Built the marketplace from scratch, unified the legacy MySQL and PostgreSQL databases and split APIs into one layer. Before that, growth data engineer: Python ingestion and AI-based lead enrichment.',
          'UniStore (2024–2026): founder. A mobile marketplace for university communities with PIX via Mercado Pago. Also my thesis, on offline-first sync.',
          'AM Fernandes (2024): refactored and upgraded the front end, cutting the main dashboard render time by 56%, and built an internal dashboard for building status.',
          'Nova Finance: a finance dashboard for accounting firms. SaborBrasil: a restaurant site with table reservations.',
        ],
        cap: ['Six of them, pinned to the wall. Each note is a link.'],
      },
      {
        id: 'next',
        title: '## how I work',
        lines: [
          'Data and software to solve real-world problems: mapping the process, finding where it hurts, and applying the right technology.',
          'Sometimes that is a site or an app, sometimes a data analysis, sometimes modernizing the systems that are already there.',
        ],
      },
      {
        id: 'hello',
        title: '## say hi',
        lines: ['Open to talks about data, architecture, or a product you want to get off the ground.'],
        links: [
          { label: 'LinkedIn', href: links.linkedin },
          { label: 'GitHub', href: links.github },
          { label: 'Email', href: links.email },
          { label: 'CV (pdf)', href: links.cv },
        ],
      },
    ],
  },

  pt: {
    ui: { read: 'ler como texto', watch: 'ver o filme', download: 'baixar .md', scroll: 'role', top: '# topo', open: 'abrir ↗', skip: 'Pular para o texto', system: '// mapear o processo, achar a dor', wires: ['mapa', 'dor', 'solução', 'entrega'] },
    meta: {
      name: 'Erick Augusto',
      file: 'ERICK.md',
      date: 'NOV 2026',
      description: 'Um readme do humano por trás dos commits. Data analytics & software engineer no Itaú Unibanco.',
      tagline: ['> um readme do humano por trás dos commits.', '> não é currículo. não é pitch deck.', '> escrito no Grajaú, São Paulo, depois do expediente.'],
    },
    chapters: [
      {
        id: 'who',
        title: '## quem',
        lines: [
          'Data Analytics & Software Engineer no Itaú Unibanco. Entrei como estagiário em nov/2025 e sou Data Analytics Jr. desde junho de 2026.',
          '23 anos, do Grajaú, zona sul de São Paulo. Ciência da Computação na UFABC, já bacharel em Ciência e Tecnologia.',
          'Prêmio de Honra ao Mérito Acadêmico Frederick Winslow Taylor e menção honrosa no Simpósio de Iniciação Científica da UFABC.',
        ],
        cap: [
          'Data Analytics & Software Engineer no Itaú Unibanco. Estagiário em 2025, Jr. desde junho de 2026.',
          '23 anos, do Grajaú, zona sul de São Paulo. Ciência da Computação na UFABC.',
        ],
      },
      {
        id: 'does',
        title: '## o que eu faço de verdade',
        lines: [
          'No Itaú: automação, integração de sistemas e pipelines de dados em ambiente corporativo. Python, AWS (Glue, Athena, S3, Lambda), Power Automate e Power Apps.',
          'Em startups: produtos do zero, refatoração de legado e decisões de arquitetura. React, Next.js, React Native, Node.js, Laravel, PostgreSQL, MySQL, MongoDB.',
        ],
      },
      {
        id: 'stack',
        title: '## stack',
        lines: [
          'Front-end e mobile: React, Next.js, React Native, Expo, TypeScript, Tailwind, FlutterFlow, Figma.',
          'Back-end: Node.js, Express, Fastify, Laravel e PHP, APIs REST.',
          'Dados: Python, SQL, PostgreSQL, MySQL, MongoDB, Supabase, Firebase.',
          'Cloud e automação: AWS (Glue, Athena, S3, Lambda, Amplify), Google Cloud Run, Power Automate, Power Apps.',
          'Base acadêmica em Java (POO) e C, o que facilita transitar entre paradigmas.',
        ],
        cap: ['As ferramentas que eu uso, separadas por camada.'],
        groups: { front: 'front & mobile', back: 'back-end', data: 'dados', cloud: 'cloud & automação' },
      },
      {
        id: 'built',
        title: '## onde trabalhei e o que construí',
        lines: [
          'Itaú Unibanco (2025–hoje): pipelines, integrações e automações em AWS e Power Platform.',
          'Where2Go (w2go.com.br, 2024–2026): co-founder e referência técnica do time. Construí o marketplace do zero, unifiquei os bancos MySQL e PostgreSQL legados e consolidei as APIs numa camada só. Antes disso, growth data engineer: ingestão em Python e enriquecimento de leads com IA.',
          'UniStore (2024–2026): founder. Marketplace mobile para comunidades universitárias, com PIX via Mercado Pago. Também foi meu TCC, sobre sincronização offline-first.',
          'AM Fernandes (2024): refatorei e atualizei o front-end, reduzindo em 56% o tempo de renderização do dashboard principal, e criei um dashboard interno de status das obras.',
          'Nova Finance: dashboard financeiro para escritórios de contabilidade. SaborBrasil: site de restaurante com reserva de mesas.',
        ],
        cap: ['Seis deles, pregados na parede. Cada post-it é um link.'],
      },
      {
        id: 'next',
        title: '## como eu trabalho',
        lines: [
          'Dados e desenvolvimento de software para resolver problemas do mundo real: mapear o processo, encontrar onde dói e aplicar a tecnologia certa.',
          'Às vezes é um site ou um aplicativo, às vezes uma análise de dados, às vezes modernizar os sistemas que já existem.',
        ],
      },
      {
        id: 'hello',
        title: '## bora conversar',
        lines: ['Aberto a conversas sobre dados, arquitetura ou um produto que você quer tirar do papel.'],
        links: [
          { label: 'LinkedIn', href: links.linkedin },
          { label: 'GitHub', href: links.github },
          { label: 'Email', href: links.email },
          { label: 'CV (pdf)', href: links.cv },
        ],
      },
    ],
  },
};

export const projectsFor = (lang) => projects.map((p) => ({ ...p, tag: p.tag[lang] }));

export function toMarkdown(lang) {
  const { meta, chapters } = content[lang];
  const out = [`# ${meta.file}`, '', `${meta.name} · ${meta.date}`, '', ...meta.tagline, ''];
  for (const c of chapters) {
    out.push(c.title, '');
    c.lines.forEach((l) => out.push(l, ''));
    (c.links || []).forEach((l) => out.push(`- [${l.label}](${l.href.replace('mailto:', '')})`));
    if (c.links) out.push('');
  }
  return out.join('\n');
}
