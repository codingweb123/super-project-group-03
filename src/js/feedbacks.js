import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const swiperEl = document.querySelector('.feedbacks-swiper');

if (swiperEl) {
  new Swiper('.feedbacks-swiper', {
    modules: [Navigation, Autoplay, Pagination, EffectFade],
    loop: false,
    slidesPerView: 3,
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.feedbacks-btn-next',
      prevEl: '.feedbacks-btn-prev',
    },
    scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
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
  });
}
