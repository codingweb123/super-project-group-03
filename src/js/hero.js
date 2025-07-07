import Swiper from "swiper"
import { Autoplay, Navigation, EffectFade} from "swiper/modules"
import "swiper/swiper-bundle.css"

new Swiper(".hero .swiper", { 
  modules: [Navigation, Autoplay, EffectFade],
  slidesPerView: 1,
  spaceBetween: 20,
  effect: 'fade',
  autoplay: {
    delay: 3000,
  },
  navigation: {
    nextEl: '.right-btn',
    prevEl: '.left-btn',
}
  });