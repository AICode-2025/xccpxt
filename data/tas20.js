/* 述情障碍 TAS 精简 · 通用自评版
 * 维度框架参考 Toronto Alexithymia Scale（TAS-20，Taylor 1994）三大面：
 * 情绪识别困难 / 情绪描述困难 / 外向型思维（原创精简题句版）。
 * 题项为本站原创通用自评句。
 * 15 题（3 维 × 5 题），1-5 计分，含反向题；各维取均值（1-5）判档。
 * 面向自我探索：看清楚"我读懂自己情绪的能力怎么样"，中性描述，不作临床判定。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.tas20 = {
  id: 'tas20',
  recommends: ['stai','panas','sres'],
  icon: '🧩',
  color: '#0d9488',
  hook: '情绪来了，你能辨认、能说出口吗？',
  intro: '参考述情障碍框架，但它更像一面镜子：照出"读懂自己情绪"这件事在你这儿顺不顺——能不能认出自己是什么感受、能不能把它讲给别人、平时是否习惯往心里看。这没有好坏，只是你的情绪工作方式。15 题约 3 分钟。结果仅供自我探索参考。',
  source: 'Taylor（1994）构思 · 原创精简题句版',
  title: 'TAS 述情倾向自评',
  short: '述情倾向',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 3,
  desc: '照见你"辨认—表达—内观"情绪的能力，三大面看懂你的情绪工作方式。',
  instruction: '请判断下列陈述在多大程度上符合你，凭真实反应作答。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '有点符合', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    { id: 1, text: '我常常说不清自己此刻到底是什么感觉' },
    { id: 2, text: '身体有反应时，我分不清那是情绪还是生理不适' },
    { id: 3, text: '我很难分辨"我是难过还是生气"' },
    { id: 4, text: '我能比较清楚地认出自己的感受', reverse: true },
    { id: 5, text: '别人问我怎么了，我常常答不上来' },
    { id: 6, text: '我很难用语言描述自己的心情' },
    { id: 7, text: '向别人解释我的感受对我来说很难' },
    { id: 8, text: '我能比较准确地讲出此刻的心情', reverse: true },
    { id: 9, text: '被问起时，我常找不到合适的词形容情绪' },
    { id: 10, text: '我说话时更愿意讲事情，很少讲感受' },
    { id: 11, text: '比起心里的感觉，我更关注正在发生的事' },
    { id: 12, text: '我很少去琢磨自己为什么会这样感觉' },
    { id: 13, text: '与其胡思乱想，不如直接动手解决' },
    { id: 14, text: '我更喜欢聊"怎么办"，而不是"感觉如何"' },
    { id: 15, text: '我会主动花时间体会自己的情绪变化', reverse: true }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '情绪识别', code: 'I', short: '认得出', items: [1, 2, 3, 4, 5],
        interpretation: [
          { min: 1, max: 2.4, level: '清晰', description: '你大多能清楚认出自己是什么感受，边界感比较分明，不容易"莫名烦躁"。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你平时能认出感受，情绪强烈或混乱时就容易模糊。' },
          { min: 3.6, max: 5, level: '偏模糊', description: '你常常说不清自己什么感觉，身体或莫名烦躁先于"我知道我是怎么了"。可以先从给情绪命名练起：把"烦"细化成"累、委屈、生气、着急"，认出来就能处理。' }
        ]
      },
      {
        name: '情绪表达', code: 'E', short: '说得清', items: [6, 7, 8, 9, 10],
        interpretation: [
          { min: 1, max: 2.4, level: '顺畅', description: '你比较能用语言表达心情，向别人说清自己是什么状态不太费劲。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你平时能表达心情，遇到复杂一点的情绪就容易卡壳。' },
          { min: 3.6, max: 5, level: '偏困难', description: '你很难把感受讲给别人听，总找不到合适的词。这会让别人猜得很累、也会憋住你自己。可以借用固定句式"我感觉得到___，因为___，我需要___"来练习说出口。' }
        ]
      },
      {
        name: '内向观', code: 'O', short: '往内看', items: [11, 12, 13, 14, 15],
        interpretation: [
          { min: 1, max: 2.4, level: '内观多', description: '你会花时间体会自己的感受、琢磨情绪由何而来，情绪更多的在你的视野里。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你既务实做正事，也会偶有内省，居中的平衡。' },
          { min: 3.6, max: 5, level: '务实少内视', description: '你专注于事情和解决办法，很少往心里看自己的感受。这是务实高效，但情绪长期不被理会容易"绕道"成身体不适或莫名疲惫，适度给自己排一个"感受时间"会有帮助。' }
        ]
      }
    ],
    combos: [
      { when: [{ dim: 'I', level: '清晰' }, { dim: 'E', level: '顺畅' }], label: '通透情绪流型', text: '你认得出、也说得清自己的感受，情绪在你这儿很有条理，是人际里容易被读懂、也少内耗的类型。' },
      { when: [{ dim: 'I', level: '偏模糊' }, { dim: 'E', level: '偏困难' }], label: '情绪密码型', text: '你既常说不清自己什么感受，也说不出给别人听——像是自己情绪的"密码"也解不开。这段距离不是缺陷，多给情绪命名、多表达一次，通道就会慢慢打通。' }
    ]
  }
};