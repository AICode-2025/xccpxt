/* 压力知觉量表 PSS-10
 * Cohen 1983 编制，最常用的压力自评工具。
 * 10 题，0-4 计分；反向题 4/5/7/8；总分 0-40。 */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.pss10 = {
  id: 'pss10',
  icon: '⚡',
  color: '#14b8a6',
  hook: '你最近的压力，有多大？',
  intro: '测一测最近一个月，生活让你感到"绷不住"的程度。结果包含压力水平分档与减压建议。',
  source: 'PSS-10（Cohen 等 1983）· 经典压力自评',
  title: '压力知觉量表',
  short: '压力自评',
  category: 'screen',
  disclaimerLevel: 'screen',
  timeMinutes: 3,
  desc: '测一测最近一个月，生活让你感到"绷不住"的程度。',
  instruction: '请回想最近一个月的生活状态作答。答案没有对错，越真实越准。',
  options: [
    { text: '从来没有', score: 0 },
    { text: '偶尔', score: 1 },
    { text: '有时', score: 2 },
    { text: '时常', score: 3 },
    { text: '非常常见', score: 4 }
  ],
  questions: [
    { id: 1, text: '因为发生了意料之外的事情，我感到心烦意乱' },
    { id: 2, text: '我感到无法控制生活中的重要事情' },
    { id: 3, text: '我感到紧张不安且有压力' },
    { id: 4, text: '我成功地处理了恼人的生活麻烦', reverse: true },
    { id: 5, text: '我感到自己能有效地应对生活中的重要变化', reverse: true },
    { id: 6, text: '我感到自己有能力处理自己的个人问题', reverse: true },
    { id: 7, text: '事情顺心，我不被烦恼压得喘不过气', reverse: true },
    { id: 8, text: '我因为一些事情超出自己控制范围而生气' },
    { id: 9, text: '我想到那些必须完成的事情时，会感到头疼' },
    { id: 10, text: '我因为无法掌控所有事情而愤怒' }
  ],
  scoring: { method: 'sum' },
  referral: {
    minScore: 27,
    text: '你的压力水平已处于高位，长期高压力会实实在在拖垮身体和情绪。建议认真安排休息与求助：先从睡眠和运动入手，必要时寻求心理咨询的帮助。'
  },
  interpretation: [
    {
      min: 0, max: 13, level: '压力较低',
      description: '你感受到的压力处于较低水平，当前的生活节奏在你的掌控之中。',
      suggestions: ['保持当前的节奏和恢复习惯', '适当给自己一点挑战，压力太低也会无聊']
    },
    {
      min: 14, max: 26, level: '压力中等',
      description: '你感受到中等程度的压力，这在大多数成年人中很常见。关键是别让紧绷变成常态。',
      suggestions: ['每天固定 30 分钟做与工作无关的事', '睡前一小时远离手机', '把待办事项写下来，别全装在脑子里']
    },
    {
      min: 27, max: 40, level: '压力偏高',
      description: '你的压力水平偏高，身体和情绪可能已经发出信号（失眠、易怒、疲惫感）。持续下去会影响免疫力与判断力，需要主动减负。',
      suggestions: ['列出所有压力源，划掉两件"其实没那么重要"的', '这一周给自己安排一次真正的休息', '把部分事情请求帮助或直接说"不"', '如伴随持续失眠或情绪低落，建议寻求专业支持']
    }
  ]
};
