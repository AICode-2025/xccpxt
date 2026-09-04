/* ============================================================
 * 自我关怀自评（Self-Compassion）
 * 三维：自我善待（对自己温柔）、共通人性（承认不完美是共性）、正念觉察（看见情绪而不放大）。
 * 题项为【原创通用自评句】，维度框架（Neff 方向）为通识，无版权挂靠。
 * 计分：3 维 × 4 题 = 12 题（每维 1 反向），李克特 1-5，取各维均值（1-5）+ 组合提示。
 * ============================================================ */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.selfcomp = {
  id: 'selfcomp',
  recommends: ['rses','mindful','csec'],
  icon: '🫂',
  color: '#a78bfa',
  hook: '你跌倒时，是骂自己，还是像安慰朋友那样安慰自己？',
  intro: '自我关怀不是放任自己，而是当自己最好的朋友：跌倒时不往伤口撒盐，而是承认"人人都会这样"并温柔地扶自己起来。本测评拆成 3 个维度看清你对自己的态度，12 题约 3 分钟。',
  source: '自我关怀三维框架（Neff 方向）· 原创通用题句版',
  title: '自我关怀自评',
  short: '自我关怀',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 3,
  desc: '看看你对自己，够不够"像对朋友那样好"。',
  instruction: '请回想你面对失误、低谷时的真实反应作答。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    /* ---- 自我善待（1-4）---- */
    { id: 1, dim: 'kind', text: '搞砸一件事时，我会像安慰好朋友那样安慰自己。' },
    { id: 2, dim: 'kind', text: '即便没做成，我仍能对自己说一句"你已经很努力了"。' },
    { id: 3, dim: 'kind', text: '我总是对自己很苛刻，做不好就揪着不放。', reverse: true },
    { id: 4, dim: 'kind', text: '累的时候，我会允许自己休息，而不是硬撑。' },
    /* ---- 共通人性（5-8）---- */
    { id: 5, dim: 'common', text: '遇到失败，我会想到"这样的挫折别人也会遇到"。' },
    { id: 6, dim: 'common', text: '我不把自己的问题当成只有我才有的独特缺陷。' },
    { id: 7, dim: 'common', text: '出错时我常觉得自己"怎么这么糟、别人都不会这样"。', reverse: true },
    { id: 8, dim: 'common', text: '我能理解人都有脆弱和局限，不去苛求自己万无一失。' },
    /* ---- 正念觉察（9-12）---- */
    { id: 9, dim: 'aware', text: '我能察觉到自己正在难过，而不会立刻被情绪淹没。' },
    { id: 10, dim: 'aware', text: '痛苦来临时，我能"看见它"而不急着消除或否认。' },
    { id: 11, dim: 'aware', text: '一烦躁我就越想越钻进牛角尖，无法抽身。', reverse: true },
    { id: 12, dim: 'aware', text: '情绪上头时，我能暂时"站在一旁"看着它，不被它牵着走。' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '自我善待', code: 'K', short: '温柔', items: [1, 2, 3, 4],
        interpretation: [
          { min: 1, max: 2.6, level: '自我苛刻', description: '对自己要求极高，失败时倾向于自我贬低而非抚慰。' },
          { min: 2.6, max: 3.4, level: '时宽时严', description: '有时能体谅自己，关键事上仍易对自己下重手。' },
          { min: 3.4, max: 5, level: '善待自己', description: '能温柔接住自己的过失，自我调节能力强。' }
        ]
      },
      {
        name: '共通人性', code: 'C', short: '理解', items: [5, 6, 7, 8],
        interpretation: [
          { min: 1, max: 2.6, level: '孤立自我', description: '容易把自己的失败看成"独一份的狼狈"，放大了孤独特感。' },
          { min: 2.6, max: 3.4, level: '部分相通', description: '理性上知道人人会犯错，情绪上来仍会钻"就我这样"。' },
          { min: 3.4, max: 5, level: '看见共性', description: '能把挫折放在"人人都如此"的坐标里，不夸大自己的例外。' }
        ]
      },
      {
        name: '正念觉察', code: 'A', short: '觉察', items: [9, 10, 11, 12],
        interpretation: [
          { min: 1, max: 2.6, level: '易被情绪淹没', description: '情绪一来容易被卷走，难以与它保持距离。' },
          { min: 2.6, max: 3.4, level: '波动中可抽身', description: '多数时候能稳住，强度大时仍会被带走几拍。' },
          { min: 3.4, max: 5, level: '高觉察', description: '能觉而不染，情绪到达时你有"看着它的手电筒"。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'K', level: '自我苛刻' }, { dim: 'A', level: '高觉察' }],
        label: '看得清却骂得狠',
        text: '你觉察力强、能看清自己，却常把这份清醒用来自我批判。试试把"指责"换成"照顾"：对自己说"我会心疼你，而不是审判你"。'
      },
      {
        when: [{ dim: 'K', level: '善待自己' }, { dim: 'C', level: '孤立自我' }],
        label: '温柔却孤单',
        text: '你对自己足够温柔，却常觉得自己的狼狈"别人没有"。其实越成功的人越会跌倒，找个同类聊聊，你会发现你不是一个人在扛。'
      },
      {
        when: [{ dim: 'K', level: '自我苛刻' }, { dim: 'C', level: '孤立自我' }, { dim: 'A', level: '易被情绪淹没' }],
        label: '内耗急转弯',
        text: '三者偏低组合下，你面对挫折容易"苛刻×孤立×被情绪淹没"三重叠加，内耗明显。这是最常见也最可改变的模式，从"先停那条归罪的线"做起。'
      }
    ]
  }
};