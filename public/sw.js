const CACHE_NAME = 'sawacharge';
const urlsToCache = [
  // Precache essential static assets; avoid precaching HTML to reduce staleness
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Network-first for navigations/HTML to keep content fresh for users and crawlers
  const acceptHeader = req.headers.get('accept') || '';
  const isHtmlRequest = req.mode === 'navigate' || acceptHeader.includes('text/html');

  if (isHtmlRequest) {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return networkRes;
        })
        .catch(() => caches.match(req)) // Fallback to cache when offline
    );
    return;
  }

  // Cache-first for other requests (static assets, images, etc.) with runtime caching
  event.respondWith(
    caches.match(req).then((cacheRes) => {
      if (cacheRes) return cacheRes;
      return fetch(req).then((networkRes) => {
        // Only cache valid responses
        if (
          networkRes &&
          networkRes.status === 200 &&
          networkRes.type === 'basic'
        ) {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        }
        return networkRes;
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});