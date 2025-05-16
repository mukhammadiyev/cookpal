let cards = document.getElementById('cards')
let API = '../data/data.json'
let input = document.getElementById('inputfield')
let productInfoModalBg = document.getElementById('product-info-modal-backdrop')
let closeProductInfo = document.getElementById('close-product-info')
let productInfoModal = document.querySelector('.product-info-modal')
let shopModal = document.getElementById('shop-modal')
let closeShopModal = document.getElementById('x-click')
let openShopModal = document.getElementById('shop')
let modalBg = document.getElementById('user-modal-bg')
let openCloseModal = document.getElementById('navbar-user-icon')

openCloseModal.addEventListener('click', () => {
	modalBg.classList.toggle('unhidden')
})

// cards from server start

function getData(resource) {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest()

		request.addEventListener('readystatechange', () => {
			if (request.readyState === 4 && request.status === 200) {
				let data = JSON.parse(request.responseText)
				resolve(data.results)
			} else if (request.readyState === 4) {
				reject("ma'lumot topilmadi")
			}
		})

		request.open('GET', resource)
		request.send()
	})
}
// TODO
getData(API)
	.then(data => {
		data.forEach(item => {
			let { img, name, price, time, comments, likes, type, sort, stars } = item

			cards.innerHTML += `
			<div class="card">
                        <img id="opninfo" class="cards-img" src=${img}>
                        <div class="card-content">
                            <div class="name">
                                <h5 id="name-of-food" class="food__name">${name}</h5>
                                <p class="price">$ ${price}</p>
                            </div>
                            <div class="more">
                                <div>
                                    <p><i class="fa-regular fa-clock"></i> ${time} minutes</p>
                                    <p>${type}</p>
                                </div>
                                <div class="like-cmmt">
                                    <div class="comment">
                                        <p><i class="fa-solid fa-comment-dots"></i> ${comments}</p>
                                        <p><i class="fa-solid fa-thumbs-up"></i> ${likes}</p>
                                    </div>
                                    <div class="stars">
                                        ${stars}
                                    </div>
                                </div>
																<div class="category">
																<i class="fa-solid fa-list"><span> ${sort}</span></i>
																
																</div>
                            </div>
                        </div>
                    </div>
			`
			document.addEventListener('click', e => {
				e.preventDefault()

				if (e.target.classList[0] === 'cards-img') {
					productInfoModalBg.style.display = 'block'
					productInfoModal.innerHTML = `
					<div class="close">x</div>
						<img src=${e.target.src}>
						<div class="product-full-info">
											<h1>${name}</h1>
											<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima tempora perferendis magnam explicabo
													quod quia nihil eum impedit modi amet ducimus est ad ex, maiores consequatur, fugit sed atque.
													Eveniet quas optio, id ut deleniti atque inventore magni numquam sapiente necessitatibus quam!
													Dolores beatae tempora, at maiores cupiditate sequi quidem!</p>
											<div class="stars">
													<h2>Product Rate :
															<span>⭐⭐⭐⭐⭐</span>
													</h2>
													<h2 class="product-type">
															Product type : <span>Bakery</span>
													</h2>
													<h2>Cooking time : 
															<span><i class="fa-regular fa-clock"></i> 40 mins</span> 
													</h2>
													<h2>Product Price : <span>$ 123</span></h2>
													<h2>Comments : <span><i class="fa-solid fa-comments"></i> 80</span></h2>
													<h2>Likes :  <span><i class="fa-solid fa-thumbs-up"></i> 50</span></h2>
											</div>
									</div>
						`
				}
			})
		})
	})
	.catch(err => {
		console.log(err)
	})

// cards from server end
// find by name start

input.addEventListener('input', () => {
	const inputValue = input.value.toLowerCase()
	const name = document.querySelectorAll('.food__name')
	name.forEach(item => {
		if (item.textContent.toLowerCase().includes(inputValue)) {
			item.parentElement.parentElement.parentElement.classList.remove('hidden')
		} else {
			item.parentElement.parentElement.parentElement.classList.add('hidden')
		}
	})
})

// find by name end
// shop modal start

openShopModal.addEventListener('click', () => {
	shopModal.style.display = 'flex'
})

closeShopModal.addEventListener('click', () => {
	shopModal.style.display = 'none'
})

// shop modal end

document.addEventListener('keyup', e => {
	if (e.key == 'Escape') {
		productInfoModalBg.style.display = 'none'
		shopModal.style.display = "none"
	}
})

document.addEventListener('click', e => {
	e.preventDefault()

	if (e.target === productInfoModalBg) {
		productInfoModalBg.style.display = 'none'
	}else if(e.target === shopModal){
		shopModal.style.display = "none"
	}
})

document.addEventListener('click', e => {
	e.preventDefault()
	if (e.target.classList[0] === 'close') {
		productInfoModalBg.style.display = 'none'
	}
})
