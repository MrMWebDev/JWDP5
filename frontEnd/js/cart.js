

const main = document.querySelector('main');

const cardTitle = document.createElement('h2', 'mx-03')
cardTitle.textContent = 'Your Cart';
main.classList.add('m-3');
cart.appendChild(cardTitle);


function displayCart() {
    let storage = localStorage.getItem('cart');
    let cartItemsArray = JSON.parse(storage);
    if (cartItemsArray) {
      for (let i =0; i < cartItemsArray.length; i++) {
  
        let cart = document.getElementById('cart');
        let cartItem = document.createElement('li');
  
        cartItem.classList.add('cart-row', 'list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');
        cartItem.style.height = '75px';
  
        let item = document.createElement('div');
        item.classList.add('w-50');
        item.innerHTML = '<p class="my-0">' + cartItemsArray[i].name + '</p> <small class="text-muted">' + cartItemsArray[i].selectColors + '</small>';
  
        let cost = document.createElement('div');
        cost.classList.add('w-25');
        cost.style.marginTop = '12px';
        cost.innerHTML = '<p class="cart-price text-muted">' + '$' + cartItemsArray[i].price / 100 + '</p>';
        
        let removeButton = document.createElement('button');
        removeButton.setAttribute('type', 'button');
        removeButton.classList.add('btn', 'btn-danger', 'my-2', 'py-1', 'px-2', 'remove');
        removeButton.setAttribute('aria-label', 'Remove');
        removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        
        removeButton.onclick = function removeItem() {
          let cartItemsArray = JSON.parse(localStorage.getItem('cart'));
          cartItemsArray.splice(i, 1);
          localStorage.setItem('cart', JSON.stringify(cartItemsArray));
          //rerender page
          location.reload();
        }
  
        cart.appendChild(cartItem);
        cartItem.appendChild(item);
        cartItem.appendChild(cost);
        cartItem.appendChild(removeButton);
      }
    }
  }

  displayCart();

  // Validation Form
const form = document.createElement('form');
form.classList.add('row', 'g-3', 'needs-validation');
form.setAttribute('required', '');
form.innerHTML = '<div class="col-md-4"><label for="validationCustom01" class="form-label">First name</label><input type="text" class="form-control" id="validationCustom01" value="John" required><div class="valid-feedback">Checked!</div></div><div class="col-md-4"><label for="validationCustom02" class="form-label">Last name</label><input type="text" class="form-control" id="validationCustom02" value="Doe" required><div class="valid-feedback">Checked!</div></div><div class="col-md-6"><label for="validationCustom03" class="form-label">City</label><input type="text" class="form-control" id="validationCustom03" required><div class="invalid-feedback">Please provide a valid city.</div></div>'
const submitForm = document.createElement('button');

submitForm.classList.add('btn', 'btn-secondary', 'p-3');
submitForm.textContent = 'Submit Form';
submitForm.setAttribute('type', 'submit');
submitForm.setAttribute('href', 'confirmation.html')
main.appendChild(form);
form.appendChild(submitForm);