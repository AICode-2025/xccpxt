/* ============================================================
 * 职业价值观自评（Work Values）
 * 三维：成长成就（想变强、要成果）、协作稳定（要团队、求安稳）、自由创造（要自主、爱创新）。
 * 题项为【原创通用自评句】，价值观分类为通识，无版权挂靠。
 * 计分：3 维 × 4 题 = 12 题，李克特 1-5，取各维均值（1-5）+ 组合提示。
 * ============================================================ */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.workval = {
  id: 'workval',
  recommends: ['holland','bigfive','locus'],
  icon: '🧰',
  color: '#f97316',
  hook: '除了薪水，你最在乎工作中的哪样东西？',
  intro: '找工作先找价值观：同一份工作，有人图的是往上走的成长，有人图的是团队的安稳，有人图的是想怎么做就怎么做的自由。本测评把职业价值观分成成长成就、协作稳定、自由创造三路，12 题约 3 分钟，看清你心里那把尺最偏哪一边。',
  source: '职业价值观三维通识框架 · 原创通用题句版',
  title: '职业价值观自评',
  short: '职业价值观',
  category: 'explore',
  disclaimerLevel: 'career',
  timeMinutes: 3,
  desc: '测出你最在意工作的哪一面：成长、安稳，还是自由？',
  disclaimerExtra: '结果仅供自我探索与职业方向参考，请结合实际情况判断，不构成职业规划建议。',
  instruction: '请判断这些描述在多大程度上符合你对工作的真实期待。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    /* ---- 成长成就（1-4）---- */
    { id: 1, dim: 'grow', text: '我愿意为了不断提升能力、变强而接受更有挑战的工作。' },
    { id: 2, dim: 'grow', text: '对我来说，能看到自己往上走比一时的安逸更重要。' },
    { id: 3, dim: 'grow', text: '有明确晋升和成长空间的工作，最能让我有斗志。' },
    { id: 4, dim: 'grow', text: '只要工作稳定，能力提不提升、发展快不快我都不太在意。', reverse: true },
    /* ---- 协作稳定（5-8）---- */
    { id: 5, dim: 'stable', text: '我重视工作环境和谐、团队关系良好，齐心协力。' },
    { id: 6, dim: 'stable', text: '收入稳定、风险低的工作，会让我更安心投入。' },
    { id: 7, dim: 'stable', text: '我不想频繁更换节奏或面对太多不确定的安排。' },
    { id: 8, dim: 'stable', text: '比起一直求新，我更希望有一个长期安稳能深耕的位置。' },
    /* ---- 自由创造（9-12）---- */
    { id: 9, dim: 'free', text: '我希望能按自己的方式安排工作，不被管得太死。' },
    { id: 10, dim: 'free', text: '能让我发挥创意、想出"别人没想到的做法"的工作很吸引我。' },
    { id: 11, dim: 'free', text: '我受不了处处走流程、事事报备的束缚感。' },
    { id: 12, dim: 'free', text: '我更愿意自己说了算，而不是事事听标准答案。' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '成长成就', code: 'G', short: '成长', items: [1, 2, 3, 4],
        interpretation: [
          { min: 1, max: 2.6, level: '求稳务实', description: '晋升与成就感对你不算驱动，舒服稳定更容易留下你。' },
          { min: 2.6, max: 3.4, level: '适度进取', description: '希望前进，但不愿为成长牺牲太多安稳。' },
          { min: 3.4, max: 5, level: '成长驱动', description: '进步本身是强驱动力，有挑战、能变强的局面会点燃你。' }
        ]
      },
      {
        name: '协作稳定', code: 'S', short: '安稳', items: [5, 6, 7, 8],
        interpretation: [
          { min: 1, max: 2.6, level: '求变求进', description: '安稳与团队熟悉感对你约束小，变化反而是养分。' },
          { min: 2.6, max: 3.4, level: '韧中有稳', description: '能接受一定变化，太动荡的环境会让你心悬。' },
          { min: 3.4, max: 5, level: '渴求安定', description: '和谐团队与低风险是你的刚需，动荡环境较耗心。' }
        ]
      },
      {
        name: '自由创造', code: 'F', short: '自由', items: [9, 10, 11, 12],
        interpretation: [
          { min: 1, max: 2.6, level: '服从流程', description: '按规则和标准做事让你舒服，无需太多自主权。' },
          { min: 2.6, max: 3.4, level: '适度自主', description: '要一定空间，也愿接受共同规则。' },
          { min: 3.4, max: 5, level: '自主至上', description: '高度自我安排与发挥创意是你工作的氧气。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'G', level: '成长驱动' }, { dim: 'F', level: '自主至上' }],
        label: '创业者心气',
        text: '你既想变强又想自己说了算，典型的"闯劲驱动"。合适的土壤是：成长快、自由度高的平台（项目制、新业务、独立团队），而不是层级僵化的地方。'
      },
      {
        when: [{ dim: 'S', level: '渴求安定' }, { dim: 'F', level: '自主至上' }],
        label: '活在平衡木上',
        text: '你既想要安稳又想要自由，这两者需要刻意设计才能兼得。优先选"规则清晰但节奏自主"的岗位，或把稳定做底、把自由安在业余。'
      },
      {
        when: [{ dim: 'G', level: '成长驱动' }, { dim: 'S', level: '渴求安定' }],
        label: '既要又要的拉扯',
        text: '成长和安稳同时拉住你，容易反复纠结。破解法：把你的"成长"明确成"在稳定的组织里稳步往上爬"的路，而不是去冒险换更快的发展。'
      }
    ]
  }
};