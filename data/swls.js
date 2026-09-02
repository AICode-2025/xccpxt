/* 生活满意度 SWLS · 通用自评版
 * 维度框架参考 Satisfaction with Life Scale（Diener 1985）：对整体生活的满意程度。
 * 题项为本站原创通用自评句。
 * 5 题，1-7 计分（全正向），粗分 5-35，分四档。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.swls = {
  id: 'swls',
  recommends: ['lotr','rses','panas'],
  icon: '🏝️',
  color: '#f43f5e',
  hook: '你对自己现在的生活，打几分？',
  intro: '参考经典生活满意度框架，不做事件罗列，直接问你对整体生活的满意程度——这不是"愿望对不对"，而是对你现状的总体判断。5 题只需 1 分钟，粗分归入四档。结果仅供自我探索参考。',
  source: 'Diener（1985）构思 · 通用自评题句版',
  title: 'SWLS 生活满意度',
  short: '生活满意度',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 1,
  desc: '1 分钟给你目前的整体生活打个满意度分。',
  instruction: '请判断下列陈述与你看法的符合程度，凭直觉作答。',
  options: [
    { text: '非常不同意', score: 1 },
    { text: '不同意', score: 2 },
    { text: '有点不同意', score: 3 },
    { text: '中立', score: 4 },
    { text: '有点同意', score: 5 },
    { text: '同意', score: 6 },
    { text: '非常同意', score: 7 }
  ],
  questions: [
    { id: 1, text: '大体上，我的生活接近我理想中的样子' },
    { id: 2, text: '我目前的各方面条件让我感到满意' },
    { id: 3, text: '我对自己现在的生活感到满意' },
    { id: 4, text: '我已经得到了我生命中想要的许多重要东西' },
    { id: 5, text: '如果人生能重来一次，我也不太想改变什么' }
  ],
  scoring: { method: 'sum' },
  interpretation: [
    {
      min: 5, max: 14, level: '偏低满意度',
      description: '你目前对整体生活的满意度偏低，理想与现实之间有不小的落差。这不是说你哪里失败了，而更像一个信号：有些重要的东西还没被满足。',
      suggestions: ['别急着自责，试着列出"最不满意的那一块"，逐个拆小', '从一件最能改善感受的小事开始，别一次求全', '满意度的低谷常常藏着真正想要的线索，值得认真听一听']
    },
    {
      min: 15, max: 19, level: '略偏低',
      description: '你对生活的满意度略低于中间水平，多数方面还行，但总有一些"差一点"的地方让你提不起头。',
      suggestions: ['找出一件最想改善的事，定一个本月能做到的小目标', '把眼光从"缺什么"短暂挪到"已有什么"']
    },
    {
      min: 20, max: 24, level: '中等',
      description: '你对生活的满意度处于中间水平：有满意之处，也有仍在观望的地方，属于大多数人的状态。',
      suggestions: ['满意度会随阶段波动，平常心看待', '可定期复盘：哪个方向最想加大投入，哪个可以放下']
    },
    {
      min: 25, max: 35, level: '较高满意度',
      description: '你对自己目前的生活总体很满意，这是很宝贵的心理资源，说明你已拥有与你期待相符的生活。',
      suggestions: ['珍惜并享受当下这份满足', '也可以趁满足感充盈时，去尝试一些让你进步或利他的事，让满足更有后劲']
    }
  ]
};