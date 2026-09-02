/* 拖延倾向 PROCRASTINATION · 通用自评版
 * 参考经典拖延（Procrastination）通识框架：明知该做却反复推迟、直到最后才会行动的倾向。
 * 题项为原创通用自评句。
 * 10 题，1-5 计分，反向题 3 道；粗分 10-50，分三档。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.procras = {
  id: 'procras',
  recommends: ['grit','gses','sres'],
  icon: '⏳',
  color: '#f97316',
  hook: '那件事，你打算什么时候开始做？',
  intro: '别拖延，先花 1 分钟测一下你的拖延水平。这是衡量你"明明该做、却总想先做点别的"的倾向。注意：拖延不是懒，拖延拖着的那件事通常是难的、让你不舒服的——看清它，才能拆掉它。结果仅供自我探索参考。',
  source: '拖延倾向通识框架 · 原创通用题句版',
  title: '拖延倾向自评',
  short: '拖延倾向',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '1 分钟看清你的拖延水平，以及它拖着的那件事有什么共性。',
  instruction: '请判断下列陈述在多大程度上符合你，凭第一印象作答。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '有点符合', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    { id: 1, text: '我经常把事情拖到最后一刻才真正开始' },
    { id: 2, text: '即使明天要交，我也常拖到今晚才匆匆动手' },
    { id: 3, text: '我习惯先做容易的，把难的正事往后放' },
    { id: 4, text: '我常给自己找理由，推迟原计划好要去做的事' },
    { id: 5, text: '我通常能按计划提前把事做完', reverse: true },
    { id: 6, text: '我会提前拆解任务，避免到跟前手忙脚乱', reverse: true },
    { id: 7, text: '只要一开始动手，我大多能把它做下去', reverse: true },
    { id: 8, text: '我常因为刷手机、看视频而把正事放到一边' },
    { id: 9, text: '拖着拖着，我常陷入自责或焦虑' },
    { id: 10, text: '越是重要的事，我反而越容易拖' }
  ],
  scoring: { method: 'sum' },
  interpretation: [
    {
      min: 10, max: 23, level: '行动干脆',
      description: '你的拖延倾向比较低，多数时候能按计划推进，难事也不会长期搁着。这份执行力是稀缺的。',
      suggestions: ['保持现有的节奏', '偶有拖的时候不用苛责，别让"拖延懊悔"再添一层内耗']
    },
    {
      min: 24, max: 36, level: '中度拖延',
      description: '你有中度的拖延倾向：一些难事或大事会被你一拖再拖，常到 Deadline 前才集中发力。',
      suggestions: ['把大任务拆成很小的"第一步"，只逼自己先做五分钟', '给逃避的任务设一个明确的启动时间', '识别你最容易拖的是哪类事，通常那正是你不舒服的点']
    },
    {
      min: 37, max: 50, level: '重度拖延',
      description: '你的拖延程度偏高，很多重要的事被长期推迟，伴随自责和焦虑。拖延常是"对难度与情绪的回避"，不是能力问题。',
      suggestions: ['优先对付"最难的那件"，给它划一个 25 分钟就动手', '别等状态好再做，先开始了状态才会来', '允许自己不完美地开始，完成比完美重要', '若拖延已明显影响学业工作，可向咨询师聊聊背后的原因']
    }
  ]
};