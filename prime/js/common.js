$(document).ready(function() {
  $(".feedback__slider").slick({
    slidesToShow: 1,
    autoplay: false,
    speed: 1000,
    dots: true,
    nextArrow: '<img src="../img/arrowr.svg" alt="" style="right: 10px">',
    prevArrow:
      '<img src="../img/arrowl.svg" alt="" style="left: 10px; z-index: 20">',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          // arrows: false
        }
      }
    ]
  });
  $(".recommendation__slider").slick({
    slidesToShow: 1,
    autoplay: true,
    speed: 1000,
    dots: true,
    nextArrow: '<img src="../img/arrowr_black.svg" alt="" style="right: 10px">',
    prevArrow:
      '<img src="../img/arrowl_black.svg" alt="" style="left: 10px; z-index: 20">',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          autoplay: false
          // dots: true
        }
      }
    ]
  });

  $(".recommendation__slide, .feedback__slide").css({
    display: "flex",
    margin: "20px auto"
  });
  /* мобильное меню */
  let menuToggle = $(".navbar__toggle");

  menuToggle.on("click", function() {
    $(this).toggleClass("navbar__close");
    $(".navbar__item-right").toggleClass("open");
    $("body").toggleClass("no-scroll");
  });
  /*привязка line на главном*/
  function lineInit() {
    var posStart = $(".header__description>span.uppercase").offset();
    var posEnd = $(".circles__description").offset();
    var spanWidth = $(".header__description>span.uppercase").width();
    var spanHeight = $(".header__description>span.uppercase").height();
    var headerW = $("header").width();
    var headerH = $("header").height();
    var x1 = posStart.left;
    x1 = x1 + spanWidth / 2;
    var y1 = posStart.top;
    y1 = y1 + spanHeight / 2;
    var x2 = posEnd.left;
    var y2 = posEnd.top;
    var avgX = x1 + (x2 - x1) / 2;
    var avgY = y1 + (y2 - y1) / 2;
    var qx = x1 + (avgX - x1) / 2;
    var qy = avgY * 1.2;
    // M10 80 Q 52.5 10, 95 80 T 180 80
    // M10 80 - start
    // Q 52.5 10 - bend line
    // , 95 80 - center
    // T 180 80 - end
    line =
      "M" +
      x1 +
      " " +
      y1 +
      " Q " +
      qx +
      " " +
      qy +
      ", " +
      avgX +
      " " +
      avgY +
      " T " +
      x2 +
      " " +
      y2;
    $(".line svg path").attr("d", line);
    $(".line").css("width", headerW);
    $(".line").css("height", headerH);
  }
  lineInit();

  /* изменние ширины экрана */
  $(window).resize(function() {
    lineInit();
  });

  /* mobile version */
  let winW = $(window).innerWidth();
  if (winW < 767) {
    $(".principles__row").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      dots: true,
      speed: 1000,
      nextArrow:
        '<img src="../img/arrowr_black.svg" alt="" style="right: 5px; height: 40px">',
      prevArrow:
        '<img src="../img/arrowl_black.svg" alt="" style="left: 5px; z-index: 20; height: 40px">'
    });
    $(".benefits__row").slick({
      slidesToShow: 1,
      centerMode: true,
      centerPadding: "30%",
      autoplay: false,
      speed: 500,
      nextArrow:
        '<img src="../img/arrowr_black.svg" alt="" style="right: 5px; height: 110px; opacity: 0;">',
      prevArrow:
        '<img src="../img/arrowl_black.svg" alt="" style="left: 5px; z-index: 20; height: 110px; opacity: 0;">'
    });

    $(".recommendation__slide, .feedback__slide, .principles__item").css({
      display: "flex",
      margin: "20px auto",
      padding: "20px",
      width: "95%"
    });
    $(".benefits__item").css({
      display: "flex",
      margin: "20px auto",
      padding: "20px",
      width: "100vw",
      transition: "all .6s ease- out"
    });
    $(".principles__item").css({
      display: "flex",
      margin: "20px auto"
    });
  }

  var save_price;
  //всплытие popup и инициализация параметров
  $(".appeal__item a").on("click", function(e) {
    e.preventDefault();
    $(".popup").toggle();
    var images_src = $(this)
      .parent()
      .find(".appeal__image .colors img");
    $(".popup .finish__phone").text(
      $(this)
        .parent()
        .find(".appeal__title")
        .text()
    );
    $(".popup .choise__article-name").text(
      $(this)
        .parent()
        .find(".appeal__title")
        .text()
    );
    var images = [];
    var inputs = [];
    var memory = [];
    /*перебираем все картинки*/
    for (i = 0; i < images_src.length; i++) {
      if (i == 0) {
        images.push(
          '<img src="' +
            $(images_src[i]).attr("src") +
            '" color="' +
            $(images_src[i]).attr("color") +
            '" alt="iPhone" class="visible">'
        );
        $(
          '.choise__parameter-color input[id="' +
            $(images_src[i]).attr("color") +
            '"]'
        ).prop("checked", true);
        $(
          '.choise__parameter-color label[for="' +
            $(images_src[i]).attr("color") +
            '"]'
        ).addClass("visible");
      } else {
        images.push(
          '<img src="' +
            $(images_src[i]).attr("src") +
            '" color="' +
            $(images_src[i]).attr("color") +
            '" alt="iPhone">'
        );
        $(
          '.choise__parameter-color label[for="' +
            $(images_src[i]).attr("color") +
            '"]'
        ).addClass("visible");
      }
    }
    $(".choise__image").empty();
    $(".choise__image").append(images);
    /*перебираем ценники согласно памяти*/
    var memory_price = [];
    var memory_val = $(this)
      .parent()
      .find(".appeal__info .prices ul");
    for (i = 0; i < memory_val.length; i++) {
      if (i == 0) {
        $(
          '.memory-choise input[id="' +
            $(memory_val[i]).attr("data-memory") +
            '"]'
        ).prop("checked", true);
        $(
          '.memory-choise label[for="' +
            $(memory_val[i]).attr("data-memory") +
            '"]'
        ).addClass("visible");
        $(".choise__old-price .price_old:first-child")
          .text(
            $(memory_val[i])
              .find("li:first-child")
              .text()
          )
          .attr("data-memory", $(memory_val[i]).attr("data-memory"));
        $(".choise__new-price .price:first-child")
          .text(
            $(memory_val[i])
              .find("li:last-child")
              .text()
          )
          .attr("data-memory", $(memory_val[i]).attr("data-memory"));
      } else {
        $(
          '.memory-choise label[for="' +
            $(memory_val[i]).attr("data-memory") +
            '"]'
        ).addClass("visible");
        $(".choise__old-price .price_old:last-child")
          .text(
            $(memory_val[i])
              .find("li:first-child")
              .text()
          )
          .attr("data-memory", $(memory_val[i]).attr("data-memory"));
        $(".choise__new-price .price:last-child")
          .text(
            $(memory_val[i])
              .find("li:last-child")
              .text()
          )
          .attr("data-memory", $(memory_val[i]).attr("data-memory"));
      }
    }
    // popuopCounter++;
    save_price = $(".popup .price.init").text();
  });

  // надо вернуть labels в исходное
  function reset() {
    // $(".popup .choise__description").show();
    $(".popup .choise__description").addClass("visible");
    // $(".popup .finish__description").hide();
    $(".popup .finish__description").removeClass("visible");
    $(".popup").toggle();
    $(".memory-choise label").removeClass("visible");
    $(".choise__parameter-color label").removeClass("visible");
    $(".choise__parameter-color input:radio:checked").prop("checked", false);
    $(".choise__new-price .price:first-child")
      .addClass("init")
      .removeClass("hidden");
    $(".choise__old-price .price_old:first-child").removeClass("hidden");
    $(".choise__new-price .price:last-child")
      .addClass("hidden")
      .removeClass("init");
    $(".choise__old-price .price_old:last-child").addClass("hidden");
  }

  /*close popup*/
  $(".popup .popup__close").click(function() {
    reset();
  });
  $(".popup").click(function(e) {
    if ($(this).has(e.target).length === 0) {
      reset();
    }
  });
  //смена цвета
  $(".choise__parameter-color .choise__color-value").on("click", function() {
    var color = $(this).attr("for");
    $(".choise__image img.visible").removeClass("visible");
    $('.choise__image img[color="' + color + '"]').addClass("visible");
  });
  // смена памяти
  $(".choise__parameter-memory").on("click", function() {
    var memory = $(this).attr("for");
    $(".choise__old-price .price_old").addClass("hidden");
    $(
      '.choise__old-price .price_old[data-memory="' + memory + '"]'
    ).removeClass("hidden");
    $(".choise__new-price .price")
      .addClass("hidden")
      .removeClass("init");
    $('.choise__new-price .price[data-memory="' + memory + '"]')
      .removeClass("hidden")
      .addClass("init");
    save_price = $(
      '.choise__new-price .price[data-memory="' + memory + '"]'
    ).text();
  });
  //переход на следующий шаг
  $(".choise__description a.theme-button").on("click", function(e) {
    e.preventDefault();
    // $(".popup .choise__description").hide();
    $(".popup .choise__description").removeClass("visible");
    // $(".popup .finish__description").show();
    $(".popup .finish__description").addClass("visible");
    $(".finish__article-name .finish__price").empty();
    $(".finish__article-name .finish__price").text(save_price);
    ym(56421997, "reachGoal", "unfinished");
  });

  /* скроллинг при нажатии на ссылку*/
  $(".navbar .navbar__menu li").on("click", "a", function(event) {
    event.preventDefault();
    $(".open").removeClass("open");
    $(".no-scroll").removeClass("no-scroll");
    $(".navbar__close").removeClass("navbar__close");
    var target = $(this).attr("href");
    target = target.replace(/#/g, ".");
    var top = $(target).offset().top;
    var navbarHeight = $(".navbar").height();
    $("body,html").animate({ scrollTop: top - navbarHeight }, 1500);
  });
  $(".navbar__logo").on("click", function(event) {
    event.preventDefault();
    $(".open").removeClass("open");
    $(".no-scroll").removeClass("no-scroll");
    $(".navbar__close").removeClass("navbar__close");
    $("body,html").animate({ scrollTop: 0 }, 1500);
  });

  /* появление .popup-2 */
  var popup2 = $(".popup-2");
  // нажатие на кнопку купить в Хит продаж
  $(".recommendation__description").on("click", ".theme-button", function(e) {
    e.preventDefault();
    var img = $(this)
      .parent()
      .parent()
      .find(".recommendation__image img")
      .clone()
      .addClass("visible");
    var title = $(this)
      .parent()
      .parent()
      .find(".recommendation__article-name")
      .text();
    popup2
      .find(".choise__image")
      .empty()
      .append(img);
    popup2
      .find(".finish__article-name")
      .empty()
      .text(title);
    popup2.toggle();
  });
  // нажатие на кнопку заказать звонок в навбаре
  $(".navbar__call").on("click", ".theme-button", function(e) {
    e.preventDefault();
    var img = $(".circles__article img")
      .clone()
      .addClass("visible");
    var title = $(this).text();
    popup2
      .find(".choise__image")
      .empty()
      .append(img);
    popup2
      .find(".finish__article-name")
      .empty()
      .text(title);
    popup2.toggle();
  });
  // нажатие на кнопку оформить заказ на главной
  $("header").on("click", ".theme-button", function(e) {
    e.preventDefault();
    var img = $(this)
      .parent()
      .parent()
      .find(".circles__article img")
      .clone()
      .addClass("visible");
    var title = $(this).text();
    popup2
      .find(".choise__image")
      .empty()
      .append(img);
    popup2
      .find(".finish__article-name")
      .empty()
      .text(title);
    popup2.toggle();
  });

  /* исчезновение .popup-2 */
  $(".popup-2 .popup__close").click(function() {
    popup2.toggle();
  });
  $(".popup-2").click(function(e) {
    if ($(this).has(e.target).length === 0) {
      popup2.toggle();
    }
  });

  /* появление .popup-video */
  $("header a.play").on("click", function(e) {
    e.preventDefault();
    $(".popup-video").toggle();
    youTube.playVideo();
  });
  /* исчезновение .popup-video */
  $(".popup-video .popup__close").click(function() {
    $(".popup-video").toggle();
    youTube.pauseVideo();
  });
  $(".popup-video").click(function(e) {
    if ($(this).has(e.target).length === 0) {
      $(".popup-video").toggle();
      youTube.pauseVideo();
    }
  });

  /*отправить форму popup2*/
  $(".completed").on("click", function(e) {
    e.preventDefault();
    var callData = $("#form-call").serialize();
    if (callData.includes("=&")) {
      alert("Заполните форму перед отправкой.");
    } else {
      send(callData);
      var temp = $(this).parent();
      temp.toggle();
      temp.after(
        '<div class="thanks"><h3>Спасибо за заявку, ожидайте звонка)</h3></div>'
      );
      ym(56421997, "reachGoal", "completed");
      $(".hole").toggle();
      setTimeout(function() {
        temp.toggle();
        temp
          .parent()
          .parent()
          .parent()
          .parent()
          .toggle();
        $(".hole").toggle();
        $(".thanks").remove();
      }, 1500);
    }
  });

  /*отправить форму popup*/
  $(".completed-2").on("click", function(e) {
    e.preventDefault();
    var callData = $("#form-buy").serialize();
    if (callData.includes("=&")) {
      alert("Заполните форму перед отправкой.");
    } else {
      send(callData);
      var temp = $(this).parent();
      temp.toggle();
      temp.after(
        '<div class="thanks"><h3>Спасибо за заявку, ожидайте звонка)</h3></div>'
      );
      ym(56421997, "reachGoal", "completed");
      $(".hole").toggle();
      setTimeout(function() {
        reset();
        $(".popup-2 .finish__description").toggle();
        $(".thanks").remove();
        $(".hole").toggle();
      }, 1500);
    }
  });
  /*отправить форму form-question*/
  $('#form-question button[type="submit"]').on("click", function(e) {
    e.preventDefault();
    var callData = $("#form-question").serialize();
    if (callData.includes("=&")) {
      alert("Заполните форму перед отправкой.");
    } else {
      send(callData);
      $("#form-question")[0].reset();
      $('input[type="tel"]').mask("+7(999) 999-9999");

      alert(
        "Спасибо за вопрос, ожидайте звонка и мы ответим на интересующие Вас вопросы."
      );
      ym(56421997, "reachGoal", "question");
    }
  });
  /* amoCRM*/
  function send(callData) {
    $.ajax({
      type: "POST",
      method: "POST",
      url: "https://forms.amocrm.ru/queue/add",
      data: callData
    });
  }

  /* валидация форм */
  $('input[type="tel"]').mask("+7(999) 999-9999");

  $('input[type="text"]').keyup(function() {
    var t = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".completed");
    var t2 = $(this)
      .parent()
      .parent()
      .parent()
      .parent()
      .find(".completed-2");
    if ($(this).val().length >= 2 && $(this).val().length < 25) {
    }
  });

  /* |-$(document).ready */
});
