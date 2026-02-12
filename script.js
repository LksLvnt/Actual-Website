const API_BASE = "";
const FALLBACK_PROJECTS = [
  {
    id: 1, title: "VILLAGE WEBSITE", tech: "ANGULAR", gradient: "primary-secondary", link: "#", sort_order: 1,
    description_en: "A full website for a local village built with Angular and PrimeNG. Events page with filtering, search, sorting, modals — and a lot more sections still in the works. Biggest project so far.",
    description_hu: "Egy teljes weboldal egy helyi falunak Angular és PrimeNG használatával. Események oldal szűréssel, kereséssel, rendezéssel, modálokkal — és még sok más rész készül. Eddigi legnagyobb projekt.",
  },
  {
    id: 2, title: "KÖNYVTÁR", tech: "SPRING BOOT", gradient: "accent-warning", link: "#", sort_order: 2,
    description_en: "Library management system with full CRUD operations, built with Spring Boot, Thymeleaf, and MySQL. Includes validation, custom exceptions, logging with aspects, and a proper MVC structure.",
    description_hu: "Könyvtár kezelő rendszer teljes CRUD műveletekkel, Spring Boot, Thymeleaf és MySQL használatával. Tartalmaz validációt, egyéni kivételeket, naplózást aspektusokkal és megfelelő MVC struktúrát.",
  },
  {
    id: 3, title: "ARENA SHOOTER", tech: "PYGAME", gradient: "secondary-accent", link: "#", sort_order: 3,
    description_en: "Top-down arena survival game in Python. WASD movement, click to shoot, dash mechanic, bouncing bullets, enemy AI with obstacle avoidance, and difficulty that scales the longer you survive.",
    description_hu: "Felülnézetes aréna túlélő játék Pythonban. WASD mozgás, kattintásra lövés, dash mechanika, pattogó lövedékek, akadálykerülő ellenség AI, és a nehézség nő minél tovább élsz.",
  },
];
const FALLBACK_TRANSLATIONS = {
  en: {
    "nav.home": "Home", "nav.about": "About", "nav.hobbies": "Hobbies",
    "nav.work": "Work", "nav.contact": "Contact",
    "hero.subtitle": "DEVELOPER / STUDENT / PROBLEM SOLVER",
    "hero.text": "CS student who likes building things — from websites to low-level programs",
    "hero.button": "VIEW MY WORK",
    "about.title": "ABOUT ME", "about.who": "WHO I AM",
    "about.text1": "I'm a Computer Science student at the University of Pécs, studying Programming Informatics. I enjoy working across the full stack — frontend, backend, and everything in between.",
    "about.text2": "I like understanding how things work under the hood, whether that's a web app or a program running in DOSBox. I also serve as a student government representative.",
    "about.skills_title": "SKILLS & EXPERTISE",
    "about.skill1": "WEB DEVELOPMENT", "about.skill2": "BACKEND / API",
    "about.skill3": "LOW-LEVEL PROGRAMMING", "about.skill4": "DATABASES",
    "about.skill5": "LINUX / SYSADMIN",
    "hobbies.title": "WHEN I'M NOT CODING",
    "hobbies.coffee_title": "COFFEE",
    "hobbies.coffee_text": "Can't start the day without it. I like trying different beans and brewing methods — pour-over, cold brew, whatever works.",
    "hobbies.skate_title": "SKATING",
    "hobbies.skate_text": "Street skating mostly. It's a good way to clear my head and stay active. Still working on new tricks.",
    "hobbies.volleyball_title": "VOLLEYBALL",
    "hobbies.volleyball_text": "Beach or indoor, doesn't matter. It's fun, it's team-based, and it keeps me moving.",
    "hobbies.art_title": "ART",
    "hobbies.art_text": "I like messing around with visuals — digital stuff, doodles, whatever. Not a designer, just enjoy the process.",
    "work.title": "SELECTED WORK", "work.view_button": "VIEW PROJECT",
    "contact.title": "LET'S WORK TOGETHER",
    "contact.intro": "Got a project in mind? Want to collaborate? Drop me a message and let's create something amazing.",
    "contact.name": "YOUR NAME", "contact.email": "YOUR EMAIL",
    "contact.message": "YOUR MESSAGE", "contact.send": "SEND MESSAGE",
    "contact.success": "Message sent! I'll get back to you soon.",
    "contact.error": "Something went wrong. Try emailing me directly.",
    "footer.text": "© 2025 LOKOS LEVENTE. ALL RIGHTS RESERVED.",
    "sticker.fresh": "FRESH", "sticker.skate": "SKATE",
    "sticker.spike": "SPIKE", "sticker.create": "CREATE",
    "tech.title": "TECH STACK",
    "timeline.uni": "Started Programming Informatics BSc @ PTE TTK",
    "timeline.hok": "Elected student government representative (HÖK)",
    "timeline.spring": "Built library management system with Spring Boot",
    "timeline.assembly": "Assembly programming — disk sector reader in DOSBox",
    "timeline.angular": "Started building a village website with Angular",
    "timeline.portfolio": "Built this portfolio with Express + SQLite backend",
    "timeline.telekom": "Worked at Magyar Telekom over the summer",
    "about.timeline_title": "TIMELINE",
  },
  hu: {
    "nav.home": "Főoldal", "nav.about": "Rólam", "nav.hobbies": "Hobbik",
    "nav.work": "Munkáim", "nav.contact": "Kapcsolat",
    "hero.subtitle": "FEJLESZTŐ / HALLGATÓ / PROBLÉMAMEGOLDÓ",
    "hero.text": "Programtervező informatikus hallgató — weboldalaktól az alacsony szintű programozásig",
    "hero.button": "MUNKÁIM",
    "about.title": "RÓLAM", "about.who": "KI VAGYOK",
    "about.text1": "Programtervező informatikus hallgató vagyok a Pécsi Tudományegyetemen. Szívesen dolgozom a teljes stacken — frontend, backend és minden ami közte van.",
    "about.text2": "Szeretem megérteni, hogyan működnek a dolgok a motorháztető alatt, legyen az egy webalkalmazás vagy egy DOSBox-ban futó program. Emellett HÖK képviselő is vagyok.",
    "about.skills_title": "KÉPESSÉGEK",
    "about.skill1": "WEBFEJLESZTÉS", "about.skill2": "BACKEND / API",
    "about.skill3": "ALACSONY SZINTŰ PROGRAMOZÁS", "about.skill4": "ADATBÁZISOK",
    "about.skill5": "LINUX / RENDSZERGAZDA",
    "hobbies.title": "AMIKOR NEM KÓDOLOK",
    "hobbies.coffee_title": "KÁVÉ",
    "hobbies.coffee_text": "Nélküle nem indul a nap. Szívesen próbálok különböző babokat és főzési módszereket — pour-over, cold brew, ami épp jön.",
    "hobbies.skate_title": "GÖRDESZKÁZÁS",
    "hobbies.skate_text": "Főleg street skate. Jó módja annak, hogy kitisztuljon a fejem és mozogjak. Még mindig tanulok új trükköket.",
    "hobbies.volleyball_title": "RÖPLABDA",
    "hobbies.volleyball_text": "Strand vagy terem, mindegy. Szórakoztató, csapatjáték, és mozgásban tart.",
    "hobbies.art_title": "MŰVÉSZET",
    "hobbies.art_text": "Szívesen szórakozok vizuális dolgokkal — digitális cucc, rajzolgatás, bármi. Nem vagyok designer, csak élvezem.",
    "work.title": "MUNKÁIM", "work.view_button": "MEGNÉZEM",
    "contact.title": "DOLGOZZUNK EGYÜTT",
    "contact.intro": "Van egy projekted? Szeretnél együtt dolgozni? Küldj egy üzenetet és alkossunk valami nagyszerűt.",
    "contact.name": "NEVED", "contact.email": "E-MAIL CÍMED",
    "contact.message": "ÜZENETED", "contact.send": "KÜLDÉS",
    "contact.success": "Üzenet elküldve! Hamarosan válaszolok.",
    "contact.error": "Valami hiba történt. Próbálj meg közvetlenül e-mailt küldeni.",
    "footer.text": "© 2025 LOKOS LEVENTE. MINDEN JOG FENNTARTVA.",
    "sticker.fresh": "FRISS", "sticker.skate": "SKATE",
    "sticker.spike": "LECSAP", "sticker.create": "ALKOSS",
    "tech.title": "TECH STACK",
    "timeline.uni": "Programtervező informatikus BSc elkezdése @ PTE TTK",
    "timeline.hok": "HÖK képviselővé választás",
    "timeline.spring": "Könyvtár kezelő rendszer Spring Boot-tal",
    "timeline.assembly": "Assembly programozás — szektor olvasó DOSBox-ban",
    "timeline.angular": "Falu weboldal építésének kezdete Angular-ral",
    "timeline.portfolio": "Portfólió oldal Express + SQLite backend-del",
    "timeline.telekom": "Nyári munka a Magyar Telekomnál",
    "about.timeline_title": "IDŐVONAL",
  },
};
let currentLang = localStorage.getItem("lang") || "en";
let translations = {};
const gradientMap = {
  "primary-secondary": "project-image-1",
  "accent-warning": "project-image-2",
  "secondary-accent": "project-image-3",
};
const titleClasses = ["", "project-title-alt", "project-title-warning"];
async function loadTranslations(lang) {
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/api/translations/${lang}`);
      if (res.ok) {
        translations = await res.json();
        return;
      }
    } catch { /* fall through */ }
  }
  translations = FALLBACK_TRANSLATIONS[lang] || FALLBACK_TRANSLATIONS.en;
}
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (typingInProgress && el.id === "typing-target") return;
    const key = el.getAttribute("data-i18n");
    if (translations[key]) el.textContent = translations[key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[key]) el.placeholder = translations[key];
  });
  document.documentElement.lang = currentLang;
}
async function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  const toggle = document.getElementById("lang-toggle");
  if (toggle) toggle.textContent = lang === "en" ? "HU" : "EN";
  await loadTranslations(lang);
  applyTranslations();
  await loadProjects();
}
async function loadProjects() {
  let projects = null;
  if (API_BASE) {
    try {
      const res = await fetch(`${API_BASE}/api/projects?lang=${currentLang}`);
      if (res.ok) projects = await res.json();
    } catch { /* fall through */ }
  }
  if (!projects) {
    projects = FALLBACK_PROJECTS.map((p) => ({
      ...p,
      description: currentLang === "hu" ? p.description_hu : p.description_en,
    }));
  }
  renderProjects(projects);
}
function renderProjects(projects) {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  const viewText = translations["work.view_button"] || "VIEW PROJECT";
  grid.innerHTML = projects
    .map((p, i) => {
      const gradientClass = gradientMap[p.gradient] || `project-image-${(i % 3) + 1}`;
      const titleClass = titleClasses[i % titleClasses.length];
      return `
      <div class="card">
        <div class="project-image ${gradientClass}">${p.tech}</div>
        <h3 class="project-title ${titleClass}">${p.title}</h3>
        <p class="project-description">${p.description}</p>
        <a href="${p.link}" class="btn btn-small">${viewText}</a>
      </div>`;
    })
    .join("");
}
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "...";
    submitBtn.disabled = true;
    if (!API_BASE) {
      const subject = encodeURIComponent(`Portfolio contact: ${data.name}`);
      const body = encodeURIComponent(`From: ${data.name} (${data.email})\n\n${data.message}`);
      window.location.href = `mailto:lokoslevi06@gmail.com?subject=${subject}&body=${body}`;
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Send failed");
      status.textContent = translations["contact.success"] || "Message sent! I'll get back to you soon.";
      status.style.color = "var(--color-accent)";
      form.reset();
    } catch {
      status.textContent = translations["contact.error"] || "Something went wrong. Try emailing me directly.";
      status.style.color = "var(--color-primary)";
    }
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    setTimeout(() => { status.textContent = ""; }, 5000);
  });
}
function initMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.getElementById("nav-menu");
  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }
}
function initScrollAnimations() {
  document.querySelectorAll(
    ".section-title, .about-col, .hobby-card, .card, .timeline-item, .tech-item, .contact-form, .contact-intro, .accent-line, .social-links"
  ).forEach((el) => el.classList.add("reveal"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 5) * 0.1}s`;
    observer.observe(el);
  });
}
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}
let typingInProgress = false;
function initTypingEffect() {
  const target = document.getElementById("typing-target");
  if (!target) return;
  const text = target.textContent.trim();
  target.textContent = "";
  target.removeAttribute("data-i18n");
  typingInProgress = true;
  let i = 0;
  function type() {
    if (i < text.length) {
      target.textContent += text[i];
      i++;
      setTimeout(type, 60 + Math.random() * 40);
    } else {
      target.setAttribute("data-i18n", "hero.subtitle");
      typingInProgress = false;
    }
  }
  setTimeout(type, 800);
}

function initParallax() {
  const hero = document.querySelector(".hero");
  const decoration = document.querySelector("[data-parallax]");
  const title = document.querySelector(".hero-title");
  if (!hero || !decoration) return;
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const speed = parseFloat(decoration.dataset.parallax);
    decoration.style.transform = `translate(calc(-50% + ${x * speed * 1000}px), calc(-50% + ${y * speed * 1000}px)) rotate(5deg)`;
    if (title) {
      title.style.transform = `translate(${x * -8}px, ${y * -8}px)`;
    }
  });
  hero.addEventListener("mouseleave", () => {
    decoration.style.transform = "translate(-50%, -50%) rotate(5deg)";
    if (title) title.style.transform = "translate(0, 0)";
  });
}
function initKonamiCode() {
  const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let pos = 0;
  document.addEventListener("keydown", (e) => {
    if (document.getElementById("game-overlay") &&
        !document.getElementById("game-overlay").classList.contains("hidden")) return;
    if (e.keyCode === code[pos]) {
      pos++;
      if (pos === code.length) {
        pos = 0;
        triggerKonami();
      }
    } else {
      pos = 0;
    }
  });
}
function triggerKonami() {
  document.body.classList.add("konami-active");
  for (let i = 0; i < 50; i++) {
    const emoji = document.createElement("div");
    emoji.textContent = ["🛹", "☕", "🏐", "💻", "🎮"][Math.floor(Math.random() * 5)];
    emoji.style.cssText = `
      position: fixed;
      top: -50px;
      left: ${Math.random() * 100}vw;
      font-size: ${20 + Math.random() * 30}px;
      z-index: 10000;
      pointer-events: none;
      animation: emojiFall ${2 + Math.random() * 3}s linear forwards;
    `;
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 5000);
  }
  if (!document.getElementById("emoji-fall-style")) {
    const style = document.createElement("style");
    style.id = "emoji-fall-style";
    style.textContent = `
      @keyframes emojiFall {
        to { top: 110vh; transform: rotate(${Math.random() * 720}deg); }
      }
    `;
    document.head.appendChild(style);
  }
  setTimeout(() => document.body.classList.remove("konami-active"), 3000);
}
function initSnakeGame() {
  const overlay = document.getElementById("game-overlay");
  const closeBtn = document.getElementById("game-close");
  const canvas = document.getElementById("game-canvas");
  const scoreEl = document.getElementById("game-score");
  if (!overlay || !canvas) return;
  const ctx = canvas.getContext("2d");
  const grid = 20;
  const cols = canvas.width / grid;
  const rows = canvas.height / grid;
  let snake, food, dir, nextDir, score, gameLoop, running;
  function reset() {
    snake = [{ x: 10, y: 10 }];
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    score = 0;
    scoreEl.textContent = "0";
    placeFood();
  }
  function placeFood() {
    food = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    };
    for (const s of snake) {
      if (s.x === food.x && s.y === food.y) return placeFood();
    }
  }
  function draw() {
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff006e";
    ctx.shadowColor = "#ff006e";
    ctx.shadowBlur = 10;
    ctx.fillRect(food.x * grid + 2, food.y * grid + 2, grid - 4, grid - 4);
    ctx.shadowBlur = 0;
    snake.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? "#00f5ff" : "#8338ec";
      ctx.shadowColor = i === 0 ? "#00f5ff" : "#8338ec";
      ctx.shadowBlur = i === 0 ? 8 : 4;
      ctx.fillRect(s.x * grid + 1, s.y * grid + 1, grid - 2, grid - 2);
    });
    ctx.shadowBlur = 0;
  }
  function update() {
    dir = nextDir;
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
      return gameOver();
    }
    for (const s of snake) {
      if (s.x === head.x && s.y === head.y) return gameOver();
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreEl.textContent = score;
      placeFood();
    } else {
      snake.pop();
    }
    draw();
  }
  function gameOver() {
    clearInterval(gameLoop);
    running = false;
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff006e";
    ctx.font = "30px 'Bebas Neue', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillStyle = "#00f5ff";
    ctx.font = "20px 'Bebas Neue', sans-serif";
    ctx.fillText("SCORE: " + score, canvas.width / 2, canvas.height / 2 + 20);
    ctx.fillStyle = "#b0b0b0";
    ctx.font = "16px 'Bebas Neue', sans-serif";
    ctx.fillText("PRESS SPACE TO RESTART", canvas.width / 2, canvas.height / 2 + 50);
  }
  function start() {
    if (running) return;
    running = true;
    reset();
    draw();
    gameLoop = setInterval(update, 100);
  }
  function openGame() {
    overlay.classList.remove("hidden");
    start();
  }
  function closeGame() {
    overlay.classList.add("hidden");
    clearInterval(gameLoop);
    running = false;
  }
  closeBtn.addEventListener("click", closeGame);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeGame();
  });
  document.addEventListener("keydown", (e) => {
    if (overlay.classList.contains("hidden")) return;
    e.preventDefault();
    if (e.key === "Escape") return closeGame();
    if (e.key === " " && !running) return start();
    const dirs = {
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
    };
    const newDir = dirs[e.key];
    if (newDir && !(newDir.x === -dir.x && newDir.y === -dir.y)) {
      nextDir = newDir;
    }
  });
  window._openSnakeGame = openGame;
  const logo = document.querySelector(".logo-img");
  if (logo) {
    let clicks = 0;
    let timer;
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      clicks++;
      clearTimeout(timer);
      if (clicks >= 3) {
        clicks = 0;
        openGame();
      } else {
        timer = setTimeout(() => { clicks = 0; }, 600);
      }
    });
  }
}
async function init() {
  initMobileMenu();
  initScrollAnimations();
  initSmoothScroll();
  initContactForm();
  initTypingEffect();
  initParallax();
  initKonamiCode();
  initSnakeGame();
  const toggle = document.getElementById("lang-toggle");
  if (toggle) {
    toggle.textContent = currentLang === "en" ? "HU" : "EN";
    toggle.addEventListener("click", () => {
      setLanguage(currentLang === "en" ? "hu" : "en");
    });
  }
  await loadTranslations(currentLang);
  applyTranslations();
  await loadProjects();
}
init();