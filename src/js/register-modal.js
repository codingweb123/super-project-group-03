import { refs } from "./refs";
import { hideRegisterModal } from "./helpers";


const registerModalFormEl = document.querySelector('.register-form');
const registerCloseBtn = document.querySelector('.register-modal-close');


const STORAGE_KEY = "RegisterInfo";


registerCloseBtn.addEventListener('click', hideRegisterModal);

refs.registerModal.addEventListener('click', event => {
    if (event.target === event.currentTarget) {
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

  

  const nameError = event.target.elements.name.nextElementSibling;
  const emailError = event.target.elements.email.nextElementSibling;
  const messageError = event.target.elements.message.nextElementSibling;

  let hasError = false;

  if (event.target.elements.name.value.trim() === '') {
    event.target.elements.name.classList.add('error');
    nameError.style.display = 'block';
    hasError = true;
  } else {
    event.target.elements.name.classList.remove('error');
    nameError.style.display = 'none';
  }

  if (event.target.elements.email.value.trim() === '') {
    event.target.elements.email.classList.add('error');
    emailError.style.display = 'block';
    hasError = true;
  } else {
    event.target.elements.email.classList.remove('error');
    emailError.style.display = 'none';
  }

  if (event.target.elements.message.value.trim() === '') {
    event.target.elements.message.classList.add('error');
    messageError.style.display = 'block';
    hasError = true;
  } else {
    event.target.elements.message.classList.remove('error');
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





