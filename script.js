// ============================================================
// SALMAN FARSI SIAM — vanilla JS behaviour
// Ported 1:1 from the React implementation.
// ============================================================

/* ---------------- DATA ---------------- */
const projects = [
  {
    id: "p01", title: "Short-Form Reel Cut", category: "video", label: "Sample project",
    image: "assets/work-video-01.jpg",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Placeholder edit showing pacing, rhythmic cuts and motion-graphic titling for a vertical social campaign.",
    year: "2026", type: "Premiere Pro · After Effects", duration: "00:34", col: 4, ar: "16/9",
  },
  {
    id: "p02", title: "Poster Study", category: "graphic", label: "Placeholder",
    image: "assets/work-graphic-01.jpg",
    description: "Placeholder poster exploring grid tension, halftone texture and a restricted two-colour palette.",
    year: "2026", type: "Illustrator · Photoshop", col: 2, ar: "3/4",
  },
  {
    id: "p03", title: "Portrait Grade", category: "photo", label: "Sample project",
    image: "assets/work-photo-after.jpg",
    description: "Placeholder retouch and cinematic colour grade — skin work, dodge and burn, warm key separation.",
    year: "2026", type: "Lightroom · Photoshop", col: 2, ar: "3/4",
  },
  {
    id: "p04", title: "Brand Motion Title", category: "video", label: "Project preview",
    image: "assets/work-video-01.jpg",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Placeholder title sequence: kinetic typography, light leaks and frame-accurate sound-led timing.",
    year: "2026", type: "After Effects", duration: "00:12", col: 4, ar: "16/9",
  },
  {
    id: "p05", title: "Editorial Layout", category: "graphic", label: "Placeholder",
    image: "assets/work-graphic-01.jpg",
    description: "Placeholder social/print layout system built on a strict modular grid.",
    year: "2025", type: "Illustrator", col: 3, ar: "4/3",
  },
  {
    id: "p06", title: "Product Retouch", category: "photo", label: "Sample project",
    image: "assets/work-photo-before.jpg",
    description: "Placeholder clean-up pass: blemish removal, background rebuild, tonal balancing.",
    year: "2025", type: "Photoshop", col: 3, ar: "4/3",
  },
  {
    id: "p07", title: "CapCut Social Cut", category: "video", label: "Project preview",
    image: "assets/work-video-01.jpg",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Placeholder fast-turnaround vertical edit with captions and beat-matched cuts.",
    year: "2025", type: "CapCut", duration: "00:21", col: 6, ar: "21/9",
  },
];

const compareImages = { before: "assets/work-photo-before.jpg", after: "assets/work-photo-after.jpg" };

const services = [
  {
    num: "01", name: "Video Editing", years: "02+ Years",
    blurb: "Cutting for rhythm first. Short-form reels, YouTube edits and promo pieces where the pacing carries the story and the motion graphics stay out of its way.",
    tools: ["Adobe Premiere Pro", "Adobe After Effects", "CapCut"],
    items: ["Short-form / reels", "YouTube edits", "Promotional content", "Motion graphics", "Pacing & storytelling"],
  },
  {
    num: "02", name: "Photo Editing", years: "04+ Years",
    blurb: "Four years inside Photoshop and Lightroom — retouching that keeps skin looking like skin, and grades that give an image a mood instead of a filter.",
    tools: ["Adobe Photoshop", "Adobe Lightroom"],
    items: ["Retouching", "Manipulation", "Colour correction", "Image enhancement", "Creative edits"],
  },
  {
    num: "03", name: "Graphic Design", years: "04+ Years",
    blurb: "Marks, posters and social systems built on real typographic structure — designed to survive being scaled, cropped and reposted.",
    tools: ["Adobe Photoshop", "Adobe Illustrator"],
    items: ["Logos", "Branding", "Posters", "Social graphics", "Promotional design"],
  },
];

const tools = [
  { abbr: "Pr", name: "Premiere Pro", use: "Edit / assembly" },
  { abbr: "Ae", name: "After Effects", use: "Motion / titles" },
  { abbr: "Ps", name: "Photoshop", use: "Retouch / composite" },
  { abbr: "Ai", name: "Illustrator", use: "Vector / logo" },
  { abbr: "Lr", name: "Lightroom", use: "Colour / grade" },
  { abbr: "Cc", name: "CapCut", use: "Fast social cuts" },
];

const quotes = [
  { text: "Sample testimonial. Replace this with a real client's words — the layout holds two to four short sentences comfortably.", who: "Client name", role: "Video editing · 2026" },
  { text: "Sample testimonial. A second placeholder so the scrolling quote row has rhythm before the real feedback lands here.", who: "Client name", role: "Photo editing · 2026" },
  { text: "Sample testimonial. Swap in a genuine quote about turnaround, communication or the finished edit.", who: "Client name", role: "Graphic design · 2026" },
  { text: "Sample testimonial. A short line about fast turnaround works well here — keep it specific and honest.", who: "Client name", role: "Reel edit · 2025" },
  { text: "Sample testimonial. Mentioning communication style or revision process gives future clients a clear picture.", who: "Client name", role: "Branding · 2025" },
  { text: "Sample testimonial. A quote about colour grading or a particular technical strength fits nicely in this slot.", who: "Client name", role: "Photo retouch · 2025" },
  { text: "Sample testimonial. Something about how the final cut felt versus the brief that was given at the start.", who: "Client name", role: "YouTube edit · 2025" },
  { text: "Sample testimonial. A note on pricing fairness or clarity of the process also works well in this space.", who: "Client name", role: "Poster design · 2024" },
  { text: "Sample testimonial. Real feedback about a tight deadline being met without sacrificing quality reads well here.", who: "Client name", role: "Social cut · 2024" },
  { text: "Sample testimonial. The tenth and final placeholder — replace every line in this array with genuine client quotes.", who: "Client name", role: "Logo design · 2024" },
];

const MARQUEE_WORDS = ["Video Editing", "Photo Editing", "Graphic Design", "Motion Graphics", "Retouching", "Branding"];
const ROLES = ["VIDEO EDITOR", "PHOTO EDITOR", "GRAPHIC DESIGNER", "MOTION DESIGNER"];
const LEDE = "Salman Farsi Siam is a freelance video editor, photo editor and graphic designer — one person handling the cut, the colour and the layout so a project keeps one voice from start to finish.";

/* ---------------- MARQUEE ---------------- */
(function buildMarquee() {
  const track = document.getElementById("marqueeTrack");
  const run = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  track.innerHTML = run.map((w) => `
    <span class="marquee-item">
      <b>${w}</b>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
        <path d="M7 0l1.6 5.4L14 7l-5.4 1.6L7 14l-1.6-5.4L0 7l5.4-1.6z" />
      </svg>
    </span>`).join("");
})();

/* ---------------- HERO: canvas field, glow, frame counter, typer ---------------- */
(function heroCanvas() {
  const canvas = document.getElementById("canvasField");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let raf = 0, w = 0, h = 0, running = true;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width; h = rect.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const io = new IntersectionObserver(([e]) => {
    running = e ? e.isIntersecting : false;
    if (running) raf = requestAnimationFrame(draw);
  });
  io.observe(canvas);

  let lines = w < 700 ? 12 : 26;
  let t = 0;

  function draw() {
    if (!running || !ctx) return;
    t += 0.0035;
    ctx.clearRect(0, 0, w, h);
    const rootStyle = getComputedStyle(document.documentElement);
    const accent = rootStyle.getPropertyValue("--accent").trim();
    const textColor = rootStyle.getPropertyValue("--text").trim();
    for (let i = 0; i < lines; i++) {
      const p = i / lines;
      const y0 = h * (0.22 + p * 0.68);
      ctx.beginPath();
      for (let x = 0; x <= w; x += 14) {
        const n = Math.sin(x * 0.0032 + t * 2 + i * 0.42) * (16 + i * 1.6) +
                  Math.sin(x * 0.0011 - t * 1.4 + i) * 10;
        const y = y0 + n * (0.35 + p * 0.9);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = i % 7 === 3
        ? `color-mix(in oklch, ${accent} ${26 + p * 30}%, transparent)`
        : `color-mix(in oklch, ${textColor} ${10 + p * 14}%, transparent)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    raf = requestAnimationFrame(draw);
  }
  raf = requestAnimationFrame(draw);
})();

(function heroGlow() {
  const el = document.getElementById("heroGlow");
  if (!el) return;
  window.addEventListener("pointermove", (e) => {
    el.style.setProperty("--mx", `${(e.clientX / window.innerWidth) * 100}%`);
    el.style.setProperty("--my", `${(e.clientY / window.innerHeight) * 100}%`);
  }, { passive: true });
})();

(function frameCounter() {
  const el = document.getElementById("frameCounter");
  if (!el) return;
  const update = () => {
    const frame = 1 + Math.round(window.scrollY / 24);
    el.textContent = `Frame ${String(frame).padStart(3, "0")}`;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
})();

(function typer() {
  const el = document.getElementById("typer");
  if (!el) return;
  const state = { i: 0, j: 0, back: false };
  function tick() {
    const word = ROLES[state.i % ROLES.length];
    state.j += state.back ? -1 : 1;
    el.textContent = word.slice(0, state.j);
    let delay = state.back ? 45 : 85;
    if (!state.back && state.j === word.length) {
      state.back = true;
      delay = 1500;
    } else if (state.back && state.j === 0) {
      state.back = false;
      state.i += 1;
      delay = 320;
    }
    setTimeout(tick, delay);
  }
  setTimeout(tick, 700);
})();

/* ---------------- ABOUT: word-by-word lede lighting ---------------- */
(function aboutLede() {
  const p = document.getElementById("aboutLede");
  if (!p) return;
  const words = LEDE.split(" ");
  p.innerHTML = words.map((w) => `<span>${w} </span>`).join("");
  const spans = Array.from(p.querySelectorAll("span"));

  function onScroll() {
    const r = p.getBoundingClientRect();
    const lit = Math.max(0, Math.min(1,
      (window.innerHeight * 0.85 - r.top) / (r.height + window.innerHeight * 0.25)
    ));
    spans.forEach((s, i) => {
      s.classList.toggle("lit", i / words.length < lit);
    });
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

/* ---------------- SERVICES accordion ---------------- */
(function buildServices() {
  const list = document.getElementById("svcList");
  if (!list) return;

  // Build the DOM once. Re-rendering innerHTML on every hover was what made
  // the open/close feel choppy — the browser had no persistent element to
  // animate, so the grid-template-rows transition never got to play.
  list.innerHTML = services.map((s) => `
    <button class="svc" aria-expanded="false" data-num="${s.num}">
      <span class="svc-top">
        <span class="svc-num">${s.num}</span>
        <h3 class="svc-name">${s.name}</h3>
        <span class="svc-yrs">${s.years}</span>
      </span>
      <span class="svc-panel">
        <span class="svc-panel-inner">
          <span>
            <span style="color:var(--muted);display:block;max-width:48ch">${s.blurb}</span>
            <span class="chiprow">${s.tools.map((t) => `<span class="chip solid">${t}</span>`).join("")}</span>
          </span>
          <span class="chiprow" style="align-content:start">${s.items.map((it) => `<span class="chip">${it}</span>`).join("")}</span>
        </span>
      </span>
    </button>`).join("");

  const buttons = Array.from(list.querySelectorAll(".svc"));
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function setOpen(num) {
    buttons.forEach((btn) => {
      const isOpen = btn.dataset.num === num;
      btn.classList.toggle("open", isOpen);
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  }

  buttons.forEach((btn) => {
    const num = btn.dataset.num;
    // On touch devices, a tap fires a synthetic mouseenter right before the
    // click event — that opened the panel via hover, then the click handler
    // (seeing it already open) immediately closed it again, so it looked
    // like nothing happened on the first tap. Only bind hover/focus-to-open
    // on devices that actually have a real pointer + hover capability.
    if (supportsHover) {
      btn.addEventListener("mouseenter", () => setOpen(num));
      btn.addEventListener("focus", () => setOpen(num));
    }
    btn.addEventListener("click", () => setOpen(btn.classList.contains("open") ? null : num));
  });

  setOpen(services[0].num);
})();

/* ---------------- SOFTWARE tool wall ---------------- */
(function buildToolWall() {
  const wall = document.getElementById("toolWall");
  if (!wall) return;
  wall.innerHTML = tools.map((t, i) => `
    <div class="tool reveal" style="--d:${i * 60}ms">
      <span class="tool-abbr">${t.abbr}</span>
      <span>
        <span class="tool-name" style="display:block">${t.name}</span>
        <span class="tool-use">${t.use}</span>
      </span>
    </div>`).join("");

  // re-observe newly added reveal elements
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
  wall.querySelectorAll(".reveal").forEach((el) => io.observe(el));
})();

/* ---------------- STATS counters ---------------- */
(function buildStats() {
  const grid = document.getElementById("statsGrid");
  if (!grid) return;
  const STATS = [
    { to: 4, label: "Years Photo Editing" },
    { to: 4, label: "Years Graphic Design" },
    { to: 2, label: "Years Video Editing" },
  ];
  grid.innerHTML = STATS.map((s, i) => `
    <div class="stat reveal">
      <span class="stat-num" data-to="${s.to}">00<sup>+</sup></span>
      <p class="stat-label">${s.label}</p>
    </div>`).join("");

  const revealIo = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); revealIo.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
  grid.querySelectorAll(".reveal").forEach((el) => revealIo.observe(el));

  grid.querySelectorAll(".stat-num").forEach((el) => {
    const to = Number(el.dataset.to);
    const io = new IntersectionObserver((entries) => {
      if (!entries[0] || !entries[0].isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      function step(now) {
        const p = Math.min(1, (now - start) / 1200);
        const n = Math.round(to * (1 - Math.pow(1 - p, 3)));
        el.innerHTML = `${String(n).padStart(2, "0")}<sup>+</sup>`;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
  });
})();

/* ---------------- WORK: filters, grid, before/after slider, lightbox ---------------- */
(function work() {
  const grid = document.getElementById("workGrid");
  const filtersEl = document.getElementById("filters");
  if (!grid) return;
  let filter = "all";

  function compareHTML() {
    return `
      <div class="compare" style="--pos:50%;--col:3" role="slider" tabindex="0"
        aria-label="Before and after photo edit comparison" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" id="compareBox">
        <img src="${compareImages.after}" alt="Sample portrait after colour grading and retouching" />
        <img class="top" src="${compareImages.before}" alt="Same sample portrait before editing, flat and ungraded" />
        <span class="compare-handle" aria-hidden="true"></span>
        <span class="compare-label" style="left:0.7rem">Before</span>
        <span class="compare-label" style="right:0.7rem">After</span>
        <span class="badge">Drag · Before / After</span>
      </div>`;
  }

  function cardHTML(p, i, listLen) {
    return `
      <button class="card" data-id="${p.id}" style="--col:${p.col};--colm:${p.colMobile ?? 2};--ar:${p.ar};--d:${i * 70}ms" aria-label="Open ${p.title}">
        <img src="${p.image}" alt="${p.title} — ${p.label}" loading="lazy" />
        <span class="card-veil"></span>
        <span class="badge">${p.label}</span>
        ${p.category === "video" ? `<span class="play" aria-hidden="true">▶</span>` : ""}
        <span class="card-body">
          <span>
            <span class="card-tag">${p.category === "graphic" ? "Graphic design" : p.category} · ${p.type}</span>
            <span class="card-title" style="display:block">${p.title}</span>
          </span>
          <span class="card-num">${String(i + 1).padStart(2, "0")} / ${String(listLen).padStart(2, "0")}${p.duration ? ` · ${p.duration}` : ""}</span>
        </span>
        <span class="cropmark tl"></span>
        <span class="cropmark br"></span>
      </button>`;
  }

  function render() {
    const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);
    const showCompare = filter === "all" || filter === "photo";
    grid.innerHTML = (showCompare ? compareHTML() : "") + list.map((p, i) => cardHTML(p, i, list.length)).join("");

    // rebind compare slider
    const box = document.getElementById("compareBox");
    if (box) bindCompare(box);

    // rebind cards -> lightbox
    grid.querySelectorAll(".card").forEach((btn) => {
      btn.addEventListener("click", () => {
        const project = projects.find((p) => p.id === btn.dataset.id);
        if (project) openLightbox(project);
      });
    });
  }

  function bindCompare(box) {
    let dragging = false;
    function move(clientX) {
      const r = box.getBoundingClientRect();
      const pos = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
      box.style.setProperty("--pos", `${pos}%`);
      box.setAttribute("aria-valuenow", String(Math.round(pos)));
    }
    box.addEventListener("pointerdown", (e) => {
      dragging = true;
      box.setPointerCapture(e.pointerId);
      move(e.clientX);
    });
    box.addEventListener("pointermove", (e) => { if (dragging) move(e.clientX); });
    box.addEventListener("pointerup", () => { dragging = false; });
    box.addEventListener("keydown", (e) => {
      const current = parseFloat(box.style.getPropertyValue("--pos")) || 50;
      if (e.key === "ArrowLeft") {
        const pos = Math.max(0, current - 4);
        box.style.setProperty("--pos", `${pos}%`);
        box.setAttribute("aria-valuenow", String(Math.round(pos)));
      }
      if (e.key === "ArrowRight") {
        const pos = Math.min(100, current + 4);
        box.style.setProperty("--pos", `${pos}%`);
        box.setAttribute("aria-valuenow", String(Math.round(pos)));
      }
    });
  }

  filtersEl.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      filter = btn.dataset.key;
      filtersEl.querySelectorAll(".filter").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("on", on);
        b.setAttribute("aria-selected", String(on));
      });
      render();
    });
  });

  render();

  /* Lightbox */
  const lightbox = document.getElementById("lightbox");
  const lightboxInner = document.getElementById("lightboxInner");
  const lightboxClose = document.getElementById("lightboxClose");

  const ICON_PLAY = `<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M3 1.8v10.4c0 .8.9 1.3 1.6.8l7.7-5.2c.6-.4.6-1.3 0-1.7L4.6 1c-.7-.5-1.6 0-1.6.8z"/></svg>`;
  const ICON_PAUSE = `<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><rect x="2" y="1.5" width="3.4" height="11" rx="0.8"/><rect x="8.6" y="1.5" width="3.4" height="11" rx="0.8"/></svg>`;
  const ICON_PLAY_BIG = `<svg width="26" height="26" viewBox="0 0 14 14" fill="currentColor"><path d="M3 1.8v10.4c0 .8.9 1.3 1.6.8l7.7-5.2c.6-.4.6-1.3 0-1.7L4.6 1c-.7-.5-1.6 0-1.6.8z"/></svg>`;
  const ICON_VOLUME = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 6v4h2.6L8 12.6V3.4L4.6 6H2z" fill="currentColor"/><path d="M10.2 5.2a3.2 3.2 0 010 5.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M12 3.5a6 6 0 010 9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" opacity="0.6"/></svg>`;
  const ICON_MUTE = `<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 6v4h2.6L8 12.6V3.4L4.6 6H2z" fill="currentColor"/><path d="M11 6l4 4M15 6l-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`;
  const ICON_SKIP_BACK = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 5a7 7 0 106.32 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M14.8 2.6L11.6 5l2.6 3.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><text x="12" y="17" text-anchor="middle" font-size="7" fill="currentColor" font-family="inherit">5</text></svg>`;
  const ICON_SKIP_FWD = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 5a7 7 0 11-6.32 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M9.2 2.6L12.4 5l-2.6 3.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><text x="12" y="17" text-anchor="middle" font-size="7" fill="currentColor" font-family="inherit">5</text></svg>`;

  function formatTime(sec) {
    if (!isFinite(sec) || sec < 0) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  // Simple themed video player: play/pause, ±5s skip, volume — nothing else.
  // Works with both click (desktop) and tap (touch), plus keyboard shortcuts.
  function initVideoPlayer(root) {
    const video = root.querySelector(".vp-video");
    const playBtn = root.querySelector(".vp-play");
    const bigPlay = root.querySelector(".vp-bigplay");
    const backBtn = root.querySelector(".vp-back");
    const fwdBtn = root.querySelector(".vp-fwd");
    const muteBtn = root.querySelector(".vp-mute");
    const volumeRange = root.querySelector(".vp-volume-range");
    const progressFill = root.querySelector(".vp-progress-fill");
    const timeEl = root.querySelector(".vp-time");
    if (!video) return;

    function updatePlayUI() {
      const playing = !video.paused && !video.ended;
      playBtn.innerHTML = playing ? ICON_PAUSE : ICON_PLAY;
      playBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
      root.classList.toggle("playing", playing);
    }
    function togglePlay() {
      if (video.paused || video.ended) video.play().catch(() => {});
      else video.pause();
    }
    function skip(delta) {
      const dur = video.duration || Infinity;
      video.currentTime = Math.min(Math.max(0, video.currentTime + delta), dur);
    }
    function updateProgress() {
      const pct = video.duration ? (video.currentTime / video.duration) * 100 : 0;
      progressFill.style.width = `${pct}%`;
      timeEl.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    }
    function updateVolumeUI() {
      const muted = video.muted || video.volume === 0;
      muteBtn.innerHTML = muted ? ICON_MUTE : ICON_VOLUME;
      muteBtn.setAttribute("aria-label", muted ? "Unmute" : "Mute");
      volumeRange.value = muted ? 0 : video.volume;
    }
    function setVolume(v) {
      video.volume = Math.min(1, Math.max(0, v));
      video.muted = video.volume === 0;
      updateVolumeUI();
    }

    playBtn.addEventListener("click", togglePlay);
    bigPlay.addEventListener("click", togglePlay);
    video.addEventListener("click", togglePlay);
    backBtn.addEventListener("click", () => skip(-5));
    fwdBtn.addEventListener("click", () => skip(5));
    muteBtn.addEventListener("click", () => {
      video.muted = !video.muted;
      if (!video.muted && video.volume === 0) video.volume = 1;
      updateVolumeUI();
    });
    volumeRange.addEventListener("input", () => setVolume(Number(volumeRange.value)));

    video.addEventListener("play", updatePlayUI);
    video.addEventListener("pause", updatePlayUI);
    video.addEventListener("ended", updatePlayUI);
    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateProgress);

    // Keyboard: space/K = play-pause, ←/→ = skip 5s, ↑/↓ = volume, M = mute
    root.addEventListener("keydown", (e) => {
      switch (e.key) {
        case " ":
        case "Spacebar":
        case "k":
        case "K":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowRight":
          e.preventDefault();
          skip(5);
          break;
        case "ArrowLeft":
          e.preventDefault();
          skip(-5);
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume(video.volume + 0.1);
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume(video.volume - 0.1);
          break;
        case "m":
        case "M":
          video.muted = !video.muted;
          updateVolumeUI();
          break;
      }
    });

    updatePlayUI();
    updateVolumeUI();
    root.focus({ preventScroll: true });
    video.play().catch(() => { /* autoplay blocked — big play button still works */ });
  }

  function openLightbox(project) {
    lightboxInner.innerHTML = `
      ${project.video
        ? `<div class="video-player" tabindex="0">
             <video class="vp-video" src="${project.video}" playsinline preload="metadata"></video>
             <button type="button" class="vp-bigplay" aria-label="Play">${ICON_PLAY_BIG}</button>
             <div class="vp-controls">
               <button type="button" class="vp-btn vp-play" aria-label="Play">${ICON_PLAY}</button>
               <button type="button" class="vp-btn vp-back" aria-label="Back 5 seconds">${ICON_SKIP_BACK}</button>
               <button type="button" class="vp-btn vp-fwd" aria-label="Forward 5 seconds">${ICON_SKIP_FWD}</button>
               <div class="vp-progress" aria-hidden="true"><div class="vp-progress-fill"></div></div>
               <span class="vp-time">0:00 / 0:00</span>
               <div class="vp-volume">
                 <button type="button" class="vp-btn vp-mute" aria-label="Mute">${ICON_VOLUME}</button>
                 <input type="range" class="vp-volume-range" min="0" max="1" step="0.05" value="1" aria-label="Volume" />
               </div>
             </div>
           </div>`
        : `<img class="lightbox-media" src="${project.image}" alt="${project.title}" />`}
      <div class="lightbox-bar">
        <div>
          <p class="meta meta-accent" style="margin:0">${project.label} · ${project.category}</p>
          <h3 class="display" style="font-size:clamp(1.3rem,3vw,2.2rem);margin-top:6px">${project.title}</h3>
          <p style="max-width:58ch;opacity:0.75;margin-bottom:0">${project.description}</p>
        </div>
        <p class="meta" style="margin:0;text-align:right">
          ${project.year}<br />${project.type}${project.duration ? `<br />${project.duration}` : ""}
        </p>
      </div>`;
    lightbox.style.display = "grid";
    lightbox.setAttribute("aria-label", project.title);
    document.body.style.overflow = "hidden";

    if (project.video) {
      const playerRoot = lightboxInner.querySelector(".video-player");
      if (playerRoot) initVideoPlayer(playerRoot);
    }
  }
  function closeLightbox() {
    const video = lightboxInner.querySelector(".vp-video");
    if (video) video.pause();
    lightbox.style.display = "none";
    lightboxInner.innerHTML = "";
    document.body.style.overflow = "";
  }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
})();

/* ---------------- TESTIMONIALS: sliding carousel ---------------- */
(function buildQuotesCarousel() {
  const viewport = document.getElementById("quoteViewport");
  const track = document.getElementById("quoteTrack");
  const dotsWrap = document.getElementById("quoteDots");
  const prevBtn = document.getElementById("prevQuote");
  const nextBtn = document.getElementById("nextQuote");
  const carousel = document.getElementById("quoteCarousel");
  if (!track) return;

  track.innerHTML = quotes.map((q) => `
    <div class="quote-lane">
      <blockquote class="quote">
        <span class="quote-mark" aria-hidden="true">"</span>
        <p>${q.text}</p>
        <footer><b>${q.who}</b><br /><span class="meta">${q.role}</span></footer>
        <span class="cropmark br"></span>
      </blockquote>
    </div>`).join("");

  dotsWrap.innerHTML = quotes.map((_, i) =>
    `<button class="dot" data-i="${i}" aria-label="Go to testimonial ${i + 1}"></button>`
  ).join("");

  const lanes = Array.from(track.querySelectorAll(".quote-lane"));
  const dots = Array.from(dotsWrap.querySelectorAll(".dot"));
  let index = 0;
  let timer = null;
  const AUTOPLAY_MS = 5200;

  // Each lane is the same fixed width and sits side by side in one long
  // strip (no overlap, no absolute positioning). Sliding the whole strip
  // with translateX is what gives the real swipe motion; the lane that
  // lands in the middle gets scaled up via its own class.
  function positionTrack() {
    if (!lanes.length) return;
    const laneWidth = lanes[0].getBoundingClientRect().width;
    const viewportWidth = viewport.getBoundingClientRect().width;
    const offset = (viewportWidth - laneWidth) / 2 - index * laneWidth;
    track.style.transform = `translateX(${offset}px)`;
  }

  function update() {
    lanes.forEach((lane, i) => lane.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
    positionTrack();
  }
  function goTo(i) {
    index = (i + quotes.length) % quotes.length;
    update();
  }
  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }
  function stop() { if (timer) clearInterval(timer); }
  function play() { stop(); timer = setInterval(next, AUTOPLAY_MS); }
  function restart() { stop(); play(); }

  prevBtn.addEventListener("click", () => { prev(); restart(); });
  nextBtn.addEventListener("click", () => { next(); restart(); });
  lanes.forEach((lane, i) => {
    lane.addEventListener("click", () => {
      if (i !== index) { goTo(i); restart(); }
    });
  });
  dots.forEach((d) => d.addEventListener("click", () => { goTo(Number(d.dataset.i)); restart(); }));

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", play);
  carousel.addEventListener("focusin", stop);
  carousel.addEventListener("focusout", play);

  // swipe support
  let startX = null;
  viewport.addEventListener("pointerdown", (e) => { startX = e.clientX; stop(); });
  viewport.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (dx > 40) prev();
    else if (dx < -40) next();
    startX = null;
    play();
  });

  window.addEventListener("resize", positionTrack);
  window.addEventListener("load", positionTrack);

  update();
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) play();

  // reveal the whole carousel block once, then re-measure (layout may have shifted)
  const revealTarget = carousel.closest(".reveal") || carousel;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
        positionTrack();
      }
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
  if (revealTarget.classList.contains("reveal")) io.observe(revealTarget);
})();

/* ---------------- CONTACT form ---------------- */
/* ---------------- CUSTOM THEMED DROPDOWN (Project type) ---------------- */
(function customSelect() {
  const field = document.getElementById("fieldProject");
  const trigger = document.getElementById("projectTrigger");
  const valueEl = document.getElementById("projectValue");
  const hiddenInput = document.getElementById("cproject");
  const optionsList = document.getElementById("projectOptions");
  if (!field || !trigger || !optionsList) return;

  const options = Array.from(optionsList.querySelectorAll("li"));
  let highlighted = -1;

  function updateHighlight() {
    options.forEach((o, i) => o.classList.toggle("active", i === highlighted));
  }
  function open() {
    optionsList.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    highlighted = options.findIndex((o) => o.dataset.value === hiddenInput.value);
    updateHighlight();
  }
  function close() {
    optionsList.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  }
  function toggle() {
    if (optionsList.hidden) open(); else close();
  }
  function select(option) {
    hiddenInput.value = option.dataset.value;
    valueEl.textContent = option.dataset.value;
    hiddenInput.dispatchEvent(new Event("change"));
    close();
    trigger.focus();
  }

  trigger.addEventListener("click", toggle);
  options.forEach((opt) => opt.addEventListener("click", () => select(opt)));

  trigger.addEventListener("keydown", (e) => {
    if (["ArrowDown", "ArrowUp", "Enter", " ", "Escape"].includes(e.key)) e.preventDefault();
    if (e.key === "ArrowDown") {
      if (optionsList.hidden) open();
      else { highlighted = Math.min(options.length - 1, highlighted + 1); updateHighlight(); }
    } else if (e.key === "ArrowUp") {
      if (optionsList.hidden) open();
      else { highlighted = Math.max(0, highlighted - 1); updateHighlight(); }
    } else if (e.key === "Enter" || e.key === " ") {
      if (optionsList.hidden) open();
      else if (highlighted >= 0) select(options[highlighted]);
    } else if (e.key === "Escape") {
      close();
    }
  });

  document.addEventListener("click", (e) => {
    if (!field.contains(e.target)) close();
  });
})();

(function contactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const EMAIL = "salmanfarsi.creative@gmail.com";

  const nameInput = document.getElementById("cname");
  const emailInput = document.getElementById("cemail");
  const projectInput = document.getElementById("cproject");
  const messageInput = document.getElementById("cmessage");

  const fieldName = document.getElementById("fieldName");
  const fieldEmail = document.getElementById("fieldEmail");
  const fieldProject = document.getElementById("fieldProject");
  const fieldMessage = document.getElementById("fieldMessage");

  const errName = document.getElementById("errName");
  const errEmail = document.getElementById("errEmail");
  const errMessage = document.getElementById("errMessage");
  const status = document.getElementById("formStatus");

  function syncFilled(input, field) {
    field.classList.toggle("filled", input.value.trim().length > 0);
  }
  [[nameInput, fieldName], [emailInput, fieldEmail], [projectInput, fieldProject], [messageInput, fieldMessage]]
    .forEach(([input, field]) => {
      input.addEventListener("input", () => syncFilled(input, field));
      input.addEventListener("change", () => syncFilled(input, field));
    });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let hasError = false;

    if (nameInput.value.trim().length < 2) {
      errName.textContent = "Required"; errName.hidden = false; hasError = true;
    } else { errName.hidden = true; }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailInput.value)) {
      errEmail.textContent = "Invalid email"; errEmail.hidden = false; hasError = true;
    } else { errEmail.hidden = true; }

    if (messageInput.value.trim().length < 10) {
      errMessage.textContent = "Tell me a bit more"; errMessage.hidden = false; hasError = true;
    } else { errMessage.hidden = true; }

    if (hasError) return;

    const body = `Name: ${nameInput.value}\nEmail: ${emailInput.value}\nProject type: ${projectInput.value || "—"}\n\n${messageInput.value}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`New project enquiry — ${nameInput.value}`)}&body=${encodeURIComponent(body)}`;

    status.textContent = "Your email app should be open with the message ready to send.";
    status.classList.remove("note");
    status.classList.add("form-status");
  });
})();
