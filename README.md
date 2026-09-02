# 星辰测评 · 静态版

纯 HTML + CSS + 原生 JavaScript 的量表测评站。**零依赖、零构建、零后端**：双击 `index.html` 就能跑，也可以直接把整个文件夹丢到任意静态托管（Cloudflare Pages / EdgeOne Pages / Vercel / 宝塔随便哪个）。

**UI 参考**：traits.zqbapp.cn（Traits 特质应用，中青报系）——专题页形态：深色渐变 Hero + 光晕 +
旋转虚线圆环 + 真实主图标 + 参数条 + 白色胶囊 CTA，下方依次为信任条 / 测什么 / 测完得到什么 / 怎么测 /
免责声明 / 底部 CTA / 相关推荐。移动优先自适应（手机单列、≥860px 双列、≥1100px 五列）。

> ⚠️ `assets/type16-icon.png` 与 `assets/hero-bg.jpg` 取自参考站 traits.zqbapp.cn（仅测试研究用途），
> 正式上线前请替换为自有素材，避免版权风险。

## 目录结构

```
site/
├── index.html          # 首页：量表列表 + 小工具入口 + 历史记录
├── intro.html          # 测试专题页（?scale=量表id：Hero/信任条/测什么/测完得到什么/怎么测/免责/底部CTA/相关推荐）
├── assets/              # 专题页图片素材（十六型 Hero 图）
├── dati.html           # 答题页（?scale=量表id）
├── result.html         # 结果页（?scale=量表id&a=作答串，链接可直接分享）
├── css/style.css       # 全站样式（移动端优先）
├── js/
│   ├── engine.js       # 引擎：注册表/计分/反向/维度/判级/转介
│   ├── home.js         # 首页逻辑
│   ├── quiz.js         # 答题逻辑（单题推进/断点续答）
│   └── result.js       # 结果渲染（总分/判级/维度/类型）
└── data/               # 量表数据（加新量表只动这里）
    ├── type16.js       # MBTI 十六型（题目 OEJTS 1.2，32 题，含英文原文）
    ├── bigfive.js      # Big Five 大五（IPIP-NEO-60，60 题）
    ├── attachment.js   # 恋爱依恋（12 道原创平行题，焦虑×回避 → 四象限）
    ├── gses.js         # 一般自我效能感（10题）
    ├── psss.js         # 领悟社会支持（12题）
    ├── sas.js          # 焦虑自评（20题，反向5/9/13/17/19，标准分×1.25）
    ├── sds.js          # 抑郁自评（20题，反向2/5/6/11/12/14/16/17/18/20，标准分×1.25）
    ├── ulca.js         # UCLA 孤独自评（20题，反向1/5/6/9/10/15/16/19/20）
    ├── fes.js          # FES 家庭环境（18题，亲密度/矛盾/秩序 三维均值）
    ├── embu.js         # EMBU 父母教养（18题，温暖/否定/保护 三维均值）
    ├── epq.js          # EPQ 人格（18题，外向/神经质/精神质 三维均值）
    ├── olson.js        # 婚姻质量（18题，亲密/沟通/冲突处理 三维均值）
    ├── tri.js          # 爱情三角（18题，亲密/激情/承诺 三维均值）
    ├── socanx.js       # 社交焦虑（18题，紧张/回避/自我评价 三维均值）
    ├── trust.js        # 人际信任（12题，含反向2/4/5/7/9/11，sum 判级）
    ├── cesd.js         # CES-D 抑郁筛查（20题，0-3计分含4反向，较重以上转介）
    ├── gad7.js         # 焦虑筛查（7题）
    ├── pss10.js        # 压力知觉（10题，0..4计分含反向）
    └── hcl32.js        # 双相倾向筛查（32题是/否，≥14提示评估）
```

## 四种计分模式

引擎按量表配置自动切换，加新量表时选一种即可：

| 模式 | 触发字段 | 适用 | 结果形态 |
|---|---|---|---|
| 求和模式 | 默认 | SAS / SDS / PHQ-9 / GAD-7 / CES-D / PSS-10 / GSES / PSSS / HCL-32 / UCLA / 人际信任 | 总分 + 区间判级 + 分维度条 |
| 极性模式 | `poleMode` | 十六型人格 | 类型代码 + 四维双极条 |
| 维度均值 | `dimsMode` | 大五人格 / FES / EMBU / EPQ / 婚姻质量 / 爱情三角 / 社交焦虑 | 多维均值（1-5）+ 档位解读 + 组合提示 |
| 四象限 | `quadrantMode` | 恋爱依恋 | 两维均值 + 阈值 → 四型 |

## Big Five 大五人格（IPIP-NEO-60）说明

- 来源：International Personality Item Pool（IPIP-NEO-60），Maples-Keller et al. (2019)，
  官方计分键 ipip.ori.org/IPIP-NEO-60ScoringKeys.htm；**public domain，可商用、可翻译、可改编**
- 5 维度 × 12 题 = 60 题，李克特 5 点；**反向题 23 道**记分取 `6 − 原始分`
- 维度分 = 12 题（反向处理后）均值，区间 1-5；官方信度 N .95 / E .92 / O .92 / A .90 / C .92
- 第 35、36 题原为政治/宗教表述，已按本地语境改写为中性表述
- 报告额外给出「情绪稳定性 ≈ 6 − N」

## 恋爱依恋说明

- 维度框架（焦虑 / 回避 → 四象限）为学术共识，**题项原创**，不采用 ECR-R 原文（商用需授权）
- 焦虑 6 题 + 回避 6 题，各取均值（1-5），阈值 3.0 切四象限：安全型 / 焦虑型 / 回避型 / 恐惧型
- 报告同时给「类型标签」（传播用）和「两维连续坐标」（可信度用），并提示模式可变

## MBTI 十六型人格（题目：OEJTS 1.2 版）说明

题库采用 **Open Extended Jungian Type Scales 1.2**（Eric Jorgenson, 2014, Open Psychometrics，
<https://openpsychometrics.org/tests/OEJTS/>）官方公开的 32 道双极题，英文原文保存在每题的
`textEn` 字段（答题页显示为副标题，便于研究对照），中文为对照翻译。

- **计分**：每维度 8 题 × 5 档，原始分 8-40，阈值 24；`>24` 取高极——EI→I，SN→N，TF→T，JP→P
- **百分比**：高极占比 = (原始分 - 8) / 32 × 100
- **flip 字段**：官方题面中高极有时在左、有时在右；`flip: true` 表示该题"高极在左侧"，
  引擎对该题取反号累加，保证与官方计分完全等价（已逐题定向测试验证）
- **不含**：官方在线版第二部分 28 道随机自陈题（从 40 题池抽样，计分键未公开）

## 加一个新量表 = 新建一个 data 文件

```js
window.XC_SCALES = window.XC_SCALES || {};
window.XC_SCALES.你的id = {
  id: '你的id',
  title: '量表名称',
  short: '短名',
  category: 'explore',        // 'explore'=自我探索 | 'screen'=心理筛查（决定首页分区）
  disclaimerLevel: 'explore', // 'explore'=娱乐话术 | 'screen'=筛查话术（决定免责声明）
  timeMinutes: 5,
  desc: '一句话介绍',
  instruction: '答题指导语',
  options: [ { text: '选项一', score: 1 }, ... ],   // score 可省略，默认 1..n
  questions: [ { id: 1, text: '题干', reverse: false }, ... ],
  scoring: {
    method: 'sum',
    factor: 1.0,                // 可选：标准分系数（如 SAS 的 1.25）
    subscales: [ { name: '维度名', items: [1,2,3], min: 3, max: 12 } ]  // 可选
  },
  interpretation: [ { min: 0, max: 20, level: '级别名', description: '解读', suggestions: ['建议1'] }, ... ],
  referral: {                   // 可选：转介配置（筛查类强烈建议配置）
    minScore: 60,               // 总分达到即触发
    items: { 9: 0 },            // 第9题得分>0 即触发（适合自伤项）
    text: '触发时展示的提示文案'
  }
};
```

然后在需要用到它的三个页面（index/intro/dati/result）里加一行 `<script src="data/你的id.js">`。完事，引擎不用改。

## 计分规则（引擎已内置）

- **求和**：全部题目得分相加，`reverse: true` 的题自动反向
- **反向计分**：`min + max - score`，同时兼容 1..n（SAS/GSES）和 0..n-1（PHQ-9/PSS-10）两种计分法
- **标准分**：`粗分 × scoring.factor`（如 SAS ×1.25），判级用标准分
- **分维度**：按 `subscales[].items` 归属求和，结果页画进度条
- **判级**：按 `interpretation` 区间匹配，`min/max` 缺省视为 -∞/+∞
- **转介**：`minScore` 总分触发，或 `items` 指定某题得分超过阈值触发（PHQ-9 第 9 题"自伤念头"只要 >0 立即触发，与总分无关）

## 合规设计

- 筛查类量表固定话术：**"标准化自评筛查工具，不能替代临床诊断"**
- 触发转介时展示醒目提示 + 全国统一心理援助热线 **12356**
- 娱乐类话术：**"仅供自我探索与娱乐参考"**
- 不采集任何数据：作答只存 localStorage，不联网、无埋点

## 已验证

`node --check` 全部通过；引擎冒烟测试 21/21（含 SAS/SDS/PHQ-9/GAD-7/CES-D 筛查类转介，PSS-10/UCLA 双向极值，FES/EMBU/EPQ/Olson/爱情三角/社交焦虑 多维均值与组合提示，人际信任双端）。
