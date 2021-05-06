// global constants
const APP_PREFIX = "FoodFest-"; // app name
const VERSION = "version_01"; //version
const CACHE_NAME = APP_PREFIX + VERSION; // app name/prefix + the version

// Here we define which files we'd like to cache
const FILES_TO_CACHE = [
  "./index.html",
  "./events.html",
  "./tickets.html",
  "./schedule.html",
  // we don't add the images ( "./assets/img/image.jpg" )here because the browser has a cache limit, so we prioritized caching the javascript and html files so that the site is at least functional.
  "./assets/css/style.css",
  "./assets/css/bootstrap.css",
  "./assets/css/tickets.css",
  "./dist/app.bundle.js",
  "./dist/events.bundle.js",
  "./dist/tickets.bundle.js",
  "./dist/schedule.bundle.js",
];

// When the browser knows about the service worker, we need to install it, adding files to the precache, so that the application can use the cache. We'll do this by setting up event listeners.
// The context of `self` here refers to the service worker object.
self.addEventListener("install", function (e) {
  // this function tells the browser to wait until the endclosing code is finished executing.
  e.waitUntil(
    // open a cache storage instance with caches.open method with argument of cache_name.
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("installing cache :" + CACHE_NAME);
      // this method adds every file into cache storage instance under the cache name of FILES_TO_CACHE array
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    // .keys() returns an array of all cache names, which we're calling keyList
    // keyList is a parameter that contains all cache names under <username>.github.io
    caches.keys().then(function (keyList) {
      // Because we may host many sites from the same URL, we should filter out caches that have the app prefix. We'll capture the ones that have that prefix, stored in APP_PREFIX, and save them to an array called cacheKeeplist using the .filter() method.
      let cacheKeepList = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      cacheKeepList.push(CACHE_NAME);

      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log("deleting cache : " + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});

// this event listener helps the application know how to retrieve information from the cache
//
self.addEventListener("fetch", function (e) {
  console.log("fetch request :" + e.request.url);
  //  we use event object called respondWith to intercept the fetch request
  e.respondWith(
    // the following lines will check to see if the request is stored in the cache or not.
    caches.match(e.request).then(function (request) {
      // If it is stored in the cache, e.respondWith will deliver the resource directly from the cache; otherwise the resource will be retrieved normally.
      if (request) {
        // if cache is available, respond with cache
        console.log("responding with cache : " + e.request.url);
        return request;
      } else {
        // if there are no cache, try fetching request
        console.log("file is not cached, fetching : " + e.request.url);
        return fetch(e.request);
      }
      // can replace if/else statements with the following
      //   return request || fetch(e.request);
    })
  );
});
