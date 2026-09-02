/* ============================================================
 * 宽恕倾向自评（Forgiveness）
 * 二维：宽恕他人（放了别人）＋ 宽恕自己（放了自己）。
 * 题项为【原创通用自评句】，维度框架为通识，无版权挂靠。
 * 计分：2 维 × 4 题 = 8 题，李克特 1-5，取各维均值（1-5）+ 组合提示。
 * ============================================================ */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.forgive = {
  id: 'forgive',
  recommends: ['codep','attachment','grat'],
  icon: '🕊️',
  color: '#14b8a6',
  hook: '放过别人，和放过自己，你分别做得到几分？',
  intro: '宽恕其实是两件事：一是放下对别人的怨恨，二是不再拿过去反反复复地惩罚自己。这两者的难度不一样，很多人"放得下别人"却"放不过自己"，或者反过来。本测评把两个维度拆开量，8 题约 2 分钟，结果含双维坐标与练习方向。',
  source: '宽恕二维通识框架 · 原创通用题句版',
  title: '宽恕倾向自评',
  short: '宽恕倾向',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '测测你宽恕别人和宽恕自己，分别做得怎么样。',
  instruction: '请回想你面对伤害、过错时的真实反应作答。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    /* ---- 宽恕他人（1-4）---- */
    { id: 1, dim: 'other', text: '被人伤害后，过一段时间我大多能放下，不再咬着不放。' },
    { id: 2, dim: 'other', text: '就算对方道歉不那么诚恳，我也能学着慢慢算了。' },
    { id: 3, dim: 'other', text: '别人亏欠我的事，我能记很久很久，反复咀嚼。', reverse: true },
    { id: 4, dim: 'other', text: '我能把"原谅对方"和"教导对方"分开，不把它当武器。' },
    /* ---- 宽恕自己（5-8）---- */
    { id: 5, dim: 'self', text: '过去犯过的错，我能慢慢释怀而不总揪着不放。' },
    { id: 6, dim: 'self', text: '我接纳"当时的我尽了当时的能力"，不拿现在苛责过去。' },
    { id: 7, dim: 'self', text: '我很难原谅自己的过失，常为同一件事反复自责。', reverse: true },
    { id: 8, dim: 'self', text: '犯错之后，我能在吸取教训后真正翻篇，继续往前走。' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '宽恕他人', code: 'O', short: '放人', items: [1, 2, 3, 4],
        interpretation: [
          { min: 1, max: 2.6, level: '记仇倾向', description: '对亏欠敏感、记得久，原谅对你来说成本较高。' },
          { min: 2.6, max: 3.4, level: '看人看事', description: '轻伤能放下，触及核心的事能卡很久。' },
          { min: 3.4, max: 5, level: '容易放下', description: '不轻易记恨，就算受伤也愿意给彼此翻篇的机会。' }
        ]
      },
      {
        name: '宽恕自己', code: 'S', short: '放己', items: [5, 6, 7, 8],
        interpretation: [
          { min: 1, max: 2.6, level: '自我纠缠', description: '自我宽恕较难，过失会变成反复自责的循环。' },
          { min: 2.6, max: 3.4, level: '时松时紧', description: '大错能想通，小过失仍容易反复自我鞭打。' },
          { min: 3.4, max: 5, level: '自我和解', description: '能既吸取教训又放下自责，翻篇的能力很强。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'O', level: '容易放下' }, { dim: 'S', level: '自我纠缠' }],
        label: '放过别人，饶不过自己',
        text: '你对别人很大度，却偏偏对自己最狠。别人早翻篇了，你还在为同件事懊恼。试试把对朋友的那份理解，原封不动地送给自己——你值得同样被放过。'
      },
      {
        when: [{ dim: 'O', level: '记仇倾向' }, { dim: 'S', level: '自我和解' }],
        label: '放过自己，却咬住别人',
        text: '你能跟自己和解，却容易对别人的亏欠耿耿于怀。记着伤害不会让伤人者难受，只会让自己背着更久。练习"划清边界但同步放下"，你的轻盈会回来。'
      },
      {
        when: [{ dim: 'O', level: '记仇倾向' }, { dim: 'S', level: '自我纠缠' }],
        label: '双线卡锁',
        text: '两头都对过去抓得很紧：放不下别人，也放不过自己，等于双重负重。真正的宽恕不是"必须原谅"，而是"不再让过去继续经营现在的我"。从其中一头（通常放己更容易）先松绑。'
      }
    ]
  }
};