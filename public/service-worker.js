const CACHE_NAME = "my-app-cache-v7";
const API_CACHE_NAME = "api-cache-v3";
const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// ✅ Automatically cache all built assets
self.addEventListener("install", async (event) => {
    const cache = await caches.open(CACHE_NAME);
    const assets = [
        "/",
        "/index.html",
        "/favicon.ico",
        "/manifest.json",
        "/logo192.png",
        "/logo512.png"
    ];

    // Fetch the list of assets from `self.__WB_MANIFEST` (workbox)
    self.__WB_MANIFEST?.forEach((file) => {
        assets.push(file.url);
    });

    await cache.addAll(assets);
});

// ✅ Activate - Clean old caches
self.addEventListener("activate", (event) => {
    console.log("Service Worker: Activated");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME && cache !== API_CACHE_NAME) {
                        console.log("Service Worker: Deleting old cache", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// ✅ Fetch - Serve Cached Files First
self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // Serve Cached Assets First
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request).then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
