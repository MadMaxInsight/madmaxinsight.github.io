$(document).ready(function() {
  $("body").scrollspy({ target: "#spy", offset: 400 });
  // mobile-menu & scroll
  function disableScroll() {
    $("body").css("overflow", "hidden");
  }
  function enableScroll() {
    $("body").css("overflow", "scroll");
  }
  $(".nav-link__mobile").each(function() {
    $(this).removeClass("nav-link__mobile");
  });
  $("#menu-triger").click(function() {
    $(this)
      .parent()
      .parent()
      .toggleClass("menu-open");
    $(".nav-link").each(function() {
      $(this).toggleClass("nav-link__mobile");
    });
    $(".nav-menu").toggleClass("nav-menu__open");
    if ($(".nav-menu").hasClass("nav-menu__open")) {
      disableScroll();
    } else {
      enableScroll();
    }
  });
  $(".nav-item>.nav-link").on("click", function(e) {
    e.preventDefault();
    var timeout;
    var top;
    var id = $(this).attr("href");
    if ($(this).hasClass("nav-link__mobile")) {
      enableScroll();
      timeout = 300;
    } else {
      timeout = 0;
    }
    setTimeout(function() {
      $(".nav-menu").removeClass("nav-menu__open");
      $(".gamburger-wrapper").removeClass("menu-open");
      top = $(id).offset().top;
      $("body,html").animate({ scrollTop: top - 20 }, 1500);
    }, timeout);
  });

  /* slick cards on mobile */
  slick_init();
  $(window).resize(function() {
    slick_init();
  });
  function slick_init() {
    if ($(window).width() < 421) {
      $(".form").prepend($(".instruction-desc__wrapper"));
      $(".instruction-desc__wrapper").addClass("moved");
      $(".box-content").slick({
        dots: true,
        infinite: true,
        speed: 300,
        adaptiveHeight: true,
        arrows: false,
        fade: true,
        lazyLoad: true,
        slidesToShow: 1
      });
    }
  }
});
