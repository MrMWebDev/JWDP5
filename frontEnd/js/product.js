const api = 'http://localhost:3000/api/teddies/'
// API request function
makeRequest = () => {
  return new Promise((resolve, reject) => {
    //   id is retrieved from the querystring searchparam
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get('id')

    const apiRequest = new XMLHttpRequest()
    apiRequest.open('GET', api + id)
    apiRequest.send()
    apiRequest.onreadystatechange = () => {
      if (apiRequest.readyState === 4) {
        if (apiRequest.status === 200) {
          // if ready state and status return success codes resolve promise with response.
          resolve(JSON.parse(apiRequest.response))
        } else {
          // if unsuccessfull reject with arror message.
          reject('Something Went Wrong - API Request Failed!!!')
        }
      }
    }
  })
}

function addNumCart() {
  const storage = localStorage.getItem('cart')
  if (storage) {
    let cartItemsArray = JSON.parse(storage)
    let cartNum = document.querySelector('.cartNum')
    cartNum.innerHTML = cartItemsArray.length
  }
}

addNumCart()

// create card funtion
createCard = response => {
  const main = document.querySelector('main')
  const card = document.createElement('Article')
  const img = response.imageUrl
  const newImg = document.createElement('IMG')
  const btn = document.createElement('button')
  const addedToCartAlert = document.createElement('div')
  const form = document.createElement('form')
  const dropMenuLabel = document.createElement('label')
  const dropMenu = document.createElement('select')
  const newP = document.createElement('p')
  main.appendChild(card)
  //setup product img
  newImg.classList.add('img')
  newImg.setAttribute('width', '100%')
  newImg.setAttribute('src', img)
  card.appendChild(newImg)
  // setup card
  card.classList.add('col-5', 'card', 'p-5', 'item', 'mx-auto', 'my-4')
  card.innerHTML += '<h2>' + response.name + '</h2>'
  card.innerHTML += '<p>' + '$ ' + response.price / 100 + '</p>'
  card.appendChild(form)
  card.appendChild(btn)
  card.appendChild(addedToCartAlert)
  // setup the dropdown menu
  dropMenuLabel.innerHTML = 'Choose Color &nbsp;&nbsp;&nbsp;'
  form.appendChild(dropMenuLabel)
  form.appendChild(dropMenu)

  for (let x in response.colors) {
    const option = document.createElement('option')
    option.innerHTML = response.colors[x]
    option.setAttribute('value', response.colors[x])
    dropMenu.appendChild(option)
  }
  // setup button
  btn.classList.add('btn', 'btn-secondary', 'mt-3')
  btn.setAttribute('type', 'submit')
  btn.textContent = 'Add To Cart'

  btn.addEventListener('click', () => {
    let cartItems = []
    const storage = localStorage.getItem('cart')
    if (storage === null) {
      for (let i = 0; i < cartItems.length; i++) {
        cartItems = [i]
      }
      // cartItems = [];
    } else {
      cartItems = JSON.parse(storage)
    }

    let products = {
      imageUrl: response.imageUrl,
      name: response.name,
      id: response._id,
      price: response.price,
      selectColors: dropMenu.value,
      quantity: 0
    }
    // cartItems.push(products)
    // if the product is not in the cart add it
    if (cartItems.length == 0) {
      cartItems.push(products)
    } else {
      // if the product with same id and lens is already in the cart then add old quantity and new quantity
      let index = cartItems.findIndex(element => element.id === products.id && element.selectColors === products.selectColors)
      if (index != -1) {
        cartItems[index].quantity += products.quantity
      } else {
        cartItems.push(products)
      }
    }
    localStorage.setItem('cart', JSON.stringify(cartItems))
    addNumCart()
  })

    //add alert for order submission
    btn.onclick = function() {
      addedToCartAlert.classList.add('alert', 'alert-success', 'mt-4')
      addedToCartAlert.setAttribute('role', 'alert')
      addedToCartAlert.textContent = response.name + ' ' + 'with' + ' ' + dropMenu.value + ' ' + 'color' + ' ' + 'added to cart'
    }
}

init = async () => {
  try {
    // call makeRequest for api request and await response
    const requestPromise = makeRequest()
    const response = await requestPromise
    // pass response to creatCard function to display results
    createCard(response)
  } catch (error) {
    // error message dispalyed if request fails
    document.querySelector('main').innerHTML = '<h2 class = "mx-auto">' + error + '</h2>'
  }
}

init()
