/* ============================================================
   星辰测评 · 首页逻辑
   - 渲染测评卡片网格（图标 + 名称 + 描述，参考 traits.zqbapp.cn）
   - 自我探索按主题分组（方案B：分区折叠，每组按热度排序）
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

  /** @param hideCat true 时不再重复渲染「自我探索」分类标签（分组标题已表达） */
  function scaleCard(s, i, hideCat) {
    var isScreen = s.category === 'screen';
    var c = s.color || '#4f46e5';
    var catTag = isScreen
      ? '<span class="tag screen">心理筛查</span>'
      : (hideCat ? '' : '<span class="tag">自我探索</span>');
    return '<a class="scale-item" href="intro.html?scale=' + esc(s.id) + '" ' +
        'style="--c:' + c + ';animation-delay:' + (i * 45) + 'ms">' +
      '<div class="scale-icon">' + esc(s.icon || '🧩') + '</div>' +
      '<div class="scale-name">' + esc(s.title) + '</div>' +
      '<div class="scale-desc">' + esc(s.hook || s.desc) + '</div>' +
      '<div class="scale-tags">' + catTag +
        '<span class="tag">' + qCount(s) + ' 题 · 约 ' + timeMin(s) + ' 分钟</span>' +
      '</div>' +
    '</a>';
  }

  /* ---------- 自我探索二级分组（方案B：主题分组，组内按热度排序） ---------- */
  var EXPLORE_GROUPS = [
    { name: '人格 · 类型', dot: '#6366f1', ids: ['type16', 'bigfive', 'enneagram', 'epq', 'p16pf', 'disc'] },
    { name: '自我 · 特质', dot: '#10b981', ids: ['hsp', 'perf', 'gses', 'rses', 'grit', 'grat', 'selfcomp', 'lotr', 'hope', 'mindful', 'csec', 'curio', 'flow', 'forgive', 'selfcrit', 'narc', 'brs', 'cdrisc'] },
    { name: '情绪 · 状态', dot: '#f59e0b', ids: ['stai', 'socanx', 'eq', 'ders', 'erq', 'staxi', 'sad', 'meaning', 'swls', 'panas', 'tas20'] },
    { name: '关系 · 情感', dot: '#ec4899', ids: ['attachment', 'tri', 'olson', 'fes', 'embu', 'parel', 'codep'] },
    { name: '社交 · 人际', dot: '#0ea5e9', ids: ['ulca', 'trust', 'embarrass', 'psss', 'copy'] },
    { name: '职业 · 学习', dot: '#8b5cf6', ids: ['holland', 'workval', 'burno', 'time', 'decis', 'creat', 'typea', 'locus', 'sdt'] },
    { name: '生活 · 自律', dot: '#ea580c', ids: ['procras', 'phdep', 'binge', 'impulse', 'sleephyg', 'sres'] },
    { name: '轻松 · 趣味', dot: '#f43f5e', ids: ['animal', 'lovebrain', 'love5', 'temp4', 'psage'] }
  ];

  function subBlock(name, dot, scales) {
    if (!scales.length) { return ''; }
    return '<div class="sub-group">' +
      '<button type="button" class="sub-group__head" aria-expanded="true">' +
        '<i class="dot" style="background:' + dot + '" aria-hidden="true"></i>' +
        '<span class="sub-group__name">' + esc(name) + '</span>' +
        '<span class="sub-group__cnt">' + scales.length + '</span>' +
        '<span class="sub-group__arr" aria-hidden="true">⌄</span>' +
      '</button>' +
      '<div class="grid">' + scales.map(function (s, i) { return scaleCard(s, i, true); }).join('') + '</div>' +
    '</div>';
  }

  function renderExplore() {
    var explored = E.listScales().filter(function (s) { return s.category !== 'screen'; });
    var placed = {};
    var html = '';
    EXPLORE_GROUPS.forEach(function (g) {
      var scales = g.ids.map(function (id) { return E.getScale(id); }).filter(Boolean);
      scales.forEach(function (s) { placed[s.id] = 1; });
      html += subBlock(g.name, g.dot, scales);
    });
    // 兜底：未纳入任何分组的探索量表，避免新增量表后无声消失
    var rest = explored.filter(function (s) { return !placed[s.id]; });
    if (rest.length) {
      html += subBlock('其他', '#9ca3af', rest);
    }
    document.getElementById('explore-sub').innerHTML = html;
    bindFold(document.getElementById('foldAll'));
  }

  function bindFold(foldBtn) {
    var wrap = document.getElementById('explore-sub');
    var heads = wrap.querySelectorAll('.sub-group__head');
    Array.prototype.forEach.call(heads, function (h) {
      function toggle() {
        var group = h.parentNode;
        var nowCollapsed = group.classList.toggle('collapsed');
        h.setAttribute('aria-expanded', nowCollapsed ? 'false' : 'true');
        syncFoldLabel(foldBtn);
      }
      h.addEventListener('click', toggle);
      h.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });

    foldBtn.addEventListener('click', function () {
      // 当前全部展开 → 收起全部；否则展开全部
      var open = wrap.querySelectorAll('.sub-group.collapsed').length === 0;
      Array.prototype.forEach.call(heads, function (h) {
        var group = h.parentNode;
        var collapse = open;
        group.classList.toggle('collapsed', collapse);
        h.setAttribute('aria-expanded', collapse ? 'false' : 'true');
      });
      syncFoldLabel(foldBtn);
    });
    syncFoldLabel(foldBtn);
  }

  function syncFoldLabel(btn) {
    var wrap = document.getElementById('explore-sub');
    var total = wrap.querySelectorAll('.sub-group').length;
    var collapsed = wrap.querySelectorAll('.sub-group.collapsed').length;
    btn.textContent = collapsed === total ? '全体展开' : '全体收起';
  }

  function renderScreen() {
    var screen = E.listScales().filter(function (s) { return s.category === 'screen'; });
    document.getElementById('list-screen').innerHTML =
      screen.map(function (s, i) { return scaleCard(s, i); }).join('') || '<p class="section__sub">暂无</p>';
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

  renderExplore();
  renderScreen();
  renderHistory();
})();