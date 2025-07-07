import { refs } from "./refs";
import { hideRegisterModal } from "./helpers";
import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"


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



const formData = {
    name: "",
    email: "",
    message: "",
}

const savedInfo = localStorage.getItem(STORAGE_KEY);
if (savedInfo) {
    const savedData = JSON.parse(savedInfo);
  Object.keys(formData).forEach(key => {
    formData[key] = savedData[key] || "";
    registerModalFormEl.elements[key].value = formData[key];
  })
}

registerModalFormEl.addEventListener('submit', handleRegisterSubmit);

function handleRegisterSubmit(event) {
  event.preventDefault();

  const { name, email } = event.target.elements;

  const nameError = name.nextElementSibling;
  const emailError = email.nextElementSibling;

  let hasError = false;

  if (name.value.trim() === '') {
    name.classList.add('error');
    nameError.style.display = 'block';
    hasError = true;
  } else {
    name.classList.remove('error');
    nameError.style.display = 'none';
  }

  if (email.value.trim() === '') {
    email.classList.add('error');
    emailError.style.display = 'block';
    hasError = true;
  } else {
    email.classList.remove('error');
    emailError.style.display = 'none';
  }
   
  if (!hasError) {
    Object.keys(formData).forEach(key => {
      formData[key] = "";
    })
    
    localStorage.removeItem(STORAGE_KEY);
    registerModalFormEl.reset();
    iziToast.success({
    	title: "Registration",
    	message: "You were successfully registered! Thank you.",
    	position: "bottomRight",
    	color: "#fff"
    })
  }
};





