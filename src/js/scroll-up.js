 const scrollBtn = document.getElementById('scrollToTopBtn');

  // Показуємо кнопку, коли користувач проскролив 300+ пікселів
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  // Скролимо до верху при кліку
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });