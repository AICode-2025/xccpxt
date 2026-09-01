/* ============================================================
   星辰测评 · 首页逻辑
   - 渲染测评卡片网格（图标 + 名称 + 描述，参考 traits.zqbapp.cn）
   - 渲染历史记录（localStorage）
   ============================================================ */
(function () {
  'use strict';

  var E = window.XC_ENGINE;
  var HISTORY_KEY = 'xc_history';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** 取量表默认展示题数（有双版本时取速测版题数） */
  function qCount(s) {
    if (s.versions) {
      var k = Object.keys(s.versions)[0];
      return (s.versions[k].questions || []).length;
    }
    return (s.questions || []).length;
  }

  /** 取量表默认展示时长，必须与 qCount 取同一版本的时长，避免题数/时长错位 */
  function timeMin(s) {
    if (s.versions) {
      var k = Object.keys(s.versions)[0];
      var t = s.versions[k].timeMinutes;
      if (typeof t === 'number') { return t; }
    }
    return s.timeMinutes;
  }

  function scaleCard(s, i) {
    var tagText = s.category === 'screen' ? '心理筛查' : '自我探索';
    var tagClass = s.category === 'screen' ? 'tag screen' : 'tag';
    var c = s.color || '#4f46e5';
    return '<a class="scale-item" href="intro.html?scale=' + esc(s.id) + '" ' +
        'style="--c:' + c + ';animation-delay:' + (i * 45) + 'ms">' +
      '<div class="scale-icon">' + esc(s.icon || '🧩') + '</div>' +
      '<div class="scale-name">' + esc(s.title) + '</div>' +
      '<div class="scale-desc">' + esc(s.hook || s.desc) + '</div>' +
      '<div class="scale-tags">' +
        '<span class="' + tagClass + '">' + tagText + '</span>' +
        '<span class="tag">' + qCount(s) + ' 题 · 约 ' + timeMin(s) + ' 分钟</span>' +
      '</div>' +
    '</a>';
  }

  function renderList() {
    var scales = E.listScales();
    var explore = [];
    var screen = [];
    scales.forEach(function (s) {
      (s.category === 'screen' ? screen : explore).push(s);
    });
    document.getElementById('list-explore').innerHTML =
      explore.map(function (s, i) { return scaleCard(s, i); }).join('') || '<p class="section__sub">暂无</p>';
    document.getElementById('list-screen').innerHTML =
      screen.map(function (s, i) { return scaleCard(s, i + explore.length); }).join('') || '<p class="section__sub">暂无</p>';
  }

  function renderHistory() {
    var hist = E.store.get(HISTORY_KEY, []);
    var section = document.getElementById('historySection');
    var empty = document.getElementById('historyEmpty');
    var list = document.getElementById('historyList');
    if (!hist.length) {
      section.classList.add('hidden');
      empty.classList.remove('hidden');
      return;
    }
    section.classList.remove('hidden');
    empty.classList.add('hidden');
    list.innerHTML = hist.slice(0, 8).map(function (h) {
      var s = E.getScale(h.scaleId);
      var name = s ? s.title : h.scaleId;
      var ver = h.ver ? '&v=' + encodeURIComponent(h.ver) : '';
      return '<a class="history-item" href="result.html?scale=' + esc(h.scaleId) + ver + '&a=' + esc(h.answers) + '">' +
        '<span>' + esc(name) + (h.verLabel ? '<i class="h-ver">' + esc(h.verLabel) + '</i>' : '') + '</span>' +
        '<span class="h-level">' + esc(h.level) +
          ' <span class="h-date">' + esc(h.date) + '</span></span>' +
      '</a>';
    }).join('');
  }

  document.getElementById('clearHistory').addEventListener('click', function () {
    E.store.set(HISTORY_KEY, []);
    renderHistory();
  });

  renderList();
  renderHistory();
})();
