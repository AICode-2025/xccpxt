/* ============================================================
 * 希望感自评（Hope）
 * 经典 Hope 理论双成分：路径思维 Waypower（找到办法）+ 动力思维 Willpower（有劲头）。
 * 题项为【原创通用自评句】：复用理论维度框架，不采用原量表题面，无版权挂靠。
 * 计分：2 维 × 4 题 = 8 题，李克特 1-5，取各维均值（1-5）+ 组合提示。
 * ============================================================ */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.hope = {
  id: 'hope',
  recommends: ['grit','swls','lotr'],
  icon: '💫',
  color: '#f59e0b',
  hook: '不是你很行，是你信自己"有办法、有劲头"。',
  intro: '希望不是盲目乐观，而是一套"有办法 + 有劲头"的组合能力：知道怎么走（路径思维）+ 相信自己走得动（动力思维）。本测评从这两个维度看清你的希望结构，8 题约 2 分钟，结果含两维坐标与组合建议。',
  source: '希望感双成分理论（Snyder 方向）· 原创通用题句版',
  title: '希望感自评',
  short: '希望感',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '看看你面对目标时，有多大"有办法、有劲头"的内在能量。',
  instruction: '请判断下列陈述在多大程度上符合你。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    /* ---- 动力思维 Willpower（1-4）---- */
    { id: 1, dim: 'will', text: '为了达成我在意的事，我愿意付出持久的努力。' },
    { id: 2, dim: 'will', text: '遇到挫折时，我仍能给自己打气继续往前走。' },
    { id: 3, dim: 'will', text: '想到目标时，我通常会更有精神和干劲。' },
    { id: 4, dim: 'will', text: '我常常提不起劲去争取真正想要的东西。', reverse: true },
    /* ---- 路径思维 Waypower（5-8）---- */
    { id: 5, dim: 'way', text: '当我决定做一件事，我总能想出不止一条实现的办法。' },
    { id: 6, dim: 'way', text: '一条路走不通时，我能快速调整换条路再试。' },
    { id: 7, dim: 'way', text: '面对复杂的目标，我可以把它拆成一步步可执行的路径。' },
    { id: 8, dim: 'way', text: '卡住的时候，我常觉得无计可施、只能干等着。', reverse: true }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '动力思维', code: 'W', short: '有劲头', items: [1, 2, 3, 4],
        interpretation: [
          { min: 1, max: 2.6, level: '动力偏低', description: '容易在三分钟热度消退后泄气，目标常停在"想想"。' },
          { min: 2.6, max: 3.4, level: '动力中等', description: '有干劲但容易受波动，需要稳定的小正反馈托住。' },
          { min: 3.4, max: 5, level: '动力充沛', description: '内在引擎强劲，能长期给自己打气并坚持推进。' }
        ]
      },
      {
        name: '路径思维', code: 'P', short: '有办法', items: [5, 6, 7, 8],
        interpretation: [
          { min: 1, max: 2.6, level: '路径单一', description: '惯于一条道走到黑，遇阻时容易陷入僵局。' },
          { min: 2.6, max: 3.4, level: '路径中等', description: '能找到办法但韧性有限，多准备备选方案会更稳。' },
          { min: 3.4, max: 5, level: '路径灵活', description: '天生善找解题路径，能见招拆招、绕路到达。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'W', level: '动力充沛' }, { dim: 'P', level: '路径灵活' }],
        label: '高内驱组合',
        text: '动力与路径双高——你既有闯劲又有头绪，是把想法推向现实的强引擎。小心别把"忙到飞起"当目标本身，为真正值得的事下注。'
      },
      {
        when: [{ dim: 'W', level: '动力偏低' }, { dim: 'P', level: '路径灵活' }],
        label: '有方法缺劲头',
        text: '你其实很会想办法，缺的是启动的那股劲。给第一个小到不可能失败的动作先做 10 分钟，让路径带活动力。'
      },
      {
        when: [{ dim: 'W', level: '动力充沛' }, { dim: 'P', level: '路径单一' }],
        label: '有劲头缺方法',
        text: '你有热情和坚持，但容易钻牛角尖。停下硬扛，去问问过来人、写下 3 条备选路，让多的不是力气而是地图。'
      }
    ]
  }
};