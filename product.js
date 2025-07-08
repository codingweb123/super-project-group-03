import"./assets/styles-Bm2e_loD.js";import{i as b}from"./assets/vendor-BacCqqnA.js";const u="product",d=document.querySelector(".js-list"),y=document.querySelector(".js-total-price"),h=document.querySelector(".buy-product-btn"),f=document.querySelector(".clear-cart-btn"),i=JSON.parse(localStorage.getItem(u))||[];d.insertAdjacentHTML("beforeend",p(i));l(i);d.addEventListener("click",r=>{const e=r.target,n=e.closest(".product-card"),c=n.querySelector(".quantity-input");let t=parseInt(c.value);e.classList.contains("increase-btn")&&(t+=1),e.classList.contains("decrease-btn")&&(t>1?t-=1:t=1);const s=n.dataset.id;if(e.classList.contains("remove-card-btn")){const a=i.filter(m=>m._id!==s);return localStorage.setItem(u,JSON.stringify(a)),d.innerHTML=p(a),l(a)}const o=i.find(a=>a._id===s);o&&(c.value=t,o.quantity=t,localStorage.setItem(u,JSON.stringify(i)),l(i))});function l(r){let e;const n=document.querySelector(".total-price-container"),c=document.querySelector(".product-cart-title");r.length&&(c.classList.add("hidden"),n.classList.remove("hidden"),e=Math.ceil(r.reduce((t,{price:s,quantity:o})=>t+=s*o,0)),y.textContent=`Total price: ${e}$`)}h.addEventListener("click",()=>{b.success({title:"Book Shop",message:"Thank you for your purchase!",position:"bottomRight",color:"#fff"}),localStorage.removeItem(u),setTimeout(()=>{location.href="index.html"},1500)});f.addEventListener("click",()=>{localStorage.removeItem(u),location.href="index.html"});function p(r){return r.map(({_id:e,book_image:n,title:c,author:t,price:s,quantity:o})=>`
    <li class="product-list-item">
              <div class="product-card" data-id="${e}">
                <button class="remove-card-btn" type="button">
                  <svg class="remove-card-icon" width="24" height="24">
                    <use href="../img/sprite.svg#icon-close"></use>
                  </svg>
                </button>
                <img
                  class="product-card-image"
                  src="${n}"
                  alt="${c}"
                  width="339"
                  height="512"
                />
                <div class="product-card-info">
                  <h3 class="product-title">${c}</h3>
                  <p class="product-author">${t}</p>
                  <p class="product-price">${Math.ceil(s*o)}$</p>
                  <div class="product-quantity-container">
                    <button class="decrease-btn quantity-btn" type="button">
                      -
                    </button>
                    <input class="quantity-input" type="number" min="1" value="${o}" disabled />
                    <button class="increase-btn quantity-btn" type="button">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </li>
            `).join("")}
//# sourceMappingURL=product.js.map
