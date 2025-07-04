import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const footerForm = document.querySelector('.form-footer');
const emailInput = document.querySelector('.footer-email-field');
const footerBtn = document.querySelector('.footer-btn');

emailInput.addEventListener('input', () => {
    const value = emailInput.value.trim();
    if (value.includes('@') && value.length > 3) {
      footerBtn.disabled = false;
    } else {
      footerBtn.disabled = true;
    }
});

footerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    iziToast.success({
      title: 'Success',
      message: 'Thank you! You have successfully subscribed to the newsletter.',
      position: 'bottomRight',
      timeout: 3000,
    });

    emailInput.value = '';
    footerBtn.disabled = true;
  });

