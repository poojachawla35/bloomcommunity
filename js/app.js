import { route, navigate } from "./router.js";
import { mountNav, setNavRoute } from "./ui/nav.js";
import { observeReveals, magnetize, countUp, splitWords, tilt, parallax, ripples, imageFade, marqueeVelocity } from "./ui/motion.js";
import { renderFooter } from "./pages/footer.js";
import { applyLang, onLangChange, t } from "./i18n.js";
import { closeAllOverlays } from "./ui/overlay.js";
import { initTheme } from "./ui/theme.js";

route("/", () => import("./pages/universal.js"));
route("/space/:id", () => import("./pages/space.js"));
route("/properties", () => import("./pages/properties.js"));
route("/project/:id", () => import("./pages/project.js"));
route("/portal", () => import("./pages/portal.js"));
route("/login", () => import("./pages/login.js"));
route("/register", () => import("./pages/register.js"));
route("/gpt", () => import("./pages/gpt.js"));

applyLang();
initTheme();
ripples();
const nav = mountNav();
const footer = document.getElementById("site-footer-root");
renderFooter(footer);

const afterRender = (meta, view) => {
  setNavRoute(meta.key);
  /* The login page is a focused, chrome-free experience */
  document.body.classList.toggle("is-focus", ["login", "register", "gpt"].includes(meta.key));
  /* Division wayfinding colour for the whole page (see tokens.css) */
  document.documentElement.dataset.division = meta.key === "universal" ? "" : meta.key;
  splitWords(view);
  observeReveals(view);
  magnetize(view);
  magnetize(document.getElementById("site-nav"));
  tilt(view);
  parallax(view);
  imageFade(view);
  countUp(view);
  marqueeVelocity(view);
  observeReveals(footer);
  parallax(footer);
};

addEventListener("hashchange", () => { closeAllOverlays(); navigate(afterRender); });

onLangChange(() => {
  document.querySelector(".skip-link").textContent = t("skip");
  nav.redraw();
  renderFooter(footer);
  navigate(afterRender);
});

const skip = document.querySelector(".skip-link");
skip.textContent = t("skip");
skip.addEventListener("click", (e) => { e.preventDefault(); document.getElementById("view").focus(); });
navigate(afterRender);
