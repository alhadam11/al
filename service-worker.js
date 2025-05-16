// اسم التخزين المؤقت
const CACHE_NAME = 'alhydam-travel-cache-v1';

// قائمة الملفات التي سيتم تخزينها مؤقتًا
const urlsToCache = [
  '/',
  '/index.html',
  '/gallery.html',
  '/faq.html',
  '/css/new-style.css',
  '/img/logo.png',
  '/img/gallery-1.jpg',
  '/img/gallery-2.jpg',
  '/img/gallery-3.jpg',
  '/img/gallery-4.jpg',
  '/img/gallery-5.jpg',
  '/img/gallery-6.jpg',
  '/img/gallery-7.jpg',
  '/img/office.jpg',
  '/img/pattern.png'
];

// تثبيت Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('تم فتح التخزين المؤقت');
        return cache.addAll(urlsToCache);
      })
  );
});

// استراتيجية التخزين المؤقت: الشبكة أولاً، ثم التخزين المؤقت
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // إذا كان الطلب ناجحًا، قم بتخزينه مؤقتًا
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // إذا فشل الطلب، حاول استرداده من التخزين المؤقت
        return caches.match(event.request);
      })
  );
});

// تحديث Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
