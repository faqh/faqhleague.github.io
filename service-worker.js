// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
// workbox.precaching.precacheAndRoute([
//   { url: '/index.html', revision: '3' },
//   { url: '/nav.html', revision: '1' },
//   { url: '/klub.html', revision: '3' },
//   { url: '/manifest.json', revision: '3' },
//   { url: '/icon.png', revision: '1' },
//   { url: '/logo.png', revision: '1' },
//   { url: '/pages/home.html',revision: '1' },
//   { url: '/pages/table.html',revision: '1' },
//   { url: '/pages/favorite.html',revision: '1' },
//   { url: '/css/materialize.min.css',revision: '1' },
//   { url: '/css/style.css',revision: '3' },
//   { url: '/css/font.css',revision: '1' },
//   { url: '/img/123.jfif',revision: '1' },
//   { url: '/img/bg.jfif',revision: '1' },
//   { url: '/img/bg-table.jfif',revision: '1' },
//   { url: '/img/bg-club.jfif',revision: '1' },
//   { url: '/img/icon/alamat.png',revision: '1' },
//   { url: '/img/icon/email.png',revision: '1' },
//   { url: '/img/icon/stadium.png',revision: '1' },
//   { url: '/img/icon/telfon.png',revision: '1' },
//   { url: '/img/icon/website.png',revision: '1' },
//   { url: '/js/materialize.min.js',revision: '1' },
//   { url: '/js/script.js',revision: '1' },
//   { url: '/js/api.js', revision: '3' }
// ]); 

// workbox.routing.registerRoute(
//   new RegExp('/pages/'),
//   workbox.strategies.staleWhileRevalidate({
//         cacheName: 'pages'
//     })
// );

// if (workbox)
//   console.log(`Workbox berhasil dimuat`);
// else
//   console.log(`Workbox gagal dimuat`);

//   const CACHE_NAME = "football";
//   self.addEventListener("fetch", function(event) {
//     var base_url = "https://api.football-data.org/v2/";
  
//     if (event.request.url.indexOf(base_url) > -1) {
//       event.respondWith(
//         caches.open(CACHE_NAME).then(function(cache) {
//           return fetch(event.request).then(function(response) {
//             cache.put(event.request.url, response.clone());
//             return response;
//           })
//         })
//       );
//     } else {
//       event.respondWith(
//         caches.match(event.request, { ignoreSearch: true }).then(function(response) {
//           return response || fetch (event.request);
//         })
//       )
//     }
//   });

// self.addEventListener("activate", function(event) {
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (cacheName != CACHE_NAME) {
//             console.log("ServiceWorker: cache " + cacheName + " dihapus");
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('push', function(event) {
//   var body;
//   if (event.data) {
//     body = event.data.text();
//   } else {
//     body = 'Push message no payload';
//   }
//   var options = {
//     body: body,
//     icon: 'img/notification.png',
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1
//     }
//   };
//   event.waitUntil(
//     self.registration.showNotification('Push Notification', options)
//   );
// });