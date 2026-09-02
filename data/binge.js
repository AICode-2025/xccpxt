/* ============================================================
 * 情绪性进食自评（Emotional Eating）
 * 二维：情绪驱动（难过/无聊/压力时靠吃来调节）+ 节律失控（饿了乱吃、饱了还吃）。
 * 题项为【原创通用自评句】，维度框架为通识，无版权挂靠。
 * 计分：2 维 × 5 题 = 10 题，李克特 1-5，取各维均值（1-5）+ 组合提示。
 * ============================================================ */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.binge = {
  id: 'binge',
  recommends: ['sds','ghq12','impulse'],
  icon: '🍰',
  color: '#d946ef',
  hook: '你吃东西，是真的饿了，还是心里有块地方空了？',
  intro: '有人饿了才吃，有人是心里一难受就想用食物填满自己。情绪性进食不是贪吃，而是一种"用吃来调节心情"的习惯。本测评从情绪驱动与节律失控两个维度帮你看看，你和食物的关系到底有多深，10 题约 2 分钟。',
  source: '情绪性进食二维通识框架 · 原创通用题句版',
  title: '情绪性进食自评',
  short: '情绪进食',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '测测你更多是"饿了吃"，还是"心情不好就想吃"。',
  instruction: '请按你平时面对食物时的真实状态作答。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    /* ---- 情绪驱动（1-5）---- */
    { id: 1, dim: 'emotion', text: '心情烦躁时，我会忍不住想吃点东西让自己好受些。' },
    { id: 2, dim: 'emotion', text: '压力大或难过时，零食和甜食成了我下意识的安抚。' },
    { id: 3, dim: 'emotion', text: '我有时分不清自己是真的饿，还是只是想用吃来排解情绪。' },
    { id: 4, dim: 'emotion', text: '无聊的时候，我常靠吃点什么来打发时间。' },
    { id: 5, dim: 'emotion', text: '开心时我也容易"庆祝式"地吃个不停。' },
    /* ---- 节律失控（6-10）---- */
    { id: 6, dim: 'urge', text: '一旦开吃，我常停不下来，即使已经饱了。' },
    { id: 7, dim: 'urge', text: '我有时会暴风式地吃完一大份，事后又后悔。' },
    { id: 8, dim: 'urge', text: '我能按点吃饭，不会因为情绪打破进食节奏。', reverse: true },
    { id: 9, dim: 'urge', text: '碰到爱吃的东西，我很难控制只吃一部分就停。' },
    { id: 10, dim: 'urge', text: '我一般能守着"到点吃饭、适量就好"的规律。', reverse: true }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '情绪驱动', code: 'E', short: '情绪吃', items: [1, 2, 3, 4, 5],
        interpretation: [
          { min: 1, max: 2.6, level: '饿了才吃', description: '吃与心情基本不挂钩，食物于你是补给而非解药。' },
          { min: 2.6, max: 3.4, level: '偶发情绪吃', description: '多数好好吃饭，情绪上头时偶尔用食物自救。' },
          { min: 3.4, max: 5, level: '频繁情绪吃', description: '情绪与进食关联较深，食物成了你主要的心情调节阀。' }
        ]
      },
      {
        name: '节律失控', code: 'U', short: '失控', items: [6, 7, 8, 9, 10],
        interpretation: [
          { min: 1, max: 2.6, level: '节律可控', description: '能守住饱与适量，失控性进食较少见。' },
          { min: 2.6, max: 3.4, level: '偶尔破防', description: '平时可控，特别场合或压力下容易一次吃多。' },
          { min: 3.4, max: 5, level: '节律紊乱', description: '过量进食较频繁、伴随后悔，与食物的关系较拉扯。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'E', level: '频繁情绪吃' }, { dim: 'U', level: '节律紊乱' }],
        label: '情绪+失控双高',
        text: '心情一不好就想吃、一吃就停不下来，是你最典型的循环。这背后往往是情绪没处安放。试着把"想吃"替换成"先厘清我此刻的真实情绪"，找到情绪真正的出口，食物才重归食物。'
      },
      {
        when: [{ dim: 'E', level: '饿了才吃' }, { dim: 'U', level: '节律失控' }],
        label: '偏节律型失控',
        text: '你不靠情绪吃，但仍会出现"一吃就停不下来"的失控。更可能是身体节律或习惯问题。靠"分餐预装量 + 不在囤货场景进食 + 按时进餐"通常能立竿见影。'
      }
    ]
  }
};