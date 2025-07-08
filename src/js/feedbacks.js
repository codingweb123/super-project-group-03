import Swiper from "swiper"
import { Keyboard, Navigation, Pagination } from "swiper/modules"
import "swiper/swiper-bundle.css"

const swiperEl = document.querySelector(".feedbacks-swiper")

if (swiperEl) {
	new Swiper(".feedbacks-swiper", {
		modules: [Navigation, Pagination, Keyboard],
		slidesPerView: 3,
		spaceBetween: 24,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".feedbacks-btn-next",
			prevEl: ".feedbacks-btn-prev",
		},
		keyboard: {
			enabled: true,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 24,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 24,
			},
			1440: {
				slidesPerView: 3,
				spaceBetween: 24,
			},
		},
	})
}
