let sessionProducts = [];

function openCloseCart(eventCart = null) {
    const button_cart = document.querySelector('.openCart');
    const button_close_cart = document.querySelector('.close_cart');
    const cart_content = document.getElementById('cart');
    
    if(eventCart != null) {
        if(eventCart) {
            cart_content.classList.remove("hidden");
            document.body.style.overflowY = 'hidden';
        }else {
            cart_content.classList.add("hidden");
            document.body.style.overflowY = 'auto';
        }

    }

    button_cart.onclick = ()=> {
        cart_content.classList.remove("hidden");
        document.body.style.overflowY = 'hidden';
    }
    button_close_cart.onclick = ()=> {
        cart_content.classList.add("hidden");
        document.body.style.overflowY = 'auto';
    }
}

function cart() {
    let products;

    fetch("../petshopdata.json")
    .then(res => res.json())
    .then(data => {
        products = data.products;
        checklist(products);
    });
}

function checklist(product) {
    let addToCart = document.querySelectorAll('[data-product-id]');
    addToCart.forEach(addToItem => {
        addToItem.addEventListener('click', e => {
            let thisId = Number(e.target.dataset.productId);
            product.forEach(item => {
                if (item.id === thisId) {
                    openCloseCart(true);
                    renderCart(item);
                }
            })
        })
    })
}

function renderCart(key) {
    let cart = document.querySelector('.card_product_list');
    sessionProducts.push(key);
    sessionStorage.setItem('product-add', JSON.stringify(sessionProducts));
    cart.innerHTML += `
        <div class="product_cart" data-product="${key.id}">
            <div class="card_header">
                <img src="./assets/imgs/product/${key.image}" alt="">
            </div>
            <div class="card_content">
                <span class="title">
                    ${key.name}
                </span>
                <div class="card_detals">
                    <span>Cor: ${key.color}</span>
                    <span>Tamanho: ${key.size}</span>
                </div>
                <div class="card_price">
                    <span class="price" data-value="${key.discount}">
                        R$ ${key.discount.toFixed(2)}
                    </span>
                </div>
            </div>
            <button class="btn_off_style" data-remove="${key.id}"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path></svg></button>
        </div>
    `;
    let removeItem = document.querySelectorAll('[data-remove]');
    removeItem.forEach(remove => {
        remove.addEventListener('click', e => {
            sessionProducts.splice(sessionProducts.indexOf(e.target.dataset.remove), 1);
            e.target.closest('.product_cart').remove();
            calcSubTotal();
            sessionStorage.setItem('product-add', JSON.stringify(sessionProducts));
        })
    });
    calcSubTotal();
}

function calcSubTotal() {
    let subTotal = document.querySelectorAll('.product_cart span[data-value]');
    let putSubTotal = document.querySelector('.sub_total span');
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    let calcTotal = [];
    subTotal.forEach(total =>{
        calcTotal.push(Number(total.dataset.value));
    })
    if(calcTotal.length > 0) {
        putSubTotal.innerHTML = calcTotal.reduce(reducer).toFixed(2);
    } else {
        putSubTotal.innerHTML = '00.00'
    }
}

function getSession () {
    let productAdd = sessionStorage.getItem('product-add');
    let cart = document.querySelector('.card_product_list');
    let parseProduct = JSON.parse(productAdd);
    if(productAdd != undefined) {
        parseProduct.forEach(key => {
            sessionProducts.push(key);
            cart.innerHTML += `
                <div class="product_cart" data-product="${key.id}">
                    <div class="card_header">
                        <img src="./assets/imgs/product/${key.image}" alt="">
                    </div>
                    <div class="card_content">
                        <span class="title">
                            ${key.name}
                        </span>
                        <div class="card_detals">
                            <span>Cor: ${key.color}</span>
                            <span>Tamanho: ${key.size}</span>
                        </div>
                        <div class="card_price">
                            <span class="price" data-value="${key.discount}">
                                R$ ${key.discount.toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <button class="btn_off_style" data-remove="${key.id}"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 24 24"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path></svg></button>
                </div>
            `;
        });
        let removeItem = document.querySelectorAll('[data-remove]');
        removeItem.forEach(remove => {
            remove.addEventListener('click', e => {
                sessionProducts.splice(sessionProducts.indexOf(e.target.dataset.remove), 1);
                e.target.closest('.product_cart').remove();
                calcSubTotal();
                sessionStorage.setItem('product-add', JSON.stringify(sessionProducts));
            })
        });
        calcSubTotal();
    }
}



export {
    openCloseCart , cart, getSession
}