const CACHE_NAME = "version-1";

const URLS_TO_CHACHE = ["index.html", "offline.html"];

const self = this;
// installition
self.addEventListener("install", (e) => {
  e.waitUntill(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("open Cache");
      return cache.addAll(URLS_TO_CHACHE);
    })
  );
});

// listen for requests
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(() => {
      return fetch(e.request).catch(() => {
        caches.match("offline.html");
      });
    })
  );
});
// activate the service worker
self.addEventListener("activate", (e) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);

  e.waitUntill(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cachName) => {
          if (!cacheWhiteList.includes(cachName)) {
            return caches.delete(cachName);
          }
        })
      );
    })
  );
});
