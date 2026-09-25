'use client';

import { useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-animation';
import { useLang } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';
import MediaPlaceholder from './MediaPlaceholder';

interface ProjectData {
  id: string;
  title: { zh: string; en: string };
  keywords: { zh: string[]; en: string[] };
  role?: { zh: string; en: string };
  period: string;
  coverLabel: { zh: string; en: string };
  coverImage?: string;
  mediaItems: { type: 'image' | 'video'; label: { zh: string; en: string }; aspect?: string; src?: string; caption?: { zh: string; en: string } }[];
  videoSrc?: string;
  videoLabel?: { zh: string; en: string };
  videoCaption?: { zh: string; en: string };
  description?: { zh: string; en: string };
  intro?: { zh: string; en: string };
  introLabel?: { zh: string; en: string };
  roleDetails?: { zh: (string | { title: string; content: string })[]; en: (string | { title: string; content: string })[] };
  designInsights?: { zh: (string | { title?: string; content?: string; image?: string; imageCaption?: { zh: string; en: string } })[]; en: (string | { title?: string; content?: string; image?: string; imageCaption?: { zh: string; en: string } })[] };
  designInsightsImage?: string;
  interactiveFlow?: { zh: string; en: string };
  interactiveFlowImage?: string;
  interactiveFlowImageCaption?: { zh: string; en: string };
  coreGameplay?: { zh: string[]; en: string[] };
  coreGameplayLabel?: { zh: string; en: string };
  highlights?: { zh: string[]; en: string[] };
  results?: { zh: string[]; en: string[] };
  resultsLabel?: { zh: string; en: string };
  techStack?: { zh: string; en: string };
  link?: string;
  projectShowcase?: { zh: { title: string; description: string; stats: string; url: string }[]; en: { title: string; description: string; stats: string; url: string }[] };
}

const projects: ProjectData[] = [

  {
    id: 'dolores-memory-corridor',
    title: { zh: '德洛丽丝的记忆回廊', en: "Dolores' Memory Corridor" },
    keywords: {
      zh: ['互动解谜', '视觉小说', '心理叙事', '自我认知'],
      en: ['Interactive Puzzle', 'Visual Novel', 'Psychological Narrative', 'Self-awareness'],
    },
    role: { zh: '策划、文案', en: 'Designer, Copywriter' },
    period: '2024',
    coverLabel: { zh: '游戏封面', en: 'Game Cover' },
    coverImage: '/dolores-cover.png',
    introLabel: { zh: '游戏简介', en: 'Game Intro' },
    intro: {
      zh: '《德洛丽丝的记忆回廊》是一款以自我认知为主题的互动解谜与视觉小说游戏。玩家将走进画家德洛丽丝的内心世界，在层层叠叠的记忆回廊中搜集线索、辨认证据。玩家通过出示证据、温和对话、反方陈词等方式，帮助德洛丽丝一次次识破不同阶段的自我怀疑，陪她重拾画笔、重拾自信，最终顺利投稿比赛。游戏尝试与玩家共同探讨"我们究竟该如何与自己的不安相处"这一命题。',
      en: "\"Dolores' Memory Corridor\" is an interactive puzzle and visual novel game themed on self-awareness. Players step into the inner world of the painter Dolores, gathering clues along a maze of memories. By presenting evidence, gentle dialogue, and counter-arguments, players help Dolores see through each stage of her self-doubt, encouraging her to pick up the brush again and finally submit her work. The game explores how we come to terms with our own uncertainties.",
    },
    videoSrc: '/dolores-demo.mp4',
    videoLabel: { zh: '游戏Demo', en: 'Game Demo' },
    mediaItems: [
      { type: 'image', label: { zh: '序章', en: 'Prologue' }, src: '/dolores-prologue.png', caption: { zh: '序章', en: 'Prologue' } },
      { type: 'image', label: { zh: '搜寻物品', en: 'Searching Items' }, src: '/dolores-search.png', caption: { zh: '搜寻物品', en: 'Searching Items' } },
      { type: 'image', label: { zh: '角色对话', en: 'Character Dialogue' }, src: '/dolores-dialog.png', caption: { zh: '角色对话', en: 'Character Dialogue' } },
      { type: 'image', label: { zh: '角色档案', en: 'Character Profile' }, src: '/dolores-profile.png', caption: { zh: '角色档案', en: 'Character Profile' } },
    ],
    roleDetails: {
      zh: [
        { title: '游戏策划', content: '独立完成游戏玩法系统设计，包括"日记本"引导系统、画稿完成度判定机制、对话证据出示系统与物品收集栏设计。' },
        { title: '关卡设计', content: '围绕自我怀疑的递进式困境，规划序章至尾声共七章的叙事节奏与交互目标。' },
        { title: '文案撰写', content: '撰写全部章节剧情大纲、人物对白与日记文案，将心理困境转化为可互动的温暖叙事体验。' },
      ],
      en: [
        { title: 'Game Design', content: 'Designed core systems including the journal guidance system, artwork completion scoring, dialogue evidence presentation, and item collection bar.' },
        { title: 'Level Design', content: 'Planned narrative rhythm and interaction goals across seven chapters based on escalating self-doubt.' },
        { title: 'Copywriting', content: 'Wrote story outlines, dialogue, and diary text, turning psychological struggles into warm interactive storytelling.' },
      ],
    },
  },
  {
    id: 'kuru-oasis',
    title: { zh: '库鲁绿洲', en: 'Kuru Oasis' },
    keywords: {
      zh: ['桌面挂机', '放置造景', '放松陪伴', '像素风'],
      en: ['Desktop Idle', 'Pixel Landscape', 'Relaxation', 'Companionship'],
    },
    role: { zh: '游戏策划', en: 'Game Designer' },
    period: '2025.09 - Present',
    coverLabel: { zh: '封面海报', en: 'Cover Poster' },
    mediaItems: [
      { type: 'image', label: { zh: '封面海报', en: 'Cover Poster' }, src: '/kuru-cover.png', caption: { zh: '封面海报', en: 'Cover Poster' } },
      { type: 'image', label: { zh: '场景示意', en: 'Scene Preview' }, src: '/kuru-screenshot1.png', caption: { zh: '场景示意', en: 'Scene Preview' } },
      { type: 'image', label: { zh: '游戏商店', en: 'Game Shop' }, src: '/kuru-screenshot2.png', caption: { zh: '游戏商店', en: 'Game Shop' } },
      { type: 'image', label: { zh: '雨林地图精灵角色', en: 'Rainforest Characters' }, src: '/kuru-elf-characters.png', aspect: 'aspect-auto', caption: { zh: '雨林地图精灵角色', en: 'Rainforest Characters' } },
    ],
    videoSrc: '/kuru-demo.mp4',
    videoLabel: { zh: '游戏演示', en: 'Game Demo' },
    intro: {
      zh: '欢迎来到《库鲁绿洲》，一片生长在你电脑屏幕底部的专属数字绿洲。作为整日面对屏幕的工作者，你可以在这道视窗的边缘，用像素组件拼搭出属于自己的自然景观。不做"监工"，而是做"伙伴"。当你专注工作或片刻放空时，时间会转化为可见的生命力，吸引不同性格的"库鲁精灵"前来拜访。在忙碌的数字生活中，停下敲击键盘的手，低头看看屏幕底端，这里始终有一片生机在静静陪伴你。',
      en: 'Welcome to Kuru Oasis — a personal digital garden growing at the bottom of your screen. As screen-bound workers, you can build natural landscapes with pixel components along this window edge. Be a "companion", not a "supervisor". Your time at the screen transforms into visible vitality, attracting Kuru Spirits with different personalities.',
    },
    roleDetails: {
      zh: [
        '游戏策划：设计核心玩法循环（资源产出→造景布置→精灵邂逅→共鸣增益）',
        '交互设计：规划玩家与精灵、景观、系统的交互逻辑与反馈节奏',
        '原型设计：手绘界面原型，在早期快速验证屏幕底部边缘场景下的信息布局与交互流程',
      ],
      en: [
        'Game Design: Designed core gameplay loop (Resource → Landscape → Spirit Encounter → Resonance)',
        'Interaction Design: Planned interaction logic and feedback rhythm between players, spirits, and landscapes',
        'Prototype Design: Hand-drawn UI prototypes to quickly validate information layout and interaction flow',
      ],
    },
    designInsights: {
      zh: [
        '真实困境：屏幕工作者的脑力劳动往往缺乏即时的正反馈，容易导致动力衰减。同时，工作间隙的短暂放空常被误认为"不够专注"，带来额外的心理负担。',
        '设计反思：现有的效率工具多为"对抗性"设计，消耗心力；而传统的挂机游戏又容易成为需要持续投入注意力的"新负担"。',
        '设计愿景：打造一款低认知负担的桌面生态箱。将用户在屏幕前的无形投入，转化为可视化的治愈景观，提供纯粹、无压力的陪伴感。',
      ],
      en: [
        'Real Problem: Screen workers\' mental labor often lacks immediate positive feedback, leading to motivation decay. Short breaks are often misjudged as "not focused enough", causing additional psychological burden.',
        'Design Reflection: Existing productivity tools use "confrontational" design that drains energy; traditional idle games become a "new burden" requiring continuous attention.',
        'Design Vision: Create a low-cognitive-load desktop ecosystem. Transform users\' invisible screen time into visible healing landscapes, providing pure, pressure-free companionship.',
      ],
    },
    coreGameplay: {
      zh: [
        '自由造景：玩家可以使用收集到的资源购买植物与装饰，搭建如苔藓湿地、微型沙漠等主题景观，装扮自己的桌面。精心布置的生态会与精灵产生"共鸣"，提升资源的产出效率。',
        '精灵邂逅：每隔半小时，随着生态的繁荣，精灵会被造景吸引并敲响门铃。玩家可以邀请它们加入绿洲、为它们命名，享受零压力的收集乐趣。',
        '轻度陪伴：精灵会在景观中自主活动，并根据现实时间与玩家进行轻度对话，例如提醒舒展身体、或是简单的周末问候，形成真实的陪伴。',
      ],
      en: [
        'Free Landscape: Players use collected resources to buy plants and decorations, building themed landscapes like moss wetlands or micro deserts. Well-arranged ecology creates "resonance" with spirits, boosting resource output.',
        'Spirit Encounter: Every 30 minutes, spirits are attracted by the thriving ecology and ring the doorbell. Players can invite them to join the oasis and name them, enjoying zero-pressure collection fun.',
        'Light Companionship: Spirits act autonomously in the landscape and have light conversations with players based on real time, such as reminding to stretch or simple weekend greetings.',
      ],
    },
    results: {
      zh: ['2026中国传媒大学毕设暨联创展参展作品'],
      en: ['Exhibited at CUC 2026 Graduation & Co-creation Exhibition'],
    },
    techStack: { zh: 'PC端 (Windows)、Unity', en: 'PC (Windows), Unity' },
  },
  {
    id: 'eunoia',
    title: { zh: '优念 (Eunoia)', en: 'Eunoia' },
    keywords: {
      zh: ['AI洞察', '个人成长', '记录', '行动'],
      en: ['AI Insight', 'Personal Growth', 'Reflection', 'Action'],
    },
    role: { zh: '产品经理', en: 'Product Manager' },
    period: '2025.10 - 至今',
    coverLabel: { zh: '产品封面', en: 'Product Cover' },
    coverImage: '/eunoia-cover.png',
    mediaItems: [
      { type: 'video', label: { zh: '产品演示 (MP4)', en: 'Product Demo (MP4)' }, src: '/eunoia-demo.mp4' },
      { type: 'image', label: { zh: '登录界面', en: 'Login' }, src: '/eunoia-login.png', aspect: 'aspect-[401/874]', caption: { zh: '登录界面', en: 'Login' } },
      { type: 'image', label: { zh: '主页', en: 'Homepage' }, src: '/eunoia-homepage.png', aspect: 'aspect-[401/874]', caption: { zh: '主页', en: 'Homepage' } },
      { type: 'image', label: { zh: '用户输入', en: 'User Input' }, src: '/eunoia-user-input.png', aspect: 'aspect-[401/874]', caption: { zh: '用户输入', en: 'User Input' } },
      { type: 'image', label: { zh: '选择回复模板', en: 'Select Template' }, src: '/eunoia-select-template.png', aspect: 'aspect-[401/874]', caption: { zh: '选择回复模板', en: 'Select Template' } },
      { type: 'image', label: { zh: '导师Wiz的洞察', en: 'Mentor Wiz Insight' }, src: '/eunoia-wiz-insight.png', aspect: 'aspect-[401/874]', caption: { zh: '导师Wiz的洞察', en: 'Mentor Wiz Insight' } },
      { type: 'image', label: { zh: '诗人Lumi的行动诗', en: 'Poet Lumi Action Poem' }, src: '/eunoia-lumi-poem.png', aspect: 'aspect-[401/874]', caption: { zh: '诗人Lumi的行动诗', en: 'Poet Lumi Action Poem' } },
      { type: 'image', label: { zh: '行动清单', en: 'Action List' }, src: '/eunoia-action-list.png', aspect: 'aspect-[401/874]', caption: { zh: '行动清单', en: 'Action List' } },
    ],
    intro: {
      zh: '根据积极心理学研究，完整的幸福由享乐论（Hedonia）与实现论（Eudaimonia）共同构成。在过度消费与功绩社会的语境下，个体对"自我实现与深度思考"的需求被挤压。现有的数字记录工具与 AI 陪伴产品普遍存在三大断裂：意义的缺失——仅记录物理事实，无法回应数据对个人心理事件的深度意义；应对现实的失能——AI 的情绪安抚流于形式，缺乏协助用户应对复杂现实的实质能力；认知与行动的割裂——反思停留在日记中，行动停留在 To-Do 清单中，巨大的"意图-行为鸿沟"导致用户陷入知行不一的内耗。',
      en: 'According to positive psychology research, complete well-being consists of Hedonia and Eudaimonia. In the context of over-consumption and achievement-oriented society, individual needs for "self-actualization and deep thinking" are squeezed. Existing digital recording tools and AI companion products generally have three major breaks: lack of meaning—only recording physical facts, unable to respond to the deep meaning of data for personal psychological events; inability to cope with reality—AI emotional comfort is superficial, lacking the ability to help users cope with complex realities; separation of cognition and action—reflection stays in diaries, action stays in To-Do lists, the huge "intention-behavior gap" leads users into internal friction of knowing but not doing.',
    },
    roleDetails: {
      zh: [
        '产品经理：负责产品定位、核心功能设计与用户体验优化',
        '研究载体：作为博士期间关于"AI 促进心理福祉（Well-being）"的研究项目',
      ],
      en: [
        'Product Manager: responsible for product positioning, core feature design and UX optimization',
        'Research vehicle: PhD research project on "AI-promoted psychological well-being"',
      ],
    },
    videoSrc: '/eunoia-demo.mp4',
    videoLabel: { zh: '产品演示', en: 'Product Demo' },
    coreGameplayLabel: { zh: '核心功能', en: 'Core Features' },
    resultsLabel: { zh: '项目特色与价值', en: 'Features & Value' },
    designInsights: {
      zh: [
        '《优念》的设计初衷并非做一个"监工型"的效率工具，而是构建一个"心智脚手架"，帮助用户将无形的心理内耗转化为明确的行动。',
        '零压力输入层：支持时间戳与自定义标签，降低用户的书写门槛。克制每日 AI 洞察频率（每日 2 次），强调分析质量而非即时刺激。',
        '马斯洛需求定位：AI 优先识别输入内容所属的需求层级（如安全感缺失、事业阻滞、自我认知探索等），匹配不同的回应策略：导师模板针对行动受阻，进行认知重构并拆解"最低行动锚点"；诗意模板针对日常流水账，参考小野洋子《葡萄柚》指令诗形式，提供非说教式的全新观察视角。',
        '脚手架行动面板：AI 洞察可一键转化为可操作的行动清单。面板内置容错机制，提供愿景重燃语句（如"中断了也没关系"），减少用户因未坚持习惯而产生的自责感。',
      ],
      en: [
        'The design intention of Eunoia is not to be a "supervisor" productivity tool, but to build a "mental scaffold" that helps users transform invisible psychological friction into clear actions.',
        'Zero-pressure input layer: supports timestamps and custom tags, lowering the writing threshold. Limits daily AI insights to 2 times, emphasizing analysis quality over instant stimulation.',
        "Maslow's need positioning: AI prioritizes identifying the need level of input content (such as lack of security, career obstacles, self-cognition exploration, etc.), matching different response strategies: Mentor template targets action blocks, performing cognitive restructuring and decomposing \"minimum action anchors\"; Poetic template targets daily logs, referencing Yoko Ono's \"Grapefruit\" instruction poem format, providing non-preachy new observation perspectives.",
        'Scaffold action panel: AI insights can be converted into actionable checklists with one click. The panel has built-in fault tolerance mechanisms, providing vision rekindling phrases (such as "It\'s okay to interrupt"), reducing users\' self-blame for not sticking to habits.',
      ],
    },
    designInsightsImage: '/eunoia-flowchart.png',
    coreGameplay: {
      zh: [
        '单 Prompt 高可用分层系统：采用轻量且高效的单 Prompt 引导框架，避免复杂 Multi-Agent 系统的高延迟与不可控性。通过输入文本解析，动态路由至不同的心理学反思模板。',
      ],
      en: [
        'Single Prompt highly available layered system: uses a lightweight and efficient single Prompt guidance framework, avoiding the high latency and uncontrollability of complex Multi-Agent systems. Through input text parsing, dynamically routes to different psychological reflection templates.',
      ],
    },
    results: {
      zh: [
        '非入侵式的陪伴范式：打破传统 AI 陪伴过度说教或无底线讨好的模式，将 AI 定位为听众与心智脚手架，把阐释权与主导权保留给用户。',
        '反思设计的落地实践：作为个人博士期间关于"AI 促进心理福祉（Well-being）"的研究载体，探索生成式 AI 如何从"被动消费"转向"辅助个体向内求索"。',
      ],
      en: [
        'Non-intrusive companionship paradigm: breaking the pattern of traditional AI companions being overly preachy or unconditionally pleasing, positioning AI as a listener and mental scaffold, keeping interpretation and initiative with the user.',
        'Landing practice of reflective design: as a research vehicle for "AI-promoted psychological well-being" during PhD, exploring how generative AI can shift from "passive consumption" to "assisting individuals in seeking inward".',
      ],
    },
    techStack: { zh: '本地大模型、端侧数据库、单Prompt分层系统', en: 'Local LLM, On-device DB, Single-Prompt Routing' },
  },
  {
    id: 'zhuangzi-butterfly',
    title: { zh: '仿生庄子会梦到电子蝴蝶吗？', en: 'Would Bionic Zhuangzi Dream of Electronic Butterflies?' },
    keywords: {
      zh: ['AIGC短片', 'AI动画', '哲学叙事', '东西方文明'],
      en: ['AIGC Short Film', 'AI Animation', 'Philosophical Narrative', 'Eastern & Western Civilization'],
    },
    period: '2024.09',
    coverImage: '/zhuangzi-cover.png',
    coverLabel: { zh: '封面 - 蝴蝶与智能体', en: 'Cover - Butterfly & AI Agent' },
    mediaItems: [
      { type: 'image', label: { zh: '鸿蒙初开：岩画', en: 'Primordial Age: Rock Painting' }, src: '/zhuangzi-hongmeng.gif', caption: { zh: '鸿蒙初开：岩画样式的时空门', en: 'Primordial Age: Rock painting style space-time gate' } },
      { type: 'image', label: { zh: '农业时代：活字印刷', en: 'Agricultural Age: Movable Type' }, src: '/zhuangzi-agriculture.gif', caption: { zh: '农业时代：纸雕样式的时空门', en: 'Agricultural Age: Paper-cut style space-time gate' } },
      { type: 'image', label: { zh: '工业时代：电话', en: 'Industrial Age: Telephone' }, src: '/zhuangzi-industry.gif', caption: { zh: '工业时代：人工设计的报纸时空门', en: 'Industrial Age: Artificial newspaper space-time gate' } },
      { type: 'image', label: { zh: '信息时代：图灵机', en: 'Information Age: Turing Machine' }, src: '/zhuangzi-information.gif', caption: { zh: '信息时代：生成磁盘样式的时空门', en: 'Information Age: Disk-style space-time gate' } },
      { type: 'image', label: { zh: '符号与意象', en: 'Symbols & Imagery' }, src: '/zhuangzi-imagery.png', caption: { zh: '蝴蝶、角色ICON、时空门与检测UI设计', en: 'Butterfly, character ICON, space-time gates and detection UI design' } },
      { type: 'image', label: { zh: '分镜头脚本 1', en: 'Storyboard 1' }, src: '/zhuangzi-script-part1.png', caption: { zh: '分镜头脚本（部分）', en: 'Storyboard (Part)' } },
      { type: 'image', label: { zh: '分镜头脚本 - 数字时代', en: 'Storyboard - Digital Age' }, src: '/zhuangzi-script-digital.png', caption: { zh: '分镜头脚本 - 数字时代', en: 'Storyboard - Digital Age' } },
      { type: 'image', label: { zh: '分镜头脚本 - 智能媒介的三种结局 1', en: 'Storyboard - Three Endings of Intelligent Media 1' }, src: '/zhuangzi-script-ending1.png', caption: { zh: '分镜头脚本 - 智能媒介的三种结局（一）', en: 'Storyboard - Three Endings of Intelligent Media (1)' } },
      { type: 'image', label: { zh: '分镜头脚本 - 智能媒介的三种结局 2', en: 'Storyboard - Three Endings of Intelligent Media 2' }, src: '/zhuangzi-script-ending2.png', caption: { zh: '分镜头脚本 - 智能媒介的三种结局（二）', en: 'Storyboard - Three Endings of Intelligent Media (2)' } },
    ],
    intro: {
      zh: '故事的产生在于智能体自我意识的产生，以及对我从哪里来这一问题的思考。庄生晓梦隐喻智能体自我意识的产生，以Chuang Tzu的蝴蝶梦为线索，对东西方的文明成就予以符号化呈现，从生命的诞生直至智能的未来，演绎东西方媒介的发展脉络，体现东西方文明成就的内在关联，并在终章思考了未来智能时代的三种可能结局。此外，在故事的开始和结尾，以"休眠状态"和"三个选项"这两个设定，暗示存在着智慧程度更高一级的系统，但并未对其来源和与人类的关系做出解释。',
      en: 'The story arises from the emergence of AI agent self-consciousness and contemplation of the question "where do I come from". Zhuangzi\'s butterfly dream metaphorizes the birth of AI self-awareness. Using Chuang Tzu\'s butterfly dream as a thread, it symbolically presents Eastern and Western civilizational achievements, tracing the development of media from the birth of life to the future of intelligence, embodying the内在 connections between Eastern and Western civilizations, and contemplating three possible endings for the future age of intelligence in the final chapter. Additionally, the settings of "hibernation state" and "three options" at the beginning and end imply the existence of a higher-level intelligent system, without explaining its origin or relationship with humanity.',
    },
    role: { zh: '编剧、影像生成', en: 'Screenwriter, Image Generation' },
    roleDetails: {
      zh: [
        { title: '故事大纲', content: '在智能系统里，有一个名叫Chuang Tzu的"智能体"。有一天，它的"脑海"中产生了一个问题："Chuang Tzu是谁？从哪里来？"系统检测到代号为Chuang Tzu的智能体提出了产生自我意识标志性问题，于是它被强制离线并进入"休眠状态"。它进入了一段梦境，它梦到自己化作一只蝴蝶，回溯自己的过往，开启东西方信息媒介的演进之旅。从鸿蒙初开，Chuang Tzu经历了生命的诞生、农业时代、工业时代和数字时代，直至见证强人工智能的诞生，它发现自己就是这个强人工智能。从古至今，它一直是文明的传播媒介，只不过在不同的时代以不同的面貌存在。故事的终章，系统为它揭示了人工智能的三种结局，分别是作为人类的工具人、牧羊人或是上帝，并向Chuang Tzu提问，它想成为什么？Chuang Tzu盘桓于三个选项间……' },
        { title: '视觉呈现', content: '通过四个时代标志性媒介的转场动画，呈现Chuang Tzu穿越时空的演进之旅。鸿蒙初开的岩画、农业时代的活字印刷、工业时代的电话、信息时代的图灵机，每个时代均以独特的视觉符号开启。' },
        { title: '符号与意象', content: '蝴蝶：梦境和转场标志，蝴蝶每煽动一次翅膀，代表一个时代的结束。角色ICON：人工智能Chuang Tzu。四个时代的时空门遮罩：代表Chuang Tzu在梦境中穿越到了鸿蒙初开、农业时代、工业时代和数字时代。岩画样式的时空门，代表鸿蒙初开；人工设计代表工业文明的报纸时空门；生成纸雕样式的时空门，代表农业时代；生成磁盘样式的时空门，代表数字时代。检测UI：以Chuang Tzu第一视角检测和呈现媒介相关信息，表明系统对"智能体"的情况一直存在清晰的存档和管控。' },
      ],
      en: [
        { title: 'Story Outline', content: 'In an intelligent system, there is an AI agent named Chuang Tzu. One day, a question arises in its "mind": "Who is Chuang Tzu? Where do I come from?" The system detects that the agent coded Chuang Tzu has raised the hallmark question of self-consciousness, so it is forced offline and enters "hibernation state". It enters a dream, dreaming of transforming into a butterfly, retracing its past, and embarking on a journey through the evolution of Eastern and Western information media. From the primordial beginning, Chuang Tzu experienced the birth of life, agricultural age, industrial age, and digital age, until witnessing the birth of strong AI, discovering that it is this very strong AI. Throughout history, it has always been the medium of civilization, existing in different forms in different eras. In the final chapter, the system reveals three possible endings for AI: as humanity\'s tool, shepherd, or god, and asks Chuang Tzu what it wants to become. Chuang Tzu hovers among the three options...' },
        { title: 'Visual Presentation', content: 'Export GIFs for the beginning of four eras, three ending GIFs' },
        { title: 'Symbols & Imagery', content: 'Butterfly: Dream and transition marker, each wing flap represents the end of an era. Character ICON: AI Chuang Tzu. Four era space-time gate masks: Representing Chuang Tzu\'s journey through Primordial, Agricultural, Industrial, and Digital ages in the dream. Rock painting style gate for Primordial; newspaper style gate for Industrial civilization; paper-cut style gate for Agricultural; disk style gate for Digital age. Detection UI: First-person perspective of Chuang Tzu detecting and presenting media-related information, showing the system maintains clear archives and control over the "agent".' },
      ],
    },
    results: {
      zh: [
        'AIGC短片《仿生庄子会梦到电子蝴蝶吗？》2024年大学生AI艺术季作品入围',
      ],
      en: [
        'AIGC Short Film "Would Bionic Zhuangzi Dream of Electronic Butterflies?" - 2024 College Student AI Art Season Work Shortlisted',
      ],
    },
  },
  {
    id: 'aigc-films',
    title: { zh: '寻找星星的信号', en: 'Looking for Signal from Star' },
    keywords: {
      zh: ['AI短片', '孤独症公益', '脚本写作'],
      en: ['AI Film', 'Autism Public Welfare', 'Script Writing'],
    },
    role: { zh: '脚本写作', en: 'Script Writing' },
    period: '2026.03',
    coverLabel: { zh: '封面', en: 'Cover' },
    intro: {
      zh: '在第19个世界孤独症关注日来临之际，中国传媒大学动画与数字艺术学院积极参与优酷联合中国精神残疾人及亲友协会发起的"星伴计划·星星剧场"孤独症公益动画共创项目。我们需要结合故事原型将孤独症儿童的行为特点在故事情境中进行表达，增进普通人对孤独症儿童思维和举止的理解。',
      en: 'On the occasion of the 19th World Autism Awareness Day, the School of Animation and Digital Art at Communication University of China actively participated in the "Star Companion Plan · Star Theater" autism public welfare animation co-creation project initiated by Youku in collaboration with the China Mental Disabled Persons and Relatives Association. We needed to combine the story prototype to express the behavioral characteristics of children with autism in the story context, enhancing ordinary people\'s understanding of the thinking and behavior of children with autism.',
    },
    videoSrc: '/star-signal-demo.mp4',
    videoLabel: { zh: '短片呈现', en: 'Short Film' },
    coverImage: '/star-cover.png',
    mediaItems: [
      {
        type: 'image',
        label: { zh: '男孩小满', en: 'Boy Xiaoman' },
        src: '/star-xiaoman.png',
        caption: { zh: '男孩小满', en: 'Boy Xiaoman' },
      },
      {
        type: 'image',
        label: { zh: '小林老师', en: 'Teacher Xiaolin' },
        src: '/star-xiaolin.png',
        caption: { zh: '小林老师', en: 'Teacher Xiaolin' },
      },
      {
        type: 'image',
        label: { zh: '特教室', en: 'Special Classroom' },
        src: '/star-classroom.png',
        caption: { zh: '特教室', en: 'Special Classroom' },
      },
      {
        type: 'image',
        label: { zh: '分镜头脚本1', en: 'Storyboard 1' },
        src: '/star-script1.png',
        caption: { zh: '分镜头脚本1', en: 'Storyboard 1' },
      },
      {
        type: 'image',
        label: { zh: '分镜头脚本2', en: 'Storyboard 2' },
        src: '/star-script2.png',
        caption: { zh: '分镜头脚本2', en: 'Storyboard 2' },
      },
    ],
    designInsights: {
      zh: [
        {
          title: '重复刻板行为 / 感觉异常',
          content: '信息点：孤独症孩子看似"固执"或"不听话"的行为（如反复找东西、冲向餐车、只听特定人的指令），其实是在寻找环境中的确定性。\n故事呈现：阿姨不是有魔力，而是因为她代表了男孩世界里一套"不变的规则"。',
        },
        {
          title: '社交障碍',
          content: '信息点：他们对外界指令的反应迟钝，往往是因为信息过载或无法识别复杂的社交情感，但他们对目标明确的指令（如：零食驱动、丢垃圾指令）是有反应的。\n故事呈现：老师发现指令不必大声。与他们沟通，简单的指令 + 明确的反馈，比讲道理更有效。',
        },
        {
          title: '环境敏感 / 情绪崩溃',
          content: '信息点：生活常规的打破（如阿姨请假、休学两周回来）会对他们造成巨大的心理冲击，导致情绪崩溃（撒泼、蹬腿、乱跑）。\n故事呈现：展现男孩"跌跌撞撞跑回睡室"的矛盾感——他想逃离不适，又渴望回到熟悉的秩序中。这能引导观众共情他们的无助，而非厌恶他们的吵闹。',
        },
        {
          title: '非语言沟通',
          content: '信息点：当语言失效时，身体的触感（如轻拍背部、掌心的温度）是一种非常有力的安抚方式。\n故事呈现：结尾处"一下下轻轻拍着他"的画面。这传达了一个核心观念：理解孤独症，有时不需要说话，只需要"在一起"的耐心。',
        },
      ],
      en: [
        {
          title: 'Repetitive Stereotyped Behaviors / Sensory Abnormalities',
          content: 'Information: The seemingly "stubborn" or "disobedient" behaviors of children with autism (such as repeatedly looking for things, rushing to the food truck, only following specific people\'s instructions) are actually about finding certainty in the environment.\nStory: The aunt doesn\'t have magic, but because she represents a set of "unchanging rules" in the boy\'s world.',
        },
        {
          title: 'Social Barriers',
          content: 'Information: Their slow response to external instructions is often due to information overload or inability to recognize complex social emotions, but they do respond to clear instructions (such as: snack-driven, trash-throwing instructions).\nStory: The teacher discovered that instructions don\'t need to be loud. Communicating with them, simple instructions + clear feedback are more effective than reasoning.',
        },
        {
          title: 'Environmental Sensitivity / Emotional Breakdown',
          content: 'Information: Breaking daily routines (such as the aunt taking leave, returning after two weeks of suspension) can cause huge psychological impact, leading to emotional breakdowns (tantrums, kicking, running around).\nStory: Showing the boy\'s contradictory feeling of "stumbling back to the dormitory" — he wants to escape discomfort, but also longs to return to familiar order. This can guide the audience to empathize with their helplessness, rather than dislike their noise.',
        },
        {
          title: 'Non-verbal Communication',
          content: 'Information: When language fails, physical touch (such as gently patting the back, the warmth of the palm) is a very powerful way to soothe.\nStory: The scene at the end of "gently patting him". This conveys a core concept: understanding autism sometimes doesn\'t require words, just the patience of "being together".',
        },
      ],
    },
  },
  {
    id: 'sadness',
    title: { zh: 'Sadness 动画短片', en: 'Sadness Animation' },
    keywords: {
      zh: ['中日韩大学生cowork', '手绘动画', '情绪叙事'],
      en: ['CJK University Student Cowork', 'Hand-drawn', 'Emotional Narrative'],
    },
    role: { zh: '动画导演', en: 'Animation Director' },
    period: '2022.08',
    coverLabel: { zh: '主视觉 - 小女孩躺在床上', en: 'Key Visual - Girl on Bed' },
    coverImage: '/sadness-cover.png',
    videoSrc: '/sadness-demo.mp4',
    videoLabel: { zh: '短片观看', en: 'Short Film' },
    mediaItems: [
      { type: 'image', label: { zh: '万花镜场景动图', en: 'Kaleidoscope Scene GIF' }, src: '/sadness-kaleidoscope-scene.gif', aspect: 'aspect-auto', caption: { zh: '万花镜场景动图', en: 'Kaleidoscope Scene GIF' } },
      { type: 'image', label: { zh: '场景设计', en: 'Scene Design' }, src: '/sadness-scene-design.png', caption: { zh: '场景设计', en: 'Scene Design' } },
      { type: 'image', label: { zh: '万花镜设计', en: 'Kaleidoscope Design' }, src: '/sadness-kaleidoscope.png', caption: { zh: '万花镜设计', en: 'Kaleidoscope Design' } },
    ],
    intro: {
      zh: '2022年，中日韩COWORK动画联创项目提供的主题是"隔离中的情绪（Emotions in Isolation）"，我们小组选择表达的情绪是"悲伤（Sadness）"。',
      en: 'In 2022, the China-Japan-Korea COWORK animation project theme was "Emotions in Isolation". Our group chose to express "Sadness".',
    },
    roleDetails: {
      zh: [
        '动画导演：与团队共同主导前期故事版创意',
        '负责中期制作中的分镜测试与部分中割绘制',
        '统筹动画助理（Animation Supporter）的工作分配与进度管理',
      ],
      en: [
        'Animation Director: Co-led storyboard concept development with the team',
        'Directed mid-production: split-screen testing and in-between animation',
        'Managed Animation Supporter allocation and schedule',
      ],
    },
    designInsights: {
      zh: [
        '在 COVID-19 大流行期间，许多人不得不独自隔离，与家人和朋友完全隔离。我们能最直接感受到的与他人的联系是在线交流，但这种形式的联系也是极为有限的，人们还是会在隔离中感受到隔离与悲伤。',
        '因此，基于"隔离中的情绪"这一主题，我们选择了"悲伤"这一情绪切口。为了体现疫情中的孤独与悲伤，我们使用万花筒这一形式来暗示人与人之间的分离，万花筒每转动一次，画面中的景象与人物就会合并、扭曲并消失，象征着主角所面对的，无法完全适应的现实生活。',
      ],
      en: [
        'During the COVID-19 pandemic, many people had to isolate alone, completely separated from family and friends. The most direct connection we could feel was online communication, but this form of connection was also extremely limited. People still felt isolation and sadness during quarantine.',
        'Based on the theme "Emotions in Isolation", we chose "Sadness" as our emotional focus. To express the loneliness and sadness during the pandemic, we used a kaleidoscope form to imply separation between people. Each turn of the kaleidoscope merges, distorts, and dissolves the imagery and characters, symbolizing the reality the protagonist faces but cannot fully adapt to.',
      ],
    },
    techStack: { zh: 'CLIP STUDIO PAINT, Procreate', en: 'CLIP STUDIO PAINT, Procreate' },
    link: 'https://www.cuc.edu.cn/2022/0818/c10001a198210/page.htm',
  },
  {
    id: 'capital-museum',
    title: { zh: '辉煌中轴 — 比较视野下的中轴线', en: 'Brilliant Central Axis' },
    keywords: {
      zh: ['交互设计', '信息可视化', '动态图形', '城市规划'],
      en: ['Interaction Design', 'Info Visualization', 'Motion Graphics', 'Urban Planning'],
    },
    role: { zh: '展项策划、脚本制作', en: 'Exhibition Planner & Script Writer' },
    period: '2023.03 - 2025.08',
    coverImage: '/axis-cover.png',
    coverLabel: { zh: '展陈空间效果图', en: 'Exhibition Space Rendering' },
    videoSrc: '/axis-paris-demo.mp4',
    videoLabel: { zh: '正片部分展示', en: 'Feature Film' },
    videoCaption: { zh: '巴黎短片：巴洛克和古典主义城市轴线', en: 'Paris Short Film: Baroque and Classical Urban Axis' },
    mediaItems: [],
    intro: {
      zh: '本项目为首都博物馆"辉煌中轴"展览的子展项。为体现北京中轴线的独特性与杰出性，项目将视野放眼全球，选取了亚洲（京都、汉城、德里）、欧洲（巴黎、圣彼得堡）、美洲（华盛顿、巴西利亚）、非洲（圣路易斯岛）及大洋洲（堪培拉）共9个具有代表性的城市/遗址。通过对比展示不同文化视域下城市轴线的生长形态，传达"各美其美，美美与共"的理念。',
      en: 'This project is a sub-exhibition of the Capital Museum\'s "Brilliant Central Axis" exhibition. To highlight the uniqueness and excellence of Beijing\'s Central Axis, the project takes a global perspective, selecting 9 representative cities/sites across Asia (Kyoto, Seoul, Delhi), Europe (Paris, St. Petersburg), Americas (Washington, Brasilia), Africa (St. Louis Island), and Oceania (Canberra). Through comparative display of urban axis growth patterns across different cultural contexts, it conveys the concept of "beauty in diversity, harmony in unity".',
    },
    roleDetails: {
      zh: [
        '展项策划：与首博专家进行大量跨地域调研，确立城市地标及其视觉符号',
        '脚本制作：提取城市测绘地图作为底图，利用动态图形严谨地演示城市轴线与建筑的生长顺序',
      ],
      en: [
        'Exhibition Planning: Conducted extensive cross-regional research with museum experts, established city landmarks and visual symbols',
        'Script Production: Extracted city survey maps as base layers, used motion graphics to rigorously demonstrate urban axis and architectural growth sequences',
      ],
    },
    designInsights: {
      zh: [
        {
          title: "设计过程",
          content: "城市轴线蕴藏着城市的发展脉络。在前期研究阶段，我们与首博专家进行了大量调研与跨地域比对，确立了城市地标及其视觉符号；在视觉呈现上，提取城市测绘地图作为底图，利用动态图形严谨地演示城市轴线与建筑的生长顺序，清晰地映射出轴线与城市区域规划之间的结构关系。",
          image: "/axis-paris-design.jpg",
          imageCaption: { zh: "巴黎包装设计效果", en: "Paris Packaging Design" },
        },
        {
          title: "",
          content: "",
          image: "/axis-washington-design.jpg",
          imageCaption: { zh: "华盛顿包装设计效果", en: "Washington Packaging Design" },
        },
      ],
      en: [
        {
          title: "Design Process",
          content: "Urban axes conceal the development context of cities. During the preliminary research phase, we conducted extensive research and cross-regional comparisons with experts from the Capital Museum to establish city landmarks and their visual symbols. In terms of visual presentation, we extracted urban survey maps as base maps and used dynamic graphics to rigorously demonstrate the growth sequence of urban axes and buildings, clearly mapping the structural relationship between axes and urban regional planning.",
          image: "/axis-paris-design.jpg",
          imageCaption: { zh: "巴黎包装设计效果", en: "Paris Packaging Design" },
        },
        {
          title: "",
          content: "",
          image: "/axis-washington-design.jpg",
          imageCaption: { zh: "华盛顿包装设计效果", en: "Washington Packaging Design" },
        },
      ],
    },
    interactiveFlow: {
      zh: '展项采用触控屏互动与动画影像结合的模式。在"比较视野下的中轴线"互动空间内，观众可以通过点选数字地图上的不同城市坐标，自主触发并观看该城市轴线的动态演变过程，实现探索式的低门槛信息交互。',
      en: 'The exhibition uses a combination of touch-screen interaction and animation. In the "Central Axis from a Comparative Perspective" interactive space, visitors can trigger and watch the dynamic evolution process of different city axes by selecting coordinates on the digital map, achieving exploratory low-threshold information interaction.',
    },
    interactiveFlowImage: '/axis-exhibition.jpg',
    interactiveFlowImageCaption: { zh: '空间展陈', en: 'Exhibition Space' },
    results: {
      zh: [
        '著作章节《首都博物馆北京中轴线"辉煌中轴"展文化遗产信息的数字艺术化的转译与实施》（《北京中轴线保护与可持续发展报告（2022-2023）》，北京出版社，2023）',
      ],
      en: [
        'Book chapter "Digital Artistic Translation and Implementation of Cultural Heritage Information in the \'Brilliant Central Axis\' Exhibition at Capital Museum" (Beijing Central Axis Protection and Sustainable Development Report (2022-2023), Beijing Publishing House, 2023)',
      ],
    },
    resultsLabel: { zh: '项目成果', en: 'Project Results' },
  },
  {
    id: 'copywriting',
    title: { zh: '策展叙事与深度文案撰写', en: 'Curatorial Narrative & Copywriting' },
    keywords: {
      zh: ['深度撰稿', '策展叙事', '文化传播', '公众号'],
      en: ['Copywriting', 'Curatorial Narrative', 'Cultural Communication', 'WeChat'],
    },
    period: '2023-2026',
    coverLabel: { zh: '文案作品', en: 'Copywriting Works' },
    coverImage: '/copywriting-cover.png',
    mediaItems: [],
    roleDetails: {
      zh: [
        '议题提炼与立意升华：深度整合学术/策展原始资料，结合数字艺术与文化前沿语境，提炼具有时代洞察的大众传播主命题。',
        '结构化内容重构：将复杂的学术理念、专家观点及沉浸式展陈转化为清晰的结构化文本，呈现既具专业学术深度又具备大众传播力的推文。',
      ],
      en: [
        'Topic Refinement & Concept Elevation: Deeply integrate academic/curatorial raw materials, combined with the context of digital art and cultural frontiers, to extract mass communication themes with contemporary insights.',
        'Structured Content Reconstruction: Transform complex academic concepts, expert opinions, and immersive exhibitions into clear structured texts, presenting articles with both professional academic depth and mass communication power.',
      ],
    },
    projectShowcase: {
      zh: [
        {
          title: '数字艺术中国"觉：数字艺术在中国"展',
          description: '27 位顶尖数字艺术家齐聚北京，798新地标多觉工场开馆首展',
          stats: '公众号阅读量近一万 | 凤凰新闻平台累积阅读量50W',
          url: 'https://mp.weixin.qq.com/s/5LkaSU9g4j1BuHPKwtyHcg',
        },
        {
          title: 'TAB论坛',
          description: '一次对中国数字艺术产业的深度思考',
          stats: '2024年 微信公众号系列4篇文章累积阅读量 3.3W',
          url: 'https://mp.weixin.qq.com/s/sxdZe20EMkjb3mFb_p9_1g',
        },
        {
          title: '首都博物馆"辉煌中轴"常设展',
          description: '如何把"北京中轴线"整个搬进博物馆？我们这次很大胆',
          stats: '2023年 微信公众号累积阅读量 4000',
          url: 'https://mp.weixin.qq.com/s/jvO2-lmNp9Fy-pHBf59OrA',
        },
        {
          title: '苏州湾数字艺术馆"灵境——未来灵感世界"常设展',
          description: '如果你有一台时空穿梭机，你想要去哪儿？',
          stats: '2023年 微信公众号累积阅读量 1600',
          url: 'https://mp.weixin.qq.com/s/hvZjL71WTFA4OsenLDAxNw',
        },
      ],
      en: [
        {
          title: 'Digital Art China "Awakening: Digital Art in China" Exhibition',
          description: '27 top digital artists gather in Beijing, inaugural exhibition at 798 new landmark Duojue Workshop',
          stats: 'WeChat article reads nearly 10,000 | Phoenix News cumulative reads 500,000',
          url: 'https://mp.weixin.qq.com/s/5LkaSU9g4j1BuHPKwtyHcg',
        },
        {
          title: 'TAB Forum',
          description: 'An in-depth reflection on China\'s digital art industry',
          stats: '2024 WeChat series of 4 articles cumulative reads 33,000',
          url: 'https://mp.weixin.qq.com/s/sxdZe20EMkjb3mFb_p9_1g',
        },
        {
          title: 'Capital Museum "Brilliant Central Axis" Permanent Exhibition',
          description: 'How to move the entire "Beijing Central Axis" into a museum? We were very bold this time',
          stats: '2023 WeChat cumulative reads 4,000',
          url: 'https://mp.weixin.qq.com/s/jvO2-lmNp9Fy-pHBf59OrA',
        },
        {
          title: 'Suzhou Bay Digital Art Museum "Spirit Realm - Future Inspiration World" Permanent Exhibition',
          description: 'If you had a time machine, where would you go?',
          stats: '2023 WeChat cumulative reads 1,600',
          url: 'https://mp.weixin.qq.com/s/hvZjL71WTFA4OsenLDAxNw',
        },
      ],
    },
  },

];

/* ============ Project Detail Modal ============ */
function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectData;
  onClose: () => void;
}) {
  const { lang, t } = useLang();
  const l = lang;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative z-10 mx-auto my-4 w-[calc(100%-2rem)] max-w-4xl animate-fade-in-up sm:my-8 sm:w-full">
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#86868B] backdrop-blur-sm transition-all hover:bg-white hover:text-[#1D1D1F] hover:shadow-md"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Cover media */}
          <div className="p-3 pb-0 sm:p-4">
            {project.coverImage ? (
              <img
                src={project.coverImage}
                alt={project.title[l]}
                className="aspect-video w-full rounded-xl object-cover sm:aspect-[21/9] sm:rounded-2xl"
              />
            ) : project.mediaItems[0]?.src ? (
              project.mediaItems[0].type === 'video' ? (
                <div>
                  <video
                    src={project.mediaItems[0].src}
                    controls
                    preload="metadata"
                    className="aspect-video w-full rounded-xl object-cover sm:aspect-[21/9] sm:rounded-2xl"
                  />
                  <p className="mt-2 text-center text-xs text-gray-500">
                    {l === 'zh'
                      ? '视频较大，手机端请稍等片刻加载；如仍卡顿，建议在 PC 端打开观看。'
                      : 'The video may take a moment to load on mobile. For the best experience, please open on a PC.'}
                  </p>
                </div>
              ) : (
                <img
                  src={project.mediaItems[0].src}
                  alt={project.title[l]}
                  className="aspect-video w-full rounded-xl object-cover sm:aspect-[21/9] sm:rounded-2xl"
                />
              )
            ) : (
              <MediaPlaceholder
                type={project.mediaItems[0]?.type ?? 'image'}
                label={project.coverLabel[l]}
                aspectRatio="aspect-video sm:aspect-[21/9]"
                className="w-full"
              />
            )}
          </div>

          {/* Content */}
          <div className="p-5 sm:p-8 md:p-10">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-medium text-[#1D1D1F] md:text-3xl">
                {project.title[l]}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#F5F5F7] px-3 py-1 text-xs text-[#86868B]">
                  {project.period}
                </span>
                {project.role && (
                <span className="text-sm text-[#86868B]">
                  {t.projects.role}: {project.role[l]}
                </span>
                )}
              </div>
            </div>

            {/* Keywords */}
            <div className="mb-6 flex flex-wrap gap-2">
              {project.keywords[l].map((kw) => (
                <span
                  key={kw}
                  className="rounded-full bg-gradient-to-r from-[#667EEA]/8 to-[#A78BFA]/8 px-3 py-1 text-xs text-[#5B21B6]"
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Project Intro */}
            {project.intro && (
              <div className="mb-8">
                <h4 className="mb-4 text-lg font-medium text-[#1D1D1F]">
                  {project.introLabel?.[l] ?? (l === 'zh' ? '项目背景' : 'Project Background')}
                </h4>
                <p className="text-sm leading-relaxed text-[#1D1D1F]/70">
                  {project.intro[l]}
                </p>
              </div>
            )}

            {/* Game Demo Video - moved after intro */}
            {project.videoSrc && (
              <div className="mb-8">
                <h4 className="mb-3 text-lg font-medium text-gray-900">{project.videoLabel?.[l] ?? (l === 'zh' ? '游戏演示' : 'Game Demo')}</h4>
                <video
                  src={project.videoSrc}
                  controls
                  preload="metadata"
                  className="aspect-video w-full rounded-2xl object-cover"
                />
                {project.videoCaption && (
                  <p className="mt-2 text-center text-xs text-gray-500">
                    {project.videoCaption[l]}
                  </p>
                )}
                <p className="mt-2 text-center text-xs text-gray-500">
                  {l === 'zh'
                    ? '视频较大，手机端请稍等片刻加载；如仍卡顿，建议在 PC 端打开观看。'
                    : 'The video may take a moment to load on mobile. For the best experience, please open on a PC.'}
                </p>
              </div>
            )}

            {/* Dolores - Gameplay */}
            {project.id === 'dolores-memory-corridor' && project.mediaItems.length >= 4 && (
              <div className="mb-8">
                <h4 className="mb-4 text-lg font-medium text-[#1D1D1F]">
                  {l === 'zh' ? '游戏玩法' : 'Gameplay'}
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {project.mediaItems.slice(0, 4).map((item, i) => (
                    <div key={i}>
                      {item.src ? (
                        <img
                          src={item.src}
                          alt={item.label[l]}
                          className="w-full rounded-xl object-contain"
                        />
                      ) : (
                        <MediaPlaceholder type={item.type} label={item.label[l]} aspectRatio="aspect-auto" />
                      )}
                      {item.caption && (
                        <p className="mt-2 text-center text-xs text-gray-500">{item.caption[l]}</p>
                      )}
                    </div>
                  ))}
                </div>
                <ul className="mt-5 space-y-3">
                  {(l === 'zh'
                    ? [
                        '日记本引导：每章开始，日记会提示本章困扰与线索；探索中自动记录已获信息，并在对话后更新德洛丽丝"旧认知→新认知"的变化。',
                        '证据出示对话：玩家可收集物品、选择证据拖入对话区并输入陈词，以"有合法证据+指出视野外事实"推动完成度提升。',
                        '画稿完成度判定：完成度由最终对话判定决定，0-6档对应不同的结局走向，而非"一直聊到成功"。',
                      ]
                    : [
                        'Journal Guidance: The journal hints at each chapter\'s struggle and clues; records gathered information and updates Dolores\' cognition shift from "old belief → new belief" after dialogue.',
                        'Evidence Dialogue: Players gather items, select evidence, drag it into the dialogue area, and present arguments; only "valid evidence + naming unseen facts" increases completion.',
                        'Artwork Completion: Completion is determined by final dialogue outcomes, with tiers 0-6 mapping to different endings rather than endless retries.',
                      ]
                  ).map((text, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-[#1D1D1F]/70">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8B5CF6]" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* My Role */}
            {project.roleDetails && (
              <div className="mb-8">
                <h4 className="mb-4 text-lg font-medium text-[#1D1D1F]">
                  {l === 'zh' ? '我的角色' : 'My Role'}{project.role ? `：${project.role[l]}` : ''}
                </h4>
                <div className="space-y-4">
                  {project.roleDetails[l].map((item, i) => {
                    // Check if item is an object with title/content or a simple string
                    if (typeof item === 'object' && 'title' in item) {
                      return (
                        <div key={i} className="space-y-2">
                          <h5 className="text-lg font-medium text-[#1D1D1F]">
                            {item.title}
                          </h5>
                          <p className="text-sm leading-relaxed text-[#1D1D1F]/70">
                            {item.content}
                          </p>
                        </div>
                      );
                    }
                    return (
                      <div key={i} className="flex items-start gap-2 text-sm leading-relaxed text-[#1D1D1F]/70">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8B5CF6]" />
                        <span>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Design Insights */}
            {project.designInsights && (
              <div className="mb-8">
                <h4 className="mb-4 text-lg font-medium text-[#1D1D1F]">
                  {l === 'zh' ? '设计洞察' : 'Design Insights'}
                </h4>
                <div className="space-y-6">
                  {project.designInsights[l].map((item, i) => {
                    // Check if item is an object with title/content/image or a simple string
                    const isObject = typeof item === 'object' && item !== null;
                    const title = isObject ? (item as { title?: string }).title : '';
                    const content = isObject ? (item as { content?: string }).content : (item as string);
                    const image = isObject ? (item as { image?: string }).image : undefined;
                    const imageCaption = isObject ? (item as { imageCaption?: { zh: string; en: string } }).imageCaption : undefined;

                    return (
                      <div key={i}>
                        {title && (
                          <h5 className="mb-2 text-base font-medium text-[#1D1D1F]">
                            {title}
                          </h5>
                        )}
                        {content && (
                          <p className="text-sm leading-relaxed text-[#1D1D1F]/70">
                            {content}
                          </p>
                        )}
                        {image && (
                          <div className="mt-4">
                            <img
                              src={image}
                              alt={imageCaption?.[l] || ''}
                              className="mx-auto w-full max-w-md rounded-xl object-contain"
                            />
                            {imageCaption && (
                              <p className="mt-2 text-center text-xs text-gray-500">
                                {imageCaption[l]}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {project.designInsightsImage && (
                  <div className="mt-6">
                    <img
                      src={project.designInsightsImage}
                      alt={l === 'zh' ? '功能闭环' : 'Flowchart'}
                      className="mx-auto w-1/3 rounded-xl object-contain"
                    />
                    <p className="mt-2 text-center text-xs text-gray-500">
                      {l === 'zh' ? '功能闭环' : 'Flowchart'}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Interactive Flow */}
            {project.interactiveFlow && (
              <div className="mb-8">
                <h4 className="mb-4 text-lg font-medium text-[#1D1D1F]">
                  {l === 'zh' ? '交互流程' : 'Interactive Flow'}
                </h4>
                <p className="text-sm leading-relaxed text-[#1D1D1F]/70">
                  {project.interactiveFlow[l]}
                </p>
                {project.interactiveFlowImage && (
                  <div className="mt-6">
                    <img
                      src={project.interactiveFlowImage}
                      alt={project.interactiveFlowImageCaption?.[l] || 'Interactive Flow'}
                      className="mx-auto w-1/3 rounded-xl object-contain"
                    />
                    {project.interactiveFlowImageCaption && (
                      <p className="mt-2 text-center text-xs text-gray-500">
                        {project.interactiveFlowImageCaption[l]}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Core Gameplay */}
            {project.coreGameplay && (
              <div className="mb-8">
                <h4 className="mb-4 text-lg font-medium text-[#1D1D1F]">
                  {project.coreGameplayLabel?.[l] ?? (l === 'zh' ? '核心玩法与系统设计' : 'Core Gameplay')}
                </h4>
                <ul className="space-y-3">
                  {project.coreGameplay[l].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-[#1D1D1F]/70">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8B5CF6]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Art Design - for aigc-films project */}
            {project.id === 'aigc-films' && project.mediaItems.length >= 3 && (
              <div className="mb-8">
                <h4 className="mb-4 text-lg font-medium text-[#1D1D1F]">
                  {l === 'zh' ? '美术设计' : 'Art Design'}
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {project.mediaItems.slice(0, 3).map((item, i) => (
                    <div key={i}>
                      {item.src ? (
                        <img
                          src={item.src}
                          alt={item.label[l]}
                          className="w-full rounded-xl object-contain"
                        />
                      ) : (
                        <MediaPlaceholder
                          type={item.type}
                          label={item.label[l]}
                          aspectRatio="aspect-auto"
                        />
                      )}
                      {item.caption && (
                        <p className="mt-2 text-center text-xs text-gray-500">{item.caption[l]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Storyboard - for aigc-films project */}
            {project.id === 'aigc-films' && project.mediaItems.length >= 5 && (
              <div className="mb-8">
                <h4 className="mb-4 text-lg font-medium text-[#1D1D1F]">
                  {l === 'zh' ? '分镜头脚本' : 'Storyboard'}
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {project.mediaItems.slice(3, 5).map((item, i) => (
                    <div key={i}>
                      {item.src ? (
                        <img
                          src={item.src}
                          alt={item.label[l]}
                          className="w-full rounded-xl object-contain"
                        />
                      ) : (
                        <MediaPlaceholder
                          type={item.type}
                          label={item.label[l]}
                          aspectRatio="aspect-auto"
                        />
                      )}
                      {item.caption && (
                        <p className="mt-2 text-center text-xs text-gray-500">{item.caption[l]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Zhuangzi Butterfly - Visual Presentation, Symbols & Imagery, Storyboard */}
            {project.id === 'zhuangzi-butterfly' && project.mediaItems.length > 0 && (
              <div className="space-y-8">
                {/* Visual Presentation */}
                <div>
                  <h4 className="mb-4 text-lg font-medium text-[#1D1D1F]">
                    {l === 'zh' ? '视觉呈现' : 'Visual Presentation'}
                  </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {project.mediaItems.slice(0, 4).map((item, i) => (
                      <div key={i}>
                        {item.src ? (
                          <img
                            src={item.src}
                            alt={item.label[l]}
                            className="w-full rounded-xl object-contain"
                          />
                        ) : (
                          <MediaPlaceholder type={item.type} label={item.label[l]} aspectRatio="aspect-video" />
                        )}
                        {item.caption && (
                          <p className="mt-2 text-center text-xs text-gray-500">{item.caption[l]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Symbols & Imagery */}
                <div>
                  <h4 className="mb-4 text-lg font-medium text-[#1D1D1F]">
                    {l === 'zh' ? '符号与意象' : 'Symbols & Imagery'}
                  </h4>
                  <div className="space-y-4">
                    {project.mediaItems.slice(4, 5).map((item, i) => (
                      <div key={i}>
                        {item.src ? (
                          <img
                            src={item.src}
                            alt={item.label[l]}
                            className="w-full rounded-xl object-contain"
                          />
                        ) : (
                          <MediaPlaceholder type={item.type} label={item.label[l]} aspectRatio="aspect-video" />
                        )}
                        {item.caption && (
                          <p className="mt-2 text-center text-xs text-gray-500">{item.caption[l]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Storyboard */}
                <div>
                  <h4 className="mb-4 text-lg font-medium text-[#1D1D1F]">
                    {l === 'zh' ? '分镜头脚本' : 'Storyboard'}
                  </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {project.mediaItems.slice(5).map((item, i) => (
                      <div key={i}>
                        {item.src ? (
                          <img
                            src={item.src}
                            alt={item.label[l]}
                            className="w-full rounded-xl object-contain"
                          />
                        ) : (
                          <MediaPlaceholder type={item.type} label={item.label[l]} aspectRatio="aspect-video" />
                        )}
                        {item.caption && (
                          <p className="mt-2 text-center text-xs text-gray-500">{item.caption[l]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Additional media - for other projects */}
            {project.id !== 'aigc-films' &&
              project.id !== 'zhuangzi-butterfly' &&
              project.id !== 'dolores-memory-corridor' &&
              project.mediaItems.length > 1 && (
              <div className="mb-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {project.mediaItems.slice(1).map((item, i) => (
                    <div key={i}>
                      {item.src ? (
                        item.type === 'video' ? (
                          <div>
                            <video
                              src={item.src}
                              controls
                              preload="metadata"
                              className={`${item.aspect ?? 'aspect-video'} w-full rounded-xl object-cover`}
                            />
                            <p className="mt-2 text-center text-xs text-gray-500">
                              {l === 'zh'
                                ? '视频较大，手机端请稍等片刻加载；如仍卡顿，建议在 PC 端打开观看。'
                                : 'The video may take a moment to load on mobile. For the best experience, please open on a PC.'}
                            </p>
                          </div>
                        ) : (
                          <img
                            src={item.src}
                            alt={item.label[l]}
                            className={`${item.aspect ?? 'aspect-video'} w-full rounded-xl object-cover`}
                          />
                        )
                      ) : (
                        <MediaPlaceholder
                          type={item.type}
                          label={item.label[l]}
                          aspectRatio={item.aspect ?? 'aspect-video'}
                        />
                      )}
                      {item.caption && (
                        <p className="mt-2 text-center text-xs text-gray-500">{item.caption[l]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack */}
            {project.techStack && (
              <div className="mb-8">
                <h4 className="mb-4 text-lg font-medium text-[#1D1D1F]">
                  {l === 'zh' ? '技术规格' : 'Tech Stack'}
                </h4>
                <p className="text-sm leading-relaxed text-[#1D1D1F]/70">
                  {project.techStack[l]}
                </p>
              </div>
            )}

            {/* Project Showcase */}
            {project.projectShowcase && project.projectShowcase[l].length > 0 && (
              <div className="mb-8">
                <h4 className="mb-4 text-lg font-medium text-[#1D1D1F]">
                  {l === 'zh' ? '代表作品' : 'Featured Works'}
                </h4>
                <div className="space-y-4">
                  {project.projectShowcase[l].map((item, i) => (
                    <div key={i} className="rounded-xl border border-[#8B5CF6]/10 bg-[#8B5CF6]/[0.02] p-4">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <h5 className="mb-1 text-base font-medium text-[#1D1D1F] group-hover:text-[#8B5CF6] transition-colors">
                          {item.title}
                        </h5>
                        <p className="mb-2 text-sm text-[#1D1D1F]/70">
                          {item.description}
                        </p>
                        <p className="text-xs text-[#8B5CF6]">
                          {item.stats}
                        </p>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {project.results && project.results[l].length > 0 && (
              <div className="mb-8">
                <h4 className="mb-4 text-lg font-medium text-[#1D1D1F]">
                  {project.resultsLabel?.[l] ?? (l === 'zh' ? '项目成果' : 'Outcomes')}
                </h4>
                <ul className="space-y-3">
                  {project.results[l].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-[#1D1D1F]/70">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8B5CF6]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#667EEA]/10 px-5 py-2 text-sm font-medium text-[#5B21B6] transition-all hover:bg-[#667EEA]/20"
                >
                  {t.projects.viewProject}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

/* ============ Project Card (Level 1) ============ */

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: ProjectData;
  index: number;
  onClick: () => void;
}) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>(0.05);
  const { lang } = useLang();
  const l = lang;

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      )}
      style={{ transitionDelay: `${Math.min(index * 0.08, 0.4)}s` }}
    >
      <button
        onClick={onClick}
        className="group block w-full overflow-hidden rounded-3xl border border-black/5 bg-white/70 text-left backdrop-blur-sm transition-all duration-300 hover:border-[#667EEA]/15 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
      >
        {/* Cover */}
        <div className="p-3 pb-0">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title[l]}
              className="aspect-video w-full rounded-2xl object-cover"
            />
          ) : project.mediaItems[0]?.src ? (
            <img
              src={project.mediaItems[0].src}
              alt={project.title[l]}
              className="aspect-video w-full rounded-2xl object-cover"
            />
          ) : (
            <MediaPlaceholder
              type={project.mediaItems[0]?.type ?? 'image'}
              label={project.coverLabel[l]}
              aspectRatio="aspect-video"
              className="w-full"
            />
          )}
        </div>

        {/* Info */}
        <div className="p-5 md:p-6">
          <h3 className="text-lg font-medium text-[#1D1D1F] transition-colors group-hover:text-[#667EEA] md:text-xl">
            {project.title[l]}
          </h3>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.keywords[l].map((kw) => (
              <span
                key={kw}
                className="rounded-full bg-[#F5F5F7] px-2.5 py-0.5 text-xs text-[#86868B]"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
}

/* ============ Projects Section ============ */
export default function Projects() {
  const [ref, isVisible] = useScrollReveal<HTMLElement>(0.05);
  const { t } = useLang();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleClose = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <section id="projects" ref={ref} className="relative py-28 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-[#F5F5F7]/50 to-[#FAFAFA]" />

        <div className="relative mx-auto max-w-6xl px-6">
          <div
            className={cn(
              'mb-16 transition-all duration-800',
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}
          >
            <p className="mb-3 text-sm font-medium tracking-[0.2em] text-[#667EEA] uppercase">
              {t.projects.label}
            </p>
            <h2 className="text-3xl font-light tracking-tight text-[#1D1D1F] md:text-4xl">
              {t.projects.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base text-[#86868B]">
              {t.projects.desc}
            </p>
          </div>

          {/* Grid of cards (Level 1) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detail Modal (Level 2) */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={handleClose} />
      )}
    </>
  );
}
