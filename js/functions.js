const urlapi = 'http://localhost:3000/';

class Items { // création class items
    constructor(jsonItem) {
        jsonItem && Object.assign(this, jsonItem);
    }
}

function FoundItem(cart, itemid, itemcolor) {
    let foundItem = cart.find(p => p.id == itemid && p.color == itemcolor);
    if (foundItem) {
        return true;
    } else {
        return false;
    }
}

function deleteItem(kanapId, kanapColor) {
    let checkCart = getCart();
    checkCart = checkCart.filter(function(item){
    if (item.id === kanapId && item.color !== kanapColor) { 
        return item.color !== kanapColor && item.id == kanapId;
    } else {
        return item.id !== kanapId;
    }
})
saveCart(checkCart);
location.reload();
   }

function getCart() { // fonction récupération du panier
    let cart = localStorage.getItem('cart');
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

function saveCart(cart) { // fonction sauvegarde panier
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getTotalItems() { // fonction total des items du panier
    let cart = getCart();
    let total = 0;
    for (let item of cart) {
        total += +item.qty;
        document
            .getElementById("totalQuantity")
            .innerText = total;
    }
}


function validName(value) {
    return /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/.test(value);
}

function validCity(value) {
    return /[a-z]/g.test(value);
}

function validEmail(value) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}

function addNewArticle(id, color, imgsrc, imgalt, name, price, qty) {

    // création de l'article
    const newArticle = document.createElement('article');
    newArticle.className = 'cart__item';
    newArticle.dataset.id = id;
    newArticle.dataset.color = color;
    let articleTarget = document.getElementById('cart__items');


    //création de la div img
    const newDivImg = document.createElement('div');
    newDivImg.className = 'cart__item__img';
    newArticle.append(newDivImg);
    const img = document.createElement('img');
    img.src = imgsrc;
    img.alt = imgalt;
    newDivImg.append(img);

    //création de la div content
    const newDivContent = document.createElement('div');
    newDivContent.className = 'cart__item__content';
    newArticle.append(newDivContent);
    //description
    const DivDesc = document.createElement('div');
    DivDesc.className = 'cart__item__content__description';
    newDivContent.append(DivDesc);
    const nomH2 = document.createElement('h2');
    const pColor = document.createElement('p');
    const pPrice = document.createElement('p');
    pPrice.textContent = price + '€';
    pColor.textContent = color;
    nomH2.textContent = name;
    DivDesc.append(nomH2, pColor, pPrice);

    //settings
    const DivSettings = document.createElement('div');
    DivSettings.className = 'cart__item__content__settings';
    newDivContent.append(DivSettings);
    const DivSettingsQty = document.createElement('div');
    DivSettingsQty.className = 'cart__item__content__settings__quantity';
    const pQty = document.createElement('p');
    const inputQty = document.createElement('input');
    pQty.textContent = 'Qté : ';
    inputQty.type = 'number';
    inputQty.className = 'itemQuantity';
    inputQty.name = 'itemQuantity';
    inputQty.min = '1';
    inputQty.max = '100';
    inputQty.value = qty;
    DivSettingsQty.append(pQty, inputQty);
    const DivSettingsDelete = document.createElement('div');
    DivSettingsDelete.className = 'cart__item__content__settings__delete';
    const pDelete = document.createElement('p');
    pDelete.className = 'deleteItem';
    pDelete.textContent = 'Supprimer';
    DivSettingsDelete.append(pDelete);
    DivSettings.append(DivSettingsQty, DivSettingsDelete);

    // on envoi notre article
    articleTarget.append(newArticle);
    

}