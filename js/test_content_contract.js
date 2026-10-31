/* Verify editorial changes against the committed learning data.
   Run before committing: node js/test_content_contract.js
   Optional baseline: node js/test_content_contract.js <git-revision>
   This test reads Git and the source files only; it never touches learner storage. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const vm = require('node:vm');
const P = require('./parser.js');

const root = path.resolve(__dirname, '..');
const revision = process.argv[2] || 'HEAD';
const sourcePath = 'IELTS_Grammar_7_5.md';
const original = execFileSync('git', ['show', `${revision}:${sourcePath}`], { cwd: root, encoding: 'utf8' });
const current = fs.readFileSync(path.join(root, sourcePath), 'utf8');
const before = P.parse(original), after = P.parse(current);

function check(name, fn) {
  fn();
  console.log('PASS', name);
}

check('all chapter IDs, titles, kinds and order survive editing', () => {
  const identity = data => data.chapters.map(({ id, kind, num, letter, title, part }) => ({ id, kind, num, letter, title, part }));
  assert.deepEqual(identity(after), identity(before));
});

check('all existing section anchors retain their heading and index', () => {
  const sections = data => data.chapters.map(ch => ({ id: ch.id, headings: ch.lines.filter(line => /^### /.test(line)) }));
  assert.deepEqual(sections(after), sections(before));
});

for (const key of ['toc', 'pairs', 'formulas', 'verbs', 'exercises']) {
  check(`${key}: every ID, example, formula, question, answer and chapter reference is preserved`, () => {
    assert.deepEqual(after[key], before[key]);
  });
}

check('inline code samples in all numbered chapters and appendices are preserved', () => {
  const samples = data => data.chapters.filter(ch => ch.kind !== 'intro').map(ch => ({
    id: ch.id,
    code: [...ch.md.matchAll(/`([^`]+)`/g)].map(m => m[1])
  }));
  assert.deepEqual(samples(after), samples(before));
});

check('all training item IDs remain unique', () => {
  const ids = [...after.pairs, ...after.formulas, ...after.verbs, ...after.exercises.flatMap(set => set.items)].map(item => item.id);
  assert.equal(new Set(ids).size, ids.length);
});

check('30 chapter-specific guides include a goal, practice prompt and self-check criteria', () => {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'lesson-guide.js'), 'utf8'), sandbox);
  const guide = sandbox.window.IELTSLessonGuide;
  assert.ok(guide);
  for (const ch of after.chapters.filter(ch => ch.kind === 'chapter')) {
    assert.ok(guide[ch.id], `Missing guide ${ch.id}`);
    assert.ok(guide[ch.id].goal.length >= 20, `Missing goal ${ch.id}`);
    assert.ok(guide[ch.id].practice.length >= 20, `Missing practice ${ch.id}`);
    assert.ok(Array.isArray(guide[ch.id].checks) && guide[ch.id].checks.length >= 2, `Missing checks ${ch.id}`);
    assert.ok(guide[ch.id].checks.every(item => typeof item === 'string' && item.length >= 15), `Vague criterion ${ch.id}`);
  }
});

console.log(`ALL PASS — ${after.chapters.length} chapter/appendix pages, ${after.pairs.length + after.formulas.length + after.verbs.length + after.exercises.reduce((n, set) => n + set.items.length, 0)} unchanged training items.`);
