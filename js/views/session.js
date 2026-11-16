// Daily session orchestrator: reviews -> (word intro -> reading -> grammar -> quiz -> summary).
import * as store from '../store.js';
import { db, loadEpisode, nextEpisode, episodeAfter, sortedEpisodes } from '../data.js';
import { estimate, computeLevel, knownByLevel } from '../levels.js';
import { esc, plural } from '../util.js';
import { icon, bar, errorBox, showScreen } from '../ui.js';
import { dueIds, WEEK_GOAL } from './home.js';
import { runReviews } from './review.js';
import { runIntro } from './intro.js';
import { readEpisode } from './reader.js';
import { runQuiz } from './quiz.js';
import { weekKeys } from '../util.js';
import { loadTrials, trialsDone, blockerFor } from '../trials.js';

const CAP = 30;
const CAP_AWAY = 15;

function curLevel() {
  return computeLevel(estimate(store.get(), db.byId));
}

async function reviewPhase(root, ctx) {
  const s = store.get();
  const away = store.awayDays() >= 3 && s.days.length > 0;
  let ids = dueIds().sort((a, b) => s.words[a].due - s.words[b].due);
  if (away) {
    await showScreen(
      root,
      `<div class="screen center-screen"><div class="stamp tilt">С ВОЗВРАЩЕНИЕМ</div>
<h1>Давно не виделись!</h1>
<p>Тебя не было ${store.awayDays()} ${plural(store.awayDays(), ['день', 'дня', 'дней'])}. Ничего страшного: начнём спокойно${ids.length ? ' с короткого повторения' : ''}.</p>
<button class="btn primary big" data-act="ok"><span>Поехали</span></button></div>`
    );
    if (!ctx.alive) return null;
  }
  ids = ids.slice(0, away ? CAP_AWAY : CAP);
  if (!ids.length) return { count: 0, skipped: true };
  const r = await runReviews(root, ids, ctx);
  if (!ctx.alive) return null;
  store.markStudied();
  return r;
}

async function loadScreen(root, ctx, meta) {
  root.innerHTML = `<div class="screen center-screen"><div class="spinner"></div><p class="muted">Загружаю эпизод…</p></div>`;
  try {
    return await loadEpisode(meta);
  } catch (e) {
    if (!ctx.alive) return null;
    const act = await showScreen(
      root,
      `<div class="screen">${errorBox('Не удалось загрузить эпизод. Проверь соединение.', '<button class="btn primary" data-act="retry">Повторить</button> <a class="btn" href="#/">Домой</a>')}</div>`
    );
    if (!ctx.alive) return null;
    return act === 'retry' ? loadScreen(root, ctx, meta) : null;
  }
}

// Returns 'next' | 'home' | null (aborted).
async function episodePhase(root, ctx, meta) {
  const ep = await loadScreen(root, ctx, meta);
  if (!ep || !ctx.alive) return null;
  const st = store.get();
  const before = curLevel();

  const intro = ep.newWords
    .map((id) => db.byId.get(id))
    .filter((w) => w && !st.words[w.id] && !knownByLevel(w, st));
  let learnedN = 0;
  if (intro.length) {
    const r = await runIntro(root, intro, ctx);
    if (!ctx.alive) return null;
    learnedN = r.learned + r.known;
  }

  await readEpisode(root, ep, ctx, { finishLabel: ep.grammarNote || ep.quiz.length ? 'Дальше' : 'Завершить' });
  if (!ctx.alive) return null;

  if (ep.grammarNote) {
    const g = ep.grammarNote;
    const ex = (Array.isArray(g.examples) ? g.examples : [])
      .map((e) => `<li><span class="en">${esc(e.en)}</span><span class="muted">${esc(e.ru)}</span></li>`)
      .join('');
    await showScreen(
      root,
      `<div class="screen grammar"><header class="topbar"><a class="icon-btn" href="#/" aria-label="Выйти">${icon('close')}</a><h1>Грамматика</h1><span class="tb-right"></span></header>
<article class="card"><div class="stamp tilt">ПРАВИЛО</div><h2>${esc(g.title || '')}</h2>
<div class="gbody">${String(g.body || '')
        .split(/\n+/)
        .filter(Boolean)
        .map((p) => `<p>${esc(p)}</p>`)
        .join('')}</div>
${ex ? `<ul class="gex">${ex}</ul>` : ''}</article>
<button class="btn primary big" data-act="ok"><span>К вопросам</span></button></div>`
    );
    if (!ctx.alive) return null;
  }

  const quiz = await runQuiz(root, ep, ctx);
  if (!ctx.alive) return null;

  store.recordEpisode(ep.id, { score: quiz.score, total: quiz.total });
  store.markStudied();

  const after = curLevel();
  const nextMeta = episodeAfter(ep.id);
  const tfile = await loadTrials(ep.id);
  const pending = !!tfile && !trialsDone(tfile);
  const wkDone = weekKeys().filter((k) => st.days.includes(k)).length;
  const gained = after.est - before.est;
  const act = await showScreen(
    root,
    `<div class="screen summary">
<div class="stamp tilt big-stamp">ЭПИЗОД ПРОЙДЕН</div>
<h1 class="center">${esc(ep.title)}</h1>
<div class="card stats">
  <div><b>${learnedN}</b><small>${plural(learnedN, ['новое слово', 'новых слова', 'новых слов'])}</small></div>
  <div><b>${quiz.total ? quiz.score + '/' + quiz.total : '—'}</b><small>квиз</small></div>
  <div><b>${store.streak()}</b><small>${plural(store.streak(), ['день подряд', 'дня подряд', 'дней подряд'])}</small></div>
</div>
<div class="card"><div class="lv-row"><span class="lv-mini">${esc(after.level)}</span>${bar(after.progress * 100)}<small class="muted">${gained > 0 ? '+' + gained : ''}</small></div>
<p class="muted">${after.next ? `До ${esc(after.next)}: ещё ${after.toNext} ${plural(after.toNext, ['слово', 'слова', 'слов'])}.` : 'Максимальный уровень!'}
Неделя: ${wkDone}/${WEEK_GOAL} ${wkDone >= WEEK_GOAL ? '— цель выполнена!' : 'дней.'}</p></div>
${pending ? `<div class="teaser"><span class="stamp">ИСПЫТАНИЯ</span> Следующая глава откроется, когда пройдёшь испытания этого эпизода.</div>
<button class="btn primary big" data-act="trial"><span>К испытаниям</span></button>
<button class="btn" data-act="home">Позже</button>` : `${nextMeta ? '' : '<div class="teaser"><span class="stamp">СКОРО</span> Новые эпизоды скоро появятся.</div>'}
${nextMeta ? '<button class="btn primary big" data-act="next"><span>Следующая глава</span></button>' : ''}
<button class="btn${nextMeta ? '' : ' primary big'}" data-act="home">${nextMeta ? 'Готово на сегодня' : '<span>Готово</span>'}</button>`}
</div>`
  );
  if (!ctx.alive) return null;
  if (act === 'trial') return { trial: ep.id };
  return act === 'next' ? { next: nextMeta } : 'home';
}

export async function mount(root, ctx) {
  if (!db.story) {
    root.innerHTML = `<div class="screen">${errorBox('Эпизоды недоступны. Проверь соединение и попробуй снова.', '<a class="btn" href="#/">Домой</a>')}</div>`;
    return;
  }
  const forced = ctx.args[0];
  let meta = null;
  if (forced) {
    meta = sortedEpisodes().find((e) => e.id === forced) || null;
  } else {
    const r = await reviewPhase(root, ctx);
    if (!ctx.alive || r === null) return;
    meta = nextEpisode(store.get());
    const blk0 = await blockerFor(meta);
    if (blk0) {
      await showScreen(
        root,
        `<div class="screen center-screen"><div class="stamp tilt">ЗАПЕРТО</div><h1>Глава закрыта</h1>
<p>Пройди испытания эпизода ${blk0.ep.n}, чтобы читать дальше.</p>
<button class="btn primary big" data-act="go"><span>К испытаниям</span></button><button class="btn" data-act="home">Домой</button></div>`
      ).then((a) => {
        if (ctx.alive) location.hash = a === 'go' ? '#/trial/' + encodeURIComponent(blk0.ep.id) : '#/';
      });
      return;
    }
    if (!r.skipped) {
      const act = await showScreen(
        root,
        `<div class="screen center-screen"><div class="stamp tilt">ГОТОВО</div>
<h1>Повторение окончено</h1><p>Карточек: <b>${r.count}</b>. День засчитан.</p>
${meta ? `<button class="btn primary big" data-act="ep"><span>Читать эпизод ${meta.n}</span></button>` : ''}
<button class="btn" data-act="home">На сегодня хватит</button></div>`
      );
      if (!ctx.alive) return;
      if (act !== 'ep') {
        location.hash = '#/';
        return;
      }
    }
  }
  if (!meta) {
    await showScreen(
      root,
      `<div class="screen center-screen"><div class="stamp tilt">ПУСТО</div><h1>${forced ? 'Эпизод не найден' : 'Пока всё прочитано'}</h1><p class="muted">${forced ? '' : 'Новые эпизоды скоро появятся.'}</p><button class="btn primary" data-act="home">Домой</button></div>`
    );
    if (ctx.alive) location.hash = '#/';
    return;
  }
  while (meta) {
    const blk = await blockerFor(meta);
    if (!ctx.alive) return;
    if (blk) {
      location.hash = '#/trial/' + encodeURIComponent(blk.ep.id);
      return;
    }
    const r = await episodePhase(root, ctx, meta);
    if (!ctx.alive || !r) return;
    if (r === 'home') break;
    if (r.trial) {
      location.hash = '#/trial/' + encodeURIComponent(r.trial);
      return;
    }
    meta = r.next;
  }
  location.hash = '#/';
}
