/* =========================================================
   Edwin Santos · Portfolio
   ========================================================= */

(() => {
  'use strict';

  const i18n = {
    es: {
      'nav.about': 'Sobre mí', 'nav.skills': 'Skills', 'nav.projects': 'Proyectos',
      'nav.experience': 'Experiencia', 'nav.awards': 'Premios', 'nav.contact': 'Contacto',

      'hero.badge': 'Business Analyst @ CQ Fluency · Disponible para nuevas oportunidades',
      'hero.hi': 'Hola, soy',
      'hero.role1': 'Business Analyst',
      'hero.role2': 'Data Scientist',
      'hero.desc': 'Convierto datos en decisiones de negocio rentables. Especializado en SQL, Power Platform (Power BI, Power Apps, Power Automate) y Python. Trabajando en remoto desde Lima para empresas en Estados Unidos y Canadá.',
      'hero.cta1': 'Ver proyectos',
      'hero.cta2': 'Contáctame',
      'hero.stat1': 'Reports & dashboards',
      'hero.stat2': 'Años en data',
      'hero.stat3': 'Awards 1er lugar',

      'about.title': 'Sobre mí',
      'about.p1': 'Soy Business Analyst con base en Lima, Perú, y formación dual: Ingeniería Mecánica y Analytics for Business. Esa mezcla me da una mirada particular sobre los datos: rigurosa como un ingeniero, estratégica como un analista de negocio.',
      'about.p2': 'Actualmente trabajo en remoto para CQ Fluency (New Jersey) construyendo dashboards en Power BI y automatizaciones en Power Platform. Antes, lideré inteligencia de negocio en Valia (Delaware) y análisis de producto en Ove Decors (Montreal).',
      'about.p3': 'Lo que más me apasiona: simplificar lo complejo. Tomar problemas grandes y convertirlos en pasos manejables, métricas claras y decisiones que generen impacto. Ganador de la HEAD Competition (Mohawk College, 2024) y del NASA Space Apps Lima (2021).',
      'about.h1': 'Power Platform end-to-end',
      'about.h1d': 'Power BI, Power Apps y Power Automate integrados a fuentes empresariales.',
      'about.h2': 'Datos a escala',
      'about.h2d': 'SQL avanzado en PostgreSQL, BigQuery y MySQL. Transformaciones AWS → BigQuery.',
      'about.h3': 'Automatización con IA',
      'about.h3d': 'OCR + Power Automate (-95% tiempo de procesado). Integración LLMs y APIs.',
      'about.loc': 'Ubicación',
      'about.role': 'Rol actual',
      'about.langs': 'Idiomas',
      'about.status': 'Estado',
      'about.available': 'Open to roles',

      'skills.title': 'Skills & Stack',
      'skills.c1': 'Lenguajes',
      'skills.c2': 'Bases de datos',
      'skills.c3': 'BI & Visualización',
      'skills.c4': 'Power Platform',
      'skills.c5': 'Cloud & Data',
      'skills.c6': 'ML / IA',

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
      'exp.edu': 'Educación',
      'exp.e1': 'Tracking exhaustivo de bases de datos para soportar operaciones, automatizaciones en Python (Pandas, MySQL, NumPy) y dashboards en Power BI para distintos equipos y Project Managers. Implementación de flujos en Power Automate (notificación de horas, comparación con horas proyectadas) y liderazgo de reuniones con stakeholders para traducir necesidades en requerimientos de datos.',
      'exp.e2': 'Más de 60 reportes de visualización en Looker Studio, queries complejas en PostgreSQL y transformación de datos AWS → BigQuery. Participé en la implementación de LLMs para herramientas como Valia\'s Copilot e integré APIs de HubSpot y Google Analytics para reportes de marketing.',
      'exp.e3': 'Dashboards en Power BI conectados a MySQL, automatización OCR en Power Automate para procesamiento de facturas (−95% tiempo), análisis avanzado en Excel con tablas dinámicas y proyectos de web scraping en Amazon y Overstock para análisis competitivo.',
      'exp.e4': 'Coursework: Applied Machine Learning, CRISP-DM, Data Mining, Web Development, Statistics, Advanced Database Concepts. Graduado con honores (94.2% GPA). 1er lugar en la HEAD Competition entre 80 grupos de distintos colleges.',
      'exp.e5': 'Power Apps Development, Predictive Analytics, SQL Database Management y Data Visualization con Power BI. Modelo predictivo de precios inmobiliarios (+20% vs baseline) y app de mantenimiento en Power Apps (−15% downtime).',
      'exp.e6': 'Bases sólidas en cálculo, estadística y física aplicada. Asistente de investigación en simulación de mecánicas de impresión 3D y asistente docente en mecánica para más de 100 estudiantes de ingeniería.',
      'exp.edu1t': 'Graduate Certificate · Analytics for Business Decision Making',
      'exp.edu2t': 'Diploma · Business Intelligence',
      'exp.edu3t': 'Bachelor of Science · Mechanical Engineering',
      'exp.cta': '¿Quieres ver el CV completo?',
      'exp.download': 'Descargar CV (PDF)',

      'awards.title': 'Premios & Reconocimientos',
      'awards.a1': 'Líder de equipo a cargo de la estrategia de datos, gestión y storytelling. Construimos un poster de análisis y un modelo de Machine Learning sobre los efectos del cambio climático en edificios de Hamilton.',
      'awards.a2': 'Líder del equipo entre 1600 participantes y 200 equipos. A cargo de la ingeniería de los sistemas mecánicos del módulo y de la transferencia y visualización de datos en Grafana en tiempo real (humedad, moho, presión de aire).',

      'contact.title': 'Hablemos',
      'contact.h': '¿Tienes un proyecto en mente?',
      'contact.p': 'Estoy abierto a colaborar en proyectos de Business Intelligence, automatización con Power Platform, análisis de datos o consultoría. Cuéntame qué necesitas y respondo en menos de 24 horas.',
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

      'hero.badge': 'Business Analyst @ CQ Fluency · Open to new opportunities',
      'hero.hi': "Hi, I'm",
      'hero.role1': 'Business Analyst',
      'hero.role2': 'Data Scientist',
      'hero.desc': 'I turn data into profitable business decisions. Specialized in SQL, Power Platform (Power BI, Power Apps, Power Automate) and Python. Working remotely from Lima for companies in the US and Canada.',
      'hero.cta1': 'View projects',
      'hero.cta2': 'Contact me',
      'hero.stat1': 'Reports & dashboards',
      'hero.stat2': 'Years in data',
      'hero.stat3': '1st-place awards',

      'about.title': 'About me',
      'about.p1': "I'm a Business Analyst based in Lima, Peru, with a dual background: Mechanical Engineering and Analytics for Business. That mix gives me a particular take on data: rigorous like an engineer, strategic like a business analyst.",
      'about.p2': 'I currently work remotely for CQ Fluency (New Jersey) building Power BI dashboards and Power Platform automations. Before that I led business intelligence at Valia (Delaware) and product analytics at Ove Decors (Montreal).',
      'about.p3': 'What I love most: simplifying the complex. Turning big problems into manageable steps, clear metrics and decisions that drive impact. Winner of the HEAD Competition (Mohawk College, 2024) and the NASA Space Apps Lima (2021).',
      'about.h1': 'Power Platform end-to-end',
      'about.h1d': 'Power BI, Power Apps and Power Automate integrated to enterprise sources.',
      'about.h2': 'Data at scale',
      'about.h2d': 'Advanced SQL in PostgreSQL, BigQuery and MySQL. AWS → BigQuery transformations.',
      'about.h3': 'AI-powered automation',
      'about.h3d': 'OCR + Power Automate (-95% processing time). LLM and API integrations.',
      'about.loc': 'Location',
      'about.role': 'Current role',
      'about.langs': 'Languages',
      'about.status': 'Status',
      'about.available': 'Open to roles',

      'skills.title': 'Skills & Stack',
      'skills.c1': 'Languages',
      'skills.c2': 'Databases',
      'skills.c3': 'BI & Visualization',
      'skills.c4': 'Power Platform',
      'skills.c5': 'Cloud & Data',
      'skills.c6': 'ML / AI',

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
      'exp.edu': 'Education',
      'exp.e1': 'Extensive tracking of databases to support operations, Python automations (Pandas, MySQL, NumPy) and Power BI dashboards for various teams and Project Managers. Power Automate flows (project hours notifications, comparison vs projected hours) and stakeholder meetings to translate needs into data requirements.',
      'exp.e2': "Over 60 visualization reports in Looker Studio, complex PostgreSQL queries and AWS → BigQuery data transformation. Took part in LLM implementations for tools like Valia's Copilot and integrated HubSpot and Google Analytics APIs for marketing reports.",
      'exp.e3': 'Power BI dashboards connected to MySQL, OCR automation in Power Automate for invoice processing (−95% time), advanced Excel analyses with pivot tables and web scraping projects on Amazon and Overstock for competitive analysis.',
      'exp.e4': 'Coursework: Applied Machine Learning, CRISP-DM, Data Mining, Web Development, Statistics, Advanced Database Concepts. Graduated with honors (94.2% GPA). 1st place in the HEAD Competition among 80 teams from different colleges.',
      'exp.e5': 'Power Apps Development, Predictive Analytics, SQL Database Management and Data Visualization with Power BI. House pricing predictive model (+20% vs baseline) and a maintenance app in Power Apps (−15% downtime).',
      'exp.e6': 'Strong foundation in calculus, statistics and applied physics. Research assistant on 3D printing mechanics simulation and teaching assistant in mechanics for over 100 engineering students.',
      'exp.edu1t': 'Graduate Certificate · Analytics for Business Decision Making',
      'exp.edu2t': 'Diploma · Business Intelligence',
      'exp.edu3t': 'Bachelor of Science · Mechanical Engineering',
      'exp.cta': 'Want to see the full CV?',
      'exp.download': 'Download CV (PDF)',

      'awards.title': 'Awards & Recognition',
      'awards.a1': 'Team lead in charge of data strategy, management and storytelling. We built an analysis poster and a Machine Learning model on the effects of climate change on buildings in Hamilton.',
      'awards.a2': 'Team lead among 1600 participants and 200 teams. In charge of the engineering of the module\'s mechanical systems and of data transfer and visualization in Grafana in real time (humidity, mold, air pressure).',

      'contact.title': "Let's talk",
      'contact.h': 'Got a project in mind?',
      'contact.p': "I'm open to collaborate on Business Intelligence, Power Platform automation, data analytics or consulting projects. Tell me what you need and I'll get back to you in less than 24 hours.",
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
      window.location.href = 'mailto:edwin.santos@pucp.pe?subject=' + subj + '&body=' + body;
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
