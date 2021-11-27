const orderId = Date.now()
const storage = localStorage.getItem('cart');
const cartItems = JSON.parse(storage);
const main = document.querySelector('main');
const cardTitle = document.createElement('h2', 'mx-auto');

cardTitle.textContent = 'Your Cart';
main.classList.add('m-3');
cart.appendChild(cardTitle);

const product = [];

const cartArray = JSON.parse(localStorage.getItem('cart'));
          for (let i = 0; i < cartArray.length; i++) {
            product.push(cartArray[i].id);
          };

function displayCart() {
    const storage = localStorage.getItem('cart');
    const cartItems = JSON.parse(storage);
    if (cartItems) {
      for (let i =0; i < cartItems.length; i++) {
  
        const cart = document.getElementById('cart');
        const cartItem = document.createElement('li');
  
        cartItem.classList.add('cart-row', 'list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');
        cartItem.style.height = '75px';
  
        const item = document.createElement('div');
        item.classList.add('w-50');
        item.innerHTML = '<p class="my-0">' + cartItems[i].name + '</p> <small class="text-muted">' + cartItems[i].selectColors + '</small>';
  
        const cost = document.createElement('div');
        cost.classList.add('w-25');
        cost.style.marginTop = '12px';
        cost.innerHTML = '<p class="cart-price text-muted">' + '$' + cartItems[i].price / 100 + '</p>';
        
        const removeButton = document.createElement('button');
        removeButton.setAttribute('type', 'button');
        removeButton.classList.add('btn', 'btn-danger', 'my-2', 'py-1', 'px-2', 'remove');
        removeButton.setAttribute('aria-label', 'Remove');
        removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        
        removeButton.onclick = function removeItem() {
          const cartItems = JSON.parse(localStorage.getItem('cart'));
          cartItems.splice(i, 1);
          localStorage.setItem('cart', JSON.stringify(cartItems));
          //rerender page
          location.reload();
        }
  
        cart.appendChild(cartItem);
        cartItem.appendChild(item);
        cartItem.appendChild(cost);
        cartItem.appendChild(removeButton);
      }
    }
};

  displayCart();

//calculate total cost
function updateCartTotal() {
  const total = document.getElementById('total-cost');
  let totalCost = 0
    for (let i = 0; i < cartItems.length; i++) {
        totalCost += cartItems[i].price / 100;
    };
    //return totalCost
    total.innerHTML = '$' + totalCost;
    sessionStorage.setItem('price', totalCost);
};

updateCartTotal();

  // Validation Form
const form = document.createElement('form');
form.classList.add('row', 'g-3', 'needs-validation');
form.setAttribute('novalidate', '');
form.innerHTML = '<div class="col-md-5"><label for="firstName" class="form-label">First Name</label><input type="text" class="form-control" id="firstName" placeholder="John" value="" pattern="[A-Za-z]{1,32}" required><div class="valid-feedback">Checked!</div></div><div class="col-md-5"><label for="lastName" class="form-label">Last Name</label><input type="text" class="form-control" id="lastName" placeholder="Doe" value="" pattern="[A-Za-z]{1,32}" required><div class="valid-feedback">Checked!</div></div><div class="col-12"><label for="email" class="form-label">Email</label><input type="email" class="form-control" id="email" placeholder="you@example.com" value="" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required><div class="invalid-feedback">Please enter a valid email address for shipping updates.</div></div><div class="col-12"><label for="address" class="form-label">Address</label><input type="text" class="form-control" id="address" placeholder="1234 Main St" pattern="^[#.0-9 a-zA-Z\s,-]+$" required><div class="invalid-feedback">Please enter your shipping address.</div></div><div class="col-md-4s col-lg-4 mt-2"><div><label for="city" class="form-label">City</label></div><div><select class="form-control form-select form-select p-2 w-100" id="city" style="border-radius: 4px;border-color:silver;" aria-label="city" required><option value="">Choose...</option><option value="PHL">Philadelphia</option><option value="PAR">Paris</option><option value="BRS">Bristol</option></select></div><div class="invalid-feedback">Please provide a valid city.</div></div>'

const submitForm = document.createElement('button');
submitForm.classList.add('btn', 'btn-secondary', 'p-3');
submitForm.setAttribute('type', 'submit');
submitForm.setAttribute('value', 'submit');
submitForm.textContent = 'Submit';
form.appendChild(submitForm);
main.appendChild(form);

  form.addEventListener('submit', function (event) {
      event.preventDefault()
      if (form.checkValidity()) {
        location.replace('../frontEnd/confirmation.html');
      }
      
  });

const contact = {
  firstName: firstName.value,
  lastName: lastName.value,
  city: city.value
};
const data = {
  contact: contact,
  product: product
};

sessionStorage.setItem('firstName', contact.firstName);
sessionStorage.setItem("orderId", orderId);

// Disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
})();

function makeRequest(data) {
  fetch('http://localhost:3000/api/teddies/order', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((response) => {
    return response.json();
  }).then((data) => {

    console.log(orderId);
    location.replace('../frontEnd/confirmation.html');

  }).catch((err) => {
    console.log(err);
  })
};