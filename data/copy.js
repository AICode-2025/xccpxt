window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.copy = {
  id: 'copy',
  title: '应对方式测评',
  short: '应对方式',
  icon: '🧗',
  color: '#10b981',
  hook: '压力来的时候，你第一个动作是"solve"还是"run"？',
  intro: '压力不因人而异，应对方式才是。有人遇事先动手解决，有人先安抚情绪，也有人选择先躲开。看清你的默认应对，才知道压力到底是怎么困住你的。',
  source: '应对方式框架（问题/情绪/回避）· 原创通用题句版',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '看清压力面前你惯常的三类应对：直面解决、安抚情绪、还是绕道回避。',
  instruction: '当遇到压力或麻烦时，下面这些做法多大程度上是你的习惯？1 = 从不，5 = 总是。',
  options: [
    { text: '从不', score: 1 },
    { text: '很少', score: 2 },
    { text: '有时', score: 3 },
    { text: '经常', score: 4 },
    { text: '总是', score: 5 }
  ],
  questions: [
    { id: 1, dim: 'prob', text: '我会把问题拆开，一步步想办法解决。' },
    { id: 2, dim: 'prob', text: '遇到麻烦，我倾向于先搞清楚来龙去脉。' },
    { id: 3, dim: 'prob', text: '我会主动向有经验的人请教怎么办。' },
    { id: 4, dim: 'prob', text: '我习惯制定一个计划并一步步执行。' },
    { id: 5, dim: 'emotion', text: '压力大时我会先照顾自己的情绪，再做决定。' },
    { id: 6, dim: 'emotion', text: '我会找人倾诉，说出来能让我好受一些。' },
    { id: 7, dim: 'emotion', text: '我会尽量提醒自己"这没什么大不了的"。' },
    { id: 8, dim: 'emotion', text: '我会通过运动、爱好或放松来缓解压力。' },
    { id: 9, dim: 'avoid', text: '碰到麻烦，我常选择先不去想它。' },
    { id: 10, dim: 'avoid', text: '我会拖延，期待事情自己会过去。' },
    { id: 11, dim: 'avoid', text: '我倾向于回避冲突和难堪的场面。' },
    { id: 12, dim: 'avoid', text: '压力大到一定程度，我会干脆撒手不管。' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '问题应对', code: 'P', short: '直面解决', items: [1,2,3,4],
        interpretation: [
          { min: 1, max: 2.6, level: '较少直面', description: '你较少用行动直接去啃问题，常先停在情绪或其他路径。' },
          { min: 2.6, max: 3.4, level: '适度的直面', description: '你能动手解决，但也受临场状态影响。' },
          { min: 3.4, max: 5, level: '行动派', description: '你有很强的"把问题摁下去"的驱动力，是敢直面硬仗的人。' }
        ]
      },
      {
        name: '情绪安抚', code: 'E', short: '先稳心', items: [5,6,7,8],
        interpretation: [
          { min: 1, max: 2.6, level: '少安抚', description: '你不常主动安抚自己情绪，容易直接硬扛。' },
          { min: 2.6, max: 3.4, level: '适度安抚', description: '你会在需要时调节情绪，也保有行动力。' },
          { min: 3.4, max: 5, level: '善于调节', description: '你擅长给情绪放气，压力下仍能稳得住心态。' }
        ]
      },
      {
        name: '回避反应', code: 'A', short: '先躲开', items: [9,10,11,12],
        interpretation: [
          { min: 1, max: 2.6, level: '直面不躲', description: '你很少绕道，多数时候会迎上去处理。' },
          { min: 2.6, max: 3.4, level: '偶有回避', description: '压力大时你会短暂躲一下，但不会一直逃避。' },
          { min: 3.4, max: 5, level: '惯常回避', description: '你习惯用"躲"来自我保护，小心它让问题越积越沉。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'A', level: '惯常回避' }, { dim: 'P', level: '较少直面' }],
        label: '回避型应对',
        text: '压力和麻烦你多半先躲、先拖。试着只take down其中最小的一步，你会发现直面没有想象中可怕。'
      },
      {
        when: [{ dim: 'P', level: '行动派' }, { dim: 'E', level: '善于调节' }],
        label: '全能应对者',
        text: '既会动手又懂收心，你在多数压力场景里都能找到节奏，很稳。'
      }
    ]
  },
  recommends: ['cdrisc', 'brs', 'pss10']
};