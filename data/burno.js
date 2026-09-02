/* ============================================================
 * 工作倦怠自评（Burnout）
 * 经典倦怠三维（Maslach 框架，题项原创）：情感耗竭（被掏空）、冷淡疏离（对人钝了）、
 * 成就感削弱（觉得没价值）。反向题落在"成就感"维度（反向=成就感低→倦怠重）。
 * 计分：3 维 × 4 题 = 12 题，李克特 1-5，取各维均值（1-5）+ 组合提示。
 * ============================================================ */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.burno = {
  id: 'burno',
  recommends: ['pss10','sdt','ghq12'],
  icon: '🔋',
  color: '#ef4444',
  hook: '你是不是"电池快耗尽"，却还在硬扛？',
  intro: '工作倦怠不是懒，而是一种被长时间掏空后的状态：累到没电、对人提不起精神、开始怀疑这一切有没有意义。本测评从情感耗竭、冷淡疏离、成就感三个维度帮你量一量电量还剩多少，12 题约 3 分钟，结果含状态提示与恢复方向。',
  source: '工作倦怠三维框架（Maslach 方向）· 原创通用题句版',
  title: '工作倦怠自评',
  short: '工作倦怠',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 3,
  desc: '测测你的"工作电量"还剩多少：耗竭、疏离、还是失去意义感。',
  disclaimerExtra: '倦怠与临床诊断不同。若持续困扰并伴随明显情绪低落、失眠等情况，建议寻求专业评估或支持。',
  instruction: '请按最近 1-2 个月的工作感受作答。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    /* ---- 情感耗竭（1-4）---- */
    { id: 1, dim: 'exhaust', text: '一天工作还没结束，我就已经精疲力尽。' },
    { id: 2, dim: 'exhaust', text: '想到又要上班，我就先感到一阵累。' },
    { id: 3, dim: 'exhaust', text: '下班后我基本没剩多少力气去照顾自己的生活和情绪。' },
    { id: 4, dim: 'exhaust', text: '我常觉得自己的精力被工作抽干了。' },
    /* ---- 冷淡疏离（5-8）---- */
    { id: 5, dim: 'detach', text: '我对工作中的人（客户、同事、学生）逐渐提不起兴致。' },
    { id: 6, dim: 'detach', text: '我变得几乎不做多说一句的"人情"，只求把事应付过去。' },
    { id: 7, dim: 'detach', text: '工作时我常"人在心不在"，像在例行公事。' },
    { id: 8, dim: 'detach', text: '我对工作的意义越来越无所谓了。' },
    /* ---- 成就感（9-12，前两反向=成就感低）---- */
    { id: 9, dim: 'achieve', text: '我越来越觉得自己现在做的事"没多大价值"。', reverse: true },
    { id: 10, dim: 'achieve', text: '我不太相信自己在工作中还能做出什么亮眼成绩。', reverse: true },
    { id: 11, dim: 'achieve', text: '把事情做成时，我还能感到真实的满足和骄傲。' },
    { id: 12, dim: 'achieve', text: '我对自己在岗位上的能力和贡献仍有信心。' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '情感耗竭', code: 'E', short: '耗竭', items: [1, 2, 3, 4],
        interpretation: [
          { min: 1, max: 2.2, level: '电量充足', description: '精力尚可，劳累多是一过性的，能自行回血。' },
          { min: 2.2, max: 3.2, level: '中度耗竭', description: '电量掉得快，休息在减少，需要主动给生活充电。' },
          { min: 3.2, max: 5, level: '重度耗竭', description: '明显被掏空，恢复周期拉长，是倦怠的核心信号。' }
        ]
      },
      {
        name: '冷淡疏离', code: 'D', short: '疏离', items: [5, 6, 7, 8],
        interpretation: [
          { min: 1, max: 2.2, level: '保持连接', description: '仍能投入人和事，工作中的人味儿还在。' },
          { min: 2.2, max: 3.2, level: '部分抽离', description: '开始对人和事有所保留，热情在降温。' },
          { min: 3.2, max: 5, level: '明显疏离', description: '对工作态度转向冷淡，是倦怠在"心理上拉开距离"。' }
        ]
      },
      {
        name: '成就感', code: 'A', short: '价值', items: [9, 10, 11, 12],
        interpretation: [
          { min: 1, max: 2.2, level: '价值感弱', description: '成就感被削弱，开始怀疑自己做事的意义。' },
          { min: 2.2, max: 3.2, level: '部分认可', description: '时而有价值感，但对结果的认同在摇摆。' },
          { min: 3.2, max: 5, level: '价值感足', description: '能体验到贡献与成就感，内在回报稳定。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'E', level: '重度耗竭' }, { dim: 'D', level: '明显疏离' }],
        label: '倦怠高发组合',
        text: '耗竭＋疏离双高，是典型倦怠信号：身体没电，心态也开始"划清界限"。别再靠硬扛透支，先做"减负三件事"：设边界、休整期、找回一件无功利的热爱。若持续 ≤ 多周仍难受，建议寻求专业支持。'
      },
      {
        when: [{ dim: 'E', level: '重度耗竭' }, { dim: 'A', level: '价值感足' }],
        label: '又累又要强',
        text: '你累得快，却仍能感到工作有价值——这是"高投入型耗竭"。危险在于有人用成就感硬撑着不休息。务必把"休息"上升为制度：单周留出真正放空的时段。'
      },
      {
        when: [{ dim: 'D', level: '明显疏离' }, { dim: 'A', level: '价值感弱' }],
        label: '意义感危机',
        text: '疏离＋价值感双弱，往往是"意义缺失"在作祟，倦怠还叠加了一层迷茫。可以重试一试：换种做法、换个视角，或在工作之外先守住那件让你觉得"有意义"的事。'
      }
    ]
  }
};