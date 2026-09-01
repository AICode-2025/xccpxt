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
    $id('whatIntro').textContent = scale.intro || scale.desc || '';

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
    } else if (scale.dimsMode) {
      cards.push(['📊', '五维剖面', '外倾/宜人/尽责/敏感/开放，五条剖面线']);
      cards.push(['🏷️', '档位解读', '每个维度高中低档位，对应一段人话解读']);
      cards.push(['⭐', '最突出维度', '一眼看到你性格里最鲜明的部分']);
      cards.push(['💡', '组合提示', '维度组合揭示行为模式，如"执行力型"']);
    } else if (scale.quadrantMode) {
      cards.push(['🏷️', '类型标签', '安全型 / 焦虑型 / 回避型 / 恐惧型']);
      cards.push(['📈', '两维坐标', '焦虑与回避的连续坐标，拒绝贴标签式粗暴结论']);
      cards.push(['💬', '相处建议', '针对你的模式给出可操作的相处提示']);
      cards.push(['🔁', '双向视角', '依恋是双向的，也看看对方可能站在哪个位置']);
    } else if (scale.countMode) {
      cards.push(['🔤', '你的类型', '从若干候选类型中，算出得分最高的那一个']);
      cards.push(['🥧', '占比分布', '每个类型各占多少，看清主型与次要倾向']);
      cards.push(['📖', '类型详解', '核心特质、优势、短板一次讲清楚']);
      cards.push(['💡', '行动提示', '针对你的类型给出能直接用的建议']);
    } else {
      cards.push(['📊', '总分与等级', '你的得分对应一个清晰的等级区间']);
      cards.push(['🧩', '分维度解读', '各维度分别说明，不只看一个总分']);
      cards.push(['💡', '个性化建议', '基于结果给出可操作的日常建议']);
      cards.push(['📌', '结果边界', '说清这份结果能说明什么、不能说明什么']);
    }

    box.innerHTML = cards.map(function (cd) {
      return '<div class="lp-gain__card" style="--c:' + c + '">' +
        '<div class="lp-gain__icon">' + cd[0] + '</div>' +
        '<div class="lp-gain__name">' + cd[1] + '</div>' +
        '<div class="lp-gain__desc">' + cd[2] + '</div>' +
      '</div>';
    }).join('');
  }

  /* ---------- 量表类型分组（决定场景/FAQ 文案模板） ---------- */
  function scaleKind(scale) {
    if (scale.poleMode || scale.dimsMode) { return 'personality'; }
    if (scale.quadrantMode) { return 'love'; }
    if (scale.category === 'screen') { return 'screen'; }
    return 'self';
  }

  /* ---------- 使用场景 ---------- */
  function renderScenario(scale) {
    var kind = scaleKind(scale);
    var sets = {
      personality: [
        ['🎯', '求职与定位', '认识自己的性格优势，面试与职业选择更笃定'],
        ['💬', '人际与沟通', '理解自己和他人的相处模式，减少误会'],
        ['🧭', '自我认知', '性格画像清晰化，知道自己在什么环境里最舒服'],
        ['🤝', '团队协作', '了解自己在团队中的角色，配合更顺畅']
      ],
      love: [
        ['❤️', '亲密关系', '看清自己在关系里的模式，减少反复的摩擦'],
        ['🧭', '自我觉察', '了解焦虑与回避倾向的来源，更接纳自己'],
        ['💬', '恋爱沟通', '理解对方的回应方式，沟通更对味'],
        ['🌱', '关系成长', '依恋模式可以改变，为更健康的关系做准备']
      ],
      screen: [
        ['🧭', '状态了解', '把近期的感受量化，心里有数'],
        ['🩺', '就医准备', '就诊前自测梳理症状，与医生沟通更高效'],
        ['📈', '状态跟踪', '间隔一段时间重测，看趋势变化'],
        ['🌱', '自我照顾', '结果提醒你该关注哪些方面']
      ],
      self: [
        ['🎯', '自我激励', '看清自己的状态水平，知道从哪发力'],
        ['🤝', '支持网络', '盘点身边能托住你的人'],
        ['🌱', '成长规划', '把优势用在生活里，设定更合理的目标'],
        ['🧭', '自我觉察', '更了解自己，也更懂怎么照顾自己']
      ]
    };
    var cards = sets[kind] || sets.self;
    $id('tab-scenario').innerHTML = '<div class="lp-scenario">' + cards.map(function (c) {
      return '<div class="lp-scenario__card">' +
        '<span class="lp-scenario__icon">' + c[0] + '</span>' +
        '<b>' + c[1] + '</b>' +
        '<p>' + c[2] + '</p>' +
      '</div>';
    }).join('') + '</div>';
  }

  /* ---------- 如何使用 ---------- */
  function renderSteps(scale) {
    var steps = [
      ['1', '凭第一直觉作答', '直觉最接近真实的你'],
      ['2', '完成全部题目', '约 ' + scale.timeMinutes + ' 分钟，中途退出可继续'],
      ['3', '查看结果解读', '总分 / 维度 / 类型，一页讲透'],
      ['4', '分享给朋友', '复制链接，对方打开即见结果']
    ];
    $id('stepsBlock').innerHTML = steps.map(function (s) {
      return '<div class="lp-step">' +
        '<span class="lp-step__num">' + s[0] + '</span>' +
        '<b>' + s[1] + '</b>' +
        '<p>' + s[2] + '</p>' +
      '</div>';
    }).join('');

    if (scale.instruction) {
      $id('tab-instruction').innerHTML =
        '<h4>作答说明</h4><p>' + esc(scale.instruction) + '</p>';
    } else {
      $id('tab-instruction').classList.add('hidden');
    }
  }

  /* ---------- 常见问题 ---------- */
  function renderFaq(scale) {
    var kind = scaleKind(scale);
    var accuracy = {
      personality: '题库基于经典心理学量表（OEJTS / IPIP 等公开版本），但结果反映的是你当下的自我认知，仅供自我探索与参考。',
      love: '维度框架来自依恋理论的学术共识，题项为原创编写。结果反映你的关系模式倾向，仅供自我探索，不构成关系诊断。',
      screen: '这是国际通用的标准化自评筛查工具，信效度有研究支持。但它不能替代医生的专业诊断，结果异常请及时就医。',
      self: '基于经典公开量表改编，反映你近期的自我评价，供自我了解参考。'
    };
    var faqs = [
      ['这个测试准吗？', accuracy[kind]],
      ['需要注册或登录吗？', '不需要。全站免费、匿名，即开即测。'],
      ['我的数据安全吗？', '作答只保存在你的设备本地，不会上传任何服务器，清除浏览器数据即完全消失。'],
      ['结果能保存或分享吗？', '结果页链接自带你的作答参数，复制发给朋友，对方打开就能看到你的结果，无需登录。'],
      ['为什么结果和我以为的不一样？', '测验反映的是你实际的选择模式，而不是你希望成为的样子。凭第一直觉作答时最接近真实。']
    ];
    if (kind === 'screen') {
      faqs.push(['结果提示异常怎么办？', '量表高分不代表确诊，请勿自行定性。若持续感到不适，建议前往正规医院精神心理科就诊，或拨打全国心理援助热线 12356。']);
    }
    $id('tab-faq').innerHTML = faqs.map(function (f) {
      return '<details class="lp-faq__item">' +
        '<summary>' + esc(f[0]) + '</summary>' +
        '<p>' + esc(f[1]) + '</p>' +
      '</details>';
    }).join('');
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

  /* ---------- TAB 切换 ---------- */
  function activateTab(btn) {
    var nav = navEl();
    if (!nav || !btn) { return; }
    var key = btn.getAttribute('data-tab');
    nav.querySelectorAll('.lp-tabs__tab').forEach(function (b) {
      var on = b === btn;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    document.querySelectorAll('.lp-tabs__pane').forEach(function (p) {
      p.classList.toggle('active', p.id === 'tab-' + key);
    });
  }

  function navEl() { return document.querySelector('.lp-tabs__nav'); }

  function bindTabs() {
    var nav = navEl();
    if (!nav) { return; }
    nav.addEventListener('click', function (e) {
      var btn = e.target.closest('.lp-tabs__tab');
      if (btn) { activateTab(btn); }
    });
    /* 键盘导航：←/→ 循环、Home/End 跳首尾（WAI-ARIA tabs 规范） */
    nav.addEventListener('keydown', function (e) {
      var btns = Array.prototype.slice.call(nav.querySelectorAll('.lp-tabs__tab'));
      if (!btns.length) { return; }
      var idx = btns.indexOf(document.activeElement);
      if (idx === -1) { return; }
      var next = idx;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { next = (idx + 1) % btns.length; }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { next = (idx - 1 + btns.length) % btns.length; }
      else if (e.key === 'Home') { next = 0; }
      else if (e.key === 'End') { next = btns.length - 1; }
      else { return; }
      e.preventDefault();
      activateTab(btns[next]);
      btns[next].focus();
    });
  }

  /* ---------- 版本选择（双版本量表） ---------- */
  var state = { base: null, active: null, verId: null };

  function renderVersionSelector() {
    var vs = E.versionList(state.base);
    var sec = $id('versionSection');
    if (!vs.length) { sec.classList.add('hidden'); return; }
    sec.classList.remove('hidden');
    var c = esc(state.base.color || '#4f46e5');
    $id('versionSub').textContent = vs.length + ' 个版本 · 全部免费';
    $id('versionBlock').innerHTML = vs.map(function (v) {
      var active = v.id === state.verId;
      return '<button class="lp-version' + (active ? ' active' : '') + '" data-v="' + esc(v.id) + '" type="button" style="--c:' + c + '">' +
        '<b>' + esc(v.label) + '</b>' +
        '<span>' + v.count + ' 题 · 约 ' + v.timeMinutes + ' 分钟</span>' +
        '<i>' + (v.id === 'quick' ? '快速出结果 · 适合分享' : '报告更全面 · 了解更深') + '</i>' +
      '</button>';
    }).join('');
    var block = $id('versionBlock');
    block.querySelectorAll('.lp-version').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyVersion(btn.getAttribute('data-v'));
      });
    });
  }

  function applyVersion(verId) {
    var r = E.resolveVersion(state.base, verId);
    state.active = r.scale;
    state.verId = r.versionId;
    render(state.active);
    renderVersionSelector();
  }

  function go() {
    var url = 'quiz.html?scale=' + encodeURIComponent(state.base.id);
    if (state.verId) { url += '&v=' + encodeURIComponent(state.verId); }
    window.location.href = url;
  }

  function init() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('scale');
    var base = id ? E.getScale(id) : null;
    if (!base) { window.location.href = 'index.html'; return; }

    state.base = base;
    var resolved = E.resolveVersion(base, params.get('v'));
    state.active = resolved.scale;
    state.verId = resolved.versionId;

    render(state.active);
    renderVersionSelector();
    bindTabs();

    $id('startBtn').addEventListener('click', go);
    $id('startBtn2').addEventListener('click', go);
    $id('startBtn3').addEventListener('click', go);
  }

  function render(scale) {
    renderHero(scale);
    renderWhat(scale);
    renderGain(scale);
    renderScenario(scale);
    renderSteps(scale);
    renderFaq(scale);
    renderDisclaimer(scale);
    renderRecs(scale.id);

    $id('ctaTitle').textContent = '认识' + scale.title + '，现在就开始';
    $id('startBtn2').textContent = '开始测试 · ' + scale.questions.length + ' 题';
    $id('startBtn3').textContent = '开始测试 · ' + scale.questions.length + ' 题';
  }

  init();
})();
