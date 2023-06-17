document.addEventListener('DOMContentLoaded', function(){
    let header = document.querySelector('.header');
    let headerMenuItems = document.querySelectorAll(".menu__item")
    let burgerButton = document.querySelector('.header__burger-button');
    let menuBurgerImg= document.querySelector('.burger-img--menu');
    let menuBurgerCross= document.querySelector('.burger-img--cross');


    function headerChangeColor() {
        header.classList.toggle('header--white')
        header.classList.toggle('header--black')
    }


    headerMenuItems.forEach(function(item) {
        item.addEventListener('click', function(){
            if(document.querySelector('.item-line.open')){
                document.querySelector('.item-line.open').classList.remove('open')
            }
            item.querySelector('.item-line').classList.toggle('open')
        });
        
    });

    burgerButton.addEventListener('click', function(){
        if(header.classList.contains('open')){
            header.classList.remove('open')
            gsap.to(menuBurgerCross, {opacity: 0, rotation: 0});
            gsap.to(menuBurgerImg, {opacity: 1});
        }else{
            header.classList.add('open');
            gsap.to(menuBurgerImg, {opacity: 0});
            gsap.to(menuBurgerCross,{opacity: 1, rotation: 180});
        }
    });

    

});
