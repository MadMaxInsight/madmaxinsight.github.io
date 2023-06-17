"use strict";

$(document).ready(function () {
  var windowWidth = window.outerWidth;
  var menu = document.querySelector('.menu');
  var activeMenu = $('.menu-active__wrapper');
  var excellenceCard = document.querySelectorAll('.excellence-card');
  var arrExcellenceCard = Array.prototype.slice.call(excellenceCard);
  var servicesCard = document.querySelectorAll('.services-card');
  var arrServicesCard = Array.prototype.slice.call(servicesCard);
  var clientWidth = document.body.clientWidth; // current width screen for sliders

  var arrExcellenceCardActive = ['excellence-card-active__delivery', 'excellence-card-active__finance', 'excellence-card-active__document', 'excellence-card-active__optimization', 'excellence-card-active__oneWindow', 'excellence-card-active__guarantee']; // Nice scroll - кастомный скролбар (полоса прокрутки)

  $("html").niceScroll({
    cursorwidth: "6px",
    zindex: 99,
    cursoropacitymin: 0,
    cursoropacitymax: 0.5,
    cursorcolor: "#424242"
  }); // if(windowWidth > 421){

  $('.nicescroll-rails.nicescroll-rails-hr').remove(); // }

  menu.addEventListener('click', function () {
    menu.classList.add('menu-active');

    if (windowWidth < 421) {
      $('body').css('overflow', 'hidden');
    }

    menu.style.animation = 'none';
    document.querySelector('.active-content').style.display = 'block';
    activeMenu.css('transition', '2s linear');
  });
  activeMenu.on('click', function () {
    document.querySelector('.active-content').style.display = 'none';
    menu.style.animation = 'open_menu 2s';
    menu.classList.remove('menu-active');

    if (windowWidth < 421) {
      $('body').css('overflow-y', 'scroll ');
      $('body').css('height', 'auto');
    }
  }); // Скрытие меню при нажатии на кнопку "Заказать звонок"

  document.querySelector('.active-content__button').addEventListener('click', function () {
    document.querySelector('.active-content').style.display = 'none';
  });
  arrExcellenceCard.map(function (el, i) {
    arrExcellenceCardActive.map(function (ela, j) {
      el.addEventListener('mouseover', function () {
        if (i == j) el.classList.add(ela);
      });
      el.addEventListener('mouseout', function () {
        el.classList.remove(ela);
      });
    });
  });
  arrServicesCard.map(function (el, i) {
    el.addEventListener('mouseover', function () {
      el.style.backgroundSize = '120% 120%';
      el.classList.add('services-card--hover');
    });
    el.addEventListener('mouseout', function () {
      el.style.backgroundSize = '100% 100%';
      el.classList.remove('services-card--hover');
    });
  });
  /* Инициализация слайдера "О компании"*/

  $('.slider-about').slick({
    infinite: true,
    speed: 200,
    fade: true,
    // cssEase: 'linear',
    adaptiveHeight: true,
    prevArrow: '<button class="sliders-button__left button-slide"> ❮ </button>',
    nextArrow: '<button class="sliders-button__right button-slide"> ❯ </button>'
  });
  /* Счетчик слайдеров */

  $(".slider-about").on("afterChange", function (event, slick, currentSlide, nextSlide) {
    $(".sliders__number-current").text(currentSlide + 1);
  });
  var totalSlides = $('.slider-about').slick("getSlick").slideCount;
  document.querySelector('.sliders__number-total').innerHTML = totalSlides;
  /*Инициализация слайдера "Наши преимущества"  */

  function resizeExcellenceSlider(clientWidth) {
    if (clientWidth <= 102) {
      //на всякий оставлю, вдруг она опять передумает
      $('.excellence__description').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button class="excellence-arrow excellence-prev"> ❮ </button>',
        nextArrow: '<button class="excellence-arrow excellence-next"> ❯ </button>'
      });
    } else {
      $('.excellence__description').unslick;
    }
  }

  resizeExcellenceSlider(clientWidth);
  /*Инициализация слайдера "Отзывы клиентов"  */

  function resizeReviewsSlider(clientWidth) {
    if (clientWidth <= 102) {
      //на всякий оставлю, вдруг она опять передумает
      $('.reviews__cards').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button class="reviews-arrow reviews-prev"> ❮ </button>',
        nextArrow: '<button class="reviews-arrow reviews-next"> ❯ </button>'
      });
    } else {
      $('.reviews__cards').unslick;
    }
  }

  resizeReviewsSlider(clientWidth);
  /* Плавный скролл меню*/

  $("#menu").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
    activeMenu.trigger('click');
  });
  /* Плавный скролл по кнопке "О Компании"*/

  $(".main-scroll__wrapper").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
  /* Плавный скролл по кнопке "Заказать звонок"*/

  $(".button").on("click", "a", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });
  /* Фиксированное меню */

  var g_top = 0;
  $(window).scroll(function () {
    var top = $(this).scrollTop();

    if (top > g_top) {
      // $('.header').fadeOut(300);
      $('.header').css('opacity', 0);
    } else {
      // $('.header').fadeIn(300);
      $('.header').css('opacity', '0.99');
    }

    g_top = top;
  });
  $(window).on("scroll", function () {
    var scrolled = $(this).scrollTop();
    var header = $('.header');

    if (scrolled > 200) {
      header.addClass('header--scroll');
      header.css('background', '#2B2B51');
      header.css('box-shadow', '0px -16px 20px white');
      header.find('.logo-image').addClass('logo-image__scroll');
      header.find('.logo-name').addClass('logo-name__scroll');
    }

    if (scrolled <= 100) {
      header.css('background', 'transparent');
      header.css('box-shadow', 'none');
      header.find('.logo-image').removeClass('logo-image__scroll');
      header.find('.logo-name').removeClass('logo-name__scroll');
    }
  });
  $(window).on('scroll', function () {
    var scrolled = $(this).scrollTop();
    var heightScreen = $(window).height();

    if (scrolled > heightScreen) {
      // $('.menu-active__content').css('background','rgba(16,16,39, 0.9)');
      $('.menu-active__content').addClass('backdrop-blur--dark');
    }

    if (scrolled < heightScreen) {
      $('.menu-active__content').removeClass('backdrop-blur--dark'); // $('.menu-active__content').css('background', 'rgba(145,141,154, 0.3)');
    }
  }); // скрыть хедер если страница загружается не на первом экране, а ниже

  if ($(this).scrollTop() > 20) {
    $('.header').css('opacity', 0);
  } // Маска для поля с телефоном


  $("#form__phone").mask("+7(999) 999-99-99");
  /* <движение ромбов за мышкой> */
  // var sectionsWithRombs = []
  // sectionsWithRombs.push($('.cooperation'))
  // sectionsWithRombs.push($('.about'))
  // function getRandomFloat(min, max) {
  //     return Math.random() * (max - min) + min;
  // }
  // function moving (section, pseudo, speed) {
  //     var deviation = pseudo == 'after' ? 30 : 0;
  //     var customCSSRule = '--float-' + pseudo;	
  //     var defaultValue = section.css(customCSSRule)
  //     console.log('def: ', defaultValue);
  //     section.on('mousemove', function(event) {
  //         console.log('event.pageX:', event.pageX)
  //         console.log('event.pageY:', event.pageY)
  //         var X = Math.floor((event.pageX.toString().slice(-3,-1)/1+(10+deviation))) + "px";
  //         var Y = Math.floor((event.pageY.toString().slice(-3,-1)/1+10)) + "px";
  //         console.log('X:', X)
  //         console.log('Y:', Y)
  //         section.css(customCSSRule, defaultValue + ' translate('+X+' , '+Y+')');
  //     });
  //     section.on('mouseleave', function(event) {
  //         section.css(customCSSRule, defaultValue + ' translate(0px , 0px)');
  //     });
  // }
  // работает криво, пока отключил
  // sectionsWithRombs.forEach(function (section) {
  //     moving(section, 'before', getRandomFloat(50,150));
  //     moving(section, 'after', getRandomFloat(50,150));
  // });

  /* </движение ромбов за мышкой> */

  /* <Animations> */
  // if(windowWidth > 421){

  var splitTextparams = {
    duration: 1.5,
    y: 100,
    ease: Expo.easeInOut,
    stagger: 0.3
  };

  function mainScreenLoad() {
    var childSplit = new SplitText(".split-text", {
      type: "lines",
      linesClass: "split-child"
    });
    var parentSplit = new SplitText(".split-text", {
      linesClass: "split-parent"
    });
    var tl = new TimelineLite({
      paused: true
    });
    tl.from(childSplit.lines, splitTextparams);
    $('.main-screen').addClass('animated');
    gsap.from(".main-scroll__wrapper", {
      opacity: 0,
      duration: 1
    }).delay(9);
    setTimeout(function () {
      $('.main-skgroup').addClass('animated');
      tl.play();
      setTimeout(function () {
        $('.main-body__name').addClass('animated');
      }, 2300);
      $('.advantage__name').each(function (index) {
        var current = $(this);
        setTimeout(function () {
          current.addClass('animated');
        }, 3000 + 1000 * index);
      });
    }, 1500);
  } // Запуск анимации MainScreen и LocomotiveScroll после прогрузки перлоадера


  var bodyInintObserver = new MutationObserver(function (mutation) {
    if (mutation[0].target.classList.contains('start-animate')) {
      mainScreenLoad();
      animationInit();
    }
  });
  bodyInintObserver.observe(document.querySelector('body'), {
    attributes: true
  });
  /* <LocomotiveScroll> */

  function getSplitTexts(parrent) {
    var childSplitScroll = new SplitText(parrent + " h2", {
      type: "lines",
      linesClass: "split-child"
    });
    var parentSplitScroll = new SplitText(parrent + " h2", {
      linesClass: "split-parent"
    });
    return [childSplitScroll, parentSplitScroll];
  }

  var timelinesForSectionHeaders = {};

  function registerAnimationForSection(sectionClass) {
    var splitTexts = timelinesForSectionHeaders[sectionClass]['splitTexts'][0].lines;
    var tl = timelinesForSectionHeaders[sectionClass]['timeLine'];
    var headerClass = '.' + sectionClass + ' .block-header';
    tl.from(splitTexts, splitTextparams).to(headerClass + ' .split-parent', {
      'overflow': 'visible'
    }, "-=0.7");
  }
  /* Проходимся по всем секциям, находя в них h2 и потом манипулируем данными */


  document.querySelectorAll('section').forEach(function (section) {
    var splitTexts = getSplitTexts('.' + section.classList[0]);
    timelinesForSectionHeaders[section.classList[0]] = {
      'timeLine': new TimelineLite({
        paused: true
      }),
      'splitTexts': splitTexts
    };
    registerAnimationForSection(section.classList[0]);
  });
  var scroll, sliderScroll;

  function animationInit() {
    scroll = new LocomotiveScroll({
      el: document.querySelector('body'),
      "class": 'animated',
      reloadOnContextChange: true,
      offset: ["20%", 0]
    });
    sliderScroll = new LocomotiveScroll({
      el: document.querySelector('.sliders__wrapper'),
      "class": 'sliders-animated',
      reloadOnContextChange: true
    });
    scroll.on('call', function (value, way, obj) {
      var sectionClass = obj.el.closest('section').classList[0];

      switch (value) {
        case 'headerAnimation':
          timelinesForSectionHeaders[sectionClass]['timeLine'].play();
        // break;    

        case 'fadeAnimation':
          var animationDelay = obj.el.closest('section').attributes['data-animation-timeout'];
          animationDelay = animationDelay ? animationDelay.value : 1500;
          setTimeout(function () {
            $('.' + sectionClass + ' .fade').addClass('animated');
          }, animationDelay);
          break;

        case 'imgAnimation':
          var imgs = obj.el.closest('section').querySelectorAll('.roll-left');
          var animationDelay = +obj.el.closest('section').attributes['data-animation-timeout'].value;

          var _loop = function _loop(i) {
            var el = imgs[i];
            var t = setTimeout(function () {
              el.classList.add('animated');
            }, animationDelay * (i + 1));
          };

          for (var i = 0; i < imgs.length; i++) {
            _loop(i);
          }

        default:
          break;
      }
    });
    sliderScroll.on('call', function (value, way, obj) {
      switch (value) {
        case 'sliderAnimation':
          scrollSliderAnimate($('.about .slick-slider'));

        default:
          break;
      }
    });
  } // анимация переключения слайдов


  function scrollSliderAnimate(slider) {
    var prevSlider = slider.find('.animated');

    if (prevSlider) {
      prevSlider.removeClass('animated');
      prevSlider.removeClass('animated--shadow');
    }

    var activeSlider = $(slider).find('.slick-active').addClass('animated');
    setTimeout(function () {
      activeSlider.addClass('animated--shadow');
    }, 1000);
  }
  /* <LocomotiveScroll/> */


  $('.slick-slider').on('afterChange', function () {
    scrollSliderAnimate($(this));
  }); // }

  /* </Animations> */

  /* для отладки */

  function dd(obj) {
    window.t = obj;
    console.log(window.t);
  }
});