/* 简短韧性 BRS · 通用自评版
 * 维度框架参考 Brief Resilience Scale（Smith 2008）：从压力中反弹的能力。
 * 题项为本站原创通用自评句。
 * 6 题，1-5 计分，反向题 2/4/6；粗分 6-30，分三档。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.brs = {
  id: 'brs',
  recommends: ['cdrisc','lotr','gses'],
  icon: '💪',
  color: '#22c55e',
  hook: '跌倒了，你多久能重新站起来？',
  intro: '参考经典简短韧性框架，"恢复力"被浓缩成六个问题：压力过去之后，你到底能多快缓过来。1 分钟即出结果。韧性不是天赋，而是可以练的本事。结果仅供自我探索参考。',
  source: 'Smith（2008）构思 · 通用自评题句版',
  title: 'BRS 简短韧性',
  short: '简短韧性',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 1,
  desc: '1 分钟测出你从压力中反弹的速度。',
  instruction: '请判断下列陈述在多大程度上符合你，凭第一印象作答。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '有点符合', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    { id: 1, text: '经历困难之后，我通常能比较快地恢复' },
    { id: 2, text: '我很难从压力事件中缓过来', reverse: true },
    { id: 3, text: '我一般不会在挫折里陷太久' },
    { id: 4, text: '对我来说，走出低谷并不容易', reverse: true },
    { id: 5, text: '我通常能比想象中更快跨过不顺' },
    { id: 6, text: '我要花很长时间才能从困难里振作', reverse: true }
  ],
  scoring: { method: 'sum' },
  interpretation: [
    {
      min: 6, max: 15, level: '恢复偏慢',
      description: '你的恢复弹力偏低：一次压力过后，需要更长时间才缓得过来。这多半意味着当前承受的负担已经不小，优先把"回血的节奏"排进日常。',
      suggestions: ['把"恢复"也当作一件正经事：按时睡、按时吃、适度动', '压力来时主动找人说说，别一个人扛着回血', '可从每天一件能带来确定感的小事开始，逐步养回节奏']
    },
    {
      min: 16, max: 22, level: '中等恢复',
      description: '你的恢复力处于中等：平时能较快缓过来，遇到较大的冲击会需要时间，属正常水平。',
      suggestions: ['留意什么最消耗你，适度给生活留白', '把一次恢复成功的小经验记下来，下次用得上']
    },
    {
      min: 23, max: 30, level: '恢复稳健',
      description: '你从压力中反弹的速度很快，很少被一次挫折长期拖住，这份恢复力是你珍贵的心理资本。',
      suggestions: ['保持规律作息，别让好恢复力被长期睡眠债透支', '你的稳定也能在关键时刻托住身边的人']
    }
  ]
};