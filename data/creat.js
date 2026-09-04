window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.creat = {
  id: 'creat',
  title: '创造倾向测评',
  short: '创造倾向',
  icon: '💡',
  color: '#a855f7',
  hook: '创造力不是天赋，是一套可以养成的思维肌肉。',
  intro: '创造倾向不是"会不会画画"，而是三块肌肉：对新事物的好奇、敢在某些时刻天马行空、以及撞墙之后还愿意接着试。',
  source: '创造力人格倾向框架（好奇/想象/坚持）· 原创通用题句版',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '从好奇心、想象力、试错坚持三个维度看你的创造潜能。',
  instruction: '请判断下列描述在多大程度上符合你。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '非常符合', score: 5 }
  ],
  questions: [
    { id: 1, dim: 'cur', text: '遇到新事物，我会很想弄清楚它背后怎么运作。' },
    { id: 2, dim: 'cur', text: '我经常问"如果换一种做法会怎样"。' },
    { id: 3, dim: 'cur', text: '我可以为一个不实用但有趣的问题琢磨很久。' },
    { id: 4, dim: 'cur', text: '新奇感会让我充满干劲去探索。' },
    { id: 5, dim: 'ima', text: '发呆时我脑子里常冒出各种奇怪的想法。' },
    { id: 6, dim: 'ima', text: '我能把毫不相关的东西临时接在一起想点新花样。' },
    { id: 7, dim: 'ima', text: '我享受"有效想象"，想事情时不怕跑偏。' },
    { id: 8, dim: 'ima', text: '别人觉得"想太多"的方向，我觉得挺有意思。' },
    { id: 9, dim: 'per', text: '一个办法行不通时，我会继续试上几次别的。' },
    { id: 10, dim: 'per', text: '做创作性的事时，过程曲折我也不容易放弃。' },
    { id: 11, dim: 'per', text: '我有过把"做了一半的想法"重新捡起来做成的经历。' },
    { id: 12, dim: 'per', text: '我愿意为了一个还没变成形的点子长期投入。' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '好奇心', code: 'C', short: '爱发问', items: [1,2,3,4],
        interpretation: [
          { min: 1, max: 2.6, level: '好奇心淡', description: '你更愿意按既有的方式推进，不太主动追问新奇。' },
          { min: 2.6, max: 3.4, level: '好奇心中等', description: '你在感兴趣的领域会好奇，日常则较务实。' },
          { min: 3.4, max: 5, level: '高度好奇', description: '你是天生的提问机器，世界对你总是有待挖掘。' }
        ]
      },
      {
        name: '想象力', code: 'I', short: '敢发散', items: [5,6,7,8],
        interpretation: [
          { min: 1, max: 2.6, level: '务实收敛', description: '你倾向收敛、直接落地，不太喜欢天马行空的发散。' },
          { min: 2.6, max: 3.4, level: '想象适中', description: '你能在需要时展开想象，也能及时收回来。' },
          { min: 3.4, max: 5, level: '想象奔放', description: '你的联想力强，常能看见别人看不到的连接点。' }
        ]
      },
      {
        name: '试错坚持', code: 'P', short: '不放弃', items: [9,10,11,12],
        interpretation: [
          { min: 1, max: 2.6, level: '易受挫', description: '碰到阻碍你容易停在原地，需要练一练"撞墙继续"的肌肉。' },
          { min: 2.6, max: 3.4, level: '韧性适中', description: '你能坚持一阵，但在长时间没反馈时会动摇。' },
          { min: 3.4, max: 5, level: '锲而不舍', description: '你有很强的试错韧性，创作往往在你手里"熬"出结果。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'I', level: '想象奔放' }, { dim: 'P', level: '锲而不舍' }],
        label: '把想法做成型的人',
        text: '既敢发散又能死磕，你的灵感不只在脑内，还能真正落地成作品。'
      }
    ]
  },
  recommends: ['curio', 'flow', 'sres']
};