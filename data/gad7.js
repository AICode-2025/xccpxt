/* 焦虑筛查量表 GAD-7（广泛性焦虑障碍量表）
 * 国际通用焦虑自评筛查工具，授权宽松。
 * 7 题，0-3 计分，总分 0-21。
 * 0-4 无 / 5-9 轻度 / 10-14 中度 / 15-21 重度。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.gad7 = {
  id: 'gad7',
  icon: '😟',
  color: '#8b5cf6',
  hook: '你有多容易被焦虑困住？',
  intro: '国际通用的焦虑自评筛查工具，评估最近两周的焦虑困扰程度。结果包含严重程度分级与应对建议。',
  source: 'GAD-7（Spitzer 等 2006）· 国际通用筛查工具',
  title: '焦虑自评筛查（GAD-7）',
  short: '焦虑筛查',
  category: 'screen',
  disclaimerLevel: 'screen',
  timeMinutes: 2,
  desc: '国际通用的焦虑自评筛查工具，2 分钟完成，结果仅供参考。',
  instruction: '在最近两个星期里，你被以下问题困扰的频率是多少？',
  options: [
    { text: '完全没有', score: 0 },
    { text: '有几天', score: 1 },
    { text: '一半以上天数', score: 2 },
    { text: '几乎每天', score: 3 }
  ],
  questions: [
    { id: 1, text: '感觉紧张、焦虑或急切' },
    { id: 2, text: '不能停止或控制担忧' },
    { id: 3, text: '对各种各样的事情担忧过多' },
    { id: 4, text: '很难放松下来' },
    { id: 5, text: '由于不安而无法静坐' },
    { id: 6, text: '变得容易烦恼或急躁' },
    { id: 7, text: '感到似乎将有可怕的事情发生而害怕' }
  ],
  scoring: { method: 'sum' },
  referral: {
    minScore: 15,
    text: '你的焦虑筛查结果达到重度水平。自评工具不能替代诊断，但这个分数值得被认真对待：建议尽快前往医院心理科或精神科就诊，或拨打下方 24 小时心理援助热线。'
  },
  interpretation: [
    {
      min: 0, max: 4, level: '没有明显焦虑',
      description: '最近两周你没有明显的焦虑困扰。',
      suggestions: ['保持当前节奏', '焦虑是正常情绪，偶尔紧张无需在意']
    },
    {
      min: 5, max: 9, level: '轻度焦虑',
      description: '你存在轻度焦虑症状，通常与近期压力相关，通过自我调节多数可以缓解。',
      suggestions: ['识别压力源，能砍的事先砍掉一两件', '每天留 20 分钟给运动或放松练习', '两周后复测，看趋势而不是看单次']
    },
    {
      min: 10, max: 14, level: '中度焦虑',
      description: '你的焦虑症状达到中度水平，可能已经影响睡眠或注意力。建议进行专业评估。',
      suggestions: ['前往医院心理科或精神科评估', '减少咖啡因和酒精摄入', '把这份结果带给医生作参考']
    },
    {
      min: 15, max: 21, level: '重度焦虑',
      description: '你的焦虑筛查结果为重度。请尽快寻求专业帮助，这是可以治疗的状态，不必独自硬扛。',
      suggestions: ['尽快就医，精神科或心理科', '告诉一位信任的人你的状态', '如感到极度痛苦，立即拨打下方热线']
    }
  ]
};
