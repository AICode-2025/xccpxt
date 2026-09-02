/* 状态-特质焦虑 STAI · 通用自评版
 * 维度框架参考 State-Trait Anxiety Inventory（Spielberger 1983）：分离
 * 1) 状态焦虑（此刻此刻的情绪紧张程度）与 2) 特质焦虑（平素稳定的人格性焦虑倾向）。
 * 题项为本站通用自评句（非原量表原文），符合原创题原则。
 * 每维 10 题取均值（1-5），分数越高表示该维度焦虑越突出；含反向题平衡方向。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.stai = {
  id: 'stai',
  recommends: ['sas','bai','socanx'],
  icon: '🌡️',
  color: '#14b8a6',
  hook: '你的焦虑，是此刻的"状态"，还是骨子里的"特质"？',
  intro: '参考状态-特质焦虑框架，把焦虑拆成两层看：状态焦虑回答"我现在多紧张"，特质焦虑回答"我平时是不是容易焦虑的人"。20 题约 4 分钟，帮你分清情绪是一时的应激，还是长久的底色，从而更有针对性地调整。结果仅供自我探索参考。',
  source: 'Spielberger（1983）构思 · 通用自评题句版',
  title: 'STAI 状态-特质焦虑',
  short: '状态特质焦虑',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 4,
  desc: '把焦虑拆成"此刻的状态"与"骨子里的特质"两层来看。',
  instruction: '前半部分关于"你现在此刻"的感受，后半部分关于"你平时一向"的倾向。请凭真实的第一反应作答。',
  options: [
    { text: '完全没有', score: 1 },
    { text: '有点', score: 2 },
    { text: '比较多', score: 3 },
    { text: '非常强烈', score: 4 }
  ],
  questions: [
    { id: 1, text: '此刻我感觉很平静', reverse: true },
    { id: 2, text: '此刻我感觉很安稳、踏实', reverse: true },
    { id: 3, text: '此刻我有点紧张不安' },
    { id: 4, text: '此刻我身体是放松的', reverse: true },
    { id: 5, text: '此刻我觉得心里七上八下' },
    { id: 6, text: '此刻我很从容、不慌乱', reverse: true },
    { id: 7, text: '此刻我很担心会出什么岔子' },
    { id: 8, text: '此刻我能轻松地专注于眼前', reverse: true },
    { id: 9, text: '此刻我心很乱，静不下来' },
    { id: 10, text: '此刻我感觉蛮自在、舒服', reverse: true },
    { id: 11, text: '平时我常无缘无故地担心' },
    { id: 12, text: '平时我很容易被小事搞到紧张' },
    { id: 13, text: '平时我遇事一般都比较淡定', reverse: true },
    { id: 14, text: '平时我常在脑海里预演坏结果' },
    { id: 15, text: '平时我睡不好或翻来覆去时偏多' },
    { id: 16, text: '平时我比多数人更容易烦躁' },
    { id: 17, text: '平时我能较快地从紧张里缓过来', reverse: true },
    { id: 18, text: '平时我容易为没发生的事先焦虑起来' },
    { id: 19, text: '平时我承受压力的能力还不错', reverse: true },
    { id: 20, text: '平时我总觉得心里悬着一块石头' }
  ],
  dimsMode: {
    scaleMax: 4,
    subscales: [
      {
        name: '状态焦虑', code: 'S', short: '此刻紧张', items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        interpretation: [
          { min: 1, max: 2.2, level: '此刻平稳', description: '你现在这一刻总体平静，身体和情绪都比较松弛，不被眼前的压力轻易扰动。' },
          { min: 2.2, max: 3.1, level: '此刻轻微紧绷', description: '当下略有一点紧张，但还能稳住，属于面对眼前情境的正常应激反应。' },
          { min: 3.1, max: 4, level: '此刻明显紧张', description: '你现在正处于明显的紧张应激中：心慌、注意力难集中或难以放松。这更多是对"当下处境"的反应，换一个环境常常就会缓解。' }
        ]
      },
      {
        name: '特质焦虑', code: 'T', short: '平素底色', items: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        interpretation: [
          { min: 1, max: 2.2, level: '平素松弛', description: '你平时不太容易被小事激起焦虑，遇事大多能稳住、扛得住，是朋友眼里比较沉得住气的类型。' },
          { min: 2.2, max: 3.1, level: '平素适中', description: '你的焦虑倾向比较居中：有压力时会紧张，放松时也能真正放下，一般能自我调节。' },
          { min: 3.1, max: 4, level: '平素偏高', description: '你骨子里有偏高的焦虑底色，容易为没发生的事提前担心、反复预演坏结果。这不是缺点，但你更需要一套"给大脑踩刹车"的稳定方法，否则情绪容易持续透支。' }
        ]
      }
    ],
    combos: [
      { when: [{ dim: 'S', level: '此刻明显紧张' }, { dim: 'T', level: '平素松弛' }], label: '情景应激型', text: '你平时挺稳，只在遇到具体压力事件时突然被点燃。这类焦虑是"事件驱动"的——处理好眼前的事、及时做放松练习，往往就能快速回落。' },
      { when: [{ dim: 'S', level: '此刻平稳' }, { dim: 'T', level: '平素偏高' }], label: '底色持枪型', text: '你现在此刻不紧张，但骨子里常揣着一份隐隐的担忧。累的不是某一个具体事件，而是长期"悬着的心"。建立稳定作息与正念练习，比临阵救火更能治本。' },
      { when: [{ dim: 'S', level: '此刻明显紧张' }, { dim: 'T', level: '平素偏高' }], label: '双重负荷型', text: '你既是"当下应激"又叠加"底色焦虑"，等于双重负荷同时压在肩上。这时最需要的是先照顾好当下的身体信号，再考虑长期降低底色，必要时请找专业人士聊聊。' }
    ]
  }
};