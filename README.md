# Bloom Holding — website redesign

A redesign of [app.bloomholding.com](https://app.bloomholding.com/universal).

It's built with plain HTML, CSS and JavaScript (ES modules): no framework, no build step and no dependencies.

- **Pages:** home, divisions, properties, project detail and owner portal.
- **Accounts:** sign in and the Bloom GPT registration chat.
- **Bloom GPT:** an ask-anything page.
- **Site-wide:** light/dark mode, English/Arabic (RTL) and full responsive layouts.

Design notes, tokens and the change history are in [`DESIGN.md`](DESIGN.md).

---

## Run it locally

You need **Node.js 18 or newer** ([nodejs.org](https://nodejs.org)).

```bash
npm run dev
```

Then open **http://localhost:5173**. There's nothing to install — `server.js` uses only Node's built-in modules.
Use another port with `PORT=3000 npm run dev`.

(Alternative without Node: `python3 serve.py`.)

---

## Put it on GitHub

**Option A — in the browser (no git needed)**
1. Go to [github.com/new](https://github.com/new) and create a repository (e.g. `bloom-holding-redesign`). Leave "Add a README" unticked.
2. On the new repo page click **"uploading an existing file"**.
3. Unzip this project and drag **everything inside the folder** (`index.html`, `css/`, `js/`, `package.json`, `vercel.json`, …) into the page.
   Tip: `.gitignore` is hidden on macOS — press **⌘ ⇧ .** in Finder to show it, or skip it (it's optional).
4. Click **Commit changes**.

**Option B — with git**
```bash
cd bloom-holding-redesign
git init
git add .
git commit -m "Bloom Holding redesign"
git branch -M main
git remote add origin https://github.com/<your-username>/bloom-holding-redesign.git
git push -u origin main
```

---

## Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in with GitHub.
2. **Import** the `bloom-holding-redesign` repository.
3. Leave the settings as they are:
   - **Framework Preset:** Other
   - **Build Command:** *(empty)*
   - **Output Directory:** *(empty — the project root)*
4. Click **Deploy**. Your site will be live at `https://<project-name>.vercel.app` in about a minute.

Every push to `main` redeploys automatically.

`vercel.json` adds basic security headers and makes CSS/JS revalidate on each visit, so updates show up straight away.

The app uses hash URLs (`/#/properties`, `/#/register`, …), so no rewrite rules are needed.

---

## Project structure

```
index.html          App shell (loads all CSS + js/app.js)
css/                Design tokens, components, pages, motion, themes
js/app.js           Routes + page lifecycle
js/router.js        Hash router with page transitions
js/data.js          Content (divisions, projects, contact, …)
js/i18n.js          English / Arabic strings
js/pages/           One module per page
js/ui/              Shared UI (nav, search, overlays, theme, flipbook, …)
server.js           Zero-dependency local dev server (not used by Vercel)
vercel.json         Vercel headers/config
serve.py            Python alternative dev server
```

## Notes

- **Images and video** load from Bloom's own CDNs (`images.ctfassets.net`, `app.bloomholding.com`); testimonial portraits load from Unsplash. They need an internet connection.
- **Bloom GPT and registration are front-end prototypes.**
  - Answers come from keyword matching over local data.
  - Registration uses demo data; the OTP is **5652**.
  - Nothing is sent to a server.
  - Uploaded documents stay in the browser.
