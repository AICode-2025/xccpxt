/* ============================================================
   星辰测评 · 结果页逻辑
   - URL: result.html?scale=xxx&a=0123...（a 为每题选项下标串，可分享）
   - 无 a 参数时回读 localStorage 的最近作答
   - 两种结果模式：
     1) 求和模式：总分 + 判级区间 + 分维度条
     2) 极性模式（poleMode，如十六型人格）：类型代码 + 维度双极条
   - Canvas 手绘海报（无依赖），支持下载
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
    var scale = E.getScale(params.get('scale'));
    if (!scale) { window.location.href = 'index.html'; return; }

    var answers = parseAnswers(scale, params.get('a'));
    if (!answers) {
      var last = E.store.get('xc_last_' + scale.id, null);
      if (last && last.length === scale.questions.length) { answers = last; }
      else { window.location.href = 'quiz.html?scale=' + encodeURIComponent(scale.id); return; }
    }

    var r = E.compute(scale, answers);

    document.title = scale.title + ' 结果 · 星辰测评';
    $id('scaleTitle').textContent = scale.title;
    $id('retakeLink').href = 'quiz.html?scale=' + encodeURIComponent(scale.id);

    if (r.typeMode) { renderTypeResult(scale, r); renderTypePoster(scale, r); }
    else if (r.dimsMode) { renderDimsResult(scale, r); renderDimsPoster(scale, r); }
    else if (r.quadrantMode) { renderQuadrantResult(scale, r); renderQuadrantPoster(scale, r); }
    else { renderResult(scale, r); renderPoster(scale, r); }

    renderDisclaimer(scale);
    $id('downloadPoster').addEventListener('click', downloadPoster);
  }

  /* ---------- 求和模式渲染 ---------- */
  function renderResult(scale, r) {
    $id('posterScaleName').textContent = scale.title;
    $id('posterLevel').textContent = r.level ? r.level.level : '';
    $id('posterScoreLine').textContent =
      (r.total !== r.rawTotal ? '标准分 ' + r.total : '总分 ' + r.total) +
      ' · 共 ' + scale.questions.length + ' 题';

    var bars = $id('posterBars');
    bars.innerHTML = '';
    if (r.subscales && r.subscales.length) {
      r.subscales.forEach(function (sub) {
        var pct = E.subscalePercent(sub);
        bars.insertAdjacentHTML('beforeend',
          '<div class="poster-bar-row">' +
            '<span class="poster-bar-label">' + sub.name + '</span>' +
            '<div class="poster-bar-track"><div class="poster-bar-fill" style="width:' + pct + '%"></div></div>' +
            '<span style="width:34px">' + sub.score + '</span>' +
          '</div>');
      });
    } else {
      bars.classList.add('hidden');
    }

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

    $id('posterScaleName').textContent = scale.title;
    $id('posterLevel').textContent = r.typeCode;
    $id('posterScoreLine').textContent = '"' + t.nick + '" · ' + t.tagline;

    // 海报条：每个维度的主导极
    var bars = $id('posterBars');
    bars.innerHTML = '';
    r.dimensions.forEach(function (d) {
      bars.insertAdjacentHTML('beforeend',
        '<div class="poster-bar-row">' +
          '<span class="poster-bar-label">' + d.dominant.label + ' ' + d.dominant.code + '</span>' +
          '<div class="poster-bar-track"><div class="poster-bar-fill" style="width:' + d.pct + '%"></div></div>' +
          '<span style="width:44px">' + d.pct + '%</span>' +
        '</div>');
    });

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

    $id('posterScaleName').textContent = scale.title;
    $id('posterLevel').textContent = top.name;
    $id('posterScoreLine').textContent = '最突出：' + top.name + ' ' + top.mean + ' 分（' + top.level + '）';

    var bars = $id('posterBars');
    bars.innerHTML = '';
    r.dims.forEach(function (d) {
      bars.insertAdjacentHTML('beforeend',
        '<div class="poster-bar-row">' +
          '<span class="poster-bar-label">' + d.short + '</span>' +
          '<div class="poster-bar-track"><div class="poster-bar-fill" style="width:' + d.pct + '%"></div></div>' +
          '<span style="width:44px">' + d.mean.toFixed(1) + '</span>' +
        '</div>');
    });

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

    $id('posterScaleName').textContent = scale.title;
    $id('posterLevel').textContent = t.level;
    $id('posterScoreLine').textContent = '「' + t.tagline + '」';

    var bars = $id('posterBars');
    bars.innerHTML = '';
    r.dims.forEach(function (d) {
      bars.insertAdjacentHTML('beforeend',
        '<div class="poster-bar-row">' +
          '<span class="poster-bar-label">' + d.short + '</span>' +
          '<div class="poster-bar-track"><div class="poster-bar-fill" style="width:' + d.pct + '%"></div></div>' +
          '<span style="width:44px">' + d.mean.toFixed(1) + '</span>' +
        '</div>');
    });

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

  /* ---------- Canvas 海报 ---------- */
  function themeColors() {
    var cs = getComputedStyle(document.documentElement);
    function v(name, fallback) {
      var val = cs.getPropertyValue(name);
      return (val && val.trim()) || fallback;
    }
    return {
      from: v('--poster-from', '#5b6abf'),
      mid: v('--grad2', '#8a5bc0'),
      to: v('--poster-to', '#9a5bc0')
    };
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function posterBase(canvas) {
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    var c = themeColors();

    var grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, c.from);
    grad.addColorStop(0.55, c.mid);
    grad.addColorStop(1, c.to);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';

    ctx.font = '500 26px sans-serif';
    ctx.globalAlpha = 0.85;
    ctx.fillText('星 辰 测 评', W / 2, 90);
    ctx.globalAlpha = 1;
    return ctx;
  }

  function posterFoot(ctx, W, H, text) {
    ctx.font = '400 20px sans-serif';
    ctx.globalAlpha = 0.75;
    ctx.fillText(text, W / 2, H - 100);
    ctx.fillText('星辰测评 · 免费免登录', W / 2, H - 62);
    ctx.globalAlpha = 1;
  }

  function posterBarsCanvas(ctx, W, top, rows) {
    var barW = 420, barX = (W - barW) / 2;
    rows.forEach(function (row, i) {
      var y = top + i * 88;
      ctx.font = '400 24px sans-serif';
      ctx.globalAlpha = 0.9;
      ctx.textAlign = 'left';
      ctx.fillText(row.label, barX, y);
      ctx.textAlign = 'right';
      ctx.fillText(row.right, barX + barW, y);
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(255,255,255,0.25)';
      roundRect(ctx, barX, y + 16, barW, 12, 6);
      ctx.fill();
      if (row.pct > 0) {
        ctx.fillStyle = '#ffffff';
        roundRect(ctx, barX, y + 16, Math.max(barW * row.pct / 100, 12), 12, 6);
        ctx.fill();
      }
      ctx.textAlign = 'center';
    });
  }

  function renderPoster(scale, r) {
    var canvas = $id('posterCanvas');
    var ctx = posterBase(canvas);
    var W = canvas.width, H = canvas.height;

    ctx.font = '400 34px sans-serif';
    ctx.globalAlpha = 0.95;
    ctx.fillText(scale.title, W / 2, 180);
    ctx.globalAlpha = 1;

    ctx.font = '700 96px sans-serif';
    ctx.fillText(r.level ? r.level.level : '', W / 2, 330);

    var scoreLine = r.total !== r.rawTotal
      ? '标准分 ' + r.total + '（粗分 ' + r.rawTotal + '）'
      : '总分 ' + r.total;
    ctx.font = '400 30px sans-serif';
    ctx.globalAlpha = 0.92;
    ctx.fillText(scoreLine, W / 2, 400);
    ctx.globalAlpha = 1;

    if (r.subscales && r.subscales.length) {
      posterBarsCanvas(ctx, W, 480, r.subscales.map(function (sub) {
        return { label: sub.name, right: sub.score + ' / ' + sub.max, pct: E.subscalePercent(sub) };
      }));
    }

    posterFoot(ctx, W, H, scale.disclaimerLevel === 'screen'
      ? '自评筛查工具 · 不能替代临床诊断'
      : '仅供自我探索与娱乐参考');
  }

  function renderTypePoster(scale, r) {
    var canvas = $id('posterCanvas');
    var ctx = posterBase(canvas);
    var W = canvas.width, H = canvas.height;
    var t = r.type || { nick: '', tagline: '' };

    ctx.font = '400 34px sans-serif';
    ctx.globalAlpha = 0.95;
    ctx.fillText(scale.title, W / 2, 180);
    ctx.globalAlpha = 1;

    // 类型代码（大） + 中文昵称
    ctx.font = '700 110px sans-serif';
    ctx.fillText(r.typeCode, W / 2, 330);
    ctx.font = '600 44px sans-serif';
    ctx.fillText('"' + t.nick + '"', W / 2, 410);

    ctx.font = '400 26px sans-serif';
    ctx.globalAlpha = 0.9;
    ctx.fillText(t.tagline, W / 2, 462);
    ctx.globalAlpha = 1;

    posterBarsCanvas(ctx, W, 540, r.dimensions.map(function (d) {
      return { label: d.dominant.label + ' ' + d.dominant.code, right: d.pct + '%', pct: d.pct };
    }));

    posterFoot(ctx, W, H, '十六型人格 · 仅供自我探索与娱乐参考');
  }

  /* ---------- 维度均值模式海报 ---------- */
  function renderDimsPoster(scale, r) {
    var canvas = $id('posterCanvas');
    var ctx = posterBase(canvas);
    var W = canvas.width, H = canvas.height;
    var top = r.top || { name: '', mean: 0, level: '' };

    ctx.font = '400 34px sans-serif';
    ctx.globalAlpha = 0.95;
    ctx.fillText(scale.title, W / 2, 180);
    ctx.globalAlpha = 1;

    ctx.font = '700 84px sans-serif';
    ctx.fillText(top.name, W / 2, 310);
    ctx.font = '400 30px sans-serif';
    ctx.globalAlpha = 0.92;
    ctx.fillText('最突出特质 · ' + top.mean.toFixed(1) + ' / 5（' + top.level + '）', W / 2, 380);
    ctx.globalAlpha = 1;

    posterBarsCanvas(ctx, W, 460, r.dims.map(function (d) {
      return { label: d.short, right: d.mean.toFixed(1), pct: d.pct };
    }));

    posterFoot(ctx, W, H, '五维人格剖面 · 仅供自我探索与参考');
  }

  /* ---------- 四象限模式海报 ---------- */
  function renderQuadrantPoster(scale, r) {
    var canvas = $id('posterCanvas');
    var ctx = posterBase(canvas);
    var W = canvas.width, H = canvas.height;
    var t = r.type || { level: '', tagline: '' };

    ctx.font = '400 34px sans-serif';
    ctx.globalAlpha = 0.95;
    ctx.fillText(scale.title, W / 2, 180);
    ctx.globalAlpha = 1;

    ctx.font = '700 96px sans-serif';
    ctx.fillText(t.level, W / 2, 320);
    ctx.font = '600 40px sans-serif';
    ctx.fillText('「' + t.tagline + '」', W / 2, 400);

    ctx.font = '400 26px sans-serif';
    ctx.globalAlpha = 0.9;
    ctx.fillText('焦虑 ' + r.dims[0].mean.toFixed(1) + ' · 回避 ' + r.dims[1].mean.toFixed(1), W / 2, 460);
    ctx.globalAlpha = 1;

    posterBarsCanvas(ctx, W, 530, r.dims.map(function (d) {
      return { label: d.short, right: d.mean.toFixed(1), pct: d.pct };
    }));

    posterFoot(ctx, W, H, '依恋模式可改变 · 仅供自我探索');
  }

  function downloadPoster() {
    var canvas = $id('posterCanvas');
    var scaleId = new URLSearchParams(window.location.search).get('scale') || 'result';
    var link = document.createElement('a');
    link.download = 'xingchen-' + scaleId + '.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  init();
})();
