require("dotenv").config();
const express = require("express");
const cors = require("cors");
const initSqlJs = require("sql.js");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, "data", "portfolio.db");

app.use(cors());
app.use(express.json());

let db;

function saveDb() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

function seedDatabase() {
  const [{ values: [[projectCount]] }] = db.exec("SELECT COUNT(*) FROM projects");
  if (projectCount === 0) {
    const stmt = db.prepare(
      `INSERT INTO projects (title, description_en, description_hu, tech, gradient, link, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );

    const projects = [
      ["VILLAGE WEBSITE",
        "A full website for a local village built with Angular and PrimeNG. Events page with filtering, search, sorting, modals — and a lot more sections still in the works. Biggest project so far.",
        "Egy teljes weboldal egy helyi falunak Angular és PrimeNG használatával. Események oldal szűréssel, kereséssel, rendezéssel, modálokkal — és még sok más rész készül. Eddigi legnagyobb projekt.",
        "ANGULAR", "primary-secondary", "#", 1],
      ["KÖNYVTÁR",
        "Library management system with full CRUD operations, built with Spring Boot, Thymeleaf, and MySQL. Includes validation, custom exceptions, logging with aspects, and a proper MVC structure.",
        "Könyvtár kezelő rendszer teljes CRUD műveletekkel, Spring Boot, Thymeleaf és MySQL használatával. Tartalmaz validációt, egyéni kivételeket, naplózást aspektusokkal és megfelelő MVC struktúrát.",
        "SPRING BOOT", "accent-warning", "#", 2],
      ["ARENA SHOOTER",
        "Top-down arena survival game in Python. WASD movement, click to shoot, dash mechanic, bouncing bullets, enemy AI with obstacle avoidance, and difficulty that scales the longer you survive.",
        "Felülnézetes aréna túlélő játék Pythonban. WASD mozgás, kattintásra lövés, dash mechanika, pattogó lövedékek, akadálykerülő ellenség AI, és a nehézség nő minél tovább élsz.",
        "PYGAME", "secondary-accent", "#", 3],
    ];

    for (const p of projects) {
      stmt.run(p);
    }
    stmt.free();
  }

  const [{ values: [[translationCount]] }] = db.exec("SELECT COUNT(*) FROM translations");
  if (translationCount === 0) {
    const stmt = db.prepare("INSERT INTO translations (key, lang, value) VALUES (?, ?, ?)");

    const t = [
      ["nav.home", "en", "Home"], ["nav.home", "hu", "Főoldal"],
      ["nav.about", "en", "About"], ["nav.about", "hu", "Rólam"],
      ["nav.hobbies", "en", "Hobbies"], ["nav.hobbies", "hu", "Hobbik"],
      ["nav.work", "en", "Work"], ["nav.work", "hu", "Munkáim"],
      ["nav.contact", "en", "Contact"], ["nav.contact", "hu", "Kapcsolat"],

      ["hero.subtitle", "en", "CREATIVE / DEVELOPER / DESIGNER"],
      ["hero.subtitle", "hu", "KREATÍV / FEJLESZTŐ / DESIGNER"],
      ["hero.text", "en", "Building digital experiences with style, edge, and creativity"],
      ["hero.text", "hu", "Digitális élmények stílussal, karakterrel és kreativitással"],
      ["hero.button", "en", "VIEW MY WORK"], ["hero.button", "hu", "MUNKÁIM"],

      ["about.title", "en", "ABOUT ME"], ["about.title", "hu", "RÓLAM"],
      ["about.who", "en", "WHO I AM"], ["about.who", "hu", "KI VAGYOK"],
      ["about.text1", "en", "I'm a creative developer and designer with a passion for street culture, skateboarding, and bold visual aesthetics. I blend technical expertise with artistic vision to create unique digital experiences."],
      ["about.text1", "hu", "Kreatív fejlesztő és designer vagyok, aki rajong az utcai kultúráért, a gördeszkázásért és a merész vizuális megoldásokért. A technikai tudást művészi látásmóddal ötvözöm, hogy egyedi digitális élményeket hozzak létre."],
      ["about.text2", "en", "Whether it's web development, graphic design, or creative projects, I bring an unconventional approach that stands out from the crowd."],
      ["about.text2", "hu", "Legyen szó webfejlesztésről, grafikai tervezésről vagy kreatív projektekről, mindig egy szokatlan megközelítést hozok, ami kitűnik a tömegből."],
      ["about.skills_title", "en", "SKILLS & EXPERTISE"], ["about.skills_title", "hu", "KÉPESSÉGEK"],
      ["about.skill1", "en", "WEB DEVELOPMENT"], ["about.skill1", "hu", "WEBFEJLESZTÉS"],
      ["about.skill2", "en", "GRAPHIC DESIGN"], ["about.skill2", "hu", "GRAFIKAI TERVEZÉS"],
      ["about.skill3", "en", "UI/UX DESIGN"], ["about.skill3", "hu", "UI/UX TERVEZÉS"],
      ["about.skill4", "en", "CREATIVE DIRECTION"], ["about.skill4", "hu", "KREATÍV IRÁNYÍTÁS"],
      ["about.skill5", "en", "BRAND IDENTITY"], ["about.skill5", "hu", "MÁRKAIDENTITÁS"],

      ["hobbies.title", "en", "WHEN I'M NOT CODING"], ["hobbies.title", "hu", "AMIKOR NEM KÓDOLOK"],
      ["hobbies.coffee_title", "en", "COFFEE"], ["hobbies.coffee_title", "hu", "KÁVÉ"],
      ["hobbies.coffee_text", "en", "Fueling creativity one espresso at a time. From pour-overs to cold brews, I'm always exploring new beans and brewing methods."],
      ["hobbies.coffee_text", "hu", "Egy eszpresszóval hajtva a kreativitást. Pour-overtől a cold brew-ig, mindig új babokat és főzési módszereket fedezek fel."],
      ["hobbies.skate_title", "en", "SKATING"], ["hobbies.skate_title", "hu", "GÖRDESZKÁZÁS"],
      ["hobbies.skate_text", "en", "Street skating is where I find my flow. Every trick, every line - it's about style, persistence, and pushing limits."],
      ["hobbies.skate_text", "hu", "Az utcai gördeszkázásban találom meg a flow-t. Minden trükk, minden vonal - a stílusról, kitartásról és határok feszegetéséről szól."],
      ["hobbies.volleyball_title", "en", "VOLLEYBALL"], ["hobbies.volleyball_title", "hu", "RÖPLABDA"],
      ["hobbies.volleyball_text", "en", "Teamwork, timing, and energy. Whether it's beach or indoor, volleyball keeps me sharp and connected."],
      ["hobbies.volleyball_text", "hu", "Csapatmunka, időzítés és energia. Legyen strand vagy terem, a röplabda élesben tart és összeköt."],
      ["hobbies.art_title", "en", "ART"], ["hobbies.art_title", "hu", "MŰVÉSZET"],
      ["hobbies.art_text", "en", "From street art to digital designs, I love creating visuals that tell stories and capture raw, authentic vibes."],
      ["hobbies.art_text", "hu", "Az utcai művészettől a digitális designig, imádok olyan vizuális tartalmakat készíteni, amik történeteket mesélnek és nyers, autentikus hangulatot ragadnak meg."],

      ["work.title", "en", "SELECTED WORK"], ["work.title", "hu", "MUNKÁIM"],
      ["work.view_button", "en", "VIEW PROJECT"], ["work.view_button", "hu", "MEGNÉZEM"],

      ["contact.title", "en", "LET'S WORK TOGETHER"], ["contact.title", "hu", "DOLGOZZUNK EGYÜTT"],
      ["contact.intro", "en", "Got a project in mind? Want to collaborate? Drop me a message and let's create something amazing."],
      ["contact.intro", "hu", "Van egy projekted? Szeretnél együtt dolgozni? Küldj egy üzenetet és alkossunk valami nagyszerűt."],
      ["contact.name", "en", "YOUR NAME"], ["contact.name", "hu", "NEVED"],
      ["contact.email", "en", "YOUR EMAIL"], ["contact.email", "hu", "E-MAIL CÍMED"],
      ["contact.message", "en", "YOUR MESSAGE"], ["contact.message", "hu", "ÜZENETED"],
      ["contact.send", "en", "SEND MESSAGE"], ["contact.send", "hu", "KÜLDÉS"],
      ["contact.success", "en", "Message sent! I'll get back to you soon."],
      ["contact.success", "hu", "Üzenet elküldve! Hamarosan válaszolok."],
      ["contact.error", "en", "Something went wrong. Try emailing me directly."],
      ["contact.error", "hu", "Valami hiba történt. Próbálj meg közvetlenül e-mailt küldeni."],

      ["footer.text", "en", "© 2025 LOKOS LEVENTE. ALL RIGHTS RESERVED."],
      ["footer.text", "hu", "© 2025 LOKOS LEVENTE. MINDEN JOG FENNTARTVA."],

      ["sticker.fresh", "en", "FRESH"], ["sticker.fresh", "hu", "FRISS"],
      ["sticker.skate", "en", "SKATE"], ["sticker.skate", "hu", "SKATE"],
      ["sticker.spike", "en", "SPIKE"], ["sticker.spike", "hu", "LECSAP"],
      ["sticker.create", "en", "CREATE"], ["sticker.create", "hu", "ALKOSS"],
    ];

    for (const row of t) {
      stmt.run(row);
    }
    stmt.free();
  }

  saveDb();
}

async function main() {
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description_en TEXT NOT NULL,
      description_hu TEXT NOT NULL,
      tech TEXT NOT NULL,
      gradient TEXT DEFAULT 'primary-secondary',
      link TEXT DEFAULT '#',
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS translations (
      key TEXT NOT NULL,
      lang TEXT NOT NULL,
      value TEXT NOT NULL,
      PRIMARY KEY (key, lang)
    )
  `);

  seedDatabase();

  app.get("/api/projects", (req, res) => {
    const lang = req.query.lang || "en";
    const descCol = lang === "hu" ? "description_hu" : "description_en";
    const results = db.exec(
      `SELECT id, title, ${descCol} as description, tech, gradient, link, sort_order
       FROM projects ORDER BY sort_order`
    );
    if (!results.length) return res.json([]);
    const cols = results[0].columns;
    const rows = results[0].values.map((row) =>
      Object.fromEntries(cols.map((col, i) => [col, row[i]]))
    );
    res.json(rows);
  });

  app.get("/api/projects/:id", (req, res) => {
    const results = db.exec("SELECT * FROM projects WHERE id = ?", [req.params.id]);
    if (!results.length || !results[0].values.length)
      return res.status(404).json({ error: "Project not found" });
    const cols = results[0].columns;
    const row = Object.fromEntries(cols.map((col, i) => [col, results[0].values[0][i]]));
    res.json(row);
  });

  app.post("/api/projects", (req, res) => {
    const { title, description_en, description_hu, tech, gradient, link, sort_order } = req.body;
    if (!title || !description_en || !description_hu || !tech) {
      return res.status(400).json({ error: "Missing required fields: title, description_en, description_hu, tech" });
    }
    db.run(
      `INSERT INTO projects (title, description_en, description_hu, tech, gradient, link, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description_en, description_hu, tech, gradient || "primary-secondary", link || "#", sort_order || 0]
    );
    saveDb();
    const results = db.exec("SELECT * FROM projects WHERE id = last_insert_rowid()");
    const cols = results[0].columns;
    const row = Object.fromEntries(cols.map((col, i) => [col, results[0].values[0][i]]));
    res.status(201).json(row);
  });

  app.put("/api/projects/:id", (req, res) => {
    const existing = db.exec("SELECT * FROM projects WHERE id = ?", [req.params.id]);
    if (!existing.length || !existing[0].values.length)
      return res.status(404).json({ error: "Project not found" });

    const { title, description_en, description_hu, tech, gradient, link, sort_order } = req.body;
    db.run(
      `UPDATE projects SET
        title = COALESCE(?, title),
        description_en = COALESCE(?, description_en),
        description_hu = COALESCE(?, description_hu),
        tech = COALESCE(?, tech),
        gradient = COALESCE(?, gradient),
        link = COALESCE(?, link),
        sort_order = COALESCE(?, sort_order)
      WHERE id = ?`,
      [title, description_en, description_hu, tech, gradient, link, sort_order, req.params.id]
    );
    saveDb();
    const results = db.exec("SELECT * FROM projects WHERE id = ?", [req.params.id]);
    const cols = results[0].columns;
    const row = Object.fromEntries(cols.map((col, i) => [col, results[0].values[0][i]]));
    res.json(row);
  });

  app.delete("/api/projects/:id", (req, res) => {
    const existing = db.exec("SELECT * FROM projects WHERE id = ?", [req.params.id]);
    if (!existing.length || !existing[0].values.length)
      return res.status(404).json({ error: "Project not found" });
    db.run("DELETE FROM projects WHERE id = ?", [req.params.id]);
    saveDb();
    res.json({ message: "Project deleted" });
  });

  app.get("/api/translations/:lang", (req, res) => {
    const results = db.exec(
      "SELECT key, value FROM translations WHERE lang = ?",
      [req.params.lang]
    );
    if (!results.length) return res.json({});
    const translations = {};
    for (const row of results[0].values) {
      translations[row[0]] = row[1];
    }
    res.json(translations);
  });

  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      await transporter.sendMail({
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        replyTo: email,
        to: process.env.EMAIL_USER,
        subject: `Portfolio contact: ${name}`,
        text: `From: ${name} (${email})\n\n${message}`,
        html: `
          <h3>New message from your portfolio</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
      res.json({ success: true });
    } catch (err) {
      console.error("Email error:", err.message);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

main().catch(console.error);