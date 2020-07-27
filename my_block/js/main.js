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
  maxWidth: 800,
  maxHeight: 600,
  fitToView: false,
  autoSize: false,
  closeClick: false,
  touch: false
});
$("#modal-window-2").fancybox({
  maxWidth: 800,
  maxHeight: 600,
  fitToView: false,
  autoSize: false,
  closeClick: false,
  touch: false
});

$(".modal__input-wrapper").on("click tap", function() {
  $(this).toggleClass("modal__input-wrapper--checked");
  var hiddenField = $(this).find('input[type="hidden"]');
  var val = hiddenField.val();
  hiddenField.val(val === "true" ? "false" : "true");
});
function thanks() {
  $.fancybox.close();
  // $.fancybox("#feedback_form");
  $("#modal-window-2").trigger("click");
  // $.fancybox("#modal-window-2");
  // $.fancybox.open({ href: "#modal-window-2" });
  // $("#modal-window-2").fancybox();
}
$(".modal__submit").on("click", function(e) {
  e.preventDefault();
  var confirm = $("#form-confirm").prop("checked");
  if (confirm) {
    var data = $(this)
      .parent()
      .serialize();
    var url = $(this)
      .parent()
      .attr("action");
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      dataType: "json",
      success: thanks()
    });
  } else {
    $("#form-confirm").addClass("warning");
  }
});
$("#form-confirm").click(function() {
  $(this).removeClass("warning");
});
