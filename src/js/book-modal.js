import { getBookByID } from "./api";
import Accordion from "accordion-js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { hideBookModal, openBookModal } from "./helpers";

new Accordion(".accordion-container", {
    duration: 250,
    showMultiple: true,
    elementClass: "ac",
    triggerClass: "ac-trigger",
    panelClass: "ac-panel",
    activeClass: "is-active",
});

const booksCountEl = document.querySelector(".count-text");
const minusEl = document.querySelector(".minus-btn");
const plusEl = document.querySelector(".plus-btn");
const addBtnEl = document.querySelector(".add-btn");
const formEl = document.querySelector(".modal-book-form");

let currentBookTitle = "";

export async function loadBookModal(bookId) {
    try {
        const book = await getBookByID(bookId);
        renderBookModal(book);
        openBookModal();
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Could not download book!",
            position: "topRight",
        });
    };
};

function renderBookModal({ book_image, title, author, price }) {
    currentBookTitle = title;

    const imgEl = document.querySelector(".modal-book-image img");
    const titleEl = document.querySelector(".modal-book-title");
    const authorEl = document.querySelector(".modal-book-text");
    const priceEl = document.querySelector(".modal-book-price");

    imgEl.src = book_image;
    imgEl.alt = title;
    titleEl.textContent = title;
    authorEl.textContent = author;
    priceEl.textContent = `$${price}`;
};

let count = 1;

plusEl.addEventListener("click", () => {
    count += 1;
    booksCountEl.textContent = count;
});

minusEl.addEventListener("click", () => {
    if (count > 1) {
        count -= 1;
    booksCountEl.textContent = count;
    };
});

addBtnEl.addEventListener("click", () => {
    iziToast.info({
        message: `Added ${booksCountEl.textContent} of ${currentBookTitle} to basket!`,
        position: "topRight",
    });
});

formEl.addEventListener("submit", event => {
    event.preventDefault();
    iziToast.info({
        message: "Thank you for your purchase!",
        position: "topRight",
    });
})

document.addEventListener("click", el => {
    if (
        el.target.closest(".modal-close-btn") ||
        (el.target.classList.contains("modal-overlay") && el.target.classList.contains("is-open"))
    ) {
        hideBookModal();
    };
});

document.addEventListener("keydown", element => {
    if (element.key === "Escape") {
        hideBookModal();
    };
});

