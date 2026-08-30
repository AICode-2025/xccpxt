/* ============================================================
   星辰测评 · 测试介绍页
   URL: intro.html?scale=xxx
   展示：图标 / 名称 / 题数时长 / 介绍 / 作答说明 / 测后收获 / 来源 / 免责
   ============================================================ */
(function () {
  'use strict';

  var E = window.XC_ENGINE;

  function $id(name) { return document.getElementById(name); }

  function init() {
    var id = new URLSearchParams(window.location.search).get('scale');
    var scale = id ? E.getScale(id) : null;
    if (!scale) { window.location.href = 'index.html'; return; }

    document.title = scale.title + ' · 星辰测评';
    $id('quitLink').href = 'index.html';
    $id('introIcon').textContent = scale.icon || '🧩';
    $id('introTitle').textContent = scale.title;

    var tagText = scale.category === 'screen' ? '心理筛查' : '自我探索';
    $id('introMeta').innerHTML =
      '<span class="tag">' + tagText + '</span>' +
      '<span class="tag">' + scale.questions.length + ' 题</span>' +
      '<span class="tag">约 ' + scale.timeMinutes + ' 分钟</span>';

    $id('introDesc').textContent = scale.desc || '';
    $id('introInstruction').textContent = scale.instruction || '';
    $id('introResult').textContent = scale.intro || '';
    $id('introSource').textContent = '题源：' + (scale.source || '未标注') + ' · 本站为免费匿名使用，不收集任何作答数据';

    /* 免责声明按等级切换话术 */
    var box = $id('introDisclaimer');
    var base = scale.disclaimerLevel === 'screen'
      ? '本量表为标准化自评筛查工具，结果仅反映你近期的自我感受，不能替代医生的当面诊断。如结果提示异常，或你持续感到痛苦，请及时寻求精神科医生或心理咨询师的专业帮助。'
      : '本测试仅供自我探索与娱乐参考，结果基于你的自我评价，不构成任何专业评估或医学诊断。';
    box.textContent = scale.disclaimerExtra ? base + ' ' + scale.disclaimerExtra : base;

    $id('startBtn').addEventListener('click', function () {
      window.location.href = 'quiz.html?scale=' + encodeURIComponent(scale.id);
    });
  }

  init();
})();
