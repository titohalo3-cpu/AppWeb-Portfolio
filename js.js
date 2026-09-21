document.documentElement.classList.add('js');

/* ===== Horas semanales =====
   Fecha desde la que se suman las horas semanales.
   Cada lunes se añaden las horas de data-weekly de cada tecnología. */
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
  github_btn: 'View my GitHub',
  about_title: 'About me',
  about_p1: "I'm Pablo and I'm studying the Higher Vocational Degree in Web Application Development in Madrid. I got into IT through the Intermediate Degree in Microcomputer Systems and Networks, where I learned how computers, networks and operating systems work on the inside.",
  about_p2: 'What drew me to web development was wanting to be on the other side of the screen: designing clear, easy to use interfaces, and programming the features that make a web application respond to what each user needs, from a well validated form to the logic running on the server.',
  about_p3: "I've spent 8 months in an internship developing and maintaining web applications in a real work environment. I'm currently going deeper into PHP and JavaScript and working with frameworks such as Angular and Bootstrap. I'm responsible, organised and I enjoy working as part of a team.",
  exp_title: 'Experience',
  exp_note: '8 months',
  exp_cap: 'Internship',
  exp_role: 'Web Application Development internship',
  exp_desc: 'Development and maintenance of web applications with HTML, CSS, JavaScript and Java, applying what I learned in the degree to real projects.',
  exp_date: 'Feb 2026 - Present',
  status_now: 'In progress',
  status_done: 'Completed',
  edu_title: 'Education',
  edu_note: '2 vocational degrees',
  edu_daw_level: 'HIGHER DEGREE',
  edu_daw: 'Web Application Development',
  edu_daw_desc: 'Programming, databases, client and server side development, interface design and application deployment.',
  edu_daw_hours: '2,000 h',
  edu_daw_date: '2024 - Present',
  edu_smr_level: 'INTERMEDIATE',
  edu_smr: 'Microcomputer Systems and Networks',
  edu_smr_desc: 'IES El Cañaveral. Hardware assembly and maintenance, operating systems, local networks, network services and IT security.',
  edu_smr_hours: '2,000 h',
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
  proj_note: '2 projects',
  p2_title: 'Project name',
  p2_desc: 'Web application with user registration and a MySQL database.',
  p3_title: 'Project name',
  p3_desc: 'Java application using object oriented programming.',
  see_project: 'View project',
  see_code: 'View code',
  now_title: 'Currently learning',
  and: 'and',
  badges_title: 'Badges',
  b_office: 'Microsoft Office',
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

function pintarHoras() {
  const locale = idioma === 'es' ? 'es-ES' : 'en-GB';
  let totalSemanal = 0;

  document.querySelectorAll('.lang').forEach(entry => {
    const base = Number(entry.dataset.base) || 0;
    const semanal = Number(entry.dataset.weekly) || 0;
    const total = base + semanal * semanas;
    totalSemanal += semanal;

    entry.querySelector('.hours').textContent =
      total.toLocaleString(locale) + (idioma === 'es' ? ' h registradas' : ' h logged');

    entry.querySelector('.weekly').textContent = semanal > 0
      ? '+' + semanal + (idioma === 'es' ? ' h por semana' : ' h per week')
      : (idioma === 'es' ? 'Completado en el ciclo' : 'Completed in the degree');
  });

  document.getElementById('weeklyNote').textContent = idioma === 'es'
    ? totalSemanal + ' h de estudio a la semana'
    : totalSemanal + ' h of study per week';
}

function cambiarIdioma(nuevo) {
  idioma = nuevo;
  const dic = idioma === 'es' ? ES : EN;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const texto = dic[el.dataset.i18n];
    if (texto !== undefined) el.innerHTML = texto;
  });

  document.documentElement.lang = idioma;
  const boton = document.getElementById('langToggle');
  document.getElementById('langLabel').textContent = idioma === 'es' ? 'English' : 'Español';
  boton.setAttribute('aria-label', idioma === 'es' ? 'Translate to English' : 'Traducir al español');

  pintarHoras();

  try { localStorage.setItem('portfolio-idioma', idioma); } catch (e) {}
}

document.getElementById('langToggle').addEventListener('click', () => {
  cambiarIdioma(idioma === 'es' ? 'en' : 'es');
});

/* Idioma guardado */
let guardado = null;
try { guardado = localStorage.getItem('portfolio-idioma'); } catch (e) {}
cambiarIdioma(guardado === 'en' ? 'en' : 'es');

/* ===== Aparición de bloques al hacer scroll ===== */
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