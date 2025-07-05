document.addEventListener('DOMContentLoaded', () => {
  const registerLinks = document.querySelectorAll('.event-register');
  const modalOverlay = document.querySelector('.register-modal');

  registerLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      modalOverlay.classList.add('open');
    });
  });

  // Закрытие модалки при клике по фону
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('open');
    }
  });

  // Радио кнопки______________________________________________________
  const radios = Array.from(document.querySelectorAll('input[name="slider"]'));
  const prevBtn = document.querySelector('#prevBtn');
  const nextBtn = document.querySelector('#nextBtn');

  function getCheckedIndex() {
    return radios.findIndex(radio => radio.checked);
  }

  function setChecked(index) {
    radios.forEach((radio, i) => {
      radio.checked = i === index;
    });
  }

  prevBtn.addEventListener('click', () => {
    let current = getCheckedIndex();
    let prev = (current - 1 + radios.length) % radios.length;
    setChecked(prev);
  });

  nextBtn.addEventListener('click', () => {
    let current = getCheckedIndex();
    let next = (current + 1) % radios.length;
    setChecked(next);
  });
});
