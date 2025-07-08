import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
Swiper.use([Navigation, Pagination]);

document.addEventListener('DOMContentLoaded', () => {
  const registerLinks = document.querySelectorAll('.event-register');
  const modalOverlay = document.querySelector('.register-modal');

  registerLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      modalOverlay.classList.add('is-open');
    });
  });

  // Закрытие модалкy при клике по фону
  modalOverlay.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      modalOverlay.classList.remove('is-open');
    }
  });
});

new Swiper('.events .swiper', {
  spaceBetween: 24,
  slidesPerView: 1,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1440: {
      slidesPerView: 3,
    },
  },
});
