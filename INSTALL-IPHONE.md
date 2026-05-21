# 🐯 TigerTMS Agent — iPhone Install Guide

## Install in 3 taps

1. Open this URL in **Safari** on your iPhone
2. Tap the **Share button** ⬆ at the bottom of Safari
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **Add** — the Tiger paw icon appears on your home screen

The app opens full-screen with no browser chrome, just like a native app.

---

## Setup (first time only)

1. Open the app → tap **⚙** (top right)
2. Paste your **Anthropic API key** (from console.anthropic.com)
3. Tap **Save** — your Microsoft 365 data loads automatically

---

## Serving the file (required for API calls)

Safari needs the app served over HTTPS or localhost. Options:

**Option A — From your Mac** (easiest):
```bash
cd ~/Downloads/tigertms-iphone
python3 -m http.server 8080
```
Then on iPhone: open Safari → go to `http://YOUR_MAC_IP:8080`  
Find your Mac's IP in System Settings → Wi-Fi → Details

**Option B — Upload to any web host**  
Upload the `tigertms-iphone/` folder to Netlify, Vercel, or GitHub Pages (all free).

---

## Notes

- **Safari is required** for "Add to Home Screen" on iPhone
- Chrome on iPhone does not support PWA installation
- The app works offline for cached content
- All data (photo, API key) is stored locally on your iPhone

---

*Stuart Derricott · Global Head of Sales · TigerTMS*
