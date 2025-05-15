let cards = document.getElementById('cards')
let API = '../data/data.json'
let input = document.getElementById('inputfield')

let modalBg = document.getElementById('user-modal-bg')
let openCloseModal = document.getElementById('navbar-user-icon')

openCloseModal.addEventListener('click', () => {
	modalBg.classList.toggle('unhidden')
})

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
			let { img, name, price, time, comments, likes, type, sort } = item

			cards.innerHTML += `
			<div class="card">
                        <img class="cards-img" src=${img}>
                        <div class="card-content">
                            <div class="name">
                                <h5 class="food__name">${name}</h5>
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
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                </div>
																<div class="category">
																<i class="fa-solid fa-list"><span> ${sort}</span></i>
																
																</div>
                            </div>
                        </div>
                    </div>
			`
		})
	})
	.catch(err => {
		console.log(err)
	})

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

let shopModal = document.getElementById('shop-modal')
let closeShopModal = document.getElementById('x-click')
let openShopModal = document.getElementById("shop")

openShopModal.addEventListener("click",()=>{
	shopModal.style.display = "flex"
})

closeShopModal.addEventListener("click",()=>{
	shopModal.style.display = "none"
})