/* ===== Horas semanales =====
   Fecha desde la que se suman las horas semanales.
   Cada semana se añaden las horas de data-weekly de cada tecnología. */
const FECHA_INICIO = new Date('2026-09-21T00:00:00');
const SEMANA_MS = 7 * 24 * 60 * 60 * 1000;
const semanas = Math.max(0, Math.floor((Date.now() - FECHA_INICIO) / SEMANA_MS));

/* ===== Textos en inglés ===== */
const EN = {
  nav_about: 'About me',
  nav_edu: 'Education',
  nav_tech: 'Skills',
  nav_projects: 'Projects',
  nav_contact: 'Contact',
  handle: 'Web application developer · Madrid, Spain',
  tagline: 'Microcomputer Systems and Networks technician and Web Application Development student. I design interfaces and build what runs behind them.',
  service_title: 'Vocational degrees',
  service_sub: '4,000 h of official training',
  pop_daw: 'Higher Degree · 2024 - Present',
  pop_smr: 'Intermediate Degree · 2022 - 2024',
  github_btn: 'View my GitHub',
  about_title: 'About me',
  about_p1: "I'm Pablo and I'm studying the Higher Vocational Degree in Web Application Development in Madrid. I got into IT through the Intermediate Degree in Microcomputer Systems and Networks, where I learned how computers, networks and operating systems work on the inside.",
  about_p2: 'What drew me to web development was web design and the features you can build with JavaScript: designing clear, easy to use interfaces, and programming the features that make a web application respond to what each user needs, from a well validated form to the logic running on the server.',
  about_p3: "I've been developing and practising web applications for 3 years. I'm currently going deeper into PHP and JavaScript and working with frameworks such as Angular and Bootstrap. I'm responsible, organised and I enjoy working as part of a team.",
  exp_title: 'Experience',
  exp_note: '3 months',
  exp_desc: 'Building and maintaining websites with WordPress, preparing reports and solving incidents, working as part of a team.',
  status_now: 'In progress',
  status_done: 'Completed',
  edu_title: 'Education',
  edu_note: '2 vocational degrees',
  edu_hours: '2,000 h',
  edu_daw_level: 'HIGHER DEGREE',
  edu_daw: 'Web Application Development',
  edu_daw_desc: 'Programming, databases, client and server side development, interface design and application deployment.',
  edu_daw_date: '2024 - Present',
  edu_smr_level: 'INTERMEDIATE',
  edu_smr: 'Microcomputer Systems and Networks',
  edu_smr_desc: 'IES El Cañaveral. Hardware assembly and maintenance, operating systems, local networks, network services and IT security.',
  tech_title: 'Languages and technologies',
  tech_note: 'Hours based on degree modules',
  cap_markup: 'MARKUP',
  cap_styles: 'STYLES',
  cap_client: 'CLIENT',
  cap_backend: 'BACKEND',
  cap_server: 'SERVER',
  html_desc: 'Semantic structure, forms, accessibility and web standards.',
  html_mod: 'Module: Markup languages and information management systems',
  css_desc: 'Flexbox, Grid, responsive design, animations and variables.',
  css_mod: 'Module: Web interface design',
  js_desc: 'DOM manipulation, events, form validation and asynchronous requests.',
  js_mod: 'Module: Client side web development',
  java_desc: 'Object oriented programming, collections, exceptions and database connections.',
  java_mod: 'Module: Programming',
  php_desc: 'Applications with MySQL, sessions, forms and CRUD operations.',
  php_mod: 'Module: Server side web development',
  ng_title: 'Angular, Bootstrap and frameworks',
  ng_desc: 'Components, routing and services in Angular; fast responsive layouts with Bootstrap.',
  ng_mod: 'Currently studying',
  mastery: 'Skill level',
  lvl_adv: 'Advanced',
  lvl_int: 'Intermediate',
  lvl_learn: 'Learning',
  proj_title: 'Projects',
  proj_note: '1 project',
  p1_cap: 'WEB GAME',
  p1_desc: 'Geeky trivia game in the style of "Who Wants to Be a Millionaire?": 15 levels, a prize ladder, 50:50, audience and phone lifelines with a countdown, lifeline recovery and suspense sounds.',
  p1_status: 'Playable online',
  p_play: 'Play now',
  see_code: 'View code',
  now_title: 'Currently learning',
  and: 'and',
  badges_title: 'Badges',
  b_sec: 'Basic cybersecurity',
  b_team: 'Teamwork',
  b_org: 'Organisation',
  contact_title: 'Contact',
  c_mail: 'Email',
  c_phone: 'Phone',
  c_cv: 'Download CV',
  langs_title: 'Languages',
  l_es: 'Spanish',
  l_es_lvl: 'Native',
  l_en: 'English',
  l_en_lvl: 'Intermediate',
  loc_title: 'Location',
  loc_sub: 'On site, hybrid or remote',
  footer: 'Designed by'
};

/* Guarda los textos originales en español */
const ES = {};
document.querySelectorAll('[data-i18n]').forEach(el => {
  ES[el.dataset.i18n] = el.innerHTML;
});

let idioma = 'es';
let tema = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';

/* ===== Horas ===== */
function pintarHoras() {
  const locale = idioma === 'es' ? 'es-ES' : 'en-GB';

  document.querySelectorAll('.lang').forEach(entry => {
    const base = Number(entry.dataset.base) || 0;
    const semanal = Number(entry.dataset.weekly) || 0;
    const total = base + semanal * semanas;

    entry.querySelector('.hours').textContent =
      total.toLocaleString(locale) + (idioma === 'es' ? ' h registradas' : ' h logged');

    let estado;
    if (semanal > 0) {
      estado = '+' + semanal + (idioma === 'es' ? ' h por semana' : ' h per week');
    } else {
      estado = idioma === 'es' ? entry.dataset.statusEs : entry.dataset.statusEn;
    }
    entry.querySelector('.weekly').textContent = estado || '';
  });
}

/* ===== Modo claro / oscuro ===== */
function pintarTema() {
  const label = document.getElementById('themeLabel');
  const boton = document.getElementById('themeToggle');
  let texto;
  if (tema === 'light') {
    texto = idioma === 'es' ? 'Modo oscuro' : 'Dark mode';
  } else {
    texto = idioma === 'es' ? 'Modo claro' : 'Light mode';
  }
  label.textContent = texto;
  boton.setAttribute('aria-label', texto);
}

function cambiarTema(nuevo) {
  tema = nuevo;
  document.documentElement.dataset.theme = tema;
  pintarTema();
  try { localStorage.setItem('portfolio-tema', tema); } catch (e) {}
}

document.getElementById('themeToggle').addEventListener('click', () => {
  cambiarTema(tema === 'light' ? 'dark' : 'light');
});

/* ===== Idioma ===== */
function cambiarIdioma(nuevo) {
  idioma = nuevo;
  const dic = idioma === 'es' ? ES : EN;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const texto = dic[el.dataset.i18n];
    if (texto !== undefined) el.innerHTML = texto;
  });

  document.documentElement.lang = idioma;
  document.getElementById('langLabel').textContent = idioma === 'es' ? 'English' : 'Español';
  document.getElementById('langToggle').setAttribute('aria-label',
    idioma === 'es' ? 'Translate to English' : 'Traducir al español');

  pintarHoras();
  pintarTema();

  try { localStorage.setItem('portfolio-idioma', idioma); } catch (e) {}
}

document.getElementById('langToggle').addEventListener('click', () => {
  cambiarIdioma(idioma === 'es' ? 'en' : 'es');
});

let guardado = null;
try { guardado = localStorage.getItem('portfolio-idioma'); } catch (e) {}
cambiarIdioma(guardado === 'en' ? 'en' : 'es');

/* ===== Desplegable de ciclos formativos ===== */
const cyclesBtn = document.getElementById('cyclesBtn');
const cyclesPop = document.getElementById('cyclesPop');

function abrirCiclos(abrir) {
  cyclesPop.classList.toggle('open', abrir);
  cyclesBtn.setAttribute('aria-expanded', abrir ? 'true' : 'false');
}

cyclesBtn.addEventListener('click', e => {
  e.stopPropagation();
  abrirCiclos(!cyclesPop.classList.contains('open'));
});

cyclesPop.addEventListener('click', e => {
  if (e.target.closest('a')) abrirCiclos(false);
});

document.addEventListener('click', e => {
  if (!cyclesPop.contains(e.target) && e.target !== cyclesBtn) abrirCiclos(false);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') abrirCiclos(false);
});

/* ===== Aparición de bloques al hacer scroll ===== */
function iniciarAnimaciones() {
  const bloques = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    bloques.forEach(b => observer.observe(b));
  } else {
    bloques.forEach(b => b.classList.add('is-visible'));
  }
}

/* ===== Animación de entrada ===== */
const intro = document.getElementById('intro');
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let introVista = false;
try { introVista = sessionStorage.getItem('portfolio-intro') === '1'; } catch (e) {}

if (!intro || sinMovimiento || introVista) {
  if (intro) intro.remove();
  iniciarAnimaciones();
} else {
  document.body.classList.add('intro-on');
  setTimeout(() => {
    intro.classList.add('hide');
    document.body.classList.remove('intro-on');
    iniciarAnimaciones();
    try { sessionStorage.setItem('portfolio-intro', '1'); } catch (e) {}
    setTimeout(() => intro.remove(), 600);
  }, 1300);
}