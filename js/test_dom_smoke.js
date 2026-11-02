/* Smoke test end-to-end với DOM giả lập tối giản: node js/test_dom_smoke.js
   Chạy app.js thật: render các trang, làm trọn quiz ngày, lật hết bộ thẻ, mở bài tập. */
const fs = require('fs');
const path = require('path');

const P = require('./parser.js');
const renderMd = require('./md.js');
const mdText = fs.readFileSync(path.join(__dirname, '..', 'IELTS_Grammar_7_5.md'), 'utf8');

/* ---------- DOM giả lập ---------- */
const headerHTML = `
  <header class="topbar">
  <span id="streakPill"></span><button id="themeBtn"></button><span id="xpPill"></span>
  <button id="navToggle"></button><nav class="nav" id="nav">
  <a data-route="home"></a><a data-route="learn"></a><a data-route="quiz"></a><a data-route="cards"></a><a data-route="ex"></a>
  </nav></header>`;
let htmlLog = headerHTML; // toàn bộ HTML "đang hiển thị"
let era = 0;
const cacheById = new Map();   // era:id -> stub
const cacheBySel = new Map();  // era:sel -> [stubs]
const headerById = new Map(); // Header survives view rerenders, as in the browser.

function makeStub(extra, isView) {
  const attributes = {};
  const styleProperties = {};
  const classes = new Set();
  const el = {
    _inner: '',
    style: {
      setProperty(name, value) { styleProperties[name] = String(value); },
      getPropertyValue(name) { return styleProperties[name] || ''; }
    }, dataset: {},
    classList: {
      toggle(name, force) { const on = force === undefined ? !classes.has(name) : force; if (on) classes.add(name); else classes.delete(name); return on; },
      add(...names) { names.forEach(name => classes.add(name)); },
      remove(...names) { names.forEach(name => classes.delete(name)); },
      contains(name) { return classes.has(name); }
    },
    setAttribute(name, value) {
      attributes[name] = String(value);
      if (name.startsWith('data-')) this.dataset[name.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = String(value);
    },
    getAttribute(name) { return attributes[name] === undefined ? null : attributes[name]; },
    removeAttribute(name) {
      delete attributes[name];
      if (name.startsWith('data-')) delete this.dataset[name.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())];
    },
    onclick: null, oninput: null, onblur: null, onkeydown: null, onchange: null,
    disabled: false, hidden: false, value: '', textContent: '', scrollLeft: 0, scrollWidth: 0,
    focus() { this._focused = true; }, click() { if (this.onclick) this.onclick({ preventDefault() {} }); }, scrollIntoView() { this._scrolled = true; }, remove() {}, appendChild() {},
    files: [], className: '',
    getBoundingClientRect() { return this._rect || { top: 0, left: 0, width: 1000, height: 64, bottom: 64, right: 1000 }; },
    querySelectorAll(sel) { return queryAllIn(this._inner, sel); },
  };
  Object.defineProperty(el, 'innerHTML', {
    get() { return this._inner; },
    set(v) {
      this._inner = v;
      if (isView) { htmlLog = headerHTML + v; era++; cacheById.clear(); cacheBySel.clear(); }
      else htmlLog += v;
    },
  });
  Object.defineProperty(el, 'nextElementSibling', {
    get() { if (!this._next) this._next = makeStub(); return this._next; },
  });
  return Object.assign(el, extra || {});
}

const viewEl = makeStub(null, true);
const topbarEl = makeStub();

function idPresent(id) { return htmlLog.includes('id="' + id + '"'); }
function byId(id) {
  if (id === 'view') return viewEl;
  if (!idPresent(id)) return null;
  if (['streakPill', 'themeBtn', 'xpPill', 'navToggle', 'nav'].includes(id)) {
    if (!headerById.has(id)) headerById.set(id, makeStub());
    return headerById.get(id);
  }
  const key = era + ':' + id;
  if (!cacheById.has(key)) cacheById.set(key, makeStub());
  return cacheById.get(key);
}
function countIn(html, sel) {
  if (sel === '.section-toc a') {
    const outline = (html.match(/<ol class="section-toc">([\s\S]*?)<\/ol>/) || [])[1] || '';
    return (outline.match(/<a /g) || []).length;
  }
  const map = {
    '.q-opt': /class="q-opt"/g,
    '.toc-item': /class="toc-item/g,
    '.ans-btn': /ans-btn/g,
    '.ex-item .ans': /class="ans"/g,
    '.nav a': /data-route/g,
    '.res': /class="res"/g,
    'h3': /<h3/g,
  };
  const re = map[sel] || new RegExp('class="' + sel.replace(/^\./, '').split(' ')[0], 'g');
  return (html.match(re) || []).length;
}
function queryAllIn(html, sel) {
  const n = countIn(html, sel);
  const key = era + ':' + sel;
  if (!cacheBySel.has(key)) {
    const arr = [];
    for (let i = 0; i < n; i++) { const s = makeStub(); s.dataset.i = String(i); s.dataset.index = String(i); s.dataset.ch = 'c1'; s.dataset.route = 'home'; arr.push(s); }
    cacheBySel.set(key, arr);
  }
  return cacheBySel_get(key, n);
}
function cacheBySel_get(key, n) {
  let arr = cacheBySel.get(key);
  while (arr.length < n) { const s = makeStub(); s.dataset.i = String(arr.length); arr.push(s); }
  return arr.slice(0, n);
}

const listeners = {};
const mediaQueries = new Map();
const resizeObservers = [];
function mediaQuery(query) {
  if (!mediaQueries.has(query)) {
    const handlers = new Set();
    mediaQueries.set(query, {
      matches: false, media: query, handlers,
      addEventListener(type, handler) { if (type === 'change') handlers.add(handler); },
      removeEventListener(type, handler) { if (type === 'change') handlers.delete(handler); }
    });
  }
  return mediaQueries.get(query);
}
function setMediaMatch(query, matches) {
  const media = mediaQuery(query);
  if (media.matches === matches) return;
  media.matches = matches;
  [...media.handlers].forEach(handler => handler({ matches, media: query }));
}
const location = { hash: '' };
const window = {
  IELTSParser: P, renderMd,
  addEventListener(ev, fn) { listeners[ev] = fn; },
  matchMedia: mediaQuery,
  ResizeObserver: class {
    constructor(callback) { this.callback = callback; resizeObservers.push(this); }
    observe(target) { this.target = target; }
  },
  scrollTo() {},
};
new Function('window', fs.readFileSync(path.join(__dirname, 'lesson-guide.js'), 'utf8'))(window);
const document = {
  documentElement: makeStub(),
  body: makeStub(),
  addEventListener() {}, removeEventListener() {},
  querySelector(sel) { return sel === '.topbar' ? topbarEl : sel[0] === '#' ? byId(sel.slice(1)) : (countIn(htmlLog, sel) ? queryAllIn(htmlLog, sel)[0] : null); },
  querySelectorAll(sel) { return queryAllIn(htmlLog, sel); },
  getElementById(id) { return byId(id); },
  createElement() { return makeStub({ href: '', download: '' }); },
};
const localStorage = { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = v; }, removeItem(k) { delete this._d[k]; } };
const fetch = () => Promise.resolve({ ok: true, text: () => Promise.resolve(mdText) });
const confirm = () => false, alert = () => {};
const URL = { createObjectURL: () => 'blob:x', revokeObjectURL() {} };
function Blob() {}
function FileReader() { this.readAsText = () => {}; }

/* ---------- chạy app.js ---------- */
const src = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
// Expose actual closure functions only in this test process, without shipping test hooks.
const instrumentAt = src.lastIndexOf('  boot();');
if (instrumentAt < 0) throw new Error('Cannot instrument app boot');
const instrumented = src.slice(0, instrumentAt) + `
  window.__testReader = { buildLessonSections, gotoSection, store,
    get state() { return readerState; }, get data() { return DATA; } };
` + src.slice(instrumentAt);
const run = new Function('window', 'document', 'location', 'localStorage', 'fetch', 'confirm', 'alert', 'URL', 'Blob', 'FileReader', 'setTimeout', 'console', instrumented);

let fails = 0;
const check = (n, c, info) => { if (c) console.log('PASS', n, info || ''); else { console.error('FAIL', n, info || ''); fails++; } };

function goto(hash) { location.hash = hash; listeners.hashchange(); }

(async () => {
  run(window, document, location, localStorage, fetch, confirm, alert, URL, Blob, FileReader, (fn) => fn(), console);
  await new Promise(r => setImmediate(r));

  // HOME
  check('home render', htmlLog.includes('Chào Long') && htmlLog.includes('Bài học hôm nay'));
  check('home: chương 1 được giao', htmlLog.includes('Chương 1:'));
  check('heatmap render', (htmlLog.match(/hm-cell/g) || []).length > 100);
  check('menu thu gọn ban đầu đóng', byId('navToggle').getAttribute('aria-expanded') === 'false');
  byId('navToggle').onclick();
  check('nút menu mở điều hướng và trạng thái truy cập',
    byId('nav').classList.contains('open') && byId('navToggle').getAttribute('aria-expanded') === 'true');
  check('độ cao header được đo lúc khởi động',
    document.documentElement.style.getPropertyValue('--topbar-height') === '64px');
  topbarEl._rect = { height: 96 };
  resizeObservers[0].callback();
  check('ResizeObserver cập nhật độ lệch header khi chiều cao thay đổi',
    resizeObservers[0].target === topbarEl && document.documentElement.style.getPropertyValue('--topbar-height') === '96px');
  topbarEl._rect = { height: 64 };
  resizeObservers[0].callback();

  // LEARN
  goto('#/learn/c3');
  check('đổi trang đóng menu thu gọn',
    !byId('nav').classList.contains('open') && byId('navToggle').getAttribute('aria-expanded') === 'false');
  check('learn c3 render', htmlLog.includes('Thì động từ') && htmlLog.includes('Present Simple'));
  check('learn có nút luyện chương', htmlLog.includes('Luyện chương này'));
  check('learn có điều khiển thư viện với tên và quan hệ truy cập',
    htmlLog.includes('id="libraryToggle" aria-controls="courseSidebar"') && !!byId('libraryClose'));
  const reader = window.__testReader;
  check('chưa chọn độ rộng mục lục thì giữ mặc định responsive của CSS',
    document.querySelector('.learn-wrap').style.getPropertyValue('--toc-w') === '' &&
    !Object.prototype.hasOwnProperty.call(reader.store.data.settings, 'tocWidth'));
  reader.store.data.settings.tocWidth = 560;
  reader.store.save();
  goto('#/learn/c3');
  check('tôn trọng độ rộng 560px đã lưu mà không ghi đè tùy chọn',
    document.querySelector('.learn-wrap').style.getPropertyValue('--toc-w') === '560px' &&
    JSON.parse(localStorage.getItem('ielts75_v1')).settings.tocWidth === 560);
  setMediaMatch('(min-width: 90rem)', true);
  setMediaMatch('(min-width: 90rem)', false);
  check('đổi bố cục không ghi đè độ rộng mục lục 560px đã lưu',
    JSON.parse(localStorage.getItem('ielts75_v1')).settings.tocWidth === 560);
  reader.store.data.settings.tocWidth = 'invalid-width';
  reader.store.save();
  goto('#/learn/c3');
  check('độ rộng đã lưu không hợp lệ dùng mặc định responsive',
    document.querySelector('.learn-wrap').style.getPropertyValue('--toc-w') === '');
  delete reader.store.data.settings.tocWidth;
  reader.store.save();
  goto('#/learn/c3');
  const unchangedLearningData = () => {
    const saved = JSON.parse(localStorage.getItem('ielts75_v1'));
    delete saved.settings;
    return JSON.stringify(saved);
  };
  const beforeReading = unchangedLearningData();
  const layoutQuery = '(min-width: 90rem)';
  const libraryOpen = () => byId('libraryToggle').getAttribute('aria-expanded') === 'true';
  const libraryClass = name => document.querySelector('.learn-wrap').classList.contains(name);
  check('tablet bắt đầu với thư viện đóng để dành chỗ cho bài học', !libraryOpen() && !libraryClass('library-open'));
  byId('libraryToggle').onclick();
  check('tablet mở thư viện và chuyển focus đến tìm kiếm',
    libraryOpen() && libraryClass('library-open') && byId('searchInput')._focused);
  byId('courseSidebar').onkeydown({ key: 'Escape', preventDefault() {} });
  check('Escape đóng thư viện tablet và trả focus về nút mở',
    !libraryOpen() && !libraryClass('library-open') && byId('libraryToggle')._focused);
  byId('libraryToggle').onclick();
  byId('libraryScrim').onclick();
  check('chạm vùng ngoài đóng thư viện tablet', !libraryOpen() && !libraryClass('library-open'));
  byId('libraryToggle').onclick();
  byId('libraryClose').onclick();
  check('nút đóng thư viện tablet hoạt động', !libraryOpen() && !libraryClass('library-open'));
  setMediaMatch(layoutQuery, true);
  check('desktop mặc định hiện thư viện', libraryOpen() && !libraryClass('library-closed'));
  byId('libraryToggle').onclick();
  check('desktop thu thư viện và lưu tùy chọn',
    !libraryOpen() && libraryClass('library-closed') && JSON.parse(localStorage.getItem('ielts75_v1')).settings.libraryCollapsed === true);
  goto('#/learn/c3');
  check('render lại bài giữ thư viện desktop đã thu', !libraryOpen() && libraryClass('library-closed'));
  setMediaMatch(layoutQuery, false);
  byId('libraryToggle').onclick();
  check('mở drawer tablet không ghi đè tùy chọn desktop',
    libraryOpen() && libraryClass('library-open') && JSON.parse(localStorage.getItem('ielts75_v1')).settings.libraryCollapsed === true);
  setMediaMatch(layoutQuery, true);
  check('resize từ drawer tablet khôi phục desktop đã thu',
    !libraryOpen() && !libraryClass('library-open') && libraryClass('library-closed'));
  byId('libraryToggle').onclick();
  check('desktop mở lại thư viện và lưu tùy chọn',
    libraryOpen() && !libraryClass('library-closed') && JSON.parse(localStorage.getItem('ielts75_v1')).settings.libraryCollapsed === false);
  setMediaMatch(layoutQuery, false);
  check('thu viewport đóng thư viện dù desktop đang mở', !libraryOpen() && !libraryClass('library-open'));
  byId('libraryToggle').onclick();
  setMediaMatch(layoutQuery, true);
  check('resize bỏ trạng thái drawer và khôi phục desktop đang mở', libraryOpen() && !libraryClass('library-open') && !libraryClass('library-closed'));
  setMediaMatch(layoutQuery, false);
  check('thao tác thư viện và resize giữ nguyên dữ liệu học', beforeReading === unchangedLearningData());
  check('bố cục hẹp thu mục lục trong bài', byId('sectionOutline').open === false);
  check('rerender bài chỉ giữ một listener theo dõi bố cục', mediaQuery(layoutQuery).handlers.size === 1);
  setMediaMatch(layoutQuery, true);
  check('chuyển sang bố cục rộng mở mục lục trong bài', byId('sectionOutline').open === true);
  byId('sectionNextBtn').onclick();
  check('chuyển phần trên bố cục rộng giữ mục lục mở và cập nhật bộ đếm',
    byId('sectionOutline').open === true && byId('outlineCount').textContent === '2/' + reader.state.sections.length);
  const sectionBeforeResize = reader.state.index;
  setMediaMatch(layoutQuery, false);
  check('thu hẹp bố cục đóng mục lục và giữ vị trí đọc',
    byId('sectionOutline').open === false && reader.state.index === sectionBeforeResize);
  goto('#/');
  check('rời bài gỡ listener bố cục', mediaQuery(layoutQuery).handlers.size === 0);
  setMediaMatch(layoutQuery, true);
  goto('#/learn/c3/start');
  check('vào bài trên bố cục rộng mở mục lục với đúng một listener',
    byId('sectionOutline').open === true && mediaQuery(layoutQuery).handlers.size === 1);
  goto('#/learn/c3/start');
  check('đổi link trong bài không tích lũy listener bố cục', mediaQuery(layoutQuery).handlers.size === 1);
  setMediaMatch(layoutQuery, false);
  check('đổi bố cục và điều hướng không sửa dữ liệu học', beforeReading === unchangedLearningData());
  const originalSections = reader.data.chapters.find(ch => ch.id === 'c3').lines.filter(line => /^### /.test(line));
  const renderedSections = reader.state.sections;
  check('bài có mục tiêu → lý thuyết → tự luyện → tiêu chí',
    renderedSections[0].kind === 'start' && renderedSections[1].kind === 'theory' &&
    renderedSections.at(-2).kind === 'practice' && renderedSections.at(-1).kind === 'check');
  check('mọi mục lý thuyết c3 và anchor cũ đều tồn tại',
    renderedSections.filter(section => section.kind === 'theory').length === originalSections.length &&
    originalSections.every((heading, index) => htmlLog.includes(`id="sec-c3-${index}"`)));
  check('đọc từng phần mặc định chỉ hiện 1 phần',
    document.querySelectorAll('.lesson-section').filter(el => !el.hidden).length === 1 && byId('sectionPrevBtn').disabled);
  check('container phản ánh chế độ đọc từng phần', document.querySelector('.learn-wrap').dataset.readerMode === 'focus');
  byId('sectionOutline').open = true;
  byId('sectionNextBtn').onclick();
  check('nút tiếp chuyển phần, lưu vị trí và cập nhật phần đang đọc',
    reader.state.index === 1 && byId('readerPosition').textContent.startsWith('Phần 2/') &&
    JSON.parse(localStorage.getItem('ielts75_v1')).settings.readingSections.c3 === 1);
  check('chuyển phần cuộn về đầu bài, thu mục lục và giữ focus trong phần đọc',
    document.querySelector('.learn-header')._scrolled === true && byId('sectionOutline').open === false &&
    byId(reader.state.sections[1].id)._focused === true);
  check('mục lục xác định đúng phần đang đọc',
    document.querySelectorAll('.section-toc a')[1].getAttribute('aria-current') === 'step');
  byId('readerAllBtn').onclick();
  check('xem toàn bài hiện tất cả các phần',
    document.querySelectorAll('.lesson-section').every(el => !el.hidden) && byId('readerAllBtn').getAttribute('aria-pressed') === 'true');
  check('container cập nhật chế độ xem toàn bài', document.querySelector('.learn-wrap').dataset.readerMode === 'all');
  byId('readerFocusBtn').onclick();
  check('chuyển lại đọc từng phần giữ đúng vị trí',
    reader.state.index === 1 && document.querySelectorAll('.lesson-section').filter(el => !el.hidden).length === 1);
  check('container khôi phục chế độ đọc từng phần', document.querySelector('.learn-wrap').dataset.readerMode === 'focus');
  goto('#/learn/c3/5');
  check('link mục cụ thể mở đúng phần dù đang đọc từng phần',
    reader.state.chId === 'c3' && reader.state.index === 6 && !document.querySelectorAll('.lesson-section')[6].hidden);
  goto('#/learn/c3/check');
  check('phần tự kiểm tra có nút tiếp vô hiệu hoá',
    reader.state.sections[reader.state.index].kind === 'check' && byId('sectionNextBtn').disabled);
  goto('#/learn/c3');
  check('quay lại bài giữ phần vừa đọc', reader.state.sections[reader.state.index].kind === 'check');
  reader.gotoSection('c3', 5);
  check('tìm trong bài mở phần ẩn trước khi cuộn tới mục',
    reader.state.index === 6 && !document.querySelectorAll('.lesson-section')[6].hidden);
  byId('searchInput').value = 'dao ngu';
  byId('searchInput').oninput();
  check('tìm không dấu có kết quả rõ chủ điểm',
    byId('searchResults').innerHTML.includes('Đảo ngữ') && byId('searchResults').querySelectorAll('.res').length > 0);
  byId('searchInput').onkeydown({ key: 'Enter', preventDefault() {} });
  goto(location.hash);
  check('Enter trong tìm kiếm mở đúng chương và phần', reader.state.chId === 'c14' && reader.state.index === 0);
  byId('searchInput').value = 'khongtimthaychuoi123';
  byId('searchInput').oninput();
  check('tìm không có kết quả có hướng dẫn', byId('searchResults').innerHTML.includes('Chưa có kết quả'));
  byId('searchInput').onkeydown({ key: 'Escape' });
  check('Escape đóng kết quả và cập nhật trạng thái truy cập',
    byId('searchResults').style.display === 'none' && byId('searchInput').getAttribute('aria-expanded') === 'false');
  check('đọc và đổi chế độ không sửa XP, SRS, từ vựng hoặc hoàn thành bài', beforeReading === unchangedLearningData());

  const textOnly = html => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  let intactTheory = true;
  for (const chapter of reader.data.chapters) {
    const sections = reader.buildLessonSections(chapter);
    const chunks = chapter.md.split(/^### /m).slice(1);
    if (new Set(sections.map(section => section.id)).size !== sections.length) intactTheory = false;
    chunks.forEach((chunk, index) => {
      const expected = renderMd('### ' + chunk).replace(/<h2>🔑 ĐÁP ÁN[\s\S]*?<\/h2>/g, '');
      const actual = sections[index + 1].html
        .replace(/<span class="section-label">[\s\S]*?<\/span>/g, '')
        .replace(/<summary>[\s\S]*?<\/summary>/g, '');
      if (textOnly(actual) !== textOnly(expected)) { intactTheory = false; console.error('THEORY MISMATCH', chapter.id, index); }
    });
  }
  check('chia phần giữ toàn bộ lý thuyết, ví dụ, bảng và đáp án của 37 trang', intactTheory);
  goto('#/learn/appD');
  check('learn phụ lục D render', htmlLog.includes('Ngân hàng bài tập'));

  // đánh dấu đã học c1 (giả lập nút)
  goto('#/learn/c1');
  const lb = byId('learnBtn');
  check('nút đánh dấu đã học tồn tại', !!lb);
  lb.onclick();
  check('c1 đã học → nút đổi', htmlLog.includes('bỏ đánh dấu'));
  check('đánh dấu đã học và render lại bài không làm rò listener bố cục', mediaQuery(layoutQuery).handlers.size === 1);

  // QUIZ NGÀY — làm trọn 10 câu
  goto('#/quiz');
  let steps = 0;
  while (!htmlLog.includes('quiz-done') && steps < 30) {
    steps++;
    if (idPresent('clozeInput')) {
      const inp = byId('clozeInput');
      inp.value = 'xyz';
      byId('checkBtn').onclick();
      byId('nextBtn').onclick();
    } else if (idPresent('revealBtn')) {
      byId('revealBtn').onclick();
      byId('yesBtn').onclick();
    } else {
      const opts = document.querySelectorAll('.q-opt');
      if (!opts.length) break;
      opts[0].onclick();
      byId('nextBtn').onclick();
    }
  }
  check('quiz ngày hoàn thành (10 câu)', htmlLog.includes('quiz-done'), 'steps=' + steps);
  const state = JSON.parse(localStorage._d.ielts75_v1);
  const today = Object.keys(state.checkins).sort().pop();
  check('điểm danh ghi nhận quiz', state.checkins[today] && !!state.checkins[today].quiz, JSON.stringify(state.checkins[today]));

  // vào lại #/quiz → màn "đã xong"
  goto('#/quiz');
  check('quiz landing khi đã xong', htmlLog.includes('Quiz hôm nay đã xong'));

  // PRACTICE
  goto('#/quiz/practice/c3');
  check('practice c3 chạy', htmlLog.includes('Luyện tập') && (htmlLog.includes('q-opt') || idPresent('revealBtn') || idPresent('clozeInput')));

  // FLASHCARDS — lật trọn bộ
  goto('#/cards');
  check('decks render', htmlLog.includes('Động từ bất quy tắc'));
  goto('#/cards/verbs');
  let cardSteps = 0;
  while (!htmlLog.includes('Hoàn thành phiên thẻ') && cardSteps < 25) {
    cardSteps++;
    const fc = byId('fc');
    if (!fc) break;
    fc.onclick();
    byId('fcYes').onclick();
  }
  check('lật hết 20 thẻ verbs', htmlLog.includes('Hoàn thành phiên thẻ'), 'steps=' + cardSteps);

  // EXERCISES
  goto('#/ex');
  check('ds bài tập render', htmlLog.includes('Ngân hàng bài tập') && htmlLog.includes('D1') === false ? true : htmlLog.includes('câu'));
  goto('#/ex/D4');
  check('bài D4 render', htmlLog.includes('Câu điều kiện') && htmlLog.includes('Hiện đáp án'));
  const ansBtns = document.querySelectorAll('.ans-btn');
  check('D4 có 6 nút đáp án', ansBtns.length === 6, '=' + ansBtns.length);
  ansBtns[0].onclick();
  byId('toggleAll').onclick();
  goto('#/ex/F1');
  check('bài F1 render', htmlLog.includes('Viết lại câu'));

  // VOCAB
  goto('#/vocab');
  check('trang từ vựng render', htmlLog.includes('Sổ từ vựng') && idPresent('vocabAdd'));
  byId('vw').value = 'ubiquitous';
  byId('vm').value = 'có mặt khắp nơi';
  byId('vex').value = '';
  byId('vocabSearch').value = '';
  byId('vocabAdd').onclick();
  check('thêm từ hiển thị trong danh sách', htmlLog.includes('ubiquitous'));
  const stV = JSON.parse(localStorage._d.ielts75_v1);
  check('từ lưu vào store', stV.vocab && stV.vocab.length === 1, JSON.stringify(stV.vocab));
  goto('#/cards');
  check('deck từ vựng xuất hiện', htmlLog.includes('Sổ từ vựng của bạn'));
  goto('#/cards/vocab');
  let vSteps = 0;
  while (!htmlLog.includes('Hoàn thành phiên thẻ') && vSteps < 5) {
    vSteps++;
    const fc = byId('fc');
    if (!fc) break;
    fc.onclick();
    byId('fcYes').onclick();
  }
  check('ôn hết deck từ vựng (1 thẻ)', htmlLog.includes('Hoàn thành phiên thẻ'), 'steps=' + vSteps);
  const stV2 = JSON.parse(localStorage._d.ielts75_v1);
  const vId = stV2.vocab[0].id;
  check('SRS ghi nhận từ đã ôn', stV2.items && stV2.items[vId] && stV2.items[vId].b === 1, JSON.stringify(stV2.items && stV2.items[vId]));

  // AWARDS
  goto('#/awards');
  check('trang thành tích render', htmlLog.includes('Huy hiệu') && htmlLog.includes('Band'));
  check('có huy hiệu đã mở', htmlLog.includes('badge earned'), (htmlLog.match(/badge earned/g) || []).length + ' earned');

  // HOME sau khi học
  goto('#/');
  check('home: quiz đã xong hiển thị', htmlLog.includes('Đã hoàn thành:'));
  check('home: streak >= 1', htmlLog.includes('Đã điểm danh hôm nay'));
  check('home: nhiệm vụ ngày hiển thị', htmlLog.includes('Nhiệm vụ hôm nay'));
  check('home: 3/3 nhiệm vụ xong', htmlLog.includes('3/3'), (htmlLog.match(/Nhiệm vụ hôm nay — \d\/3/) || [''])[0]);
  check('home: nút đặt ngày thi', htmlLog.includes('Đặt ngày thi'));
  check('home: thẻ cấp độ Band', htmlLog.includes('level-band'));
  check('home: thẻ ghi nhớ tài liệu', htmlLog.includes('Ghi nhớ tài liệu') && htmlLog.includes('Thuộc'));
  check('home: thẻ sổ từ vựng', htmlLog.includes('Sổ từ vựng'));
  const stI2 = JSON.parse(localStorage._d.ielts75_v1);
  check('items SRS có dữ liệu sau quiz+thẻ', Object.keys(stI2.items || {}).length >= 25, '=' + Object.keys(stI2.items || {}).length);
  const st2 = JSON.parse(localStorage._d.ielts75_v1);
  check('XP tích lũy > 0', st2.gam && st2.gam.xp > 0, 'xp=' + (st2.gam && st2.gam.xp));
  check('có huy hiệu trong store', Object.keys(st2.gam.badges).length >= 1, Object.keys(st2.gam.badges).join(','));

  // Boot the real app again against populated storage, as a browser reload does.
  goto('#/learn/c3/5');
  byId('readerAllBtn').onclick();
  setMediaMatch(layoutQuery, true);
  byId('libraryToggle').onclick();
  const progressBeforeReload = unchangedLearningData();
  const savedSettings = JSON.parse(localStorage.getItem('ielts75_v1')).settings;
  run(window, document, location, localStorage, fetch, confirm, alert, URL, Blob, FileReader, (fn) => fn(), console);
  await new Promise(r => setImmediate(r));
  check('tải lại app khôi phục chế độ xem và phần đang đọc',
    window.__testReader.state.chId === 'c3' && window.__testReader.state.mode === savedSettings.readerMode &&
    window.__testReader.state.index === savedSettings.readingSections.c3);
  check('tải lại app giữ nguyên XP, tiến độ, SRS, quiz, huy hiệu và từ vựng',
    progressBeforeReload === unchangedLearningData());
  check('tải lại app khôi phục tùy chọn thu thư viện desktop',
    savedSettings.libraryCollapsed === true && !libraryOpen() && libraryClass('library-closed'));

  console.log(fails === 0 ? '\nALL PASS (' + steps + ' quiz steps)' : '\n' + fails + ' FAILED');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error('CRASH', e); process.exit(1); });
