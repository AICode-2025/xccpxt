/* 爱情三角测评 · 轻量自评版
 * 维度框架参考斯滕伯格（Sternberg）爱情三角理论核心三元素：
 * 亲密 / 激情 / 承诺。
 * 题项为本站通用自评句（非原量表原文），符合原创题原则。
 * 每维 6 题取均值（1-5），分数越高表示该元素越强。
 * 结果仅供自我探索参考，不代表关系专业评估。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.tri = {
  id: 'tri',
  recommends: ['attachment','olson','trust'],
  icon: '💘',
  color: '#f43f5e',
  hook: '你的爱情，更像哪一条边构成的三角形？',
  intro: '斯滕伯格说，成熟爱情＝亲密＋激情＋承诺，三者就像三角形的三条边。18 题约 3 分钟，画出你当前爱情（或你理想中的爱情）的三角形状。结果仅供自我探索参考，不代表关系专业评估。',
  source: 'Sternberg 爱情三角理论 · 通用题句版',
  title: '爱情三角测评',
  short: '爱情三角测评',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 3,
  desc: '从亲密、激情、承诺三维画你的爱情三角形。',
  instruction: '如果你正在恋爱，请针对这段关系作答；若单身，凭最近一段感情或你理想中的爱情作答。',
  options: [
    { text: '非常不同意', score: 1 },
    { text: '不同意', score: 2 },
    { text: '一般 / 说不准', score: 3 },
    { text: '同意', score: 4 },
    { text: '非常同意', score: 5 }
  ],
  questions: [
    { id: 1, text: '我们彼此了解，心里话愿意向对方敞开' },
    { id: 2, text: '和他/她在一起，我觉得被理解、被接纳' },
    { id: 3, text: '我关心对方的生活，也愿意分享自己的生活' },
    { id: 4, text: '我们之间有一种默契，很多事不用明说就懂' },
    { id: 5, text: '对方的感受对我很重要' },
    { id: 6, text: '我感到自己真正地走进并抚慰了对方' },
    { id: 7, text: '和对方在一起时，我常有心动的感觉' },
    { id: 8, text: '我们之间有强烈的身体吸引力' },
    { id: 9, text: '想到对方，我常忍不住想快点见到面' },
    { id: 10, text: '和对方亲近让我充满能量' },
    { id: 11, text: '我常会想念并渴望和他/她在一起' },
    { id: 12, text: '这段关系点燃了我很多热情' },
    { id: 13, text: '我愿意为这段关系做出承诺' },
    { id: 14, text: '我认真想过要在比较长的时间里和对方走下去' },
    { id: 15, text: '这份关系是我人生计划里重要的一部分' },
    { id: 16, text: '遇到问题，我还是倾向于坚守而不是轻易放手' },
    { id: 17, text: '我对坚持这段关系有明确的信心' },
    { id: 18, text: '我确定这段关系值得我长期经营' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '亲密', code: 'IN', short: '亲密', items: [1, 2, 3, 4, 5, 6],
        interpretation: [
          { min: 1, max: 2.4, level: '淡', description: '你们之间情感温度和相互倾诉偏少，亲近但不深入。"在一起"更多是习惯而非连接。' },
          { min: 2.4, max: 3.6, level: '中', description: '有基本的理解与关心，但深层的坦诚和接纳仍在养成中。' },
          { min: 3.6, max: 5, level: '浓', description: '彼此敞开、理解深、有默契，是爱情里很好的"知心"支柱。' }
        ]
      },
      {
        name: '激情', code: 'PAS', short: '激情', items: [7, 8, 9, 10, 11, 12],
        interpretation: [
          { min: 1, max: 2.4, level: '趋冷', description: '心动和渴望偏平静，像细水长流但少了火花。激情不是必需品，但缺失有时会让关系慢慢"变淡成亲情"。' },
          { min: 2.4, max: 3.6, level: '平稳', description: '有吸引和想念，但不算强烈，处于可长期相处的温热状态。' },
          { min: 3.6, max: 5, level: '炽热', description: '吸引力和心动很强，仿佛都在对方眼里发着光。炽热很迷人，记得别让它冲淡了理性判断。' }
        ]
      },
      {
        name: '承诺', code: 'CO', short: '承诺', items: [13, 14, 15, 16, 17, 18],
        interpretation: [
          { min: 1, max: 2.4, level: '观望', description: '你并不急着"认定"，更多在观望和权衡。这可能源于谨慎，也可能意味着对方还没成为你的确定。' },
          { min: 2.4, max: 3.6, level: '可期', description: '你有长期经营的意思，但仍在确认。' },
          { min: 3.6, max: 5, level: '笃定', description: '你愿意投入、坚持并把它写进未来规划。"认定"是爱情里很重的承担，也是长期关系的基石。' }
        ]
      }
    ],
    combos: [
      { when: [{ dim: 'IN', level: '浓' }, { dim: 'PAS', level: '炽热' }, { dim: 'CO', level: '笃定' }], label: '圆满成熟型', text: '亲密、激情、承诺三条边都很足，是爱情三角形里接近等边的理想状态。这样的感情既暖心、又来电、还坚定，最值得长久经营。' },
      { when: [{ dim: 'PAS', level: '炽热' }, { dim: 'CO', level: '观望' }], label: '心动无期型', text: '激情很满、承诺缺位，像一场"上头"的浪漫巨响。享受当下的同时，记得确认彼此对"要不要走远"是不是同一个答案。' },
      { when: [{ dim: 'IN', level: '淡' }, { dim: 'PAS', level: '趋冷' }, { dim: 'CO', level: '笃定' }], label: '习惯坚守型', text: '靠承诺和责任维系，但亲密与激情都淡了。这种感情很稳也很累，可能需要重新点燃"两个人"的感受，而不只是"在一起"。' }
    ]
  }
};