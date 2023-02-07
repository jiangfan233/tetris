

const cacheName = "tetris";



const appShellFiles = [
  "./audios/failure.mp3",
  "./audios/success.mp3",
  "./audios/warning.mp3",
  "./imgs/arrow-clockwise.svg",
  "./imgs/caret-down-fill.svg",
  "./imgs/caret-left-fill.svg",
  "./imgs/caret-right-fill.svg",
  "./imgs/caret-up-fill.svg",
  "./imgs/muscle-svgrepo-com.svg",
  "./imgs/play-circle.svg",
  "./imgs/volume-mute.svg",
  "./imgs/volume-up.svg",
  "./index.html",
  "./main.css",
]

// install 触发缓存上述列表
self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    // Service Worker 会等到 waitUntil 里面的代码执行完毕之后才开始安装
    caches.open(cacheName).then(function(cache) {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(appShellFiles);
    })
  );
});


// 如果条件允许，Service Worker 将从缓存中请求内容所需的数据，从而提供离线应用功能
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then(function(response) {
        return caches.open(cacheName).then(function(cache) {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});

