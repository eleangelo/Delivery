'use strict';

// 1-й вариант* навешивание события
// cartButton.addEventListener('click', function (event) {
//     modal.classList.add('is-open');
// });
// close.addEventListener('click', function (event) {
//     modal.classList.remove('is-open');
// });

// 2-й вариант  навешивание события
// cartButton.addEventListener('click', toggleModal);
// close.addEventListener('click', toggleModal);

// Запуск библилтеки  анимации
new WOW().init();

// 1 day 

const cartButton = document.querySelector('#cart-button'),
     modal = document.querySelector('.modal'),
     close = document.querySelector('.close'),
     buttonAuth = document.querySelector('.button-auth'),
     modalAuth = document.querySelector('.modal-auth'),
     closeAuth = document.querySelector('.close-auth'),
     logInForm = document.querySelector('#logInForm'),
     loginInput = document.querySelector('#login'),
     userName = document.querySelector('.user-name'),
     buttonOut = document.querySelector('.button-out'),
     cardsRestaurants = document.querySelector('.cards-restaurants'),
     containerPromo = document.querySelector('.container-promo'),
     restaurants = document.querySelector('.restaurants'),
     menu = document.querySelector('.menu'),
     logo = document.querySelector('.logo'),
     cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('gloDelivery');
 
// Валидация логина:
const valid = function(str) {
    // - /gjhfsk/ -запись регулярного выражения
    const nameReg = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;   
    return nameReg.test(str);
}

const toggleModal = function() {
    modal.classList.toggle('is-open')
}

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');
    loginInput.style.borderColor = '';
}

function returnMain() {
        containerPromo.classList.remove('hide')
        restaurants.classList.remove('hide')
        menu.classList.add('hide')
    };

function authorized() {

    function logOut() {
        login = null;
        localStorage.removeItem('gloDelivery');
        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';
        buttonOut.removeEventListener('click', logOut);
        checkAuth();
        returnMain();
    }

    console.log('Авторизован');

    userName.textContent = login;

    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'block';

    buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
    console.log('Не авторизован');

    function logIn(event) {
        event.preventDefault();

        if (valid(loginInput.value.trim())) {

            login = loginInput.value;
            localStorage.setItem('gloDelivery', login);
            toggleModalAuth();
            buttonAuth.removeEventListener('click', toggleModalAuth);
            closeAuth.removeEventListener('click', toggleModalAuth);
            logInForm.removeEventListener('submit', logIn);
            logInForm.reset();
            checkAuth();
        } else {
            loginInput.style.borderColor = 'red';
        }   loginInput.value = '';
    }

    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
}

function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}



// 2day

function createCardsRestaurant() {

    const card = `
        <a class="card  card-restaurant">
            <img src="images/pizza.jpg" alt="imag" class="card-imag" />
            <div class="card-text">
                <div class="card-heding">
                    <h3 class="card-title"> Пицца плюс</h3>
                    <span class="card-tag tag">50 мин</span>
                </div>
                <div class="card-info">
                    <div class="rating">
                        4.5
                    </div>
                    <div class="price">От 600 &#8381;</div>
                    <div class="category">Пицца</div>
                </div>
            </div>
        </a>
        `;

        cardsRestaurants.insertAdjacentHTML('beforeend', card);
}


// УСТАРЕВШИЙ МЕТОД ДОБАВЛЕНИЯ КАРТОЧКИ ТОВАРА


// function createCardGood() {
//     const card = document.createElement('div');
//     card.className = 'card';

//     card.innerHTML =  `
//             <img src="images/pizza-plus/pizza-plus.jpg" alt="image" class="card-image"/>
//             <div class="card-text">
//                 <div class="card-heading">
//                     <h3 class="card-title card-title-reg">Пицца Плюс</h3>
//                 </div>
//                 <div class="card-info">
//                     <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Чеддер», томаты, пепперони,
//                     телятина, грибы, бекон, болгарский перец.
//                     </div>
//                 </div>
//                 <div class="card-buttons">
//                     <button class="button button-primary button-add-cart">
//                         <span class="button-card-text">В корзину</span>
//                          <span class="button-cart-svg"></span>
//                     </button>
//                     <strong class="card-price-bold">805 ₽</strong>
//                 </div>
//             </div>
//         `;

//     console.log(card);
// }
 

// 2й новый МЕТОД ДОБАВЛЕНИЯ КАРТОЧКИ ТОВАРА
function createCardGood() {
        const card = document.createElement('div');
        card.className = 'card';
    
        card.insertAdjacentHTML('beforeend',   `
                <img src="images/pizza-plus/pizza-plus.jpg" alt="image" class="card-image"/>
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title card-title-reg">Пицца Плюс</h3>
                    </div>
                    <div class="card-info">
                        <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Чеддер», томаты, пепперони,
                        телятина, грибы, бекон, болгарский перец.
                        </div>
                    </div>
                    <div class="card-buttons">
                        <button class="button button-primary button-add-cart">
                            <span class="button-card-text">В корзину</span>
                             <span class="button-cart-svg"></span>
                        </button>
                        <strong class="card-price-bold">805 ₽</strong>
                    </div>
                </div>
            `);
    
            cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {

    const target = event.target;
    const restaurant = target.closest('.card-restaurant');
    
    if (restaurant) {

        if (login) {

            cardsMenu.textContent = '';

            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');

            createCardGood();
            createCardGood();
            createCardGood();
    
        } else {
            toggleModalAuth();
        }
    }

}

cartButton.addEventListener('click', toggleModal);

close.addEventListener('click', toggleModal);

cardsRestaurants.addEventListener('click', openGoods);



checkAuth();

createCardsRestaurant();
createCardsRestaurant();
createCardsRestaurant();

new Swiper ('.swiper-container', {
  loop:true,
  autoplay:true
         
})