if ($(document).width() > 1175) {
  $(".section").addClass("will-animate");
}
$(".heading").addClass("will-animate");
document.addEventListener("DOMContentLoaded", function() {
  // Ролик в шапке
  $(".marketing-video .list-lang > a").click(function() {
    let el = $(".marketing-video");
    let lang = $(this).data("lang");
    let video = $(this).data("video_key");
    let copy = el.find(".block-copy .link > a");

    $(".marketing-video .list-lang > a").removeClass("active");
    $(this).addClass("active");

    el.find("[data-video_lang]")
      .removeClass("active")
      .addClass("noactive");
    el.find('[data-video_lang="' + lang + '"]')
      .removeClass("noactive")
      .addClass("active");

    copy.html("https://youtu.be/" + video);
  });
  $(".marketing-video .block-copy .copy").click(function() {
    window.copyText($(".marketing-video .block-copy .link > a").text());
  });
  $(".marketing-video .block-copy .link > a").click(function(e) {
    window.copyText($(this).text());
    e.preventDefault();
    return false;
  });
  $(".marketing-video__button").click(function() {
    // Init modal
    $.fancybox.open($("#marketing-video"), {
      touch: false,
      mobile: {
        touch: {
          vertical: true,
          momentum: true
        }
      }
    });
  });

  // $('.modal').modal();

  // body onload animation
  window.addEventListener("load", function() {
    setTimeout(function() {
      document.querySelector("body").classList.add("loaded");
    }, 1500);
  });

  // lang choosing
  if (document.querySelector(".header-lang")) {
    const langs = document.querySelectorAll(".header-lang__option");
    langs.forEach(lang => {
      lang.addEventListener("click", function() {
        const parent = document.querySelector(".header-lang");
        parent.classList.toggle("opened");
        langs.forEach(item => {
          item.classList.remove("current");
        });
        lang.classList.add("current");
      });
    });
  }

  // advantage height set
  if (document.querySelector(".advantage") && $(window).width() > 1440) {
    var advantagess = document.querySelectorAll(".advantage");
    var minHeight = 0;
    advantagess.forEach(item => {
      if (item.clientHeight > minHeight) {
        minHeight = item.clientHeight;
      }
    });
    advantagess.forEach(item => {
      item.style.minHeight = minHeight + "px";
    });
  }

  // accordion
  if (document.querySelector(".faqq")) {
    !(function(i) {
      var o, n;
      i(".accordion-heading").on("click", function() {
        (o = i(this).parents(".accordion")),
          (n = o.find(".accordion-content")),
          o.hasClass("active")
            ? (o.removeClass("active"), n.slideUp())
            : (o.addClass("active"),
              n.stop(!0, !0).slideDown(),
              o
                .siblings(".active")
                .removeClass("active")
                .children(".accordion-content")
                .stop(!0, !0)
                .slideUp());
      });
    })(jQuery);
  }

  // system message
  console.log("Page loaded. v1.0.0");

  // filter
  $('input[name="dropp"]').on("change", function(e) {
    var value = $(this).val();
    var className = $(this)
      .parent()
      .parent()
      .attr("class");
    // const regex1 = /-\d$/;
    // className
    console.log(className.slice(-1));
    className = ".js-value-" + className.slice(-1);
    $(className).text(value);
  });
  $(".filter-select-wrapper").on("click touch", function() {
    $(this).toggleClass("droped");
    var parent = $(this)
      .parent()
      .parent();
    var queue = parent.attr("data-queue");
    if (queue == 1) {
      parent.addClass("z99999");
      $(".z9999").removeClass("z9999");
      $(".z999").removeClass("z999");
    } else if (queue == 2) {
      parent.addClass("z9999");
      $(".z99999").removeClass("z99999");
      $(".z999").removeClass("z999");
    } else {
      parent.addClass("z999");
      $(".z99999").removeClass("z99999");
      $(".z9999").removeClass("z9999");
    }

    $(this)
      .find(".filter__dropdown")
      .toggleClass("show");
  });

  $(document).on("opened", ".remodal", function() {
    // $(".regular").slick("reinit");
  });
  // slider inside target-card
  $(".targets__slider").slick({
    infinite: true,
    speed: 300,
    slidesToShow: 1
  });

  /* gp */
  // var parrent = document.querySelector(".big-card__wrapper");
  // var elem = document.querySelector("#big-card");

  // function cloneCards() {
  //   for (i = 0; i < 6; i++) {
  //     var cardId = "#big-card--" + (i + 1);
  //     var clone = elem.cloneNode(true);
  //     clone.id = cardId;
  //     $(clone)
  //       .find(".targets__slider--big")
  //       .slick({
  //         infinite: true,
  //         maxWidth: 350,
  //         speed: 300,
  //         // centerMode: true,
  //         slidesToShow: 1,
  //         dots: true,
  //         responsive: true,
  //         touch: false
  //       });
  //     parrent.appendChild(clone);
  //   }
  // }

  // cloneCards();
  // elem.remove();
  var slickCounter = 1;
  $(".modal-wrapper__big").fancybox({
    touch: false,
    afterShow: function() {
      if (slickCounter == 1) {
        $(".big-card__wrapper").slick({
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          centerMode: true,
          centerPadding: 30,
          baseClass: "big-card__fancybox",
          slideClass: "big-card__fancybox2"
        });
        $(".targets__slider--big").slick({
          infinite: true,
          maxWidth: 350,
          speed: 300,
          slidesToShow: 1,
          dots: true,
          responsive: true,
          touch: false,
          draggable: false
        });
        slickCounter++;
      }
    }
  });
  /* 
  // имитация открытия и закрытия
  $(".modal-wrapper__big").trigger("click");
  setTimeout(() => {
    $(".targets__slider--big .slick-next").trigger("click");
    setTimeout(() => {
      $(".fancybox-close-small").trigger("click");
    }, 100);
  }, 100);
 */
  $(".filter__body .target__card .card__bottom").on("click", function() {
    $(".modal-wrapper__big").trigger("click");
  });

  // $(".targets__slider--big").slick({
  //   infinite: true,
  //   speed: 300,
  //   slidesToShow: 1,
  //   dots: true
  // });
  // $(".targets__slider--big").slickNext();

  // $(".big-card__wrapper").slick({
  //   infinite: true,
  //   speed: 300,
  //   slidesToShow: 1,
  //   centerMode: true,
  //   centerPadding: 30
  // });
});
