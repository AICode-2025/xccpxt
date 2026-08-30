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

  function scaleCard(s) {
    var tagText = s.category === 'screen' ? '心理筛查' : '自我探索';
    var tagClass = s.category === 'screen' ? 'tag screen' : 'tag';
    return '<a class="scale-item" href="intro.html?scale=' + esc(s.id) + '">' +
      '<div class="scale-icon">' + esc(s.icon || '🧩') + '</div>' +
      '<div class="scale-name">' + esc(s.title) + '</div>' +
      '<div class="scale-desc">' + esc(s.desc) + '</div>' +
      '<div class="scale-tags">' +
        '<span class="' + tagClass + '">' + tagText + '</span>' +
        '<span class="tag">' + s.questions.length + ' 题 · 约 ' + s.timeMinutes + ' 分钟</span>' +
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
      explore.map(scaleCard).join('') || '<p class="section__sub">暂无</p>';
    document.getElementById('list-screen').innerHTML =
      screen.map(scaleCard).join('') || '<p class="section__sub">暂无</p>';
  }

  function renderHistory() {
    var hist = E.store.get(HISTORY_KEY, []);
    var section = document.getElementById('historySection');
    var list = document.getElementById('historyList');
    if (!hist.length) { section.classList.add('hidden'); return; }
    section.classList.remove('hidden');
    list.innerHTML = hist.slice(0, 8).map(function (h) {
      var s = E.getScale(h.scaleId);
      var name = s ? s.title : h.scaleId;
      return '<a class="history-item" href="result.html?scale=' + esc(h.scaleId) + '&a=' + esc(h.answers) + '">' +
        '<span>' + esc(name) + '</span>' +
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
