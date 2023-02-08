
import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
import { CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

// 放在顶部，sw获得控制权，不然是下次打开页面获得
clientsClaim();
// 跳过等待
self.skipWaiting();
// 预请求资源，__WB_MANIFEST变量会注册webpack打包的所有项目资源文件
precacheAndRoute(self.__WB_MANIFEST);

// 图片缓存
registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

// js css
registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  })
);
