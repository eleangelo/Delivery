const cartButton = document.querySelector('#cart-button');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');

/*1-й вариант*/
/*cartButton.addEventListener('click', function (event) {
    modal.classList.add('is-open');
});
close.addEventListener('click', function (event) {
    modal.classList.remove('is-open');
});*/

/*2-й вариант*/
cartButton.addEventListener('click', toggleModal);
close.addEventListener('click', toggleModal);

function toggleModal() {
    modal.classList.toggle('is-open')
}
new WOW().init(); 

// 1 day

const buttonAuth = document.querySelector('.button-auth');
    modalAuth = document.querySelector('.modal-auth');
    closeAuth = document.querySelector('.close-auth');
    logInForm = document.querySelector('#logInForm');
    loginInput = document.querySelector('#login');
    userName = document.querySelector('.user-name');
    buttonOut = document.querySelector('.button-out');

    let login = localStorage.getItem('gloDelivery');

function toggleModalAuth() {
    loginInput.style.borderColor = '';

    modalAuth.classList.toggle('is-open');  
}

function authorized() {

    function logOut() {
        login = null;
        localStorage.removeItem('gloDelivery');
        buttonAuth.style.display = '';
        userName.style.display = '';
        buttonOut.style.display = '';
        buttonOut.removeEventListener('click', logOut);
        checkAuth(); 
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

        if (loginInput.value.trim()) {
        
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
        }
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
checkAuth();

