document.addEventListener('DOMContentLoaded', function(){
    ///////////////////////
    /* Global variables */

    /* Cursor */
    let cursor = document.querySelector(".cursor");
    let cursorTrigger = document.querySelectorAll(".cursor-trigger");
    
    /* Preloader & Global elements like body, header and etc */
    let viewportHeight = window.innerHeight
    let body = document.querySelector('body');
    let switcher = document.querySelector('#switcher').attributes['data-switch'].nodeValue;
    let preloader = document.querySelector('#preloader');
    let header = document.querySelector('.header');
    let headerMenuItems = document.querySelectorAll(".menu__item")

    let firstScreen = document.querySelector("#about");
    let aboutPromo = document.querySelector('.about__promo');
    let aboutDescHeader = document.querySelector('.desc__header');
    let aboutDescParagraphs = document.querySelectorAll('.desc__paragraph');
    let scrollArrow = document.querySelector('.scroll-arrow');
    let scrollArrowLine = document.querySelector('.scroll-arrow__line');
    let scrollArrowLineMarginBottom = 32
    
    let greenPreloader = document.querySelector(".involta-go__green-preloader");
    let secondScreen = document.querySelector("#involta-go");

    let involtaGoLogo = document.querySelector(".web-browser__logo");
    let browserBackground = document.querySelector(".web-browser__browser-bg");
    let searchBarWrapper = document.querySelector(".web-browser__search");
    let searchBar = document.querySelector(".search-bar");
    let cards = document.querySelector(".web-browser__cards");
    let searchPhrase = document.querySelector(".search__phrase");
    let slider = document.querySelector("#slider");

    let sliderWrapper = slider.querySelector('.slider__items')
    let sliderImg = slider.querySelectorAll('.slider__item')
    let sliderTitlesWrapper = document.querySelector('.slider__titles')
    let sliderTitles = sliderTitlesWrapper.querySelectorAll('.slider__title')
    let sliderTitlesLogo = sliderTitlesWrapper.querySelectorAll('.slider__img')

    let siriusScreen = document.querySelector("#sirius");
    let siriusHeaderWrapper = document.querySelector('.sirius__header-wrapper')
    let siriusHeaders = document.querySelectorAll('.sirius__header')
    let siriusDesc = document.querySelector('.sirius__desc')
    let siriusDescParagraphs = document.querySelectorAll('.sirius__txt p')

    let contactsScreen = document.querySelector("#contacts");
    let contactsCells = document.querySelectorAll('.contacts__cell')

    let sliderTitlesOffset = 100
    
    /* END of Global variables */
    ////////////////////////////


    
    
   
    //////////////////////////////////////////////////////////////////////
    /* Innitialization Animation when document loaded or window resize  */

    if(window.outerWidth > 421){
        if (history.scrollRestoration) {    
            window.scrollTo(0, document.body.clientHeight / 2.5);
            // history.scrollRestoration = 'manual';
        } else {
            window.onbeforeunload = function () {
                window.scrollTo(0, document.body.clientHeight / 2);
            }
        }
        document.body.classList.add('loading')
        intitDesktopAnimation();
    }else{
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        } else {
            window.onbeforeunload = function () {
                window.scrollTo(0, 0);
            }
        }
        // setTimeout(() => {
        //     // document.body.classList.add('loading')
        // }, 2500);
        intitMobileAnimation();
    }


    /* END of Innitialization Animation */
    /////////////////////////////////////
    

    
    ////////////////////////
    /* Desktop Animation */
    // var mainWrapper = document.querySelector('.main-wrapper');
    
    function intitDesktopAnimation(){
        if(switcher == 'on'){ // если ON, то проигрывается прелодер и анимация первого экрана
            /* Preloared Starting */
            let preloaderAnimation = gsap.timeline({ defaults: {duration: 1, ease: "easy-in-out"} })
            preloaderAnimation.to(
                preloader, 
                {
                    delay: 3.2, 
                    duration: 0.4, 
                    y: '-100%', 
                    display: 'none', 
                    // onComplete: () =>{
                    //     body.classList.remove('loading');
                    // }
                }
            )
            .set(document.querySelector('.about__desc'), {width: document.querySelector('.header__nav').offsetWidth}, '<')
            .fromTo(header, {opacity: 0, y: '-100%', position: 'absolute'}, {opacity: 1, y: 0, position: 'fixed'})
            .from(aboutPromo, {opacity: 0, x: '-100%'})
            .from(aboutDescHeader, {opacity: 0, x: '100%'}, "<")
            .from(aboutDescParagraphs[0], {opacity: 0, y: '50%'}) 
            .from(scrollArrow, {opacity: 0, y: '50%'}, "<")
            .call(()=>{
                cursorDisplay();
                body.classList.remove('loading');
                setCustomScrollBehavior(timelinesArray)
                // gsap.set(document.querySelector('.about__desc'), {width: document.querySelector('.header__nav').offsetWidth})

            })   
        }else{ // без прелодера 
            preloader.style.display = 'none';
            // gsap.set(document.querySelector('.about__desc'), {width: document.querySelector('.header__nav').offsetWidth})
            body.classList.remove('loading');
            cursorDisplay();
            setCustomScrollBehavior(timelinesArray)
        }

        // Function wich return scroll
        var returnScroll = ()=>{
            setTimeout(() => {
                console.log('returnScroll')
                document.body.style.overflowY = 'scroll'
                document.body.classList.remove('scroll-blocking');
            }, 1000);
        }

        // 0
        var tl1 = gsap.timeline().pause()
        tl1.add(
            gsap.timeline()
                .fromTo(aboutDescParagraphs[1], {opacity: 0, y: '100%'}, {opacity: 1, y: '0'}) 
                .to(scrollArrowLine, {height: aboutDescParagraphs[1].offsetHeight + scrollArrowLineMarginBottom}, "<")
        )
        
        // 1
        var tl2 = gsap.timeline().pause()
        tl2.add(
            gsap.timeline()
                .fromTo(aboutDescParagraphs[2], {opacity: 0, y: '100%'}, {opacity: 1, y: '0'}) 
                .to(scrollArrowLine, {height: aboutDescParagraphs[1].offsetHeight + aboutDescParagraphs[2].offsetHeight + scrollArrowLineMarginBottom * 2 }, "<")
        )
        
        // 2
        var greenScreenAnimation = gsap.timeline().pause()
        greenScreenAnimation.add(
            gsap.timeline()
                .call(()=>{
                    secondScreen.classList.toggle('active')
                })
                .fromTo(secondScreen, {y: '100%', backgroundColor: '#B4DB4D', duration: 0.9}, {y: '0'})
                .to(greenPreloader, {borderRadius: '50%', duration: 0.3})
                .to(greenPreloader, {scale: '0.001', duration: 0.9}, '<70%')
                .to(greenPreloader, {opacity: 0, duration: 0.02}, '<75%')
                .from(involtaGoLogo, { width: '45vw', duration: 0.9 }) //Уменьшение лого
                .to(header, {opacity: 1}, "<90%")
                .call(() => {
                    document.querySelector('body').classList.toggle('circle-cursore')
                    headerChangeColor();
                })
                // Появление элементов поисковой строки и карточки
                .from(browserBackground, { opacity: 0, duration: 0.3 }, "<")
                .from(searchBar, { opacity: 0, y: '100%', duration: 0.3 })
                .from(searchPhrase, { opacity: 0, duration: 0.3 })
                .from(cards, { opacity: 0, y: '50%', duration: 0.3 }, "<")
        )

        // 3
        var sliderDisplayAnimation = gsap.timeline().pause();
        sliderDisplayAnimation.add(
            gsap.timeline()
                .call(()=>{
                    console.log('slider')
                    slider.classList.toggle('active')
                })
                // Скрытие поисковика и Появление слайдера 
                .to(involtaGoLogo, { opacity: 0, display: 'none', y: '100%'})
                .to(searchBarWrapper, { opacity: 0, display: 'none', y: '100%'}, '<')
                .to(cards, { opacity: 0, display: 'none', y: '100%'}, '<')
                // Появление уменьшеного слайдера в браузере
                .to(slider, { zIndex: 3, opacity: 0}, '<') // !!!!!!!!!!!! !!!!!!!!!!!!!!!!!!!!!!!!!!!
                .fromTo(slider, {y: '100%'}, {y: '0', opacity: 1}, '<50%') 
                .to(slider, {top: 0, right: 0}) 
                .call(() => {
                    document.body.classList.toggle('circle-cursore')
                    headerChangeColor()
                })
                .from(sliderWrapper, { scale: 0.5, borderRadius: '30px' }, "<")
                .to(sliderImg, { borderRadius: 0}, "<")
                .from(sliderTitlesWrapper, { opacity: 0, y: '20%'} /*, '<' */)
        )


        // 4
        var slideFirstSlideAnimation = gsap.timeline().pause();    
        slideFirstSlideAnimation.add(
            gsap.timeline()
                // Перелистывание слайдов: 1-->2 
                .to(document.querySelector('.slider__items-wrapper'), {y: '-100vh', duration: 1}, '<')
                // .to(sliderImg[0], { scale: "1" }, "<") // криво отыгрывает! 
                .to(sliderTitles[0], { opacity: '0.2', y: -sliderTitlesOffset, fontSize: '2.8rem'}, "<")
                .from(sliderTitles[1], { opacity: '0.2', y: sliderTitlesOffset, fontSize: '2.8rem'}, '<')
                .fromTo(sliderTitlesLogo, { opacity: 0, y: sliderTitlesOffset, height: '2.4rem'}, { opacity: '0.2', y: sliderTitlesOffset, height: '2.4rem'}, '<')
        )

        // 5
        var slideSecondSlideAnimation = gsap.timeline().pause();    
        slideSecondSlideAnimation.add(
            gsap.timeline()
                // Перелистывание слайдов: 2 --> 3
                .to(document.querySelector('.slider__items-wrapper'), {y: '-200vh', duration: 1})
                .to(sliderTitles[0], { opacity: 0, y: '-200%'}, "<")
                .to(sliderTitles[1], { opacity: '0.2', y: '-100%', fontSize: '2.8rem'}, '<')
                .to(sliderTitlesLogo, {opacity: 1, y: '0', height: '3.4rem'}, '<')
                // Появление Sirius
                .fromTo(siriusScreen, {opacity: 0}, {opacity: 1}, '<')
        )
        
        // 6
        var siriusAnimation = gsap.timeline().pause();    
        siriusAnimation.add(
            gsap.timeline()
                .call(()=>{
                    console.log('sirius')
                    siriusScreen.classList.toggle('active')
                })    
                // Исчезновение Slider Screen
                .to(slider, {opacity: 0})
                // // Появление Sirius
                // .fromTo(siriusScreen, {opacity: 0}, {opacity: 1}, '<')
                .to(document.querySelector('.slider__items-wrapper'), { opacity: 0}, '<')
                .to(siriusDesc, {width: document.querySelector('.header__nav').offsetWidth}, '<')
                // .to(slider, {display: 'none'}, '<')
                // .to('.sirius__filter--blur', {backdropFilter: 'blur(0px)'}, '<')
                .fromTo(siriusHeaderWrapper, {x: '-50%'}, {x: '0'}, '<')
                .fromTo(siriusDesc, {x: '60%'}, {x: '0'}, '<')
        )


        // 6
        var contactsAnimation = gsap.timeline().pause();
        contactsAnimation.add(
            gsap.timeline()
                .call(()=>{
                    console.log('contacts')
                    contactsScreen.classList.toggle('active')
                    document.body.classList.toggle('circle-cursore')
                    headerChangeColor()
                })
                .fromTo(contactsScreen, {y: '100%', duration: 0.9}, {y: '0'})
        )

        var timelinesArray = [ 
            tl1, 
            tl2, 
            greenScreenAnimation, 
            sliderDisplayAnimation, 
            slideFirstSlideAnimation, 
            slideSecondSlideAnimation,
            siriusAnimation,
            contactsAnimation
        ]

        
        /* Scroll logic hendlers */
        var currentIndx = 0
        var prevIndxOftimelinesArray = 0

        // function debugPlayAllTimelines(start){
        //     console.log('start All tl.play')
        //     var prevDuration = 0
        //     var timeout = 0
        //     timelinesArray.forEach((tl, i) => {
        //         timeout = prevDuration * 1000 + tl.duration() * 1000
        //         setTimeout(() => {
        //             tl.play()
        //         }, timeout );

        //         prevDuration = tl.duration() + 1.0
        //     })
            
        //     // REVERSE
        //     // setTimeout(() => {
        //     //     timelinesArray.reverse().forEach((tl, i) => {
        //     //         timeout = prevDuration * 1000 + tl.duration() * 1000
        //     //         setTimeout(() => {
        //     //             tl.reverse()
        //     //         }, timeout );

        //     //         prevDuration = tl.duration() + 1.0
        //     //     })
        //     // }, timeout);
        // }

    

            // debugPlayAllTimelines(7);
            
        function playTimelineFromArray(direct){
            // if(currentIndx < timelinesArray.length){
                switch (direct) {
                    case 'forvard':
                        console.log('prevIndxOftimelinesArray=', prevIndxOftimelinesArray)
                        if(currentIndx - prevIndxOftimelinesArray < 2){
                            // document.body.style.overflowY = 'hidden';
                            // document.body.classList.add('scroll-blocking');
                            console.log('play forvard for: ', currentIndx)
                            timelinesArray[currentIndx].play()
                            prevIndxOftimelinesArray = currentIndx /* == 0 ? currentIndx : currentIndx - 1; */
                            currentIndx = currentIndx !== timelinesArray.length - 1 ? currentIndx + 1 : currentIndx;
                            setTimeout(() => {
                                returnScroll();
                                animationOverListener = true
                            }, timelinesArray[currentIndx -1 ].duration() * 1000 - 300 );
                        }else{
                            currentIndx -= 1
                        }
                        
                        break;
                    case 'reverse':
                        console.log('prevIndxOftimelinesArray=', prevIndxOftimelinesArray)
                        if((prevIndxOftimelinesArray - currentIndx) < 2){
                            document.body.style.overflowY = 'hidden';
                            document.body.classList.add('scroll-blocking');
                            console.log('play reverse for: ', prevIndxOftimelinesArray )
                            timelinesArray[prevIndxOftimelinesArray].reverse()
                            currentIndx = currentIndx !== 0 ? currentIndx - 1 : currentIndx
                            setTimeout(() => {
                                returnScroll();
                                animationOverListener = true
                            }, timelinesArray[prevIndxOftimelinesArray].duration() * 1000 - 300 );
                            prevIndxOftimelinesArray = prevIndxOftimelinesArray !== 0 ? prevIndxOftimelinesArray - 1 : prevIndxOftimelinesArray;
                        }
                        break;
                }
        }


        /* Scroll behavior */
        var prevDirection = 0
        var animationOverListener = true    
        function setCustomScrollBehavior(){
            setTimeout(() => {
                window.addEventListener('scroll', e => {
                    // console.log('window.scrollY=', window.scrollY)
                    // console.log('prevDirection=', prevDirection)
                    document.body.style.overflowY = 'hidden';
                    document.body.classList.add('scroll-blocking');
                    if(!animationOverListener){
                        prevDirection = window.scrollY
                        return
                    }else{
                        if(window.scrollY > prevDirection){  // scroll DOWN
                            animationOverListener = false
                            playTimelineFromArray('forvard')
                        }else{  // scroll UP
                            animationOverListener = false
                            playTimelineFromArray('reverse')
                        }
                    }
                    prevDirection = window.scrollY
                })
            }, 1500);
        }
        
        /* Test logic */
        testLogicInit(false);
    }

    /* END of Desktop Animation */
    /////////////////////////////


    ///////////////////////
    /* Mobile Animation */

    function intitMobileAnimation(){
        var tinySlider = tns({
            container: '.cards__wrapper',
            items: 1,
            loop: false,
            controls: false,
            nav: false,
            center: true,
            items: 2,
            fixedWidth: 0.78 * window.innerWidth,
        });


        if(switcher == 'on'){ // если ON, то проигрывается прелодер и анимация первого экрана
            /* Preloared Starting */
            let preloaderAnimation = gsap.timeline({ defaults: {duration: 1, ease: "easy-in-out"} })
            preloaderAnimation
            .to(
                preloader, 
                {
                    delay: 3.2, 
                    duration: 0.4, 
                    y: '-100%', 
                    display: 'none', 
                    // onComplete: () =>{
                    //     body.classList.remove('loading');
                    // }
                }
            )
            .fromTo(header, {opacity: 0, y: '-100%'}, {opacity: 1, y: 0})
            .from(aboutPromo, {opacity: 0, x: '-100%'})
            .call(()=>{
                // cursorDisplay();
                body.classList.remove('loading');
            })   
        }else{ // без прелодера 
            preloader.style.display = 'none';
            body.classList.remove('loading');
            // cursorDisplay();
        }

        
        



        /* Init ScrollMagic for Mobile*/
        var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 200}});
        var ctrlEndVieportMobile = new ScrollMagic.Controller();
        // var ctrlEndVieportMobile2 = new ScrollMagic.Controller();

        let fadeLeftElements = document.querySelectorAll('.fadeLeft--mobile');
        fadeLeftElements.forEach(elem => {
            new ScrollMagic.Scene({triggerElement: elem})
            .setTween(
                gsap.timeline()
                .from(elem, {opacity: 0, x: '-50%'})
            )
            // .addIndicators({name: '1'})
            .addTo(controller);
        })

        let fadeTopElements = document.querySelectorAll('.fadeTop--mobile');
        fadeTopElements.forEach(elem => {
            // console.log(elem.getAttribute('data-delay'))
            new ScrollMagic.Scene({triggerElement: elem})
            .setTween(
                gsap.timeline()
                .from(elem, {opacity: 0, y: '-100%' })
            )
            // .addIndicators({name: '2'})
            .addTo(controller);
        })


        /* Анимирую зеленый экран for Mobile */
        let secondScreenAnimation = gsap.timeline({ 
            defaults: {
                duration: 1, 
                ease: "easy-in-out"
            },
        });

        // gsap.set(secondScreen, {top: firstScreen.clientHeight })
        secondScreenAnimation
            // .call(()=>{
            //     secondScreen.classList.toggle('active')
            // })
            .to(greenPreloader, {scale: '0.1', x: '1%'})
            .to(greenPreloader, {opacity: 0, duration: 0.02}, '<98%')
            .from(involtaGoLogo, {y:'100%', width: '80vw' }) //Уменьшение лого (.web-browser__logo) width: 45vw
            .to(header, {opacity: 1}, "<90%")
            .call(() => {
                headerChangeColor(); // Пояление меню и окраска в черный цвет
            })
            // Появление элементов поисковой строки и карточки
            .from(browserBackground, { opacity: 0, duration: 0.3 }, "<")
            .from(searchBar, { opacity: 0, y: '100%', duration: 0.3 })
            .from(searchPhrase, { opacity: 0, duration: 0.3 })
            .from(cards, { opacity: 0, y: '50%', duration: 0.3 }, "<")
            // Скрытие поисковика и Появление слайдера 
            .to(involtaGoLogo, { opacity: 0, display: 'none', y: '100%', delay: 4})
            .to(searchBarWrapper, { opacity: 0, display: 'none', y: '100%'}, '<')
            .to(cards, { opacity: 0, display: 'none', y: '100%'}, '<')
            // .to(browserBackground, {opacity: 0, display: 'none'})

            // Появление уменьшеного слайдера в браузере
            // .to(slider, { zIndex: 3, /* position: 'absolute' ,*/ opacity: 0}, '<') 
            .to(slider, { zIndex: 3}, '<') 
            .fromTo(slider, {y: '100%'}, {y: '0', opacity: 1}, '<50%') 
            .to(slider, {top: 0, left: 0, delay: 1}) 
            .from(sliderWrapper, { scaleX: 0.9, scaleY: 0.55 , borderRadius: '30px' }, "<")
            .to(sliderImg, { borderRadius: 0}, "<")
            .call(() => {
                headerChangeColor();
            })
            // .to(sliderImg[0], { backgroundSize: "110%" }, '+=1')
            .to(sliderImg[0], { scale: "1.1" }, '+=1')
            .from(sliderTitlesWrapper, { opacity: 0, y: '20%'}, '<')
            
            // Перелистывание слайдов 
            .to(document.querySelector('.slider__items-wrapper'), {y: '-100vh', duration: 2, delay: 2.5})
            .to(sliderImg[0], { scale: "1" }, '<')
            .to(sliderTitles[0], { opacity: '0.2', y: -sliderTitlesOffset, fontSize: '2.8rem'}, "<")
            .from(sliderTitles[1], { opacity: '0.2', y: sliderTitlesOffset, fontSize: '2.8rem'}, '<')
            .fromTo(sliderTitlesLogo, { opacity: 0, y: sliderTitlesOffset, height: '2.4rem'}, { opacity: '0.2', y: sliderTitlesOffset, height: '2.4rem'}, '<')
            .to(document.querySelector('.slider__items-wrapper'), {y: '-200vh', duration: 2, delay: 2.5})
            .to(sliderTitles[0], { opacity: 0, y: '-200%'}, "<")
            .to(sliderTitles[1], { opacity: '0.2', y: '-100%', fontSize: '2.8rem'}, '<')
            .to(sliderTitlesLogo, {opacity: 1, y: '0', height: '3.4rem'}, '<')
            .set(document.querySelector('.sirius__desc'), {width: document.querySelector('.header__nav').offsetWidth}, '<')
            // .set(contactsCells, {opacity: 0}, "<")
            // .set(document.querySelector('.involta-go__sirius'), {filter: "blur(5px)"}, "<")
            .to(browserBackground, {zIndex: 0})
            .to(document.querySelector('.involta-go__web-browser'), { opacity: 0}, '<')
            // Скрытие слайдера
            .to(sliderTitlesWrapper, {y: '-15%', opacity: 0, delay: 2.5})
            // Появление экрана Сириус
            .to(document.querySelector('.involta-go__sirius'), {zIndex: 3}, '<')
            .to(document.querySelector('.slider__items-wrapper'), { opacity: 0, duration: 1})
            .to(slider, {display: 'none'}, '<')
            .to(browserBackground, {opacity: 0, duration: 0.01}, "<")
            
            // siriusScreenAnimation
            .to(browserBackground, {opacity: 0, duration: 0.01}, "<")
            // появление 1го заголовка
            .from(siriusHeaders[0], {opacity: 0, y: '50%'}) 
            .from(siriusDescParagraphs[0], {opacity: 0, y: '30%'}, '<80%') 
            // пролистывание
            .to(siriusHeaders[0], {opacity: 0, y: '-30%', delay: 1})
            .to(siriusDescParagraphs[0], {opacity: 0, y: '-10%'}, '<')
            .to(siriusHeaders[0], {position: 'absolute'}, '<90%')
            .from(siriusHeaders[1], {display: 'none', opacity: 0, y: '100%', position: 'absolute'}, '<110%') 
            .from(siriusDescParagraphs[1], {display: 0, opacity: 0, y: '100%'}, '<80%') 
            // пролистывание
            .to(siriusHeaders[1], {opacity: 0, y: '-30%', delay: 1})
            .to(siriusDescParagraphs[1], {opacity: 0, y: '-10%'}, '<')
            .to(siriusHeaders[1], {position: 'absolute'}, '<90%')
            .from(siriusHeaders[2], {display: 0, opacity: 0, y: '50%',position: 'absolute'}, '<110%')
            .from(siriusDescParagraphs[2], {display: 0, opacity: 0, y: '100%'}, '<80%') 
            // исчезновение
            .to(siriusHeaderWrapper, {opacity: 0, y: '-30%'})
            .to(siriusDesc, {opacity: 0, y: '-10%'}, '<')
            .to(sliderImg[2], { opacity: 0})
            .call(() => {
                console.log('iphone hi')
                headerChangeColor();
            })
            .to(sliderImg[2], { opacity: 0})
            // .to('.slider__darken', {opacity: 0}, '<')
            // .to(secondScreen, {position: 'fixed', delay: 3.5}) // COOL!



        // gsap.timeline()
        //     .set(contactsCells[5], {x: '-112%', opacity: 0, delay: 1})
        //     .set(contactsCells[6], {x: '112%', opacity: 0},  '<')
        //     .set(contactsCells[7], {x: '-112%', opacity: 0}, '<')
        //     .set(contactsCells[8], {x: '112%', opacity: 0}, '<')
       

        new ScrollMagic.Scene({
            offset: firstScreen.scrollHeight,
            // triggerElement: secondScreen,
            duration: viewportHeight * 17,
            // triggerHook: 0
        })
        .setPin(secondScreen)
        // // .setPin(contactsScreen)
        .setTween(secondScreenAnimation)
        // .addIndicators({name: 'Фиксирую второй экран с браузером и слайдером + появление плитки контактов'})
        .on("start", function (event) {
            if(event.scrollDirection == "FORWARD"){
                secondScreen.classList.add('active')
            }else{
                secondScreen.classList.remove('active')
            }
        })
        // .on("end", function (event) {
        //     if(event.scrollDirection == "FORWARD"){
        //         gsap.timeline()
        //         .to(contactsCells[4], { x: 0, opacity: 1})
        //         .to(contactsCells[5], { x: 0, opacity: 1})
        //         .to(contactsCells[6], { x: 0, opacity: 1}, '<')
        //         .to(contactsCells[7], { x: 0, opacity: 1}, '<')
        //         .to(contactsCells[8], { x: 0, opacity: 1}, '<')
        //     }
        // })
        .addTo(ctrlEndVieportMobile);
        
        // var prevDuration = viewportHeight * 0.5 + viewportHeight;



        /* Burger menu logic */
        let burgerButton = document.querySelector('.header__burger-button');
        // let mobileNavigationWrapper = document.querySelector('.header__nav');
        let menuBurgerImg= document.querySelector('.burger-img--menu');
        let menuBurgerCross= document.querySelector('.burger-img--cross');
        // var headerColorBeforeOpenMenu = header.getAttribute('data-color');
        
        

        
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
                // headerChangeColor();
            }else{
                header.classList.add('open');
                gsap.to(menuBurgerImg, {opacity: 0});
                gsap.to(menuBurgerCross,{opacity: 1, rotation: 180});
                // headerChangeColor();
                // gsap.to(mobileNavigationWrapper, {backgroundColor: '#fff' })
            }
        });



        /* Test modal for Mobile  */
        testLogicInit(true);
        
        let modalClassObserver = new MutationObserver((e)=>{
            if(!e[0].target.classList.contains('modal-on')){
                window.scroll(0,document.querySelector('body').scrollHeight) // scroll to bottom pages
                // Продулировал в lite-modal.js, т.к. есть затормаживание в прокрутке 
            }
        });

        modalClassObserver.observe( document.querySelector('#testModal'),{
            // childList: true, // наблюдать за непосредственными детьми
            // subtree: true, // и более глубокими потомками
            attributes: true,
            // attributeFilter: ['style']
        });

        document.querySelector('#test-modal-trigger').addEventListener('click', () => {
            liteModal.open('#testModal')
        })
    }

    /* END of Mobile Animation */
    ////////////////////////////
    
    ///////////////////////////
    /* Header change colors */
    function headerChangeColor() {
        header.classList.toggle('header--white')
        header.classList.toggle('header--black')
    }

    
    

    

    /////////////////////
    /* Init of cursor */
    // let allCursorTimeoutIds = [];
    // var cursorLastPosition = 0
    function cursorDisplay(){
        if(window.outerWidth > 421 ){
            // событие движения курсора
            window.addEventListener('mousemove', e => {
                x = e.clientX
                y = e.clientY
                // console.log('x=', x, 'y=', y)
                // console.log(e.target)
                if(!e.target.classList.contains('cursor-trigger')){
                    // var timeoutId = setTimeout(
                    //     () => { /* cursor.style.opacity = 0 */ },
                    //     2000
                    // )
                    // allCursorTimeoutIds.push(timeoutId);
                    // lastYPosition.cursorFixed = false
                }else{
                    // allCursorTimeoutIds.push(timeoutId);
                    // allCursorTimeoutIds.map((id) => clearTimeout(id))
                    // lastYPosition.cursorFixed = true
                    // lastYPosition.y = cursor.getBoundingClientRect().y
                    // console.log(cursor.getBoundingClientRect().y)
                }
                cursor.style.opacity = 1;
                // cursor.style.top = e.clientY - 5 + position() + 'px';
                cursor.style.top = e.clientY - 5 + 'px';
                cursor.style.left = e.clientX - 10 + 'px';
                // cursorLastPosition = position()
            });

            // событие наведения 
            cursorTrigger.forEach( e =>{
                e.addEventListener('mouseenter', e => {
                    cursor.classList.add('triggered');
                });
                e.addEventListener('mouseleave', e => {
                    cursor.classList.remove('triggered');
                });
            });

            var lastYPosition = { y: 0, cursorFixed: false}
            // событие скроллинга
            window.addEventListener('scroll', e => {
                // Можно сделать фиксацию подложки относительно текста, и пока не будет сдвига 
                //курсора с места, она зафиксирована 
                if(lastYPosition.cursorFixed){
                    cursor.style.top = lastYPosition.y + window.pageYOffset + 'px'
                }else{
                    // cursor.style.opacity = 0
                }    
                // cursor.style.opacity = 0 // в любом случае пропадает при кролинге
            });
        }
    }


    /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    /* Test form logic */

    function testLogicInit(isMobile=false) {
        if(!isMobile){
            // For Desktop
            var pageOfQuestions = document.querySelectorAll('.involta-go__contacts--desktop .test-form__answers');
            var testAnswers = document.querySelectorAll('.involta-go__contacts--desktop .answers__variant input');
            var testQuestions = document.querySelectorAll('.involta-go__contacts--desktop .question__txt');
            var numberOfQuestionPage = document.querySelector('.involta-go__contacts--desktop .question__number');
            var testResult = document.querySelector('.involta-go__contacts--desktop .test-form__result');
            var questionsWrapper = document.querySelector('.involta-go__contacts--desktop .test-form__question');
            var formWrapper = document.querySelector('.involta-go__contacts--desktop .cell__test-form');
        }else{
            // For Mobile only
            var pageOfQuestions = document.querySelectorAll('.testing__modal .test-form__answers');
            var testAnswers = document.querySelectorAll('.testing__modal .answers__variant input');
            var testQuestions = document.querySelectorAll('.testing__modal .question__txt');
            var numberOfQuestionPage = document.querySelector('.testing__modal .question__number');
            var testResult = document.querySelector('.testing__modal .test-form__result');
            var questionsWrapper = document.querySelector('.testing__modal .test-form__question');
            var formWrapper = document.querySelector('.testing__modal .cell__test-form');
            let closeButton = document.querySelector('.lite-modal__close-btn');

            closeButton.addEventListener('click',()=>{
                liteModal.close();
            })

            var variantMobileButtons = document.querySelectorAll('.answers__variant');
            variantMobileButtons.forEach(btn => {
                btn.addEventListener('click', (e)=>{
                    e.target.classList.toggle('active')
                })
            })
            document.querySelector('.test-form__next').addEventListener('click', (e)=>{
                var activeVariantBtn = pageOfQuestions[currentPageOfQuestions - 1 ].querySelector('.answers__variant.active')
                if(activeVariantBtn){
                    answerAction(activeVariantBtn.querySelector('input'));
                    if(pageOfQuestions.length  == currentPageOfQuestions){
                        setTimeout(() => {
                            formWrapper.classList.add('result')
                            questionsWrapper.classList.remove('active')
                        }, 600);
                    }
                }else{
                    alert('Выберете вариант ответа.')
                }
            })

        }

        var dataOfAnswers = {};
        var currentPageOfQuestions = 1;
        
        function answerAction(input) {
            if(input){
                 setTimeout(() => {
                    var answerTxt = input.parentElement.querySelector('span').textContent;
                    dataOfAnswers[input.getAttribute('name')] = answerTxt;
                    if(pageOfQuestions.length  > currentPageOfQuestions ){
                        pageOfQuestions[currentPageOfQuestions - 1 ].classList.remove('active');
                        testQuestions[currentPageOfQuestions - 1 ].classList.remove('active');
                        currentPageOfQuestions += 1;
                        pageOfQuestions[currentPageOfQuestions - 1].classList.add('active');
                        testQuestions[currentPageOfQuestions - 1].classList.add('active');
                        numberOfQuestionPage.textContent = currentPageOfQuestions + '/' + pageOfQuestions.length;
                    }else{
                        pageOfQuestions[currentPageOfQuestions - 1 ].classList.remove('active');
                        testQuestions[currentPageOfQuestions - 1 ].classList.remove('active');
                        numberOfQuestionPage.textContent = pageOfQuestions.length + '/' + pageOfQuestions.length;
                        document.querySelector('.cell__test-form').classList.add('result');
                        document.querySelector('.test-form__question').classList.remove('active');
                        testResult.classList.add('active');
                    }
                    
                }, 600);
            }
        }

        testAnswers.forEach(input => {
            input.addEventListener('change', (e)=>{
                answerAction(e.target);
            })
        });

        function resetTestForm(){
            console.log('gnsdgnslgslsgdlsdlgl22222')
            dataOfAnswers = {} // затираю старые результаты
            testResult.classList.remove('active');
            // pageOfQuestions[currentPageOfQuestions - 1 ].classList.remove('active');
            // testQuestions[currentPageOfQuestions - 1 ].classList.remove('active');
            pageOfQuestions[0].classList.add('active');
            testQuestions[0].classList.add('active');
            questionsWrapper.classList.add('active');
            testAnswers.forEach(input => {
                input.checked = false;
            });
            // if()
            formWrapper.classList.remove('result');
            numberOfQuestionPage.textContent = '1/' + pageOfQuestions.length;
            currentPageOfQuestions = 1;
        }
        document.querySelector('#againTest-btm').addEventListener('click', (e)=>{
            console.log('test click')
            resetTestForm();
        })
    //         console.log('gnsdgnslgslsgdlsdlgl22222')
    //         dataOfAnswers = {} // затираю старые результаты
    //         testResult.classList.remove('active');
    //         // pageOfQuestions[currentPageOfQuestions - 1 ].classList.remove('active');
    //         // testQuestions[currentPageOfQuestions - 1 ].classList.remove('active');
    //         pageOfQuestions[0].classList.add('active');
    //         testQuestions[0].classList.add('active');
    //         questionsWrapper.classList.add('active');
    //         testAnswers.forEach(input => {
    //             input.checked = false;
    //         });
    //         // if()
    //         formWrapper.classList.remove('result');
    //         numberOfQuestionPage.textContent = '1/' + pageOfQuestions.length;
    //         currentPageOfQuestions = 1;
    //     })
    }


    /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
    /* Всякий муссор, который может пригодится */

    // MUTATION OBSERVER
 
    // var aboutDescWrapper = document.querySelector('body')

    // let scrollArrowLineObserver = new MutationObserver((e)=>{
    //     console.log(e)
    // });
    // scrollArrowLineObserver.observe( aboutDescWrapper,{
    //     // childList: true, // наблюдать за непосредственными детьми
    //     // subtree: true, // и более глубокими потомками
    //     attributes: true,
    //     attributeFilter: ['style']
    // });


     ///////////////////////////////////////////
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

    // получить позицию прокрутки экрана
    function position() {
        return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    }

    // сдвинуть позицию прокрутки к amount
    function move(amount) {
        document.documentElement.scrollTop = amount;
        document.body.parentNode.scrollTop = amount;
        document.body.scrollTop = amount;
    };

    // Функция имитации плавного скролинга
    function scrollTo(to, callback, duration) {

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


    /* The end  smoth scroll animation by Max  */
    ////////////////////////////////////////////
    
    
    
    
    // function scrollTopAndBlockScrolling(){
    //     var val = position() - 1;
    //     move(val);
    //     if(val > 0){
    //         requestAnimFrame(scrollTopAndBlockScrolling);
    //     }else{
    //         body.classList.add('loading');
    //         return 0;
    //     }
    //     scrollTopAndBlockScrolling();
    // }


   

});

