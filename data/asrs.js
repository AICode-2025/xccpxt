window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.asrs = {
  id: 'asrs',
  title: '注意力与多动自评',
  short: '注意力自评',
  icon: '🔍',
  color: '#0ea5e9',
  hook: '总是丢三落四、坐不住？先看看是不是注意力在报警。',
  intro: '这是参考成人注意缺陷筛查简表思路的自陈筛查，帮你照看"注意力/多动"层面的困扰。结果只是自我对照的信号，不能替代专业评估与诊断。',
  source: 'ASRS 简版框架思路 · 原创通用题句版',
  category: 'screen',
  disclaimerLevel: 'screen',
  timeMinutes: 1,
  desc: '筛查成人常见的注意力涣散、多动冲动信号，明显倾向时建议专业评估。',
  instruction: '回想最近六个月，以下情况多久出现一次？',
  options: [
    { text: '从不', score: 0 },
    { text: '很少', score: 1 },
    { text: '有时', score: 2 },
    { text: '经常', score: 3 },
    { text: '几乎总是', score: 4 }
  ],
  questions: [
    { id: 1, text: '刚做完一件有挑战的工作后，我很难再接着做需要持续用脑的事。' },
    { id: 2, text: '需要条理分明的时候，我反而更容易凌乱、丢三落四。' },
    { id: 3, text: '事情一拖再拖，我常常到最后一刻才赶工完成。' },
    { id: 4, text: '长期重复或乏味的事，我比多数人更难坚持下来。' },
    { id: 5, text: '我常在不该动的时候坐不住，身体或心思总想动来动去。' },
    { id: 6, text: '话还没说完，我常忍不住抢话或插嘴。' }
  ],
  scoring: {
    method: 'sum',
    subscales: [
      { name: '注意力', items: [1,2,3,4] },
      { name: '多动冲动', items: [5,6] }
    ]
  },
  interpretation: [
    { min: 0, max: 7, level: '信号偏少', description: '注意力相关困扰不算明显，多数时候能稳住节奏。', suggestions: ['保持结构化习惯，通常不需要额外担心。'] },
    { min: 8, max: 12, level: '有信号', description: '出现一些注意/多动信号，正在影响你的效率或心情，建议多留意。', suggestions: ['试试番茄钟、减少干扰、任务切小块等自我管理技巧。'] },
    { min: 13, max: 1e9, level: '信号明显', description: '注意/多动方面的困扰较明显，已影响到生活与工作，建议寻求专业评估。', suggestions: ['建议前往精神心理科/注意力门诊做一次专业评估，获取针对性的建议。'] }
  ],
  referral: {
    minScore: 13,
    text: '你的注意/多动方面的困扰信号已较明显，对生活已造成压力。建议预约精神心理科或注意力障碍专科做一次专业评估，这类困扰通过科学方式管理能明显改善。'
  },
  recommends: ['procras', 'rum', 'phdep']
};