function bindEvents() {
	document.getElementById("h-home").addEventListener("click", loadHome)
	document.getElementById("h-product").addEventListener("click", loadProduct)
	document.getElementById("h-contact").addEventListener("click", loadContactus)
	document.getElementById("h-about").addEventListener("click", loadAboutus)
}

function loadHome() {
	loadScript("/js/home.js")
}

function loadProduct() {
	loadScript("/js/product.js")
}

function loadContactus() {
	loadScript("/js/contactus.js")
}

function loadAboutus() {
	loadScript("/js/aboutus.js")
}

function loadScript(jsFilePath) {
	var id = jsFilePath.replace(/\//g, "-")

	var js = document.createElement("script")

	js.type = "text/javascript"
	js.src = jsFilePath
	js.id = id

	document.body.appendChild(js)
}

window.onload = bindEvents
