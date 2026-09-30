/* Local dev server for the Bloom redesign — zero dependencies.
     npm run dev        → http://localhost:5173
     PORT=3000 npm run dev
   Serves the project folder as static files with no-cache headers (so edits
   show on refresh), correct MIME types for ES modules, and index.html for
   any path that isn't a file (the app itself routes with #/hash URLs).
   Vercel doesn't use this file — it serves the folder statically. */

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)));
const PORT = Number(process.env.PORT) || 5173;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".mp4": "video/mp4",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

async function resolveFile(urlPath) {
  let rel = decodeURIComponent(urlPath.split("?")[0]);
  if (rel.endsWith("/")) rel += "index.html";
  const file = normalize(join(ROOT, rel));
  /* Never serve anything outside the project folder */
  if (file !== ROOT && !file.startsWith(ROOT + sep)) return null;
  try {
    const info = await stat(file);
    if (info.isDirectory()) return resolveFile(rel.replace(/\/?$/, "/"));
    return file;
  } catch {
    return null;
  }
}

const server = createServer(async (req, res) => {
  try {
    let file = await resolveFile(req.url || "/");
    /* Unknown non-asset paths fall back to the app shell */
    if (!file && !extname(req.url || "")) file = join(ROOT, "index.html");
    if (!file) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": TYPES[extname(file).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Server error");
    console.error(err);
  }
});

server.listen(PORT, () => {
  console.log(`Bloom redesign running at http://localhost:${PORT}`);
});
