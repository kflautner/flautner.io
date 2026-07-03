# flautner.io

A simple personal site — bio + essays — built with [Eleventy](https://www.11ty.dev/) and deployed to GitHub Pages on the custom domain **flautner.io**.

## What's here

```
src/
  index.njk          → homepage / bio  (edit your bio here)
  essays.njk         → the essays index page
  essays/*.md        → one Markdown file per essay
  _includes/         → page layouts (base.njk, essay.njk)
  _data/site.json    → site name, contact email, etc.
  assets/style.css   → all styling
CNAME                → tells GitHub Pages the custom domain
.github/workflows/deploy.yml → auto-build & deploy on every push
```

## Editing content

- **Bio:** edit `src/index.njk` (replace the `[bracketed]` placeholders).
- **Site name / email:** edit `src/_data/site.json`.
- **Add an essay:** copy an existing file in `src/essays/`, rename it (the filename becomes the URL), and update the front matter (`title`, `date`, `summary`) and body. Newest `date` shows first automatically.

## Running it locally (optional)

Requires [Node.js](https://nodejs.org). In the project folder:

```bash
npm install
npm start          # live preview at http://localhost:8080
```

`npm run build` produces the final site in `_site/`.

---

## One-time setup

### 1. Create the GitHub repo and push

On [github.com](https://github.com), click **New repository**, name it (e.g. `flautner.io`), leave it empty (no README), and create it. Then, in this project folder:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### 2. Turn on GitHub Pages

In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The included workflow (`.github/workflows/deploy.yml`) then builds and deploys the site on every push to `main`. The first run starts automatically after you push; watch it under the repo's **Actions** tab.

### 3. Point flautner.io at GitHub (DNS in Namecheap)

In Namecheap: **Domain List → Manage (flautner.io) → Advanced DNS**. Under **Host Records**, add these (keep Namecheap's BasicDNS nameservers so email forwarding below keeps working):

| Type  | Host | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | YOUR-USERNAME.github.io. |

Then in the repo: **Settings → Pages → Custom domain**, enter `flautner.io`, save, and once DNS verifies, tick **Enforce HTTPS**. (The `CNAME` file in this repo already records the domain.) DNS can take up to 24 hours to propagate.

### 4. Email redirections (Namecheap free forwarding)

Namecheap includes free email forwarding — virtual addresses like `you@flautner.io` that forward to a real inbox (Gmail, etc.). Note: it forwards incoming mail only; it doesn't let you *send* from the address.

In Namecheap: **Domain List → Manage (flautner.io) → Domain tab → Redirect Email**. Click **Add Forwarder** for each address:

| Alias (@flautner.io) | Forwards to           |
|----------------------|-----------------------|
| kris                 | your-real@email.com   |
| ...                  | ...                   |

Saving this automatically adds the required MX records. You can create up to 100 forwarders. These MX records coexist with the GitHub A/CNAME records from step 3 — they don't conflict.

---

## Notes

- `node_modules/` and `_site/` are git-ignored and never committed — GitHub builds a fresh copy on deploy.
- To change the look, edit `src/assets/style.css` (colors are CSS variables at the top).
