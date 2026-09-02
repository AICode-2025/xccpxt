/* FES 家庭环境测评 · 轻量自评版
 * 维度框架参考 Moos 家庭环境量表（FES）的三大核心维度
 * （亲密度 Cohesion / 矛盾 Conflict / 组织性 Organization）。
 * 题项为本站通用自评句（非原量表原文转载），符合原创题原则。
 * 每维 6 题取均值（1-4），分数越高表示该方面越突出。
 * 结果仅供自我探索参考，不代表专业家庭评估。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.fes = {
  id: 'fes',
  icon: '🏠',
  color: '#8b5cf6',
  hook: '你的家庭，是哪一种相处模式？',
  intro: '参考家庭环境经典框架，从亲密度、相处氛围、生活秩序三个维度看你家的相处模式。18 题约 3 分钟，结果能让你换个角度看自己的家：哪些是支撑，哪些在攒矛盾，哪些可调整。结果仅供自我探索参考。',
  source: 'FES 家庭环境框架 · 通用题句版',
  title: 'FES 家庭环境测评',
  short: '家庭环境测评',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 3,
  desc: '从亲密度、矛盾氛围、生活秩序三维了解你的家庭相处模式。',
  instruction: '请针对你自己家（从小到大一起生活的家庭）的真实情况作答，选最符合的一项。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '比较符合', score: 3 },
    { text: '完全符合', score: 4 }
  ],
  questions: [
    { id: 1, text: '家人之间会互相关心和帮助' },
    { id: 2, text: '在家我感到被支持和理解' },
    { id: 3, text: '家人愿意花时间和我聊天' },
    { id: 4, text: '遇到困难时，家人会一起想办法' },
    { id: 5, text: '我们经常一起吃饭或围坐聊天' },
    { id: 6, text: '和家人相处让我觉得放松' },
    { id: 7, text: '家人之间常为小事吵架' },
    { id: 8, text: '家里经常会有人大声争执' },
    { id: 9, text: '我们动不动就互相指责' },
    { id: 10, text: '家里常弥漫着紧张的气氛' },
    { id: 11, text: '我们常为规矩或安排争论不休' },
    { id: 12, text: '家人容易一言不合就上火' },
    { id: 13, text: '家务和分工在家里安排得井井有条' },
    { id: 14, text: '家庭有比较明确的规矩和作息' },
    { id: 15, text: '家里的东西和活动计划都挺有序' },
    { id: 16, text: '我们习惯把事情提前规划好' },
    { id: 17, text: '家里的约好和安排通常能准时完成' },
    { id: 18, text: '家人重视守时和条理' }
  ],
  dimsMode: {
    scaleMax: 4,
    subscales: [
      {
        name: '亲密度', code: 'CO', short: '亲密', items: [1, 2, 3, 4, 5, 6],
        interpretation: [
          { min: 1, max: 2.4, level: '低', description: '家庭成员之间的情感联结偏淡，大多各忙各的、少有深聊。不是不爱，而是缺了表达和靠近的习惯。' },
          { min: 2.4, max: 3.2, level: '中', description: '有联结但不算浓烈。关键时候靠得住，平常常态是点到为止的关心。' },
          { min: 3.2, max: 4, level: '高', description: '家人间亲近、互助、乐于交流。这个维度是家庭很珍贵的支撑力，也是你安全感的来源。' }
        ]
      },
      {
        name: '相处氛围', code: 'CF', short: '矛盾', items: [7, 8, 9, 10, 11, 12],
        interpretation: [
          { min: 1, max: 2.4, level: '平和', description: '家庭冲突少，气氛相对平稳。即便有分歧也多走沟通而非撕扯。' },
          { min: 2.4, max: 3.2, level: '时有摩擦', description: '有冲突但还没到失控。摩擦常在引出情绪时被放大，需要学会"就事论事"。' },
          { min: 3.2, max: 4, level: '紧张', description: '矛盾多、火药味重，争吵或冷战的频率偏高。长期处在这种氛围里会消耗人的安全感。' }
        ]
      },
      {
        name: '生活秩序', code: 'OR', short: '有序', items: [13, 14, 15, 16, 17, 18],
        interpretation: [
          { min: 1, max: 2.4, level: '松散', description: '家里较随性，想怎么来就怎么来。自由度高，但遇到需要协作的事也容易乱。' },
          { min: 2.4, max: 3.2, level: '适中', description: '有基本秩序但不刻板，该安排的事能安排，也留了随性的空间。' },
          { min: 3.2, max: 4, level: '严谨', description: '家里计划性和条理性强，规矩清晰、分工明确。秩序带来稳定，也注意别把关系磨成"按章程办事"。' }
        ]
      }
    ],
    combos: [
      { when: [{ dim: 'CO', level: '低' }, { dim: 'CF', level: '紧张' }], label: '疏离-高压型', text: '亲密又淡、摩擦又多，家人之间可能习惯了"各过各的 + 偶尔擦枪走火"。这种组合最耗心力，需要有人先打破沉默、重建连接。' },
      { when: [{ dim: 'CO', level: '高' }, { dim: 'OR', level: '严谨' }], label: '有序支持型', text: '既亲近又有秩序，是家庭功能里很理想的组合。家人能相互支撑，家里也运转得稳，是你后天建立安全感的优质土壤。' },
      { when: [{ dim: 'CF', level: '平和' }, { dim: 'CO', level: '低' }], label: '平淡疏离型', text: '没什么争吵，但也谈不上亲近，各守各的边界。平静之下可能是长期缺少情感交流，新一轮话题或共同活动能慢慢把感情养回来。' }
    ]
  }
};