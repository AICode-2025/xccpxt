/* ============================================================
   星辰测评 · 配对矩阵
   - 两个类型选择器（16 型下拉，可带默认值）
   - 计算匹配度：同频点/差异点文案 + 匹配图（Canvas 海报）
   - URL 支持 ?a=INTJ&b=ENFP 预填；我的类型可从上次十六型结果带入
   ============================================================ */
(function () {
  'use strict';

  var E = window.XC_ENGINE;
  var P = window.XC_PAIR;
  var scale = E.getScale('type16');
  var types = (scale && scale.types) || {};
  var ORDER = Object.keys(types);

  function $id(name) { return document.getElementById(name); }

  /* ---------- 选择器 ---------- */
  function fillPicker(select, selected) {
    select.innerHTML = ORDER.map(function (code) {
      var t = types[code];
      return '<option value="' + code + '"' + (code === selected ? ' selected' : '') + '>' +
        code + ' · ' + t.nick + '</option>';
    }).join('');
  }

  function myLastType() {
    var last = E.store.get('xc_last_type16', null);
    if (!last || last.length !== scale.questions.length) { return null; }
    var r = E.compute(scale, last);
    return (r && r.typeCode) ? r.typeCode : null;
  }

  /* ---------- 结果渲染 ---------- */
  function renderResult(a, b) {
    var r = P.analyzeWithTexts(a, b);
    var ta = types[a], tb = types[b];

    $id('mPair').innerHTML =
      '<div class="match-side"><span class="match-code">' + a + '</span><span class="match-nick">' + ta.nick + '</span></div>' +
      '<span class="match-heart">💞</span>' +
      '<div class="match-side"><span class="match-code">' + b + '</span><span class="match-nick">' + tb.nick + '</span></div>';

    $id('mScore').textContent = r.score + ' 分';
    $id('mBand').textContent = '「' + r.bandName + '」 · 相同维度 ' + r.sameCount + ' / 4';
    $id('mNote').textContent = r.bandNote;

    var same = $id('mSame');
    same.innerHTML = '';
    (r.sameTexts.length ? r.sameTexts : ['这一对没有相同的维度——全靠差异互补。']).forEach(function (s) {
      var li = document.createElement('li'); li.textContent = s; same.appendChild(li);
    });

    var diff = $id('mDiff');
    diff.innerHTML = '';
    (r.diffTexts.length ? r.diffTexts : ['这一对四个维度全对齐——默契拉满，注意留一点新鲜感。']).forEach(function (s) {
      var li = document.createElement('li'); li.textContent = s; diff.appendChild(li);
    });

    $id('matchResult').classList.remove('hidden');
    drawPoster(a, b, r);
    $id('matchResult').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ---------- 匹配图海报 ---------- */
  function themeColors() {
    var cs = getComputedStyle(document.documentElement);
    function v(name, fb) { var x = cs.getPropertyValue(name); return (x && x.trim()) || fb; }
    return { from: v('--poster-from', '#4f46e5'), mid: v('--grad2', '#8b5cf6'), to: v('--poster-to', '#8b5cf6') };
  }

  function drawPoster(a, b, r) {
    var canvas = $id('posterCanvas');
    var ctx = canvas.getContext('2d');
    var W = canvas.width, H = canvas.height;
    var c = themeColors();
    var grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, c.from); grad.addColorStop(0.55, c.mid); grad.addColorStop(1, c.to);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.font = '500 26px sans-serif';
    ctx.globalAlpha = 0.85;
    ctx.fillText('星 辰 测 评 · 配 对 矩 阵', W / 2, 90);
    ctx.globalAlpha = 1;

    // 双方代码 + 昵称
    ctx.font = '700 64px sans-serif';
    ctx.fillText(a, W / 2 - 120, 250);
    ctx.fillText(b, W / 2 + 120, 250);
    ctx.font = '600 30px sans-serif';
    ctx.fillText(types[a].nick, W / 2 - 120, 310);
    ctx.fillText(types[b].nick, W / 2 + 120, 310);
    ctx.font = '400 52px sans-serif';
    ctx.fillText('💞', W / 2, 280);

    // 匹配度大字
    ctx.font = '700 110px sans-serif';
    ctx.fillText(r.score, W / 2, 460);
    ctx.font = '400 30px sans-serif';
    ctx.globalAlpha = 0.92;
    ctx.fillText('「' + r.bandName + '」 · 相同维度 ' + r.sameCount + ' / 4', W / 2, 520);
    ctx.globalAlpha = 1;

    ctx.font = '400 20px sans-serif';
    ctx.globalAlpha = 0.75;
    ctx.fillText('十六型配对 · 仅供娱乐与自我探索', W / 2, H - 100);
    ctx.fillText('星辰测评 · 免费免登录', W / 2, H - 62);
    ctx.globalAlpha = 1;
  }

  function downloadPoster() {
    var canvas = $id('posterCanvas');
    var link = document.createElement('a');
    link.download = 'xingchen-match.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  /* ---------- 初始化 ---------- */
  var params = new URLSearchParams(window.location.search);
  var defA = params.get('a') || myLastType() || 'INTJ';
  var defB = params.get('b') || 'ENFP';
  if (!types[defA]) { defA = 'INTJ'; }
  if (!types[defB]) { defB = 'ENFP'; }

  fillPicker($id('pickA'), defA);
  fillPicker($id('pickB'), defB);

  var auto = params.get('a') && params.get('b');
  function compute() {
    renderResult($id('pickA').value, $id('pickB').value);
  }
  $id('computeBtn').addEventListener('click', compute);
  $id('savePoster').addEventListener('click', downloadPoster);
  if (auto) { renderResult(defA, defB); }
})();
