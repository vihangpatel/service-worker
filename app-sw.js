;(self => {
	self.addEventListener("install", event => {
		console.log("V1 installing…")

		// cache a cat SVG
		event.waitUntil(
			caches.open("static-v1").then(cache => {
				cache.add("/js/aboutus.js")
				cache.add("/js/contactus.js")
				cache.add("/js/home.js")
				cache.add("/js/main.js")
				cache.add("/js/product.js")
			})
		)
	})

	self.addEventListener("activate", event => {
		console.log("V1 now ready to handle fetches!")
	})

	self.addEventListener("fetch", event => {
		event.respondWith(
			caches.match(event.request).then(function(response) {
				if (response) {
					return response
				}
				return fetch(event.request)
					.then(function(fetchResponse) {
						return fetchResponse
					})
					.catch(function(error) {
						throw error
					})
			})
		)
	})
})(self)
