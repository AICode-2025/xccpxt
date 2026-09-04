/* 全库质量审计 v2 · 版本感知
 * 校验每个量表的结构完整性、合规配置、版本结构。
 * 版本化表(versions)：公共字段在基座，数据字段(questions/options/instruction/poleMode等)可放版本内，
 * 引擎 resolveVersion 会合并，故检测跨基座+版本做"任一存在"判定。 */
const fs = require('fs'), path = require('path'), vm = require('vm');
const sb = {}; sb.window = sb; vm.createContext(sb);
vm.runInContext(fs.readFileSync(path.join(__dirname, 'js', 'engine.js'), 'utf8'), sb);
const files = fs.readdirSync(path.join(__dirname, 'data')).filter(f => /^[a-z0-9]+\.js$/.test(f)).sort();
files.forEach(f => vm.runInContext(fs.readFileSync(path.join(__dirname, 'data', f), 'utf8'), sb));
const R = sb.window.XC_SCALES;
const issues = [];
const warn = (id, m) => issues.push(`  ${id}: ${m}`);

// 取某字段在基座或任一版本中的定义
const hasAny = (s, k) => s[k] !== undefined || Object.keys(s.versions || {}).some(vk => s.versions[vk][k] !== undefined);

for (const id of Object.keys(R)) {
  const s = R[id];
  const isVersioned = !!s.versions;
  const versions = Object.keys(s.versions || {});
  const active = isVersioned ? s.versions[versions[0]] : s; // 任一版本代表

  if (s.id !== id) warn(id, 'id 与注册键不一致');
  // 公共必填字段（基座必须有，与版本无关）
  const baseReq = ['title', 'short', 'icon', 'color', 'hook', 'intro', 'source',
    'category', 'disclaimerLevel', 'desc'];
  baseReq.forEach(k => { if (s[k] === undefined) warn(id, `基座缺字段: ${k}`); });
  if (s.timeMinutes === undefined) warn(id, '基座缺字段: timeMinutes');

  // options/questions 基座或版本任一存在
  if (!hasAny(s, 'options')) warn(id, '无 options');
  if (!hasAny(s, 'questions')) warn(id, '无 questions');
  if (!hasAny(s, 'instruction')) warn(id, '无 instruction');

  // 模式判定（跨基座+版本）
  const hasMode = k => hasAny(s, k);
  const modes = ['countMode', 'poleMode', 'dimsMode', 'quadrantMode'].filter(hasMode);
  const baseScoring = hasAny(s, 'scoring');
  if (modes.length > 1) warn(id, '计分模式冲突: ' + modes.join('/'));
  if (modes.length + (baseScoring ? 1 : 0) === 0) warn(id, '未定义任何计分方式');
  if (modes.length && baseScoring) warn(id, '既有 mode 又有 scoring 冲突');

  // 对每个版本做内部一致性
  const checkVer = (v, vk) => {
    const qs = v.questions || [];
    if (!qs.length) { warn(id, `版本[${vk}] questions 为空`); return; }
    // questions 可继承基座（若基座有）
    if (qs.some(q => q.id === undefined)) warn(id, `版本[${vk}] 有题目缺 id`);
    const seen = new Set(), dup = [];
    qs.forEach(q => { if (seen.has(q.id)) dup.push(q.id); seen.add(q.id); });
    if (dup.length) warn(id, `版本[${vk}] 重复题 id: ${dup.join(',')}`);
    // items 引用验证
    const qids = new Set(qs.map(q => q.id));
    const chkRefs = (holder, holderPath) => {
      (holder && holder.subscales || []).forEach(d => (d.items || []).forEach(it => {
        if (!qids.has(it)) warn(id, `${holderPath}[${d.name}] items 引用不存在题: ${it}`);
      }));
    };
    chkRefs(v.dimsMode, `版本[${vk}] dims`);
    chkRefs(v.quadrantMode && { subscales: v.quadrantMode.dimensions }, `版本[${vk}] quadrant`);
    if (v.poleMode && !(v.types || s.types)) warn(id, `版本[${vk}] poleMode 缺 types（版本与基座都无）`);
    if (v.quadrantMode && (!v.quadrantMode.dimensions || !(v.types || s.types))) warn(id, `版本[${vk}] quadrant 缺 dimensions/types`);
    if (v.countMode && (!v.countMode.categories || !(v.types || s.types))) warn(id, `版本[${vk}] countMode 缺 categories/types`);
    // sum 判级区间连续性
    if (!v.poleMode && !v.dimsMode && !v.quadrantMode && !v.countMode && v.interpretation) {
      const iv = v.interpretation;
      for (let i = 0; i < iv.length; i++) {
        if (i > 0 && iv[i].min !== iv[i - 1].max + 1) warn(id, `版本[${vk}] 判定区间不连续: 档${i} min=${iv[i].min}≠上档max=${iv[i-1].max}+1`);
      }
    }
    if (v.poleMode && (!v.poleMode.dimensions || !v.poleMode.dimensions.length)) warn(id, `版本[${vk}] poleMode 无 dimensions`);
  };

  if (isVersioned) versions.forEach(vk => checkVer(s.versions[vk], vk));
  else checkVer(s, 'base');

  // 合规：screen 类必须转介
  if (s.category === 'screen') {
    if (!s.referral) warn(id, '筛查类(screen)缺 referral');
    if (s.disclaimerLevel !== 'screen') warn(id, 'screen 但 disclaimerLevel 非 screen');
  }
  if (s.category === 'explore' && s.disclaimerLevel !== 'explore' && s.disclaimerLevel !== 'career') warn(id, 'explore 但 disclaimerLevel 异常');
  if (s.category === 'career' && s.disclaimerLevel !== 'career') warn(id, 'career 但 disclaimerLevel 非 career');

  // 推荐完整性
  (s.recommends || []).forEach(t => {
    if (!R[t]) warn(id, `recommends 死链 → ${t}`);
    if (t === id) warn(id, 'recommends 指向自身');
  });
  if (!Array.isArray(s.recommends || [])) warn(id, 'recommends 非数组');
}

console.log('===== 全库质量审计 v2 =====');
console.log('量表总数:', Object.keys(R).length);
console.log(issues.length ? `发现问题 ${issues.length} 条:` : '全部通过 ✓');
issues.forEach(i => console.log(i));
process.exit(issues.length ? 1 : 0);