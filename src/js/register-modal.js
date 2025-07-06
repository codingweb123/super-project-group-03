import { refs } from "./refs";
import { hideRegisterModal } from "./helpers";

const registerModalFormEl = document.querySelector('.register-form');
const registerNameInput = document.querySelector('.register-name-input');
const registerEmailInput = document.querySelector('.register-email-input');
const registerMessageTextarea = document.querySelector('.register-message-textarea');
const registerCloseBtn = document.querySelector('.register-modal-close');
const modalEventTitileEl = document.querySelector('.modal-event-title');


const STORAGE_KEY = "RegisterInfo"


registerCloseBtn.addEventListener('click', hideRegisterModal);

refs.registerModal.addEventListener('click', event => {
    if (event.target === refs.registerModal) {
        hideRegisterModal()
    }
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        hideRegisterModal()
    }
});



let formData = {
    name: "",
    email: "",
    message: "",
}

const savedInfo = localStorage.getItem(STORAGE_KEY);
if (savedInfo) {
    formData = JSON.parse(savedInfo);
    registerModalFormEl.elements.name.value = formData.name || "";
    registerModalFormEl.elements.email.value = formData.email || "";
    registerModalFormEl.elements.message.value = formData.message || "";
}

registerModalFormEl.addEventListener('submit', handleRegisterSubmit);

function handleRegisterSubmit(event) {
  event.preventDefault();

  

  const nameError = registerNameInput.nextElementSibling;
  const emailError = registerEmailInput.nextElementSibling;
  const messageError = registerMessageTextarea.nextElementSibling;

  let hasError = false;

  if (registerNameInput.value.trim() === '') {
    registerNameInput.classList.add('error');
    nameError.style.display = 'block';
    hasError = true;
  } else {
    registerNameInput.classList.remove('error');
    nameError.style.display = 'none';
  }

  if (registerEmailInput.value.trim() === '') {
    registerEmailInput.classList.add('error');
    emailError.style.display = 'block';
    hasError = true;
  } else {
    registerEmailInput.classList.remove('error');
    emailError.style.display = 'none';
  }

  if (registerMessageTextarea.value.trim() === '') {
    registerMessageTextarea.classList.add('error');
    messageError.style.display = 'block';
    hasError = true;
  } else {
    registerMessageTextarea.classList.remove('error');
    messageError.style.display = 'none';
    } 
    

  if (!hasError) {
      formData = {
        name: "",
        email: "",
        message: "",
    }
    localStorage.removeItem(STORAGE_KEY);
    registerModalFormEl.reset();
  }
};





