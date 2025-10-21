const CACHE_NAME = "his-report-cache-v1";
const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg8vF4G9MiYO8xmmzHQibSEGMpfcunFFDRPdNDAS0qpZ4HmBhpCmoNcK1Y63V1pnHrZAaAua018VNWSxQc4iY9490PKL0EgJDCaUaDFO8lNozW4y4THv7M9FwRfmdu3ltIUl_qzdR7xJD5LFrJ4uwNu9qKLINZ1hip26spnDCklTsYRKjV_3SYXD3h88e9l/s224/logo-mayapada-hospital-group-909x909-2022-removebg-preview.png"
];

// Instalasi service worker (cache file saat pertama kali dibuka)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Aktivasi service worker (hapus cache lama jika ada versi baru)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event (ambil dari cache dulu, baru dari jaringan)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
