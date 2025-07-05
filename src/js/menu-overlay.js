const closeBtn = document.querySelector(".menu-close-btn");
const menuOverlay = document.querySelector(".menu-overlay");
const menuLinks = document.querySelectorAll(".menu-nav-link");
const body = document.querySelector("body");

closeBtn.addEventListener("click", handleClick);

function handleClick() {
    menuOverlay.classList.remove("is-open");
};

menuLinks.forEach(link => {
    link.addEventListener("click", handleLink);
    function handleLink() {
        menuOverlay.classList.remove("is-open");
        body.style.scrollBehavior = "smooth";
    };
});
