/* ════════════════════════════════════════════
   ⚙️  EMAILJS CONFIG — GANTI DENGAN MILIK ANDA
════════════════════════════════════════════ */
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

/* ════════════════════════════════════════════
   PRELOADER
════════════════════════════════════════════ */
/* ════════════════════════════════════════════
   PRELOADER
════════════════════════════════════════════ */
(function initPreloader() {
  const fill    = document.querySelector(".preloader-bar-fill");
  const percent = document.querySelector(".preloader-percent");

  let count = 0;
  const interval = setInterval(() => {
    count = Math.min(count + Math.floor(Math.random() * 18 + 8), 100);
    if (fill)    fill.style.width = count + "%";
    if (percent) percent.textContent = count + "%";
    if (count >= 100) clearInterval(interval);
  }, 60);

  function hidePreloader() {
    const el = document.getElementById("preloader");
    if (el && !el.classList.contains("hide")) {
      el.classList.add("hide");
    }
  }

  window.addEventListener("load", () => setTimeout(hidePreloader, 1800));
  setTimeout(hidePreloader, 5000);
})();


/* ════════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════════ */
const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");

if (cursorDot && cursorRing) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  
  // Easing factor for the ring (lower = smoother/slower)
  const speed = 0.15;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows immediately
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  });

  // Animation loop for the ring
  function animateCursor() {
    ringX += (mouseX - ringX) * speed;
    ringY += (mouseY - ringY) * speed;
    
    cursorRing.style.left = ringX + "px";
    cursorRing.style.top = ringY + "px";
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects on interactive elements
  const interactives = document.querySelectorAll("a, button, input, textarea, .proj-row, .cert-row, .skill-card");
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorRing.style.width = "50px";
      cursorRing.style.height = "50px";
      cursorRing.style.background = "rgba(0, 0, 0, 0.05)";
      cursorDot.style.transform = "translate(-50%, -50%) scale(0.5)";
    });
    el.addEventListener("mouseleave", () => {
      cursorRing.style.width = "36px";
      cursorRing.style.height = "36px";
      cursorRing.style.borderColor = "rgba(0, 0, 0, 0.15)";
      cursorRing.style.background = "transparent";
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });
}

/* ════════════════════════════════════════════
   THEME & LANGUAGE
════════════════════════════════════════════ */
const html = document.documentElement;
let isDark = true;
let isEN = true;

function setTheme(dark) {
  isDark = dark;
  html.setAttribute("data-theme", dark ? "dark" : "light");
  const icon = dark ? "bi-moon-stars" : "bi-sun";
  const label = dark ? "Dark" : "Light";
  document.getElementById("themeIcon").className = `bi ${icon}`;
  document.getElementById("themeLabel").textContent = label;
  document.getElementById("themeIconMobile").className = `bi ${icon}`;
}

function setLang(en) {
  isEN = en;
  html.setAttribute("data-lang", en ? "en" : "id");
  document.querySelectorAll("[data-lang-en]").forEach((el) => {
    const val = en
      ? el.getAttribute("data-lang-en")
      : el.getAttribute("data-lang-id");
    if (val !== null) el.innerHTML = val;
  });
  document.querySelectorAll("[data-placeholder-en]").forEach((el) => {
    el.placeholder = en
      ? el.getAttribute("data-placeholder-en")
      : el.getAttribute("data-placeholder-id");
  });
  document.getElementById("langLabel").textContent = en ? "EN" : "ID";
  document.getElementById("langLabelMobile").textContent = en ? "EN" : "ID";
}

document
  .getElementById("themeToggle")
  .addEventListener("click", () => setTheme(!isDark));
document
  .getElementById("themeToggleMobile")
  .addEventListener("click", () => setTheme(!isDark));
document
  .getElementById("langToggle")
  .addEventListener("click", () => setLang(!isEN));
document
  .getElementById("langToggleMobile")
  .addEventListener("click", () => setLang(!isEN));

/* ════════════════════════════════════════════
   NAVBAR — SCROLL + ACTIVE LINK
════════════════════════════════════════════ */
window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 50);
});

document.querySelectorAll("section[id]").forEach((section) => {
  new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          document
            .querySelectorAll(".navbar-nav .nav-link")
            .forEach((l) => l.classList.remove("active"));
          const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
          if (a) a.classList.add("active");
        }
      });
    },
    { rootMargin: "-20% 0px -60% 0px" },
  ).observe(section);
});

/* ════════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════════ */
const revealIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".reveal, .reveal-left, .reveal-right")
  .forEach((el) => revealIO.observe(el));

/* ════════════════════════════════════════════
   SKILLS — FILTER + CARD ANIMATION + PROGRESS
════════════════════════════════════════════ */
document.querySelectorAll(".skill-filters .filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".skill-filters .filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.getAttribute("data-filter");
    document.querySelectorAll(".skill-card").forEach((c) => {
      const show = f === "all" || c.getAttribute("data-cat") === f;
      c.setAttribute("data-hidden", !show);
      if (show) setTimeout(() => c.classList.add("visible"), 50);
      else c.classList.remove("visible");
    });
  });
});

const skillCardIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting)
        setTimeout(() => e.target.classList.add("visible"), i * 60);
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".skill-card").forEach((c) => skillCardIO.observe(c));

let barsAnimated = false;
const barIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !barsAnimated) {
        barsAnimated = true;
        document.querySelectorAll(".progress-fill").forEach((b) => {
          setTimeout(() => {
            b.style.width = b.getAttribute("data-width") + "%";
          }, 200);
        });
      }
    });
  },
  { threshold: 0.3 },
);
const firstBar = document.querySelector(".progress-track");
if (firstBar) barIO.observe(firstBar);

/* ════════════════════════════════════════════
   PROJECTS — FILTER + MODAL
════════════════════════════════════════════ */
const projectData = {
  rumusin: {
    title: "Rumusin! — Physics Learning Web App",
    titleID: "Rumusin! — Aplikasi Web Pembelajaran Fisika",
    cat: "Web Application",
    catID: "Aplikasi Web",
    img: "assets/img/app/rumusin-apps.png",
    desc: "Rumusin! is a web-based physics learning application designed to help students understand and calculate physics formulas interactively with a clean and responsive UI.",
    descID:
      "Rumusin! adalah aplikasi pembelajaran fisika berbasis web yang dirancang untuk membantu siswa memahami dan menghitung rumus fisika secara interaktif dengan antarmuka yang bersih dan responsif.",
    stack: "HTML, CSS, Bootstrap 5, JavaScript",
    category: "Web Application / Education",
    categoryID: "Aplikasi Web / Pendidikan",
    features: [
      "Kalkulator rumus untuk berbagai topik fisika",
      "Bagian pembelajaran dengan penjelasan terstruktur",
      "Tampilan responsif di semua perangkat",
      "Desain antarmuka modern dan ramah pengguna",
    ],
    featuresEN: [
      "Formula calculator for multiple physics topics",
      "Learning sections with structured explanations",
      "Fully responsive layout on all devices",
      "Modern and user-friendly UI design",
    ],
    tags: ["HTML", "Bootstrap 5", "JavaScript", "EdTech"],
    live: "https://rumusinfisika.netlify.app/",
    github: "#",
  },
  catetin: {
    title: "Catetin! — Personal Finance Tracker",
    titleID: "Catetin! — Aplikasi Pencatat Keuangan Pribadi",
    cat: "Web Application",
    catID: "Aplikasi Web",
    img: "assets/img/app/catetin-app.png",
    desc: "A personal finance tracking application to record income and expenses with a simple interface, clear transaction history, and balance summary dashboard.",
    descID:
      "Aplikasi pencatat keuangan pribadi untuk mencatat pemasukan dan pengeluaran dengan antarmuka sederhana, riwayat transaksi yang jelas, dan dasbor ringkasan saldo.",
    stack: "HTML, CSS, Bootstrap 5, JavaScript, JSON",
    category: "Web Application / Finance",
    categoryID: "Aplikasi Web / Keuangan",
    features: [
      "Pencatatan transaksi pemasukan dan pengeluaran",
      "Riwayat transaksi dengan fitur pencarian",
      "Dasbor ringkasan saldo",
      "Tampilan responsif dan bersih",
    ],
    featuresEN: [
      "Income & expense transaction recording",
      "Transaction history with search feature",
      "Balance summary dashboard",
      "Responsive and clean UI",
    ],
    tags: ["JavaScript", "Bootstrap 5", "JSON", "Finance"],
    live: "https://catetinkeuangan.netlify.app/",
    github: "#",
  },
  rfid: {
    title: "IoT RFID Absence App",
    titleID: "Aplikasi Absensi RFID IoT",
    cat: "IoT & NodeMCU Project",
    catID: "Proyek IoT & NodeMCU",
    img: "assets/img/app/rfid-apps.png",
    desc: "An IoT-based RFID attendance system using NodeMCU and Arduino. The system reads student identity cards via RFID, displays the attendance status on an LCD screen, and manages user data in real time.",
    descID:
      "Sistem absensi berbasis RFID menggunakan NodeMCU dan Arduino. Sistem ini membaca kartu identitas siswa melalui RFID, menampilkan status kehadiran pada layar LCD, dan mengelola data pengguna secara real-time.",
    stack: "NodeMCU, Arduino, C++, RFID, LCD",
    category: "IoT / Hardware / Embedded System",
    categoryID: "IoT / Perangkat Keras / Sistem Tertanam",
    features: [
      "Pembacaan kartu RFID secara real-time",
      "Output status kehadiran pada layar LCD",
      "Manajemen data pengguna terintegrasi",
      "Sistem notifikasi kehadiran otomatis",
    ],
    featuresEN: [
      "Real-time RFID card reading",
      "Attendance status output on LCD screen",
      "Integrated user data management",
      "Automated attendance notification system",
    ],
    tags: ["NodeMCU", "Arduino", "RFID", "LCD", "IoT", "C++"],
    live: "https://kti-ilyasaramadhany.netlify.app/",
    github: "https://github.com/yasaramdh07/Lightweight-RFID-attendance-system-for-schools.git",
  },
  replate: {
    title: "Replate — Food Waste Resale App",
    titleID: "Replate — Aplikasi Penjualan Sisa Makanan",
    cat: "Laravel Application",
    catID: "Aplikasi Laravel",
    img: "assets/img/app/replate-apps.png",
    desc: "Replate is a web-based food waste resale solution built with Laravel—helping restaurants/UMKM sell leftover food at a cheaper price to reduce waste.",
    descID:
      "Replate adalah solusi penjualan sisa makanan berbasis web yang dibangun dengan Laravel—membantu restoran/UMKM menjual makanan sisa dengan harga lebih murah untuk mengurangi limbah makanan.",
    stack: "Laravel, PHP, MySQL, Bootstrap 5",
    category: "Laravel / Sustainability Platform",
    categoryID: "Laravel / Platform Keberlanjutan",
    features: [
      "Manajemen akun pengguna",
      "Pencatatan dan pengelolaan sisa makanan",
      "Penawaran makanan sisa dengan harga lebih murah",
      "Pelaporan transaksi dan aktivitas",
    ],
    featuresEN: [
      "User account management",
      "Leftover food listing & management",
      "Resale offers for leftover food at a lower price",
      "Transaction and activity reporting",
    ],
    tags: ["SQLite", "Bootstrap", "Sustainability"],
    live: "https://replate-foodwastesolution.netlify.app/",
    github: "https://github.com/yasaramdh07/Replate---Less-Waste-More-Plates.git",
  },
   lms: {
    title: "Multimedia Class — Learning Management System",
    titleID: "Multimedia Class — Learning Management System",
    cat: "Web Application",
    catID: "Aplikasi Web",
    img: "assets/img/app/lms-apps.png",
    desc: "Developed a web-based Learning Management System (LMS) for the Multimedia extracurricular program at MTs & MA YABIKA. Features include attendance management, curriculum roadmaps, assignment portfolios, grading, role-based access (Admin, Mentor, Student), and hybrid cloud storage integration using Google Drive & YouTube. Built with PHP and SQLite for a lightweight and efficient learning platform.",
    descID:
      "Mengembangkan Learning Management System (LMS) berbasis web untuk program ekstrakurikuler Multimedia di MTs & MA YABIKA. Fitur mencakup manajemen absensi, peta kurikulum, portofolio tugas, penilaian, akses berbasis peran (Admin, Mentor, Siswa), serta integrasi penyimpanan cloud hibrid menggunakan Google Drive & YouTube. Dibangun dengan PHP dan SQLite untuk platform pembelajaran yang ringan dan efisien.",
    stack: "PHP, SQLite, Bootstrap 5",
    category: "Web Application / E-Learning",
    categoryID: "Aplikasi Web / E-Learning",
    features: [
      "Manajemen absensi siswa",
      "Peta kurikulum dan silabus",
      "Portofolio tugas digital",
      "Penilaian dan feedback",
      "Akses berbasis peran (Admin, Mentor, Siswa)",
      "Integrasi penyimpanan cloud (Google Drive, YouTube)",
    ],
    featuresEN: [
      "Student attendance management",
      "Curriculum roadmap and syllabus",
      "Digital assignment portfolio",
      "Grading and feedback system",
      "Role-based access (Admin, Mentor, Student)",
      "Cloud storage integration (Google Drive, YouTube)",
    ],
    tags: ["SQLite", "Bootstrap", "E-Learning"],
    live: "https://multimediayabika.netlify.app/",
    github: "https://github.com/yasaramdh07/Multimedia-Class-Learning-Management-System-LMS-V2.git",
  },
  ordio: {
    title: "Ordio.io - Integrated Restaurant Management System",
    titleID: "Ordio.io - Sistem Manajemen Restoran Terpadu",
    cat: "Web Application",
    catID: "Aplikasi Web",
    img: "assets/img/app/ordio-apps.png",
    desc: "Ordio.io is a modern and integrated restaurant management application designed to streamline restaurant operations from end to end. The application includes self-service customer ordering via QR Code scanning, real-time cashier dashboard, raw material stock management, as well as financial recording and reporting.",
    descID:
      "Ordio.io adalah aplikasi manajemen restoran modern dan terpadu (Integrated Restaurant Management System) yang dirancang untuk mempermudah operasional restoran dari ujung ke ujung. Aplikasi ini mencakup pemesanan pelanggan mandiri melalui pemindaian QR Code, dashboard kasir real-time, manajemen stok bahan baku, hingga pencatatan keuangan dan laporan.",
    stack: "PHP, SQLite, Bootstrap 5",
    category: "Web Application / E-Voting",
    categoryID: "Aplikasi Web / E-Voting",
    features: [
      "Customer self-ordering via QR Code",
      "Real-time cashier dashboard",
      "Raw material stock management",
      "Financial recording and reporting",
    ],
    featuresEN: [
      "Customer self-ordering via QR Code",
      "Real-time cashier dashboard",
      "Raw material stock management",
      "Financial recording and reporting",
    ],
    tags: ["PHP", "SQLite", "Bootstrap 5"],
    live: "#",
    github: "https://github.com/yasaramdh07/Ordio.io---Sistem-Restoran-Terpadu.git",
  },
    sms: {
    title: "Stock Management System-App",
    titleID: "Sistem Manajemen Stok-App",
    cat: "Web Application",
    catID: "Aplikasi Web",
    img: "assets/img/app/sms-apps.png",
    desc: "Web-based inventory management system with real-time stock tracking, product variants, transaction management, low-stock alerts, and PDF/Excel reporting.",
    descID:
      "Sistem manajemen inventaris berbasis web dengan pelacakan stok real-time, variasi produk, manajemen transaksi, peringatan stok rendah, dan laporan PDF/Excel.",
    stack: "PHP, SQLite, Bootstrap 5",
    category: "Web Application / E-Voting",
    categoryID: "Aplikasi Web / E-Voting",
    features: [
      "Mencatat Stok Masuk (Restock) / Keluar (Penjualan)",
      "Mengelola Master Produk",
      "Mendukung Variasi Produk (Ukuran, Warna, dll.)",
      "Membuat Laporan PDF / Excel",
      "Peringatan Stok Rendah",
    ],
    featuresEN: [
      "Record Incoming (Restock) / Outgoing (Sales) Stock",
      "Manage Product Master Data",
      "Support Product Variants (Size, Color, etc.)",
      "Generate PDF / Excel Reports",
      "Low Stock Alerts",
    ],
    tags: ["PHP", "SQLite", "Bootstrap 5"],
    live: "#",
    github: "https://github.com/yasaramdh07/Stock-Management-System-Web-Based-App.git",
  },
  matchday: {
    title: "Matchday — Live Match Control & Broadcast Overlay",
    titleID: "Matchday — Sistem Kontrol Skor & Overlay Broadcast",
    cat: "Laravel Application",
    catID: "Aplikasi Laravel",
    img: "assets/img/app/matchday-apps.png",
    desc: "Matchday is a real-time match score control and broadcast overlay system for futsal, local leagues, tournaments, and OBS/vMix-based broadcast productions.",
    descID: "Matchday adalah sistem kontrol skor pertandingan dan overlay broadcast real-time untuk futsal, liga lokal, turnamen, dan produksi siaran berbasis OBS/vMix.",
    stack: "Laravel, SQLite",
    category: "Laravel / Live Broadcast",
    categoryID: "Laravel / Siaran Langsung",
    features: [
      "Kontrol skor pertandingan secara real-time",
      "Overlay siaran untuk OBS dan vMix",
      "Dukungan pertandingan futsal, liga lokal, dan turnamen",
      "Tampilan informasi pertandingan yang siap digunakan untuk produksi siaran",
    ],
    featuresEN: [
      "Real-time match score control",
      "Broadcast overlay support for OBS and vMix",
      "Support for futsal matches, local leagues, and tournaments",
      "Match information display ready for broadcast production",
    ],
    tags: ["Laravel", "SQLite", "Real-time", "OBS", "vMix"],
    live: "#",
    github: "https://github.com/yasaramdh07/Matchday-Live---Sistem-kontrol-skor-pertandingan-dan-overlay-broadcast-real-time.",
  },
};

function openModal(key) {
  const p = projectData[key];
  if (!p) return;
  const en = isEN;
  document.getElementById("modalCat").textContent = en ? p.cat : p.catID;
  document.getElementById("modalTitle").textContent = en ? p.title : p.titleID;
  document.getElementById("modalDesc").textContent = en ? p.desc : p.descID;
  document.getElementById("modalStack").textContent = p.stack;
  document.getElementById("modalCategory").textContent = en
    ? p.category
    : p.categoryID;

  const modalImg = document.getElementById("modalThumbImg");
  if (modalImg) {
    modalImg.src = p.img;
    modalImg.alt = p.title;
  }

  const feats = en ? p.featuresEN : p.features;
  document.getElementById("modalFeatures").innerHTML = feats
    .map(
      (f) =>
        `<div class="modal-feature-item"><i class="bi bi-check2-circle"></i> ${f}</div>`,
    )
    .join("");
  document.getElementById("modalTags").innerHTML = p.tags
    .map((t) => `<span class="modal-tag">${t}</span>`)
    .join("");
  document.getElementById("modalActions").innerHTML = `
    <a href="${p.live}" target="_blank" class="btn-primary-custom"><i class="bi bi-box-arrow-up-right"></i>${en ? "Live Demo" : "Demo Langsung"}</a>
    <a href="${p.github}" target="_blank" class="btn-outline-custom"><i class="bi bi-github"></i> GitHub</a>
  `;
  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOverlay").addEventListener("click", (e) => {
  if (e.target.id === "modalOverlay") closeModal();
});

document
  .querySelectorAll(".proj-row")
  .forEach((c) =>
    c.addEventListener("click", () =>
      openModal(c.getAttribute("data-project")),
    ),
  );

const projCardIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting)
        setTimeout(() => e.target.classList.add("visible"), i * 80);
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".proj-row").forEach((c) => projCardIO.observe(c));

document.querySelectorAll(".proj-filters .filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".proj-filters .filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.getAttribute("data-filter");
    document
      .querySelectorAll(".proj-row")
      .forEach((c) =>
        c.setAttribute(
          "data-hidden",
          f !== "all" && c.getAttribute("data-cat") !== f,
        ),
      );
  });
});

/* ════════════════════════════════════════════
   EXPERIENCE — TABS + TIMELINE
════════════════════════════════════════════ */
document.querySelectorAll(".exp-tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".exp-tab")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const tab = btn.getAttribute("data-tab");
    document
      .querySelectorAll(".timeline-pane")
      .forEach((p) => p.classList.remove("active"));
    document.getElementById("pane-" + tab).classList.add("active");
    document.querySelectorAll("#pane-" + tab + " .tl-item").forEach((el, i) => {
      el.classList.remove("visible");
      setTimeout(() => el.classList.add("visible"), i * 100);
    });
  });
});

const tlIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting)
        setTimeout(() => e.target.classList.add("visible"), i * 120);
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".tl-item").forEach((el) => tlIO.observe(el));

/* ════════════════════════════════════════════
   CERTIFICATES — FILTER + LIGHTBOX
════════════════════════════════════════════ */
const certData = [
  {
    name: "Web Development Certificate",
    cat: "Web Development",
    catID: "Web Development",
    issuer: "Dunia Coding Academy",
    year: "2024",
    img: "assets/img/sertif/sertifikat-dca.jpg",
    url: "#",
  },
  {
    name: "Leadership Achievement — Ketua OSIS",
    cat: "Professional",
    catID: "Profesional",
    issuer: "OSIS MA YABIKA",
    year: "2023",
    img: "assets/img/sertif/ketos-2425.jpg",
    url: "#",
  },
  {
    name: "Regional Coordinator — FOKT",
    cat: "Professional",
    catID: "Profesional",
    issuer: "Forum OSIS Kabupaten Tangerang",
    year: "2026",
    img: "assets/img/sertif/ilyas.png",
    url: "#",
  },
  {
    name: "Public Speaker Certificate",
    cat: "Professional",
    catID: "Profesional",
    issuer: "School Organizations",
    year: "2026",
    img: "assets/img/sertif/man-1.jpg",
    url: "#",
  },
  {
    name: "Mentor Multimedia — MA YABIKA",
    cat: "Professional",
    catID: "Profesional",
    issuer: "Yayasan Bina Insan Kamil",
    year: "2026",
    img: "assets/img/sertif/serti-mm.png",
    url: "#",
  },
  {
    name: "Webinar — How to be a Product Manager",
    cat: "Web Development",
    catID: "Web Development",
    issuer: "Dunia Coding Academy",
    year: "2024",
    img: "assets/img/sertif/webinar-dca.jpg",
    url: "#",
  },
];

function openLightbox(idx) {
  const c = certData[idx];
  document.getElementById("lbCat").textContent = isEN ? c.cat : c.catID;
  document.getElementById("lbTitle").textContent = c.name;
  document.getElementById("lbIssuer").textContent = c.issuer;
  document.getElementById("lbYear").textContent = c.year;
  document.getElementById("lbImg").src = c.img;
  document.getElementById("lbImg").alt = c.name;
  document.getElementById("lbBtn").href = c.url;
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox") closeLightbox();
});

document
  .querySelectorAll(".cert-row")
  .forEach((c) =>
    c.addEventListener("click", () =>
      openLightbox(+c.getAttribute("data-cert")),
    ),
  );

const certCardIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting)
        setTimeout(() => e.target.classList.add("visible"), i * 80);
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".cert-row").forEach((c) => certCardIO.observe(c));

document.querySelectorAll(".cert-filters .filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".cert-filters .filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.getAttribute("data-filter");
    document
      .querySelectorAll(".cert-row")
      .forEach((c) =>
        c.setAttribute(
          "data-hidden",
          f !== "all" && c.getAttribute("data-cat") !== f,
        ),
      );
  });
});

/* ════════════════════════════════════════════
   CONTACT FORM + EMAILJS
════════════════════════════════════════════ */
if (typeof emailjs !== 'undefined') {
  try {
    emailjs.init("SgxiYqQ36-m_1_PEs");
  } catch (err) {
    console.error("EmailJS init failed:", err);
  }
} else {
  console.warn("EmailJS is not loaded. Contact form may not work.");
}

document
  .getElementById("contactMessage")
  .addEventListener("input", function () {
    document.getElementById("charCount").textContent = this.value.length;
  });

document.getElementById("submitBtn").addEventListener("click", async () => {
  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const subject = document.getElementById("contactSubject").value.trim();
  const message = document.getElementById("contactMessage").value.trim();
  const statusEl = document.getElementById("formStatus");
  const btn = document.getElementById("submitBtn");

  if (!name || !email || !subject || !message) {
    statusEl.className = "form-status error";
    statusEl.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> ${isEN ? "Please fill in all fields." : "Mohon lengkapi semua kolom."}`;
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    statusEl.className = "form-status error";
    statusEl.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> ${isEN ? "Please enter a valid email address." : "Masukkan alamat email yang valid."}`;
    return;
  }

  btn.classList.add("loading");
  btn.disabled = true;
  statusEl.className = "form-status";

  try {
    if (typeof emailjs === 'undefined') throw new Error("EmailJS missing");
    await emailjs.send("service_dpjxkyx", "template_7o0ws6e", {
      from_name: name,
      from_email: email,
      subject,
      message,
      to_name: "Ilyasa Ramadhany",
    });
    statusEl.className = "form-status success";
    statusEl.innerHTML = `<i class="bi bi-check-circle-fill"></i> ${isEN ? "Message sent successfully! I'll get back to you soon." : "Pesan berhasil dikirim! Saya akan segera merespons."}`;
    ["contactName", "contactEmail", "contactSubject", "contactMessage"].forEach(
      (id) => (document.getElementById(id).value = ""),
    );
    document.getElementById("charCount").textContent = "0";
  } catch (err) {
    console.error(err);
    statusEl.className = "form-status error";
    statusEl.innerHTML = `<i class="bi bi-exclamation-circle-fill"></i> ${isEN ? "Failed to send. Please try again or contact me directly." : "Gagal mengirim. Silakan coba kembali atau hubungi saya langsung."}`;
  }

  btn.classList.remove("loading");
  btn.disabled = false;
});

/* Contact cards reveal */
const contactIO = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting)
        setTimeout(() => e.target.classList.add("visible"), i * 100);
    });
  },
  { threshold: 0.1 },
);
document
  .querySelectorAll(
    ".contact-info-card, .avail-card, .contact-socials, .contact-form-wrap",
  )
  .forEach((el) => contactIO.observe(el));

/* ════════════════════════════════════════════
   MISC
════════════════════════════════════════════ */
document.getElementById("footerYear").textContent = new Date().getFullYear();

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
    closeLightbox();
  }
});

/* ----------------------------------------------------------
   NAVBAR
---------------------------------------------------------- */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  // Scroll → add .scrolled class
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Active link on section enter
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.navbar-nav .nav-link');

  const sectionIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(
          `.navbar-nav .nav-link[href="#${entry.target.id}"]`
        );
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { rootMargin: "-20% 0px -60% 0px" });

  sections.forEach(s => sectionIO.observe(s));
}
