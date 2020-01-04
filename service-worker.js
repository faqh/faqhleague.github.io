importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);


workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '7' },
  { url: '/nav.html', revision: '1' },
  { url: '/pages/klub.html', revision: '6' },
  { url: '/manifest.json', revision: '4' },
  { url: '/icon.png', revision: '2' },
  { url: '/icon1.png', revision: '2' },
  { url: '/logo.png', revision: '1' },
  { url: '/pages/home.html',revision: '1' },
  { url: '/pages/table.html',revision: '2' },
  { url: '/pages/favorite.html',revision: '1' },
  { url: '/css/materialize.min.css',revision: '1' },
  { url: '/css/style.css',revision: '6' },
  { url: '/css/font.css',revision: '2' },
  { url: '/img/bg-club.jpg',revision: '2' },
  { url: '/img/bg-favorite.jpg',revision: '2' },
  { url: '/img/bg-home.jpg',revision: '2' },
  { url: '/img/bg-klasmen.jpg',revision: '2' },
  { url: '/img/icon/alamat.png',revision: '1' },
  { url: '/img/icon/email.png',revision: '1' },
  { url: '/img/icon/stadium.png',revision: '1' },
  { url: '/img/icon/telfon.png',revision: '1' },
  { url: '/img/icon/website.png',revision: '1' },
  { url: '/static/lib/idb.js',revision: '1' },
  { url: '/js/materialize.min.js',revision: '1' },
  { url: '/js/script.js',revision: '1' },
  { url: '/js/skrip.js',revision: '1' },
  { url: '/js/api.js', revision: '7' }
]); 

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate(       
    )
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,  
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'material-icons',
  })
);  

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'google',   
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
        cacheName: 'fetch',
    })
);




self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});