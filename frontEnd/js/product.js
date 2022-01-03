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
}

//update cart number total
function addNumCart() {
  const localStorageContent = localStorage.getItem('cart');
  if (localStorageContent) {
      let cartItemsArray = JSON.parse(localStorageContent);
      let cartNum = document.querySelector('.nav-link span');
      cartNum.innerHTML = cartItemsArray.length;
  }
  }

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
      imageUrl: response.imageUrl,
      name: response.name,
      id: response._id,
      price: response.price,
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

init = async() => {
  try {
      //call makeRequest for api request and "await" response
      const requestPromise = makeRequest();
      const response = await requestPromise;
      //pass response to createCard fuction to display results
      createCard(response);
  } catch (error) {
      //error message displayed if request fails
      document.querySelector('main').innerHTML = '<h2 class = "mx-auto">' + error + '</h2>';
  }
}

init();