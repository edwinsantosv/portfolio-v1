/* =========================================================
   Edwin Santos · Portfolio
   ========================================================= */

(() => {
  'use strict';

  const i18n = {
    es: {
      'nav.about': 'Sobre mí', 'nav.skills': 'Skills', 'nav.projects': 'Proyectos',
      'nav.experience': 'Experiencia', 'nav.awards': 'Premios', 'nav.contact': 'Contacto',

      'hero.badge': 'Business Analyst @ CQ Fluency · Consultor de Automatización @ Wings4U · Abierto a roles de liderazgo',
      'hero.hi': 'Hola, soy',
      'hero.role1': 'Business Analyst',
      'hero.role2': 'Consultor de Automatización',
      'hero.desc': 'Convierto datos en decisiones de negocio rentables y lidero equipos que entregan resultados medibles. Especializado en SQL, Power Platform, Python, GenAI + MCPs. Trabajo con equipos internacionales de EE.UU., Canadá y Europa desde Lima. Actualmente cursando una Maestría en Business Analytics en la Pontificia Universidad Católica de Chile — ranking #1 en Latinoamérica.',
      'hero.cta1': 'Ver proyectos',
      'hero.cta2': 'Agendar una llamada',
      'hero.stat1': 'Dashboards & automatizaciones',
      'hero.stat2': 'Países atendidos',
      'hero.stat3': 'Estudiantes formados (Power BI)',

      'about.title': 'Sobre mí',
      'about.p1': 'Soy Business Analyst y Consultor de Automatización con base en Lima, con formación dual: Ingeniería Mecánica y Analytics for Business. Esa mezcla me da una mirada particular sobre los datos: rigurosa como un ingeniero, estratégica como un líder de negocio.',
      'about.p2': 'Actualmente divido mi tiempo entre tres roles. Como Business Analyst en CQ Fluency (New Jersey, EE.UU.) desarrollo dashboards en Power BI y automatizaciones en Power Platform. Como Consultor de Automatización en Wings4U (Praga, República Checa) diseño soluciones low-code y construyo MCPs custom para potenciar su stack de Customer Advocacy Intelligence. Y como Docente en la Universidad San Martín de Porres (USMP) lidero un bootcamp de Power BI — más de 100 estudiantes formados hasta ahora.',
      'about.p3': 'Para reforzar el lado estratégico, curso una Maestría en Business Analytics en la Pontificia Universidad Católica de Chile — ranking #1 en Latinoamérica. Mi track record incluye liderar equipos ganadores de la HEAD Competition (Mohawk College, 2024) y del NASA Space Apps Lima (2021), y liderazgo previo en BI en Valia (Delaware) y Ove Decors (Montreal). Siguiente paso: roles senior/lead donde pueda escalar tanto el impacto como el equipo.',
      'about.h1': 'Power Platform end-to-end',
      'about.h1d': 'Power BI, Power Apps y Power Automate integrados a fuentes empresariales.',
      'about.h2': 'GenAI · MCPs · Advocacy Intelligence',
      'about.h2d': 'Model Context Protocols custom e integraciones LLM para desbloquear la data de Customer Advocacy en clientes B2B.',
      'about.h3': 'Líder de equipo & docente',
      'about.h3d': 'Dos primeros lugares como team lead, 100+ estudiantes de Power BI formados, gestión de stakeholders en 4 países.',
      'about.loc': 'Ubicación',
      'about.role': 'Roles actuales',
      'about.edu': 'Estudiando',
      'about.langs': 'Idiomas',
      'about.status': 'Estado',
      'about.available': 'Abierto a roles de liderazgo',

      'skills.title': 'Skills & Stack',
      'skills.c1': 'Lenguajes',
      'skills.c2': 'Bases de datos',
      'skills.c3': 'BI & Visualización',
      'skills.c4': 'Power Platform',
      'skills.c5': 'Cloud & Data',
      'skills.c6': 'ML / IA · GenAI',
      'skills.c7': 'Liderazgo & Delivery',
      'skills.certs': 'Certificaciones',
      'skills.certPl300': 'Microsoft Certified — preparación, modelado, visualización y análisis de datos end-to-end en Power BI.',

      'projects.title': 'Proyectos destacados',
      'projects.featured': 'Award · Featured',
      'projects.case': 'Ver caso completo',
      'projects.more': 'Más proyectos & experimentos',
      'projects.p1': 'Líder de equipo y responsable de data strategy y storytelling. Ganamos el 1er lugar entre 40 grupos de distintos colleges de Ontario, presentando un poster de análisis y un modelo de Machine Learning sobre los efectos del cambio climático en edificios de Hamilton.',
      'projects.p2': 'Dashboard interactivo en Looker Studio para evaluar el impacto del clima extremo sobre infraestructura crítica de Hamilton. Proyecto base de la competencia HEAD que llevó a mi equipo al primer lugar.',
      'projects.p3': 'Automatización que recibe un prompt en lenguaje natural y devuelve queries DAX listas para Power BI, usando Deepseek API orquestado vía Power Automate. Acelera el desarrollo de medidas y reduce errores de sintaxis.',
      'projects.p4': 'Solución de procesamiento de facturas con OCR + AI Builder en Power Automate. Reducción del 95% en el tiempo de procesado manual durante mi etapa en Ove Decors. Integrada con MySQL para alimentar dashboards de Power BI.',
      'projects.p5': 'Líder del equipo SPACE ROOTS, ganador entre 1600 participantes y 200 equipos. Diseñé los sistemas mecánicos de un módulo agrícola e integré sensores (humedad, moho, presión) visualizados en Grafana en tiempo real. Global Nominee.',
      'projects.p6': 'Análisis de datos climáticos y modelo predictivo de Machine Learning sobre el impacto del clima extremo en la infraestructura de mantenimiento de instalaciones. Acompañado de un asistente conversacional powered by LLM.',
      'projects.m1': '8 animaciones HTML/CSS para enseñar conceptos de BI: ciclo BI, capas de datos, terminales y comparaciones.',
      'projects.m2': 'DAGs, sensors, XComs, branching, monitoring y proyecto satélite real desplegado con Docker.',
      'projects.m3': 'Sistema end-to-end: scraper de convocatorias + SQLite + app Streamlit con búsqueda y filtros.',
      'projects.m4': 'Base de datos relacional con modelado entidad-relación, ERD documentado y consultas analíticas avanzadas.',
      'projects.m5': 'Sitio educativo branded para el bootcamp de Power BI de la Universidad San Martín de Porres.',
      'projects.m6': 'Patrón para ejecutar JOINs entre tablas de fuentes distintas dentro de un flujo de Power Automate.',

      'exp.title': 'Experiencia',
      'exp.now': 'Actualidad',
      'exp.remote': 'Remoto · Tiempo completo',
      'exp.remoteConsult': 'Remoto · Consultor',
      'exp.teaching': 'Docencia · Medio tiempo',
      'exp.edu': 'Educación',
      'exp.wingsTitle': 'Automation Analyst · Consultor',
      'exp.usmpTitle': 'Instructor · Bootcamp Power BI',
      'exp.edu0t': 'Magíster · Business Analytics',
      'exp.eWings': 'Consultoría para una agencia global B2B de Customer Marketing & Advocacy. Diseño de soluciones low-code y desarrollo de MCPs custom (Model Context Protocols) para potenciar el stack de Customer Advocacy Intelligence — empaquetando insights impulsados por IA que Wings4U revende a clientes enterprise. Colaboración cruzada con equipos de producto, ventas y delivery para convertir data de advocacy en entregables listos para generar ingresos.',
      'exp.eUsmp': 'Docente principal del bootcamp de Power BI: currículo end-to-end (modelado de datos, DAX, storytelling, dashboards) para más de 100 estudiantes. Mentoría en casos reales de negocio y preparación para entregar reportes ejecutivos de nivel corporativo.',
      'exp.e0': 'Programa de posgrado ranking #1 en Latinoamérica para Business Analytics. Refuerzo mis bases en analítica avanzada, estrategia de negocio, decision science y ML aplicado — cerrando la brecha entre ejecución de datos y toma de decisiones a nivel liderazgo.',
      'exp.e1': 'Tracking exhaustivo de bases de datos para soportar operaciones, automatizaciones en Python (Pandas, MySQL, NumPy) y dashboards en Power BI para distintos equipos y Project Managers. Implementación de flujos en Power Automate (notificación de horas, comparación con horas proyectadas) y liderazgo de reuniones con stakeholders para traducir necesidades en requerimientos de datos.',
      'exp.e2': 'Más de 60 reportes de visualización en Looker Studio, queries complejas en PostgreSQL y transformación de datos AWS → BigQuery. Participé en la implementación de LLMs para herramientas como Valia\'s Copilot e integré APIs de HubSpot y Google Analytics para reportes de marketing.',
      'exp.e3': 'Dashboards en Power BI conectados a MySQL, automatización OCR en Power Automate para procesamiento de facturas (−95% tiempo), análisis avanzado en Excel con tablas dinámicas y proyectos de web scraping en Amazon y Overstock para análisis competitivo.',
      'exp.e4': 'Coursework: Applied Machine Learning, CRISP-DM, Data Mining, Web Development, Statistics, Advanced Database Concepts. Graduado con honores (94.2% GPA). 1er lugar en la HEAD Competition entre 80 grupos de distintos colleges.',
      'exp.e5': 'Power Apps Development, Predictive Analytics, SQL Database Management y Data Visualization con Power BI. Modelo predictivo de precios inmobiliarios (+20% vs baseline) y app de mantenimiento en Power Apps (−15% downtime).',
      'exp.e6': 'Bases sólidas en cálculo, estadística y física aplicada. Asistente de investigación en simulación de mecánicas de impresión 3D y asistente docente en mecánica para más de 100 estudiantes de ingeniería.',
      'exp.edu1t': 'Graduate Certificate · Analytics for Business Decision Making',
      'exp.edu2t': 'Diploma · Business Intelligence',
      'exp.edu3t': 'Bachelor of Science · Mechanical Engineering',
      'exp.cta': '¿Quieres ver el CV completo o descargar el portafolio?',
      'exp.download': 'Ver / Imprimir CV',
      'exp.downloadPdf': 'Descargar CV (PDF)',
      'exp.downloadPortfolio': 'Descargar Portafolio (PDF)',

      'awards.title': 'Premios & Reconocimientos',
      'awards.a1': 'Líder de equipo a cargo de la estrategia de datos, gestión y storytelling. Construimos un poster de análisis y un modelo de Machine Learning sobre los efectos del cambio climático en edificios de Hamilton.',
      'awards.a2': 'Líder del equipo entre 1600 participantes y 200 equipos. A cargo de la ingeniería de los sistemas mecánicos del módulo y de la transferencia y visualización de datos en Grafana en tiempo real (humedad, moho, presión de aire).',

      'contact.title': 'Hablemos',
      'contact.h': '¿Tienes un proyecto o un rol en mente?',
      'contact.p': 'Estoy abierto a roles senior / lead en Business Intelligence, Automation y Data Strategy — full-time o consultoría — y a conversaciones de asesoría. Suelo responder en menos de 24 horas.',
      'form.name': 'Nombre',
      'form.email': 'Email',
      'form.subject': 'Asunto',
      'form.message': 'Mensaje',
      'form.send': 'Enviar mensaje',
      'form.success': '¡Listo! Tu cliente de email se abrirá ahora.',
      'form.error': 'Por favor, completa todos los campos.',

      'footer.tag': 'Datos en decisiones, decisiones en resultados.',
      'footer.rights': 'Todos los derechos reservados'
    },
    en: {
      'nav.about': 'About', 'nav.skills': 'Skills', 'nav.projects': 'Projects',
      'nav.experience': 'Experience', 'nav.awards': 'Awards', 'nav.contact': 'Contact',

      'hero.badge': 'Business Analyst @ CQ Fluency · Automation Consultant @ Wings4U · Open to leadership roles',
      'hero.hi': "Hi, I'm",
      'hero.role1': 'Business Analyst',
      'hero.role2': 'Automation Consultant',
      'hero.desc': 'I turn data into profitable business decisions and lead teams that build measurable outcomes. Specialized in SQL, Power Platform, Python, GenAI + MCPs. Working with international teams across the US, Canada and Europe from Lima. Currently pursuing an MSc in Business Analytics at Pontificia Universidad Católica de Chile — ranked #1 in LATAM.',
      'hero.cta1': 'View projects',
      'hero.cta2': 'Book a call',
      'hero.stat1': 'Dashboards & automations',
      'hero.stat2': 'Countries served',
      'hero.stat3': 'Students taught (Power BI)',

      'about.title': 'About me',
      'about.p1': "I'm a Business Analyst and Automation Consultant based in Lima, with a dual background: Mechanical Engineering and Analytics for Business. That mix gives me a particular take on data: rigorous like an engineer, strategic like a business leader.",
      'about.p2': "I currently split my time between three roles. As a Business Analyst at CQ Fluency (New Jersey, USA) I own Power BI dashboards and Power Platform automations. As an Automation Consultant at Wings4U (Prague, Czech Republic) I design low-code solutions and build custom MCPs to power their Customer Advocacy Intelligence stack. And as an Instructor at Universidad San Martín de Porres (USMP) I lead a Power BI bootcamp — 100+ students trained so far.",
      'about.p3': "To sharpen the strategy side, I'm now pursuing an MSc in Business Analytics at Pontificia Universidad Católica de Chile — ranked #1 in Latin America. My track record includes leading teams that won the HEAD Competition (Mohawk College, 2024) and NASA Space Apps Lima (2021), plus prior BI leadership at Valia (Delaware) and Ove Decors (Montreal). Next step: senior/lead roles where I can grow both the impact and the team.",
      'about.h1': 'Power Platform end-to-end',
      'about.h1d': 'Power BI, Power Apps and Power Automate integrated to enterprise sources.',
      'about.h2': 'GenAI · MCPs · Advocacy Intelligence',
      'about.h2d': 'Custom Model Context Protocols and LLM integrations to unlock Customer Advocacy data for B2B clients.',
      'about.h3': 'Team lead & educator',
      'about.h3d': 'Two 1st-place team-lead awards, 100+ Power BI students taught, stakeholder management across 4 countries.',
      'about.loc': 'Location',
      'about.role': 'Current roles',
      'about.edu': 'Studying',
      'about.langs': 'Languages',
      'about.status': 'Status',
      'about.available': 'Open to leadership roles',

      'skills.title': 'Skills & Stack',
      'skills.c1': 'Languages',
      'skills.c2': 'Databases',
      'skills.c3': 'BI & Visualization',
      'skills.c4': 'Power Platform',
      'skills.c5': 'Cloud & Data',
      'skills.c6': 'ML / AI · GenAI',
      'skills.c7': 'Leadership & Delivery',
      'skills.certs': 'Certifications',
      'skills.certPl300': 'Microsoft Certified — end-to-end Power BI data preparation, modeling, visualization and analysis.',

      'projects.title': 'Featured projects',
      'projects.featured': 'Award · Featured',
      'projects.case': 'View full case',
      'projects.more': 'More projects & experiments',
      'projects.p1': 'Team lead in charge of data strategy and storytelling. We won 1st place out of 40 teams from different Ontario colleges, presenting an analysis poster and a Machine Learning model on the effects of climate change on buildings in Hamilton.',
      'projects.p2': 'Interactive Looker Studio dashboard to assess the impact of extreme weather on critical infrastructure in Hamilton. Core project of the HEAD competition that took my team to first place.',
      'projects.p3': 'Automation that takes a natural-language prompt and returns DAX queries ready for Power BI, using Deepseek API orchestrated via Power Automate. Speeds up measure development and reduces syntax errors.',
      'projects.p4': 'Invoice processing solution with OCR + AI Builder in Power Automate. 95% reduction in manual processing time during my time at Ove Decors. Integrated with MySQL to feed Power BI dashboards.',
      'projects.p5': 'Lead of team SPACE ROOTS, winner among 1600 participants and 200 teams. Designed the mechanical systems of an agricultural module and integrated sensors (humidity, mold, pressure) visualized in Grafana in real time. Global Nominee.',
      'projects.p6': 'Climate data analysis and predictive Machine Learning model on the impact of extreme weather on facility maintenance infrastructure. Paired with an LLM-powered conversational assistant.',
      'projects.m1': '8 HTML/CSS animations to teach BI concepts: BI cycle, data layers, terminals and comparisons.',
      'projects.m2': 'DAGs, sensors, XComs, branching, monitoring and a real satellite project deployed with Docker.',
      'projects.m3': 'End-to-end system: scholarship scraper + SQLite + Streamlit app with search and filters.',
      'projects.m4': 'Relational database with entity-relationship modeling, documented ERD and advanced analytical queries.',
      'projects.m5': 'Branded educational site for the Power BI bootcamp at Universidad San Martín de Porres.',
      'projects.m6': 'Pattern to perform JOINs between tables from different sources within a Power Automate flow.',

      'exp.title': 'Experience',
      'exp.now': 'Present',
      'exp.remote': 'Remote · Full-time',
      'exp.remoteConsult': 'Remote · Consultant',
      'exp.teaching': 'Teaching · Part-time',
      'exp.edu': 'Education',
      'exp.wingsTitle': 'Automation Analyst · Consultant',
      'exp.usmpTitle': 'Instructor · Power BI Bootcamp',
      'exp.edu0t': 'MSc · Business Analytics',
      'exp.eWings': 'Consulting for a global B2B Customer Marketing & Advocacy agency. Designing low-code solutions and building custom MCPs (Model Context Protocols) to power the Customer Advocacy Intelligence stack — packaging AI-driven insights that Wings4U resells to enterprise clients. Working across product, sales and delivery teams to turn advocacy data into revenue-ready deliverables.',
      'exp.eUsmp': 'Lead instructor of the Power BI bootcamp: end-to-end curriculum (data modeling, DAX, storytelling, dashboards) for 100+ students. Mentoring on real business cases and preparing students to deliver executive-ready reports.',
      'exp.e0': 'Graduate program ranked #1 in Latin America for Business Analytics. Reinforcing my foundation in advanced analytics, business strategy, decision science and applied ML — bridging the gap between data execution and leadership-level decision making.',
      'exp.e1': 'Extensive tracking of databases to support operations, Python automations (Pandas, MySQL, NumPy) and Power BI dashboards for various teams and Project Managers. Power Automate flows (project hours notifications, comparison vs projected hours) and stakeholder meetings to translate needs into data requirements.',
      'exp.e2': "Over 60 visualization reports in Looker Studio, complex PostgreSQL queries and AWS → BigQuery data transformation. Took part in LLM implementations for tools like Valia's Copilot and integrated HubSpot and Google Analytics APIs for marketing reports.",
      'exp.e3': 'Power BI dashboards connected to MySQL, OCR automation in Power Automate for invoice processing (−95% time), advanced Excel analyses with pivot tables and web scraping projects on Amazon and Overstock for competitive analysis.',
      'exp.e4': 'Coursework: Applied Machine Learning, CRISP-DM, Data Mining, Web Development, Statistics, Advanced Database Concepts. Graduated with honors (94.2% GPA). 1st place in the HEAD Competition among 80 teams from different colleges.',
      'exp.e5': 'Power Apps Development, Predictive Analytics, SQL Database Management and Data Visualization with Power BI. House pricing predictive model (+20% vs baseline) and a maintenance app in Power Apps (−15% downtime).',
      'exp.e6': 'Strong foundation in calculus, statistics and applied physics. Research assistant on 3D printing mechanics simulation and teaching assistant in mechanics for over 100 engineering students.',
      'exp.edu1t': 'Graduate Certificate · Analytics for Business Decision Making',
      'exp.edu2t': 'Diploma · Business Intelligence',
      'exp.edu3t': 'Bachelor of Science · Mechanical Engineering',
      'exp.cta': 'Want to see the full CV or download the portfolio?',
      'exp.download': 'View / Print CV',
      'exp.downloadPdf': 'Download CV (PDF)',
      'exp.downloadPortfolio': 'Download Portfolio (PDF)',

      'awards.title': 'Awards & Recognition',
      'awards.a1': 'Team lead in charge of data strategy, management and storytelling. We built an analysis poster and a Machine Learning model on the effects of climate change on buildings in Hamilton.',
      'awards.a2': 'Team lead among 1600 participants and 200 teams. In charge of the engineering of the module\'s mechanical systems and of data transfer and visualization in Grafana in real time (humidity, mold, air pressure).',

      'contact.title': "Let's talk",
      'contact.h': 'Got a project or a role in mind?',
      'contact.p': "I'm open to senior / lead roles in Business Intelligence, Automation and Data Strategy — full-time or consulting — and to advisory conversations. I usually reply in under 24 hours.",
      'form.name': 'Name',
      'form.email': 'Email',
      'form.subject': 'Subject',
      'form.message': 'Message',
      'form.send': 'Send message',
      'form.success': 'Done! Your email client will open now.',
      'form.error': 'Please fill in all fields.',

      'footer.tag': 'Data into decisions, decisions into results.',
      'footer.rights': 'All rights reserved'
    }
  };

  let currentLang = localStorage.getItem('lang') || 'en';

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const txt = i18n[lang][key];
      if (txt !== undefined) el.textContent = txt;
    });
    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
      const cur = toggle.querySelector('.lang-current');
      const oth = toggle.querySelector('.lang-other');
      cur.textContent = lang.toUpperCase();
      oth.textContent = lang === 'es' ? 'EN' : 'ES';
    }
  }

  function initNav() {
    const navWrapper = document.querySelector('.nav-wrapper');
    const onScroll = () => navWrapper.classList.toggle('scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const menuBtn = document.getElementById('menu-toggle');
    const links = document.querySelector('.nav-links');
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  function initLangToggle() {
    const btn = document.getElementById('lang-toggle');
    btn.addEventListener('click', () => applyLang(currentLang === 'es' ? 'en' : 'es'));
    applyLang(currentLang);
  }

  function initThemeToggle() {
    const root = document.documentElement;
    const stored = localStorage.getItem('theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial = stored || (prefersLight ? 'light' : 'dark');
    if (initial === 'light') root.setAttribute('data-theme', 'light');
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      if (isLight) {
        root.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));
  }

  function initCounters() {
    const counters = document.querySelectorAll('.stat-value');
    if (!counters.length) return;
    const animate = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
    };
    if (!('IntersectionObserver' in window)) {
      counters.forEach(animate);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => io.observe(c));
  }

  function initActiveLink() {
    const sections = document.querySelectorAll('main section[id]');
    const links = document.querySelectorAll('.nav-links a');
    if (!('IntersectionObserver' in window) || !sections.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(a => {
            const isActive = a.getAttribute('href') === '#' + id;
            a.style.color = isActive ? 'var(--text)' : '';
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => io.observe(s));
  }

  function initForm() {
    const form = document.getElementById('contact-form');
    const note = document.getElementById('form-note');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = form.name.value.trim();
      const email   = form.email.value.trim();
      const subject = form.subject.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !subject || !message) {
        note.textContent = i18n[currentLang]['form.error'];
        note.className = 'form-note error';
        return;
      }
      const body = encodeURIComponent(message + '\n\n— ' + name + '\n' + email);
      const subj = encodeURIComponent(subject);
      window.location.href = 'mailto:edwinrafaelsantosvidal@gmail.com?subject=' + subj + '&body=' + body;
      note.textContent = i18n[currentLang]['form.success'];
      note.className = 'form-note success';
      setTimeout(() => { form.reset(); note.textContent = ''; note.className = 'form-note'; }, 3500);
    });
  }

  function initYear() {
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  function init() {
    initNav();
    initThemeToggle();
    initLangToggle();
    initReveal();
    initCounters();
    initActiveLink();
    initForm();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
