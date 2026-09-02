/* 冒烟 v8 · 续铺批（bdi/staxi/hsp/meaning/decis/time/typea/creat/copy/asrs/parel）
 * 验证：dims 双向极值均值、组合触发、sum 判级、转介边界、反向题 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const sb = {}; sb.window = sb; vm.createContext(sb);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'js', 'engine.js'), 'utf8'), sb);
const files = fs.readdirSync(path.join(__dirname, 'data')).filter(f => /^[a-z0-9]+\.js$/.test(f));
files.forEach(f => vm.runInContext(fs.readFileSync(path.join(__dirname, 'data', f), 'utf8'), sb));
const E = sb.window.XC_ENGINE;
let passed = 0, failed = 0;
const ok = (c, m) => { if (c) passed++; else { failed++; console.log('  ✗ ' + m); } };

// 按方向最大化/最小化每题项得分（reverse 题取反）
function dirAnswers(s, dirMax) {
  return s.questions.map(q => {
    let best = 0, bestItem = -1e9 - 1;
    (s.options || []).forEach((o, i) => {
      const sc = typeof o.score === 'number' ? o.score : i + 1;
      const min = 1, max = s.options.length;
      const itemV = q.reverse ? (min + max - sc) : sc;
      const cur = dirMax ? itemV : -itemV;
      if (cur > bestItem) { bestItem = cur; best = i; }
    });
    return best;
  });
}
const maxAnswers = s => dirAnswers(s, true);
const minAnswers = s => dirAnswers(s, false);

// ---- dims 表：双向极值 + 组合触发 ----
const dimsScales = {
  staxi: { comboExpect: true, dims: ['S','T'] },
  hsp: { comboExpect: true, dims: ['D','A','E'] },
  meaning: { comboExpect: true, dims: ['H','S'] },
  decis: { comboExpect: true, dims: ['R','I','D','A'] },
  time: { comboExpect: true, dims: ['P','F','E'] },
  typea: { comboExpect: true, dims: ['U','C','R'] },
  creat: { comboExpect: true, dims: ['C','I','P'] },
  copy: { comboExpect: true, dims: ['P','E','A'] },
  parel: { comboExpect: true, dims: ['C','G','L'] }
};
for (const id of Object.keys(dimsScales)) {
  const s = E.getScale(id);
  console.log(`-- ${id} (dims) --`);
  const hi = E.compute(s, maxAnswers(s));
  const lo = E.compute(s, minAnswers(s));
  ok(hi.dims && hi.dims.length === dimsScales[id].dims.length, `${id}: max作答 → 维度数正确`);
  ok(hi.dims.every(d => d.mean >= 1 && d.mean <= 5), `${id}: max作答 → 各维 mean 在[1,5]`);
  ok(hi.dims.every(d => d.mean >= 3), `${id}: max作答 → 各维倾向高方向`);
  ok(lo.dims.every(d => d.mean <= 3), `${id}: min作答 → 各维倾向低方向`);
  ok(dimsScales[id].comboExpect ? !!hi.combo : true, `${id}: max作答 → 命中组合 (${hi.combo && hi.combo.label})`);
}

// ---- sum 表：判级 + 转介 ----
// bdi
let s = E.getScale('bdi');
console.log('-- bdi (sum/screen) --');
let r = E.compute(s, maxAnswers(s));
ok(r.total === 63, `bdi: max作答 → 总分63 (实际${r.total})`);
ok(r.level.level === '较明显', `bdi: max作答 → 判级"较明显" (实际${r.level.level})`);
ok(r.referral === true, 'bdi: max作答 → 总分触发转介');
r = E.compute(s, minAnswers(s));
ok(r.total === 0, `bdi: min作答 → 总分0 (实际${r.total})`);
ok(r.level.level === '情绪平稳', `bdi: min作答 → 判级"情绪平稳" (实际${r.level.level})`);
// 单题触发：第21题选>0
const single21 = s.questions.map(() => 2); single21[20] = 1; // 第21题(索引20)=1分，其余=2
r = E.compute(s, single21);
ok(r.referral === true, 'bdi: 第21题>0 → 单独触发转介');

// asrs
s = E.getScale('asrs');
console.log('-- asrs (sum/screen) --');
r = E.compute(s, maxAnswers(s));
ok(r.total === 24, `asrs: max作答 → 总分24 (实际${r.total})`);
ok(r.level.level === '信号明显', `asrs: max作答 → 判级"信号明显" (实际${r.level.level})`);
ok(r.referral === true, 'asrs: max作答 → 触发转介');
r = E.compute(s, minAnswers(s));
ok(r.total === 0 && r.level.level === '信号偏少', `asrs: min作答 → 总分0 判级"信号偏少"`);
// 边界：12分不触发，13分触发
const mid = s.questions.map(() => 2); // 每题2 → 12
r = E.compute(s, mid);
ok(r.total === 12 && r.referral === false, `asrs: 总分12 → 不触发转介 (实际总分${r.total})`);
const hi13 = s.questions.map(() => 2); hi13[0] = 3; // 13
r = E.compute(s, hi13);
ok(r.total === 13 && r.referral === true, `asrs: 总分13 → 触发转介`);

console.log(`\n===== 冒烟结果: ${passed} 通过 / ${failed} 失败 =====`);
process.exit(failed ? 1 : 0);