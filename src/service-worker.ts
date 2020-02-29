//hack to declare self as service worker global scope
export default null;
declare var self: ServiceWorkerGlobalScope;

let CACHE_NAME = 'my-site-cache-v1';
let urlsToCache = [
    '',
    'index.html',
    'index.js',
    'styles/index.css',
    'assets/images/balloon-red/sprites.json',
    'assets/images/balloon-red/sprites.png',
    'assets/images/cloud1.png',
    'assets/images/cloud2.png',
    'assets/images/cloud3.png',
    'assets/images/cloud4.png',
    'assets/images/cloud5.png',
    'assets/sounds/balloon-pop.mp3',
];

self.addEventListener('install', (event) => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache.map(u => self.registration.scope + u));
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log('activated');
    event.waitUntil(
        caches.keys().then((keyList) => {
            console.log(keyList);
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request)
                .then((response) => {
                    return response || fetch(event.request);
                });
        })
    );
})
