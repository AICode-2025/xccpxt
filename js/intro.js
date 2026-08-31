/* ============================================================
   星辰测评 · 测试专题页
   URL: intro.html?scale=xxx
   区块：Hero / 信任条 / 测什么 / 测完得到什么 / 怎么测 / 免责 / 底部 CTA / 相关推荐
   数据全部来自 data/*.js，按量表的计分模式（pole/dims/quadrant/求和）渲染
   ============================================================ */
(function () {
  'use strict';

  var E = window.XC_ENGINE;

  function $id(name) { return document.getElementById(name); }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---------- Hero 区 ---------- */
  function renderHero(scale) {
    document.title = scale.title + ' · 星辰测评';

    var tagText = scale.category === 'screen' ? '心理筛查' : '自我探索';
    $id('heroTags').innerHTML =
      '<span class="lp-hero__tag lp-hero__tag--screen">' + tagText + '</span>' +
      '<span class="lp-hero__tag">' + scale.questions.length + ' 题</span>' +
      '<span class="lp-hero__tag">约 ' + scale.timeMinutes + ' 分钟</span>';

    $id('heroTitle').textContent = scale.title;
    $id('heroHook').textContent = scale.hook || scale.desc || '';

    /* 参数条：题数 · 时长 · 类型/维度数 */
    var stats = [];
    stats.push('<div class="lp-hero__stat"><b>' + scale.questions.length + '</b><span>道题</span></div>');
    stats.push('<div class="lp-hero__stat"><b>约 ' + scale.timeMinutes + '</b><span>分钟</span></div>');
    if (scale.poleMode) {
      stats.push('<div class="lp-hero__stat"><b>16</b><span>种类型</span></div>');
      stats.push('<div class="lp-hero__stat"><b>' + scale.poleMode.dimensions.length + '</b><span>个维度</span></div>');
    } else if (scale.dimsMode) {
      stats.push('<div class="lp-hero__stat"><b>' + scale.dimsMode.subscales.length + '</b><span>个维度</span></div>');
    } else if (scale.quadrantMode) {
      stats.push('<div class="lp-hero__stat"><b>' + scale.quadrantMode.dimensions.length + '</b><span>个维度</span></div>');
      stats.push('<div class="lp-hero__stat"><b>4</b><span>种类型</span></div>');
    }
    $id('heroStats').innerHTML = stats.join('');

    $id('heroHint').textContent = '免费 · 免登录 · 结果可存海报';

    /* 视觉：十六型用官方图，其余用专属色 emoji 大图标 */
    var visual = $id('heroVisual');
    if (scale.id === 'type16') {
      visual.innerHTML = '<img class="lp-hero__img" src="assets/mbti-icon.png" alt="' + esc(scale.title) + '">';
      var hero = $id('lpHero');
      hero.classList.add('lp-hero--photo');
      $id('heroBg').style.backgroundImage = 'url(assets/hero-bg.jpg)';
    } else {
      visual.innerHTML = '<div class="lp-hero__icon" style="--c:' + esc(scale.color || '#4f46e5') + '">' + esc(scale.icon || '🧩') + '</div>';
    }
  }

  /* ---------- 测什么 ---------- */
  function renderWhat(scale) {
    var box = $id('whatBlock');
    var sub = $id('whatSub');
    var html = [];

    if (scale.poleMode) {
      sub.textContent = '四个维度，16 种组合';
      scale.poleMode.dimensions.forEach(function (d) {
        html.push(
          '<div class="lp-dim" style="--c:' + esc(scale.color || '#4f46e5') + '">' +
            '<div class="lp-dim__head">' +
              '<span class="lp-dim__left">' + esc(d.left.label) + ' ' + esc(d.left.code) + '</span>' +
              '<span class="lp-dim__code">' + esc(d.key) + '</span>' +
              '<span class="lp-dim__right">' + esc(d.right.code) + ' ' + esc(d.right.label) + '</span>' +
            '</div>' +
            '<div class="lp-dim__bar"><i></i></div>' +
            '<p class="lp-dim__note">偏向' + esc(d.left.label) + '或' + esc(d.right.label) + '，决定你类型中的这一位字母</p>' +
          '</div>'
        );
      });
      html.push('<p class="lp-what__note">' + esc(scale.poleMode.thresholdNote || '') + '</p>');
    }
    else if (scale.dimsMode) {
      sub.textContent = '五大维度，认识完整的你';
      scale.dimsMode.subscales.forEach(function (s) {
        html.push(
          '<div class="lp-dim lp-dim--bar" style="--c:' + esc(scale.color || '#4f46e5') + '">' +
            '<div class="lp-dim__head">' +
              '<span class="lp-dim__left">' + esc(s.name) + '</span>' +
              '<span class="lp-dim__code">' + esc(s.code) + '</span>' +
            '</div>' +
            '<p class="lp-dim__note">' + esc(s.short || '') + '倾向，影响你待人接物的方式</p>' +
          '</div>'
        );
      });
    }
    else if (scale.quadrantMode) {
      sub.textContent = '两个维度，四种依恋模式';
      scale.quadrantMode.dimensions.forEach(function (d) {
        html.push(
          '<div class="lp-dim" style="--c:' + esc(scale.color || '#4f46e5') + '">' +
            '<div class="lp-dim__head">' +
              '<span class="lp-dim__left">低' + esc(d.name) + '</span>' +
              '<span class="lp-dim__code">' + esc(d.short) + '</span>' +
              '<span class="lp-dim__right">高' + esc(d.name) + '</span>' +
            '</div>' +
            '<div class="lp-dim__bar"><i></i></div>' +
          '</div>'
        );
      });
      html.push(
        '<div class="lp-quad">' +
          '<div class="lp-quad__cell lp-quad__cell--safe"><b>安全型</b><span>低焦虑 · 低回避</span></div>' +
          '<div class="lp-quad__cell lp-quad__cell--anx"><b>焦虑型</b><span>高焦虑 · 低回避</span></div>' +
          '<div class="lp-quad__cell lp-quad__cell--avoid"><b>回避型</b><span>低焦虑 · 高回避</span></div>' +
          '<div class="lp-quad__cell lp-quad__cell--fear"><b>恐惧型</b><span>高焦虑 · 高回避</span></div>' +
        '</div>'
      );
    }
    else {
      /* 求和模式：有维度展示维度，否则纯文字 */
      sub.textContent = scale.desc ? '' : '';
      if (scale.subscales && scale.subscales.length) {
        scale.subscales.forEach(function (s) {
          html.push(
            '<div class="lp-dim lp-dim--bar" style="--c:' + esc(scale.color || '#4f46e5') + '">' +
              '<div class="lp-dim__head"><span class="lp-dim__left">' + esc(s.name) + '</span></div>' +
            '</div>'
          );
        });
      } else {
        html.push('<div class="lp-what__text">' + esc(scale.intro || scale.desc || '') + '</div>');
      }
    }

    box.innerHTML = html.join('');
  }

  /* ---------- 测完得到什么 ---------- */
  function renderGain(scale) {
    var box = $id('gainBlock');
    var cards = [];
    var c = esc(scale.color || '#4f46e5');

    if (scale.poleMode) {
      cards.push(['🔤', '十六型代码', '如 INTJ，四个字母一眼记住你的类型']);
      cards.push(['🏷️', '中文昵称', '每个类型配一个社交货币昵称，方便发朋友圈']);
      cards.push(['📊', '四维剖面', '外向/内向、实感/直觉……每维倾向清晰可见']);
      cards.push(['🧠', '类型解读', '画像、优势、小提醒、适合方向一页讲透']);
      cards.push(['🖼️', '分享海报', '一键生成海报图，长按保存即发']);
    } else if (scale.dimsMode) {
      cards.push(['📊', '五维剖面', '外倾/宜人/尽责/敏感/开放，五条剖面线']);
      cards.push(['🏷️', '档位解读', '每个维度高中低档位，对应一段人话解读']);
      cards.push(['⭐', '最突出维度', '一眼看到你性格里最鲜明的部分']);
      cards.push(['💡', '组合提示', '维度组合揭示行为模式，如"执行力型"']);
      cards.push(['🖼️', '分享海报', '一键生成海报图，长按保存即发']);
    } else if (scale.quadrantMode) {
      cards.push(['🏷️', '类型标签', '安全型 / 焦虑型 / 回避型 / 恐惧型']);
      cards.push(['📈', '两维坐标', '焦虑与回避的连续坐标，拒绝贴标签式粗暴结论']);
      cards.push(['💬', '相处建议', '针对你的模式给出可操作的相处提示']);
      cards.push(['🖼️', '分享海报', '一键生成海报图，长按保存即发']);
    } else {
      cards.push(['📊', '总分与等级', '你的得分对应一个清晰的等级区间']);
      cards.push(['🧩', '分维度解读', '各维度分别说明，不只看一个总分']);
      cards.push(['💡', '个性化建议', '基于结果给出可操作的日常建议']);
      cards.push(['🖼️', '分享海报', '一键生成海报图，长按保存即发']);
    }

    box.innerHTML = cards.map(function (cd) {
      return '<div class="lp-gain__card" style="--c:' + c + '">' +
        '<div class="lp-gain__icon">' + cd[0] + '</div>' +
        '<div class="lp-gain__name">' + cd[1] + '</div>' +
        '<div class="lp-gain__desc">' + cd[2] + '</div>' +
      '</div>';
    }).join('');
  }

  /* ---------- 怎么测 ---------- */
  function renderSteps(scale) {
    var steps = [
      ['1', '凭第一直觉作答', '不用想太久，直觉最接近真实的你'],
      ['2', '约 ' + scale.timeMinutes + ' 分钟完成', '中途退出可继续上次作答'],
      ['3', '结果即时生成', '可保存海报，也可分享链接给朋友']
    ];
    $id('stepsBlock').innerHTML = steps.map(function (s) {
      return '<div class="lp-step">' +
        '<span class="lp-step__num">' + s[0] + '</span>' +
        '<b>' + s[1] + '</b>' +
        '<p>' + s[2] + '</p>' +
      '</div>';
    }).join('');

    if (scale.instruction) {
      $id('instructionBlock').innerHTML =
        '<h4>作答说明</h4><p>' + esc(scale.instruction) + '</p>';
    } else {
      $id('instructionBlock').classList.add('hidden');
    }
  }

  /* ---------- 免责声明 ---------- */
  function renderDisclaimer(scale) {
    var box = $id('introDisclaimer');
    var base = scale.disclaimerLevel === 'screen'
      ? '本量表为标准化自评筛查工具，结果仅反映你近期的自我感受，不能替代医生的当面诊断。如结果提示异常，或你持续感到痛苦，请及时寻求精神科医生或心理咨询师的专业帮助。'
      : '本测试仅供自我探索与娱乐参考，结果基于你的自我评价，不构成任何专业评估或医学诊断。';
    var extra = scale.disclaimerExtra ? ' ' + scale.disclaimerExtra : '';
    box.innerHTML = '<b>温馨提示</b><p>' + esc(base + extra) + '</p>';
  }

  /* ---------- 相关推荐（站内其他量表，取 3 个） ---------- */
  function renderRecs(currentId) {
    var all = window.XC_SCALES || {};
    var others = Object.keys(all)
      .filter(function (k) { return k !== currentId; })
      .slice(0, 3)
      .map(function (k) { return all[k]; });

    $id('recBlock').innerHTML = others.map(function (s) {
      return '<a class="lp-rec__card" href="intro.html?scale=' + encodeURIComponent(s.id) + '" style="--c:' + esc(s.color || '#4f46e5') + '">' +
        '<span class="lp-rec__icon">' + esc(s.icon || '🧩') + '</span>' +
        '<span class="lp-rec__body">' +
          '<b>' + esc(s.title) + '</b>' +
          '<i>' + esc(s.hook || s.desc || '') + '</i>' +
        '</span>' +
      '</a>';
    }).join('');
  }

  function init() {
    var id = new URLSearchParams(window.location.search).get('scale');
    var scale = id ? E.getScale(id) : null;
    if (!scale) { window.location.href = 'index.html'; return; }

    renderHero(scale);
    renderWhat(scale);
    renderGain(scale);
    renderSteps(scale);
    renderDisclaimer(scale);
    renderRecs(scale.id);

    $id('ctaTitle').textContent = '认识' + scale.title + '，现在就开始';
    $id('startBtn2').textContent = '开始测试 · ' + scale.questions.length + ' 题';

    function go() {
      window.location.href = 'quiz.html?scale=' + encodeURIComponent(scale.id);
    }
    $id('startBtn').addEventListener('click', go);
    $id('startBtn2').addEventListener('click', go);
  }

  init();
})();
