# TiGERtms Agent — iPhone PWA

Hosted on GitHub Pages so it works from any browser with HTTPS — no server needed.

## Deploy in 3 steps

### Step 1 — Create a GitHub repository
1. Go to [github.com](https://github.com) → **New repository**
2. Name it `tigertms-agent` (or anything you like)
3. Set to **Public** (required for free GitHub Pages)
4. Click **Create repository**

### Step 2 — Upload these files
1. In your new repo, click **uploading an existing file**
2. Drag ALL files from this folder into the upload area
3. Click **Commit changes**

### Step 3 — Enable GitHub Pages
1. In your repo → **Settings** → **Pages**
2. Under **Branch**, select `main` → `/root` → **Save**
3. Wait ~60 seconds, then your URL appears:
   `https://YOUR-USERNAME.github.io/tigertms-agent/`

---

## Azure AD setup (one-time)

In [portal.azure.com](https://portal.azure.com) → App registrations → your app → **Authentication**:

Add this as a Redirect URI (Single-page application):
```
https://YOUR-USERNAME.github.io/tigertms-agent/
```

That's it. Open the URL on your iPhone in Safari, tap Share → Add to Home Screen.

---

## Settings in the app

- **Azure AD Client ID** — from portal.azure.com → your app → Overview
- **Anthropic API Key** — from console.anthropic.com (for LinkedIn feed + voice AI)
