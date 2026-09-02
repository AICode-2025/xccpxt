/* 冒烟：12 张新量表（hope/curio/flow/selfcomp/mindful/disc/workval/burno/love5/temp4/forgive/binge） */
const fs = require('fs'), path = require('path'), vm = require('vm');
const sb = {}; sb.window = sb; vm.createContext(sb);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'js', 'engine.js'), 'utf8'), sb);
const IDs = ['hope','curio','flow','selfcomp','mindful','disc','workval','burno','love5','temp4','forgive','binge'];
IDs.forEach(id => vm.runInContext(fs.readFileSync(path.join(__dirname, 'data', id + '.js'), 'utf8'), sb));
const E = sb.window.XC_ENGINE;
let fail = 0;
const ok = (cond, msg) => { if (!cond) { fail++; console.log('  ✗ ' + msg); } else { console.log('  ✓ ' + msg); } };

// 工具：构造等长、全选某下标(1 base 选项下标=score-1)的作答
const allIdx = (n, idx) => Array(n).fill(idx);
const allScore = (s, sc) => allIdx(s.questions.length, sc - 1);
// 按方向最大化/最小化每题项得分（itemScore：正向题得分=原始分，反向题得分=(min+max)-原始分）
function dirAnswers(s, dirMax) {
  return s.questions.map(q => {
    let best = 0, bestItem = q.reverse ? (dirMax ? -1e9 : 1e9) : (dirMax ? -1e9 : 1e9);
    (s.options || []).forEach((o, i) => {
      const sc = typeof o.score === 'number' ? o.score : i + 1;
      const scoreMin = 1, scoreMax = s.options.length;
      const itemV = q.reverse ? (scoreMin + scoreMax - sc) : sc;
      if (dirMax ? itemV > bestItem : itemV < bestItem) { bestItem = itemV; best = i; }
    });
    return best;
  });
}
const maxAnswers = s => dirAnswers(s, true);
const minAnswers = s => dirAnswers(s, false);

// ---- dims 通用：全5/全1 各维 mean 应落在 [1,5] 且命中档位；含反向题的量表需修正 mean
const lockedCombos = { 'hope':1,'curio':1,'flow':1,'mindful':1,'workval':1,'burno':1,'binge':1, 'selfcomp':0,'forgive':0 };
for (const id of Object.keys(lockedCombos)) {
  const s = E.getScale(id);
  console.log(`\n-- ${id} (dims) --`);
  const hi = E.compute(s, maxAnswers(s));   // 各维推向高方向
  const lo = E.compute(s, minAnswers(s));   // 各维推向低方向
  ok(hi.dims.every(d => d.mean !== undefined && d.mean >= 1 && d.mean <= 5), 'max作答 → 各维 mean 在[1,5]');
  ok(hi.dims.every(d => d.mean >= 3), 'max作答 → 各维倾向高方向');
  ok(lo.dims.every(d => d.mean <= 3), 'min作答 → 各维倾向低方向');
  ok(lockedCombos[id] === 1 ? !!hi.combo : true, lockedCombos[id] ? 'max作答 → 命中组合 (' + (hi.combo&&hi.combo.label) + ')' : 'max作答 → 无需命中组合(自偏离)');
}
// 反向敏感：hope 全1 时 q4/q8(反向) 会+5，动力/路径维 mean 应=2
{
  const s = E.getScale('hope');
  const r = E.compute(s, allScore(s, 1));
  ok(r.dims.every(d => d.mean === 2), 'hope 全1(可选反向) → 每维 mean=2');
}

// 反向：workval q4(反)——全5 时反向题贡献1，成长维度 4 题=5+5+5+1 → mean 4
{
  const s = E.getScale('workval');
  const r = E.compute(s, allScore(s, 5));
  ok(r.dims[0].mean === 4, 'workval 全5(含q4反) → 成长维度 mean=4，实际=' + r.dims[0].mean);
}

// ---- quadrand DISC
{
  const s = E.getScale('disc');
  console.log('\n-- disc (quadrant) --');
  const hi = E.compute(s, allScore(s, 5));
  const lo = E.compute(s, allScore(s, 1));
  ok(hi.typeKey === 'high-high' && hi.type.level === '冲锋号召型', '全5 → high-high 冲锋号召型（实际 ' + hi.typeKey + '/' + (hi.type && hi.type.level) + '）');
  ok(lo.typeKey === 'low-low' && lo.type.level === '沉稳执行型', '全1(含反向) → low-low 沉稳执行型（实际 ' + lo.typeKey + '/' + (lo.type && lo.type.level) + '）');
}

// ---- count love5 / temp4
for (const id of ['love5','temp4']) {
  const s = E.getScale(id);
  console.log(`\n-- ${id} (count) --`);
  const left = E.compute(s, allIdx(s.questions.length, 0));
  const right = E.compute(s, allIdx(s.questions.length, 1));
  ok(!!left.top && left.ranked.length === Object.keys(s.countMode.categories).length, '有主类型且覆盖全部类别');
  ok(!!left.type || left.type === null ? !!left.top : false, 'count 有主类型');
  const expectLeft = id === 'love5' ? '肯定言辞' : '胆汁质';
  const expectRight = id === 'love5' ? '陪伴时光' : '粘液质';
  ok(left.top.name === expectLeft, '全选左 → 主类型 ' + expectLeft + '（实际 ' + left.top.name + '）');
  ok(right.top.name === expectRight, '全选右 → 主类型 ' + expectRight + '（实际 ' + right.top.name + '）');
}

console.log('\n===== 新量表冒烟 ' + (fail ? '发现 ' + fail + ' 处问题' : '全部通过 ✓') + ' =====');
process.exit(fail ? 1 : 0);