fetch (urlapi + 'api/products')
    .then ( data => data.json() )
    .then ( listJsonItems => {
        for (let jsonItems of listJsonItems) {
            let items = new Items(jsonItems);
            document
                .getElementById("items")
                .innerHTML += `<a href="./product.html?id=${items._id}">
                <article>
                  <img src="${items.imageUrl}" alt="${items.altTxt}">
                  <h3 class="productName">${items.name}</h3>
                  <p class="productDescription">${items.description}</p>
                </article>
              </a>`;
        }
    })