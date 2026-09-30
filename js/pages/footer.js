/* Shared footer — original "OUR PROJECTS" and "CONTACT US" columns and the
   division list (every destination reachable from anywhere), app downloads,
   then the full Bloom wordmark as a quiet neutral watermark and a bottom
   bar (help links · © · social). The wordmark letters rise in on reveal and
   respond to the pointer — each letter lifts, tilts and fills with the Bloom
   gradient the closer the cursor gets. */

import { CONTACT, DIVISIONS, FOOTER_PROJECTS, FOOTER_LINKS } from "../data.js";
import { icon, esc } from "../ui/dom.js";
import { t } from "../i18n.js";
import { openContact } from "../ui/contact.js";

const SOCIAL = [
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/search/results/companies/?keywords=bloom%20holding" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/explore/search/keyword/?q=bloomholding" },
  { label: "X", icon: "x", href: "https://x.com/search?q=bloomholding" },
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/search/top?q=bloom%20holding" },
  { label: "YouTube", icon: "youtube", href: "https://www.youtube.com/results?search_query=bloom+holding" },
];

export function renderFooter(mount) {
  const ext = (href) => href.startsWith("http");
  mount.innerHTML = `
    <footer class="footer">
      <div class="footer__glow" aria-hidden="true"></div>
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand reveal" style="--i:0">
            <a href="#/" class="footer__mark" aria-label="Bloom — ${t("home")}"><span class="wordmark wordmark--lg">Bloom</span></a>
            <p class="footer__tag">${t("heroA")} <span class="t-serif">${t("heroPlace")}</span> ${t("heroB")}</p>
            <ul class="footer__contact" aria-label="${t("contactUs")}">
              <li><a href="${CONTACT.tollFreeHref}">${icon("phone", 16)} ${CONTACT.tollFree}</a></li>
              <li><a href="${CONTACT.internationalHref}">${icon("globe", 16)} (Outside UAE) ${CONTACT.international}</a></li>
              <li><a href="mailto:${CONTACT.email}">${icon("mail", 16)} ${CONTACT.email}</a></li>
            </ul>
          </div>

          <nav class="reveal" style="--i:1" aria-label="${t("divisions")}">
            <p class="footer__h t-meta">${t("divisions")}</p>
            <ul class="footer__links">${DIVISIONS.map((d) => `<li><a href="${d.route}">${esc(d.name)}</a></li>`).join("")}
              <li><a href="#/portal">${t("portal")}</a></li></ul>
          </nav>

          <nav class="reveal" style="--i:2" aria-label="${t("ourProjects")}">
            <p class="footer__h t-meta">${t("ourProjects")}</p>
            <ul class="footer__links footer__two">${FOOTER_PROJECTS.map((p) => {
              const href = FOOTER_LINKS[p] || "#/properties";
              return `<li><a href="${href}" ${ext(href) ? 'target="_blank" rel="noopener"' : ""}>${esc(p)}</a></li>`;
            }).join("")}</ul>
          </nav>

          <div class="footer__apps reveal" style="--i:3">
            <p class="footer__h t-meta">${t("takeBloom")}</p>
            <div class="footer__stores">
              <a class="store-btn" href="https://apps.apple.com/ae/search?term=bloom%20holding" target="_blank" rel="noopener">${icon("apple", 22)}<span><small>Download on the</small>App Store</span></a>
              <a class="store-btn" href="https://play.google.com/store/search?q=bloom%20holding&c=apps" target="_blank" rel="noopener">${icon("play", 20)}<span><small>Get it on</small>Google Play</span></a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__stage" data-reveal>
        <div class="footer__watermark" aria-hidden="true">
          <span class="wm">${[..."Bloom"].map((c, i) => `<span class="wl" data-l="${c}" style="--i:${i}">${c}</span>`).join("")}</span>
        </div>

      </div>

      <div class="container">
        <div class="footer__bottom">
          <ul class="footer__help">
            <li><button type="button" data-help="Sales">${t("contactUs")}</button></li>
            <li><button type="button" data-help="Owner support">${t("helpSupport")}</button></li>
            <li><a href="${CONTACT.corporateSite}" target="_blank" rel="noopener">bloomholding.com ${icon("arrowUpRight", 13)}</a></li>
          </ul>
          <span class="footer__copy">© ${new Date().getFullYear()} Bloom Holding. ${t("rights")}</span>
          <div class="footer__end">
            <ul class="footer__social" aria-label="${t("followUs")}">
              ${SOCIAL.map((s) => `<li><a class="footer__social-btn" href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}">${icon(s.icon, 17)}</a></li>`).join("")}
            </ul>
            <button class="footer__top-btn" type="button" data-top aria-label="${t("backToTop")}" title="${t("backToTop")}">${icon("arrowDown", 18, "footer__up")}</button>
          </div>
        </div>
      </div>
    </footer>`;

  mount.querySelectorAll("[data-help]").forEach((b) => b.addEventListener("click", () => openContact({ topic: b.dataset.help })));
  mount.querySelector("[data-top]").addEventListener("click", () => {
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    document.querySelector(".nav__brand")?.focus({ preventScroll: true });
  });

  /* Watermark letters: proximity-driven lift / tilt / glow, eased in rAF and
     idle once every letter has settled. */
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const stage = mount.querySelector(".footer__stage");
  const wm = mount.querySelector(".footer__watermark");
  const letters = [...wm.querySelectorAll(".wl")].map((el) => ({ el, lift: 0, tilt: 0, glow: 0 }));
  let px = null, py = null, raf = 0;
  const step = () => {
    raf = 0;
    const size = wm.getBoundingClientRect().height || 1;
    let moving = false;
    for (const L of letters) {
      const r = L.el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height * 0.55;
      let tl = 0, tt = 0, tg = 0;
      if (px !== null) {
        const dx = px - cx, dy = py - cy;
        const k = Math.max(0, 1 - Math.hypot(dx, dy * 0.6) / (size * 1.05));
        const e = k * k * (3 - 2 * k);            /* smoothstep */
        tl = e * size * 0.16; tt = Math.max(-1, Math.min(1, dx / r.width)) * e * -7; tg = e;
      }
      L.lift += (tl - L.lift) * 0.14; L.tilt += (tt - L.tilt) * 0.14; L.glow += (tg - L.glow) * 0.12;
      if (Math.abs(tl - L.lift) > 0.2 || Math.abs(tg - L.glow) > 0.005) moving = true;
      L.el.style.setProperty("--lift", L.lift.toFixed(2));
      L.el.style.setProperty("--tilt", L.tilt.toFixed(2));
      L.el.style.setProperty("--glow", L.glow.toFixed(3));
    }
    if (moving) raf = requestAnimationFrame(step);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(step); };
  stage.addEventListener("pointermove", (e) => { px = e.clientX; py = e.clientY; wm.classList.add("is-live"); kick(); });
  stage.addEventListener("pointerleave", () => { px = py = null; wm.classList.remove("is-live"); kick(); });
}
