;(self => {
	self.addEventListener("install", event => {
		console.log("V1 installing…")

		const cacheStoreName = `static-33038`
		// Basically when code is built, new assets list is generated for client
		// Which has associated cache

		// event.waitUntil accepts promise
		event.waitUntil(
			caches.open(cacheStoreName).then(cache => {

				// list of static assets from the assets map file
				cache.addAll([
					"/js/aboutus.js",
					"/js/contactus.js",
					"/js/home.js",
					"/js/main.js",
					"/js/product.js",
					"/css/main.css",
					"/css/offline.css",
					"/offline.html"
				])
			})
		)
	})

	self.addEventListener("activate", event => {
		// Initially when service worker is installed for first time, 
		// request does not flow through service workers
		// To flow the request through service workers, claim the client
		clients.claim()	
		console.log("Its now ready to handle fetches!")

		event.waitUntil(
			caches.keys().then(function(cacheNames) {
				return Promise.all(
					cacheNames
						.filter(function(cacheName) {
							// Return true if you want to remove this cache,
							// but remember that caches are shared across
							// the whole origin
							console.log('cache to be removed : ' ,cacheName)
							return true
						})
						.map(function(cacheName) {
							return caches.delete(cacheName)
						})
				)
			})
		)
	})

	self.addEventListener("fetch", event => {
		// if (event.request.method != "GET" || event.request.mode == "cors" || event.request.url.startsWith('chrome-extension')){
		// 	event.respondWith(fetch(event.request))
		// 	return
		// } else { 
		// 	return 
		// }

		event.respondWith(
			caches.match(event.request).then(function(response) {
				if (response) {
					console.log("cached response : ", event.request)
					return response
				}
				return fetch(event.request)
					.then(function(fetchResponse) {
						console.log("fetching : ", event.request)
						return fetchResponse
					})
					.catch(function(error) {
						return caches.match('/offline.html');
					})
			})
		)
	})
})(self)
