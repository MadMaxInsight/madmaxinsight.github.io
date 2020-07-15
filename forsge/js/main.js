// $(".carousel").carousel({
//   indicators: true
// });
$(".advantages-card2").css("max-width", "280");
$(".advantages-card2").css("max-height", "250");

carousel_init();
$(window).resize(function() {
  carousel_init();
});

function carousel_init() {
  if ($(window).width() > 991) {
    $(".carousel").carousel({
      indicators: true,
      numVisible: 5
    });
  } else if ($(window).width() < 421) {
    $(".carousel").carousel({
      indicators: true,
      numVisible: 5
    });
    slick_init();
  } else if ($(window).width() < 601) {
    slick_init();
  } else {
    $(".carousel").carousel({
      indicators: true,
      numVisible: 3
    });
  }
}
$(".carousel-nav .prev-slide").click(function() {
  $(".carousel").carousel("prev");
});
$(".carousel-nav .next-slide").click(function() {
  $(".carousel").carousel("next");
});
function slick_init(slides = 1, center = true) {
  console.log(slides);
  $(".slick-slider").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: slides,
    centerMode: center,
    variableWidth: true,
    prevArrow:
      '<div class="prev-slide"><img src="img/arrow-right_card.png" alt="prev slide"></div>',
    nextArrow:
      '<div class="next-slide"><img src="img/arrow-right_card.png" alt="next slide"></div>'
  });
}
function slick_init2() {
  $(".slick-slider").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    prevArrow:
      '<div class="prev-slide"><img src="img/arrow-right_card.png" alt="prev slide"></div>',
    nextArrow:
      '<div class="next-slide"><img src="img/arrow-right_card.png" alt="next slide"></div>'
  });
}
/* init modal */
var t = window.location.origin + "/img/modal-background.jpg";
$(".modal").css("background", "#08081e");
// $('.modal').css('background', t);
/* modal open&close */
$("#modal").on("hidden.bs.modal", function() {
  $("nav").css("z-index", "1");
  $("nav>ul").css("visibility", "unset");
});
$('button[data-toggle="modal"]').on("click", function(e) {
  e.preventDefault();
  if (!$(".modal").hasClass("show")) {
    $("nav").css("z-index", "9999");
    $("nav>ul").css("visibility", "hidden");
  }
});
/* scroll */
$("ul.nav,.main-action").on("click", ".nav-link", function(e) {
  e.preventDefault();
  var top;
  var id = $(this).attr("href");
  if (id == "#results") {
    top = $(id).offset().top - 20;
  } else {
    top = $(id).offset().top - 100;
  }
  $("body,html").animate({ scrollTop: top }, 1500);
});
$(".nav-item>button.nav-btn").on("click", function(e) {
  e.preventDefault();
  var top;
  var id = $(this).attr("href");
  top = $(id).offset().top;
  $("body,html").animate({ scrollTop: top }, 1500);
});

$("html").niceScroll({
  cursorcolor: "#000",
  horizrailenabled: false
});
// $('.nicescroll-rails-hr').css('display', 'none');
$(".nicescroll-rails-hr").hide();

/*  mobile */
function disableScroll() {
  window.onscroll = function() {
    window.scrollTo(0, 0);
  };
}
function enableScroll() {
  window.onscroll = function() {
    window.scrollTo(0, window.scrollY);
  };
}
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
$(".nav-link__mobile").on("click", function(e) {
  e.preventDefault();
  $("#menu-triger").trigger("click");
  var top;
  var id = $(this).attr("href");
  if (id == "#results") {
    top = $(id).offset().top - 20;
  } else {
    top = $(id).offset().top - 100;
  }
  $("body,html").animate({ scrollTop: top }, 1500);
});
$(".nav-link__mobile").each(function() {
  $(this).removeClass("nav-link__mobile");
});

// end
