$(document).ready(function(){

    let servicesCard = document.querySelectorAll('.services-card');
    let arrServicesCard = Array.prototype.slice.call(servicesCard);


    $("html").niceScroll({cursorwidth: "6px", zindex: 99,cursoropacitymin: 0, cursoropacitymax: 0.5, cursorcolor:"#424242"});
    $('.nicescroll-rails.nicescroll-rails-hr').remove();
    let menu = document.querySelector('.menu');
    const activeMenu = document.querySelector('.menu-active__wrapper')
    
    menu.addEventListener('click',()=>{
        menu.classList.toggle('menu-active');
        menu.style.animation = 'none';
        document.querySelector('.active-content').style.display = 'block';
        activeMenu.style.transition = 'transition: 2s linear'
    });

    activeMenu.addEventListener('click',()=>{
        document.querySelector('.active-content').style.display = 'none';
        menu.style.animation = 'open_menu 2s';
    })
  
     /* Плавный скролл меню*/
     $(document).ready(function(){
        $("#menu").on("click","a", function (event) {
            event.preventDefault();
            var id  = $(this).attr('href'),
                top = $(id).offset().top;
                $('body,html').animate({scrollTop: top}, 1500);
            });
        });

        /* Плавный скролл по кнопке "Заказать звонок"*/
    $(document).ready(function(){
        $(".button").on("click","a", function (event) {
            event.preventDefault();
            var id  = $(this).attr('href'),
                top = $(id).offset().top;
                $('body,html').animate({scrollTop: top}, 1500);
            });
        });

        /* Фиксированное меню */
    $(document).ready(function($) {
        var g_top = 0;
        $(window).scroll(function() {
        var top = $(this).scrollTop();
        
        if ( top > g_top ) {
            $('.header').css('opacity', 0);
        } else {
            $('.header').css('opacity', 1);
            // $('.header').fadeIn(300);
        }
        
        g_top = top;    
        });
    });
    $(window).on("scroll", function () {
        var scrolled = $(this).scrollTop();
        var header = $('.header');
        if( scrolled > 200 ) {
            header.addClass('header--scroll');
            // header.css('background','#2B2B51');
            header.css('box-shadow', '0px -16px 20px white');
            header.find('.logo-image').addClass('logo-image__scroll');
            header.find('.logo-name').addClass('logo-name__scroll');
        }   
        if( scrolled < 101 ) {     
            // header.css('background','#2B2B51');
            header.css('box-shadow', 'none');
            header.find('.logo-image').removeClass('logo-image__scroll');
            header.find('.logo-name').removeClass('logo-name__scroll');
        }
    });

    // скрыть хедер если страница загружается не на первом экране, а ниже
    if($(this).scrollTop() > 100){
        $('.header').css('opacity', 0);
    }

    /* Скрытие меню при нажатии на ссылку */
  
    let arrMenuLink = Array.prototype.slice.call(document.querySelectorAll('#menu a'));
    arrMenuLink.map((a)=>{
        a.addEventListener('click',()=>{
            document.querySelector('.active-content').style.display = 'none';
        })
    });
    document.querySelector('.active-content__button').addEventListener('click',()=>{
        document.querySelector('.active-content').style.display='none'
    })

    

    /* Счетчик слайдеров */  
    // $(".slider-about").on("afterChange", function(event, slick, currentSlide, nextSlide){
    //     $(".sliders__number-current").text(currentSlide + 1);
    // });
    // let totalSlides = $('.slider-about').slick("getSlick").slideCount
    // document.querySelector('.sliders__number-total').innerHTML=totalSlides

    /* Блок с другими услугами компании */
    arrServicesCard.map((el,i)=>{
        el.addEventListener('mouseover', ()=>{
            el.style.backgroundSize = '120% 120%';     
            el.classList.add('services-card--hover');
        });
        el.addEventListener('mouseout', ()=>{
            el.style.backgroundSize = '100% 100%'; 
            el.classList.remove('services-card--hover');

        });
    });
    // Маска для поля с телефоном
    $("#form__phone").mask("+7(999) 999-99-99");

    /* <Animations> */
    const splitTextparams = {
        duration: 1.5,
        y: 100,
        ease: Expo.easeInOut,
        stagger: 0.3
    }

    // Запуск анимации LocomotiveScroll после прогрузки перлоадера
    var bodyInintObserver = new MutationObserver(function (mutation) {
        if(mutation[0].target.classList.contains('start-animate')){
            animationInit();
        } 
    });
    bodyInintObserver.observe(document.querySelector('body'), {attributes: true});

    /* <LocomotiveScroll> */
    // function getSplitTexts(parrent){
    //     var childSplitScroll = new SplitText(parrent + " .block-header", {
    //         type: "lines,words",
    //         wordsClass:"word word++",
    //         linesClass: "split-child"
    //     });
    //     var parentSplitScroll = new SplitText(parrent + " .block-header", {
    //         linesClass: "split-parent"
    //     });
    //     return [childSplitScroll,parentSplitScroll]
    // }
    function getSplitTextsForElem(elementClass){
        var childSplitScroll = new SplitText(elementClass + ".block-header", {
            type: "lines,words",
            wordsClass:"word word++",
            linesClass: "split-child"
        });
        var parentSplitScroll = new SplitText(elementClass + ".block-header", {
            linesClass: "split-parent"
        });
        return [childSplitScroll,parentSplitScroll]
    }

    // var timelinesForSectionHeaders = {};

    // function registerAnimationForSection(sectionClass){
    //     var splitTexts = timelinesForSectionHeaders[sectionClass]['splitTexts'][0].lines;
    //     var tl = timelinesForSectionHeaders[sectionClass]['timeLine'];
    //     var headerClass = '.' + sectionClass +' .block-header';
    //     tl.from(splitTexts, splitTextparams)
    //     .to(headerClass + ' .split-parent', {'overflow': 'visible'}, "-=0.7")
    // }
    
    var timelinesForElements = {};

    function registerAnimationForElement(elementFirstClass){
        var splitTexts = timelinesForElements[elementFirstClass]['splitTexts'][0].lines;
        var tl = timelinesForElements[elementFirstClass]['timeLine'];
        var headerClass = '.' + elementFirstClass +'.block-header';
        tl.from(splitTexts, splitTextparams)
        .to(headerClass + ' .split-parent', {'overflow': 'visible'}, "-=0.7")
    }

    /* Проходимся по всем секциям, находя в них h2 и потом манипулируем данными */
    document.querySelectorAll('.block-header').forEach(function(elem) {
        var splitTexts = getSplitTextsForElem('.' + elem.classList[0]);
        timelinesForElements[elem.classList[0]] = {
            'timeLine': new TimelineLite({paused: true}),
            'splitTexts': splitTexts
        };
        registerAnimationForElement(elem.classList[0])
    });

    // document.querySelectorAll('section').forEach(function(section) {
    //     var splitTexts = getSplitTexts('.' + section.classList[0]);
    //     timelinesForSectionHeaders[section.classList[0]] = {
    //         'timeLine': new TimelineLite({paused: true}),
    //         'splitTexts': splitTexts
    //     };
    //     registerAnimationForSection(section.classList[0])
    // });

    var scroll, sliderScroll;
    function animationInit() {
        scroll = new LocomotiveScroll({
            el: document.querySelector('body'),
            // el: document.querySelector('[data-scroll-container]'),
            // smooth: true,
            class: 'animated',
            reloadOnContextChange: true,
            offset: ["10%",0]
        });
        // sliderScroll = new LocomotiveScroll({
        //     el: document.querySelector('.sliders__wrapper'),
        //     class: 'sliders-animated',
        //     reloadOnContextChange: true,
        // });

        scroll.on('call', function (value, way, obj){
            var sectionClass = obj.el.closest('section').classList[0];
            var elementClass = obj.el.classList[0];
            switch (value) {
                case 'headerAnimation':
                    var animationDelay = obj.el.attributes['data-animation-timeout']
                    animationDelay = animationDelay ? +animationDelay.value : 0;
                    setTimeout(function(){
                        // timelinesForSectionHeaders[sectionClass]['timeLine'].play()
                        timelinesForElements[elementClass]['timeLine'].play()
                    }, animationDelay);
                    break;    
                case 'fadeAnimationAll':
                    var animationDelay = obj.el.attributes['data-animation-timeout']
                    animationDelay = animationDelay ? +animationDelay.value : 1500;
                    setTimeout(function(){
                        $('.' + sectionClass + ' .fade').addClass('animated');
                    }, animationDelay);
                    break;
                case 'fadesAnimations':
                    var items = obj.el.querySelectorAll('.fade');
                    var animationDelay = obj.el.attributes['data-animation-timeout']
                    animationDelay = animationDelay ? +animationDelay.value : 1500;
                    for(let i = 0; i < items.length; i++ ){
                        let el = items[i];
                        let t = setTimeout(function(){
                            el.classList.add('animated');
                        }, animationDelay*(i+1));
                    }
                break;
                case 'imgAnimation':
                    var imgs = obj.el.closest('section').querySelectorAll('.roll-left');
                    var animationDelay = +obj.el.closest('section').attributes['data-animation-timeout'].value
                    for(let i = 0; i < imgs.length; i++ ){
                        let el = imgs[i];
                        let t = setTimeout(function(){
                            el.classList.add('animated');
                        }, animationDelay*(i+1));
                    }
                break;

                default:
                    break;
            }
        });

        // sliderScroll.on('call', function (value, way, obj){
        //     switch (value) {
        //         case 'imgAnimation':
        //             scrollImgAnimate($('.about .slider-about__item'));
        //         default:
        //             break;
        //     }
        // });
    }
    // анимация переключения слайдов
    // function scrollImgAnimate(imgWrapper){
    //     var img = $(imgWrapper).find('.slick-active').addClass('animated');
    //     setTimeout(function(){
    //         img.addClass('animated--shadow');
    //     }, 1000);
    // }
    /* <LocomotiveScroll/> */
    /* </Animations> */
    
    /* График и сроки доставки, движение грузовика */

    

    /* Только для страницы Сборные грузы (url включает 'cargo') */
    if(window.location.pathname.includes('cargo')){
        /* <движение грузовика> */
        var startObject =  $('.graph__truck').offset().top.toFixed(0) - window.outerHeight; // растояние до машины - 30px
        var endObject =  startObject +  $('.graph__truck').height() + window.outerHeight;
        var windowWidth = window.outerWidth
        $(window).scroll(function() {
            var scroll = $(window).scrollTop().toFixed(0)
            // console.log("scroll - ", scroll)
            if(startObject < scroll && endObject+30 > scroll){
                var progress = (((scroll-startObject)*100/(endObject-startObject))).toFixed(0) 
                var screenWidthProgress = windowWidth*progress/100
                $('.graph__truck').css('transform', "translateX(-" + screenWidthProgress + "px)" )
            }
        });
        /* <движение грузовика/> */
    }
    

    /* для отладки */
    function dd(obj) {
        window.t = obj;
        console.log(window.t);   
    }
});

