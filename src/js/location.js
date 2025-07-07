document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('iframe[data-src]')
    .forEach(iframe => iframe.setAttribute('src', iframe.dataset.src));
});

const scrollBtn = document.querySelector('#scrollToTopBtn');

window.addEventListener('scroll', () => {
  if (scrollY > 300) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

scrollBtn.addEventListener('click', () => {
  scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
