import Swiper from 'swiper';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
Swiper.use([Navigation, Pagination, Scrollbar]);

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
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('is-open');
    }
  });
});

const swiper = new Swiper('.swiper', {
  loop: true,
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

  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
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
