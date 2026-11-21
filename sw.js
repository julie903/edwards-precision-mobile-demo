// v0.9: remove prototype shell caches; never cache authenticated pages or API responses.
self.addEventListener('install', e => e.waitUntil(self.skipWaiting()));
self.addEventListener('activate', e => e.waitUntil((async()=>{
 const keys=await caches.keys();
 await Promise.all(keys.filter(k=>k.startsWith('edwards-mobile-demo-')).map(k=>caches.delete(k)));
 await self.clients.claim();
})()));
// No fetch handler: browser always requests fresh HTML and protected API responses.
