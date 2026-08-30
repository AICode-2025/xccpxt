/* ============================================================
   星辰测评 · 主题切换（4 套背景方案）
   变量挂在 <html data-theme="..."> 上，head 内执行避免闪色
   ============================================================ */
(function () {
  'use strict';

  var THEMES = ['violet', 'qing', 'peach', 'ink'];
  var KEY = 'xc_theme';

  function current() {
    var t = null;
    try { t = localStorage.getItem(KEY); } catch (e) { /* 忽略 */ }
    if (THEMES.indexOf(t) === -1) { t = 'violet'; }
    return t;
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(KEY, theme); } catch (e) { /* 忽略 */ }
    var meta = document.querySelector('meta[name="theme-color"]');
    var colors = { violet: '#5b6abf', qing: '#2f9e82', peach: '#e07a5f', ink: '#3d5a80' };
    if (meta && colors[theme]) { meta.setAttribute('content', colors[theme]); }
  }

  /* 尽早应用，避免首屏闪色 */
  apply(current());

  /* DOM 就绪后挂切换按钮（右下角小圆钮，循环切换） */
  function mountSwitcher() {
    if (document.getElementById('themeSwitcher')) { return; }
    var btn = document.createElement('button');
    btn.id = 'themeSwitcher';
    btn.type = 'button';
    btn.className = 'theme-switcher';
    btn.setAttribute('aria-label', '切换配色主题');
    btn.title = '换个配色';
    btn.textContent = '🎨';
    btn.addEventListener('click', function () {
      var next = THEMES[(THEMES.indexOf(current()) + 1) % THEMES.length];
      apply(next);
    });
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountSwitcher);
  } else {
    mountSwitcher();
  }
})();
