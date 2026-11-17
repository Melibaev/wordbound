import * as store from '../store.js';
import { applyTheme } from '../theme.js';
import { listVoices, ttsAvailable } from '../tts.js';
import { playWord, playExample } from '../audio.js';
import { esc, confirmBox, toast, dayKey } from '../util.js';
import { topbar } from '../ui.js';

export async function mount(root, ctx) {
  const s = store.get();
  const set = s.settings;
  const themes = [['auto', 'Авто'], ['light', 'Светлая'], ['dark', 'Тёмная']];

  const voiceOpts = () => {
    const vs = listVoices();
    return (
      `<option value="">Автовыбор</option>` +
      vs.map((v) => `<option value="${esc(v.voiceURI)}"${v.voiceURI === set.voice ? ' selected' : ''}>${esc(v.name)} (${esc(v.lang)})</option>`).join('')
    );
  };

  root.innerHTML = `<div class="screen settings">${topbar('Настройки')}
<section class="card"><h2>Как читать</h2>
<p class="muted">Чтение — весь текст на одном языке. Обучение — с твоего уровня: короткие фразы на английском, остальное на русском. Нажал фразу или слово — увидел перевод.</p>
<div class="seg" id="read">${[['learn', 'Обучение'], ['en', 'English'], ['ru', 'Русский']].map(([k, l]) => `<button class="${(set.read || 'learn') === k ? 'on' : ''}" data-r="${k}">${l}</button>`).join('')}</div>
<div class="seg" id="way" style="margin-top:8px">${[['ru-en', 'С русского'], ['en-ru', 'С английского']].map(([k, l]) => `<button class="${(set.learnWay || 'ru-en') === k ? 'on' : ''}" data-w="${k}">${l}</button>`).join('')}</div>
<div class="seg" id="grain" style="margin-top:8px">${[['sentence', 'Фразы'], ['word', 'Слова']].map(([k, l]) => `<button class="${(set.learnGrain || 'sentence') === k ? 'on' : ''}" data-g="${k}">${l}</button>`).join('')}</div>
</section>
<section class="card"><h2>Тема</h2>
<div class="seg" id="theme">${themes.map(([k, l]) => `<button class="${set.theme === k ? 'on' : ''}" data-t="${k}">${l}</button>`).join('')}</div></section>
<section class="card"><h2>Озвучка</h2>
<p class="muted">Скорость речи</p>
<div class="seg" id="speech">${[['normal', 'Обычная'], ['slow', 'Медленная']].map(([k, l]) => `<button class="${(set.speech || 'normal') === k ? 'on' : ''}" data-s="${k}">${l}</button>`).join('')}</div>
<button class="btn" id="test" style="margin-top:10px">Проверить голос</button>
${
  ttsAvailable()
    ? `<details class="fallback"><summary class="muted">Запасной голос (если нет аудиофайлов)</summary>
<label class="fld">Голос<select id="voice">${voiceOpts()}</select></label></details>`
    : ''
}</section>
<section class="card"><h2>Уровень</h2>
<p class="muted">Сейчас: <b>${esc((s.placement && s.placement.level) || 'не определён')}</b></p>
<button class="btn" id="retake">Пройти тест заново</button></section>
<section class="card"><h2>Резервная копия</h2>
<p class="muted">Прогресс хранится только на этом устройстве. Сохрани копию, чтобы не потерять его.</p>
<div class="row"><button class="btn" id="export">Скачать</button><button class="btn" id="share" hidden>Поделиться</button></div>
<label class="btn file">Загрузить копию<input type="file" id="import" accept="application/json,.json" hidden></label></section>
<section class="card"><h2>Сброс</h2>
<button class="btn danger" id="reset">Сбросить прогресс</button></section>
<p class="muted center">WORDBOUND · версия 1</p></div>`;

  const q = (id) => root.querySelector(id);

  const seg = (id, key, attr) => {
    q(id).addEventListener('click', (e) => {
      const b = e.target.closest('[' + attr + ']');
      if (!b) return;
      const st = store.get();
      if (!st.settings) st.settings = {};
      st.settings[key] = b.getAttribute(attr);
      store.save();
      q(id).querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
    });
  };
  seg('#read', 'read', 'data-r');
  seg('#way', 'learnWay', 'data-w');
  seg('#grain', 'learnGrain', 'data-g');

  q('#theme').addEventListener('click', (e) => {
    const b = e.target.closest('[data-t]');
    if (!b) return;
    set.theme = b.dataset.t;
    store.save();
    applyTheme();
    root.querySelectorAll('#theme button').forEach((x) => x.classList.toggle('on', x === b));
  });

  q('#speech').addEventListener('click', (e) => {
    const b = e.target.closest('[data-s]');
    if (!b) return;
    set.speech = b.dataset.s;
    store.save();
    root.querySelectorAll('#speech button').forEach((x) => x.classList.toggle('on', x === b));
    playWord('open', 'open');
  });
  q('#test').addEventListener('click', () => playExample('open', 'Open the door!'));
  if (ttsAvailable()) {
    q('#voice').addEventListener('change', (e) => {
      set.voice = e.target.value;
      store.save();
    });
    // voices may load late on iOS
    let tries = 0;
    const t = setInterval(() => {
      if (!ctx.alive || ++tries > 8) return clearInterval(t);
      const sel = q('#voice');
      if (sel && sel.options.length <= 1 && listVoices().length) {
        sel.innerHTML = voiceOpts();
        clearInterval(t);
      }
    }, 400);
    ctx.onCleanup(() => clearInterval(t));
  }

  q('#retake').addEventListener('click', async () => {
    if (await confirmBox('Пройти тест уровня заново? Слова в «Моих словах» сохранятся.', 'Пройти', 'Отмена')) location.hash = '#/placement';
  });

  const fileName = () => `wordbound-backup-${dayKey()}.json`;
  q('#export').addEventListener('click', () => {
    const blob = new Blob([store.exportJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName();
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  });
  try {
    const f = new File(['{}'], 'x.json', { type: 'application/json' });
    if (navigator.canShare && navigator.canShare({ files: [f] })) {
      const sb = q('#share');
      sb.hidden = false;
      sb.addEventListener('click', async () => {
        try {
          const file = new File([store.exportJSON()], fileName(), { type: 'application/json' });
          await navigator.share({ files: [file], title: 'WORDBOUND backup' });
        } catch (e) {
          /* cancelled */
        }
      });
    }
  } catch (e) {
    /* File ctor unsupported */
  }

  q('#import').addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      JSON.parse(text);
      if (!(await confirmBox('Заменить текущий прогресс данными из файла?', 'Заменить', 'Отмена'))) return;
      store.importJSON(text);
      applyTheme();
      toast('Копия загружена');
      location.hash = '#/';
    } catch (err) {
      toast('Не удалось прочитать файл');
    }
    e.target.value = '';
  });

  q('#reset').addEventListener('click', async () => {
    if (await confirmBox('Стереть весь прогресс: слова, эпизоды и дни занятий? Это нельзя отменить.', 'Сбросить', 'Отмена')) {
      store.reset();
      toast('Прогресс сброшен');
      location.hash = '#/onboarding';
    }
  });
}
