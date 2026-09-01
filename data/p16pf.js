/* ============================================================
 * 16PF 人格测评
 * 来源：题库《卡特尔16PF性格测试-187题》改编为 5 点自评
 * 计分：16 个因子分别取均值（1-5），按区间给低/中/高档位话术
 *
 * 结构：
 *   - 速测版 quick：16 因子 × 2 题 = 32 题（每因子 1 正向 + 1 反向）
 *   - 深度版 deep ：16 因子 × 4 题 = 64 题（每因子 2 正向 + 2 反向）
 * 题序按"轮次"交错排列（与原始 16PF 的因子轮换思路一致），
 * 同一因子的题目分散在全卷，避免连续重复影响作答。
 * 反向题（reverse: true）记分时取 6 - 原始分，保证因子分方向统一：
 * 因子均值越高，越偏向该因子"高"档描述。
 * ============================================================ */
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.p16pf = {
  id: 'p16pf',
  icon: '🧩',
  color: '#6366f1',
  hook: '卡特尔 16 维人格剖面，认识更立体的你',
  intro: '16PF 由心理学家卡特尔编制，从乐群、聪慧、稳定、恃强、兴奋、有恒、敢为、敏感、怀疑、幻想、世故、忧虑、实验、独立、自律、紧张共 16 个维度刻画人格。速测 32 题快速出剖面，深度 64 题更全面。结果包含 16 维剖面图与每维档位解读，帮你更立体地认识自己。',
  source: '题库《卡特尔 16PF 性格测试》· 雷蒙德·卡特尔（Raymond Cattell）',
  title: '16PF 人格测评',
  short: '16PF 人格',
  category: 'explore',
  disclaimerLevel: 'explore',
  timeMinutes: 8,
  desc: '16 维人格剖面，速测 32 题 / 深度 64 题。',
  disclaimerExtra: '题目改编自题库《卡特尔 16PF 性格测试》。结果仅供自我探索与参考。',
  versions: {
    quick: {
      label: '速测版',
      timeMinutes: 4,
      instruction: '请根据这句话符合你的程度作答。凭第一直觉选，没有对错之分。',
      options: [
        { text: '非常不符合', score: 1 },
        { text: '不太符合', score: 2 },
        { text: '一般 / 说不准', score: 3 },
        { text: '比较符合', score: 4 },
        { text: '非常符合', score: 5 }
      ],
      dimsMode: {
        scaleMax: 5,
        subscales: [
          {
            name: '乐群性', code: 'A', short: '乐群', items: [1, 17],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你享受独处，一个人待着最自在。对人际保持距离，更愿意把精力留给真正在乎的人和事。' },
              { min: 2.4, max: 3.6, level: '中', description: '你能热闹也能安静，视场合切换状态。需要社交时顶得上，需要独处时也享受。' },
              { min: 3.6, max: 5, level: '高', description: '你在人群里充电，喜欢与人往来合作，是天然的交际担当。越热闹越来劲，但要记得给自己留独处空间。' }
            ]
          },
          {
            name: '聪慧性', code: 'B', short: '聪慧', items: [2, 18],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你偏重具体、可操作的经验，不爱绕脑子的抽象概念。做事扎实，但遇到需要推演的问题会慢半拍。' },
              { min: 2.4, max: 3.6, level: '中', description: '你既能处理具体事务，也能应对烧脑问题，视内容切换用脑方式。' },
              { min: 3.6, max: 5, level: '高', description: '你爱动脑、善于抽象推理，学新东西快，常常一点就通，是别人眼里的聪明人。' }
            ]
          },
          {
            name: '稳定性', code: 'C', short: '稳定', items: [3, 19],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你情绪起伏较大，容易受小事影响，压力下容易不安。这份敏感让你更懂自己，但也需要学着稳住。' },
              { min: 2.4, max: 3.6, level: '中', description: '你有正常的情绪波动，压力大了会难受，但通常能自己调整回来。' },
              { min: 3.6, max: 5, level: '高', description: '你情绪稳定、抗压，遇事冷静，是别人慌乱时能稳住场子的那个人。' }
            ]
          },
          {
            name: '恃强性', code: 'E', short: '恃强', items: [4, 20],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你谦和随顺，习惯配合别人，把选择权交出去。好相处，但有时会把真实想法藏起来。' },
              { min: 2.4, max: 3.6, level: '中', description: '你在主导与配合之间拿捏，该做主时做主，该配合时配合。' },
              { min: 3.6, max: 5, level: '高', description: '你有主见、好胜、爱拍板，习惯按自己的节奏走。敢担当是优点，注意别在协作里显得太强势。' }
            ]
          },
          {
            name: '兴奋性', code: 'F', short: '兴奋', items: [5, 21],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你严肃谨慎、话不多，做事认真可靠。思考多于冲动，是别人眼里稳重靠谱的人。' },
              { min: 2.4, max: 3.6, level: '中', description: '你该活跃时活跃，该安静时安静，分寸拿捏得当。' },
              { min: 3.6, max: 5, level: '高', description: '你热情外向、爱玩爱热闹，自带活力，是人群里的开心果。注意别嗨过头忽略了正事。' }
            ]
          },
          {
            name: '有恒性', code: 'G', short: '有恒', items: [6, 22],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你随性灵活，不喜欢被规则和承诺绑住。应变快，但容易虎头蛇尾，答应的事爱打折。' },
              { min: 2.4, max: 3.6, level: '中', description: '你在意的事有恒心，不太在意的事允许自己松一松。' },
              { min: 3.6, max: 5, level: '高', description: '你讲原则、重承诺，说到做到、有始有终，是别人愿意托付事情的人。' }
            ]
          },
          {
            name: '敢为性', code: 'H', short: '敢为', items: [7, 23],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你谨慎怕生，陌生场合容易放不开。倾向先观察再行动，风险意识强是你的护城河。' },
              { min: 2.4, max: 3.6, level: '中', description: '你该大胆时能站出来，该谨慎时能收住，视场景调节胆量。' },
              { min: 3.6, max: 5, level: '高', description: '你大胆敢闯，当众表达和冒险都不算难事，机会来了敢先上。注意别莽，细节也值得看一眼。' }
            ]
          },
          {
            name: '敏感性', code: 'I', short: '敏感', items: [8, 24],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你理智务实，就事论事，不容易被情绪和气氛带跑。做事果断，但可能显得不够细腻。' },
              { min: 2.4, max: 3.6, level: '中', description: '你既讲道理也顾感受，视对象和场合调节感性程度。' },
              { min: 3.6, max: 5, level: '高', description: '你对美和情绪很敏感，容易被艺术与人的情感打动，共情力强。代价是情绪也更容易被消耗。' }
            ]
          },
          {
            name: '怀疑性', code: 'L', short: '怀疑', items: [9, 25],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你信任随和，愿意相信别人的善意，相处起来很放松。留个心眼，别被有心人利用就好。' },
              { min: 2.4, max: 3.6, level: '中', description: '你对人有基本信任，必要时也会保持观察和保留。' },
              { min: 3.6, max: 5, level: '高', description: '你警觉多疑，习惯先观察再信任，能看穿套路。过度时容易把人想复杂，也累自己。' }
            ]
          },
          {
            name: '幻想性', code: 'M', short: '幻想', items: [10, 26],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你现实务实，只关心眼前实际的事，不做无用空想。脚踏实地，但可能少了点想象力。' },
              { min: 2.4, max: 3.6, level: '中', description: '你既关注现实，也偶尔放飞想象，两种模式切换自如。' },
              { min: 3.6, max: 5, level: '高', description: '你想象力丰富，常有天马行空的想法，创造力是强项。记得让点子落个地，别只停在脑子里。' }
            ]
          },
          {
            name: '世故性', code: 'N', short: '世故', items: [11, 27],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你直率坦荡，心里想什么就说什么，藏不住话。真诚讨喜，但偶尔太直容易伤人。' },
              { min: 2.4, max: 3.6, level: '中', description: '你懂得看场合说话，该直率时直率，该圆融时圆融。' },
              { min: 3.6, max: 5, level: '高', description: '你精明老练，知道什么场合说什么话，处理复杂关系游刃有余。别让人觉得太油、太端着。' }
            ]
          },
          {
            name: '忧虑性', code: 'O', short: '忧虑', items: [12, 28],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你自信从容，很少为将来发愁，安全感足。状态稳定，只是偶尔少一点对风险的警惕。' },
              { min: 2.4, max: 3.6, level: '中', description: '你会有正常的担忧，但通常能把心放回肚子里，不过度内耗。' },
              { min: 3.6, max: 5, level: '高', description: '你心思细、想得多，常担心自己做得不够好。这份自省让你更认真，但别把自己耗得太紧。' }
            ]
          },
          {
            name: '实验性', code: 'Q1', short: '实验', items: [13, 29],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你保守稳健，偏好沿用验证过的老办法，尊重传统。稳妥可靠，但面对变化时适应偏慢。' },
              { min: 2.4, max: 3.6, level: '中', description: '你对新事物保持好奇但会先观望，愿意尝试经过验证的新方法。' },
              { min: 3.6, max: 5, level: '高', description: '你开放激进，喜欢尝试新方法、挑战老规矩，拥抱变化是本能。新东西好，也要留神风险。' }
            ]
          },
          {
            name: '独立性', code: 'Q2', short: '独立', items: [14, 30],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你习惯依赖群体，大事喜欢有人商量、有伴同行。好合作，但独立决策时容易没底气。' },
              { min: 2.4, max: 3.6, level: '中', description: '你能独立也能求助，视事情大小切换依赖程度。' },
              { min: 3.6, max: 5, level: '高', description: '你独立自主，习惯自己做决定、独自完成任务，不依赖别人的看法。能力强，但可能显得有距离。' }
            ]
          },
          {
            name: '自律性', code: 'Q3', short: '自律', items: [15, 31],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你随性自由，计划常赶不上变化，丢三落四时有发生。灵活应变，但自制力可以再练练。' },
              { min: 2.4, max: 3.6, level: '中', description: '你生活有基本条理，重要的事会规划，不重要的事允许自己放松。' },
              { min: 3.6, max: 5, level: '高', description: '你自律有条理，计划性强、说到做到，是把事情推进到底的人。别把标准定太高，逼自己太紧。' }
            ]
          },
          {
            name: '紧张性', code: 'Q4', short: '紧张', items: [16, 32],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你心平气和、松弛自在，很少被紧张困住。容易知足，但也可能少了点进取的劲头。' },
              { min: 2.4, max: 3.6, level: '中', description: '你多数时候放松，遇事才会绷紧神经，事过之后能恢复。' },
              { min: 3.6, max: 5, level: '高', description: '你容易紧张焦虑，总觉得时间不够用、神经紧绷。这份紧迫感推着你往前走，但要记得给自己喘息。' }
            ]
          }
        ],
        combos: []
      },
      /* 速测版 32 题：第 1 轮（id 1-16）各因子正向 1 题，
         第 2 轮（id 17-32）各因子反向 1 题，按 A B C E F G H I L M N O Q1 Q2 Q3 Q4 轮转 */
      questions: [
        { id: 1,  dim: 'A',  text: '我喜欢主动认识新朋友' },
        { id: 2,  dim: 'B',  text: '我喜欢解决需要动脑的难题' },
        { id: 3,  dim: 'C',  text: '遇到突发状况我能保持冷静' },
        { id: 4,  dim: 'E',  text: '我愿意在团队里做拍板的人' },
        { id: 5,  dim: 'F',  text: '我是个很爱玩爱热闹的人' },
        { id: 6,  dim: 'G',  text: '答应别人的事我一定会做到' },
        { id: 7,  dim: 'H',  text: '当众发言对我毫无压力' },
        { id: 8,  dim: 'I',  text: '我对艺术作品特别有共鸣' },
        { id: 9,  dim: 'L',  text: '我会先观察再决定信不信别人' },
        { id: 10, dim: 'M',  text: '我脑子里常冒出天马行空的想法' },
        { id: 11, dim: 'N',  text: '我知道什么时候该说什么话' },
        { id: 12, dim: 'O',  text: '我常担心自己做得不够好' },
        { id: 13, dim: 'Q1', text: '我喜欢尝试没有做过的新方法' },
        { id: 14, dim: 'Q2', text: '我做决定不太需要参考别人' },
        { id: 15, dim: 'Q3', text: '我的生活很有条理' },
        { id: 16, dim: 'Q4', text: '我总觉得时间不够用、神经紧绷' },
        { id: 17, dim: 'A',  reverse: true, text: '比起热闹我更愿意一个人待着' },
        { id: 18, dim: 'B',  reverse: true, text: '做抽象推理题让我头疼' },
        { id: 19, dim: 'C',  reverse: true, text: '我的情绪容易受小事影响' },
        { id: 20, dim: 'E',  reverse: true, text: '我习惯听从别人的安排' },
        { id: 21, dim: 'F',  reverse: true, text: '我做事一板一眼、不苟言笑' },
        { id: 22, dim: 'G',  reverse: true, text: '我做事经常半途而废' },
        { id: 23, dim: 'H',  reverse: true, text: '人多的场合我会紧张放不开' },
        { id: 24, dim: 'I',  reverse: true, text: '我基本不看情感细腻的东西' },
        { id: 25, dim: 'L',  reverse: true, text: '我很容易相信别人说的话' },
        { id: 26, dim: 'M',  reverse: true, text: '我只关心眼前实际的事情' },
        { id: 27, dim: 'N',  reverse: true, text: '说话太直，经常得罪人' },
        { id: 28, dim: 'O',  reverse: true, text: '我很少为将来发愁' },
        { id: 29, dim: 'Q1', reverse: true, text: '我偏好沿用经过验证的老办法' },
        { id: 30, dim: 'Q2', reverse: true, text: '大事上我习惯找人商量' },
        { id: 31, dim: 'Q3', reverse: true, text: '我常常丢三落四、计划赶不上变化' },
        { id: 32, dim: 'Q4', reverse: true, text: '我整个人通常很松弛' }
      ]
    },
    deep: {
      label: '深度版',
      timeMinutes: 10,
      instruction: '请根据这句话符合你的程度作答。64 题全面刻画你的 16 维人格。',
      options: [
        { text: '非常不符合', score: 1 },
        { text: '不太符合', score: 2 },
        { text: '一般 / 说不准', score: 3 },
        { text: '比较符合', score: 4 },
        { text: '非常符合', score: 5 }
      ],
      dimsMode: {
        scaleMax: 5,
        subscales: [
          {
            name: '乐群性', code: 'A', short: '乐群', items: [1, 17, 33, 49],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你享受独处，一个人待着最自在。对人际保持距离，更愿意把精力留给真正在乎的人和事。' },
              { min: 2.4, max: 3.6, level: '中', description: '你能热闹也能安静，视场合切换状态。需要社交时顶得上，需要独处时也享受。' },
              { min: 3.6, max: 5, level: '高', description: '你在人群里充电，喜欢与人往来合作，是天然的交际担当。越热闹越来劲，但要记得给自己留独处空间。' }
            ]
          },
          {
            name: '聪慧性', code: 'B', short: '聪慧', items: [2, 18, 34, 50],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你偏重具体、可操作的经验，不爱绕脑子的抽象概念。做事扎实，但遇到需要推演的问题会慢半拍。' },
              { min: 2.4, max: 3.6, level: '中', description: '你既能处理具体事务，也能应对烧脑问题，视内容切换用脑方式。' },
              { min: 3.6, max: 5, level: '高', description: '你爱动脑、善于抽象推理，学新东西快，常常一点就通，是别人眼里的聪明人。' }
            ]
          },
          {
            name: '稳定性', code: 'C', short: '稳定', items: [3, 19, 35, 51],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你情绪起伏较大，容易受小事影响，压力下容易不安。这份敏感让你更懂自己，但也需要学着稳住。' },
              { min: 2.4, max: 3.6, level: '中', description: '你有正常的情绪波动，压力大了会难受，但通常能自己调整回来。' },
              { min: 3.6, max: 5, level: '高', description: '你情绪稳定、抗压，遇事冷静，是别人慌乱时能稳住场子的那个人。' }
            ]
          },
          {
            name: '恃强性', code: 'E', short: '恃强', items: [4, 20, 36, 52],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你谦和随顺，习惯配合别人，把选择权交出去。好相处，但有时会把真实想法藏起来。' },
              { min: 2.4, max: 3.6, level: '中', description: '你在主导与配合之间拿捏，该做主时做主，该配合时配合。' },
              { min: 3.6, max: 5, level: '高', description: '你有主见、好胜、爱拍板，习惯按自己的节奏走。敢担当是优点，注意别在协作里显得太强势。' }
            ]
          },
          {
            name: '兴奋性', code: 'F', short: '兴奋', items: [5, 21, 37, 53],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你严肃谨慎、话不多，做事认真可靠。思考多于冲动，是别人眼里稳重靠谱的人。' },
              { min: 2.4, max: 3.6, level: '中', description: '你该活跃时活跃，该安静时安静，分寸拿捏得当。' },
              { min: 3.6, max: 5, level: '高', description: '你热情外向、爱玩爱热闹，自带活力，是人群里的开心果。注意别嗨过头忽略了正事。' }
            ]
          },
          {
            name: '有恒性', code: 'G', short: '有恒', items: [6, 22, 38, 54],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你随性灵活，不喜欢被规则和承诺绑住。应变快，但容易虎头蛇尾，答应的事爱打折。' },
              { min: 2.4, max: 3.6, level: '中', description: '你在意的事有恒心，不太在意的事允许自己松一松。' },
              { min: 3.6, max: 5, level: '高', description: '你讲原则、重承诺，说到做到、有始有终，是别人愿意托付事情的人。' }
            ]
          },
          {
            name: '敢为性', code: 'H', short: '敢为', items: [7, 23, 39, 55],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你谨慎怕生，陌生场合容易放不开。倾向先观察再行动，风险意识强是你的护城河。' },
              { min: 2.4, max: 3.6, level: '中', description: '你该大胆时能站出来，该谨慎时能收住，视场景调节胆量。' },
              { min: 3.6, max: 5, level: '高', description: '你大胆敢闯，当众表达和冒险都不算难事，机会来了敢先上。注意别莽，细节也值得看一眼。' }
            ]
          },
          {
            name: '敏感性', code: 'I', short: '敏感', items: [8, 24, 40, 56],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你理智务实，就事论事，不容易被情绪和气氛带跑。做事果断，但可能显得不够细腻。' },
              { min: 2.4, max: 3.6, level: '中', description: '你既讲道理也顾感受，视对象和场合调节感性程度。' },
              { min: 3.6, max: 5, level: '高', description: '你对美和情绪很敏感，容易被艺术与人的情感打动，共情力强。代价是情绪也更容易被消耗。' }
            ]
          },
          {
            name: '怀疑性', code: 'L', short: '怀疑', items: [9, 25, 41, 57],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你信任随和，愿意相信别人的善意，相处起来很放松。留个心眼，别被有心人利用就好。' },
              { min: 2.4, max: 3.6, level: '中', description: '你对人有基本信任，必要时也会保持观察和保留。' },
              { min: 3.6, max: 5, level: '高', description: '你警觉多疑，习惯先观察再信任，能看穿套路。过度时容易把人想复杂，也累自己。' }
            ]
          },
          {
            name: '幻想性', code: 'M', short: '幻想', items: [10, 26, 42, 58],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你现实务实，只关心眼前实际的事，不做无用空想。脚踏实地，但可能少了点想象力。' },
              { min: 2.4, max: 3.6, level: '中', description: '你既关注现实，也偶尔放飞想象，两种模式切换自如。' },
              { min: 3.6, max: 5, level: '高', description: '你想象力丰富，常有天马行空的想法，创造力是强项。记得让点子落个地，别只停在脑子里。' }
            ]
          },
          {
            name: '世故性', code: 'N', short: '世故', items: [11, 27, 43, 59],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你直率坦荡，心里想什么就说什么，藏不住话。真诚讨喜，但偶尔太直容易伤人。' },
              { min: 2.4, max: 3.6, level: '中', description: '你懂得看场合说话，该直率时直率，该圆融时圆融。' },
              { min: 3.6, max: 5, level: '高', description: '你精明老练，知道什么场合说什么话，处理复杂关系游刃有余。别让人觉得太油、太端着。' }
            ]
          },
          {
            name: '忧虑性', code: 'O', short: '忧虑', items: [12, 28, 44, 60],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你自信从容，很少为将来发愁，安全感足。状态稳定，只是偶尔少一点对风险的警惕。' },
              { min: 2.4, max: 3.6, level: '中', description: '你会有正常的担忧，但通常能把心放回肚子里，不过度内耗。' },
              { min: 3.6, max: 5, level: '高', description: '你心思细、想得多，常担心自己做得不够好。这份自省让你更认真，但别把自己耗得太紧。' }
            ]
          },
          {
            name: '实验性', code: 'Q1', short: '实验', items: [13, 29, 45, 61],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你保守稳健，偏好沿用验证过的老办法，尊重传统。稳妥可靠，但面对变化时适应偏慢。' },
              { min: 2.4, max: 3.6, level: '中', description: '你对新事物保持好奇但会先观望，愿意尝试经过验证的新方法。' },
              { min: 3.6, max: 5, level: '高', description: '你开放激进，喜欢尝试新方法、挑战老规矩，拥抱变化是本能。新东西好，也要留神风险。' }
            ]
          },
          {
            name: '独立性', code: 'Q2', short: '独立', items: [14, 30, 46, 62],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你习惯依赖群体，大事喜欢有人商量、有伴同行。好合作，但独立决策时容易没底气。' },
              { min: 2.4, max: 3.6, level: '中', description: '你能独立也能求助，视事情大小切换依赖程度。' },
              { min: 3.6, max: 5, level: '高', description: '你独立自主，习惯自己做决定、独自完成任务，不依赖别人的看法。能力强，但可能显得有距离。' }
            ]
          },
          {
            name: '自律性', code: 'Q3', short: '自律', items: [15, 31, 47, 63],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你随性自由，计划常赶不上变化，丢三落四时有发生。灵活应变，但自制力可以再练练。' },
              { min: 2.4, max: 3.6, level: '中', description: '你生活有基本条理，重要的事会规划，不重要的事允许自己放松。' },
              { min: 3.6, max: 5, level: '高', description: '你自律有条理，计划性强、说到做到，是把事情推进到底的人。别把标准定太高，逼自己太紧。' }
            ]
          },
          {
            name: '紧张性', code: 'Q4', short: '紧张', items: [16, 32, 48, 64],
            interpretation: [
              { min: 1, max: 2.4, level: '低', description: '你心平气和、松弛自在，很少被紧张困住。容易知足，但也可能少了点进取的劲头。' },
              { min: 2.4, max: 3.6, level: '中', description: '你多数时候放松，遇事才会绷紧神经，事过之后能恢复。' },
              { min: 3.6, max: 5, level: '高', description: '你容易紧张焦虑，总觉得时间不够用、神经紧绷。这份紧迫感推着你往前走，但要记得给自己喘息。' }
            ]
          }
        ],
        combos: []
      },
      /* 深度版 64 题：4 轮轮转（A B C E F G H I L M N O Q1 Q2 Q3 Q4）
         第 1 轮（1-16）各因子正向①，第 2 轮（17-32）各因子正向②，
         第 3 轮（33-48）各因子反向①，第 4 轮（49-64）各因子反向② */
      questions: [
        { id: 1,  dim: 'A',  text: '我喜欢主动认识新朋友' },
        { id: 2,  dim: 'B',  text: '我喜欢解决需要动脑的难题' },
        { id: 3,  dim: 'C',  text: '遇到突发状况我能保持冷静' },
        { id: 4,  dim: 'E',  text: '我愿意在团队里做拍板的人' },
        { id: 5,  dim: 'F',  text: '我是个很爱玩爱热闹的人' },
        { id: 6,  dim: 'G',  text: '答应别人的事我一定会做到' },
        { id: 7,  dim: 'H',  text: '当众发言对我毫无压力' },
        { id: 8,  dim: 'I',  text: '我对艺术作品特别有共鸣' },
        { id: 9,  dim: 'L',  text: '我会先观察再决定信不信别人' },
        { id: 10, dim: 'M',  text: '我脑子里常冒出天马行空的想法' },
        { id: 11, dim: 'N',  text: '我知道什么时候该说什么话' },
        { id: 12, dim: 'O',  text: '我常担心自己做得不够好' },
        { id: 13, dim: 'Q1', text: '我喜欢尝试没有做过的新方法' },
        { id: 14, dim: 'Q2', text: '我做决定不太需要参考别人' },
        { id: 15, dim: 'Q3', text: '我的生活很有条理' },
        { id: 16, dim: 'Q4', text: '我总觉得时间不够用、神经紧绷' },
        { id: 17, dim: 'A',  text: '和朋友在一起让我精力充沛' },
        { id: 18, dim: 'B',  text: '我学新东西通常很快' },
        { id: 19, dim: 'C',  text: '压力再大我也能稳住自己' },
        { id: 20, dim: 'E',  text: '我习惯让别人按我的节奏来' },
        { id: 21, dim: 'F',  text: '我说话办事通常很有活力' },
        { id: 22, dim: 'G',  text: '认定的事我会坚持到底' },
        { id: 23, dim: 'H',  text: '遇到没做过的事我也敢先上' },
        { id: 24, dim: 'I',  text: '我很容易被电影情节打动' },
        { id: 25, dim: 'L',  text: '别人过分热情时我会保持警惕' },
        { id: 26, dim: 'M',  text: '我经常沉浸在自己的想象里' },
        { id: 27, dim: 'N',  text: '我擅长在复杂场合周旋' },
        { id: 28, dim: 'O',  text: '我容易为还没发生的事焦虑' },
        { id: 29, dim: 'Q1', text: '我愿意打破常规换种活法' },
        { id: 30, dim: 'Q2', text: '我习惯一个人独立完成任务' },
        { id: 31, dim: 'Q3', text: '我定下的计划都会认真执行' },
        { id: 32, dim: 'Q4', text: '即使没要紧事我也放松不下来' },
        { id: 33, dim: 'A',  reverse: true, text: '比起热闹我更愿意一个人待着' },
        { id: 34, dim: 'B',  reverse: true, text: '做抽象推理题让我头疼' },
        { id: 35, dim: 'C',  reverse: true, text: '我的情绪容易受小事影响' },
        { id: 36, dim: 'E',  reverse: true, text: '我习惯听从别人的安排' },
        { id: 37, dim: 'F',  reverse: true, text: '我做事一板一眼、不苟言笑' },
        { id: 38, dim: 'G',  reverse: true, text: '我做事经常半途而废' },
        { id: 39, dim: 'H',  reverse: true, text: '人多的场合我会紧张放不开' },
        { id: 40, dim: 'I',  reverse: true, text: '我基本不看情感细腻的东西' },
        { id: 41, dim: 'L',  reverse: true, text: '我很容易相信别人说的话' },
        { id: 42, dim: 'M',  reverse: true, text: '我只关心眼前实际的事情' },
        { id: 43, dim: 'N',  reverse: true, text: '说话太直，经常得罪人' },
        { id: 44, dim: 'O',  reverse: true, text: '我很少为将来发愁' },
        { id: 45, dim: 'Q1', reverse: true, text: '我偏好沿用经过验证的老办法' },
        { id: 46, dim: 'Q2', reverse: true, text: '大事上我习惯找人商量' },
        { id: 47, dim: 'Q3', reverse: true, text: '我常常丢三落四、计划赶不上变化' },
        { id: 48, dim: 'Q4', reverse: true, text: '我整个人通常很松弛' },
        { id: 49, dim: 'A',  reverse: true, text: '我不喜欢参加大型聚会' },
        { id: 50, dim: 'B',  reverse: true, text: '我不太喜欢动脑筋的深度思考' },
        { id: 51, dim: 'C',  reverse: true, text: '遇到挫折我会很久缓不过来' },
        { id: 52, dim: 'E',  reverse: true, text: '意见不同时我倾向于退让' },
        { id: 53, dim: 'F',  reverse: true, text: '我很少主动活跃气氛' },
        { id: 54, dim: 'G',  reverse: true, text: '我觉得守规矩太死板，没必要太较真' },
        { id: 55, dim: 'H',  reverse: true, text: '冒险的事情我总是犹豫不决' },
        { id: 56, dim: 'I',  reverse: true, text: '遇事我习惯就事论事，不太讲感觉' },
        { id: 57, dim: 'L',  reverse: true, text: '我从不怀疑身边朋友的用心' },
        { id: 58, dim: 'M',  reverse: true, text: '做事前我只考虑现实条件，不参考直觉' },
        { id: 59, dim: 'N',  reverse: true, text: '我藏不住自己的真实想法' },
        { id: 60, dim: 'O',  reverse: true, text: '我对自己一直很有信心' },
        { id: 61, dim: 'Q1', reverse: true, text: '稳定的生活比新鲜感更重要' },
        { id: 62, dim: 'Q2', reverse: true, text: '独处久了我会觉得没着落' },
        { id: 63, dim: 'Q3', reverse: true, text: '我做事容易分心、拖拖拉拉' },
        { id: 64, dim: 'Q4', reverse: true, text: '我很少因为小事就坐立不安' }
      ]
    }
  }
};
