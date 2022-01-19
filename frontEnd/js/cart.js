let orderId
let storage = localStorage.getItem('cart')
let cartItems = JSON.parse(storage)
let main = document.querySelector('main')
let cardTitle = document.createElement('h2', 'mx-auto')

cardTitle.textContent = 'Your Cart'
main.classList.add('m-3')
cart.appendChild(cardTitle)

// Validation Form
let form = document.createElement('form')
form.classList.add('row', 'g-3', 'needs-validation')
form.setAttribute('novalidate', '')
form.innerHTML =
  '<div class="col-md-5"><label for="firstName" class="form-label">First Name</label><input type="text" class="form-control" id="firstName" placeholder="John" value="" pattern="[A-Za-z]{1,32}" required><div class="valid-feedback">Checked!</div></div><div class="col-md-5"><label for="lastName" class="form-label">Last Name</label><input type="text" class="form-control" id="lastName" placeholder="Doe" value="" pattern="[A-Za-z]{1,32}" required><div class="valid-feedback">Checked!</div></div><div class="col-12"><label for="email" class="form-label">Email</label><input type="email" class="form-control" id="email" placeholder="you@example.com" value="" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$" required><div class="invalid-feedback">Please enter a valid email address for shipping updates.</div></div><div class="col-12"><label for="address" class="form-label">Address</label><input type="text" class="form-control" id="address" placeholder="1234 Main St" pattern="^[#.0-9 a-zA-Zs,-]+$" required><div class="invalid-feedback">Please enter your shipping address.</div></div><div class="col-md-4s col-lg-4 mt-2"><div><label for="city" class="form-label">City</label></div><div><select class="form-control form-select form-select p-2 w-100" id="city" style="border-radius: 4px;border-color:silver;" aria-label="city" required><option value="">Choose...</option><option value="PHL">Philadelphia</option><option value="PAR">Paris</option><option value="BRS">Bristol</option></select></div><div class="invalid-feedback">Please provide a valid city.</div></div>'

let submitForm = document.createElement('button')
submitForm.classList.add('btn', 'btn-secondary', 'p-3')
submitForm.setAttribute('type', 'submit')
submitForm.setAttribute('value', 'submit')
submitForm.textContent = 'Submit'
form.appendChild(submitForm)
main.appendChild(form)

// Disabling form submissions if there are invalid fields
;(function() {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  let forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function(form) {
    form.addEventListener(
      'submit',
      function(event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          event.preventDefault()
          event.stopPropagation()
          console.log('true')

          let products = []

          let cartArray = JSON.parse(localStorage.getItem('cart'))
          for (let i = 0; i < cartArray.length; i++) {
            products.push(cartArray[i].id)
          }

          let contact = { firstName: firstName.value, lastName: lastName.value, email: email.value, address: address.value, city: city.value }
          let data = { contact: contact, products: products }

          makeRequest(data)

          sessionStorage.setItem('firstName', contact.firstName)
        }
        form.classList.add('was-validated')
      },
      false
    )
    

  })
})()

// Fuction to display cart
function displayCart() {
  let storage = localStorage.getItem('cart')
  let cartItems = JSON.parse(storage)
  if (cartItems) {
    for (let i = 0; i < cartItems.length; i++) {
      let cart = document.getElementById('cart')

      let cartItem = document.createElement('li')
      cartItem.classList.add('cart-row', 'list-group-item', 'd-flex', 'justify-content-between', 'lh-sm')
      cartItem.style.height = '75px'

      let item = document.createElement('div')
      item.classList.add('w-50')
      item.innerHTML = '<p class="my-0">' + cartItems[i].name + '</p> <small class="text-muted">' + cartItems[i].selectColors + '</small>'

      let cartItemQty = document.createElement('div')
      cartItemQty.classList.add('w-5', 'mt-3')
      cartItemQty.innerHTML = '<input class="qtyInput" type="number" value="1" min="1">'

      let qtyInput = document.getElementsByClassName('qtyInput')
      for (let i = 0; i < qtyInput.length; i++) {
        let input = qtyInput[i]
        input.addEventListener('change', qtyChanged)
      }

      function qtyChanged(event) {
        let input = event.target
        if (isNaN(input.value) || input.value <= 0) {
          input.value = 1
        }
        updateCartTotal()
      }

      let cost = document.createElement('div')
      cost.classList.add('w-20')
      cost.style.marginTop = '12px'
      cost.innerHTML = '<p class="cart-price text-muted">' + '$' + cartItems[i].price / 100 + '</p>'

      let removeButton = document.createElement('button')
      removeButton.setAttribute('type', 'button')
      removeButton.classList.add('btn', 'btn-danger', 'my-2', 'py-1', 'px-2', 'remove')
      removeButton.setAttribute('aria-label', 'Remove')
      removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>'

      removeButton.onclick = function removeItem() {
        let cartItems = JSON.parse(localStorage.getItem('cart'))
        cartItems.splice(i, 1)
        localStorage.setItem('cart', JSON.stringify(cartItems))
        //rerender page
        location.reload()
      }

      cart.appendChild(cartItem)
      cartItem.appendChild(item)
      cartItem.appendChild(cartItemQty)
      cartItem.appendChild(cost)
      cartItem.appendChild(removeButton)
    }
    updateCartTotal()
  }
}

displayCart()

let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let email = document.getElementById('email')
let address = document.getElementById('address')
let city = document.getElementById('city')

//calculate total cost
function updateCartTotal() {
  let cartTotal = document.getElementsByClassName('cart-items')[0]
  let cartRow = cartTotal.getElementsByClassName('cart-row')
  let totalCost = 0
  for (let i = 0; i < cartRow.length; i++) {
    cartRow = cartRow[i]
    let itemPrice = cartRow.getElementsByClassName('cart-price')[0]
    let itemQty = cartRow.getElementsByClassName('qtyInput')[0]
    let price = itemPrice.innerText.replace('$', '')
    let quantity = itemQty.value

    totalCost = totalCost + (price * quantity)
  }
  //return totalCost
  document.getElementsByClassName('total-cost')[0].innerText = '$' + totalCost
  sessionStorage.setItem('price', totalCost)
}

updateCartTotal()

// Send inforamtion from user to api
// go to confirmation page

function makeRequest(data) {
  fetch('http://localhost:3000/api/teddies/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      //console.log(data);

      orderId = data.orderId
      sessionStorage.setItem('orderId', orderId)
      console.log(orderId)
      location.replace('../frontEnd/confirmation.html');
    })
    .catch(err => {
      console.log(err)
    })
}
