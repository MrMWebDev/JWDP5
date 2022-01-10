<<<<<<< HEAD
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
=======
makeRequest = () => {
  return new Promise((resolve, reject) => {
      const qureyString = window.location.search;
      const urlParam = new URLSearchParams(qureyString);
      const id = urlParam.get('id');

      let apiRequest = new XMLHttpRequest();
      //id is used to build the unique url for the single product page
      apiRequest.open('GET', 'http://localhost:3000/api/teddies/' + id);
      apiRequest.send();
      apiRequest.onreadystatechange = () => {
          if (apiRequest.readyState === 4) {
              if (apiRequest.status === 200) {
                  //if ready state and status return success codes, resolve promise with response
                  resolve(JSON.parse(apiRequest.response));
              } else {
                  //if unsuccessful, reject with error message
                  reject('API Request Failed!');
              }
          }
      }
  });
>>>>>>> 47fd9057ac3aa1bc129417296e2eb7667e8ffaeb
}

//update cart number total
function addNumCart() {
<<<<<<< HEAD
  const storage = localStorage.getItem('cart')
  if (storage) {
    let cartItemsArray = JSON.parse(storage)
    let cartNum = document.querySelector('.cartNum')
    cartNum.innerHTML = cartItemsArray.length
=======
  const localStorageContent = localStorage.getItem('cart');
  if (localStorageContent) {
      let cartItemsArray = JSON.parse(localStorageContent);
      let cartNum = document.querySelector('.nav-link span');
      cartNum.innerHTML = cartItemsArray.length;
  }
>>>>>>> 47fd9057ac3aa1bc129417296e2eb7667e8ffaeb
  }
}

<<<<<<< HEAD
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
=======
addNumCart();
/////

//single product data
createCard = (response) => {
  const main = document.querySelector('main');
  main.classList.add('card', 'p-3');
  //SINGLE PAGE PRODUCT IMAGE
  const productImg = document.createElement('div');
  productImg.setAttribute('id', 'productImg');
  // const productImg = document.getElementById('productImg');
  //create elements for cards
  const imgCard = document.createElement('div');
  const img = response.imageUrl;

  //add bootstrap classes and attributes
  productImg.classList.add('col-md-5');

  //item image
  imgCard.innerHTML += '<img src="' + img + '" alt="" class="img-fluid">';

  //add completed elements to the card
  productImg.appendChild(imgCard);

  //SINGLE PAGE PRODUCT INFO
  const productCard = document.createElement('div');
  productCard.setAttribute('id', 'productCard');
  // const productCard = document.getElementById('productCard');
  //create elements for cards
  const productDescription = document.createElement('div');
  const title = response.name;
  const description = response.description;
  const price = response.price;

  //add bootstrap classes and attributes
  productCard.classList.add('col-md-6');
  productDescription.classList.add('mt-4', 'mt-md-0', 'shop-item-details');

  //item description
  productDescription.innerHTML += '<h2 class="display-5 m-0 shop-item-title">' + title + '</h2>';
  productDescription.innerHTML += '<p>' + description + '</p>';
  productDescription.innerHTML += '<h3 class="lead shop-item-price">' + '$' + price/100 + '</p>';

  //DROPDOWN MENU
  const dropdownMenu = document.createElement('form');
  const dropdownLabel = document.createElement('label');
  const dropdownOptions = document.createElement('select');

  //add bootstrap classes and attributes
  dropdownMenu.classList.add('my-4');
  dropdownOptions.classList.add('btn', 'btn-secondary', 'dropdown-toggle', 'w-auto');

  dropdownLabel.innerHTML = 'Choose your color&#58; &nbsp;';

  //loop to get all colors and display
  for (let i in response.colors) {
      const option = document.createElement('option');
      option.innerHTML = response.colors[i];
      option.setAttribute('value', response.colors[i]);
      dropdownOptions.appendChild(option);
  }

  //append
  dropdownMenu.appendChild(dropdownLabel);
  dropdownMenu.appendChild(dropdownOptions);

  //ADD TO CART BTN
  const addToCart = document.createElement('button');
  const addedToCartAlert = document.createElement('div');

  //add bootstrap classes and attributes
  addToCart.setAttribute('type', 'submit');
  addToCart.classList.add('btn', 'btn-primary', 'add-to-cart');
  addToCart.textContent = 'ADD TO CART';

  //add to local storage
  addToCart.addEventListener('click', () => {
      let cartItems = [];
      const localStorageContent = localStorage.getItem('cart');
      if (localStorageContent === null) {
        cartItems = [];
      } else {
        cartItems = JSON.parse(localStorageContent);
      }
  let product = {
>>>>>>> 47fd9057ac3aa1bc129417296e2eb7667e8ffaeb
      imageUrl: response.imageUrl,
      name: response.name,
      id: response._id,
      price: response.price,
<<<<<<< HEAD
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
=======
      selectColors: dropdownOptions.value,
      quantity: 1
  };
  cartItems.push(product);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  
  addNumCart();
});
    
  //add alert for order submission
  addToCart.onclick = function () {  
      addedToCartAlert.classList.add('alert', 'alert-success', 'mt-4');
      addedToCartAlert.setAttribute('role', 'alert');
      addedToCartAlert.textContent = response.name + ' ' + 'with' + ' ' + dropdownOptions.value + ' ' + 'color' + ' ' + 'added to cart';
  }

  //add completed elements to the card
  main.appendChild(productImg);
  main.appendChild(productCard);
  
  productCard.appendChild(productDescription);
  productCard.appendChild(dropdownMenu);
  productCard.appendChild(addToCart);
  productCard.appendChild(addedToCartAlert);
};
>>>>>>> 47fd9057ac3aa1bc129417296e2eb7667e8ffaeb

init = async() => {
  try {
<<<<<<< HEAD
    // call makeRequest for api request and await response
    const requestPromise = makeRequest()
    const response = await requestPromise
    // pass response to creatCard function to display results
    createCard(response)
  } catch (error) {
    // error message dispalyed if request fails
    document.querySelector('main').innerHTML = '<h2 class = "mx-auto">' + error + '</h2>'
=======
      //call makeRequest for api request and "await" response
      const requestPromise = makeRequest();
      const response = await requestPromise;
      //pass response to createCard fuction to display results
      createCard(response);
  } catch (error) {
      //error message displayed if request fails
      document.querySelector('main').innerHTML = '<h2 class = "mx-auto">' + error + '</h2>';
>>>>>>> 47fd9057ac3aa1bc129417296e2eb7667e8ffaeb
  }
}

init()
