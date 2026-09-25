export type Lang = 'zh' | 'en';

export const translations = {
  zh: {
    nav: {
      about: '关于',
      projects: '项目',
      research: '研究',
      awards: '获奖',
    },
    hero: {
      tags: '数字艺术 · 设计研究 · AIGC',
      greeting: '你好，我是',
      name: '章媛',
      subtitle1: 'AI游戏',
      subtitle2: '交互叙事',
      description:
        '融合游戏化机制与反思设计，在轻松的日常体验中，为用户提供有支撑感的陪伴与自我觉察。',
      viewWork: '查看作品',
      aboutMe: '关于我',
    },
    about: {
      label: '关于',
      title: '个人简介',
      education: '教育背景',
      interests: '兴趣与方向',
      researchFocus: '研究方向',
      researchDesc:
        '研究聚焦于 AI 与交互技术如何促进心理幸福感。致力于创造非入侵式、有情绪支撑的数字体验，帮助用户在日常生活中找到平静与意义。',
      researchTags: ['AI游戏', '交互叙事', '人机交互', '反思设计'],
      edu: [
        {
          school: '中国传媒大学',
          degree: '数字艺术 博士',
          period: '2023.09 - 至今',
          detail: '动画与数字艺术学院 · 二等学业奖学金',
        },
        {
          school: '中国传媒大学',
          degree: '数字媒体艺术 硕士',
          period: '2020.09 - 2023.06',
          detail: '动画与数字艺术学院 · 星光奖学金、二等学业奖学金',
        },
        {
          school: '北京语言大学',
          degree: '国际事务与国际关系 本科',
          period: '2015.07 - 2019.06',
          detail: '国际关系学院 · 汉语国际教育双学位',
        },
      ],
      interestItems: [
        { label: '插画创作', icon: '🎨' },
        { label: '交互艺术', icon: '✨' },
        { label: 'AIGC艺术', icon: '🤖' },
        { label: '趣味开发', icon: '💡' },
      ],
    },
    projects: {
      label: '作品集',
      title: '创作项目',
      desc: '涵盖游戏设计、AI 产品、AIGC 艺术、动画和展览设计等多元创作。',
      showDetails: '查看详情',
      close: '关闭',
      role: '角色',
      techStack: '技术栈',
      highlights: '核心亮点',
      outcomes: '项目成果',
      viewProject: '项目报道',
    },
    research: {
      label: '学术',
      title: '研究成果',
    },
    awards: {
      label: '荣誉',
      title: '获奖经历',
    },
    footer: {
      tagline: '数字艺术创作者 · 设计研究者',
      subtitle: '探索 AI、交互与幸福的交汇点。',
    },
  },
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      research: 'Research',
      awards: 'Awards',
    },
    hero: {
      tags: 'Digital Art · Design Research · AIGC',
      greeting: "Hi, I'm",
      name: 'Zhang Yuan',
      subtitle1: 'AI Games',
      subtitle2: 'Interactive Narrative',
      description:
        'Blending playful mechanics and reflective design, we bring supportive companionship and quiet self-awareness into easy, everyday experiences.',
      viewWork: 'View My Work',
      aboutMe: 'About Me',
    },
    about: {
      label: 'About',
      title: 'A brief introduction',
      education: 'Education',
      interests: 'Interests & Focus',
      researchFocus: 'Research Focus',
      researchDesc:
        'My research explores how AI and interactive technologies can promote psychological well-being. I focus on creating non-intrusive, emotionally supportive digital experiences that help users find calm and meaning in their daily lives.',
      researchTags: ['AI Games', 'Interactive Narrative', 'HCI', 'Reflection Design'],
      edu: [
        {
          school: 'Communication University of China',
          degree: 'Ph.D. in Digital Art',
          period: '2023.09 - Present',
          detail: 'School of Animation and Digital Arts · Second-class Academic Scholarship',
        },
        {
          school: 'Communication University of China',
          degree: 'M.A. in Digital Media Art',
          period: '2020.09 - 2023.06',
          detail: 'School of Animation and Digital Arts · Star Scholarship & Second-class Academic Scholarship',
        },
        {
          school: 'Beijing Language and Culture University',
          degree: 'B.A. in International Affairs',
          period: '2015.07 - 2019.06',
          detail: 'School of International Relations · Minor in Teaching Chinese to Speakers of Other Languages',
        },
      ],
      interestItems: [
        { label: 'Illustration', icon: '🎨' },
        { label: 'Interactive Art', icon: '✨' },
        { label: 'AIGC Art', icon: '🤖' },
        { label: 'Creative Dev', icon: '💡' },
      ],
    },
    projects: {
      label: 'Portfolio',
      title: 'Creative Projects',
      desc: 'A collection spanning game design, AI products, AIGC art, animation, and exhibition design.',
      showDetails: 'View Details',
      close: 'Close',
      role: 'Role',
      techStack: 'Tech Stack',
      highlights: 'Key Highlights',
      outcomes: 'Outcomes',
      viewProject: 'Project Report',
    },
    research: {
      label: 'Academic',
      title: 'Research & Publications',
    },
    awards: {
      label: 'Recognition',
      title: 'Awards & Honors',
    },
    footer: {
      tagline: 'Digital Art Creator · Design Researcher',
      subtitle: 'Exploring the intersection of AI, interaction, and well-being.',
    },
  },
} as const;

export type Translations = typeof translations;
export type LangKey = keyof Translations['zh'];
