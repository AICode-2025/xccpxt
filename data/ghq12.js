/* 一般健康问卷 GHQ-12 · 通用自评版
 * 维度框架参考 General Health Questionnaire-12（Goldberg 1970s）：近期一般心理
 * 困扰水平（睡眠/专注/应对/情绪/自信等），用于筛查可能的心理压力。
 * 题项为本站原创通用自评句。
 * 12 题，1-4 计分；反向题 6 道（1/3/4/7/8/12，正向能力表述）；
 * 粗分 12-48，三档；明显困扰触发转介建议。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.ghq12 = {
  id: 'ghq12',
  recommends: ['pss10','bai','cesd'],
  icon: '🫀',
  color: '#10b981',
  hook: '这段时间，你心里的那根弦绷紧了吗？',
  intro: '参考经典一般健康问卷框架，快速评估你最近这段时期的整体心理困扰水平——从睡眠、专注、应对压力到情绪与自信。12 题约 3 分钟，按粗分归入三档。结果仅供筛查参考，不能替代专业诊断，明显困扰请及早求助。',
  source: 'Goldberg 构思 · 通用自评题句版',
  title: 'GHQ-12 一般心理困扰',
  short: '一般健康问卷',
  category: 'screen',
  disclaimerLevel: 'screen',
  timeMinutes: 3,
  desc: '12 题快速评估近期整体心理困扰水平，衡量你的"心弦"绷得多紧。',
  instruction: '请对照平时，选出最近这段时间你在下列情况上的表现程度。',
  options: [
    { text: '完全没有', score: 1 },
    { text: '有一点', score: 2 },
    { text: '比较明显', score: 3 },
    { text: '非常明显', score: 4 }
  ],
  questions: [
    { id: 1, text: '能像平时一样集中精力做事情', reverse: true },
    { id: 2, text: '因为担心而夜里睡不好' },
    { id: 3, text: '遇到事情时能够拿定主意', reverse: true },
    { id: 4, text: '觉得足以应对生活中的问题', reverse: true },
    { id: 5, text: '整天处于紧绷、难以放松的状态' },
    { id: 6, text: '觉得很多事情力不从心、应付不来' },
    { id: 7, text: '能从平时的活动中体会到乐趣', reverse: true },
    { id: 8, text: '能够正面面对自己的困难', reverse: true },
    { id: 9, text: '感到不愉快或情绪低落' },
    { id: 10, text: '对自己失去信心、怀疑自己的价值' },
    { id: 11, text: '觉得做什么都不顺心' },
    { id: 12, text: '总的来说，心情还不错', reverse: true }
  ],
  scoring: { method: 'sum' },
  referral: {
    minScore: 36,
    text: '你的心理困扰自评已达中度以上，说明最近这段时间内耗不少。请别再独自硬扛：建议去心理科就诊评估，或拨打下方心理援助热线聊一聊。'
  },
  interpretation: [
    {
      min: 12, max: 24, level: '状态良好',
      description: '你最近的总体心理困扰较轻：睡眠、专注、情绪与自信大多在正常范围，少有被压力长期拖拽的感觉。',
      suggestions: ['保持规律作息与适度运动', '继续给情绪留出口，别等绷紧了才处理']
    },
    {
      min: 25, max: 35, level: '轻度困扰',
      description: '你存在轻度的心理困扰：可能在睡眠、专注、情绪上有些波动，多半与近期压力事件相关，但尚能维持。',
      suggestions: ['识别并先减少一件最耗你能量的负担', '每天安排 20 分钟以上活动或散步', '减少熬夜和独处时间，观察两周后复测对比', '若持续加重，建议咨询专业人士']
    },
    {
      min: 36, max: 48, level: '明显困扰',
      description: '你的心理困扰自评已达明显水平：睡眠、情绪、应对力等多个方面可能都受到影响。请优先照顾自己，及时求助。',
      suggestions: ['尽快前往医院心理科或精神科就诊', '拨打文末 24 小时心理援助热线，先说出来', '让一位信任的人知道你的状态，别独自硬撑']
    }
  ]
};