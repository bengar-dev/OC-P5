const cart = getCart();

// on verifie si on est pas sur la page de confirmation de commande.
let currentParams = new URLSearchParams(document.location.search);
let currentId = currentParams.get('id');

if (currentId != null) { // si c'est le cas on récupère l'ID de la commande dans l'URL
    document
        .getElementById('orderId')
        .innerText = currentId;
        
} else { // sinon on execute notre page panier

if (cart == null) {
    document
        .getElementById("cart__items")
        .innerText = "Votre panier est vide";
} else {

    let total = 0; // déclartion de la variable du prix total panier

  for (let i=0; i < cart.length; i++) {
      fetch (urlapi + 'api/products/' + cart[i].id)
        .then (data => data.json())
        .then ( JsonItems => {
            let items = new Items(JsonItems);
            if (items._id == cart[i].id) {

                //ajout de l'article avec createElement
                addNewArticle(items._id, cart[i].color, items.imageUrl, items.altTxt, items.name, items.price, cart[i].qty);

                  total += +items.price * +cart[i].qty; // fonction prix total de notre panier
                  document
                    .getElementById('totalPrice')
                    .innerText = total;

            } else {
                document
                    .getElementById("cart__items")
                    .innerText = "Erreur dans le chargement du panier";
            }


            // fonction edit & delete
            let kanapItems = document.querySelectorAll(".cart__item");
            for (let b=0; b < kanapItems.length; b++) {
                let kanapColor = kanapItems[b].dataset.color;
                let kanapId = kanapItems[b].dataset.id;
                let deleteFunction = document.getElementsByClassName("deleteItem")[b];
                let editFunction = document.getElementsByClassName("itemQuantity")[b];

                //fonction edit
                editFunction.addEventListener('change', function(){
                    let foundItem = cart.find(item => item.id === kanapId && item.color === kanapColor);
                    if (FoundItem(cart, foundItem.id, foundItem.color) == true) {
                        if (editFunction.value > 0) { // si la quantitée > 0 alors on change la quantitée
                            foundItem.qty = +editFunction.value;
                            saveCart(cart);
                            location.reload();   
                        } else {
                            if (editFunction.value == 0) { // si la quantitée = 0 alors on supprime l'item du panier
                                   deleteItem(kanapId, kanapColor);
                            }
                        }
                    }
                })

                //fonction delete
                deleteFunction.addEventListener('click', function(){
                    deleteItem(kanapId, kanapColor);
                })
            }
        })
  }

  getTotalItems(); // fonction pour connaitre le total de nos produits

}

// Verification des données du formulaire

let getFirstName = document.getElementById('firstName');
let getLastName = document.getElementById('lastName');
let getAddress = document.getElementById('address');
let getCity = document.getElementById('city');
let getEmail = document.getElementById('email');

// Verification Prénom
getFirstName.addEventListener('input', function(){
    let getValue = getFirstName.value;
     if (validName(getValue) == true) {
        getFirstName.style.background = "#FFF";
        document.getElementById('firstNameErrorMsg').innerText = '';
     } else {
         getFirstName.style.background = "#FF8888";
         document.getElementById('firstNameErrorMsg').innerText = 'Verifier la saisie de votre prénom';
     }

});

// Verification Nom
getLastName.addEventListener('input', function(){
    let getValue = getLastName.value;
    if (validName(getValue) == true) {
        getLastName.style.background = "#FFF";
        document.getElementById('lastNameErrorMsg').innerText = '';
     } else {
        getLastName.style.background = "#FF8888";
        document.getElementById('lastNameErrorMsg').innerText = 'Verifier la saisie de votre nom';
     }
})

// Verification Ville
getCity.addEventListener('input', function(){
    let getValue = getCity.value;
    if (validCity(getValue) == true ) {
        getCity.style.background = "#FFF";
        document.getElementById('cityErrorMsg').innerText = '';
    } else {
        getCity.style.background = "#FF8888";
        document.getElementById('cityErrorMsg').innerText = 'Verifier la saisie de la ville';
    }
})

// Verification Email
getEmail.addEventListener('input', function(){
    let getValue = getEmail.value;
    if (validEmail(getValue) == true) {
        getEmail.style.background = "#FFF";
        document.getElementById('emailErrorMsg').innerText = "";
    } else {
        getEmail.style.background = "#FF8888";
        document.getElementById('emailErrorMsg').innerText = "Attention au format de l'email";
    }
})

// Fonction Post

document.getElementById('order').addEventListener('click', function(event){
    event.preventDefault();
    // on verifie si tous les champs sont bien remplis
    if (getFirstName.value == '' || getLastName.value == '' || getAddress.value == '' || getCity.value == '' || getEmail.value == '') {
        alert("Veuillez bien compléter tous les champs du formulaire");
        } else { // si tous les champs sont remplis, on verifie si il n'y a pas d'erreurs de saisie
            if (document.getElementById('firstNameErrorMsg').textContent == '' && 
            document.getElementById('lastNameErrorMsg').textContent == '' &&
            document.getElementById('cityErrorMsg').textContent == '' &&
            document.getElementById('emailErrorMsg').textContent == '') {
                if (cart.length != 0) { // si il n'y a pas d'erreurs de saisie, on verifie que notre panier ne soit pas vide, si il n'est pas vide on lance notre requete
                    
                    let contact = { // on récupère les données du formulaire
                        lastName: getLastName.value,
                        firstName: getFirstName.value,
                        address: getAddress.value,
                        city: getCity.value,
                        email: getEmail.value,
                    };
                    
                    let products = []; // tableau de nos produits
                    
                    fetch(urlapi + "api/products/order", {
                        method: "POST",
                        body: JSON.stringify({contact, products}),
                        headers: {
                            "Accept": 'application/json',
                            "Content-Type": "application/json"
                        },
                    })
                    .then(res => res.json())
                    .then(verif => {
                        let orderId = verif.orderId;
                        let url = "confirmation.html?id=";
                        location.assign(url + orderId);
                    })                    

                } else {
                    alert("Votre panier est vide");
                }
            } else {
                alert("Veuillez vérifier la saisie de tous les champs");
            }
        }
})

}