/* ============================================================
 * 大五人格 · IPIP-NEO-60
 *
 * 来源：International Personality Item Pool（IPIP-NEO-60）
 *       Maples-Keller et al. (2019, JPA 101:4-5)
 *       官方计分键：ipip.ori.org/IPIP-NEO-60ScoringKeys.htm
 * 权利状态：public domain（公有领域），可商用、可翻译、可自由改编
 *
 * 结构：5 维度 × 12 题 = 60 题，李克特 5 点（1-5）
 *       反向题（question.reverse = true）记分时取 6 - 原始分
 *       维度得分 = 该维度 12 题（反向处理后）之和 ÷ 12 → 1-5 的均值
 * 官方信度（Eugene–Springfield 样本 N=757）：N α=.95、E α=.92、O α=.92、A α=.90、C α=.92
 *
 * 本地化：原版第 35 题（投票倾向）、第 36 题（单一宗教）涉及政治/宗教，
 *         按题库文档建议改写成中性表述，公有领域允许合法改编。
 *
 * 注：神经质（N）越高 = 情绪稳定性越低，报告中同步提示 情绪稳定性 ≈ 6 − N。
 * ============================================================ */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.bigfive = {
  id: 'bigfive',
  icon: '🌊',
  intro: '心理学界公认的人格框架，从五个维度描述你：外倾性、宜人性、尽责性、神经质、开放性。结果包含五维剖面图、每维度的档位解读，以及跨维度组合提示。',
  source: 'International Personality Item Pool（IPIP-NEO-60）· 公有领域',
  title: '大五人格测试',
  short: '大五人格',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 8,
  desc: '心理学界公认的人格框架，60 题测出你的五维剖面。',
  instruction: '请根据这句话符合你的程度作答。凭第一直觉选，没有对错之分。',
  options: [
    { text: '非常不同意', score: 1 },
    { text: '不同意', score: 2 },
    { text: '一般 / 说不准', score: 3 },
    { text: '同意', score: 4 },
    { text: '非常同意', score: 5 }
  ],
  questions: [
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
    { id: 60, dim: 'C', reverse: true, text: '我会不假思索就行动。', textEn: 'Act without thinking.' }
  ],

  /* 维度模式：每维 12 题取均值（1-5），按区间给档位话术 */
  dimsMode: {
    scaleMax: 5,
    subscales: [
      {
        name: '外倾性', code: 'E', short: '外向', items: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        interpretation: [
          { min: 1, max: 2.4, level: '低', description: '你在独处中充电，用安静换深度。人多的场合对你不是能量来源，而是需要事后回血的支出。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你能热闹也能独处，属于看场合切换的类型。需要社交时顶得上，需要独处时也享受。' },
          { min: 3.6, max: 5, level: '高', description: '你在人群里自动充电，越热闹越来劲。想法在对话里长出来，行动力也常被气氛推着走。' }
        ]
      },
      {
        name: '宜人性', code: 'A', short: '宜人', items: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
        interpretation: [
          { min: 1, max: 2.4, level: '低', description: '你务实直接，理性多于客套，看重对错胜过和气。别人可能觉得你不好惹，但关键时刻你敢说真话。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你在体谅和原则之间找平衡：该配合时配合，该坚持时也不含糊。' },
          { min: 3.6, max: 5, level: '高', description: '你包容、合作、让人相处舒服，是团队的黏合剂。代价是偶尔把别人的需求放在自己前面。' }
        ]
      },
      {
        name: '尽责性', code: 'C', short: '尽责', items: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
        interpretation: [
          { min: 1, max: 2.4, level: '低', description: '你随性灵活，享受当下，不喜欢被计划绑住。好处是应变快，代价是容易临门一脚掉链子。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你有基本的条理，重要的事会规划，不重要的事允许自己放松。' },
          { min: 3.6, max: 5, level: '高', description: '你靠谱、有条理、说到做到，是把事情推到底的人。注意别把标准高到让自己喘不过气。' }
        ]
      },
      {
        name: '神经质', code: 'N', short: '敏感', items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        note: '神经质（N）越高 = 情绪稳定性越低。你的情绪稳定性 ≈ 6 − 本项得分。',
        interpretation: [
          { min: 1, max: 2.4, level: '低', description: '你情绪稳定、抗压，天塌下来也少有波澜。别人慌的时候你能稳住场子。' },
          { min: 2.4, max: 3.6, level: '中等', description: '你有正常的情绪起伏，压力大了会难受，但通常能自己调整回来。' },
          { min: 3.6, max: 5, level: '高', description: '你感受细腻、容易紧张内耗，对反馈很敏感。这是高共情力的另一面，代价是更容易被情绪消耗。' }
        ]
      },
      {
        name: '开放性', code: 'O', short: '开放', items: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
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
  disclaimerExtra: '本题库改编自 International Personality Item Pool（IPIP），源自 Goldberg，公有领域；第 35、36 题已按本地语境改写。与任何商业人格测验无关。'
};
