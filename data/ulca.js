/* UCLA 孤独感量表（第三版）· 自评版
 * Russell, Peplau & Ferguson 编制，经典孤独感自评量表。
 * 20 题，1-4 计分；反向题 1/5/6/9/10/15/16/19/20。
 * 总分 20-80，分数越高表示孤独感越明显；结果仅供自我探索与参考。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.ulca = {
  id: 'ulca',
  recommends: ['socanx','fes','trust'],
  icon: '🕊️',
  color: '#5aa7a7',
  hook: '你的孤独感，到底有多高？',
  intro: '来自经典 UCLA 孤独量表的自评题型，评估你在日常社交中的孤独感受。20 题约 3 分钟，分数越高代表你当下体验到的孤独感越明显。结果仅供自我探索参考，不代表任何诊断。',
  source: 'UCLA 孤独量表（第三版）· 经典自评',
  title: 'UCLA 孤独测评',
  short: '孤独测评',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 3,
  desc: '评估你近期的社交孤独感受，分清"独处"与"感到孤单"。',
  instruction: '请根据自己的真实感受作答，选择最符合你近期状态的一项，凭第一印象即可。',
  options: [
    { text: '从不', score: 1 },
    { text: '很少', score: 2 },
    { text: '有时', score: 3 },
    { text: '经常', score: 4 }
  ],
  questions: [
    { id: 1, text: '我和身边的人相处得很合拍', reverse: true },
    { id: 2, text: '我缺少可以陪伴我的人' },
    { id: 3, text: '身边没有我能求助的人' },
    { id: 4, text: '我常常感到自己是孤独的' },
    { id: 5, text: '我是朋友圈子里的一员', reverse: true },
    { id: 6, text: '我和周围的人有很多共同话题', reverse: true },
    { id: 7, text: '我和任何人都走得不再亲近' },
    { id: 8, text: '我的兴趣和想法很少得到身边人的共鸣' },
    { id: 9, text: '我是个外向开朗的人', reverse: true },
    { id: 10, text: '身边有让我感到亲近的人', reverse: true },
    { id: 11, text: '我常常觉得自己被人冷落' },
    { id: 12, text: '我的社交关系大多浮于表面' },
    { id: 13, text: '没有人真正了解我' },
    { id: 14, text: '我时常感到自己与周围人格格不入' },
    { id: 15, text: '只要我想，我就能找到人作伴', reverse: true },
    { id: 16, text: '身边有人能真正理解我', reverse: true },
    { id: 17, text: '我会因为自己这么孤僻而感到低落' },
    { id: 18, text: '身边虽然有人，但似乎没人真正走近我' },
    { id: 19, text: '身边有可以说说心里话的人', reverse: true },
    { id: 20, text: '身边有我可以依靠的人', reverse: true }
  ],
  scoring: { method: 'sum' },
  interpretation: [
    {
      min: 20, max: 39, level: '孤独感较低',
      description: '你的孤独感处在较低水平，社交联结比较充足。你身边有能说上话、靠得住的人，也能在独处与相处之间找到平衡。',
      suggestions: ['保持主动联系的习惯，让好关系细水长流', '独处很自在，但也别忘了留点时间给亲近的人', '如果偶尔感觉低落，把它当作正常的情绪起伏就好']
    },
    {
      min: 40, max: 59, level: '间歇性孤独',
      description: '你的孤独感中等，时而有"好像没人懂我"的瞬间，但并非持续。这通常与近期生活变动、社交圈变化有关。',
      suggestions: ['主动联系一位久未联系的朋友，哪怕只是聊两句', '试着加入一个小而稳定的圈子（兴趣小组、运动搭子）', '记录一下让你孤独的场景，多数时候是"暂时"的']
    },
    {
      min: 60, max: 80, level: '孤独感偏高',
      description: '你的孤独感较明显，社交联结似乎有些薄弱。孤独是可以被改变的，需要主动迈出"连接"的第一步。',
      suggestions: ['从一件小事开始：给对方发消息，或约一次轻松的见面', '把健康作息和规律运动放在前面，它会提升你的社交意愿', '如果已持续很久且伴有持续低落，建议找信任的人聊聊或向专业心理咨询求助']
    }
  ]
};