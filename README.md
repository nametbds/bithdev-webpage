# BithDev Site — Setup & Deployment

## Local development

```bash
cd bithdev-site
npm install
npm run dev
# → http://localhost:4321
```

## Deploy to GitHub Pages

### 1. Create the GitHub repo

Go to github.com → New repository → name it `bithdev-site` → public → no README.

### 2. Push the code

```bash
cd bithdev-site
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/bithdev-site.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to repo → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

The workflow at `.github/workflows/deploy.yml` will trigger automatically on every push to `main`. Your site will be live at:

```
https://<YOUR_USERNAME>.github.io/bithdev-site/
```

Check **Actions** tab to monitor the first deployment.

### 4. Update astro.config.mjs with your username

Open `astro.config.mjs` and replace `bithdev` with your actual GitHub username:

```js
site: 'https://<YOUR_USERNAME>.github.io',
base: '/bithdev-site',
```

---

## Switch to a custom domain (bithdev.ie)

Once you have the domain:

1. Add a `public/CNAME` file:
   ```
   bithdev.ie
   ```

2. Update `astro.config.mjs`:
   ```js
   site: 'https://bithdev.ie',
   // remove the base line entirely
   ```

3. Configure DNS at your registrar (Blacknight etc.):
   - Add an `A` record pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or a `CNAME` record: `www → <username>.github.io`

4. In GitHub → Settings → Pages → Custom domain → enter `bithdev.ie` → tick **Enforce HTTPS**

---

## Adding a new case study

Create a new markdown file in `src/content/case-studies/`:

```md
---
title: "Your Project Title"
client: "Client Name"
summary: "One sentence summary."
date: "2026-10-01"
techStack: ["FastAPI", "React", "PostgreSQL"]
featured: true
---

## The Problem
...
```

Set `featured: true` to show it on the homepage. It will appear automatically — no code changes needed.
