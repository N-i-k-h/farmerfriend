let searchform = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () =>
    {
        searchform.classList.toggle('active');
    }
let loginform = document.querySelector('.login-form');
document.querySelector('#login-btn').onclick = () =>
    {
        loginform.classList.toggle('active');
    }
    