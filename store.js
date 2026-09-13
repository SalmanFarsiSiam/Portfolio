// ============================================================
// SALMAN FARSI SIAM — Store page behaviour
// Search + toggleable/removable tag filters + product grid.
//
// NOTE ON PAYMENTS:
// Checkout is intentionally NOT wired up yet. Each product below has a
// `price` and `currency` field so that a real checkout (bKash / PayPal /
// Stripe, whatever gets picked later) can be dropped in without touching
// the markup or the filter logic. For now "Buy now" opens a small modal
// that explains payment is coming soon and gives a direct contact link.
// ============================================================

const PRODUCTS = [
  {
    id: "pr01",
    title: "Cinematic LUT Pack Vol.1",
    blurb: "12 colour grades for moody, filmic footage — drag-and-drop into Premiere Pro or Resolve.",
    image: "assets/work-video-01.jpg",
    price: 12, currency: "USD", priceBDT: 1300,
    tags: ["Video", "LUTs", "Color Grading"],
    format: ".cube · Premiere / Resolve / FCPX",
  },
  {
    id: "pr02",
    title: "Reel Starter Pack — CapCut",
    blurb: "10 ready-to-edit CapCut templates for short-form reels with built-in transitions and captions.",
    image: "assets/work-video-01.jpg",
    price: 9, currency: "USD", priceBDT: 1000,
    tags: ["Video", "Templates", "Social Media", "CapCut"],
    format: ".zip · CapCut template",
  },
  {
    id: "pr03",
    title: "Lightroom Preset Bundle",
    blurb: "25 presets across warm, moody and clean looks for portrait and lifestyle photography.",
    image: "assets/work-photo-after.jpg",
    price: 8, currency: "USD", priceBDT: 900,
    tags: ["Photo", "Presets", "Lightroom"],
    format: ".xmp / .dng · Lightroom",
  },
  {
    id: "pr04",
    title: "Skin Retouch Action Set",
    blurb: "One-click Photoshop actions for fast, natural-looking frequency separation retouching.",
    image: "assets/work-photo-before.jpg",
    price: 10, currency: "USD", priceBDT: 1100,
    tags: ["Photo", "Photoshop", "Retouching"],
    format: ".atn · Photoshop",
  },
  {
    id: "pr05",
    title: "Minimal Logo Kit",
    blurb: "15 editable vector logo marks built on a modular grid — restyle the type and you're done.",
    image: "assets/work-graphic-01.jpg",
    price: 15, currency: "USD", priceBDT: 1650,
    tags: ["Graphic Design", "Logos", "Illustrator"],
    format: ".ai / .svg · Illustrator",
  },
  {
    id: "pr06",
    title: "Editorial Poster Templates",
    blurb: "8 print-ready poster layouts with a strict grid system — swap image, type stays balanced.",
    image: "assets/work-graphic-01.jpg",
    price: 11, currency: "USD", priceBDT: 1200,
    tags: ["Graphic Design", "Templates", "Print"],
    format: ".ai / .indd",
  },
  {
    id: "pr07",
    title: "Motion Title Pack — After Effects",
    blurb: "20 kinetic-type title animations, fully customisable, no plugins required.",
    image: "assets/work-video-01.jpg",
    price: 14, currency: "USD", priceBDT: 1550,
    tags: ["Video", "After Effects", "Templates", "Motion Graphics"],
    format: ".aep · After Effects",
  },
  {
    id: "pr08",
    title: "Social Media Design System",
    blurb: "A full Instagram grid + story template system built for consistent, on-brand posting.",
    image: "assets/work-graphic-01.jpg",
    price: 13, currency: "USD", priceBDT: 1400,
    tags: ["Graphic Design", "Social Media", "Templates"],
    format: ".psd / .fig",
  },
  {
    id: "pr09",
    title: "Product Photo Background Pack",
    blurb: "30 clean studio-style background textures for product and e-commerce photography.",
    image: "assets/work-photo-before.jpg",
    price: 7, currency: "USD", priceBDT: 800,
    tags: ["Photo", "Backgrounds"],
    format: ".jpg · High-res",
  },
  {
    id: "pr10",
    title: "YouTube Thumbnail Templates",
    blurb: "18 high-CTR thumbnail templates with editable text, faces and pop-style elements.",
    image: "assets/work-graphic-01.jpg",
    price: 9, currency: "USD", priceBDT: 1000,
    tags: ["Graphic Design", "Templates", "YouTube"],
    format: ".psd · Photoshop",
  },
];

/* ---------------- STATE ---------------- */
const state = { query: "", activeTags: new Set() };

/* ---------------- BUILD TAG LIST ---------------- */
const ALL_TAGS = Array.from(new Set(PRODUCTS.flatMap((p) => p.tags))).sort();

function money(p) {
  return p.currency === "USD" ? `$${p.price}` : `${p.price} ${p.currency}`;
}

/* ---------------- RENDER: TAG CHIPS ---------------- */
function renderTagChips() {
  const wrap = document.getElementById("tagChips");
  if (!wrap) return;
  wrap.innerHTML = ALL_TAGS.map((tag) => `
    <button type="button" class="tag-chip${state.activeTags.has(tag) ? " on" : ""}" data-tag="${tag}">
      ${tag}
    </button>`).join("");

  wrap.querySelectorAll(".tag-chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tag = btn.dataset.tag;
      if (state.activeTags.has(tag)) state.activeTags.delete(tag);
      else state.activeTags.add(tag);
      renderAll();
    });
  });
}

/* ---------------- RENDER: ACTIVE FILTER PILLS (removable) + badge count ---------------- */
function renderActiveFilters() {
  const wrap = document.getElementById("activeFilters");
  const clearBtn = document.getElementById("clearFilters");
  const badge = document.getElementById("filterBadge");
  if (!wrap) return;

  if (state.activeTags.size === 0) {
    wrap.innerHTML = "";
    if (clearBtn) clearBtn.hidden = true;
    if (badge) badge.hidden = true;
    return;
  }

  wrap.innerHTML = Array.from(state.activeTags).map((tag) => `
    <button type="button" class="filter-pill" data-tag="${tag}" aria-label="Remove ${tag} filter">
      ${tag} <span aria-hidden="true">✕</span>
    </button>`).join("");

  wrap.querySelectorAll(".filter-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activeTags.delete(btn.dataset.tag);
      renderAll();
    });
  });

  if (clearBtn) clearBtn.hidden = false;
  if (badge) {
    badge.hidden = false;
    badge.textContent = String(state.activeTags.size);
  }
}

/* ---------------- RENDER: PRODUCT GRID ---------------- */
function getFiltered() {
  const q = state.query.trim().toLowerCase();
  return PRODUCTS.filter((p) => {
    const matchesQuery = !q ||
      p.title.toLowerCase().includes(q) ||
      p.blurb.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    const matchesTags = state.activeTags.size === 0 ||
      p.tags.some((t) => state.activeTags.has(t));
    return matchesQuery && matchesTags;
  });
}

function renderGrid() {
  const grid = document.getElementById("productGrid");
  const countEl = document.getElementById("resultCount");
  const empty = document.getElementById("emptyState");
  if (!grid) return;

  const list = getFiltered();

  if (countEl) {
    countEl.textContent = `${String(list.length).padStart(2, "0")} / ${String(PRODUCTS.length).padStart(2, "0")} products`;
  }

  if (!list.length) {
    grid.innerHTML = "";
    if (empty) empty.hidden = false;
    return;
  }
  if (empty) empty.hidden = true;

  grid.innerHTML = list.map((p, i) => `
    <article class="product-card" style="--d:${(i % 8) * 60}ms">
      <div class="product-media">
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
        <span class="badge">${p.format}</span>
      </div>
      <div class="product-body">
        <h3 class="product-title">${p.title}</h3>
        <p class="product-blurb">${p.blurb}</p>
        <div class="product-tags">
          ${p.tags.map((t) => `<span class="chip">${t}</span>`).join("")}
        </div>
        <div class="product-foot">
          <span class="product-price">${money(p)}</span>
          <button type="button" class="btn small buy-btn" data-id="${p.id}">Buy now <span aria-hidden="true">→</span></button>
        </div>
      </div>
    </article>`).join("");

  grid.querySelectorAll(".buy-btn").forEach((btn) => {
    btn.addEventListener("click", () => openPurchaseModal(btn.dataset.id));
  });

  // little pop-in effect for freshly rendered cards
  requestAnimationFrame(() => {
    grid.querySelectorAll(".product-card").forEach((card) => card.classList.add("in"));
  });
}

function renderAll() {
  renderTagChips();
  renderActiveFilters();
  renderGrid();
}

/* ---------------- SEARCH ---------------- */
(function search() {
  const input = document.getElementById("storeSearch");
  if (!input) return;
  input.addEventListener("input", () => {
    state.query = input.value;
    renderGrid();
    const clear = document.getElementById("searchClear");
    if (clear) clear.hidden = state.query.length === 0;
  });

  const clear = document.getElementById("searchClear");
  if (clear) {
    clear.addEventListener("click", () => {
      input.value = "";
      state.query = "";
      clear.hidden = true;
      renderGrid();
      input.focus();
    });
  }
})();

/* ---------------- CLEAR ALL FILTERS ---------------- */
(function clearAll() {
  const btn = document.getElementById("clearFilters");
  if (!btn) return;
  btn.addEventListener("click", () => {
    state.activeTags.clear();
    renderAll();
  });
})();

/* ---------------- FILTER DROPDOWN ---------------- */
(function filterDropdown() {
  const wrap = document.querySelector(".filter-wrap");
  const toggle = document.getElementById("filterToggle");
  const dropdown = document.getElementById("filterDropdown");
  if (!toggle || !dropdown) return;

  function open() {
    dropdown.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  }
  function close() {
    dropdown.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.hidden ? open() : close();
  });
  document.addEventListener("click", (e) => {
    if (!dropdown.hidden && wrap && !wrap.contains(e.target)) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !dropdown.hidden) close();
  });
})();

/* ---------------- PURCHASE MODAL: bKash checkout ----------------
   No backend exists on a static site, so real-time payment verification
   isn't possible here. This implements the standard manual-verification
   flow used by small sellers on bKash: buyer sends money via the bKash
   app, then submits the Transaction ID (TrxID) here. That confirmation
   is relayed to the seller over WhatsApp so the order can be verified
   and the download link sent manually. Card / PayPal are shown as
   "coming soon" — only bKash is wired up for now, as requested.
------------------------------------------------------------------- */
const BKASH_NUMBER = "01856997037";
const BKASH_TYPE = "Personal";
const SELLER_WHATSAPP = "8801856997037";

let modalProduct = null;
let modalStep = "info"; // "info" | "bkash" | "confirmed"
let lastOrder = null;

function openPurchaseModal(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;
  modalProduct = product;
  modalStep = "info";
  renderModal();
  const modal = document.getElementById("purchaseModal");
  if (modal) {
    modal.style.display = "grid";
    document.body.style.overflow = "hidden";
  }
}

function closePurchaseModal() {
  const modal = document.getElementById("purchaseModal");
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "";
  modalProduct = null;
  modalStep = "info";
}

function renderModal() {
  const body = document.getElementById("purchaseModalBody");
  if (!body || !modalProduct) return;

  if (modalStep === "info") body.innerHTML = infoStepHTML(modalProduct);
  else if (modalStep === "bkash") body.innerHTML = bkashStepHTML(modalProduct);
  else body.innerHTML = confirmedStepHTML(modalProduct, lastOrder);

  wireModalStep();
}

function infoStepHTML(p) {
  return `
    <img class="purchase-thumb" src="${p.image}" alt="${p.title}" />
    <p class="meta meta-accent" style="margin:0 0 0.4rem">${p.tags[0]}</p>
    <h3 class="display" style="font-size:clamp(1.2rem,2.6vw,1.7rem);margin:0 0 0.5rem">${p.title}</h3>
    <p style="color:var(--muted);max-width:46ch;margin-bottom:1rem">${p.blurb}</p>

    <div class="price-row">
      <span class="product-price">${money(p)}</span>
      <span class="meta">≈ ৳${p.priceBDT} via bKash</span>
    </div>

    <div class="payment-methods">
      <div class="payment-method-btn active">
        <span class="pm-icon">bK</span>
        <span class="pm-label">bKash<small>Send Money · manual confirm</small></span>
        <span class="pm-tag">Available</span>
      </div>
      <div class="payment-method-btn" aria-disabled="true">
        <span class="pm-icon">Pp</span>
        <span class="pm-label">PayPal<small>International cards</small></span>
        <span class="pm-tag soon">Coming soon</span>
      </div>
    </div>

    <button type="button" class="btn" id="startBkash">Pay with bKash <span aria-hidden="true">→</span></button>
  `;
}

function bkashStepHTML(p) {
  return `
    <button type="button" class="modal-back" id="modalBack">← Back</button>
    <p class="meta meta-accent" style="margin:0.6rem 0 0.3rem">${p.title}</p>
    <h3 class="display" style="font-size:clamp(1.2rem,2.6vw,1.7rem);margin:0 0 1rem">Pay with bKash</h3>

    <ol class="bkash-steps">
      <li>Open your <b>bKash</b> app and choose <b>Send Money</b>.</li>
      <li>Send <b class="bkash-amount">৳${p.priceBDT}</b> to <b class="bkash-number">${BKASH_NUMBER}</b> (${BKASH_TYPE}).</li>
      <li>Copy the <b>Transaction ID</b> (TrxID) from the confirmation message.</li>
      <li>Enter your details below to confirm the order.</li>
    </ol>

    <form id="bkashForm" novalidate>
      <div class="field" id="fieldBkName">
        <input id="bkName" autocomplete="name" />
        <label for="bkName">Full name</label>
        <span class="err" id="errBkName" hidden></span>
      </div>
      <div class="field" id="fieldBkContact">
        <input id="bkContact" autocomplete="email" />
        <label for="bkContact">Email or WhatsApp number</label>
        <span class="err" id="errBkContact" hidden></span>
      </div>
      <div class="field" id="fieldBkTrx">
        <input id="bkTrx" autocomplete="off" style="text-transform:uppercase" />
        <label for="bkTrx">bKash Transaction ID (TrxID)</label>
        <span class="err" id="errBkTrx" hidden></span>
      </div>
      <button class="btn" type="submit">Confirm order <span aria-hidden="true">→</span></button>
      <p class="note" style="margin-top:1rem">
        Orders are verified manually — the download link is sent once the bKash payment is checked.
      </p>
    </form>
  `;
}

function confirmedStepHTML(p, order) {
  return `
    <div class="confirm-icon" aria-hidden="true">✓</div>
    <h3 class="display" style="font-size:clamp(1.2rem,2.6vw,1.7rem);margin:0 0 0.7rem">Order submitted</h3>
    <p style="color:var(--muted);max-width:44ch">
      Your bKash payment for <b>${p.title}</b> is pending verification. A WhatsApp message with
      your Transaction ID has been sent to the seller — once confirmed, the download link goes to
      <b>${order ? order.contact : "you"}</b>.
    </p>
    <p class="meta" style="margin-top:1.1rem">Reference · ${order ? order.trxId : ""}</p>
    <button type="button" class="btn ghost" id="closeConfirm" style="margin-top:1.5rem">Done</button>
  `;
}

function wireModalStep() {
  const closeX = document.getElementById("purchaseModalClose");
  if (closeX) closeX.onclick = closePurchaseModal;

  if (modalStep === "info") {
    const startBtn = document.getElementById("startBkash");
    if (startBtn) startBtn.addEventListener("click", () => {
      modalStep = "bkash";
      renderModal();
    });
  }

  if (modalStep === "bkash") {
    const backBtn = document.getElementById("modalBack");
    if (backBtn) backBtn.addEventListener("click", () => {
      modalStep = "info";
      renderModal();
    });

    // keep floating labels lifted once a field has content, same pattern as the contact form
    [["bkName", "fieldBkName"], ["bkContact", "fieldBkContact"], ["bkTrx", "fieldBkTrx"]].forEach(([inputId, fieldId]) => {
      const input = document.getElementById(inputId);
      const field = document.getElementById(fieldId);
      if (!input || !field) return;
      const sync = () => field.classList.toggle("filled", input.value.trim().length > 0);
      input.addEventListener("input", sync);
      input.addEventListener("change", sync);
    });

    const form = document.getElementById("bkashForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("bkName");
        const contact = document.getElementById("bkContact");
        const trx = document.getElementById("bkTrx");
        const errName = document.getElementById("errBkName");
        const errContact = document.getElementById("errBkContact");
        const errTrx = document.getElementById("errBkTrx");

        let hasError = false;
        if (name.value.trim().length < 2) {
          errName.textContent = "Required"; errName.hidden = false; hasError = true;
        } else { errName.hidden = true; }

        const contactVal = contact.value.trim();
        const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contactVal);
        const looksLikePhone = /^[+\d][\d\s-]{7,}$/.test(contactVal);
        if (!looksLikeEmail && !looksLikePhone) {
          errContact.textContent = "Enter a valid email or phone"; errContact.hidden = false; hasError = true;
        } else { errContact.hidden = true; }

        const trxVal = trx.value.trim();
        if (!/^[A-Za-z0-9]{6,}$/.test(trxVal)) {
          errTrx.textContent = "Enter the TrxID from bKash"; errTrx.hidden = false; hasError = true;
        } else { errTrx.hidden = true; }

        if (hasError) return;

        lastOrder = {
          name: name.value.trim(),
          contact: contactVal,
          trxId: trxVal.toUpperCase(),
        };

        // Relay the order to the seller over WhatsApp for manual verification.
        const msg = `New bKash order\nProduct: ${modalProduct.title}\nAmount: ৳${modalProduct.priceBDT} (${money(modalProduct)})\nName: ${lastOrder.name}\nContact: ${lastOrder.contact}\nTrxID: ${lastOrder.trxId}`;
        window.open(`https://wa.me/${SELLER_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");

        modalStep = "confirmed";
        renderModal();
      });
    }
  }

  if (modalStep === "confirmed") {
    const done = document.getElementById("closeConfirm");
    if (done) done.addEventListener("click", closePurchaseModal);
  }
}

(function purchaseModalWiring() {
  const modal = document.getElementById("purchaseModal");
  if (!modal) return;
  modal.addEventListener("click", (e) => { if (e.target === modal) closePurchaseModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.style.display !== "none") closePurchaseModal(); });
})();

/* ---------------- INIT ---------------- */
renderAll();
