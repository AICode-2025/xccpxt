/* ============================================================
   星辰测评 · 答题页逻辑
   - URL: quiz.html?scale=xxx
   - 单题推进 / 进度条 / 自动保存 / 断点续答
   - 完成后写入 xc_last_<id> 与历史记录，跳结果页
   ============================================================ */
(function () {
  'use strict';

  var E = window.XC_ENGINE;
  var HISTORY_KEY = 'xc_history';
  var scale = null;
  var answers = [];
  var current = 0;

  function $id(name) { return document.getElementById(name); }

  /* ---------- 初始化 ---------- */
  function init() {
    var id = new URLSearchParams(window.location.search).get('scale');
    scale = id ? E.getScale(id) : null;
    if (!scale) { window.location.href = 'index.html'; return; }

    document.title = scale.title + ' · 星辰测评';
    $id('scaleTitle').textContent = scale.title;
    $id('scaleMeta').textContent = scale.questions.length + ' 题 · 约 ' + scale.timeMinutes + ' 分钟';
    $id('instruction').textContent = scale.instruction;
    $id('quitLink').href = 'index.html';

    var saved = E.store.get('xc_progress_' + scale.id, null);
    var hasProgress = saved && saved.answers &&
      saved.answers.some(function (a) { return a !== null && typeof a !== 'undefined'; });

    if (hasProgress) {
      $id('resumeCard').classList.remove('hidden');
      $id('quizArea').classList.add('hidden');
      $id('resumeText').textContent =
        '检测到你上次做到第 ' + saved.done + '/' + scale.questions.length + ' 题，可以接着做，也可以重新开始。';
      $id('resumeBtn').addEventListener('click', function () {
        answers = saved.answers;
        current = saved.done;
        startQuiz();
      });
      $id('restartBtn').addEventListener('click', function () {
        E.store.remove('xc_progress_' + scale.id);
        answers = new Array(scale.questions.length);
        current = 0;
        startQuiz();
      });
    } else {
      answers = new Array(scale.questions.length);
      startQuiz();
    }
  }

  function startQuiz() {
    $id('resumeCard').classList.add('hidden');
    $id('quizArea').classList.remove('hidden');
    renderQuestion();
  }

  /* ---------- 渲染 ---------- */
  function renderQuestion() {
    var q = scale.questions[current];
    $id('qIndex').textContent = '第 ' + (current + 1) + ' / ' + scale.questions.length + ' 题';
    $id('qText').textContent = q.text;
    var sub = $id('qSubtext');
    /* 量表原文（研究对照用）优先，其次题目自带补充 */
    var subText = q.textEn || q.subtext || '';
    if (subText) { sub.textContent = subText; sub.classList.remove('hidden'); }
    else { sub.classList.add('hidden'); }

    var box = $id('options');
    box.innerHTML = '';
    scale.options.forEach(function (opt, idx) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn' + (answers[current] === idx ? ' selected' : '');
      btn.textContent = opt.text;
      btn.addEventListener('click', function () { selectOption(idx); });
      box.appendChild(btn);
    });

    updateProgress();
    $id('prevBtn').style.visibility = current > 0 ? 'visible' : 'hidden';
  }

  function updateProgress() {
    var pct = Math.round((current / scale.questions.length) * 100);
    $id('progressBar').style.width = pct + '%';
    $id('progressText').textContent = '已完成 ' + pct + '%';
  }

  /* ---------- 作答 ---------- */
  function selectOption(idx) {
    answers[current] = idx;

    // 标记选中态
    var btns = $id('options').children;
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('selected', i === idx);
    }

    saveProgress();

    // 最后一题 → 交卷；否则短暂停顿后推进（让用户看到选中反馈）
    if (current === scale.questions.length - 1) {
      finish();
      return;
    }
    window.setTimeout(function () {
      if (answers[current] === idx) { // 期间没有改答案才推进
        current += 1;
        renderQuestion();
      }
    }, 220);
  }

  function saveProgress() {
    var done = 0;
    answers.forEach(function (a) { if (typeof a === 'number') { done++; } });
    E.store.set('xc_progress_' + scale.id, { answers: answers, done: done });
  }

  function finish() {
    // 校验全部作答（漏题回跳）
    for (var i = 0; i < answers.length; i++) {
      if (typeof answers[i] !== 'number') {
        current = i;
        renderQuestion();
        return;
      }
    }

    E.store.remove('xc_progress_' + scale.id);
    E.store.set('xc_last_' + scale.id, answers);

    // 写历史（同量表只保留最近一条，新的在前）
    var result = E.compute(scale, answers);
    var hist = E.store.get(HISTORY_KEY, []).filter(function (h) {
      return h.scaleId !== scale.id;
    });
    hist.unshift({
      scaleId: scale.id,
      answers: answers.join(''),
      level: result.level ? result.level.level : '',
      date: new Date().toISOString().slice(0, 10)
    });
    E.store.set(HISTORY_KEY, hist.slice(0, 30));

    window.location.href =
      'result.html?scale=' + encodeURIComponent(scale.id) +
      '&a=' + answers.join('');
  }

  $id('prevBtn').addEventListener('click', function () {
    if (current > 0) { current -= 1; renderQuestion(); }
  });

  init();
})();
