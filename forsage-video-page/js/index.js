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
  $(".carousel").carousel("next");

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
  // slider inside target-card
  $(".targets__slider").slick({
    infinite: true,
    speed: 300,
    slidesToShow: 1
  });
});
