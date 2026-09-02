/* ============================================================
 * 正念觉察自评（Mindfulness）
 * 三维：觉察当下（留意此刻经验）、接纳态度（允许不评判）、非自动化（不被惯性带跑）。
 * 题项为【原创通用自评句】，维度框架为通识，无版权挂靠。
 * 计分：3 维 × 4 题 = 12 题（每维 1-2 反向），李克特 1-5，取各维均值（1-5）+ 组合提示。
 * ============================================================ */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.mindful = {
  id: 'mindful',
  recommends: ['gses','pss10','rses'],
  icon: '🌿',
  color: '#22c55e',
  hook: '你今天，是活在"此刻"，还是活在"自动播放"里？',
  intro: '正念不是高冷玄学，而是"注意力回到当下、不评判"的日常能力：吃饭看见味道、走路感受脚底、被情绪叫走时能把自己带回。本测评拆成 3 个维度看清你的"活在当下"程度，12 题约 3 分钟。',
  source: '正念三维通识框架（Kabat-Zinn 方向）· 原创通用题句版',
  title: '正念觉察自评',
  short: '正念觉察',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 3,
  desc: '测测你"活在当下"的能力：觉察、接纳、不被惯性带走。',
  instruction: '请判断以下描述与你的日常相符程度。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    /* ---- 觉察当下（1-4）---- */
    { id: 1, dim: 'now', text: '吃饭时，我能留意到饭菜的味道和口感，而不是只顾刷手机。' },
    { id: 2, dim: 'now', text: '走路、喝水这些小事里，我能注意到身体的真实感受。' },
    { id: 3, dim: 'now', text: '我常发现自己"人在、神不在"，刚才发生的事没印象。', reverse: true },
    { id: 4, dim: 'now', text: '我能注意到此刻身体的紧张或放松，而不只是忙于思考。' },
    /* ---- 接纳态度（5-8）---- */
    { id: 5, dim: 'accept', text: '心里冒出不好的念头时，我能看着它过去，不急着评判自己。' },
    { id: 6, dim: 'accept', text: '我可以承认"我现在就是焦虑/难过"，而不因为它责怪自己。' },
    { id: 7, dim: 'accept', text: '一旦有不舒服的情绪，我就急着压制或消除它。', reverse: true },
    { id: 8, dim: 'accept', text: '难熬的情绪来临时，我能和它安静待一会儿，不马上推开。' },
    /* ---- 非自动化（9-12）---- */
    { id: 9, dim: 'pause', text: '想刷手机时，我能先停一下，再决定要不要点开。' },
    { id: 10, dim: 'pause', text: '习惯性动作之间，我能插入一个"等等我"的间隙。' },
    { id: 11, dim: 'pause', text: '我大多靠自动反应行事，很少停下来想一想。', reverse: true },
    { id: 12, dim: 'pause', text: '情绪上头想冲动行事时，我常能让自己顿一顿再反应。' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '觉察当下', code: 'N', short: '在场', items: [1, 2, 3, 4],
        interpretation: [
          { min: 1, max: 2.6, level: '神游较多', description: '注意力常飘在别处，身体活在"过去或未来"，对当下缺少留意。' },
          { min: 2.6, max: 3.4, level: '时在时梭', description: '能注意到当下，忙碌或压力时会明显失联。' },
          { min: 3.4, max: 5, level: '身临当下', description: '对身体与此刻很敏锐，享乐与做事都更"在线"。' }
        ]
      },
      {
        name: '接纳态度', code: 'A', short: '接纳', items: [5, 6, 7, 8],
        interpretation: [
          { min: 1, max: 2.6, level: '对抗情绪', description: '习惯压制不快，越对抗越被情绪牵着走。' },
          { min: 2.6, max: 3.4, level: '有条件接纳', description: '小情绪能接纳，强烈情绪仍想快刀斩乱麻。' },
          { min: 3.4, max: 5, level: '顺流接纳', description: '允许情绪流动，很多情绪因为"不排斥"而更快过去。' }
        ]
      },
      {
        name: '非自动化', code: 'P', short: '刹车', items: [9, 10, 11, 12],
        interpretation: [
          { min: 1, max: 2.6, level: '滑行模式', description: '多数行为被习惯与条件反射带着走，缺少停顿。' },
          { min: 2.6, max: 3.4, level: '半自动', description: '熟悉场景会滑行，重要/强烈时能踩一脚刹车。' },
          { min: 3.4, max: 5, level: '自控从容', description: '在冲动与行动之间能插入选择，拿回人生主动权的关键能力。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'N', level: '神游较多' }, { dim: 'A', level: '对抗情绪' }, { dim: 'P', level: '滑行模式' }],
        label: '自动沉浸型',
        text: '三者偏低组合提示你常在"神游＋对抗＋滑行"里自动运转，容易疲惫、涨情绪。别急着追求长期静坐，先做"锚定一瞬"的小练习：一天里三次，把注意力放回呼吸 60 秒。'
      },
      {
        when: [{ dim: 'A', level: '顺流接纳' }, { dim: 'P', level: '自控从容' }],
        label: '高觉知矛与盾',
        text: '接纳与自控双高，你很少跟情绪硬碰硬，也能在冲动前踩刹车。继续保持——这是压力大的时代里，很高级的"内在装备"。'
      }
    ]
  }
};