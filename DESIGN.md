# Bloom Holding — Experience Redesign

Bloom Holding provides the content: pages, labels, data, journeys and business logic.
The benchmark (BlooMultiverse Interactive) provides only the visual and interaction language.

---

## Step 1 — Audit: Bloom Holding (source of truth)

### Screens and routes

| Route (original) | Screen | Content |
|---|---|---|
| `/universal` | The Bloom Experience (entry hub) | Eyebrow "THE BLOOM EXPERIENCE", H1 "More Than a Place to Live.", CTA "Let's Get Started", 6 division tiles |
| `/universal-space?id=education` | Bloom Education | "Education For Life" + description, Discover more, 4 offerings: Brighton Colleges (Abu Dhabi, Al Ain, Dubai), Charter Schools (Emirates Schools Establishment), Bloom World Academy, Bloom Nurseries |
| `…?id=retail` | Bloom Retail | "Destinations that Enrich Everyday Living", 4 offerings: Neighbourhood Retail, Dining Destinations, Convenience, Coming Soon |
| `…?id=hospitality` | Bloom Hospitality | "Ultimate Relaxation Destinations" + long description (Marriott, EDITION, Arjaan by Rotana), 2 offerings |
| `…?id=landscape` | Bloom Landscape | "Nurturing Nature", 6 services: Landscape Design, Hardscape Construction, Nursery, Softscape Installation, Irrigation System, Operations & Maintenance |
| `…?id=facilities` | Bloom Facilities Management | "Pioneering Customer Delight", 4 services: Sustainability, Bloom Home Service, Residential, Corporate |
| `/guest` (Bloom Properties tile) | Guest project listing | "Good Evening !" greeting, 21 project cards with image carousels, Google Map links, floating Login |
| `/guest-details?id=…` | Project Details | Tabs: Project Details / Explore Properties. Gallery, name, description, About Property (Amenities), Documents (Brochure download). Explore = 60+ projects and assets |
| `/welcome` (+ `?login=1`) | Portal landing + Sign-in modal | "Your Property, Simplified", Download the app, Login, 3 features, Mobile Experience (4 bullets, notification examples), 3 testimonials, Contact sales, footer (Our Projects, Contact Us) |
| Sign-in modal | Authentication | Email ID*, Password*, Forgot Password, Sign In, OR, Login with Emirates ID |

Global: EN / العربية switch on every screen. Breadcrumb (Home › Division) on space pages. Phone icon in header. "Discover more" opens bloomholding.com in a new window.

### Findings

- **The hub is a dead end for orientation.** No persistent navigation between divisions; the only way sideways is back to `/universal`.
- **"Let's Get Started" is ambiguous.** It opens a login modal on top of a marketing page. Guests who don't have an account are pushed to a sign-in wall.
- **The Properties journey is hidden.** "Bloom Properties" does not lead to a division page like the others; it jumps into a separate guest app (`/guest`) with a different header and visual language.
- **No search.** 60+ projects and assets exist in "Explore Properties" with no search, filter or grouping.
- **Weak hierarchy.** Every heading sits at a similar size; the listing is a uniform 2-column grid of equal cards; divisions and offerings reuse the same tile.
- **Empty imagery.** Several projects (Bloom Arjaan, Cordoba, Mabel Marbella, Green Hills…) show a grey placeholder icon.
- **Content defect.** The Facilities Management description repeats the Bloom Properties copy ("Bloom properties is the developer of choice…"). It is kept verbatim here and flagged for the content team.
- **Feedback gaps.** No loading feedback on the listing beyond skeletons; no confirmation on brochure download; no validation messaging on sign in.

---

## Step 2 — Audit: Benchmark (visual language only)

| Area | Observation |
|---|---|
| Type | Bricolage Grotesque 700 display (76px, −0.9 to −2.9px tracking, ~0.92 line height); Instrument Sans UI; Instrument Serif *italic* for emotional accent words; 12px uppercase metadata tracked +1.7px |
| Color | Warm paper canvas `#F6F4EF`; one deep ink (navy `#0B1640`); one saturated accent; immersive full-bleed dark sections; soft ambient glow top-right; faint dot grid |
| Layout | 1360px max width, fluid gutter `clamp(16px, 4vw, 56px)`; asymmetric split compositions; horizontal rails with `01 / 05` counters; giant outline marquee type between chapters |
| Navigation | Floating pill nav; section counter with circular scroll-progress ring and live section name; ⌘K search; compact icon actions |
| Components | 12–36px radius scale; hairline borders; minimal shadows (`0 10px 24px -16px`); pills for filters with counts |
| Motion | `cubic-bezier(.16,1,.3,1)` expo-out, spring overshoot for small elements; 160 / 260 / 520ms; scroll reveals; skeleton states |
| Editorial devices | Numbered eyebrows `03 —— PEOPLE`, chapter titles, italic serif lead-ins ("Meet"), large counters |

---

## Step 3 — Comparison

| Area | Bloom existing | Benchmark | New direction |
|---|---|---|---|
| Typography | Matter sans at 3 similar sizes; serif only in logo | Grotesque display + serif italic accents + tracked metadata | Bricolage Grotesque display with tight tracking; Instrument Serif italic for Bloom's emotive words ("place", "life", "nature"); Instrument Sans body; one 8-step scale |
| Colors | White/grey, black buttons, maroon logo only | Paper canvas, navy ink, red accent | Paper canvas, Bloom **charcoal** ink `#1C1C19` (from Bloom's own overlays), Bloom **terracotta** `#922A22` as the single brand accent, dark charcoal chapters |
| Layout | Uniform grids of equal tiles | Asymmetric editorial splits, rails | Expanding division gallery, split heroes, bento offering gallery, numbered service index, project rail, data table |
| Navigation | Logo + language; breadcrumb on some pages | Floating pill with section counter + search | Floating pill: wordmark, destinations menu with scroll-progress counter, ⌘K search across all content, EN/ع, Sign in; full-screen sheet on mobile |
| Cards | Same rounded image tile everywhere | Few cards, hairline borders | Cards only where objects are selectable (projects); everything else is typographic rows or full-bleed imagery |
| Spacing | Tight, inconsistent | Generous, rhythmic | 4px base scale, section padding `clamp(72px, 10vw, 160px)` |
| Interaction | Click-through only | Hover lift, rails, counters, toasts | Expanding panels, cursor-follow previews, carousel on hover, magnetic CTAs, tabs with sliding indicator, drawers, lightbox, toasts |
| Motion | None | Expo-out reveals, spring micro-motion | Same easing family, reveal-on-scroll with 60ms stagger, route cross-fade, all disabled under `prefers-reduced-motion` |
| UX | Sign-in wall, no search, hidden properties journey | — | Guest-first: browse everything without sign in; sign in is a clear secondary path; search, filters, sorting, empty and loading states |

---

## Step 4 — Principles

1. **One Bloom.** Six divisions, one navigation, one visual system. The guest listing gets the same chrome as the hub.
2. **Guest first, account second.** Everything browsable is browsable without signing in; "Sign in" is always one click away but never a wall.
3. **Type carries the brand.** Headlines do the work decoration would otherwise do. Imagery is Bloom's own photography, full-bleed where it matters.
4. **Composition follows content.** Places get imagery; services get numbered typographic rows; data gets tables.
5. **Progressive disclosure.** Offering details in a drawer, project facts in accordions, gallery in a lightbox.
6. **Motion confirms, never decorates.** Every animation expresses state, continuity or feedback.
7. **Accessible by default.** AA contrast, visible focus rings, 44px touch targets, keyboard support for every overlay, RTL support.

---

## Step 5 — Tokens

Defined in `css/tokens.css`. Summary:

- **Color:** `--color-primary #922A22` (Bloom terracotta) · `--color-primary-hover #7A2019` · `--color-secondary #1C1C19` (charcoal) · `--color-accent #B08A4E` (brass, ratings and progress only) · `--color-background #F6F4EF` · `--color-surface #FFFFFF` · `--color-surface-elevated #FBFAF7` · `--color-surface-inverse #1C1C19` · `--color-text-primary #1C1C19` · `--color-text-secondary #55534D` · `--color-text-muted #6F6C64` (4.9:1 on canvas) · `--color-border #E3DFD6` · success `#2E7D5B` · warning `#A86B12` · error `#B3261E`
- **Type:** `--font-display` Bricolage Grotesque · `--font-serif` Instrument Serif · `--font-body` Instrument Sans · `--font-arabic` IBM Plex Sans Arabic. Scale: display, h1, h2, h3, body-lg, body, caption, meta.
- **Space:** `--space-3xs 4px` → `--space-4xl 128px`, plus `--section-y` and `--gutter`.
- **Radius:** `--radius-xs 8` · `sm 12` · `md 18` · `lg 28` · `xl 36` · `pill`.
- **Shadow:** `--shadow-sm`, `--shadow-md`, `--shadow-float` (all low-opacity, negative spread).
- **Motion:** `--motion-fast 160ms` · `--motion-medium 260ms` · `--motion-slow 520ms` · `--ease-out` · `--ease-expo` · `--ease-spring`.
- **Breakpoints:** 390 / 768 / 1024 / 1280 / 1440 (documented in tokens; used in media queries).

---

## Step 6 — Component architecture

```
index.html                 shell: nav mount, <main id="view">, overlays root
css/
  tokens.css               design tokens only
  base.css                 reset, typography scale, layout primitives, reveal
  components.css           nav, buttons, inputs, chips, tabs, cards, table,
                           accordion, modal, drawer, toast, cmdk, skeleton
  pages.css                page-level compositions
js/
  app.js                   boot: nav, router, global shortcuts
  router.js                hash router + view transitions + scroll restore
  data.js                  all Bloom content (divisions, offerings, projects…)
  i18n.js                  EN / AR strings + dir switching
  ui/
    dom.js                 h() helper, icons, escape
    motion.js              reveal observer, magnetic, reduced-motion
    overlay.js             modal + drawer (focus trap, Esc, inert)
    toast.js               toast queue
    nav.js                 floating nav, destinations menu, mobile sheet
    search.js              ⌘K command palette
    auth.js                sign-in / forgot password / Emirates ID modal
    contact.js             contact-sales drawer form
    carousel.js            card image carousel
    gallery.js             project gallery + lightbox
  pages/
    universal.js           primary screen
    space.js               division pages
    properties.js          guest project listing
    project.js             project details + explore properties
    portal.js              "Your Property, Simplified"
    footer.js              shared footer
```

## Structural changes (and why)

1. **Bloom Properties becomes a first-class division route (`#/properties`)** that uses the shared shell. Originally it jumped into a visually separate guest app, which broke orientation.
2. **"Let's Get Started" goes to the portal page, not straight into a modal.** The original opened a login modal over the portal page. Guests first see what the portal does, and "Sign in" stays in the nav. The `#/portal?login=1` deep link still opens the modal directly, matching the original `?login=1`.
3. **Explore Properties is a searchable, grouped table** instead of 60+ stacked image cards, most of which have no imagery.
4. **Global search** was added. It is a navigation aid over existing content, not a new feature.

---

## Running it

No build step. It's plain ES modules, so it needs to be served over HTTP (not opened from `file://`):

```
python3 serve.py        # http://localhost:5173
```

Routes: `#/` · `#/space/{education|retail|hospitality|landscape|facilities}` · `#/properties` (`?tab=explore&cat=…`) · `#/project/{id}` · `#/portal` (`?login=1` opens sign-in).

Prototype limits: sign-in, Emirates ID, brochure download and contact forms show their full UI states, but they don't connect to Bloom's backend. Images and the portal video load from Bloom's own CDN.

---

## Revision 2 — Brand colour and wayfinding

**Source palette (bloomholding.com):** terracotta `#922A22` (wordmark and header bar), secondary red `#A94442`, cream `#F8F5EB` (page background), black, and greys.

- **Terracotta is now a surface, not just an accent.** Dark chapters, the footer, the marquee band and the closing CTA use the terracotta scale (`--terracotta-50…900`) with a cream wordmark, as bloomholding.com does. Sand `#D9B98A` highlights serif words on terracotta.
- **Division wayfinding colours** are muted hues taken from each division's photography, and they all pass 4.5:1 contrast: Properties terracotta, Education `#34506B`, Retail `#8F5A1C`, Hospitality `#2F6F73`, Landscape `#5E7445`, Facilities `#5A4A6E`. Setting `data-division` on `<html>` sets `--accent`. Buttons, eyebrows, tabs, focus rings, hero tint, image shades and drawers all follow it.
- **Intuitiveness**
  - The nav uses plain labelled links (Properties · Divisions ▾ · Owner portal) instead of the abstract section counter. The Divisions menu says what you can do in each division.
  - The home page leads with a task-based "What brings you to Bloom?" entry point (find a home, find a school, book a stay, manage my property…).
  - Division panels, cards and menu items state their task alongside the brand name.
  - Portfolio categories and collections are colour-coded in the chips, badges and cards.

## Revision 3 — Bloom GPT orb, register studio, closing footer

- **Bloom GPT orb** (`css/siri.css`, `siri()` in `js/ui/dom.js`): a Siri-style sphere of four blurred colour blobs (coral, amber, rose, teal) orbiting with `screen` blend, two tilted light ribbons and a specular highlight. Everything scales from `--s`; `--spd` sets the speed. It is used in the header Register button, the owner-portal Register button, every register chat row, the register companion (140px) and the opening portal.
- **Register**: the step bar is gone. The page now has three columns: a companion with a big orb whose `data-mood` (idle / thinking / speaking / typing / listening / done) follows the chat, plus a "Right now" hint; a glass chat panel; and the live "Bloom pass". The background is a drifting colour mesh with a pointer light and grain. Division tokens float around it, drift with the pointer and pop when tapped. Poking the orb makes it say hi.
- **Home hero**: the pointer spotlight, the arch tilt and the "Register with Bloom GPT" pill were removed.
- **Footer**: link columns, then a closing stage. The full Bloom wordmark sits uncropped, with a tagline over it that blurs in word by word, an animated dotted arc with a travelling spark, and the store buttons. Watermark letters lift, tilt and fill with a flowing brand gradient as the pointer approaches. The bottom bar holds help links · © · social + back to top.

## Revision 4 — vivid layer, gooey divisions, book flip

- **Base:** the page background is now white (`--color-background: #FFFFFF`), with softer neutral borders. The gradient tokens are `--grad-ai` (coral → rose → amber → teal, the orb palette), `--grad-brand` and `--grad-dawn`.
- **`css/vivid.css`:**
  - Gradient serif accent words in headings, and gradient eyebrows.
  - Living gradient primary buttons.
  - An aurora hero, a gradient-bordered stats bar, and gradient quick-start hovers.
  - Gradient marquee, CTA band and portal teaser.
- **Divisions:** now a dark stage.
  - Division-coloured blobs melt together through an SVG goo filter (`#goo-lg` in `index.html`), and a pointer blob merges with them.
  - A gooey tab bar (`#goo`) picks the panel: two blobs chase the active tab at different speeds, so the colour stretches like liquid.
  - The active panel image opens with a liquid circular reveal and a sheen.
- **Featured:** each card is a book. The photo is a cover hinged on its spine. On hover it swings open (rotateY −162°) to show the project page with facts, thumbnails and a CTA, over stacked page edges.
- **Theme toggle:** a sliding sun/moon switch (`role="switch"`).
- **Footer:** the tagline and arc are gone and the store buttons are back in the grid. The Bloom wordmark is filled with a flowing vivid gradient, and letters lift and glow near the pointer.
- **Register:**
  - The floating icons were removed. The background is now a colour mesh, a slow-turning conic aura, and a Siri waveform along the bottom that swells while Bloom GPT talks.
  - Replies stream slower (`WORD_MS`), with a gradient caret. There is a longer "thinking" beat, chips and fields appear one by one, and extracted details are typed character by character.

## Revision 5 — Divisions orbit

- The accordion cells and the gooey tab bar were replaced by an orbit layout.
  - **Story column:** a big gradient counter (01 / 06), the division tag, headline, task and count, a CTA, and prev/next buttons with a progress line.
  - **Orbit:** an image blob with slowly morphing edges and a gooey halo of drops in the division colour, surrounded by a dashed ring with six division nodes.
- **Selecting a division** (click, arrows, arrow keys or the 6s auto-advance) rotates the ring via `@property --rot`, always the short way round, so the chosen node lands at 9 o'clock beside the story. The image swaps with a liquid circle reveal from the direction of travel, and the story blurs up into place word block by word block.
- **Auto-advance** pauses on hover or focus.
- **Small screens:** the orbit sits above the story.

## Revision 6 — Bigger orbit, flipbook, neutral watermark

- **Divisions orbit:**
  - The ring is bigger (up to 680px, 50vw) and the image blob fills more of it.
  - Nodes are 92px photo thumbnails with an icon badge. Inactive nodes are muted; the active one is enlarged with a glow.
  - The blob tilts toward the pointer while the photo drifts the other way.
  - A light beam runs from the active node toward the story.
- **Featured:**
  - Hovering a book blurs and dims the other cards.
  - Clicking a book opens `js/ui/flipbook.js`, a modal photo book over a blurred backdrop. The book flies from the card to the centre and the cover opens itself.
  - Pages turn on the spine with a curl shade. Turn them by clicking a page half, the arrow buttons, the arrow keys or a swipe.
  - The last page links to the project. Esc, ✕ or the backdrop closes it, with focus trapped while it's open.
  - The card's `href` remains the no-JS fallback.
- **Footer:** the wordmark is a neutral watermark again. Hovering lifts, tilts and slightly deepens letters near the pointer, with no colour.

## Revision 7 — Orb style

- A glass-bubble version of the orb was tried (pink/teal, then red) and reverted at the client's request. `css/siri.css` is back to the Siri-style sphere from Revision 3.

## Revision 8 — Bloom GPT page

- **Header:** a "Bloom GPT" pill with a glossy red ball (a spark orbits it; the ball rolls on hover) links to `#/gpt`. It shows as the ball alone below 1100px, and appears as a full-width "Ask Bloom GPT" link in the mobile menu.
- **Page layout** (`js/pages/gpt.js`, `css/gpt.css`, chrome-free like login/register):
  - "Back to home", then a greeting with today's date.
  - The heading "Everything Bloom, in one conversation." with a navy → red gradient.
  - A large ask bar with a typewriter placeholder cycling through example questions, an "Enter ↵" hint and a red send button.
  - Twelve "Try asking" chips. "/" focuses the ask bar.
- **Conversation:**
  - Asking folds the hero away and docks the bar at the bottom.
  - Bloom GPT thinks (the ball squeezes), then streams its answer with community or offering cards, action buttons and follow-up chips, all built from `data.js`.
  - Intents: attention, home/communities, education, hospitality, retail, landscape, facilities, payments/progress/portal, register, help, and a community looked up by name, with a fallback.
- **Language:** English and Arabic.
- **Scope:** a prototype. It uses intent matching, with no model and no backend.
