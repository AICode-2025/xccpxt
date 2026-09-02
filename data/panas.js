/* 正负情绪量表 PANAS · 通用自评版
 * 维度框架参考 Positive and Negative Affect Schedule（Watson, Clark & Tellegen 1988）：
 * 正性情绪 PA（积极、有活力）与 负性情绪 NA（低落、紧张、烦躁）两个独立维度。
 * 采用通用状态形容词，每维 10 个；1-5 计分取均值，两维可同时高，可同时低。
 * 无反向题（单面构念）。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.panas = {
  id: 'panas',
  recommends: ['swls','gses','lotr'],
  icon: '🎭',
  color: '#3b82f6',
  hook: '最近这段时间，你的情绪基调是晴还是阴？',
  intro: '参考经典正负情绪框架，问你在最近这段时间里，各种感受出现的频率。关键不在于把它们加总成一个数，而在于看清"积极感受"和"消极感受"其实是两个独立的名堂——它们可以同时高，也可以同时低。20 个词约 2 分钟。结果仅供自我探索参考。',
  source: 'Watson & Clark（1988）构思 · 通用词项版',
  title: 'PANAS 正负情绪自评',
  short: '正负情绪',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '分开看"积极感受"与"消极感受"两本账，看清你近期的情绪基调。',
  instruction: '下面是一些情绪与感受。请选出在你的最近这段时间里，每种感受让你体会到的频率。',
  options: [
    { text: '几乎没有', score: 1 },
    { text: '偶尔', score: 2 },
    { text: '有时', score: 3 },
    { text: '经常', score: 4 },
    { text: '几乎总是', score: 5 }
  ],
  questions: [
    { id: 1, text: '有兴致的、投入的' },
    { id: 2, text: '不安的、心烦的' },
    { id: 3, text: '有劲头的、充满活力的' },
    { id: 4, text: '沮丧的、提不起劲的' },
    { id: 5, text: '果断的、有主张的' },
    { id: 6, text: '内疚的、自责的' },
    { id: 7, text: '有热情的' },
    { id: 8, text: '害怕的、担心的' },
    { id: 9, text: '自豪的' },
    { id: 10, text: '易怒的、烦躁的' },
    { id: 11, text: '警觉的、清醒的' },
    { id: 12, text: '惭愧的、难堪的' },
    { id: 13, text: '受鼓舞的、有灵感的' },
    { id: 14, text: '紧张的' },
    { id: 15, text: '意志坚定的' },
    { id: 16, text: '坐立不安的' },
    { id: 17, text: '专注的、注意力集中的' },
    { id: 18, text: '苦恼的、心里发堵的' },
    { id: 19, text: '活跃的、闲不住的' },
    { id: 20, text: '被惊吓到的、发慌的' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '正性情绪', code: 'PA', short: '积极', items: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
        interpretation: [
          { min: 1, max: 2.4, level: '偏低', description: '你最近体会到积极感受的频率较低，劲头、热情、投入感不太在线。这不一定是"不开心"，也可能只是处于蓄力或休整期。' },
          { min: 2.4, max: 3.6, level: '中等', description: '积极感受的出现处在常见区间：有兴致跑起来的时候，也有低落歇着的时候，起伏正常。' },
          { min: 3.6, max: 5, level: '偏高', description: '你最近积极、有活力、有热情的感觉来得频繁。这份"电量足"的状态是行动力和创造力的好燃料。' }
        ]
      },
      {
        name: '负性情绪', code: 'NA', short: '消极', items: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        interpretation: [
          { min: 1, max: 2.4, level: '偏低', description: '你最近紧张、烦躁、沮丧这些消极感受很少冒头，情绪基础面比较安稳。' },
          { min: 2.4, max: 3.6, level: '中等', description: '负性情绪处在常见区间：有紧绷和焦虑的时候，但能回得去，属于正常波动。' },
          { min: 3.6, max: 5, level: '偏高', description: '你最近不安、烦躁、沮丧等消极感受来得频繁，可能是持续压力在累积。请优先照顾好自己，必要时向信任的人或专业人士求助。' }
        ]
      }
    ],
    combos: [
      { when: [{ dim: 'PA', level: '偏高' }, { dim: 'NA', level: '偏低' }], label: '舒展高能型', text: '积极多、消极少，是你情绪状态很理想的一段时期：既能投入享受，又少被内耗拖累。适合去做想做的事，也值得被好好珍惜。' },
      { when: [{ dim: 'PA', level: '偏高' }, { dim: 'NA', level: '偏高' }], label: '又燃又躁型', text: '积极和消极同时偏高——你既充满热情的劲头，又背着不轻的压力。像是油门和刹车一起踩，最需要的是给这段高张力期安排真实的休息。' },
      { when: [{ dim: 'PA', level: '偏低' }, { dim: 'NA', level: '偏高' }], label: '低电耗能型', text: '积极感低、消极感高，是这段时间里比较容易"累"的组合。别急着逼自己振作，先从睡眠、饮食、运动这些地基项恢复起；若持续两周以上没起色，建议找专业人士聊聊。' }
    ]
  }
};