import Swiper from "swiper"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/swiper-bundle.css"

new Swiper(".hero .swiper", {
	modules: [Navigation, Autoplay],
	slidesPerView: 1,
	spaceBetween: 20,
	autoplay: {
		delay: 3000,
        disableOnInteraction: true
	},
	navigation: {
		nextEl: ".right-btn",
		prevEl: ".left-btn",
	},
})
