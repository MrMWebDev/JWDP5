<<<<<<< HEAD
const api = 'http://localhost:3000/api/teddies/'

// API request function
makeRequest = () => {
  return new Promise((resolve, reject) => {
    let apiRequest = new XMLHttpRequest()
    apiRequest.open('GET', api)
    apiRequest.send()
    apiRequest.onreadystatechange = () => {
      if (apiRequest.readyState === 4) {
        if (apiRequest.status === 200) {
          // if ready state and status return success codes resolve promise with response.
          resolve(JSON.parse(apiRequest.response))
        } else {
          // if unsuccessfull reject with arror message.
          reject('Server is down!!!')
        }
      }
    }
  })
}

// Update cart number function
function addNumCart() {
  const storage = localStorage.getItem('cart')
  if (storage) {
    let cartItemsArray = JSON.parse(storage)
    let cartNum = document.querySelector('.cartNum')
    cartNum.innerHTML = cartItemsArray.length
  }
}

addNumCart()

// Create card function
createCard = response => {
  const main = document.querySelector('main')
  for (let i in response) {
    // create elements for the card
    const card = document.createElement('article')
    const img = response[i].imageUrl
    const newImg = document.createElement('IMG')
    const newA = document.createElement('a')

    // add the bootstrap classes and attributes
    card.classList.add('col-sm-5', 'col-sm-1', 'card', 'p-3', 'm-3')
    newA.classList.add('btn', 'btn-secondary')
    newImg.classList.add('img-fluid')
    // id is passed in a querystring
    newA.setAttribute('href', 'product.html?id=' + response[i]._id)
    newA.textContent = 'View More Details'
    newImg.setAttribute('width', '100%')
    newImg.setAttribute('src', img)

    // items description added
    card.innerHTML += '<h2>' + response[i].name + '</h2>'
    card.innerHTML += '<p>' + response[i].description + '</p>'
    card.innerHTML += '<p>' + '$ ' + response[i].price / 100 + '</p>'

    // append the completed elements to the card
    card.appendChild(newImg)
    card.appendChild(newA)
    main.appendChild(card)
=======
//function to make api request
makeRequest = () => {
  return new Promise((resolve, reject) => {
      let apiRequest = new XMLHttpRequest();
      apiRequest.open('GET', 'http://localhost:3000/api/teddies/');
      apiRequest.send();
      apiRequest.onreadystatechange = () => {
          if (apiRequest.readyState === 4) {
              if (apiRequest.status === 200) {
                  //if ready state and status return success codes, resolve promise with response
                  resolve(JSON.parse(apiRequest.response));
              } else {
                  //if unsuccessful, reject with error message
                  reject('Server is down!');
              }
          }
      }
  });
}

//function to create cards
createCard = (response) => {
  const main = document.querySelector('main');
  for (let i in response) {
      //create elements for cards
      const card = document.createElement('article');
      const productCard = document.createElement('div');
      //const newA = document.createElement('a');

      //add bootstrap classes and attributes
      card.classList.add('col-12', 'col-md-6', 'col-lg-4');
      productCard.classList.add('card', 'shadow', 'm-4', 'p-0');

      //item image, description, and link through clickable button
      productCard.innerHTML += '<img src="' + response[i].imageUrl + '" alt="" class="card-img-top img-fluid" style="min-height:200px;width:auto;overflow:hidden;">';
      productCard.innerHTML += '<div class="card-body"> <h2 class="card-title">' + response[i].name + '</h2> <p class="card-text">' + response[i].description + '</p> <p class="card-text">' + '$' + response[i].price / 100 + '</p> </div>';
      productCard.innerHTML += '<a href="/frontEnd/product.html?id=' + response[i]._id + '" class="btn btn-primary m-3 w-50"> More Details </a>';

      //add completed elements to the card
      card.appendChild(productCard);
      main.appendChild(card);
>>>>>>> 47fd9057ac3aa1bc129417296e2eb7667e8ffaeb
  }
}

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
  }
}

init()
=======
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

function addNumCart() {
  const localStorageContent = localStorage.getItem('cart');
  if (localStorageContent) {
    let cartItemsArray = JSON.parse(localStorageContent);
    let cartNum = document.querySelector('.nav-link span');
    cartNum.innerHTML = cartItemsArray.length;
  }
}

addNumCart();
>>>>>>> 47fd9057ac3aa1bc129417296e2eb7667e8ffaeb
