/* ============================================================
   星辰测评 · 十六型人格图库
   - 16 型卡片网格（代码 + 昵称）
   - 点击展开详情（描述/优势/提醒/适合方向/维度标签）
   - 支持 ?type=INTJ 直达
   ============================================================ */
(function () {
  'use strict';

  var E = window.XC_ENGINE;
  var scale = E.getScale('type16');
  var types = (scale && scale.types) || {};
  var ORDER = Object.keys(types);

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderGrid() {
    var box = document.getElementById('typeGrid');
    box.innerHTML = ORDER.map(function (code) {
      var t = types[code];
      return '<a class="scale-item" href="types.html?type=' + code + '">' +
        '<div class="scale-icon" style="font-size:20px;font-weight:700;color:var(--primary);background:linear-gradient(135deg,var(--primary-light),#f5f3ff);">' +
          code +
        '</div>' +
        '<div class="scale-name">' + esc(t.nick) + '</div>' +
        '<div class="scale-desc">' + esc(t.tagline) + '</div>' +
        '<div class="scale-tags"><span class="tag">' + code + '</span></div>' +
      '</a>';
    }).join('');
  }

  function renderDetail(code) {
    var t = types[code];
    if (!t) { return; }

    document.getElementById('typeDetail').classList.remove('hidden');
    document.getElementById('tName').textContent = code + ' · ' + t.nick;
    document.getElementById('tTagline').textContent = t.tagline;
    document.getElementById('tDesc').textContent = t.desc;

    var traits = document.getElementById('tTraits');
    traits.innerHTML = '';
    code.split('').forEach(function (letter) {
      var label = window.XC_PAIR ? window.XC_PAIR.poleText(letter) : letter;
      var span = document.createElement('span');
      span.className = 'tag';
      span.textContent = label + ' ' + letter;
      traits.appendChild(span);
    });

    ['tStrengths', 'tWatchouts', 'tFits'].forEach(function (id) {
      var list = document.getElementById(id);
      list.innerHTML = '';
      var arr = id === 'tStrengths' ? t.strengths
        : id === 'tWatchouts' ? t.watchouts : t.fits;
      arr.forEach(function (s) {
        var li = document.createElement('li');
        li.textContent = s;
        list.appendChild(li);
      });
    });

    document.getElementById('tTakeTest').href = 'quiz.html?scale=type16';
    document.getElementById('typeDetail').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  renderGrid();

  var direct = new URLSearchParams(window.location.search).get('type');
  if (direct && types[direct]) {
    renderDetail(direct.toUpperCase());
  }
})();
