function bindEvents() {
	document.getElementById("h-home").addEventListener("click", loadHome)
	document.getElementById("h-product").addEventListener("click", loadProduct)
	document.getElementById("h-contact").addEventListener("click", loadContactus)
	document.getElementById("h-about").addEventListener("click", loadAboutus)
}

function loadHome() {
	loadScript("/src/js/home.js")
}

function loadProduct() {
	loadScript("/src/js/product.js")
}

function loadContactus() {
	loadScript("/src/js/contactus.js")
}

function loadAboutus() {
	loadScript("/src/js/aboutus.js")
}

function loadScript(jsFilePath) {
	var js = document.createElement("script")

	js.type = "text/javascript"
	js.src = jsFilePath

	document.body.appendChild(js)
}

window.onload = bindEvents
