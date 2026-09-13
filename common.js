// ============================================================
// SALMAN FARSI SIAM — shared behaviour (used on every page)
// Nav, theme toggle, mobile menu, scroll reveal, footer year.
// ============================================================

/* ---------------- FOOTER YEAR ---------------- */
(function footerYear() {
  const el = document.getElementById("footerYear");
  if (el) el.textContent = `© ${new Date().getFullYear()} Salman Farsi Siam`;
})();

/* ---------------- NAV: progress, stuck, active section, theme, burger ---------------- */
(function nav() {
  const progressBar = document.getElementById("progressBar");
  const navEl = document.getElementById("nav");
  const links = Array.from(document.querySelectorAll(".nav-link"));
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!navEl) return;
  let light = false;
  let open = false;

  function onScroll() {
    const y = window.scrollY;
    navEl.classList.toggle("stuck", y > 40);
    if (progressBar) {
      const max = document.body.scrollHeight - window.innerHeight;
      const progress = max > 0 ? y / max : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Scroll-spy only matters on pages that actually contain these sections
  // (the homepage). On other pages the lookups simply find nothing and the
  // observer has nothing to watch, so this is safe to run everywhere.
  const sections = ["about", "services", "software", "work", "voices", "contact"];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) => l.classList.toggle("active", l.dataset.id === e.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      light = !light;
      document.documentElement.dataset.theme = light ? "light" : "dark";
      themeToggle.textContent = light ? "☾" : "☀";
      themeToggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    });
  }

  const mobileMenuBackdrop = document.getElementById("mobileMenuBackdrop");

  if (menuToggle && mobileMenu) {
    function openMenu() {
      open = true;
      mobileMenu.classList.add("open");
      if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add("open");
      menuToggle.textContent = "✕";
      menuToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function closeMenu() {
      open = false;
      mobileMenu.classList.remove("open");
      if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove("open");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    menuToggle.addEventListener("click", () => { open ? closeMenu() : openMenu(); });
    if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener("click", closeMenu);
    mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }
})();

/* ---------------- REVEAL ON SCROLL ---------------- */
(function reveal() {
  const els = Array.from(document.querySelectorAll(".reveal"));
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
  els.forEach((el) => io.observe(el));
})();

// Small reusable helper other page scripts can call after injecting new
// .reveal elements into the DOM at runtime (e.g. dynamically rendered cards).
window.observeReveal = function observeReveal(root) {
  const els = Array.from((root || document).querySelectorAll(".reveal:not(.in)"));
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
  els.forEach((el) => io.observe(el));
};
