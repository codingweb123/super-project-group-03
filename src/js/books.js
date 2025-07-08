import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"
import { refs } from "./refs"
import { getBooksByCategory, getCategoryList, getTopBooks } from "./api"
import { loadBookModal } from "./book-modal"

const { books } = refs

const booksList = books.querySelector(".books-list")
const categoryBtn = books.querySelector(".categories-btn")
const categories = books.querySelector(".categories")

const isMobile = () => {
	return !matchMedia("(hover: hover)").matches
}
const numberToPaginate = () => {
	return isMobile() ? 10 : 24
}
const paginationNum = document.querySelector(".pagination-number")
const moreButton = document.querySelector(".btn.more")
const paginationCount = document.querySelector(".pagination-all")

const showLoadingMore = () => {
	moreButton.classList.remove("visually-hidden")
}
const hideLoadingMore = () => {
	moreButton.classList.add("visually-hidden")
}

const renderBooks = books => {
	booksList.innerHTML = books.reduce(
		(a, { _id, book_image, title, price, author }) =>
			(a += `
    <li>
        <img
            src="${book_image}"
            alt="${title}"
        />
        <h3><b>${title}</b><span class="price">$${price}</span></h3>
        <p class="author">${author}</p>
        <button class="btn" data-bookid="${_id}">Learn More</button>
    </li>`),
		""
	)
}
const renderNewBooks = books => {
	booksList.innerHTML += books.reduce(
		(a, { _id, book_image, title, price, author }) =>
			(a += `
    <li>
        <img
            src="${book_image}"
            alt="${title}"
        />
        <h3><b>${title}</b><span class="price">$${price}</span></h3>
        <p class="author">${author}</p>
        <button class="btn" data-bookid="${_id}">Learn More</button>
    </li>`),
		""
	)
}
const sliceBooksByPage = (books, page = 0) => {
	return books.slice(
		page * (isMobile() ? 10 : 24),
		(page + 1) * (isMobile() ? 10 : 24)
	)
}
const setPaginationNumber = (books, value) => {
	paginationNum.textContent =
		books.length < value ? books.length.toString() : value.toString()
}
const setPaginationCount = value => {
	paginationCount.textContent = value.toString()
}
const renderLoadingBooks = () => {
	booksList.innerHTML = [0, 0, 0].reduce(
		(a, _) =>
			(a += `
    <li>
        <img
            src="noimg.png"
            class="loading"
            alt=""
        />
        <h3><b class="loading">................................................</b><span class="price loading">............</span></h3>
        <p class="author loading">............... ............</p>
        <button class="btn" disabled>Learn More</button>
    </li>`),
		""
	)
}

const renderLoadingTexts = element => {
	for (let i = 0; i < 15; i++) {
		element.innerHTML += `<li class="loading">........................................................................................</li>`
	}
}
const removeRenderLoading = element => {
	element.querySelectorAll(".loading").forEach(i => i.remove())
}

let renderedBooks = []
let page = 0

const renderTopBooks = async () => {
	renderedBooks = []
	page = 0
	hideLoadingMore()
	getTopBooks()
		.then(data => {
			removeRenderLoading(booksList)
			data.forEach(category => renderedBooks.push(...category.books))
			renderBooks(sliceBooksByPage(renderedBooks))
			page += 1
			if (renderedBooks.length > numberToPaginate()) {
				showLoadingMore()
			}
			setPaginationNumber(renderedBooks, numberToPaginate())
			setPaginationCount(renderedBooks.length)
		})
		.catch(() => {
			iziToast.error({
				message: "Error while getting data from all categories!",
			})
		})
}

document.addEventListener("DOMContentLoaded", async () => {
	renderLoadingTexts(categories)
	setTimeout(async () => {
		getCategoryList()
			.then(data => {
				removeRenderLoading(categories)
				categories.innerHTML += data.reduce(
					(acc, { list_name }) => (acc += !list_name ? "" : `<li>${list_name}`),
					""
				)
			})
			.catch(() => {
				iziToast.error({ message: "Error while getting data from categories!" })
			})
		try {
			await renderTopBooks()
			removeRenderLoading(booksList)
		} catch {
			iziToast.error({ message: "Error while getting books data!" })
		}
	}, 1000)
})

categoryBtn.addEventListener("click", () => {
	categories.classList.toggle("active")
})

categories.addEventListener("click", async e => {
	if (
		e.target === e.currentTarget ||
		!e.target ||
		e.target.classList.contains("active")
	) {
		return
	}
	categories
		.querySelectorAll("li.active")
		.forEach(item => item.classList.remove("active"))
	e.target.classList.add("active")
	const category = e.target.textContent
	categoryBtn.textContent = category
	categories.classList.remove("active")
	renderLoadingBooks()
	hideLoadingMore()
	if (e.target.dataset.value === "all") {
		await renderTopBooks()
		removeRenderLoading(booksList)
		return
	}
	renderedBooks = []
	page = 0
	getBooksByCategory(category)
		.then(data => {
			renderedBooks = data
			renderBooks(sliceBooksByPage(data))
			page += 1
			if (data.length > numberToPaginate()) {
				showLoadingMore()
			}
			setPaginationNumber(data, numberToPaginate())
			setPaginationCount(data.length)
		})
		.catch(() => {
			iziToast.error({
				message: "Error while getting data from category!",
			})
		})
		.finally(() => removeRenderLoading(booksList))
})

moreButton.addEventListener("click", e => {
	e.preventDefault()
	moreButton.disabled = true
	const maxPage = Math.ceil(renderedBooks.length / numberToPaginate())
	if (page < maxPage) {
		if (page + 1 >= maxPage) {
			hideLoadingMore()
			iziToast.success({
				position: "bottomRight",
				message: "This is the last page of books for you :)",
				color: "#fff",
			})
		}
		setPaginationNumber(renderedBooks, (page + 1) * numberToPaginate())
		renderNewBooks(sliceBooksByPage(renderedBooks, page))
		page += 1
		moreButton.disabled = false
	} else {
		iziToast.error({
			message: "You already loaded all books from that category!",
		})
	}
})

booksList.addEventListener("click", async e => {
	if (e.target.nodeName != "BUTTON" || e.target.classList != "btn") {
		return
	}
	await loadBookModal(e.target.dataset.bookid)
})
