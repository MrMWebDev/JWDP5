"use strict"

// récupération des ours
async function displayProducts() {
  const nounours = await fetch('http://localhost:3000/api/teddies')
    .then(response => response.json())
    .then(nounours => nounours)

  const currentURL = window.location.href.substring(
    window.location.href.lastIndexOf('/') + 1,
    window.location.href.lastIndexOf('.html') + 5
  )

  const rootDiv = document.getElementById('root')
  let figure, img, figcaption, legend, aLink

  nounours.forEach(nounours => {

    figure = document.createElement('figure')
    aLink = document.createElement('a')
    aLink.setAttribute('href', currentURL + '?id= ' + nounours._id)
    img = document.createElement('img')
    img.setAttribute('src', nounours.imageUrl)
    figcaption = document.createElement('figcaption')
    legend = document.createTextNode(
      `${nounours.name} pour ${nounours.price}€ en ${nounours.colors.length} couleurs (${nounours.colors.join(', ')})`
    )

    rootDiv.appendChild(figure)
    figure.appendChild(aLink)
    aLink.appendChild(img)
    figure.appendChild(figcaption)
    figcaption.appendChild(legend)

  })
}


displayProducts()


