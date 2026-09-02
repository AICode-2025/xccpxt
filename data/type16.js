/* ============================================================
 * MBTI 十六型人格测评（双版本）
 *
 * 来源：核心 32 题源自 Open Extended Jungian Type Scales 1.2
 *       Eric Jorgenson (2014), Open Psychometrics
 *       https://openpsychometrics.org/tests/OEJTS/
 *       深度版扩充题（id 33-96）为本站自编。
 *
 * 结构：
 *   - 速测版 quick：每维度精选 5 道 = 20 题（几分钟可测完，适合分享）
 *   - 深度版 deep ：原 32 题 + 自编 64 题 = 96 题（每维度 24 题，覆盖更全）
 * 基座只放共用信息（标题/文案/16 型类型表等），各版本自己的
 * questions / options / poleMode 放在 versions 内，由引擎合并为激活态。
 *
 * 题项：双极题（bipolar trait pairs），官方英文原文照录于 textEn 字段，
 *       中文为对照翻译；自编题中文为主，附自译 textEn。每题 5 档：
 *       1 = 完全偏左描述，5 = 完全偏右描述。
 *
 * 计分（与官方实现一致）：
 *   - 引擎用 -2..+2 的有符号权重累加，正值方向 = 高极（I/N/T/P）
 *   - 官方题面中高极有时在左、有时在右，故用 flip:true 标记"高极在左侧"的题目
 *   - 维度得分 = 该侧权重和，权重和大的一侧即主导极，平票取维度默认极
 *   - quick 每维 5 题 / deep 每维 24 题，百分比重按当版题数换算
 *
 * ============================================================ */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.type16 = {
  id: 'type16',
  recommends: ['bigfive','enneagram','epq'],
  icon: '🧭',
  color: '#4f46e5',
  hook: '你是哪种人格？速测 20 题 / 深度 96 题，测出你的十六型',
  intro: 'MBTI 从外向/内向、实感/直觉、思考/情感、计划/随性四个维度刻画你的性格偏好，组合成 16 种人格类型之一。速测 20 题适合快速上手与分享，深度 96 题更全面地描出你的类型画像。结果包含类型代码、专属中文昵称、人格画像、优势与提醒，以及可能适合的方向。',
  source: '核心题源自 Open Extended Jungian Type Scales 1.2（OEJTS）· Open Psychometrics · 深度版扩充题为自编',
  title: 'MBTI 十六型人格测评',
  short: 'MBTI 十六型',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 5,
  desc: '双极题速测 20 题 / 深度 96 题，测出你的十六型人格和专属中文代号。',
  instruction: '每题两端是两种相反的描述，凭第一直觉选更像你的那一端。没有好坏之分，越真实越准。',
  disclaimerExtra: '题目核心源自公开的 OEJTS 1.2（Open Psychometrics）中文改编版，深度版扩充题为本站自编。结果仅供自我探索与娱乐参考。',
  versions: {
    /* ---------------- 速测版 quick（20 题） ---------------- */
    quick: {
      label: '速测版',
      timeMinutes: 3,
      instruction: '每题两端是两种相反的描述，凭第一直觉选更像你的那一端。没有好坏之分，越真实越准。',
      options: [
        { text: '非常像左边', score: -2 },
        { text: '有点像左边', score: -1 },
        { text: '两边都像 / 说不清', score: 0 },
        { text: '有点像右边', score: 1 },
        { text: '非常像右边', score: 2 }
      ],
      questions: [
        /* ---------- JP 维度（1,9,13,21,29）：低极 J，高极 P ---------- */
        { id: 1,  dim: 'JP', flip: false, text: '爱列清单 ←——→ 靠脑子记',               textEn: 'makes lists ←——→ relies on memory' },
        { id: 9,  dim: 'JP', flip: true,  text: '随性凌乱 ←——→ 井井有条',               textEn: 'chaotic ←——→ organized' },
        { id: 13, dim: 'JP', flip: false, text: '提前很久做计划 ←——→ 临时才定',         textEn: 'plans far ahead ←——→ plans at the last minute' },
        { id: 21, dim: 'JP', flip: false, text: '活儿马上干完 ←——→ 有拖延症',           textEn: 'gets work done right away ←——→ procrastinates' },
        { id: 29, dim: 'JP', flip: false, text: '玩命工作 ←——→ 玩命玩乐',               textEn: 'works hard ←——→ plays hard' },

        /* ---------- TF 维度（6,14,22,26,30）：低极 F，高极 T ---------- */
        { id: 6,  dim: 'TF', flip: false, text: '觉得"像机器人"是骂人 ←——→ 追求机械般冷静的头脑', textEn: 'thinks "robotic" is an insult ←——→ strives to have a mechanical mind' },
        { id: 14, dim: 'TF', flip: true,  text: '想要别人的尊重 ←——→ 想要别人的爱',     textEn: "wants people's respect ←——→ wants their love" },
        { id: 22, dim: 'TF', flip: false, text: '跟着心走 ←——→ 跟着脑子走',             textEn: 'follows the heart ←——→ follows the head' },
        { id: 26, dim: 'TF', flip: true,  text: '道德基于公正 ←——→ 道德基于同情',       textEn: 'bases morality on justice ←——→ bases morality on compassion' },
        { id: 30, dim: 'TF', flip: true,  text: '面对情绪不自在 ←——→ 重视情绪价值',     textEn: 'uncomfortable with emotions ←——→ values emotions' },

        /* ---------- EI 维度（3,7,15,19,31）：低极 E，高极 I ---------- */
        { id: 3,  dim: 'EI', flip: false, text: '一个人待着会闷 ←——→ 需要独处时间',     textEn: 'bored by time alone ←——→ needs time alone' },
        { id: 7,  dim: 'EI', flip: false, text: '精力旺盛 ←——→ 温和慢热',               textEn: 'energetic ←——→ mellow' },
        { id: 15, dim: 'EI', flip: true,  text: '聚会让我耗电 ←——→ 聚会让我充电',       textEn: 'gets worn out by parties ←——→ gets fired up by parties' },
        { id: 19, dim: 'EI', flip: false, text: '说得多 ←——→ 听得多',                   textEn: 'talks more ←——→ listens more' },
        { id: 31, dim: 'EI', flip: false, text: '喜欢在人前表现 ←——→ 回避公开发言',     textEn: 'likes to perform in front of other people ←——→ avoids public speaking' },

        /* ---------- SN 维度（4,12,16,24,32）：低极 S，高极 N ---------- */
        { id: 4,  dim: 'SN', flip: false, text: '接受现状 ←——→ 对现状不满',             textEn: 'accepts things as they are ←——→ unsatisfied with the ways things are' },
        { id: 12, dim: 'SN', flip: false, text: '着眼当下 ←——→ 着眼未来',               textEn: 'focused on the present ←——→ focused on the future' },
        { id: 16, dim: 'SN', flip: false, text: '融入人群 ←——→ 与众不同',               textEn: 'fits in ←——→ stands out' },
        { id: 24, dim: 'SN', flip: true,  text: '要全局和方向 ←——→ 要细节和数据',       textEn: 'wants the big picture ←——→ wants the details' },
        { id: 32, dim: 'SN', flip: false, text: '想知道"谁/什么/什么时候" ←——→ 想知道"为什么"', textEn: 'likes to know "who?", "what?", "when?" ←——→ likes to know "why?"' }
      ],
      /* 极性计分：left = 低极（阈值以下），right = 高极（阈值以上） */
      poleMode: {
        thresholdNote: '每维 5 题，权重差定极',
        dimensions: [
          { key: 'EI', left: { code: 'E', label: '外向' }, right: { code: 'I', label: '内向' }, questions: [3, 7, 15, 19, 31], default: 'E' },
          { key: 'SN', left: { code: 'S', label: '实感' }, right: { code: 'N', label: '直觉' }, questions: [4, 12, 16, 24, 32], default: 'S' },
          { key: 'TF', left: { code: 'F', label: '情感' }, right: { code: 'T', label: '思考' }, questions: [6, 14, 22, 26, 30], default: 'F' },
          { key: 'JP', left: { code: 'J', label: '计划' }, right: { code: 'P', label: '随性' }, questions: [1, 9, 13, 21, 29], default: 'J' }
        ]
      }
    },
    /* ---------------- 深度版 deep（96 题） ---------------- */
    deep: {
      label: '深度版',
      timeMinutes: 10,
      instruction: '每题两端是两种相反的描述，凭第一直觉选更像你的那一端。96 题全面覆盖四个维度，结果更精确。',
      options: [
        { text: '非常像左边', score: -2 },
        { text: '有点像左边', score: -1 },
        { text: '两边都像 / 说不清', score: 0 },
        { text: '有点像右边', score: 1 },
        { text: '非常像右边', score: 2 }
      ],
      questions: [
        /* ---------- JP 维度（1,5,9,13,17,21,25,29）：低极 J，高极 P ---------- */
        { id: 1,  dim: 'JP', flip: false, text: '爱列清单 ←——→ 靠脑子记',               textEn: 'makes lists ←——→ relies on memory' },
        { id: 5,  dim: 'JP', flip: false, text: '房间保持整洁 ←——→ 东西随手放',         textEn: 'keeps a clean room ←——→ just puts stuff where ever' },
        { id: 9,  dim: 'JP', flip: true,  text: '随性凌乱 ←——→ 井井有条',               textEn: 'chaotic ←——→ organized' },
        { id: 13, dim: 'JP', flip: false, text: '提前很久做计划 ←——→ 临时才定',         textEn: 'plans far ahead ←——→ plans at the last minute' },
        { id: 17, dim: 'JP', flip: true,  text: '保留各种选项 ←——→ 尽早敲定',           textEn: 'keeps options open ←——→ commits' },
        { id: 21, dim: 'JP', flip: false, text: '活儿马上干完 ←——→ 有拖延症',           textEn: 'gets work done right away ←——→ procrastinates' },
        { id: 25, dim: 'JP', flip: true,  text: '现场即兴发挥 ←——→ 提前准备周全',       textEn: 'improvises ←——→ prepares' },
        { id: 29, dim: 'JP', flip: false, text: '玩命工作 ←——→ 玩命玩乐',               textEn: 'works hard ←——→ plays hard' },

        /* ---------- TF 维度（2,6,10,14,18,22,26,30）：低极 F，高极 T ---------- */
        { id: 2,  dim: 'TF', flip: true,  text: '多疑 ←——→ 宁愿相信',                   textEn: 'sceptical ←——→ wants to believe' },
        { id: 6,  dim: 'TF', flip: false, text: '觉得"像机器人"是骂人 ←——→ 追求机械般冷静的头脑', textEn: 'thinks "robotic" is an insult ←——→ strives to have a mechanical mind' },
        { id: 10, dim: 'TF', flip: false, text: '容易受伤 ←——→ 皮实抗打击',             textEn: 'easily hurt ←——→ thick-skinned' },
        { id: 14, dim: 'TF', flip: true,  text: '想要别人的尊重 ←——→ 想要别人的爱',     textEn: "wants people's respect ←——→ wants their love" },
        { id: 18, dim: 'TF', flip: true,  text: '想擅长修东西 ←——→ 想擅长"修人"',       textEn: 'wants to be good at fixing things ←——→ wants to be good at fixing people' },
        { id: 22, dim: 'TF', flip: false, text: '跟着心走 ←——→ 跟着脑子走',             textEn: 'follows the heart ←——→ follows the head' },
        { id: 26, dim: 'TF', flip: true,  text: '道德基于公正 ←——→ 道德基于同情',       textEn: 'bases morality on justice ←——→ bases morality on compassion' },
        { id: 30, dim: 'TF', flip: true,  text: '面对情绪不自在 ←——→ 重视情绪价值',     textEn: 'uncomfortable with emotions ←——→ values emotions' },

        /* ---------- EI 维度（3,7,11,15,19,23,27,31）：低极 E，高极 I ---------- */
        { id: 3,  dim: 'EI', flip: false, text: '一个人待着会闷 ←——→ 需要独处时间',     textEn: 'bored by time alone ←——→ needs time alone' },
        { id: 7,  dim: 'EI', flip: false, text: '精力旺盛 ←——→ 温和慢热',               textEn: 'energetic ←——→ mellow' },
        { id: 11, dim: 'EI', flip: false, text: '团队里干活最来劲 ←——→ 一个人干效率最高', textEn: 'works best in groups ←——→ works best alone' },
        { id: 15, dim: 'EI', flip: true,  text: '聚会让我耗电 ←——→ 聚会让我充电',       textEn: 'gets worn out by parties ←——→ gets fired up by parties' },
        { id: 19, dim: 'EI', flip: false, text: '说得多 ←——→ 听得多',                   textEn: 'talks more ←——→ listens more' },
        { id: 23, dim: 'EI', flip: true,  text: '宅在家 ←——→ 出门浪',                   textEn: 'stays at home ←——→ goes out on the town' },
        { id: 27, dim: 'EI', flip: true,  text: '很难大声喊出来 ←——→ 对远处的人喊话很自然', textEn: 'finds it difficult to yell very loudly ←——→ yelling to others when they are far away comes naturally' },
        { id: 31, dim: 'EI', flip: false, text: '喜欢在人前表现 ←——→ 回避公开发言',     textEn: 'likes to perform in front of other people ←——→ avoids public speaking' },

        /* ---------- SN 维度（4,8,12,16,20,24,28,32）：低极 S，高极 N ---------- */
        { id: 4,  dim: 'SN', flip: false, text: '接受现状 ←——→ 对现状不满',             textEn: 'accepts things as they are ←——→ unsatisfied with the ways things are' },
        { id: 8,  dim: 'SN', flip: false, text: '喜欢做选择题 ←——→ 喜欢写论述题',       textEn: 'prefer to take multiple choice test ←——→ prefer essay answers' },
        { id: 12, dim: 'SN', flip: false, text: '着眼当下 ←——→ 着眼未来',               textEn: 'focused on the present ←——→ focused on the future' },
        { id: 16, dim: 'SN', flip: false, text: '融入人群 ←——→ 与众不同',               textEn: 'fits in ←——→ stands out' },
        { id: 20, dim: 'SN', flip: false, text: '讲事情时说"发生了什么" ←——→ 说"这意味着什么"', textEn: 'when describing an event, will tell people what happened ←——→ will tell people what it meant' },
        { id: 24, dim: 'SN', flip: true,  text: '要全局和方向 ←——→ 要细节和数据',       textEn: 'wants the big picture ←——→ wants the details' },
        { id: 28, dim: 'SN', flip: true,  text: '偏理论抽象 ←——→ 偏实证经验',           textEn: 'theoretical ←——→ empirical' },
        { id: 32, dim: 'SN', flip: false, text: '想知道"谁/什么/什么时候" ←——→ 想知道"为什么"', textEn: 'likes to know "who?", "what?", "when?" ←——→ likes to know "why?"' },

        /* ---------- EI 扩充题（33-48，共 16 题）：低极 E，高极 I ---------- */
        { id: 33, dim: 'EI', flip: false, text: '主动破冰找话题 ←——→ 等对方先开口',     textEn: 'breaks the ice first ←——→ waits for the other to speak' },
        { id: 34, dim: 'EI', flip: true,  text: '一场聚会下来精疲力竭 ←——→ 一场聚会下来精神百倍', textEn: 'a party leaves you drained ←——→ a party leaves you energized' },
        { id: 35, dim: 'EI', flip: false, text: '心事先说出来才舒坦 ←——→ 心事先自己消化一阵', textEn: 'relieves by talking it out ←——→ processes it alone first' },
        { id: 36, dim: 'EI', flip: false, text: '大群里聊得最欢 ←——→ 一对一才聊得开',   textEn: 'most lively in group chats ←——→ opens up one-on-one' },
        { id: 37, dim: 'EI', flip: false, text: '上台越讲越来劲 ←——→ 上台盼着早点结束', textEn: 'gets fired up the longer you speak ←——→ counts down until it ends' },
        { id: 38, dim: 'EI', flip: true,  text: '社交一到量就想撤 ←——→ 社交档期越满越高兴', textEn: 'wants to leave once socially full ←——→ happier with a fuller social calendar' },
        { id: 39, dim: 'EI', flip: false, text: '假期想约满朋友 ←——→ 假期想留几天独处', textEn: 'wants holidays packed with friends ←——→ wants alone days on holiday' },
        { id: 40, dim: 'EI', flip: true,  text: '风头来了想躲开 ←——→ 享受当全场焦点',   textEn: 'shrinks from the spotlight ←——→ enjoys being the center of attention' },
        { id: 41, dim: 'EI', flip: false, text: '有事直接打电话 ←——→ 能打字绝不打电话', textEn: 'calls people directly ←——→ texts whenever possible' },
        { id: 42, dim: 'EI', flip: true,  text: '聚会中途就想告辞 ←——→ 聚会散了还想续摊', textEn: 'wants to leave mid-party ←——→ wants the night to go on' },
        { id: 43, dim: 'EI', flip: false, text: '朋友满天下 ←——→ 深交两三人足矣',       textEn: 'a friend in every crowd ←——→ a few close friends is enough' },
        { id: 44, dim: 'EI', flip: false, text: '喜怒哀乐一眼看穿 ←——→ 情绪藏得住不外露', textEn: 'emotions show at a glance ←——→ keeps feelings hidden' },
        { id: 45, dim: 'EI', flip: true,  text: '话出口前先过一遍 ←——→ 边想边说思路更清', textEn: 'mulls words over before speaking ←——→ thinks out loud and gets clearer' },
        { id: 46, dim: 'EI', flip: false, text: '有成绩爱晒出来 ←——→ 有成绩懒得声张',   textEn: 'shares achievements widely ←——→ keeps achievements quiet' },
        { id: 47, dim: 'EI', flip: true,  text: '累了一天靠独处回血 ←——→ 累了一天靠聊天回血', textEn: 'recharges alone ←——→ recharges by chatting' },
        { id: 48, dim: 'EI', flip: false, text: '见陌生人照样放得开 ←——→ 只在熟人堆里自在', textEn: 'at ease with strangers ←——→ only relaxed among close friends' },

        /* ---------- SN 扩充题（49-64，共 16 题）：低极 S，高极 N ---------- */
        { id: 49, dim: 'SN', flip: false, text: '听事先抓具体细节 ←——→ 听事先抓整体框架', textEn: 'listens for concrete details ←——→ listens for the big picture' },
        { id: 50, dim: 'SN', flip: true,  text: '脑子里常飘着想象 ←——→ 脑子里只有眼前的现实', textEn: 'mind often drifts to imagination ←——→ mind stays on immediate reality' },
        { id: 51, dim: 'SN', flip: false, text: '买东西只看实用 ←——→ 买东西图那股新鲜劲', textEn: 'buys for practicality ←——→ buys for novelty' },
        { id: 52, dim: 'SN', flip: false, text: '解难题按既定套路 ←——→ 解难题爱天马行空', textEn: 'solves problems by the book ←——→ solves problems out of the box' },
        { id: 53, dim: 'SN', flip: true,  text: '问题越开放越来劲 ←——→ 问题越明确越安心', textEn: 'gets excited by open questions ←——→ feels safe with clear questions' },
        { id: 54, dim: 'SN', flip: true,  text: '总想开辟新路 ←——→ 认准老办法',         textEn: 'always wants a new way ←——→ sticks to the proven way' },
        { id: 55, dim: 'SN', flip: false, text: '讲道理爱举具体例子 ←——→ 讲道理爱谈抽象概念', textEn: 'explains with concrete examples ←——→ talks in abstract concepts' },
        { id: 56, dim: 'SN', flip: false, text: '新东西直接上手试 ←——→ 新东西先心里推演一遍', textEn: 'tries new things hands-on ←——→ rehearses new things mentally first' },
        { id: 57, dim: 'SN', flip: false, text: '拿不准时信亲身经验 ←——→ 拿不准时信系统理论', textEn: 'trusts personal experience ←——→ trusts systematic theory' },
        { id: 58, dim: 'SN', flip: true,  text: '更着迷还没发生的事 ←——→ 只关心板上钉钉的事', textEn: 'fascinated by what could be ←——→ cares only about what is certain' },
        { id: 59, dim: 'SN', flip: false, text: '描述东西是什么就说什么 ←——→ 描述东西爱打比方', textEn: 'describes things literally ←——→ describes things in metaphors' },
        { id: 60, dim: 'SN', flip: false, text: '更享受把事做成 ←——→ 更享受把事想出来', textEn: 'enjoys getting things done ←——→ enjoys dreaming things up' },
        { id: 61, dim: 'SN', flip: false, text: '取舍时更看重眼前 ←——→ 取舍时更看重长远', textEn: 'weighs the immediate ←——→ weighs the long term' },
        { id: 62, dim: 'SN', flip: true,  text: '拿主意靠灵感闪现 ←——→ 拿主意靠数据说话', textEn: 'decides by inspiration ←——→ decides by the data' },
        { id: 63, dim: 'SN', flip: true,  text: '爱从零做出新的 ←——→ 爱把已有的做精',   textEn: 'loves creating from scratch ←——→ loves perfecting what exists' },
        { id: 64, dim: 'SN', flip: false, text: '做方案先抠局部细节 ←——→ 做方案先画整体蓝图', textEn: 'starts with local details ←——→ starts with the overall blueprint' },

        /* ---------- TF 扩充题（65-80，共 16 题）：低极 F，高极 T ---------- */
        { id: 65, dim: 'TF', flip: false, text: '争论时更靠感受 ←——→ 争论时更靠逻辑',   textEn: 'argues from feeling ←——→ argues from logic' },
        { id: 66, dim: 'TF', flip: false, text: '处理问题先考虑人 ←——→ 处理问题只看事情本身', textEn: 'handles problems through people ←——→ handles problems as matters of fact' },
        { id: 67, dim: 'TF', flip: false, text: '点评别人更看出发点 ←——→ 点评别人更看对错', textEn: 'judges others by intentions ←——→ judges others by right and wrong' },
        { id: 68, dim: 'TF', flip: true,  text: '说话开门见山 ←——→ 说话顾感受绕一绕',   textEn: 'gets straight to the point ←——→ softens the message' },
        { id: 69, dim: 'TF', flip: false, text: '更习惯先鼓励再指出 ←——→ 更习惯直接指出问题', textEn: 'encourages before critiquing ←——→ points out problems directly' },
        { id: 70, dim: 'TF', flip: false, text: '更在意大家处得舒服 ←——→ 更在意事情办得高效', textEn: 'cares that everyone is comfortable ←——→ cares that things run efficiently' },
        { id: 71, dim: 'TF', flip: false, text: '做事先看人情 ←——→ 做事先看原则',       textEn: 'weighs personal ties first ←——→ weighs principles first' },
        { id: 72, dim: 'TF', flip: false, text: '做选择更凭直觉顺眼 ←——→ 做选择更靠权衡利弊', textEn: 'chooses by gut feeling ←——→ chooses by weighing pros and cons' },
        { id: 73, dim: 'TF', flip: false, text: '争到最后怕伤和气 ←——→ 争到最后要争个输赢', textEn: 'backs off to keep the peace ←——→ argues to win' },
        { id: 74, dim: 'TF', flip: true,  text: '真相再难听也要讲 ←——→ 有些真相不如不说', textEn: 'tells the truth even when it hurts ←——→ some truths are better left unsaid' },
        { id: 75, dim: 'TF', flip: false, text: '打分时看具体情况 ←——→ 打分时统一标准', textEn: 'grades case by case ←——→ grades by one standard' },
        { id: 76, dim: 'TF', flip: false, text: '朋友吐槽时先共情 ←——→ 朋友吐槽时先拆解', textEn: 'comforts a venting friend ←——→ analyzes a venting friend' },
        { id: 77, dim: 'TF', flip: true,  text: '看破了就一定要说 ←——→ 看破不说破是常态', textEn: 'must voice what you notice ←——→ often leaves it unspoken' },
        { id: 78, dim: 'TF', flip: false, text: '觉得安抚情绪最有用 ←——→ 觉得解决问题最有用', textEn: 'believes comfort helps most ←——→ believes fixing the problem helps most' },
        { id: 79, dim: 'TF', flip: false, text: '论对错先看是谁 ←——→ 论对错不看是谁',   textEn: 'judges by whose side it is ←——→ judges regardless of who is involved' },
        { id: 80, dim: 'TF', flip: true,  text: '大事习惯自己拍板 ←——→ 大事习惯先找人商量', textEn: 'decides big calls alone ←——→ consults others on big calls' },

        /* ---------- JP 扩充题（81-96，共 16 题）：低极 J，高极 P ---------- */
        { id: 81, dim: 'JP', flip: false, text: '出门前把行程排满 ←——→ 出门前不想定行程', textEn: 'fills the day with a tight plan ←——→ takes the day as it comes' },
        { id: 82, dim: 'JP', flip: true,  text: '一个没做完就开新坑 ←——→ 做完一个再开一个', textEn: 'starts new things before finishing ←——→ finishes before starting new' },
        { id: 83, dim: 'JP', flip: false, text: '生活有固定节律 ←——→ 生活没有固定节律', textEn: 'lives by a set routine ←——→ lives without a fixed pattern' },
        { id: 84, dim: 'JP', flip: false, text: '有清单才推得动 ←——→ 靠一时兴起推进',   textEn: 'works from a checklist ←——→ works from sudden inspiration' },
        { id: 85, dim: 'JP', flip: true,  text: 'deadline 前踩线交卷 ←——→ deadline 前早早收尾', textEn: 'sprints right at the deadline ←——→ wraps up well before the deadline' },
        { id: 86, dim: 'JP', flip: true,  text: '生活越有变化越带劲 ←——→ 生活越稳定越安心', textEn: 'thrives on change ←——→ feels best with stability' },
        { id: 87, dim: 'JP', flip: false, text: '干活先立个流程 ←——→ 干活全凭当下感觉', textEn: 'sets a process first ←——→ goes by how it feels in the moment' },
        { id: 88, dim: 'JP', flip: false, text: '喜欢一鼓作气搞定 ←——→ 喜欢细水长流慢慢来', textEn: 'prefers to power through at once ←——→ prefers a steady slow pace' },
        { id: 89, dim: 'JP', flip: false, text: '买东西看中就定 ←——→ 买东西要货比三家', textEn: 'buys when it clicks ←——→ compares many options before buying' },
        { id: 90, dim: 'JP', flip: true,  text: '规矩总可以有例外 ←——→ 规矩就是规矩',   textEn: 'rules always have exceptions ←——→ rules are rules' },
        { id: 91, dim: 'JP', flip: false, text: '桌面分门别类 ←——→ 桌面乱中有序',       textEn: 'keeps the desk neatly categorized ←——→ keeps the desk in controlled chaos' },
        { id: 92, dim: 'JP', flip: false, text: '更在乎达成目标 ←——→ 更享受过程本身',   textEn: 'cares about hitting the goal ←——→ enjoys the process itself' },
        { id: 93, dim: 'JP', flip: false, text: '定了的计划照办 ←——→ 计划说变就变',     textEn: 'follows plans once made ←——→ lets plans change on a whim' },
        { id: 94, dim: 'JP', flip: false, text: '动手前先想清楚 ←——→ 先干起来再说',     textEn: 'thinks it through before acting ←——→ acts before thinking it through' },
        { id: 95, dim: 'JP', flip: false, text: '先排好优先级再干 ←——→ 哪个急先处理哪个', textEn: 'sets priorities before acting ←——→ handles whatever is urgent' },
        { id: 96, dim: 'JP', flip: true,  text: '每天换着花样来 ←——→ 老样子最安心',     textEn: 'varies things every day ←——→ most at ease with the usual' }
      ],
      /* 极性计分：left = 低极，right = 高极 */
      poleMode: {
        thresholdNote: '每维 24 题，权重差定极',
        dimensions: [
          { key: 'EI', left: { code: 'E', label: '外向' }, right: { code: 'I', label: '内向' }, questions: [3, 7, 11, 15, 19, 23, 27, 31, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48], default: 'E' },
          { key: 'SN', left: { code: 'S', label: '实感' }, right: { code: 'N', label: '直觉' }, questions: [4, 8, 12, 16, 20, 24, 28, 32, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64], default: 'S' },
          { key: 'TF', left: { code: 'F', label: '情感' }, right: { code: 'T', label: '思考' }, questions: [2, 6, 10, 14, 18, 22, 26, 30, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80], default: 'F' },
          { key: 'JP', left: { code: 'J', label: '计划' }, right: { code: 'P', label: '随性' }, questions: [1, 5, 9, 13, 17, 21, 25, 29, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96], default: 'J' }
        ]
      }
    }
  },
  types: {
    INTJ: {
      nick: '深谋军师',
      tagline: '脑子里永远有一张十年后的地图',
      desc: '你看不上眼前的热闹，只关心这步棋通向哪里。话不多，但开口基本是结论。独立、冷静、目标感强，是你最常被贴的标签。',
      strengths: ['战略眼光，能看到别人看不到的路径', '极度自律，认定的目标不达不休', '独立思考，不轻易被带节奏'],
      watchouts: ['想得太远，容易嫌弃眼前的"慢队友"', '把表达当浪费时间，容易被误读为冷漠'],
      fits: ['战略规划与系统设计类工作', '需要长期深耕的专业领域', '少而精的深度关系']
    },
    INTP: {
      nick: '好奇学家',
      tagline: '大脑是一台永不停机的搜索引擎',
      desc: '对世界的每个"为什么"都想拆开看看。逻辑是你的母语，社交是你的选修课，而且这门课你经常翘。',
      strengths: ['逻辑严密，一眼看穿漏洞', '知识面广，学习能力惊人', '思想自由，不迷信权威'],
      watchouts: ['兴趣来得快去得快，项目容易烂尾', '生活琐事能拖就拖，能自动化就想自动化'],
      fits: ['研究与分析类工作', '需要深度思考的技术岗', '允许"胡思乱想"的宽松环境']
    },
    ENTJ: {
      nick: '天生指挥官',
      tagline: '你一站出来，项目就像有了负责人',
      desc: '目标感刻在骨子里，效率是你的信仰。别人还在讨论，你已经排好了分工和 deadline。',
      strengths: ['强执行力，擅长把愿景落成计划', '天生的决断力与领导气质', '抗压能力强，越乱越兴奋'],
      watchouts: ['控制欲偏强，容易忽略他人感受', '对"慢"容忍度低，容易催人催己'],
      fits: ['管理与创业', '需要拍板的决策岗位', '目标明确的高强度团队']
    },
    ENTP: {
      nick: '嘴强王者',
      tagline: '没有你接不住的梗，也没有你杠不动的观点',
      desc: '你享受思维碰撞的火花，"抬杠"对你来说是智力的拥抱。新点子永远供应过剩。',
      strengths: ['反应极快，临场表达天花板', '脑洞大，擅长跨界连接', '不怕冲突，越辩越明'],
      watchouts: ['三分钟热度，启动容易坚持难', '嘴上赢了，气氛输了'],
      fits: ['需要创意与口才的岗位', '从零到一的新项目', '节奏快、变化多的环境']
    },
    INFJ: {
      nick: '人间清醒先知',
      tagline: '话不多，但一开口就见底',
      desc: '对人心的洞察接近直觉，总能在众人皆醉时保持清醒。温柔外表下，住着一个极其坚定的人。',
      strengths: ['洞察力强，能看穿人的真实需求', '理想主义且行动坚定', '共情能力与边界感并存'],
      watchouts: ['过度内耗，对他人情绪过于负责', '真实想法藏太深，容易被误读'],
      fits: ['心理、教育、内容创作', '一对一的深度陪伴场景', '小而美的团队']
    },
    INFP: {
      nick: '内心戏影后',
      tagline: '表面安静，内心每天上演一百集连续剧',
      desc: '你的内心世界比宇宙还大。价值观是你的底线，也是你的铠甲——平时软萌，碰到底线寸步不让。',
      strengths: ['想象力与创造力充沛', '对价值观极度忠诚', '温柔但有原则'],
      watchouts: ['完美主义 + 拖延症晚期', '情绪上头时容易全盘自我怀疑'],
      fits: ['文字、艺术、设计类创作', '有社会意义的事业', '自由度高的工作方式']
    },
    ENFJ: {
      nick: '氛围感团长',
      tagline: '有你在的地方，就不会冷场',
      desc: '你天生会照顾每个人的情绪，能把一群人拧成一股绳。别人依赖你，你也享受被需要。',
      strengths: ['天生的感染力与组织力', '真诚关注他人成长', '善于化解矛盾、凝聚人心'],
      watchouts: ['把别人的事排在前面，容易累垮', '太在意评价，不敢暴露脆弱'],
      fits: ['团队管理与培训', '需要协调多方的工作', '人与人连接的行当']
    },
    ENFP: {
      nick: '快乐小狗',
      tagline: '你的快乐会传染',
      desc: '好奇心是你的燃料，新鲜感是你的氧气。认识你的人都明显感觉世界变亮了。',
      strengths: ['热情洋溢，自带阳光', '创意与行动力兼备', '共情力强，朋友遍布五湖四海'],
      watchouts: ['注意力像烟花，哪里亮飞哪里', '讨厌重复，琐事管理是弱项'],
      fits: ['创意、运营、对外连接类工作', '多样性高的环境', '需要热场子的场合']
    },
    ISTJ: {
      nick: '人形打卡机',
      tagline: '说到做到，是你的出厂设置',
      desc: '你可能不够"有趣"，但整个世界靠你们这样的人才转得起来。靠谱，是对你最高的评价。',
      strengths: ['极度可靠，承诺必达', '细致严谨，几乎不出错', '耐心与毅力双满格'],
      watchouts: ['对变化适应偏慢', '容易固守流程，显得不够灵活'],
      fits: ['流程、财务、质检类岗位', '需要稳定输出的角色', '规则清晰的环境']
    },
    ISFJ: {
      nick: '暖心管家',
      tagline: '你记得所有人的口味、生日和忌口',
      desc: '你的爱不说出口，全在细节里。看似不起眼，却是身边人最离不开的那一个。',
      strengths: ['观察入微，照顾周到', '责任心强，默默把事做好', '忠诚可靠，感情持久'],
      watchouts: ['不好意思拒绝，容易积劳成疾', '付出不求回报，但心里会记账'],
      fits: ['后勤、护理、行政支持', '需要细心与耐心的岗位', '长期稳定的协作关系']
    },
    ESTJ: {
      nick: '行动派班长',
      tagline: '计划表、时间点、责任人，秩序井然',
      desc: '事情交给你，就是交给了"放心"两个字。你信奉规则、尊重常识，是团队里的定海神针。',
      strengths: ['组织执行能力强', '原则清晰，赏罚分明', '危机时刻最镇定'],
      watchouts: ['说一不二，弹性不足', '对"不守规矩"容忍度低'],
      fits: ['运营管理、项目推进', '需要立规矩的场景', '目标清晰的执行团队']
    },
    ESFJ: {
      nick: '贴心大管家',
      tagline: '哪里需要哪里搬，热情具体又实在',
      desc: '聚餐你订位、生日你张罗、冷场你救场。有你在，大家都省心。',
      strengths: ['亲和力强，人缘极好', '执行体贴两不误', '擅长维护群体氛围'],
      watchouts: ['太在意别人怎么看自己', '容易委屈自己成全场面'],
      fits: ['客户服务、活动组织', '需要与人打交道的岗位', '氛围驱动的团队']
    },
    ISTP: {
      nick: '冷面手艺人',
      tagline: '能动手就别吵吵',
      desc: '话少，手稳。拆解与修复是你的浪漫，危机时刻别人还在慌，你已经把问题修好了。',
      strengths: ['动手能力极强', '临危不乱，反应冷静', '独立解决问题的高手'],
      watchouts: ['情感表达极简，容易被误读冷淡', '规则与计划？能免则免'],
      fits: ['技术、工程、手艺类工作', '独立作业场景', '结果导向的协作']
    },
    ISFP: {
      nick: '氛围艺术家',
      tagline: '你把生活过成了别人想要的样子',
      desc: '你活在色彩、声音和触感里。不争不抢，但你随手拍的照片、随口放的歌，都在悄悄定义品味。',
      strengths: ['审美天赋出众', '温和包容，与世无争', '活在当下，感受力强'],
      watchouts: ['回避冲突，该说的不说', '长期规划？明天再说'],
      fits: ['设计、影像、生活方式类工作', '宽松自由的环境', '用作品说话的领域']
    },
    ESTP: {
      nick: '行走的肾上腺素',
      tagline: '人群里最先举手试的那个',
      desc: '刺激是你的养分，犹豫是对生命的浪费。别人还在评估风险，你已经上手玩了三把。',
      strengths: ['行动力爆表', '危机处理天赋', '极强的现实感知力'],
      watchouts: ['容易上头，事后收拾摊子', '耐性有限，讨厌冗长流程'],
      fits: ['销售、市场、一线业务', '高强度快节奏环境', '需要临场应变的岗位']
    },
    ESFP: {
      nick: '人群快乐源泉',
      tagline: '你不制造快乐，你就是快乐本身',
      desc: '有你在，气氛就不会死。舞台灯光和你，永远互相成就。',
      strengths: ['表现力与感染力强', '慷慨热情，宠朋友', '适应力强，走到哪亮到哪'],
      watchouts: ['讨厌独处与枯燥', '冲动消费与冲动决定'],
      fits: ['直播、表演、对外展示类工作', '人群密集的场景', '快乐驱动的团队']
    }
  }
};
