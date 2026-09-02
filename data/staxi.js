window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.staxi = {
  id: 'staxi',
  title: '状态-特质愤怒自评',
  short: '愤怒水平',
  icon: '🌋',
  color: '#ef4444',
  hook: '你是"现在很容易火"，还是"本来就罐装煤气"？',
  intro: '基于状态—特质愤怒框架，把"此刻的情绪热度"和"你惯常的火气基线"分开看：前者是状态愤怒，后者是特质愤怒。帮你理解自己为什么总在某根弦上绷着。',
  source: '状态-特质愤怒理论框架 · 原创通用题句版',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '分开测量当下的愤怒强度与惯常的愤怒倾向，看清你的火气从哪来。',
  instruction: '带星号的题请想"此刻当下的感受"作答，其余题请想"你平常的样子"作答。1 = 一点也不符合，5 = 非常符合。',
  options: [
    { text: '完全不符', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '非常符合', score: 5 }
  ],
  questions: [
    { id: 1, dim: 'state', text: '*此刻我觉得自己有点恼火。' },
    { id: 2, dim: 'state', text: '*现在我心里有股气，好像被什么顶住了。' },
    { id: 3, dim: 'state', text: '*此刻别人一碰我，我都容易炸。' },
    { id: 4, dim: 'state', text: '*现在脸红发热，明显不太平静。' },
    { id: 5, dim: 'state', text: '*此刻我想把气撒到某个人或那件事上。' },
    { id: 6, dim: 'state', text: '*现在只觉得憋得慌，想摔点什么。' },
    { id: 7, dim: 'state', text: '*此刻我自己都能感到心跳在加快。' },
    { id: 8, dim: 'state', text: '*现在越看越不顺眼，火越拱越高。' },
    { id: 9, dim: 'trait', text: '我平时就是个容易被点着的人。' },
    { id: 10, dim: 'trait', text: '别人一句话不对，我常在肚里憋好久。' },
    { id: 11, dim: 'trait', text: '我容易对很小的事也认真较劲。' },
    { id: 12, dim: 'trait', text: '我一生气就想立刻回击，很难压住。' },
    { id: 13, dim: 'trait', text: '即使事情过去，我还会反复回想当时的火气。' },
    { id: 14, dim: 'trait', text: '我常觉得公平被践踏，火就往上窜。' },
    { id: 15, dim: 'trait', text: '排队、堵车这类等待对我特别煎熬。' },
    { id: 16, dim: 'trait', text: '我的火气来得快，通常也去得快。', reverse: true }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '当下火气', code: 'S', short: '此刻情绪热度', items: [1,2,3,4,5,6,7,8],
        interpretation: [
          { min: 1, max: 2.6, level: '此刻平静', description: '收集当下你是比较冷静的，刚才的不快似乎没在持续燃烧。' },
          { min: 2.6, max: 3.4, level: '此刻微热', description: '你现在带着点情绪，但还没到失控的程度。' },
          { min: 3.4, max: 5, level: '此刻上头', description: '你当下的愤怒强度偏高，最好先离开触发源冷静一下再处理事情。' }
        ]
      },
      {
        name: '惯常火气', code: 'T', short: '脾气基线', items: [9,10,11,12,13,14,15,16],
        interpretation: [
          { min: 1, max: 2.6, level: '脾气平稳', description: '你惯常的火气基线较低，多数时候能从容接住外界的刺激。' },
          { min: 2.6, max: 3.4, level: '脾气中等', description: '你有一定的火气积累倾向，在特定情境下容易被点着。' },
          { min: 3.4, max: 5, level: '脾气偏冲', description: '你惯常的愤怒基线偏高，容易把小事放大，建议练习觉察与延迟反应。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'S', level: '此刻上头' }, { dim: 'T', level: '脾气偏冲' }],
        label: '高敏炮筒组合',
        text: '此刻情绪与惯常脾气都在高位——你正处在一个一触即发的窗口期，先深呼吸、离开现场，给自己降温再沟通。'
      }
    ]
  },
  recommends: ['cesd', 'bai', 'embarrass']
};