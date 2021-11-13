

const main = document.querySelector('main');



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
        item.innerHTML = '<p class="my-0">' + cartItemsArray[i].name + '</p> <small class="text-muted">' + cartItemsArray[i].selectLenses + '</small>';
  
        let cost = document.createElement('div');
        cost.classList.add('w-25');
        cost.style.marginTop = '12px';
        cost.innerHTML = '<p class="cart-price text-muted">' + '$' + cartItemsArray[i].price / 100 + '</p>';
        
        let removeButton = document.createElement('button');
        removeButton.setAttribute('type', 'button');
        removeButton.classList.add('btn', 'btn-danger', 'my-2', 'py-1', 'px-2', 'remove');
        removeButton.setAttribute('aria-label', 'Remove');
        removeButton.innerHTML = '<i class="bi bi-trash-fill"></i>';
        //removeButton.setAttribute('onclick', 'removeItem(i);'); 
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