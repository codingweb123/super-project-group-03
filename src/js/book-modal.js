import { getBookByID } from "./api"
import Accordion from "accordion-js"
import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"

import { hideBookModal, openBookModal } from "./helpers"

new Accordion(".accordion-container", {
	duration: 250,
	showMultiple: true,
	elementClass: "ac",
	triggerClass: "ac-trigger",
	panelClass: "ac-panel",
	activeClass: "is-active",
})

const closeBtn = document.querySelector(".modal-close-btn")
const booksCountEl = document.querySelector(".count-text")
const minusEl = document.querySelector(".minus-btn")
const plusEl = document.querySelector(".plus-btn")
const addBtnEl = document.querySelector(".add-btn")
const formEl = document.querySelector(".modal-book-form")
const bookModalEl = document.querySelector(".book-modal")

let currentBookTitle = ""
let currentBook = null
let count = 1
let priceEl = null
let price = 0

function addToCart(book, quantity) {
	const localStorageKey = "product"
	const savedData = localStorage.getItem(localStorageKey)
	const products = savedData ? JSON.parse(savedData) : []
	const savedBook = products.find(item => item._id === book._id)

	if (savedBook) {
		savedBook.quantity += quantity
	} else {
		products.push({
			_id: book._id,
			book_image: book.book_image,
			title: book.title,
			author: book.author,
			price: book.price,
			quantity: quantity,
		})
	}

	localStorage.setItem(localStorageKey, JSON.stringify(products))
}

export async function loadBookModal(bookId) {
	try {
		const book = await getBookByID(bookId)
		renderBookModal(book)
		openBookModal()
		document.body.style.overflow = "hidden"
	} catch (error) {
		iziToast.error({
			title: "Error",
			message: "Could not download book!",
			position: "topRight",
		})
	}
}

function renderBookModal(book) {
	currentBook = book
	currentBookTitle = book.title

	const imgEl = document.querySelector(".modal-book-image")
	const titleEl = document.querySelector(".modal-book-title")
	const authorEl = document.querySelector(".modal-book-text")
	priceEl = document.querySelector(".modal-book-price")

	imgEl.src = book.book_image
	imgEl.alt = book.title
	titleEl.textContent = book.title
	authorEl.textContent = book.author
	priceEl.textContent = `$${book.price}`
	price = book.price

	count = 1
	booksCountEl.textContent = count
}

plusEl.addEventListener("click", () => {
	count += 1
	priceEl.textContent = `$${(price * count).toFixed(2)}`
	booksCountEl.textContent = count
})

minusEl.addEventListener("click", () => {
	if (count > 1) {
		count -= 1
		priceEl.textContent = `$${(price * count).toFixed(2)}`
		booksCountEl.textContent = count
	} else {
		priceEl.textContent = `$${price}`
	}
})

addBtnEl.addEventListener("click", () => {
	const quantity = Number(booksCountEl.textContent)
	if (currentBook) {
		addToCart(currentBook, quantity)
		iziToast.success({
			message: `Added ${quantity} of ${currentBookTitle} to basket!`,
			position: "bottomRight",
			color: "#fff",
		})
	}
})

formEl.addEventListener("submit", event => {
	event.preventDefault()
	iziToast.success({
		message: "Thank you for your purchase!",
		position: "bottomRight",
		color: "#fff",
	})
	hideBookModal()
	document.body.style.overflow = "unset"
})

bookModalEl.addEventListener("click", el => {
	if (el.target === el.currentTarget) {
		hideBookModal()
		document.body.style.overflow = "unset"
	}
})

closeBtn.addEventListener("click", () => {
	hideBookModal()
	document.body.style.overflow = "unset"
})

document.addEventListener("keydown", element => {
	if (element.key === "Escape") {
		hideBookModal()
		document.body.style.overflow = "unset"
	}
})
