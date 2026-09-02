/* 心理韧性 CD-RISC · 通用自评版
 * 维度框架参考 Connor-Davidson Resilience Scale（2003）：面对压力与挫折时的
 * 坚韧、恢复与乐观应对能力。题项为本站原创通用自评句。
 * 15 题（坚韧5/力量5/乐观5），1-5 计分，含反向题；各维取均值（1-5）判档。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.cdrisc = {
  id: 'cdrisc',
  recommends: ['erq','lotr','pss10'],
  icon: '🧗',
  color: '#f97316',
  hook: '压力砸下来，你能接得住、再站起来吗？',
  intro: '参考经典心理韧性框架，看你在压力、挫折和不确定性面前的"回弹能力"：能不能扛住不放弃、能不能较快恢复、信不信自己能撑过去。15 题约 3 分钟，从这三股劲描出你的韧劲画像。结果仅供自我探索参考。',
  source: 'Connor & Davidson（2003）构思 · 通用自评题句版',
  title: 'CD-RISC 心理韧性',
  short: '心理韧性',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 3,
  desc: '从坚韧、恢复、乐观三股劲，看出你在压力面前的回弹能力。',
  instruction: '请判断下列陈述在多大程度上符合你，凭第一印象作答。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '有点符合', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    { id: 1, text: '面对压力时，我能找到办法让自己撑住' },
    { id: 2, text: '失败会让我更想放弃', reverse: true },
    { id: 3, text: '即便处境困难，我也不会轻易认输' },
    { id: 4, text: '我能在高压之下依然保持专注' },
    { id: 5, text: '遇到挫折，我会一下子泄气很久', reverse: true },
    { id: 6, text: '经历打击之后，我一般能较快恢复' },
    { id: 7, text: '我把每次挫折都当成一次可用的经验' },
    { id: 8, text: '在困境里，我也能尽量稳住自己的心态' },
    { id: 9, text: '一次打击之后，我需要很久才能再振作', reverse: true },
    { id: 10, text: '我信任自己有能力重新站起来' },
    { id: 11, text: '遇到难事，我倾向于相信最终能挺过去' },
    { id: 12, text: '我相信自己总能找到一条出路' },
    { id: 13, text: '只要动起来，我就有办法把事坚持做完' },
    { id: 14, text: '面对不确定，我常担心自己撑不过去', reverse: true },
    { id: 15, text: '对自己能掌控的部分，我乐于往好的方向看' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '坚韧', code: 'T', short: '扛得住', items: [1, 2, 3, 4, 5],
        interpretation: [
          { min: 1, max: 2.4, level: '偏低', description: '面对压力你容易松动，遇到不顺常想放弃。不是你不坚强，而更像是油箱不大、又常被突发的难关消耗——可以先从小目标练手，慢慢攒"我其实撑得住"的证据。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你能扛住平常的压力，遇到硬仗会吃力但不轻易认输，属于稳中有韧性。' },
          { min: 3.6, max: 5, level: '偏高', description: '你面对压力能顶住、能专注，越挫越不想认输，是打硬仗的料。这份坚韧是稀缺能力，也记得给自己安排回血。' }
        ]
      },
      {
        name: '力量', code: 'S', short: '恢复力', items: [6, 7, 8, 9, 10],
        interpretation: [
          { min: 1, max: 2.4, level: '偏低', description: '经历打击后你恢复得比较慢，容易陷在挫败里一阵子。恢复慢不丢人，它多半和压力积累时长有关——主动找人倾诉、保证睡眠，能让回弹快一些。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你基本能走出低谷，只是有时需要一点时间，属于正常水平的恢复力。' },
          { min: 3.6, max: 5, level: '偏高', description: '你擅长从挫折中回血，能把打击转成经验，恢复快又稳定。这份力量让你不容易被一次失败定义。' }
        ]
      },
      {
        name: '乐观', code: 'O', short: '扛得久', items: [11, 12, 13, 14, 15],
        interpretation: [
          { min: 1, max: 2.4, level: '偏低', description: '你对"会不会挺过去"的信心偏弱，常在不确定面前先担心撑不过。试着把大难关拆小、只看眼前一步，信心会逐步回来。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你对自己能撑过去大多时候有点底气，偶有动摇但能重新打起精神。' },
          { min: 3.6, max: 5, level: '偏高', description: '你相信自己能扛过去、能找出路，乐观是你韧劲的核心燃料，让你能坚持到转机出现。' }
        ]
      }
    ],
    combos: [
      { when: [{ dim: 'T', level: '偏高' }, { dim: 'S', level: '偏高' }, { dim: 'O', level: '偏高' }], label: '高韧劲型', text: '扛得住、回血快、又信自己能挺过——这是很少见的高韧组合。拥有它是你面对人生硬仗最宝贵的底牌，不只是过日子的运气。' },
      { when: [{ dim: 'T', level: '偏低' }, { dim: 'S', level: '偏低' }], label: '耗能型韧性', text: '你既容易松劲，恢复也慢，属于小压力也会耗电的类型。请优先恢复"电量"：先保证睡眠与吃饭这两件地基事，再从最小的一件事开始练起，别一下子要求自己变成铁人。' }
    ]
  }
};