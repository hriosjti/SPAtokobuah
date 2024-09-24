//Toogle Class Active untuk hamburger menus

const navbarNav = document.querySelector('.navbar-nav');
//ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

// toggle kelas active //klik tombol search untuk menambhakan kelas active pada search-form

const searchForm = document.querySelector('.search-form')
const searchBox = document.querySelector('#search-box')

document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

//toggleshoping cart
const shopingCart = document.querySelector('.shoping-cart')

document.querySelector('#shoping-cart-button').onclick = (e) => {
    shopingCart.classList.toggle('active');
    e.preventDefault();
}



//klik diluar element sidebar untuk menghilangkan nav

const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const scb = document.querySelector('#shoping-cart-button');

document.addEventListener('click', function (e) {
    if (!hm.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

    if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
        searchForm.classList.remove('active');
    }
    if (!scb.contains(e.target) && !shopingCart.contains(e.target)) {
        shopingCart.classList.remove('active');
    }
});




// modal box
const itemDetailModal = document.querySelector('#item-detail-modal');

const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
        console.log("Button clicked"); // Cek apakah event berfungsi
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
    };

});



// klik tombol close modal
document.querySelector('.modal .close-icon').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
}


//klik diluar modal
window.onclick = (e) => {
    if (e.target === itemDetailModal) {
        itemDetailModal.style.display = 'none';
    }
}
