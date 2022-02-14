document.addEventListener('DOMContentLoaded', function(){
    /* Cursor */
    let cursor = document.querySelector(".cursor");
    let cursorTrigger = document.querySelectorAll(".cursor-trigger");
    // Отслеживание координат курсора
    window.addEventListener('mousemove', e => {
        // console.log('По всему Window --- e.clientX=' + e.clientX + '; e.clientY=' + e.clientY)
    // 
    });
    
    /* Preloader & First screen */
    let body = document.querySelector('body');
    let switcher = document.querySelector('#switcher').attributes['data-switch'].nodeValue;
    let preloader = document.querySelector('#preloader');
    let header = document.querySelector('.header');
    // let headerLogo = document.querySelector('.header svg');
    let aboutPromo = document.querySelector('.about__promo');
    let aboutDescHeader = document.querySelector('.desc__header');
    let aboutDescParagraphs = document.querySelectorAll('.desc__paragraph');
    let scrollArrow = document.querySelector('.scroll-arrow');

    
    
    if(switcher == 'on'){ // если ON, то проигрывается прелодер и анимация первого экрана
        // return //disable animate

        /* В начало экрана устанавливаем прокрутку, перед прелоэдером */
        document.documentElement.scrollTop = 0;
        document.body.parentNode.scrollTop = 0;
        document.body.scrollTop = 0



        /////////////////////////
        /* Preloared Starting */
        preloaderAnimation = gsap.timeline({ defaults: {duration: 1, ease: "easy-in-out"} })
        preloaderAnimation.to(
            preloader, 
            {
                delay: 3.2, 
                // opacity: 0,
                duration: 0.4, 
                y: '-100%', 
                display: 'none', 
                onComplete: () =>{
                    body.classList.remove('loading');
                }
            }
        )
        .fromTo(header, {opacity: 0, y: '-100%', position: 'absolute'}, {opacity: 1, y: 0, position: 'fixed'})
        .from(aboutPromo, {opacity: 0, x: '-100%'})
        .from(aboutDescHeader, {opacity: 0, x: '100%'}, "<")
        .from(scrollArrow, {opacity: 0, y: '50%'}, "<")
        .from(aboutDescParagraphs, {opacity: 0, y: '50%', stagger: 0.4}) //stagger - интервал между итерируемыми объектами
        .call(()=>{

            cursorDisplay();
            
        })   
    }else{ // без прелодера 
        preloader.style.display = 'none';
        body.classList.remove('loading');
        cursorDisplay();
    }


    /* Init ScrollMagic */
    var ctrlEndVieport = new ScrollMagic.Controller();

    // var ctrlCenterVieport = new ScrollMagic.Controller({
    //     container: "#involta-go"
    // });



    /////////////////////////
    /* Закрепляем 1 экран */
    // let secondScreen = document.querySelector(".screen.involta-go");
    let greenPreloader = document.querySelector(".involta-go__green-preloader");
    let browserBackground = document.querySelector(".involta-go__browser-bg");
    let searchBar = document.querySelector(".search-bar");
    let cards = document.querySelector(".involta-go__cards");
    let searchPhrase = document.querySelector(".search__phrase");
    let slider = document.querySelector(".involta-go__slider");
    
    let viewportHeight = window.innerHeight
    
    new ScrollMagic.Scene({
        triggerElement: document.querySelector('#involta-go'),
        triggerHook: "onEnter", // полоса Триггера в конце viewport
    })
    // .addIndicators({name: 'Закрепляем 1 экран'})
    .setPin(document.querySelector('#about'))
    .addTo(ctrlEndVieport);
    


    /////////////////////////
    /* Меняем цвет Header */
    new ScrollMagic.Scene({
        triggerElement: document.querySelector('#involta-go'),
        offset: viewportHeight * 0.1,
        duration: 20,
    })
    // .addIndicators({name: 'Меняем цвет Header'})
    .setTween(gsap.to(header, {opacity: 0}))
    .on('start', ()=>{
        if(header.classList.contains('header--dark')){
            header.classList.remove('header--dark');
            // cursor.style.display = 'block'
            // cursor.style.opacity = '0'
            // cursor.stylegreen-preloader.display = 'block'
        }else{
            header.classList.add('header--dark');
            cursor.style.display = 'none'
        }
        if(document.querySelector('#about').classList.contains('active')){
            document.querySelector('#about').classList.remove('active');
        }else{
            document.querySelector('#about').classList.add('active');
        }
    })
    .addTo(ctrlEndVieport);



    /////////////////////////////
    /* Анимирую зеленый экран */
    let involtaGoLogo = document.querySelector(".involta-go__logo");

    let secondScreenAnimation = gsap.timeline({ 
        defaults: {
            duration: 1, 
            ease: "easy-in-out"
        },
    });
    secondScreenAnimation
    .to(greenPreloader, {
        height: 100, 
        width: 100,
        top: '34%',
        right: '27%'
    })
    .to(greenPreloader, {opacity: 0, duration: 0.02}, "<90%")
    .to(header, {opacity: 1}, "<90%")

    new ScrollMagic.Scene({
        triggerElement: document.querySelector('#involta-go'),
        offset: viewportHeight * 0.5,
        duration: viewportHeight * 1.5
    })
    // .addIndicators({name: 'Aнимирую зеленый экран'})
    .setTween(secondScreenAnimation)
    .setPin(document.querySelector('.involta-go'))
    .addTo(ctrlEndVieport);
    
    var prevDuration = viewportHeight * 0.5 + viewportHeight * 1.5;

    /* Уменьшение лого и появление элементов */
    let secondScreenAnimation2 = gsap.timeline({ 
        defaults: {
            duration: 1, 
            ease: "easy-in-out"
        },
    });

    secondScreenAnimation2
    .to(involtaGoLogo, { width: '18vw' }) //Уменьшение лого (.involta-go__logo)
    // Появление элементов поисковой строки и карточки
    .from(browserBackground, { opacity: 0, duration: 0.3 }, "<")
    .from(searchBar, { opacity: 0, y: '100%', duration: 0.3 })
    .from(searchPhrase, { opacity: 0, duration: 0.3 })
    .from(cards, { opacity: 0, y: '50%', duration: 0.3 }, "<")
    // Появление слайдера
    .to(involtaGoLogo, { opacity: 0, display: 'none', y: '100%', delay: 2})
    .to(document.querySelector('.involta-go__search'), { opacity: 0, display: 'none', y: '100%'}, '<')
    .to(cards, { opacity: 0, display: 'none', y: '100%'}, '<')
    .from(slider, { opacity: 0, display: 'none', y: "100%", duration: 0.3 }, '<')

    new ScrollMagic.Scene({
        triggerElement: document.querySelector('#involta-go'),
        offset: prevDuration,
        duration: viewportHeight * 4.5
    })
    .setTween(secondScreenAnimation2)
    // .addIndicators({name: 'Уменьшение лого и пояление элементов'})
    .setPin(document.querySelector('.involta-go'))
    .addTo(ctrlEndVieport);

    prevDuration = prevDuration + viewportHeight * 4.5;


    /* Слайдер на весь экран и его перелистывание */
    let sliderWrapper = slider.querySelector('.slider__items')
    let sliderImg = slider.querySelector('.slider__item1')

    let slidersAnimation = gsap.timeline({ 
        defaults: {
            duration: 1, 
            ease: "easy-in-out"
        },
    });

    slidersAnimation
    .to(slider, {top: 0, left: 0, delay: 1})
    .to(sliderWrapper, { width: '100vw', height: '100vh'}, "<")
    .to(sliderImg, { borderRadius: 0}, "<")
    

    new ScrollMagic.Scene({
        triggerElement: document.querySelector('#involta-go'),
        offset: prevDuration,
        duration: viewportHeight * 2.5
    })
    .setTween(slidersAnimation)
    // .addIndicators({name: 'Слайдер на весь экран и его перелистывание'})
    .setPin(document.querySelector('.involta-go'))
    .on('leave', ()=>{
        if(header.classList.contains('header--dark')){
            header.classList.remove('header--dark');
        }else{
            header.classList.add('header--dark');
        }
        
    })
    .addTo(ctrlEndVieport);

    prevDuration = prevDuration + viewportHeight * 2.5;






    /* cursorDisplay */
    function cursorDisplay(){

        window.addEventListener('mousemove', e => {
            var aboutsectionClasses = [
                'about','about-wrapper','about__promo','promo__header','cursor-trigger',
                'promo__desc', 'about__desc', 'desc__header', 'desc__paragraph', 'about__bg',
                'header', 'header__logo', 'logo--header', 'header__nav', 'nav__lang-switcher', 'menu__item', 'lang-switcher'
            ]
            if( aboutsectionClasses.includes(e.target.classList[0]) || aboutsectionClasses.includes(e.target.parentNode.classList[0]) ){
                cursor.style.opacity = 1;
                if(document.querySelector('#about').classList.contains('active')){
                    document.querySelector('#header').style.cursor = 'none'
                    console.log(1)
                }else{
                    console.log(2)
                    document.querySelector('#header').style.cursor = 'auto'
                }
            }else{
                cursor.style.opacity = 0;
            }
            cursor.style.top = e.clientY -5 + 'px';
            cursor.style.left = e.clientX -10 + 'px';
        });

        cursorTrigger.forEach( e =>{
            e.addEventListener('mouseenter', e => {
                cursor.classList.add('triggered');
            });
            e.addEventListener('mouseleave', e => {
                cursor.classList.remove('triggered');
            });
        });
    }


    /* Custom smoth scroll animation by Max */
    Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) {
        return c/2*t*t + b
    }
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
    };


    // polyfill
    var requestAnimFrame = (function(){
    return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
    })();

    // функция имитации плавного скролинга
    function scrollTo(to, callback, duration) {

    function move(amount) {
        document.documentElement.scrollTop = amount;
        document.body.parentNode.scrollTop = amount;
        document.body.scrollTop = amount;
    }
    function position() {
        return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    }
    var start = position(),
        change = to - start,
        currentTime = 0,
        increment = 20;
    duration = (typeof(duration) === 'undefined') ? 500 : duration;
    var animateScroll = function() {
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        move(val);
        if (currentTime < duration) {
        requestAnimFrame(animateScroll);
        } else {
        if (callback && typeof(callback) === 'function') {
            callback();
        }
        }
    };
    animateScroll();
    }

});

