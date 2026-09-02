/* 情绪调节问卷 ERQ · 通用自评版
 * 维度框架参考 Emotion Regulation Questionnaire（Gross & John 2003）两大策略：
 * 认知重评 Reappraisal（先调整自己怎么想）与 表达抑制 Suppression（压抑情绪的流露）。
 * 题项为本站原创通用自评句。
 * 10 题（重评6 + 抑制4），1-7 计分，无反向；各维取均值（1-7）判档。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.erq = {
  id: 'erq',
  recommends: ['sres','stai','panas'],
  icon: '⚖️',
  color: '#ec4899',
  hook: '情绪来了，你是先"换想法"，还是先"压下去"？',
  intro: '参考经典情绪调节框架，看你平时主要用哪种策略面对情绪：是先在脑子里换个角度看（认知重评），还是先按住情绪不让它流露（表达抑制）。两种都有用，但长年只靠"压"会默默消耗你。10 题约 2 分钟，结果仅供自我探索参考。',
  source: 'Gross & John（2003）构思 · 通用自评题句版',
  title: 'ERQ 情绪调节方式',
  short: '情绪调节',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '看你平时主要用"换想法"还是"压下去"来面对情绪，两种偏好各归长短。',
  instruction: '请选出下列做法与你平日习惯的相符程度，凭真实反应作答。',
  options: [
    { text: '非常不同意', score: 1 },
    { text: '不同意', score: 2 },
    { text: '有些不同意', score: 3 },
    { text: '中立', score: 4 },
    { text: '有些同意', score: 5 },
    { text: '同意', score: 6 },
    { text: '非常同意', score: 7 }
  ],
  questions: [
    { id: 1, text: '想让自己感觉好些时，我会试着换个角度看这件事' },
    { id: 2, text: '不愉快时，我会刻意不让别人看出我的情绪' },
    { id: 3, text: '当想减少负面情绪时，我会调整自己对这个局面的想法' },
    { id: 4, text: '我倾向于把情绪压在心底，不表现出来' },
    { id: 5, text: '面对让人紧张的事，我会想办法把它想得没那么严重' },
    { id: 6, text: '难过时，我会控制自己的表情，尽量显得若无其事' },
    { id: 7, text: '想变得平静时，我会改变自己看待事情的角度' },
    { id: 8, text: '我会通过"换个角度想"来管理自己的情绪' },
    { id: 9, text: '生气或低落时，我也会努力克制，不让情绪露在脸上' },
    { id: 10, text: '我希望自己尽量从积极的一面看待正在发生的事' }
  ],
  dimsMode: {
    scaleMax: 7,
    subscales: [
      {
        name: '认知重评', code: 'R', short: '换想法', items: [1, 3, 5, 7, 8, 10],
        interpretation: [
          { min: 1, max: 3.2, level: '偏低', description: '你较少主动"换个角度想"，更多直接跟随情绪反应。这样做很真实，但也意味着情绪几乎由环境说了算，几乎少了一个可用的调节开关。' },
          { min: 3.2, max: 5, level: '中等', description: '你在重要时刻能做到换个角度看，但并非总能想起来用，属于"会用但不稳定"的水平。' },
          { min: 5, max: 7, level: '偏高', description: '你很擅长通过调整想法来管理情绪：先改变对事情的看法，情绪自然回落。是公认比较健康、低消耗的调节方式。' }
        ]
      },
      {
        name: '表达抑制', code: 'S', short: '压下去', items: [2, 4, 6, 9],
        interpretation: [
          { min: 1, max: 3.2, level: '偏低', description: '你不太习惯压抑情绪的流露，想高兴就高兴、想难过就难过。这让你感觉比较真实，情绪也更容易被他人理解。' },
          { min: 3.2, max: 5, level: '中等', description: '你能在需要的场合按下情绪（比如重要场合、职场），但平时还是愿意自然地表达。' },
          { min: 5, max: 7, level: '偏高', description: '你平时比较习惯把情绪压住、不让人看出来。短期能稳住场面，但长期都靠"压"来应对，情绪无处安放，容易积累成内耗或躯体紧绷——需要给自己留安全的出口。' }
        ]
      }
    ],
    combos: [
      { when: [{ dim: 'R', level: '偏高' }, { dim: 'S', level: '偏低' }], label: '弹性调适型', text: '你会调整想法，也不太爱硬压情绪——情绪来处有路、出口也有门，是长期最省力的调节组合，心理韧性通常更好。' },
      { when: [{ dim: 'R', level: '偏低' }, { dim: 'S', level: '偏高' }], label: '隐忍内耗型', text: '你不太会"换想法"，却又习惯把情绪压住不外露——相当于只堵不疏。短时不伤人，但情绪会越积越重，记得给情绪找安全的出口（说给信任的人、写下来、运动）。' },
      { when: [{ dim: 'R', level: '偏高' }, { dim: 'S', level: '偏高' }], label: '双管齐下型', text: '你既会调整想法，也会在必要时控制表达——工具箱很全。留意别过度压抑自己的真实情绪，给最亲近的人也留一点表达的空间。' }
    ]
  }
};