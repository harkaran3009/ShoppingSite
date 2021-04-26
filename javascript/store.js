if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}



function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
   if(sessionStorage.getItem("user")){

   
   var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row') 
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    var user = sessionStorage.getItem("user");
    //alert(user);
    

    //alert(cartRows[1].getElementsByClassName('cart-quantity-input')[0].value)
    //alert(cartRows.length)
    
    //,'quantity': quantity
    var jsonObj = [];
    if(cartRows.length ==0)
    {
        alert("No Items Added");
    }
    else{
        for (var i = 0; i < cartRows.length; i++) {
            var titleName = cartItemNames[i].innerText;
            var quantityItem = (cartRows[i].getElementsByClassName('cart-quantity-input')[0].value);
            var imgsrc = (cartItems.getElementsByClassName('cart-item-image')[i].src);
            var itemPrice = (cartItems.getElementsByClassName('cart-price')[i].innerText);
            var p = parseFloat(itemPrice.replace('$', ''))
            //alert(p)
            var totalPrice = quantityItem * p;
           // alert("in for loop"+ imgsrc)
           // alert(itemPrice);
            obj = {'titleName' : titleName, 'quantity':quantityItem,'price':itemPrice, 'TotalPrice':totalPrice, 'imagePath': imgsrc}
           // alert(obj.imagePath);
            jsonObj.push(obj);
        }    
        //alert(jsonObj[1].titleName + jsonObj[1].quantity);
        var request;
        request = $.ajax({
            url: "/productsAdd",
            type: "post",
            data: {user: user ,jsonObj},
        success: function(response) {
            alert("Success");
          
      } ,
      complete: function(xhr, textStatus) {
        if (xhr.status == 400)
        {
          alert("Sorry,invalid credentials. please register");
        }
        if(xhr.status == 200)
        {
            alert("Items Added to Favourite List");
        }
        
    }
});  

    }

   }
   else
   {
       alert("Please Login First");
   }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
   //alert(imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}