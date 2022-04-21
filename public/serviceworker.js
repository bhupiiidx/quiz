/* eslint-disable no-restricted-globals */
const version = '1.0';
const cacheName = `quizapp-${version}`;

self.addEventListener('install', (e) => {
	console.log('quizapp-', version, 'Installing');
	e.waitUntil(
		caches.open(cacheName).then((cache) => {
			return cache.addAll([ `/` ]).then(() => self.skipWaiting());
		})
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.open(cacheName).then((cache) => cache.match(event.request, { ignoreSearch: true })).then((response) => {
			return response || fetch(event.request);
		})
	);
});
