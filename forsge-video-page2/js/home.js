$(document).ready(function() {
  $("body").scrollspy({ target: "#spy", offset: 400 });
  $(".nav-item>.nav-link").on("click", function(e) {
    e.preventDefault();
    var top;
    var id = $(this).attr("href");
    top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 1500);
  });
});
