window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.bdi = {
  id: 'bdi',
  title: 'BDI 贝克抑郁自评',
  short: '抑郁自评',
  icon: '🌑',
  color: '#64748b',
  hook: '最近两周，你的情绪到底有多低？用 21 道题自我照看。',
  intro: '这是基于 BDI 框架的抑郁倾向自评，用来帮你大致感受近来情绪、想法和身体状态的起伏。得分只能作为自我关照的参考，不能替代专业评估。',
  source: 'BDI 框架 · 原创通用题句版',
  category: 'screen',
  disclaimerLevel: 'screen',
  timeMinutes: 4,
  desc: '评估近两周抑郁倾向的整体水平，中度以上提示寻求专业支持。',
  instruction: '回想最近两周，每题选出最符合你实际情况的一项。',
  options: [
    { text: '完全没这样', score: 0 },
    { text: '偶尔会这样', score: 1 },
    { text: '经常这样', score: 2 },
    { text: '几乎一直这样', score: 3 }
  ],
  questions: [
    { id: 1, text: '我感到情绪低落、提不起精神。' },
    { id: 2, text: '我对平时喜欢的事也提不起兴趣。' },
    { id: 3, text: '我觉得自己被身边人冷落和疏远。' },
    { id: 4, text: '我很容易自责，觉得自己这也不行那也不行。' },
    { id: 5, text: '我常常感到内疚，觉得很多事情是我的错。' },
    { id: 6, text: '我会反复想起令人痛苦或后悔的事。' },
    { id: 7, text: '我觉得未来一片灰暗，看不到希望。' },
    { id: 8, text: '近来看看会想，要是没了我也许更好。' },
    { id: 9, text: '入睡困难或总是早醒。' },
    { id: 10, text: '白天总是很疲倦，做什么都提不起劲。' },
    { id: 11, text: '我比以前更容易烦躁和没有耐心。' },
    { id: 12, text: '我不太想和别人交往，只想一个人待着。' },
    { id: 13, text: '我经常拿不定主意，变得越来越犹豫。' },
    { id: 14, text: '我对自己很不满，总在挑自己的毛病。' },
    { id: 15, text: '我担心别人在背后议论或笑话我。' },
    { id: 16, text: '我有时觉得自己很孤单、没有人真正懂我。' },
    { id: 17, text: '我比以前更容易哭或觉得委屈。' },
    { id: 18, text: '我的食欲明显变好或变差。' },
    { id: 19, text: '我觉得自己很难集中注意力看书或工作。' },
    { id: 20, text: '我做很多事都觉得没什么意义。' },
    { id: 21, text: '我会有伤害自己的想法或念头。' }
  ],
  scoring: {
    method: 'sum',
    subscales: [
      { name: '情绪与想法', items: [1,2,3,4,5,6,7,8,20,21] },
      { name: '身体与行为', items: [9,10,11,12,13,14,15,16,17,18,19] }
    ]
  },
  interpretation: [
    { min: 0, max: 13, level: '情绪平稳', description: '近两周情绪整体平稳，没有明显的低落信号。', suggestions: ['保持规律作息，继续关注自己的情绪状态。'] },
    { min: 14, max: 19, level: '轻度倾向', description: '出现一些低落和疲惫的苗头，值得留意自己的情绪节奏。', suggestions: ['适当增加户外活动与社交，允许自己放松一下。'] },
    { min: 20, max: 28, level: '中度倾向', description: '情绪困扰明显，可能正在影响睡眠、兴趣和精力，建议寻求支持。', suggestions: ['和信任的人聊聊，或拨打心理援助热线获得支持。'] },
    { min: 29, max: 1e9, level: '较明显', description: '低落程度较明显，强烈建议尽快联系专业心理服务或医疗机构。', suggestions: ['请及时拨打 12356 心理援助热线，或预约线下心理/精神科门诊。'] }
  ],
  referral: {
    minScore: 20,
    items: { 21: 0 },
    text: '你提到存在伤害自己的想法或情绪困扰已较明显。请务必及时拨打 12356 心理援助热线，或尽快联系身边信任的人与专业机构，你不是一个人。'
  },
  recommends: ['phq9', 'cesd', 'rum']
};