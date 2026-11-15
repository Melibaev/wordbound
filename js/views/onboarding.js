import * as store from '../store.js';
import { demoArt } from '../art.js';
import { dayKey } from '../util.js';
import { installHint, isIOS, isStandalone } from '../ui.js';

const SLIDES = [
  {
    art: 'door',
    kicker: 'ГЛАВА 0',
    title: 'WORDBOUND',
    text: 'Манхва-сериал на английском. Ты читаешь историю, а слова запоминаются сами.',
  },
  {
    art: 'boom',
    kicker: 'КАК ЭТО РАБОТАЕТ',
    title: 'Один эпизод в день',
    text: 'Тапай по любому слову, чтобы увидеть перевод. Слушай произношение. Короткие повторения возвращают слова ровно тогда, когда ты начинаешь их забывать.',
  },
  {
    art: 'city',
    kicker: 'ПОСЛЕДНИЙ ШАГ',
    title: 'Определим твой уровень',
    text: 'Тест займёт 10–15 минут: слова, чтение и аудирование. Он подстроится под тебя. Если английский для тебя с нуля, нажми «Я полный новичок».',
  },
];

export async function mount(root, ctx) {
  let i = 0;
  const draw = () => {
    const sl = SLIDES[i];
    const last = i === SLIDES.length - 1;
    const hint = last && isIOS() && !isStandalone() ? installHint() : '';
    root.innerHTML = `<div class="screen onboard">
<div class="ob-art panel-frame">${demoArt(sl.art)}</div>
<div class="ob-copy"><span class="stamp tilt">${sl.kicker}</span><h1 class="ob-title">${sl.title}</h1><p>${sl.text}</p></div>
${hint}
<div class="ob-dots">${SLIDES.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</div>
<div class="ob-actions">
${
  last
    ? '<button class="btn primary big" id="test"><span>Пройти тест</span></button><button class="btn" id="zero">Я полный новичок</button>'
    : '<button class="btn primary big" id="next"><span>Дальше</span></button>'
}
</div></div>`;
    const q = (id) => root.querySelector(id);
    if (q('#next')) q('#next').addEventListener('click', () => { i++; draw(); });
    if (q('#test'))
      q('#test').addEventListener('click', () => {
        store.get().onboarded = true;
        store.save();
        location.hash = '#/placement';
      });
    if (q('#zero'))
      q('#zero').addEventListener('click', () => {
        const s = store.get();
        s.onboarded = true;
        s.placement = { level: 'A0', skills: {}, date: dayKey(), skipped: true };
        store.save();
        location.hash = '#/';
      });
    const hc = q('[data-hint-close]');
    if (hc) hc.addEventListener('click', () => q('[data-hint]').remove());
  };
  draw();
}
