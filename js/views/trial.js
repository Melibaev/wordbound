// Trial player: story-integrated exercises. Route: #/trial/<episodeId>[/<trialId>]
import * as store from '../store.js';
import { db, sortedEpisodes } from '../data.js';
import { loadTrials, trialPassed, trialsDone, unlockTarget } from '../trials.js';
import { playTrial, stopAudio } from '../audio.js';
import { esc, shuffle, reduceMotion, wait } from '../util.js';
import { icon, errorBox, bar, showScreen } from '../ui.js';
import { tokensHTML, sysWindowHTML } from '../sysmsg.js';
import { wordPop } from '../wordpop.js';

// ---------- answer checking ----------
export function norm(s) {
  return String(s == null ? '' : s)
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/ё/g, 'е')
    .replace(/[^\p{L}\p{N}'\s]/gu, ' ')
    .replace(/(^|\s)'+/g, '$1')
    .replace(/'+(?=\s|$)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
const accepted = (step) => [step.answer, ...(Array.isArray(step.accept) ? step.accept : [])].filter((x) => typeof x === 'string').map(norm);
const isChoice = (st) => Array.isArray(st.options) && st.options.length > 1 && Number.isInteger(st.answer);
const LETTERS = 'ABCDEFGH';

// ---------- markup helpers ----------
const charName = (id) => {
  const c = id ? db.chars.get(id) : null;
  return c ? c.name : id ? String(id).replace(/_/g, ' ') : '';
};
const ruTag = (ru) => (ru ? `<button class="rutag" data-ru aria-label="Показать перевод" aria-expanded="false">RU</button>` : '');
const spk = (voice, delivery, extra = '') =>
  `<button class="spk" data-say data-v="${esc(voice || '')}" data-d="${esc(delivery || '')}" ${extra} aria-label="Озвучить">${icon('speaker')}</button>`;

// a character line: name tag + speech bubble; the System speaks through a System window
function lineHTML(l, cls = '') {
  if (!l || !l.en) return '';
  const who = l.who || '';
  if (who === 'system') {
    return `<div class="tline ${cls}">${sysWindowHTML({ kind: 'system', title: 'SYSTEM', rows: [{ en: l.en, ru: l.ru, attrs: `data-v="system" data-d="${esc(l.delivery || '')}"` }] })}</div>`;
  }
  const nm = charName(who);
  const tag = nm ? `<div class="ctag c-${esc(who)}"><span class="av">${esc(nm.slice(0, 1))}</span>${esc(nm)}</div>` : '';
  const type = who === 'narration' ? 'cap' : 'bub';
  const body = `<p class="en">${tokensHTML(l.en)}</p>${spk(who, l.delivery)}${ruTag(l.ru)}${l.ru ? `<p class="ru" hidden>${esc(l.ru)}</p>` : ''}`;
  if (type === 'cap') return `<div class="tline ${cls}"><div class="cap cap-en">${body}</div></div>`;
  return `<div class="tline ${cls}">${tag}<div class="bub bub-speech">${body}</div></div>`;
}

function winHTML(w, fallbackKind) {
  if (!w || !Array.isArray(w.lines) || !w.lines.length) return '';
  const kind = w.kind || fallbackKind || 'system';
  return sysWindowHTML({
    kind,
    title: w.title || undefined,
    rows: w.lines.map((l) => ({ en: l.en, ru: l.ru, attrs: 'data-v="system" data-d=""' })),
  });
}

function promptHTML(p) {
  if (!p || !p.en) return '';
  return `<div class="tprompt"><span class="tp-lab">ЗАДАНИЕ</span><p class="en">${tokensHTML(p.en)}</p>${ruTag(p.ru)}${p.ru ? `<p class="ru" hidden>${esc(p.ru)}</p>` : ''}</div>`;
}

const hearts = (lives, max) =>
  `<span class="lives" role="img" aria-label="Дыхание: ${lives} из ${max}">${Array.from({ length: max }, (_, i) => `<i class="${i < lives ? 'on' : ''}"></i>`).join('')}</span>`;

function head(ep, trial, lives, pct, exitHref) {
  return `<header class="ttop"><a class="icon-btn" href="${esc(exitHref)}" aria-label="Выйти">${icon('close')}</a>
<div class="ttitle"><small>ИСПЫТАНИЕ</small><b>${esc(trial.title || '')}</b></div>
<div class="tlives"><small>ДЫХАНИЕ</small>${hearts(lives, trial.lives || 3)}</div></header>
${bar(pct)}`;
}

// ---------- exercise widgets: each draws into `area` and calls done(ok) once ----------
function playClip(epId, voice, delivery, text) {
  return playTrial(epId, voice || '', delivery || '', text || '');
}

function optionsUI(area, opts, answer, done, { shuffleOn = true, letters = true } = {}) {
  const items = opts.map((o, i) => ({ o, i }));
  const list = shuffleOn ? shuffle(items) : items;
  area.innerHTML = `<div class="opts">${list
    .map((x, k) => `<button class="opt" data-i="${x.i}">${letters ? `<span class="k">${LETTERS[k] || k + 1}</span>` : ''}<span>${esc(x.o)}</span></button>`)
    .join('')}</div>`;
  const btns = Array.from(area.querySelectorAll('.opt'));
  btns.forEach((b) =>
    b.addEventListener('click', () => {
      const i = Number(b.dataset.i);
      const ok = i === answer;
      btns.forEach((o) => {
        o.disabled = true;
        if (Number(o.dataset.i) === answer) o.classList.add('good');
      });
      if (!ok) b.classList.add('bad');
      done(ok);
    })
  );
}

function typeUI(area, step, done) {
  area.innerHTML = `<div class="typebox"><input class="tinput" type="text" inputmode="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="Напиши ответ…" aria-label="Ответ">
<button class="btn primary" data-check><span>Проверить</span></button></div>`;
  const inp = area.querySelector('.tinput');
  const go = () => {
    const v = norm(inp.value);
    if (!v) return;
    inp.disabled = true;
    area.querySelector('[data-check]').disabled = true;
    const ok = accepted(step).includes(v);
    inp.classList.add(ok ? 'good' : 'bad');
    done(ok);
  };
  area.querySelector('[data-check]').addEventListener('click', go);
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') go();
  });
  setTimeout(() => {
    try {
      inp.focus({ preventScroll: true });
    } catch (e) {
      /* ignore */
    }
  }, 350);
}

function buildUI(area, step, done) {
  const words = String(step.answer || '').trim().split(/\s+/).filter(Boolean);
  const extra = (Array.isArray(step.distractors) ? step.distractors : []).map(String);
  let uid = 0;
  const tiles = shuffle([...words, ...extra].map((w) => ({ id: uid++, w })));
  const chosen = [];
  area.innerHTML = `<div class="bslots" aria-label="Твой ответ"></div><div class="btiles"></div>
<button class="btn primary" data-check disabled><span>Проверить</span></button>`;
  const slots = area.querySelector('.bslots');
  const bank = area.querySelector('.btiles');
  const check = area.querySelector('[data-check]');
  let locked = false;
  const draw = () => {
    slots.innerHTML = chosen.length
      ? chosen.map((t) => `<button class="tile-w in" data-id="${t.id}">${esc(t.w)}</button>`).join('')
      : '<span class="bph">Нажимай на слова по порядку</span>';
    bank.innerHTML = tiles
      .map((t) => `<button class="tile-w${chosen.includes(t) ? ' used' : ''}" data-id="${t.id}"${chosen.includes(t) ? ' disabled' : ''}>${esc(t.w)}</button>`)
      .join('');
    check.disabled = !chosen.length;
  };
  draw();
  area.addEventListener('click', (e) => {
    if (locked) return;
    const b = e.target.closest('.tile-w');
    if (!b) return;
    const t = tiles.find((x) => x.id === Number(b.dataset.id));
    if (!t) return;
    if (chosen.includes(t)) chosen.splice(chosen.indexOf(t), 1);
    else chosen.push(t);
    draw();
  });
  check.addEventListener('click', () => {
    if (locked || !chosen.length) return;
    locked = true;
    const ok = accepted(step).includes(norm(chosen.map((t) => t.w).join(' ')));
    slots.classList.add(ok ? 'good' : 'bad');
    area.querySelectorAll('.tile-w').forEach((x) => (x.disabled = true));
    check.disabled = true;
    done(ok);
  });
}

function matchUI(area, step, done) {
  const pairs = (Array.isArray(step.pairs) ? step.pairs : []).filter((p) => Array.isArray(p) && p.length >= 2);
  const L = shuffle(pairs.map((p, i) => ({ t: p[0], i })));
  const R = shuffle(pairs.map((p, i) => ({ t: p[1], i })));
  area.innerHTML = `<div class="match"><div class="mcol">${L.map((x) => `<button class="mt" data-s="l" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div>
<div class="mcol">${R.map((x) => `<button class="mt" data-s="r" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div></div>`;
  let sel = null;
  let left = pairs.length;
  let mistakes = 0;
  area.addEventListener('click', (e) => {
    const b = e.target.closest('.mt');
    if (!b || b.classList.contains('ok')) return;
    if (!sel || sel.dataset.s === b.dataset.s) {
      if (sel) sel.classList.remove('sel');
      sel = sel === b ? null : b;
      if (sel) sel.classList.add('sel');
      return;
    }
    const a = sel;
    sel = null;
    a.classList.remove('sel');
    if (a.dataset.i === b.dataset.i) {
      a.classList.add('ok');
      b.classList.add('ok');
      a.disabled = b.disabled = true;
      if (--left === 0) done(mistakes === 0);
    } else {
      mistakes++;
      [a, b].forEach((x) => {
        x.classList.add('shake');
        setTimeout(() => x.classList.remove('shake'), 400);
      });
    }
  });
}

function fillUI(area, step, done) {
  const parts = String(step.sentence || '___').split('___');
  const gapEl = (txt, cls) => `<span class="gap ${cls || ''}">${esc(txt || '      ')}</span>`;
  const sentence = (fill, cls) => parts.map((p) => tokensHTML(p)).join(gapEl(fill, cls));
  area.innerHTML = `<div class="tfill"><p class="en">${sentence('', '')}</p></div><div class="fx"></div>`;
  const fx = area.querySelector('.fx');
  const reveal = (txt, ok) => {
    area.querySelector('.tfill .en').innerHTML = sentence(txt, ok ? 'good' : 'bad');
  };
  if (isChoice(step)) {
    optionsUI(fx, step.options, step.answer, (ok) => {
      reveal(step.options[step.answer], true);
      done(ok);
    }, { letters: false });
  } else {
    typeUI(fx, step, (ok) => {
      reveal(String(step.answer), true);
      done(ok);
    });
  }
}

function pickVoiceUI(area, step, done, epId) {
  const clips = Array.isArray(step.clips) ? step.clips : [];
  area.innerHTML = `<div class="clips">${clips
    .map(
      (c, i) => `<div class="clip" data-i="${i}"><button class="btn play-clip" data-play="${i}" aria-label="Слушать голос ${LETTERS[i]}">${icon('play')}<span>Голос ${LETTERS[i]}</span></button>
<button class="btn pick" data-pick="${i}"><span>${esc(step.options && step.options[i] ? step.options[i] : 'Это он')}</span></button></div>`
    )
    .join('')}</div>`;
  let locked = false;
  area.addEventListener('click', (e) => {
    const p = e.target.closest('[data-play]');
    if (p) {
      const c = clips[Number(p.dataset.play)] || {};
      playClip(epId, c.voice, c.delivery, c.audio_text || step.audio_text);
      return;
    }
    const k = e.target.closest('[data-pick]');
    if (!k || locked) return;
    locked = true;
    const i = Number(k.dataset.pick);
    const ok = i === step.answer;
    area.querySelectorAll('.clip').forEach((c) => {
      const ci = Number(c.dataset.i);
      c.querySelectorAll('button').forEach((b) => (b.disabled = b.dataset.play == null));
      if (ci === step.answer) c.classList.add('good');
      else if (ci === i) c.classList.add('bad');
    });
    stopAudio();
    done(ok);
  });
}

function listenUI(area, step, done, epId) {
  const say = () => playClip(epId, step.voice, step.delivery, step.audio_text);
  area.innerHTML = `<button class="btn big listen" data-listen>${icon('speaker')}<span>Слушать</span><small>нажми, чтобы послушать ещё раз</small></button><div class="lx"></div>`;
  area.querySelector('[data-listen]').addEventListener('click', say);
  const lx = area.querySelector('.lx');
  if (isChoice(step)) optionsUI(lx, step.options, step.answer, done);
  else typeUI(lx, step, done);
  setTimeout(say, 450);
}

function correctText(step) {
  if (step.type === 'match') return '';
  if (isChoice(step)) return String(step.options[step.answer]);
  if (typeof step.answer === 'string') return step.answer;
  return '';
}

// ---------- one step: resolves { ok } after the learner taps "Дальше" ----------
async function playStep(root, ctx, env, step, idx, total, lives) {
  const { ep, trial } = env;
  const pct = (idx / total) * 100;
  root.innerHTML = `<div class="trial step-${esc(step.type)}">${head(ep, trial, lives, pct, env.exit)}
<div class="tbody tstep">
${step.story ? lineHTML(step.story, 'enter') : ''}
${promptHTML(step.prompt)}
<div class="xarea"></div>
<div class="tfb" aria-live="polite"></div>
<button class="btn primary big" id="tnext" hidden><span>Дальше</span></button>
</div></div>`;
  window.scrollTo(0, 0);
  const area = root.querySelector('.xarea');
  const fb = root.querySelector('.tfb');
  const nx = root.querySelector('#tnext');
  return new Promise((resolve) => {
    let over = false;
    const done = (ok) => {
      if (over) return;
      over = true;
      const line = ok ? step.success : step.fail;
      const ans = !ok ? correctText(step) : '';
      fb.innerHTML = `<div class="stamp stampin ${ok ? 'ok' : 'no'}">${ok ? 'ВЕРНО!' : 'НЕ ТАК'}</div>${
        ans ? `<p class="tans">Правильно: <b>${esc(ans)}</b></p>` : ''
      }${line ? lineHTML(line, 'enter') : ''}`;
      const left = ok ? lives : lives - 1;
      if (!ok) {
        const lv = root.querySelector('.lives');
        if (lv) {
          lv.outerHTML = hearts(left, trial.lives || 3);
          const li = root.querySelectorAll('.lives i')[left];
          if (li) li.classList.add('lose');
        }
      }
      nx.hidden = false;
      nx.querySelector('span').textContent = !ok && left <= 0 ? 'Дальше' : idx + 1 >= total ? 'Завершить' : 'Дальше';
      setTimeout(() => nx.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'nearest' }), 80);
      nx.onclick = () => {
        stopAudio();
        resolve({ ok });
      };
    };
    switch (step.type) {
      case 'choose':
        optionsUI(area, step.options || [], step.answer, done, { shuffleOn: step.shuffle !== false });
        break;
      case 'build':
        buildUI(area, step, done);
        break;
      case 'type':
        typeUI(area, step, done);
        break;
      case 'listen':
        listenUI(area, step, done, ep.id);
        break;
      case 'match':
        matchUI(area, step, done);
        break;
      case 'fill':
        fillUI(area, step, done);
        break;
      case 'pick_voice':
        pickVoiceUI(area, step, done, ep.id);
        break;
      default:
        area.innerHTML = '<p class="muted">Неизвестный тип задания, пропускаем.</p>';
        setTimeout(() => done(true), 600);
    }
  });
}

// ---------- screens ----------
async function introScreen(root, ctx, env, resumed) {
  const { trial } = env;
  const intro = trial.intro || {};
  const act = await showScreen(
    root,
    `<div class="trial intro">${head(env.ep, trial, trial.lives || 3, 0, env.exit)}<div class="tbody">
<div class="stamp tilt">${esc(trial.titleRu || 'ИСПЫТАНИЕ')}</div>
${intro.window ? winHTML(intro.window, 'quest') : ''}
${(Array.isArray(intro.story) ? intro.story : []).map((l) => lineHTML(l, 'enter')).join('')}
<button class="btn primary big" data-act="go"><span>${resumed ? 'Продолжить' : 'Начать'}</span></button></div></div>`
  );
  return act;
}

async function runTrial(root, ctx, env) {
  const { trial, ep } = env;
  const maxLives = trial.lives || 3;
  const steps = trial.steps;
  const need = Math.ceil((trial.pass || 0.8) * steps.length - 1e-9);
  const prior = store.trialRec(trial.id);
  let prog = prior && !prior.passed && prior.prog ? prior.prog : null;
  let first = true;
  while (ctx.alive) {
    let i = 0;
    let lives = maxLives;
    let correct = 0;
    let resumed = false;
    if (first && prog && prog.i > 0 && prog.i < steps.length) {
      i = prog.i;
      lives = prog.lives;
      correct = prog.correct;
      resumed = true;
    }
    first = false;
    const act0 = await introScreen(root, ctx, env, resumed);
    if (!ctx.alive || act0 !== 'go') return null;
    while (i < steps.length && lives > 0 && ctx.alive) {
      const r = await playStep(root, ctx, env, steps[i], i, steps.length, lives);
      if (!ctx.alive) return null;
      if (r.ok) correct++;
      else lives--;
      i++;
      store.setTrialRec(trial.id, { prog: { i, lives, correct } });
      // fail as soon as it is mathematically impossible to reach the pass mark
      if (lives <= 0 || correct + (steps.length - i) < need) {
        lives = 0;
        break;
      }
    }
    if (!ctx.alive) return null;
    const ratio = correct / steps.length;
    const passed = lives > 0 && correct >= need;
    const rec = store.trialRec(trial.id) || {};
    if (!passed) {
      store.setTrialRec(trial.id, { prog: null, attempts: (rec.attempts || 0) + 1 });
      const act = await showScreen(
        root,
        `<div class="trial fail">${head(ep, trial, 0, (i / steps.length) * 100, env.exit)}<div class="tbody">
<div class="stamp big-stamp no">ПРОВАЛ</div>
${sysWindowHTML({ kind: 'warning', title: 'WARNING', rows: [{ en: 'Trial failed.', ru: 'Испытание провалено.', attrs: 'data-v="system" data-d=""' }] })}
<p class="center muted">Верных ответов: <b>${correct}</b> из ${steps.length}. Нужно не меньше ${need}. Попробуй ещё раз: слова никуда не денутся.</p>
<button class="btn primary big" data-act="again"><span>Заново</span></button>
<a class="btn" href="${esc(env.exit)}">К списку испытаний</a></div></div>`
      );
      if (!ctx.alive) return null;
      prog = null;
      continue;
    }
    store.setTrialRec(trial.id, {
      passed: true,
      date: new Date().toISOString().slice(0, 10),
      best: Math.max(ratio, rec.best || 0),
      attempts: (rec.attempts || 0) + 1,
      prog: null,
    });
    const o = trial.outro || {};
    await showScreen(
      root,
      `<div class="trial outro">${head(ep, trial, lives, 100, env.exit)}<div class="tbody">
<div class="stamp big-stamp">ИСПЫТАНИЕ ПРОЙДЕНО</div>
${o.window ? winHTML(o.window, 'reward') : ''}
${(Array.isArray(o.story) ? o.story : []).map((l) => lineHTML(l, 'enter')).join('')}
<div class="card stats two"><div><b>${correct}/${steps.length}</b><small>верно</small></div><div><b>${lives}/${maxLives}</b><small>дыхания</small></div></div>
<button class="btn primary big" data-act="ok"><span>Дальше</span></button></div></div>`
    );
    return 'passed';
  }
  return null;
}

function hubHTML(ep, file, next) {
  const all = trialsDone(file);
  const rows = file.trials
    .map((t, k) => {
      const rec = store.trialRec(t.id);
      const passed = !!(rec && rec.passed);
      const open = k === 0 || trialPassed(file.trials[k - 1].id);
      const inProg = !passed && rec && rec.prog && rec.prog.i > 0;
      const state = passed
        ? `<span class="stamp ok">${icon('check')}</span>`
        : !open
          ? '<span class="lock" aria-label="Закрыто">🔒</span>'
          : `<span class="stamp tilt">${inProg ? rec.prog.i + '/' + t.steps.length : 'ВХОД'}</span>`;
      return `<button class="card trow${passed ? ' done' : ''}${open && !passed ? ' next' : ''}" ${open ? `data-act="t:${k}"` : 'disabled'}>
<div class="ep-num">${k + 1}</div><div class="ep-body"><h3>${esc(t.title || t.id)}</h3><p class="muted">${esc(t.titleRu || '')} · ${t.steps.length} заданий</p></div>
<div class="ep-state">${state}</div></button>`;
    })
    .join('');
  const unlock = all
    ? `<div class="card unlocked"><div class="stamp tilt">ГЛАВА ОТКРЫТА</div><p>${next ? `Эпизод ${next.n} «${esc(next.title)}» доступен.` : 'Все испытания пройдены.'}</p></div>`
    : `<p class="muted center">Пройди все испытания, чтобы открыть ${next ? `эпизод ${next.n}` : 'следующую главу'}.</p>`;
  return `<div class="screen trialhub"><header class="topbar"><a class="icon-btn" href="#/" aria-label="Домой">${icon('back')}</a><h1>Испытания</h1><span class="tb-right"></span></header>
<div class="hub-title"><span class="stamp tilt">S${ep.season || 1}·E${String(ep.n).padStart(2, '0')}</span><h2>${esc(file.title || ep.title)}</h2><p class="muted">${esc(file.titleRu || ep.titleRu || '')}</p></div>
${rows}${unlock}
${all ? `<button class="btn primary big" data-act="next"><span>${next ? 'Следующая глава' : 'Домой'}</span></button>` : ''}</div>`;
}

export async function mount(root, ctx) {
  const epId = ctx.args[0];
  const ep = sortedEpisodes().find((e) => e.id === epId);
  const back = `<a class="btn" href="#/episodes">К эпизодам</a>`;
  if (!ep) {
    root.innerHTML = `<div class="screen">${errorBox('Эпизод не найден.', back)}</div>`;
    return;
  }
  const file = await loadTrials(epId);
  if (!ctx.alive) return;
  if (!file) {
    root.innerHTML = `<div class="screen">${errorBox('У этого эпизода пока нет испытаний.', back)}</div>`;
    return;
  }
  if (!store.get().episodes[epId]?.done) {
    const a = await showScreen(
      root,
      `<div class="screen center-screen"><div class="stamp tilt">СНАЧАЛА ЧИТАЙ</div><h1>Испытания после эпизода</h1><p class="muted">Дочитай эпизод и ответь на квиз — тогда откроются испытания.</p>
<button class="btn primary big" data-act="go"><span>К эпизоду</span></button><a class="btn" href="#/">Домой</a></div>`
    );
    if (ctx.alive && a === 'go') location.hash = '#/session/' + encodeURIComponent(epId);
    return;
  }
  const wp = wordPop(root);
  // shared delegated handlers (audio, RU toggle)
  const onClick = (e) => {
    const say = e.target.closest('[data-say]');
    if (say) {
      const box = say.closest('.bub, .cap, .sysrow');
      const en = box && box.querySelector('.en');
      if (en) playTrial(epId, say.dataset.v || '', say.dataset.d || '', en.textContent);
      return;
    }
    const ru = e.target.closest('[data-ru]');
    if (ru) {
      const box = ru.closest('.bub, .cap, .sysrow, .tprompt');
      const p = box && box.querySelector('.ru');
      if (p) {
        p.hidden = !p.hidden;
        ru.classList.toggle('on', !p.hidden);
        ru.setAttribute('aria-expanded', String(!p.hidden));
      }
    }
  };
  root.addEventListener('click', onClick);
  ctx.onCleanup(() => {
    wp.destroy();
    root.removeEventListener('click', onClick);
    stopAudio();
  });
  const exit = '#/trial/' + encodeURIComponent(epId);
  const next = unlockTarget(epId, file);

  const only = ctx.args[1];
  let direct = only ? file.trials.find((t) => t.id === only) : null;
  while (ctx.alive) {
    let trial = direct;
    direct = null;
    if (!trial) {
      root.innerHTML = '';
      const act = await showScreen(root, hubHTML(ep, file, next));
      if (!ctx.alive) return;
      if (act === 'next') {
        location.hash = next ? '#/session/' + encodeURIComponent(next.id) : '#/';
        return;
      }
      const k = Number(String(act).slice(2));
      trial = file.trials[k];
      if (!trial) return;
    }
    const r = await runTrial(root, ctx, { ep, trial, exit });
    if (!ctx.alive) return;
    if (r !== 'passed') {
      location.hash = exit;
      return;
    }
    await wait(0);
  }
}
