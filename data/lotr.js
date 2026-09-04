/* 生活取向 LOT-R · 通用自评版
 * 维度框架参考 Life Orientation Test-Revised（Scheier & Carver 1985）：对未来的总体乐观倾向。
 * 题项为本站原创通用自评句。
 * 6 题，1-5 计分；3 正向乐观题 + 3 反向悲观题（reverse），粗分 6-30，分三档。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.lotr = {
  id: 'lotr',
  recommends: ['rses','swls','gses'],
  icon: '☀️',
  color: '#84cc16',
  hook: '你是先看见光，还是先看见坑？',
  intro: '参考经典"生活取向"框架，看你面对未来的总体基调：是习惯往好处想，还是容易先想到坏结果。6 题只需 1 分钟，粗分归入三档。乐观与悲观都各有用途，这里只是描出你的默认倾向。结果仅供自我探索参考。',
  source: 'Scheier & Carver（1985）构思 · 通用自评题句版',
  title: 'LOT-R 乐观倾向自评',
  short: '乐观倾向',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 1,
  desc: '1 分钟看出你面对未来的默认基调：往好处想，还是先想到坏结果。',
  instruction: '请判断下列陈述在多大程度上符合你，凭第一印象作答。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '有点符合', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    { id: 1, text: '遇到不确定的事，我通常先往好的方面想' },
    { id: 2, text: '我对自己未来的日子总体感到有信心' },
    { id: 3, text: '我相信好事总会在该来的时候来到' },
    { id: 4, text: '我几乎不去想生活中能有什么好事发生', reverse: true },
    { id: 5, text: '我很难相信事情最后能真的变好', reverse: true },
    { id: 6, text: '对我来说，机会多半到最后会落空', reverse: true }
  ],
  scoring: { method: 'sum' },
  interpretation: [
    {
      min: 6, max: 15, level: '偏谨慎',
      description: '面对未来你偏谨慎，习惯先想到风险与坏结果。这种"悲观防御"曾帮你看清隐患、不轻信许诺；只是如果它常常挡在你行动前面，也可能让你错过本可发生的好转。',
      suggestions: ['把"如果失败怎么办"换成"试了能学到什么"', '有意识地为"好的可能"留一个可验证的小实验', '乐观不等于盲目乐观——可以先想坏结果，再定一个托底方案去行动']
    },
    {
      min: 16, max: 22, level: '居中',
      description: '你的乐观与谨慎大体平衡：既不会看不见风险，也不会被风险吓住。属于稳中有期望的类型。',
      suggestions: ['保持这份平衡，大事上做计划、小事上多尝试', '关注自己在具体情境里偏乐观还是偏悲观，灵活切换']
    },
    {
      min: 23, max: 30, level: '偏乐观',
      description: '你面对未来更多是希望的底色，习惯相信事情会变好、也愿意为之行动。这份乐观是行动力的燃料。',
      suggestions: ['乐观是资产，搭配上"先想清楚风险"就更稳', '遇到重大决定时，给自己留一个现实核对清单，别让好心态忽略坏信号']
    }
  ]
};