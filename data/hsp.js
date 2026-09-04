window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.hsp = {
  id: 'hsp',
  title: '高敏感人群测评',
  short: '高敏感',
  icon: '🎧',
  color: '#8b5cf6',
  hook: '你不是想太多，只是接收器比别人更灵敏。',
  intro: '高敏感（HSP）不是缺陷，而是一种更精细的信息处理特质：对细节、情绪和环境刺激反应更深。用 12 道题看看你在这个光谱上处在什么位置。',
  source: '高敏感人格理论框架 · 原创通用题句版',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '评估你对细节、刺激与情绪的深度加工倾向，理解自己"收得到更多"的底层机制。',
  instruction: '请判断下列描述在多大程度上符合你。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '非常符合', score: 5 }
  ],
  questions: [
    { id: 1, dim: 'depth', text: '我常会注意到别人忽略的细节，比如物品摆放或语气的变化。' },
    { id: 2, dim: 'depth', text: '我做事之前习惯把各种可能先想一遍。' },
    { id: 3, dim: 'depth', text: '聊天时我能感觉到对方没明说的情绪。' },
    { id: 4, dim: 'depth', text: '嘈杂或刺激太多的环境会让我难以思考。' },
    { id: 5, dim: 'arousal', text: '大音量、强光或拥挤的场合容易让我觉得累。' },
    { id: 6, dim: 'arousal', text: '我比身边人更容易被咖啡、熬夜这类小事影响状态。' },
    { id: 7, dim: 'arousal', text: '突然的惊吓或过载会让我很久缓不过来。' },
    { id: 8, dim: 'arousal', text: '一天经历太多事后，我需要独处来"充电"。' },
    { id: 9, dim: 'emotion', text: '别人难过时，我会不由自主跟着难受。' },
    { id: 10, dim: 'emotion', text: '看感人片段时，我比别人更容易掉眼泪或起鸡皮疙瘩。' },
    { id: 11, dim: 'emotion', text: '我会因为一句轻飘飘的评价琢磨很久。' },
    { id: 12, dim: 'emotion', text: '面对冲突或冷场，我的不适感会比别人更明显。' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '深度加工', code: 'D', short: '想得深', items: [1,2,3,4],
        interpretation: [
          { min: 1, max: 2.6, level: '粗线条', description: '你偏向快速抓主干，不太在细节和潜在含义上停留。' },
          { min: 2.6, max: 3.4, level: '适度加工', description: '你有时思考较细，有时则凭直觉快速推进。' },
          { min: 3.4, max: 5, level: '深度加工', description: '你习惯把信息咀嚼得很深，这让你常能看见别人看不到的层次。' }
        ]
      },
      {
        name: '易唤醒', code: 'A', short: '易过载', items: [5,6,7,8],
        interpretation: [
          { min: 1, max: 2.6, level: '吸收良好', description: '你对外界刺激耐受较强，嘈杂环境也不太容易消耗你。' },
          { min: 2.6, max: 3.4, level: '可调节', description: '你会被刺激影响，但能通过休息和环境调整恢复。' },
          { min: 3.4, max: 5, level: '易过载', description: '你对外界刺激较敏感，需要主动安排安静时间为自己蓄能。' }
        ]
      },
      {
        name: '情绪反应', code: 'E', short: '感受强', items: [9,10,11,12],
        interpretation: [
          { min: 1, max: 2.6, level: '情绪平稳', description: '你对外界情绪事件的卷入较浅，不容易被牵动。' },
          { min: 2.6, max: 3.4, level: '情绪中等', description: '你会共情但整体能收放，情绪反应多数时候可自控。' },
          { min: 3.4, max: 5, level: '情绪共鸣', description: '你对他人的情绪几乎照单全收，记得给自己划一道情绪边界。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'D', level: '深度加工' }, { dim: 'A', level: '易过载' }],
        label: '双高敏感型',
        text: '既想得深又易过载——你是一座高精度的雷达，也最容易累。善用独处充电，你的敏感会是优势而不是负担。'
      }
    ]
  },
  recommends: ['embarrass', 'selfcrit', 'mindful']
};