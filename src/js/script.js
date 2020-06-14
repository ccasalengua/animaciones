document.addEventListener('DOMContentLoaded', function(){
    var page = document.querySelector('.ni-page');
    var menuTrigger = document.querySelector('.ni-header__button');
    var menuCloseBTN = document.querySelector('.ni-nav__close');


    function openNavMenu() {
        page.classList.add('ni-page--open-nav');
    }
    function closeNavMenu() {
        page.classList.remove('ni-page--open-nav');
    }

    if(menuTrigger){
        menuTrigger.addEventListener('click', openNavMenu);
    }
    if (menuCloseBTN){
        menuCloseBTN.addEventListener('click', closeNavMenu);
    }
}, false);
