importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉Service Worker is working!`);
} else {
  console.log(`Boo! Workbox didn't load 😬Service Worker won't work properly...`);
}

const { registerRoute } = workbox.routing;
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;
const { precacheAndRoute, matchPrecache } = workbox.precaching;

precacheAndRoute([{"revision":"879e4852f4f6037428eeb7e019fd92d2","url":"favicon.ico"},{"revision":"11f5a5b052878df74b4ac95e530ff49d","url":"icon-black.png"},{"revision":"a3c3b9455114d88e7942b3b8f97147a3","url":"icon-primary.png"},{"revision":"a92ba365f8006bcfff9b8e487c20418c","url":"icon-white.png"},{"revision":"879e4852f4f6037428eeb7e019fd92d2","url":"images/$__favicon.ico"},{"revision":"27fea7ae8b0d266282ec6fc13ec9c59d","url":"index.html"},{"revision":"cc8548f25c371a0bdb9c5adaa2a37c7d","url":"library/index.html"},{"revision":"b54faf5497d32dfd3ce981bb0bfd54a8","url":"library/plugins/%24%3A%2Fplugins%2FGk0Wk%2FTW5-CodeMirror-Enhanced.json"},{"revision":"ab7f41fcafda368590e1e93c58b208a8","url":"tiddlywikicore-5.2.0.js"}]);

registerRoute(
  /\.css$/,
  // Use cache but update in the background.
  new StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'css-cache',
  })
);

registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|woff2?|ttf)$/,
  // Use the cache if it's available.
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        // Cache only a few images.
        maxEntries: 100,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(/\.js$/, new StaleWhileRevalidate());
registerRoute(/(^\/$|index.html)/, new StaleWhileRevalidate());
