/* 罗森伯格自尊 RSES · 通用自评版
 * 维度框架参考 Rosenberg Self-Esteem Scale（Rosenberg 1965）：对自身价值与接纳度的整体评价。
 * 题项为本站原创通用自评句（非原量表原文）。
 * 10 题，1-4 计分；反向题 5 道（2/5/6/8/9，负面表述）；粗分 10-40，分三档。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.rses = {
  id: 'rses',
  recommends: ['sres','gses','psss'],
  icon: '🌟',
  color: '#f59e0b',
  hook: '你有多喜欢现在的自己？',
  intro: '参考经典的自尊评估框架，看向你对自己的整体评价与接纳度：你是不是够认可自己、够欣赏自己。10 题约 2 分钟，粗分归入三档。自尊有高有低是常态，它更多是你可以慢慢培养的东西，而非刻在身上的标签。结果仅供自我探索参考。',
  source: 'Rosenberg（1965）构思 · 通用自评题句版',
  title: 'RSES 自尊自评',
  short: '自尊自评',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '看向你对自己的整体认可与接纳度，10 题看自尊水平。',
  instruction: '请判断下列陈述在多大程度上符合你，凭第一印象作答即可。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '比较符合', score: 3 },
    { text: '完全符合', score: 4 }
  ],
  questions: [
    { id: 1, text: '总的来说，我对自己比较满意' },
    { id: 2, text: '我常常觉得自己没什么价值', reverse: true },
    { id: 3, text: '我觉得自己有不少可取之处' },
    { id: 4, text: '我能像大多数人一样把事做好' },
    { id: 5, text: '我有时觉得自己一无是处', reverse: true },
    { id: 6, text: '我很少觉得自己值得被肯定', reverse: true },
    { id: 7, text: '总的来说，我是值得被尊重的人' },
    { id: 8, text: '我常希望自己能更看得起自己', reverse: true },
    { id: 9, text: '我确实常常觉得自己很失败', reverse: true },
    { id: 10, text: '我对自己抱着积极的态度' }
  ],
  scoring: { method: 'sum' },
  interpretation: [
    {
      min: 10, max: 25, level: '偏低自尊',
      description: '你对自己的整体评价偏低，常在心里挑自己的毛病，认可自己有点难。请记住：这更像是一种你可能早已习惯的"视角"，而不是对你的客观判定——它可以在被看见之后慢慢松动。',
      suggestions: ['每天写下 1-2 件"我做得还不错"的小事，哪怕很小', '把自我评价和对具体某件事的评价分开', '多和能看见你闪光点的人待在一起', '若长期伴随低落、自我否定，可找专业人士聊聊']
    },
    {
      min: 26, max: 32, level: '中等自尊',
      description: '你的自尊处于中等：既有一份基本的自我认可，也常常在某些时刻对自我价值不够确定。这很正常，是大多数人的位置。',
      suggestions: ['留意自己被否定时是否习惯性自我怀疑', '允许自己有瑕疵，把"我不够好"换成"我在成长"', '多做真正有成就感的小事，用事实喂养自信']
    },
    {
      min: 33, max: 40, level: '较高自尊',
      description: '你对自己有稳定的认可与接纳，能够欣赏自己的优点，也较少被外界评价轻易动摇。这份底气是你的资源。',
      suggestions: ['珍惜这份内在稳定，也让它成为托举他人的力量', '较高的自我认可偶尔也会钝化自省，保留一点听取他人意见的弹性']
    }
  ]
};