/* Service Workers */

const dynamicCache = "Dyanmic-cache-v7"; // changed to v2 for add, v3 for delete, v4 crud, v5 for offline, v6 for modal
const staticCache = "Static-cache-v6"; // updated to v2 for DOM, v3 host, v4 for ?, v5 for modal, 

// renamed index.html to movies.html so the service workers cache doesn't mess with my other projects? -> back to index.html
const assets = [ 
    "/",
    "/index.html",
    "/pages/fallback.html",
    "/js/app.js",
    "/js/ui.js",
    "/js/materialize.min.js",
    "/css/materialize.min.css",
    "/css/app.css",
    "/img/movie.jpg",
    "/img/movie.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
];

// Cache size limit
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
      cache.keys().then(keys => {
        if (keys.length > size) {
          cache.delete(keys[0]).then(limitCacheSize(name, size));
        }
      });
    });
};

self.addEventListener("install", function (event) {
    // fires when the browser install the app
    // here we're just logging the even and the contents of the object passed to the event
    // the purpose of this event is to give the service worker a place to setup the local
    // environment after the installment completes
    console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(
        caches.open(staticCache).then(function (cache) { // "static"
        console.log("SW: Precaching App shell");
        // cache.add("/js/app.js");
        cache.addAll(assets);
    })
    );
});

self.addEventListener("activate", function (event) {
    // fires after the service worker completes its installation
    // It's a place for the service worker to clean up from
    // previous service worker versions
    // console.log(`SW: Event fired: ${event.type}`);
    
    // Clean up cache
    event.waitUntil(
        caches.keys().then((keys) => {
          return Promise.all(
            keys
              .filter((key) => key !== staticCache && key !== dynamicCache)
              .map((key) => caches.delete(key))
          );
        })
      );
});

self.addEventListener("fetch", function (event) {
    // fires whenever the app requests a resource (file or data)
    // console.log(`SW: Fetching ${event.request.url}`);
    // next, go get the requested resource from the network
    // event.respondWith(fetch(event.request));

    // caches.match(event.request).then(function(response) {
    //     if (response) {
    //         return response;
    //     } else {
    //         return fetch(event.request);
    //     }
    // });
    // comment out to avoid excess during db
    if (event.request.url.indexOf("firestore.googleapis.com") === -1) {
        event.respondWith(
            caches.match(event.request).then((response) => {
                return ( 
                    response || 
                    fetch(event.request).then(fetchRes => {
                        return caches.open(dynamicCache).then(cache => {
                            cache.put(event.request.url, fetchRes.clone());
                            limitCacheSize(dynamicCache, 15);
                            return fetchRes;
                        });
                    })
                );
            })
            .catch(() => caches.match("/pages/fallback.html"))
        );
    }
});
