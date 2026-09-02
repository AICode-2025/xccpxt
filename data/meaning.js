window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.meaning = {
  id: 'meaning',
  title: '生命意义感自评',
  short: '意义感',
  icon: '🧭',
  color: '#14b8a6',
  hook: '你不是在找意义，你是已经有意义，只是没认出来。',
  intro: '意义感分两半：一半是"我现在觉得生活有奔头"，另一半是"我愿意主动去寻找它"。很多人痛苦不是因为没意义，而是卡在"想要却还没找到"的中间。',
  source: '意义感双成分框架（寻求/持有）· 原创通用题句版',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '分别看见你当下的意义满足感，与对意义的主动寻求强度。',
  instruction: '请判断下列描述在多大程度上符合你。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '非常符合', score: 5 }
  ],
  questions: [
    { id: 1, dim: 'have', text: '我大致清楚自己为什么活着、在为什么努力。' },
    { id: 2, dim: 'have', text: '我觉得我的生活方向是清楚的。' },
    { id: 3, dim: 'have', text: '目前的生活让我觉得有分量、值得认真去过。' },
    { id: 4, dim: 'have', text: '我做的事能和我珍视的价值对上。' },
    { id: 5, dim: 'have', text: '当我回望自己走过的路，我觉得没白过。' },
    { id: 6, dim: 'seek', text: '我此刻正积极地寻找某种更大的意义。' },
    { id: 7, dim: 'seek', text: '我常常琢磨"我这一生想成为什么样的人"。' },
    { id: 8, dim: 'seek', text: '我愿意为了找到答案去尝试新的方向。' },
    { id: 9, dim: 'seek', text: '有些一时说不清的问题，我很想弄明白。' },
    { id: 10, dim: 'seek', text: '我还没找到让我安心的答案，但我仍在找。' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '当下持义', code: 'H', short: '有奔头', items: [1,2,3,4,5],
        interpretation: [
          { min: 1, max: 2.6, level: '匮乏感', description: '你当下觉得意义感较弱，生活容易显得空而浅。' },
          { min: 2.6, max: 3.4, level: '中等持义', description: '你有一定的方向感，但偶有飘忽，需要更多支撑点。' },
          { min: 3.4, max: 5, level: '意义充实', description: '你内心有清晰的坐标，知道自己在为什么而活。' }
        ]
      },
      {
        name: '主动寻求', code: 'S', short: '还在找', items: [6,7,8,9,10],
        interpretation: [
          { min: 1, max: 2.6, level: '寻求较少', description: '你不太主动追问意义，更多活在当下的具体里。' },
          { min: 2.6, max: 3.4, level: '适度寻求', description: '你会思考意义，但不会把自己逼得太紧。' },
          { min: 3.4, max: 5, level: '热切寻求', description: '你正处在一个主动寻找的方向上，探索本身就是意义的一部分。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'H', level: '意义充实' }, { dim: 'S', level: '热切寻求' }],
        label: '意义漫游者',
        text: '你已经握着路标，却还想走得更远——保持这种好奇心，让它带你去新的风景。'
      },
      {
        when: [{ dim: 'H', level: '匮乏感' }, { dim: 'S', level: '热切寻求' }],
        label: '寻路中的探索者',
        text: '你正处在"想要还没得到"的中间地带，这恰恰是成长的开始，请对自己多一点耐心。'
      }
    ]
  },
  recommends: ['hope', 'swls', 'grat']
};