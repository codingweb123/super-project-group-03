import Swiper from "swiper"
import "swiper/css"
import { Keyboard, Navigation, Pagination } from "swiper/modules"
import { hideRegisterModal, openRegisterModal } from "./helpers"
import { refs } from "./refs"

const { registerModal } = refs
Swiper.use([Navigation, Pagination, Keyboard])

document.addEventListener("DOMContentLoaded", () => {
	const registerLinks = document.querySelectorAll(".event-register")

	registerLinks.forEach(link => {
		link.addEventListener("click", e => {
			e.preventDefault()
			document.body.style.overflow = "hidden"
			openRegisterModal()
		})
	})

	registerModal.addEventListener("click", e => {
		if (e.target === e.currentTarget) {
			document.body.style.overflow = "unset"
			hideRegisterModal()
		}
	})
})

new Swiper(".events .swiper", {
	spaceBetween: 24,
	slidesPerView: 1,

	navigation: {
		nextEl: ".events-button-next",
		prevEl: ".events-button-prev",
	},

	pagination: {
		el: ".pagination",
		clickable: true,
	},

	keyboard: {
		enabled: true,
	},

	breakpoints: {
		768: {
			slidesPerView: 2,
		},
		1440: {
			slidesPerView: 3,
		},
	},
})
