/* ============================================================
   星辰测评 · 量表引擎（无依赖）
   - 量表注册表：data/*.js 向 window.XC_SCALES 注册
   - 计分：求和 / 反向计分 / 标准分系数 / 分维度 / 区间判级
   - 转介：按总分阈值或指定题目作答触发
   ============================================================ */

(function () {
  'use strict';

  var registry = window.XC_SCALES || (window.XC_SCALES = {});

  /** 按 id 取量表 */
  function getScale(id) {
    return Object.prototype.hasOwnProperty.call(registry, id) ? registry[id] : null;
  }

  /** 列出全部量表（保持注册顺序） */
  function listScales() {
    return Object.keys(registry).map(function (k) { return registry[k]; });
  }

  /** 取量表的可用版本列表（无 versions 字段时返回空数组） */
  function versionList(scale) {
    if (!scale.versions) { return []; }
    return Object.keys(scale.versions).map(function (id) {
      var v = scale.versions[id];
      return {
        id: id,
        label: v.label || id,
        timeMinutes: v.timeMinutes,
        count: (v.questions || []).length
      };
    });
  }

  /**
   * 解析版本：无 versions 时原样返回；有则把基座字段与选中版本合并，
   * 得到一份"激活态"量表（questions/options/mode 都指向该版本）。
   * 返回 { scale, versionId, versionLabel }
   */
  function resolveVersion(scale, versionId) {
    if (!scale.versions) {
      return { scale: scale, versionId: null, versionLabel: '' };
    }
    var ids = Object.keys(scale.versions);
    var id = ids.indexOf(versionId) !== -1 ? versionId : ids[0];
    var v = scale.versions[id] || {};
    var merged = {};
    for (var k in scale) { if (k !== 'versions') { merged[k] = scale[k]; } }
    for (var k in v) { merged[k] = v[k]; }
    merged.versionId = id;
    merged.versionLabel = v.label || id;
    merged.versionCount = (v.questions || []).length;
    return { scale: merged, versionId: id, versionLabel: merged.versionLabel };
  }

  /**
   * 取某题在某选项下的原始得分。
   * options 未标 score 时，按位置默认 1..n。
   */
  function optionScore(scale, optionIndex) {
    var opts = scale.options || [];
    if (optionIndex < 0 || optionIndex >= opts.length) { return 0; }
    var opt = opts[optionIndex];
    return (typeof opt.score === 'number') ? opt.score : (optionIndex + 1);
  }

  /** 反向计分：min + max - score（兼容 1..n 与 0..n-1 两种计分法） */
  function reverseScore(scale, score) {
    var opts = scale.options || [];
    var min = Infinity, max = -Infinity;
    for (var i = 0; i < opts.length; i++) {
      var s = (typeof opts[i].score === 'number') ? opts[i].score : (i + 1);
      if (s < min) { min = s; }
      if (s > max) { max = s; }
    }
    return (min + max) - score;
  }

  /** 单题有效得分（含反向处理） */
  function itemScore(scale, question, optionIndex) {
    var s = optionScore(scale, optionIndex);
    return question.reverse ? reverseScore(scale, s) : s;
  }

  /**
   * 极性计分（双极 forced-choice，如十六型人格）
   * 每题得分 -2..+2：负值偏向左极，正值偏向右极，0 为中间。
   * 维度得分 = 该侧权重和（0..2n）；平票时取维度默认极。
   */
  function computePoles(scale, answers) {
    var questions = scale.questions || [];
    var dims = scale.poleMode.dimensions || [];
    var code = '';
    var dimResults = [];

    // id -> 题目下标
    var idIndex = {};
    for (var i = 0; i < questions.length; i++) { idIndex[questions[i].id] = i; }

    dims.forEach(function (dim) {
      var leftScore = 0, rightScore = 0;
      (dim.questions || []).forEach(function (qid) {
        var idx = idIndex[qid];
        if (typeof idx !== 'number' || typeof answers[idx] !== 'number') { return; }
        var s = optionScore(scale, answers[idx]);
        /* 官方题面中"高极"有时在左、有时在右，flip 标记高极在左侧的题目，取反后累加 */
        if (questions[idx].flip === true) { s = -s; }
        if (s > 0) { rightScore += s; }
        else if (s < 0) { leftScore += (-s); }
      });

      var n = (dim.questions || []).length;
      var maxSide = 2 * n;            // 每题最大权重 2
      /* 还原官方原始分：8-40（每维 8 题 × 5 档） */
      var rawScore = n * 3 + (rightScore - leftScore);
      var rawMin = n;                 // 全选 1 档
      var rawMax = n * 5;             // 全选 5 档
      var rawRange = rawMax - rawMin;
      /* 官方百分比：高极占比 = (原始分 - 最低分) / 极差 × 100 */
      var rightPct = rawRange > 0 ? Math.round((rawScore - rawMin) / rawRange * 100) : 50;
      if (rightPct < 0) { rightPct = 0; }
      if (rightPct > 100) { rightPct = 100; }
      var leftPct = 100 - rightPct;

      var dominant;
      if (rightScore > leftScore) { dominant = dim.right; }
      else if (leftScore > rightScore) { dominant = dim.left; }
      else { dominant = { code: (dim.default || dim.left.code), label: (dim.default === dim.right.code ? dim.right.label : dim.left.label) }; }
      code += dominant.code;

      dimResults.push({
        key: dim.key,
        left: dim.left,
        right: dim.right,
        leftScore: leftScore,
        rightScore: rightScore,
        rawScore: rawScore,
        leftPct: leftPct,
        rightPct: rightPct,
        dominant: dominant,
        pct: Math.max(leftPct, rightPct)
      });
    });

    var type = (scale.types && scale.types[code]) || null;
    return {
      typeMode: true,
      typeCode: code,
      type: type,
      dimensions: dimResults,
      level: type ? { level: type.nick, description: type.desc } : null,
      referral: false,
      rawTotal: 0,
      total: 0
    };
  }

  /** id -> 题目下标 */
  function buildIdIndex(questions) {
    var map = {};
    for (var i = 0; i < questions.length; i++) { map[questions[i].id] = i; }
    return map;
  }

  /** 在一组区间中找命中的档位 */
  function matchLevel(ranges, value) {
    if (!ranges || !ranges.length) { return null; }
    for (var i = 0; i < ranges.length; i++) {
      var r = ranges[i];
      var lo = (typeof r.min === 'number') ? r.min : -Infinity;
      var hi = (typeof r.max === 'number') ? r.max : Infinity;
      if (value >= lo && value <= hi) { return r; }
    }
    return ranges[0];
  }

  /**
   * 维度均值模式（如大五人格）
   * 每个维度取均值（1-5），按区间给档位；另给出最突出维度与跨维度组合提示
   */
  function computeDims(scale, answers) {
    var questions = scale.questions || [];
    var idIndex = buildIdIndex(questions);
    var cfg = scale.dimsMode || {};
    var scaleMax = cfg.scaleMax || 5;
    var dims = [];

    (cfg.subscales || []).forEach(function (sub) {
      var sum = 0;
      (sub.items || []).forEach(function (qid) {
        var idx = idIndex[qid];
        if (typeof idx !== 'number' || typeof answers[idx] !== 'number') { return; }
        sum += itemScore(scale, questions[idx], answers[idx]);
      });
      var n = (sub.items || []).length || 1;
      var mean = Math.round((sum / n) * 100) / 100;
      var level = matchLevel(sub.interpretation, mean);
      dims.push({
        name: sub.name,
        code: sub.code,
        short: sub.short || sub.name,
        note: sub.note || '',
        score: sum,
        mean: mean,
        max: n * scaleMax,
        pct: Math.round((mean / scaleMax) * 100),
        level: level ? level.level : '',
        description: level ? level.description : ''
      });
    });

    /* 最突出维度：偏离中点最远者（与方向无关） */
    var mid = (scaleMax + 1) / 2;
    var top = null;
    dims.forEach(function (d) {
      if (!top || Math.abs(d.mean - mid) > Math.abs(top.mean - mid)) { top = d; }
    });

    /* 跨维度组合提示 */
    var combo = null;
    (cfg.combos || []).forEach(function (c) {
      if (combo) { return; }
      var ok = (c.when || []).every(function (cond) {
        return dims.some(function (d) { return d.code === cond.dim && d.level === cond.level; });
      });
      if (ok) { combo = { label: c.label, text: c.text }; }
    });

    return {
      dimsMode: true,
      dims: dims,
      top: top,
      combo: combo,
      referral: false,
      rawTotal: 0,
      total: 0,
      subscales: [],
      level: { level: top ? (top.name + (top.mean >= mid ? '偏高' : '偏低')) : '', description: '' }
    };
  }

  /**
   * 四象限模式（如恋爱依恋：焦虑 × 回避 → 四型）
   * 每个维度取均值与阈值比较得 high/low，拼成类型键查类型表
   */
  function computeQuadrant(scale, answers) {
    var questions = scale.questions || [];
    var idIndex = buildIdIndex(questions);
    var cfg = scale.quadrantMode || {};
    var scaleMax = cfg.scaleMax || 5;
    var dims = [];
    var keyParts = [];

    (cfg.dimensions || []).forEach(function (dim) {
      var sum = 0;
      (dim.items || []).forEach(function (qid) {
        var idx = idIndex[qid];
        if (typeof idx !== 'number' || typeof answers[idx] !== 'number') { return; }
        sum += itemScore(scale, questions[idx], answers[idx]);
      });
      var n = (dim.items || []).length || 1;
      var mean = Math.round((sum / n) * 100) / 100;
      var threshold = (typeof dim.threshold === 'number') ? dim.threshold : 3;
      var high = mean >= threshold;
      keyParts.push(high ? 'high' : 'low');
      dims.push({
        key: dim.key,
        name: dim.name,
        short: dim.short || dim.name,
        mean: mean,
        threshold: threshold,
        high: high,
        pct: Math.round((mean / scaleMax) * 100)
      });
    });

    var typeKey = keyParts.join('-');
    var type = (scale.types && scale.types[typeKey]) || null;
    return {
      quadrantMode: true,
      dims: dims,
      typeKey: typeKey,
      type: type,
      referral: false,
      rawTotal: 0,
      total: 0,
      subscales: [],
      level: type ? { level: type.level, description: type.desc } : null
    };
  }

  /**
   * 票选计分模式（如九型人格）
   * 每题含两句（q.opts），用户二选一；选中的那一句对应一个类别代号（q.keys[i]）。
   * 统计每个类别的命中数，按票数排序（并列时按 countMode.order 指定顺序）。
   */
  function computeCount(scale, answers) {
    var questions = scale.questions || [];
    var cfg = scale.countMode || {};
    var cats = cfg.categories || [];
    var order = cfg.order || cats.map(function (c) { return c.code; });
    var counts = {};
    cats.forEach(function (c) { counts[c.code] = 0; });

    for (var i = 0; i < questions.length; i++) {
      if (typeof answers[i] !== 'number') { continue; }
      var q = questions[i];
      var keys = q.keys || [];
      var code = answers[i] === 0 ? keys[0] : keys[1];
      if (Object.prototype.hasOwnProperty.call(counts, code)) { counts[code]++; }
    }

    var ranked = cats.slice().sort(function (a, b) {
      if (counts[b.code] !== counts[a.code]) { return counts[b.code] - counts[a.code]; }
      return order.indexOf(a.code) - order.indexOf(b.code);
    });
    var top = ranked[0] || null;
    var type = top ? ((scale.types && scale.types[top.code]) || null) : null;
    return {
      countMode: true,
      counts: counts,
      ranked: ranked,
      top: top,
      type: type,
      level: type ? { level: type.name, description: type.desc } : null,
      referral: false,
      rawTotal: 0,
      total: 0
    };
  }

  /**
   * 计分主函数
   * @param {object} scale 量表配置
   * @param {number[]} answers 每题的选项下标（从 0 开始），与 questions 等长
   * @returns {object} 结构随模式不同：求和 / 极性 / 维度均值 / 四象限 / 票选
   */
  function compute(scale, answers) {
    /* 各模式走独立计分 */
    if (scale.countMode) { return computeCount(scale, answers); }
    if (scale.poleMode) { return computePoles(scale, answers); }
    if (scale.dimsMode) { return computeDims(scale, answers); }
    if (scale.quadrantMode) { return computeQuadrant(scale, answers); }

    var questions = scale.questions || [];
    var rawTotal = 0;
    var i, q;

    // 总分（逐题处理反向计分）
    for (i = 0; i < questions.length; i++) {
      q = questions[i];
      if (typeof answers[i] !== 'number') { continue; }
      rawTotal += itemScore(scale, q, answers[i]);
    }

    // 标准分换算（如 SAS 的粗分 × 1.25）
    var factor = (scale.scoring && typeof scale.scoring.factor === 'number')
      ? scale.scoring.factor : 1;
    var standardTotal = Math.round(rawTotal * factor);

    // 分维度得分
    var subscales = [];
    if (scale.scoring && scale.scoring.subscales) {
      scale.scoring.subscales.forEach(function (sub) {
        var sum = 0;
        var ids = sub.items || [];
        for (i = 0; i < questions.length; i++) {
          q = questions[i];
          if (ids.indexOf(q.id) === -1) { continue; }
          if (typeof answers[i] !== 'number') { continue; }
          sum += itemScore(scale, q, answers[i]);
        }
        subscales.push({
          name: sub.name,
          score: sum,
          max: sub.max || (ids.length * (scale.options || []).length),
          min: sub.min || ids.length
        });
      });
    }

    // 判级：落在哪个 interpretation 区间
    var finalScore = standardTotal;
    var level = null;
    var interp = scale.interpretation || [];
    for (i = 0; i < interp.length; i++) {
      var r = interp[i];
      var lo = (typeof r.min === 'number') ? r.min : -Infinity;
      var hi = (typeof r.max === 'number') ? r.max : Infinity;
      if (finalScore >= lo && finalScore <= hi) { level = r; break; }
    }
    if (!level && interp.length) { level = interp[0]; } // 兜底

    // 转介判定
    var referral = false;
    var referralReason = '';
    if (scale.referral) {
      if (typeof scale.referral.minScore === 'number' && standardTotal >= scale.referral.minScore) {
        referral = true;
        referralReason = 'score';
      }
      if (scale.referral.items) {
        for (i = 0; i < questions.length; i++) {
          q = questions[i];
          var cond = scale.referral.items[q.id];
          if (typeof cond === 'number' && typeof answers[i] === 'number' &&
              itemScore(scale, q, answers[i]) > cond) {
            referral = true;
            referralReason = 'item';
            break;
          }
        }
      }
    }

    return {
      rawTotal: rawTotal,
      total: standardTotal,
      subscales: subscales,
      level: level,
      referral: referral,
      referralReason: referralReason
    };
  }

  /** 分维度进度条填充百分比（0-100） */
  function subscalePercent(sub) {
    var range = sub.max - sub.min;
    if (range <= 0) { return 0; }
    return Math.max(0, Math.min(100, Math.round(((sub.score - sub.min) / range) * 100)));
  }

  /** localStorage 安全读写（file:// 下个别浏览器可能禁用，需兜底） */
  var store = {
    get: function (key, fallback) {
      try {
        var v = window.localStorage.getItem(key);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { window.localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* 忽略 */ }
    },
    remove: function (key) {
      try { window.localStorage.removeItem(key); } catch (e) { /* 忽略 */ }
    }
  };

  var engine = {
    getScale: getScale,
    listScales: listScales,
    versionList: versionList,
    resolveVersion: resolveVersion,
    compute: compute,
    subscalePercent: subscalePercent,
    store: store
  };

  window.XC_ENGINE = engine;
  /* 兼容 Node 冒烟测试 */
  if (typeof globalThis !== 'undefined') { globalThis.XC_ENGINE = engine; }
})();
