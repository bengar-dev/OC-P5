let url = new URL(window.location.href);
let getId = url.searchParams.get("id");

fetch (urlapi + 'api/products/' + getId)
    .then (data => data.json())
    .then (JsonItems => {
        let items = new Items(JsonItems);
        if (items._id == getId) {
            document
            .getElementById("description")
            .innerText = items.description;
        document
            .getElementById("title")
            .innerText = items.name;
        document
            .querySelector('.item__img')
            .innerHTML = `<img src="${items.imageUrl}" alt="${items.altTxt}">`;
        document
            .getElementById("price")
            .innerText = items.price;
        for (let Colors of items.colors) {
            document
            .getElementById("colors")
            .innerHTML += `<option value="${Colors}">${Colors}</option>`;     
        }
        document // fonction Ajout au Panier
            .getElementById('addToCart')
            .addEventListener("click", function(){
                let cart = getCart();
                let item = {"id":items._id, "qty":document.getElementById("quantity").value, "color":document.getElementById("colors").value};
                if (item.color != "") { // verification si la couleur a été choisi
                    if (FoundItem(cart, item.id, item.color) == true){ // verification si l'item existe déjà dans le panier
                        let foundItem = cart.find(p => p.id == item.id && p.color == item.color);
                        foundItem.qty = +foundItem.qty + +item.qty;
                        let verifQty = foundItem.qty;
                        if (verifQty > 0) { // si la nouvelle quantitée est bien supérieur à 0, alors on sauvegarde le panier
                            saveCart(cart); 
                        }
                    }else { // si l'item n'existe pas dans la panier
                        if (item.qty > 0) { // on vérifie que la quantitée est bien > 0
                            cart.push(item);
                            saveCart(cart);
                        }
                    } 
                }
            });
        }
        else {
            document
                .getElementById("title")
                .innerText = 'Erreur, produit inconnu';
        }
    })