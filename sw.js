const CACHE_NAME = "biva-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/home.html",
  "/login.html",

  "/css/global.css",
  "/css/home.css",
  "/css/bottomnav.css",
  "/css/modal.css",

  "/js/pages/home.js",

  "/manifest.json",

  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// =========================
// INSTALL
// =========================

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of urlsToCache) {
        try {
          await cache.add(url);
        } catch (err) {
          console.log("Skipping cache (missing file):", url);
        }
      }
    })
  );
});



// =========================
// FETCH
// =========================

self.addEventListener("fetch", (event) => {

  event.respondWith(

    caches.match(event.request)

      .then((response) => {

        return response || fetch(event.request);

      })

  );

});