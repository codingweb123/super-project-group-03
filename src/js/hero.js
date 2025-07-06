const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    loop: false,
    effect: 'fade',
    navigation: {
      nextEl: '.right-btn',
      prevEl: '.left-btn',
    },
    on: {
      init: () => {
        toggleArrows();
      },
      slideChange: () => {
        toggleArrows();
      },
    },
  });
  
  const leftBtn = document.querySelector('.left-btn');
  const rightBtn = document.querySelector('.right-btn');
  
  function toggleArrows() {
    if (!swiper.params.loop) {
      leftBtn.disabled = swiper.isBeginning;
      rightBtn.disabled = swiper.isEnd;
    }
  }