/* 自我决定需求自评 SDT · 通用自评版
 * 参考自我决定理论（Self-Determination Theory, Deci & Ryan）三大基本心理需求：
 * 自主感（自己说了算）、胜任感（我真行）、归属感（被接纳连接）。题项为原创通用自评句。
 * 12 题（3 维 × 4 题），1-5 计分，反向题 3 道；各维均值（1-5）判档 + 组合提示。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.sdt = {
  id: 'sdt',
  recommends: ['csec', 'gses', 'locus'],
  icon: '🧭',
  color: '#0d9488',
  hook: '你做事，是"被推着走"，还是"自己想走"？',
  intro: '照一照你做事的动力来源：是不是大多数时候都能按自己的意愿来（自主感）、觉得自己能把事做好（胜任感）、感到被身边人接纳连接（归属感）。这三大需求被满足得越好，你做事越有劲、越不容易内耗。12 题约 3 分钟，从三条轴看清它们各补充多少。结果仅供自我探索参考。',
  source: '自我决定理论通识框架（Deci & Ryan）· 原创通用题句版',
  title: '自我决定需求自评',
  short: '自我决定',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 3,
  desc: '从自主感、胜任感、归属感三条轴，看你三大基本心理需求的满足程度。',
  instruction: '请根据你最近的日常感受，判断下列描述符合你的程度。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '有点符合', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    { id: 1, text: '我大多数事情，都能按自己的意愿和节奏去做' },
    { id: 2, text: '我做选择时，通常觉得是我自己做的决定' },
    { id: 3, text: '我很少感到被安排、被推着走' },
    { id: 4, text: '我能自由地去尝试我想做的事', reverse: false },
    { id: 5, text: '我常觉得自己能把正在做的事做好' },
    { id: 6, text: '遇到新挑战，我大多相信自己能胜任' },
    { id: 7, text: '我的努力，常常能得到"你做得不错"的反馈' },
    { id: 8, text: '我常感到自己是有能力、有用的人', reverse: false },
    { id: 9, text: '我能感到自己被身边的人接纳和喜欢' },
    { id: 10, text: '我有几个真正懂我、愿意听我说话的人' },
    { id: 11, text: '在群体里，我常有"我是其中一员"的归属感' },
    { id: 12, text: '需要时，身边有人愿意在情感上支持我', reverse: false }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '自主感', code: 'A', short: '自己做主', items: [1, 2, 3, 4],
        interpretation: [
          { min: 1, max: 2.4, level: '偏低', description: '你常觉得身不由己，被安排、被推着走，很难按自己的节奏做事。自主感不足的人容易活得累、像在替别人活。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你在多数事情上有一定自主，但重要选择或环境压迫时会觉得被捆绑。自主感中等，够用但会波动。' },
          { min: 3.6, max: 5, level: '偏高', description: '你做多数事情都觉得自己说了算，选择的自由度高。这是内在动力最肥沃的土壤——越自主，越愿意主动去做。' }
        ]
      },
      {
        name: '胜任感', code: 'C', short: '我真行', items: [5, 6, 7, 8],
        interpretation: [
          { min: 1, max: 2.4, level: '偏低', description: '你常怀疑自己能不能做成事，努力也得不到正反馈，久而久之容易怯于尝试新事物。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你在有把握的领域觉得能胜任，遇到陌生或高难度的事仍会自我怀疑。胜任感是随经历起伏的。' },
          { min: 3.6, max: 5, level: '偏高', description: '你常能通过努力把事情做成，并得到正反馈，这让你有底气去接更大的挑战。胜任感是自信最硬的材料。' }
        ]
      },
      {
        name: '归属感', code: 'B', short: '被接纳', items: [9, 10, 11, 12],
        interpretation: [
          { min: 1, max: 2.4, level: '偏低', description: '你常感到孤立、不被接纳，缺少真正懂你的人。人本是社会性动物，长期的归属缺失会悄悄消耗你的热情。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你有基本的社交连接，但深入被理解、被支持的感受还有限。归属感中等，关系网淡一点但不至于空。' },
          { min: 3.6, max: 5, level: '偏高', description: '你感到被身边的人接纳和支持，有几个真正懂你的人。归属感是安全感的底座，让你敢于再多走一步。' }
        ]
      }
    ],
    combos: [
      { when: [{ dim: 'A', level: '偏高' }, { dim: 'C', level: '偏高' }], label: '自主动力型', text: '你既觉得自己说了算，又相信自己能做成——这是内在动力最强、也最不容易内耗的组合。你做事的劲大多发自内心，可持续性很强。' },
      { when: [{ dim: 'C', level: '偏低' }, { dim: 'B', level: '偏低' }], label: '动力枯竭型', text: '你既常觉得自己不行，又少有被接纳的连接，做事容易既没信心也没后盾。先从一件小胜和一两个真懂你的人入手，把燃料一点点加回。' },
      { when: [{ dim: 'A', level: '偏低' }, { dim: 'B', level: '偏高' }], label: '依赖型驱动', text: '你的归属感不错、但自主感偏弱，容易以"别人期待"为重心来生活。试着把"我真正想要什么"放回选项里，你不需要靠别人定义了才算数。' }
    ]
  }
};