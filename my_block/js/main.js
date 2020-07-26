const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

let countDown = new Date("Aug 5, 2020 22:00:00").getTime(),
  // let countDown = new Date("Jul 27, 2020 00:00:00").getTime(),
  x = setInterval(function() {
    let now = new Date().getTime(),
      distance = countDown - now;

    (document.getElementById("days").innerText = Math.floor(distance / day)),
      (document.getElementById("hours").innerText = Math.floor(
        (distance % day) / hour
        // distance / hour
      )),
      (document.getElementById("minutes").innerText = Math.floor(
        (distance % hour) / minute
      ));
    // (document.getElementById("seconds").innerText = Math.floor(
    //   (distance % minute) / second
    // ));

    //do something later when date is reached
    //if (distance < 0) {
    //  clearInterval(x);
    //  'IT'S MY BIRTHDAY!;
    //}
  }, second);
$("#promo-btn").fancybox({
  // modal: true,
  maxWidth: 800,
  maxHeight: 600,
  fitToView: false,
  autoSize: false,
  closeClick: false,
  touch: false
  // afterShow: function() {
  //   console.log("modal");
  //   $(".modal__submit").css("border", "none");
  // }
});

$(".modal__input-wrapper").on("click tap", function() {
  $(this).toggleClass("modal__input-wrapper--checked");
  var hiddenField = $(this).find('input[type="hidden"]');
  var val = hiddenField.val();
  hiddenField.val(val === "true" ? "false" : "true");
});
