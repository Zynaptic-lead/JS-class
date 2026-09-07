/* ============================================================
   Joe's Restaurant · script.js
   ============================================================ */

/* ── Data ── */
const MENU = [
  { id: 1, name: "Flame-Seared Ribeye", cat: "grill", price: 28.99, rating: 4.9, tag: "hot", desc: "12oz prime cut, herb butter, truffle fries.", img: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Smoked BBQ Ribs", cat: "grill", price: 24.50, rating: 4.8, tag: "live", desc: "Slow-smoked baby back ribs, house BBQ glaze.", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Grilled Sea Bass", cat: "grill", price: 22.00, rating: 4.7, tag: "", desc: "Whole sea bass, lemon-caper butter, seasonal veg.", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "Truffle Carbonara", cat: "pasta", price: 18.50, rating: 4.9, tag: "live", desc: "Fresh tagliatelle, guanciale, black truffle, pecorino.", img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "Lobster Linguine", cat: "pasta", price: 26.00, rating: 4.8, tag: "hot", desc: "Half lobster, cherry tomato, chilli, fresh linguine.", img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=600&q=80" },
  { id: 6, name: "Pesto Gnocchi", cat: "pasta", price: 15.00, rating: 4.6, tag: "", desc: "Pillowy potato gnocchi, basil pesto, pine nuts.", img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80" },
  { id: 7, name: "Salmon Nigiri (8pc)", cat: "sushi", price: 16.00, rating: 4.9, tag: "live", desc: "Premium Atlantic salmon, seasoned sushi rice.", img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?auto=format&fit=crop&w=600&q=80" },
  { id: 8, name: "Dragon Roll", cat: "sushi", price: 19.50, rating: 4.8, tag: "hot", desc: "Shrimp tempura, avocado, spicy mayo, tobiko.", img: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80" },
  { id: 9, name: "Tuna Sashimi (10pc)", cat: "sushi", price: 21.00, rating: 4.7, tag: "", desc: "Bluefin tuna, wasabi, pickled ginger, ponzu.", img: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=600&q=80" },
  { id: 10, name: "Lava Chocolate Cake", cat: "dessert", price: 9.50, rating: 5.0, tag: "hot", desc: "Warm dark chocolate fondant, vanilla bean ice cream.", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80" },
  { id: 11, name: "Crème Brûlée", cat: "dessert", price: 8.00, rating: 4.8, tag: "live", desc: "Classic vanilla custard, caramelised sugar crust.", img: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=600&q=80" },
  { id: 12, name: "Mango Panna Cotta", cat: "dessert", price: 7.50, rating: 4.7, tag: "", desc: "Silky coconut panna cotta, fresh mango coulis.", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80" },
];

const CHEFS = [
  { name: "Chef Joe", role: "Head Chef · Grill Master", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80", live: true },
  { name: "Chef Mia", role: "Pasta Specialist", img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=600&q=80", live: true },
  { name: "Chef Ken", role: "Sushi Master", img: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=600&q=80", live: false },
  { name: "Chef Ada", role: "Pastry & Desserts", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80", live: false },
];

const CHAT_SEED = [
  { user: "FoodieKing", msg: "That ribeye looks INSANE 🔥" },
  { user: "NigeriaEats", msg: "How long does delivery take to VI?" },
  { user: "TasteHunter", msg: "Just ordered the lobster linguine, can't wait!" },
  { user: "GrillFan99", msg: "Chef Joe is a legend 👨‍🍳" },
  { user: "SushiLover", msg: "Ken's knife skills are unreal" },
  { user: "FoodieKing", msg: "Adding the lava cake to my order rn 😍" },
];

const BOT_REPLIES = [
  "Thanks for watching! 🙌", "Order now while it's fresh!", "Chef says hi! 👋",
  "That dish will be ready in ~10 mins", "Great choice! 🔥", "We deliver in 30 mins!",
  "Glad you're enjoying the stream!", "Ask us anything about the menu 😊",
];

/* ── State ── */
let cart = JSON.parse(localStorage.getItem("joes_cart") || "[]");
let currentFilter = "all";

/* ── Helpers ── */
const $ = id => document.getElementById(id);
const fmt = n => "$" + n.toFixed(2);

function showToast(msg) {
  const t = $("toast"); $("toastMsg").textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2800);
}

function saveCart() { localStorage.setItem("joes_cart", JSON.stringify(cart)); }

/* ── Preloader ── */
window.addEventListener("load", () => {
  setTimeout(() => $("preloader").classList.add("hide"), 900);
});

/* ── Year ── */
$("year").textContent = new Date().getFullYear();

/* ── Header scroll ── */
window.addEventListener("scroll", () => {
  $("header").classList.toggle("scrolled", window.scrollY > 40);
  updateActiveNav();
}, { passive: true });

/* ── Active nav ── */
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  document.querySelectorAll(".nav__link").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}

/* ── Mobile nav ── */
$("navToggle").addEventListener("click", () => $("navMenu").classList.add("open"));
$("navClose").addEventListener("click", () => $("navMenu").classList.remove("open"));
document.querySelectorAll(".nav__link").forEach(a =>
  a.addEventListener("click", () => $("navMenu").classList.remove("open"))
);

/* ── Render Menu ── */
function renderMenu(filter) {
  const grid = $("menuGrid");
  const items = filter === "all" ? MENU : MENU.filter(d => d.cat === filter);
  grid.innerHTML = items.map((d, i) => `
    <article class="dish" style="animation-delay:${i * 0.06}s" data-id="${d.id}">
      <div class="dish__media">
        <img src="${d.img}" alt="${d.name}" loading="lazy" />
        ${d.tag ? `<span class="dish__tag dish__tag--${d.tag}">${d.tag === "live" ? "🔴 Live" : "🔥 Hot"}</span>` : ""}
      </div>
      <div class="dish__body">
        <div class="dish__title-row">
          <h3 class="dish__title">${d.name}</h3>
          <span class="dish__rating"><i class="fa-solid fa-star"></i> ${d.rating}</span>
        </div>
        <p class="dish__desc">${d.desc}</p>
        <div class="dish__foot">
          <div class="dish__price">${fmt(d.price)} <small>/ serving</small></div>
          <button class="dish__add" data-id="${d.id}">
            <i class="fa-solid fa-plus"></i> Add
          </button>
        </div>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll(".dish__add").forEach(btn =>
    btn.addEventListener("click", () => addToCart(+btn.dataset.id))
  );
}

/* ── Filter chips ── */
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    currentFilter = chip.dataset.filter;
    renderMenu(currentFilter);
  });
});

/* ── Render Chefs ── */
function renderChefs() {
  $("chefsGrid").innerHTML = CHEFS.map(c => `
    <div class="chef">
      <img src="${c.img}" alt="${c.name}" loading="lazy" />
      <div class="chef__info">
        <h4>${c.name}</h4>
        <span>${c.role}</span>
      </div>
      ${c.live ? `<div class="chef__badge"><span class="live-tag"><span class="dot"></span> LIVE</span></div>` : ""}
    </div>
  `).join("");
}

/* ── Cart ── */
function addToCart(id) {
  const dish = MENU.find(d => d.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...dish, qty: 1 });
  saveCart(); renderCart(); showToast(`${dish.name} added to bag 🛍️`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(); renderCart();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); renderCart(); }
}

function renderCart() {
  const body = $("cartBody");
  const empty = $("cartEmpty");
  const foot = $("cartFoot");
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = cart.length ? 2.50 : 0;
  const total = subtotal + delivery;

  // badge
  const badge = $("cartCount");
  badge.textContent = count;
  badge.classList.toggle("show", count > 0);

  if (!cart.length) {
    empty.hidden = false; foot.hidden = true;
    body.innerHTML = ""; body.appendChild(empty);
    return;
  }
  empty.hidden = true; foot.hidden = false;

  body.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.img}" alt="${item.name}" />
      <div class="cart-item__info">
        <h4>${item.name}</h4>
        <span>${fmt(item.price * item.qty)}</span>
        <div class="cart-item__qty">
          <button class="qty-dec" data-id="${item.id}"><i class="fa-solid fa-minus"></i></button>
          <span>${item.qty}</span>
          <button class="qty-inc" data-id="${item.id}"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
      <button class="cart-item__remove" data-id="${item.id}" aria-label="Remove"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  `).join("");

  body.querySelectorAll(".qty-dec").forEach(b => b.addEventListener("click", () => changeQty(+b.dataset.id, -1)));
  body.querySelectorAll(".qty-inc").forEach(b => b.addEventListener("click", () => changeQty(+b.dataset.id, +1)));
  body.querySelectorAll(".cart-item__remove").forEach(b => b.addEventListener("click", () => removeFromCart(+b.dataset.id)));

  $("subtotal").textContent = fmt(subtotal);
  $("delivery").textContent = fmt(delivery);
  $("total").textContent = fmt(total);
  $("checkoutTotal").textContent = fmt(total);
}

/* ── Cart drawer ── */
function openCart() {
  $("cart").classList.add("open");
  $("cart").setAttribute("aria-hidden", "false");
  $("drawerOverlay").classList.add("show");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  $("cart").classList.remove("open");
  $("cart").setAttribute("aria-hidden", "true");
  $("drawerOverlay").classList.remove("show");
  document.body.style.overflow = "";
}
$("cartBtn").addEventListener("click", openCart);
$("cartClose").addEventListener("click", closeCart);
$("drawerOverlay").addEventListener("click", closeCart);

/* ── Checkout ── */
$("checkoutBtn").addEventListener("click", () => {
  closeCart();
  const orderEl = $("modalOrder");
  orderEl.innerHTML = cart.map(i => `
    <div><strong>${i.name} ×${i.qty}</strong><span>${fmt(i.price * i.qty)}</span></div>
  `).join("");
  $("modal").classList.add("open");
  $("modal").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
});

function closeModal() {
  $("modal").classList.remove("open");
  $("modal").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  cart = []; saveCart(); renderCart();
}
$("modalClose").addEventListener("click", closeModal);
$("modalDone").addEventListener("click", () => { closeModal(); location.href = "#live"; });
$("modal").addEventListener("click", e => { if (e.target === $("modal")) closeModal(); });

/* ── Live viewer count ── */
let viewers = 1248;
setInterval(() => {
  viewers += Math.floor(Math.random() * 7) - 3;
  viewers = Math.max(900, viewers);
  $("viewerCount").textContent = viewers.toLocaleString();
}, 4000);

/* ── Station switcher ── */
document.querySelectorAll(".station").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".station").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    $("stationLabel").textContent = `${btn.dataset.title} · ${btn.dataset.chef}`;
    seedChat(btn.dataset.title);
  });
});

/* ── Live Chat ── */
function createMsg(user, msg, isMe = false) {
  const div = document.createElement("div");
  div.className = "chat__msg" + (isMe ? " chat__msg--me" : "");
  const initials = user.slice(0, 2).toUpperCase();
  div.innerHTML = `
    <div class="avatar">${initials}</div>
    <div class="chat__msg-body"><b>${user}</b><p>${msg}</p></div>
  `;
  return div;
}

function appendMsg(user, msg, isMe = false) {
  const body = $("chatBody");
  body.appendChild(createMsg(user, msg, isMe));
  body.scrollTop = body.scrollHeight;
}

function seedChat(station) {
  $("chatBody").innerHTML = "";
  CHAT_SEED.slice(0, 4).forEach(m => appendMsg(m.user, m.msg));
}

$("chatForm").addEventListener("submit", e => {
  e.preventDefault();
  const input = $("chatInput");
  const val = input.value.trim();
  if (!val) return;
  appendMsg("You", val, true);
  input.value = "";
  setTimeout(() => {
    const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
    appendMsg("Joe's Kitchen", reply);
  }, 900 + Math.random() * 800);
});

/* ── Mute / Fullscreen ── */
const video = $("liveVideo");
$("muteBtn").addEventListener("click", () => {
  video.muted = !video.muted;
  $("muteBtn").innerHTML = video.muted
    ? `<i class="fa-solid fa-volume-xmark"></i>`
    : `<i class="fa-solid fa-volume-high"></i>`;
});
$("fsBtn").addEventListener("click", () => {
  const wrap = video.closest(".player__video");
  if (!document.fullscreenElement) wrap.requestFullscreen?.();
  else document.exitFullscreen?.();
});

/* ── Newsletter ── */
$("newsForm").addEventListener("submit", e => {
  e.preventDefault();
  showToast("You're subscribed! 🎉");
  e.target.reset();
});

/* ── Intersection Observer (fade-in sections) ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) en.target.classList.add("visible"); });
}, { threshold: 0.12 });
document.querySelectorAll(".section").forEach(s => observer.observe(s));

/* ── Init ── */
renderMenu("all");
renderChefs();
seedChat("Signature Grill");
renderCart();
