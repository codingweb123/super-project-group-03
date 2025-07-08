import Swiper from "swiper"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/swiper-bundle.css"

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		document
			.querySelectorAll("img[data-src]")
			.forEach(i => i.setAttribute("src", i.dataset.src))
		document
			.querySelectorAll("source[data-srcset]")
			.forEach(i => i.setAttribute("srcset", i.dataset.srcset))
	}, 800)
})

new Swiper(".hero .swiper", {
	modules: [Navigation, Autoplay],
	slidesPerView: 1,
	spaceBetween: 20,
	autoplay: {
		delay: 3000,
		disableOnInteraction: true,
	},
	navigation: {
		nextEl: ".right-btn",
		prevEl: ".left-btn",
	},
})
