import iziToast from "izitoast"
import "izitoast/dist/css/iziToast.min.css"

const LS_KEY = "product"

const booksContainer = document.querySelector(".js-list")
const totalPrice = document.querySelector(".js-total-price")
const buyBtn = document.querySelector(".buy-product-btn")
const clearCart = document.querySelector(".clear-cart-btn")

const products = JSON.parse(localStorage.getItem(LS_KEY)) || []

booksContainer.insertAdjacentHTML("beforeend", createMarkup(products))
renderPrice(products)

booksContainer.addEventListener("click", element => {
	const cardBtn = element.target
	const productCard = cardBtn.closest(".product-card")
	const productQuantity = productCard.querySelector(".quantity-input")

	let currentQuantity = parseInt(productQuantity.value)

	if (cardBtn.classList.contains("increase-btn")) {
		currentQuantity += 1
	}

	if (cardBtn.classList.contains("decrease-btn")) {
		if (currentQuantity > 1) {
			currentQuantity -= 1
		} else {
			currentQuantity = 1
		}
	}

	const productId = productCard.dataset.id

	if (cardBtn.classList.contains("remove-card-btn")) {
		const newProducts = products.filter(product => product._id !== productId)
		localStorage.setItem(LS_KEY, JSON.stringify(newProducts))
		booksContainer.innerHTML = createMarkup(newProducts)
		return renderPrice(newProducts)
	}

	const product = products.find(product => product._id === productId)

	if (product) {
		productQuantity.value = currentQuantity
		product.quantity = currentQuantity
		localStorage.setItem(LS_KEY, JSON.stringify(products))
		renderPrice(products)
	}
})

function renderPrice(arr) {
	let allProductsPrice
	const priceBox = document.querySelector(".total-price-container")
	const cartTitle = document.querySelector(".product-cart-title")

	if (arr.length) {
		cartTitle.classList.add("hidden")
		priceBox.classList.remove("hidden")
		allProductsPrice = Math.ceil(
			arr.reduce((acc, { price, quantity }) => (acc += price * quantity), 0)
		)
		totalPrice.textContent = `Total price: ${allProductsPrice}$`
	}
}

buyBtn.addEventListener("click", () => {
	iziToast.success({
		title: "Book Shop",
		message: "Thank you for your purchase!",
		position: "bottomRight",
		color: "#fff",
	})
	localStorage.removeItem(LS_KEY)
	setTimeout(() => {
		location.href = "index.html"
	}, 1500)
})

clearCart.addEventListener("click", () => {
	localStorage.removeItem(LS_KEY)
	location.href = "index.html"
	return
})

function createMarkup(arr) {
	return arr
		.map(
			({ _id, book_image, title, author, price, quantity }) => `
    <li class="product-list-item">
              <div class="product-card" data-id="${_id}">
                <button class="remove-card-btn" type="button">
                  <svg class="remove-card-icon" width="24" height="24">
                    <use href="../img/sprite.svg#icon-close"></use>
                  </svg>
                </button>
                <img
                  class="product-card-image"
                  src="${book_image}"
                  alt="${title}"
                  width="339"
                  height="512"
                />
                <div class="product-card-info">
                  <h3 class="product-title">${title}</h3>
                  <p class="product-author">${author}</p>
                  <p class="product-price">${Math.ceil(price * quantity)}$</p>
                  <div class="product-quantity-container">
                    <button class="decrease-btn quantity-btn" type="button">
                      -
                    </button>
                    <input class="quantity-input" type="number" min="1" value="${quantity}" disabled />
                    <button class="increase-btn quantity-btn" type="button">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </li>
            `
		)
		.join("")
}
