window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.parel = {
  id: 'parel',
  title: '亲子关系质量自评',
  short: '亲子关系',
  icon: '👨‍👩‍👧',
  color: '#ec4899',
  hook: '你和父母之间，是"亲近"多，还是"鸡同鸭讲"更多？',
  intro: '亲子关系质量不是血缘自动附赠的，而是三根线撑起来的：日常的亲近感、能不能好好沟通、有没有频繁的正面冲突。看你站在这三根线的什么位置。',
  source: '亲子关系质量框架（亲近/沟通/冲突）· 原创通用题句版',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '从亲近感、沟通质量、冲突程度三个角度审视你与父母的关系。',
  instruction: '站在你自己与父母（或主要抚养人）整体互动的角度作答。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '非常符合', score: 5 }
  ],
  questions: [
    { id: 1, dim: 'close', text: '和家人在一起时，我会比较放松、自在。' },
    { id: 2, dim: 'close', text: '遇到开心的事，我愿意第一时间和家人分享。' },
    { id: 3, dim: 'close', text: '家里给我一种"有退路"的安定感。' },
    { id: 4, dim: 'close', text: '难过的时候，我会想回家待一会儿。' },
    { id: 5, dim: 'com', text: '和父母说话时，大部分话能说到点子、听进对方。' },
    { id: 6, dim: 'com', text: '我能比较坦率地和父母谈自己的想法。' },
    { id: 7, dim: 'com', text: '即便意见不同，我们也多半能好好讲清楚，而不是直接冷战。' },
    { id: 8, dim: 'com', text: '父母愿意听我讲完，而不是一上来就否定。' },
    { id: 9, dim: 'conf', text: '和父母一谈到某些话题就容易吵起来。', reverse: true },
    { id: 10, dim: 'conf', text: '我常因为父母"管太多"而生闷气。', reverse: true },
    { id: 11, dim: 'conf', text: '家里出现过让我很久都缓不过来的激烈争执。', reverse: true },
    { id: 12, dim: 'conf', text: '我有时觉得和父母之间隔着一层说不清的墙。', reverse: true }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '亲近感', code: 'C', short: '心靠近', items: [1,2,3,4],
        interpretation: [
          { min: 1, max: 2.6, level: '亲近偏弱', description: '你与父母的心理距离较远，陪伴和依恋感不太够。' },
          { min: 2.6, max: 3.4, level: '亲近适中', description: '你与家人有一定亲近感，但深浅随情境变化。' },
          { min: 3.4, max: 5, level: '亲近紧密', description: '你和家人的情感纽带较紧，彼此能互相取暖。' }
        ]
      },
      {
        name: '沟通质量', code: 'G', short: '聊得通', items: [5,6,7,8],
        interpretation: [
          { min: 1, max: 2.6, level: '沟通不畅', description: '你和父母的话常常说不到一起，容易各说各的。' },
          { min: 2.6, max: 3.4, level: '沟通尚可', description: '多数话题能聊，但敏感的节点容易卡住。' },
          { min: 3.4, max: 5, level: '沟通顺畅', description: '你们敢谈、谈得深，是关系里很结实的部分。' }
        ]
      },
      {
        name: '冲突程度', code: 'L', short: '少吵', items: [9,10,11,12],
        interpretation: [
          { min: 1, max: 2.6, level: '冲突偏多', description: '正向冲突较多，家里容易升温，需练习冷却与边界。' },
          { min: 2.6, max: 3.4, level: '冲突适中', description: '有摩擦但总体可控，属于正常范围。' },
          { min: 3.4, max: 5, level: '氛围平和', description: '家里冲突较少，多半能平静把分歧放下。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'C', level: '亲近紧密' }, { dim: 'G', level: '沟通顺畅' }],
        label: '温暖会客厅',
        text: '亲近又聊得开，你是家里"oft受用那杯热茶"的存在，关系底盘很稳。'
      },
      {
        when: [{ dim: 'G', level: '沟通不畅' }, { dim: 'L', level: '冲突偏多' }],
        label: '低频争论型',
        text: '说不到一起又容易吵，往往是心里话没被听懂的连锁反应。先学着只重复对方的观点，往往能破局。'
      }
    ]
  },
  recommends: ['embu', 'fes', 'attachment']
};