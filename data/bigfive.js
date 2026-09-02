/* ============================================================
 * 大五人格 · IPIP-NEO-60 → 双版本（速测版 / 深度版）
 *
 * 来源：International Personality Item Pool（IPIP-NEO-60）
 *       Maples-Keller et al. (2019, JPA 101:4-5)
 *       官方计分键：ipip.ori.org/IPIP-NEO-60ScoringKeys.htm
 * 权利状态：public domain（公有领域），可商用、可翻译、可自由改编
 *
 * 结构：
 *   - 速测版 quick：5 维度 × 4 题 = 20 题（从 IPIP-NEO-60 每维精选 4 题，
 *     每维至少 1 道反向题保证计分平衡）
 *   - 深度版 deep ：5 维度 × 24 题 = 120 题（IPIP-NEO-60 原 60 题 +
 *     新编 60 题；每维 6 个 facet × 4 题，30 个 facet 全覆盖）
 * 反向题（question.reverse = true）记分时取 6 - 原始分
 * 维度得分 = 该维度各题（反向处理后）之和 ÷ 题数 → 1-5 的均值
 * 官方信度（Eugene–Springfield 样本 N=757）：N α=.95、E α=.92、O α=.92、A α=.90、C α=.92
 *
 * 本地化：原版第 35 题（投票倾向）、第 36 题（单一宗教）涉及政治/宗教，
 *         按题库文档建议改写成中性表述，公有领域允许合法改编。
 * 深度版新增 60 题为原创编写（生活化自我陈述），与任何商业题库无关。
 *
 * 注：神经质（N）越高 = 情绪稳定性越低，报告中同步提示 情绪稳定性 ≈ 6 − N。
 * ============================================================ */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.bigfive = {
  id: 'bigfive',
  recommends: ['type16','enneagram','epq'],
  icon: '🌊',
  color: '#0ea5e9',
  hook: '心理学界最权威的五维人格测评',
  intro: '大五人格是心理学界公认的人格框架，从外倾性、宜人性、尽责性、神经质、开放性五个维度描述你。速测 20 题快速出结果，深度 120 题覆盖 30 个细分侧面，画像更立体。结果包含五维剖面图、每维档位解读，以及跨维度组合提示。',
  source: 'International Personality Item Pool（IPIP-NEO-120）· 公有领域',
  title: 'Big Five 大五人格测评',
  short: 'Big Five 大五',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 8,
  desc: '心理学界公认的人格框架，速测 20 题 / 深度 120 题测出你的五维剖面。',
  disclaimerExtra: '本题库改编自 International Personality Item Pool（IPIP），源自 Goldberg，公有领域；深度版 120 题由 IPIP-NEO-60 扩充。与任何商业人格测验无关。',
  versions: {
    /* ============ 速测版 quick（20 题） ============ */
    quick: {
      label: '速测版',
      timeMinutes: 3,
      instruction: '请根据这句话符合你的程度作答。凭第一直觉选，没有对错之分。',
      options: [
        { text: '非常不同意', score: 1 },
        { text: '不同意', score: 2 },
        { text: '一般 / 说不准', score: 3 },
        { text: '同意', score: 4 },
        { text: '非常同意', score: 5 }
      ],
      /* 维度模式：每维 4 题取均值（1-5），按区间给档位话术 */
      dimsMode: {
        scaleMax: 5,
        subscales: [
          {
            name: '外倾性', code: 'E', short: '外向', items: [13, 14, 15, 16],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你在独处中充电，用安静换深度。人多的场合对你不是能量来源，而是需要事后回血的支出。' },
              { min: 2.4, max: 3.6, level: '中等', description: '你能热闹也能独处，属于看场合切换的类型。需要社交时顶得上，需要独处时也享受。' },
              { min: 3.6, max: 5, level: '高', description: '你在人群里自动充电，越热闹越来劲。想法在对话里长出来，行动力也常被气氛推着走。' }
            ]
          },
          {
            name: '宜人性', code: 'A', short: '宜人', items: [37, 41, 42, 43],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你务实直接，理性多于客套，看重对错胜过和气。别人可能觉得你不好惹，但关键时刻你敢说真话。' },
              { min: 2.4, max: 3.6, level: '中等', description: '你在体谅和原则之间找平衡：该配合时配合，该坚持时也不含糊。' },
              { min: 3.6, max: 5, level: '高', description: '你包容、合作、让人相处舒服，是团队的黏合剂。代价是偶尔把别人的需求放在自己前面。' }
            ]
          },
          {
            name: '尽责性', code: 'C', short: '尽责', items: [49, 51, 54, 57],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你随性灵活，享受当下，不喜欢被计划绑住。好处是应变快，代价是容易临门一脚掉链子。' },
              { min: 2.4, max: 3.6, level: '中等', description: '你有基本的条理，重要的事会规划，不重要的事允许自己放松。' },
              { min: 3.6, max: 5, level: '高', description: '你靠谱、有条理、说到做到，是把事情推到底的人。注意别把标准高到让自己喘不过气。' }
            ]
          },
          {
            name: '神经质', code: 'N', short: '敏感', items: [1, 2, 5, 9],
            note: '神经质（N）越高 = 情绪稳定性越低。你的情绪稳定性 ≈ 6 − 本项得分。',
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你情绪稳定、抗压，天塌下来也少有波澜。别人慌的时候你能稳住场子。' },
              { min: 2.4, max: 3.6, level: '中等', description: '你有正常的情绪起伏，压力大了会难受，但通常能自己调整回来。' },
              { min: 3.6, max: 5, level: '高', description: '你感受细腻、容易紧张内耗，对反馈很敏感。这是高共情力的另一面，代价是更容易被情绪消耗。' }
            ]
          },
          {
            name: '开放性', code: 'O', short: '开放', items: [25, 26, 31, 32],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你务实稳健，偏好熟悉与确定性，拒绝浮夸。做事讲究可行，不喜欢为新鲜而新鲜。' },
              { min: 2.4, max: 3.6, level: '中等', description: '你对新事物保持好奇但会先观望，愿意尝试经过验证的新东西。' },
              { min: 3.6, max: 5, level: '高', description: '你好奇、爱尝鲜、想象力丰富，眼里全是可能性。适合需要创造力的事，注意别同时开太多坑。' }
            ]
          }
        ],
        /* 跨维度组合提示 */
        combos: [
          { when: [{ dim: 'E', level: '高' }, { dim: 'C', level: '高' }], label: '执行力型', text: '外向 + 尽责：你既敢张罗也收得住尾，是把想法推成结果的那一类人。' },
          { when: [{ dim: 'O', level: '高' }, { dim: 'E', level: '高' }], label: '创意社牛型', text: '开放 + 外向：点子多又爱分享，适合需要创意和对外连接的场合。' },
          { when: [{ dim: 'A', level: '高' }, { dim: 'N', level: '高' }], label: '高共情需设边界', text: '宜人 + 敏感：你很容易接住别人的情绪，记得给自己留一道边界，别把别人的情绪全背身上。' },
          { when: [{ dim: 'C', level: '高' }, { dim: 'O', level: '低' }], label: '稳健落地型', text: '尽责 + 务实：你不追风口，但凡答应的事都办得漂亮，是团队里最稳的那一环。' }
        ]
      },
      /* 速测版 20 题：从 IPIP-NEO-60 每维精选 4 题，保留原 id 与反向标记 */
      questions: [
        /* ---- N 神经质（1,2,5,9）---- */
        { id: 1,  dim: 'N', text: '我会为很多事情担忧。', textEn: 'Worry about things.' },
        { id: 2,  dim: 'N', text: '我容易感到压力大。', textEn: 'Get stressed out easily.' },
        { id: 5,  dim: 'N', text: '我经常感到情绪低落。', textEn: 'Often feel blue.' },
        { id: 9,  dim: 'N', reverse: true, text: '我很少放纵自己。', textEn: 'Rarely overindulge.' },

        /* ---- E 外倾性（13,14,15,16）---- */
        { id: 13, dim: 'E', text: '我容易交到朋友。', textEn: 'Make friends easily.' },
        { id: 14, dim: 'E', text: '和别人相处时我感到自在。', textEn: 'Act comfortably with others.' },
        { id: 15, dim: 'E', text: '我喜欢大型聚会。', textEn: 'Love large parties.' },
        { id: 16, dim: 'E', reverse: true, text: '我回避人群。', textEn: 'Avoid crowds.' },

        /* ---- O 开放性（25,26,31,32）---- */
        { id: 25, dim: 'O', text: '我有丰富的想象力。', textEn: 'Have a vivid imagination.' },
        { id: 26, dim: 'O', text: '我喜欢做白日梦。', textEn: 'Love to daydream.' },
        { id: 31, dim: 'O', reverse: true, text: '我更喜欢做自己熟悉的事。', textEn: 'Prefer to stick with things that I know.' },
        { id: 32, dim: 'O', reverse: true, text: '我不喜欢"改变"这个念头。', textEn: "Don't like the idea of change." },

        /* ---- A 宜人性（37,41,42,43）---- */
        { id: 37, dim: 'A', text: '我信任别人。', textEn: 'Trust others.' },
        { id: 41, dim: 'A', text: '我喜欢帮助别人。', textEn: 'Love to help others.' },
        { id: 42, dim: 'A', text: '我关心别人。', textEn: 'Am concerned about others.' },
        { id: 43, dim: 'A', reverse: true, text: '我会侮辱或挖苦别人。', textEn: 'Insult people.' },

        /* ---- C 尽责性（49,51,54,57）---- */
        { id: 49, dim: 'C', text: '我做事很顺畅。', textEn: 'Handle tasks smoothly.' },
        { id: 51, dim: 'C', text: '我喜欢有条理。', textEn: 'Like order.' },
        { id: 54, dim: 'C', reverse: true, text: '我会食言。', textEn: 'Break my promises.' },
        { id: 57, dim: 'C', text: '我会落实自己的计划。', textEn: 'Carry out my plans.' }
      ]
    },

    /* ============ 深度版 deep（120 题） ============ */
    deep: {
      label: '深度版',
      timeMinutes: 15,
      instruction: '请根据这句话符合你的程度作答。120 题从 30 个细分特质全面刻画你的五维人格。凭第一直觉选，没有对错之分。',
      options: [
        { text: '非常不同意', score: 1 },
        { text: '不同意', score: 2 },
        { text: '一般 / 说不准', score: 3 },
        { text: '同意', score: 4 },
        { text: '非常同意', score: 5 }
      ],
      /* 维度模式：每维 24 题取均值（1-5），按区间给档位话术 */
      dimsMode: {
        scaleMax: 5,
        subscales: [
          {
            name: '外倾性', code: 'E', short: '外向', items: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你在独处中充电，用安静换深度。人多的场合对你不是能量来源，而是需要事后回血的支出。' },
              { min: 2.4, max: 3.6, level: '中等', description: '你能热闹也能独处，属于看场合切换的类型。需要社交时顶得上，需要独处时也享受。' },
              { min: 3.6, max: 5, level: '高', description: '你在人群里自动充电，越热闹越来劲。想法在对话里长出来，行动力也常被气氛推着走。' }
            ]
          },
          {
            name: '宜人性', code: 'A', short: '宜人', items: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你务实直接，理性多于客套，看重对错胜过和气。别人可能觉得你不好惹，但关键时刻你敢说真话。' },
              { min: 2.4, max: 3.6, level: '中等', description: '你在体谅和原则之间找平衡：该配合时配合，该坚持时也不含糊。' },
              { min: 3.6, max: 5, level: '高', description: '你包容、合作、让人相处舒服，是团队的黏合剂。代价是偶尔把别人的需求放在自己前面。' }
            ]
          },
          {
            name: '尽责性', code: 'C', short: '尽责', items: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你随性灵活，享受当下，不喜欢被计划绑住。好处是应变快，代价是容易临门一脚掉链子。' },
              { min: 2.4, max: 3.6, level: '中等', description: '你有基本的条理，重要的事会规划，不重要的事允许自己放松。' },
              { min: 3.6, max: 5, level: '高', description: '你靠谱、有条理、说到做到，是把事情推到底的人。注意别把标准高到让自己喘不过气。' }
            ]
          },
          {
            name: '神经质', code: 'N', short: '敏感', items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72],
            note: '神经质（N）越高 = 情绪稳定性越低。你的情绪稳定性 ≈ 6 − 本项得分。',
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你情绪稳定、抗压，天塌下来也少有波澜。别人慌的时候你能稳住场子。' },
              { min: 2.4, max: 3.6, level: '中等', description: '你有正常的情绪起伏，压力大了会难受，但通常能自己调整回来。' },
              { min: 3.6, max: 5, level: '高', description: '你感受细腻、容易紧张内耗，对反馈很敏感。这是高共情力的另一面，代价是更容易被情绪消耗。' }
            ]
          },
          {
            name: '开放性', code: 'O', short: '开放', items: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你务实稳健，偏好熟悉与确定性，拒绝浮夸。做事讲究可行，不喜欢为新鲜而新鲜。' },
              { min: 2.4, max: 3.6, level: '中等', description: '你对新事物保持好奇但会先观望，愿意尝试经过验证的新东西。' },
              { min: 3.6, max: 5, level: '高', description: '你好奇、爱尝鲜、想象力丰富，眼里全是可能性。适合需要创造力的事，注意别同时开太多坑。' }
            ]
          }
        ],
        /* 跨维度组合提示 */
        combos: [
          { when: [{ dim: 'E', level: '高' }, { dim: 'C', level: '高' }], label: '执行力型', text: '外向 + 尽责：你既敢张罗也收得住尾，是把想法推成结果的那一类人。' },
          { when: [{ dim: 'O', level: '高' }, { dim: 'E', level: '高' }], label: '创意社牛型', text: '开放 + 外向：点子多又爱分享，适合需要创意和对外连接的场合。' },
          { when: [{ dim: 'A', level: '高' }, { dim: 'N', level: '高' }], label: '高共情需设边界', text: '宜人 + 敏感：你很容易接住别人的情绪，记得给自己留一道边界，别把别人的情绪全背身上。' },
          { when: [{ dim: 'C', level: '高' }, { dim: 'O', level: '低' }], label: '稳健落地型', text: '尽责 + 务实：你不追风口，但凡答应的事都办得漂亮，是团队里最稳的那一环。' }
        ]
      },
      /* 深度版 120 题 = 原 IPIP-NEO-60（1-60）+ 新编 60 题（61-120） */
      questions: [
        /* ========== 原 IPIP-NEO-60（1-60） ========== */
        /* ---- N 神经质（1-12）---- */
        { id: 1,  dim: 'N', text: '我会为很多事情担忧。', textEn: 'Worry about things.' },
        { id: 2,  dim: 'N', text: '我容易感到压力大。', textEn: 'Get stressed out easily.' },
        { id: 3,  dim: 'N', text: '我容易生气。', textEn: 'Get angry easily.' },
        { id: 4,  dim: 'N', text: '我会乱发脾气。', textEn: 'Lose my temper.' },
        { id: 5,  dim: 'N', text: '我经常感到情绪低落。', textEn: 'Often feel blue.' },
        { id: 6,  dim: 'N', text: '我不喜欢自己。', textEn: 'Dislike myself.' },
        { id: 7,  dim: 'N', text: '我觉得很难主动接近别人。', textEn: 'Find it difficult to approach others.' },
        { id: 8,  dim: 'N', text: '我容易感到胆怯。', textEn: 'Am easily intimidated.' },
        { id: 9,  dim: 'N', reverse: true, text: '我很少放纵自己。', textEn: 'Rarely overindulge.' },
        { id: 10, dim: 'N', reverse: true, text: '我能控制自己的冲动欲望。', textEn: 'Am able to control my cravings.' },
        { id: 11, dim: 'N', reverse: true, text: '在压力下我能保持冷静。', textEn: 'Remain calm under pressure.' },
        { id: 12, dim: 'N', reverse: true, text: '即使局面紧张，我也能保持平静。', textEn: 'Am calm even in tense situations.' },

        /* ---- E 外倾性（13-24）---- */
        { id: 13, dim: 'E', text: '我容易交到朋友。', textEn: 'Make friends easily.' },
        { id: 14, dim: 'E', text: '和别人相处时我感到自在。', textEn: 'Act comfortably with others.' },
        { id: 15, dim: 'E', text: '我喜欢大型聚会。', textEn: 'Love large parties.' },
        { id: 16, dim: 'E', reverse: true, text: '我回避人群。', textEn: 'Avoid crowds.' },
        { id: 17, dim: 'E', text: '我习惯主导局面。', textEn: 'Take charge.' },
        { id: 18, dim: 'E', text: '我会试图带领别人。', textEn: 'Try to lead others.' },
        { id: 19, dim: 'E', text: '我总是很忙。', textEn: 'Am always busy.' },
        { id: 20, dim: 'E', text: '我总是不停地忙来忙去。', textEn: 'Am always on the go.' },
        { id: 21, dim: 'E', text: '我喜欢刺激。', textEn: 'Love excitement.' },
        { id: 22, dim: 'E', text: '我追求冒险。', textEn: 'Seek adventure.' },
        { id: 23, dim: 'E', text: '我经常玩得很开心。', textEn: 'Have a lot of fun.' },
        { id: 24, dim: 'E', text: '我热爱生活。', textEn: 'Love life.' },

        /* ---- O 开放性（25-36，第 35/36 题为本地化改写）---- */
        { id: 25, dim: 'O', text: '我有丰富的想象力。', textEn: 'Have a vivid imagination.' },
        { id: 26, dim: 'O', text: '我喜欢做白日梦。', textEn: 'Love to daydream.' },
        { id: 27, dim: 'O', text: '我相信艺术很重要。', textEn: 'Believe in the importance of art.' },
        { id: 28, dim: 'O', reverse: true, text: '我不喜欢艺术。', textEn: 'Do not like art.' },
        { id: 29, dim: 'O', text: '我有很强烈的情绪体验。', textEn: 'Experience my emotions intensely.' },
        { id: 30, dim: 'O', reverse: true, text: '我的情绪不容易被影响。', textEn: 'Am not easily affected by my emotions.' },
        { id: 31, dim: 'O', reverse: true, text: '我更喜欢做自己熟悉的事。', textEn: 'Prefer to stick with things that I know.' },
        { id: 32, dim: 'O', reverse: true, text: '我不喜欢"改变"这个念头。', textEn: "Don't like the idea of change." },
        { id: 33, dim: 'O', reverse: true, text: '我回避哲学性的讨论。', textEn: 'Avoid philosophical discussions.' },
        { id: 34, dim: 'O', reverse: true, text: '我对理论性讨论不感兴趣。', textEn: 'Am not interested in theoretical discussions.' },
        { id: 35, dim: 'O', localized: true, text: '我乐于尝试新观点、新观念。', textEn: '(localized) Open to new ideas.' },
        { id: 36, dim: 'O', reverse: true, localized: true, text: '我坚持固有看法，不太愿意改变。', textEn: '(localized) Stick to my views.' },

        /* ---- A 宜人性（37-48）---- */
        { id: 37, dim: 'A', text: '我信任别人。', textEn: 'Trust others.' },
        { id: 38, dim: 'A', text: '我相信别人心怀善意。', textEn: 'Believe that others have good intentions.' },
        { id: 39, dim: 'A', reverse: true, text: '我会为了出人头地而走捷径。', textEn: 'Cheat to get ahead.' },
        { id: 40, dim: 'A', reverse: true, text: '我会利用别人。', textEn: 'Take advantage of others.' },
        { id: 41, dim: 'A', text: '我喜欢帮助别人。', textEn: 'Love to help others.' },
        { id: 42, dim: 'A', text: '我关心别人。', textEn: 'Am concerned about others.' },
        { id: 43, dim: 'A', reverse: true, text: '我会侮辱或挖苦别人。', textEn: 'Insult people.' },
        { id: 44, dim: 'A', reverse: true, text: '我会对冒犯我的人报复。', textEn: 'Get back at others.' },
        { id: 45, dim: 'A', reverse: true, text: '我相信自己比别人优秀。', textEn: 'Believe that I am better than others.' },
        { id: 46, dim: 'A', reverse: true, text: '我对自己评价很高。', textEn: 'Think highly of myself.' },
        { id: 47, dim: 'A', text: '我同情无家可归的人。', textEn: 'Sympathize with the homeless.' },
        { id: 48, dim: 'A', text: '我会同情处境不如我的人。', textEn: 'Feel sympathy for those who are worse off than myself.' },

        /* ---- C 尽责性（49-60）---- */
        { id: 49, dim: 'C', text: '我做事很顺畅。', textEn: 'Handle tasks smoothly.' },
        { id: 50, dim: 'C', text: '我知道怎么把事情办成。', textEn: 'Know how to get things done.' },
        { id: 51, dim: 'C', text: '我喜欢有条理。', textEn: 'Like order.' },
        { id: 52, dim: 'C', reverse: true, text: '我房间里总是乱糟糟的。', textEn: 'Leave a mess in my room.' },
        { id: 53, dim: 'C', text: '我说真话。', textEn: 'Tell the truth.' },
        { id: 54, dim: 'C', reverse: true, text: '我会食言。', textEn: 'Break my promises.' },
        { id: 55, dim: 'C', text: '我很努力工作。', textEn: 'Work hard.' },
        { id: 56, dim: 'C', text: '我对自己和他人的要求都很高。', textEn: 'Set high standards for myself and others.' },
        { id: 57, dim: 'C', text: '我会落实自己的计划。', textEn: 'Carry out my plans.' },
        { id: 58, dim: 'C', reverse: true, text: '我很难开始着手做事情。', textEn: 'Have difficulty starting tasks.' },
        { id: 59, dim: 'C', reverse: true, text: '我会做草率的决定。', textEn: 'Make rash decisions.' },
        { id: 60, dim: 'C', reverse: true, text: '我会不假思索就行动。', textEn: 'Act without thinking.' },

        /* ========== 新编 60 题（61-120，每维 6 个 facet 各补 2 题） ========== */
        /* ---- N 神经质·新题（61-72）---- */
        /* 焦虑担忧 */
        { id: 61, dim: 'N', text: '我经常为一些小麻烦反复琢磨、睡不好觉。', textEn: 'Dwell on small troubles and lose sleep.' },
        { id: 62, dim: 'N', reverse: true, text: '面对不确定的事，我一般能保持安心。', textEn: 'Usually stay at ease with uncertainty.' },
        /* 易怒 */
        { id: 63, dim: 'N', text: '别人一点不顺我的意，我就容易上火。', textEn: 'Get annoyed when things do not go my way.' },
        { id: 64, dim: 'N', text: '我有时候会因为小事气得不轻。', textEn: 'Get quite upset over small things.' },
        /* 抑郁低落 */
        { id: 65, dim: 'N', text: '我有时会觉得一切都提不起劲。', textEn: 'Sometimes feel that nothing is exciting.' },
        { id: 66, dim: 'N', reverse: true, text: '大多数时候我的心情都挺平稳。', textEn: 'My mood stays fairly steady most of the time.' },
        /* 自我怀疑 / 害羞 */
        { id: 67, dim: 'N', text: '在陌生人面前，我容易局促不安。', textEn: 'Feel uneasy in front of strangers.' },
        { id: 68, dim: 'N', text: '当众出丑之后，我会难受好一阵。', textEn: 'Feel bad for a while after embarrassing myself in public.' },
        /* 冲动放纵 */
        { id: 69, dim: 'N', text: '看到想要的东西，我常常忍不住马上买。', textEn: 'Often cannot resist buying things I want right away.' },
        { id: 70, dim: 'N', reverse: true, text: '我能管住自己，不为一时痛快破戒。', textEn: 'Can control myself and not give in to impulses.' },
        /* 脆弱易伤 */
        { id: 71, dim: 'N', text: '压力一大，我就容易乱了阵脚。', textEn: 'Lose my composure under heavy stress.' },
        { id: 72, dim: 'N', reverse: true, text: '遇到突发状况，我也能稳住自己。', textEn: 'Can stay steady in unexpected situations.' },

        /* ---- E 外倾性·新题（73-84）---- */
        /* 友善合群 */
        { id: 73, dim: 'E', text: '我很容易和陌生人热络起来。', textEn: 'Warm up to strangers easily.' },
        { id: 74, dim: 'E', reverse: true, text: '我不太主动找人聊天。', textEn: 'Do not often start conversations.' },
        /* 健谈开朗 */
        { id: 75, dim: 'E', text: '在人群里我常常是话最多的那一个。', textEn: 'Am often the one who talks the most in a group.' },
        { id: 76, dim: 'E', text: '我讲起有趣的事来总是滔滔不绝。', textEn: 'Chatter on endlessly about fun things.' },
        /* 支配主导 */
        { id: 77, dim: 'E', text: '团队讨论时，我习惯主动拿主意。', textEn: 'Tend to take the lead in team discussions.' },
        { id: 78, dim: 'E', text: '遇到分歧，我通常愿意坚持自己的意见。', textEn: 'Usually stick to my own opinion in disagreements.' },
        /* 活力充沛 */
        { id: 79, dim: 'E', text: '我几乎每天都精力充沛。', textEn: 'Am full of energy almost every day.' },
        { id: 80, dim: 'E', reverse: true, text: '我常常觉得做什么都提不起精神。', textEn: 'Often feel too drained to do anything.' },
        /* 刺激寻求 */
        { id: 81, dim: 'E', text: '我喜欢尝试刺激的新玩法。', textEn: 'Enjoy trying exciting new activities.' },
        { id: 82, dim: 'E', text: '一成不变的生活会让我闷得慌。', textEn: 'Get bored with a routine life.' },
        /* 乐观欢乐 */
        { id: 83, dim: 'E', text: '我总能找到让自己开心的事。', textEn: 'Always find something to enjoy.' },
        { id: 84, dim: 'E', reverse: true, text: '我经常觉得日子平淡没意思。', textEn: 'Often find my days dull and boring.' },

        /* ---- O 开放性·新题（85-96）---- */
        /* 想象力 */
        { id: 85, dim: 'O', text: '我脑子里经常冒出别人想不到的点子。', textEn: 'Often come up with ideas others would not think of.' },
        { id: 86, dim: 'O', text: '我常常沉浸在自己的想象世界里。', textEn: 'Often get lost in my own imagination.' },
        /* 艺术兴趣 */
        { id: 87, dim: 'O', text: '逛美术馆、听音乐会能让我很满足。', textEn: 'Feel fulfilled visiting galleries or concerts.' },
        { id: 88, dim: 'O', reverse: true, text: '我对艺术类的活动基本提不起兴趣。', textEn: 'Am hardly interested in artistic activities.' },
        /* 情绪感受 */
        { id: 89, dim: 'O', text: '好的电影或音乐常常让我久久回味。', textEn: 'Good films or music stay with me for a long time.' },
        { id: 90, dim: 'O', text: '我容易被作品里的情绪感染。', textEn: 'Am easily moved by emotions in art.' },
        /* 冒险尝鲜 */
        { id: 91, dim: 'O', text: '我乐意尝试没去过的地方和没吃过的东西。', textEn: 'Enjoy trying new places and new foods.' },
        { id: 92, dim: 'O', reverse: true, text: '我更喜欢按熟悉的老路线来。', textEn: 'Prefer sticking to familiar routines.' },
        /* 智性思辨 */
        { id: 93, dim: 'O', text: '我喜欢琢磨抽象的道理和概念。', textEn: 'Enjoy thinking about abstract ideas and concepts.' },
        { id: 94, dim: 'O', text: '遇到没想明白的问题，我会忍不住一直想。', textEn: 'Cannot help thinking about puzzles until I figure them out.' },
        /* 开放包容 */
        { id: 95, dim: 'O', text: '我乐于了解与自己不同的观点。', textEn: 'Enjoy learning views different from my own.' },
        { id: 96, dim: 'O', reverse: true, text: '我更喜欢跟想法一致的人待在一起。', textEn: 'Prefer being with people who think like me.' },

        /* ---- A 宜人性·新题（97-108）---- */
        /* 信任 */
        { id: 97, dim: 'A', text: '我很容易相信别人是善意的。', textEn: 'Easily believe that people mean well.' },
        { id: 98, dim: 'A', reverse: true, text: '我习惯先假设别人别有用心。', textEn: 'Tend to assume others have hidden motives.' },
        /* 正直诚实 */
        { id: 99, dim: 'A', text: '即使没人看见，我也会按规矩办事。', textEn: 'Follow the rules even when nobody is watching.' },
        { id: 100, dim: 'A', reverse: true, text: '为了省事，我偶尔会走点捷径。', textEn: 'Occasionally take shortcuts to save trouble.' },
        /* 利他助人 */
        { id: 101, dim: 'A', text: '看到别人需要帮忙，我会主动搭把手。', textEn: 'Offer help when I see someone needs it.' },
        { id: 102, dim: 'A', text: '能帮上别人，我会觉得很值得。', textEn: 'Feel it is worthwhile to help others.' },
        /* 合作顺从 */
        { id: 103, dim: 'A', text: '为了团队和气，我愿意让步。', textEn: 'Am willing to give in for the sake of the group.' },
        { id: 104, dim: 'A', reverse: true, text: '意见不合时，我宁可争到底也不服软。', textEn: 'Would rather argue to the end than back down.' },
        /* 谦逊 */
        { id: 105, dim: 'A', text: '我很少主动炫耀自己的成绩。', textEn: 'Rarely show off my achievements.' },
        { id: 106, dim: 'A', reverse: true, text: '我觉得自己比大多数人更优秀。', textEn: 'Believe I am better than most people.' },
        /* 共情同情 */
        { id: 107, dim: 'A', text: '看到别人难过，我心里也会不好受。', textEn: 'Feel bad when I see others upset.' },
        { id: 108, dim: 'A', text: '身边人开心，我也跟着开心。', textEn: 'Feel happy when people around me are happy.' },

        /* ---- C 尽责性·新题（109-120）---- */
        /* 自我效能 */
        { id: 109, dim: 'C', text: '遇到没做过的任务，我也有信心搞定。', textEn: 'Feel confident handling tasks I have never done.' },
        { id: 110, dim: 'C', text: '大多数事情我都能找到办法办成。', textEn: 'Can usually find a way to get things done.' },
        /* 条理有序 */
        { id: 111, dim: 'C', text: '我的东西都放在固定的位置。', textEn: 'Keep my things in fixed places.' },
        { id: 112, dim: 'C', reverse: true, text: '我的桌面经常乱成一团。', textEn: 'My desk is often a mess.' },
        /* 尽责守约 */
        { id: 113, dim: 'C', text: '答应别人的事，再麻烦我也会做到。', textEn: 'Do what I promise, no matter how troublesome.' },
        { id: 114, dim: 'C', text: '我会按承诺把事情办妥。', textEn: 'Follow through on my commitments.' },
        /* 成就驱动 */
        { id: 115, dim: 'C', text: '我总想把事情做得比别人更好。', textEn: 'Always want to do things better than others.' },
        { id: 116, dim: 'C', text: '我给自己定的标准通常不低。', textEn: 'Set high standards for myself.' },
        /* 自律 */
        { id: 117, dim: 'C', text: '我能按计划坚持完成长期目标。', textEn: 'Can stick to a plan to finish long-term goals.' },
        { id: 118, dim: 'C', reverse: true, text: '我经常开了头就坚持不下去。', textEn: 'Often start things but fail to keep going.' },
        /* 谨慎深思 */
        { id: 119, dim: 'C', text: '做决定前，我会先把利弊想清楚。', textEn: 'Think through pros and cons before deciding.' },
        { id: 120, dim: 'C', reverse: true, text: '我想到什么就会立刻去做。', textEn: 'Act right away on whatever comes to mind.' }
      ]
    }
  }
};
