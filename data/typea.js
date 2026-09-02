window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.typea = {
  id: 'typea',
  title: 'A 型行为测评',
  short: 'A型行为',
  icon: '🏃',
  color: '#eab308',
  hook: '你是那种"连走路都在赶"的人吗？先看看你的节奏血压。',
  intro: 'A 型行为不只是急性子，而是三件套：总觉得时间不够、什么都想争第一、一点就着。它是一把双刃剑——效率高，但也容易自己烧自己。',
  source: 'A/B 型行为类型理论框架 · 原创通用题句版',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '从紧迫感、好胜心、急躁易怒三个角度测量你的行为节奏。',
  instruction: '请判断下列描述在多大程度上符合你。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '非常符合', score: 5 }
  ],
  questions: [
    { id: 1, dim: 'urg', text: '我总赶在最后期限前，一路都是冲刺状态。' },
    { id: 2, dim: 'urg', text: '排队太久或别人太慢时，我会明显不耐烦。' },
    { id: 3, dim: 'urg', text: '我常在吃饭、说话时也想着还没做完的事。' },
    { id: 4, dim: 'urg', text: '我给自己定的节奏经常快到喘不过气。' },
    { id: 5, dim: 'comp', text: '无论玩游戏还是干活，我都希望能赢过别人。' },
    { id: 6, dim: 'comp', text: '看到别人做得更好，我心里会暗暗较劲。' },
    { id: 7, dim: 'comp', text: '我要么全力投入，要么觉得没意思，很少折中。' },
    { id: 8, dim: 'comp', text: '我对自己和身边人的要求常常给到满分以上。' },
    { id: 9, dim: 'irr', text: '事情不如预期时，我容易一下子就冒火。' },
    { id: 10, dim: 'irr', text: '被人打断或插话时，我很难心平气和。' },
    { id: 11, dim: 'irr', text: '我说话、走路常常比别人快半拍。' },
    { id: 12, dim: 'irr', text: '出错时我倾向于马上怪自己或怪别人，很难轻拿轻放。' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '时间紧迫', code: 'U', short: '急', items: [1,2,3,4],
        interpretation: [
          { min: 1, max: 2.6, level: '节奏从容', description: '你对时间流逝的焦虑较低，能按自己的步调做事。' },
          { min: 2.6, max: 3.4, level: '节奏偏快', description: '你有一定的紧迫感，忙起来容易提速。' },
          { min: 3.4, max: 5, level: '高度紧迫', description: '你几乎总在赶路，时间像在背后追赶你，建议刻意放慢几拍。' }
        ]
      },
      {
        name: '好胜心', code: 'C', short: '争', items: [5,6,7,8],
        interpretation: [
          { min: 1, max: 2.6, level: '胜负心淡', description: '你较少把他人当对手，更在意自己的节奏与过程。' },
          { min: 2.6, max: 3.4, level: '适度好胜', description: '你在有意义的事情上会竞争，但不过度。' },
          { min: 3.4, max: 5, level: '高度好胜', description: '你凡事想争先，胜负欲强，小心把关系也当成了赛场。' }
        ]
      },
      {
        name: '急躁易怒', code: 'R', short: '燥', items: [9,10,11,12],
        interpretation: [
          { min: 1, max: 2.6, level: '平和耐性', description: '你耐性较好，事情不顺时也能稳住情绪。' },
          { min: 2.6, max: 3.4, level: '偶有急躁', description: '你在压力下会急躁，但总体可控。' },
          { min: 3.4, max: 5, level: '一点就着', description: '你的情绪启动很快，容易活在高压里，练习在"点火"和"反应"之间留个停顿。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'U', level: '高度紧迫' }, { dim: 'R', level: '一点就着' }],
        label: '高急高压型',
        text: '又急又燥，像一台转速拉满的引擎。效率是你给的回报，但请记得经常"熄火"喘口气，别让高压烧掉健康。'
      }
    ]
  },
  recommends: ['burno', 'workval', 'pss10']
};