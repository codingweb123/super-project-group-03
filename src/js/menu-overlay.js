const burgerMenu = document.querySelector(".menu")
const openBtn = document.querySelector(".burger-btn")
const menuOverlay = document.querySelector(".menu-overlay")

openBtn.addEventListener("click", () => menuOverlay.classList.add("is-open"))

burgerMenu.addEventListener("click", element => {
	element.preventDefault()
	let menuBtn = element.target

	if (menuBtn.nodeName === "use" || menuBtn.nodeName === "svg") {
		menuBtn = menuBtn.closest(".menu-close-btn")
	}
	if (menuBtn.classList.contains("menu-close-btn")) {
		menuOverlay.classList.remove("is-open")
	}
	if (menuBtn.classList.contains("menu-nav-link")) {
		menuOverlay.classList.remove("is-open")
		document.querySelector(menuBtn.getAttribute("href")).scrollIntoView({
			behavior: "smooth",
		})
	}
})
