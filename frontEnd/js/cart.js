
const main = document.querySelector('main');

main.innerHTML ='<div>' + JSON.parse(localStorage.getItem('cart')) + '</div>';

