'use strict'

let thankYouName = document.querySelector('.thankYouName')

thankYouName.innerHTML = ' ' + sessionStorage.getItem('firstName') + '!'

// DOM ELEMENT REFERENCES
let totalCost = document.getElementById('total-cost')
let orderId = document.getElementById('orderID')

// Shows total cost of order and order ID
totalCost.innerHTML = '$' + ' ' + sessionStorage.getItem('price')
orderId.innerHTML = sessionStorage.getItem('orderId')

// remove the item from localStorage and sessionStorage
document.getElementById('return-home').addEventListener('click', removeAllInfo)

function removeAllInfo() {
    sessionStorage.removeItem('orderId')
    sessionStorage.removeItem('firstName')
    sessionStorage.removeItem('price')
    localStorage.removeItem('cart')
    location.replace('index.html')
}
