/* TigerTMS Agent Service Worker v9 — Offline-first */
const VERSION = 'tigertms-v9';

/* Everything needed to run the app shell offline */
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-57.png',
  './icons/icon-60.png',
  './icons/icon-72.png',
  './icons/icon-76.png',
  './icons/icon-114.png',
  './icons/icon-120.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-167.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-1024.png',
];

/* ── INSTALL: cache everything up front ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

/* ── ACTIVATE: delete old caches ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

/* ── FETCH strategy ──
   App shell (HTML/icons/manifest) → cache-first, update in background
   External APIs (Graph, Anthropic, BBC) → network-only, fail gracefully
   Everything else → network-first, cache fallback
*/
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const isShell = url.origin === self.location.origin;
  const isAPI   = [
    'graph.microsoft.com',
    'login.microsoftonline.com',
    'api.anthropic.com',
    'feeds.bbci.co.uk',
    'api.allorigins.win',
    'api.rss2json.com',
    'www.linkedin.com',
  ].some(h => url.hostname.includes(h));

  /* External APIs: network only — don't cache, let app handle failures */
  if (isAPI) {
    e.respondWith(fetch(e.request).catch(() =>
      new Response(JSON.stringify({ offline: true, error: 'No network' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } })
    ));
    return;
  }

  /* App shell: cache-first, revalidate in background (stale-while-revalidate) */
  if (isShell) {
    e.respondWith(
      caches.open(VERSION).then(async cache => {
        const cached = await cache.match(e.request);
        const fetchPromise = fetch(e.request).then(resp => {
          if (resp && resp.status === 200) cache.put(e.request, resp.clone());
          return resp;
        }).catch(() => null);

        /* Return cache immediately if available (works offline) */
        if (cached) {
          fetchPromise; /* update cache in background */
          return cached;
        }
        /* Not in cache yet — wait for network */
        return fetchPromise || caches.match('./index.html');
      })
    );
    return;
  }

  /* Everything else: network first, cache fallback */
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

/* ── Message: force skip waiting (for update prompts) ── */
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});
