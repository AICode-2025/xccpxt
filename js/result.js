/* ============================================================
   星辰测评 · 结果页逻辑
   - URL: result.html?scale=xxx&a=0123...（a 为每题选项下标串，可分享）
   - 无 a 参数时回读 localStorage 的最近作答
   - 两种结果模式：
     1) 求和模式：总分 + 判级区间 + 分维度条
     2) 极性模式（poleMode，如十六型人格）：类型代码 + 维度双极条
   ============================================================ */
(function () {
  'use strict';

  var E = window.XC_ENGINE;

  function $id(name) { return document.getElementById(name); }

  function parseAnswers(scale, str) {
    if (!str || str.length !== scale.questions.length) { return null; }
    var out = [];
    for (var i = 0; i < str.length; i++) {
      var n = parseInt(str.charAt(i), 10);
      if (isNaN(n) || n < 0 || n >= scale.options.length) { return null; }
      out.push(n);
    }
    return out;
  }

  /* ---------- 主流程 ---------- */
  function init() {
    var params = new URLSearchParams(window.location.search);
    var base = E.getScale(params.get('scale'));
    if (!base) { window.location.href = 'index.html'; return; }

    var resolved = E.resolveVersion(base, params.get('v'));
    var scale = resolved.scale;
    var verId = resolved.versionId;

    var answers = parseAnswers(scale, params.get('a'));
    if (!answers) {
      var lastKey = 'xc_last_' + scale.id + (verId ? '_' + verId : '');
      var last = E.store.get(lastKey, null);
      if (last && last.length === scale.questions.length) { answers = last; }
      else { window.location.href = 'quiz.html?scale=' + encodeURIComponent(scale.id) + (verId ? '&v=' + encodeURIComponent(verId) : ''); return; }
    }

    var r = E.compute(scale, answers);

    document.title = scale.title + ' 结果 · 星辰测评';
    $id('scaleTitle').textContent = scale.title;
    $id('retakeLink').href = 'intro.html?scale=' + encodeURIComponent(scale.id) + (verId ? '&v=' + encodeURIComponent(verId) : '');

    if (scale.animal) { renderAnimalResult(scale, r); }
    else if (r.countMode) { renderCountResult(scale, r); }
    else if (scale.holland) { renderHollandResult(scale, r); }
    else if (r.typeMode) { renderTypeResult(scale, r); }
    else if (r.dimsMode) { renderDimsResult(scale, r); }
    else if (r.quadrantMode) { renderQuadrantResult(scale, r); }
    else { renderResult(scale, r); }

    renderDisclaimer(scale);
  }

  /* ---------- 恋爱动物渲染（票选 + 萌系画像） ---------- */
  function renderAnimalResult(scale, r) {
    var t = r.type || { code: '', name: '', emoji: '', tagline: '', desc: '', strengths: [], watchouts: [], fits: [] };

    $id('resultLevel').textContent = '你的恋爱动物：' + (t.emoji || '') + ' ' + t.name;
    $id('resultScore').textContent = t.tagline || '';
    $id('resultDescription').textContent = t.desc;

    // 六动物票数排行
    var maxN = r.counts[r.ranked[0].code] || 1;
    var sl = $id('subscaleList');
    sl.innerHTML = '';
    r.ranked.forEach(function (c, idx) {
      var n = r.counts[c.code] || 0;
      var pct = Math.round(n / maxN * 100);
      sl.insertAdjacentHTML('beforeend',
        '<div class="subscale-row">' +
          '<div class="subscale-name-line"><span>' + (c.emoji || '') + ' ' + c.name +
            (idx === 0 ? ' <b style="color:' + (scale.color || '#f43f5e') + '">你的恋爱动物</b>' : '') +
            '</span><span>' + n + ' 票</span></div>' +
          '<div class="subscale-track"><div class="subscale-fill" style="width:' + pct + '%"></div></div>' +
        '</div>');
    });

    sl.insertAdjacentHTML('beforeend',
      '<div class="type-block"><h4>恋爱里的你</h4><ul>' +
        t.strengths.map(function (s) { return '<li>' + s + '</li>'; }).join('') +
      '</ul></div>' +
      '<div class="type-block"><h4>小提醒</h4><ul>' +
        t.watchouts.map(function (s) { return '<li>' + s + '</li>'; }).join('') +
      '</ul></div>');

    $id('suggestionTitle').textContent = '和你最配的恋人';
    var sug = $id('suggestionList');
    sug.innerHTML = '';
    t.fits.forEach(function (s) {
      var li = document.createElement('li');
      li.textContent = s;
      sug.appendChild(li);
    });
  }

  /* ---------- 票选模式渲染（九型人格） ---------- */
  function renderCountResult(scale, r) {
    var t = r.type || { code: '', name: '', tagline: '', desc: '', strengths: [], watchouts: [], fits: [] };

    $id('resultLevel').textContent = '你的九型人格：' + r.top.code + '号 · ' + t.name;
    $id('resultScore').textContent = t.tagline || ('第 ' + r.top.code + ' 型：' + t.name);
    $id('resultDescription').textContent = t.desc;

    // 票数排行
    var maxN = r.counts[r.ranked[0].code] || 1;
    var sl = $id('subscaleList');
    sl.innerHTML = '';
    r.ranked.forEach(function (c, idx) {
      var n = r.counts[c.code] || 0;
      var pct = Math.round(n / maxN * 100);
      sl.insertAdjacentHTML('beforeend',
        '<div class="subscale-row">' +
          '<div class="subscale-name-line"><span>' + (c.emoji || '') + ' ' + c.code + '号 ' + c.name +
            (idx === 0 ? ' <b style="color:var(--c,' + (scale.color || '#4f46e5') + ')">主导类型</b>' : '') +
            '</span><span>' + n + ' 票</span></div>' +
          '<div class="subscale-track"><div class="subscale-fill" style="width:' + pct + '%"></div></div>' +
        '</div>');
    });

    sl.insertAdjacentHTML('beforeend',
      '<div class="type-block"><h4>你的优势</h4><ul>' +
        t.strengths.map(function (s) { return '<li>' + s + '</li>'; }).join('') +
      '</ul></div>' +
      '<div class="type-block"><h4>小提醒</h4><ul>' +
        t.watchouts.map(function (s) { return '<li>' + s + '</li>'; }).join('') +
      '</ul></div>');

    $id('suggestionTitle').textContent = '可能适合的方向';
    var sug = $id('suggestionList');
    sug.innerHTML = '';
    t.fits.forEach(function (s) {
      var li = document.createElement('li');
      li.textContent = s;
      sug.appendChild(li);
    });
  }

  /* ---------- 霍兰德职业兴趣渲染（维度均值 + 三码职业建议） ---------- */
  function renderHollandResult(scale, r) {
    var dims = (r.dims || []).slice();
    var sorted = dims.slice().sort(function (a, b) { return b.mean - a.mean; });
    var top3 = sorted.slice(0, 3);
    var code = top3.map(function (d) { return d.code; }).join('');

    $id('resultLevel').textContent = '你的职业兴趣代码：' + code;
    $id('resultScore').textContent = top3.map(function (d) {
      return d.name + '（' + d.code + '）';
    }).join(' > ') + '——你的兴趣类型组合';
    $id('resultDescription').textContent = '兴趣没有对错，组合揭示你更愿意在什么样的环境里发挥自己。';

    // 六维条形图
    var sl = $id('subscaleList');
    sl.innerHTML = '';
    sorted.forEach(function (d) {
      var pct = Math.round(d.mean * 100);
      var topFlag = code.indexOf(d.code) !== -1;
      sl.insertAdjacentHTML('beforeend',
        '<div class="subscale-row">' +
          '<div class="subscale-name-line"><span>' + d.code + ' · ' + d.name + (topFlag ? ' <b style="color:' + (scale.color || '#4f46e5') + '">TOP</b>' : '') + '</span><span>' + pct + '%</span></div>' +
          '<div class="subscale-track"><div class="subscale-fill" style="width:' + pct + '%"></div></div>' +
        '</div>');
    });

    // 职业建议
    var careers = scale.holland ? scale.holland.careers : {};
    var comboKey = code;
    var comboCfg = scale.holland ? scale.holland.combos : {};
    var comboList = comboCfg[comboKey] || [];
    var sug = $id('suggestionList');
    sug.innerHTML = '';
    $id('suggestionTitle').textContent = '匹配你的职业方向（' + code + '）';
    top3.forEach(function (d) {
      var list = careers[d.code] || [];
      var li = document.createElement('li');
      li.textContent = d.code + ' · ' + d.name + '：' + list.slice(0, 4).join('、') + ' 等';
      sug.appendChild(li);
    });
    if (comboList.length) {
      var li2 = document.createElement('li');
      li2.textContent = '组合解读（' + code + '）：' + comboList.join('、');
      sug.appendChild(li2);
    }
  }

  /* ---------- 求和模式渲染 ---------- */
  function renderResult(scale, r) {
    $id('resultLevel').textContent = r.level ? '结果：' + r.level.level : '';
    $id('resultScore').textContent = '你的得分：' + r.total +
      (r.total !== r.rawTotal ? '（粗分 ' + r.rawTotal + '，按量表标准换算）' : '');
    $id('resultDescription').textContent = r.level ? r.level.description : '';

    $id('suggestionTitle').textContent = '建议';
    var sug = $id('suggestionList');
    sug.innerHTML = '';
    if (r.level && r.level.suggestions) {
      r.level.suggestions.forEach(function (s) {
        var li = document.createElement('li');
        li.textContent = s;
        sug.appendChild(li);
      });
    } else {
      $id('suggestionBlock').classList.add('hidden');
    }

    var sl = $id('subscaleList');
    sl.innerHTML = '';
    if (r.subscales && r.subscales.length) {
      var block = document.createElement('div');
      block.className = 'subscale-block';
      r.subscales.forEach(function (sub) {
        var pct = E.subscalePercent(sub);
        block.insertAdjacentHTML('beforeend',
          '<div class="subscale-row">' +
            '<div class="subscale-name-line"><span>' + sub.name + '</span><span>' +
              sub.score + ' / ' + sub.max + '</span></div>' +
            '<div class="subscale-track"><div class="subscale-fill" style="width:' + pct + '%"></div></div>' +
          '</div>');
      });
      sl.appendChild(block);
    }

    if (r.referral && scale.referral) {
      $id('referralText').textContent = scale.referral.text;
      $id('referralBox').classList.remove('hidden');
    }
  }

  /* ---------- 极性模式（十六型人格）渲染 ---------- */
  function renderTypeResult(scale, r) {
    var t = r.type || { nick: '', tagline: '', desc: '', strengths: [], watchouts: [], fits: [] };

    // 明细区
    $id('resultLevel').textContent = '你的类型：' + r.typeCode + ' · ' + t.nick;
    $id('resultScore').textContent = t.tagline;
    $id('resultDescription').textContent = t.desc;

    // 优势 / 小提醒（复用维度条容器位置）
    var sl = $id('subscaleList');
    sl.innerHTML =
      '<div class="type-block"><h4>你的优势</h4><ul>' +
        t.strengths.map(function (s) { return '<li>' + s + '</li>'; }).join('') +
      '</ul></div>' +
      '<div class="type-block"><h4>小提醒</h4><ul>' +
        t.watchouts.map(function (s) { return '<li>' + s + '</li>'; }).join('') +
      '</ul></div>';

    // 适合方向放建议区
    $id('suggestionTitle').textContent = '可能适合的方向';
    var sug = $id('suggestionList');
    sug.innerHTML = '';
    t.fits.forEach(function (s) {
      var li = document.createElement('li');
      li.textContent = s;
      sug.appendChild(li);
    });
  }

  /* ---------- 维度均值模式渲染（大五人格） ---------- */
  function renderDimsResult(scale, r) {
    var top = r.top || { name: '', mean: 0, level: '' };

    $id('resultLevel').textContent = '你的五维剖面';
    $id('resultScore').textContent = '最突出的维度：' + top.name + '（' + top.mean + ' 分，' + top.level + '）';
    $id('resultDescription').textContent = '';

    // 每个维度一块：名称 + 均值 + 档位 + 解读
    var sl = $id('subscaleList');
    sl.innerHTML = '';
    r.dims.forEach(function (d) {
      var html = '<div class="type-block">' +
        '<h4>' + d.name + ' ' + d.code + ' · ' + d.mean.toFixed(1) + ' / 5（' + d.level + '）</h4>' +
        '<p class="dim-desc">' + d.description + '</p>';
      if (d.note) { html += '<p class="dim-note">' + d.note + '</p>'; }
      html += '</div>';
      sl.insertAdjacentHTML('beforeend', html);
    });

    // 组合提示
    if (r.combo) {
      $id('suggestionTitle').textContent = '组合解读 · ' + r.combo.label;
      $id('suggestionList').innerHTML = '<li>' + r.combo.text + '</li>';
    } else {
      $id('suggestionBlock').classList.add('hidden');
    }
  }

  /* ---------- 四象限模式渲染（恋爱依恋） ---------- */
  function renderQuadrantResult(scale, r) {
    var t = r.type || { level: '', tagline: '', desc: '', suggestions: [] };

    $id('resultLevel').textContent = '你的依恋类型：' + t.level + ' · ' + t.tagline;
    $id('resultScore').textContent = '你的位置：' + r.dims.map(function (d) {
      return d.name + ' ' + d.mean.toFixed(1);
    }).join(' · ') + '（阈值 ' + r.dims[0].threshold + '）';
    $id('resultDescription').textContent = t.desc;

    var sl = $id('subscaleList');
    sl.innerHTML = '';
    r.dims.forEach(function (d) {
      sl.insertAdjacentHTML('beforeend',
        '<div class="type-block">' +
          '<h4>' + d.name + ' · ' + d.mean.toFixed(1) + ' / 5（' + (d.high ? '偏高' : '偏低') + '）</h4>' +
          '<p class="dim-desc">' + (d.high
            ? '这一维度高于阈值 ' + d.threshold + '，是你在这段关系模式里更明显的一侧。'
            : '这一维度低于阈值 ' + d.threshold + '，说明你在这方面的顾虑相对少。') + '</p>' +
        '</div>');
    });

    $id('suggestionTitle').textContent = '给你几点建议';
    var sug = $id('suggestionList');
    sug.innerHTML = '';
    t.suggestions.forEach(function (s) {
      var li = document.createElement('li');
      li.textContent = s;
      sug.appendChild(li);
    });
  }

  /* ---------- 免责声明 ---------- */
  function renderDisclaimer(scale) {
    var box = $id('disclaimerBox');
    var base = scale.disclaimerLevel === 'screen'
      ? '本量表为标准化自评筛查工具，结果仅反映你近期的自我感受，不能替代医生的当面诊断。' +
        '如结果提示异常，或你持续感到痛苦，请及时寻求精神科医生或心理咨询师的专业帮助。'
      : '本测试仅供自我探索与娱乐参考，结果基于你的自我评价，不构成任何专业评估或医学诊断。';
    box.textContent = scale.disclaimerExtra ? base + ' ' + scale.disclaimerExtra : base;
  }

  init();
})();
