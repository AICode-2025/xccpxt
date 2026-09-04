/* 情绪调节困难 DERS-简化 · 通用自评版
 * 维度框架参考 Difficulties in Emotion Regulation Scale（Gratz & Roemer 2004）：
 * 对情绪的非接受、目标受阻、冲动控制难、策略不足 四类调节困难（原创精简版）。
 * 题项为本站原创通用自评句。
 * 16 题（4 维 × 4 题），1-5 计分，含反向题；各维取均值（1-5）判档。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.ders = {
  id: 'ders',
  recommends: ['erq','sres','ghq12'],
  icon: '🪢',
  color: '#a855f7',
  hook: '情绪起来时，是它管你，还是你管它？',
  intro: '参考经典情绪调节困难框架，帮你看清自己在情绪面前的四个"卡点"：是不是总不接纳它、会不会让情绪打乱正事、情绪上头时能不能管住冲动、以及手头到底有没有调适的办法。16 题约 3 分钟。只是照见卡点，不算诊断，看出方向就能练。结果仅供自我探索参考。',
  source: 'Gratz & Roemer（2004）构思 · 原创精简题句版',
  title: 'DERS 情绪调节困难',
  short: '情绪调节困难',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 3,
  desc: '照见你在"接纳、稳住正事、管住冲动、有办法调节"四个卡点的困难程度。',
  instruction: '请判断下列陈述在多大程度上符合你，凭真实反应作答。',
  options: [
    { text: '完全不符合', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '有点符合', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '完全符合', score: 5 }
  ],
  questions: [
    { id: 1, text: '情绪一来，我会对自己的感受很反感或生气' },
    { id: 2, text: '我很难接受"自己现在确实很难受"这件事' },
    { id: 3, text: '我常觉得自己不应该有负面情绪' },
    { id: 4, text: '感到情绪时，我会因此对自己更苛刻' },
    { id: 5, text: '一有负面情绪，我就很难把手上的正事做下去' },
    { id: 6, text: '情绪上来时，我很难把注意力放在任务上' },
    { id: 7, text: '难过或生气常常让我没法把事做完' },
    { id: 8, text: '我会因为情绪而临时打乱本来的计划' },
    { id: 9, text: '情绪特别强烈时，我容易做出冲动的举动' },
    { id: 10, text: '气头上时，我很难劝自己先停一停' },
    { id: 11, text: '情绪激动时，我几乎控制不住自己的反应' },
    { id: 12, text: '我能在情绪上头时管好自己的言行', reverse: true },
    { id: 13, text: '难过时，我常常不知道用什么办法让自己好受些' },
    { id: 14, text: '我觉得自己调节情绪的办法很有限' },
    { id: 15, text: '情绪低落时，我都不知道怎么安抚自己' },
    { id: 16, text: '我有一套挺有效的方法让自己慢慢平复', reverse: true }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '情绪非接受', code: 'N', short: '不接纳', items: [1, 2, 3, 4],
        interpretation: [
          { min: 1, max: 2.4, level: '偏低', description: '你比较能允许自己当下有情绪，不太会斥责自己"不该难受"，情绪被堵的概率低。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你有时能接纳情绪，有时又嫌自己"不该这样"，接纳度处于常见区间。' },
          { min: 3.6, max: 5, level: '偏高', description: '你常常不接纳自己的情绪，一难受就怪自己"不应该"。越不接纳，情绪越容易反复。试着先承认"我现在确实这样"，是放松的第一步。' }
        ]
      },
      {
        name: '目标受阻', code: 'G', short: '被打断', items: [5, 6, 7, 8],
        interpretation: [
          { min: 1, max: 2.4, level: '偏低', description: '情绪基本不会让你撂下正事，你能带着情绪继续做事。' },
          { min: 2.4, max: 3.6, level: '中等', description: '平常情绪不影响你，大情绪来了你偶尔会停摆。' },
          { min: 3.6, max: 5, level: '偏高', description: '情绪一起来就容易打断你的专注和计划。可以试试"先做三分钟"的启动法，让行动带着情绪走，而不是等情绪好了再动。' }
        ]
      },
      {
        name: '冲动控制', code: 'I', short: '管不住', items: [9, 10, 11, 12],
        interpretation: [
          { min: 1, max: 2.4, level: '偏低', description: '情绪再强烈，你大体也能管住自己的言行，冲动反应较少。' },
          { min: 2.4, max: 3.6, level: '中等', description: '多数时候你能忍住，情绪特别冲的时候偶尔失手。' },
          { min: 3.6, max: 5, level: '偏高', description: '情绪上头时你常控制不住反应，事后又后悔。对策是别在气头上决定任何大事：先离开现场、数十个数，给自己一个缓冲。' }
        ]
      },
      {
        name: '策略不足', code: 'S', short: '没工具', items: [13, 14, 15, 16],
        interpretation: [
          { min: 1, max: 2.4, level: '偏低', description: '你手头有不少有效的安抚方法，难受时知道怎么让自己缓过来。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你有些调节办法，但有时也想不出该用哪个，工具箱还有扩大的空间。' },
          { min: 3.6, max: 5, level: '偏高', description: '你觉得自己调适情绪的办法很有限，难过时常不知怎么安抚自己。这部分是最有提升空间的：可以专门自备三件"累了能回血的清单"，到时候照着用。' }
        ]
      }
    ],
    combos: [
      { when: [{ dim: 'S', level: '偏高' }, { dim: 'N', level: '偏高' }], label: '堵而难放型', text: '你不接纳情绪、又缺调适办法——情绪容易既堵着又无处下手。先从不评判自己开始，再准备一套安抚清单，让情绪有出口、有工具。' },
      { when: [{ dim: 'G', level: '偏高' }, { dim: 'I', level: '偏高' }], label: '情绪劫持操作型', text: '情绪时常劫持你的正事和嘴/手，让你停摆或冲动。关键是给反应装一个"刹车"：先停三秒、离开现场，再决定说什么做什么。' }
    ]
  }
};