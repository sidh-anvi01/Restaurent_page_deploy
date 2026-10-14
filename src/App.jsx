import { useState, useEffect, useRef } from "react";

/* ------------------------------------------------------------------
   ALL STYLES IN ONE PLACE (no external CSS file needed)
------------------------------------------------------------------ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500;600&display=swap');

*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
:root{
  --bg:#0d0c0a;
  --bg2:#141210;
  --card:#1b1815;
  --gold:#c8a45c;
  --gold-soft:#e3c98b;
  --cream:#f6f2ea;
  --muted:#a49c8f;
  --line:rgba(200,164,92,.22);
}
body{
  background:var(--bg);
  color:var(--cream);
  font-family:'Jost',sans-serif;
  font-weight:300;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
h1,h2,h3,h4{font-family:'Cormorant Garamond',serif;font-weight:600;line-height:1.15;}
a{text-decoration:none;color:inherit;}
img{display:block;max-width:100%;}
button,input,select,textarea{font-family:inherit;font-size:inherit;}

.wrap{width:min(1200px,92%);margin:0 auto;}
.section{padding:110px 0;}
.eyebrow{
  font-size:.72rem;letter-spacing:.42em;text-transform:uppercase;
  color:var(--gold);font-weight:500;margin-bottom:18px;
}
.title{font-size:clamp(2rem,4.4vw,3.3rem);margin-bottom:20px;}
.lead{color:var(--muted);font-size:1.02rem;line-height:1.85;max-width:60ch;}
.center{text-align:center;}
.center .lead{margin-inline:auto;}

/* ---------- Buttons ---------- */
.btn{
  display:inline-flex;align-items:center;gap:10px;cursor:pointer;border:none;
  padding:15px 34px;font-size:.78rem;letter-spacing:.2em;text-transform:uppercase;
  font-weight:500;transition:.35s ease;border-radius:2px;
}
.btn-gold{background:var(--gold);color:#141210;}
.btn-gold:hover{background:var(--gold-soft);transform:translateY(-3px);box-shadow:0 14px 34px rgba(200,164,92,.28);}
.btn-ghost{background:transparent;color:var(--cream);border:1px solid rgba(246,242,234,.3);}
.btn-ghost:hover{border-color:var(--gold);color:var(--gold);transform:translateY(-3px);}

/* ---------- Reveal animation ---------- */
.reveal{opacity:0;transform:translateY(34px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1);}
.reveal.in{opacity:1;transform:none;}

/* ---------- Header ---------- */
.header{
  position:fixed;top:0;left:0;width:100%;z-index:100;
  padding:26px 0;transition:.4s ease;
  background:linear-gradient(to bottom,rgba(13,12,10,.85),transparent);
}
.header.solid{
  padding:14px 0;background:rgba(13,12,10,.94);
  backdrop-filter:blur(14px);border-bottom:1px solid var(--line);
}
.nav{display:flex;align-items:center;justify-content:space-between;gap:24px;}
.logo{font-family:'Cormorant Garamond',serif;font-size:1.65rem;letter-spacing:.22em;font-weight:700;}
.logo span{color:var(--gold);}
.nav-links{display:flex;gap:36px;list-style:none;}
.nav-links a{
  font-size:.76rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);
  position:relative;padding-bottom:6px;transition:.3s;
}
.nav-links a::after{
  content:'';position:absolute;left:0;bottom:0;width:0;height:1px;background:var(--gold);transition:.35s;
}
.nav-links a:hover{color:var(--cream);}
.nav-links a:hover::after{width:100%;}
.nav-cta{display:flex;align-items:center;gap:18px;}
.burger{display:none;flex-direction:column;gap:6px;background:none;border:none;cursor:pointer;padding:6px;}
.burger span{width:26px;height:1.6px;background:var(--cream);transition:.3s;display:block;}
.burger.open span:nth-child(1){transform:translateY(7.6px) rotate(45deg);}
.burger.open span:nth-child(2){opacity:0;}
.burger.open span:nth-child(3){transform:translateY(-7.6px) rotate(-45deg);}

.mobile-menu{
  position:fixed;inset:0;background:rgba(13,12,10,.98);z-index:99;
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:34px;
  transform:translateY(-100%);transition:transform .5s cubic-bezier(.6,0,.2,1);
}
.mobile-menu.open{transform:translateY(0);}
.mobile-menu a{font-family:'Cormorant Garamond',serif;font-size:1.9rem;letter-spacing:.06em;color:var(--cream);}
.mobile-menu a:hover{color:var(--gold);}

/* ---------- Hero ---------- */
.hero{
  position:relative;min-height:100vh;display:flex;align-items:center;
  background:url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80') center/cover fixed no-repeat;
}
.hero::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,rgba(13,12,10,.94) 0%,rgba(13,12,10,.72) 45%,rgba(13,12,10,.42) 100%);
}
.hero-inner{position:relative;z-index:2;padding:130px 0 90px;}
.hero h1{
  font-size:clamp(2.7rem,6.6vw,5.4rem);line-height:1.05;margin-bottom:26px;max-width:15ch;
}
.hero h1 em{font-style:italic;color:var(--gold);}
.hero p{max-width:52ch;color:#cfc7ba;line-height:1.9;font-size:1.05rem;margin-bottom:40px;}
.hero-actions{display:flex;flex-wrap:wrap;gap:16px;}
.hero-stats{
  display:flex;flex-wrap:wrap;gap:56px;margin-top:76px;
  padding-top:38px;border-top:1px solid rgba(246,242,234,.14);
}
.stat h3{font-size:2.35rem;color:var(--gold);}
.stat p{font-size:.72rem;letter-spacing:.24em;text-transform:uppercase;color:var(--muted);margin-top:6px;}

/* ---------- About ---------- */
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;}
.about-imgs{position:relative;}
.about-imgs .big{
  width:100%;height:560px;object-fit:cover;border-radius:3px;
  box-shadow:0 40px 80px rgba(0,0,0,.55);
}
.about-imgs .small{
  position:absolute;right:-42px;bottom:-42px;width:250px;height:250px;object-fit:cover;
  border:10px solid var(--bg);border-radius:3px;
}
.badge-float{
  position:absolute;left:-34px;top:44px;background:var(--gold);color:#141210;
  padding:22px 26px;text-align:center;border-radius:3px;
}
.badge-float strong{display:block;font-family:'Cormorant Garamond',serif;font-size:2rem;line-height:1;}
.badge-float span{font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;}
.feature-list{display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:38px;}
.feature{display:flex;gap:14px;align-items:flex-start;}
.feature i{
  flex:none;width:38px;height:38px;border:1px solid var(--line);border-radius:50%;
  display:grid;place-items:center;color:var(--gold);font-style:normal;font-size:1rem;
}
.feature h4{font-size:1.05rem;margin-bottom:4px;}
.feature p{font-size:.85rem;color:var(--muted);line-height:1.6;}

/* ---------- Menu ---------- */
.menu{background:var(--bg2);border-block:1px solid var(--line);}
.tabs{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin:44px 0 60px;}
.tab{
  background:transparent;border:1px solid var(--line);color:var(--muted);cursor:pointer;
  padding:12px 28px;font-size:.74rem;letter-spacing:.2em;text-transform:uppercase;
  border-radius:40px;transition:.3s;
}
.tab:hover{color:var(--cream);border-color:rgba(200,164,92,.5);}
.tab.active{background:var(--gold);border-color:var(--gold);color:#141210;font-weight:500;}
.menu-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px 60px;}
.dish{
  display:flex;gap:18px;justify-content:space-between;align-items:flex-start;
  padding:22px 0;border-bottom:1px dashed rgba(200,164,92,.2);transition:.3s;
}
.dish:hover{padding-left:10px;}
.dish-img{
  width:74px;height:74px;flex:none;object-fit:cover;border-radius:50%;
  border:1px solid var(--line);
}
.dish-body{flex:1;}
.dish-head{display:flex;align-items:baseline;gap:12px;}
.dish-head h4{font-size:1.22rem;white-space:nowrap;}
.dish-head .dots{flex:1;border-bottom:1px dotted rgba(164,156,143,.35);transform:translateY(-4px);}
.dish-head .price{color:var(--gold);font-size:1.1rem;font-weight:500;white-space:nowrap;}
.dish p{font-size:.87rem;color:var(--muted);line-height:1.65;margin-top:7px;}
.tag{
  display:inline-block;margin-top:10px;font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;
  color:var(--gold);border:1px solid var(--line);padding:4px 10px;border-radius:30px;
}

/* ---------- Chef / quote strip ---------- */
.quote{
  position:relative;padding:130px 0;text-align:center;
  background:url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80') center/cover fixed no-repeat;
}
.quote::before{content:'';position:absolute;inset:0;background:rgba(13,12,10,.85);}
.quote .wrap{position:relative;z-index:2;}
.quote blockquote{
  font-family:'Cormorant Garamond',serif;font-size:clamp(1.5rem,3.4vw,2.5rem);
  font-style:italic;line-height:1.5;max-width:22ch;margin:0 auto 26px;
}
.quote cite{font-style:normal;font-size:.75rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);}

/* ---------- Gallery ---------- */
.gallery-grid{
  display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:210px;gap:14px;margin-top:50px;
}
.gallery-grid figure{overflow:hidden;border-radius:3px;position:relative;cursor:pointer;}
.gallery-grid img{width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1);}
.gallery-grid figure:hover img{transform:scale(1.09);}
.gallery-grid figure::after{
  content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(13,12,10,.6),transparent 55%);
  opacity:0;transition:.4s;
}
.gallery-grid figure:hover::after{opacity:1;}
.g-tall{grid-row:span 2;}
.g-wide{grid-column:span 2;}

/* ---------- Testimonials ---------- */
.testi{background:var(--bg2);border-block:1px solid var(--line);}
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;margin-top:56px;}
.testi-card{
  background:var(--card);border:1px solid var(--line);border-radius:3px;padding:38px 32px;
  transition:.4s;
}
.testi-card:hover{transform:translateY(-8px);border-color:rgba(200,164,92,.55);}
.stars{color:var(--gold);letter-spacing:4px;margin-bottom:20px;font-size:.9rem;}
.testi-card p{color:#cfc7ba;line-height:1.85;font-size:.95rem;margin-bottom:26px;}
.testi-user{display:flex;align-items:center;gap:14px;}
.testi-user img{width:48px;height:48px;border-radius:50%;object-fit:cover;}
.testi-user h4{font-size:1rem;}
.testi-user span{font-size:.75rem;color:var(--muted);letter-spacing:.08em;}

/* ---------- Reservation ---------- */
.reserve-grid{display:grid;grid-template-columns:.95fr 1.05fr;gap:70px;align-items:center;}
.reserve-img{width:100%;height:100%;min-height:520px;object-fit:cover;border-radius:3px;}
.hours{margin-top:34px;border-top:1px solid var(--line);padding-top:26px;}
.hours-row{display:flex;justify-content:space-between;padding:9px 0;font-size:.9rem;color:var(--muted);}
.hours-row strong{color:var(--cream);font-weight:400;}
.form{
  background:var(--card);border:1px solid var(--line);border-radius:3px;padding:44px 40px;
}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
.field{margin-bottom:18px;display:flex;flex-direction:column;gap:8px;}
.field label{font-size:.68rem;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);}
.field input,.field select,.field textarea{
  background:transparent;border:1px solid rgba(246,242,234,.16);color:var(--cream);
  padding:14px 16px;border-radius:2px;outline:none;transition:.3s;width:100%;
}
.field textarea{resize:vertical;min-height:96px;}
.field input:focus,.field select:focus,.field textarea:focus{border-color:var(--gold);}
.field input::placeholder,.field textarea::placeholder{color:#6d675e;}
.field select option{background:#1b1815;}
.form .btn{width:100%;justify-content:center;margin-top:8px;}
.success{
  background:rgba(200,164,92,.1);border:1px solid var(--gold);color:var(--gold-soft);
  padding:16px;border-radius:2px;text-align:center;font-size:.9rem;margin-bottom:20px;
}

/* ---------- Footer ---------- */
.footer{background:#0a0908;border-top:1px solid var(--line);padding:80px 0 0;}
.footer-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1.4fr;gap:48px;}
.footer h4{font-size:1.05rem;margin-bottom:22px;letter-spacing:.06em;}
.footer p,.footer li{color:var(--muted);font-size:.88rem;line-height:1.9;}
.footer ul{list-style:none;}
.footer ul a:hover{color:var(--gold);}
.socials{display:flex;gap:12px;margin-top:22px;}
.socials a{
  width:38px;height:38px;border:1px solid var(--line);border-radius:50%;
  display:grid;place-items:center;font-size:.72rem;letter-spacing:.05em;transition:.3s;
}
.socials a:hover{background:var(--gold);color:#141210;border-color:var(--gold);}
.newsletter{display:flex;margin-top:18px;border:1px solid var(--line);border-radius:2px;overflow:hidden;}
.newsletter input{flex:1;background:transparent;border:none;outline:none;color:var(--cream);padding:13px 14px;font-size:.85rem;}
.newsletter button{
  background:var(--gold);border:none;color:#141210;padding:0 20px;cursor:pointer;
  font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;font-weight:500;transition:.3s;
}
.newsletter button:hover{background:var(--gold-soft);}
.copy{
  margin-top:64px;border-top:1px solid rgba(246,242,234,.08);padding:26px 0;
  display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;
  font-size:.78rem;color:#6d675e;
}

/* ---------- Responsive ---------- */
@media(max-width:1024px){
  .about-grid,.reserve-grid{grid-template-columns:1fr;gap:56px;}
  .about-imgs .small{right:0;bottom:-30px;width:190px;height:190px;}
  .menu-grid{grid-template-columns:1fr;gap:0;}
  .testi-grid{grid-template-columns:1fr;}
  .gallery-grid{grid-template-columns:repeat(2,1fr);}
  .footer-grid{grid-template-columns:1fr 1fr;}
}
@media(max-width:768px){
  .nav-links,.nav-cta .btn{display:none;}
  .burger{display:flex;}
  .section{padding:78px 0;}
  .hero{background-attachment:scroll;}
  .quote{background-attachment:scroll;}
  .hero-stats{gap:32px;}
  .about-imgs .big{height:400px;}
  .about-imgs .small{display:none;}
  .badge-float{left:0;padding:16px 20px;}
  .feature-list{grid-template-columns:1fr;}
  .form{padding:32px 22px;}
  .form-row{grid-template-columns:1fr;}
  .gallery-grid{grid-template-columns:1fr;grid-auto-rows:220px;}
  .g-wide{grid-column:span 1;}
  .g-tall{grid-row:span 1;}
  .footer-grid{grid-template-columns:1fr;gap:40px;}
  .reserve-img{min-height:320px;}
}
`;

/* ------------------------------------------------------------------
   DATA — edit these to match your restaurant
------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const MENU = {
  Starters: [
    { name: "Truffle Arancini", price: "$12", desc: "Crispy risotto spheres, black truffle, parmesan cream.", img: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=300&q=80", tag: "Chef's Pick" },
    { name: "Burrata & Heirloom", price: "$14", desc: "Creamy burrata, heirloom tomato, basil oil, aged balsamic.", img: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?auto=format&fit=crop&w=300&q=80" },
    { name: "Charred Octopus", price: "$18", desc: "Smoked paprika, potato purée, lemon caper butter.", img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=300&q=80" },
    { name: "Wild Mushroom Soup", price: "$10", desc: "Forest mushrooms, thyme, truffle oil, sourdough croutons.", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=300&q=80" },
  ],
  "Main Course": [
    { name: "Wagyu Ribeye", price: "$46", desc: "28-day aged wagyu, bone marrow butter, confit garlic.", img: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=300&q=80", tag: "Signature" },
    { name: "Saffron Seafood Risotto", price: "$32", desc: "Carnaroli rice, prawns, mussels, saffron, white wine.", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=300&q=80" },
    { name: "Truffle Tagliatelle", price: "$24", desc: "Hand-rolled pasta, black truffle, parmesan, brown butter.", img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=300&q=80" },
    { name: "Miso Glazed Salmon", price: "$29", desc: "Atlantic salmon, miso glaze, bok choy, sesame, ginger.", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80" },
    { name: "Herb Butter Roast Chicken", price: "$26", desc: "Free-range chicken, rosemary jus, truffle mash.", img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=300&q=80" },
    { name: "Truffle Mushroom Pizza", price: "$22", desc: "Wood-fired sourdough base, wild mushrooms, fontina.", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80" },
  ],
  Desserts: [
    { name: "Dark Chocolate Fondant", price: "$12", desc: "Molten 70% chocolate, vanilla bean ice cream.", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=300&q=80", tag: "Must Try" },
    { name: "Pistachio Tiramisu", price: "$11", desc: "Espresso-soaked savoiardi, mascarpone, pistachio crumb.", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=300&q=80" },
    { name: "Crème Brûlée", price: "$10", desc: "Tahitian vanilla custard, caramelised sugar crust.", img: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&fit=crop&w=300&q=80" },
    { name: "Berry Pavlova", price: "$11", desc: "Crisp meringue, Chantilly cream, seasonal berries.", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=300&q=80" },
  ],
  Drinks: [
    { name: "Signature Old Fashioned", price: "$15", desc: "Bourbon, smoked bitters, orange zest, cherrywood smoke.", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80" },
    { name: "Espresso Martini", price: "$14", desc: "Vodka, cold brew, coffee liqueur, vanilla.", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80" },
    { name: "House Red / White", price: "$12", desc: "Curated by our sommelier — ask for today's pour.", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80" },
    { name: "Fresh Citrus Cooler", price: "$8", desc: "Blood orange, lime, mint, sparkling water.", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&q=80" },
  ],
};

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80", cls: "g-tall" },
  { src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80", cls: "" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80", cls: "g-wide" },
  { src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80", cls: "" },
  { src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=900&q=80", cls: "" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80", cls: "" },
];

const TESTIMONIALS = [
  { text: "The wagyu ribeye was cooked to absolute perfection. Service was warm, unhurried and genuinely attentive. Easily the best dining experience we've had this year.", name: "Amelia Hart", role: "Food Critic", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
  { text: "From the truffle arancini to the chocolate fondant, every plate told a story. The ambiance is intimate without feeling cramped. We'll be back.", name: "Daniel Okafor", role: "Regular Guest", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
  { text: "Booked for our anniversary and they went above and beyond — personalised menu, candlelit table, and a dessert on the house. Truly memorable.", name: "Sofia Rinaldi", role: "Anniversary Dinner", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80" },
];

const HOURS = [
  { day: "Monday – Thursday", time: "12:00 – 22:30" },
  { day: "Friday – Saturday", time: "12:00 – 00:00" },
  { day: "Sunday", time: "11:00 – 21:00" },
];

/* ------------------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------------------ */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("Main Course");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "19:00",
    guests: "2",
    notes: "",
  });

  /* Sticky header */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Scroll-reveal animations */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [category]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔌 Connect your API / EmailJS / Formspree here:
    // fetch("/api/reservations", { method:"POST", body: JSON.stringify(form) })
    console.log("Reservation request:", form);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", date: "", time: "19:00", guests: "2", notes: "" });
    }, 5000);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <style>{css}</style>

      {/* ================= HEADER ================= */}
      <header className={`header ${scrolled ? "solid" : ""}`}>
        <div className="wrap nav">
          <a href="#home" className="logo">
            SAV<span>O</span>R
          </a>

          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <a href="#reserve" className="btn btn-gold">Book a Table</a>
            <button
              className={`burger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#reserve" className="btn btn-gold" onClick={() => setMenuOpen(false)}>
          Book a Table
        </a>
      </nav>

      {/* ================= HERO ================= */}
      <section className="hero" id="home">
        <div className="wrap hero-inner">
          <p className="eyebrow">Est. 2009 · Fine Dining &amp; Bar</p>
          <h1>
            Where Every Plate <em>Tells a Story</em>
          </h1>
          <p>
            Seasonal ingredients, open-fire cooking and a cellar of over 300 labels.
            Join us for an evening of unhurried indulgence in the heart of the city.
          </p>
          <div className="hero-actions">
            <a href="#reserve" className="btn btn-gold">Reserve Your Table</a>
            <a href="#menu" className="btn btn-ghost">Explore the Menu</a>
          </div>

          <div className="hero-stats">
            <div className="stat"><h3>15+</h3><p>Years of Craft</p></div>
            <div className="stat"><h3>300+</h3><p>Wine Labels</p></div>
            <div className="stat"><h3>4.9</h3><p>Guest Rating</p></div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="section" id="about">
        <div className="wrap about-grid">
          <div className="about-imgs reveal">
            <img
              className="big"
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=80"
              alt="Restaurant dining room"
            />
            <img
              className="small"
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
              alt="Head chef plating a dish"
            />
            <div className="badge-float">
              <strong>15</strong>
              <span>Years Serving</span>
            </div>
          </div>

          <div className="reveal">
            <p className="eyebrow">Our Story</p>
            <h2 className="title">A Kitchen Built on Passion &amp; Fire</h2>
            <p className="lead">
              SAVOR began as a twelve-seat bistro with a single wood-fired oven.
              Today we source from local farms each morning, butcher in-house, and
              let the seasons write the menu — never the other way around.
            </p>

            <div className="feature-list">
              <div className="feature">
                <i>✦</i>
                <div>
                  <h4>Farm to Table</h4>
                  <p>Produce delivered daily from growers within 60 miles.</p>
                </div>
              </div>
              <div className="feature">
                <i>✦</i>
                <div>
                  <h4>Open Fire</h4>
                  <p>Charcoal grill and wood oven at the heart of the kitchen.</p>
                </div>
              </div>
              <div className="feature">
                <i>✦</i>
                <div>
                  <h4>Curated Cellar</h4>
                  <p>300+ labels hand-picked by our resident sommelier.</p>
                </div>
              </div>
              <div className="feature">
                <i>✦</i>
                <div>
                  <h4>Private Events</h4>
                  <p>Intimate dining rooms for 10–60 guests, fully catered.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MENU ================= */}
      <section className="section menu" id="menu">
        <div className="wrap">
          <div className="center reveal">
            <p className="eyebrow">Our Menu</p>
            <h2 className="title">Crafted With the Season</h2>
            <p className="lead">
              A tasting of our current favourites. The full carte changes quarterly —
              ask your server about today's specials.
            </p>
          </div>

          <div className="tabs reveal">
            {Object.keys(MENU).map((cat) => (
              <button
                key={cat}
                className={`tab ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {MENU[category].map((dish) => (
              <article className="dish reveal" key={dish.name}>
                <img className="dish-img" src={dish.img} alt={dish.name} loading="lazy" />
                <div className="dish-body">
                  <div className="dish-head">
                    <h4>{dish.name}</h4>
                    <span className="dots" />
                    <span className="price">{dish.price}</span>
                  </div>
                  <p>{dish.desc}</p>
                  {dish.tag && <span className="tag">{dish.tag}</span>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUOTE STRIP ================= */}
      <section className="quote">
        <div className="wrap reveal">
          <blockquote>“Cooking is the art of adjusting flavours — not following rules.”</blockquote>
          <cite>Marco Bellini · Executive Chef</cite>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="section" id="gallery">
        <div className="wrap">
          <div className="center reveal">
            <p className="eyebrow">Gallery</p>
            <h2 className="title">Moments From Our Table</h2>
          </div>

          <div className="gallery-grid">
            {GALLERY.map((g, i) => (
              <figure className={`${g.cls} reveal`} key={i}>
                <img src={g.src} alt={`Gallery ${i + 1}`} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="section testi">
        <div className="wrap">
          <div className="center reveal">
            <p className="eyebrow">Testimonials</p>
            <h2 className="title">What Our Guests Say</h2>
          </div>

          <div className="testi-grid">
            {TESTIMONIALS.map((t) => (
              <div className="testi-card reveal" key={t.name}>
                <div className="stars">★★★★★</div>
                <p>“{t.text}”</p>
                <div className="testi-user">
                  <img src={t.img} alt={t.name} loading="lazy" />
                  <div>
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESERVATION ================= */}
      <section className="section" id="reserve">
        <div className="wrap reserve-grid">
          <div className="reveal">
            <img
              className="reserve-img"
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80"
              alt="Table set for dinner"
            />
            <div className="hours">
              {HOURS.map((h) => (
                <div className="hours-row" key={h.day}>
                  <span>{h.day}</span>
                  <strong>{h.time}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <p className="eyebrow">Reservations</p>
            <h2 className="title">Book Your Table</h2>
            <p className="lead" style={{ marginBottom: "34px" }}>
              We hold tables for 15 minutes past the reservation time. For parties
              larger than 8, please call us directly.
            </p>

            <form className="form" onSubmit={handleSubmit}>
              {submitted && (
                <div className="success">
                  ✓ Thank you! Your reservation request has been received — we'll confirm by email shortly.
                </div>
              )}

              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Full Name</label>
                  <input id="name" name="name" type="text" placeholder="Jane Doe"
                    value={form.name} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="jane@email.com"
                    value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="+1 555 000 1234"
                    value={form.phone} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="guests">Guests</label>
                  <select id="guests" name="guests" value={form.guests} onChange={handleChange}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="date">Date</label>
                  <input id="date" name="date" type="date" min={today}
                    value={form.date} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="time">Time</label>
                  <input id="time" name="time" type="time"
                    value={form.time} onChange={handleChange} required />
                </div>
              </div>

              <div className="field">
                <label htmlFor="notes">Special Requests</label>
                <textarea id="notes" name="notes" placeholder="Allergies, celebrations, seating preference…"
                  value={form.notes} onChange={handleChange} />
              </div>

              <button type="submit" className="btn btn-gold">Confirm Reservation</button>
            </form>
          </div>
        </div>
      </section>

      {/* ================= FOOTER / CONTACT ================= */}
      <footer className="footer" id="contact">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <a href="#home" className="logo">SAV<span>O</span>R</a>
              <p style={{ marginTop: "20px" }}>
                Seasonal fine dining, open-fire cooking and a cellar of 300+ labels.
                Reserve your table today.
              </p>
              <div className="socials">
                <a href="#" aria-label="Instagram">IG</a>
                <a href="#" aria-label="Facebook">FB</a>
                <a href="#" aria-label="X">X</a>
                <a href="#" aria-label="TripAdvisor">TA</a>
              </div>
            </div>

            <div>
              <h4>Explore</h4>
              <ul>
                {NAV_LINKS.map((l) => (
                  <li key={l.label}><a href={l.href}>{l.label}</a></li>
                ))}
                <li><a href="#reserve">Reservations</a></li>
              </ul>
            </div>

            <div>
              <h4>Contact</h4>
              <ul>
                <li>128 Vine Street</li>
                <li>Downtown, NY 10012</li>
                <li><a href="tel:+15550001234">+1 (555) 000-1234</a></li>
                <li><a href="mailto:hello@savor.com">hello@savor.com</a></li>
              </ul>
            </div>

            <div>
              <h4>Newsletter</h4>
              <p>Seasonal menus, wine dinners and private events — straight to your inbox.</p>
              <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email" aria-label="Email" required />
                <button type="submit">Join</button>
              </form>
            </div>
          </div>

          <div className="copy">
            <span>© {new Date().getFullYear()} SAVOR Restaurant. All rights reserved.</span>
            <span>Privacy Policy · Terms of Service</span>
          </div>
        </div>
      </footer>
    </>
  );
}