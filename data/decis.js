window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.decis = {
  id: 'decis',
  title: '决策风格测评',
  short: '决策风格',
  icon: '🎯',
  color: '#f97316',
  hook: '你不是优柔寡断，是你的"决策操作系统"长这样。',
  intro: '基于决策风格框架，把你做选择时的默认路径分成四类：理性盘算、凭直觉、听别人、先拖着。看清楚自己的默认回路，才能扬长避短。',
  source: '决策风格框架（理性/直觉/依赖/逃避）· 原创通用题句版',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 2,
  desc: '认清你做决定时的默认路径，找到更省力又不后悔的选择方式。',
  instruction: '每题看看是否符合你平时做决定的样子。1 = 完全不符合，5 = 完全符合。',
  options: [
    { text: '完全不符', score: 1 },
    { text: '不太符合', score: 2 },
    { text: '说不准', score: 3 },
    { text: '比较符合', score: 4 },
    { text: '非常符合', score: 5 }
  ],
  questions: [
    { id: 1, dim: 'rat', text: '做重要决定前，我会把各种选项的利弊一条条列出来。' },
    { id: 2, dim: 'rat', text: '我会认真收集信息，再慢慢权衡。' },
    { id: 3, dim: 'rat', text: '我倾向于用数据和逻辑而不是情绪来下判断。' },
    { id: 4, dim: 'rat', text: '做了决定后，我能说出自己这么选的依据。' },
    { id: 5, dim: 'int', text: '我做决定常靠第一感觉，常常一锤定音。' },
    { id: 6, dim: 'int', text: '面对复杂选择，我更多依赖"感觉顺不顺手"。' },
    { id: 7, dim: 'int', text: '凭直觉选的路，事后多数比我纠结的更准。' },
    { id: 8, dim: 'int', text: '别人给一大堆分析时，我反而相信自己的直觉。' },
    { id: 9, dim: 'dep', text: '我做选择时很依赖身边人的看法。' },
    { id: 10, dim: 'dep', text: '拿不定主意时，我常希望别人替我拍板。' },
    { id: 11, dim: 'dep', text: '我倾向于跟随大多数人或权威的意见。' },
    { id: 12, dim: 'dep', text: '别人劝一劝，我就容易改变自己的决定。' },
    { id: 13, dim: 'avo', text: '对于麻烦的选择，我习惯一拖再拖。' },
    { id: 14, dim: 'avo', text: '能做决定时，我常把决定往后推。' },
    { id: 15, dim: 'avo', text: '我宁可维持现状，也不愿为选择纠结。' },
    { id: 16, dim: 'avo', text: '重大的决定我总想等"更好的时机"再说。' }
  ],
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '理性决策', code: 'R', short: '精算师', items: [1,2,3,4],
        interpretation: [
          { min: 1, max: 2.6, level: '理性偏少', description: '你较少依赖系统分析，更多靠其他直觉或经验路径。' },
          { min: 2.6, max: 3.4, level: '理性适中', description: '你在需要时会启动分析，但不是每次都走全套流程。' },
          { min: 3.4, max: 5, level: '理性盘算', description: '你有精算师倾向，擅长权衡利弊、条理分明。' }
        ]
      },
      {
        name: '直觉决策', code: 'I', short: '直觉派', items: [5,6,7,8],
        interpretation: [
          { min: 1, max: 2.6, level: '直觉偏少', description: '你更依赖分析与判断，不太仰仗灵光一现。' },
          { min: 2.6, max: 3.4, level: '直觉适中', description: '你会听直觉，但必要时也能转向理性分析。' },
          { min: 3.4, max: 5, level: '直觉灵准', description: '你多半信赖第一反应，且这一手往往很准。' }
        ]
      },
      {
        name: '依赖他人', code: 'D', short: '跟随型', items: [9,10,11,12],
        interpretation: [
          { min: 1, max: 2.6, level: '自主性强', description: '你很少把决定权交给别人，习惯自己做主。' },
          { min: 2.6, max: 3.4, level: '适度参考', description: '你会参考他人意见，但最终主要还是自己拿主意。' },
          { min: 3.4, max: 5, level: '倾向依赖', description: '你较依赖旁人的意见，建议练习为自己的选择兜底。' }
        ]
      },
      {
        name: '拖延回避', code: 'A', short: '拖延派', items: [13,14,15,16],
        interpretation: [
          { min: 1, max: 2.6, level: '干脆利落', description: '你很少拖沓，倾向尽快把选择落定。' },
          { min: 2.6, max: 3.4, level: '适度拖延', description: '你在压力大的选择上会犹豫，但多数能推进。' },
          { min: 3.4, max: 5, level: '惯常拖延', description: '你常以拖延回避选择，代价往往是机会和精力被耗掉。' }
        ]
      }
    ],
    combos: [
      {
        when: [{ dim: 'R', level: '理性盘算' }, { dim: 'I', level: '直觉灵准' }],
        label: '双引擎决策者',
        text: '你既能摆数据又能信直觉，两条通道都可切换，是少见的"handy"决策高手。'
      },
      {
        when: [{ dim: 'D', level: '倾向依赖' }, { dim: 'A', level: '惯常拖延' }],
        label: '犹豫双螺旋',
        text: '既爱拖又爱问人，容易在原地打转。试着先定一个小决定并执行，重建对"拍板"的信心。'
      }
    ]
  },
  recommends: ['locus', 'sdt', 'workval']
};