/* ============================================================
   星辰测评 · 配对矩阵核心逻辑（纯函数，无 DOM 依赖）
   - 逐维比较两个类型的四字母代码（E/I · S/N · T/F · J/P）
   - 相同维数 → 匹配度分档（0-4 个相同字母）
   - 生成同频点 / 差异点文案
   娱乐向，仅供传播，不构成任何关系建议
   ============================================================ */
(function () {
  'use strict';

  var DIMS = ['EI', 'SN', 'TF', 'JP'];

  var POLE_LABEL = {
    E: '外向', I: '内向', S: '实感', N: '直觉',
    T: '思考', F: '情感', J: '计划', P: '随性'
  };

  /* 匹配度分档：按"相同字母数"给分与主文案 */
  var BANDS = [
    {
      n: 4, name: '同频共振', score: 97,
      note: '你们像同一个出厂批次——互相秒懂，稳定省心。唯一要小心的是同质化：太像了，容易一起闷、一起较真，少了点新鲜感。'
    },
    {
      n: 3, name: '天然盟友', score: 90,
      note: '多数频道天然对齐，分歧点反而成了新鲜感的来源。属于高兼容组合：好沟通、有默契，偶尔的小不同还能互相点醒。'
    },
    {
      n: 2, name: '互补拍档', score: 82,
      note: '经典 CP 区。一个人冲的时候另一个人稳，一个人想的时候另一个人做。摩擦是日常，但吸引力也是——你们互补的地方，正是对方最需要的地方。'
    },
    {
      n: 1, name: '火花四溅', score: 68,
      note: '差异占主导：对方的理所当然，对你可能是天方夜谭。你们互为镜子，相处像拆盲盒。能不能处长久，看双方愿不愿意真的装下不同。'
    },
    {
      n: 0, name: '磁极两端', score: 58,
      note: '两个几乎完全不同的世界。要么被强烈吸引（好奇心驱动），要么迅速冲突。这种组合很少平淡：要么轰轰烈烈，要么很快退场，没有中间态。'
    }
  ];

  function bandOf(sameCount) {
    for (var i = 0; i < BANDS.length; i++) {
      if (BANDS[i].n === sameCount) { return BANDS[i]; }
    }
    return BANDS[2];
  }

  /**
   * 逐维比较
   * @param {string} a 类型代码，如 'INTJ'
   * @param {string} b 类型代码，如 'ENFP'
   * @returns {object} { score, band:{name,note}, same:[{dim,a,b}], diff:[...], sameCount }
   */
  function analyze(a, b) {
    a = String(a || '').toUpperCase();
    b = String(b || '').toUpperCase();
    var same = [], diff = [];
    for (var i = 0; i < 4; i++) {
      var row = { dim: DIMS[i], a: a.charAt(i), b: b.charAt(i) };
      if (row.a && row.b && row.a === row.b) { same.push(row); }
      else if (row.a && row.b) { diff.push(row); }
      else { diff.push(row); }
    }
    var band = bandOf(same.length);
    return {
      score: band.score,
      bandName: band.name,
      bandNote: band.note,
      sameCount: same.length,
      same: same,
      diff: diff
    };
  }

  /* 单维文案模板 */
  var DIFF_LINES = {
    EI: '外向 vs 内向：一个向外取电、一个向内回血——热闹与安静都被照顾到，但"你累了我还想聊"的错位也会出现。',
    SN: '实感 vs 直觉：一个看眼前事实、一个看背后可能——务实与脑洞互相补盲区，也可能一个嫌另一个"飘"，另一个嫌"没想象力"。',
    TF: '思考 vs 情感：一个讲对错、一个讲感受——理性刹车配感性油门，吵架时一个想讲道理，一个想被哄。',
    JP: '计划 vs 随性：一个要定盘、一个要留余地——旅行攻略与说走就走，需要提前约好谁说了算。'
  };
  var SAME_LINES = {
    EI: '同为【外向】：都靠人群取电，一起出门不用谁将就谁。',
    SN: '同为【实感】：都相信看得见摸得着的东西，沟通基本零翻译。',
    TF: '同为【思考】：遇事都先讲逻辑，理性人之间吵架都是就事论事。',
    JP: '同为【计划】：都对计划有执念，双 J 组合办事效率拉满。'
  };
  SAME_LINES.I = '同为【内向】：都靠独处回血，安静在一起就很舒服，不需要硬找话聊。';
  SAME_LINES.N = '同为【直觉】：都在意背后的可能和意义，脑洞能接上，聊天经常跑出天际。';
  SAME_LINES.F = '同为【情感】：都重感受，会互相接住情绪，共情力拉满，但也都容易内耗。';
  SAME_LINES.P = '同为【随性】：都享受灵活，临时起意一拍即合，说走就走不用审批。';

  /**
   * 带完整文案的分析（页面用）
   * @returns {object} analyze 的结果 + sameTexts / diffTexts 数组
   */
  function analyzeWithTexts(a, b) {
    var r = analyze(a, b);
    r.sameTexts = r.same.map(function (row) {
      return SAME_LINES[row.dim + row.a] || SAME_LINES[row.dim] || '';
    }).filter(Boolean);
    r.diffTexts = r.diff.map(function (row) {
      return DIFF_LINES[row.dim] || '';
    }).filter(Boolean);
    return r;
  }

  /* 类型字母的中文名 */
  function poleText(code) {
    return POLE_LABEL[String(code).toUpperCase()] || code;
  }

  window.XC_PAIR = {
    analyze: analyze,
    analyzeWithTexts: analyzeWithTexts,
    poleText: poleText,
    BANDS: BANDS
  };
  if (typeof globalThis !== 'undefined') { globalThis.XC_PAIR = window.XC_PAIR; }
})();
