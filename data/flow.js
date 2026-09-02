/* ============================================================
 * 心流倾向自评（Flow）
 * 心流是"全然投入、忘了时间与自我"的状态。三维：
 * 专注沉浸（注意力高度集中）、行动合一（做起事来顺畅轻快）、内在享受（过程本身有回报）。
 * 题项为【原创通用自评句】，维度框架为通识，无版权挂靠。
 * 计分：3 维 × 4 题 = 12 题，李克特 1-5，取各维均值（1-5）+ 组合提示。
 * ============================================================ */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.flow = {
  id: 'flow',
  recommends: ['grit','curio','sdt'],
  icon: '🌊',
  color: '#06b6d4',
  hook: '你做哪件事的时候，会觉得时间飞一样地过去？',
  intro: '心流是最健康的"上瘾"：投入一件事时忘我、顺畅、带劲。本测评从专注沉浸、行动合一、内在享受三个维度，帮你看清自己离这种状态有多近、又最容易在哪件事里进入。12 题约 3 分钟。',
  source: '心流理论三维通识框架（Csikszentmihalyi 方向）· 原创通用题句版',
  title: '心流倾向自评',
  short: '心流倾向',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 3,
  desc: '测测你多容易进入"忘了时间"的沉浸状态。',
  instruction: '请回想你跌入"高度投入"时刻的真实状态作答。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    /* ---- 专注沉浸（1-4）---- */
    { id: 1, dim: 'focus', text: '做喜欢的事时，我常常抬头一看才发现已经过了一两个小时。' },
    { id: 2, dim: 'focus', text: '全情投入时，周围的声音、消息很难打扰到我。' },
    { id: 3, dim: 'focus', text: '我做正事时经常走神，思绪会飘到别处。', reverse: true },
    { id: 4, dim: 'focus', text: '投入一件事时，外界的杂念会暂时退到后面。' },
    /* ---- 行动合一（5-8）---- */
    { id: 5, dim: 'ease', text: '做顺手的任务时，我常常动作流畅，几乎不用多想下一步。' },
    { id: 6, dim: 'ease', text: '越投入，我越觉得手头的事"自然就顺着走"。' },
    { id: 7, dim: 'ease', text: '忙起来时我总觉得举步维艰、卡得很。', reverse: true },
    { id: 8, dim: 'ease', text: '状态好时，事情像自己跑到手上，我只要顺着推进。' },
    /* ---- 内在享受（9-12）---- */
    { id: 9, dim: 'joy', text: '即使没有外人夸，我也能从"做成一件事"本身获得满足。' },
    { id: 10, dim: 'joy', text: '做喜欢的事时，过程本身就让我感到充实开心。' },
    { id: 11, dim: 'joy', text: '比起享受过程，我做事主要看结果和回报。', reverse: true },
    { id: 12, dim: 'joy', text: '有些事哪怕累，我也愿意为那份沉浸感再去做一次。' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '专注沉浸', code: 'F', short: '投入', items: [1, 2, 3, 4],
        interpretation: [
          { min: 1, max: 2.6, level: '易分心', description: '注意力容易被外部拉走，长时沉浸对你较难。' },
          { min: 2.6, max: 3.4, level: '视事而定', description: '对投缘的事能专注，枯燥任务容易飘。' },
          { min: 3.4, max: 5, level: '深度聚焦', description: '能长时间心无旁骛，是稀缺的"深工作"体质。' }
        ]
      },
      {
        name: '行动合一', code: 'E', short: '顺畅', items: [5, 6, 7, 8],
        interpretation: [
          { min: 1, max: 2.6, level: '卡顿较多', description: '行动与思考常打架，做事容易自我内耗。' },
          { min: 2.6, max: 3.4, level: '时常流畅', description: '顺着做时很轻快，卡点多在启动与切换处。' },
          { min: 3.4, max: 5, level: '得心应手', description: '身心合一感强，做事常有"自动挡"的顺畅。' }
        ]
      },
      {
        name: '内在享受', code: 'J', short: '自足', items: [9, 10, 11, 12],
        interpretation: [
          { min: 1, max: 2.6, level: '结果导向', description: '更靠结果与回报驱动，少了过程内的乐趣。' },
          { min: 2.6, max: 3.4, level: '过程认账', description: '能在好结果之外，也品尝到过程的滋味。' },
          { min: 3.4, max: 5, level: '乐在其中', description: '以过程为奖赏，"乐在其中"是你天然的能量源。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'F', level: '深度聚焦' }, { dim: 'E', level: '得心应手' }, { dim: 'J', level: '乐在其中' }],
        label: '心流体质',
        text: '三者皆高，你是难得的高心流体质——专注深、行动顺、过程乐。这样的你比多数人更少内耗；把时间投给真正值得深耕的领域，废物状态会显著下降。'
      },
      {
        when: [{ dim: 'J', level: '乐在其中' }, { dim: 'F', level: '易分心' }],
        label: '想陪却静不下',
        text: '你其实乐在其中也不缺动力，只是难以持续专注。用"物理隔绝干扰"（关通知、上整块时间）比靠意志力更管用，专注力是可以练的肌肉。'
      }
    ]
  }
};