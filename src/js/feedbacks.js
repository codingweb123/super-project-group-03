import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const swiperEl = document.querySelector('.feedbacks-swiper');

if (swiperEl) {
  new Swiper('.feedbacks-swiper', {
    modules: [Navigation, Pagination],
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
  });
}
