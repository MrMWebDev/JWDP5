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
  }
}

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

function addNumCart() {
  const localStorageContent = localStorage.getItem('cart');
  if (localStorageContent) {
    let cartItemsArray = JSON.parse(localStorageContent);
    let cartNum = document.querySelector('.nav-link span');
    cartNum.innerHTML = cartItemsArray.length;
  }
}

addNumCart();