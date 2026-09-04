/* ============================================================
 * 好奇心自评（Curiosity）
 * 双维：外部探索（对新事物、未知世界的兴致）+ 内在专注（对喜欢的事深挖的兴致）。
 * 题项为【原创通用自评句】，维度框架为通识，无版权挂靠。
 * 计分：2 维 × 4 题 = 8 题，李克特 1-5，取各维均值（1-5）+ 组合提示。
 * ============================================================ */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.curio = {
  id: 'curio',
  recommends: ['eq','flow','type16'],
  icon: '🔭',
  color: '#0ea5e9',
  hook: '你对世界的好奇，是"什么都想试"还是"一门深挖"？',
  intro: '好奇心不是一句话能说清的东西：有人对新事物永远来电（外部探索），有人认准一件事就钻到底（内在专注）。本测评把这两种方向拆开看，8 题约 2 分钟，结果含两维坐标与发挥建议。',
  source: '好奇心双维通识框架 · 原创通用题句版',
  title: '好奇心自评',
  short: '好奇心',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '测出你的好奇更偏"广"还是"深"，帮你把兴趣用在刀刃上。',
  instruction: '请判断下列陈述在多大程度上符合你。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    /* ---- 外部探索（1-4）---- */
    { id: 1, dim: 'wide', text: '遇到没接触过的话题，我会主动想去了解一番。' },
    { id: 2, dim: 'wide', text: '新开的店、新出的东西，我常愿意去体验一下。' },
    { id: 3, dim: 'wide', text: '陌生领域的人讲起有趣的事，我能听得意兴盎然。' },
    { id: 4, dim: 'wide', text: '我对身边没试过的新鲜事，常常提不起兴趣。', reverse: true },
    /* ---- 内在专注（5-8）---- */
    { id: 5, dim: 'deep', text: '遇到感兴趣的东西，我容易一头钻进去查个明白。' },
    { id: 6, dim: 'deep', text: '我常为弄懂一个问题，把相关书、资料翻个遍。' },
    { id: 7, dim: 'deep', text: '研究一个感兴趣的小事，我能乐在其中不觉累。' },
    { id: 8, dim: 'deep', text: '即便喜欢，我也很少深挖，多半停留在知道个大概。', reverse: true }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '外部探索', code: 'W', short: '广度', items: [1, 2, 3, 4],
        interpretation: [
          { min: 1, max: 2.6, level: '求稳喜熟', description: '偏好熟悉与确定，对新事物较开放度低，变化多时易疲劳。' },
          { min: 2.6, max: 3.4, level: '适度尝新', description: '会尝鲜但不过度，见多识广与心理稳定两不误。' },
          { min: 3.4, max: 5, level: '天性好奇', description: '对世界保持高度开放，点子多、上手新东西快，但易分心。' }
        ]
      },
      {
        name: '内在专注', code: 'D', short: '深度', items: [5, 6, 7, 8],
        interpretation: [
          { min: 1, max: 2.6, level: '浅尝辄止', description: '兴趣来得快去得快，深入钻研的耐性偏弱。' },
          { min: 2.6, max: 3.4, level: '挑事深入', description: '碰上真爱的领域能深挖，其余保持浅尝。' },
          { min: 3.4, max: 5, level: '钻研型', description: '对感兴趣的事有近乎偏执的钻研劲，容易积累出专长。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'W', level: '天性好奇' }, { dim: 'D', level: '钻研型' }],
        label: '广而深型',
        text: '你既爱尝新又能深挖，是少见的"行走的知识发动机"。注意收敛目标，把泛兴趣里最值得的那 1-2 项做深，力量才不会散。'
      },
      {
        when: [{ dim: 'W', level: '天性好奇' }, { dim: 'D', level: '浅尝辄止' }],
        label: '广而浅型',
        text: '你什么都知道一点、什么都愿试，很有活力也很适合连接信息。区别"享受"和"成就"，挑一项愿意长期投入的，让博杂落地成专长。'
      },
      {
        when: [{ dim: 'W', level: '求稳喜熟' }, { dim: 'D', level: '钻研型' }],
        label: '深而专注型',
        text: '你不追求尝新，但认准的领域能扎得极深。这是难得的定力。给自己留一点"随机惊喜"的窗口，避免过度封闭错过外部的好东西。'
      }
    ]
  }
};