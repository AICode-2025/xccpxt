window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.time = {
  id: 'time',
  title: '时间管理倾向自评',
  short: '时间管理',
  icon: '⏱️',
  color: '#06b6d4',
  hook: '你不是没时间，是时间被"待办清单"卡在了喉咙里。',
  intro: '时间管理不是把每一分钟塞满，而是三件事：能不能定好计划、能不能专注执行、信不信自己能搞定接下来的时间。',
  source: '时间管理倾向框架（计划/专注/效能）· 原创通用题句版',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '从计划性、专注性、时间效能三个角度看你和时间的关系。',
  instruction: '请判断下列描述在多大程度上符合你。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '非常符合', score: 5 }
  ],
  questions: [
    { id: 1, dim: 'plan', text: '我常把要做的事在心里或纸上排好先后。' },
    { id: 2, dim: 'plan', text: '重要但不急的事，我会特意腾出时间处理。' },
    { id: 3, dim: 'plan', text: '我习惯给每个任务设定相对清楚的时间段。' },
    { id: 4, dim: 'plan', text: '计划被打乱时，我能很快重新排序。' },
    { id: 5, dim: 'focus', text: '开始做一件事时，我能很快进入专注状态。' },
    { id: 6, dim: 'focus', text: '我很少被手机或杂音打断手头的事。' },
    { id: 7, dim: 'focus', text: '我能一口气把一件想做的事做下去。' },
    { id: 8, dim: 'focus', text: '中途被打断后，我能比较快地回到原来的节奏。' },
    { id: 9, dim: 'eff', text: '我相信自己能把一天的时间安排得不算差。' },
    { id: 10, dim: 'eff', text: '我通常能清楚自己几个小时前做了什么。' },
    { id: 11, dim: 'eff', text: '到了晚上，我觉得这一天过得比较有成效。' },
    { id: 12, dim: 'eff', text: '乱成一团的时候，我总有办法先理出一个头绪。' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '计划性', code: 'P', short: '会排布', items: [1,2,3,4],
        interpretation: [
          { min: 1, max: 2.6, level: '随性推进', description: '你较少做前置规划，更依赖临场感觉推进。' },
          { min: 2.6, max: 3.4, level: '适度计划', description: '你在重要事上会安排，日常则较随性。' },
          { min: 3.4, max: 5, level: '条理清晰', description: '你是天然的排程高手，事情在你手里井井有条。' }
        ]
      },
      {
        name: '专注性', code: 'F', short: '能沉下心', items: [5,6,7,8],
        interpretation: [
          { min: 1, max: 2.6, level: '易被干扰', description: '你的注意力容易被外部环境带走，需要低噪声环境。' },
          { min: 2.6, max: 3.4, level: '专注适中', description: '你能进入专注，但需要在合适的条件下。' },
          { min: 3.4, max: 5, level: '深度专注', description: '你能快速进入并维持心流，是做事的高效引擎。' }
        ]
      },
      {
        name: '时间效能', code: 'E', short: '有掌控感', items: [9,10,11,12],
        interpretation: [
          { min: 1, max: 2.6, level: '掌控感弱', description: '你常觉得时间在偷溜走，一天下来说不清去哪了。' },
          { min: 2.6, max: 3.4, level: '掌控感中等', description: '你对时间有基本把握，偶有失控但能拉回。' },
          { min: 3.4, max: 5, level: '掌控感强', description: '你对时间的去向清晰，是身边效率驱动力强的人。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'P', level: '条理清晰' }, { dim: 'F', level: '深度专注' }],
        label: '时间操盘手',
        text: '既会排套路又能扎进深度专注，你的时间几乎都由你自己说了算。'
      },
      {
        when: [{ dim: 'P', level: '随性推进' }, { dim: 'E', level: '掌控感弱' }],
        label: '待办焦虑型',
        text: '计划松散加上掌控感弱，时间容易悄悄蒸发。先从每天只锁定一件最重要的事开始练手。'
      }
    ]
  },
  recommends: ['procras', 'grit', 'flow']
};