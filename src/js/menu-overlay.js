const burgerMenu = document.querySelector(".menu");
const openBtn = document.querySelector(".burger-btn");
const menuOverlay = document.querySelector(".menu-overlay");

openBtn.addEventListener("click", () => menuOverlay.classList.add("is-open"));

burgerMenu.addEventListener("click", element => {
    const menuBtn = element.target;

    if (menuBtn.classList.contains("menu-close-btn") || menuBtn.classList.contains("menu-nav-link")) {
        menuOverlay.classList.remove("is-open");
    }
})